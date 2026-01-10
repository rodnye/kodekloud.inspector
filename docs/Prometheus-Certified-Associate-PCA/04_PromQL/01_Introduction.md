# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/Introduction)

---

## Table of Contents

- Introduction
  - Data Types Returned by PromQL
  - String and Scalar Types
  - Instant Vectors
  - Range Vectors
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# Introduction

In this lesson, we explore PromQL (Prometheus Query Language), the primary method for querying metrics within Prometheus. Using a PromQL expression, you send a request to the Prometheus server and receive data that can be visualized on dashboards—whether using Grafana or Prometheus's built-in visualization tools.

![The image explains PromQL, short for Prometheus Query Language, as the main way to query metrics within Prometheus, with data that can be visualized in dashboards. It includes icons representing Prometheus and Grafana.](https://kodekloud.com/kk-media/image/upload/v1752883025/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/promql-prometheus-grafana-dashboard.jpg)

Additionally, PromQL is employed to construct alerting rules, alerting administrators when pre-set thresholds are exceeded. In this lesson, we cover topics such as:

- Expression data structures and their returned types
- Selectors and modifiers for retrieving specific data
- Operators and functions
- Vector matching
- Aggregations in Prometheus
- Subqueries
- Advanced usage of histograms and summaries

![The image shows a section outline with topics such as expression data structure, selectors and modifiers, operators and functions, vector matching, aggregators, subqueries, and histogram/summary.](https://kodekloud.com/kk-media/image/upload/v1752883026/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/section-outline-expression-data-topics.jpg)

## Data Types Returned by PromQL

When you run a PromQL expression, the Prometheus server returns data in one of four types:

1.  **String:** A simple text value (currently unused in queries).
2.  **Scalar:** A floating-point number (e.g., 54.743 or 127.43).
3.  **Instant Vector:** A set of time series where each series contains exactly one sample, all sharing the same timestamp.
4.  **Range Vector:** A set of time series where each series contains multiple data points across a specified time interval.

> [!important]
> **Note**
>
> PromQL's type system is designed to efficiently support real-time metrics querying and visualization. Understanding each type helps you choose the right queries for your monitoring needs.

## String and Scalar Types

A **string** is simply a text value and is not used for metric queries in Prometheus. In contrast, a **scalar** is a floating-point number that can represent values like 54.743. Scalars are excellent for calculations and can be paired with other data types in binary operations.

## Instant Vectors

An **instant vector** returns a set of time series, with each series providing one sample at a single, consistent timestamp. Consider the following example query, which retrieves the metric "node_cpu_seconds_total":

```
$ node_cpu_seconds_total
node_cpu_seconds_total{cpu="0", instance="server1"} 258277.86
node_cpu_seconds_total{cpu="1", instance="server1"} 448430.21
node_cpu_seconds_total{cpu="0", instance="server2"} 941202.32
node_cpu_seconds_total{cpu="1", instance="server2"} 772838.83
```

In this example, Prometheus identifies the metric along with its unique label combinations, resulting in four time series. The key characteristic here is that each time series is sampled at the same moment. For instance:

```
$ node_cpu_seconds_total
node_cpu_seconds_total{cpu="0", instance="server1"} 258277.86 March 3rd 11:05AM
node_cpu_seconds_total{cpu="1", instance="server1"} 448430.21 March 3rd 11:05AM
node_cpu_seconds_total{cpu="0", instance="server2"} 941202.32 March 3rd 11:05AM
node_cpu_seconds_total{cpu="1", instance="server2"} 772838.83 March 3rd 11:05AM
```

Each line represents a sample taken at the identical timestamp, ensuring consistent data for snapshot analyses.

## Range Vectors

Unlike instant vectors, **range vectors** return multiple data points over a specified time window. By appending a `[3m]` modifier, the query instructs Prometheus to return data for the past three minutes:

```
$ node_cpu_seconds_total[3m]
node_cpu_seconds_total{cpu="0", instance="server1"} 674478.07 March 3rd 08:05AM
node_cpu_seconds_total{cpu="0", instance="server1"} 674626.76 March 3rd 08:06AM
node_cpu_seconds_total{cpu="1", instance="server2"} 884597.02 March 3rd 08:05AM
node_cpu_seconds_total{cpu="1", instance="server2"} 540071.18 March 3rd 08:06AM
node_cpu_seconds_total{cpu="1", instance="server2"} 944799.49 March 3rd 08:07AM
```

Here, each time series includes multiple samples over the selected time range, providing a comprehensive view of metric trends. For example, one series might show values for 8:05, 8:06, and 8:07 AM, which is essential for analyzing behaviors over time.

> [!important]
> **Warning**
>
> Ensure you use the correct vector type based on your requirements. Instant vectors are useful for point-in-time snapshots, while range vectors are vital for understanding trends and diagnosing issues over time.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/e49fa7d6-99a1-4327-ba79-509d350030ec)**
>
> Watch video content
