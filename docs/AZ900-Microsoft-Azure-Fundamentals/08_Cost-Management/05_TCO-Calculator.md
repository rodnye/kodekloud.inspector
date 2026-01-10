# TCO Calculator - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Cost-Management/TCO-Calculator)

---

## Table of Contents

- TCO Calculator
  - Key Features of the TCO Calculator
  - Benefits of the TCO Calculator
  - How to Use the TCO Calculator
  - Demonstration: Estimating Costs
  - Conclusion
  - Watch Video
    - Example: Adding a Server Workload

---

## Content

AZ900: Microsoft Azure Fundamentals

Cost Management

# TCO Calculator

In this guide, we explore the challenges Bella Innovation faces when evaluating a migration to Microsoft Azure. Although they are experienced with Azure services and calculating cloud costs, their on-premises infrastructure—including servers, databases, networking equipment, and storage racks—has already been purchased. The TCO Calculator is the ideal tool for comparing on-premises expenses with the projected costs in Azure, helping organizations determine potential savings from migrating.

The TCO Calculator is a critical resource that assists organizations in deciding whether to transition to Azure or continue with their existing on-premises setup. By comparing the financial implications of owning, for instance, 20 on-premises servers with deploying equivalent services in Azure, users gain clear insights into cost benefits or potential gains from cloud migration.

## Key Features of the TCO Calculator

The TCO Calculator provides several valuable functions designed to deliver a comprehensive cost analysis:

- **Comprehensive Cost Analysis**  
  It offers detailed estimates spanning compute, storage, networking, and more—ensuring no cost element is overlooked.
- **Customizable Inputs**  
  Users can enter specific details about their current infrastructure to produce personalized and accurate analyses.
- **Detailed Reports**  
  Beyond summary figures, the tool generates in-depth breakdowns of expenses and savings.

![The image outlines the key features of a TCO Calculator, highlighting comprehensive cost analysis, customizable inputs, and detailed reports.](https://kodekloud.com/kk-media/image/upload/v1752868358/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/tco-calculator-features-outline.jpg)

## Benefits of the TCO Calculator

Using the TCO Calculator offers multiple advantages:

- **Informed Decision Making**  
  It empowers organizations to make data-driven decisions regarding a potential migration to Microsoft Azure.
- **Cost Transparency**  
  The tool provides a clear view of potential savings and expenditures, reducing uncertainty about cost implications.
- **Effective Planning**  
  It serves as an essential resource for budgeting and devising a robust cloud migration strategy.

![The image is a graphic titled "TCO Calculator – Benefits," highlighting three benefits: Informed Decision Making, Cost Transparency, and Planning Tool. Each benefit is represented with an icon and a numbered label.](https://kodekloud.com/kk-media/image/upload/v1752868358/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/tco-calculator-benefits-graphic.jpg)

## How to Use the TCO Calculator

Getting started with the TCO Calculator is straightforward. Begin by entering details about your current on-premises infrastructure, specifying the Azure services you plan to use, and reviewing the resulting cost report. This process is ideal for organizations seeking to understand the financial implications of a cloud migration.

![The image is a three-step guide for using a TCO Calculator, involving entering current infrastructure details, specifying future Azure services, and viewing and analyzing the cost report.](https://kodekloud.com/kk-media/image/upload/v1752868359/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/tco-calculator-three-step-guide.jpg)

Next, compare your on-premises costs with the projected expenses in Azure to see a side-by-side analysis.

![The image shows two use cases for a TCO Calculator: assessing Azure migration costs and understanding benefits for organizations.](https://kodekloud.com/kk-media/image/upload/v1752868360/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/tco-calculator-azure-migration-benefits.jpg)

## Demonstration: Estimating Costs

Access the TCO Calculator by visiting its URL or searching for it online. The interface allows you to define various workloads such as servers, databases, and storage. For larger workloads, a bulk upload option (e.g., via CSV file) is available. Although signing in lets you save reports, it is not required to use the service—similar to the [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/).

### Example: Adding a Server Workload

- **Site:** HQ (the on-premises headquarters)
- **Workload:** Windows server
- **Environment:** Virtual Machines
- **Operating System:** Windows
- **License:** Data center license
- **Quantity:** 200 Virtual Machines running on Hyper-V
- **Resources:** Approximately 32 cores and 128 GB RAM

You can also add detailed storage information:

- **Storage Name:** HQ Storage
- **Type:** Local disk (SSD)
- **Capacity:** 2 terabytes (1 terabyte for backup and 1 terabyte for archive)
- **IOPS:** 72,000 (indicative speed)
- **Networking Bandwidth:** 100 GB outbound
- **Destination Region:** East Asia

After entering these details, click **Next** to proceed to the assumptions page.

![The image shows a webpage from Azure's pricing calculator, specifically the "Adjust assumptions" section, which includes options for software assurance coverage, geo-redundant storage, virtual machine costs, and electricity costs.](https://kodekloud.com/kk-media/image/upload/v1752868361/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/azure-pricing-calculator-assumptions.jpg)

On the assumptions page, you can fine-tune parameters such as:

- Geo-redundant storage
- Electricity costs applicable to your location
- Procurement and enterprise licensing fees
- Labor costs

Additionally, you can adjust hardware-specific expenses, including costs per processor, software, electricity, and virtualization. These adjustments ensure the analysis is closely aligned with your organizational context.

After reviewing your inputs, clicking **Next** may initially show no cost savings.

![The image shows a Microsoft Azure TCO (Total Cost of Ownership) calculator webpage indicating no cost savings based on user inputs, with suggestions for reducing costs.](https://kodekloud.com/kk-media/image/upload/v1752868362/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/azure-tco-calculator-no-savings.jpg)

At this stage, the comparison might reveal that both on-premises and Azure costs are nearly identical. To identify potential savings, experiment by adjusting parameters. For example, modify the values for physical servers to 10, assign 10 processors per server, and set a cost factor of 20 per processor (using sample values). With these adjustments, the calculator might estimate savings over five years—say, $6,442—and provide a detailed cost breakdown.

![The image shows a comparison of total costs over five years between on-premises and Azure environments, with pie charts detailing cost distribution in categories like compute, data center, networking, storage, and IT labor.](https://kodekloud.com/kk-media/image/upload/v1752868363/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/cost-comparison-onpremises-azure.jpg)

The final report includes total on-premises cost, Azure cost, and a breakdown of various cost components. You can export the report to share with colleagues, offering a comprehensive financial overview.

![The image shows a comparison of on-premises and Azure costs over five years, with bar charts and a cost breakdown summary for each. The on-premises cost is $1,265,734, while the Azure cost is $1,259,292.](https://kodekloud.com/kk-media/image/upload/v1752868364/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-TCO-Calculator/on-premises-azure-cost-comparison.jpg)

> [!important]
> **Important Reminder**
>
> The numbers provided in this demonstration are for illustration purposes only. Actual savings and benefits may vary significantly based on your organizational context and specific workloads.

## Conclusion

This guide demonstrated how to use the TCO Calculator to assess the cost differences between on-premises infrastructure and deploying workloads in Microsoft Azure. By entering detailed workload information, adjusting relevant assumptions, and analyzing the comprehensive cost report, you can make well-informed decisions about your cloud migration strategy.

For ongoing cost control and optimization after migration, consider leveraging [Azure Cost Management](https://azure.microsoft.com/en-us/pricing/cost-management/), a powerful tool to track and manage your cloud expenditures.

Happy migrating and optimizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/e35bb215-c8ca-410f-815d-5f59659dc9ce/lesson/c643320f-2c57-4d5c-ad53-d00fb0ee5d64)**
>
> Watch video content
