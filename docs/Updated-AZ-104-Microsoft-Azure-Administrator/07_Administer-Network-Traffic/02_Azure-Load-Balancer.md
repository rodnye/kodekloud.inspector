# Azure Load Balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Network-Traffic/Azure-Load-Balancer)

---

## Table of Contents

- Azure Load Balancer
  - Overview and Key Features
  - Load Balancer SKUs
  - Public and Internal Load Balancers
  - Configuring Azure Load Balancer Rules
  - Watch Video
    - Public Load Balancer
    - Internal Load Balancer

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Network Traffic

# Azure Load Balancer

Azure Load Balancer is a high-performance service that efficiently distributes incoming network traffic among backend servers using defined rules and health probes. By doing so, it prevents any single server from becoming overloaded, ensuring consistent application performance and high availability.

## Overview and Key Features

Operating at Layer 4 (Transport Layer) of the OSI model, Azure Load Balancer manages both TCP and UDP traffic. It is optimized for Azure Virtual Machines and Virtual Machine Scale Sets, providing reliable and scalable traffic distribution.

Azure Load Balancer is available in two SKUs:

- **Basic SKU**: A cost-effective option designed for smaller or less complex workloads, suitable for development and testing.
- **Standard SKU**: A robust solution that offers advanced features including higher scale, enhanced diagnostics, a 99.99% SLA, improved network security, and multi-zone support.

Both SKUs can handle all TCP and UDP traffic, making the Azure Load Balancer a flexible choice for a broad range of applications. Integration with Network Security Groups (NSGs) adds an extra layer of protection by enforcing strict security policies on the traffic that reaches your backend servers.

By leveraging Azure Load Balancer, you can build a highly available, secure, and scalable application architecture.

## Load Balancer SKUs

The key differences between the Basic and Standard SKUs are summarized in the table below:

| Characteristic       | Basic SKU                                            | Standard SKU                                                                |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| Backend Pool Size    | Up to 300 instances                                  | Up to 1,000 instances                                                       |
| Health Probes        | Supports TCP and HTTP probes                         | Supports TCP, HTTP, and HTTPS probes (_HTTP/HTTPS evaluate response codes_) |
| Redundancy Options   | No built-in redundancy options                       | Multiple redundant availability options available                           |
| Frontend Connections | Supports multiple frontends for inbound traffic only | Supports both inbound and outbound connections                              |
| Security Posture     | Open by default (optional NSG configuration)         | Closed by default; requires explicit NSG rules to allow traffic             |
| SLA                  | No SLA provided                                      | 99.99% SLA                                                                  |

![The image compares features of Basic and Standard Load Balancers, highlighting differences in backend pool size, health probes, redundancy, multiple frontends, security, and SLA.](https://kodekloud.com/kk-media/image/upload/v1752884704/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Load-Balancer/load-balancer-comparison-features.jpg)

> [!important]
> **Important**
>
> When selecting a SKU, consider your workload’s requirements for performance, security, and availability. The Standard SKU is better suited for production environments with stringent SLA needs.

## Public and Internal Load Balancers

Azure Load Balancer is offered in two main configurations: public and internal. Each configuration caters to different network scenarios and workload requirements.

### Public Load Balancer

The Public Load Balancer is designed for applications that require direct Internet connectivity. It is ideal for scenarios where client requests from the Internet need to be evenly distributed among multiple servers. For instance, a virtual network with several web servers in a web subnet can use a public load balancer to handle incoming HTTP requests on port 80, thereby ensuring minimal impact in the event of a server failure.

![The image illustrates a public load balancer setup, showing how it distributes traffic on port 80 to multiple servers within a virtual network. It highlights that this configuration is ideal for public-facing workloads.](https://kodekloud.com/kk-media/image/upload/v1752884705/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Load-Balancer/public-load-balancer-setup.jpg)

In a public load balancer configuration, a public IP address is associated with the load balancer to ensure it receives traffic directly from the Internet.

### Internal Load Balancer

For services that do not need exposure to the Internet, the Internal Load Balancer is the optimal choice. It efficiently routes traffic within your Azure Virtual Network, making it perfect for internal workloads such as database communications or inter-service communication within multi-tier applications.

Consider a scenario where web servers need to communicate with a backend database cluster located in a separate data subnet. An internal load balancer can distribute database requests among multiple database servers, enhancing both performance and security.

![The image is a diagram illustrating an internal load balancer setup within a virtual network, showing the flow of traffic through public and internal load balancers to web and data subnets.](https://kodekloud.com/kk-media/image/upload/v1752884706/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Load-Balancer/internal-load-balancer-diagram.jpg)

Using an internal load balancer improves your application's security posture by segregating public-facing services from internal systems; it operates without a public IP address.

## Configuring Azure Load Balancer Rules

After understanding the types and features of Azure Load Balancer, configuring load balancing rules is the next step. These rules determine how incoming traffic is distributed among backend servers and encompass parameters such as frontend IP configuration, backend pool assignments, load balancing rules, and health probes.

Implementing these rules correctly ensures that your Azure Load Balancer maximizes performance, reliability, and scalability. In this lesson, we delve deeper into rule configuration, empowering you to optimize your Azure infrastructure for seamless application delivery.

> [!important]
> **Next Steps**
>
> For detailed instructions on configuring your load balancing rules, refer to the official [Azure Load Balancer documentation](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-standard-overview).

This concludes our in-depth overview of Azure Load Balancer and its configuration options. By understanding the distinctions between SKUs and the appropriate use cases for public and internal load balancers, you can design robust systems that adhere to best practices for both performance and security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/50248c52-4b17-4c2d-87f8-52a42eff2d2f/lesson/3a6bab28-6158-4817-864f-083488f1f33b)**
>
> Watch video content
