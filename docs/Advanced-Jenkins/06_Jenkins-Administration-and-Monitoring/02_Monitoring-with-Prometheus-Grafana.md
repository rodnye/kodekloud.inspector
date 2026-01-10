# Monitoring with Prometheus Grafana - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Jenkins-Administration-and-Monitoring/Monitoring-with-Prometheus-Grafana)

---

## Table of Contents

- Monitoring with Prometheus Grafana
  - 1. Install and Configure the Prometheus Metrics Plugin in Jenkins
  - 2. Deploy Prometheus and Grafana using Docker Compose
  - 3. Configure Prometheus to Scrape Jenkins
  - 4. Launch the Monitoring Stack
  - 5. Verify Jenkins Target in Prometheus
  - 6. Explore Jenkins Metrics with Prometheus
  - 7. Add Prometheus Data Source in Grafana
  - 8. Import a Jenkins Dashboard in Grafana
  - 9. Generate Build Activity in Jenkins
  - 10. Visualize Real-Time Metrics in Grafana
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Jenkins Administration and Monitoring

# Monitoring with Prometheus Grafana

In this guide, you’ll learn how to monitor Jenkins using Prometheus and Grafana for full visibility into build activity, resource utilization, and system health. We’ll cover:

- Installing the **Prometheus Metrics** plugin in Jenkins
- Deploying Prometheus and Grafana with Docker Compose
- Scraping Jenkins metrics and querying them in Prometheus
- Visualizing data in Grafana dashboards
- Generating load in Jenkins to see real-time updates

This end-to-end solution provides a scalable observability layer for your CI/CD pipelines.

---

## 1\. Install and Configure the Prometheus Metrics Plugin in Jenkins

