# Subquery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/Subquery)

---

## Table of Contents

- Subquery
  - Using Subqueries
  - Practical Example: Analyzing Network Traffic
  - Watch Video
    - Example: Grouping Data Without Aggregation

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# Subquery

Assume we have a gauge metric and want to determine its maximum value over the past 10 minutes. To achieve this, we can use the `max_over_time` function by providing the metric and specifying a 10-minute range.

Now consider a counter metric where the goal is to compute the maximum rate over the past 10 minutes. An initial approach might be to execute the `rate` function over the metric and then apply `max_over_time`. For example:

```
$ max_over_time(node_filesystem_avail_bytes[10m])
```

For a counter, you would first use the `rate` function over a 10-minute period and then attempt to find the maximum value of that rate. However, this approach does not work directly because the `rate` function returns an instant vector, while `max_over_time` expects a range vector. For instance, consider the queries:

```
$ max_over_time(node_filesystem_avail_bytes[10m])
$ max_over_time(rate(http_requests_total[10m]))
```

> [!important]
> **Note**
>
> Remember: the `[10m]` in the `rate` function is used to group data points, not to specify the time range from which data is fetched.

To address this issue, subqueries come into play.

## Using Subqueries

Subqueries allow you to perform an instant query over a specified range and resolution, effectively converting an instant vector into a range vector. The general format for a subquery is:

```
$ <instant_query>[<range>:<resolution>] [offset <duration>]
```

For example, if you want to calculate the rate for `http_requests_total` using a 1-minute sample range and then look at the data over the past 5 minutes with a resolution of 30 seconds, you would write:

```
$ rate(http_requests_total[1m])[5m:30s]
```

In this query:

- `1m` is the sample range used inside the `rate` function.
- `5m` is the query range, representing how far back the query retrieves data.
- `30s` is the query step, defining the interval between the returned data samples.

This subquery returns a range vector that can then be passed to functions like `max_over_time`. For example:

```
$ max_over_time(rate(http_requests_total[1m])[5m:30s])
```

This expression calculates the maximum rate of `http_requests_total` for the last five minutes using one-minute sampling intervals and data points every 30 seconds.

### Example: Grouping Data Without Aggregation

Consider a subquery without an aggregation function. The following query demonstrates how to group CPU seconds data over a 2-minute range with 10-second intervals:

```
$ rate(node_cpu_seconds_total[1m])[2m:10s]
0.991777777804683 @1664226130
0.991777777804683 @1664226140
0.991333333304358 @1664226150
0.991111111131807 @1664226160
0.991111111131807 @1664226170
0.991555555556851 @1664226180
0.989555555561764 @1664226190
0.989555555561764 @1664226200
0.989333333334747 @1664226210
0.989333333334747 @1664226220
0.989333333334747 @1664226230
0.991111111131807 @1664226240
```

Here, the `2m` range defines the period over which data is collected, while `10s` sets the interval between each data point. This grouping is effective for performing further aggregation operations.

> [!important]
> **Note**
>
> Subqueries convert an instant vector into a range vector, enabling aggregation functions such as `max_over_time` to operate over multiple data points.

---

## Practical Example: Analyzing Network Traffic

Suppose we have a metric called `node_network_transmit_bytes_total` that tracks the total transmitted bytes on a network interface. Using the `rate` function with a 1-minute interval gives the current transmission rate:

```
$ rate(node_network_transmit_bytes_total{instance="192.168.1.168:9100", job="node"})
{device="enp0s3", instance="192.168.1.168:9100", job="node"} 1541.444444444443
{device="enp0s8", instance="192.168.1.168:9200", job="node"} 1549.7555555555555
{device="lo", instance="192.168.1.168:9200", job="node"} 0
```

However, if you attempt to find the highest transmission rate over the past five hours by wrapping the `rate` function directly in `max_over_time`, you will encounter an error because `max_over_time` expects a range vector:

```
$ max_over_time(rate(node_network_transmit_bytes_total[1m]))
```

```
Error executing query: invalid parameter "query": 1:15: parse error: expected type range vector in call to function "max_over_time", got instant vector
```

To resolve this, you can use a subquery to produce a range vector. For example, specify a 5-hour query window with a 30-second step:

```
$ max_over_time(rate(node_network_transmit_bytes_total[1m])[5h:30s])
```

Running this query computes the maximum value over time correctly. To understand what the subquery returns without wrapping it in `max_over_time`, consider the following example:

```
$ rate(node_network_transmit_bytes_total[1m])[5h:30s]
{device="enp0s3", instance="192.168.1.168:9100", job="node"}
{device="enp0s3", instance="192.168.1.168:9200", job="node"}
{device="lo", instance="192.168.1.168:9200", job="node"}
11346.858393314682
1595.444444444443
1674.7700102217677
0
```

Without an aggregation function like `max_over_time`, the subquery returns multiple data points across the specified range. In contrast, a query that fetches only the most recent data point may yield results similar to:

```
$ rate(node_network_transmit_bytes_total[1m])
{device="enp0s3", instance="192.168.1.168:9100", job="node"}
{device="enp0s3", instance="192.168.1.168:9200", job="node"}
{device="lo", instance="192.168.1.168:9000", job="node"}
{device="lo", instance="192.168.1.168:9200", job="node"}
1556.911111111111
1567.6
0
0
```

This query retrieves current values instead of a historical range. By using a subquery with a 5-hour window and a 30-second step, you obtain a series of data points that provide deeper insights over time.

> [!important]
> **Note**
>
> Subqueries are a powerful feature for converting an instant vector into a range vector, making them suitable for comprehensive, time-based aggregation scenarios.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/023a6dfb-e64f-4184-976a-b010d9127fd5)**
>
> Watch video content
