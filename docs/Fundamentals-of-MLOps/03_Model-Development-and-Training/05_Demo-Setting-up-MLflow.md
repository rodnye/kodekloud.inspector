# Demo Setting up MLflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Model-Development-and-Training/Demo-Setting-up-MLflow)

---

## Table of Contents

- Demo Setting up MLflow
  - Step 1: Install MLflow
  - Step 2: Start the MLflow Server
  - Step 3: Explore the MLflow UI
  - Conclusion
  - Watch Video

---

## Content

Fundamentals of MLOps

Model Development and Training

# Demo Setting up MLflow

Welcome to this comprehensive guide on setting up an MLflow server for your local development environment using Visual Studio Code. Follow along step-by-step with your terminal while you watch the terminal pane in VS Code similar to the demonstration below.

## Step 1: Install MLflow

MLflow is available as a package on PyPI. To install MLflow, run the following command in your terminal:

```
pip install mlflow
```

Upon executing this command, you should observe output similar to the example below:

```
Requirement already satisfied: scipy>=2 in /home/codespace/.local/lib/python3.12/site-packages (from mlflow) (1.14.1)
Collecting sqlalchemy<3,>=1.4.0 (from mlflow)
Downloading SQLAlchemy-2.0.36-cp312-cp312-manylinux2014_x86_64.whl.metadata (9.7 kB)
Collecting gunicorn<24 (from mlflow)
Downloading gunicorn-23.0.0-py3-none-any.whl.metadata (4.4 kB)
Collecting click<9,>=7.0 (from mlflow)
Downloading click-8.1.3-py3-none-any.whl.metadata (0.7 kB)
Collecting cloudpickle<2,>=1.3 (from mlflow)
Downloading cloudpickle-2.1.0-py3-none-any.whl.metadata (7.2 kB)
Collecting databricks-sdk<0.8,>=0.7 (from mlflow)
Requirement already satisfied: gitpython>=3.1.0 in /home/codespace/.local/lib/python3.12/site-packages (from mlflow) (3.1.43)
Collecting importlib-metadata<5.0,>=1.0 (from mlflow)
Downloading importlib_metadata-4.13.0-py3-none-any.whl (20 kB)
Collecting opentelemetry-api<1.0,>=0.26b (from mlflow)
Downloading opentelemetry_api-1.17.2-py3-none-any.whl (24.1 kB)
Collecting opentelemetry-sdk<1.17,>=1.14 (from mlflow)
Downloading opentelemetry_sdk-1.17.2-py3-none-any.whl (6.0.2)
Requirement already satisfied: protobuf<=5.0.0,>=3.15.0 in /home/codespace/.local/lib/python3.12/site-packages (from mlflow) (5.3.0)
Collecting sparselib<0.4,>=0.3 (from mlflow)
Downloading Mako-1.2.4-py3-none-any.whl (36 kB)
```

Additionally, you may encounter more package download messages, like in the output below:

