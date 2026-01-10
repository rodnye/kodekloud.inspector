# VPN - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Transit-Networks/VPN)

---

## Table of Contents

- VPN
  - VPN Architecture
  - Routing Options
  - Pricing
  - VPN Gateway Limits
  - Summary
  - References
  - Watch Video
    - Key Components
    - 1. Static Routing
    - 2. Dynamic Routing (BGP)

---

## Content

AWS Networking Fundamentals

Transit Networks

# VPN

Virtual Private Networks (VPNs) create an encrypted tunnel over the public Internet, allowing secure communication between on-premises networks and resources within an Amazon Virtual Private Cloud (VPC). In AWS, you can use Site-to-Site VPN to bridge your data center with your VPC, extending your network securely.

## VPN Architecture

In this setup, your VPC uses the CIDR block `10.0.0.0/16` and contains private subnets without public IPs. To connect on-premises devices:

- AWS deploys a **Virtual Private Gateway (VGW)**, which terminates the IPsec tunnel on the VPC side.
- Your on-premises network uses a **Customer Gateway (CGW)** appliance with a public IP (e.g., `1.1.1.1`).
- AWS assigns a public IP (e.g., `2.2.2.2`) to the VGW.
- An IPsec tunnel encrypts traffic between the CGW and VGW over the Internet.

![The image illustrates a VPN architecture in AWS, showing the connection between a Virtual Private Cloud (VPC) with private subnets and an on-premise network via a VPN gateway and customer gateway over the internet.](https://kodekloud.com/kk-media/image/upload/v1752863436/notes-assets/images/AWS-Networking-Fundamentals-VPN/vpn-architecture-aws-vpc-diagram.jpg)

### Key Components

| Component               | Role                                                      |
| ----------------------- | --------------------------------------------------------- |
| Virtual Private Gateway | AWS-side VPN endpoint attached to your VPC                |
| Customer Gateway        | On-premises VPN endpoint with a public IP                 |
| IPsec Tunnel            | Encrypts data between CGW (`1.1.1.1`) and VGW (`2.2.2.2`) |

## Routing Options

You can route traffic between `10.0.0.0/16` (VPC) and `192.168.0.0/16` (on-premises) in two ways:

### 1\. Static Routing

Manually add routes to your VPC route table.

```
Destination: 192.168.0.0/16
Target: vgwy-xxxxxxxx
```

### 2\. Dynamic Routing (BGP)

Use the Border Gateway Protocol (BGP) to exchange and propagate routes automatically between the Customer Gateway and the VPN Gateway.

![The image is a diagram illustrating VPN routing between a VPC and an on-premise network, showing private subnets, a VPN gateway, and a customer gateway with dynamic route exchange using BGP.](https://kodekloud.com/kk-media/image/upload/v1752863438/notes-assets/images/AWS-Networking-Fundamentals-VPN/vpn-routing-vpc-onpremise-diagram.jpg)

> [!important]
> **Warning**
>
> Dynamic routing via BGP adds complexity. Ensure your on-premises router supports BGP and proper autonomous system (AS) configuration.

## Pricing

AWS Site-to-Site VPN pricing includes two main components:

| Billing Dimension | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| Connection Hours  | Charged per hour while each VPN connection is available                      |
| Data Transfer Out | Standard Amazon EC2 data transfer rates for outbound traffic to the Internet |

![The image outlines VPN pricing, indicating charges for each available VPN connection hour and for data transfer from Amazon EC2 to the internet.](https://kodekloud.com/kk-media/image/upload/v1752863439/notes-assets/images/AWS-Networking-Fundamentals-VPN/vpn-pricing-ec2-data-transfer.jpg)

> [!important]
> **Note**
>
> Data transferred into AWS over the VPN is free; only outbound data is charged.

## VPN Gateway Limits

Each AWS-managed VPN tunnel supports:

| Limit                   | Value       |
| ----------------------- | ----------- |
| Maximum Bandwidth       | 1.25 Gbps   |
| Maximum Packets per Sec | 140,000 pps |
| Path MTU                | 1466 bytes  |

To increase throughput, you can deploy multiple tunnels and use Equal-Cost Multi-Path (ECMP) routing.

![The image shows VPN gateway limits, indicating a maximum bandwidth of 1.25 Gbps per VPN tunnel and a maximum of 140,000 packets per second.](https://kodekloud.com/kk-media/image/upload/v1752863440/notes-assets/images/AWS-Networking-Fundamentals-VPN/vpn-gateway-limits-bandwidth-packets.jpg)

## Summary

Connecting your on-premises network to an AWS VPC using VPN delivers secure, encrypted traffic flow:

- **Virtual Private Gateway (VGW):** AWS-side endpoint attached to your VPC.
- **Customer Gateway (CGW):** On-premises endpoint with a public IP.
- **IPsec Tunnel:** Secures data in transit over the public Internet.
- **Routing:** Static routes for simplicity or BGP for automation.
- **Pricing:** Charged by VPN connection hours and outbound data.
- **Limits:** 1.25 Gbps per tunnel, 140,000 pps, 1466 byte MTU.

![The image is a summary slide outlining key points about connecting VPCs to on-premise data centers, virtual private gateways, customer gateways, and VPN connections over the public internet.](https://kodekloud.com/kk-media/image/upload/v1752863441/notes-assets/images/AWS-Networking-Fundamentals-VPN/vpc-on-premise-connection-summary-slide.jpg)

![The image is a slide with a blue gradient background on the left labeled "Summary" and a note on the right stating that an on-premise network can be set statically in a route table or dynamically exchanged via BGP.](https://kodekloud.com/kk-media/image/upload/v1752863441/notes-assets/images/AWS-Networking-Fundamentals-VPN/summary-on-premise-network-bgp-route.jpg)

## References

- [AWS Site-to-Site VPN](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html)
- [Amazon VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [Border Gateway Protocol (BGP)](https://en.wikipedia.org/wiki/Border_Gateway_Protocol)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/056227a0-6523-43a5-942e-4082adfaadf7/lesson/91121bdc-829e-4584-9479-5c994ac96755)**
>
> Watch video content
