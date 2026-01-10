# Private DNS Zones - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Virtual-Networking/Private-DNS-Zones)

---

## Table of Contents

- Private DNS Zones
  - Overview of Private DNS Zones
  - Configuring Private DNS Zones in the Azure Portal
  - Deploying a Virtual Machine via Azure CLI
  - Testing DNS Resolution: With and Without Private DNS Zones
  - Creating Virtual Network Links for Private DNS Zones
  - Verifying Enhanced DNS Resolution
  - Conclusion
  - Watch Video
    - Example Terminal Session

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Virtual Networking

# Private DNS Zones

In this guide, we explore Private DNS Zones—a key component for resolving names to private IP addresses and managing internal resources. Unlike public DNS zones used for websites or SharePoint sites, Private DNS Zones provide enhanced name resolution within your private network.

## Overview of Private DNS Zones

Imagine a scenario where your subscription contains two virtual networks (VNet A and VNet B), each with its own address space. Virtual machines (VMs) within a single VNet can automatically resolve names due to Azure’s internal domain configuration. For instance, VM01 in VNet A can easily resolve VM02 within the same network.

However, when you need to resolve names across different VNets—such as resolving VM04 in VNet B from VM01 in VNet A—a standard VNet DNS configuration is insufficient. This is where Private DNS Zones become vital. By creating a Private DNS Zone (for example, kodekloudinternal.com) and linking it to relevant virtual networks, you enable automatic registration and resolution of DNS records across multiple VNets.

An auto-registration feature can be optionally enabled so that any new VM added to the linked networks automatically registers its DNS record.

