# Demo Data Pipeline Orchestration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Data-Collection-and-Preparation/Demo-Data-Pipeline-Orchestration)

---

## Table of Contents

- Demo Data Pipeline Orchestration
  - Setting Up the Airflow Environment
  - Accessing the Airflow Web Interface
  - Example: Bash Operator DAG
  - Creating a Custom IoT Data Pipeline DAG
  - Running and Monitoring the DAG
  - Conclusion
  - Watch Video
  - Practice Lab
    - Create the Working Directory
    - Download the Docker Compose File and Configure Folders
    - Airflow Configuration Snippet
    - Initializing Airflow
    - Create the DAG File

---

## Content

Fundamentals of MLOps

Data Collection and Preparation

# Demo Data Pipeline Orchestration

Welcome to this comprehensive guide on data pipeline orchestration using Apache Airflow. In this lesson, you will explore a hands-on demo that illustrates how Airflow processes real-time data from an IoT device in a factory setting. Imagine a manufacturing facility where multiple machines are monitored through IoT devices collecting various metrics. Our objective is to process this data at scheduled intervals using Airflow’s scheduling feature and then share the processed results with maintenance technicians. Airflow streamlines task orchestration and simplifies troubleshooting for data engineers, data warehouse engineers, and MLOps professionals.

![The image illustrates a data pipeline orchestration process, showing data collection from a factory, processing through IoT, and task management with three tasks.](https://kodekloud.com/kk-media/image/upload/v1752875030/notes-assets/images/Fundamentals-of-MLOps-Demo-Data-Pipeline-Orchestration/data-pipeline-orchestration-iot-tasks.jpg)

In the sections below, we break down each component of the pipeline including Docker image initialization, Airflow configuration, and the creation of DAGs for ETL operations.

---

## Setting Up the Airflow Environment

In our KodeKloud playground, we start by creating a working directory for our orchestration example and then initialize Airflow using its official Docker image.

### Create the Working Directory

Begin by creating and navigating to your project directory:

```
admin@docker-host:~$ mkdir example-orchestration
admin@docker-host:~$ cd example-orchestration/
admin@docker-host:~/example-orchestration$
```

### Download the Docker Compose File and Configure Folders

Download the required Docker Compose file and set up the necessary folder structure for DAGs, logs, plugins, and configuration:

```
admin@docker-host:~/example-orchestrations$ mkdir example-orchestration
admin@docker-host:~/example-orchestrations$ cd example-orchestration
admin@docker-host:~/example-orchestrations$ curl -LLo 'https://airflow.apache.org/docs/apache-airflow/2.10.2/docker-compose.yaml'
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
100 11342  100 11342    0 29307    0 --:-- --:-- --:-- 29307
admin@docker-host:~/example-orchestrations$ ls -lrt
total 12
-rw-r--r-- 1 admin admin 11342 Dec  8 07:09 docker-compose.yaml
admin@docker-host:~/example-orchestrations$ mkdir -p ./dags ./logs ./plugins ./config
admin@docker-host:~/example-orchestrations$ echo -e "AIRFLOW_UID=${id -u}" > .env
```

After configuring your environment, open the Docker Compose YAML file to review Airflow's settings. This file details the Airflow image, its environment variables, and services like Redis and Postgres.

> [!important]
> **Tip**
>
> Key components include setting the executor type, defining database connections, and mapping volumes for DAGs, logs, plugins, and configuration.

### Airflow Configuration Snippet

Below is a snippet from the Docker Compose file, highlighting the Airflow image and essential environment variables:

```
x-airflow-common:
  &airflow-common
  image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.10.2}
  environment:
    airflow-common-env:
      AIRFLOW_CORE_EXECUTOR: CeleryExecutor
      AIRFLOW_DATABASE_SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
      AIRFLOW_CELERY_RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
      AIRFLOW_CELERY_BROKER_URL: redis://redis:6379/0
      AIRFLOW_CORE_FERNET_KEY: ''
      AIRFLOW_CORE_DAGS_ARE_PAUSED_AT_CREATION: 'true'
      AIRFLOW_CORE_LOAD_EXAMPLES: 'true'
      AIRFLOW_API_AUTH_BACKENDS: 'airflow.api.auth.backend.basic_auth,airflow.api.auth.backend.session'
      AIRFLOW_SCHEDULER_ENABLE_HEALTH_CHECK: 'true'
      AIRFLOW_ADDITIONAL_REQUIREMENTS: ${_PIP_ADDITIONAL_REQUIREMENTS:-}
      AIRFLOW_CONFIG: '/opt/airflow/config/airflow.cfg'
  volumes:
    - ${AIRFLOW_PROJ_DIR:-/}:/dags/opt/airflow/dags
    - ${AIRFLOW_PROJ_DIR:-/}:/logs/opt/airflow/logs
    - ${AIRFLOW_PROJ_DIR:-/}:/config:/opt/airflow/config
    - ${AIRFLOW_PROJ_DIR:-/}:/plugins:/opt/airflow/plugins
  user: '${AIRFLOW_UID:-50000}:0'
  depends_on:
    &airflow-common-depends-on
    redis:
      condition: service_healthy
    postgres:
```

Additional services such as Redis, the Airflow web server, scheduler, and worker are defined similarly. For example, the Redis service is configured as follows:

```
redis:
  image: redis:7.2-bookworm
  expose:
    - 6379
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 10s
    timeout: 30s
    retries: 50
    start_period: 30s
    restart: always
```

And the Airflow web server exposes port 8080 (mapped to your local port 8081):

```
airflow-webserver:
  <<: *airflow-common
  command: webserver
  ports:
    - "8081:8080"
  healthcheck:
    test: ["CMD", "curl", "--fail", "http://localhost:8080/health"]
    interval: 30s
    timeout: 10s
    retries: 5
    start_period: 30s
    restart: always
  depends_on:
    <<: *airflow-common-depends-on
    airflow-init:
      condition: service_completed_successfully
```

### Initializing Airflow

After reviewing the configuration, initialize Airflow with the following commands:

```
admin@docker-host:~$ cd example-orchestration/
admin@docker-host:~/example-orchestration$ ls -lrt
total 12
-rw-rw-r-- 1 admin admin 11342 Dec  8 07:09 docker-compose.yaml
admin@docker-host:~/example-orchestration$ mkdir -p ./dags ./logs ./plugins ./config
admin@docker-host:~/example-orchestration$ echo -e "AIRFLOW_UID=${id -u}" > .env
admin@docker-host:~/example-orchestration$ vim docker-compose.yaml
admin@docker-host:~/example-orchestration$ docker compose up airflow-init
```

During initialization, Airflow downloads the necessary images and sets up database tables and user permissions. A successful initialization is indicated by a zero exit code in the logs.

Once initialization is complete, start all containers:

```
admin@docker-host:~/example-orchestration$ docker compose up
```

You'll observe that containers for Redis, Postgres, airflow-init, airflow-scheduler, airflow-webserver, airflow-worker, and airflow-triggerer are created and started. The appearance of the Airflow logo in the logs confirms that the service is running.

---

## Accessing the Airflow Web Interface

After starting the containers (which might take 5–10 minutes), open your browser and navigate to http://localhost:8081. You will see the Airflow web interface.

Log in using the credentials:

- Username: Airflow
- Password: Airflow

In the UI, you'll find a list of DAGs (ETL workflows). Most example DAGs are initially paused; simply toggle them to activate. For example, the interface may display a tutorial DAG along with associated code details.

![The image shows an Apache Airflow web interface displaying details of a DAG named "tutorial," including task summaries and DAG details.](https://kodekloud.com/kk-media/image/upload/v1752875032/notes-assets/images/Fundamentals-of-MLOps-Demo-Data-Pipeline-Orchestration/apache-airflow-tutorial-dag-interface.jpg)

Clicking a DAG’s code button reveals its underlying implementation, offering further insights into the orchestration process.

---

## Example: Bash Operator DAG

The following example demonstrates how to use the BashOperator to run Linux commands as part of an ETL workflow. This DAG, titled "example_bash_operator," schedules tasks using a cron expression and utilizes dummy tasks to represent workflow steps.

```
from __future__ import annotations


import datetime
import pendulum


from airflow.models import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.empty import EmptyOperator


with DAG(
    dag_id="example_bash_operator",
    schedule="0 0 * * *",
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    catchup=False,
    dag_timeout=datetime.timedelta(minutes=60),
    tags=["example", "example2"],
    params={"example_key": "example_value"},
) as dag:
    run_this_last = EmptyOperator(
        task_id="run_this_last",
    )


    # [START howto_operator_bash]
    run_this = BashOperator(
        task_id="run_after_loop",
        bash_command="echo https://airflow.apache.org/",
    )
    # [END howto_operator_bash]


    run_this >> run_this_last


    for i in range(3):
        task = BashOperator(
            task_id=f"run_{i}",
            bash_command='echo "{{ task_instance_key_str }}" && sleep 1',
        )
        task >> run_this
```

Switch to the “Graph” view in the Airflow UI to visually inspect the DAG execution. Each box in the graph represents an individual task and the arrows depict task dependencies. Checking individual task logs can help diagnose any issues during execution.

![The image shows an Apache Airflow interface displaying a Directed Acyclic Graph (DAG) named "example_bash_operator," with various tasks like "runme_0," "runme_1," and "this_will_skip" visualized in a flowchart format.](https://kodekloud.com/kk-media/image/upload/v1752875033/notes-assets/images/Fundamentals-of-MLOps-Demo-Data-Pipeline-Orchestration/apache-airflow-dag-example-bash-operator.jpg)

---

## Creating a Custom IoT Data Pipeline DAG

In this section, you will create a custom DAG that simulates an IoT data pipeline. The DAG will perform three main functions:

1.  Generate random IoT data.
2.  Aggregate the collected data.
3.  (Optionally) Send an email with the aggregated results.

### Create the DAG File

Open a new file named `iot_dag.py` within the `dags` folder:

```
cd dags/
vim iot_dag.py
```

Paste the following code into `iot_dag.py`:

```
from airflow import DAG
from airflow.operators.dummy import DummyOperator
from airflow.operators.python import PythonOperator
from airflow.operators.email import EmailOperator
from airflow.utils.dates import days_ago
import random
import time
import datetime


# Function to generate random IoT data
def generate_iot_data(**kwargs):
    data = []
    for _ in range(60):  # 60 readings (1 per second) over one minute
        data.append(random.choice([0, 1]))
        time.sleep(1)  # simulate a 1-second interval
    return data


# Function to aggregate the IoT data
def aggregate_machine_data(**kwargs):
    ti = kwargs['ti']
    data = ti.xcom_pull(task_ids='getting_iot_data')
    count_0 = data.count(0)
    count_1 = data.count(1)
    aggregated_data = {'count_0': count_0, 'count_1': count_1}
    return aggregated_data


# Email content generation
def create_email_content(**kwargs):
    ti = kwargs['ti']
    aggregated_data = ti.xcom_pull(task_ids='aggregate_machine_data')
    return (f"Aggregated IoT Data:\n"
            f"Count of 0: {aggregated_data['count_0']}\n"
            f"Count of 1: {aggregated_data['count_1']}")


# Default arguments for the DAG
default_args = {
    'owner': 'airflow',
    'start_date': days_ago(1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
}


with DAG(
    dag_id='iot_data_pipeline',
    default_args=default_args,
    schedule_interval=None,
    catchup=False,
) as dag:


    start_task = DummyOperator(task_id='start_task')


    getting_iot_data = PythonOperator(
        task_id='getting_iot_data',
        python_callable=generate_iot_data,
    )


    aggregate_machine_data = PythonOperator(
        task_id='aggregate_machine_data',
        python_callable=aggregate_machine_data,
    )


    # Optionally, use an EmailOperator to send the results
    send_email = EmailOperator(
        task_id='send_email',
        to='technician@example.com',
        subject='IoT Data Aggregation Results',
        html_content=create_email_content(),
    )


    end_task = DummyOperator(task_id='end_task')


    # Define the task dependencies
    start_task >> getting_iot_data >> aggregate_machine_data >> send_email >> end_task
```

Save the file. Airflow automatically detects new DAG definitions in the `dags` folder, and the "iot_data_pipeline" DAG will appear in the Airflow UI.

---

## Running and Monitoring the DAG

To run your new DAG:

1.  Unpause "iot_data_pipeline" in the Airflow UI.
2.  Trigger a manual run by clicking the run button.

The DAG executes the following tasks sequentially:

1.  **start_task**: Indicates the workflow start.
2.  **getting_iot_data**: Generates simulated IoT data.
3.  **aggregate_machine_data**: Aggregates the collected data.
4.  **send_email**: (Optional) Sends an email with the aggregated results.
5.  **end_task**: Marks the end of the pipeline.

Monitor the current state of each task (running, success, or failure) via the real-time UI. For detailed insights, click on a running task (e.g., "getting_iot_data") and check the logs.

![The image shows an Apache Airflow interface displaying a DAG named "iot_data_pipeline" with tasks in various states, including "start_task," "getting_iot_data," "aggregate_machine_data," and "end_task." The "getting_iot_data" task is currently running.](https://kodekloud.com/kk-media/image/upload/v1752875034/notes-assets/images/Fundamentals-of-MLOps-Demo-Data-Pipeline-Orchestration/apache-airflow-iot-data-pipeline.jpg)

After execution, the aggregated data might show, for example, 38 instances of “0” and 22 instances of “1”. In real-world applications, these counts could represent metrics such as successful operations versus machine errors, thereby aiding maintenance engineers in troubleshooting issues.

> [!important]
> **Extendability**
>
> This pipeline can be extended to write data to databases or data lakes, depending on your application needs.

---

## Conclusion

This lesson demonstrated how Apache Airflow simplifies the scheduling and orchestration of complex ETL workflows, replacing multiple cron jobs with a single, manageable system. With Airflow, you can efficiently set up pipelines to collect, process, and analyze data from IoT devices with minimal effort.

Thank you for following along, and happy orchestrating!

For more detailed information on Apache Airflow and data orchestration, consider visiting the [Apache Airflow Documentation](https://airflow.apache.org/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/d72a3430-8b54-48d6-89ad-6a5f8b74f4ab/lesson/6b5a2362-363e-4cfb-b2ed-ea65bce01abb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/d72a3430-8b54-48d6-89ad-6a5f8b74f4ab/lesson/32cb866e-8452-4f35-9ede-3a79cd78100a)**
>
> Practice lab
