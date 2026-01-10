# Configuring Domain Names Hosted Zones and Records - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Configuring-Domain-Names-Hosted-Zones-and-Records)

---

## Table of Contents

- Configuring Domain Names Hosted Zones and Records
  - Hosted Zones
  - DNS Record Types
  - Watch Video
    - Types of Hosted Zones

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Configuring Domain Names Hosted Zones and Records

In this lesson, we delve into the fundamentals of Amazon Route 53, illustrating how to configure domain names, hosted zones, and various DNS records. We will guide you through key concepts, beginning with hosted zones and then moving on to the different types of record configurations.

## Hosted Zones

A hosted zone in Route 53 is a container that stores the DNS records for a specific domain and all its subdomains. It acts as a management boundary for routing the traffic for a domain. Hosted zones come in two flavors:

- **Public Hosted Zones**: Designed for domains with internet-accessible records.
- **Private Hosted Zones**: Configured for use within specific Amazon VPCs or corporate networks, ideal for internal name resolution.

![The image illustrates the concept of hosted zones in Amazon Route 53, showing how DNS records are managed for domains like "Kodekloud.com" and "fastcars.com," with each hosted zone allocated four nameservers by AWS.](https://kodekloud.com/kk-media/image/upload/v1752860787/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Domain-Names-Hosted-Zones-and-Records/amazon-route53-hosted-zones-dns.jpg)

Hosted zones empower you to specify detailed routing policies and configure a variety of DNS records. They integrate seamlessly with other AWS services, such as load balancers, CloudFront, and S3, ensuring efficient and coherent networking across your architecture.

![The image outlines the key features of hosted zones, including domain management, DNS records, routing policies, and integration with other AWS services.](https://kodekloud.com/kk-media/image/upload/v1752860788/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Domain-Names-Hosted-Zones-and-Records/hosted-zones-key-features-aws.jpg)

### Types of Hosted Zones

![The image describes two types of hosted zones: Public Hosted Zone, used for internet-accessible domains, and Private Hosted Zone, used for domains accessible within specified Amazon VPCs.](https://kodekloud.com/kk-media/image/upload/v1752860789/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Domain-Names-Hosted-Zones-and-Records/hosted-zones-public-private-diagram.jpg)

- **Public Hosted Zone**: Suitable for websites and applications intended for public access.
- **Private Hosted Zone**: Ideal for internal networks, allowing you to segregate internal traffic from public DNS queries.

The domain name structure is composed of the domain itself, its hosted zone, and the individual DNS records. For instance, when constructing a domain like sub.example.com, note that the full record length must not exceed 255 bytes—a key detail often highlighted in exam scenarios.

> [!important]
> **Note**
>
> You can configure separate public and private hosted zones for the same domain, enabling different IP resolutions based on whether the query originates from within your network or from the public internet.

![The image illustrates the concept of public and private hosted zones using Amazon Route 53, showing connections between the internet, AWS Custom VPC, and various AWS services.](https://kodekloud.com/kk-media/image/upload/v1752860791/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Domain-Names-Hosted-Zones-and-Records/route-53-public-private-zones.jpg)

## DNS Record Types

Once you have a hosted zone, you can define how your domain resolves by setting up various DNS record types. Here is an overview of the common records used in Route 53:

- **A Record**: Maps a domain or subdomain (e.g., example.com or sub.example.com) to an IPv4 address.
- **AAAA Record**: Maps a domain or subdomain to an IPv6 address.
- **CNAME Record**: Creates an alias from one domain name to another, useful for domain redirection.
- **MX Record**: Identifies the mail servers responsible for handling email for the domain.
- **TXT Record**: Used for domain verification and authentication purposes (commonly required by services like Google Workspace or Office 365).
- **SRV Record**: Indicates the locations of specific services, such as VoIP or messaging servers.
- **PTR Record**: Facilitates reverse DNS lookups, mapping an IP address back to a domain name.

![The image is an infographic describing different types of DNS records, including A, AAAA, CNAME, MX, TXT, and SRV records, with brief explanations of each.](https://kodekloud.com/kk-media/image/upload/v1752860792/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Domain-Names-Hosted-Zones-and-Records/dns-records-infographic-explained.jpg)

When configuring DNS records—for example, using an A record for www.example.com—it is important to set the Time to Live (TTL). The TTL determines how long DNS servers should cache a record before fetching an updated version. While a common value is 3600 seconds, do note that some DNS resolvers might cache the record longer than specified.

Consider a scenario where an A record maps to an IP address like 192.0.2.1, and an AAAA record maps to an IPv6 address such as 2001:0db8:0000:0000:0000:ff00:0042:8329, both with a TTL of 3600 seconds. In essence, DNS functions as a mapping system where the key is the domain name and the value is its corresponding IP or server details.

![The image shows components of DNS records, including examples of an A record and an AAAA record with their respective names, types, TTL, and values.](https://kodekloud.com/kk-media/image/upload/v1752860794/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Domain-Names-Hosted-Zones-and-Records/dns-records-a-aaaa-components.jpg)

> [!important]
> **Remember**
>
> The DNS resolution process is universal, serving as the backbone for how domains are linked to their resources across the internet—not just within AWS.

In the upcoming labs and demos, you will have the opportunity to apply these configurations in real-world scenarios. Continue practicing and experimenting with these settings to reinforce your understanding and proficiency.

Happy learning, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/415e6ddb-6d82-4bde-bfa0-a7c3856b3a3e)**
>
> Watch video content
