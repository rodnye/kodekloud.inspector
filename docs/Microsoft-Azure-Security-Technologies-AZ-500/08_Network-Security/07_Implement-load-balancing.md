# Implement load balancing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Implement-load-balancing)

---

## Table of Contents

- Implement load balancing
  - Azure Load Balancer SKUs
  - Load Balancer Types: Public and Internal
  - Deploying the Infrastructure
  - Configuring the Public Load Balancer
  - Testing the Load Balancer
  - Moving Forward
  - Watch Video
    - Basic SKU
    - Standard SKU
    - Public Load Balancer
    - Internal Load Balancer

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Implement load balancing

In this guide, we explore how to implement load balancing using Azure Load Balancer, a layer 4 load balancer that distributes incoming traffic across multiple servers. This configuration helps ensure that no single server becomes overwhelmed, thereby maintaining high availability and reliability in your environment.

Azure Load Balancer consists of three major components:

- **Frontend:** The entry point for incoming requests (the load balancer itself, not your application).
- **Backend:** The pool where your application servers reside.
- **Load Balancing Rules:** These rules define how traffic is routed from the frontend to the backend.

Below, we discuss the two primary SKUs (Stock Keeping Units) of Azure Load Balancer: **Basic** and **Standard**.

---

## Azure Load Balancer SKUs

### Basic SKU

The Basic Load Balancer is ideal for development and testing environments due to its simplicity and cost-effectiveness. Key characteristics include:

- Basic load balancing capabilities
- Operates within an availability set in the same data center
- Supports up to 300 instances
- TCP and HTTP health probe support
- Optional integration with Network Security Groups (NSGs)
- No redundancy and lacks an SLA guarantee

### Standard SKU

Designed for production workloads, the Standard Load Balancer provides advanced features and higher performance:

- Availability zones and cross-region load balancing support
- Microsoft peering for enterprise-grade applications
- Scale support for up to 1000 instances
- Enhanced diagnostic features, including HA ports and TCP reset
- Strict NSG enforcement for improved security
- 99.99% SLA for production environments

Below is a comparison diagram summarizing the features of the Basic and Standard SKUs:

