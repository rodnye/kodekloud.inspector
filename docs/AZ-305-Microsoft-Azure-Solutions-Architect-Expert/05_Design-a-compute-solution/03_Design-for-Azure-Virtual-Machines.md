# Design for Azure Virtual Machines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-compute-solution/Design-for-Azure-Virtual-Machines)

---

## Table of Contents

- Design for Azure Virtual Machines
  - When to Select Virtual Machines
  - Decision Criteria for Planning Virtual Machines
  - Planning for Virtual Machine Families
  - Virtual Machines vs. Virtual Machine Scale Sets
  - Watch Video
    - Networking
    - Naming Conventions
    - Location
    - Storage Performance
    - Operating System
    - Update and Patch Management
    - Pricing
    - Monitoring
    - Adding More Instances
    - Load Balancing
    - High Availability
    - Autoscaling

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a compute solution

# Design for Azure Virtual Machines

This lesson explains when to select Azure Virtual Machines, the key factors to consider when planning them, the various virtual machine families available, and the differences between a Virtual Machine and a Virtual Machine Scale Set (VMSS). Understanding these considerations will help you choose the ideal compute solution for your workloads on Azure.

---

## When to Select Virtual Machines

Virtual Machines (VMs) in Azure offer flexibility and full control over the operating system and dependencies. Consider using VMs in the following scenarios:

1.  **Lift and Shift or Cloud Optimization**  
    For migrating existing workloads that cannot be containerized or fit a web/API application model, VMs provide the required control. They are also ideal if you need a complete operating system experience with full dependency management.
2.  **Development and Testing (DevTest)**  
    Quickly spin up VMs in Azure for various development and testing needs. For example:
    - Create a VM if you need to test on Ubuntu or Red Hat when local hardware is unavailable.
    - Simulate specific hardware configurations, such as 16 vCPUs with 32 GB RAM, to evaluate application performance.

3.  **Specialty Workloads**  
    Host workloads such as High-Performance Computing (HPC) or SAP on VMs, where specialized hardware configurations are essential.
4.  **Data Center Extension**  
    Extend your on-premises data center to Azure without purchasing additional physical servers. VMs enable you to seamlessly scale-out your environment in the cloud, resembling traditional on-premises deployments.
5.  **Legacy Applications**  
    Legacy applications that cannot be easily containerized or re-engineered to run as web applications might be best hosted on VMs.
6.  **Migration**  
    Use VMs for lift and shift migrations when the goal is to rapidly leverage cloud benefits such as autoscaling, high availability, elasticity, and fault tolerance without modifying the application.
7.  **Full Control**  
    With Infrastructure-as-a-Service (IaaS) solutions such as VMs, you retain complete control over the operating system, software installations, and environment configurations compared to Platform-as-a-Service (PaaS) offerings.

