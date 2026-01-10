# Route 53 Resolvers Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Route-53-Resolvers-Introduction)

---

## Table of Contents

- Route 53 Resolvers Introduction
  - Types of Route 53 Resolver Endpoints
  - DNS Query Forwarding Flow
  - Watch Video
    - Inbound Resolver
    - Outbound Resolver

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Route 53 Resolvers Introduction

Welcome back! In this lesson, we dive into AWS Route 53 resolvers—an essential component for DNS resolution and routing within your AWS environment. Route 53 resolvers not only translate domain names into IP addresses but also empower you to control DNS behavior for both internal and external sources.

Route 53 resolvers manage recursive DNS queries originating from your Virtual Private Clouds (VPCs). This allows resources hosted privately within your VPCs, as well as public resources on the internet, to efficiently resolve domain names. Moreover, you can forward queries to either external or internal DNS servers. For example, if you have an on-premises DNS server handling internal queries, this setup supports a hybrid architecture that seamlessly integrates on-premises networks with AWS-hosted VPCs.

![The image lists key features of Route 53 Resolver, including recursive DNS resolution, DNS forwarding, conditional forwarding, integration with VPCs, and on-premises connectivity.](https://kodekloud.com/kk-media/image/upload/v1752860888/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Route-53-Resolvers-Introduction/route-53-resolver-features-list.jpg)

## Types of Route 53 Resolver Endpoints

There are two types of endpoints in Route 53 resolvers: **inbound** and **outbound**.

| Endpoint Type | Use Case                                                                                    | Example                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Inbound       | DNS queries from external (on-premises) networks directed toward AWS resources              | An on-premises DNS forwarder sends queries to an inbound endpoint in AWS                           |
| Outbound      | DNS queries originating from within AWS that need to be forwarded to an external DNS server | A VPC instance forwards a query to an external authoritative DNS server using an outbound endpoint |

### Inbound Resolver

An inbound resolver processes DNS queries coming from external networks into your VPC. For instance, when an on-premises DNS forwarder is configured to send queries to an inbound endpoint, Route 53 resolver applies specific rules to handle these queries.

![The image is a diagram showing the flow of data from "External Sources" to "AWS Resolver" labeled as "Inbound."](https://kodekloud.com/kk-media/image/upload/v1752860890/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Route-53-Resolvers-Introduction/data-flow-external-sources-aws-resolver.jpg)

The following diagram illustrates an inbound endpoint setup within a VPC in the "us-west-1" region. It shows how network traffic from your on-premises environment is directed into your VPC subnets before reaching the resolver managing the defined rules.

![The image is a diagram illustrating an inbound endpoint setup within a VPC in the "us-west-1" region, showing connections from a network to VPC subnets and a resolver with rules.](https://kodekloud.com/kk-media/image/upload/v1752860891/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Route-53-Resolvers-Introduction/inbound-endpoint-vpc-diagram-us-west-1.jpg)

### Outbound Resolver

In contrast, an outbound resolver manages DNS queries that originate from within your VPC and must be forwarded externally. When a network interface in your VPC triggers a DNS query from an instance, the outbound endpoint ensures the query reaches the appropriate external DNS server that provides authoritative responses.

![The image illustrates an outbound endpoint setup in a VPC within the us-west-1 region, showing DNS forwarding rules for specific domains to other VPCs. It includes components like VPC subnets, availability zones, and a resolver with forwarding rules.](https://kodekloud.com/kk-media/image/upload/v1752860892/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Route-53-Resolvers-Introduction/vpc-outbound-endpoint-setup-dns.jpg)

## DNS Query Forwarding Flow

Let's summarize the flow:

- **Inbound Endpoints:** Allow DNS queries from an external network (e.g., your corporate network) to enter AWS, where Route 53 resolvers apply your defined rules.
- **Outbound Endpoints:** Enable DNS queries originating from within AWS to be forwarded to an external DNS server, treating that external server as authoritative for the specific domain.

The flowchart below illustrates the process from an on-premises client all the way to the Route 53 resolver endpoints:

![The image is a flowchart illustrating the process of forwarding DNS queries from an on-premise client to Route 53 resolver endpoints, involving a forwarder, inbound endpoint, and Amazon-provided DNS server.](https://kodekloud.com/kk-media/image/upload/v1752860894/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Route-53-Resolvers-Introduction/dns-query-forwarding-flowchart.jpg)

In a practical scenario, if an instance in your VPC needs to resolve a corporate domain, it contacts the local Amazon DNS server. The outbound endpoint then applies the necessary forwarding rules to redirect the query to the designated external DNS server. This ensures:

- Inbound endpoints serve queries from external networks within AWS.
- Outbound endpoints forward internal AWS queries to an external authoritative DNS server.

![The image is a diagram illustrating the Route 53 Resolver Endpoint, showing how DNS queries are forwarded from VPCs to an on-premise network. It includes components like a client, name servers, an outbound endpoint, an instance, a resolver, and a forwarder.](https://kodekloud.com/kk-media/image/upload/v1752860895/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Route-53-Resolvers-Introduction/route-53-resolver-endpoint-diagram.jpg)

> [!important]
> **Key Takeaways**
>
> - The term **"Inbound"** applies to DNS queries originating from external (corporate) networks being resolved within AWS.
> - The term **"Outbound"** applies to DNS queries originating in AWS that require resolution via an external authoritative DNS server.

Understanding these distinctions is crucial, especially if you're preparing for an AWS certification exam. Mastering how Route 53 resolvers work will help you efficiently manage DNS resolution across both AWS and on-premises networks.

Enjoy the rest of the lesson and happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/640286ba-c3b8-42db-ab6e-268714a53829)**
>
> Watch video content
