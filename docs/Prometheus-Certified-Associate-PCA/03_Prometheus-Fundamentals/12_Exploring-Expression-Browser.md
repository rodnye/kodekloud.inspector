# Exploring Expression Browser - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Exploring-Expression-Browser)

---

## Table of Contents

- Exploring Expression Browser
  - Accessing the Expression Browser
  - Querying for Metrics
  - Graphical Data Visualization
  - Viewing Prometheus Server Configuration
  - Summary
  - Watch Video
    - Checking Target Status with the "up" Metric
    - Exploring CPU Metrics

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Exploring Expression Browser

In this lesson, you'll learn how to navigate and utilize the Expression Browser—a handy web interface for your Prometheus server that allows you to query and visualize metrics data effectively.

## Accessing the Expression Browser

Begin by opening your web browser and entering the IP address of your Prometheus server. For example, if your Prometheus server is running locally on the default port 9090, simply navigate to:

http://localhost:9090

Once loaded, you'll see the Expression Browser interface. The primary component is the expression input field where you can type in your Prometheus queries.

## Querying for Metrics

### Checking Target Status with the "up" Metric

A common query in Prometheus is the `up` metric. This metric indicates whether your targets are online (1) or offline (0). When you enter the query:

```
up
```

and click execute, you'll receive a list of timeseries with associated labels. For example:

```
up{instance="192.168.1.168:9100", job="node"}
up{instance="192.168.21.43:80", job="ec2"}
up{instance="192.168.40.248:80", job="ec2"}
up{instance="localhost:9090", job="prometheus"}
```

On the right side, the current metric values will appear:

```
up{instance="192.168.1.168:9100", job="node"} 1
up{instance="192.168.21.43:80", job="ec2"} 0
up{instance="192.168.40.248:80", job="ec2"} 0
up{instance="localhost:9090", job="prometheus"} 1
```

> [!important]
> **Note**
>
> A value of 1 means the target is running, while 0 indicates that it is down.

### Exploring CPU Metrics

You can also query for more advanced metrics such as `node_cpu_seconds_total` to monitor CPU usage. Running this query returns a series of values grouped by different CPU modes:

```
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="idle"}
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="iowait"}
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="irq"}
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="nice"}
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="softirq"}
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="steal"}
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="system"}
node_cpu_seconds_total{instance="192.168.1.168:9100", job="node", mode="user"}
```

![The image shows a Prometheus web interface displaying CPU usage metrics for a specific instance, with various modes like idle, iowait, and user. The data is presented in a table format with corresponding values for each mode.](https://kodekloud.com/kk-media/image/upload/v1752883053/notes-assets/images/Prometheus-Certified-Associate-PCA-Exploring-Expression-Browser/prometheus-cpu-usage-metrics-table.jpg)

This table details the different CPU modes tracked by Prometheus along with their current values. Additionally, the Expression Browser provides an evaluation time option that lets you view historical data by selecting a specific date and time.

## Graphical Data Visualization

The Expression Browser also offers a graphing feature to help you visualize your monitoring data. By entering a metric and adjusting chart parameters—such as the desired time range (for example, switching from a one-hour view to a 30-minute view)—you can observe the plotted trends for various timeseries. Even if some metrics have very low values, they will still be displayed on the graph.

![The image shows a Prometheus graph displaying CPU usage over time, with various metrics plotted, such as idle, iowait, and system. The graph is viewed in a Firefox web browser on a Linux operating system.](https://kodekloud.com/kk-media/image/upload/v1752883054/notes-assets/images/Prometheus-Certified-Associate-PCA-Exploring-Expression-Browser/prometheus-cpu-usage-graph-firefox.jpg)

## Viewing Prometheus Server Configuration

Another valuable feature of the Expression Browser is the ability to inspect your Prometheus server's configuration. By selecting the configuration option, you can view global parameters, alerting configurations, scrape configurations, and more. For example, your current configuration might resemble the following:

```
global:
  scrape_interval: 15s
  evaluation_interval: 15s
alerting:
  alertmanagers:
    - follow_redirects: true
      enable_http2: true
      scheme: http
      timeout: 10s
      api_version: v2
      static_configs:
        - targets: []
scrape_configs:
  - job_name: prometheus
    honor_timestamps: true
    scrape_interval: 15s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    enable_http2: true
    static_configs:
      - targets:
          - localhost:9090
  - job_name: node
    honor_timestamps: true
    scrape_interval: 15s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    enable_http2: true
    static_configs:
      - targets:
          - 192.168.1.168:9100
  - job_name: ec2
    scrape_interval: 15s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    enable_http2: true
    static_configs:
      - targets: []
```

The configuration file lists all the target endpoints along with their statuses (up or down). You also have the option to view the alert rules and navigate to the alerts page for a list of active alerts.

![The image shows a Prometheus monitoring dashboard displaying the status of various targets, with some endpoints marked as "DOWN" and others as "UP." It includes details like endpoint URLs, labels, last scrape times, and errors.](https://kodekloud.com/kk-media/image/upload/v1752883055/notes-assets/images/Prometheus-Certified-Associate-PCA-Exploring-Expression-Browser/prometheus-monitoring-dashboard-status.jpg)

> [!important]
> **Tip**
>
> For an enhanced monitoring experience, consider integrating Grafana with Prometheus to build custom dashboards with improved visualization and more interactive data exploration features.

## Summary

The Expression Browser is a powerful tool for executing Prometheus queries and accessing detailed metrics data instantly. Whether you are troubleshooting your environment or performing a quick system check, this tool plays a critical role in your monitoring setup. For more comprehensive dashboards, you can seamlessly integrate tools like Grafana.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/db6382d4-909e-4c31-b246-2e085817c553)**
>
> Watch video content
