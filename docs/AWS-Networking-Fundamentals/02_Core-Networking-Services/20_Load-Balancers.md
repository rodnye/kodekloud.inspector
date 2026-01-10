# Load Balancers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Load-Balancers)

---

## Table of Contents

- Load Balancers
  - Why Load Balancers?
  - Types of AWS Load Balancers
  - ELB Architecture in a VPC
  - Cross-Zone Load Balancing
  - Public vs. Private Load Balancers
  - Example: Multi-Tier Application
  - Listeners and Target Groups
  - Summary
  - References
  - Watch Video
    - 1. Classic Load Balancer (CLB)
    - 2. Application Load Balancer (ALB)
    - 3. Network Load Balancer (NLB)
      - ALB Traffic Flow and SSL Termination

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Load Balancers

In this lesson, you'll explore AWS Elastic Load Balancers (ELB) and learn how to configure them for high availability, auto-scaling, and fault tolerance in your cloud environments.

---

## Why Load Balancers?

Imagine hosting your web application on a single EC2 instance at public IP `1.1.1.1`. If that instance fails, your site goes offline. To add redundancy, you deploy instances across multiple Availability Zones:

- EC2 A: 1.1.1.1
- EC2 B: 2.2.2.2
- EC2 C: 3.3.3.3

Which IP address should your users access? Manually switching between IPs is cumbersome and exposes internal details. A load balancer provides a single, stable endpoint that intelligently distributes requests to healthy backends.

