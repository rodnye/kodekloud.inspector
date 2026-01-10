# Other load balancing solutions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Network-Traffic/Other-load-balancing-solutions)

---

## Table of Contents

- Other load balancing solutions
  - Azure Front Door
  - Azure Traffic Manager
  - Comparison of Azure Load Balancing Solutions
  - Watch Video
    - Key Features Overview

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Network Traffic

# Other load balancing solutions

In this article, we explore additional Azure load balancing options beyond the Azure Load Balancer and Azure Application Gateway. Although these solutions are not part of the exam syllabus, they offer valuable insights for designing robust, scalable, and highly available architectures on Azure.

Azure provides a range of load balancing services to meet diverse needs:

## Azure Front Door

Azure Front Door is a modern content delivery network (CDN) solution engineered for secure, rapid, and globally distributed content delivery. Leveraging the Microsoft Global Edge Network—which includes hundreds of global and local points of presence—Azure Front Door enables you to deploy solutions across multiple regions. It supports features such as path-based and multi-site routing and can easily integrate with a web application firewall to enhance your application's security.

## Azure Traffic Manager

Azure Traffic Manager is a DNS-based load balancer designed to optimize client request distribution across your application endpoints. By using DNS to direct traffic based on customizable routing rules, Traffic Manager selects the optimal endpoint and returns its DNS response. It supports a variety of routing methods including priority, weighted, geographic, performance-based routing, and even nested profiles. This solution works seamlessly with both public-facing Azure services and known Azure environments.

## Comparison of Azure Load Balancing Solutions

Below is a visual comparison of different load balancing solutions, detailing features such as usage, protocols, internal support, cross-region capabilities, environments, and security.

![The image is a comparison table of different load balancing solutions, detailing features such as usage, protocols, internal support, cross-region capabilities, environment, and security for Application Gateway, Front Door, Load Balancer, and Traffic Manager.](https://kodekloud.com/kk-media/image/upload/v1752884717/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Other-load-balancing-solutions/load-balancing-solutions-comparison.jpg)

### Key Features Overview

- **Usage:**
  - _Application Gateway_ is optimized for backend application server farms and enhances security via its web application firewall.
  - _Front Door_ delivers a scalable and secure global entry point for microservice-based web applications.
  - _Load Balancer_ balances both inbound and outbound traffic, efficiently routing requests to application or server endpoints.
  - _Traffic Manager_ distributes traffic across different Azure regions, ensuring high availability and responsive performance.

- **Protocols Supported:**
  - **Application Gateway** and **Front Door:** Support HTTP, HTTPS, and HTTP/2.
  - **Load Balancer:** Supports TCP and UDP.
  - **Traffic Manager:** Is protocol-agnostic as it operates at the DNS level.

- **Deployment Types:**
  - _Internal Solutions:_ Application Gateway and Azure Load Balancer can be deployed for internal use.
  - _External-Facing Solutions:_ Front Door and Traffic Manager are designed for public endpoints.
  - _Cross-Region Capabilities:_ Front Door provides built-in cross-region support, whereas Application Gateway is limited to specific regions.

- **Global Reach and Environments:**
  - **Global Solutions:** Both Front Door and Traffic Manager are inherently global, with Azure Load Balancer also expanding its global availability in preview.
  - **Regional Constraints:** Application Gateway must be tied to a specific region, although Traffic Manager’s metadata is managed at the resource group level.
  - **Resource Compatibility:** Application Gateway, Front Door, and Traffic Manager support Azure, non-Azure, and on-premises resources, while Load Balancer is limited to Azure-based resources.

- **Security Options:**
  - _Application Gateway_ and _Front Door_ support the integration of web application firewalls and network security groups (NSGs).
  - The _Azure Load Balancer_ relies solely on NSGs for its security configuration.
  - _Traffic Manager_ does not provide intrinsic security features, as it only resolves DNS responses without directly managing traffic flows.

> [!important]
> **Note**
>
> For more detailed comparisons and further technical insights, refer to the official Microsoft documentation and Azure load balancing resources.

Having reviewed these load balancing solutions, we now move on to an overview of Network Watcher, which provides comprehensive network monitoring and diagnostic tools in Azure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/50248c52-4b17-4c2d-87f8-52a42eff2d2f/lesson/c1488bff-fcdc-44e3-8ef9-6ff13280a7fc)**
>
> Watch video content
