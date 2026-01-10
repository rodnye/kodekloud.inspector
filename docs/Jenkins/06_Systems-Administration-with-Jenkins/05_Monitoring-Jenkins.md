# Monitoring Jenkins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Systems-Administration-with-Jenkins/Monitoring-Jenkins)

---

## Table of Contents

- Monitoring Jenkins
  - Overview of Available Monitoring Plugins
  - Installing the Prometheus Plugin
  - Integrating Jenkins with Prometheus
  - Conclusion
  - Watch Video

---

## Content

Jenkins

Systems Administration with Jenkins

# Monitoring Jenkins

In this guide, we explain how to monitor Jenkins using various plugins and integrate Jenkins metrics with Prometheus. Organizations can choose from several monitoring solutions such as Datadog, Prometheus with Grafana, and Java Melody. This article focuses on leveraging the Prometheus plugin for Jenkins monitoring.

![The image shows a Jenkins documentation page focused on "Monitoring Jenkins," including sections on Datadog and Prometheus integration, with a user handbook and system administration links.](https://kodekloud.com/kk-media/image/upload/v1752880145/notes-assets/images/Jenkins-Monitoring-Jenkins/frame_20.jpg)

## Overview of Available Monitoring Plugins

Jenkins provides a range of monitoring plugins to fit different requirements:

- **Datadog Monitoring:** Several plugins are available to integrate Jenkins with Datadog.
- **Prometheus and Grafana Monitoring:** A dedicated plugin makes it easy to export and visualize metrics.
- **Java Melody Monitoring:** Additional plugins support detailed application monitoring.

To view these plugins:

1.  Log into your Jenkins dashboard.
2.  Navigate to **Manage Jenkins** > **Manage Plugins**.
3.  Click on the **Available** tab and search for "Monitoring".

As you browse the search results, you may notice plugins such as:

- **Prometheus Metrics:** Scroll down for details.
- **Dynatrace:**> [!important]
  > **Warning**
  >
  > This plugin appears outdated and may have security issues.

![The image shows a list of software plugins with descriptions, versions, and warnings about security issues, specifically highlighting a missing permission check for one plugin.](https://kodekloud.com/kk-media/image/upload/v1752880146/notes-assets/images/Jenkins-Monitoring-Jenkins/frame_70.jpg)

For example, a search for Datadog will display the available Datadog plugin:

![The image shows a plugin installation interface for Datadog, displaying available plugins with options to install, including version details and release dates.](https://kodekloud.com/kk-media/image/upload/v1752880147/notes-assets/images/Jenkins-Monitoring-Jenkins/frame_80.jpg)

In this tutorial, we will use the Prometheus plugin.

## Installing the Prometheus Plugin

To install the Prometheus plugin:

1.  Select the Prometheus plugin from the list.
2.  Click **Install Without Restart**.

![The image shows a list of Jenkins plugins with descriptions, versions, and update information, including "pipeline," "Build With Parameters," and "Prometheus metrics."](https://kodekloud.com/kk-media/image/upload/v1752880149/notes-assets/images/Jenkins-Monitoring-Jenkins/frame_90.jpg)

After starting the installation, you will see the progress. Note that the Prometheus plugin, like some other plugins, might require a Jenkins restart to work completely.

> [!important]
> **Restart Jenkins**
>
> After installation, open your terminal and run the following command to restart Jenkins:
>
> sudo systemctl restart jenkins

Allow Jenkins some time to restart. Once restarted, log in again. Then, navigate to the plugin's documentation to review the default environment variables and understand how Jenkins exposes metrics at the `/prometheus` endpoint.

![The image shows the Jenkins Prometheus Metrics Plugin page, detailing its purpose, metrics exposed, and environment variables, with links to documentation and related resources.](https://kodekloud.com/kk-media/image/upload/v1752880150/notes-assets/images/Jenkins-Monitoring-Jenkins/frame_160.jpg)

## Integrating Jenkins with Prometheus

After setting up your Prometheus server (for instance, on Azure), configure it to scrape metrics from Jenkins. Follow these steps:

1.  **SSH into your Prometheus server** and open the configuration file:

    mike@prometheus01:~$ sudo vi /etc/prometheus/prometheus.yml

2.  **Update the configuration** by modifying the "targets" section. Remove any unnecessary comments and paste the following snippet:

    ```
    scrape_interval: 15s  # Scrape every 15 seconds. Default is every 1 minute.
    evaluation_interval: 15s  # Evaluate rules every 15 seconds. Default is every 1 minute.


    # Alertmanager configuration
    alerting:
      alertmanagers:
      - static_configs:
        - targets:
          - alertmanager:9093


    # Load rules periodically based on 'evaluation_interval'.
    rule_files:
      # - "first_rules.yml"
      # - "second_rules.yml"


    scrape_configs:
      # Scraping Prometheus itself.
      - job_name: 'prometheus'
        static_configs:
        - targets: ['localhost:9090']
      # Scraping Jenkins metrics.
      - job_name: 'Jenkins'
        metrics_path: '/prometheus'
        static_configs:
        - targets: ['52.146.45.251:8080']
    ```

    Replace the IP address and port in the `targets` field with your actual Jenkins server details.

3.  **Restart Prometheus** to apply the new configuration:

    ```
    mike@prometheus01:~$ sudo systemctl restart prometheus
    mike@prometheus01:~$ systemctl status prometheus
    ```

    When successful, you should see output similar to:

    ```
    ● prometheus.service - Prometheus Time Series Collection and Processing Server
       Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
       Active: active (running) since Tue 2022-01-04 18:56:47 UTC; 5s ago
     Main PID: 3431 (prometheus)
        Tasks: 7 (limit: 2298)
       Memory: 59.6M
       CGroup: /system.slice/prometheus.service
               └─3431 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus
    ```

Once Prometheus restarts, check the dashboard to confirm that it is successfully scraping Jenkins logs and metrics.

## Conclusion

This guide covers the essentials of monitoring Jenkins by installing the Prometheus plugin and integrating it with a Prometheus server. For further details and resources, consider exploring the following links:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Prometheus Documentation](https://prometheus.io/docs/)

> [!important]
> **Next Steps**
>
> Practice the setup in your development environment to gain hands-on experience with Jenkins monitoring and Prometheus integration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/22de6dac-d594-40dc-a3fb-1cc8d20b8a61/lesson/2f4991ca-76a6-4845-95ba-43ca90bb361e)**
>
> Watch video content
