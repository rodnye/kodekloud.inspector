# Additional Scrape Configs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Additional-Scrape-Configs)

---

## Table of Contents

- Additional Scrape Configs
  - Overview
  - Extracting Default Helm Values
  - Detailed Scrape Configuration Example
  - Deploying Your Configuration
  - Next Steps: Service Discovery
  - Key Helm Commands Recap
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Additional Scrape Configs

In this lesson, you'll learn how to update your Kubernetes deployment to ensure Prometheus is aware of new scrape targets. There are two methods for this configuration: one approach, which involves directly modifying additional scrape configurations in a Helm values file, and a more optimal method using service discovery that aligns with Prometheus Operator best practices. In the following sections, we'll start by exploring the less preferred approach and then cover how to use service discovery for a dynamic setup.

## Overview

When you first worked with Helm, you learned about the values file that enables you to customize a Helm chart. To get a comprehensive view of all configuration options available in the "prometheus-community/kube-prometheus-stack" chart, extract the default values to a file. This file provides insight into every available configuration setting, including the "additionalScrapeConfigs" section.

For example, consider the simple service definition below:

```
apiVersion: v1
kind: Service
metadata:
  name: api-service
  labels:
    job: node-api
```

## Extracting Default Helm Values

To view the default values for this Helm chart, run the following command:

```
helm show values prometheus-community/kube-prometheus-stack > values.yaml
```

This command generates a comprehensive list of configuration options. When you search for "additional scrape" within the file, you will find a section that looks similar to this:

```
additionalScrapeConfigs: []
  - job_name: kube-etcd
    kubernetes_sd_configs:
      - role: node
        scheme: https
        tls_config:
```

This section enables you to add custom scrape configurations, similar to how jobs are configured directly on your Prometheus server.

> [!important]
> **Warning**
>
> Any modifications made in the `additionalScrapeConfigs` section are not validated by Prometheus, and incorrect configurations might cause upgrade failures.

## Detailed Scrape Configuration Example

Below is a more detailed configuration example for a job, which illustrates how you can define additional scrape targets:

```
additionalScrapeConfigs: []
  - job_name: kube-etcd
    kubernetes_sd_configs:
      - role: node
    scheme: https
    tls_config:
      ca_file: /etc/prometheus/secrets/etcd-client-cert/etcd-ca
      cert_file: /etc/prometheus/secrets/etcd-client-cert/etcd-client
      key_file: /etc/prometheus/secrets/etcd-client-cert/etcd-client-key
    relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
        source_labels: [__address__]
        action: replace
        targetLabel: __address__
        regex: ([^;]+):(\d+)
        replacement: ${1}:2379
```

You can uncomment, modify, or replace these jobs to include every target you want Prometheus to scrape.

## Deploying Your Configuration

After updating the `values.yaml` file with your custom scrape configurations, deploy the changes using a Helm upgrade:

```
helm upgrade prometheus prometheus-community/kube-prometheus-stack -f values.yaml
```

This command applies your new scrape configurations, ensuring that Prometheus can now monitor the additional targets. Although this configuration method works, it might cause issues during upgrades due to its rigid nature.

## Next Steps: Service Discovery

In the next section, we will demonstrate how to use service discovery to declaratively and dynamically add new scrape configurations to Prometheus, offering a more flexible and robust solution.

## Key Helm Commands Recap

Here are the key Helm commands used in this lesson:

```
helm show values prometheus-community/kube-prometheus-stack > values.yaml
helm upgrade prometheus prometheus-community/kube-prometheus-stack -f values.yaml
```

With these steps, your Prometheus deployment will be updated to include the new targets added via your additional scrape configurations, allowing you to monitor your Kubernetes environment more effectively.

For further reading, check out these resources: [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/), [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/c0644cd7-27af-4637-853b-61f7cb946ca8)**
>
> Watch video content
