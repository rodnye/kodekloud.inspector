# Adding in Global Accelerator With ELB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Adding-in-Global-Accelerator-With-ELB)

---

## Table of Contents

- Adding in Global Accelerator With ELB
  - Traditional DNS-Based Load Balancing
  - Global Accelerator: A Robust Global Load Balancer
  - Global Accelerator with ELB Integration
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Adding in Global Accelerator With ELB

Welcome to this comprehensive guide on AWS Global Accelerator and its integration with Elastic Load Balancers (ELB). In this tutorial, we will explain how AWS Global Accelerator acts as a global load balancer, overcoming the challenges inherent in traditional DNS-based routing, and distributing traffic more efficiently across multiple regions.

## Traditional DNS-Based Load Balancing

Traditionally, load balancing for applications is managed through DNS services such as Amazon Route 53. In such setups, DNS routes user requests to publicly accessible endpoints, which can include multiple ELBs across different regions (for example, in an active-active configuration). This design supports regional failover by redirecting traffic if a particular region becomes unhealthy.

However, the DNS resolution process involves multiple steps:

- A user's device requests the domain name resolution (e.g., www.example.com).
- The request travels through local DNS servers, the ISP’s DNS cache, root name servers, and finally the authoritative name server.
- The resolved IP address is cached across multiple network points.

> [!important]
> **Note**
>
> Be aware that caching behavior can complicate timely failover, as different caching layers may honor different TTL (time-to-live) values. This could lead to outdated DNS records persisting for minutes, or even hours, and potentially route traffic to unhealthy endpoints.

The complications include:

- TTL values set to 30 seconds may be exceeded by longer caching durations at upstream servers.
- Cached DNS responses might result in delayed failover during regional outages.
- Limited control over external DNS caches across ISPs and third parties.

For instance, if the US West 1 region fails, DNS caches might still direct user traffic there due to outdated entries, which undermines the reliability of DNS-based load balancing.

![The image illustrates DNS resolution and failover challenges using Amazon Route 53, showing how user requests are routed to different AWS regions based on health checks and failover mechanisms. It includes components like Application Load Balancers and Amazon EC2 instances in US-East and US-West regions.](https://kodekloud.com/kk-media/image/upload/v1752860010/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-in-Global-Accelerator-With-ELB/dns-resolution-failover-amazon-route53.jpg)

## Global Accelerator: A Robust Global Load Balancer

To address the shortcomings of DNS-based load balancing, AWS Global Accelerator provides a powerful alternative. It offers a static, anycast IP address that remains unchanged, serving as a fixed global entry point to your application. Key benefits of Global Accelerator include:

- **Static Global Endpoint:** Just as with a regional load balancer, Global Accelerator provides a constant anycast IP, making client configurations simpler and more reliable.
- **Intelligent, Real-Time Routing:** It directs traffic dynamically to the optimal regional application load balancer based on the health and performance of the endpoints, without needing to wait for DNS propagation.
- **Flexible Traffic Distribution:** Control traffic routing with:
  - Percentage-based allocations (e.g., 20% to US-East-1 and 80% to US-West-1).
  - Numerical weight settings on a scale from 0 to 255 (default weight is 128).
- **Fast Failover:** Quickly detects endpoint issues and reroutes traffic immediately, avoiding delays due to DNS caching.
- **Enhanced Global Performance:** Utilizes AWS's global network to maintain fast, secure, and scalable performance even under DDoS attacks or other network disruptions.

Consider the following diagram that illustrates how Global Accelerator connects seamlessly to an application load balancer in a specific region:

![The image is a diagram illustrating the AWS Global Accelerator, showing how users connect through it to reach application load balancers and Amazon EC2 instances in different regions, highlighting features like anycast IP address, intelligent routing, fast failover, and consistent performance.](https://kodekloud.com/kk-media/image/upload/v1752860012/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-in-Global-Accelerator-With-ELB/aws-global-accelerator-diagram.jpg)

Since Global Accelerator bypasses DNS caching for routing decisions, it delivers real-time failover and unparalleled availability. This centralized approach simplifies network management by unifying traffic distribution under a single, globally distributed endpoint.

## Global Accelerator with ELB Integration

AWS Global Accelerator works in perfect harmony with Elastic Load Balancers. When users access the static anycast IP provided by Global Accelerator, the traffic is efficiently forwarded to an appropriate ELB within the target region. The ELB then distributes incoming requests across one or more back-end instances (such as EC2 instances).

This integration enhances real-time failover, global performance, and overall availability by minimizing dependency on public DNS caching. The diagram below shows how AWS Global Accelerator interacts with ELB instances across various regions:

![The image illustrates how AWS Global Accelerator works with Elastic Load Balancing (ELB) across different regions, showing users connecting through the accelerator to application load balancers in various AWS regions.](https://kodekloud.com/kk-media/image/upload/v1752860013/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-in-Global-Accelerator-With-ELB/aws-global-accelerator-elb-diagram.jpg)

Moreover, Global Accelerator benefits from AWS-managed network security. Robust defense mechanisms automatically mitigate DDoS attempts and malicious traffic, ensuring that your applications remain secure and resilient.

![The image outlines the benefits of adding a Global Accelerator to ELB, highlighting improved global performance, enhanced availability, simplified network management, and increased security.](https://kodekloud.com/kk-media/image/upload/v1752860014/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-in-Global-Accelerator-With-ELB/global-accelerator-elb-benefits.jpg)

## Summary

In summary, AWS Global Accelerator offers a significant upgrade over traditional DNS-based load balancing. Its key advantages include:

- A static, anycast IP address that establishes a consistent global entry point.
- Intelligent, real-time routing that bypasses DNS caching, ensuring rapid failover.
- Flexible traffic management using percentage-based distribution or numerical weighting.
- Integration with ELB for streamlined backend traffic distribution.
- Enhanced global performance, improved availability, and strengthened security.

Global Accelerator is particularly beneficial for applications that demand true global load balancing and rapid failover capabilities. By integrating with Elastic Load Balancers, it ensures that your application remains highly available, responsive, and secure for users worldwide.

For further reading on AWS load balancing strategies, visit the [AWS Documentation](https://aws.amazon.com/getting-started/hands-on/load-balancer/) and [Amazon Route 53](https://aws.amazon.com/route53/).

We hope this guide helps you understand how Global Accelerator enhances ELB for global-scale applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/6c73419b-51c8-4308-9d4b-2db460d25924)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/3b006a5f-48af-4cc0-a465-bfc967f40e6f)**
>
> Practice lab
