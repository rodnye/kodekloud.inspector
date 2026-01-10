# Assessing workloads - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-migration-solution/Assessing-workloads)

---

## Table of Contents

- Assessing workloads
  - Overview of Assessment Tools
  - Exploring Azure Migrate in the Azure Portal
  - Assessment Phase
  - Initiating an Assessment
  - Next Steps: Utilizing Migration Tools
  - Watch Video
    - Creating a Migration Project
    - Data Collection Methods
    - Configuring Assessment Settings
      - Importing Data via CSV
      - Using an On-Premises Appliance
      - Database Assessment with DMA

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a migration solution

# Assessing workloads

In this guide, we explore how to assess various workloads—including ASP.NET, .NET Core, Java, PHP, SAP, and specialized high-performance computing workloads—using Microsoft’s powerful assessment tools. These tools enable you to evaluate and prepare your on-premises environments for a seamless migration to Azure.

## Overview of Assessment Tools

Microsoft provides a suite of tools tailored to different workload types. The core tool is the Server Assessment, integrated into Azure Migrate, which combines both assessment and migration functionalities to offer an end-to-end process. By deploying a lightweight appliance on your on-premises environment, Azure Migrate collects detailed workload data (such as memory, CPU, and operating system details from virtual machines) and transfers it to Azure for analysis. Azure then calculates a readiness score that indicates whether a workload is ready for migration, requires changes, or is not supported.

Additional assessment tools include:

- **Database Assessment (DMA Tool):** Also known as the Database Migration Assistant, this utility examines your on-premises Microsoft SQL Server databases. It highlights compatibility issues and evaluates migration readiness for Azure SQL Database, Azure SQL Managed Instance, or SQL Server on a VM.
- **Web App Assessment:** This tool assists in evaluating on-premises web applications in preparation for migration to Azure.

Other valuable tools are:

- **TCO Calculator:** This tool, while not a complete assessment solution, helps you estimate the total cost of ownership and potential savings when adopting cloud services.
- **Service Map:** By installing an agent on each machine, Service Map creates a comprehensive dependency analysis and visualizes how servers and processes are interconnected. This is particularly beneficial for understanding virtual machine dependencies prior to migration.

## Exploring Azure Migrate in the Azure Portal

Within the Azure portal, the Azure Migrate section provides a central location to initiate workload assessments.