![The image is a flowchart and guide from KodeKloud on when to select virtual machines, detailing scenarios like dev testing, datacenter extension, and legacy apps. It includes decision points such as whether to migrate or build new, and if full control is required.](https://kodekloud.com/kk-media/image/upload/v1752866881/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Virtual-Machines/kodekloud-virtual-machines-flowchart.jpg)

---

## Decision Criteria for Planning Virtual Machines

When deploying Virtual Machines, carefully plan each aspect of your environment. Consider the following criteria:

### Networking

- **Virtual Network and Subnets:**  
  Design your virtual network with appropriate subnets to segment workloads for improved isolation. Plan ahead for the number of VMs and any necessary network configurations.

### Naming Conventions

- **Consistent Naming:**  
  Utilize a structured naming convention in enterprise settings. For example, a development web server in East US might be called "devusweb" or "devweb01," incorporating details like role, region, and environment.

### Location

- **Availability and Cost Considerations:**
  - Not all VM sizes are available in every region.
  - Pricing varies by region. For cost-conscious development or testing, consider regions like East US, whereas production workloads may require regions with lower latency for your user base.
  - Adhere to data residency regulations, particularly for government or sensitive data.

### Storage Performance

- **Storage Options:**  
  Choose the appropriate storage tier to match your application's performance needs:
  - Use spinning Hard Disk Drives (HDDs) for less critical performance requirements.
  - Opt for Solid-State Drives (SSDs) such as Standard, Premium, or Ultra SSDs for I/O intensive applications requiring higher throughput and lower latency.

### Operating System

- **OS Selection:**  
  Select the operating system that aligns with your application's requirements—choose Linux for Linux-compatible applications or Windows for ASP.NET-based applications, for example.

### Update and Patch Management

- **Customer Responsibility:**  
  Keep in mind that VM updates and patch management are manually controlled tasks. Azure offers an Update Management solution to simplify this process, but automatic updates are not enabled by default.

> [!important]
> **Important Reminder**
>
> Regularly assess and update your VM configurations to address evolving security and performance requirements.

### Pricing

- **Pay-As-You-Go vs. Reserved Instances:**
  - VMs operate on a pay-as-you-go pricing model.
  - For production VMs running 24/7, reserved instances can yield significant cost savings.
  - Leverage the Azure Hybrid Benefit to use your existing licenses (Linux, Windows, or SQL) for further cost reduction.

### Monitoring

- **Performance Monitoring:**  
  Implement comprehensive monitoring using Azure Monitor to track CPU, memory, and other vital metrics. This helps in troubleshooting, scaling decisions, and ensuring the overall health of your VMs. Configure alerts via email or SMS to stay informed about performance issues.

![The image is a diagram from KodeKloud titled "Plan for virtual machines," outlining decision criteria for deploying virtual machines, such as network, location, operating system, pricing, naming conventions, storage performance, update management, and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752866883/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Virtual-Machines/plan-for-virtual-machines-diagram.jpg)

---

## Planning for Virtual Machine Families

Selecting the appropriate virtual machine family is crucial for matching your workload’s requirements. Azure VM families cater to different needs:

- **General-Purpose:**  
  For balanced CPU-to-memory ratios suited for development, testing, small to medium databases, or web servers. Examples include B-series, DSV3, and DASV4.
- **Specialized Workloads:**  
  Other categories include compute-optimized, memory-optimized, storage-optimized, GPU-enabled, HPC, and confidential computing VMs, each tailored for specific performance or workload requirements.

![The image is a table from KodeKloud titled "Plan for virtual machine family," detailing different types of virtual machines, their sizes, and targeted workloads. It categorizes VMs into general purpose, compute optimized, memory optimized, storage optimized, GPU, HPC, and confidential computing.](https://kodekloud.com/kk-media/image/upload/v1752866885/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Virtual-Machines/virtual-machine-family-plan-table.jpg)

Review the table above to determine which VM family and sizing are best aligned with your application's performance and scalability needs.

---

## Virtual Machines vs. Virtual Machine Scale Sets

A frequent consideration is whether to use individual Virtual Machines or Virtual Machine Scale Sets (VMSS). Here’s a detailed comparison:

### Adding More Instances

- **Virtual Machines:**  
  Instance scaling is a manual process accomplished via the Azure portal, PowerShell, or Azure CLI.
- **Virtual Machine Scale Sets:**  
  All instances share the same configuration; simply increasing the instance count prompts Azure to automatically provision additional VMs.

### Load Balancing

- **Virtual Machines:**  
  Load balancing requires manual updates; when adding a new VM, you must manually add its IP address to the load balancer.
- **Virtual Machine Scale Sets:**  
  VMSS integrates with load balancers, automatically adjusting for instance count changes to ensure balanced traffic distribution.

### High Availability

- **Virtual Machines:**  
  Achieving high availability involves manually distributing VMs across fault domains, update domains, or availability zones using availability sets.
- **Virtual Machine Scale Sets:**  
  When deploying a VMSS, Azure automatically distributes instances across fault and update domains or specific availability zones based on your configuration.

### Autoscaling

- **Virtual Machines:**  
  Autoscaling is not built-in; scaling a single VM manually is required.
- **Virtual Machine Scale Sets:**  
  VMSS supports autoscaling by allowing you to define minimum and maximum instance counts. For example, if CPU utilization exceeds 75%, more instances are added; if it falls below 25%, instances are reduced—ensuring the system dynamically adapts to the load.

> Note: Virtual Machine Scale Sets are optimal for stateless applications, such as front-end services, where session or state management is not a critical requirement.

![The image is a comparison between Virtual Machines (VM) and Virtual Machine Scale Sets (VMSS), highlighting differences in adding instances, load balancing, high availability, and autoscaling. It outlines the manual processes required for VMs versus the automated features of VMSS.](https://kodekloud.com/kk-media/image/upload/v1752866886/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Virtual-Machines/vm-vmss-comparison-autoscaling.jpg)

---

This lesson has provided a comprehensive overview of designing for Azure Virtual Machines—from selecting the right scenarios and planning key criteria to understanding VM families and comparing VMs with Virtual Machine Scale Sets.

In the next section, we will explore the essential design considerations for Azure Batch. For additional details on Azure computing solutions, visit the [Azure Documentation](https://docs.microsoft.com/azure/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/bf1d18e5-9589-48cf-99af-4150d985241a/lesson/43e46e3e-ea31-4fc3-a85b-3297fb3bd36c)**
>
> Watch video content
