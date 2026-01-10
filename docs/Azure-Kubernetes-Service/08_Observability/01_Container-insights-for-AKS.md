# Container insights for AKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Observability/Container-insights-for-AKS)

---

## Table of Contents

- Container insights for AKS
  - What Is Container Insights?
  - Azure Monitoring Agent Architecture
  - Demo: Create an AKS Cluster with Container Insights
  - Exploring Cluster Metrics
  - Generating Load with a Stress Test
  - Viewing Node and Container Details
  - Cost Considerations
  - Integrating Prometheus and Grafana
  - Watch Video

---

## Content

Azure Kubernetes Service

Observability

# Container insights for AKS

Azure Monitor is Microsoft’s native solution for collecting and analyzing metrics and logs from applications, infrastructure, and Azure services. With Container Insights for Azure Kubernetes Service (AKS), you gain end-to-end visibility into your containerized workloads—helping you troubleshoot performance issues, improve availability, and optimize resource utilization.

![The image is a diagram of Azure Monitor, illustrating its components and processes, including data collection, insights, visualization, analysis, and response. It shows how data from applications, infrastructure, Azure platform, and custom sources is processed and utilized.](https://kodekloud.com/kk-media/image/upload/v1752869500/notes-assets/images/Azure-Kubernetes-Service-Container-insights-for-AKS/azure-monitor-diagram-components-processes.jpg)

It delivers:

- Real-time metrics and logs
- Interactive dashboards and workbooks
- Alerting and diagnostic capabilities

## What Is Container Insights?

Container Insights is an Azure Monitor feature built specifically for AKS clusters. It collects performance and health data across your nodes and containers, allowing you to:

- Detect resource hotspots
- Trace application failures
- Set up proactive alerts

Container Insights aggregates two primary data types:

| Data Type | Description                              | Examples                                          |
| --------- | ---------------------------------------- | ------------------------------------------------- |
| Metrics   | Numerical values over time               | CPU usage, memory consumption, network I/O        |
| Logs      | Structured or unstructured event records | Container logs, system events, application traces |

Metrics power visualizations and alerts, while logs are stored in a Log Analytics workspace for ad-hoc querying and root-cause analysis.

![The image is a diagram illustrating the process of container insights, showing how data from containers, Azure Kubernetes Service, and operating systems is collected and processed through metrics and logs for visualization, analysis, and response. It includes components like workbooks, metric explorer, log analytics, and alerts.](https://kodekloud.com/kk-media/image/upload/v1752869502/notes-assets/images/Azure-Kubernetes-Service-Container-insights-for-AKS/container-insights-diagram-azure-kubernetes.jpg)

## Azure Monitoring Agent Architecture

Enabling the monitoring add-on on AKS deploys two Azure Monitoring Agents (AMA):

| Agent Type     | Deployment Method     | Role                                |
| -------------- | --------------------- | ----------------------------------- |
| AMA ReplicaSet | ReplicaSet (1 pod)    | Cluster-level failover for metrics  |
| AMA DaemonSet  | DaemonSet (all nodes) | Node-level metrics & log collection |

Both agents send data to a dedicated Log Analytics workspace for storage and analysis.

## Demo: Create an AKS Cluster with Container Insights

Follow these steps in the Azure portal to spin up an AKS cluster with Container Insights:

1.  Navigate to **Create Kubernetes cluster**.
2.  Under the **Integration** tab, enable **Container Insights**.
3.  (Optional) Enable **Managed Prometheus** and **Managed Grafana**.
4.  For this demo, toggle **Alerting** _Off_.
5.  Review and **Create**.

![The image shows a configuration page for creating a Kubernetes cluster, with options for enabling container insights, managed Prometheus, managed Grafana, and alerting settings.](https://kodekloud.com/kk-media/image/upload/v1752869503/notes-assets/images/Azure-Kubernetes-Service-Container-insights-for-AKS/kubernetes-cluster-configuration-page.jpg)

Once deployment finishes, open your AKS resource and select **Monitoring > Container Insights**.

## Exploring Cluster Metrics

The Container Insights dashboard provides a high-level overview of your AKS environment:

- Total node count
- CPU and memory utilization over time
- Active pod count

![The image shows a dashboard from KodeKloud-AKS Insights, displaying metrics for node CPU and memory utilization, node count, and active pod count over a six-hour period. The graphs indicate recent increases in CPU and memory usage.](https://kodekloud.com/kk-media/image/upload/v1752869505/notes-assets/images/Azure-Kubernetes-Service-Container-insights-for-AKS/kodekloud-aks-insights-dashboard-metrics.jpg)

## Generating Load with a Stress Test

To observe real-time metric changes, create CPU load in a test namespace:

```
# Verify AMA deployments
kubectl get daemonset ama-logs -n kube-system
kubectl get replicaset ama-logs-rs -n kube-system


# Create test namespace
kubectl create namespace containerinsightstest
kubectl config set-context --current --namespace=containerinsightstest


# Start an interactive shell pod
kubectl run test-shell --rm -it --image=ubuntu -- bash
```

Inside the `test-shell` pod:

```
apt update && apt install -y stress
stress --cpu 10
```

This generates 10 CPU workers, driving node CPU usage upward. In the portal, return to **Container Insights > Cluster**, enable live updates, and watch the CPU graph spike.

## Viewing Node and Container Details

Within Container Insights:

- **Nodes** tab: Displays per-node CPU/memory metrics. The stressed node will be easily identifiable.
- **Containers** tab: Lists every container and its performance metrics.

Click on `test-shell` to view its live status, console output, and event timeline:

```
4 mins ago [Pod] [test-shell] Pulling image "ubuntu"
4 mins ago [Pod] [test-shell] Pulled: Successfully pulled image "ubuntu" in 1.80s
4 mins ago [Pod] [test-shell] Created: Created container test-shell
4 mins ago [Pod] [test-shell] Started: Started container test-shell
243 secs ago [Pod] [test-shell] Scheduled: Assigned to aks-agentpool-77882287-vmss000000
```

## Cost Considerations

Azure Monitor charges based on the volume of data ingested into Log Analytics. Enabling Managed Prometheus increases ingestion volume, and Azure Managed Grafana incurs additional per-user costs.

> [!important]
> **Note**
>
> Review your ingestion rates and retention settings in your Log Analytics workspace to optimize costs.

## Integrating Prometheus and Grafana

Azure Monitor for Containers can natively scrape Prometheus endpoints—no self-hosted server needed. Expose your metrics endpoint to AMA, and configure PromQL alerts.

| Component  | Purpose                                            |
| ---------- | -------------------------------------------------- |
| Prometheus | Pull-based metric collection and querying (PromQL) |
| Grafana    | Dashboarding and multi-source alerting             |

![The image is a diagram illustrating the integration of Prometheus with Azure Monitor, showing data flow from nodes and pods through monitoring and metrics add-ons to a data platform for analytics and alerts.](https://kodekloud.com/kk-media/image/upload/v1752869506/notes-assets/images/Azure-Kubernetes-Service-Container-insights-for-AKS/prometheus-azure-monitor-integration-diagram.jpg)

If you enabled Grafana during cluster creation:

1.  Open the Grafana resource in the Azure portal.
2.  Copy the **Instance URL** and sign in with Azure AD.
3.  Browse pre-built Azure dashboards under **Dashboards**.

![The image shows a dashboard displaying CPU and memory utilization metrics for a Kubernetes cluster, including CPU usage graphs and a table with CPU quota details for different namespaces.](https://kodekloud.com/kk-media/image/upload/v1752869508/notes-assets/images/Azure-Kubernetes-Service-Container-insights-for-AKS/kubernetes-dashboard-cpu-memory-metrics.jpg)

Thank you for learning how to leverage Container Insights for AKS. For more details, see [Azure Monitor for Containers documentation](https://docs.microsoft.com/azure/azure-monitor/containers/container-insights-overview).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/5b5575f8-6539-491b-9d85-6f0ae23714b5/lesson/7200f0fb-def6-40c0-9fe2-39e272f32189)**
>
> Watch video content
