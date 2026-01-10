# Enable and secure remote access management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Host-Security/Enable-and-secure-remote-access-management)

---

## Table of Contents

- Enable and secure remote access management
  - Benefits of Using Azure Bastion
  - Deploying and Using Azure Bastion
  - Connecting to Virtual Machines via Azure Bastion
  - Conclusion
  - Watch Video
    - Deployment Output Snippet
    - Setting Up Azure Bastion

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Host Security

# Enable and secure remote access management

In this guide, you will learn how to enable and secure remote access for your virtual machines using Azure Bastion. In previous examples, a jump box was used to connect to virtual machines without public IP addresses. However, while a jump box is simply a virtual machine with a public IP address, it demands constant management and security updates.

> [!important]
> **Shared Responsibility Model**
>
> Remember that while Microsoft manages the underlying infrastructure (data center, networking, physical hardware), you are responsible for the virtual machine’s operating system, patching, updates, and securing application access.

Maintaining a jump box can be cumbersome because of the continual update and hardening tasks it requires. Azure Bastion simplifies this by providing a managed service that allows secure RDP or SSH connections directly from the Azure portal, without exposing a public IP.

---

Azure Bastion must be deployed to a dedicated subnet within your virtual network. Once set up—either in a central VNet for a hub-and-spoke architecture or in a specific network—you can peer with other VNets and securely connect to your virtual machines without deploying extra jump boxes.

Below is a diagram that illustrates secure remote access management using Azure Bastion within a virtual network. It shows the connections between the Bastion host, subnets, and administrators:

