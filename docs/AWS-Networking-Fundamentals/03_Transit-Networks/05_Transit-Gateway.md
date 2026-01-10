# Transit Gateway - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Transit-Networks/Transit-Gateway)

---

## Table of Contents

- Transit Gateway
  - Challenges with VPC Peering
  - What Is AWS Transit Gateway?
  - Centralized On-Premises Connectivity
  - Transit Gateway Peering
  - Key Features and Benefits
  - Watch Video
    - Simplified VPC Connectivity
    - Subnet Attachments

---

## Content

AWS Networking Fundamentals

Transit Networks

# Transit Gateway

AWS Transit Gateway provides a central hub to connect multiple VPCs and on-premises networks, eliminating the complexity of full mesh peering and point-to-point VPNs. With built-in transitive routing, it scales to support thousands of attachments, simplifying network management and improving performance.

For detailed guidance, see [AWS Transit Gateway Documentation](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html).

---

## Challenges with VPC Peering

By default, VPCs are isolated. You must create peering connections to enable traffic flow:

- VPC A ↔ VPC B
- VPC B ↔ VPC C

However, peering is non-transitive: A cannot reach C via B. For four VPCs, you’d need a full mesh:

```
VPC1—VPC2
VPC1—VPC3
VPC1—VPC4
VPC2—VPC3
VPC2—VPC4
VPC3—VPC4
```

Similarly, on-premises connectivity requires individual VPNs or Direct Connect links per VPC. As the number of VPCs grows, the network quickly becomes difficult to scale and manage.

---

## What Is AWS Transit Gateway?

AWS Transit Gateway acts as a regional network hub to interconnect your VPCs and on-premises environments with a single gateway.

### Simplified VPC Connectivity

Instead of a mesh of peerings, attach each VPC to the Transit Gateway:

```
VPC1 ↔ TGW
VPC2 ↔ TGW
VPC3 ↔ TGW
VPC4 ↔ TGW
```

Now all VPCs communicate through the hub, with automatic transitive routing.

### Subnet Attachments

When you attach a VPC to a Transit Gateway, you specify one subnet in each Availability Zone:

- If your VPC spans AZ-A, AZ-B, and AZ-C, create three Transit Gateway subnets.
- TGW uses these subnets for routing and high availability.

> [!important]
> **Note**
>
> Each Transit Gateway attachment requires at least one subnet per AZ. Plan your AZ strategy accordingly to avoid single points of failure.

---

## Centralized On-Premises Connectivity

You can terminate all VPN and Direct Connect circuits on the Transit Gateway, reducing tunnel count and improving bandwidth utilization.

![The image illustrates an AWS Transit Gateway setup, showing connections between a corporate data center and multiple VPCs, with notes on its function as a routing device.](https://kodekloud.com/kk-media/image/upload/v1752863423/notes-assets/images/AWS-Networking-Fundamentals-Transit-Gateway/aws-transit-gateway-setup-diagram.jpg)

- **VPN Consolidation**: One VPN tunnel to TGW replaces N tunnels to N VPCs.
- **Direct Connect**: Attach a DX gateway to TGW for high throughput and low latency.

---

## Transit Gateway Peering

Use Transit Gateway peering to connect hubs across regions or accounts:

![The image illustrates a diagram of AWS Transit Gateway peerings between two regions, each containing an AWS Transit Gateway.](https://kodekloud.com/kk-media/image/upload/v1752863424/notes-assets/images/AWS-Networking-Fundamentals-Transit-Gateway/aws-transit-gateway-peerings-diagram.jpg)

| Peering Type  | Description                               |
| ------------- | ----------------------------------------- |
| Inter-Region  | Connect TGWs in different AWS Regions     |
| Cross-Account | Share TGW attachments across AWS accounts |

---

## Key Features and Benefits

![The image is a summary slide about Transit Gateway features, highlighting networking simplification, transitive routing, subnet specification, and peering capabilities. It includes four numbered points with brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752863425/notes-assets/images/AWS-Networking-Fundamentals-Transit-Gateway/transit-gateway-features-summary-slide.jpg)

| Feature              | Benefit                                                          |
| -------------------- | ---------------------------------------------------------------- |
| Simplified Topology  | Single hub replaces complex VPC mesh and point-to-point links    |
| Transitive Routing   | Automatic routing between all attached VPCs and on-prem networks |
| Subnet Attachments   | High availability with one subnet per AZ                         |
| Peering Capabilities | Global reach via cross-region and cross-account connections      |

> [!important]
> **Warning**
>
> Ensure your AWS account limits and route table entries align with the number of Transit Gateway attachments to avoid resource exhaustion.

---

By adopting AWS Transit Gateway, you streamline your network architecture, enable scalable transitive routing, and centralize connectivity for both cloud and on-premises environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/056227a0-6523-43a5-942e-4082adfaadf7/lesson/97464223-90a7-45c4-8256-9d7fee29e0d8)**
>
> Watch video content
