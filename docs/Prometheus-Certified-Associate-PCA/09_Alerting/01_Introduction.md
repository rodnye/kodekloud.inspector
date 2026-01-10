# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Alerting/Introduction)

---

## Table of Contents

- Introduction
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Alerting

# Introduction

In this article, we focus on Prometheus's alerting functionality—a vital feature for maintaining production system health. In production, unexpected issues such as low disk space can occur at any time. For instance, if a server runs critically low on available disk space in the middle of the night, manual observation is unlikely. An automated alerting mechanism is therefore essential.

Prometheus supports the creation of alerting rules that evaluate using standard PromQL expressions. When the expression returns one or more vector elements—that is, when the condition is met—Prometheus triggers an alert. For example, to monitor low disk space, you might use an expression like the following:

```
$ node_filesystem_avail_bytes < 1000
node_filesystem_avail_bytes{device="tmpfs", instance="node1", mountpoint="/run/lock"} 547
```

In this example, an alert is generated if the metric value for available bytes falls below 1000. Moreover, if there are several results from the same query, multiple alerts will be triggered.

> [!important]
> **Note**
>
> Prometheus is solely responsible for firing alerts. It does not send notifications such as emails or SMS messages directly.

Instead, Prometheus relays alert data to Alertmanager, a dedicated component that handles notifications by integrating with various communication tools like email, Slack, or paging services. This separation of concerns allows a single Alertmanager to manage alerts from multiple Prometheus servers across different environments.

![The image explains that Prometheus triggers alerts but does not send notifications, which is handled by a separate process called Alertmanager. It includes a diagram showing Alertmanager sending notifications to users via email, Slack, and other services.](https://kodekloud.com/kk-media/image/upload/v1752882951/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/prometheus-alertmanager-notifications-diagram.jpg)

Alerting rules in Prometheus are configured in a way similar to recording rules and can be combined within the same rule group. For example, consider the configuration below that includes both a recording rule and an alerting rule:

```
groups:
  - name: node
    interval: 15s
    rules:
      - record: node_memory_memFree_percent
        expr: 100 - (100 * node_memory_MemFree_bytes{job="node"} / node_memory_MemTotal_bytes{job="node"})
      - alert: LowMemory
        expr: node_memory_memFree_percent < 20
        for: 3m
```

In this configuration, the "LowMemory" alert is triggered when the percentage of free memory drops below 20% for at least 3 minutes.

Another common alert scenario involves monitoring the health of nodes. An alert expression that checks whether a node is down uses the `up` metric; if this metric equals zero, the target is considered unreachable. To avoid false positives from transient issues like brief network interruptions, the `for` clause is utilized to ensure that the alert is triggered only if the condition persists over a defined period. For example:

```
- alert: NodeDown
  expr: up{job="node"} == 0
  for: 3m
```

With this setting, a node initially enters a pending state if the down condition is detected, and only transitions into the firing state if it remains down for 3 minutes.

> [!important]
> **Alert States in Prometheus**
>
> Prometheus classifies alerts into three states:
>
> 1.  Inactive: No alert condition is met (expression returns no results).
> 2.  Pending: Alert conditions have been detected but have not persisted long enough.
> 3.  Firing: Alert conditions have been continuously met for the specified duration, making the alert active.

For instance, if a node remains down for 5 minutes, the alert will move from pending to firing. Here is an example configuration for such a scenario:

```
groups:
  - name: node
    rules:
      - alert: NodeDown
        expr: up{job="node"} == 0
        for: 5m
```

When you navigate to the Alerts tab on the Prometheus dashboard, you'll see all the current alert statuses. Inactive alerts are shown in green. Once an alert condition is detected, the alert appears as pending and then shifts to the firing state if the condition persists beyond the configured duration.

![The image shows a monitoring dashboard with alerts for "Node down," one in a pending state and another in a firing state, with associated labels and details.](https://kodekloud.com/kk-media/image/upload/v1752882953/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/monitoring-dashboard-node-alerts.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/91532f0e-a56b-46c5-88fe-57e3ad48b1d4)**
>
> Watch video content
