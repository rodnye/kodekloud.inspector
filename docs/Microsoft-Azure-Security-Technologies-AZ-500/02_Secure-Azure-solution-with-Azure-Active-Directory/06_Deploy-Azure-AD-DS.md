# Deploy Azure AD DS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Secure-Azure-solution-with-Azure-Active-Directory/Deploy-Azure-AD-DS)

---

## Table of Contents

- Deploy Azure AD DS
  - 1. Launching Azure AD Domain Services in the Azure Portal
  - 2. Creating the Azure AD Domain Services Resource
  - 3. Configuring Region, SKU, and Pricing
  - 4. Setting Up the Virtual Network
  - 5. Configuring Domain Administration
  - 6. Configuring Synchronization Settings
  - 7. Reviewing Settings and Finalizing Deployment
  - 8. Preparing a Virtual Machine for Domain Join
  - 9. Updating DNS Settings on the Virtual Machine
  - 10. Configuring Virtual Network Peering
  - 11. Joining the Virtual Machine to the Domain
  - 12. Managing Domain Services with RSAT
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Secure Azure solution with Azure Active Directory

# Deploy Azure AD DS

In this guide, you'll learn how to deploy Azure AD Domain Services using the Azure portal. The walkthrough covers configuring the service, setting up network integration, and joining a Windows Server VM to the domain. Follow along with the step-by-step instructions and accompanying screenshots.

---

## 1\. Launching Azure AD Domain Services in the Azure Portal

