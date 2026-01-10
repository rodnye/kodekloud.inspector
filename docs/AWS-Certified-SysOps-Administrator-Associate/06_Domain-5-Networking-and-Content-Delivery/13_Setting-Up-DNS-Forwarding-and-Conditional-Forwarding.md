# Setting Up DNS Forwarding and Conditional Forwarding - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Setting-Up-DNS-Forwarding-and-Conditional-Forwarding)

---

## Table of Contents

- Setting Up DNS Forwarding and Conditional Forwarding
  - Outbound Endpoint
  - Inbound Endpoint
  - Conditional Forwarding
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Setting Up DNS Forwarding and Conditional Forwarding

Welcome students!

In this article, we explore DNS forwarding and conditional forwarding in detail. Previously, we provided an overview of inbound and outbound DNS resolvers. Now, we'll delve deeper into how these resolvers function and how you can configure them to meet your network's needs.

Resolvers can be configured as AWS authoritative or external DNS authoritative servers. The query direction for endpoints is flexible, allowing you to set up resolvers to handle inbound traffic only, outbound traffic only, or both. For instance, you can configure DNS servers to manage both inbound and outbound traffic:

![The image illustrates the direction of DNS queries with three diagrams: "Inbound and Outbound," "Inbound Only," and "Outbound Only," showing different flow directions between servers and the cloud.](https://kodekloud.com/kk-media/image/upload/v1752860910/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-DNS-Forwarding-and-Conditional-Forwarding/dns-query-directions-diagrams.jpg)

Because the resolver is deployed within a VPC, the configuration is straightforward. You simply select the resolver type and set the corresponding rules.

> [!important]
> **Key Point**
>
> Make sure to correctly configure your VPC, subnets, security groups, and NACLs when setting up DNS endpoints.

## Outbound Endpoint

The outbound endpoint configuration enables your resolver to use an external source for resolving DNS queries. Below is an overview of the steps required:

![The image is a diagram illustrating the configuration of an outbound endpoint in a VPC, showing subnets in different availability zones and security groups. It includes steps for choosing a VPC, selecting subnets, attaching a security group, and assigning IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752860912/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-DNS-Forwarding-and-Conditional-Forwarding/vpc-outbound-endpoint-diagram.jpg)

Follow these steps to configure the outbound endpoint:

1.  Select the VPC where the resolver endpoint will reside.
2.  Choose one or more subnets to ensure high availability.
3.  Attach an appropriate security group to the network interface. Ensure that port 53 is permitted for outbound traffic.
4.  Confirm that the endpoint is assigned an internal or public IP address based on your setup.

For example, when queries originating within your VPC—for instance, for jo.example.com—need to be resolved externally, you must establish rules to forward these DNS queries to a target IP address. This target might be reached via VPN or Direct Connect. The forwarding rules direct the DNS queries from your VPC to an external network.

![The image is a diagram showing a DNS setup within a VPC in the AWS region us-west-1, featuring outbound endpoints, availability zones, and forwarding rules for specific domains. It illustrates the flow of DNS requests from a server to a resolver within the VPC.](https://kodekloud.com/kk-media/image/upload/v1752860913/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-DNS-Forwarding-and-Conditional-Forwarding/dns-setup-vpc-aws-diagram.jpg)

There are three types of resolvers to keep in mind:

- Inbound and outbound resolver (handles both directions)
- Outbound resolver only
- Inbound resolver only

## Inbound Endpoint

Next, consider the inbound endpoint, which allows an external DNS server to forward queries for specific domain names to an AWS DNS resolver endpoint.

![The image illustrates the configuration of an inbound endpoint within a VPC, showing subnets in different availability zones and associated security groups. It includes steps for choosing the VPC, selecting subnets, attaching a security group, and assigning IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752860914/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-DNS-Forwarding-and-Conditional-Forwarding/vpc-inbound-endpoint-configuration.jpg)

To set up an inbound endpoint, follow these guidelines:

1.  Deploy the inbound endpoint within your chosen VPC.
2.  Select one or more subnets to maintain high availability.
3.  Attach a security group that permits the required traffic (typically port 53).
4.  Ensure that DNS queries from your on-premises network—forwarded over VPN, Direct Connect, or through a public connection (if configured)—are routed to this AWS endpoint.

Consider a scenario where your corporate DNS server forwards queries for certain domains into your VPC. The diagram below illustrates how an inbound endpoint is set up in the us-west-1 region to achieve this.

![The image is a diagram illustrating an inbound endpoint setup within a VPC in the "us-west-1" region, showing connections from an external network to VPC subnets and a resolver with rules.](https://kodekloud.com/kk-media/image/upload/v1752860916/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-DNS-Forwarding-and-Conditional-Forwarding/inbound-endpoint-vpc-diagram-us-west-1.jpg)

## Conditional Forwarding

Conditional forwarding provides an additional layer of flexibility by allowing you to apply different forwarding rules based on specific conditions. This means you can forward DNS queries outbound to a corporate network or inbound to AWS depending on the domain name or chosen DNS server.

![The image illustrates a flowchart for conditional forwarding of DNS queries from a VPC, showing two paths: one for matching rules that forwards to a target DNS, and another for no match that uses the default AWS public DNS resolver.](https://kodekloud.com/kk-media/image/upload/v1752860921/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-DNS-Forwarding-and-Conditional-Forwarding/dns-query-conditional-forwarding-flowchart.jpg)

Here’s how conditional forwarding works:

- Define a rule that specifies conditions (for example, matching a particular domain name or IP address) for the DNS queries.
- If the condition is satisfied, forward the query to the designated target DNS server—this may be on-premises or in another network.
- If the condition is not met, the default forwarding behavior is used.

For instance, in a conditional forwarding scenario with an outbound endpoint:

![The image illustrates a diagram of conditional forwarding, showing an outbound endpoint connected to a resolver with forwarding rules for specific domains. It includes target DNS servers for "jyo.example.com" and "ric.example.com."](https://kodekloud.com/kk-media/image/upload/v1752860925/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Setting-Up-DNS-Forwarding-and-Conditional-Forwarding/conditional-forwarding-diagram-dns.jpg)

In this configuration, DNS queries originating from your VPC are selectively forwarded based on the established rules. Often, a corporate DNS server is configured to be authoritative when using an outbound endpoint, while an inbound endpoint treats AWS as the authoritative source.

> [!important]
> **Pro Tip**
>
> Both inbound and outbound endpoints for Route 53 resolvers are critical topics for certification exams. Ensure you understand and practice these configurations thoroughly.

Watch the demo, complete the lab exercises, and practice these configurations to reinforce your knowledge.

Catch you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/e87a6f94-9205-4ef3-82f5-20509c9e111f)**
>
> Watch video content
