# Load Balancers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Load-Balancers)

---

## Table of Contents

- Load Balancers
  - Classic Load Balancer
  - Application Load Balancer
  - Network Load Balancer
  - Elastic Load Balancer Architecture in a VPC
  - Public vs. Private Load Balancers
  - Example: Layered Application Architecture with ELB
  - Listeners and Target Groups
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Load Balancers

In this lesson, we dive into AWS Elastic Load Balancers (ELBs) and explore the common challenges they resolve.

Imagine you have a web application running on a single EC2 instance with an IP address of 1.1.1.1. End users can access the application by sending requests to that IP. However, if that instance fails, your application becomes inaccessible. To enhance reliability, you might deploy the application across multiple EC2 instances in different availability zones to mitigate zone-specific failures.

Now, consider running the application on three servers with different public IP addresses—for example, 3.3.3.3, 1.1.1.1, and 2.2.2.2. Expecting end users to manually choose or switch between these IPs when one fails is not a viable design. Instead, you can use a dedicated device with its own IP address that sits between end users and your EC2 instances. This device, known as a load balancer, accepts all incoming requests on its single IP and efficiently distributes the traffic to your backend instances.

![The image illustrates an Elastic Load Balancer (ELB) setup in AWS, showing how incoming traffic is distributed across multiple availability zones with different IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752865603/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/elastic-load-balancer-aws-setup.jpg)

By centralizing the entry point to your application, a load balancer abstracts away the complexity of managing multiple endpoints. AWS provides built-in load balancing services under the Elastic Load Balancer umbrella, which directs traffic to various backend resources efficiently.

> [!important]
> **Key Benefit**
>
> ELBs enable you to manage your application's traffic seamlessly by routing requests to healthy EC2 instances, thus ensuring high availability.

There are three types of load balancers offered by AWS:

1.  **Classic Load Balancer (CLB)**
2.  **Application Load Balancer (ALB)**
3.  **Network Load Balancer (NLB)**

Let's explore each type in detail.

---

## Classic Load Balancer

The Classic Load Balancer was AWS's inaugural load balancing solution. Over time, its limited feature set has rendered it less favorable compared to modern alternatives. For instance, it supports only a single SSL certificate. If you need to manage two separate applications each with its own SSL certificate behind the same load balancer, the Classic Load Balancer falls short. For this reason, new projects are generally built using either the Application or Network Load Balancer.

