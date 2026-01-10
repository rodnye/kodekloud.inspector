# Route 53 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Route-53)

---

## Table of Contents

- Route 53
  - What Is Route 53?
  - Hosted Zones
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Route 53

In this lesson, we explore AWS Route 53, a fully managed domain name service (DNS) provided by AWS.

## What Is Route 53?

AWS Route 53 is a robust and scalable DNS service that facilitates several critical functions:

- It acts as a domain registrar, allowing you to purchase domain names much like popular services such as GoDaddy and Namecheap. For example, you can register a domain like KodeKloud.com directly through Route 53.
- It manages all DNS records for your domains, so once you register a domain, you can easily configure its DNS settings within Route 53.
- Being a global service, Route 53 is not limited to a single region, ensuring worldwide accessibility.

## Hosted Zones

A fundamental concept in Route 53 is the hosted zone. A hosted zone is a container for all the DNS records associated with a specific domain (e.g., KodeKloud.com). When you create a hosted zone:

- AWS reserves four dedicated name servers for that domain.
- For any additional domain, such as fastcars.com, AWS allocates another distinct set of four name servers to manage its DNS records and rules.

![The image illustrates the concept of hosted zones in Amazon Route 53, showing how DNS records are organized and allocated four nameservers by AWS for different domains.](https://kodekloud.com/kk-media/image/upload/v1752865658/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-53/amazon-route53-hosted-zones-dns.jpg)

> [!important]
> **Key Highlights**
>
> - AWS Route 53 functions as both a DNS service and a domain registrar.
> - It delivers global coverage and is not confined to any specific region.
> - Hosted zones provide a structured environment where each domain receives four dedicated name servers for optimal DNS management.

## Summary

- AWS Route 53 is a fully managed DNS service and domain registrar.
- It operates at a global level.
- Hosted zones are collections of DNS records for specific domains, with each hosted zone having four dedicated name servers reserved by AWS.

In the next section, we will provide a demonstration to illustrate how to set up and manage hosted zones effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/24f5ea14-bea1-4d8c-9a90-1f344027b3fd)**
>
> Watch video content
