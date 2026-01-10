# Adding Route 53 Health Checks With an ELB and Route 53 Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies)

---

## Table of Contents

- Adding Route 53 Health Checks With an ELB and Route 53 Policies
  - Understanding DNS and Its Role in Load Balancing
  - DNS Failover with AWS Route 53
  - Configuring Route 53 Health Checks
  - Exploring Route 53 Routing Policies
  - Conclusion
  - Watch Video
    - 1. Simple Routing Policy
    - 2. Weighted Routing Policy
    - 3. Latency Routing Policy
    - 4. Geolocation Routing Policy
    - 5. Geoproximity Routing Policy
    - 6. Failover Routing Policy
    - 7. IP-Based Routing Policy
    - 8. Multivalue Answer Routing Policy

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Adding Route 53 Health Checks With an ELB and Route 53 Policies

Welcome to our comprehensive guide on configuring Route 53 health checks and routing policies for DNS within AWS. In this article, we cover how DNS works, the benefits of using Route 53, and detailed explanations of various routing policies to help you optimize your online application availability and performance.

## Understanding DNS and Its Role in Load Balancing

When you enter www.example.com into your browser, DNS (Domain Name System) translates that human-friendly domain name into a machine-readable IP address. This process enables your browser to locate and connect to the server hosting the website—often behind an Elastic Load Balancer (ELB) which then delivers the content.

