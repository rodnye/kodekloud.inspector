# Route53 Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/Route53-Basics)

---

## Table of Contents

- Route53 Basics
  - Hosted Zones and Domain Management
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# Route53 Basics

In this article, we explore AWS Route 53, a fully managed domain name service designed to simplify DNS management and domain registration.

Route 53 offers several key functions:

1.  It serves as a domain registrar. You can purchase domain names directly—similar to platforms like GoDaddy or Namecheap. For instance, if you want to register a domain such as kodekloud.com, you can do so through Route 53.
2.  It provides comprehensive DNS record management through a user-friendly console.
3.  It is a global service, ensuring your DNS management is not constrained by any specific AWS region.

![The image describes AWS Route 53 as a managed DNS service, a domain registrar similar to GoDaddy and Namecheap, and a global service not specific to a region.](https://kodekloud.com/kk-media/image/upload/v1752858227/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics/aws-route-53-dns-service.jpg)

> [!important]
> **Key Point**
>
> Route 53 integrates domain registration and DNS management, streamlining the process for developers and IT professionals.

## Hosted Zones and Domain Management

A fundamental concept in Route 53 is the hosted zone. When you want Route 53 to manage the DNS for your domain—say, kodekloud.com—you create a hosted zone. Think of a hosted zone as a container that stores all the DNS records and rules associated with a particular domain.

Each time you create a hosted zone, AWS automatically assigns four dedicated name servers to that zone. This process is repeated for every domain you manage. For example, if you register another domain such as fastcars.com, a unique hosted zone is created with its own set of four name servers to handle DNS record management.

![The image illustrates the concept of hosted zones in Amazon Route 53, showing how DNS records are organized and allocated to nameservers by AWS for different domains.](https://kodekloud.com/kk-media/image/upload/v1752858228/notes-assets/images/AWS-Certified-Developer-Associate-Route53-Basics/amazon-route53-hosted-zones-dns.jpg)

> [!important]
> **Remember**
>
> Each hosted zone is independent, ensuring that the DNS management for one domain does not affect another.

## Summary

AWS Route 53 is a globally available DNS management service that functions both as a domain registrar and as a comprehensive DNS record manager. By using hosted zones, Route 53 ensures that each domain has dedicated name servers and specific rules tailored to its DNS requirements. This integration of domain registration and DNS management makes Route 53 a powerful tool for maintaining efficient and reliable web presence.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/eaa94a39-7a20-4cd4-adb5-4058aec10b9a)**
>
> Watch video content
