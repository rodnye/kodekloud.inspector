# Enable Azure Sentinel - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Sentinel/Enable-Azure-Sentinel)

---

## Table of Contents

- Enable Azure Sentinel
  - Key Benefits of Microsoft Sentinel
  - How Microsoft Sentinel Works
  - Setup Process: Enabling Microsoft Sentinel
  - Watch Video
    - Adding Microsoft Sentinel to Your Workspace

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Sentinel

# Enable Azure Sentinel

Empower your organization with a unified security platform by enabling Microsoft Sentinel. This advanced solution provides a single-pane-of-glass view to identify risks and threats across your entire infrastructure—whether on-premises or in multiple clouds.

Microsoft Sentinel integrates security information and event management (SIEM) with security orchestration, automation, and response (SOAR) capabilities. With Sentinel, you get intelligent security analytics and threat intelligence across the enterprise, offering a consolidated solution for attack detection, threat visibility, proactive hunting, and rapid incident response.

## Key Benefits of Microsoft Sentinel

- **Comprehensive Data Collection:** Gather data at cloud scale from users, devices, applications, and infrastructure.
- **Advanced Threat Detection:** Leverage superior analytics and Microsoft’s unmatched threat intelligence to identify previously unknown threats while reducing false positives.
- **AI-Driven Investigations:** Utilize AI-driven insights for alert investigations and proactive threat hunting.
- **Rapid Incident Response:** Respond quickly to incidents with built-in automation and orchestration.

The process can be summarized as:

- **Collect**
- **Detect**
- **Investigate**
- **Respond**

![The image is an infographic about enabling Microsoft Sentinel, highlighting features like threat detection, risk mitigation, and response across infrastructures. It emphasizes a single-pane-of-glass approach and includes steps like collect, detect, investigate, and respond.](https://kodekloud.com/kk-media/image/upload/v1752882058/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Sentinel/microsoft-sentinel-infographic-threat-detection.jpg)

## How Microsoft Sentinel Works

Microsoft Sentinel gathers data from multiple sources, whether on-premises or in the cloud, and uses advanced analytics and robust threat intelligence from Microsoft to detect potential threats. When a threat is identified, Sentinel employs AI to investigate issues and hunt for suspicious activities at scale, leveraging extensive cybersecurity expertise. For scenarios requiring immediate intervention, its built-in orchestration and automation facilitate rapid response actions.

Once you enable Sentinel, you can:

- Ingest data
- Detect threats
- Investigate incidents
- Respond using playbooks and automation

> [!important]
> **Getting Started**
>
> To begin, you will need a Log Analytics workspace since all collected data is ingested into this workspace.

## Setup Process: Enabling Microsoft Sentinel

For this implementation, a script is used to create:

- A Windows machine
- A Linux machine
- A new Log Analytics workspace

Before proceeding, review the resource group that includes the Log Analytics workspace along with the Linux and Windows machines distributed via the automation script.

![The image shows a Microsoft Azure portal interface displaying details of a resource group named "rg-sentinel-20231012," including resources like a Log Analytics workspace and a virtual machine, all located in East US.](https://kodekloud.com/kk-media/image/upload/v1752882059/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Sentinel/azure-portal-rg-sentinel-details.jpg)

### Adding Microsoft Sentinel to Your Workspace

1.  Navigate to Microsoft Sentinel in the Azure portal.
2.  Click on "Create."
3.  When prompted, select a Log Analytics workspace. In this example, Microsoft Sentinel is added to a new workspace that currently does not have any agents or data.

![The image shows a Microsoft Azure portal page for adding Microsoft Sentinel to a workspace, listing two workspaces named "law-monitoring" and "law-sentinel" located in "eastus."](https://kodekloud.com/kk-media/image/upload/v1752882060/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Sentinel/azure-portal-add-sentinel-workspace.jpg)

4.  Click on "Add" to integrate Microsoft Sentinel with your chosen workspace. This action completes the enablement process from the Sentinel side.

> [!important]
> **Next Steps**
>
> The next phase is data collection. Once you configure data connections, you can import content from various sources to further secure your environment.

Now, proceed to the next topic: configuring data connections to Microsoft Sentinel, which will guide you through collecting and managing your security data effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/fdf529c7-54c7-4550-a622-aec81172dcad/lesson/060d38c8-c278-4712-a603-85fef05ca263)**
>
> Watch video content
