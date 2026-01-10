# Virtual Machines and Virtual Machine Scale Sets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Compute-and-Networking/Virtual-Machines-and-Virtual-Machine-Scale-Sets)

---

## Table of Contents

- Virtual Machines and Virtual Machine Scale Sets
  - Key Features of Azure Virtual Machines
  - Benefits and Connectivity Options
  - Common Use Cases
  - Availability Sets
  - Azure Virtual Machine Scale Sets (VMSS)
  - Deploying a Virtual Machine in Azure
  - Connecting to Your Virtual Machine
  - Next Steps
  - Watch Video
    - Connectivity Options
    - How Availability Sets Work
    - Benefits of Availability Sets
    - Key Features of VMSS

---

## Content

AZ900: Microsoft Azure Fundamentals

Compute and Networking

# Virtual Machines and Virtual Machine Scale Sets

Azure Virtual Machines (VMs) provide a cloud-based emulation of physical computers, running operating systems and applications much like your personal laptop or desktop. This guide covers Azure Virtual Machines' features, benefits, connectivity options, and common use cases, as well as an introduction to Virtual Machine Scale Sets (VMSS).

## Key Features of Azure Virtual Machines

Azure offers an extensive range of VM sizes designed to support varied workloads—including general purpose, compute-optimized, memory-optimized, and storage-optimized configurations. This customization flexibility enables you to select the exact operating system, memory, and storage configurations required for your project.

