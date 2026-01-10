# DEMO Monitor Flux using Prometheus Grafana - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Monitoring-User-Interface/DEMO-Monitor-Flux-using-Prometheus-Grafana)

---

## Table of Contents

- DEMO Monitor Flux using Prometheus Grafana
  - 1. Explore the monitoring directory
  - 2. Apply the Flux PodMonitor
  - 3. Create a Flux Kustomization
  - 4. Validate in Prometheus
  - 5. Explore Grafana Dashboards
  - Links and References
  - Watch Video
  - Practice Lab
    - Common gotk\_ Queries
    - Flux Control Plane
    - Flux Cluster Stats

---

## Content

GitOps with FluxCD

Monitoring User Interface

# DEMO Monitor Flux using Prometheus Grafana

In this guide, you’ll learn how to integrate [Prometheus](https://prometheus.io/) with Flux v2 to scrape controller metrics and visualize them in [Grafana](https://grafana.com/). We’ll leverage the `monitoring` folder from the [fluxcd/flux2 GitHub repo](https://github.com/fluxcd/flux2) and deploy a `PodMonitor` CRD and Grafana dashboards via Flux Kustomizations.

## 1\. Explore the monitoring directory

Clone or browse the Flux repository and locate the `monitoring` folder:

![The image shows a GitHub repository page for "fluxcd/flux2" with a focus on the "monitoring" directory, containing folders like "kube-prometheus-stack" and "loki-stack."](https://kodekloud.com/kk-media/image/upload/v1752877662/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/github-repo-fluxcd-flux2-monitoring.jpg)

Inside `monitoring/` you’ll find:

- **PodMonitor** YAML for scraping all Flux controllers.
- A `dashboards/` folder with two Grafana JSON files:
  - `cluster.json`
  - `controlplane.json`

![The image shows a GitHub repository page for "fluxcd/flux2" with a focus on the "dashboards" directory, displaying JSON files related to monitoring configurations.](https://kodekloud.com/kk-media/image/upload/v1752877663/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/github-repo-fluxcd-flux2-dashboards-json.jpg)

## 2\. Apply the Flux PodMonitor

The `PodMonitor` CRD instructs Prometheus to scrape metrics from Flux controllers in the `flux-system` namespace:

```
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: flux-system
  namespace: flux-system
  labels:
    app.kubernetes.io/part-of: flux
    app.kubernetes.io/component: monitoring
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
    - port: http-prom
      relabelings: []
```

> [!important]
> **Note**
>
> Ensure the Prometheus Operator and its CRDs (including `PodMonitor`) are installed (for example via the `kube-prometheus-stack`).

Apply it directly or via Flux:

```
kubectl apply -f monitoring/manifests/monitoring-config/podmonitor.yaml
```

## 3\. Create a Flux Kustomization

Automate the deployment by defining a Flux `Kustomization` that points to your Git source:

```
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: monitoring-config
  namespace: flux-system
spec:
  dependsOn:
    - name: monitoring-kustomization-prometheus-stack
  interval: 1h0m0s
  path: ./manifests/monitoring/monitoring-config
  prune: true
  sourceRef:
    kind: GitRepository
    name: monitoring-source-prometheus-stack
```

You can export this with the Flux CLI:

```
flux create kustomization monitoring-config \
  --namespace flux-system \
  --depends-on monitoring-kustomization-prometheus-stack \
  --interval 1h0m0s \
  --path "./manifests/monitoring/monitoring-config" \
  --prune=true \
  --source GitRepository/monitoring-source-prometheus-stack \
  --export > monitoring-config.yaml
```

Commit and push:

```
git add manifests/monitoring/monitoring-config
git commit -m "Add Flux PodMonitor and Grafana dashboards"
git push
```

Reconcile the Git source and kustomization:

```
flux reconcile source git flux-system --namespace flux-system
flux reconcile kustomization monitoring-config --namespace flux-system
```

Verify the PodMonitor is ready:

```
kubectl get podmonitor -n flux-system
```

## 4\. Validate in Prometheus

Open your Prometheus UI and go to **Status → Targets**. Within seconds, the Flux controller endpoints should appear as `UP`:

![The image shows a Prometheus monitoring dashboard displaying the status of various targets, with endpoints, states, labels, and scrape durations. All listed targets are marked as "UP," indicating they are functioning properly.](https://kodekloud.com/kk-media/image/upload/v1752877665/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/prometheus-monitoring-dashboard-targets-status.jpg)

### Common `gotk_` Queries

| Query                                                    | Description                                 |
| -------------------------------------------------------- | ------------------------------------------- |
| `gotk_reconcile_condition{type="Ready", status="True"}`  | Count of successful reconciliations         |
| `gotk_reconcile_condition{type="Ready", status="False"}` | Count of failed reconciliations             |
| `gotk_suspend_status`                                    | Suspension state of Git sources/controllers |
| `gotk_reconcile_duration_seconds_bucket`                 | Histogram buckets for reconcile durations   |
| `gotk_reconcile_duration_seconds_sum`                    | Total reconcile duration                    |
| `gotk_reconcile_duration_seconds_count`                  | Number of reconcile operations              |

Run any query in **Graph** view to see real-time metrics:

![The image shows a Prometheus monitoring interface displaying query results related to the "gotk_reconcile_condition" metric, with details about containers, endpoints, and statuses.](https://kodekloud.com/kk-media/image/upload/v1752877666/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/prometheus-monitoring-query-results-gotk.jpg)

Switch to **Graph** mode for time-series visualization:

![The image shows a Prometheus monitoring dashboard with a graph displaying multiple colored lines representing different metrics over time. A tooltip provides detailed information about a specific data point on the graph.](https://kodekloud.com/kk-media/image/upload/v1752877667/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/prometheus-monitoring-dashboard-graph-metrics.jpg)

## 5\. Explore Grafana Dashboards

After Flux applies the dashboard JSON, refresh Grafana. Two dashboards are now available:

- **Flux Control Plane**
- **Flux Cluster Stats**

### Flux Control Plane

Tracks each controller’s queue lengths, CPU/memory usage, API request rates, and reconciliation durations:

![The image shows a dashboard interface displaying metrics for a Flux Control Plane, including controllers, max work queue time, memory usage, API requests, and resource usage graphs for CPU and memory.](https://kodekloud.com/kk-media/image/upload/v1752877668/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/flux-control-plane-dashboard-metrics.jpg)

![The image shows a dashboard with graphs displaying metrics related to a Flux control plane, including successful and failed reconciliations, Git pulls, and Helm stats.](https://kodekloud.com/kk-media/image/upload/v1752877669/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/flux-control-plane-dashboard-graphs.jpg)

### Flux Cluster Stats

Provides cluster-wide health: counts of reconcilers, failing controllers, manifest source statuses, operation durations, and readiness tables:

![The image shows a dashboard interface displaying metrics for a Flux Control Plane, including controllers, max work queue time, memory usage, API requests, and resource usage graphs.](https://kodekloud.com/kk-media/image/upload/v1752877670/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/flux-control-plane-dashboard-metrics-2.jpg)

![The image shows a Flux Cluster Stats dashboard displaying metrics such as cluster reconcilers, failing reconcilers, Kubernetes manifest sources, and their statuses. It includes tables and graphs indicating reconciliation readiness and operation durations.](https://kodekloud.com/kk-media/image/upload/v1752877671/notes-assets/images/GitOps-with-FluxCD-DEMO-Monitor-Flux-using-Prometheus-Grafana/flux-cluster-stats-dashboard-metrics.jpg)

These dashboards ship out of the box—just apply them to get comprehensive visibility into your Flux GitOps workflows.

---

## Links and References

- [Flux v2 Documentation](https://fluxcd.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards)
- [GitOps with Flux](https://fluxcd.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/fb9e59dc-9dee-4532-92a8-553d0df1df27/lesson/64787e16-94e0-41b2-a537-b3f1fcf7023b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/fb9e59dc-9dee-4532-92a8-553d0df1df27/lesson/ec051c13-205b-4a16-8ceb-e1586ebbe765)**
>
> Practice lab
