# Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/Functions)

---

## Table of Contents

- Functions
  - Math Functions
  - Date and Time Functions
  - Scalar and Vector Conversions
  - Sorting Functions
  - Rate and Instant Rate Functions
  - Watch Video
    - Using rate()
    - Using irate()

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# Functions

PromQL offers a variety of functions to manipulate and analyze metrics. These functions are ideal for tasks like sorting results, performing mathematical operations (e.g., rounding), transforming labels, and other metric manipulations.

![The image is a slide discussing PromQL functions, highlighting use cases such as sorting, math, label transformation, and metric manipulation.](https://kodekloud.com/kk-media/image/upload/v1752883014/notes-assets/images/Prometheus-Certified-Associate-PCA-Functions/promql-functions-use-cases-slide.jpg)

Below, we explore some math-based functions using the node CPU seconds total metric as an example.

## Math Functions

To round up values, use the `ceil` function which rounds to the nearest higher integer. In contrast, the `floor` function rounds down. The `abs` function returns the absolute value, which is useful for converting any negative numbers. Consider the following examples:

```
$ node_cpu_seconds_total
{cpu="0", mode="idle"}  115.12
{cpu="0", mode="irq"}   87.4482
{cpu="0", mode="steal"} 44.245


$ ceil(node_cpu_seconds_total)
{cpu="0", mode="idle"}  116
{cpu="0", mode="irq"}   88
{cpu="0", mode="steal"} 45


$ floor(node_cpu_seconds_total)
{cpu="0", mode="idle"}  115
{cpu="0", mode="irq"}   87
{cpu="0", mode="steal"} 44


$ abs(1 - node_cpu_seconds_total)
{cpu="0", mode="idle"}  115.12
{cpu="0", mode="irq"}   87.4482
{cpu="0", mode="steal"} 44.245
```

## Date and Time Functions

PromQL provides functions to work with dates and times, such as the `time()` function, which returns the current Unix timestamp. This can be especially useful for calculating the duration of a process by subtracting its start time.

```
$ time()
1663872361.957
$ time() - process_start_time_seconds
process_start_time_seconds{instance="node"} 1109175.01
```

Additionally, you can extract specific components from a timestamp. For example, when you wish to extract the minute, hour, day-of-week, and other parts from a specific timestamp, you can use the following functions:

| Expression            | Result |
| --------------------- | ------ |
| Minute()              | 07     |
| Hour()                | 15     |
| Day\\\_of\\\_week()   | 4      |
| Day\\\_of\\\_month()  | 22     |
| Days\\\_in\\\_month() | 30     |
| Month()               | 09     |
| Year()                | 2022   |

Each of these functions extracts the corresponding component from the provided timestamp.

## Scalar and Vector Conversions

PromQL allows conversion between scalars and vectors during metric operations. Sometimes you might need to convert a scalar to an instant vector for compatibility with vector operations. Conversely, the `scalar()` function converts an instant vector into a scalar. For example, consider the `process_start_time_seconds` metric:

```
$ process_start_time_seconds
process_start_time_seconds{instance="node1"} 1662763800


$ scalar(process_start_time_seconds)
scalar 1662763800
```

> [!important]
> **Note**
>
> If the instant vector contains more than one sample, the `scalar()` function will return NaN (Not a Number).

## Sorting Functions

PromQL also features sorting functions. By default, the `sort` function orders metric data in ascending order, while `sort_desc` arranges data in descending order. As an example, consider sorting available filesystem bytes:

```
$ sort(node_filesystem_avail_bytes)
node_filesystem_avail_bytes{device="gvfsd-fuse", fstype="fuse.gvfsd-fuse", instance="node1"}               0
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1"}                          5238784
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1"}                      531341312
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1"}                          725422080
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1"}                          726319104
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1"}                          726319104
node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1"}                      1784819712


$ sort_desc(node_file)
```

## Rate and Instant Rate Functions

When plotting counter metrics over time, such as total HTTP requests, a simple plot of the counter might not reveal useful insights because counters continuously increase. Instead, you often need the rate at which the counter values are increasing. PromQL provides two key functions for this purpose: `rate` and `irate`.

### Using rate()

The `rate()` function calculates the per-second average increase over a specified time range. Consider tracking HTTP errors over a 1-minute period:

```
$ rate(http_errors[1m])
```

With a default scrape interval of 15 seconds, a 1-minute window holds four samples. The function aggregates these samples by subtracting the first sample from the last and then dividing by the duration (60 seconds). For example, given data points 1.2, 2.3, 3.1, and 3.3, the computation would be:

1.  Difference: 3.3 - 1.2 = 2.1
2.  Rate: 2.1 / 60 = 0.035

This result reflects the average per-second increase over the 1-minute period.

### Using irate()

In contrast, the `irate()` function considers only the last two data points in the selected time range, providing a more instantaneous rate. For the same HTTP errors metric with a 1-minute window:

```
$ irate(http_errors[1m])
```

Assuming the last two samples are 10.3 and 8.9, the calculation is:

1.  Difference: 10.3 - 8.9 = 1.4
2.  Rate: 1.4 / 15 ≈ 0.0933

> [!important]
> **Best Practice**
>
> Use `rate()` for slowly changing counters (especially in alerting rules) and `irate()` for graphing more volatile metrics to capture a near-instantaneous rate.

![The image compares "rate" and "irate," explaining that "rate" looks at the first and last data points for an average rate, while "irate" considers the last two data points for an instant rate.](https://kodekloud.com/kk-media/image/upload/v1752883015/notes-assets/images/Prometheus-Certified-Associate-PCA-Functions/rate-vs-irate-comparison.jpg)

When working with these functions, ensure that the time range includes at least four samples (with a 15-second scrape interval, a minimum window of 60 seconds is recommended). Moreover, if you are combining the `rate()` function with an aggregation operator, apply `rate()` before the aggregation to manage counter resets effectively.

For example, consider the `node_network_transmit_bytes_total` counter, which displays cumulative transmitted bytes per network interface. While the raw metric steadily increases, applying the `rate()` function over a 1-minute window provides a clearer picture of the current rate of network traffic:

```
$ rate(node_network_transmit_bytes_total[1m])
```

This transformation enables more meaningful visualizations when monitoring network traffic with graphs.

![The image shows a graph with a steadily increasing green line, accompanied by text explaining that a counter metric plot is expected to increase over time.](https://kodekloud.com/kk-media/image/upload/v1752883016/notes-assets/images/Prometheus-Certified-Associate-PCA-Functions/counter-metric-increasing-graph.jpg)

![The image shows a slide titled "Rate" with text explaining the interest in the rate at which a counter metric increases, and includes a line graph depicting the per second average rate of change.](https://kodekloud.com/kk-media/image/upload/v1752883018/notes-assets/images/Prometheus-Certified-Associate-PCA-Functions/rate-interest-counter-metric-graph.jpg)

Finally, keep in mind the importance of applying these functions correctly—choosing the appropriate grouping interval and order of operations—to ensure accurate monitoring and alerting.

![The image contains instructions on using rate functions, emphasizing having at least four samples in a time range and applying the rate function before aggregation.](https://kodekloud.com/kk-media/image/upload/v1752883019/notes-assets/images/Prometheus-Certified-Associate-PCA-Functions/rate-functions-instructions-four-samples.jpg)

This lesson covers the fundamental functions in PromQL. While many additional functions exist, they generally operate on the same key principles discussed above.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/6254635d-a3cb-472d-861a-2e3d699b0751)**
>
> Watch video content
