# Prometheus Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Prometheus-Configuration)

---

## Table of Contents

- Prometheus Configuration
  - Global and Scrape Configurations
  - Customizing Scrape Targets
  - Explanation of Key Scrape Config Fields
  - Applying Changes to prometheus.yaml
  - Verifying the Configuration
  - Watch Video
  - Practice Lab

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Prometheus Configuration

In this article, you'll learn how to configure Prometheus to scrape metrics from multiple nodes effectively. After installing the Prometheus server and setting up one or more nodes with Node Exporter, the next step is to configure Prometheus to actively pull metrics from these targets. Prometheus utilizes a pull-based model, meaning you must explicitly define the targets to scrape in the configuration.

All configurations are made in the prometheus.yaml file, typically located in the /etc/prometheus folder.

Below is an example of a basic Prometheus configuration file:

```
# my global config
global:
  scrape_configs:
    - job_name: "prometheus"
      static_configs:
        - targets: ["localhost:9090"]
```

In this configuration, the global section establishes defaults that other parts of the file inherit. These defaults can be overridden in specific sections when needed.

## Global and Scrape Configurations

Consider a more detailed configuration that includes additional global parameters and scrape settings:

```
global:
  scrape_interval: 1m
  scrape_timeout: 10s


scrape_configs:
  - job_name: 'node'
    scrape_interval: 15s
    scrape_timeout: 5s
    sample_limit: 1000
    static_configs:
      targets: ['172.16.12.1:9090']
```

In this setup:

- The **global** section sets a default scrape interval of 1 minute and a scrape timeout of 10 seconds.
- The **scrape_configs** section defines a job named "node" that sets its own scrape interval (15 seconds), timeout (5 seconds), and sample limit (1000), which override the global defaults.

Additional configurations—such as alerting, rule files, remote read/write, and storage—can also be specified:

```
global:
  scrape_interval: 1m
  scrape_timeout: 10s
scrape_configs:
  - job_name: node
    scrape_interval: 15s
    scrape_timeout: 5s
    sample_limit: 1000
    static_configs:
      targets: ['172.16.12.1:9090']
# Configuration related to AlertManager
alerting:
# Rule files specify a list of files from which rules are read
rule_files:
# Settings related to the remote read/write feature.
remote_read:
remote_write:
# Storage related settings
storage:
```

## Customizing Scrape Targets

To set up a new scrape configuration, create a job for the target nodes. For instance, the following configuration sets up a job named "nodes" with a custom scrape interval, timeout, and request settings:

```
scrape_configs:
  - job_name: 'nodes'
    scrape_interval: 30s           # Scrape every 30 seconds
    scrape_timeout: 3s             # Timeout after 3 seconds if no response
    scheme: https                # Use HTTPS to scrape metrics
    metrics_path: /stats/metrics   # Custom path for metrics if not served on /metrics
    static_configs:
      - targets: ['10.231.1.2:9090', '192.168.43.9:9090']
```

This configuration instructs Prometheus to scrape two nodes at the specified IP addresses using HTTPS and a custom metrics path `/stats/metrics`.

## Explanation of Key Scrape Config Fields

Below is a breakdown of the common configuration fields used in a scrape job:

```
scrape_configs:
  # How frequently to scrape targets from this job.
  [ scrape_interval: <duration> | default = <global_config.scrape_interval> ]


  # Per-scrape timeout when scraping this job.
  [ scrape_timeout: <duration> | default = <global_config.scrape_timeout> ]


  # The HTTP resource path to fetch metrics from targets.
  [ metrics_path: <path> | default = /metrics ]


  # Configures the protocol scheme used for requests.
  [ scheme: <scheme> | default = http ]


  # Sets the 'Authorization' header on every scrape request using provided credentials.
  # Note: password and password_file are mutually exclusive.
  basic_auth:
    [ username: <string> ]
    [ password: <secret> ]
    [ password_file: <string> ]
```

- The **scrape_interval** defines how often Prometheus queries the targets.
- The **scrape_timeout** determines how long to wait before marking a scrape as failed.
- The **metrics_path** allows customization of the URL path for metrics if the target uses a different endpoint than `/metrics`.
- The **scheme** specifies whether HTTP or HTTPS is used.
- The **basic_auth** section configures basic authentication when required.

## Applying Changes to prometheus.yaml

After updating the prometheus.yaml file, note that Prometheus does not automatically reload its configuration. You must restart the Prometheus process for the changes to take effect. If you run Prometheus manually (for example, running ./prometheus), stop it with Ctrl+C and restart it. If you are using systemd, you have multiple options:

```
$ ctrl+c -> ./prometheus
$ kill -HUP <pid>
$ systemctl restart prometheus
```

The preferred method is to restart the process using systemd.

Next, update the Prometheus configuration to include a new job for your node. Open the configuration file with your preferred editor:

```
sudo vi /etc/prometheus/prometheus.yaml
```

When you inspect the file, you might see a base configuration where Prometheus is already set to scrape itself on `localhost:9090`:

```
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).


# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
      - targets:
        - alertmanager:9093


# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"


# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    static_configs:
      - targets: ['localhost:9090']
```

To add a new job for your node, append a section like the following:

```
# my global config
global:
  scrape_interval: 15s  # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s  # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).


# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
      - targets:
        - alertmanager:9093


# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"


# Scrape configurations for Prometheus self-monitoring and Node Exporter.
scrape_configs:
  # Prometheus self-monitoring configuration.
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]


  # Node Exporter configuration.
  - job_name: "node"
    static_configs:
      - targets: ["192.168.1.168:9100"]
```

Save the file and restart Prometheus to apply the changes:

```
sudo vi /etc/prometheus/prometheus.yml
sudo systemctl restart prometheus
```

> [!important]
> **Reminder**
>
> After restarting, verify that the new configuration is active.

## Verifying the Configuration

Once Prometheus is restarted, open your browser and navigate to the Prometheus web interface. Under the "Status" menu, select "Targets" to review the list of configured scrape targets and their statuses.

You should see both the default Prometheus target (`localhost:9090`) and your new node target (`192.168.1.168:9100`). A state of "up" indicates that metrics are being successfully scraped. To confirm, you can query the `up` metric in the Prometheus expression browser:

```
up{instance="192.168.1.168:9100",job="node"}
up{instance="localhost:9090",job="prometheus"}
```

A returned value of 1 signifies that the instance is up and functioning normally.

With this configuration, Prometheus is now set up to scrape metrics from itself as well as from a Linux machine running Node Exporter. For more details on Prometheus configurations and best practices, consider exploring the [official Prometheus documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/82d2fead-e942-4e95-966a-1e9fa3184311)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/09035c83-0db2-4a0a-af61-a5d94727ee06)**
>
> Practice lab
