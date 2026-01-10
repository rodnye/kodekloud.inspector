# Re Labeling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Service-Discovery/Re-Labeling)

---

## Table of Contents

- Re Labeling
  - Key Relabeling Options
  - Filtering Targets Based on Labels
  - Combining Multiple Labels
  - Managing Target Labels
  - Dropping and Keeping Labels
  - Metric Relabeling
  - Conclusion
  - Watch Video
    - Example Configuration for EC2 Service Discovery
    - Keeping Targets for Production
    - Dropping Targets for Development
    - Extracting the IP Address
    - Dropping a Specific Label
    - Keeping Only Specific Labels
    - Mapping Discovery Labels
    - Dropping a Metric
    - Renaming a Metric
    - Dropping a Metric Label
    - Modifying Metric Labels

---

## Content

Prometheus Certified Associate (PCA)

Service Discovery

# Re Labeling

In this lesson, we explore the relabeling feature in Prometheus, which enables you to classify and filter targets and metrics by rewriting their label sets. Relabeling is especially useful when you have service discovery that identifies multiple targets, but you only want to scrape those in a specific environment (e.g., production). With relabeling, you can filter out unwanted targets, rename or drop labels, and even modify label values before or after scraping.

> [!important]
> **Overview**
>
> Relabeling in Prometheus operates in two distinct phases:
>
> - **Pre-scrape (relabel_configs):** Processes labels provided by service discovery.
> - **Post-scrape (metric_relabel_configs):** Processes all collected metric labels.

