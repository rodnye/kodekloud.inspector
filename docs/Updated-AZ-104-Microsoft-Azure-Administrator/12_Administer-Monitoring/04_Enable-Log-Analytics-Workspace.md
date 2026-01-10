# Enable Log Analytics Workspace - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Monitoring/Enable-Log-Analytics-Workspace)

---

## Table of Contents

- Enable Log Analytics Workspace
  - Key Features of Azure Log Analytics
  - Pricing Considerations
  - Creating a Log Analytics Workspace
  - Onboarding Resources to Your Workspace
  - Watch Video
    - Step-by-Step Creation Using the Azure Portal

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Monitoring

# Enable Log Analytics Workspace

Azure Log Analytics is a powerful service that collects, analyzes, and stores data from a variety of sources, whether your resources are hosted in Azure, on-premises, or across different cloud environments. In this guide, you'll learn about the key features of Azure Log Analytics and how to set up a workspace using the Azure Portal.

## Key Features of Azure Log Analytics

Azure Log Analytics comes with several important benefits:

1.  Data Collection  
    It centralizes data generated from cloud resources and on-premises systems into a single workspace.
2.  Reporting and Visualization  
    Leverage the Kusto Query Language (KQL) to build detailed reports and interactive dashboards for monitoring and analyzing your data.
3.  Data Ingestion  
    To ingest data, you first create a Log Analytics workspace. While you can operate multiple workspaces across various regions, many architectures consolidate logs into a centralized workspace. Depending on your project requirements, you might also deploy a dedicated workspace.
4.  Data Isolation  
    For compliance and data residency needs, you can create separate workspaces in different regions. For example, production and disaster recovery (DR) environments often require distinct Log Analytics workspaces.

## Pricing Considerations

Log Analytics pricing depends on two main factors:

- Data Ingestion  
  Charges are applied per gigabyte ingested. For instance, the following Kusto query filters performance metrics:

  ```
  Perf
  | where Computer contains "SQL" and ObjectName == "LogicalDisk"
  | where CounterName == "% Free Space" and InstanceName == "C:"
  | extend TimeInEST = TimeGenerated - 5h
  | project TimeInEST, CounterName, CounterValue
  ```

- Data Retention  
  Data retention is set to 30 days by default (with activity logs kept for 90 days). If you need to store logs for an extended period—say 180 days—adjust the workspace's retention settings, keeping in mind that this may lead to additional costs.

> [!important]
> **Note**
>
> If you expect high daily data ingestion volumes (above 100 gigabytes), consider switching from the pay-as-you-go model to the commitment tier to reduce your per-gigabyte costs.

## Creating a Log Analytics Workspace

A Log Analytics workspace is your central hub for collecting, analyzing, and visualizing data from a wide range of resources including Azure, Google Cloud Platform (GCP), AWS, and on-premises systems (using agents or tools like Azure Arc).

Data from Application Insights and Azure Sentinel is also routed to your Log Analytics workspace. Keep in mind that if you are using Sentinel, you will be billed for both Sentinel services and the underlying Log Analytics data storage.

### Step-by-Step Creation Using the Azure Portal

1.  Open the Azure Portal and search for "Log Analytics workspaces."
2.  Click **Create a new Log Analytics workspace.**
3.  Set up a new resource group (for example, "RGMonitoring") and select your desired region (e.g., East US).

![The image shows a user interface for creating a Log Analytics workspace in Azure, highlighting features like workspace management, data isolation, and storage of insights and sentinel data. It includes sections for project and instance details.](https://kodekloud.com/kk-media/image/upload/v1752884682/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Enable-Log-Analytics-Workspace/azure-log-analytics-workspace-ui.jpg)

4.  Configure the pricing tier. By default, the workspace uses a pay-as-you-go model. For high-volume ingestion environments (over 100 gigabytes per day), opt for the commitment tier to reduce costs.

Once you've created the workspace, you can begin onboarding resources.

![The image shows a Microsoft Azure portal page for creating a Log Analytics workspace, with fields for project and instance details. Options for subscription, resource group, name, and region are visible, along with navigation buttons for review and creation.](https://kodekloud.com/kk-media/image/upload/v1752884683/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Enable-Log-Analytics-Workspace/azure-log-analytics-workspace-portal.jpg)

After the deployment is complete, you will see a confirmation screen in the Azure Portal.

![The image shows a Microsoft Azure portal page indicating that a deployment of "Microsoft.LogAnalyticsOMS" is complete. It includes details like the deployment name, subscription, resource group, and start time, with options to view deployment details and next steps.](https://kodekloud.com/kk-media/image/upload/v1752884685/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Enable-Log-Analytics-Workspace/azure-portal-deployment-complete.jpg)

## Onboarding Resources to Your Workspace

After setting up your Log Analytics workspace, the next step is to onboard your resources. This involves configuring diagnostic settings to send logs to the workspace and connecting various data sources for an integrated monitoring solution.

![The image shows a Microsoft Azure portal page for a Log Analytics workspace named "law-monitoring," displaying details such as resource group, status, location, and subscription information. It also provides options for getting started with Log Analytics, including connecting data sources and configuring monitoring solutions.](https://kodekloud.com/kk-media/image/upload/v1752884686/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Enable-Log-Analytics-Workspace/azure-log-analytics-workspace.jpg)

> [!important]
> **Next Steps**
>
> Later in this guide, we will cover how to seamlessly connect additional resources to your Log Analytics workspace to enhance your monitoring capabilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/e208e27a-6519-4eb4-aaf1-342bb14def21/lesson/3b48fdd4-c4c3-4440-ac54-bed4ecb05806)**
>
> Watch video content