![The image is an illustration of the Classic Load Balancer (CLB) by AWS, highlighting that it was the first load balancer introduced by AWS and is not recommended for use. It includes a simple diagram showing the CLB distributing traffic to two applications.](https://kodekloud.com/kk-media/image/upload/v1752865604/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/aws-classic-load-balancer-diagram.jpg)

---

## Application Load Balancer

Application Load Balancers are optimized for web-based applications that rely on HTTP, HTTPS, and WebSockets. Operating at the application layer (Layer 7), ALBs inspect and forward requests based on URL paths, host domains, HTTP methods, query parameters, and other HTTP-specific attributes. This additional intelligence facilitates features such as HTTP redirects, custom responses, and detailed health checks to ensure traffic only reaches healthy backend resources.

When a client sends an HTTP or HTTPS request, the load balancer terminates the connection. For HTTPS, this includes SSL/TLS termination—meaning the SSL certificates are managed on the ALB. After decryption, the ALB typically forwards the request over HTTP to the backend. If end-to-end encryption is required, secure connections can also be established at the instance level by configuring HTTPS on the backend targets.

![The image is an infographic about Application Load Balancer (ALB), highlighting its support for HTTP/HTTPS/WebSockets, functioning at the application layer, request forwarding, and application-specific health checks. It also details conditions for URL paths, host domains, HTTP fields, and support for HTTP redirects and custom responses.](https://kodekloud.com/kk-media/image/upload/v1752865606/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/application-load-balancer-infographic.jpg)

![The image illustrates the flow of SSL/TLS termination in an Application Load Balancer (ALB) setup, showing how HTTP/HTTPS is terminated at the ALB where SSL certificates reside, and the connection to the server is unencrypted.](https://kodekloud.com/kk-media/image/upload/v1752865607/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/ssl-tls-termination-alb-flow.jpg)

---

## Network Load Balancer

The Network Load Balancer works at the transport layer (Layer 4), handling TCP and UDP traffic. Unlike the ALB, the NLB does not inspect higher-level protocols like HTTP or HTTPS. This makes it ideal for applications that require support for non-HTTP/HTTPS protocols or scenarios where high throughput and low latency are critical. Since the NLB does not terminate traffic, TCP sessions persist end-to-end between the client and the EC2 instance.

When you require HTTPS with an NLB, SSL certificates must be managed on the server side, as the SSL/TLS handshake occurs directly between the client and the target. Health checks are conducted using TCP or ICMP to confirm the accessibility of targets at the transport layer.

![The image is an informational graphic about Network Load Balancers (NLB), highlighting features such as TCP/UDP traffic handling, suitability for non-HTTP/HTTPS applications, speed, basic health checks, and TCP connection forwarding.](https://kodekloud.com/kk-media/image/upload/v1752865608/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/network-load-balancer-features-graphic.jpg)

![The image illustrates a Network Load Balancer (NLB) setup, showing the flow of TCP/UDP traffic from a user to a server, with encryption indicated along the path.](https://kodekloud.com/kk-media/image/upload/v1752865609/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/network-load-balancer-traffic-diagram.jpg)

---

## Elastic Load Balancer Architecture in a VPC

When deploying an Elastic Load Balancer within an Amazon Virtual Private Cloud (VPC), you must designate the availability zones by selecting proper subnets. AWS automatically deploys load balancer nodes—the physical resources that handle traffic distribution—across the chosen subnets. These nodes receive traffic through a DNS record associated with the ELB, ensuring that traffic is balanced evenly across multiple nodes. Each load balancer node then forwards incoming traffic to the appropriate EC2 instances within its respective availability zone.

![The image illustrates the architecture of Elastic Load Balancers within a Virtual Private Cloud (VPC), showing how DNS records are created for the ELB and how it interacts with public and private subnets across two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752865611/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/elastic-load-balancer-architecture-vpc.jpg)

An important feature is cross-zone load balancing. Without it, a load balancer node will only route traffic to EC2 instances within its own availability zone. This might lead to uneven distribution if one zone receives a higher proportion of traffic but has fewer instances. Cross-zone load balancing allows nodes to distribute traffic across instances in different zones, ensuring a more balanced load.

![The image illustrates a cross-zone load balancing setup within a Virtual Private Cloud (VPC), showing how traffic is distributed between two availability zones, each with a load balancer node.](https://kodekloud.com/kk-media/image/upload/v1752865612/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/cross-zone-load-balancing-vpc.jpg)

---

## Public vs. Private Load Balancers

Elastic Load Balancers can be deployed as either public or private, depending on your application's requirements:

- **Public Load Balancer:**  
  Deployed within a public subnet, it is accessible from the internet. This is ideal for web applications, APIs, or any service that needs to serve external users.
- **Private Load Balancer:**  
  Deployed within a private subnet, it is only accessible from your internal network. This configuration is beneficial for back-end services, such as database servers, that should not be directly exposed to the internet.

![The image compares public and private load balancers, highlighting that public load balancers are deployed on public subnets for internet access, while private load balancers are on private subnets for internal network access.](https://kodekloud.com/kk-media/image/upload/v1752865613/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/public-private-load-balancers-comparison.jpg)

![The image illustrates the difference between private and public subnets in AWS Cloud, showing that a private load balancer is not accessible from the internet, while a public subnet is.](https://kodekloud.com/kk-media/image/upload/v1752865614/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/aws-private-public-subnets-diagram.jpg)

---

## Example: Layered Application Architecture with ELB

Consider an application with a multi-layered architecture:

- **API Layer:**  
  This layer serves external API requests. A public Elastic Load Balancer distributes incoming traffic to several EC2 instances running the API services.
- **Database Layer:**  
  This layer consists of EC2 instances handling database operations. To secure communication between the API layer and the database, a private Elastic Load Balancer is placed in front of the database instances. The public API layer routes requests to this private load balancer, which evenly distributes traffic among the database servers. This design not only optimizes traffic distribution but also enhances security by preventing direct external access to the database.

---

## Listeners and Target Groups

When configuring an Elastic Load Balancer, two key components that define its behavior are listeners and target groups:

- **Listeners:**  
  A listener is a process that checks for incoming connection requests based on a specified protocol and port. For example, if you want to handle requests for "app1.com", a listener can be configured to detect those requests and forward them appropriately.
- **Target Groups:**  
  A target group comprises a set of registered targets—such as EC2 instances, ECS containers, or Lambda functions—that receive the forwarded traffic according to the listener's rules. You can configure health checks for each target group to ensure only healthy targets receive traffic. For instance, one target group might manage two EC2 instances for "app1.com", while separate target groups could serve endpoints like "app2.com/auth" for ECS containers or "app2.com/cart" for Lambda functions.

![The image illustrates a network architecture with listeners and target groups, showing how load balancers forward requests to resources like ECS and Lambda functions. It includes three domains (app1.com, app2.com/auth, app2.com/cart) each linked to different target groups.](https://kodekloud.com/kk-media/image/upload/v1752865616/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/network-architecture-load-balancers.jpg)

> [!important]
> **Listener Rules**
>
> Listeners use defined rules to match incoming requests and route them to the appropriate target group. Health checks ensure that traffic is only sent to targets that are operational.

---

## Summary

AWS Elastic Load Balancers automatically distribute incoming traffic across multiple targets and availability zones, ensuring high availability and improved performance of your applications. Here are the key points to remember:

- **Classic Load Balancers:** Outdated and feature-limited; better alternatives are the ALB or NLB.
- **Application Load Balancers (ALB):** Operate at the application layer (Layer 7), support advanced routing based on HTTP/HTTPS attributes, and handle SSL/TLS termination.
- **Network Load Balancers (NLB):** Function at the transport layer (Layer 4) and are ideal for non-HTTP/HTTPS protocols while providing high-performance TCP/UDP traffic forwarding.
- **Cross-Zone Load Balancing:** Ensures even traffic distribution across instances in multiple availability zones.
- **Listeners and Target Groups:** Define how incoming traffic is inspected, routed, and health-checked across various backend resources.

![The image is a summary slide about Elastic Load Balancing (ELB), highlighting its features such as auto-distribution of traffic, types of ELB, and a note on avoiding Classic Load Balancers (CLBs).](https://kodekloud.com/kk-media/image/upload/v1752865617/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/elastic-load-balancing-summary-slide.jpg)

![The image is a summary slide comparing Application Load Balancers (ALB) and Network Load Balancers (NLB), highlighting their functions, speed, and traffic handling capabilities.](https://kodekloud.com/kk-media/image/upload/v1752865618/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/alb-vs-nlb-comparison-summary.jpg)

![The image is a summary slide with three points about load balancing and traffic management in cloud computing, specifically mentioning cross-zone load balancing, listeners, and target groups.](https://kodekloud.com/kk-media/image/upload/v1752865619/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Load-Balancers/load-balancing-traffic-management-summary.jpg)

In summary, Elastic Load Balancers in AWS provide a robust, scalable mechanism to distribute traffic across your infrastructure, ensuring high availability, improved performance, and enhanced security for your applications.

For further details on AWS load balancing and related cloud architecture best practices, refer to the [AWS Documentation](https://aws.amazon.com/documentation/) and explore additional resources on [AWS Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/95fc5cd8-0d7c-40c3-9b3c-8d76aa6ef67b)**
>
> Watch video content