![The image illustrates an Elastic Load Balancer (ELB) in AWS, showing a user querying which IP to send data to, with three availability zones each having a different IP address.](https://kodekloud.com/kk-media/image/upload/v1752863260/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/elastic-load-balancer-aws-diagram.jpg)

Once deployed, the ELB abstracts individual instance IPs and automatically routes traffic:

![The image illustrates an Elastic Load Balancer (ELB) setup in AWS Cloud, showing how traffic is distributed from a single IP address to multiple availability zones with different IPs.](https://kodekloud.com/kk-media/image/upload/v1752863261/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/aws-elb-traffic-distribution-diagram.jpg)

---

## Types of AWS Load Balancers

AWS provides three managed load-balancing options to suit different workloads:

| Load Balancer Type              | OSI Layer | Protocols               | SSL Termination       | Use Case                         |
| ------------------------------- | --------- | ----------------------- | --------------------- | -------------------------------- |
| Classic Load Balancer (CLB)     | 4 & 7     | HTTP, HTTPS, TCP, SSL   | Yes (one certificate) | Legacy workloads                 |
| Application Load Balancer (ALB) | 7         | HTTP, HTTPS, WebSockets | Yes (multiple)        | URL/path-based routing           |
| Network Load Balancer (NLB)     | 4         | TCP, UDP                | No                    | Ultra-low latency transport load |

### 1\. Classic Load Balancer (CLB)

The original AWS load balancer supports HTTP, HTTPS, TCP, and SSL but lacks modern features like multiple certificates and advanced routing.

> [!important]
> **Warning**
>
> Classic Load Balancer is considered legacy. AWS recommends using Application Load Balancer (ALB) or Network Load Balancer (NLB) for new deployments.

![The image is an illustration of the Classic Load Balancer (CLB) by AWS, noting it was the first load balancer introduced by AWS and is not recommended for use. It includes a simple diagram showing the CLB distributing traffic to two applications.](https://kodekloud.com/kk-media/image/upload/v1752863262/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/aws-classic-load-balancer-diagram.jpg)

### 2\. Application Load Balancer (ALB)

ALBs operate at the application layer (Layer 7) and excel at HTTP, HTTPS, and WebSocket traffic. They provide content-based routing and host/path-based rules:

- URL path and host header conditions
- HTTP methods, headers, query strings, source IP
- HTTP redirects and custom responses
- Application-level health checks

![The image is an infographic about Application Load Balancer (ALB), highlighting its support for HTTP/HTTPS/WebSockets, functioning at the application layer (layer 7), and request forwarding based on URL path conditions, host domain, and HTTP fields.](https://kodekloud.com/kk-media/image/upload/v1752863263/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/alb-infographic-http-https-websockets.jpg)

![The image is an infographic about Application Load Balancer (ALB), highlighting its support for HTTP/HTTPS/WebSockets, functioning at the application layer, request forwarding based on specific conditions, and performing application-specific health checks.](https://kodekloud.com/kk-media/image/upload/v1752863264/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/alb-infographic-http-https-websockets-2.jpg)

#### ALB Traffic Flow and SSL Termination

Application Load Balancers terminate SSL/TLS connections, decrypting traffic at the edge. Your SSL certificates reside on the ALB, and you can choose to forward decrypted traffic to backends over HTTP or re-encrypt using HTTPS.

> [!important]
> **Note**
>
> Ensure your backend instances are configured to handle re-encrypted HTTPS if you require end-to-end encryption.

![The image illustrates the flow of data through an Application Load Balancer (ALB), showing SSL/TLS termination at the ALB and the transition from encrypted to unencrypted data.](https://kodekloud.com/kk-media/image/upload/v1752863265/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/alb-data-flow-ssl-termination.jpg)

### 3\. Network Load Balancer (NLB)

Operating at the transport layer (Layer 4), NLBs handle millions of requests per second with ultra-low latency. They forward TCP/UDP connections directly to targets without TLS termination.

- High throughput and low latency
- Static IP support and Elastic IP attachment
- Basic transport-level health checks (TCP)

![The image is an informational graphic about Network Load Balancers (NLB), highlighting features such as load balancing traffic based on TCP/UDP, suitability for non-HTTP/HTTPS applications, speed, basic health checks, and TCP connection forwarding.](https://kodekloud.com/kk-media/image/upload/v1752863266/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/network-load-balancers-features-graphic.jpg)

---

## ELB Architecture in a VPC

When you create an ELB, AWS launches a load-balancer node in each selected subnet (one per AZ). Clients resolve the ELB’s DNS name, and AWS distributes traffic across all nodes, which in turn forward requests to registered targets.

![The image illustrates the architecture of Elastic Load Balancers within a Virtual Private Cloud (VPC), showing public and private subnets across two availability zones. It includes a DNS record creation for the ELB and load balancer nodes in each public subnet.](https://kodekloud.com/kk-media/image/upload/v1752863267/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/elastic-load-balancer-vpc-architecture.jpg)

---

## Cross-Zone Load Balancing

By default, each ELB node only routes traffic to targets in its own Availability Zone, which can cause uneven distribution if instance counts differ. Enabling **cross-zone load balancing** ensures each node spreads requests across all zones evenly.

> [!important]
> **Note**
>
> Cross-zone load balancing can improve utilization but may incur additional inter-AZ data transfer charges.

![The image illustrates a cross-zone load balancing setup within a Virtual Private Cloud (VPC), showing traffic distribution between two availability zones, each with load balancing nodes and instances.](https://kodekloud.com/kk-media/image/upload/v1752863268/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/cross-zone-load-balancing-vpc-setup.jpg)

---

## Public vs. Private Load Balancers

When deploying an ELB, you specify subnets:

- **Public Load Balancer**: Internet-facing on public subnets
- **Private Load Balancer**: Internal-only on private subnets

![The image compares public and private load balancers, highlighting that public load balancers are deployed on public subnets for internet access, while private load balancers are deployed on private subnets for access within an organization's AWS network.](https://kodekloud.com/kk-media/image/upload/v1752863269/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/public-private-load-balancers-comparison.jpg)

![The image illustrates the difference between private and public subnets in AWS Cloud, showing that a private load balancer is not accessible from the internet, while a public subnet is.](https://kodekloud.com/kk-media/image/upload/v1752863270/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/aws-private-public-subnets-difference.jpg)

---

## Example: Multi-Tier Application

Consider a two-tier application in a VPC across two Availability Zones:

1.  **API Layer**
    - EC2 instances hosting your public API
    - Internet-facing **public ALB** distributes incoming user traffic

2.  **Database Layer**
    - EC2 instances running database or business logic
    - Internal **private ALB** restricts access to only the API servers

This setup exposes your frontend securely while keeping your backend protected.

![The image illustrates an ELB (Elastic Load Balancer) architecture within a Virtual Private Cloud (VPC), showing how load balancers in public subnets forward requests to resources in private subnets.](https://kodekloud.com/kk-media/image/upload/v1752863270/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/elb-architecture-vpc-load-balancer.jpg)

---

## Listeners and Target Groups

Listeners and target groups define how ELBs receive and route traffic:

- **Listeners**: Check for incoming connections on a specific protocol and port. ALB listeners support content-based rules (host, path, headers).
- **Target Groups**: Logical groups of endpoints (EC2 instances, IPs, ECS tasks, Lambda functions). Each listener rule forwards traffic to one or more target groups, with configurable health checks.

![The image illustrates a network architecture with listeners and target groups, showing how load balancers forward requests to resources like ECS and Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752863271/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/network-architecture-load-balancers-ecs-lambda.jpg)

---

## Summary

- ELBs distribute traffic across multiple targets and AZs automatically.
- Supports EC2 instances, IP addresses, containers (ECS), and Lambda functions.
- **Classic (CLB)**: Legacy; limited features, one SSL cert.
- **Application (ALB)**: Layer 7 routing with advanced rules and TLS termination.
- **Network (NLB)**: Layer 4 transport load balancing with ultra-low latency.
- **Cross-zone load balancing** for even traffic distribution across AZs.
- **Listeners** parse connections; **target groups** manage backend health and routing.

![The image is a summary slide about Elastic Load Balancing (ELB), highlighting its traffic distribution capabilities, types, and a note on outdated CLBs.](https://kodekloud.com/kk-media/image/upload/v1752863272/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/elastic-load-balancing-summary-slide.jpg)

![The image is a summary slide comparing Application Load Balancers (ALBs) and Network Load Balancers (NLBs), highlighting their functions and differences in handling HTTP/HTTPS traffic.](https://kodekloud.com/kk-media/image/upload/v1752863273/notes-assets/images/AWS-Networking-Fundamentals-Load-Balancers/alb-nlb-comparison-summary-slide.jpg)

---

## References

- [AWS Elastic Load Balancing Documentation](https://docs.aws.amazon.com/elasticloadbalancing/)
- [AWS Networking Fundamentals](https://aws.amazon.com/elasticloadbalancing/)
- [Designing Highly Available Systems on AWS (Whitepaper)](https://docs.aws.amazon.com/whitepapers/latest/designing-high-availability-systems/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/3ddb4c64-67ec-4e5a-bb59-e502555c91a8)**
>
> Watch video content
