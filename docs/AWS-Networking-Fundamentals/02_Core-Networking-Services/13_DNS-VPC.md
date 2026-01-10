# DNS VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/DNS-VPC)

---

## Table of Contents

- DNS VPC
  - Domain Names for Private IP Addresses
  - AWS-Provided DNS Servers
  - VPC DNS Configuration Options
  - Summary
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# DNS VPC

Discover how DNS resolution operates within AWS Virtual Private Clouds (VPCs) and how to configure DNS settings for your EC2 instances for reliable name resolution.

## Domain Names for Private IP Addresses

When you launch an EC2 instance into a public or private subnet, AWS automatically assigns it a private IPv4 address (for example, 10.0.100.10). AWS also generates a DNS hostname that embeds this IP address. Clients can connect using either the private IP or the assigned DNS name.

![The image is a diagram showing DNS in VPCs within an AWS Cloud, featuring four VPCs with different IP address ranges. Each VPC is labeled with its CIDR block and a specific IP address.](https://kodekloud.com/kk-media/image/upload/v1752863199/notes-assets/images/AWS-Networking-Fundamentals-DNS-VPC/dns-vpcs-aws-diagram-ip-addresses.jpg)

## AWS-Provided DNS Servers

EC2 instances resolve these hostnames by querying the Amazon-provided DNS servers. AWS exposes two endpoints for DNS resolution within a VPC:

- Link-local address: 169.254.169.253 (accessible from all instances)
- VPC CIDR second IP: e.g., 10.10.0.2 in a 10.10.0.0/16 VPC or 10.20.0.2 in a 10.20.0.0/16 VPC

Instances can send queries to either endpoint interchangeably.

> [!important]
> **Note**
>
> In the default VPC, both DNS support and hostnames are enabled out of the box. Custom VPCs default to DNS support on and hostnames off.

## VPC DNS Configuration Options

AWS provides two VPC attributes that control DNS behavior:

| Option             | Description                                                  | Default Value                                |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------- |
| enableDnsSupport   | Enables DNS resolution via Amazon-provided DNS servers.      | true (all VPCs)                              |
| enableDnsHostnames | Assigns DNS hostnames to instances with public IP addresses. | false for custom VPCs, true for default VPCs |

You can modify these settings through the AWS Management Console, AWS CLI, or AWS SDKs.

![The image shows two DNS options: "enableDnsHostnames" and "enableDnsSupport," each in a colored square.](https://kodekloud.com/kk-media/image/upload/v1752863200/notes-assets/images/AWS-Networking-Fundamentals-DNS-VPC/dns-options-enable-dns-hostnames-support.jpg)

> [!important]
> **Warning**
>
> Disabling `enableDnsSupport` prevents any DNS resolution within the VPC, which can break applications that rely on domain names.

## Summary

- Private IPv4 addresses are automatically mapped to DNS hostnames.
- Amazon-provided DNS endpoints are available at 169.254.169.253 and the VPC CIDR’s second IP.
- Use `enableDnsHostnames` to toggle DNS hostname assignment for instances with public IPs.
- Use `enableDnsSupport` to enable or disable DNS resolution within the VPC.

![The image is a summary slide with four points about DNS settings in AWS VPCs, including private IP assignments, DNS server access, and DNS support options.](https://kodekloud.com/kk-media/image/upload/v1752863202/notes-assets/images/AWS-Networking-Fundamentals-DNS-VPC/dns-settings-aws-vpcs-summary-slide.jpg)

## Links and References

- [AWS VPC DNS Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html)
- [Amazon EC2 User Guide](https://docs.aws.amazon.com/ec2/latest/userguide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/9ea8c487-18ef-46f4-bb02-d420a7f898ed)**
>
> Watch video content