![The image illustrates a diagram of private DNS zones, showing virtual machines (VMs) with their names and IP addresses linked to two virtual networks (vnet-a and vnet-b). It includes a table listing the VMs and their corresponding IPs.](https://kodekloud.com/kk-media/image/upload/v1752884821/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-DNS-Zones/private-dns-zones-vms-diagram.jpg)

Once connected via virtual network links, VMs are able to resolve each other’s names across different networks. For example, VM1 can resolve VM5 and VM6, while VM4 can resolve VM3. Note that this configuration only ensures DNS resolution; actual communication between VMs requires additional settings, like Virtual Network Peering.

## Configuring Private DNS Zones in the Azure Portal

To get started, follow these steps in the Azure Portal:

1.  Search for "Private DNS Zones."
2.  Create a new DNS zone within the appropriate resource group (e.g., kodecloudinternal.com, sometimes abbreviated as "int" for internal use).

![The image shows a Microsoft Azure portal interface for creating a Private DNS zone, with fields for project and instance details being filled out.](https://kodekloud.com/kk-media/image/upload/v1752884822/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-DNS-Zones/azure-portal-private-dns-zone.jpg)

> [!important]
> **Note**
>
> Private DNS Zones are global resources. You do not need to specify a resource location since the zone’s metadata is stored in the resource group's location.

After creating your DNS zone, you can begin managing virtual machines. For demonstration, we use pre-deployed VMs to verify name resolution using the nslookup command-line tool.

### Example Terminal Session

Upon logging into VM1, you will notice that the DNS configuration file (/etc/resolv.conf) automatically includes an Azure-provided search domain. Next, perform an nslookup to resolve another VM in the same network:

```
kodekloud@workload-a-vm-1:~$ nslookup workload-a-vm-2
Server:         127.0.0.53
Address:        127.0.0.53#53


Non-authoritative answer:
Name:   workload-a-vm-2.hnv5wu0qur4nejnur5qdmnwrjryh.bx.internal.cloudapp.net
Address: 192.168.1.5
```

This successful resolution occurs because both VMs reside in the same VNet, utilizing Azure's internal DNS. However, attempting to resolve a VM from a different VNet that isn’t registered in the internal domain results in a failure:

```
kodekloud@workload-a-vm-1:~$ nslookup dns-demo-vm
Server:         127.0.0.53
Address:        127.0.0.53#53


** server can't find dns-demo-vm: SERVFAIL
```

At this point, Private DNS Zones are essential for enabling cross-VNet name resolution.

## Deploying a Virtual Machine via Azure CLI

For testing, let’s deploy a virtual machine using the Azure CLI. First, verify you’re using the correct Azure subscription:

```
rithin [ ~ ]$ az account show
{
  "environmentName": "AzureCloud",
  "homeTenantId": "1e0fa212-37dc-45fb-bbef-b60867cac64b",
  "id": "5487d26b-b5b1-468e-ad45-6e12acff7e7",
  "isDefault": true,
  "managedByTenants": [],
  "name": "MSDN Firbish RTN",
  "state": "Enabled",
  "tenantId": "1e0fa212-37dc-45fb-bbef-b60867cac64b",
  "user": {
    "cloudShellId": true,
    "name": "rithinskaria@kodekLOUDlab.onmicrosoft.com",
    "type": "user"
  }
}
rithin [ ~ ]$ az account set --subscription "Your_Subscription_ID"
```

Next, create a resource group and deploy the new VM:

```
az group create -n dns-demo -l "East US"


az vm create -g dns-demo -n dns-demo-vm --image Ubuntu2204 --admin-username kodekloud --admin-password 'WMP5$word12'
```

After deployment, the VM is assigned both private and public IP addresses. You can confirm its status in the "Virtual Machines" section of the Azure Portal.

## Testing DNS Resolution: With and Without Private DNS Zones

Return to your terminal on workload VM1 and run a series of nslookup tests:

```
kodekloud@workload-a-vm-1:~$ nslookup workload-a-vm-2
Server:         127.0.0.53
Address:        127.0.0.53#53


Non-authoritative answer:
Name:   workload-a-vm-2.hnv5wu0qur4nejnur5qdmnwjryh.bx.internal.cloudapp.net
Address: 192.168.1.5


kodekloud@workload-a-vm-1:~$ nslookup workload-b-vm-2
Server:         127.0.0.53
Address:        127.0.0.53#53


Non-authoritative answer:
Name:   workload-b-vm-2.hnv5wu0qur4nejnur5qdmnwjryh.bx.internal.cloudapp.net
Address: 192.168.2.5


kodekloud@workload-a-vm-1:~$ nslookup dns-demo-vm
Server:         127.0.0.53
Address:        127.0.0.53#53


** server can't find dns-demo-vm: SERVFAIL
```

The nslookup for dns-demo-vm fails because it is not yet registered in the internal domain. This gap is resolved by configuring Private DNS Zones for cross-VNet name resolution.

## Creating Virtual Network Links for Private DNS Zones

To enable automatic DNS record registration across virtual networks, configure virtual network links within your Private DNS Zone:

1.  Open your Private DNS Zone in the Azure Portal.
2.  Click on "Add" to create a new virtual network link.
    - Provide a descriptive link name (e.g., dnsdemovm_vnet).
    - Select the appropriate virtual network.
    - Enable auto-registration to allow both new and existing VMs to automatically add their DNS records.
3.  Repeat the process for a second virtual network (e.g., vnlvnetworkloads), linking it to your NSG workload VNet.

![The image shows a Microsoft Azure portal interface for adding a virtual network link to a private DNS zone. It includes fields for link name, subscription, and virtual network selection.](https://kodekloud.com/kk-media/image/upload/v1752884823/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-DNS-Zones/azure-portal-virtual-network-link.jpg)

After creating the virtual network links, ensure that each displays a "Completed" status. With these links active, DNS records from all linked networks populate automatically in the Private DNS Zone.

![The image shows a Microsoft Azure portal interface displaying the "Virtual network links" section for a private DNS zone named "kodekloud-int.com," with details about link status, virtual networks, and auto-registration.](https://kodekloud.com/kk-media/image/upload/v1752884823/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-DNS-Zones/azure-portal-virtual-network-links.jpg)

![The image shows a Microsoft Azure portal interface displaying details of a private DNS zone for "kodekloud-int.com," including resource group, subscription information, and DNS record sets.](https://kodekloud.com/kk-media/image/upload/v1752884824/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-DNS-Zones/azure-portal-private-dns-zone-2.jpg)

## Verifying Enhanced DNS Resolution

Once the virtual network links are in place and DNS records are updated, test name resolution again from workload VM1:

```
kodekloud@workload-a-vm-1:~$ nslookup workload-a-vm-2
Server:         127.0.0.53
Address:        127.0.0.53#53


Non-authoritative answer:
Name:   workload-a-vm-2.hnv5wu0qur4nejnur5qdmnwjryh.bx.internal.cloudapp.net
Address: 192.168.1.5


kodekloud@workload-a-vm-1:~$ nslookup workload-b-vm-2
Server:         127.0.0.53
Address:        127.0.0.53#53


Non-authoritative answer:
Name:   workload-b-vm-2.hnv5wu0qur4nejnur5qdmnwjryh.bx.internal.cloudapp.net
Address: 192.168.2.5


kodekloud@workload-a-vm-1:~$ nslookup dns-demo-vm.kodekloud-int.com
Server:         127.0.0.53
Address:        127.0.0.53#53


Non-authoritative answer:
Name:   dns-demo-vm.kodekloud-int.com
Address: 10.0.0.4
```

Now, the dns-demo-vm is successfully resolved within the Private DNS Zone, proving that VMs across linked VNets can discover each other’s DNS records. Remember, while DNS resolution is now improved, the actual inter-VM connectivity requires solutions like Virtual Network Peering.

## Conclusion

Private DNS Zones are essential for managing internal name resolution and establishing secure links between virtual networks without exposing internal IP addresses publicly. In this article, we covered:

- The core concept and benefits of Private DNS Zones.
- How to create a Private DNS Zone using the Azure Portal.
- Deploying a virtual machine via the Azure CLI.
- Configuring virtual network links for automatic DNS registration.
- Verifying improved DNS resolution across different VNets.

For further exploration, upcoming articles will delve into Virtual Network Peering, VPN connectivity, and routing with private endpoints—enhancing your overall understanding of hybrid connectivity in Azure.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/ebe40b5c-4a2f-49ae-bf69-f95688ad75d8)**
>
> Watch video content