![The image illustrates the concept of re-labeling in Prometheus, showing how targets and metrics can be classified or filtered by rewriting their label set, with a flow diagram including servers and a recycling bin icon.](https://kodekloud.com/kk-media/image/upload/v1752883102/notes-assets/images/Prometheus-Certified-Associate-PCA-Re-Labeling/prometheus-relabeling-flow-diagram.jpg)

## Key Relabeling Options

There are two primary options for relabeling in Prometheus:

1.  **relabel_configs:**
    - Specified under `scrape_configs` and executed **before** a scrape.
    - Has access only to the labels provided by service discovery.

2.  **metric_relabel_configs:**
    - Executes **after** a scrape.
    - Has access to all collected metrics and labels.

### Example Configuration for EC2 Service Discovery

Below is an example configuration using [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) service discovery. Notice that both relabeling options are included:

```
scrape_configs:
  - job_name: EC2
    relabel_configs:  # Executes before scraping; only service discovery labels are available.
    metric_relabel_configs:  # Executes after scraping; all metric labels are available.
    ec2_sd_configs:
      - region: <region>
        access_key: <access key>
        secret_key: <secret key>
```

## Filtering Targets Based on Labels

Consider a scenario where EC2 service discovery finds two targets. AWS provides considerable metadata through labels, for example:

```
__meta_ec2_tag_env=dev | prod
```

You can use this meta label to decide which targets to scrape. For instance, if you only want to scrape targets with `__meta_ec2_tag_env` set to "prod", define a rule to keep only matching targets. Non-matching targets are dropped implicitly.

### Keeping Targets for Production

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - source_labels: [__meta_ec2_tag_env]
        regex: prod
        action: keep
```

In this configuration, any target that does not have `__meta_ec2_tag_env` set to "prod" will be dropped.

### Dropping Targets for Development

Alternatively, if you want to drop targets where `__meta_ec2_tag_env` is "dev", the configuration would be:

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - source_labels: [__meta_ec2_tag_env]
        regex: dev
        action: drop
```

## Combining Multiple Labels

When you need to filter based on more than one label, specify multiple source labels. By default, Prometheus joins these values with a semicolon. For example, to keep targets where "env" equals "dev" and "team" equals "marketing":

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - source_labels: [env, team]
        regex: dev;marketing
        action: keep
```

If you require a different separator (e.g., a dash), use the `separator` property:

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - source_labels: [env, team]
        regex: dev-marketing
        action: keep
        separator: "-"
```

## Managing Target Labels

Target labels are added to every time series returned from a scrape. During relabeling, discovered labels (typically starting with `__`) are dropped unless explicitly preserved. For example, if your EC2 instances return metadata that includes the IP address and port, you may want to create a target label that extracts just the IP address.

### Extracting the IP Address

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - source_labels: [__address__]
        regex: (.*):.*
        target_label: ip
        action: replace
        replacement: $1
```

This rule uses a regular expression to capture the IP address from the `__address__` label, assigning it to the new "ip" label.

## Dropping and Keeping Labels

You can also drop labels using `labeldrop` or restrict to a subset of labels using `labelkeep`.

### Dropping a Specific Label

To drop the label `__meta_ec2_owner_id`:

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - regex: __meta_ec2_owner_id
        action: labeldrop
```

### Keeping Only Specific Labels

To keep only the labels named "instance" or "job":

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - regex: instance|job
        action: labelkeep
```

Below is an example of labels you might observe from a scrape (labels starting with two underscores are removed after relabeling):

```
address="172.31.11.156:80"
meta_ec2_ami="ami-026b7f3c838c2eec"
meta_ec2_architecture="x86_64"
meta_ec2_availability_zone="us-east-1b"
meta_ec2_availability_zone_id="e0a2391e6c198db"
meta_ec2_instance_state="running"
meta_ec2_instance_type="t2.micro"
meta_ec2_owner_id="404497317140"
meta_ec2_primary_subnet_id="subnet-0fdeb557c6c80641"
meta_ec2_private_dns_name="ip-172-31-11-156.ec2.internal"
meta_ec2_private_ip="172.31.11.156"
meta_ec2_public_dns_name="ec2-3-80-117-102.compute-1.amazonaws.com"
meta_ec2_public_ip="3.80.117.102"
meta_ec2_region="us-east-1"
meta_ec2_subnet_id="subnet-0fdc973dfc680614"
meta_ec2_Name="web"
meta_ec2_tag_env="dev"
meta_ec2_id="i-9c1e294f5535"
metrics_path="/metrics"
scheme="http"
scrape_interval="15s"
scrape_timeout="10s"
job="ec2"
```

### Mapping Discovery Labels

To preserve and convert labels that begin with `__meta_ec2_`, use the `labelmap` action. This action modifies the label names rather than their values. For example:

```
scrape_configs:
  - job_name: example
    relabel_configs:
      - regex: __meta_ec2_(.*)
        action: labelmap
        replacement: ec2_$1
```

This rule converts a discovered label such as `__meta_ec2_AMI` into a target label `ec2_AMI` with the same value.

## Metric Relabeling

After scraping, metric relabeling via `metric_relabel_configs` allows you to modify metrics directly. The structure is similar to `relabel_configs`, but you have access to all metric labels.

### Dropping a Metric

To drop a metric named `http_errors_total` (stored in the `__name__` label):

```
scrape_configs:
  - job_name: example
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: http_errors_total
        action: drop
```

### Renaming a Metric

To rename a metric from `http_errors_total` to `http_failures_total`:

```
scrape_configs:
  - job_name: example
    metric_relabel_configs:
      - source_labels: [__name__]
        regex: http_errors_total
        action: replace
        target_label: __name__
        replacement: http_failures_total
```

### Dropping a Metric Label

To drop a metric label named "code":

```
scrape_configs:
  - job_name: example
    metric_relabel_configs:
      - regex: code
        action: labeldrop
```

### Modifying Metric Labels

Suppose you have a metric label "path" with values like "/cars" and you want to create a new label "endpoint" that contains just "cars". You can strip off the forward slash as follows:

```
scrape_configs:
  - job_name: example
    metric_relabel_configs:
      - source_labels: [path]
        regex: \/(.*)
        action: replace
        target_label: endpoint
        replacement: $1
```

This rule uses a regular expression to remove the leading forward slash from the "path" label and stores the result in the "endpoint" label.

## Conclusion

This lesson provided a comprehensive overview of both `relabel_configs` and `metric_relabel_configs`. By understanding these relabeling techniques, you can effectively filter, rename, drop, and map metrics and labels within Prometheus, ensuring that only the relevant data is scraped and stored.

For more information, refer to the [Prometheus documentation](https://prometheus.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/20a3a57d-ee2d-4096-888e-de1166cf7e3a/lesson/d64a976c-94eb-40e4-94bf-8b9a30f4867a)**
>
> Watch video content
