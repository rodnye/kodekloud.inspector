# Routing in VPCs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Routing-in-VPCs)

---

## Table of Contents

- Routing in VPCs
  - Internal Router and Subnet Interfaces
  - Route Tables and Their Role
  - Subnets and Their Association with Route Tables
  - Summary of VPC Routing
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Routing in VPCs

In this article, we explore how routing functions within a Virtual Private Cloud (VPC). A solid understanding of VPC routing is crucial when designing and managing network traffic flow in AWS environments.

## Internal Router and Subnet Interfaces

Every VPC contains an internal router with an interface in each subnet. The router is reachable via one address per subnet. For example, if your subnet uses the CIDR block 192.168.1.0/24, the router’s interface in that subnet is typically 192.168.1.1. The primary function of this router is to forward traffic between subnets and between the VPC and external networks.

> [!important]
> **Key Point**
>
> Remember that this behavior applies to both IPv4 and IPv6 traffic.

## Route Tables and Their Role

Much like a physical router in a data center, AWS gives you control over your VPC router through the configuration of route tables. A route table contains a set of rules (routes) that determine the next hop for network traffic. When a packet is sent, the router examines its destination IP and looks for a matching rule by comparing the destination against the CIDR blocks in the route table.

For example, if a packet’s destination IP falls within the 10.16.0.0/16 range, the router selects the corresponding route. In cases where multiple routes match—such as an overlap between a 10.16.1.0/24 route and a broader 10.16.0.0/16 route—the router chooses the route with the longest prefix (i.e., the most specific match). Therefore, a /24 route is preferred over a /16 route.

Once a specific route is selected, the packet is forwarded to the target defined in that route. Targets can be diverse, including another IP address, a gateway, an EC2 instance, or another AWS resource. Often, the target is labeled as "local", indicating that the packet should remain within the VPC.

Every route table includes one default route—the local route—which matches traffic destined for the VPC’s own CIDR block. For instance, if your VPC’s CIDR is 10.16.0.0/16, any intra-VPC traffic aligns with this local route. When IPv6 is enabled, a corresponding local route exists for the IPv6 CIDR block.

The diagram below summarizes key VPC routing concepts, illustrating the roles of routers, interfaces, route tables, and the packet forwarding process:

![The image is a summary of VPC routing concepts, detailing the role of routers, interfaces, route tables, and packet forwarding processes. It includes five key points, each marked with a numbered arrow.](https://kodekloud.com/kk-media/image/upload/v1752859208/notes-assets/images/AWS-Certified-Developer-Associate-Routing-in-VPCs/vpc-routing-concepts-summary.jpg)

## Subnets and Their Association with Route Tables

Each subnet in a VPC is associated with a route table. When you create a subnet, you can assign it to the default route table or specify a custom one. This means any traffic leaving a subnet is governed by the rules defined in its associated route table.

Note that while multiple subnets can share the same route table, each subnet can only be associated with one route table at a time. This design provides flexibility, enabling different routing rules for public and private subnets, for example.

The following diagram reviews key concepts regarding route tables and subnet associations:

![The image is a summary slide with two points about route tables and subnets, highlighting default routes and subnet associations.](https://kodekloud.com/kk-media/image/upload/v1752859209/notes-assets/images/AWS-Certified-Developer-Associate-Routing-in-VPCs/route-tables-subnets-summary-slide.jpg)

## Summary of VPC Routing

- Every VPC contains an internal router that directs traffic between subnets and external networks.
- Each router has an interface in each subnet, accessible via a designated IP address.
- A route table is a set of rules that instructs the router on how to handle network traffic.
- The router examines a packet’s destination IP and selects the most specific matching route before forwarding it to the target.
- A default local route exists in every VPC to permit intra-VPC communication. With IPv6 enabled, a similar local route is also present.
- Each subnet is associated with a single route table, although one route table may serve multiple subnets.

This overview clarifies how route tables and VPC routing policies work together to manage network traffic flow within AWS environments.

> [!important]
> **Further Reading**
>
> For more detailed information on AWS networking and VPC configuration, explore the [AWS Networking Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/f3e4a2dd-9bee-4524-b35d-1e489a4cec36)**
>
> Watch video content
