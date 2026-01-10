# Recording Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/Recording-Rules)

---

## Table of Contents

- Recording Rules
  - Configuring Recording Rules
  - Rule File Structure
  - Querying Recording Rules
  - Best Practices for Naming Recording Rules
  - Example: Setting Up Recording Rules
  - Watch Video
  - Practice Lab

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# Recording Rules

In this lesson, we explore recording rules in Prometheus, which allow the system to periodically evaluate PromQL expressions and store the results in its time series database. By precomputing metric data, recording rules significantly accelerate dashboard performance—whether using Grafana or Prometheus’ built-in UI—by eliminating on-the-fly calculations.

![The image explains how Prometheus uses recording rules to periodically evaluate PromQL expressions and store the resulting time series, which speeds up dashboards and provides aggregated results.](https://kodekloud.com/kk-media/image/upload/v1752883039/notes-assets/images/Prometheus-Certified-Associate-PCA-Recording-Rules/prometheus-recording-rules-promql.jpg)

> [!important]
> **Tip**
>
> Before you configure recording rules, ensure that your Prometheus configuration file includes the correct reference to your rules file using the `rule_files` property.

## Configuring Recording Rules

To enable recording rules, you must define your rules in a separate file (commonly named `rules.yml`). Within your Prometheus configuration file, reference this file using the `rule_files` key. Prometheus then evaluates the specified expressions at a defined interval (such as every 30 seconds, minute, or any period you choose) and stores the results.

Below is an example Prometheus configuration that includes a rules file:

```
global:
  scrape_interval: 5s
  evaluation_interval: 5s
  rule_files:
    - rules.yml
scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - localhost:9090
```

You can also use glob patterns to automatically include multiple rule files from a directory. For instance, setting the rule file path as `/etc/prometheus/rules/*.yaml` instructs Prometheus to import all files ending with `.yaml` in that directory. Note that changes to rule files require a restart of the Prometheus server to take effect.

## Rule File Structure

A rule file consists of one or more rule groups defined under the `groups` key. Each group can have an `interval` property that overrides the global evaluation interval, and the rules inside are executed sequentially. This sequential execution ensures that if one rule depends on the output of a previous rule, its dependency will be resolved correctly. However, different groups execute in parallel.

Here is an example format for a rule file:

```
groups:
  - name: <group name 1>
    interval: <evaluation interval>
    rules:
      - record: <rule name 1>
        expr: <promql expression 1>
        labels:
          <label name>: <label value>
      - record: <rule name 2>
        expr: <promql expression 2>
  - name: <group name 2>
    rules:
      # Additional rules for group 2
```

For instance, consider recording two metrics: the percentage of free memory on a node and the percentage of free space on a filesystem. Instead of recalculating these expressions with every query, set up recording rules to compute these metrics periodically:

```
groups:
  - name: example1
    interval: 15s
    rules:
      - record: node_memory_memFree_percent
        expr: 100 - (100 * node_memory_MemFree_bytes / node_memory_MemTotal_bytes)
      - record: node_filesystem_free_percent
        expr: 100 * node_filesystem_free_bytes / node_filesystem_size_bytes
```

After configuring your rules, check their status by navigating to the "Status" tab and selecting "Rules" in the Prometheus interface. Each rule displays its state (OK or error).

## Querying Recording Rules

When querying, simply use the rule's name (e.g., `node_memory_memFree_percent`). Prometheus returns the precomputed value rather than executing the original expression. This not only speeds up the dashboard response time but also simplifies query formulation.

You can also reference a recorded rule within another rule. For example, to compute the average free percentage across instances:

```
groups:
  - name: example1
    interval: 15s
    rules:
      - record: node_filesystem_free_percent
        expr: 100 * node_filesystem_free_bytes{job="node"} / node_filesystem_size_bytes{job="node"}
      - record: node_filesystem_free_percent_avg
        expr: avg by(instance)(node_filesystem_free_percent)
```

In this example, the first rule calculates the free percentage for each filesystem, and the second rule computes the average value by instance using the initial result. Thanks to sequential execution within the group, the second rule can safely reference the result of the first.

![The image depicts a flowchart showing a sequential process with a group of rules (Rule1, Rule2, Rule3) leading to a database icon.](https://kodekloud.com/kk-media/image/upload/v1752883040/notes-assets/images/Prometheus-Certified-Associate-PCA-Recording-Rules/sequential-process-flowchart-rules-database.jpg)

## Best Practices for Naming Recording Rules

Adopting a clear naming convention helps maintain consistency and clarity. A suggested naming format breaks the name into three parts separated by a semicolon:

1.  **Level**: Indicates the aggregation level based on labels (e.g., job, method, path).
2.  **Metric Name**: The name of the metric.
3.  **Operations**: Lists the functions or aggregators applied (e.g., rate, sum, avg).

The image below illustrates this naming convention:

![The image explains a naming convention for record rules, detailing the components "level," "metric_name," and "operations," with descriptions of each part's function.](https://kodekloud.com/kk-media/image/upload/v1752883041/notes-assets/images/Prometheus-Certified-Associate-PCA-Recording-Rules/naming-convention-record-rules.jpg)

For example, consider an HTTP errors counter with labels for method and path. To compute a 5-minute error rate, you could define the rule as follows:

```
- record: job_method_path:http_errors:rate5m
  expr: sum without(instance)(rate(http_errors{job="api"}[5m]))
```

Should you decide to remove the `path` label from the aggregation, update the rule accordingly:

```
- record: job_method:http_errors:rate5m
  expr: sum without(instance, path)(rate(http_errors{job="api"}[5m]))
```

> [!important]
> **Best Practice**
>
> Group all recording rules for the same job together. For instance, if you have separate rules for jobs "node" and "docker", create distinct groups for each.

An example grouping by job:

```
groups:
  - name: node  # All rules for job="node"
    interval: 15s
    rules:
      - record: node_memory_memFree_percent
        expr: 100 - (100 * node_memory_MemFree_bytes{job="node"} / node_memory_MemTotal_bytes{job="node"})
  - name: docker  # All rules for job="docker"
    interval: 15s
    rules:
      # Docker-specific rules go here
```

## Example: Setting Up Recording Rules

Follow these steps to create and activate recording rules:

1.  Navigate to your Prometheus configuration directory (typically `/etc/prometheus`), and create or edit the `rules.yaml` file.
2.  Insert the following example configuration:

    ```
    groups:
      - name: example1
        interval: 15s
        rules:
          - record: node_filesystem_free_percent
            expr: 100 * node_filesystem_free_bytes{job="node"} / node_filesystem_size_bytes{job="node"}
          - record: node_filesystem_free_percent_avg
            expr: avg by(instance)(node_filesystem_free_percent)
    ```

    This configuration sets up a group called "example1" that runs every 15 seconds to:
    - Calculate the free percentage for each filesystem.
    - Compute the average free percentage by instance.

3.  Update your Prometheus configuration file (`prometheus.yml`) to load the rules file. For example:

    ```
    # Global configuration
    global:
      scrape_interval: 15s  # Scrape interval
      evaluation_interval: 15s  # Rule evaluation interval

    # Alertmanager configuration
    alerting:
      alertmanagers:
        - static_configs:
            - targets:
              # - alertmanager:9093

    # Load rule files
    rule_files:
      - rules.yaml

    # Scrape configurations
    scrape_configs:
      - job_name: "prometheus"
        static_configs:
          - targets: ["localhost:9090"]

      - job_name: "node"
        static_configs:
          - targets: ["192.168.1.168:9100", "192.168.1.168:9200"]

      - job_name: "api"
        static_configs:
          - targets: ["192.168.1.168:8000"]

      - job_name: "ec2"
        ec2_sd_configs:
          - region: us-east-1
            access_key: AKIAQS3OUAYMSDIJ77J
    ```

4.  Save the changes and restart the Prometheus server:

    ```
    cd /etc/prometheus/
    sudo vi rules.yaml
    sudo vi prometheus.yml
    sudo systemctl restart prometheus
    ```

    After the restart, visit the Prometheus "Status" > "Rules" page to verify that your new rules are active and display with a green OK status.

5.  To confirm rule functionality, open the expression browser and run a query for one of your recording rules:

    ```
    record: node_filesystem_free_percent
    expr: 100 * node_filesystem_free_bytes / node_filesystem_size_bytes{job="node"}
    ---
    record: node_filesystem_free_percent_avg
    expr: avg by(instance)(node_filesystem_free_percent)
    ```

    A sample query such as `$ node_filesystem_free_percent` might return:

    ```
    node_filesystem_free_percent{device="/dev/sda3", fstype="ext4", instance="192.168.1.168:9100", job="node", mountpoint="/"} 16.005607045046514
    node_filesystem_free_percent{device="/dev/sda3", fstype="ext4", instance="192.168.1.168:9100", job="node", mountpoint="/boot/efi"} 98.97682793770934
    node_filesystem_free_percent{device="tmpfs", fstype="tmpfs", instance="192.168.1.168:9100", job="node", mountpoint="/run"} 99.79180265142136
    node_filesystem_free_percent{device="tmpfs", fstype="tmpfs", instance="192.168.1.168:9100", job="node", mountpoint="/run/lock"} 99.921875
    node_filesystem_free_percent{device="tmpfs", fstype="tmpfs", instance="192.168.1.168:9100", job="node", mountpoint="/run/snapd/ns"} 99.79180265142136
    node_filesystem_free_percent{device="tmpfs", fstype="tmpfs", instance="192.168.1.168:9100", job="node", mountpoint="/run/user/1000"} 99.65394224493011
    ```

    When multiple instances are present, separate data is returned for each instance.

This comprehensive guide on recording rules in Prometheus shows how you can precompute values and efficiently organize your rules to enhance dashboard performance and simplify your queries.

For more detailed information, refer to the [Prometheus Documentation](https://prometheus.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/5f8cac58-74d2-4e4b-86ec-88390b1c5a1f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/af2a91c2-1cfa-4b6d-81dd-dbbf0db04fe0)**
>
> Practice lab
