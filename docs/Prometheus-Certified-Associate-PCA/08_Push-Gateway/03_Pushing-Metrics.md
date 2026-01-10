# Pushing Metrics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Push-Gateway/Pushing-Metrics)

---

## Table of Contents

- Pushing Metrics
  - Pushing Metrics via HTTP Request
  - Example: Pushing Metrics Using curl
  - Grouping Metrics
  - Updating Metrics: POST vs. PUT
  - Deleting Metrics
  - Summary
  - Watch Video
    - Grouping Example
    - Using POST
    - Using PUT

---

## Content

Prometheus Certified Associate (PCA)

Push Gateway

# Pushing Metrics

This guide explains how to push metrics to a Push Gateway using two primary methods: sending an HTTP request directly or using a Prometheus client library. We cover sending metrics with custom grouping, updating existing metrics, and deleting groups of metrics.

## Pushing Metrics via HTTP Request

You can push metrics by sending an HTTP POST request to a URL formatted as follows:

```
http://<pushgateway_address>:<port>/metrics/job/<job_name>/<label1>/<value1>/<label2>/<value2>
```

In this URL:

- The Push Gateway address and port specify the destination.
- The "job" segment designates the job label, with `<job_name>` indicating the associated metric's job name.
- Additional label/value pairs not only supplement the metrics with extra labels but also serve as a grouping key, allowing you to update or delete metrics as a collection.

> [!important]
> **Note**
>
> Pushing metrics via HTTP requests involves manually constructing these requests and sending them directly to the Push Gateway.

![The image is a slide titled "Pushing Metrics," explaining that metrics can be pushed to the Pushgateway by sending HTTP requests.](https://kodekloud.com/kk-media/image/upload/v1752883087/notes-assets/images/Prometheus-Certified-Associate-PCA-Pushing-Metrics/pushing-metrics-http-requests.jpg)

## Example: Pushing Metrics Using curl

To demonstrate, here is an example where we push a metric named `example_metric` with a value of 4421 under the job `db_backup`. This is done using the curl command:

```
$ echo "example_metric 4421" | curl --data-binary @- http://localhost:9091/metrics/job/db_backup
```

Explanation:

- The metric data is sent as binary using `--data-binary`.
- The `echo` command outputs the metric string.
- The `@-` flag directs curl to read the binary data from standard input.
- The URL targets the local Push Gateway at port 9091, appending the necessary job label.

After pushing the metric, retrieve the metrics from the Push Gateway with:

```
$ curl localhost:9091/metrics
example_metric{instance="",job="db_backup"} 4421
# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 1.0373e-05
go_gc_duration_seconds{quantile="0.25"} 2.5597e-05
go_gc_duration_seconds{quantile="0.5"} 2.7005e-05
go_gc_duration_seconds{quantile="0.75"} 3.787e-05
```

## Grouping Metrics

The URL path, which includes the job name and any additional label-value pairs, functions as a grouping key. Metrics pushed to the same URL are part of a group, enabling bulk updates or deletion.

### Grouping Example

Imagine you want to push two metrics—`metric_one` (counter) and `metric_two` (gauge)—together under a group labeled as `archive` with an additional label `db=mysql`. Use the following command:

```
$ cat <<EOF | curl --data-binary @- http://localhost:9091/metrics/job/archive/db/mysql
# TYPE metric_one counter
metric_one{label="val1"} 11
# TYPE metric_two gauge
# HELP metric_two Just an example.
metric_two 100
EOF
```

In this example:

- The job is named `archive`.
- The label `db=mysql` groups these metrics.
- All metrics pushed via this URL belong to the same group.

Changing the grouping labels creates a distinct group. For instance, the following command creates a group with the label `app=web`:

```
$ cat <<EOF | curl --data-binary @- http://localhost:9091/metrics/job/archive/app/web
# TYPE metric_one counter
metric_one{label="val1"} 22
# TYPE metric_two gauge
# HELP metric_two Just an example.
metric_two 200
EOF
```

Now, you have two groups:

1.  Group one: `archive` with `db=mysql`
2.  Group two: `archive` with `app=web`

Verify the grouped metrics with:

```
$ curl localhost:9091/metrics | grep archive
metric_one{db="mysql",instance="",job="archive",label="val1"} 11
metric_two{db="mysql",instance="",job="archive"} 100

metric_one{app="web",instance="",job="archive",label="val1"} 22
metric_two{app="web",instance="",job="archive"} 200
```

## Updating Metrics: POST vs. PUT

The HTTP method used to update metrics affects how the group is modified.

### Using POST

A POST request updates only the metrics that have the same name as those in the new payload, leaving other metrics in the group unchanged. For example, to update `metric_one` in the `archive/app/web` group:

```
$ cat <<EOF | curl --data-binary @- http://localhost:9091/metrics/job/archive/app/web
# TYPE metric_one counter
metric_one{label="val1"} 44
EOF
```

> [!important]
> **Important**
>
> A POST request selectively updates the metric(s) matching the payload without affecting the rest of the group.

### Using PUT

A PUT request, by contrast, replaces all metrics within the specified group with the new set provided. For instance, to completely replace the group contents with only `metric_one`:

```
$ cat <<EOF | curl -X PUT --data-binary @- http://localhost:9091/metrics/job/archive/app/web
# TYPE metric_one counter
metric_one{label="val1"} 44
EOF
```

After this command, only `metric_one` exists in the `archive/app/web` group, and all previous metrics (e.g., `metric_two`) are removed.

## Deleting Metrics

To remove all metrics from a specific group, send a DELETE request to that group's URL:

```
$ curl -X DELETE http://localhost:9091/metrics/job/archive/app/web
```

Once executed, the group `archive/app/web` is deleted, leaving other groups (like `archive/db/mysql`) unaffected.

## Summary

- Use a POST request to update specific metrics by name within a group.
- Use a PUT request to completely replace all metrics in a group.
- Use a DELETE request to remove all metrics belonging to a given group.

This guide details how to push, update, and delete metrics on a Push Gateway through HTTP requests, helping you manage and group metrics efficiently for monitoring and observability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/18b41166-411a-42a8-91c2-18a5b49bc189/lesson/2ea926a1-5349-4263-8205-7364ecbb84a1)**
>
> Watch video content
