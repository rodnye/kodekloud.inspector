# Elastic IP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Elastic-IP)

---

## Table of Contents

- Elastic IP
  - What Are Elastic IPs?
  - Pricing Structure
  - Regional Specificity and IP Origins
  - How to Use an Elastic IP
  - Watch Video
    - Key Benefits

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Elastic IP

In this article, we explore AWS Elastic IPs and their critical role in managing EC2 instances. Understanding the differences between dynamic public IPs and static Elastic IPs can help maintain a reliable connection for your applications.

When an EC2 instance is deployed in a public subnet, it automatically receives a public IP address (for example, 1.1.1.1). However, this public IP is temporary; AWS does not assign permanent ownership to you. Consequently, if the instance is rebooted, it might receive a different public IP—resulting in potential disruption for applications relying on a consistent backend address.

> [!important]
> **Static vs Dynamic IPs**
>
> A static Elastic IP remains constant, ensuring that even if your EC2 instance is rebooted or relocated to a different physical server, the IP address stays the same.

## What Are Elastic IPs?

Elastic IP addresses are static IPv4 addresses allocated to your AWS account. Once allocated, the address is reserved exclusively for your use and cannot be allocated to others. You can then associate an Elastic IP with an EC2 instance so that it keeps the same IP address, regardless of reboots or host migration.

### Key Benefits

- **Consistent Connectivity:** End users always connect to the same IP, improving reliability.
- **Flexibility in Maintenance:** You can easily reassign the Elastic IP from one server to another during scheduled maintenance or unexpected server issues.

The diagram below shows how an Elastic IP (1.1.1.1) is reassigned from Server A to Server B, ensuring uninterrupted service:

![The image illustrates an AWS Cloud setup with two servers, Server A and Server B, where an Elastic IP (1.1.1.1) is reassigned from Server A to Server B.](https://kodekloud.com/kk-media/image/upload/v1752865550/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-IP/aws-cloud-setup-elastic-ip-reassign.jpg)

## Pricing Structure

Elastic IPs assigned to a running instance incur no additional cost. However, additional considerations include:

- Associating extra Elastic IPs with an instance.
- Reserving an Elastic IP without associating it.

Both scenarios will result in a small hourly fee. The following diagram outlines the pricing model, showing that additional or unused reserved Elastic IPs are billed per hour:

![The image illustrates "Elastic IP Pricing" with a diagram showing multiple IPs, where additional IPs are charged per hour.](https://kodekloud.com/kk-media/image/upload/v1752865551/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-IP/elastic-ip-pricing-diagram.jpg)

> [!important]
> **Cost Management**
>
> Ensure you manage and monitor your Elastic IP usage to avoid unexpected charges, especially for unused or extra reserved IPs.

## Regional Specificity and IP Origins

Elastic IPs are tied to specific AWS regions and cannot be transferred across regions. They can be associated only with EC2 instances within the same region. Additionally, these IP addresses are sourced either from AWS’s pool of IPv4 addresses or from a custom pool you bring to your account. The infographic below reinforces these points:

![The image is an infographic about Elastic IPs, highlighting that they are specific to a region and come from Amazon's pool of IPv4 addresses.](https://kodekloud.com/kk-media/image/upload/v1752865553/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-IP/elastic-ips-infographic-amazon-ipv4.jpg)

## How to Use an Elastic IP

To take advantage of Elastic IPs:

1.  Allocate an Elastic IP to your AWS account.
2.  Associate the allocated IP with your EC2 instance or network interface.

In summary, while public IP addresses assigned to EC2 instances are dynamic and can change, Elastic IPs offer a static solution that ensures a consistent point of entry for your applications. Remember, Elastic IPs are region-specific and must be allocated and associated within the same region.

![The image is a summary slide explaining the differences between public IPs and Elastic IPs, highlighting that public IPs are not static, while Elastic IPs are static IPv4 addresses. It also notes the process of allocating and associating an Elastic IP with an instance or network interface.](https://kodekloud.com/kk-media/image/upload/v1752865554/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-IP/public-vs-elastic-ips-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/b346d1e9-2d70-40e0-8d4a-16f364f230a3)**
>
> Watch video content
