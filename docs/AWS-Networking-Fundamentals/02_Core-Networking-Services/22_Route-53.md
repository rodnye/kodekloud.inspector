# Route 53 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Route-53)

---

## Table of Contents

- Route 53
  - Key Features
  - Domain Registration and DNS Management
  - Hosted Zones
  - How It Works: Step by Step
  - Common DNS Record Types
  - Summary
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Route 53

Amazon Route 53 is AWS’s scalable and highly available Domain Name System (DNS) web service and domain registrar. With Route 53, you can register new domains, manage DNS records for routing internet traffic, and leverage a global network of DNS servers.

## Key Features

- Domain registration and management as your registrar
- DNS record configuration for EC2, load balancers, S3 static websites, and more
- Highly available, low-latency global DNS resolution

## Domain Registration and DNS Management

When you register a domain (e.g., `example.com`) through Route 53, AWS serves as your domain registrar. You can then configure all DNS records directly in the AWS Management Console, AWS CLI, or through the API.

> [!important]
> **Note**
>
> If you register the domain with Route 53, name servers are automatically set. For external domains, update the NS records at your existing registrar to point to the Route 53 name servers.

## Hosted Zones

A **hosted zone** in Route 53 is a container for DNS records related to a specific domain or subdomain. AWS allocates four authoritative name servers for each hosted zone.

| Hosted Zone Type    | Scope                       | Use Case                            |
| ------------------- | --------------------------- | ----------------------------------- |
| Public Hosted Zone  | Global (Internet)           | Serve public DNS queries            |
| Private Hosted Zone | VPC (Virtual Private Cloud) | Internal DNS resolution within VPCs |

![The image illustrates the concept of hosted zones in Amazon Route 53, showing how DNS records are managed for different domains, each allocated four nameservers by AWS.](https://kodekloud.com/kk-media/image/upload/v1752863310/notes-assets/images/AWS-Networking-Fundamentals-Route-53/amazon-route53-hosted-zones-dns-records.jpg)

## How It Works: Step by Step

1.  Create a hosted zone for your domain (e.g., `fastcars.com`).
2.  AWS assigns four name servers to the hosted zone.
3.  Define DNS records (A, AAAA, CNAME, MX, TXT, etc.) in the hosted zone.
4.  Verify that your domain’s NS records at the registrar match the assigned name servers.

After these steps, Route 53’s global network of name servers will respond to DNS queries for your domain.

## Common DNS Record Types

| Record Type | Description                             | Example                                               |
| ----------- | --------------------------------------- | ----------------------------------------------------- |
| A           | Maps a domain to an IPv4 address        | `www -> 192.0.2.44`                                   |
| AAAA        | Maps a domain to an IPv6 address        | `www -> 2001:0db8:85a3:0000:0000:8a2e:0370:7334`      |
| CNAME       | Aliases one name to another             | `blog -> blog.example.com`                            |
| MX          | Mail exchange servers for email routing | `example.com MX 10 mail.example.com`                  |
| TXT         | Text records for verification/DNSSEC    | `example.com TXT "v=spf1 include:amazonses.com -all"` |

## Summary

Route 53 offers:

- Fully managed DNS service for end-user request routing
- Domain registration with AWS as the registrar
- Global DNS infrastructure for low-latency queries
- Hosted zones for organizing DNS records per domain

![The image is a summary slide highlighting three points about AWS Route 53: it's a managed DNS service, a global service, and hosted zones are a collection of DNS.](https://kodekloud.com/kk-media/image/upload/v1752863311/notes-assets/images/AWS-Networking-Fundamentals-Route-53/aws-route-53-dns-summary-slide.jpg)

## Links and References

- [Amazon Route 53 Documentation](https://docs.aws.amazon.com/Route53/)
- [Amazon Route 53 Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
- [AWS DNS Concepts and FAQs](https://aws.amazon.com/route53/faqs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/fd4709e4-52c9-4d2b-861d-164e42ff25de)**
>
> Watch video content
