# VPN - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/VPN)

---

## Table of Contents

- VPN
  - VPN Purpose and Use Case
  - VPN Architecture in AWS
  - Routing Between AWS and On-Premises Networks
  - VPN Pricing
  - VPN Performance Limits
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# VPN

In this article, we explore Virtual Private Networks (VPNs) and their integration with AWS, including their purpose, deployment, routing methods, pricing, and performance limits. You’ll also find architectural diagrams that clarify key components of VPN setups in AWS.

## VPN Purpose and Use Case

Imagine you have an AWS Virtual Private Cloud (VPC) containing private subnets that host various resources without public IP addresses. These resources require secure connectivity to an on-premises data center. A VPN provides this secure link by establishing an encrypted IPsec tunnel between the two environments, ensuring that communication remains private and protected.

## VPN Architecture in AWS

Consider a VPC with a CIDR block of 10.0.0.0/16 where your resources are hosted in private subnets. To connect to an on-premises data center (for example, using 192.168.0.0/16), two critical components are involved:

- **VPN Gateway (VGW):** Located on the AWS side, it terminates the VPN connection.
- **Customer Gateway (CGW):** Located on your on-premises network, it terminates the VPN connection on the customer side and possesses a public IP address.

For instance, if the Customer Gateway is assigned the public IP 1.1.1.1 and the VPN Gateway uses 2.2.2.2, an IPsec tunnel is established over the internet between these endpoints.

![The image illustrates a VPN architecture in AWS, showing a VPC with private subnets and a VPN gateway connected to an on-premise network via a customer gateway.](https://kodekloud.com/kk-media/image/upload/v1752865731/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPN/vpn-architecture-aws-diagram.jpg)

In this setup, the Customer Gateway represents your on-premises side, while the VPN Gateway is deployed on the AWS side.

![The image illustrates a VPN architecture in AWS, showing the connection between a VPC with private subnets and an on-premise network via VPN and customer gateways over the internet.](https://kodekloud.com/kk-media/image/upload/v1752865732/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPN/vpn-architecture-aws-diagram-2.jpg)

The encrypted IPsec tunnel ensures that all data transmitted across the public internet remains secure.

## Routing Between AWS and On-Premises Networks

To facilitate communication between the on-premises network (192.168.0.0/16) and the AWS VPC (10.0.0.0/16), you must configure routing appropriately. Packets destined for the on-premises network should be directed through the VPN Gateway. There are two routing approaches:

1.  **Static Routing:** Manually add a route in the VPC routing table that directs traffic for 192.168.0.0/16 to the VPN Gateway.
2.  **Dynamic Routing:** Use a routing protocol like Border Gateway Protocol (BGP) to automatically exchange routes between the VPN Gateway and the Customer Gateway. This dynamic method allows AWS to learn the on-premises routes automatically.

![The image illustrates a VPN routing setup, showing a VPC with private subnets connected to an on-premise network via a VPN gateway and customer gateway, with routes exchanged dynamically using BGP.](https://kodekloud.com/kk-media/image/upload/v1752865733/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPN/vpn-routing-setup-vpc-bgp.jpg)

> [!important]
> **Note**
>
> Using dynamic routing with BGP simplifies route management and provides improved resiliency by automatically adapting to route changes.

## VPN Pricing

AWS charges for VPN gateways in two main ways:

- A fee for each hour that the VPN connection is available.
- Additional charges for data transfer out (egress traffic) from Amazon EC2 over the VPN.

![The image outlines VPN pricing details, indicating charges for each available VPN connection hour and for data transfer from Amazon EC2 to the internet.](https://kodekloud.com/kk-media/image/upload/v1752865734/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPN/vpn-pricing-details-ec2-internet.jpg)

> [!important]
> **Warning**
>
> Monitor your outbound data transfer closely to manage costs, as VPN egress charges can accumulate quickly.

## VPN Performance Limits

When deploying VPN gateways, consider these performance limits:

- **Bandwidth:** Up to 1.25 Gbps per VPN tunnel.
- **Packets Per Second:** Capable of handling up to 140,000 packets per second.
- **MTU (Maximum Transmission Unit):** Limited to 1,466 bytes.

If a single tunnel does not satisfy performance requirements, utilize Equal-Cost Multi-Path (ECMP) routing by establishing additional VPN tunnels to distribute the traffic load.

![The image shows VPN gateway limits, indicating a maximum bandwidth of 1.25 Gbps per VPN tunnel and a maximum of 140,000 packets per second.](https://kodekloud.com/kk-media/image/upload/v1752865734/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPN/vpn-gateway-limits-bandwidth-packets.jpg)

## Summary

To summarize:

- VPNs provide secure connectivity between AWS VPCs and on-premises data centers.
- The VPN Gateway (AWS side) and Customer Gateway (on-premises side) serve as the endpoints for the encrypted IPsec tunnel.
- Routing can be managed either statically or dynamically using BGP to ensure proper packet flow.
- AWS charges for VPN usage based on connection uptime and data egress, and VPN tunnels have defined performance limits.

![The image is a summary slide outlining four key points about connecting VPCs to on-premise data centers, virtual private gateways, customer gateways, and VPN connections over the public internet.](https://kodekloud.com/kk-media/image/upload/v1752865735/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPN/vpc-onpremise-connection-summary.jpg)

![The image is a summary slide with three points about network settings, VPN charges, and maximum bandwidth. It features a gradient background and numbered bullet points.](https://kodekloud.com/kk-media/image/upload/v1752865736/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-VPN/network-settings-vpn-bandwidth-summary.jpg)

For further reading, consider exploring the [AWS VPN Documentation](https://aws.amazon.com/vpn/) and general [VPN Concepts](https://www.cisco.com/c/en/us/products/security/vpn-endpoint-security-clients/what-is-vpn.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/7127d07d-c6ff-4f8e-b9a9-8bc70e9b81cf)**
>
> Watch video content
