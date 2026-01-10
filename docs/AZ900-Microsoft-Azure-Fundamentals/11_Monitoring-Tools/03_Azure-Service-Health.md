# Azure Service Health - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Monitoring-Tools/Azure-Service-Health)

---

## Table of Contents

- Azure Service Health
  - Azure Service Health
  - Azure Resource Health
  - Azure Status
  - Benefits of Using Azure Service Health
  - Exploring Health History
  - Summary
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Monitoring Tools

# Azure Service Health

Azure Service Health is an essential monitoring tool within the Azure ecosystem that enables organizations to proactively track and maintain the performance of their services and resources. For example, Bella Innovations' IT team relies on it to ensure continuous operations and to receive timely updates about any platform issues or planned maintenance that might lead to downtime.

Azure regularly conducts planned maintenance, including updates, patches, and security improvements. While these activities are crucial, they can temporarily affect service availability. Azure Service Health helps IT teams prepare for and mitigate these potential disruptions.

Below is an overview of the three main components of Azure Service Health: Service Health, Azure Resource Health, and Azure Status.

---

## Azure Service Health

Azure Service Health provides tailored alerts and notifications about issues that could impact your resources. Its key components include:

- **Personalized Alerts:** Receive notifications on service issues that could affect your resources.
- **Service Issues:** Monitor ongoing problems with Azure services (e.g., regional issues with Virtual Machines in West Europe or databases in East US).
- **Planned Maintenance:** Get early warnings about scheduled maintenance, allowing you to plan in advance.
- **Health History:** Access historical incident data to assist in troubleshooting and trend analysis.

![The image lists features of Azure Service Health, including Personalized Alerts, Service Issues, Planned Maintenance, and Health History, each represented with icons and different colors.](https://kodekloud.com/kk-media/image/upload/v1752868468/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-service-health-features-icons.jpg)

> [!important]
> **Note**
>
> Azure Service Health provides valuable insights into the overall state of the Azure platform but does not detail the status of your specific resources.

This gap is bridged by Azure Resource Health.

---

## Azure Resource Health

Azure Resource Health focuses on the operational status of individual resources. It provides detailed insights into both current and historical health events and offers guided troubleshooting steps to resolve issues efficiently.

![The image outlines two features of Azure Resource Health: "Resource Status" and "Guided Troubleshooting," each represented with icons and numbered 01 and 02.](https://kodekloud.com/kk-media/image/upload/v1752868469/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-resource-health-features.jpg)

For instance, consider a Virtual Machine tagged "AZ900 VM." Azure Resource Health will clearly display its current status. It records customer-initiated actions (such as a manual restart) separately from platform-initiated events.

![The image shows a Microsoft Azure Resource Health page indicating that a virtual machine is unavailable due to a customer-initiated action. It includes a health history with an unknown resource health event and recommended steps for troubleshooting.](https://kodekloud.com/kk-media/image/upload/v1752868471/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-resource-health-vm-unavailable.jpg)

You can configure alerts for these resource-wide events to receive immediate notifications if issues arise.

---

## Azure Status

Azure Status offers a global perspective on the health of all Azure services. It is ideal for monitoring real-time status updates and reviewing historical data on service incidents.

![The image shows two features of Azure Status: "Global View" and "Real-Time Status," each represented by icons on colored backgrounds.](https://kodekloud.com/kk-media/image/upload/v1752868471/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-status-global-view-real-time.jpg)

The main features include:

- **Global Overview:** Access a comprehensive view of current service issues across multiple regions.
- **Real-Time Updates:** Stay informed with frequent updates (e.g., refreshed every two minutes), ensuring you have the latest information.
- **Detailed Reports:** View legends, post-incident analyses, and root cause reports for an in-depth understanding.

![The image shows the Microsoft Azure status page, displaying the service health across various regions with indicators for service status such as "Good" or "Critical."](https://kodekloud.com/kk-media/image/upload/v1752868473/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-status-page-service-health.jpg)

---

## Benefits of Using Azure Service Health

Azure Service Health provides numerous advantages for managing your Azure environment effectively:

1.  **Proactive Issue Management:** Identify and address potential problems before they impact your operations.
2.  **Enhanced Visibility:** Gain insights into both individual resource health and overall Azure service status.
3.  **Streamlined Communication:** Get notified with detailed alerts and reports, aiding quick decision-making during incidents.

![The image outlines the benefits of Azure Service Health, highlighting proactive issue management, enhanced visibility, and streamlined communication.](https://kodekloud.com/kk-media/image/upload/v1752868474/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-service-health-benefits-diagram.jpg)

For instance, the Azure Service Health dashboard displays real-time service issues and allows you to set alerts for immediate notification when any service is affected.

![The image shows the Microsoft Azure Service Health dashboard, displaying a world map with blue dots indicating healthy locations and no active service issues.](https://kodekloud.com/kk-media/image/upload/v1752868476/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-service-health-dashboard-map.jpg)

This enhanced visibility also extends to planned maintenance events, where you can review details like expected downtime, scope, and receive advisory notifications about upcoming service updates or security recommendations.

---

## Exploring Health History

Azure Service Health also tracks historical incidents, allowing you to review past events and analyze trends over time. It records both planned maintenance and previous service issues, and you can download event details as PDFs or track them on mobile devices.

![The image shows the Microsoft Azure Service Health portal, displaying a list of health history events, including planned maintenance and service issues, with details like tracking ID, event type, services, regions, and dates.](https://kodekloud.com/kk-media/image/upload/v1752868477/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-service-health-history-events.jpg)

Selecting a specific resource, like a Virtual Machine (e.g., "AZ900 VM"), enables you to inspect its detailed health history. For example, if the VM experienced downtime due to a customer-initiated restart, such incidents are clearly documented for easy reference.

![The image shows the Microsoft Azure portal's "Service Health" page, specifically the "Resource health" section, displaying a virtual machine resource named "az900-vm" located in "eastus" under the "Kodekloud Labs" subscription.](https://kodekloud.com/kk-media/image/upload/v1752868479/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Service-Health/azure-portal-service-health-az900-vm.jpg)

> [!important]
> **Tip**
>
> Utilize historical data to identify recurring issues and optimize your processes for improved operational resilience.

---

## Summary

Azure Service Health, along with Azure Resource Health and Azure Status, forms a comprehensive monitoring suite that ensures the reliability and performance of your Azure services. By offering proactive alerts, real-time updates, and detailed historical data, these tools empower IT teams, such as those at Bella Innovations, to minimize service disruptions and efficiently manage maintenance activities.

For additional insights about Azure, consider exploring more on the [Azure Documentation](https://docs.microsoft.com/azure/).

Azure Monitor further elevates your ability to observe and analyze the overall health of your Azure environment, making it a critical component of any robust IT operations strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/fe17e76e-2be4-4e04-bbfe-a7e8f72b1f6f/lesson/a8ead69f-77fc-4404-b8a2-fe3a19d561ee)**
>
> Watch video content
