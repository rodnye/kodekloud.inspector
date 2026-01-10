# Routing in VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Routing-in-VPC)

---

## Table of Contents

- Routing in VPC
  - VPC Router and Subnet Interfaces
  - Route Tables and Routing Rules
  - Route Targets and Default Routes
  - Subnet Associations and Multiple Route Tables
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Routing in VPC

In this article, we explore the mechanics of routing within an Amazon Virtual Private Cloud (VPC). Every VPC includes a router that is critical in directing traffic both among subnets and between the VPC and external networks.

## VPC Router and Subnet Interfaces

Every VPC router is assigned an interface in each subnet, making it accessible within that specific network segment. For example, if a subnet is defined as 192.168.1.0/24, the VPC router’s interface for that subnet is set to 192.168.1.1. This dedicated one-address-per-subnet assignment ensures efficient traffic management, whether it's inter-subnet communication or routing traffic to external destinations.

> [!important]
> **Key Point**
>
> Remember that the designated interface IP (e.g., 192.168.1.1) is automatically assigned for each subnet within your VPC, ensuring consistent internal routing.

## Route Tables and Routing Rules

Routing in a VPC is governed by a route table—a collection of routing rules that directs how network traffic should be forwarded. Each rule in this table is referred to as a route. The router inspects the destination IP address of each outbound packet and then matches it against the routes defined in the table.

For instance, consider an IPv6 route as depicted in the diagram below. Although the example demonstrates IPv6, the routing principles apply equally to IPv4 addresses.

When a packet's destination IP falls within a specific prefix range (e.g., 10.16.0.0/16), the router selects the matching route. In scenarios where multiple routes can apply—such as an overlapping 10.16.1.0/24 alongside the broader 10.16.0.0/16—the router prioritizes the route with the largest (most specific) prefix length.

![The image shows a route table interface with two routes listed, each having a destination and a target labeled as "local."](https://kodekloud.com/kk-media/image/upload/v1752865666/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Routing-in-VPC/route-table-interface-local-targets.jpg)

## Route Targets and Default Routes

After identifying a matching route, the VPC router forwards the packet to the specified target. While many routes point to "local" (ensuring internal routing within the VPC), the target can alternatively be an IP address, a gateway, or even another EC2 instance. Essentially, the target is the destination endpoint where the packet should be sent.

Every VPC is initialized with a default route table, which includes a mandatory local route. This local route ensures that traffic destined for other devices within the same VPC (as defined by the VPC's CIDR block) is routed internally. Additionally, if IPv6 is enabled, there is a corresponding local route for the IPv6 CIDR block.

## Subnet Associations and Multiple Route Tables

Each subnet within a VPC is associated with a single route table. By default, newly created subnets are linked to the default route table. However, you can change this association by linking a subnet to a different route table if your networking requirements demand distinct routing behaviors. Multiple subnets can share the same route table when they adhere to identical routing rules, a useful approach for segregating network traffic between private and public subnets.

> [!important]
> **Tip**
>
> Consider grouping subnets with similar security or access requirements to simplify management by associating them with the same route table.

## Summary

Amazon VPC routing revolves around a dedicated router that facilitates both internal and external traffic flows. The main considerations include:

- The router is equipped with an interface in every subnet, using a unique one-address-per-subnet assignment.
- A route table comprising multiple rules governs the routing process based solely on the packet’s destination IP address.
- When overlapping routes exist, the router chooses the one with the most specific prefix.
- A default route table automatically provides a local route for internal VPC communications, with the flexibility to associate specific subnets with custom route tables when required.

![The image is a summary slide explaining VPC routing, including the role of routers, interfaces, route tables, and packet destination IPs. It features a gradient background with numbered points.](https://kodekloud.com/kk-media/image/upload/v1752865667/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Routing-in-VPC/vpc-routing-summary-routers-interfaces.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/07b2db9e-ef01-4780-9b9b-0137e1080a81)**
>
> Watch video content
