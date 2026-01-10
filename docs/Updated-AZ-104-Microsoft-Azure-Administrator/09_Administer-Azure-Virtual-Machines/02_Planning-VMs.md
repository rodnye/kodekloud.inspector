# Planning VMs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Virtual-Machines/Planning-VMs)

---

## Table of Contents

- Planning VMs
  - Virtual Machine Planning Considerations
  - Watch Video
    - 1. Networking
    - 2. Naming Conventions
    - 3. VM Size and Regional Availability
    - 4. Proximity and Performance
    - 5. Pricing Models

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Virtual Machines

# Planning VMs

When planning virtual machines (VMs) in Azure, it's critical to understand the shared responsibility model in cloud computing. This model delineates the roles and obligations between the cloud service provider and the customer based on the service model—whether Infrastructure as a Service (IaaS), Platform as a Service (PaaS), or Software as a Service (SaaS).

In an IaaS scenario such as Azure VMs, the cloud provider (e.g., Microsoft) ensures the physical security of the data center, physical network, host, and virtualization layer. Meanwhile, the customer is responsible for managing the operating system, network configuration, access controls, and the data and applications running on the VM. As you shift toward PaaS or SaaS, additional responsibilities, such as handling runtime, middleware, or even parts of the operating system, transfer to the cloud provider. However, the customer always retains full responsibility for their data—ensuring proper data classification, accountability, and protection.

> [!important]
> **Note**
>
> Understanding these distinctions is essential for effective security, compliance, and management practices within your cloud environment.

---

## Virtual Machine Planning Considerations

When preparing to deploy VMs in Azure, several key factors need to be considered to optimize performance, efficiency, and cost. Below are the critical aspects you must address:

### 1\. Networking

Design your network address space meticulously to support both current operations and future growth:

- Define appropriate IP address ranges for your virtual network and subnets.
- Account for the total number of VMs, as this influences your network layout.
- Ensure the allocated address space does not conflict with other networks, such as your on-premises infrastructure.

### 2\. Naming Conventions

A clearly defined naming convention simplifies management and enhances compliance:

- Include identifiers like the environment (e.g., dev, test, prod).
- Add role designations (e.g., web, dv, middleware) to distinguish between services.
- For multi-region deployments, incorporate region-specific identifiers to clearly differentiate resources.

### 3\. VM Size and Regional Availability

Before selecting a VM size, keep these points in mind:

- Verify that the desired VM size is available in your chosen region, as each region supports a distinct set of configurations.
- Consider how regional availability impacts both performance and cost.

### 4\. Proximity and Performance

Optimal performance is often achieved by choosing a region close to your user base:

- Leverage Azure's global footprint by selecting regions that minimize latency and maximize user experience.

### 5\. Pricing Models

Familiarize yourself with Azure's pricing strategies to optimize your budget:

- Evaluate the pay-as-you-go model for flexible, short-term needs.
- Consider reserved instances for longer-term deployments to benefit from cost savings.
- Factor in potential advantages from existing on-premises Windows Server or SQL Server licenses when migrating to Azure.
- Explore advanced cost-management strategies to further optimize expenses.

> [!important]
> **Key Insight**
>
> Balancing performance, availability, and cost is crucial when deploying virtual machines in Azure. Integrating these planning considerations will contribute to a robust and scalable cloud strategy.

On that note, let's take a closer look at the VM sizes available in Azure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/34d9af06-fc33-4556-a3f2-2e7a5c5db484/lesson/441f90ea-2cf7-43f0-8928-364f8d78b8c1)**
>
> Watch video content
