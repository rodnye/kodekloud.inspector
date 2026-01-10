# Metrics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Metrics)

---

## Table of Contents

- Metrics
  - Time Series
  - Metric Attributes: Help and Type
  - Metric Naming and Labels
  - Watch Video
    - Metric Naming
    - Labels

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Metrics

In this article, we delve into how metrics function within Prometheus. A Prometheus metric consists of three essential components: a name, labels, and a value.

The metric name is a descriptive identifier that defines what the metric represents. Labels are key-value pairs that add context to the metric, and a metric can have multiple labels. The metric value indicates the observed measurement at a specific point in time.

For example, consider the metric "node_cpu_seconds_total" from the Node Exporter. This metric captures the total number of seconds the CPU has spent in different modes. Labels provide further details—such as specifying which CPU core is being referenced and the state of the CPU. In the following example, the metric shows that CPU 0 spent approximately 258,000 seconds in idle mode. In multi-CPU systems, each CPU is identified with its unique label (e.g., "cpu=0", "cpu=1", etc.):

```
node_cpu_seconds_total{cpu="0",mode="idle"} 258277.86
node_cpu_seconds_total{cpu="0",mode="idle"} 258244.86
node_cpu_seconds_total{cpu="1",mode="idle"} 427262.54
node_cpu_seconds_total{cpu="2",mode="idle"} 283288.12
node_cpu_seconds_total{cpu="3",mode="idle"} 258202.33
```

Labels make it possible to include detailed information about a metric. In the example above, the "cpu" label identifies the CPU number, while the "mode" label indicates the CPU state (such as idle, iowait, irq, etc.). When Prometheus scrapes a target, it collects metrics accompanied by a Unix timestamp. For instance, the output from a scrape might look as follows:

```
node_cpu_seconds_total{cpu="0",mode="idle"} 258277.86
node_cpu_seconds_total{cpu="0",mode="iowait"} 61.16
node_cpu_seconds_total{cpu="0",mode="irq"} 0
node_cpu_seconds_total{cpu="0",mode="nice"} 61.12
node_cpu_seconds_total{cpu="0",mode="softirq"} 6.63
node_cpu_seconds_total{cpu="0",mode="steal"} 0
node_cpu_seconds_total{cpu="0",mode="system"} 372.46
node_cpu_seconds_total{cpu="0",mode="user"} 3270.86
top - 14:28:10 up 3 days,  1:49,  1 user,  load average: 0.24, 0.09, 0.09
%Cpu(s): 32.6 us, 1.4 sy, 0.0 ni, 66.0 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st
```

> [!important]
> **Note**
>
> The Unix timestamp (e.g., `1668215300`) represents the number of seconds since January 1, 1970, UTC (the Unix epoch). You can convert this timestamp into a human-readable format using any Unix timestamp converter.

Every metric stored in Prometheus is timestamped to record the exact moment the measurement was taken. This timestamp is vital for constructing time series data in Prometheus.

## Time Series

A time series in Prometheus is a sequence of timestamped values that share the same metric name and identical labels. In essence, any unique combination of a metric name with its labels represents a distinct time series. Consider the following example featuring metrics from two different systems:

```
node_filesystem_files{device="sda2", instance="server1"}
node_filesystem_files{device="sda3", instance="server1"}
node_filesystem_files{device="sda2", instance="server2"}
node_filesystem_files{device="sda3", instance="server2"}

node_cpu_seconds_total{cpu="0", instance="server1"}
node_cpu_seconds_total{cpu="1", instance="server1"}
node_cpu_seconds_total{cpu="0", instance="server2"}
node_cpu_seconds_total{cpu="1", instance="server2"}
```

Even though there are only two metrics (`node_filesystem_files` and `node_cpu_seconds_total`), the four distinct label combinations for each result in eight separate time series. Prometheus scrapes these metric values at fixed intervals (e.g., every 15 or 30 seconds) and assigns a timestamp to every measurement.

## Metric Attributes: Help and Type

Beyond the name, labels, and value, every Prometheus metric includes two additional attributes: help and type. The help attribute describes the metric, while the type attribute indicates the metric's nature. For example:

```
# HELP node_disk_discard_time_seconds_total This is the total number of seconds spent by all discards.
# TYPE node_disk_discard_time_seconds_total counter
node_disk_discard_time_seconds_total{device="sda"} 0
node_disk_discard_time_seconds_total{device="sr0"} 0
```

Prometheus supports four primary metric types:

