# Private and Public IP addresses - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Virtual-Networking/Private-and-Public-IP-addresses)

---

## Table of Contents

- Private and Public IP addresses
  - Private IP Addresses
  - Public IP Addresses
  - Configuring a Virtual Network in Azure
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Virtual Networking

# Private and Public IP addresses

In this article, we explore the concepts of private and public IP addresses, their allocation methods, and how they are utilized within Azure environments. Detailed diagrams illustrate virtual network structures, subnet configurations, and the relationships between private and public IP addresses.

---

## Private IP Addresses

Azure virtual networks are allocated a large private address space defined by a CIDR block (e.g., 192.168.0.0/16). This range forms the backbone for assigning private IP addresses to Azure resources. Within this address space, you can create multiple subnets—such as gateway, front-end, and database subnets—where each resource receives its own private IP, enabling internal communication without exposure to the public internet.

For instance, virtual machines in a front-end subnet might be assigned addresses from the 192.168.1.0/24 range. These private IPs facilitate communication within the network and support interactions with other virtual networks or on-premises systems via VPNs.

There are two methods for assigning private IP addresses:

- **Static Allocation:** Assign a fixed IP address to critical services (e.g., domain controllers, web servers, DNS servers, internal Azure Load Balancer, or Application Gateway). Static allocation guarantees that the IP address remains unchanged after a server reboot.
- **Dynamic Allocation:** Automatically assign an available IP address from the address pool (often using DHCP principles). In this case, when a server restarts and its previous IP is unavailable, a new IP is assigned.

Below is a diagram that illustrates a virtual network with multiple subnets and highlights the allocation methods for IP addresses:

![The image illustrates a virtual network with three subnets: GatewaySubnet, frontendSubnet, and databaseSubnet, each with specific IP address ranges. It also mentions allocation methods: static and dynamic.](https://kodekloud.com/kk-media/image/upload/v1752884825/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-and-Public-IP-addresses/virtual-network-subnets-ip-allocation.jpg)

---

## Public IP Addresses

While private IP addresses enable internal communication, they are not routable over the internet. For example, a web service running on a virtual machine with a private IP address (e.g., 192.168.1.4) cannot be directly accessed from the internet. Azure addresses this limitation by using public IP addresses, which allow external access to services.

Public IP addresses can also be allocated either statically or dynamically:

- **Static Public IP Allocation:** Provides an unchanging IP address accessible from the internet.
- **Dynamic Public IP Allocation:** May assign a new IP address upon a system reboot if the previous one is no longer available.

Public IP addresses in Azure come with two SKUs: Basic and Standard. The following table summarizes their key differences:

| Feature                | Basic SKU                              | Standard SKU                                |
| ---------------------- | -------------------------------------- | ------------------------------------------- |
| Allocation Method      | Supports static and dynamic allocation | Supports static allocation only             |
| Security               | Open by default                        | Closed by default; secured using NSGs       |
| Redundancy             | Deployed in a single data center/zone  | Offers zone redundancy                      |
| Resource Attachability | Limited (excludes certain services)    | More flexible; supports additional services |

The diagram below compares the two SKUs and their features:

![The image is a comparison chart of public IP address allocation types and SKUs, detailing features like IP allocation, security, resources, and redundancy for Basic and Standard SKUs.](https://kodekloud.com/kk-media/image/upload/v1752884827/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-and-Public-IP-addresses/ip-address-allocation-comparison-chart.jpg)

> [!important]
> **Network Security Note**
>
> In enterprise architectures, public IPs are often not assigned directly to individual resources. Instead, traffic is routed through a firewall to provide an extra layer of security, protecting resources against threats like DDoS attacks. For testing or lab environments, however, public IPs may be attached directly to VMs for SSH or RDP access.

---

## Configuring a Virtual Network in Azure

Follow these steps to create and configure a Virtual Network in the Azure portal:

1.  **Create a Virtual Network:**  
    Navigate to "Virtual Networks" in the Azure portal and create a new Virtual Network. Choose the appropriate subscription, create a new resource group (for example, "M4"), and select a deployment region.
2.  **Configure the Address Space:**  
    By default, Azure might assign an address space like 10.0.0.0/16 for new subscriptions. For on-premises compatibility or to align with previous configurations, remove the default and set the address space to 192.168.0.0/16.
3.  **Add a Subnet:**  
    Create a subnet by specifying a name and an IP range. For example, name the subnet "workloads-fe" to designate the front-end subnet. Azure segments the IP range automatically, and you may adjust the subnet mask (e.g., using /24) as needed.

Below is an illustration of the Azure portal interface for creating a Virtual Network, including IP address configuration and subnet settings:

![The image shows a Microsoft Azure portal interface for creating a virtual network, with options to configure IP addresses and add a subnet. The left side displays the IP address space configuration, while the right side shows the "Add a subnet" settings.](https://kodekloud.com/kk-media/image/upload/v1752884828/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-and-Public-IP-addresses/azure-portal-virtual-network-setup.jpg)

Once you complete these steps, click "Review and Create" to deploy the Virtual Network.

4.  **Managing Existing Resources:**  
    For existing virtual machines, inspect the network settings to view both private and public IP configurations:
    - **Private IP Address:** Facilitates internal communication within the Virtual Network.
    - **Public IP Address:** Exposes the VM to the internet.

    To modify these settings, navigate to the VM's networking section in the Azure portal. You can change the private IP allocation method (static or dynamic) or update the public IP assignment.

The following screenshot displays the networking settings for a virtual machine:

![The image shows a Microsoft Azure portal interface displaying the networking settings for a virtual machine, including inbound port rules and network interface details.](https://kodekloud.com/kk-media/image/upload/v1752884829/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-and-Public-IP-addresses/azure-portal-network-settings-vm.jpg)

By selecting "IP Configurations," you can view and modify subnet settings, and change the allocation method to static if required. You can also create or associate a new public IP address from this interface.

![The image shows a Microsoft Azure portal interface for configuring IP settings of a virtual machine. It includes options for IP forwarding, virtual network selection, and IP configuration details such as IP version, type, and allocation.](https://kodekloud.com/kk-media/image/upload/v1752884830/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-and-Public-IP-addresses/azure-portal-ip-settings-virtual-machine.jpg)

To change the public IP address setup, select the current configuration to modify it— for example, switching to static allocation. Note that from September 30, 2025, Azure Basic public IPs will be retired, leaving only the Standard option available:

![The image shows the Microsoft Azure portal interface for configuring IP settings of a virtual machine, with options to add a public IP address and select its configuration.](https://kodekloud.com/kk-media/image/upload/v1752884831/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Private-and-Public-IP-addresses/azure-portal-ip-settings-virtual-machine-2.jpg)

> [!important]
> **Important**
>
> Remember, a single network interface can be configured with only one public IP address. To assign multiple public IP addresses to a virtual machine, attach an additional network interface.

---

## Conclusion

This article has detailed the essential differences between private and public IP addresses in Azure, including their allocation methods and the distinctions between Basic and Standard public IP SKUs. We also guided you through setting up a Virtual Network, configuring address spaces, and managing subnets and IP addresses.

With this comprehensive understanding, you are now better prepared to manage network configurations in Azure. For more detailed information, consider exploring the official [Azure Networking Documentation](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview).

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/0e1b0d45-5f1a-4fbe-adea-b565037f2047)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/809fc274-7871-4b13-8f85-052b43442c81/lesson/97678ff6-4c6c-45ea-b6b3-e840c7213937)**
>
> Practice lab