![The image illustrates the process of DNS resolution, showing the interaction between a browser, DNS server, and web server. It includes an example domain and IP address.](https://kodekloud.com/kk-media/image/upload/v1752859999/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/dns-resolution-process-diagram.jpg)

Originally designed for simplicity, scalability, and reliability, DNS eliminates the need to remember complex numeric addresses (e.g., 10.9.6.5). AWS leverages DNS capabilities to offer advanced features like failover, global traffic management, private DNS, and DNSSEC for enhanced security.

> [!important]
> **Note**
>
> Route 53 health checks can be integrated with ELBs to monitor the availability of your endpoints. This setup enables automated failover for continued application performance.

## DNS Failover with AWS Route 53

One of the key features of Route 53 is its DNS failover capability. In this scenario, Route 53 monitors the health of your application via health checks (often shared with your ELB) and automatically redirects traffic to a secondary site if the primary becomes unhealthy. Although Application Load Balancers offer health checks on a regional level, Route 53 extends support across regions. In some cases, AWS Global Accelerator may offer better traffic distribution, but DNS-based methods continue to be well-regarded and frequently appear on AWS certification exams.

![The image illustrates a network architecture for adding health checks to an Elastic Load Balancer (ELB) using AWS services. It shows users connecting through Amazon Route 53 to primary and secondary regions with application load balancers and auto-scaling groups.](https://kodekloud.com/kk-media/image/upload/v1752860000/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/aws-elb-health-check-architecture.jpg)

## Configuring Route 53 Health Checks

When setting up health checks in Route 53, you can select from multiple protocols—including HTTP, HTTPS, and TCP (with a designated port). These health checks support both IPv4 and IPv6, and you have the option to enable calculated health checks or monitor private endpoints. By default, health checks are performed every 30 seconds, and you have the flexibility to define thresholds that determine when an endpoint is considered healthy.

![The image shows a configuration screen for creating Route 53 health checks, where you can specify the endpoint by IP address or domain name, and set parameters like protocol, IP address, host name, port, and path.](https://kodekloud.com/kk-media/image/upload/v1752860002/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/route-53-health-check-configuration.jpg)

## Exploring Route 53 Routing Policies

Route 53 offers a variety of routing policies to balance traffic effectively while ensuring high availability. These policies are tailored to meet different application requirements and network conditions.

![The image lists eight Route 53 routing policies: Simple Routing, Weighted Routing, Latency Based, Geolocation Routing, Geoproximity Routing, Failover Routing, IP-based Routing, and Multivalue Answer Routing. Each policy is accompanied by a simple icon.](https://kodekloud.com/kk-media/image/upload/v1752860003/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/route-53-routing-policies-list.jpg)

Below is an overview of each routing policy along with its key characteristics:

### 1\. Simple Routing Policy

The Simple Routing Policy resolves a DNS query by returning one record (typically an A record) from a configured set. This straightforward method is best suited for basic DNS resolution tasks, such as routing to an ELB or an EC2 instance. Note that health checks cannot be integrated with this policy type.

### 2\. Weighted Routing Policy

Weighted Routing allows you to distribute incoming traffic across multiple endpoints by assigning a specific traffic percentage to each. For example, you could direct 30% of traffic to one region and 70% to another, or even set a weight to zero to effectively disable an endpoint temporarily.

![The image illustrates a weighted routing policy using Amazon Route 53, distributing 30% of traffic to the US East Region and 70% to the US West Region, each with its own Virtual Private Cloud (VPC) and Elastic Load Balancer (ELB).](https://kodekloud.com/kk-media/image/upload/v1752860004/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/amazon-route53-weighted-routing-policy.jpg)

### 3\. Latency Routing Policy

Latency Routing directs users to the endpoint that offers the lowest latency. For instance, a European user might be routed to a European server instead of one located in the United States if it provides a faster response time.

![The image illustrates a latency routing policy for a European user using Amazon Route 53, showing connections to virtual private clouds (VPCs) in the US and European regions with respective latencies of 400 ms and 50 ms.](https://kodekloud.com/kk-media/image/upload/v1752860005/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/latency-routing-amazon-route53-vpcs.jpg)

### 4\. Geolocation Routing Policy

This policy routes users based solely on their geographical location, directing them to endpoints designated for a specific country or region. For example, visitors from France will be served by endpoints configured for France, regardless of potential lower latency offered by nearby servers.

### 5\. Geoproximity Routing Policy

Geoproximity Routing sends users to the data center closest to them in physical distance. Unlike geolocation, it supports biasing—allowing you to adjust the routing to favor one endpoint over another even within the same area.

![The image is a map illustrating the Geoproximity Routing Policy, showing how traffic is routed to AWS regions and a non-AWS resource in Johannesburg, South Africa. It highlights different regions with numbered and colored sections.](https://kodekloud.com/kk-media/image/upload/v1752860006/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/geoproximity-routing-policy-map.jpg)

### 6\. Failover Routing Policy

Failover Routing is designed for high availability. It defines a primary (active) endpoint and a secondary (passive) endpoint. If the primary becomes unhealthy, Route 53 automatically routes traffic to the secondary. This policy can mimic an active-active setup if configured appropriately, automating the failover process based on health check results.

![The image illustrates a failover routing policy using Amazon Route 53, directing 100% of traffic to the US East Region as active and 0% to the US West Region as passive, with each region containing a Virtual Private Cloud (VPC) and an Elastic Load Balancer (ELB).](https://kodekloud.com/kk-media/image/upload/v1752860007/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/route-53-failover-policy-us-east-west.jpg)

### 7\. IP-Based Routing Policy

IP-Based Routing directs traffic based on the source IP address of the DNS query. This method grants you granular control over traffic distribution and is especially useful for applications where security or specific network policies are vital.

![The image illustrates an IP-based routing policy using Amazon Route 53, showing how users are directed to different EC2 instances based on their IP addresses and CIDR blocks. It includes a table of CIDR collections and records for routing decisions.](https://kodekloud.com/kk-media/image/upload/v1752860008/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/amazon-route53-ip-routing-policy.jpg)

### 8\. Multivalue Answer Routing Policy

This policy returns multiple health-verified records (up to eight) for a single DNS query. With integrated health checks, only healthy endpoints are included, providing a robust and redundant routing solution.

![The image illustrates a multivalue answer routing policy in Amazon Route 53, showing how a user request is routed to different IP addresses based on health checks.](https://kodekloud.com/kk-media/image/upload/v1752860010/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Adding-Route-53-Health-Checks-With-an-ELB-and-Route-53-Policies/route-53-multivalue-routing-policy.jpg)

> [!important]
> **Key Takeaway**
>
> AWS Route 53 offers a range of DNS routing policies designed to optimize traffic distribution and ensure high availability. Familiarity with these policies is essential for managing complex, distributed applications and is a valuable topic for AWS certification exams.

## Conclusion

In summary, AWS Route 53 provides a robust set of tools for managing DNS health checks and routing policies. Whether you need basic DNS resolution, weighted distribution, latency optimization, or sophisticated failover mechanisms, Route 53 offers a solution tailored to your requirements. By understanding and leveraging these features, you can enhance your application's reliability and performance.

Thank you for reading this guide on AWS Route 53 health checks and routing policies. We hope this article has provided clear insights into how to effectively configure and manage DNS in AWS. For more detailed information, be sure to check out additional AWS documentation and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/aa8302bb-f215-4d95-9f30-62514d31353c)**
>
> Watch video content
