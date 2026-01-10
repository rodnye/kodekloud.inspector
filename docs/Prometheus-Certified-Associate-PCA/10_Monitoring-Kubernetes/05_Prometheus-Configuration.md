# Prometheus Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Prometheus-Configuration)

---

## Table of Contents

- Prometheus Configuration
  - Accessing Prometheus Configurations
  - Scrape Configuration for AlertManager
  - General Kubernetes Service Discovery Configuration
  - Advanced Relabeling for AlertManager Targets
  - Additional Scraping Configurations
  - Scraping the Kubernetes API Server
  - Overview of Global Service Discovery
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Prometheus Configuration

In this guide, we explore the default Prometheus configurations and dive into the Kubernetes service discovery mechanism. Kubernetes provides native service discovery, allowing Prometheus to automatically detect and scrape metrics from various endpoints across your cluster.

Below is an overview of the four available service discovery options:

- **Node Service Discovery**: Identifies all nodes within a Kubernetes cluster and captures associated metadata labels.
- **Service Discovery**: Discovers all services along with their designated ports.
- **Pod Service Discovery**: Detects all pods running in the cluster.
- **HTTP Endpoint Service Discovery**: The most flexible method; it uses the HTTP endpoint information (IP address and port) of any Kubernetes resource (pod, service, node, etc.) to discover targets, applying additional label-based filtering.

The default setup utilizes HTTP endpoints exclusively, meaning that Prometheus retrieves and filters targets based on endpoint lookup combined with label matching.

---

## Accessing Prometheus Configurations

To view the generated configurations, open the Prometheus server or web UI and navigate to **Status** > **Configuration**. Although the global settings follow standard practices, the key focus is on the scrape configurations which determine how Prometheus identifies and collects metrics from your endpoints.

Below is a sample default scrape configuration:

```
source_labels: [__meta_kubernetes_service_name]
separator: ;
regex: .*
action: keep
kubernetes_sd_configs:
  - role: endpoints
    kubeconfig_file: /etc/kubernetes/kubeconfig.yml
    follow_redirects: true
    enable_http2: true
    namespaces:
      own_namespaces: false
      names:
        - default


rule_files:
  - /etc/prometheus/rules/prometheus-kube-prometheus-rulefiles-0/*.yaml
create_config:
  job_name: serviceMonitor/default/prometheus-kube-prometheus-alertmanager/0
  honor_labels: true
  scrape_interval: 10s
  metrics_path: /metrics
  scheme: https
  follow_redirects: true
  enable_http: true
  relabel_configs: [job]
  separator: ;
  export: [__tmp_prometheus_job_name]
  replacement: $1
  source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_labelpresent_app]
  action: keep
  regex: (prometheus-kube-prometheus-alertmanager);
  replacement: $1
  source_labels: [__meta_kubernetes_service_label_release, __meta_kubernetes_service_labelpresent_release]
  action: keep
  regex: true
  replacement: $1
  source_labels: [__meta_kubernetes_service_label_self_monitor, __meta_kubernetes_service_labelpresent_self_monitor]
  action: keep
  regex: true
  replacement: $1
  source_labels: [__meta_kubernetes_endpoint_port_name]
```

> [!important]
> **Note**
>
> The configuration above uses Kubernetes service discovery via HTTP endpoints along with a specified kubeconfig file. The job name indicates that this setup is intended for scraping the AlertManager.

---

## Scrape Configuration for AlertManager

The following configuration snippet provides a more detailed setup for scraping the AlertManager endpoint. It follows similar discovery settings and implements targeted relabeling rules:

```
source_labels: [__meta_kubernetes_service_name]
separator: ;
regex: ^web$
replacement: $1
action: keep
kubernetes_sd_configs:
  - role: endpoints
    kubernetes_config_file: /etc/kubernetes/kubeconfig.yaml
    follow_redirects: true
    enable_http2: true
    namespaces:
      own_namespace: false
      default:
rule_files:
  - /etc/prometheus/rules/prometheus-kube-prometheus-rules-files-0/*.yaml
scrape_configs:
  - job_name: serviceMonitor/default/prometheus-kube-prometheus-alertmanager/0
    honor_labels: true
    scrape_interval: 10s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    enable_http: true
    relabel_configs:
      - source_labels: [__tmp_procehtes_job_name]
        target_label: instance
        replacement: $1
      - source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_label_present_app]
        action: keep
      - source_labels: [__meta_kubernetes_service_label_present_release]
        action: keep
      - source_labels: [__meta_kubernetes_service_label_self_monitor, __meta_kubernetes_service_label_present_self_monitor]
        action: keep
```

This configuration leverages relabeling to ensure that only endpoints meeting specific label criteria—particularly those for AlertManager—are included in scraping.

---

## General Kubernetes Service Discovery Configuration

The snippet below illustrates a generic configuration that applies relabeling rules to transform and filter labels for discovered endpoints. It ensures that important labels are preserved and accurately set:

