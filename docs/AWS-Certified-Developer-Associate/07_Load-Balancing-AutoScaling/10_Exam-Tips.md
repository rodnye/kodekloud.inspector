# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Load-Balancing-AutoScaling/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Elastic Load Balancers
  - Types of Load Balancers
  - Autoscaling Groups
  - Watch Video
    - Additional ELB Features
    - Application Load Balancer
    - Network Load Balancer
    - Gateway Load Balancer
    - Scaling Options

---

## Content

AWS Certified Developer - Associate

Load Balancing AutoScaling

# Exam Tips

Below are some essential points to remember for the exam regarding AWS load balancers and autoscaling groups. This guide covers key concepts, features, and configurations that will help you tackle related exam questions with confidence.

## Elastic Load Balancers

Elastic Load Balancers (ELBs) distribute incoming traffic to multiple servers using a single DNS entry. They support a variety of targets such as EC2 instances, Lambda functions, ECS tasks, and IP addresses. By distributing traffic across different Availability Zones, ELBs ensure high availability and can be configured as either public or private depending on whether your application is internet-facing or used internally.

A target group routes requests to one or more registered targets (e.g., EC2 instances), while a listener monitors for connection requests on a specified protocol and port.

![The image provides tips for understanding load balancers, including their ability to distribute traffic, support various targets, and operate publicly or privately. It also explains the roles of target groups and listeners in managing traffic requests.](https://kodekloud.com/kk-media/image/upload/v1752859075/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/load-balancer-tips-traffic-management.jpg)

### Additional ELB Features

- **Cross-Zone Load Balancing:** This feature ensures that traffic is evenly distributed across instances in all Availability Zones. Although it is enabled by default, always verify its status during troubleshooting or when addressing questions on even traffic distribution.
- **Connection Draining:** When enabled, connection draining prevents new requests from being sent to instances that are deregistering while allowing existing connections to complete their tasks.

![The image provides tips for acing an exam on load balancers, highlighting cross-zone load balancing and connection draining features.](https://kodekloud.com/kk-media/image/upload/v1752859077/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/load-balancer-exam-tips.jpg)

> [!important]
> **Key Consideration**
>
> Proper configuration of Elastic Load Balancers not only enhances performance but also improves security and reliability within your AWS environment.

## Types of Load Balancers

AWS offers different types of load balancers, each designed for specific use cases.

### Application Load Balancer

The Application Load Balancer (ALB) operates at Layer 7 and is optimized for handling HTTP/HTTPS requests. It is ideal for web-based applications as it can distribute traffic based on URL paths, host names, HTTP headers, and query parameters. The ALB also supports HTTP redirects and WebSocket connections, with SSL termination performed at the load balancer.

![The image provides tips for understanding application load balancers, highlighting features such as operating at Layer 7, being HTTP/HTTPS aware, and supporting web-based applications. It also mentions capabilities like load balancing based on HTTP properties, performing HTTP redirects, and working with WebSockets.](https://kodekloud.com/kk-media/image/upload/v1752859077/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/application-load-balancer-tips.jpg)

### Network Load Balancer

The Network Load Balancer (NLB) functions at Layer 4 and is optimized for TCP and UDP traffic, making it suitable for non-HTTP applications. It delivers lower latency and faster performance compared to Application Load Balancers and supports static IP addresses, providing a consistent endpoint.

![The image is a slide titled "Tips to Ace Your Exam – Load Balancers," listing features of a Network Load Balancer, including its operation at Layer 4, ability to load balance TCP/UDP, suitability for non-HTTP traffic, and speed compared to an Application Load Balancer.](https://kodekloud.com/kk-media/image/upload/v1752859079/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/tips-to-ace-exam-load-balancers.jpg)

### Gateway Load Balancer

The Gateway Load Balancer is designed for deploying, scaling, and managing third-party virtual appliances such as firewalls and Intrusion Detection and Prevention (IDP) systems within your VPC. Operating at Layer 3, it routes traffic to virtual appliances that inspect, filter, or modify traffic based on predefined policies before forwarding it.

![The image provides tips for acing an exam on load balancers, specifically focusing on the Gateway Load Balancer, which helps manage virtual appliances and route traffic based on predefined policies.](https://kodekloud.com/kk-media/image/upload/v1752859080/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/load-balancer-exam-tips-gateway.jpg)

## Autoscaling Groups

Autoscaling groups automatically adjust the number of EC2 instances based on metrics such as traffic demand. While there is no additional cost for autoscaling itself, you are billed for the EC2 instances and associated infrastructure that run as part of the scaling process. AWS uses a Launch Template, which details settings like the AMI, instance type, and security groups, when provisioning new instances.

![The image provides tips for acing an exam on Auto Scaling Groups, highlighting features like scaling EC2 instances based on metrics, cost considerations, and AWS Launch Template specifications.](https://kodekloud.com/kk-media/image/upload/v1752859081/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/auto-scaling-groups-exam-tips.jpg)

### Scaling Options

Autoscaling groups offer various methods to adjust capacity in response to workload changes:

| Scaling Method     | Description                                                                       | Key Features                                                                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dynamic Scaling    | Adjusts group capacity in response to real-time traffic changes.                  | \\- **Simple Scaling:** Single incremental adjustments.<br>- **Step Scaling:** Adjustments based on predefined thresholds.<br>- **Target Tracking:** Maintains a specific metric at a target value. |
| Predictive Scaling | Uses machine learning to forecast future traffic patterns and scales proactively. | Predicts peaks based on historical data to optimize performance and resource allocation.                                                                                                            |
| Scheduled Scaling  | Performs scaling actions at predefined times based on expected demand.            | Ideal for planned events or predictable traffic patterns.                                                                                                                                           |

In addition, autoscaling groups incorporate a cooldown period—a waiting time after a scaling action during which no further scaling occurs. The instance refresh feature allows for rolling updates to EC2 instances after modifying the launch template, ensuring that updates are applied consistently.

![The image provides tips for acing an exam on Auto Scaling Groups, detailing different scaling methods such as dynamic, simple, step, target tracking, and predictive scaling.](https://kodekloud.com/kk-media/image/upload/v1752859082/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/auto-scaling-groups-exam-tips-2.jpg)

![The image provides exam tips related to Auto Scaling Groups, explaining the cooldown period and instance refresh process.](https://kodekloud.com/kk-media/image/upload/v1752859083/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/auto-scaling-groups-exam-tips-3.jpg)

> [!important]
> **Exam Strategy**
>
> A thorough understanding of autoscaling options and cooldown mechanics will help you optimize both performance and costs. Familiarize yourself with these concepts to maximize your exam success.

By mastering these core concepts and features, you'll be well-prepared to answer exam questions on AWS load balancing and autoscaling strategies efficiently.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/c72b04b7-a262-495a-9844-9e03ff4692e7)**
>
> Watch video content