```
Downloading blinker-1.8.2-py3-none-any.whl (9.5 kB)
Downloading cachetools-5.5.0-py3-none-any.whl (9.5 kB)
Downloading click-8.1.7-py3-none-any.whl (97 kB)
Downloading cloudpickle-2.1.0-py3-none-any.whl (22 kB)
Downloading databricks-sdk-0.6.0-py3-none-any.whl (569 kB)
Downloading graphlib_core-3.2.5-py3-none-any.whl (16 kB)
Downloading graphql-relay-3.2.0-py3-none-any.whl (613 kB)
Downloading greenlet-1.1.3-cp312-cp312-manylinux_2_28_x86_64.whl (88 kB)
Downloading idna-3.4-py3-none-any.whl (64 kB)
Downloading isthetag-2.2.0-py3-none-any.whl (116 kB)
Downloading opentelemetry-api-1.20.0-py3-none-any.whl (149 kB)
Downloading opentelemetry-sdk-1.20.0-py3-none-any.whl (316 kB)
Downloading werkzeug-2.2.3-py3-none-any.whl (232 kB)
Downloading deprecated-2.14.0-py3-none-any.whl (12 kB)
Downloading pyasn1_modules-0.2.8-py3-none-any.whl (83 kB)
Downloading pyjwt-2.4.0-py3-none-any.whl (18 kB)
Downloading marshmallow-3.19.1-py3-none-any.whl (43 kB)
Downloading markupsafe-2.1.1-cp39-cp39-manylinux_2_10_x86_64.whl (11 kB)
Downloading Markdown-3.4.3-py3-none-any.whl (97 kB)
Downloading Mako-1.1.5-py3-none-any.whl (64 kB)
Downloading werkzeug-2.2.2-py3-none-any.whl (228 kB)
Downloading requests-2.28.1-py3-none-any.whl (62 kB)
Downloading Flask-2.2.2-py3-none-any.whl (98 kB)
Downloading google-auth-2.16.1-py3-none-any.whl (171 kB)
Downloading google-auth-oauthlib-0.4.6-py3-none-any.whl (17 kB)
```

> [!important]
> **Tip**
>
> If the installation process prompts any errors, ensure that your pip version is up-to-date and you are using a supported version of Python.

## Step 2: Start the MLflow Server

Once the installation is complete, launch the MLflow UI by running:

```
mlflow ui
```

This command will start the MLflow server, which listens on the default port 5000. You should see terminal output that resembles this:

```
[2024-11-05 18:33:22 +0000] [7842] [INFO] Starting gunicorn 23.0.0
[2024-11-05 18:33:22 +0000] [7842] [INFO] Listening at: http://127.0.0.1:5000 (7842)
[2024-11-05 18:33:22 +0000] [7842] [INFO] Using worker: sync
[2024-11-05 18:33:22 +0000] [7848] [INFO] Booting worker with pid: 7848
[2024-11-05 18:33:22 +0000] [7862] [INFO] Booting worker with pid: 7862
[2024-11-05 18:33:22 +0000] [7863] [INFO] Booting worker with pid: 7863
[2024-11-05 18:33:22 +0000] [7864] [INFO] Booting worker with pid: 7864
```

> [!important]
> **Accessing MLflow**
>
> Click on the provided link or manually navigate to http://127.0.0.1:5000 in your browser to access the MLflow UI.

## Step 3: Explore the MLflow UI

When you open the MLflow UI in your browser, you will initially see a default experiment. If no experiments have been logged, the experiment section will appear empty.

![The image shows an MLflow interface with no logged runs in the "Experiments" section, displaying a message that no runs have been logged yet.](https://kodekloud.com/kk-media/image/upload/v1752875170/notes-assets/images/Fundamentals-of-MLOps-Demo-Setting-up-MLflow/mlflow-experiments-no-runs-logged.jpg)

The MLflow UI acts as a centralized hub where all experiments are recorded. Here, you can:

- Begin a new experiment with a custom name.
- View detailed logs and traces.
- Compare the performance of different runs.
- Access the dedicated models section, which serves as the MLflow model repository.

In this demonstration, MLflow version 2.17.2 was installed by default since no specific version was provided during installation.

![The image shows an MLflow interface with a "Registered Models" page, indicating no models are registered yet and offering an option to create a model.](https://kodekloud.com/kk-media/image/upload/v1752875171/notes-assets/images/Fundamentals-of-MLOps-Demo-Setting-up-MLflow/mlflow-registered-models-empty.jpg)

## Conclusion

This tutorial has demonstrated how to set up a basic MLflow service on a local system. This setup can also be applied to other environments such as virtual machines or Kubernetes clusters.

Thank you for following this guide. Stay tuned for more detailed tutorials on advanced MLflow functionalities and usage scenarios.

Happy experimenting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/898cf36a-be28-4be6-b6cf-c616c1a4798e/lesson/6cb31353-e706-4e2f-b304-557fd63a92d1)**
>
> Watch video content
