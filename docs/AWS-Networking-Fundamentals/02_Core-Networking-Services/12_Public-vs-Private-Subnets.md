# Public vs Private Subnets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Public-vs-Private-Subnets)

---

## Table of Contents

- Public vs Private Subnets
  - How to Choose Between Public and Private Subnets
  - Public Subnets
  - Private Subnets
  - Extending an On-Premises Data Center
  - Subnet Comparison Table
  - Summary
  - Links and References
  - Watch Video
  - Practice Lab
    - Typical Web Application Pattern

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Public vs Private Subnets

In this guide, we’ll compare public and private subnets in an Amazon VPC, help you decide which to choose for your application components, and demonstrate common deployment patterns.

## How to Choose Between Public and Private Subnets

Ask yourself:

> Should resources in this subnet be directly accessible from the internet?

- **Yes → Public subnet**
- **No → Private subnet**

## Public Subnets

Public subnets host resources that must serve or receive traffic from the internet (for example, web servers, load balancers, or bastion hosts). These subnets have a route to an Internet Gateway (IGW) and a public IP assigned to each resource.

![The image illustrates the use of private and public subnets within a VPC, showing a web server in a public subnet connected to the internet and a database in a private subnet.](https://kodekloud.com/kk-media/image/upload/v1752863296/notes-assets/images/AWS-Networking-Fundamentals-Public-vs-Private-Subnets/vpc-private-public-subnets-diagram.jpg)

Key characteristics:

- **Route Table** includes a 0.0.0.0/0 route to the Internet Gateway
- **Inbound Traffic** allowed on specific ports (e.g., HTTP 80, HTTPS 443)
- **Outbound Traffic** to the internet for updates, API calls, etc.

> [!important]
> **Warning**
>
> Exposing resources in a public subnet means they are reachable over the internet. Always restrict inbound traffic with Security Groups and Network ACLs.

## Private Subnets

Private subnets host internal resources (databases, application servers, caches) that should not be accessible directly from the internet. They typically use a NAT Gateway or NAT Instance in a public subnet for outbound internet access (software updates, API calls).

Key characteristics:

- **Route Table** has no direct route to IGW
- **Outbound Internet** enabled via NAT Gateway in a public subnet
- **No Public IPs** assigned by default

### Typical Web Application Pattern

1.  Clients connect to an Application Load Balancer or web server in a **public subnet**.
2.  The web server in the public subnet communicates with a database in a **private subnet**.

This ensures:

- End users never access the database directly.
- All data flows through controlled application logic.

> [!important]
> **Note**
>
> To allow your private subnet resources to fetch updates or reach external APIs, deploy a NAT Gateway in a public subnet and add the NAT’s Elastic IP to your private subnet’s route table.

## Extending an On-Premises Data Center

Organizations often extend their corporate networks into AWS using VPN or AWS Direct Connect. In this architecture, all AWS resources reside in private subnets, and traffic flows over a secure tunnel to on-premises infrastructure.

![The image illustrates a use case for a private subnet, showing a connection from a private data center to an AWS private subnet via a VPN.](https://kodekloud.com/kk-media/image/upload/v1752863297/notes-assets/images/AWS-Networking-Fundamentals-Public-vs-Private-Subnets/private-subnet-vpn-connection-aws.jpg)

Benefits:

- No need for Internet Gateway exposure
- Full integration with existing security controls
- Centralized network management

## Subnet Comparison Table

| Feature               | Public Subnet                                   | Private Subnet                                   |
| --------------------- | ----------------------------------------------- | ------------------------------------------------ |
| Internet Connectivity | Direct via Internet Gateway                     | Indirect via NAT Gateway/Instance                |
| Public IP Assignment  | Yes                                             | No                                               |
| Typical Use Cases     | Web servers, Load Balancers, Bastion Hosts      | Databases, Application Servers, Caches           |
| Ingress Traffic       | Allowed from the internet (port-based controls) | Managed via Security Groups from within VPC      |
| Egress Traffic        | Allowed freely                                  | Routed through NAT Gateway for outbound internet |

## Summary

![The image is a slide with a blue gradient background on the left labeled "Summary" and a note on the right stating that resources in public subnets are accessible to and from the internet.](https://kodekloud.com/kk-media/image/upload/v1752863298/notes-assets/images/AWS-Networking-Fundamentals-Public-vs-Private-Subnets/summary-public-subnets-internet-access.jpg)

- **Public subnets**: Resources are reachable by—and can initiate connections with—the internet.
- **Private subnets**: Resources are hidden from direct internet access, using NAT Gateways or on-premises VPN for outbound traffic.

Choose your subnet type based on whether a component truly needs public connectivity:

## Links and References

- [AWS VPC Overview](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS Subnets Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)
- [Best Practices for VPC Design](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/e26822e9-5587-434f-ba84-cb1942ca49c7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/03879204-39b8-4cf8-ade4-778d55e7b5f9)**
>
> Practice lab