Azure VMs integrate seamlessly with other Azure services such as [Microsoft Entra ID](https://docs.microsoft.com/en-us/azure/active-directory/), storage solutions, and SQL databases, forming a cohesive ecosystem experience.

![The image highlights the key features of Azure Virtual Machines: a variety of sizes, customizability, and integrated support, presented in three colorful panels.](https://kodekloud.com/kk-media/image/upload/v1752868305/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-virtual-machines-features-panels.jpg)

## Benefits and Connectivity Options

Azure VMs are renowned for their flexibility, scalability, and cost-effectiveness thanks to a pay-as-you-go pricing model that charges only for the resources you use. Additionally, Azure's robust security framework ensures that your applications remain highly secure and reliable.

### Connectivity Options

Azure Virtual Machines support several connectivity configurations:

1.  **Public Endpoints**  
    Connections are enabled over the internet via public IP addresses. For instance, when you initially set up a VM, you might connect using a public IP. Any service that exposes an IP address to the internet qualifies as having a public endpoint.
2.  **Private Endpoints**  
    This option assigns a VM a private IP address from within the virtual network, effectively restricting external access. Think of it as assigning devices a local IP like those within a home network.
3.  **Virtual Network Peering**  
    Virtual network peering connects two distinct virtual networks, allowing devices to communicate using private IP addresses. This process is similar to joining two separate networks via a private connection so that they function as one unified network.

![The image lists the benefits of Azure Virtual Machines, highlighting flexibility and scalability, cost-effectiveness, and security and reliability.](https://kodekloud.com/kk-media/image/upload/v1752868306/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-virtual-machines-benefits.jpg)

![The image shows three connectivity options for virtual networks: Public endpoints, Private endpoints, and Virtual Network Peering, each represented with a distinct icon and color.](https://kodekloud.com/kk-media/image/upload/v1752868308/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/virtual-network-connectivity-options.jpg)

## Common Use Cases

Azure VMs are versatile and are ideal for testing, development, or running production applications. They also help extend the capacity of your on-premises data center. For example, if your in-house data center is nearing capacity, you can deploy additional Azure VMs and integrate them with your existing infrastructure using Azure networking services.

![The image illustrates common use cases for Azure Virtual Machines, including testing and development, running applications, and extending data centers, with visual representations of virtual machines labeled VM01, VM02, and VM03.](https://kodekloud.com/kk-media/image/upload/v1752868309/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-virtual-machines-use-cases.jpg)

## Availability Sets

When deploying applications on Azure Virtual Machines, planned maintenance (such as updates) and unplanned disruptions (like power outages) may affect availability. Azure addresses these concerns using Availability Sets, which are designed to keep your applications online during such events.

### How Availability Sets Work

Availability Sets group VMs by two primary concepts:

1.  **Fault Domains**  
    Fault domains represent groups of physical servers sharing the same power source, network switches, and cooling systems. By distributing VMs across multiple fault domains (typically three per data center), the impact of hardware failures is minimized.
2.  **Update Domains**  
    Update domains are logical segments that allow Azure to sequentially reboot VMs during planned maintenance. This ensures that not all VMs are updated simultaneously, thereby preserving service continuity.

For instance, if a power issue affects fault domain 0, the VMs in fault domains 1 and 2 continue running. Similarly, during a planned update in one update domain, the other domains remain operational.

![The image describes Azure's "Availability Sets," a feature ensuring application availability during planned and unplanned maintenance events. It includes a diagram with labels for "Planned Event" and "Unplanned Event."](https://kodekloud.com/kk-media/image/upload/v1752868309/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-availability-sets-diagram.jpg)

![The image explains "Availability Sets" with two domains: "Fault Domain," which protects machines from hardware failure with three domains, and "Update Domain," which protects machines from plant maintenance with up to 20 domains.](https://kodekloud.com/kk-media/image/upload/v1752868310/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/availability-sets-fault-update-domains.jpg)

![The image illustrates a diagram of availability sets with three fault domains, each containing virtual machines (VMs) and update domains (UDs). It highlights components like power source, networking switches, and cooling capabilities.](https://kodekloud.com/kk-media/image/upload/v1752868311/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/availability-sets-fault-domains-diagram.jpg)

![The image illustrates a diagram of availability sets with three fault domains, each containing virtual machines (VMs) and update domains (UDs).](https://kodekloud.com/kk-media/image/upload/v1752868312/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/availability-sets-fault-domains-diagram-2.jpg)

For additional resilience, you can deploy VMs across Availability Zones. Each VM is placed in a separate zone (typically zone 1, zone 2, and zone 3), providing extra redundancy. Azure manages the distribution across fault and update domains automatically.

### Benefits of Availability Sets

- Enhanced application availability by reducing downtime.
- Critical for deploying production workloads.
- Seamless integration during VM creation by selecting an availability set.

![The image is a presentation slide titled "Availability Sets – Benefits," highlighting three benefits: Increased Availability, Best Practice, and Simple to Implement, each with a corresponding icon.](https://kodekloud.com/kk-media/image/upload/v1752868313/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/availability-sets-benefits-slide.jpg)

## Azure Virtual Machine Scale Sets (VMSS)

While a single VM emulates a physical server, many applications demand a fleet of VMs that scale automatically based on demand. Azure Virtual Machine Scale Sets (VMSS) allow you to deploy and manage a collection of identical, auto-scaling VMs.

### Key Features of VMSS

- **Automatic Scaling:**  
  VMSS dynamically adjusts the number of VM instances based on current demand or predefined schedules, ensuring that your application always has the required computing resources.
- **Load Balancing:**  
  Integrated with Azure Load Balancing services, VMSS distributes incoming traffic evenly across instances, optimizing performance and responsiveness.
- **High Availability:**  
  VMSS continuously monitors the health of the VMs and automatically replaces any that become unhealthy, ensuring sustained uptime.

![The image highlights the key features of Azure Virtual Machine Scale Set: Automatic Scaling, Load Balancing, and High Availability.](https://kodekloud.com/kk-media/image/upload/v1752868314/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-virtual-machine-scale-set-features.jpg)

VMSS is well-suited for scenarios that require high availability and scalability, such as web servers, online gaming platforms, and extensive data processing tasks.

![The image illustrates an Azure Virtual Machine Scale Set with three virtual machines (VM01, VM02, VM03) and highlights common use cases such as high availability and scalability.](https://kodekloud.com/kk-media/image/upload/v1752868315/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-vm-scale-set-high-availability.jpg)

## Deploying a Virtual Machine in Azure

In this section, you'll learn how to create a Virtual Machine using the Azure Portal. Although this demo is not required for exam preparation, it provides a practical understanding of the VM creation process.

1.  Open a web browser and navigate to [portal.azure.com](https://portal.azure.com). Sign in with your credentials. (A free trial is available, but a credit card may be required.)
2.  Use the search bar at the top to search for “Virtual Machines” and select it from the search results.
3.  Click on “Create” and select “Azure Virtual Machine” to start the setup process.

![The image shows a Microsoft Azure portal interface for creating a virtual machine. It includes fields for project and instance details, such as subscription, resource group, and virtual machine name.](https://kodekloud.com/kk-media/image/upload/v1752868316/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-portal-create-vm-interface.jpg)

4.  Configure the Basic Settings:
    - **Subscription and Resource Group:** Choose an existing subscription and select or create a resource group (for example, “AZ900 VM Resource Group”).
    - **Virtual Machine Name and Region:** Provide a name (e.g., “AZ900 VM”) and select a region such as East US.
    - **Availability Options:** Select an availability set, scale set, or availability zone. For a basic setup, you may choose “no infrastructure redundancy.”
    - **Image and Size:** Pick the desired VM image (for example, Windows Server 2019 Datacenter) and select an appropriate size. The portal will present various VM sizes with details such as vCPUs, RAM, and estimated costs.

![The image shows a Microsoft Azure portal interface for selecting a virtual machine size, displaying various VM options with details like vCPUs, RAM, data disks, and cost per hour.](https://kodekloud.com/kk-media/image/upload/v1752868318/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-portal-vm-size-selection.jpg)

5.  Provide administrator credentials by specifying a username and password.
6.  Click “Review + create” to validate your settings, and then select “Create” to deploy the VM. The deployment process, which creates compute resources, networking, and storage components, typically takes one to two minutes.

![The image shows a Microsoft Azure portal interface for creating a virtual machine, with options for availability, security, image selection, VM architecture, size, and administrator account setup.](https://kodekloud.com/kk-media/image/upload/v1752868319/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-portal-virtual-machine-setup.jpg)

Once deployment is complete, you will see details about the deployed VM, including its public IP address, which allows remote access via Remote Desktop Connection or a similar tool.

![The image shows a Microsoft Azure portal screen indicating that a virtual machine deployment is complete. It lists deployment details, including resources, types, and statuses, with options for next steps.](https://kodekloud.com/kk-media/image/upload/v1752868320/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-portal-virtual-machine-deployment.jpg)

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "az900-vm," including its status, operating system, and networking information.](https://kodekloud.com/kk-media/image/upload/v1752868321/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Virtual-Machines-and-Virtual-Machine-Scale-Sets/azure-portal-virtual-machine-details.jpg)

> [!important]
> **Tip**
>
> Ensure that your VM credentials are kept secure. Changing passwords periodically and following best security practices helps safeguard your server access.

## Connecting to Your Virtual Machine

To establish a connection with your newly created VM, follow these steps:

1.  Copy the public IP address from the VM details page.
2.  Open Remote Desktop Connection (for Windows) or use your preferred remote access tool.
3.  Paste the public IP address and initiate the connection.
4.  When prompted, enter the administrator username and password that were set during the VM creation process.
5.  Accept any security warnings to complete the connection.

Once connected, you can deploy a web server, install applications, or perform administrative tasks as needed.

## Next Steps

The process of deploying Virtual Machine Scale Sets is similar to single VM deployment, with additional options to specify the number of VM instances and scaling configurations. VMSS provides a resilient, auto-scaling solution designed for dynamic workload demands.

This concludes the lesson on Azure Virtual Machines and Virtual Machine Scale Sets. In the next lesson, we will explore Azure Virtual Desktops for further expanding your cloud capabilities.

For more detailed guidance, refer to the [Azure Documentation](https://docs.microsoft.com/en-us/azure/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/8eca3741-67ac-4ee2-8439-aa23c16d33dd/lesson/c8543eba-f5d1-44f3-9273-f9269ff41b18)**
>
> Watch video content
