# Implement Just in time VM access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Defender-for-Cloud/Implement-Just-in-time-VM-access)

---

## Table of Contents

- Implement Just in time VM access
  - Overview
  - How JIT Access Works
  - Policy Configuration
  - Demonstration through the Azure Portal
  - Transition to Microsoft Sentinel
  - Watch Video
    - Step 1: Verify Virtual Machine Network Settings
    - Step 2: Access Microsoft Defender for Cloud
    - Step 3: Configure JIT Access
    - Step 4: Request and Use JIT Access

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Defender for Cloud

# Implement Just in time VM access

In this article, we will guide you through implementing Just-in-Time (JIT) access for virtual machines. JIT access is a security feature that temporarily opens VM management ports (such as SSH on port 22 or RDP on port 3389) only when needed, drastically reducing the overall attack surface.

## Overview

Exposing management ports to the internet poses security risks. With JIT access, these ports remain closed by default and are only opened for a limited duration for approved IP addresses. This approach resembles Privileged Identity Management, ensuring that access is temporary and pre-approved. The key benefits include:

- Minimized risk through reduced open attack surfaces.
- Granular control over privileged access.
- Comprehensive audit trails that log every access request, approval, and active timeframe.

> [!important]
> **Note**
>
> Regularly review and update your access policies to align with evolving security requirements.

## How JIT Access Works

The workflow for implementing JIT access is straightforward and consists of four main steps:

1.  **Onboard Virtual Machines:** Enroll your VMs in the JIT system.
2.  **Define Policies:** Configure policies outlining which management ports to open, allowed source IPs, protocols, and maximum access duration.
3.  **Request and Approve Access:** Users request access, and administrators approve the request for a short period.
4.  **Monitor Access:** All access requests and activity are logged for auditing and alert purposes in case of unauthorized or suspicious activities.

## Policy Configuration

When setting up JIT, you need to establish clear policies that include:

- Configuring allowed ports and protocols.
- Specifying the permitted IP addresses or ranges.
- Defining the maximum duration for access.

Integrating with Azure Active Directory (Azure AD) and leveraging Role-Based Access Control (RBAC) can add an extra layer of security by managing sign-ins and controlling VM access.

## Demonstration through the Azure Portal

Below, we walk through the configuration process for JIT access using the Azure Portal.

### Step 1: Verify Virtual Machine Network Settings

Assume you have a Linux VM with port 22 exposed to the internet. Begin by reviewing its Network Security Group (NSG) settings.

![The image shows the network settings page for a virtual machine named "linux-brtf-vm" in the Microsoft Azure portal, displaying details like network interface, IP addresses, and security rules.](https://kodekloud.com/kk-media/image/upload/v1752882025/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Just-in-time-VM-access/azure-virtual-machine-network-settings.jpg)

### Step 2: Access Microsoft Defender for Cloud

Next, navigate to Microsoft Defender for Cloud to explore the JIT access settings. Look for the "Workload Protection" quick link, which, after a brief load, displays JIT VM access details.

![The image shows a Microsoft Azure portal screen for a virtual machine, displaying security recommendations from Microsoft Defender for Cloud. It lists six recommendations with varying severity levels to enhance security.](https://kodekloud.com/kk-media/image/upload/v1752882026/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Just-in-time-VM-access/azure-portal-virtual-machine-security-recommendations.jpg)

In some cases, you might see a message indicating that no machines are currently configured with JIT. This occurs when the VM without a public IP is considered secure. However, for machines with NSGs allowing access to management ports, enabling JIT is highly recommended.

![The image shows a Microsoft Azure portal page for "Just-in-time VM access," displaying a list of virtual machines with their configuration status and security details. It highlights the importance of enabling JIT access to restrict management port access for VMs.](https://kodekloud.com/kk-media/image/upload/v1752882027/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Just-in-time-VM-access/azure-portal-just-in-time-vm-access.jpg)

### Step 3: Configure JIT Access

Select the virtual machine that requires JIT access configuration. For a Linux VM, you might want to remove any unnecessary port configurations on port 22 before adding a secure rule.

![The image shows a Microsoft Azure portal page for configuring Just-In-Time (JIT) VM access, listing ports, protocols, allowed source IPs, and time ranges.](https://kodekloud.com/kk-media/image/upload/v1752882028/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Just-in-time-VM-access/azure-portal-jit-vm-access-config.jpg)

When setting up the rule, use the following configuration details:

- **Port:** 22 with TCP as the protocol.
- **Maximum Request Time:** 1 hour (after which access is automatically revoked).

![The image shows a Microsoft Azure portal screen for configuring Just-In-Time (JIT) VM access, specifically for port 22 with options for protocol and allowed source IPs. On the right, there's a panel for adding port configuration details.](https://kodekloud.com/kk-media/image/upload/v1752882029/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Just-in-time-VM-access/azure-jit-vm-access-port-22.jpg)

After saving the settings, JIT access is enabled for the selected VM.

> [!important]
> **Warning**
>
> Always verify that the correct ports and IP addresses are configured to prevent unintended access.

### Step 4: Request and Use JIT Access

To access your VM, follow these steps:

1.  Navigate to the VM in the Azure Portal.
2.  Click the "Connect" option.
3.  In the connection portal, review the configuration for port 22 and use the request access option.
4.  Select the appropriate IP address (for example, your local machine's IP) and request access.

![The image shows a Microsoft Azure portal interface for managing virtual machines, specifically focusing on connecting to a virtual machine named "linux-brtf-vm" using just-in-time access.](https://kodekloud.com/kk-media/image/upload/v1752882030/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-Just-in-time-VM-access/azure-portal-virtual-machine-connection.jpg)

Once your request is approved, connect using an SSH command from your terminal. For example:

```
ssh kodekloud@linux-brtf-vm
```

After entering your credentials, you are connected to your Linux VM. Remember that the access is valid only for the duration assigned by the JIT policy (in this case, one hour). After the duration expires, you must request access again.

Below is a sample terminal output indicating a successful connection:

```
Expanded Security Maintenance for Applications is not enabled.
0 updates can be applied immediately.


Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.


Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.


To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.
kodekloud@linux-brtf-vm:~$
```

This output confirms that you have successfully connected to your Linux VM via JIT access.

## Transition to Microsoft Sentinel

Following the successful JIT configuration in Microsoft Defender for Cloud, the next step is to enhance monitoring and security management by transitioning to Microsoft Sentinel.

In summary, this guide has explored how to configure and use JIT access to secure your virtual machines by granting temporary, controlled access to management ports. Regular policy reviews and detailed logging help ensure that your systems remain secure while allowing necessary administrative tasks.

For further reading and best practices, check out the following links:

- [Azure Security Documentation](https://docs.microsoft.com/azure/security/)
- [Microsoft Sentinel Documentation](https://docs.microsoft.com/azure/sentinel/)
- [Azure Active Directory (Azure AD)](https://docs.microsoft.com/azure/active-directory/)

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/aea85892-224f-4bd2-8013-e36764e15f37/lesson/40be32d1-3abe-4935-ae99-6a3c667a5af4)**
>
> Watch video content