![The image is a comparison table of Load Balancer SKUs, detailing features like backend pool size, health probes, redundancy, multiple frontends, security, and SLA for Basic and Standard options.](https://kodekloud.com/kk-media/image/upload/v1752882141/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-load-balancing/load-balancer-sku-comparison-table.jpg)

> [!important]
> **Note**
>
> For non-critical development or testing workloads, the Basic SKU may be sufficient. However, for production deployments requiring scalability and enhanced reliability, the Standard SKU is recommended.

---

## Load Balancer Types: Public and Internal

### Public Load Balancer

For scenarios such as hosting a static website in a virtual network's web subnet, a Public Load Balancer is used. It features a frontend with a public IP address, enabling end users to access your website on port 80 via the DNS name or public IP address.

The following diagram illustrates a typical Public Load Balancer setup:

![The image illustrates a public load balancer setup, showing traffic on port 80 being distributed to multiple servers within a virtual network and a subnet labeled "WebSubnet."](https://kodekloud.com/kk-media/image/upload/v1752882142/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-load-balancing/public-load-balancer-setup.jpg)

### Internal Load Balancer

An Internal Load Balancer is best suited for distributing traffic among servers that handle internal workloads. For example, if you have a backend database that should not be exposed to the internet, an Internal Load Balancer (without a public IP) can distribute traffic securely among your database servers.

---

## Deploying the Infrastructure

Before configuring the load balancer, deploy the required infrastructure using the "ACLB Prep Infra" script. This script creates necessary resources including:

- Three web servers deployed within an availability set
- A jump server for management access

Below is a sample output from the deployment script:

```
Creating availability set
---------------------------------
Setting VM config
Setting OS Profile
Creating VM webserver-01


RequestId           :
IsSuccessStatusCode : True
StatusCode          : OK
ReasonPhrase        : OK


---------------------------------
Setting VM config
Setting OS Profile
Creating VM webserver-02


RequestId           :
IsSuccessStatusCode : True
StatusCode          : OK
ReasonPhrase        : OK


---------------------------------
Setting VM config
Setting OS Profile
Creating VM webserver-03


RequestId           :
IsSuccessStatusCode : True
StatusCode          : OK
ReasonPhrase        : OK


Creating jumpbox VM
```

The script also outputs virtual network configuration details. For example:

```
AddressSpace             : Microsoft.Azure.Commands.Network.Models.PSAddressSpace
DhcpOptions              : Microsoft.Azure.Commands.Network.Models.PSDhcpOptions
FlowTimeoutInMinutes     : {jumpboxSubnet, webSubnet}
BgpCommunities           : {}
Encryption               :
VirtualNetworkPeerings   : {}
ProvisioningState        : Succeeded
EnableDdosProtection     : False
DdosProtectionPlan       :
IpAllocations            : {}
ExtendedLocation         :
AddressSpaceText         :
    "AddressPrefixes": [
        "10.0.0.0/16"
    ]
DhcpOptionsText          :
FlowTimeoutInMinutesText : null
SubnetsText              :
    "Delegations": [
        {
            "Name": "jumpboxSubnet",
            "Etag": "W/\"e7e40ac8-5d59-49d2-8b0c-34ce3c3d8cbb\"",
            "Id": "/subscriptions/3e17f8aa-ad65-4be0-a407-4dc4cac01a73/resourceGroups/rg-azlb-20230930/providers/Microsoft.Network/virtualNetworks/eus-web-dev/subnets/jumpboxSubnet"
        }
    ]
```

Notice that the jump server is assigned a public IP address to facilitate SSH access, while the web servers remain without public IP addresses.

After deployment, verify the resources using the Azure Portal. The resource group should contain the three web servers and the jump server, all within the same virtual network, ensuring seamless internal communication.

---

## Configuring the Public Load Balancer

Follow these steps to configure a standard public-facing load balancer via the Azure Portal:

1.  **Create the Load Balancer:**
    - Select the region (e.g., East US) and set the SKU to Standard.
    - Choose "Public" as the type and "Regional" for the deployment model.

2.  **Configure the Frontend IP:**
    - Create a new public IP address (e.g., "web LB PIP").
    - This public IP will serve as the entry point for the load balancer.

3.  **Configure the Backend Pool:**
    - Establish a backend pool by adding all web servers from the "US Web Dev" availability set.
    - Verify that all the web servers are included in the backend pool.

The diagram below shows the Azure Portal interface when adding IP configurations to the backend pool:

![The image shows a Microsoft Azure interface for adding IP configurations to a backend pool, with a list of virtual machines and their details.](https://kodekloud.com/kk-media/image/upload/v1752882143/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-load-balancing/azure-ip-configurations-backend-pool.jpg)

4.  **Create Load Balancing Rules and Health Probes:**
    - **Load Balancing Rule:**  
      Create a rule (e.g., "web LB rule HTTP") that links the frontend IP to the backend pool. Configure the protocol settings:
      - Frontend port: 80
      - Backend port: 80 (or another port if your web server listens on a different port, e.g., 8080)
      - Protocol: TCP
      - Session persistence: Choose either None (default, uses a five-tuple hash) or Client IP based for sticky sessions.

    - **Health Probe:**  
      Establish a health probe (e.g., "web LB HP") that monitors backend server health. Choose between TCP (to check if the port is open) or HTTP (to send a web request expecting a 200 OK response). In this configuration, the probe checks the root path on port 80 every five seconds.

The diagram below illustrates the settings panel for configuring load balancer rules:

![The image shows a Microsoft Azure interface for creating a load balancer, with options to add load balancing and inbound NAT rules. The right panel displays settings for adding a load balancing rule, including fields for name, IP version, frontend IP address, and protocol.](https://kodekloud.com/kk-media/image/upload/v1752882144/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-load-balancing/azure-load-balancer-interface-settings.jpg)

5.  **Configure Inbound NAT Rules (if needed):**  
    Use inbound NAT rules to enable direct access (e.g., SSH) to individual backend servers by mapping unique frontend ports (such as 22 or 3000) to port 22 on specific backend instances.

The diagram below focuses on configuring inbound NAT rules:

![The image shows a Microsoft Azure interface for creating a load balancer, specifically focusing on configuring inbound rules, including load balancing and NAT rules.](https://kodekloud.com/kk-media/image/upload/v1752882146/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-load-balancing/azure-load-balancer-inbound-rules.jpg)

6.  **Review and Create the Load Balancer:**  
    Double-check all settings (frontend, backend, load balancing rules, and health probes) and create the load balancer. The resulting configuration will share the public IP address among the web servers, facilitating the distribution of incoming traffic based on your defined rules.

After creation, you can verify the load balancer and associated public IP address on the Azure Portal with the following interfaces:

![The image shows a Microsoft Azure portal displaying a list of virtual machines, all running Linux, with details such as name, type, subscription, location, status, and public IP address.](https://kodekloud.com/kk-media/image/upload/v1752882147/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-load-balancing/azure-portal-linux-virtual-machines.jpg)

![The image shows the Microsoft Azure portal interface for managing a load balancer, displaying details like resource group, location, and configuration options.](https://kodekloud.com/kk-media/image/upload/v1752882148/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Implement-load-balancing/azure-portal-load-balancer-management.jpg)

> [!important]
> **Warning**
>
> Ensure that your NSG rules allow traffic on port 80 to avoid any disruption in load balancing functionality.

---

## Testing the Load Balancer

After configuring the load balancer, test the setup by entering the frontend public IP address in your browser. You may observe varying responses (for instance, different colored pages) because the load balancer distributes traffic among backend servers using a five-tuple hashing mechanism (source IP, source port, destination IP, destination port, and protocol). This method might not strictly follow a round-robin pattern.

Verifying that you receive responses from different backend servers confirms that your load balancing configuration is working as intended.

---

## Moving Forward

With the Azure Load Balancer now successfully distributing traffic across your web servers, you benefit from improved reliability, high availability, and enhanced security by keeping your web servers shielded from direct internet exposure. In future discussions, we will explore the Application Gateway—an alternative Azure service that provides advanced load balancing features to further optimize your infrastructure deployments.

For more details on Azure services, check out these resources:

- [Azure Load Balancer Documentation](https://docs.microsoft.com/en-us/azure/load-balancer/)
- [Deploying Infrastructure with Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/)

Happy scaling!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/01702e8e-9793-4964-ba25-53d5a1a71c00)**
>
> Watch video content
