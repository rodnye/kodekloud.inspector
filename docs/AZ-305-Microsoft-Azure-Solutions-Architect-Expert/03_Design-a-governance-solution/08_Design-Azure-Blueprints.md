# Design Azure Blueprints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Design-Azure-Blueprints)

---

## Table of Contents

- Design Azure Blueprints
  - Understanding Azure Landing Zones
  - Next Steps
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Design Azure Blueprints

Azure Blueprints allow you to define a repeatable set of resources and governance tools for your environment. In this guide, we explore how Azure Blueprints work and why they are essential in managing your Azure environment.

Imagine an investor planning to construct houses, villas, or apartments to generate profit. Although the investor has ample funds, he lacks the technical expertise to design and build structures. Instead, he hires a building architect—not a cloud solution architect—to create a blueprint that specifies details such as 2024 square feet of space, four bedrooms, two bathrooms, a balcony, an open kitchen, and a swimming pool.

The architect then produces a blueprint outlining the building’s dimensions and layout, clearly indicating the placement of each room, the pool, the kitchen, and the balcony. The investor reviews and approves this blueprint, which the architect subsequently provides to the construction team (masons) to build the structure exactly as specified. This reusable blueprint streamlines the construction process should the investor choose to build more houses.

This analogy mirrors the concept of Azure Blueprints in the cloud. Consider a manager who requires a well-defined set of Azure resources. On the right-hand side of the diagram below, you can see the depiction of two resource groups, several virtual machines, role assignments (which are comparable to ID cards), and policies—everything needed for a particular deployment.

The manager, lacking the technical skills to deploy these resources, hires a cloud Solutions Architect. The manager provides detailed requirements, such as two resource groups (one for development and one for production), two virtual machines per group, specific role assignments (e.g., two owner roles and one contributor role), and various policies.

The cloud Solutions Architect then composes an Azure Blueprint—a document that clearly defines all of the manager's requirements, much like the building blueprint prepared by the architect. Once the blueprint is approved by the manager, it is assigned to one or more subscriptions. Azure uses this blueprint to deploy all the required resources.

![The image is a diagram illustrating the design for Azure Blueprints, showing requirements and the flow from a user to Azure Blueprint, leading to the deployment of resources with keys indicating access or roles.](https://kodekloud.com/kk-media/image/upload/v1752866926/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-Azure-Blueprints/azure-blueprints-design-diagram.jpg)

After the resources are deployed, the blueprint serves as a source of truth, enabling managers and architects to verify that every resource has been correctly deployed. This traceability offers an advantage over ARM templates, which are static documents stored locally or in source control without inherent tracking capabilities.

> [!important]
> **Process Overview**
>
> To use Azure Blueprints, follow these steps:
>
> 1.  Compose the blueprint: Include components such as resource groups, ARM templates (for resource creation), RBAC assignments, and policy assignments.
> 2.  Publish the blueprint.
> 3.  Assign the published blueprint to the desired subscription.
> 4.  Scale the blueprint across multiple subscriptions or redeploy the entire environment from scratch using the stored blueprint in the Azure portal.

![The image is a diagram illustrating the design process for Azure Blueprints, showing components like resource groups, ARM templates, RBAC assignments, and policy assignments, which are composed, published, and assigned to scale resources.](https://kodekloud.com/kk-media/image/upload/v1752866927/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-Azure-Blueprints/azure-blueprints-design-process-diagram.jpg)

This methodology ensures a consistent environment is created repeatedly while effectively managing the governance of resources deployed in Azure.

## Understanding Azure Landing Zones

In addition to Blueprints, it’s important to understand Azure Landing Zones. A landing zone is part of the design for subscriptions and leverages best practices from designing management groups, subscriptions, resource groups, policies, and RBAC. This approach creates an environment that can effectively host your workloads.

A basic landing zone might include:

- A root management group.
- A set of policies (such as Contoso policies).
- Different management groups for platforms, decommissioning, and sandbox environments.

As your deployment grows, you can scale this to an enterprise-level landing zone. The enterprise-scale landing zone typically consists of multiple management groups and subscriptions:

| Component                     | Purpose                                              | Example Services/Details                          |
| ----------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| Networking Subscription       | Provides shared networking services                  | Azure DNS, DDoS protection                        |
| Identity Subscription         | Contains identity and access management resources    | Domain controllers, Key Vault                     |
| Management Subscription       | Houses logging and automation services               | Log Analytics, Automation Accounts, Dashboards    |
| Connectivity Subscription     | Manages connectivity-related services                | Azure DNS, DDoS                                   |
| Hub Connectivity Subscription | Hosts shared network security services               | Azure Firewall, ExpressRoute, VPN                 |
| Landing Zone Subscription     | Hosts the virtual network and its associated peering | Virtual Networks, Subnets, Peering configurations |

![The image is a detailed diagram illustrating an enterprise cloud architecture, including components like identity and access management, management groups, subscriptions, and DevOps integration. It shows various Azure services and their interactions within a structured organizational framework.](https://kodekloud.com/kk-media/image/upload/v1752866929/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-Azure-Blueprints/enterprise-cloud-architecture-diagram.jpg)

Within the sandbox subscription, additional applications can be deployed that are not yet production-ready. Best practices are applied to build the enterprise-scale landing zone, ensuring governance with comprehensive policies and assignments across the environment.

## Next Steps

With the governance lesson complete, the next module will focus on networking. In the upcoming section, we will dive deeper into designing virtual networks and establishing on-premises connectivity, building on the connectivity principles covered previously.

Before concluding, let's review a case study in the Azure portal where we analyze a scenario and develop a solution tailored for our customer.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/6e50d921-8886-447c-8b6e-da11b4482d2f)**
>
> Watch video content
