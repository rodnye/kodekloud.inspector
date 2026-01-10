# Elastic LoadBalancer Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Load-Balancing-AutoScaling/Elastic-LoadBalancer-Overview)

---

## Table of Contents

- Elastic LoadBalancer Overview
  - Key Features of Elastic Load Balancers
  - Availability Zones and Load Balancer Deployment
  - Cross-Zone Load Balancing
  - Public and Private Load Balancers
  - Target Groups and Listener Rules
  - Health Checks and Target Registration
  - Connection Draining
  - Types of Elastic Load Balancers
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Load Balancing AutoScaling

# Elastic LoadBalancer Overview

In this lesson, we explore how load balancing works on AWS using Elastic Load Balancers (ELBs). We explain key features, architectural considerations, and best practices for configuring ELBs to ensure high availability, reliability, and scalability for your applications.

Imagine load balancing as similar to an office building’s receptionist. Just as a receptionist directs visitors—whether employees, new hires, or delivery personnel—to the correct floor or department, an ELB receives incoming traffic and distributes it to the appropriate backend resources, such as EC2 instances, ECS tasks, or Lambda functions.

![The image illustrates a load balancing setup where incoming traffic is distributed by an Elastic Load Balancer (ELB) to three EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752859059/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/load-balancing-elb-ec2-instances.jpg)

When multiple EC2 instances are involved, each with its own IP address, an ELB enables end users to use a single DNS entry rather than tracking individual IP addresses. The load balancer then automatically routes requests to the correct backend resources.

## Key Features of Elastic Load Balancers

Elastic Load Balancers are a fully managed service from AWS, meaning that AWS takes care of the underlying hardware, networking, and software. Your primary task is to set the operating rules. The main features include:

1.  **High Availability and Fault Tolerance**  
    ELBs distribute traffic both across servers and multiple Availability Zones (AZs). If one AZ encounters an issue, the load balancer routes traffic to healthy instances in other zones—thus preventing any single server from becoming overwhelmed.
2.  **Public vs. Private Deployment**  
    Configure your load balancer to be public (accessible via the internet) or private (restricted to internal use). This flexibility allows you to tailor the load balancer to your security requirements.
3.  **Simplified DNS Management**  
    Each ELB gets a DNS entry that remains constant even when the underlying IP addresses change. This eliminates the need to update DNS records frequently.
4.  **Health Checks**  
    ELBs perform periodic health checks using HTTP, HTTPS, or TCP protocols on specified ports. If a server fails these checks, it is temporarily taken out of the rotation until it recovers.

