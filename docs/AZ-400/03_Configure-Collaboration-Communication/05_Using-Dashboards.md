# Using Dashboards - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Configure-Collaboration-Communication/Using-Dashboards)

---

## Table of Contents

- Using Dashboards
  - Key Features
  - Common Use Cases
  - Integration with Azure Monitor and Log Analytics
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Configure Collaboration Communication

# Using Dashboards

Azure dashboards provide a unified, interactive interface to monitor performance, utilization, and health metrics across your Azure infrastructure. By aggregating data from Azure services and external sources, these customizable dashboards help DevOps teams gain actionable insights, optimize costs, and accelerate troubleshooting.

![The image is an introduction to Azure Dashboards, highlighting their use as interactive data visualization tools for creating customized dashboards to monitor and analyze data from Azure services. It includes a graphic of a laptop displaying various data visualization elements.](https://kodekloud.com/kk-media/image/upload/v1752867457/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Dashboards/azure-dashboards-introduction-data-visualization.jpg)

## Key Features

> [!important]
> **Note**
>
> Azure dashboards can be tailored to any team’s workflow. Use drag-and-drop tiles, custom queries, and built-in or third-party charts to surface the data that matters most.

| Feature                   | Description                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Centralized Monitoring    | Aggregate metrics and logs from all subscriptions and resource groups in one view.    |
| Customizable Layouts      | Design dashboards with drag-and-drop tiles, grids, and theme settings.                |
| Integrated Data Sources   | Connect to Azure Monitor, Log Analytics, Application Insights, and external APIs.     |
| Sharing and Collaboration | Grant roles or share read-only links to co-author and review dashboards.              |
| Automation and Scripting  | Deploy templates (ARM, Bicep) or call REST APIs to create/update dashboards at scale. |

![The image is an introduction to Azure Dashboards, highlighting five features: Centralized Monitoring, Customizable Layouts, Integrated Data Sources, Sharing and Collaboration, and Automation and Scripting.](https://kodekloud.com/kk-media/image/upload/v1752867458/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Dashboards/azure-dashboards-introduction-features.jpg)

## Common Use Cases

| Use Case                       | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| CI/CD Pipeline Monitoring      | Track build statuses, deployment stages, and failure rates across DevOps pipelines.              |
| Application Performance        | Visualize response times, throughput, error rates, and dependency calls in real time.            |
| Infrastructure Health Tracking | Monitor VM availability, App Service metrics, database DTU usage, and storage IOPS.              |
| Service-Level Reporting        | Display KPIs such as deployment frequency, mean time to recovery (MTTR), and uptime percentages. |
| Stakeholder Dashboards         | Share executive summaries with interactive charts and KPI tiles for business stakeholders.       |

## Integration with Azure Monitor and Log Analytics

Azure dashboards seamlessly integrate with Azure Monitor and Log Analytics to form a complete observability solution:

- Collect metrics, activity logs, and custom telemetry across your cloud estate.
- Run Kusto Query Language (KQL) queries to filter, aggregate, and correlate log data.
- Pin chart and grid visualizations directly from Log Analytics or Application Insights.

![The image shows an Azure dashboard for monitoring, featuring various charts and graphs displaying data related to work assignments, build health, team velocity, and test cases.](https://kodekloud.com/kk-media/image/upload/v1752867460/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Dashboards/azure-dashboard-monitoring-charts-graphs.jpg)

## Best Practices

1.  Design for Clarity  
    Organize tiles by priority and group related metrics together.
2.  Select Actionable Metrics  
    Surface only the data points that drive decisions or indicate anomalies.
3.  Integrate Diverse Data Sources  
    Combine infrastructure, application, and security logs for a holistic view.
4.  Enforce Role-Based Access Controls  
    Apply least-privilege permissions to protect sensitive dashboards.> [!important]
    > **Warning**
    >
    > Grant “Contributor” access only to trusted team members. Public dashboard links expose read-only data but should still be shared judiciously.
5.  Encourage Collaboration  
    Leverage comments, annotations, and versioned templates so that teams can iterate on dashboard designs.

![The image lists five best practices for dashboards: design, metric selection, data sources, access controls, and sharing, each in a colored bar.](https://kodekloud.com/kk-media/image/upload/v1752867461/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Dashboards/dashboard-best-practices-design-metrics.jpg)

Azure dashboards empower teams to monitor, analyze, and optimize cloud resources within a single pane of glass. By leveraging customization, automation, and deep integration with Azure Monitor and Log Analytics, you can accelerate troubleshooting, improve governance, and drive continuous improvement across your Azure environment.

## Links and References

- [Azure Dashboards overview](https://docs.microsoft.com/azure/azure-monitor/visualize/dashboards)
- [Azure Monitor documentation](https://docs.microsoft.com/azure/azure-monitor/)
- [Log Analytics workspace overview](https://docs.microsoft.com/azure/azure-monitor/logs/log-analytics-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/6f0f53fa-76cd-4ea8-81b4-d2e4b10a6191/lesson/5403e099-627f-4f63-b937-3bcaef27d787)**
>
> Watch video content