![The image illustrates a diagram of secure remote access management using Azure Bastion within a virtual network, showing connections between subnets and administrators.](https://kodekloud.com/kk-media/image/upload/v1752881867/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-secure-remote-access-management/azure-bastion-remote-access-diagram.jpg)

---

## Benefits of Using Azure Bastion

Azure Bastion offers several advantages over traditional jump boxes:

1.  **Direct RDP and SSH Access in the Azure Portal**  
    Enjoy secure and straightforward connectivity directly from your browser without the need to install additional RDP/SSH clients.
2.  **Elimination of Public IP Requirement**  
    Virtual machines do not require public IP addresses, reducing the risk of DDoS or brute-force attacks and simplifying management.
3.  **Simplified Network Security Group (NSG) Management**  
    Bastion connects directly to the private IP of your VMs, removing the need for complex NSG configurations.
4.  **Protection from Port Scanning**  
    Without a public endpoint, attackers cannot perform port scanning, which significantly enhances network security.
5.  **Centralized Hardening**  
    As a platform-managed service, Azure Bastion benefits from consistent hardening and regular security updates managed by Microsoft.

The diagram below outlines these features, including direct RDP/SSH access, the elimination of public IPs, simplified NSG management, port scanning protection, and support for both basic and standard SKUs:

![The image outlines features of secure remote access management, including direct RDP/SSH in Azure, no public IP requirement, no need to tweak NSGs, port scanning protection, hardening, and support for basic and standard SKUs.](https://kodekloud.com/kk-media/image/upload/v1752881868/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-secure-remote-access-management/secure-remote-access-management-azure.jpg)

Azure Bastion is available in two SKUs:

- **Basic SKU**: Provides essential direct RDP and SSH functionality.
- **Standard SKU**: Offers premium features ideal for larger enterprises and scaling needs.

---

## Deploying and Using Azure Bastion

Below is an overview of deploying Azure Bastion to connect with both Linux and Windows virtual machines that do not have public IP addresses.

### Deployment Output Snippet

The following output snippet shows the deployment of a Linux and a Windows machine to a virtual network. Notice that these machines connect via their private IP addresses:

```
ApplicationProfile          :
PlatformFaultDomain         :
TimeCreated                 : 10/2/2023 1:32:36 PM
RequestId                   :
StatusCode                  : 0
ResourceGroupName           : rg-remoteaccess-20231002
Id                          : /subscriptions/3e17f88a-ad65-4ebe-a407-4dc4cac01a73/resourceGroups/rg-remoteaccess-20231002/providers/Microsoft.Compute/virtualMachines/linux-ra-vm
VmId                        : afe42792-b86d-4ca3-bul843-b4865c917829
Name                        : linux-ra-vm
Type                        : Microsoft.Compute/virtualMachines
Location                    : eastus
ExtendedLocation            :
LicenseType                 :
Tags                        : {}
AvailabilitySetReference    :
DiagnosticsProfile          :
Extensions                  : {}
HardwareProfile             : Microsoft.Azure.Management.Compute.Models.HardwareProfile
InstanceView                :
NetworkProfile              : Microsoft.Azure.Management.Compute.Models.NetworkProfile
SecurityProfile             :
OsName                      :
OsVersion                   :
HyperVGeneration            :
OSProfile                 : Microsoft.Azure.Management.Compute.Models.OSProfile
BillingProfile              :
Plan                        :
ProvisioningState           : Succeeded
StorageProfile              : Microsoft.Azure.Management.Compute.Models.StorageProfile
DisplayHint                 : Compact
Identity                    :
Zones                       :
FullyQualifiedDomainName    : linux-ra-vm-0b15d4.eastus.cloudapp.azure.com
AdditionalCapabilities      :
ProximityPlacementGroup     :
```

Returning to the Azure portal, navigate to the resource group named "rg-remoteaccess-20231002" that contains your Linux and Windows machines:

![The image shows a Microsoft Azure portal interface displaying a resource group named "rg-remoteaccess-20231002" with various resources listed, including virtual machines and disks, located in the East US region.](https://kodekloud.com/kk-media/image/upload/v1752881870/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-secure-remote-access-management/azure-portal-rg-remoteaccess-resources.jpg)

Open the virtual network "remote access" to see its connected devices. There are two subnets: one for Windows machines and one for Linux machines:

![The image shows a Microsoft Azure portal interface displaying connected devices in a virtual network, listing two network interfaces with their IP addresses and subnets.](https://kodekloud.com/kk-media/image/upload/v1752881872/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-secure-remote-access-management/azure-portal-connected-devices-network.jpg)

### Setting Up Azure Bastion

1.  **Create a Bastion Host**  
    In the Azure portal, navigate to the Bastion creation page and enter the following details:
    - **Resource Group:** Select your remote access resource group.
    - **Region:** East US.
    - **Tier:** Standard.
    - **Instance Count:** Two (or more if needed).

    ![The image shows a Microsoft Azure portal interface for creating a Bastion host, with fields for project and instance details, virtual network configuration, and public IP address settings.](https://kodekloud.com/kk-media/image/upload/v1752881873/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-secure-remote-access-management/azure-portal-bastion-host-setup.jpg)

2.  **Configure the Virtual Network**  
    Choose the "VNet remote access" and click on "Manage subnet configuration" to add a subnet. Name this subnet "Azure Bastion subnet" and assign an appropriate address space (a /26 is sufficient). Azure Bastion will automatically detect this dedicated subnet.
3.  **Configure Public IP Address**  
    Create a new public IP address for Azure Bastion. This public IP is dedicated solely to the Bastion service and is not exposed directly to the internet.
4.  **Review and Create**  
    Review your settings, and optionally configure additional features such as IT base connection and Kerberos authentication. Then, click on Create to deploy the Bastion host.

    ![The image shows the "Create a Bastion" page on the Microsoft Azure portal, displaying a summary of settings for a Bastion host configuration.](https://kodekloud.com/kk-media/image/upload/v1752881875/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-secure-remote-access-management/create-bastion-azure-portal.jpg)

Once deployed, Azure Bastion becomes available as a managed resource ready to provide secure remote access.

---

## Connecting to Virtual Machines via Azure Bastion

With Azure Bastion deployed, connecting to your virtual machines is straightforward:

1.  Navigate to the "Virtual Machines" section in the Azure portal.
2.  Select the desired virtual machine (e.g., a Windows machine).
3.  Click on "Connect" and then choose "Bastion."
4.  Provide the necessary username and password when prompted.
5.  Approve any browser pop-up prompts to launch the remote session.

You will now be connected directly through your browser. The same process applies when connecting to a Linux virtual machine via the "Overview" section by selecting "Connect" and choosing "Bastion."

![The image shows a Microsoft Azure portal interface displaying details of a Bastion resource named "ra-bastion," including its resource group, location, subscription, and provisioning state.](https://kodekloud.com/kk-media/image/upload/v1752881876/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-and-secure-remote-access-management/azure-portal-bastion-resource-details.jpg)

> [!important]
> **Centralized Access**
>
> There is no need to deploy Azure Bastion in every virtual network. A centralized Bastion host in a hub network can provide secure access to virtual machines across multiple peered VNets.

---

## Conclusion

By leveraging Azure Bastion, you enhance the security and management of remote access to your virtual machines. This solution removes the dependency on public IP addresses, reduces configuration overhead associated with NSGs, and provides robust protection against external threats.

This concludes our guide on enabling and securing remote access management using Azure Bastion. For additional information on Azure security technologies, consider exploring the [Azure Documentation](https://docs.microsoft.com/azure/security/) and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d8d70777-3d80-4e41-803e-0929352de5e7/lesson/5d60e4a9-628a-4b4d-88d0-017e3c4bed0f)**
>
> Watch video content
