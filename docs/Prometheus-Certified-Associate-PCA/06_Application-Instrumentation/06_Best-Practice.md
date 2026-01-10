# Best Practice - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Application-Instrumentation/Best-Practice)

---

## Table of Contents

- Best Practice
  - Naming Convention
  - Examples of Metric Names
  - What to Instrument
  - Watch Video
  - Practice Lab
    - 1. Online Serving Systems
    - 2. Offline Processing Services
    - 3. Batch Jobs

---

## Content

Prometheus Certified Associate (PCA)

Application Instrumentation

# Best Practice

In this article, we explain the best practices for naming your metrics to ensure consistency, clarity, and ease in tracking. A standardized naming convention makes it easier to understand and interpret the data collected from various systems.

## Naming Convention

Metric names must be written in snake_case, meaning all letters are lowercase and words are separated by underscores. For instance, the metric name `http_requests_total` follows this convention.

The structure for naming metrics should be:

1.  The first term represents the application or library associated with the metric. For example, metrics related to PostgreSQL should start with `postgresql_`.
2.  Subsequent terms describe what the metric measures, such as `queue_size`.
3.  Always append the unit of measurement (e.g., seconds, bytes, meters) to avoid misinterpretation. This ensures clarity, such as distinguishing between seconds and milliseconds.
4.  Use unprefixed base units (like seconds, bytes, meters) rather than their prefixed counterparts (such as microseconds or kilobytes).
5.  Avoid applying special suffixes like `_total`, `_count`, `_sum`, and `_bucket` to custom names except that counter metrics should end with `_total`. Other metric types, including histograms, should not use these suffixes unless required.

The standard naming format includes the library name, a description, a unit, and, where applicable, an appropriate suffix.

![The image provides guidelines for naming metrics, emphasizing the inclusion of units in metric names and recommending the use of unprefixed base units like seconds, bytes, and meters. It also advises against using microseconds or kilobytes and mentions suffixes like _total for counter metrics.](https://kodekloud.com/kk-media/image/upload/v1752882961/notes-assets/images/Prometheus-Certified-Associate-PCA-Best-Practice/metric-naming-guidelines-units.jpg)

## Examples of Metric Names

Below are some well-crafted examples that adhere to these conventions:

```
process_cpu_seconds
http_requests_total
redis_connection_errors
```

- `process_cpu_seconds` uses snake_case, begins with the application/library (`process`), and includes the unit `seconds`.
- `http_requests_total` starts with the relevant component (`http`), describes the metric (`requests`), and appropriately ends with `_total` for a counter metric.
- `redis_connection_errors` clearly identifies the system (Redis) and describes the error type.

> [!important]
> **Additional Guidance**
>
> For tracking connection errors as a counter metric, you might use `redis_connection_errors_total`. In the case of `node_disk_read_bytes_total`, the name effectively highlights the source (Node), the measured metric (disk read bytes), and marks it as a counter with `_total`.

Conversely, avoid names that deviate from these guidelines:

- **Bad Example:** `container Docker restarts`  
  _Recommendation:_ Use snake_case and place the library name first. Instead, use `docker_container_restarts`.
- **Bad Example:** `HTTP_request_sum`  
  _Recommendation:_ Do not use terms like `sum` which could lead to confusion.
- **Bad Example:** `nginx_disk_free_kilobytes`  
  _Recommendation:_ Replace `kilobytes` with the base unit `bytes`.
- **Bad Example:** `.NET queue waiting time`  
  _Recommendation:_ Always include the unit for clarity.

![The image lists examples of proper and incorrect metric names, with proper names on the left and incorrect ones on the right.](https://kodekloud.com/kk-media/image/upload/v1752882962/notes-assets/images/Prometheus-Certified-Associate-PCA-Best-Practice/metric-names-examples-list.jpg)

## What to Instrument

Choosing what to instrument depends on your system's type and its requirements. Metrics should be tailored to the specific operational context. Generally, there are three main types of applications:

### 1\. Online Serving Systems

Online serving systems require immediate responses. They include components such as databases, web servers, and APIs. Common metrics for these systems include:

- Total number of requests or queries
- Number of errors
- Latency measurements
- Number of in-progress requests

![The image describes an online-serving system that requires immediate responses, such as databases and web servers, and lists metrics to monitor: number of queries/requests, number of errors, latency, and number of in-progress requests.](https://kodekloud.com/kk-media/image/upload/v1752882964/notes-assets/images/Prometheus-Certified-Associate-PCA-Best-Practice/online-serving-system-metrics.jpg)

### 2\. Offline Processing Services

Offline processing services are used where immediate responses are not required. These systems typically perform batch processes involving multiple stages. Metrics to consider include:

- Total amount of work to be done
- Volume of queued work
- Number of work items in progress
- Processing rates
- Errors at various processing stages

![The image is a slide discussing offline processing services, highlighting the need to measure the amount of queued work, work in progress, and the rate of processing for each stage.](https://kodekloud.com/kk-media/image/upload/v1752882965/notes-assets/images/Prometheus-Certified-Associate-PCA-Best-Practice/offline-processing-services-queue-measurement.jpg)

### 3\. Batch Jobs

Batch jobs are scheduled to run at specific intervals rather than continuously. Because batch jobs do not run continuously, using a Push Gateway is often recommended for effective data collection. Key metrics for batch jobs should include:

- Time spent processing each stage of the job
- Overall runtime of the job
- Timestamp of the last job completion

![The image contains text explaining that batch jobs are similar to offline-serving systems but run on a regular schedule, requiring a pushGateway because they aren't continuously running.](https://kodekloud.com/kk-media/image/upload/v1752882967/notes-assets/images/Prometheus-Certified-Associate-PCA-Best-Practice/batch-jobs-offline-serving-explanation.jpg)

> [!important]
> **Final Thoughts**
>
> Implementing these best practices ensures that your metrics are consistently named and accurately monitored, ultimately improving observability and simplifying troubleshooting across your systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/0c0155c7-00c8-4ca2-a061-e66baa1a3216/lesson/fcbaaf76-5012-4da6-8ded-16ed04813936)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/0c0155c7-00c8-4ca2-a061-e66baa1a3216/lesson/9822084e-5e32-4e25-89ef-335fce5cc0f8)**
>
> Practice lab
