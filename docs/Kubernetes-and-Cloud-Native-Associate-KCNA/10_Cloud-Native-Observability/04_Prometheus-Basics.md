# Prometheus Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Observability/Prometheus-Basics)

---

## Table of Contents

- Prometheus Basics
  - What is Prometheus?
  - Types of Metrics Monitored
  - Data Integration
  - Focused on Numeric Data
  - Background and Development
  - Additional Resources
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Observability

# Prometheus Basics

In this lesson, we explore the fundamentals of Prometheus, an industry-leading open-source monitoring tool used for collecting, visualizing, and alerting on metrics data.

## What is Prometheus?

Prometheus is a powerful open-source monitoring solution that scrapes metrics from targets via HTTP endpoints. It is widely used to gather critical system and application metrics, store them in a time series database, and enable complex querying using its native language, PromQL. Additionally, Prometheus features built-in alerting that allows you to define rules for notifying teams when specific thresholds are exceeded.

![The image describes Prometheus as an open-source monitoring tool that collects metrics, generates alerts, and stores data in a time series database for querying.](https://kodekloud.com/kk-media/image/upload/v1752880530/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Basics/frame_50.jpg)

## Types of Metrics Monitored

Prometheus is versatile in monitoring a broad range of metrics, including:

- **System Metrics:**
  - CPU utilization
  - Memory usage
  - Disk space usage
  - Service uptime

- **Application-Specific Metrics:**
  - Exception counts
  - Latency measurements
  - Number of pending requests

![The image lists metrics that Prometheus can monitor, including CPU/memory utilization, disk space, service uptime, and application-specific data like exceptions, latency, and pending requests.](https://kodekloud.com/kk-media/image/upload/v1752880530/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Basics/frame_80.jpg)

## Data Integration

Prometheus is built to seamlessly collect metrics from a diverse range of sources—not just applications and operating systems but also networking devices, databases, and other critical IT infrastructure components. Its extensive integration capabilities make it a favorite among IT professionals.

> [!important]
> **Note**
>
> Prometheus is highly extensible, enabling custom metric collection tailored to your specific requirements.

## Focused on Numeric Data

Prometheus specializes in capturing numeric time-series data. It is engineered for metric collection and analysis, meaning it is **not designed** to monitor events, logs, or traces.

![The image explains that Prometheus is designed for monitoring numeric time-series data and should not monitor events, system logs, or traces.](https://kodekloud.com/kk-media/image/upload/v1752880531/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Basics/frame_120.jpg)

## Background and Development

Originally developed with sponsorship from SoundCloud, Prometheus has evolved significantly since its inception. In 2016, it joined the Cloud Native Computing Foundation, further solidifying its role in the cloud-native ecosystem. The tool is primarily written in Go, contributing to its performance and scalability.

![The image explains that Prometheus was initially sponsored by SoundCloud and joined the Cloud Native Computing Foundation in 2016.](https://kodekloud.com/kk-media/image/upload/v1752880532/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Basics/frame_130.jpg)

For more detailed information and comprehensive documentation, visit the official Prometheus website at [prometheus.io/docs](https://prometheus.io/docs).

---

## Additional Resources

For further insights into Prometheus and modern monitoring practices, consider exploring the following resources:

| Resource Type   | Use Case                                  | Example Command or Link                                         |
| --------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Monitoring Tool | Setting up system and application metrics | [Prometheus Documentation](https://prometheus.io/docs)          |
| Cloud Native    | Integration with cloud-native solutions   | [Cloud Native Computing Foundation](https://www.cncf.io)        |
| Open Source     | Community-driven tools and contributions  | [GitHub - Prometheus](https://github.com/prometheus/prometheus) |

Enhance your observability strategy by leveraging the best practices in modern monitoring with Prometheus.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/70e17eea-7e9b-4f65-87a4-1cdb5631e0dc/lesson/8cfac227-666b-4613-abff-fd80caa00be5)**
>
> Watch video content