```
action: replace
source_labels: [__meta_kubernetes_pod_container_name]
separator: ;
regex: (.*)
target_label: container
replacement: $1
action: replace
source_labels: [__meta_kubernetes_service_name]
separator: ;
regex: (.*)
target_label: job
replacement: $1
action: replace
source_labels: [__address__]
separator: ;
regex: (.*)
target_label: __tmp_hash
replacement: $1
action: hashmod
source_labels: [__tmp_hash]
separator: ;
action: keep
kubernetes_sd_config:
  role: endpoints
kubeconfig_file:
  follow_redirects: true
  enable_http2: true
namespaces:
  keep_all: false
  names:
    - default
job_name: 'secrets/information/default/prometheus-kube-prometheus-operator/0'
honor_timestamps: true
scrape_interval: 30s
scrape_timeout: 10s
metrics_path: /metrics
scheme:
  type: bearertoken
  token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
  tls_config:
    ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    server_name: kubernetes
    insecure_skip_verify: false
    follow_redirects: true
    source_labels: [job]
```

Each relabeling action in this snippet is intended to adjust the target labels, generate unique hashes for addresses, and apply standard Kubernetes service discovery settings with controlled namespace filtering.

---

## Advanced Relabeling for AlertManager Targets

For a more refined selection of the AlertManager endpoint, advanced relabeling is applied. This snippet demonstrates how "keep" and "replace" actions work together to uniquely identify the AlertManager target by matching specific labels:

```
replacement: $1
action: keep
kubernetes_sd_configs:
  - role: endpoints
    kubeconfig_file:
    follow_redirects: true
    enable_http2: true
    namespaces:
      own_namespaces: false
      allow:
        - default


rule_files:
  - /etc/prometheus/rules/prometheus-kube-prometheus-rulefiles-0/*.yaml
scrape_configs:
  - job_name: serviceMonitor/default/prometheus-kube-prometheus-alertmanager/0
    honor_timestamps: true
    scrape_interval: 10s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_label_present_app]
        separator: ;
        regex: (.*)
        target_label: __tmp_prometheus_job_name
        replacement: $1
        action: replace
      - source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_label_present_app]
        separator: ;
        regex: (kube-prometheus-stack-alertmanager);true
        replacement: $1
        action: keep
      - source_labels: [__meta_kubernetes_service_label_release, __meta_kubernetes_service_label_present_release]
        action: keep
        regex: (prometheus);true
      - source_labels: [__meta_kubernetes_service_label_self_monitor, __meta_kubernetes_service_label_present_self_monitor]
        regex: (true);true
        action: keep
      - source_labels: [__meta_kubernetes_endpoint_port_name]
        action: keep
        regex: sb
        replacement: sb
      - source_labels: [__meta_kubernetes_endpoint_address_target_kind, __meta_kubernetes_endpoint_address_target_name]
        action: replace
        target_label: __address__
        replacement: $1:$2
```

> [!important]
> **Note**
>
> Advanced relabeling helps isolate the AlertManager endpoint by ensuring that only targets with the correct service labels (such as the service app and release) are scraped.

---

## Additional Scraping Configurations

Sometimes additional relabeling steps are required when scraping AlertManager. In the snippet below, temporary labels are set for better endpoint identification:

```
kubeconfig_file:
  follow_redirects: true
  enable_http2: true
  namespace:
    out_namespace: false
    name:
      files:
        - default
rule_files:
  - /etc/prometheus/rules/prometheus-prometheus-kube-prometheus-rulefiles-0.yaml
scrape_configs:
  - job_name: service:default/prometheus-alertmanager
    honor_labels: true
    scrape_interval: 30s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    follow_redirects: true
    enable_http2: true
    relabel_config:
      - source_labels: [job]
        separator: ;
        regex: tmp_prometheus_job_name
        replacement: $1
        action: replace
      - source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_labelpresent_app]
        separator: ;
        regex: (kub:prometheus-stack-alertmanager);true
        replacement: $1
        action: keep
      - source_labels: [__meta_kubernetes_service_label_release, __meta_kubernetes_service_labelpresent_release]
        replacement: $1
        action: keep
      - source_labels: [__meta_kubernetes_service_label:self_monitor, __meta_kubernetes_service_labelpresent_self_monitor]
        replacement: $1
        action: keep
      - regex: (prometheus);true
        replacement: $1
        action: keep
      - source_labels: [__meta_kubernetes_endpoint_address_target_kind, __meta_kubernetes_endpoint_address_target_name]
        replacement: $1
```

This configuration relabels jobs with temporary identifiers and retains only those endpoints whose labels match the desired AlertManager criteria.

Furthermore, similar patterns can be seen in configurations for other Kubernetes components such as the API server, CoreDNS, kube-controller-manager, and kube-proxy. These use various relabeling techniques to map Kubernetes metadata into Prometheus labels while excluding irrelevant targets.

