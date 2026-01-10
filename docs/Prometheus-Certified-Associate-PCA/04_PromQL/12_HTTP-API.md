# HTTP API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/HTTP-API)

---

## Table of Contents

- HTTP API
  - Basic Query Execution
  - Querying Metrics at a Specific Time
  - Retrieving a Range Vector
  - Summary of Example Queries
  - Watch Video
    - 1. Basic Metric Query
    - 2. Query at a Specific Time
    - 3. Range Vector Query

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# HTTP API

Prometheus offers an HTTP API that enables you to execute queries and retrieve detailed information about your Prometheus server. With this API, you can access alert configurations, rules, and service discovery configurations, making it highly useful when the built-in web GUI isn’t available. It also facilitates integration with third-party applications like [Grafana](https://grafana.com).

> [!important]
> **Quick Tip**
>
> When constructing API requests, ensure you replace `<prometheus_server>` with the actual address of your Prometheus instance.

## Basic Query Execution

To query metrics, send a POST request to the following URL on your Prometheus server:

http://<prometheus_server>:9090/api/v1/query

The PromQL query is provided via the `query` parameter. For example, to retrieve the number of ARP entries on a specific node filtered by the `instance` label, execute:

```
curl <prometheus_server>:9090/api/v1/query --data 'query=node_arp_entries{instance="192.168.1.168:9100"}'
```

Notice that the data payload is wrapped in single quotes. This allows the inclusion of double quotes around label values without causing conflicts.

## Querying Metrics at a Specific Time

If you require the metric value at a specific point in time rather than the most recent one, add an additional `time` parameter to your request. For example, to obtain `node_arp_entries` for a particular node at Unix timestamp `1670380680.132`, use:

```
curl <prometheus_server>:9090/api/v1/query --data 'query=node_arp_entries{instance="192.168.1.168:9100"}' --data 'time=1670380680.132'
```

## Retrieving a Range Vector

To examine time-series data over a defined duration (for example, the last 10 minutes), incorporate a range vector selector into your query. The following example retrieves time series data for `node_memory_Active_bytes` associated with the `job="node"` label over the previous 10 minutes:

```
curl <prometheus_server>:9090/api/v1/query --data 'query=node_memory_Active_bytes{job="node"}[10m]' --data 'time=1670380680.132' | jq
```

Piping the output to [jq](https://stedolan.github.io/jq/) improves the readability of the JSON response.

## Summary of Example Queries

Below is a progression of Prometheus HTTP API queries that demonstrate different use cases:

### 1\. Basic Metric Query

Retrieve the latest value for a metric:

```
curl <prometheus_server>:9090/api/v1/query --data 'query=node_cpu_seconds_total{job="node"}'
```

For enhanced readability using [jq](https://stedolan.github.io/jq/):

```
curl <prometheus_server>:9090/api/v1/query --data 'query=node_cpu_seconds_total{job="node"}' | jq
```

### 2\. Query at a Specific Time

To query a metric like `node_memory_Active_bytes` at a specific point in time:

```
curl localhost:9090/api/v1/query --data 'query=node_memory_Active_bytes{job="node"}' --data 'time=1670380680.132' | jq
```

The JSON response will be similar to:

```
{
  "status": "success",
  "data": {
    "resultType": "vector",
    "result": [
      {
        "metric": {
          "__name__": "node_memory_Active_bytes",
          "instance": "192.168.1.168:9100",
          "job": "node"
        },
        "value": [
          1670380680.132,
          "1369653248"
        ]
      }
    ]
  }
}
```

### 3\. Range Vector Query

To retrieve a range vector with data points over a specified period (e.g., the past 10 minutes):

```
curl localhost:9090/api/v1/query --data 'query=node_memory_Active_bytes{job="node"}[10m]' --data 'time=1670380680.132' | jq
```

> [!important]
> **Final Note**
>
> Always verify your queries and parameters to match your Prometheus server configuration. This ensures accurate and efficient retrieval of the metrics you need.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/c301bb9e-206d-4152-8858-3f9ae213cae2)**
>
> Watch video content
