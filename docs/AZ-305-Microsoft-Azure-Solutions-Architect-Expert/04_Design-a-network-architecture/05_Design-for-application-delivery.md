# Design for application delivery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-network-architecture/Design-for-application-delivery)

---

## Table of Contents

- Design for application delivery
  - Choosing a Load Balancing Solution
  - Overview of Azure Load Balancers
  - Flowchart for Load Balancing Decision Making
  - Content Delivery Networks (CDN)
  - Conclusion
  - Watch Video
    - 1. Type of Traffic
    - 2. Coverage
    - 3. Availability
    - 4. Cost
    - 5. Limits and Features
    - Azure Load Balancer
    - Azure Application Gateway
    - Azure Front Door
    - Azure Traffic Manager

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a network architecture

# Design for application delivery

This article explains the various load balancing solutions available in Azure and guides you in selecting the best option for your application. It covers key decision factors such as traffic type, regional coverage, availability, cost, and feature support while maintaining the technical details and structure of Azure load balancing options.

## Choosing a Load Balancing Solution

Azure offers multiple load balancing solutions designed to meet different requirements. In this article, we discuss key criteria to help you decide which solution fits your needs. A comprehensive flowchart at the end of this article summarizes the decision-making process.

The main Azure load balancers include:

- Azure Load Balancer
- Application Gateway
- Azure Front Door
- Traffic Manager

When selecting a load balancing solution, consider these factors:

### 1\. Type of Traffic

- Determine whether your application handles HTTP/HTTPS traffic (e.g., web applications) or other protocols such as TCP or UDP.
- Identify if your application is internal or internet-facing.

A flowchart later in this article assists you with a series of “yes” or “no” questions to guide you to the appropriate solution.

### 2\. Coverage

- Assess if your deployment is regional or global.
- Regional deployments are confined to a specific area (for example, East US), while global deployments involve multiple regions (e.g., East US, West US, Central US) and require cross-region routing.

### 3\. Availability

- Analyze the Service Level Agreements (SLAs) available with each load balancer. For example, some solutions offer 99.99% availability while others provide 99.9%, which can influence your choice depending on application needs.

### 4\. Cost

- Consider your budget constraints. High-cost SKUs may not be feasible when cost management is a priority.

### 5\. Limits and Features

- Compare the capabilities required by your application with the features provided by each load balancing service. For example, if your application requires path-based routing, note that Azure Load Balancer does not support this function. In such cases, consider using Application Gateway or Azure Front Door.

