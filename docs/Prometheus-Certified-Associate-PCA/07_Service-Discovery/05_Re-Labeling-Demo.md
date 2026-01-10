# Re Labeling Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Service-Discovery/Re-Labeling-Demo)

---

## Table of Contents

- Re Labeling Demo
  - Filtering Targets with relabel_configs
  - Combining Labels with Replacement
  - Dropping Unwanted Labels
  - Renaming Metrics with metric_relabel_configs
  - Keeping or Dropping Specific Metrics
  - Renaming a Label Within a Metric
  - Final Notes
  - Watch Video
  - Practice Lab

---

## Content

Prometheus Certified Associate (PCA)

Service Discovery

# Re Labeling Demo

In this lesson, we dive into Prometheus relabeling configurations, demonstrating how to manipulate discovered labels before target scraping and adjust scraped metrics afterward. You'll learn how to filter targets by labels, combine label values, drop unwanted labels, and even rename metrics. This guide provides a step-by-step explanation to help you tailor your monitoring configurations effectively.

---

## Filtering Targets with relabel_configs

When Prometheus performs service discovery for a job, it gathers targets along with a variety of discovered labels (e.g., environment, team, size, type). For instance, targets might include an environment label such as dev, staging, or prod, and a team label that identifies ownership (like "web" or "database").

You can configure Prometheus to include or exclude targets using relabeling rules before scraping. In the following example, we configure Prometheus to scrape only the targets where the environment is set to production. The configuration below uses file-based service discovery for simplicity.

```
global:
  scrape_interval: 15s
  scrape_timeout: 10s


scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: "nodes"
    relabel_configs:
      - source_labels: [env]
        regex: prod
        action: keep
    file_sd_configs:
      - files:
          - file-sd.json
```

In this configuration:

- The rule examines the `env` label.
- The regular expression `prod` selects targets labeled with production.
- The `keep` action ensures that only matching targets are scraped, while all others are dropped.

> [!important]
> **Note**
>
> To drop production targets instead, simply change the action from `keep` to `drop`:

```
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: "nodes"
    relabel_configs:
      - source_labels: [env]
        regex: prod
        action: drop
    file_sd_configs:
      - files:
          - file-sd.json
```

After saving and restarting Prometheus, verify the filtered targets in the service discovery section of the web UI.

![The image shows a Prometheus Service Discovery page in a web browser, displaying discovered and target labels for various nodes. The interface includes details such as addresses, metrics paths, and environment settings.](https://kodekloud.com/kk-media/image/upload/v1752883099/notes-assets/images/Prometheus-Certified-Associate-PCA-Re-Labeling-Demo/prometheus-service-discovery-page.jpg)

---

## Combining Labels with Replacement

Another powerful operation is combining two or more labels into a new one. For example, you can merge the `team` and `env` labels into a new target label called `info`. This new label might have values such as `database-prod` or `web-dev`.

Below is an example rule that demonstrates this operation:

```
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: "nodes"
    relabel_configs:
      - source_labels: [team, env]
        regex: (.*);(.*)
        action: replace
        target_label: info
        replacement: $1-$2
    file_sd_configs:
      - files:
          - file-sd.json
```

Key points of this configuration:

- Two source labels (`team` and `env`) are combined.
- The regular expression `(.*);(.*)` extracts their values, using the semicolon as an internal separator.
- The `replace` action creates the new `info` label formatted as “team-environment” using `$1-$2`.

---

## Dropping Unwanted Labels

Sometimes it is beneficial to eliminate extraneous labels that do not contribute any useful information. For example, if the `size` label is unnecessary, you can remove it using the `labeldrop` action:

```
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: "nodes"
    relabel_configs:
      - regex: size
        action: labeldrop
    file_sd_configs:
      - files:
          - file-sd.json
```

In this configuration, any discovered label matching `size` is dropped while preserving all other labels.

---

## Renaming Metrics with metric_relabel_configs

Metric relabeling takes place after scraping, allowing you to modify the metrics themselves. For example, suppose you want to rename the metric `node_cpu_seconds_total` to `host_cpu_seconds_total`. Use the following configuration:

```
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: "nodes"
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: node_cpu_seconds_total
        action: replace
        replacement: host_cpu_seconds_total
        target_label: __name__
    file_sd_configs:
      - files:
          - file-sd.json
```

Highlights of the configuration:

- The special label `__name__`, representing the metric name, is used.
- If it matches `node_cpu_seconds_total`, the metric name is replaced with `host_cpu_seconds_total`.

After applying this change and restarting Prometheus, use the query interface to verify that the new metric name is available.

---

## Keeping or Dropping Specific Metrics

There may be instances where you want to focus on a specific metric and filter out the rest. For example, to keep only the metric `node_arp_entries`, add the following rule under the metric relabeling section:

```
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: "nodes"
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: node_arp_entries
        action: keep
    file_sd_configs:
      - files:
          - file-sd.json
```

This rule ensures that only `node_arp_entries` is retained while all other metrics are dropped from that particular target.

---

## Renaming a Label Within a Metric

You can also modify labels attached to a metric. For instance, if you want to rename the `mountpoint` label to `path`, the following metric relabel configuration can be used:

```
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  - job_name: "nodes"
    metric_relabel_configs:
      - source_labels: [mountpoint]
        regex: (.*)
        action: replace
        target_label: path
        replacement: $1
    file_sd_configs:
      - files:
          - file-sd.json
```

Main points to note:

- The rule captures the original `mountpoint` label value.
- The regex `(.*)` grabs the entire value.
- The new `path` label is created with the same value.
- The original `mountpoint` label remains unless you add an additional rule to remove it.

Once applied, the Prometheus interface will display the new `path` label while the `mountpoint` remains visible if not dropped.

![The image shows a Prometheus web interface displaying query results for `node_filesystem_avail_bytes`, listing various filesystem metrics in a table format. The interface includes options for enabling query history, autocomplete, highlighting, and linter.](https://kodekloud.com/kk-media/image/upload/v1752883100/notes-assets/images/Prometheus-Certified-Associate-PCA-Re-Labeling-Demo/prometheus-query-results-filesystem-metrics.jpg)

---

## Final Notes

This lesson demonstrated how to:

- Filter targets before scraping using the `keep` or `drop` actions.
- Combine multiple labels into a new composite label with the `replace` action.
- Remove unnecessary labels using `labeldrop`.
- Rename metrics and adjust labels post-scraping with metric relabeling.

> [!important]
> **Helpful Tips**
>
> Understanding and utilizing relabeling configurations enhances your metric management in Prometheus, enabling you to optimize which data gets scraped and stored. For more details on Prometheus configurations, review the [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/20a3a57d-ee2d-4096-888e-de1166cf7e3a/lesson/18126b6c-f0b9-473c-8a63-87c4243942fd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/20a3a57d-ee2d-4096-888e-de1166cf7e3a/lesson/dd157310-da98-4db0-814e-d9833f8281ed)**
>
> Practice lab
