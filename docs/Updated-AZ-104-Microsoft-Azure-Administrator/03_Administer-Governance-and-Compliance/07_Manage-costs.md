# Manage costs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Manage-costs)

---

## Table of Contents

- Manage costs
  - Cost Analysis: Your Financial Dashboard
  - Budgeting: Financial Guardrails
  - Exporting Cost Data
  - Cost-Saving Strategies in Azure
  - Pricing Calculator Example
  - Conclusion
  - Watch Video
    - Example Walkthrough
    - Creating and Configuring a Budget
    - Export Options Include:
    - Key Cost-Saving Options:
    - Balancing Cost with Other Requirements

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Manage costs

Managing cost in the cloud is as crucial as managing your resources. Azure Cost Management serves as a financial navigator on your cloud journey by providing visibility and tools to monitor, allocate, and optimize your spending.

Imagine planning a road trip. You map out your route, budget your expenses, and continuously monitor your fuel. In a similar way, Azure Cost Management helps you track service usage, set budgets, and analyze costs to ensure you stay on the most economical path. In this guide, we will explore the key features of Azure Cost Management and strategies to optimize your spending.

## Cost Analysis: Your Financial Dashboard

Cost analysis offers a clear dashboard to visualize your spending by service, location, or Resource Group. You can quickly identify major expenses—like a high cost on Azure App Service—and investigate ways to optimize further.

For instance, when viewing cost analysis in the Azure portal:

- **Customization:** You can change the currency (e.g., from your local currency to US dollars) or adjust the time period (last seven days, this month, last invoice, or even a custom date range).
- **Scope Navigation:** Click on the scope to change your view. You can filter at the root management group level, a specific subscription, or even down to a particular Resource Group. Note that not all subscriptions (e.g., sponsorship subscriptions) support cost management.
- **Filtering:** Use filters such as meter category (for example, "Virtual Machines") to focus on specific costs, and group data by dimensions like Resource Group name.

> [!important]
> **Tip**
>
> When switching the granularity to monthly, you can view trends over time instead of an accumulated cost, which helps in detailed month-to-month analysis.

### Example Walkthrough

1.  **Currency Conversion:** Change to US dollars for consistency.
2.  **Time Frame:** Adjust the invoice period (e.g., November 20 to December 19) or select predefined periods like "last seven days" or "quarter."
3.  **Filtering Virtual Machines:** Filter by the meter category "Virtual Machines," resulting in a focused view of spending (e.g., $3.71 for VMs).
4.  **Grouping:** Group by Resource Group to see consumption distribution.
5.  **Graph Customization:** Choose between area graphs or column charts. For instance, selecting a stacked column chart shows consistent spending over several months and highlights changes when additional VMs are deployed.

Once you set up the desired filters and view, Azure Cost Management allows you to save these settings as a custom dashboard (e.g., "VM cost dashboard"). You can later share, update, or export these dashboards in PNG, Excel, or CSV formats for reporting purposes.

## Budgeting: Financial Guardrails

Budgets in Azure Cost Management help you set spending limits and forecast future costs. They serve as financial guardrails, alerting you when spending nears or exceeds budget thresholds. Azure Advisor further provides personalized recommendations to save money by suggesting cost-effective resource options and identifying underutilized services.

### Creating and Configuring a Budget

1.  **Setting the Scope:** Adjust the scope based on your needs. For example, create a budget specifically for virtual machines within a subscription.
2.  **Adding Filters:** Apply a filter by meter category to focus the budget on a particular resource type.
3.  **Budget Details:** Assign a unique name (e.g., "VM-budget")—note that spaces are not allowed—and set a monthly reset period.
4.  **Defining Budget Amount:** Input your budget amount (e.g., $300) and observe the red line indicator that represents your set threshold.
5.  **Alerts and Notifications:** Configure alert conditions to notify you when spending reaches a certain percentage (e.g., 80%). Use action groups to specify how alerts are delivered (e.g., text messages, emails, or phone calls).

> [!important]
> **Note**
>
> Azure Cost Management supports multiple alert thresholds, so you can notify different recipients as costs increase. Ensure you configure the alert recipients correctly to keep all key stakeholders informed.

Once created, your budget is visible within the cost analysis dashboard. You can view forecasted costs, historical spending, and make data-driven decisions to remain within your allocation.

## Exporting Cost Data

Azure Cost Management also provides the ability to export and download cost data, making it easy to perform further analysis or distribute reports to stakeholders.

### Export Options Include:

- **Recurring Exports:** Daily, weekly, or monthly exports that automatically dump data into an Azure storage account.
- **One-Time Export:** On-demand export of current cost data for immediate analysis.
- **Supported Formats:** Choose from PNG, Excel, or CSV formats to best suit your reporting needs.

Simply navigate to the "View all exports" section in the Azure portal to set up your preferred export schedule.

## Cost-Saving Strategies in Azure

Every penny saved in the cloud is a penny that can be reinvested in innovation and growth. Azure provides a suite of cost-saving measures designed to maximize efficiency while minimizing spending.

### Key Cost-Saving Options:

1.  **Azure Reserved Instances (RI):**
    - Reserve capacity for one or three years for services like virtual machines running continuously, resulting in significant discounts compared to pay-as-you-go pricing.
2.  **Azure Hybrid Benefit (AHB):**
    - Utilize your existing Windows Server and SQL Server licenses with Software Assurance on Azure to reduce licensing costs drastically.
3.  **Credit-Based Subscriptions:**
    - For developers and IT professionals, subscriptions like Visual Studio Enterprise or those provided by the Microsoft Partner Network offer monthly Azure credits for testing and development purposes.
4.  **Test Subscriptions:**
    - Enjoy lower rates on non-production environments for development and testing, though note that these subscriptions do not come with a Service Level Agreement (SLA).
5.  **Regional Differences:**
    - Deploy resources in regions with lower costs to further optimize your budget. However, balance this against compliance and performance needs since some applications require data residency.

### Balancing Cost with Other Requirements

It is crucial to understand that aggressive cost optimization might come at the expense of performance, security, or compliance. For example, even if East US offers cheaper rates, a government entity may require data to be stored in a specific region for compliance reasons. Always ensure that cost savings do not compromise your organization's other critical pillars.

> [!important]
> **Warning**
>
> While using cost-saving measures, double-check that any optimization does not infringe on compliance or performance requirements. Adjust strategies carefully, ensuring optimal balance among cost efficiency, performance, and security.

## Pricing Calculator Example

To better understand potential savings, use the [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/). Here’s an example:

1.  **Select Virtual Machines:** Choose a region (e.g., East US) and the operating system (e.g., Windows – Standard).
2.  **Configuration:** Pick a VM size, such as D2v3 (2 vCPUs, 8 GB RAM).
3.  **Savings Options:**
    - **Pay-As-You-Go:** Baseline cost, e.g., $70.08.
    - **Monthly Reserved Instance:** Cost reduces to approximately $41.75.
    - **Three-Year Reserved Instance:** Further reduction to around $26.89.
    - **Azure Hybrid Benefit:** Apply your own license to eliminate licensing costs.

This example demonstrates how cost optimization strategies—like reserved instances and hybrid benefits—can lead to significant savings in your overall expenses.

## Conclusion

Azure Cost Management equips you with the financial clarity and control needed to efficiently manage cloud spending. By leveraging cost analysis, budgeting with alerts, data export, and various cost-saving strategies, you can ensure that every dollar invested in the cloud contributes to innovation and growth.

Next, learn how to configure Azure Policy to further streamline your cloud operations while maintaining control over your resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/eb5b895f-afd8-411f-9275-0c61b343fc46)**
>
> Watch video content