Jenkins exposes its internal metrics through the [Prometheus Metrics plugin](https://plugins.jenkins.io/prometheus/). By default, the metrics endpoint is available at `/prometheus`.

![The image shows a webpage for the Jenkins Prometheus Metrics Plugin, detailing its features, version, installation statistics, and links for further information.](https://kodekloud.com/kk-media/image/upload/v1752868866/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-prometheus-metrics-plugin.jpg)

1.  Navigate to **Manage Jenkins → Manage Plugins**.
2.  In the **Available** tab, search for and install **Prometheus Metrics Plugin**.
3.  Restart Jenkins when prompted.

![The image shows a Jenkins interface displaying available plugins related to Prometheus metrics, with options to install them.](https://kodekloud.com/kk-media/image/upload/v1752868867/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-prometheus-plugins-interface.jpg)  
![The image shows a Jenkins interface displaying the download progress of plugins, with some tasks marked as successful and a note indicating that a restart is needed for changes to take effect.](https://kodekloud.com/kk-media/image/upload/v1752868868/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-plugin-download-progress.jpg)

After the restart:

1.  Go to **Manage Jenkins → Configure System** and search for **Prometheus**.
2.  Set **Metrics collection interval** to **10 seconds** (default is 120s).
3.  Disable **Disk Usage** if you haven’t installed the [CloudBees Disk Usage plugin](https://plugins.jenkins.io/disk-usage/).
4.  Leave other options at their defaults and note the endpoint path: `/prometheus`.

> [!important]
> **Note**
>
> Disabling Disk Usage metrics avoids extra overhead if you’re not using the CloudBees plugin.

![The image shows a Jenkins configuration page for Prometheus metrics, with options for enabling authentication, setting metrics collection intervals, and counting build durations. Various checkboxes are selected for different build metrics.](https://kodekloud.com/kk-media/image/upload/v1752868869/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-prometheus-metrics-configuration.jpg)  
![The image shows a Jenkins configuration page with various options for managing metrics, including settings for job attributes, disk usage, and node status.](https://kodekloud.com/kk-media/image/upload/v1752868870/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-configuration-metrics-settings.jpg)

---

## 2\. Deploy Prometheus and Grafana using Docker Compose

Create a `docker-compose.yml` in your project root to launch Prometheus (port 9090) and Grafana (port 8081):

```
version: '3.7'


services:
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus:/etc/prometheus
      - prom_data:/prometheus
    restart: unless-stopped


  grafana:
    image: grafana/grafana
    container_name: grafana
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: password
    volumes:
      - ./grafana:/etc/grafana/provisioning/datasources
    ports:
      - "8081:3000"
    restart: unless-stopped


volumes:
  prom_data:
```

> [!important]
> **Warning**
>
> The default Grafana credentials are **admin/password**. Change them in production by setting `GF_SECURITY_ADMIN_USER` and `GF_SECURITY_ADMIN_PASSWORD` to secure values.

Once Jenkins is up, verify that Prometheus can scrape its metrics:

```
# HELP jvm_memory_bytes Committed (bytes) of a given JVM memory area.
# TYPE jvm_memory_bytes gauge
jvm_memory_bytes{area="heap"} 1.056188896E7
jvm_memory_bytes_used{area="heap"} 1.183386848E7
...
```

---

## 3\. Configure Prometheus to Scrape Jenkins

Edit `prometheus/prometheus.yml` to add a `jenkins` job:

```
global:
  scrape_interval: 15s


scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: jenkins
    metrics_path: /prometheus/
    static_configs:
      - targets: ["<JENKINS_HOST>:<JENKINS_PORT>"]
```

Replace `<JENKINS_HOST>:<JENKINS_PORT>` with your Jenkins URL (e.g., `jenkins.example.com:8080`).

---

## 4\. Launch the Monitoring Stack

```
docker-compose up -d
```

This command starts both Prometheus and Grafana in the background.

---

## 5\. Verify Jenkins Target in Prometheus

Open `http://<VM_IP>:9090`, then go to **Status → Targets**. You should see both **prometheus** and **jenkins** targets listed as `UP`.

![The image shows a Prometheus monitoring dashboard displaying the status of two targets, "jenkins" and "prometheus," both of which are up and running. It includes details like endpoints, state, labels, last scrape time, and scrape duration.](https://kodekloud.com/kk-media/image/upload/v1752868872/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/prometheus-monitoring-dashboard-jenkins.jpg)

---

## 6\. Explore Jenkins Metrics with Prometheus

Use **Prometheus → Graph** to run queries. For example:

| Metric                           | Description                         | Query                        |
| -------------------------------- | ----------------------------------- | ---------------------------- |
| jenkins\\\_job\\\_count\\\_value | Total number of Jenkins jobs        | `jenkins_job_count_value`    |
| jenkins\\\_plugins\\\_active     | Count of active plugins             | `jenkins_plugins_active`     |
| jenkins\\\_plugins\\\_withUpdate | Plugins that have updates available | `jenkins_plugins_withUpdate` |

1.  Type `jenkins_` in the **Expression** field to see available metrics.

![The image shows a Prometheus interface with a query input field where "jenkins_" is typed, displaying a dropdown list of Jenkins-related metrics.](https://kodekloud.com/kk-media/image/upload/v1752868873/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/prometheus-jenkins-query-interface.jpg)

2.  Plot a metric over time:

```
jenkins_job_count_value
```

![The image shows a Prometheus dashboard with a graph displaying data for the metric "jenkins_job_count_value" over a one-hour period. The interface includes options for adjusting the time range and resolution.](https://kodekloud.com/kk-media/image/upload/v1752868874/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/prometheus-dashboard-jenkins-job-count.jpg)

---

## 7\. Add Prometheus Data Source in Grafana

1.  Visit `http://<VM_IP>:8081` and log in (`admin`/`password`).
2.  Go to **Configuration → Data Sources → Add data source → Prometheus**.
3.  Set **URL** to `http://prometheus:9090` (or your host URL).
4.  Click **Save & Test**.

![The image shows a configuration screen for setting up a Prometheus data source in a web application, with fields for the server URL and authentication methods. The interface includes navigation options on the left side.](https://kodekloud.com/kk-media/image/upload/v1752868875/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/prometheus-data-source-configuration.jpg)

---

## 8\. Import a Jenkins Dashboard in Grafana

Grafana’s dashboard repository includes prebuilt Jenkins dashboards. We’ll import **Jenkins Performance & Health Overview (ID 9964)**:

1.  In Grafana, click **Create → Import**.
2.  Enter **9964** and click **Load**.
3.  Select your **Jenkins-Prometheus** data source and click **Import**.

![The image shows a Grafana interface displaying a data source connection to "Jenkins-Prometheus" with options to build a dashboard or explore.](https://kodekloud.com/kk-media/image/upload/v1752868876/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/grafana-jenkins-prometheus-dashboard.jpg)  
![The image shows a Grafana dashboard for Jenkins, displaying performance and health metrics such as job queue speeds, memory usage, and executor availability. It includes various graphs and statistics, with options to download or import the dashboard.](https://kodekloud.com/kk-media/image/upload/v1752868878/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/grafana-jenkins-dashboard-metrics.jpg)

---

## 9\. Generate Build Activity in Jenkins

To populate your dashboards with data, create a simple Pipeline that sleeps and echoes:

1.  In Jenkins, click **New Item → Pipeline**, name it **monitor-jenkins**, then **OK**.
2.  Under **Pipeline → Definition**, choose **Pipeline script** and paste:

    ```
    node {
      stage('Echo Message') {
        sh 'sleep 25'
      }
    }


    node('ubuntu-docker-jdk17-node20') {
      stage('Echo Message2') {
        sh 'echo 1'
      }
    }
    ```

3.  Save and run **Build Now** ~20 times.

![The image shows a Jenkins dashboard with a pipeline view, displaying the status of several build stages. The sidebar includes options like "Build Now," "Configure," and "Open Blue Ocean."](https://kodekloud.com/kk-media/image/upload/v1752868879/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-dashboard-pipeline-view.jpg)

---

## 10\. Visualize Real-Time Metrics in Grafana

After a few minutes, refresh your Grafana dashboard. You’ll see metrics for queue rate, processing speed, executor usage, and more updating live.

![The image shows a Jenkins performance and health overview dashboard with various metrics like processing speed, job queue duration, and memory usage. A time range selection menu is open, displaying options for different time intervals.](https://kodekloud.com/kk-media/image/upload/v1752868880/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-performance-health-dashboard-2.jpg)

Customize panels by clicking a panel title and selecting **Edit**. You can switch graph types, adjust legends, or add thresholds.

![The image shows a Jenkins performance and health overview dashboard with metrics like memory usage, CPU usage, and job statistics. Various sections display data such as JVM free memory, Jenkins health, and executor status.](https://kodekloud.com/kk-media/image/upload/v1752868881/notes-assets/images/Advanced-Jenkins-Monitoring-with-Prometheus-Grafana/jenkins-performance-health-dashboard.jpg)

---

You’ve successfully set up a robust monitoring stack for Jenkins using Prometheus and Grafana. With this integration, you gain deep insights into build performance, system health, and resource trends. Explore additional dashboards, custom PromQL alerts, and Grafana panels to tailor your CI/CD observability.

---

## Links and References

- [Prometheus Metrics Plugin for Jenkins](https://plugins.jenkins.io/prometheus/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Grafana Dashboards Repository](https://grafana.com/grafana/dashboards/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Prometheus Documentation](https://prometheus.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/fe8b8755-ab0a-429d-ac8c-a7763f723359/lesson/38c29145-23ba-4230-aee1-cefe9984deb4)**
>
> Watch video content
