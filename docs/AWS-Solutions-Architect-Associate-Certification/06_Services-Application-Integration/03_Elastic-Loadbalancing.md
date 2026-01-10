# Elastic Loadbalancing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Application-Integration/Elastic-Loadbalancing)

---

## Table of Contents

- Elastic Loadbalancing
  - Introduction to Load Balancers
  - AWS Elastic Load Balancers Overview
  - Public vs. Private Load Balancers
  - Types of AWS Load Balancers
  - Advanced ALB Features and Routing Rules
  - Integrations with AWS Services
  - Watch Video
  - Practice Lab
    - Listeners and Target Groups
    - Key Characteristics of Target Groups
    - Application Load Balancer (ALB)
    - Network Load Balancer (NLB)

---

## Content

AWS Solutions Architect Associate Certification

Services Application Integration

# Elastic Loadbalancing

In this article, we explore AWS Elastic Load Balancers and why they are essential for building scalable and highly available cloud architectures.

## Introduction to Load Balancers

Imagine hosting your website, mywebsite.com, on a single [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2). Initially, as traffic remains low, a single instance may be sufficient. However, as your site gains popularity, a single server may struggle to handle increased load. There are two primary scaling strategies:

1.  **Vertical Scaling:** Increase the capacity (CPU, RAM) of your [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2).
2.  **Horizontal Scaling:** Add more [EC2 instances](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) to distribute the traffic. However, even with multiple servers, the domain (mywebsite.com) still points to a single IP address unless a load balancer is implemented.

This is where load balancers become indispensable. They provide a unified domain name for users while distributing incoming requests across multiple [EC2 instances](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2).

