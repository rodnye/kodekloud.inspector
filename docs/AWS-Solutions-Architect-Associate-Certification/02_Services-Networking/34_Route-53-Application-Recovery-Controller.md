# Route 53 Application Recovery Controller - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Route-53-Application-Recovery-Controller)

---

## Table of Contents

- Route 53 Application Recovery Controller
  - Architecture Overview
  - Key Concepts
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Route 53 Application Recovery Controller

In this article, we explore the Amazon Route 53 Application Recovery Controller and its role in simplifying and automating application recovery processes. This service continuously monitors your application’s health and readiness, ensuring that your system is prepared for any failure.

Amazon Route 53 Application Recovery Controller eliminates the need for manual intervention during failovers by automating continuous checks on your backup or standby site. In the event of a failure in the primary deployment, the controller redirects traffic seamlessly to the standby environment.

> [!important]
> **How It Works**
>
> The controller monitors the primary deployment against predefined criteria. For example, if an application's performance degrades beyond a 5% threshold or during scheduled maintenance, the controller can automatically or manually divert traffic to the standby site.

## Architecture Overview

A typical architecture in the US East-1 region includes the following components for the active site:

- A load balancer
- EC2 instances within an availability zone
- A DynamoDB table accessed by the EC2 instances

The backup site in another region is set up identically, with its own load balancer and EC2 instances that connect to the same global DynamoDB table.

Route 53, our DNS management service, initially directs traffic to the active site’s load balancer. When a failover is needed, Route 53 updates the DNS record to point to the standby site.

Below is a diagram illustrating the Application Recovery Controller architecture, emphasizing how traffic routing is managed between active and standby sites:

![The image illustrates an "Application Recovery Controller Architecture" with a focus on routing control and readiness checks for AWS resources across active and standby sites. It shows a recovery group setup with regions US-EAST-1 and US-WEST-1, highlighting resource sets and cells.](https://kodekloud.com/kk-media/image/upload/v1752865657/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-53-Application-Recovery-Controller/application-recovery-controller-architecture.jpg)

## Key Concepts

Understanding the core elements of the Application Recovery Controller is essential:

| Concept            | Description                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Cells**          | Groups of AWS resources required to operate an application independently (e.g., a load balancer and EC2 instances).                |
| **Recovery Group** | A collection of cells representing an application or group of applications monitored for failover readiness.                       |
| **Resource Set**   | A collection of AWS resources that may span multiple accounts or cells, such as a global DynamoDB table shared across deployments. |

The controller continuously performs readiness checks on the standby deployment, ensuring every resource is operational and available for failover. Additionally, its routing control feature enables manual traffic redirection to the standby site, facilitating a full failover when necessary.

> [!important]
> **Failover Consideration**
>
> When a failover is triggered, Route 53 updates the DNS configuration to route traffic to the standby site. This feature minimizes downtime, but ensure that your standby environment is regularly tested and maintained for uninterrupted availability.

Below is a summary diagram highlighting the key features of the Route 53 Application Recovery Controller, including its monitoring capabilities, simplified failover process, and resource optimization for recovery readiness:

![The image is a summary slide about Amazon Route 53 Application Recovery Controller, highlighting its features such as monitoring application recovery, simplifying processes, and organizing resources for failover readiness.](https://kodekloud.com/kk-media/image/upload/v1752865658/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Route-53-Application-Recovery-Controller/amazon-route-53-recovery-controller-summary.jpg)

## Conclusion

Amazon Route 53 Application Recovery Controller is an indispensable service for ensuring application resiliency. By automating continuous health checks and enabling rapid failover, it simplifies the recovery process and helps maintain high availability with minimal manual intervention.

For more details on setting up and managing failover scenarios, refer to the [Amazon Route 53 Application Recovery Controller documentation](https://aws.amazon.com/route53/application-recovery-controller/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/838140d7-387e-4cd1-8a87-d0e7debc20cf)**
>
> Watch video content
