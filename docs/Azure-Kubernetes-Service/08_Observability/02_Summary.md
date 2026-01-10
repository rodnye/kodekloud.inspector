# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Observability/Summary)

---

## Table of Contents

- Summary
  - 1. Azure Container Insights
  - 2. Prometheus + Grafana
  - 3. Feature Comparison
  - 4. Next Steps
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Observability

# Summary

In this lesson, we compared two leading monitoring solutions for Azure Kubernetes Service (AKS):

- **Azure Container Insights** – an integrated, managed service in Azure Monitor
- **Prometheus + Grafana** – an open-source monitoring stack for full control

Choosing the right approach comes down to your priorities: ease of setup, customization depth, maintenance overhead, and cost.

---

## 1\. Azure Container Insights

Azure Container Insights delivers end-to-end visibility into your AKS clusters with minimal configuration. Key capabilities include:

- Automatic collection of CPU, memory, and network metrics
- Container-level logs and performance telemetry
- Built-in queries and visualizations in Azure Monitor
- Seamless integration with Azure Alerts and Workbooks

> [!important]
> **Note**
>
> Container Insights is fully managed by Azure Monitor. You incur data ingestion and retention charges, but you avoid operating your own monitoring infrastructure.

Learn more: [Container Insights overview](https://learn.microsoft.com/azure/azure-monitor/containers/container-insights-overview)

---

## 2\. Prometheus + Grafana

The Prometheus + Grafana stack is a popular open-source alternative that emphasizes flexibility:

- **Prometheus**  
  • Scrapes time-series metrics from AKS, nodes, and custom exporters  
  • Built-in Alertmanager for defining alert rules and notifications
- **Grafana**  
  • Connects to Prometheus (and other datasources)  
  • Provides interactive dashboards with rich visualizations  
  • Supports annotations, templating, and provisioning

> [!important]
> **Warning**
>
> Running Prometheus and Grafana requires provisioning, scaling, and maintaining storage for long-term metrics. Ensure you plan for high-availability and backup.

Explore more:

- [Prometheus documentation](https://prometheus.io/docs/introduction/overview/)
- [Grafana documentation](https://grafana.com/docs/)

---

## 3\. Feature Comparison

| Feature          | Container Insights                              | Prometheus + Grafana                              |
| ---------------- | ----------------------------------------------- | ------------------------------------------------- |
| Setup Complexity | Low (Azure-managed)                             | Medium to high (self-managed)                     |
| Customization    | Azure Monitor queries & Workbooks               | Full Grafana dashboard and alerting customization |
| Maintenance      | Managed by Azure                                | You manage upgrades, scaling, and storage         |
| Data Retention   | Default 30 days (configurable in Azure Monitor) | Configurable via remote write or object storage   |
| Alerting         | Azure Alerts integration                        | Prometheus Alertmanager and Grafana Alerting      |
| Cost Model       | Pay for data ingestion & retention              | Infrastructure + storage costs (or Grafana Cloud) |

---

## 4\. Next Steps

In the next module, we will survey all Azure platforms capable of hosting container workloads, including:

- Azure Container Instances
- Azure App Service for Containers
- Azure Red Hat OpenShift

Stay tuned!

---

## Links and References

- [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/services/kubernetes-service/)
- [Azure Monitor Documentation](https://learn.microsoft.com/azure/azure-monitor/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/5b5575f8-6539-491b-9d85-6f0ae23714b5/lesson/95efa405-574a-4b86-a046-e27a197f4d36)**
>
> Watch video content
