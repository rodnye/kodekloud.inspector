# Public vs Private Subnets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Public-vs-Private-Subnets)

---

## Table of Contents

- Public vs Private Subnets
  - Understanding Subnet Types
  - Practical Scenarios
  - Summary
  - Watch Video
    - Web Server and Database Architecture
    - Extending a Private Data Center to the Cloud

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Public vs Private Subnets

In this lesson, we'll explore the differences between public and private subnets and illustrate how to leverage them within your AWS environment for efficient application deployment.

## Understanding Subnet Types

When designing your network, a straightforward question can help decide the subnet type: Should devices on the internet be able to interact with the resources in this subnet? If the answer is yes, the subnet should be public. Otherwise, it should be private.

**Key Points:**

- **Public Subnets:**  
  Enable direct communication between the internet and your resources. Any service that needs to be accessed by users externally (e.g., a web server) should be deployed here.
- **Private Subnets:**  
  Keep your resources shielded from direct internet access. This is ideal for components that manage sensitive data or services not meant for direct user interaction, such as databases.

## Practical Scenarios

### Web Server and Database Architecture

Consider a web application consisting of a public-facing web server and a sensitive backend database. The web server is placed in a public subnet to handle incoming user requests, while the database resides in a private subnet to safeguard its sensitive information.

The diagram below demonstrates a network architecture where a web server on a public subnet securely communicates with a database on a private subnet:

![The image illustrates a network architecture with a VPC containing a public subnet for a web server and a private subnet for a database, showing their connection to the internet.](https://kodekloud.com/kk-media/image/upload/v1752859196/notes-assets/images/AWS-Certified-Developer-Associate-Public-vs-Private-Subnets/network-architecture-vpc-subnets.jpg)

> [!important]
> **Design Tip**
>
> When designing multi-tier applications, isolate public-facing services from back-end databases using public and private subnets to enhance security.

### Extending a Private Data Center to the Cloud

In another scenario, when extending your on-premises data center to AWS, you might deploy AWS resources in a private subnet. This configuration works well with a VPN connection between your private data center and the AWS environment, eliminating the need for public subnets.

The diagram below illustrates a use case where an on-premises private data center connects via a VPN to resources residing in an AWS private subnet:

![The image illustrates a use case for a private subnet, showing a connection from a private data center to an AWS private subnet via a VPN.](https://kodekloud.com/kk-media/image/upload/v1752859197/notes-assets/images/AWS-Certified-Developer-Associate-Public-vs-Private-Subnets/private-subnet-vpn-connection-aws.jpg)

> [!important]
> **Security Warning**
>
> Avoid exposing sensitive services directly to the internet. Ensure that critical components such as databases remain in private subnets to reduce the risk of unauthorized access.

## Summary

- **Public Subnets:**  
  Designed for resources that require direct internet access, such as web servers.
- **Private Subnets:**  
  Suitable for resources that should remain inaccessible from the internet, like databases and internal services.

Choosing the appropriate subnet type is essential for secure architecture design, balancing ease of access for public-facing services with robust protection for sensitive components.

By applying these principles, you can create a secure and scalable AWS network architecture tailored to your application needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/7a62a186-2571-4559-99e0-dc24433acacc)**
>
> Watch video content
