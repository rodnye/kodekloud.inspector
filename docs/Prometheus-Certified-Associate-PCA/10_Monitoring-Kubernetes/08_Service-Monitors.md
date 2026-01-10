# Service Monitors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Service-Monitors)

---

## Table of Contents

- Service Monitors
  - Understanding Custom Resource Definitions (CRDs)
  - What Is a ServiceMonitor?
  - Deploying a Service and ServiceMonitor
  - Integrating ServiceMonitor with Prometheus
  - Applying the Configuration
  - Verifying in Prometheus
  - Reviewing the Final Prometheus Configuration
  - Summary
  - Watch Video
    - Kubernetes Service Definition
    - ServiceMonitor Definition

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Service Monitors

This guide demonstrates how to add new scrape targets to Prometheus using the ServiceMonitor custom resource. Leveraging Kubernetes Custom Resource Definitions (CRDs) allows you to declaratively configure Prometheus to automatically discover and scrape new endpoints—no manual configuration updates necessary.

---

## Understanding Custom Resource Definitions (CRDs)

The Prometheus Operator deploys several CRDs to provide a high-level abstraction for deploying and configuring Prometheus. Key CRDs include those for AlertManager, Prometheus, and ServiceMonitor. To list all available CRDs, run:

```
kubectl get crd
```

Sample output:

```
NAME                                             CREATED AT
alertmanagerconfigs.monitoring.coreos.com       2022-11-18T01:18:55Z
alertmanagers.monitoring.coreos.com              2022-11-18T01:18:55Z
eniconfigs.crd.k8s.amazonaws.com                 2022-11-18T01:04:11Z
podmonitors.monitoring.coreos.com                2022-11-18T01:18:56Z
probes.monitoring.coreos.com                     2022-11-18T01:18:56Z
prometheuses.monitoring.coreos.com                2022-11-18T01:18:57Z
prometheusrules.monitoring.coreos.com            2022-11-18T01:18:56Z
securitygrouppolicies.vpcresources.k8s.aws       2022-11-18T01:04:14Z
servicemonitors.monitoring.coreos.com            2022-11-18T01:18:57Z
thanostruers.monitoring.coreos.com               2022-11-18T01:18:57Z
```

The ServiceMonitor CRD is particularly important because it enables you to define additional scraping targets (jobs) for Prometheus. Every ServiceMonitor is handled by Prometheus like any other Kubernetes resource.

---

## What Is a ServiceMonitor?

A ServiceMonitor resource specifies a set of targets for Prometheus to monitor and scrape. Instead of manually editing the Prometheus configuration, you can use Kubernetes' declarative syntax. When a ServiceMonitor is created, Prometheus discovers it via its selector settings and automatically begins scraping the defined endpoints.

