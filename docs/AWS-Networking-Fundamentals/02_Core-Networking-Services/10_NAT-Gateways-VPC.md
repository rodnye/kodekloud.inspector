# NAT Gateways VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/NAT-Gateways-VPC)

---

## Table of Contents

- NAT Gateways VPC
  - Overview
  - The Challenge
  - Introducing NAT Gateways
  - Deployment Steps
  - IGW vs NAT Gateway Comparison
  - Traffic Flow
  - Key Characteristics
  - Cost Considerations
  - High Availability
  - Summary
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# NAT Gateways VPC

In this guide, you’ll learn what NAT Gateways are, why they’re essential for private subnet internet access, and how to deploy and manage them in AWS.

## Overview

When you run instances in private subnets, you often still need outbound internet connectivity—for OS updates, package downloads, and API calls—without exposing those instances to inbound traffic. NAT Gateways solve this by enabling secure, outbound-only internet access while keeping your servers hidden from unsolicited inbound connections.

## The Challenge

You have an EC2 instance in a private subnet that needs to pull updates from the internet.

- Attaching an Internet Gateway (IGW) and routing traffic through it turns your subnet public.
- A public subnet exposes instances to inbound internet traffic, increasing security risk.

> [!important]
> **Warning**
>
> Avoid routing private instance traffic directly through an Internet Gateway, as this exposes them to inbound connections.

## Introducing NAT Gateways

A NAT Gateway is a fully managed AWS service that allows instances in private subnets to send outbound traffic to the internet while blocking inbound traffic initiated from the internet. Key features include:

- Outbound-only traffic with automatic source IP translation
- Requires an Internet Gateway on the VPC for upstream connectivity
- Elastic IP–backed for consistent public IPs

![The image is a diagram illustrating a NAT Gateway setup within a VPC, showing four availability zones, each with a connection to the internet.](https://kodekloud.com/kk-media/image/upload/v1752863293/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC/nat-gateway-vpc-setup-diagram.jpg)

## Deployment Steps

1.  **Create or Attach an Internet Gateway**
    - In the AWS Console under **VPC → Internet Gateways**, attach the IGW to your VPC.
2.  **Configure a Public Subnet**
    - Create a subnet and tag it as public.
    - Update its route table:
      - Destination: `0.0.0.0/0`
      - Target: your Internet Gateway
3.  **Launch a NAT Gateway**
    - Go to **VPC → NAT Gateways**.
    - Select the public subnet and assign an Elastic IP.
4.  **Update Private Subnet Routes**
    - For each private subnet, modify its route table:
      - Destination: `0.0.0.0/0`
      - Target: the NAT Gateway

> [!important]
> **Note**
>
> Each NAT Gateway requires an Elastic IP. Ensure you have available Elastic IPs or allocate new ones before deployment.

## IGW vs NAT Gateway Comparison

| Feature                | Internet Gateway (IGW)          | NAT Gateway                      |
| ---------------------- | ------------------------------- | -------------------------------- |
| Inbound Connections    | Allowed                         | Blocked (outbound-only)          |
| Source IP Preservation | Yes                             | No (performs source NAT)         |
| Managed Service        | Yes                             | Yes                              |
| Public IP Requirement  | No (automatic public IP on ENI) | Elastic IP must be assigned      |
| Use Case               | Public subnet internet access   | Private subnet outbound internet |

## Traffic Flow

1.  **Private Instance → NAT Gateway**
2.  **NAT Gateway → Internet Gateway → Internet**
3.  **Return Traffic → Internet Gateway → NAT Gateway → Private Instance**

## Key Characteristics

- **Fully Managed**: AWS handles provisioning, scaling, and health monitoring.
- **Automatic Scaling**: Starts at 5 Gbps and can scale up to 100 Gbps.
- **AZ Isolation**: Deploy one per Availability Zone (AZ) for high availability.
- **Billing**: Hourly NAT Gateway charge + per GB data processed.

![The image is a summary of NAT Gateways, highlighting their function, deployment on public subnets, use of Elastic IPs, and AZ-reliant service requirements.](https://kodekloud.com/kk-media/image/upload/v1752863294/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC/nat-gateways-summary-elastic-ips.jpg)

## Cost Considerations

> [!important]
> **Warning**
>
> NAT Gateways incur hourly charges per gateway and data processing fees. Monitor usage in AWS Cost Explorer to avoid unexpected costs.

## High Availability

- Deploy a NAT Gateway in each AZ where you have private subnets.
- Update each private subnet’s route table to point to the AZ-specific NAT Gateway.
- Consider combining with AWS Transit Gateway for multi-VPC designs.

## Summary

- **Purpose**: Enable outbound internet access for private subnets without inbound exposure.
- **Requirements**: Internet Gateway, Elastic IP, public subnet for the NAT Gateway.
- **High Availability**: One NAT Gateway per AZ.
- **Management & Billing**: AWS-managed; pay hourly + per GB.

![The image is a summary slide with points about NAT Gateway, including routing for private subnets, AWS management, and charging details.](https://kodekloud.com/kk-media/image/upload/v1752863295/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC/nat-gateway-summary-routing-aws.jpg)

## Links and References

- [AWS NAT Gateway Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
- [AWS VPC Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)
- [Terraform AWS NAT Gateway Resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/nat_gateway)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/456455aa-064a-4edc-830e-8702935929cd)**
>
> Watch video content