Begin by logging into your [Azure portal](https://portal.azure.com) and searching for "Azure AD Domain Services." This will locate the service along with accompanying documentation and related services.

![The image shows the Microsoft Azure portal with a search for "Azure AD Domain Services" and related services and documentation listed.](https://kodekloud.com/kk-media/image/upload/v1752882209/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-search-ad-domain-services.jpg)

---

## 2\. Creating the Azure AD Domain Services Resource

To deploy the service, you must first create an Azure AD Domain Services resource. Start with a resource group (for instance, name it “RG”) and specify a DNS name. For seamless integration with your existing Azure AD, use your default Azure AD DNS name to maintain a consistent domain across services.

![The image shows a Microsoft Azure portal page for creating Azure AD Domain Services, with fields for project details such as subscription, resource group, DNS domain name, region, and SKU.](https://kodekloud.com/kk-media/image/upload/v1752882210/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-create-ad-domain-services.jpg)

---

## 3\. Configuring Region, SKU, and Pricing

Select your preferred region (e.g., East US) and choose an appropriate SKU from enterprise, standard, or premium. If you're uncertain which SKU best meets your requirements, click on "help me choose a SKU" for a detailed review of factors like object count, authentication load per hour, backup frequency, and additional features such as forest trust capabilities.

![The image shows a pricing table for Azure Active Directory Domain Services, detailing different service tiers (Standard, Enterprise, Premium) with associated costs and features like suggested auth load, object count, and backup frequency.](https://kodekloud.com/kk-media/image/upload/v1752882211/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-active-directory-pricing-table.jpg)

> [!important]
> **Tip**
>
> For a development deployment, the Standard SKU is used. Always analyze your production requirements before choosing a higher SKU level.

---

## 4\. Setting Up the Virtual Network

Azure AD Domain Services is deployed into a virtual network. In a new subscription, Azure will automatically propose a virtual network with an address range that avoids conflicts with other networks.

![The image shows a Microsoft Azure portal page for creating Azure AD Domain Services, specifically on the "Networking" tab, where users can select a virtual network and subnet.](https://kodekloud.com/kk-media/image/upload/v1752882213/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-ad-domain-services-networking.jpg)

---

## 5\. Configuring Domain Administration

Manage domain controller administrators by adding users or groups to the Azure AD group named "AADDC administrators." Global administrators can also opt to receive alerts via notifications. To manage permissions, click "manage group membership" and add the required users.

![The image shows a Microsoft Azure portal page for creating Azure AD Domain Services, specifically focusing on the "Administration" tab where users can specify administrative privileges and notification settings.](https://kodekloud.com/kk-media/image/upload/v1752882214/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-ad-domain-services-admin-tab.jpg)

For example, add your name to the group:

![The image shows a Microsoft Azure interface for adding members, with options to search for users, groups, devices, and enterprise applications. The screen is currently empty with no members selected.](https://kodekloud.com/kk-media/image/upload/v1752882214/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-add-members-interface-empty.jpg)

---

## 6\. Configuring Synchronization Settings

Navigate to the Synchronization tab and select a synchronization type of "all" to ensure that every identity from Azure AD is synchronized. Additional options (such as TLS mode, NTLM v1, password synchronization, Kerberos, and LDAP) are available to meet specific security and operational needs.

![The image shows a Microsoft Azure portal page for creating Azure AD Domain Services, specifically on the "Synchronization" tab. It includes options for synchronization type and filter settings.](https://kodekloud.com/kk-media/image/upload/v1752882215/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-ad-domain-services-synchronization.jpg)

![The image shows a Microsoft Azure portal page for configuring Azure AD Domain Services, specifically focusing on security settings with options to enable or disable features like TLS 1.2, NTLM v1 Authentication, and Kerberos encryption.](https://kodekloud.com/kk-media/image/upload/v1752882217/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-ad-domain-services-security-settings.jpg)

---

## 7\. Reviewing Settings and Finalizing Deployment

After configuring all settings, click on "Review + Create" and then "Create" once validation passes.

> [!important]
> **Important**
>
> A warning will appear indicating that your configuration choices are final and cannot be modified after deployment. Accept the warning by clicking "OK."

![The image shows a Microsoft Azure portal page for creating Azure AD Domain Services, with a warning about final choices that cannot be changed after creation. It includes options for network settings and an administrator group.](https://kodekloud.com/kk-media/image/upload/v1752882218/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-ad-domain-services-portal.jpg)

Once confirmed, wait while the service is deployed. During this time, you may review documentation on trust relationships. Note that while full two-way trust is unsupported with Azure AD Domain Services, you can implement a one-way outbound trust (typically with on-premises environments) to enable authentication for users and applications.

![The image shows a pricing table for Azure Active Directory Domain Services, detailing costs and features for Standard, Enterprise, and Premium tiers. It includes information on suggested load, object count, backup frequency, and pricing for user and resource forests.](https://kodekloud.com/kk-media/image/upload/v1752882219/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-ad-domain-services-pricing-table.jpg)

![The image shows a Microsoft Azure portal page where a deployment is in progress, detailing resources like Azure AD Domain Services, a virtual network, and a network security group.](https://kodekloud.com/kk-media/image/upload/v1752882220/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-deployment-progress.jpg)

---

## 8\. Preparing a Virtual Machine for Domain Join

While the domain service is deploying, create a virtual machine (VM) that will join the domain. For this demonstration, set up a separate resource group (e.g., “RG workloads”) to host workload VMs. Deploy a Windows Server 2019 Datacenter VM with the necessary credentials, ensuring the RDP port is open for remote access.

![The image shows a Microsoft Azure portal page for creating a virtual machine, with a notification about submitting a deployment template. Pricing details and terms are also visible.](https://kodekloud.com/kk-media/image/upload/v1752882221/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-virtual-machine-deployment.jpg)

After deployment, verify the status of Azure AD Domain Services from the Azure portal.

![The image shows a Microsoft Azure portal page for "kodekloudlabs.onmicrosoft.com," indicating that the Azure AD Domain Services are running, with options to view health and manage settings.](https://kodekloud.com/kk-media/image/upload/v1752882223/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-kodekloudlabs-ad-services.jpg)

---

## 9\. Updating DNS Settings on the Virtual Machine

If you encounter a warning regarding DNS records, click on it to review detailed network analysis. This warning indicates that you need to update the virtual network's DNS servers with the domain controllers’ IP addresses to allow domain join operations.

![The image shows a Microsoft Azure configuration diagnostics page for a domain service, indicating a warning related to DNS server settings that need configuration for a virtual network.](https://kodekloud.com/kk-media/image/upload/v1752882224/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-configuration-diagnostics-dns-warning.jpg)

Examine the underlying network configuration via the virtual network diagram. This diagram displays two network interfaces for the domain controllers that must be added as DNS servers.

![The image shows a Microsoft Azure portal interface displaying a virtual network diagram for "aadds-vnet," including subnet components and network interfaces.](https://kodekloud.com/kk-media/image/upload/v1752882225/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-aadds-vnet-diagram.jpg)

Next, update the DNS settings of your target VM by following these steps:

1.  Navigate to the VM's Networking settings.
2.  Change the DNS configuration from Default to "Custom."
3.  Enter the IP addresses of the domain controllers (or Azure AD Domain Services).
4.  Save the changes. Note that the VM will restart to apply the updated DNS settings.

![The image shows a Microsoft Azure portal interface where DNS server settings for a virtual network named "win-iis-01-vnet" are being configured with custom IP addresses. A notification indicates that the DNS settings have been successfully saved.](https://kodekloud.com/kk-media/image/upload/v1752882227/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-dns-settings-win-iis-01.jpg)

After the VM restarts, confirm the updated DNS settings by running the following command in Command Prompt or PowerShell:

```
PS C:\Users\winuser> ipconfig /all


Windows IP Configuration


   Host Name . . . . . . . . . . . : win-iis-01
   Primary Dns Suffix . . . . . . . :
   Node Type . . . . . . . . . . . . : Hybrid
   IP Routing Enabled. . . . . . . . : No
   WINS Proxy Enabled. . . . . . . . : No
   DNS Suffix Search List. . . . . . : reddog.microsoft.com


Ethernet adapter Ethernet:


   Connection-specific DNS Suffix . : reddog.microsoft.com
   Description . . . . . . . . . . . : Microsoft Hyper-V Network Adapter
   Physical Address. . . . . . . . . : 00-22-48-1F-8C-A9
   DHCP Enabled. . . . . . . . . . . : Yes
   Autoconfiguration Enabled . . . . : Yes
   Link-local IPv6 Address . . . . . : fe80::407b:4401:e11:ce%4(Preferred)
   IPv4 Address. . . . . . . . . . . : 10.1.0.4(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Lease Obtained. . . . . . . . . . : Wednesday, August 9, 2023 5:34:21 AM
   Lease Expires . . . . . . . . . . : Saturday, September 15, 2159 12:08:43 PM
   Default Gateway . . . . . . . . . : 10.1.0.1
   DHCP Server . . . . . . . . . . . : 168.63.129.16
   DHCPv6 IAID . . . . . . . . . . . : 100672072
   DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-2C-64-65-CA-00-22-48-1F-8C-A9
   DNS Servers . . . . . . . . . . . : 10.0.0.4
                                       10.0.0.5


NetBIOS over Tcpip. . . . . . . . . : Enabled
```

After verifying the updated configuration with tools such as NSLookup or a ping test (e.g., `ping 10.0.0.4`), proceed to establish connectivity between the networks if needed.

---

## 10\. Configuring Virtual Network Peering

If the ping test initially shows timeouts, establish connectivity between the virtual network hosting your VM and the virtual network containing Azure AD Domain Services by creating a peering connection:

1.  Navigate to the virtual network that hosts Azure AD Domain Services.
2.  Click "Add peering" and configure it (for example, name it "AAD to IAS"), ensuring that inbound and outbound traffic is allowed.
3.  Select the IaaS network as the remote network and click "Add."

![The image shows a Microsoft Azure portal interface for adding a virtual network peering. It includes options for configuring traffic settings and selecting a virtual network gateway or route server.](https://kodekloud.com/kk-media/image/upload/v1752882228/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/azure-portal-virtual-network-peering.jpg)

With peering in place, the networks can communicate. Confirm this by running the ping command again:

```
PS C:\Users\winuser> ping 10.0.0.4


Pinging 10.0.0.4 with 32 bytes of data:
Reply from 10.0.0.4: bytes=32 time=<ms TTL=128
Reply from 10.0.0.4: bytes=32 time=<ms TTL=128
Reply from 10.0.0.4: bytes=32 time=<ms TTL=128


Ping statistics for 10.0.0.4:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 8ms, Average = 3ms
```

---

## 11\. Joining the Virtual Machine to the Domain

Once network connectivity is confirmed, join the VM to the domain:

1.  Open System Properties or use the “Change settings” option in the System control panel.
2.  Set the computer name to match the domain name provided in the Azure portal.

> [!important]
> **Password Synchronization**
>
> If your domain administrative password hasn’t synchronized yet, you might encounter authentication issues. In such cases, use the self-service password reset (SSPR) portal at [https://aka.ms/SSPR](https://aka.ms/SSPR) to reset your password. Note that synchronization may take 10 to 15 minutes.

After you successfully join the domain, restart the computer to finalize the process.

![The image shows the Server Manager dashboard on a Windows system, with a dialog box for changing the computer name/domain and a confirmation message about joining a domain.](https://kodekloud.com/kk-media/image/upload/v1752882229/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/server-manager-dashboard-computer-name.jpg)

---

## 12\. Managing Domain Services with RSAT

After the VM has joined the domain, log in using domain administrator credentials (local accounts will not display Active Directory objects). Install the Remote Server Administration Tools (RSAT) to manage Active Directory Domain Services:

1.  Open Server Manager.
2.  Add roles and features.
3.  Include the RSAT tools such as DNS Server Tools.

Once RSAT is installed, open the Active Directory Administrative Center to view and manage domain objects such as users and groups.

![The image shows the Active Directory Administrative Center on a Windows Server Manager dashboard, displaying a list of user groups and their details.](https://kodekloud.com/kk-media/image/upload/v1752882230/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Deploy-Azure-AD-DS/active-directory-user-groups-dashboard.jpg)

Additionally, use DNS Manager to monitor your forward lookup zones and manage DNS records for your domain, ensuring that both the IIS server and management VM (which are domain-joined) are operating correctly.

---

## Conclusion

This guide demonstrated how to deploy Azure AD Domain Services using the Azure portal, configure virtual networks with peering, join a Windows Server VM to the domain, and manage Active Directory objects with RSAT. While Azure AD Domain Services offers many on-premises-like features, be aware that some advanced configurations and trust relationships have limitations.

Thank you for reading this comprehensive walkthrough on deploying Azure AD Domain Services. For additional information, refer to the official [Azure Documentation](https://docs.microsoft.com/azure/active-directory-domain-services/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/c0f70ae1-790f-4a5d-8e09-29450b5ee610/lesson/6b716332-ca65-47fc-88bf-cc5c9da34361)**
>
> Watch video content
