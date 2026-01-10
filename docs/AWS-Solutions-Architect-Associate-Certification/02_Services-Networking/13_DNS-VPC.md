# DNS VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/DNS-VPC)

---

## Table of Contents

- DNS VPC
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# DNS VPC

In this lesson, we explore how DNS works within an AWS Virtual Private Cloud (VPC) and examine how domain names are resolved for instances in both private and public subnets.

When you deploy an [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) within a subnet, it automatically receives a private IP address regardless of the subnet type. Every private IP address assigned to an instance is also given a corresponding DNS entry by default. For example, if an instance in a public subnet is assigned the IP address 10.0.100.10, AWS automatically creates a domain name that incorporates this IP address.

![The image illustrates a network setup with a private subnet containing a server and a public subnet containing an instance, both with specific IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752865511/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DNS-VPC/network-setup-private-public-subnets.jpg)

Resources within your VPC can access an instance either using its IP address (e.g., 10.0.100.10) or its assigned domain name. Remember, the automatic DNS assignment is applied exclusively to private IP addresses by default.

> [!important]
> **DNS Query Methods**
>
> To resolve these domain names, AWS provides dedicated DNS servers. Each resource in the VPC can query these servers using one of two methods:
>
> 1.  Query the special IP 169.254.169.253, which is accessible by all resources in the VPC.
> 2.  Query the second IP address in your VPC CIDR block. For instance, if your VPC uses the CIDR block 10.10.0.0/16, use 10.10.0.2 as the DNS server. Similarly, for a VPC with CIDR block 10.20.0.0/16, the DNS server is located at 10.20.0.2.

![The image is a diagram showing DNS configurations in AWS VPCs, with four VPCs each having different IP address ranges.](https://kodekloud.com/kk-media/image/upload/v1752865513/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DNS-VPC/dns-configurations-aws-vpcs-diagram.jpg)

When creating a custom VPC, pay attention to the following two settings that directly impact DNS functionality:

1.  **Enable DNS Hostnames:**  
    By default, only private IP addresses receive a DNS entry. To assign public DNS hostnames to instances with public IP addresses, ensure the "enable DNS hostnames" option is activated during VPC creation. This option is crucial for instances that need to be accessed publicly.
2.  **Enable DNS Support:**  
    This setting determines whether the VPC supports DNS resolution using Amazon-provided DNS servers. When enabled, DNS queries sent to the AWS DNS servers (either via the second IP in the VPC CIDR block or the special IP 169.254.169.253) will be resolved successfully. Disabling this option prevents DNS queries from reaching these servers.

> [!important]
> **Summary of DNS Key Points**
>
> - **Automatic DNS Entries:** Private IP addresses are automatically mapped to DNS entries.
> - **AWS DNS Server Access:** The DNS servers can be accessed at the second IP in the VPC CIDR block or via 169.254.169.253.
> - **Enable DNS Hostnames:** Necessary to assign public DNS hostnames to instances with public IP addresses.
> - **Enable DNS Support:** Must be active for the VPC to resolve DNS queries using AWS-provided servers.

![The image is a summary slide with four points about DNS settings in AWS, including private IP assignments, AWS DNS server access, and VPC DNS support options. The background is a gradient of blue and green.](https://kodekloud.com/kk-media/image/upload/v1752865514/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DNS-VPC/dns-settings-aws-summary-slide.jpg)

For more information on AWS networking and DNS configurations, refer to the [AWS Documentation](https://aws.amazon.com/documentation/) and the [Understanding VPC DNS](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html) guide.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/469cdde4-c858-493d-bfcf-a8a8fdf27b49)**
>
> Watch video content
