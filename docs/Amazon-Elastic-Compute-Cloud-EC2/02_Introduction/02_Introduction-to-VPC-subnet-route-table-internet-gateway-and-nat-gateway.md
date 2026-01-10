# Introduction to VPC subnet route table internet gateway and nat gateway - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Introduction/Introduction-to-VPC-subnet-route-table-internet-gateway-and-nat-gateway)

---

## Table of Contents

- Introduction to VPC subnet route table internet gateway and nat gateway
  - Virtual Private Cloud (VPC): Your Private Network
  - Subnets: Segmenting Your VPC
  - Route Tables: Traffic Signposts
  - Internet Gateway: Public Access Point
  - NAT Gateway: Secure Outbound Connectivity
  - Links and References
  - Watch Video

---

## Content

Amazon Elastic Compute Cloud (EC2)

Introduction

# Introduction to VPC subnet route table internet gateway and nat gateway

Amazon Web Services (AWS) provides a global, highly reliable backbone to deploy secure and scalable network architectures. In this guide, you’ll learn how VPCs, subnets, route tables, Internet Gateways, and NAT Gateways work together to isolate and manage traffic for your EC2 instances.

First, let’s explore AWS’s global footprint:

![The image shows a map highlighting AWS global network regions, specifically US East (Ohio) and Singapore, with their respective availability zones.](https://kodekloud.com/kk-media/image/upload/v1752869093/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Introduction-to-VPC-subnet-route-table-internet-gateway-and-nat-gateway/aws-global-network-regions-map.jpg)

AWS Regions are fully isolated geographic areas. Each Region contains multiple Availability Zones (AZs)—separate data centers that ensure fault tolerance and high availability. Behind the scenes, the AWS Backbone Network securely interconnects Regions and edge locations for low-latency, high-throughput performance.

---

## Virtual Private Cloud (VPC): Your Private Network

A Virtual Private Cloud (VPC) is your own private, logically isolated section of the AWS Cloud. It acts like a gated community, where you control who enters, leaves, and communicates internally.

Key VPC capabilities:

| Feature                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| Isolation               | Logical separation from other AWS accounts                   |
| Customizable IP Range   | Define your own CIDR block and segment with subnets          |
| Hybrid Connectivity     | Connect on-premises via VPN, Direct Connect, and VPC Peering |
| AWS Service Integration | Seamlessly integrates with EC2, RDS, ELB, Lambda, and more   |

![The image is a presentation slide featuring four key points: Isolation, Customizable, Hybrid – Connectivity, and AWS Integration, with corresponding icons. On the right, there's a cloud and shield icon on a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752869094/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Introduction-to-VPC-subnet-route-table-internet-gateway-and-nat-gateway/isolation-customizable-hybrid-aws-slide.jpg)

> [!important]
> **Note**
>
> Remember: VPCs do not span Regions. Resources in one Region (and its AZs) cannot communicate with resources in another without a peer connection or VPN.

---

## Subnets: Segmenting Your VPC

Subnets subdivide a VPC into smaller IP ranges within a single AZ—like dividing a housing lane into individual plots. Use subnets to isolate workloads (web servers, APIs, databases) based on security and routing needs.

![The image is a diagram illustrating the concept of subnets within a virtual private cloud (VPC), comparing them to plots in a housing lane. It shows different types of subnets like web-app, backend API, and database subnets.](https://kodekloud.com/kk-media/image/upload/v1752869095/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Introduction-to-VPC-subnet-route-table-internet-gateway-and-nat-gateway/vpc-subnets-diagram-housing-lane.jpg)

By placing subnets in multiple AZs, you build high-availability architectures:

![The image illustrates AWS networking with a VPC containing subnets for web apps, backend APIs, and databases, located in the Singapore region. It also shows availability zones labeled ap-southeast-1a, 1b, and 1c.](https://kodekloud.com/kk-media/image/upload/v1752869096/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Introduction-to-VPC-subnet-route-table-internet-gateway-and-nat-gateway/aws-networking-vpc-subnets-singapore.jpg)

---

## Route Tables: Traffic Signposts

Route tables control how packets flow between subnets, VPC peering connections, Internet Gateways, and NAT Gateways. Each entry maps a destination CIDR to a target.

Example “App VPC” route table:

| Destination  | Target                      |
| ------------ | --------------------------- |
| 10.10.0.0/16 | VPC Peering Connection      |
| 0.0.0.0/0    | Internet Gateway (igw-xxxx) |

![The image is a diagram illustrating route tables for a network, showing connections between an "App VPC" and two destinations: a "Swimming pool/Security VPC" and a "Gym/Sandbox VPC," with specific routes and targets.](https://kodekloud.com/kk-media/image/upload/v1752869097/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Introduction-to-VPC-subnet-route-table-internet-gateway-and-nat-gateway/route-tables-network-diagram-vpcs.jpg)

---

## Internet Gateway: Public Access Point

An Internet Gateway (IGW) is a horizontally scaled, redundant VPC component that allows communication between your VPC and the Internet.

To enable Internet access for a subnet:

1.  Create and attach an IGW to your VPC.
2.  Add a route to your route table:
    - Destination: `0.0.0.0/0`
    - Target: `igw-<gateway-id>`
3.  Assign public or Elastic IPs to your EC2 instances.

![The image is a diagram illustrating an Internet Gateway setup, showing an EC2 instance connected to an Internet Gateway, which routes traffic to a target destination.](https://kodekloud.com/kk-media/image/upload/v1752869098/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Introduction-to-VPC-subnet-route-table-internet-gateway-and-nat-gateway/internet-gateway-ec2-diagram.jpg)

---

## NAT Gateway: Secure Outbound Connectivity

A NAT Gateway allows instances in **private subnets** to initiate outbound Internet traffic while preventing inbound connections.

Setup steps:

1.  Launch a NAT Gateway in a **public subnet**.
2.  Update the private subnet’s route table:
    - Destination: `0.0.0.0/0`
    - Target: `nat-<gateway-id>`

Instances in the private subnet will use the NAT Gateway for OS updates, API calls, and package downloads without exposing their private IPs.

> [!important]
> **Warning**
>
> Each NAT Gateway incurs an hourly charge and data processing fees. Consider using a NAT instance for low-throughput scenarios.

---

## Links and References

- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)
- [AWS Route Tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)
- [AWS Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)
- [AWS NAT Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/2f7acbdc-7cde-4d21-9c8d-e1095f159b48/lesson/33c05668-cd09-4f22-87d3-294df717edb5)**
>
> Watch video content
