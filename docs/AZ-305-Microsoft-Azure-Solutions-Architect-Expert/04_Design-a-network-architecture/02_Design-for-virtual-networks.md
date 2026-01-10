# Design for virtual networks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-network-architecture/Design-for-virtual-networks)

---

## Table of Contents

- Design for virtual networks
  - Naming
  - Region
  - Subscription
  - Subnets
  - Security
  - Connectivity
  - Permissions and Policy
  - Further Reading
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a network architecture

# Design for virtual networks

In this article, we dive into the essential design principles for virtual networks—a critical component of your infrastructure. Virtual networks facilitate communication between resources, provide internet connectivity, and enable secure remote access. Without a properly configured virtual network, resource communication becomes impossible.

In this lesson, we outline key design principles for deploying virtual networks. Whether you deploy virtual networks via PowerShell, the Azure Portal, or by segmenting address spaces, careful planning is vital. The core principles covered include:

- Naming
- Region
- Subscription
- Subnets
- Security
- Connectivity
- Permissions and Policy

Let's explore each of these principles in greater detail.

## Naming

Establishing a consistent naming convention is crucial for all resources, especially virtual networks. For example, you might name a resource group using the following format:

RG-\[ResourceFunction\]-\[Region\]-\[Identifier\]

This structured naming approach simplifies resource management, making it clear what each resource is used for—particularly when managing multiple virtual networks within a single resource group.

## Region

Virtual networks are scoped to a specific region, meaning both the network and its associated resources must reside in the same location. For instance, if you plan to deploy a Virtual Machine in West US, the corresponding virtual network must also be located in West US. Attempting to use a virtual network from East US for West US resources is not supported.

## Subscription

While you can deploy several virtual networks within a single subscription, it's important to be aware of the limits enforced by Microsoft. These limits include both hard constraints and soft limits that can sometimes be increased through a support request with appropriate business justification. Always check the [Microsoft limits page](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits) to ensure your design remains within these guidelines.

## Subnets

Subnets allow you to partition an address space, enabling you to isolate workloads effectively. Proper subnet segmentation lets you assign Network Security Groups (NSGs), implement user-defined routes (UDRs), and control inter-workload communication. It is critical to plan your subnet allocation carefully. For example, using a /24 subnet for your virtual network without reserving space can prevent you from deploying essential services like Application Gateway, Azure Firewall, or Azure Bastion, all of which require dedicated subnets.

> [!important]
> **Tip**
>
> Plan your subnet ranges in advance to avoid conflicts and ensure sufficient space is reserved for all necessary services.

## Security

To safeguard your network traffic, consider leveraging multiple security options:

- **Azure Firewall or Third-Party Network Virtual Appliances (NVAs):** Solutions from vendors such as Palo Alto or Fortinet can enhance security.
- **Network Security Groups (NSGs):** Utilize this native firewall feature to control both inbound and outbound traffic.
- **User-Defined Routes (UDRs):** These routes can steer traffic through your preferred security appliances to enforce robust security protocols.

## Connectivity

When designing connectivity, ensure that the address spaces of virtual networks intended for peering do not overlap. Additionally, if you plan to extend your infrastructure to on-premises environments using ExpressRoute or VPN connections, remember that a dedicated subnet is required for the gateway. This careful planning is vital for establishing seamless and secure connectivity between environments.

## Permissions and Policy

Managing access to virtual networks is streamlined with Azure Role-Based Access Control (RBAC). Built-in roles like Virtual Network Contributor or Reader enforce the principle of least privilege, ensuring users have only the access they need. If necessary, custom roles can be created to meet specific requirements.

Azure Policy further enhances network management by providing built-in policies for DDoS protection, flow logs, diagnostic settings, and more. These policies help ensure your virtual network aligns with your operational and security standards.

![The image is a guide from KodeKloud on designing virtual networks, outlining principles such as naming, regions, subscriptions, subnets, security, connectivity, permissions, and policy. It provides brief descriptions for each principle to aid in virtual network deployment.](https://kodekloud.com/kk-media/image/upload/v1752867099/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-virtual-networks/kodekloud-virtual-network-design-guide.jpg)

This comprehensive planning is critical, as the virtual network forms the foundation of all your resources. A well-thought-out network design guarantees that your environment remains secure, scalable, and compliant with your organization’s standards.

Next, we will explore the topic of designing on-premises connectivity to Azure.

## Further Reading

- [Azure Virtual Network Documentation](https://docs.microsoft.com/en-us/azure/virtual-network/)
- [Azure Subscription and Service Limits](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/61e4ebd3-ea7b-4ade-94f7-e203f93b60c9/lesson/e00c6cd7-8334-40dc-9b3a-c95d596435d6)**
>
> Watch video content