![The image lists six features of a service, including managed service, high availability, efficient network traffic distribution, flexibility, simplified DNS management, and health checks.](https://kodekloud.com/kk-media/image/upload/v1752859060/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/service-features-managed-high-availability.jpg)

## Availability Zones and Load Balancer Deployment

Elastic Load Balancers support multi-AZ deployments. When creating an ELB, you select the Availability Zones and subnets where it will reside. Note that these subnets are for deploying the load balancer nodes, not necessarily for placing your EC2 instances. For example, you might deploy load balancer nodes in public subnets that route traffic to EC2 instances located in private subnets within the same AZ.

![The image illustrates a diagram of an Elastic Load Balancer (ELB) with Multi-AZ (Availability Zones), showing clients connecting through the ELB to two separate availability zones, each containing a server instance.](https://kodekloud.com/kk-media/image/upload/v1752859062/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/elastic-load-balancer-multi-az-diagram.jpg)

When setting up your ELB, assign specific subnets for its nodes. These nodes balance incoming traffic to target resources in the same or different subnets within each AZ.

![The image illustrates the architecture of Elastic Load Balancers within a Virtual Private Cloud (VPC), showing public and private subnets across two availability zones, with a DNS record created for the ELB.](https://kodekloud.com/kk-media/image/upload/v1752859063/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/elastic-load-balancer-vpc-architecture.jpg)

## Cross-Zone Load Balancing

Cross-zone load balancing is essential for managing traffic distribution across Availability Zones. Consider a scenario where one AZ has two instances while another has only one. Without cross-zone balancing, the single instance might receive an excessive amount of traffic relative to its capacity. Enabling cross-zone load balancing ensures that traffic is evenly distributed across all instances, regardless of the number of instances in each AZ. This feature is enabled by default.

![The image illustrates a cross-zone load balancing setup within a Virtual Private Cloud (VPC), showing traffic distribution across two availability zones with load balancer nodes.](https://kodekloud.com/kk-media/image/upload/v1752859064/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/cross-zone-load-balancing-vpc.jpg)

## Public and Private Load Balancers

The subnet selected for your ELB determines whether it is public or private:

- **Public Load Balancer:** Deployed in a public subnet to handle internet traffic.
- **Private Load Balancer:** Deployed in a private subnet to manage internal traffic.

A common two-tier architecture example includes:

- An API layer (frontend) in a public subnet behind a public load balancer.
- A backend database in a private subnet, accessible only through secure channels.

Alternatively, all EC2 instances may reside in private subnets, with a public ELB delivering external requests while keeping the backend secure.

![The image illustrates the architecture of an Elastic Load Balancer (ELB) within a Virtual Private Cloud (VPC), showing how load balancers in public subnets forward requests to resources in private subnets.](https://kodekloud.com/kk-media/image/upload/v1752859066/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/elb-architecture-vpc-diagram.jpg)

## Target Groups and Listener Rules

Target groups are collections of resources (like EC2 instances) that receive traffic for specific applications. After creating target groups for different services, you define listener rules on the ELB to route requests based on criteria such as hostname or URL path. For instance:

- Requests for "appone.com" are forwarded to Target Group A.
- Requests for "apptwo.com" with the URL path "/auth" are routed to Target Group B.

A listener listens for incoming connections on a specified protocol and port, matches incoming requests to the defined rules, and then forwards them to the appropriate target group.

![The image illustrates a network architecture with listeners and target groups, showing how load balancers forward requests to resources like ECS and Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752859067/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/network-architecture-load-balancers-diagram.jpg)

![The image illustrates a network architecture with listeners and target groups, showing how load balancers forward requests to resources like ECS and Lambda functions. It includes three domains (app1.com, app2.com/auth, app2.com/cart) each linked to different target groups.](https://kodekloud.com/kk-media/image/upload/v1752859069/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/network-architecture-load-balancers.jpg)

## Health Checks and Target Registration

After registering your targets with a target group, configure health checks to continuously monitor their performance. The ELB sends periodic health check requests via HTTP, HTTPS, or TCP. If a target does not return the expected response, it is marked as unhealthy and removed from the traffic routing until it passes health checks again.

![The image illustrates an Elastic Load Balancer (ELB) with health checks, showing two healthy instances and one unhealthy instance that is not receiving traffic.](https://kodekloud.com/kk-media/image/upload/v1752859070/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/elastic-load-balancer-health-checks.jpg)

## Connection Draining

Connection draining enables you to gracefully deregister targets from the ELB. For example, if an EC2 instance needs to be removed (manually or due to failing health checks), connection draining ensures that existing connections are allowed to complete before deregistration occurs. During this period, no new requests are sent to the draining instance.

> [!important]
> **Tip**
>
> Connection draining helps maintain session integrity during scaling events and minimizes the impact of instance deregistration on end users.

![The image illustrates a connection draining process in a load balancing setup, where traffic is directed through an ELB to multiple instances, with Instance B completing in-flight requests.](https://kodekloud.com/kk-media/image/upload/v1752859070/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/connection-draining-load-balancer-setup.jpg)

![The image illustrates a connection draining process, showing traffic directed through an Elastic Load Balancer (ELB) to instances A and C, with instance B being deregistered after a draining period.](https://kodekloud.com/kk-media/image/upload/v1752859072/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/connection-draining-elb-instances.jpg)

## Types of Elastic Load Balancers

AWS offers three main types of load balancers, each designed for specific use cases:

1.  **Application Load Balancer (ALB):**  
    Optimized for HTTP and HTTPS traffic with advanced routing capabilities.
2.  **Network Load Balancer (NLB):**  
    Ideal for handling TCP traffic with low latency and high performance.
3.  **Gateway Load Balancer:**  
    Provides a single entry point for routing traffic to a fleet of third-party virtual appliances.

![The image shows three types of load balancers: Application Load Balancer, Network Load Balancer, and Gateway Load Balancer, each represented with a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752859073/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/load-balancers-types-icons.jpg)

## Summary

- ELBs efficiently distribute incoming traffic across multiple servers using a single DNS entry, while supporting various backend platforms such as EC2, Lambda, ECS, and IP addresses.
- They are designed for high availability, offering multi-AZ deployments and the option for public or private configurations.
- Target groups serve as logical links between the ELB and backend resources, with health checks ensuring that traffic is only routed to healthy instances.
- Listeners and listener rules determine how incoming requests are processed and directed.
- Cross-zone load balancing promotes an even traffic distribution, independent of the number of instances in each Availability Zone.
- Connection draining allows for the graceful removal of targets, ensuring that existing connections are not abruptly severed.
- AWS provides three distinct load balancer types—Application, Network, and Gateway—to suit a variety of application requirements.

![The image is a summary slide with two points about load balancing: cross-zone load balancing distributes traffic across instances, and connection draining stops new requests while keeping existing connections open for a set period.](https://kodekloud.com/kk-media/image/upload/v1752859074/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-LoadBalancer-Overview/load-balancing-summary-cross-zone.jpg)

With this comprehensive overview, you now have a clear understanding of the functionality and configuration options of Elastic Load Balancers, as well as the importance of features like health checks, cross-zone load balancing, and connection draining in creating a resilient and scalable AWS architecture.

For further details and best practices on AWS load balancing, refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/93f40589-2a40-4945-8fe7-202287383020)**
>
> Watch video content
