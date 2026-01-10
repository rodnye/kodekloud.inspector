# Prometheus Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Prometheus-Basics)

---

## Table of Contents

- Prometheus Basics
  - What is Prometheus?
  - Types of Metrics
  - Monitoring Numeric Time Series Data
  - Background and Additional Resources
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Prometheus Basics

In this lesson, we explore the fundamentals of Prometheus, an open-source monitoring solution that collects performance metrics, visualizes them, and offers built-in alerting. Prometheus provides essential insights into your systems, making it a key component in modern infrastructure monitoring.

## What is Prometheus?

Prometheus collects data by scraping metrics from HTTP endpoints exposed by your applications or systems. These endpoints return the necessary metrics data, which Prometheus stores in a time series database. With its powerful query language, PromQL, you can efficiently analyze these metrics to understand and optimize system performance.

![The image describes Prometheus as an open-source monitoring tool that collects metrics data, provides visualization tools, generates alerts, and uses a time series database with PromQL for querying.](https://kodekloud.com/kk-media/image/upload/v1752883074/notes-assets/images/Prometheus-Certified-Associate-PCA-Prometheus-Basics/prometheus-monitoring-tool-metrics.jpg)

## Types of Metrics

Prometheus is capable of monitoring a wide range of metrics, such as:

- **System-level metrics:** CPU and memory utilization, disk space, and service uptime.
- **Application-specific data:** Exception counts, latency issues, and the number of pending requests.

This wide-ranging capability allows you to tailor monitoring precisely to your requirements. Additionally, Prometheus seamlessly integrates with various platforms—including operating systems, networking devices, and databases—ensuring a comprehensive view of your entire technology stack.

![The image is a slide titled "Prometheus" listing metrics that Prometheus can monitor, including CPU/Memory Utilization, Disk space, Service Uptime, and Application specific data.](https://kodekloud.com/kk-media/image/upload/v1752883075/notes-assets/images/Prometheus-Certified-Associate-PCA-Prometheus-Basics/prometheus-monitoring-metrics-slide.jpg)

## Monitoring Numeric Time Series Data

> \[!WARNING\] Important  
> Prometheus is optimized specifically for numeric time series data. It is not designed to monitor non-numeric content such as event logs, system logs, or traces.

This focus on numeric data enables accurate tracking and analysis of performance metrics over time, helping you quickly identify trends and potential issues.

![The image is a slide about Prometheus, highlighting that it is designed to monitor numeric time-series data and should not monitor events, system logs, or traces.](https://kodekloud.com/kk-media/image/upload/v1752883076/notes-assets/images/Prometheus-Certified-Associate-PCA-Prometheus-Basics/prometheus-time-series-monitoring-slide.jpg)

## Background and Additional Resources

Originally sponsored by SoundCloud, Prometheus has evolved into a cornerstone of modern monitoring. In 2016, it joined the Cloud Native Computing Foundation and is primarily developed in Go (Golang).

For more comprehensive details, please visit the [official Prometheus documentation](https://prometheus.io/docs/).

![The image provides background information on Prometheus, mentioning its sponsorship by SoundCloud, its association with the Cloud Native Computing Foundation, its primary language GoLang, and a link to its documentation.](https://kodekloud.com/kk-media/image/upload/v1752883078/notes-assets/images/Prometheus-Certified-Associate-PCA-Prometheus-Basics/prometheus-background-soundcloud-go.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/72d69aea-73bd-4d4c-b112-fafe324761d5)**
>
> Watch video content