![The image is a slide explaining "Service Monitors," which define targets for Prometheus to monitor and scrape, allowing the use of declarative Kubernetes syntax to avoid direct configuration.](https://kodekloud.com/kk-media/image/upload/v1752882996/notes-assets/images/Prometheus-Certified-Associate-PCA-Service-Monitors/service-monitors-prometheus-kubernetes.jpg)

Using ServiceMonitors, you can automatically associate Kubernetes Services with Prometheus scrape configurations through label selectors. This many-to-one mapping streamlines the process of updating endpoints, avoiding the need to revise Prometheus configuration files each time a new endpoint is added.

For instance, if you have deployed an application with an associated Kubernetes Service, simply create a ServiceMonitor that references it to include its endpoints in Prometheus’ scrape targets.

---

## Deploying a Service and ServiceMonitor

Below is an example configuration for deploying a Kubernetes Service and a corresponding ServiceMonitor for an API.

### Kubernetes Service Definition

```
# service.yml
apiVersion: v1
kind: Service
metadata:
  name: api-service
  labels:
    job: node-api
    app: service-api
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
    - name: web
      protocol: TCP
      port: 3000
      targetPort: 3000
```

### ServiceMonitor Definition

```
# Service-monitor.yml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: api-service-monitor
  labels:
    release: prometheus
    app: prometheus
spec:
  jobLabel: job
  endpoints:
    - interval: 30s
      port: web
      path: /swagger-stats/metrics
  selector:
    matchLabels:
      app: service-api
```

> [!important]
> **Key Points**
>
> - **Labels and Selectors:**
>   The ServiceMonitor’s `selector.matchLabels` finds services with the label `app: service-api`. Ensure your Service definition matches this label.
> - **Endpoint Configuration:**
>   The specified endpoint in the ServiceMonitor defines a 30-second scrape interval, uses the port named `web`, and sets the metrics path to `/swagger-stats/metrics` (customize as needed).
> - **Job Label Mapping:**
>   The `jobLabel` property maps the `job` label from your Service resource (e.g., `job: node-api`) which Prometheus uses as the job name.

---

## Integrating ServiceMonitor with Prometheus

Prometheus auto-discovers ServiceMonitor resources by using selectors. In the Prometheus custom resource (CR) YAML, you can see a configuration like:

```
kubectl get prometheuses.monitoring.coreos.com -o yaml
```

Excerpt from the Prometheus configuration:

```
serviceMonitorNamespaceSelector: {}
serviceMonitorSelector:
  matchLabels:
    release: prometheus
```

This instructs Prometheus to include any ServiceMonitor with the label `release: prometheus` in its target list. Ensure that your ServiceMonitor resource carries this label for successful integration.

---

## Applying the Configuration

After updating your deployment configuration (such as in `api-depl.yaml`), apply your changes using:

```
kubectl apply -f api-depl.yaml
```

Sample terminal output:

```
Documents\scratch\example> kubectl apply -f api-depl.yaml
deployment.apps/api-deployment unchanged
service/api-service unchanged
servicemonitor.monitoring.coreos.com/api-service-monitor created
Documents\scratch\example took 2s
```

To list all ServiceMonitors, execute:

```
kubectl get servicemonitor
```

You will see your newly created ServiceMonitor along with any others deployed via Helm charts or alternate methods.

---

## Verifying in Prometheus

After deployment, open the Prometheus UI and navigate to **Status → Targets**. Your API ServiceMonitor should be listed, indicating that Prometheus is scraping it according to the defined settings.

![The image shows a Prometheus monitoring dashboard displaying the status of various service endpoints, all marked as "UP" with details on their last scrape time and duration.](https://kodekloud.com/kk-media/image/upload/v1752882998/notes-assets/images/Prometheus-Certified-Associate-PCA-Service-Monitors/prometheus-monitoring-dashboard-up-status.jpg)

Additionally, running a query such as `job="node-api"` in Prometheus will help verify that the metrics are being collected from the API service.

---

## Reviewing the Final Prometheus Configuration

For an in-depth review, you can inspect the generated Prometheus scrape configuration. This shows that ServiceMonitor settings—including `metrics_path`, `scrape_interval`, and relabeling configurations—have been correctly applied. Here’s an excerpt from the generated configuration:

```
scrape_configs:
  - job_name: serviceMonitor/default/api-service-monitor/0
    honor_timestamps: true
    scrape_interval: 30s
    scrape_timeout: 10s
    metrics_path: /swagger-stats/metrics
    scheme: http
    follow_redirects: true
    enable_http2: true
    relabel_configs:
      - source_labels: [job]
        regex: (.*)
        target_label: __tmp_prometheus_job_name
        replacement: $1
        action: replace
      - source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_labelpresent_app]
        separator: ";"
        regex: (api);true
        replacement: $1
        action: keep
      - source_labels: [__meta_kubernetes_endpoint_port_name]
        separator: ";"
        regex: web
        replacement: $1
        action: keep
      # Additional relabel configs...
```

This configuration confirms that labels, endpoints, and relabeling rules are effectively facilitating target discovery by Prometheus.

---

## Summary

In this lesson, you learned how to:

- Leverage Kubernetes CRDs to extend Prometheus functionality.
- Create a ServiceMonitor resource to define additional scrape targets.
- Align your Kubernetes Service labels with ServiceMonitor selectors.
- Verify that Prometheus dynamically scrapes newly added endpoints without manual configuration updates.

By following these practices, you can maintain a scalable and declarative monitoring setup for your Kubernetes applications.

For further details, check out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Prometheus Operator GitHub](https://github.com/prometheus-operator/prometheus-operator)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/af7c6bdc-77de-4ccd-929f-4c8338debc2f)**
>
> Watch video content
