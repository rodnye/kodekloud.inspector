# Flux Monitoring - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Monitoring-User-Interface/Flux-Monitoring)

---

## Table of Contents

- Flux Monitoring
  - 1. FluxCD Metrics Overview
  - 2. Prometheus Operator and Auto-Discovery
  - 3. Inspecting Prometheus Configuration
  - 4. Enabling Flux Controller Metrics
  - 5. Visualizing Metrics in Grafana
  - Links and References
  - Watch Video
    - 4.1 Annotate Flux Pods
    - 4.2 Create a PodMonitor

---

## Content

GitOps with FluxCD

Monitoring User Interface

# Flux Monitoring

Learn how to monitor FluxCD controllers using Prometheus and visualize key metrics with Grafana. This guide covers:

- Exposing FluxCD metrics via `/metrics`
- Leveraging the Prometheus Operator for auto-discovery
- Configuring a `PodMonitor` for Flux controllers
- Inspecting generated Prometheus scrape configs
- Building a Grafana dashboard for FluxCD health and performance

## 1\. FluxCD Metrics Overview

Flux controllers expose Prometheus metrics on port **8080** at the `/metrics` endpoint. By deploying the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator), you can manage Prometheus, Alertmanager, and Grafana components using Kubernetes custom resources.

## 2\. Prometheus Operator and Auto-Discovery

The Prometheus Operator discovers scrape targets via the `ServiceMonitor` and `PodMonitor` CRDs. To include Flux controllers:

- Deploy a `PodMonitor` that targets Flux pods in the `flux-system` namespace
- Ensure each controller pod is annotated for Prometheus scraping

## 3\. Inspecting Prometheus Configuration

After installing the Prometheus Operator, you can verify the scrape configuration that gets generated:

```
kubectl exec -it prometheus-0 -c config-reloader -n monitoring -- /bin/sh
cat /etc/prometheus/config_out/prometheus.env.yaml
```

Look for entries under `scrape_configs`:

```
scrape_configs:
  - job_name: serviceMonitor/monitoring/kube-etcd/0
  - job_name: serviceMonitor/monitoring/apiserver/0
  # ...
```

By default, Prometheus scrapes Kubernetes components like the API server, etcd, CoreDNS, and kubelet.

## 4\. Enabling Flux Controller Metrics

### 4.1 Annotate Flux Pods

Verify that each Flux controller pod is annotated for Prometheus. For example, inspect the `source-controller` pod:

```
kubectl get pod source-controller-5495bf4d7d-nw57 -n flux-system -o yaml
```

Ensure you see these annotations:

```
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "8080"
```

### 4.2 Create a PodMonitor

> [!important]
> **Note**
>
> Make sure the `targetPort` matches the container port (default is **8080**) and the `path` is `/metrics`.

Apply the following `PodMonitor` to enable Prometheus scraping for all Flux controllers:

```
kubectl apply -f - <<EOF
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: flux-system
spec:
  namespaceSelector:
    matchNames:
      - flux-system
  selector:
    matchExpressions:
      - key: app
        operator: In
        values:
          - helm-controller
          - source-controller
          - kustomize-controller
          - notification-controller
          - image-automation-controller
          - image-reflector-controller
  podMetricsEndpoints:
    - targetPort: 8080
      path: /metrics
EOF
```

After applying, the Prometheus Operator will regenerate the scrape config. You should see a new job entry:

```
- job_name: podMonitor/monitoring/flux-system/0
```

## 5\. Visualizing Metrics in Grafana

Import or build a Grafana dashboard to monitor:

| Metric Category        | Description                                     |
| ---------------------- | ----------------------------------------------- |
| Health Checks          | Number of successful vs. failed reconciliations |
| Reconciliation Latency | Time taken per reconciliation cycle             |
| Event Counts           | Total events processed by each controller       |
| Errors & Warnings      | Count and rate of errors in FluxCD controllers  |

1.  Open your Grafana UI.
2.  Create a new dashboard or import a JSON template.
3.  Add panels for FluxCD metrics, e.g.,
    - `flux_reconcile_duration_seconds`
    - `flux_reconcile_errors_total`
    - `flux_reconcile_success_total`

---

## Links and References

- [FluxCD Monitoring Guide](https://fluxcd.io/docs/guides/monitoring/)
- [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/fb9e59dc-9dee-4532-92a8-553d0df1df27/lesson/920eb4dd-e43b-4887-878c-fee410661837)**
>
> Watch video content