![The image shows a Microsoft Azure Migrate portal page with options for getting started, exploring more, and setting migration goals like servers, databases, and web apps. It includes a notification about a vulnerability mitigation and features sections for migrating and modernizing datacenters.](https://kodekloud.com/kk-media/image/upload/v1752867013/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-migrate-portal-overview.jpg)

### Creating a Migration Project

To get started, create a new migration project by following these steps:

1.  Define the project parameters, for example:
    - Resource Group: Migrate RG
    - Project Name: NYC to Azure (assuming a migration for a New York City data center)
    - Geography: United States

    This project aggregates all assessment data from your on-premises environment.

2.  Note that historically, Azure Site Recovery handled migrations by replicating workloads to Azure before performing a cutover. Today, Azure Migrate offers a complete picture that integrates both assessment and migration capabilities.

> [!important]
> **Tip**
>
> If you experience issues during project creation, such as policies blocking the deployment, consider selecting another region (e.g., Asia Pacific) for project setup.

## Assessment Phase

Within your Azure Migrate project, the assessment process is divided into two primary sections:

- **Discovery and Assessment:** Gather data from your on-premises environment.
- **Migration and Modernization:** Utilize tools for migrating and modernizing workloads after the assessment.

### Data Collection Methods

Data can be collected in two primary ways: using an on-premises appliance or by importing a CSV file.

![The image shows a Microsoft Azure portal page for Azure Migrate, focusing on servers, databases, and web apps. It includes sections for assessment tools and migration tools, with options for discovery, business case building, dependency analysis, and assessment.](https://kodekloud.com/kk-media/image/upload/v1752867015/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-migrate-portal-assessment-tools.jpg)

#### Importing Data via CSV

1.  Download the CSV template provided by Azure.
2.  Populate the template with the required details such as server name, IP address, core count, memory, and operating system information. Some fields are mandatory while others are optional.

![The image shows a Microsoft Azure portal page for importing server inventory using a CSV file. It provides steps for downloading a CSV template, adding server data, and importing the file for migration assessment.](https://kodekloud.com/kk-media/image/upload/v1752867016/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-portal-import-server-inventory.jpg)

3.  Upload the completed CSV file back to Azure.

![The image shows an Excel spreadsheet titled "Azure Migrate import template" with data about virtual machines, including server names, IP addresses, cores, memory, OS names, and other specifications.](https://kodekloud.com/kk-media/image/upload/v1752867017/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-migrate-import-template-excel.jpg)

#### Using an On-Premises Appliance

Deploy an appliance within your environment for automated data collection. Depending on your infrastructure:

- For VMware environments: Generate a project key, download the OVA file, deploy the appliance, and configure it.
- For Hyper-V: Utilize the provided VHD file.
- For physical servers or AWS environments: Download a ZIP file and run a PowerShell script on a Windows Server (minimum requirements: Windows Server 2016, 16 GB memory, 8 vCPUs, and 80 GB storage).

![The image shows a Microsoft Azure portal page for Azure Migrate, detailing steps to set up and configure an appliance for discovering on-premises environments. It includes options for generating a project key, downloading the Azure Migrate appliance, and setting up the appliance.](https://kodekloud.com/kk-media/image/upload/v1752867018/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-migrate-portal-setup.jpg)

The appliance automatically sends the required data to Azure for the assessment.

#### Database Assessment with DMA

Install the Database Migration Assistant (DMA) on your on-premises SQL Server to identify compatibility issues and examine migration challenges.

![The image shows a webpage from Microsoft Azure's documentation about the Data Migration Assistant, detailing its capabilities and features for migrating SQL Server instances to Azure SQL databases. The page includes a navigation menu on the left and content about migration issues and solutions on the right.](https://kodekloud.com/kk-media/image/upload/v1752867019/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-data-migration-assistant-docs.jpg)

## Initiating an Assessment

After gathering your server data, begin the assessment process with these steps:

1.  If using the CSV method, upload your CSV file.
2.  Wait approximately 10 minutes for the import process to complete.
3.  Review the assessment results, including any warnings (e.g., disk sizing issues) and the total number of records processed.

![The image shows a Microsoft Azure portal page for importing server inventory using a CSV file, with steps for downloading a template, adding data, and importing the file. It also displays import details, including status and records inserted.](https://kodekloud.com/kk-media/image/upload/v1752867020/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-portal-import-csv-inventory.jpg)

Once the import is successful and your environment data is discovered (for example, 10 servers comprising 8 Windows and 2 Linux servers), proceed to configure the assessment for Azure VMs.

![The image shows a Microsoft Azure Migrate dashboard displaying assessment tools for servers, databases, and web apps, including details on discovered servers and operating system distribution.](https://kodekloud.com/kk-media/image/upload/v1752867022/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-migrate-dashboard-assessment-tools.jpg)

### Configuring Assessment Settings

1.  Select the assessment for Azure VMs.
2.  Click "Edit" within the assessment settings to adjust parameters such as reservation options and target VM series. For example, choose "None" for reservation and "Select All" for VM series.
3.  Configure additional licensing options like Azure Hybrid Benefit if applicable.

![The image shows the "Assessment settings" page in Microsoft Azure, where various options for target settings, VM size, and pricing are configured for a migration assessment.](https://kodekloud.com/kk-media/image/upload/v1752867023/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Assessing-workloads/azure-assessment-settings-page.jpg)

Running the assessment will generate a detailed report that includes:

- The number of machines ready for migration
- Workloads that require modifications or are not supported
- Estimated compute and storage costs

> [!important]
> **Key Insight**
>
> Assessment reports provide critical insights that help present data-driven findings to business stakeholders.

## Next Steps: Utilizing Migration Tools

Following the assessment phase, you can proceed to the migration stage by leveraging the migration tools available within Azure Migrate. These tools facilitate the actual migration and modernization of your workloads based on the assessment results.

Before initiating migration, ensure you have enabled dependency analysis by installing agents that create a comprehensive service map of your environment. This step is essential for understanding interdependencies and ensuring a smooth transition.

This guide concludes our discussion on assessment tools. In the upcoming section, we will dive deep into the migration tools offered by Azure Migrate and explore how they help you efficiently move your workloads to the cloud.

For further details, visit:

- [Azure Migrate Documentation](https://docs.microsoft.com/azure/migrate/)
- [Microsoft SQL Server to Azure Migration Guide](https://docs.microsoft.com/azure/dms/)
- [Service Map Documentation](https://docs.microsoft.com/azure/automation/automation-service-map)

Happy migrating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/fd250ecb-c21c-4044-ad18-71a6368cc4a6/lesson/df6525b4-b21d-4fba-8525-b38d62cc55cd)**
>
> Watch video content
