# Prometheus Monitoring Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Observability/Prometheus-Monitoring-Containers)

---

## Table of Contents

- Prometheus Monitoring Containers
  - Enabling Docker Engine Metrics
  - Monitoring Container Metrics with cAdvisor
  - Docker vs. cAdvisor Metrics
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Observability

# Prometheus Monitoring Containers

In this lesson, you will learn how to extend Prometheus monitoring from Linux hosts to containerized environments. By collecting metrics from both the Docker engine and individual containers using cAdvisor, you can gain comprehensive insights into your system’s performance.

![The image illustrates container metrics collection using cAdvisor, highlighting metrics from containerized environments and Docker Engine, with a diagram of servers and containers.](https://kodekloud.com/kk-media/image/upload/v1752880542/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Containers/frame_30.jpg)

## Enabling Docker Engine Metrics

To collect metrics from your Docker engine, perform the following steps on your Docker host:

1.  Open or create the `/etc/docker/daemon.json` file and add the configuration below. This configuration exposes the Docker metrics endpoint and enables experimental features.

    ```
    {
      "metrics-addr": "127.0.0.1:9323",
      "experimental": true
    }
    ```

2.  Restart the Docker service to apply the changes:

    ```
    $ sudo systemctl restart docker
    ```

3.  Verify that the Docker metrics endpoint is accessible by running:

    ```
    $ curl localhost:9323/metrics
    ```

> [!important]
> **Tip**
>
> Ensure that the experimental flag is enabled to properly expose Docker engine metrics.

Once you have verified the endpoint, update your Prometheus configuration to scrape Docker engine metrics. For example:

```
scrape_configs:
  - job_name: "docker"
    static_configs:
      - targets: ["12.1.13.4:9323"]
```

Replace `12.1.13.4` with the actual IP address of your Docker host.

## Monitoring Container Metrics with cAdvisor

cAdvisor is a powerful tool for collecting container-specific metrics, including CPU usage, memory consumption, process counts, and uptime.

To deploy cAdvisor, follow these steps:

1.  Create a Docker Compose file (e.g., `docker-compose.yml`) with the content below. This configuration is based on the official cAdvisor documentation:

    ```
    version: '3.4'
    services:
      cadvisor:
        image: gcr.io/cadvisor/cadvisor
        container_name: cadvisor
        privileged: true
        devices:
          - "/dev/kmsg:/dev/kmsg"
        volumes:
          - /:/rootfs:ro
          - /var/run:/var/run:ro
          - /sys:/sys:ro
          - /var/lib/docker:/var/lib/docker:ro
          - /dev/disk:/dev/disk:ro
        ports:
          - 8080:8080
    ```

2.  Start the cAdvisor service using Docker Compose:

    ```
    $ docker-compose up -d
    ```

3.  Verify that cAdvisor is collecting metrics by accessing its endpoint:

    ```
    $ curl localhost:8080/metrics
    ```

After confirming the metrics are available, update your Prometheus configuration to add a new job for scraping cAdvisor metrics:

```
scrape_configs:
  - job_name: "cAdvisor"
    static_configs:
      - targets: ["12.1.13.4:8080"]
```

Replace `12.1.13.4` with the IP address where cAdvisor is running.

![The image compares Docker Engine metrics and cAdvisor metrics, highlighting differences in CPU usage, container-specific metrics, and process monitoring.](https://kodekloud.com/kk-media/image/upload/v1752880543/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Containers/frame_180.jpg)

## Docker vs. cAdvisor Metrics

Understanding the difference between Docker engine metrics and cAdvisor metrics is important for effective monitoring:

- **Docker Engine Metrics:**  
  These metrics provide information about the overall Docker engine performance, such as:
  - Overall CPU usage of the Docker engine.
  - Counts of failed image builds.
  - Time taken to process container actions.  
    They are ideal for monitoring the overall health of the Docker engine but do not offer detailed per-container insights.

- **cAdvisor Metrics:**  
  cAdvisor provides granular metrics for each container including:
  - CPU and memory usage.
  - Number of processes running inside a container.
  - Container uptime.  
    Use cAdvisor metrics when you require detailed, container-specific performance data.

> [!important]
> **Summary**
>
> Use Docker engine metrics for a holistic view of your host's performance and cAdvisor for in-depth analysis of each container. Adjust your Prometheus configuration accordingly to ensure efficient monitoring.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/70e17eea-7e9b-4f65-87a4-1cdb5631e0dc/lesson/2318384c-8892-4c7a-869c-ee002e33ed3e)**
>
> Watch video content