![The image is a guide for choosing a load balancing solution in Azure, comparing options like Azure Load Balancer, Application Gateway, Azure Front Door, and Traffic Manager based on criteria such as type of traffic, coverage, availability, cost, and limits/features.](https://kodekloud.com/kk-media/image/upload/v1752867058/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-load-balancing-guide-comparison.jpg)

## Overview of Azure Load Balancers

### Azure Load Balancer

Azure Load Balancer efficiently directs TCP and UDP traffic to backend resources like Virtual Machines (VMs) or Virtual Machine Scale Sets (VMSS). Below is an overview of how it works:

- A public load balancer receives a client request (e.g., on port 80) via its public IP address and distributes the traffic to the backend VMs.
- An internal load balancer, on the other hand, forwards requests to resources like SQL databases using private IP addresses.

Additionally, Azure Load Balancer supports both inbound and outbound connectivity through defined rules. Network Address Translation (NAT) rules allow port mapping; for example, a connection to port 8080 on the load balancer may be translated to port 3389 on a backend VM, enabling a remote desktop session.

![The image is an infographic about Azure Load Balancer, highlighting features such as TCP/UDP load balancing, connection management, NAT rules, health monitoring, and SKU options. It uses a colorful, wavy design to illustrate these points.](https://kodekloud.com/kk-media/image/upload/v1752867061/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-load-balancer-infographic.jpg)

> [!important]
> **Note**
>
> Health monitoring in Azure Load Balancer uses probes to detect unhealthy VMs. If a probe fails, that VM is excluded from the request routing list.

Azure Load Balancer is available in two SKUs:

- Basic (without SLA)
- Standard (with SLA)

For high-availability applications, the Standard SKU is the recommended option.

### Azure Application Gateway

Azure Application Gateway is optimized for load balancing web requests. It can forward traffic to VMs, VMSS, Azure App Services, deployment slots, and even non-Azure endpoints (such as on-premises systems or other cloud services). The typical process flow includes:

- A browser sends a request to the Application Gateway.
- A configured listener processes the request, which is then routed to backend resources based on predefined rules.

![The image is a diagram illustrating the flow of web requests through an Azure Application Gateway, showing components like the browser, application gateway, HTTP/HTTPS listener, rules, and a pool of VMs, VMSS, and servers.](https://kodekloud.com/kk-media/image/upload/v1752867063/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-application-gateway-flow-diagram.jpg)

Key benefits of using Azure Application Gateway include:

- Layer 7 routing that enables HTTP header inspection and path-based routing.
- A Web Application Firewall (WAF) SKU to protect against common web vulnerabilities such as SQL injection and cross-site scripting.
- SSL/TLS offloading to reduce decryption workloads on backend servers.
- Support for both internal and external deployments with public or private IP addresses.

![The image is an infographic about Azure Application Gateway, highlighting features like load balancing, SSL/TLS offloading, and regional service support. It includes a stylized path with icons and text describing various capabilities.](https://kodekloud.com/kk-media/image/upload/v1752867064/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-application-gateway-infographic.jpg)

### Azure Front Door

Azure Front Door extends the capabilities of Application Gateway by offering global load balancing along with enhanced performance features:

- It leverages Microsoft’s global edge locations to route requests to the nearest edge server, significantly reducing latency.
- Similar to Application Gateway, it operates at Layer 7 and supports path-based as well as multi-site routing.
- Azure Front Door includes a WAF SKU and supports SSL/TLS offloading.

For example, you can configure path-based routing where traffic for "/courses" is directed between two regions. This can be managed either by setting one region as a priority or by distributing traffic 70% to one region and 30% to another.

![The image is a diagram illustrating Azure Front Door, showing how traffic is distributed across different regions (A, B, C, D) through edge locations within the Microsoft Global Network.](https://kodekloud.com/kk-media/image/upload/v1752867064/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-front-door-traffic-distribution-diagram.jpg)

Additional advantages of Azure Front Door include:

- Integration with Content Delivery Networks (CDNs) for enhanced caching performance.
- A global solution that delivers high-speed performance for multi-region deployments.

![The image is an infographic about Azure Front Door, highlighting features like load balancing, SSL/TLS offloading, CDN integration, and global routing solutions.](https://kodekloud.com/kk-media/image/upload/v1752867065/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-front-door-infographic.jpg)

### Azure Traffic Manager

Azure Traffic Manager is a DNS-based load balancing solution. Instead of directly forwarding requests to backend servers, it responds to DNS queries with the IP address or DNS name of the selected endpoint. The client then establishes a direct connection to that endpoint.

Key routing methods in Traffic Manager include:

- **Priority Routing:** Endpoints are assigned priorities. If the highest priority endpoint is down, traffic is directed to the next available one.
- **Geographic Routing:** Routes users based on their geographic location, allowing for localized content delivery.
- **Performance Routing:** Utilizes latency measurements to connect users to the nearest endpoint.
- **Weighted Routing:** Distributes traffic according to the weight assigned to different endpoints.

Traffic Manager is ideal for external applications since internal endpoints using private IP addresses are not accessible through DNS load balancing.

![The image is a diagram illustrating the Azure Traffic Manager, showing how DNS load balancing works with priority and failover endpoints. It includes a flow from user to browser, DNS service, and Traffic Manager, with endpoints prioritized based on their status.](https://kodekloud.com/kk-media/image/upload/v1752867066/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-traffic-manager-dns-diagram.jpg)

![The image is an infographic about Azure Traffic Manager, highlighting its features such as geographic routing, application availability, and compatibility with external applications, while noting that internal apps are not supported.](https://kodekloud.com/kk-media/image/upload/v1752867067/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-traffic-manager-infographic.jpg)

Traffic Manager can also be used in combination with other load balancers (e.g., as a front-end to an Application Gateway) to address complex traffic distribution and routing strategies.

## Flowchart for Load Balancing Decision Making

The following flowchart, adapted from Microsoft documentation, provides a step-by-step guide for choosing the most suitable load balancing solution based on your application's requirements.

- Start by determining whether your application is a web application (HTTP/HTTPS).
  - For non-web internet-facing applications, Azure Load Balancer is recommended for handling TCP/UDP traffic.
  - For internet-facing web applications with a non-global deployment, a single Azure Load Balancer could suffice.
  - For internal web applications, Azure Application Gateway is the ideal choice.
- For global deployments:
  - If SSL offloading or application layer processing (such as path-based or multi-site routing) is needed, a combination of Azure Front Door and Application Gateway might be used.
  - The decision could vary based on whether you are hosting a PaaS solution, IaaS resources, or AKS, as well as the need for performance acceleration.

![The image is a flowchart for choosing a load balancing solution in Azure, detailing decision criteria and options like Azure Load Balancer, Traffic Manager, and Application Gateway.](https://kodekloud.com/kk-media/image/upload/v1752867068/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-application-delivery/azure-load-balancing-flowchart.jpg)

This flowchart serves as a practical starting point for designing an effective load balancing architecture.

## Content Delivery Networks (CDN)

A Content Delivery Network (CDN) enhances application performance by caching content at global edge locations. Key benefits include:

- **Global Presence:** Content is stored closer to your users, significantly reducing access times.
- **Reduced Latency:** Requests are served from the nearest edge location instead of the origin server.
- **Advanced Features:** Support for custom domains, file compression, and geo-filtering.

For instance, a storage account that normally delivers content with a 140-millisecond latency can achieve around 35 milliseconds latency when using a CDN. CDNs are especially effective for delivering images, videos, and other static resources. Microsoft partners with providers like Verizon and Akamai to offer various CDN SKUs catering to different requirements.

## Conclusion

This article has provided an in-depth overview of Azure load balancing solutions and the criteria to consider when selecting the right approach for your application delivery needs. Whether you choose regional solutions like Azure Load Balancer and Application Gateway or opt for global solutions like Azure Front Door and Traffic Manager—and further enhance performance with CDNs—you have a range of options to optimize both application delivery and performance.

Next, we will move on to discussions on designing for network security and application protection.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/61e4ebd3-ea7b-4ade-94f7-e203f93b60c9/lesson/241e7d1c-cb94-4a40-831c-208910696ee1)**
>
> Watch video content