![The image illustrates a load balancing setup in an AWS cloud environment, showing multiple servers distributing traffic to a website.](https://kodekloud.com/kk-media/image/upload/v1752864724/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-load-balancing-setup-servers.jpg)

By balancing the load evenly, these devices enhance both application performance and availability.

## AWS Elastic Load Balancers Overview

AWS offers a robust, scalable, and fault-tolerant load balancing service that spans multiple availability zones. Instead of restricting traffic to a single [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) or availability zone, the load balancer intelligently forwards incoming requests to all configured instances across zones.

Before exploring the different types of load balancers, let's review two critical components of their configuration: **Listeners** and **Target Groups**.

### Listeners and Target Groups

- **Listener:** A listener defines the rules for processing incoming traffic. For instance, you might configure a listener to accept HTTP requests for `http://www.mywebsite.com`.

  ![The image illustrates how a load balancer works within an AWS cloud environment, showing public subnets, target groups, and the flow of traffic from a user to a website.](https://kodekloud.com/kk-media/image/upload/v1752864725/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-load-balancer-traffic-diagram.jpg)

- **Target Group:** A target group is a collection of endpoints, such as [EC2 instances](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), that receive the forwarded requests. You can specify the port on which these endpoints listen (e.g., port 80 for HTTP or port 443 for HTTPS).

For example, to enable HTTPS traffic on port 443, you can configure a listener for port 443 and route requests to a target group operating on that port. Similarly, additional listeners (e.g., on port 8080) can support different types of requests.

![The image illustrates how a load balancer works within an AWS cloud environment, showing traffic distribution across public subnets and target groups. It includes a user accessing a website through HTTPS, with port 443 highlighted.](https://kodekloud.com/kk-media/image/upload/v1752864726/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-load-balancer-traffic-distribution.jpg)

This setup allows a single entry point to distribute incoming requests to the appropriate group of servers. Additionally, target groups can include various endpoint types (such as [EC2 instances](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), IP addresses, Lambda functions, or even other load balancers) and support health checks for monitoring endpoint availability.

![The image is a diagram explaining a "Target Group" in AWS Cloud, showing multiple targets connected to a central point and a service on the right.](https://kodekloud.com/kk-media/image/upload/v1752864727/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-target-group-diagram.jpg)

### Key Characteristics of Target Groups

A target group in AWS can include:

- **[EC2 Instances](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2):** Multiple instances that handle traffic.
- **IP Addresses:** Direct traffic to specific IP addresses, whether hosted on-premises or in another cloud.
- **Lambda Functions:** Use serverless functions as backend endpoints.
- **Other Load Balancers**

Supported protocols include TCP, UDP, TLS, HTTP, HTTPS, and even gRPC. With regular health checks, the load balancer ensures that only healthy endpoints handle traffic.

![The image is a diagram titled "Target Group Characteristics," showing components like Instances, Lambda, IP Address, and Application Load Balancer, along with supported protocols and port ranges.](https://kodekloud.com/kk-media/image/upload/v1752864728/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/target-group-characteristics-diagram.jpg)

![The image illustrates a load balancer health check process within an AWS cloud environment, showing public subnets and client requests.](https://kodekloud.com/kk-media/image/upload/v1752864729/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-load-balancer-health-check-diagram.jpg)

## Public vs. Private Load Balancers

AWS load balancers can be deployed as either:

- **Public Load Balancers:** Exposed to the internet, ideal for public APIs and web applications.
- **Private Load Balancers:** Restricted to a private network, perfect for backend services or databases where security is a priority.

![The image illustrates a network architecture with public and private load balancers in an AWS cloud environment, showing the flow from users to a website through public and private subnets.](https://kodekloud.com/kk-media/image/upload/v1752864732/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-network-architecture-load-balancers.jpg)

When deploying a load balancer, you select specific availability zones and subnets. With **cross-zone load balancing** enabled, traffic is evenly distributed across instances in different zones. Without it, each load balancer node only routes traffic within its zone, which can lead to an uneven load.

![The image illustrates cross-zone load balancing in AWS Cloud, showing how traffic is distributed across multiple public subnets. It includes icons representing servers, a load balancer, and user access.](https://kodekloud.com/kk-media/image/upload/v1752864733/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-cross-zone-load-balancing-diagram.jpg)

## Types of AWS Load Balancers

AWS offers several types of load balancers, each designed for specific use cases:

### Application Load Balancer (ALB)

- Operates at Layer 7 (the application layer) and is aware of HTTP/S traffic.
- Supports advanced routing rules based on host headers, URL paths, HTTP methods, query strings, and custom headers.
- Ideal for web applications and microservices requiring flexible routing and redirection.

![The image describes two types of load balancers supported by AWS: Application Load Balancer (ALB) and Network Load Balancer (NLB), highlighting their features and the OSI layers they correspond to.](https://kodekloud.com/kk-media/image/upload/v1752864734/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-load-balancers-alb-nlb.jpg)

### Network Load Balancer (NLB)

- Operates at Layer 4 (the transport layer) and supports protocols such as TCP, UDP, and TLS.
- Designed for high-performance applications, capable of handling millions of requests per second.
- Provides static IP addresses per availability zone, offering greater routing control.

When you configure an NLB, a network interface is created in each availability zone. For internet-facing NLBs, an optional Elastic IP can be assigned for each subnet.

![The image is a diagram illustrating how Network Load Balancer (NLB) works, showing the interaction between a corporate data center and AWS Cloud with public subnets and various ports.](https://kodekloud.com/kk-media/image/upload/v1752864735/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/network-load-balancer-diagram.jpg)

The NLB routes traffic based solely on port numbers. For example, traffic arriving on port 8080 can be directed to one target group, while traffic on ports 80 and 443 is sent to different groups.

## Advanced ALB Features and Routing Rules

Because the Application Load Balancer operates at Layer 7, it provides advanced traffic management options:

- **Host Header Matching:** Route traffic based on domain names.
  - Default rule: Applies when no specific host is matched.
  - Custom rule: For instance, route traffic for `blog.mywebsite.com` to a dedicated target group.

  ![The image illustrates an AWS Application Load Balancer (ALB) configuration with host header rules directing traffic to different target groups based on the requested URL.](https://kodekloud.com/kk-media/image/upload/v1752864736/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-alb-configuration-diagram.jpg)

- **Path-Based Routing:** Direct traffic based on URL paths (e.g., routing `/blog` to a specific group).

  ![The image is a diagram illustrating an AWS Application Load Balancer (ALB) path routing setup, showing how requests to different paths are directed to specific target groups.](https://kodekloud.com/kk-media/image/upload/v1752864737/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-alb-path-routing-diagram.jpg)

- **HTTP Method Matching:** Distribute traffic based on HTTP methods (e.g., GET vs POST). For example, you might have separate target groups for POST requests.

  An example using curl for a POST request:

  ```
  curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1"}' https://mywebsite.com/api
  ```

  For clarity, here is a similar command with escaped quotes:

  ```
  curl -X POST -H "Content-Type: application/json" -d "{\"key1\":\"value1\"}" https://mywebsite.com/api
  ```

- **Source IP and Custom Header Matching:** Create rules to match specific source IP addresses or HTTP headers (e.g., `x-environment`).

  For example, matching a header with curl:

  ```
  curl -X POST -H "x-environment: staging" https://mywebsite.com/api
  ```

- **Query String Matching:** Route traffic based on query parameters, such as `?category=books`.

Multiple routing rules can be combined to support complex microservices architectures. If none of the custom rules match, the load balancer reverts to the default rule.

![The image is a diagram illustrating the ALB HTTP method in AWS, showing how requests are routed through a listener to target groups based on method rules.](https://kodekloud.com/kk-media/image/upload/v1752864738/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/alb-http-method-aws-diagram.jpg)

![The image is a diagram illustrating an AWS Application Load Balancer (ALB) configuration, showing source IP rules and target groups for routing traffic based on IP addresses. It includes a listener on port 80 and specifies forwarding rules to different target groups.](https://kodekloud.com/kk-media/image/upload/v1752864738/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/aws-alb-configuration-diagram-2.jpg)

## Integrations with AWS Services

Elastic Load Balancers seamlessly integrate with numerous AWS services, creating a robust and scalable architecture:

| AWS Service         | Use Case                                     | Example                                                                                         |
| ------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Amazon EC2          | Distributing traffic to virtual servers      | [EC2 instances](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2)      |
| Amazon ECS          | Running containerized applications           | [Amazon ECS](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs) |
| AWS Lambda          | Serverless computing for backend endpoints   | [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda)                               |
| AWS WAF             | Adding web application firewall for security | [Learn more about AWS WAF](https://aws.amazon.com/waf/)                                         |
| Amazon Route 53     | Managing custom domains and routing policies | [Learn more about Route 53](https://aws.amazon.com/route53/)                                    |
| Auto Scaling Groups | Automatically adjusting resource capacity    | [Auto Scaling Documentation](https://docs.aws.amazon.com/autoscaling/)                          |

![The image is a diagram showing the integration of Elastic Load Balancing with various AWS services, including Amazon EC2, Amazon ECS, AWS Lambda, AWS WAF, and Amazon Route 53.](https://kodekloud.com/kk-media/image/upload/v1752864739/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Loadbalancing/elastic-load-balancing-aws-diagram.jpg)

Integrating these services with Elastic Load Balancing not only provides scalability but also ensures that your applications remain resilient and highly available.

> [!important]
> **Best Practice**
>
> For optimal performance, always configure health checks on your target groups. This ensures that traffic is routed only to healthy endpoints.

---

This article provided an in-depth overview of AWS Elastic Load Balancers, discussing basic concepts, setup with listeners and target groups, distinctions between ALBs and NLBs, advanced routing techniques, and key integrations with other AWS services. By leveraging these capabilities, you can build a robust mechanism for managing traffic and ensuring high availability in your AWS cloud environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/a74f8759-2290-4aca-bd86-3e21a1269c72)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/d0d84afc-043a-4466-a7be-0e633c9122f2)**
>
> Practice lab
