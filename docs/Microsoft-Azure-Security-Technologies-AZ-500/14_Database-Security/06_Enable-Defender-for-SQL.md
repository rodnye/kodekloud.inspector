# Enable Defender for SQL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Database-Security/Enable-Defender-for-SQL)

---

## Table of Contents

- Enable Defender for SQL
  - Key Features of Azure Defender for SQL
  - Enabling Defender for SQL in the Azure Portal
  - Watch Video
    - 1. Accessing Defender for SQL
    - 2. Configuring Defender for Cloud
    - 3. Reviewing Server Cost and Settings
    - 4. Advanced Threat Protection Settings
    - 5. Setting Up Email Notifications

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Database Security

# Enable Defender for SQL

In this lesson, you will learn how to enable Defender for SQL using Azure Defender for Cloud while exploring its key security features and advanced threat protection capabilities. Azure Defender for SQL provides multi-layered security through threat detection, vulnerability assessment, real-time security alerts, and compliance monitoring.

## Key Features of Azure Defender for SQL

1.  **Threat Detection**  
    Azure Defender for SQL uses machine learning to analyze database activities, quickly identifying unusual or potentially malicious behavior and alerting you to potential security breaches.
2.  **Vulnerability Assessment**  
    Routine assessments help identify potential weaknesses in your databases. Detailed remediation steps and recommendations are then provided to help secure your environment.
3.  **Security Alerts**  
    Receive real-time notifications for any suspicious activities or vulnerabilities detected within your SQL databases.
4.  **Secure Score**  
    Improve your overall security posture with a quantifiable measure. By applying recommendations, your secure score increases, helping you track and enhance database security over time.
5.  **Compliance Dashboard**  
    Easily monitor your compliance status against various industry standards (such as ISO and PCI) with a dedicated dashboard, ensuring your databases meet required security regulations.
6.  **Advanced Threat Protection (ATP)**  
    ATP is designed to detect and mitigate a range of security threats, including:
    - **SQL Injection Attacks:** Recognizes patterns that indicate SQL injection attempts.
    - **Brute Force Attacks:** Detects repeated unauthorized login attempts from unknown locations.
    - **Anomalous Database Access and Query Patterns:** Profiles normal behavior to spot irregular or unauthorized activities.
    - **Potential Data Exfiltration:** Monitors unusual data transfer or export patterns that could indicate data theft.
    - **Unsafe Action Alerts:** Warns of potentially unsafe operations, such as suspicious modifications or the addition of harmful links.
    - **Privileged Access Abuse:** Identifies misuse of database privileges, including unauthorized activities by insiders.
    - **Threats from Malware or Viruses:** Complements existing antivirus solutions by detecting activity patterns that resemble malware behavior.

> [!important]
> **Note**
>
> Before enabling these features, ensure that you have the necessary permissions on the Azure portal and have reviewed your current security configurations.

To activate these features, simply enable Defender for SQL and configure the email addresses that will receive security notifications.

![The image shows a diagram of "Advanced Threat Protection" with a list of potential security threats on the left and a security alert dashboard on the right, indicating high and medium severity alerts.](https://kodekloud.com/kk-media/image/upload/v1752881772/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Defender-for-SQL/advanced-threat-protection-diagram.jpg)

## Enabling Defender for SQL in the Azure Portal

### 1\. Accessing Defender for SQL

Open the Azure portal and navigate to the SQL Databases section where you can find the Microsoft Defender for Cloud option. If the SQL Vulnerability Assessment is not yet configured, you can enable it from this area.

### 2\. Configuring Defender for Cloud

Search for "Defender for Cloud" within the portal and select your subscription under environment settings. Click on "Edit settings" to access the Defender plans. From here, enable Defender for various services, including SQL databases. Options for other database types, such as Cosmos DB, are also available.

![The image shows the Microsoft Azure portal's "Defender plans" settings page, detailing various cloud workload protection plans, their pricing, resource quantities, monitoring coverage, and status options.](https://kodekloud.com/kk-media/image/upload/v1752881774/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Defender-for-SQL/azure-defender-plans-settings.jpg)

![The image shows the Microsoft Azure portal with the "Defender plans" settings for cloud workload protection. It includes pricing and resource quantity details for various services like servers, databases, and storage, with a pop-up for selecting resource types.](https://kodekloud.com/kk-media/image/upload/v1752881775/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Defender-for-SQL/azure-portal-defender-plans-settings.jpg)

### 3\. Reviewing Server Cost and Settings

Be aware that the Defender for SQL plan is priced at $15 per server per month. Once the correct plan is enabled, return to your SQL database and activate the SQL Vulnerability Assessment by clicking "Enable."

### 4\. Advanced Threat Protection Settings

Click on "Configure" to view and modify the Defender for SQL settings, including advanced threat protection configurations. Here you can specify the email addresses that should receive notifications for any detected alerts.

![The image shows the Microsoft Azure portal with server settings for Microsoft Defender for SQL, including options for vulnerability assessment and advanced threat protection.](https://kodekloud.com/kk-media/image/upload/v1752881776/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Defender-for-SQL/azure-portal-defender-sql-settings.jpg)

### 5\. Setting Up Email Notifications

Within the email notification settings, add the desired email addresses to ensure that advanced threat alerts are received promptly and appropriately.

![The image shows the Microsoft Azure portal with settings for email notifications in Microsoft Defender for Cloud. It includes options for selecting email recipients and notification types based on alert severity.](https://kodekloud.com/kk-media/image/upload/v1752881776/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Defender-for-SQL/azure-portal-email-notifications-settings.jpg)

The process is straightforward: enable Defender for SQL, configure the vulnerability assessment, and add your email contacts to receive advanced threat alerts.

This concludes the lesson on enabling Defender for SQL. In the next lesson, we will explore vulnerability assessments in more detail and discuss their crucial role in strengthening your database security.

> [!important]
> **Next Steps**
>
> For more detailed guidance on managing your database security with Azure Defender for Cloud, refer to the [Microsoft Azure Defender Documentation](https://docs.microsoft.com/en-us/azure/defender-for-cloud/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d199f126-f1df-43a8-bd3d-68cd689d509d/lesson/f51c500b-877d-4b73-a0fa-24a0710ce760)**
>
> Watch video content