1.  **Counter:**  
    A counter metric tracks the number of occurrences of an event and can only increase. It is ideal for monitoring total requests, errors, or other cumulative counts.

    ![The image is a diagram titled "Counter" that explains a counting mechanism, showing metrics like "Total # requests," "Total # Exceptions," and "Total # of job executions." It highlights that the number can only increase and tracks how many times an event occurs.](https://kodekloud.com/kk-media/image/upload/v1752883056/notes-assets/images/Prometheus-Certified-Associate-PCA-Metrics/counter-counting-mechanism-diagram.jpg)

2.  **Gauge:**  
    A gauge metric represents a value that fluctuates over time, such as current CPU utilization, memory usage, or the number of concurrent requests.
3.  **Histogram:**  
    A histogram metric groups observations into configurable buckets, which is useful for tracking durations or sizes. For example, when monitoring application response times, you might set up buckets at 0.2 seconds, 0.5 seconds, and 1 second. The count in each bucket is cumulative, meaning that the bucket for 0.5 seconds includes all values from the 0.2-second bucket as well.

    ![The image is an infographic about histograms, showing how they group observations into configurable bucket sizes, with examples of response time and request size, alongside a bar chart illustrating response times.](https://kodekloud.com/kk-media/image/upload/v1752883057/notes-assets/images/Prometheus-Certified-Associate-PCA-Metrics/histogram-infographic-bucket-sizes.jpg)

4.  **Summary:**  
    A summary metric functions similarly to a histogram by tracking durations or sizes but additionally provides quantile information (e.g., 20%, 50%, 80% percentiles) without the need to predefine buckets. For example, a summary might indicate that 20% of requests finish in under 0.3 seconds, 50% under 0.8 seconds, and 80% under one second.

    ![The image is a summary slide explaining data metrics similar to histograms, showing response time and request size percentiles, along with a bar chart illustrating response time percentiles.](https://kodekloud.com/kk-media/image/upload/v1752883058/notes-assets/images/Prometheus-Certified-Associate-PCA-Metrics/data-metrics-histograms-bar-chart.jpg)

## Metric Naming and Labels

### Metric Naming

Metric names should clearly indicate the feature or component they represent. They are allowed to contain ASCII letters, numbers, underscores, and colons. However, colons are reserved exclusively for recording rules. Below is an example image that outlines the specifications for metric names:

![The image lists metric rules, including specifications for metric names, allowed characters, regex matching, and the use of colons.](https://kodekloud.com/kk-media/image/upload/v1752883060/notes-assets/images/Prometheus-Certified-Associate-PCA-Metrics/metric-rules-specifications-list.jpg)

### Labels

Labels are essential key-value pairs that provide additional categorization for metrics. They enable you to segment metrics based on specific criteria. Label names can include ASCII letters, numbers, and underscores and must match a defined regex pattern. For example, when monitoring CPU metrics, a label such as "cpu" differentiates between CPU cores.

A practical application of labels can be seen in API request tracking. Instead of creating separate metrics for each endpoint (e.g., "requests_auth_total" and "requests_user_total"), a single metric "requests_total" can be used with a label called "path" to distinguish between endpoints. When metrics need further differentiation (such as by HTTP methods), an additional label (e.g., "method") is introduced:

```
requests_total{path="/auth", method="get"}
requests_total{path="/auth", method="post"}
requests_total{path="/auth", method="patch"}
requests_total{path="/auth", method="delete"}
```

Internally, the metric name (such as "node_cpu_seconds_total") is stored as a label called "**name**". It is worth noting that labels with names enclosed in double underscores (like "**name**") are reserved for internal use by Prometheus.

By default, each metric is automatically assigned two labels: "instance" and "job". The "instance" label corresponds to the target defined in your configuration, and the "job" label aligns with the job name provided in your "prometheus.yaml" file. Consider this example configuration snippet:

```
- job_name: "node"
  scheme: https
  basic_auth:
    username: prometheus
    password: password
  static_configs:
  - targets:
    - "192.168.1.168:9100"
```

This configuration ensures that each scraped metric includes the appropriate "instance" and "job" labels.

![The image is an infographic about labels, describing them as key-value pairs associated with metrics, allowing metrics to be split by criteria, and detailing their format requirements. It includes colorful icons representing CPUs and data, with labels like "cpu=0" to "cpu=3".](https://kodekloud.com/kk-media/image/upload/v1752883061/notes-assets/images/Prometheus-Certified-Associate-PCA-Metrics/labels-infographic-key-value-pairs.jpg)

![The image compares two methods of calculating total API requests for an e-commerce app, highlighting the difficulty of calculating totals across all paths without labels and the ease of summing requests using labels.](https://kodekloud.com/kk-media/image/upload/v1752883062/notes-assets/images/Prometheus-Certified-Associate-PCA-Metrics/api-requests-calculation-comparison.jpg)

This labeling approach streamlines monitoring and querying in Prometheus, allowing you to easily aggregate metrics across various endpoints, HTTP methods, and other label dimensions.

By understanding and applying these concepts, you can effectively utilize Prometheus for monitoring and gain valuable insights from the collected metrics.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/4a67d30f-a156-41e2-8718-30942784652e)**
>
> Watch video content
