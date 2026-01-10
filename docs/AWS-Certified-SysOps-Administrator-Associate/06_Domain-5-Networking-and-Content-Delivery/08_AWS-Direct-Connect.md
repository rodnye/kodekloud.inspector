# AWS Direct Connect - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/AWS-Direct-Connect)

---

## Table of Contents

- AWS Direct Connect
  - Connecting via a Partner
  - Virtual Interfaces: Public, Private, and Transit
  - Types of Connections
  - High Resiliency and Link Aggregation
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# AWS Direct Connect

AWS Direct Connect is a powerful network service that enables you to establish a dedicated physical connection between your corporate network and AWS. Unlike a VPN that creates a virtual private connection over the Internet, Direct Connect uses an actual physical wire. This connection provides high-performance connectivity with low latency and consistent network performance, making it an ideal choice for data-intensive applications. However, note that Direct Connect does not encrypt traffic by default; if encryption is required, you must enable MACsec (Media Access Control Security) separately.

Using AWS Direct Connect can also help reduce your ingress and egress charges on AWS, potentially resulting in significant cost savings when transferring large amounts of data.

## Connecting via a Partner

In most cases, setting up AWS Direct Connect involves connecting to an AWS Direct Connect partner. Here’s how it works:

- Your connection reaches a partner’s data center.
- The partner’s data center links to the AWS data center.
- On the AWS side, your connection terminates at a virtual private gateway attached to a specific VPC via a private virtual interface.

![The image is a diagram illustrating an AWS Direct Connect setup, showing the connection between a customer's network and an AWS region with VPCs, routers, and gateways. It includes components like AWS EC2 instances, private subnets, and customer network elements such as clients and servers.](https://kodekloud.com/kk-media/image/upload/v1752860723/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Direct-Connect/aws-direct-connect-setup-diagram.jpg)

Ensure that your on-premises router supports BGP and is capable of handling Direct Connect’s tagging and virtual interface requirements.

## Virtual Interfaces: Public, Private, and Transit

AWS Direct Connect employs virtual interfaces (VIFs) to manage different types of network traffic. Understanding the distinctions between these interfaces is key for designing an optimal network connection:

- **Private Virtual Interface:** Connects directly to a VPC for accessing private resources.
- **Transit Virtual Interface:** Connects to a transit gateway for centralizing connectivity across multiple VPCs.
- **Public Virtual Interface:** Connects to AWS public services such as Amazon S3, DynamoDB, and other publicly accessible endpoints.

The type of virtual interface you choose determines the routing of your traffic. In some scenarios, a Direct Connect gateway is required to terminate the connection, although it may be optional in setups involving transit gateways. Often, AWS documentation refers to Direct Connect simply as “DX.”

![The image is a diagram illustrating AWS Virtual Interfaces (VIFs) and Direct Connect, showing connections between AWS services, VPCs, and a customer router through various VLANs. It includes components like public and private VIFs, Direct Connect Gateway, and Transit Gateway.](https://kodekloud.com/kk-media/image/upload/v1752860726/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Direct-Connect/aws-virtual-interfaces-diagram.jpg)

## Types of Connections

AWS Direct Connect provides two primary connection types, each designed to meet different networking needs:

- **Dedicated Connection:** Offers a physical line with speeds of 1, 10, or 100 gigabits per second.
- **Hosted Connection:** Provides a physical Ethernet connection, typically ranging from 50 megabits to 10 gigabits per second (note that 100 gigabit speeds are not available with hosted connections).

![The image lists three types of Virtual Interfaces (VIFs): Private Virtual Interface, Public Virtual Interface, and Transit Virtual Interface.](https://kodekloud.com/kk-media/image/upload/v1752860728/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Direct-Connect/virtual-interfaces-private-public-transit.jpg)

![The image is a diagram titled "Types of Connection," showing two categories: "Dedicated connections" and "Hosted connections."](https://kodekloud.com/kk-media/image/upload/v1752860729/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Direct-Connect/types-of-connection-diagram.jpg)

Choosing the right connection type depends on your bandwidth requirements and overall network design considerations.

## High Resiliency and Link Aggregation

To ensure high resiliency, many organizations deploy two Direct Connect connections. Some opt for a primary Direct Connect with a VPN backup for added security. Additionally, you can aggregate multiple connections using Link Aggregation Control Protocol (LACP) and Link Aggregation Groups (LAG) to achieve even higher effective throughput.

![The image illustrates a high-resiliency connectivity setup using AWS Direct Connect, showing the connection between an AWS region with multiple availability zones and a customer network. It includes components like VPC, private subnets, virtual private gateways, and customer-managed routing.](https://kodekloud.com/kk-media/image/upload/v1752860730/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Direct-Connect/aws-direct-connect-resiliency-setup.jpg)

![The image illustrates a network diagram showing Link Aggregation Groups (LAGs) connecting a VPC to customer data centers via AWS Direct Connect locations. It includes two LAGs, each with multiple connections.](https://kodekloud.com/kk-media/image/upload/v1752860731/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-AWS-Direct-Connect/network-diagram-lags-aws-direct-connect.jpg)

> [!important]
> **Note**
>
> Deploying multiple Direct Connect connections not only increases resiliency but also enhances your network’s overall performance through link aggregation.

## Summary

AWS Direct Connect provides a dedicated, high-performance network connection between your on-premises network and AWS. Key points to remember include:

- **Private Virtual Interfaces** enable direct access to VPCs containing private resources.
- **Public Virtual Interfaces** allow access to AWS public services.
- **Transit Virtual Interfaces** facilitate connections to transit gateways.
- A **Direct Connect Gateway** may be required in certain configurations to terminate the connection.
- Available connection speeds typically include 1, 10, and 100 gigabits per second, with some configurations supporting up to 1,000 gigabits.
- Although Direct Connect offers reliable and consistent network performance, it does not provide encryption by default.

This comprehensive overview of AWS Direct Connect from a SysOps perspective should help you design and implement a robust and cost-effective network solution for your AWS environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/d020bfa5-eed4-49f2-bb41-c990bac83910)**
>
> Watch video content
