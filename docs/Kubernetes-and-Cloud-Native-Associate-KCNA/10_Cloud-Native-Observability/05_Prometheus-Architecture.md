# Prometheus Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Observability/Prometheus-Architecture)

---

## Table of Contents

- Prometheus Architecture
  - Core Components of the Prometheus Server
  - Exporters and Data Collection
  - Alerting
  - Querying Metrics with PromQL
  - Custom Metrics Collection
  - Pull-Based vs. Push-Based Collection Models
  - Conclusion
  - Watch Video
    - Data Retrieval Worker
    - Time Series Database
    - HTTP Server
    - Advantages of the Pull-Based Model

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Observability

# Prometheus Architecture

In this lesson, we explore the architecture of Prometheus, a powerful monitoring solution designed to collect, store, and query time series data. Prometheus is built around three core components: the data retrieval worker, the time series database, and the HTTP server.

## Core Components of the Prometheus Server

### Data Retrieval Worker

The data retrieval worker is responsible for gathering metrics from your targets. It does this by sending HTTP requests—typically to the `/metrics` endpoint—of your applications or systems. Once collected, these metrics are stored in the time series database, ready for analysis.

### Time Series Database

The time series database serves as a dedicated repository for the collected metrics. Optimized specifically for time series data, it enables efficient recording and rapid retrieval of metric information.

### HTTP Server

The HTTP server provides a query interface that allows users to access, visualize, and analyze stored metrics. By leveraging PromQL—Prometheus’s built-in query language—users can interact with the data via either the Prometheus web UI or third-party visualization tools such as Grafana.

> [!important]
> **Note**
>
> Additional components such as exporters, service discovery, and Alertmanager extend Prometheus’s functionality in dynamic environments.

## Exporters and Data Collection

To scrape metrics effectively, Prometheus utilizes exporters. Exporters are lightweight processes running on your targets that expose metrics in a Prometheus-compatible format. Since many systems do not natively present metrics as expected by Prometheus, exporters are essential for converting internal data into a standardized format.

Prometheus employs a pull-based model, meaning it actively queries targets. However, for short-lived jobs that might not exist long enough to be scraped, the Pushgateway is used. This component temporarily stores metrics pushed by these jobs until Prometheus can scrape them.

Targets to scrape are usually specified in a static configuration file. In dynamic environments, such as Kubernetes or cloud infrastructures, service discovery mechanisms automatically update the target list.

## Alerting

Prometheus supports alerting by evaluating collected metrics against defined thresholds. While it does not send notifications directly, it forwards alerts to Alertmanager. Alertmanager then manages and dispatches notifications through various channels like email, SMS, or Slack.

The overall interaction among these components is illustrated below:

![The image illustrates the Prometheus architecture, showing components like Pushgateway, Service Discovery, Alertmanager, and their interactions for metrics collection and alerting.](https://kodekloud.com/kk-media/image/upload/v1752880521/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_240.jpg)

## Querying Metrics with PromQL

Prometheus enables users to query and visualize metrics using PromQL, its powerful query language. Whether via the Prometheus web UI or third-party tools like Grafana, PromQL provides flexibility for retrieving and analyzing data. By default, Prometheus scrapes metrics from the `/metrics` endpoint of each target, though this endpoint can be customized in the configuration if needed.

![The image illustrates Prometheus collecting metrics by sending HTTP requests to the `/metrics` endpoint of each target server.](https://kodekloud.com/kk-media/image/upload/v1752880522/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_270.jpg)

Many systems do not expose metrics in the required format; exporters bridge this gap by collecting metrics from applications, converting them into a compatible format, and exposing them on the `/metrics` endpoint for Prometheus to scrape.

![The image explains how exporters collect and convert metrics from services into a format for Prometheus, addressing systems not listening on the /metrics endpoint.](https://kodekloud.com/kk-media/image/upload/v1752880523/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_300.jpg)

Prometheus offers a range of native exporters, such as Node Exporter for Linux systems, along with exporters for Windows, MySQL, Apache, HAProxy, and more. Detailed documentation is available to help you select the right exporter for your environment.

## Custom Metrics Collection

For applications that require monitoring of custom metrics—such as tracking errors, latency, or execution time—Prometheus provides client libraries in multiple programming languages, including Go, Java, Python, Ruby, and Rust. These libraries enable you to expose application-specific metrics tailored to your needs.

![The image explains Prometheus client libraries for monitoring application metrics like errors, latency, and execution time, with support for Go, Java, Python, Ruby, and Rust.](https://kodekloud.com/kk-media/image/upload/v1752880524/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_370.jpg)

## Pull-Based vs. Push-Based Collection Models

Prometheus is primarily built around a pull-based model, meaning it scrapes metrics from known targets. This model offers several advantages:

- Easier detection of targets that are down.
- Control over server load, as metrics are collected at scheduled intervals.
- Maintenance of an up-to-date list of targets, ensuring a reliable source of truth.

In contrast, push-based models—used by systems like Logstash, Graphite, and OpenTSDB—rely on targets sending metrics directly to the server without the need for prior registration.

![The image explains Prometheus’s pull-based model, requiring a target list for scraping, and mentions other solutions like Zabbix and Nagios.](https://kodekloud.com/kk-media/image/upload/v1752880525/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_400.jpg)

![The image illustrates a push-based monitoring model, where targets send metric data to a server. Examples include Logstash, Graphite, and OpenTSDB.](https://kodekloud.com/kk-media/image/upload/v1752880526/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_430.jpg)

### Advantages of the Pull-Based Model

The benefits of using a pull-based model include:

- Improved detection of target availability.
- Reduced risk of server overload by controlling the rate of metric collection.
- Maintaining a centralized registry of monitored targets.

![The image lists benefits of a pull-based system, highlighting easier target status detection, avoiding server overload, and maintaining a central monitoring list.](https://kodekloud.com/kk-media/image/upload/v1752880527/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_460.jpg)

Although the pull-based model is effective for numeric metrics, it may not be ideal for event-based data or short-lived jobs. In such cases, the Pushgateway allows these jobs to push their metrics for subsequent scraping by Prometheus.

![The image explains the advantages of push-based monitoring for event-based systems and short-lived jobs, highlighting limitations of Prometheus in these scenarios.](https://kodekloud.com/kk-media/image/upload/v1752880528/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Architecture/frame_500.jpg)

## Conclusion

Prometheus is engineered for the efficient collection, storage, and querying of time series metrics. Its modular architecture—including key components like exporters, service discovery, and Alertmanager—ensures it can meet the monitoring requirements of both static and dynamic environments. By leveraging a pull-based model and providing push-based alternatives via Pushgateway, Prometheus offers a comprehensive monitoring solution for a wide variety of use cases.

For more detailed information, consult the [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **Further Reading**
>
> Learn about setting up exporters and configuring service discovery to streamline your monitoring setup.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/70e17eea-7e9b-4f65-87a4-1cdb5631e0dc/lesson/c891ef07-8a67-4460-84c7-4dc53ef35567)**
>
> Watch video content
