# Direct Connect - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Transit-Networks/Direct-Connect)

---

## Table of Contents

- Direct Connect
  - Key Components
  - Establishing a Connection
  - Virtual Interfaces (VIFs)
  - Pricing Overview
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Transit Networks

# Direct Connect

AWS Direct Connect provides a private, high-bandwidth network link between your on-premises environment (data center, office, or colocation facility) and AWS. Unlike Internet-based VPNs over IPSec tunnels, Direct Connect offers dedicated 1 Gbps, 10 Gbps, or 100 Gbps connectivity, delivering consistent low latency, higher throughput, and enhanced security.

## Key Components

| Component                 | Description                                                                        | Role                                                     |
| ------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| On-Premises Network       | Corporate data center or office network with an edge router or firewall.           | Terminates the Direct Connect link on your side.         |
| Direct Connect Location   | AWS Partner or colocation facility where your customer router and AWS router meet. | Houses the cross-connect between you and AWS.            |
| AWS Direct Connect Router | AWS-owned endpoint at the Direct Connect location.                                 | Provides the physical port you lease for the connection. |

## Establishing a Connection

1.  **Order a Port**  
    Request a 1 Gbps, 10 Gbps, or 100 Gbps port in your chosen Direct Connect location.
2.  **Cross-Connect Provisioning**  
    Work with the facility operator to install a cross-connect cable between your customer router and the AWS Direct Connect router.
3.  **BGP Session Setup**  
    Configure Border Gateway Protocol (BGP) peering on both ends to exchange routes dynamically over the AWS global network.

> [!important]
> **Note**
>
> Ensure your on-premises edge device supports the desired port speed and BGP configuration.

![The image illustrates a Direct Connect Architecture, showing the connection flow from an on-premise network through a Direct Connect location to an AWS Cloud Virtual Private Cloud (VPC) with private and public services.](https://kodekloud.com/kk-media/image/upload/v1752863419/notes-assets/images/AWS-Networking-Fundamentals-Direct-Connect/direct-connect-architecture-aws-vpc.jpg)

## Virtual Interfaces (VIFs)

After your physical link is active, segment traffic by creating virtual interfaces:

| VIF Type    | Destination                                  | Use Case                                        |
| ----------- | -------------------------------------------- | ----------------------------------------------- |
| Private VIF | Virtual Private Gateway attached to your VPC | Access private subnets and EC2 instances.       |
| Public VIF  | AWS public endpoints (e.g., S3, DynamoDB)    | Reach AWS public services over the AWS network. |

Each VIF leverages BGP to advertise and learn routes, ensuring efficient traffic flow.

## Pricing Overview

With AWS Direct Connect, you incur two main charges:

| Charge Type       | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| Port Hours        | Hourly fee per provisioned port, regardless of data usage.                |
| Data Transfer Out | Standard AWS data transfer rates for outbound traffic. (Inbound is free.) |

> [!important]
> **Warning**
>
> Data transfer rates vary by AWS Region. Always review the [AWS Direct Connect pricing](https://aws.amazon.com/directconnect/pricing/) page for the latest details.

![The image is a summary slide highlighting three points about a service that directly links on-premises with AWS, offers greater throughput and security than VPN, and charges based on port hour and outbound data transfer.](https://kodekloud.com/kk-media/image/upload/v1752863420/notes-assets/images/AWS-Networking-Fundamentals-Direct-Connect/aws-on-premises-service-summary-slide.jpg)

## Links and References

- [AWS Direct Connect Documentation](https://docs.aws.amazon.com/directconnect/latest/UserGuide/what-is-direct-connect.html)
- [Amazon VPC Pricing](https://aws.amazon.com/vpc/pricing/)
- [AWS Global Network](https://aws.amazon.com/global-infrastructure/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/056227a0-6523-43a5-942e-4082adfaadf7/lesson/517831f7-8ac4-4d18-abfd-1c5943cc3c51)**
>
> Watch video content
