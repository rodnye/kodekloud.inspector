# Understanding Elastic Load Balancing and Load Distribution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Understanding-Elastic-Load-Balancing-and-Load-Distribution)

---

## Table of Contents

- Understanding Elastic Load Balancing and Load Distribution
  - Why Do We Need Load Balancers?
  - Elastic Load Balancer and Target Groups
  - Virtual Load Balancer Architecture and Cross-Zone Load Balancing
  - Types of AWS Load Balancers
  - Application Load Balancer (ALB) Detailed Configuration
  - Integration with AWS Services
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Understanding Elastic Load Balancing and Load Distribution

Welcome to this lesson on load distribution and traffic management in AWS. In this guide, we explore how Elastic Load Balancing (ELB), Route 53 DNS, and global accelerators work together to provide fault tolerance and high availability. We discuss the rationale behind load balancers, their operational mechanisms, and the different types offered by AWS.

## Why Do We Need Load Balancers?

High availability depends on the effective distribution of network traffic across multiple active endpoints. Consider a scenario where your website, mywebsite.com, is hosted on a single EC2 instance (for example, a T2 Large instance). As traffic increases, vertical scaling (simply upsizing the instance) can lead to downtime and disruption during the switchover. In contrast, horizontal scaling—adding more instances—ensures continuous service; however, directly pointing your domain to a specific IP address makes it challenging to manage traffic coherently across multiple instances.

A load balancer acts as an abstraction layer between the client and your servers. Users connect to the load balancer rather than directly to an instance (e.g., IP 121.10.30.30). The load balancer then dynamically directs requests to backend instances based on availability, ensuring uninterrupted service.

