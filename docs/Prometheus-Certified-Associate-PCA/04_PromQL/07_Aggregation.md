# Aggregation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/Aggregation)

---

## Table of Contents

- Aggregation
  - Grouping Data with the by Clause
  - Excluding Labels with the without Clause
  - Aggregating Node CPU Metrics
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# Aggregation

Aggregation operators are essential tools in Prometheus that allow you to combine multiple time series into a new, typically smaller, instant vector. These operators use functions like sum, min, max, and average to process the data in an instant vector.

For example, if you have an HTTP endpoint returning an instant vector containing several time series, applying an aggregation operator (such as sum) to a metric like http_requests will add up the values from all its time series.

![The image is a slide explaining aggregation operators, listing different aggregators and their descriptions, such as Sum, Min, Max, and Avg.](https://kodekloud.com/kk-media/image/upload/v1752883013/notes-assets/images/Prometheus-Certified-Associate-PCA-Aggregation/aggregation-operators-explained.jpg)

Below is a sample output for the http_requests metric along with several aggregation operations:

```
$ http_requests
http_requests{method="get", path="/auth"}  3
http_requests{method="post", path="/auth"} 1
http_requests{method="get", path="/user"}  4
http_requests{method="post", path="/user"} 8
http_requests{method="post", path="/upload"} 2
http_requests{method="get", path="/tasks"}  4
http_requests{method="put", path="/tasks"}  6
http_requests{method="post", path="/tasks"} 1
http_requests{method="get", path="/admin"}  3
http_requests{method="post", path="/admin"} 9


$ sum(http_requests)
{} 41  // 3+1+4+8+2+4+6+1+3+9


$ max(http_requests)
{} 9


$ avg(http_requests)
{} 4.1
```

> [!important]
> **Tip**
>
> Each aggregation operator works on every entry within the instant vector. However, you can refine the aggregation by using the `by` clause to group data along specific labels.

## Grouping Data with the `by` Clause

The `by` keyword allows you to define which label dimensions you want to include when aggregating. For instance, if you need to sum the http_requests metric by the `path` label, you can use the following query:

```
$ sum by(path) (http_requests)
{path="/auth"}   4   // 3+1
{path="/user"}   12  // 4+8
{path="/upload"} 2   // 2
{path="/tasks"}  11  // 4+6+1
{path="/admin"}  12  // 3+9
```

Grouping by the `method` label will aggregate GET, POST, and PUT requests separately:

```
$ sum by(method) (http_requests)
{method="get"}  14  // 3+4+4+3
{method="post"} 21  // 1+8+2+1+9
{method="put"}   6   // 6
```

You can also group by multiple labels. Consider a scenario where each HTTP request carries an `instance` label indicating the target node. The aggregated query by both `instance` and `method` would look like this:

```
$ http_requests
http_requests{method="get",  path="/auth",   instance="node1"} 3
http_requests{method="post", path="/auth",   instance="node1"} 21
http_requests{method="get",  path="/user",   instance="node1"} 4
http_requests{method="post", path="/user",   instance="node1"} 8
http_requests{method="get",  path="/tasks",  instance="node1"} 4
http_requests{method="put", path="/tasks",  instance="node1"} 6
http_requests{method="post", path="/tasks",  instance="node1"} 3
http_requests{method="get",  path="/admin",  instance="node1"} 2
http_requests{method="post", path="/admin",  instance="node1"} 6
http_requests{method="get",  path="/auth",   instance="node2"} 13
http_requests{method="post", path="/auth",   instance="node2"} 14
http_requests{method="get",  path="/user",   instance="node2"} 12
http_requests{method="post", path="/user",   instance="node2"} 18
http_requests{method="post", path="/upload", instance="node2"} 12
http_requests{method="get",  path="/tasks",  instance="node2"} 6
http_requests{method="post", path="/tasks",  instance="node2"} 9
http_requests{method="get",  path="/admin",  instance="node2"} 3
http_requests{method="post", path="/admin",  instance="node2"} 19
```

```
$ sum by(instance, method) (http_requests)
{instance="node1", method="get"} 13   // 3+4+4+2
{instance="node1", method="post"} 38  // 21+8+3+6
{instance="node1", method="put"} 6    // 6
{instance="node2", method="get"} 34   // 13+12+6+3
{instance="node2", method="post"} 72  // 14+18+12+9+19
```

## Excluding Labels with the `without` Clause

The `without` keyword offers the reverse functionality of `by`. It lets you exclude specific labels from your aggregation. For example, if you wish to group the data based on every label except `path`, you would write:

```
$ sum without(path) (http_requests)
```

This query aggregates the data based on all labels apart from `path`, such as grouping by `method` and `instance`. This technique is particularly useful when you want to eliminate a specific dimension from your analysis.

## Aggregating Node CPU Metrics

Aggregation can also be applied to node metrics. Consider node CPU metrics, where each target has multiple CPUs (e.g., CPU 0 and CPU 1).

Running a simple sum across all targets and CPUs:

```
$ sum(node_cpu_seconds_total)
```

aggregates the values into a single number. If you want to compute the sum per instance, use:

```
$ sum by(instance)(node_cpu_seconds_total)
```

For more granular analysis, you can further group by CPU:

```
$ sum by(instance, cpu)(node_cpu_seconds_total)
{cpu="0", instance="192.168.1.168:9200"} 13213.80
{cpu="0", instance="192.168.1.168:9100"} 13208.07
{cpu="1", instance="192.168.1.168:9100"} 13190.79
{cpu="1", instance="192.168.1.168:9200"} 13185.06
```

Alternatively, if you'd prefer to aggregate by instance while ignoring the `cpu` label, the `without` clause comes in handy:

```
$ sum without(cpu) (node_cpu_seconds_total{cpu="0", instance="192.168.1.168:9100", job="node", mode="iowait"})
```

This query aggregates across all CPU values while keeping other labels (like `instance`, `job`, and `mode`) intact, providing a comprehensive overview of the CPU metrics on a per-instance basis.

> [!important]
> **Best Practice**
>
> Use the `by` and `without` clauses strategically to precisely control your aggregation, ensuring that you extract the specific level of detail required for your analysis.

## Summary

Aggregation operators in Prometheus enable you to summarize and analyze time series data by grouping data along specific dimensions using `by` or excluding labels with `without`. By combining these techniques, you can gain meaningful insights into complex metrics, making your monitoring and analysis more effective.

For more detailed explanations on Prometheus features, visit the [Prometheus Documentation](https://prometheus.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/8f09a977-27de-4d40-8fe7-25a679d03eae)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/0a0d5663-1e6c-4108-b228-b49fbe9d02ab)**
>
> Practice lab
