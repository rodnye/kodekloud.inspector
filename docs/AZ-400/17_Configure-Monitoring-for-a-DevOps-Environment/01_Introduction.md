# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Monitoring-for-a-DevOps-Environment/Introduction)

---

## Table of Contents

- Introduction
  - Agenda
  - Practical Integration with DevOps Tools
  - Configuring Telemetry Collection
  - Links and References
  - Watch Video
    - Azure Telemetry Services Overview

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Monitoring for a DevOps Environment

# Introduction

Monitoring is a foundational component of any modern DevOps workflow. In this module, you’ll learn how to implement continuous monitoring in Azure by leveraging **Azure Monitor** and **Log Analytics** to proactively detect and remediate issues.

Azure Monitor provides a unified platform to collect, analyze, and act on telemetry from both cloud and on-premises environments. With Log Analytics, you can craft powerful Kusto Query Language (KQL) queries that turn raw data into actionable insights. Together, these tools help you maintain high availability and performance across your applications and infrastructure.

![The image shows an agenda with four items related to Azure Monitor, including topics like continuous monitoring, integration with Azure services, and DevOps tools. The design features a gradient background and numbered sections.](https://kodekloud.com/kk-media/image/upload/v1752867504/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/azure-monitor-agenda-continuous-monitoring.jpg)

## Agenda

| Topic                  | Description                                         |
| ---------------------- | --------------------------------------------------- |
| Continuous Monitoring  | Importance of proactive issue detection in DevOps   |
| Azure Monitor Features | Overview of metrics, logs, and alerts               |
| Service Integrations   | Connecting Azure Monitor with native Azure services |
| Log Analytics          | Querying and visualizing telemetry                  |

---

## Practical Integration with DevOps Tools

In this section, we’ll walk through hands-on examples to integrate Azure Monitor into your CI/CD pipelines and operational workflows:

1.  Connecting Azure Monitor with popular DevOps platforms
2.  Configuring custom alerts to triage and respond faster
3.  Provisioning and managing Log Analytics workspaces via Infrastructure as Code

![The image is an agenda slide listing three topics: integrating Azure Monitor with DevOps tools, configuring Azure Monitor alerts, and configuring Azure Log Analytics.](https://kodekloud.com/kk-media/image/upload/v1752867505/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/azure-monitor-devops-agenda-slide.jpg)

> [!important]
> **Tip**
>
> Automate workspace provisioning using ARM templates or [Terraform](https://registry.terraform.io/).
> Here's a quick Azure CLI example to create a Log Analytics workspace:
>
> ```
> # Provision Log Analytics workspace via Azure CLI
> az monitor log-analytics workspace create \
> --resource-group MyResourceGroup \
> --workspace-name MyWorkspace \
> --location eastus
> ```

---

## Configuring Telemetry Collection

To achieve full-stack observability, you must collect telemetry across applications, VMs, containers, storage, and networks. Azure offers specialized solutions for each domain.

![The image is a presentation slide titled "Configuring Collection of Telemetry by Using Various Azure Services," featuring a graphic of a network diagram on a blue gradient background.](https://kodekloud.com/kk-media/image/upload/v1752867506/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/configuring-telemetry-azure-services-diagram.jpg)

### Azure Telemetry Services Overview

| Service              | Use Case                                                |
| -------------------- | ------------------------------------------------------- |
| Application Insights | Monitor application performance and end-user experience |
| VM Insights          | Collect host-level metrics and process information      |
| Container Insights   | Analyze container health in AKS and other Kubernetes    |
| Storage Insights     | Track I/O metrics and health of storage accounts        |
| Network Insights     | Visualize network topology and performance issues       |

![The image is a presentation slide with an agenda listing five insights: Application, VM, Container, Storage, and Network. The background is a gradient of blue and green.](https://kodekloud.com/kk-media/image/upload/v1752867507/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction/agenda-insights-application-vm-container-storage.jpg)

---

By the end of this lesson, you'll be able to:

- Set up data collection across multiple Azure services
- Author KQL queries to analyze and correlate logs and metrics
- Build interactive dashboards in Azure Monitor and Log Analytics

## Links and References

- [Azure Monitor Documentation](https://docs.microsoft.com/azure/azure-monitor/)
- [Log Analytics workspace overview](https://docs.microsoft.com/azure/azure-monitor/logs/log-analytics-overview)
- [Kusto Query Language (KQL) Basics](https://docs.microsoft.com/azure/data-explorer/kusto/query/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/7e7ab3a7-8b66-40ef-9f77-1988e32b786d/lesson/22fe1a56-84d6-4fe9-986e-203a24148f12)**
>
> Watch video content