For instance, a typical CoreDNS configuration might look like:

```
scrape_interval: 10s
metrics_path: /metrics
scheme: http
follow_redirects: true
enable_http2: true
relabel_configs:
  - source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_label_present_app]
    action: keep
  - source_labels: [__meta_kubernetes_service_label_release, __meta_kubernetes_service_label_present_release]
    action: keep
    regex: (prometheus);true
    replacement: $1
  - action: keep
    source_labels: [__meta_kubernetes_service_label_self_monitor, __meta_kubernetes_service_label_present_self_monitor]
    regex: (true);true
    replacement: $1
  - source_labels: [__meta_kubernetes_endpoint_port_name]
    action: keep
    regex: (http);true
    replacement: $1
  - source_labels: [__meta_kubernetes_endpoint_address_target_kind, __meta_kubernetes_endpoint_address_target_name]
    action: replace
    regex: (node);true
    replacement: $1
  - source_labels: [__meta_kubernetes_endpoint_address_target_kind, __meta_kubernetes_endpoint_address_target_name]
    action: replace
    regex: (pod);true
    replacement: $1
  - source_labels: [__meta_kubernetes_namespace]
    action: replace
    regex: (.*);$1
    replacement: $1
  - source_labels: [__meta_kubernetes_service_name]
    action: replace
    regex: (.*);$1
    replacement: $1
```

Each rule ensures that meaningful labels are derived from Kubernetes metadata so that only valid monitoring targets (e.g., AlertManager, API server) are included.

---

## Scraping the Kubernetes API Server

Retrieving metrics from the Kubernetes API server involves standard HTTP endpoint discovery complemented by proper authorization and TLS settings. The configuration below outlines the necessary steps:

```
action: keep
kubernetes_sd_configs:
  - role: endpoints
    kubernetes_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    tls_config:
      insecure: true
    follow_redirects: true
    names:
      - kubesystem
- job_name: serviceMonitor/default/prometheus-kube-prometheus-api-server/0
  honor_timestamps: true
  scrape_interval: 30s
  scrape_timeout: 10s
  metric_path: /metrics
  schemes:
    - https
  authorization:
    type: Bearer
    credentials_file: /var/run/secrets/kubernetes.io/serviceaccount/token
  tls_config:
    ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    server_name: kubernetes
    insecure_skip_verify: false
  follow_redirects: true
  enable_http2: true
relabel_configs:
  - source_labels: [job]
    action: replace
    target_label: __tmp_prometheus_job_name
    replacement: $1
  - source_labels: [__meta_kubernetes_service_label_component, __meta_kubernetes_service_labelpresent_component]
    action: replace
    target_label: component
    replacement: $1
  - source_labels: [__meta_kubernetes_endpoint_address_target_name]
    action: replace
    target_label: __meta_kubernetes_service_label_provider
    replacement: $1
  - source_labels: [__meta_kubernetes_endpoint_address_target_kind, __meta_kubernetes_endpoint_address_target_name]
    action: keep
```

This configuration guarantees secure metric collection from the API server using proper authorization and TLS settings.

---

## Overview of Global Service Discovery

The final snippet integrates all the individual scrape configurations and service discovery settings. Prometheus automatically detects and monitors a variety of targets, including AlertManager, kubelet instances, the operator, and more:

```
global:
  scrape_interval: 30s
  evaluation_interval: 10s
  external_labels:
    prometheus: default/prometheus-kube-prometheus
    prometheus_replica: prometheus-prometheus-kube-prometheus-0
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - prometheus-kube-prometheus-alertmanager:9093
  enable_http2: true
scrape_configs:
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
      - role: endpoints
  - job_name: 'kube-state-metrics'
    kubernetes_sd_configs:
      - role: endpoints
    metrics_paths:
      - /metrics
    scheme: https
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_name]
        action: keep
kubernetes_sd_configs:
  - role: endpoints
rule_files:
  - /etc/prometheus/rules/prometheus-kube-prometheus-kube-prometheus-rulefiles-0.yaml
```

When you check the Prometheus UI, you should see that all configured targets (AlertManager, kubelet instances, the API server, CoreDNS, etc.) are marked as "UP," confirming that they are actively being monitored.

![The image shows a Prometheus monitoring dashboard displaying a list of targets with their endpoints, states, labels, last scrape times, and scrape durations. All targets are marked as "UP" indicating they are active and being monitored.](https://kodekloud.com/kk-media/image/upload/v1752882995/notes-assets/images/Prometheus-Certified-Associate-PCA-Prometheus-Configuration/prometheus-monitoring-dashboard-targets.jpg)

All these configurations are automatically deployed when you install Prometheus via the Helm chart. There is no need to manually create these extensive relabel configurations, as they are provided per job to ensure seamless target discovery and efficient metric scraping.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/1f206fab-608b-4e75-a2a2-2808265c2341)**
>
> Watch video content
