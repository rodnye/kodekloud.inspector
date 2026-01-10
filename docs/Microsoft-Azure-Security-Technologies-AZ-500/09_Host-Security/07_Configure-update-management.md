# Configure update management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Host-Security/Configure-update-management)

---

## Table of Contents

- Configure update management
  - Workflow Overview
  - Setting Up Update Management in the Azure Portal
  - Additional Resources
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Host Security

# Configure update management

Keeping your systems updated is essential for security and optimal performance in today's dynamic digital landscape. For organizations utilizing infrastructure-as-a-service, it’s important to remember that under the shared responsibility model, updating and patching the operating system is the customer's responsibility. Azure Update Management offers a streamlined solution to ensure your Windows and Linux servers always have the latest patches installed.

Azure Update Management integrates with Azure Monitor logs to systematically store data related to update assessments and the results of update deployments. This data is collected from machines hosted within Azure as well as on-premises or in other clouds. To enable this data collection, an Automation Account is linked to a Log Analytics Workspace, and each machine runs an agent called the Log Analytics Agent.

> [!important]
> **Note**
>
> At the time of this recording, the Log Analytics extension (or MMA Agent) is being deprecated in favor of the Azure Monitoring Agent (AMA), although the workflow remains the same.

The update management process begins when the agent generates a report by collecting update assessments from each machine. As an administrator, you review these assessments, define the deployment schedule, and monitor the update deployment status. When you initiate a deployment, the system checks for any scheduled maintenance windows before applying the updates, and the collected data is then sent to the Log Analytics Workspace.

Using a Hybrid Runbook Worker role linked with the Automation Account, updates are pushed from various sources such as Linux repositories, Microsoft Update, Windows Server Update Service (WSUS), or another local repository. Once the update process is complete, detailed status reports are provided to the administrator.

![The image is a flowchart illustrating the process of configuring update management, including steps like reviewing updates, checking maintenance windows, and applying updates using various repositories and services.](https://kodekloud.com/kk-media/image/upload/v1752881845/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-update-management/update-management-flowchart-configuration.jpg)

## Workflow Overview

- An agent is deployed on each machine to collect update information.
- A maintenance window is scheduled.
- Updates are either automatically installed or manually deployed based on your configuration.

For production environments, you might prefer to manually review updates and schedule deployments within a defined maintenance window instead of relying solely on automatic installations.

Additionally, Azure Arc can be used to onboard on-premises or non-Azure machines (for example, those hosted in AWS or GCP) so they appear as native Azure VMs. This allows you to manage update deployments across diverse environments with ease.

## Setting Up Update Management in the Azure Portal

1.  Navigate to Update Management (now rebranded as Update Manager) in the Azure portal.
2.  Click on the Machines tab to view all your managed devices. In this example, six machines are available, with some configured to use Windows Automatic Update.
3.  Select the desired machines and proceed to Update Settings. Here, you can choose a customer-managed schedule, allowing you to define what updates should be installed and when.
4.  Click on "Check for updates" or "Assess now" to perform an update assessment.

![The image shows the Azure Update Manager interface, displaying a list of virtual machines with their update statuses and related information. There are notifications about assessment in progress and failed update settings for certain machines.](https://kodekloud.com/kk-media/image/upload/v1752881846/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-update-management/azure-update-manager-interface.jpg)

If you encounter an error message for a generalized VM, it is because a generalized VM is not eligible for update assessments, resulting in such errors. Once the agent is deployed, it gathers and sends update information to the update repository, enabling the assessment of available updates. After the assessment is complete, you can review details like pending updates, required reboots, and unsupported configurations. The update status for each VM will be reflected accordingly.

For instance, selecting a specific Linux machine reveals its update details. One machine may show six pending updates, while others may display five, three, or even a single pending update.

![The image shows the Microsoft Azure portal displaying the update status for a virtual machine named "linux-ra-vm," indicating a total of six updates, with three being security and critical updates.](https://kodekloud.com/kk-media/image/upload/v1752881847/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-update-management/azure-portal-linux-ra-vm-updates.jpg)

After a manual assessment, you have the option to schedule future update installations. This provides flexibility to create a one-time update deployment or to schedule periodic updates via a maintenance configuration.

![The image shows the Microsoft Azure portal interface for managing updates on a virtual machine named "vm-from-image." It displays details about recommended updates, with a total of five updates, all classified as "Other."](https://kodekloud.com/kk-media/image/upload/v1752881848/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-update-management/azure-portal-vm-updates-interface.jpg)

By enabling periodic assessments, the system automatically checks for new updates and alerts you when a patch or reboot is required. This ensures that your systems remain secure and updated without constant manual intervention, though manual review remains available for production environments.

This lesson provided an overview of how Azure Update Management works and how to set it up to efficiently update your machines. An important next step is to explore the deployment of disk encryption for further securing your infrastructure.

## Additional Resources

- [Azure Update Management Documentation](https://learn.microsoft.com/en-us/azure/automation/update-management)
- [Azure Monitor Documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/)

For more insights on securing your infrastructure, consider learning about disk encryption and other advanced Azure security features.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d8d70777-3d80-4e41-803e-0929352de5e7/lesson/e07b41b7-83d5-4920-9903-977e7b381359)**
>
> Watch video content