![The image illustrates the need for load balancers in an AWS cloud setup, showing multiple t2.large instances connected to a load balancer, which then connects to a website and users.](https://kodekloud.com/kk-media/image/upload/v1752860203/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/aws-load-balancer-architecture-diagram.jpg)

In the diagram above, the purple box represents the load balancer routing incoming traffic across multiple EC2 instances spread over different availability zones. This ensures that if one instance or zone fails, other healthy instances can still manage the traffic.

## Elastic Load Balancer and Target Groups

AWS Elastic Load Balancer (ELB) works in tandem with EC2 instances by organizing them into target groups. It continuously monitors target health using configurable health checks. If an instance becomes unresponsive, it is automatically removed from the target group, ensuring that only healthy endpoints receive traffic.

![The image illustrates how load balancers work within an AWS cloud environment, showing public subnets, target groups, and a user accessing a website.](https://kodekloud.com/kk-media/image/upload/v1752860204/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/aws-load-balancer-cloud-diagram.jpg)

Target groups can include various resources such as EC2 instances, Lambda functions, or even other load balancers. Health checks, adjustable in terms of interval and criteria, guarantee that only responsive instances handle client requests.

![The image is a diagram titled "Target Group – Characteristics," showing components like Instances, Lambda, IP Address, and Application Load Balancer, along with supported protocols and port ranges.](https://kodekloud.com/kk-media/image/upload/v1752860205/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/target-group-characteristics-diagram.jpg)

## Virtual Load Balancer Architecture and Cross-Zone Load Balancing

Although a load balancer appears as a single device, it is, in fact, an aggregation of several virtual devices distributed across multiple availability zones. This redundancy guarantees there is no single point of failure. When cross-zone load balancing is enabled, the load balancer can distribute traffic amongst all available instances across zones. If disabled, traffic is limited to instances within a particular availability zone.

![The image illustrates a diagram of cross-zone load balancing within an AWS cloud environment, showing multiple public subnets connected to a load balancer.](https://kodekloud.com/kk-media/image/upload/v1752860206/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/aws-cross-zone-load-balancing-diagram.jpg)

## Types of AWS Load Balancers

AWS provides three primary types of load balancers, each designed for different use cases:

1.  **Application Load Balancer (ALB):**
    - Operates at Layer 7 (the application layer).
    - Supports advanced routing features such as path-based routing, host header routing, HTTP methods, source IP filtering, and query string rules.
    - Ideal for HTTP/HTTPS traffic.

    For instance, you can configure a listener rule based on the HTTP method. Below is an example command to demonstrate a POST request:

    ```
    curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1"}' https://mywebsite.com/api
    ```

    With ALB, you can route requests based on paths (e.g., /blog, /mobile), headers, query strings, or even HTTP methods. For example, a request containing the header "x-environment: staging" or a query string like "?category=books" can be directed to a dedicated target group:

    ```
    curl "https://mywebsite.com/api?category=books"
    ```

    Multiple prioritized rules can be configured so that different traffic patterns are routed to appropriate resources, with a default rule handling unmatched requests.

    ![The image is a diagram illustrating the features of an AWS Application Load Balancer (ALB), showing various rules like Host Header, Path, and HTTP Request Method, with options for forwarding, redirecting, and fixed responses.](https://kodekloud.com/kk-media/image/upload/v1752860207/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/aws-application-load-balancer-diagram.jpg)

2.  **Network Load Balancer (NLB):**
    - Operates at Layer 4 (transport layer).
    - Supports TCP, UDP, and TLS protocols.
    - Ideal for scenarios that require extremely high performance (scaling to millions of connections per second).
    - Provides static IP addresses, simplifying IP whitelisting and integration with legacy systems.
    - Capable of forwarding traffic to targets outside a VPC (e.g., a corporate data center) via VPN or Direct Connect.

    ![The image describes two types of load balancers supported by AWS: Application Load Balancer (ALB) for HTTP/HTTPS and advanced routing, and Network Load Balancer (NLB) for TCP, UDP, TLS, and high request capacity. It also shows the OSI model layers related to each type.](https://kodekloud.com/kk-media/image/upload/v1752860208/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/aws-load-balancers-alb-nlb-diagram.jpg)

    For NLB, a network interface is provisioned in every availability zone along with either a static or dynamically allocated IP address. A listener on the NLB forwards traffic (commonly on ports like 80, 443, or 8080) to these interfaces.

3.  **Security Load Balancer:**
    - Utilizes the Geneve protocol for traffic interception and filtering.
    - Primarily used for specialized security purposes.
    - While it does distribute traffic, its functionality is distinct from that of ALB and NLB.

    This type is less common, primarily appearing in exam scenarios or specialized deployments.

    ![The image is a diagram illustrating an AWS Network Load Balancer (NLB) workflow, showing components like public subnets, instances, and connections within the AWS cloud.](https://kodekloud.com/kk-media/image/upload/v1752860210/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/aws-network-load-balancer-diagram.jpg)

## Application Load Balancer (ALB) Detailed Configuration

When configuring an ALB, you define one or more listeners to manage incoming traffic. A listener on port 80 might include several rules:

- **Host Header Rule:**  
  Routes traffic based on the domain name (e.g., blog.mywebsite.com).
- **Path Rule:**  
  Routes traffic based on the URI path (e.g., /blog, /mobile).
- **HTTP Method Rule:**  
  Routes traffic based on HTTP methods (GET, POST, etc.). For example, you can direct POST requests to a designated API target group:

  ```
  curl -H "x-client: premium" http://mywebsite.com/api
  ```

- **Source IP or Header Rule:**  
  Routes traffic based on the client's IP address or specific header values (e.g., "x-environment: staging").

Each listener rule has a default action if none of the conditions match, ensuring a smooth fallback mechanism.

![The image is a diagram illustrating an AWS Application Load Balancer (ALB) configuration with source IP rules, showing traffic routing based on IP addresses to different target groups.](https://kodekloud.com/kk-media/image/upload/v1752860211/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/aws-alb-configuration-diagram.jpg)

## Integration with AWS Services

Elastic Load Balancing seamlessly integrates with various AWS services:

- **Amazon EC2:** Directly routes traffic to EC2 instances.
- **Amazon ECS:** Supports containerized applications.
- **AWS Lambda:** ALBs can trigger Lambda functions as backend services.
- **AWS WAF:** A Web Application Firewall can be positioned in front of a load balancer to filter malicious traffic.
- **Amazon Route 53:** The load balancer's DNS name is usually managed through Route 53.
- **Auto Scaling:** Works in conjunction with auto scaling groups to adjust to changing loads.

![The image is a diagram showing the integration of Elastic Load Balancing with various AWS services, including Amazon EC2, Amazon ECS, AWS Lambda, AWS WAF, Amazon Route 53, and Auto Scaling.](https://kodekloud.com/kk-media/image/upload/v1752860212/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-Elastic-Load-Balancing-and-Load-Distribution/elastic-load-balancing-aws-diagram.jpg)

## Summary

- A load balancer acts as an abstraction layer, routing client requests to healthy backend instances distributed across multiple Availability Zones.
- AWS provides three main types of load balancers:
  - **Application Load Balancer (ALB):** Offers advanced Layer 7 routing suitable for HTTP/HTTPS traffic.
  - **Network Load Balancer (NLB):** Provides high-performance Layer 4 load balancing for TCP, UDP, and TLS protocols.
  - **Security Load Balancer:** Designed for specialized security requirements using the Geneve protocol.
- Correct configuration of listeners, rules, and target groups is pivotal for ensuring efficient traffic distribution, high availability, and fault tolerance.

> [!important]
> **Note**
>
> Remember that each load balancer type has its specific use cases. Choose the one that best fits your application's requirements and infrastructure.

This concludes our discussion on AWS load balancing concepts, which are crucial for the AWS SysOps exam and efficient cloud architecture design. Happy studying, and we'll see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/3db4d6b0-60ed-4537-bf30-7376f3a3c9d4)**
>
> Watch video content
