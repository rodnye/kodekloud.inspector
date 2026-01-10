# Enable endpoint protection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Host-Security/Enable-endpoint-protection)

---

## Table of Contents

- Enable endpoint protection
  - Key Aspects of Endpoint Protection
  - Enabling Endpoint Protection in the Azure Portal
  - Conclusion
  - Watch Video
    - Antivirus and Anti-Malware
    - Behavioral Analysis
    - Real-Time Threat Intelligence
    - Automated Remediation
    - Centralized Management
    - Integration with Microsoft Defender for Cloud
    - Installing Microsoft Anti-Malware on a Windows Machine
    - Monitoring Endpoint Protection with Microsoft Defender for Cloud
    - Verifying Deployment on a Windows Machine
    - Third-Party Solutions for Linux Machines

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Host Security

# Enable endpoint protection

Azure Endpoint Protection is a vital element in establishing a robust security posture. It offers an extensive suite of security features designed to protect your endpoints against a wide range of cyber threats. This article provides an in-depth overview of Azure's endpoint protection solutions, covering key aspects, deployment procedures, and monitoring practices.

## Key Aspects of Endpoint Protection

### Antivirus and Anti-Malware

Azure Endpoint Protection employs state-of-the-art antivirus and anti-malware mechanisms to shield your systems from malicious software, including viruses and other forms of malware. Leveraging industry-leading threat intelligence and machine learning algorithms, the solution continuously scans your endpoints, promptly detects potential threats, and prevents unauthorized access and infections.

### Behavioral Analysis

In addition to traditional signature-based detection, the protection solution uses behavioral analysis to monitor application and process activities. By identifying anomalies and suspicious behavior, it effectively detects advanced threats that might bypass conventional security methods.

### Real-Time Threat Intelligence

Integration with Microsoft’s expansive threat intelligence network ensures that your endpoints receive real-time updates about emerging threats and vulnerabilities. This continuous updating process reinforces your defense systems with the latest threat definitions, fortifying your environment against evolving cyberattacks.

### Automated Remediation

When a threat is detected, Azure Endpoint Protection automatically initiates remediation procedures. The solution can quarantine or remove malicious files, block suspicious network connections, and execute other proactive measures to reduce the impact of security incidents. This rapid response minimizes downtime and lowers the risk of data breaches.

### Centralized Management

Centralized management is provided through a unified console that simplifies the administration of security policies across all endpoints. This approach ensures operational efficiency and consistent security measures throughout your organization.

### Integration with Microsoft Defender for Cloud

Azure Endpoint Protection seamlessly integrates with Microsoft Defender for Cloud (formerly Azure Security Center) to deliver comprehensive security insights. This integration not only quarantines malicious files but also updates threat intelligence to help prevent similar attacks. For instance, if a vulnerability is discovered and exploited, real-time updates facilitate prompt protective measures.

> [!important]
> **Note**
>
> For enhanced protection, always ensure that your Azure environment is integrated with Microsoft Defender for Cloud to benefit from its advanced threat detection and response capabilities.

## Enabling Endpoint Protection in the Azure Portal

Follow these steps to enable endpoint protection using the Azure portal.

Within the Azure portal, you will see various endpoint protection extensions. Options include Microsoft Anti-Malware, Trend Micro, and Symantec. Your choice will depend on your specific requirements—note that some options, such as Symantec or Trend Micro, may require a separate vendor subscription. While the Microsoft Anti-Malware solution is easy to install on Windows machines, Linux devices often require third-party solutions like Kaspersky, Trend Micro, or Symantec (typically subscription-based).

### Installing Microsoft Anti-Malware on a Windows Machine

1.  In your Windows virtual machine within the Azure portal, navigate to the "Extensions and Applications" section and click on "Add."
2.  If Microsoft Anti-Malware is not immediately visible among the list of extensions, search for it using the "Load More" option.
3.  Select the Microsoft Anti-Malware extension by clicking on it, then choose "Next."
4.  Configure the extension settings—including exclusions, enabling real-time protection, scheduling scans (specify the scan day and time), and selecting the type of scan.
5.  Click on "Review and Create." Once validation is complete, initiate the extension deployment.

During deployment, the extension is installed on your virtual machine, providing immediate real-time protection and initiating regular scans.

![The image shows a configuration page for the Microsoft Antimalware Extension in the Microsoft Azure portal, where users can set exclusions, enable real-time protection, and schedule scans.](https://kodekloud.com/kk-media/image/upload/v1752881877/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-endpoint-protection/microsoft-antimalware-azure-configuration.jpg)

After deployment, you can monitor the installation progress:

![The image shows a Microsoft Azure portal page where a deployment named "microsoft.antimalware-windows-20231002122528" is in progress. It includes details such as the subscription, resource group, and deployment status.](https://kodekloud.com/kk-media/image/upload/v1752881879/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-endpoint-protection/azure-portal-deployment-progress.jpg)

### Monitoring Endpoint Protection with Microsoft Defender for Cloud

Microsoft Defender for Cloud continuously analyzes your environment and provides actionable recommendations for endpoint protection. To view these insights, navigate to the "Recommendations" section and search for "endpoint" to identify any endpoints missing the necessary protection.

![The image shows a Microsoft Azure portal interface displaying security recommendations from Microsoft Defender for Cloud. It includes active recommendations categorized by severity and resource health status.](https://kodekloud.com/kk-media/image/upload/v1752881880/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-endpoint-protection/azure-portal-security-recommendations.jpg)

### Verifying Deployment on a Windows Machine

Return to your virtual machine's "Extensions and Applications" section to confirm that the IaaS Anti-malware extension has been successfully installed and is active.

![The image shows a Microsoft Azure portal interface displaying the "Extensions + applications" section for a virtual machine named "win-demo," with an extension called "IaaSAntimalware" listed.](https://kodekloud.com/kk-media/image/upload/v1752881881/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-endpoint-protection/azure-portal-extensions-win-demo.jpg)

### Third-Party Solutions for Linux Machines

For Linux endpoints, several third-party extensions provide robust protection. After clicking "Add" in the Extensions section, you'll encounter options such as:

- Symantec
- SentinelOne
- Kaspersky
- Rapid7 Insight Agent

These third-party solutions typically require subscriptions but offer comprehensive security for Linux-based systems.

## Conclusion

With endpoint protection enabled and deployed across your machines, your environment is now more resilient against cyber threats. The integration with Microsoft Defender for Cloud further enhances your monitoring and remediation capabilities, ensuring continuous security assurance.

Next, we will explore strategies for managing privileged access devices. In the upcoming article, we will delve into Privileged Identity Management (PIM) and discuss effective methods to secure privileged accounts and devices.

For more information on securing your cloud environment, visit [Microsoft Defender for Cloud Documentation](https://learn.microsoft.com/en-us/azure/defender-for-cloud/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d8d70777-3d80-4e41-803e-0929352de5e7/lesson/093c855d-a37e-4f15-b41f-717f8246bb7a)**
>
> Watch video content
