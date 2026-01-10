# Turning up Security on Application Integration Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Application-Integration-Part-1)

---

## Table of Contents

- Turning up Security on Application Integration Part 1
  - Auto-Scaling and Its Security Implications
  - Elastic Load Balancers and Their Security Features
  - Gateway Load Balancer (GLB)
  - API Gateway Security Features
  - Looking Ahead
  - Watch Video
    - Application Load Balancers (ALB)
    - Network Load Balancers (NLB)

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Application Integration Part 1

Welcome back, Solutions Architects. In this article, we explore designing secure application integration services within AWS. We start with scaling and auto-scaling as key enablers in the AWS ecosystem and then delve into security-enhancing services such as Elastic Load Balancers, Gateway Load Balancers, and API Gateway.

---

## Auto-Scaling and Its Security Implications

Auto-scaling is a prominent feature in the AWS environment, particularly for EC2. Although its primary purpose is dynamic resource management rather than security, understanding its interplay with AWS security services is crucial.

For example, when considering which IAM entity supplies the permissions needed for EC2 auto-scaling, the answer is service-linked roles. These built-in roles grant the necessary privileges to launch instances without adding extra security layers.

![The image is a diagram illustrating AWS Autoscaling architecture, showing users sending HTTP/S requests to an application load balancer within a VPC, which distributes traffic across instances in multiple availability zones. It notes that autoscaling has limited security features as it is an enabler service.](https://kodekloud.com/kk-media/image/upload/v1752863977/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/aws-autoscaling-architecture-diagram.jpg)

When configuring an auto scaling group, aligning the minimum and maximum settings with business continuity, redundancy, and cost requirements is vital. Avoid setting the minimum and maximum to the same number; allow auto-scaling to adjust dynamically with load. Monitoring these events is typically done with CloudWatch metrics and logs, though these tools do not provide intrinsic infrastructure protection.

![The image is a multiple-choice question about which IAM entity is specifically linked to Amazon EC2 Auto Scaling to grant required permissions, with options including user-linked roles, service-linked roles, resource-based policies, and identity-based policies.](https://kodekloud.com/kk-media/image/upload/v1752863978/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/iam-entity-ec2-auto-scaling.jpg)

![The image presents a scenario where a financial institution is deploying an application on Amazon EC2 instances, focusing on security best practices for setting minimum and maximum numbers in an Auto Scaling group. It lists four options for consideration.](https://kodekloud.com/kk-media/image/upload/v1752863979/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/amazon-ec2-auto-scaling-security-options.jpg)

---

## Elastic Load Balancers and Their Security Features

Elastic Load Balancers (ELBs) are available in three types. Each type offers distinct security functionalities to protect and manage traffic. Below, we review the key characteristics of Application Load Balancers (ALB) and Network Load Balancers (NLB).

### Application Load Balancers (ALB)

Operating at Layer 7 of the OSI model, ALBs provide application-level security features. Key benefits include:

- **Security Groups:** Applied to control inbound and outbound traffic.
- **Authentication Support:** Integration with Amazon Cognito to authenticate incoming requests.
- **SSL Termination:** Uses SSL certificates sourced from AWS Certificate Manager with automated renewal.
- **Logging:** Supports access logs (sent to an S3 bucket), API call logs via CloudTrail, and operational metrics through CloudWatch.

Consider this question when asked about the OSI layer at which ALB operates—the answer is Layer 7, highlighting its role in ensuring application-level security.

![The image is a question about the basic architecture of an Application Load Balancer (ALB) with four multiple-choice options describing its functions and characteristics.](https://kodekloud.com/kk-media/image/upload/v1752863981/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/alb-architecture-multiple-choice.jpg)

![The image provides a scenario where a financial technology startup is using an Application Load Balancer (ALB) with Amazon EC2 instances and suggests four strategies for leveraging security groups to enhance security.](https://kodekloud.com/kk-media/image/upload/v1752863982/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/fintech-alb-ec2-security-strategies.jpg)

![The image presents a scenario where a financial institution is deploying an Application Load Balancer (ALB) for its online banking portal, focusing on data encryption and backend performance optimization. It lists four ALB features to achieve these objectives: SSL termination, SSL passthrough, HTTP/2 configuration, and SSL bridging.](https://kodekloud.com/kk-media/image/upload/v1752863983/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/alb-deployment-online-banking-portal.jpg)

![The image shows a configuration screen for setting up access logs in an Application Load Balancer, with options for enabling logs, setting intervals, and specifying an S3 location. It also mentions logging standards like CloudTrail and CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752863984/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/access-logs-configuration-load-balancer.jpg)

![The image describes monitoring and logging options for an Application Load Balancer (ALB) in a global e-commerce platform, listing CloudWatch Metrics, CloudTrail Logs, Access Logs, and VPC Flow Logs as options.](https://kodekloud.com/kk-media/image/upload/v1752863985/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/alb-monitoring-logging-options.jpg)

### Network Load Balancers (NLB)

Operating at Layer 4, NLBs are optimized for handling TCP and TLS traffic. Their key features include:

- **TLS Support:** Provides TLS termination ensuring in-transit encryption.
- **Security Groups:** Now supports security groups for controlling traffic, in addition to subnet-level NACLs.
- **Access Logging:** Available for TLS listeners, similar to ALB.

![The image is a diagram explaining a Network Load Balancer (NLB) setup, showing the flow from an external client to AWS NLB and then to nodes and pods, with notes on security and IP address maintenance.](https://kodekloud.com/kk-media/image/upload/v1752863986/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/network-load-balancer-setup-diagram.jpg)

![The image presents a scenario where a financial technology company is deploying a Network Load Balancer (NLB) for secure data transmission, with four options for features to use: enabling HTTPS listeners, using TLS termination, implementing a Web Application Firewall, and enabling VPC peering.](https://kodekloud.com/kk-media/image/upload/v1752863987/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/financial-tech-nlb-deployment-options.jpg)

![The image is a diagram illustrating a network load balancer setup within a Virtual Private Cloud (VPC), showing the flow of client traffic through security groups and nodes with AWS Load Balancer Controllers. It highlights the use of security groups in the configuration.](https://kodekloud.com/kk-media/image/upload/v1752863988/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/network-load-balancer-vpc-diagram.jpg)

![The image presents a scenario where a corporation is deploying a Network Load Balancer (NLB) and needs to restrict incoming traffic, offering four methods to achieve this: attaching an IAM policy, configuring security groups, assigning a Network Access Control List (NACL), and using AWS Shield.](https://kodekloud.com/kk-media/image/upload/v1752863989/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/network-load-balancer-traffic-restriction.jpg)

Combining NLBs and ALBs can augment performance while maintaining secure TLS processing. For instance, TLS termination can occur at the NLB, with traffic subsequently forwarded to an ALB for application-level path-based routing.

![The image presents a question about access logs in Amazon Network Load Balancer, with four possible statements regarding their functionality and storage.](https://kodekloud.com/kk-media/image/upload/v1752863990/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/amazon-nlb-access-logs-question.jpg)

---

## Gateway Load Balancer (GLB)

The Gateway Load Balancer (GLB) functions as a security appliance, intercepting all incoming traffic at its endpoint. It forwards traffic to one or more virtual appliances (up to 1,500), allowing these appliances to analyze and decide whether to permit or block the traffic. This mechanism is particularly useful when secure, private connectivity across VPCs is required.

Key features include:

- **Endpoint Security:** Although GLBs lack direct security groups, endpoint access can be managed through routing tables and sometimes endpoint-attached security groups.
- **Multi-account Restrictions:** You can limit which AWS accounts are authorized to create endpoints by configuring the GLB to allow only specific principals.
- **Geneve Protocol:** The GLB leverages the Geneve protocol (Generic Network Virtualization Encapsulation) to intercept and encapsulate traffic, adding metadata for network virtualization and specialized appliance functions.
- **Monitoring:** Integration with CloudWatch and support for VPC flow logs enables comprehensive monitoring of traffic.

![The image presents a scenario about deploying a Gateway Load Balancer for secure connectivity between virtual appliances and application servers across VPCs, with four options for achieving this.](https://kodekloud.com/kk-media/image/upload/v1752863991/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/gateway-load-balancer-deployment-options.jpg)

![The image provides a scenario where a cloud architect needs to configure a Gateway Load Balancer (GLB) for a multi-account AWS setup, with four options on how to restrict endpoint creation to specific AWS accounts, IAM roles, and users.](https://kodekloud.com/kk-media/image/upload/v1752863993/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/gateway-load-balancer-aws-setup.jpg)

![The image is a diagram illustrating the process of a Gateway Load Balancer (GLB) using the Geneve protocol for secure traffic exchange. It shows the flow of packets between a source, the GLB, appliances, and the destination, with detailed steps and packet structures.](https://kodekloud.com/kk-media/image/upload/v1752863993/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/gateway-load-balancer-geneve-diagram.jpg)

![The image is a diagram illustrating a Gateway Load Balancer setup with instances in two subnets within a VPC, using CloudWatch, CloudTrail, and VPC flow logs for monitoring, and storing logs in an Amazon S3 bucket and CloudWatch Logs.](https://kodekloud.com/kk-media/image/upload/v1752863994/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/gateway-load-balancer-diagram.jpg)

> [!important]
> **Note**
>
> For detailed monitoring of traffic on specific network interfaces, enable VPC flow logs. This provides low-level network data compared to CloudTrail, which logs only API calls.

---

## API Gateway Security Features

API Gateway serves as the entry point for accessing backend services and offers distinct security features compared to load balancers. Its capabilities include:

- **Encryption:** Endpoints are secured using SSL/TLS, and cached responses can also be encrypted.
- **Mutual TLS:** Ensures both the client and server mutually authenticate each other.
- **Custom Authorization:** Offers several authentication options, including Lambda Authorizers for custom logic.
- **Usage Plans and Throttling:** Protects backend resources by supporting quotas and rate limiting.
- **Logging and Tracing:** CloudWatch Logs, detailed metrics, and X-Ray tracing provide comprehensive visibility into API activity.

Consider deploying APIs with tightly controlled access by using API keys, usage plans, and custom authorization methods. This setup helps service third-party developers while protecting backend systems.

![The image presents a question about the basic architecture of Amazon API Gateway, offering four statements to choose from. It describes API Gateway as a service for managing microservices-based applications.](https://kodekloud.com/kk-media/image/upload/v1752863995/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/amazon-api-gateway-architecture-question.jpg)

![The image is a diagram illustrating an API Gateway setup in AWS, showing connections between web clients, an Amazon API Gateway, and various AWS services like Elastic Load Balancers, AWS Lambda, and Amazon S3. It highlights the security features of the API Gateway.](https://kodekloud.com/kk-media/image/upload/v1752863996/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/api-gateway-aws-diagram.jpg)

![The image is a diagram illustrating the flow of data through an Amazon API Gateway, showing connections from mobile apps, websites, and services to various AWS services and endpoints. It highlights that encryption is supported for API endpoints and cache.](https://kodekloud.com/kk-media/image/upload/v1752863998/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/amazon-api-gateway-data-flow-diagram.jpg)

![The image presents a question about the encryption capabilities of Amazon API Gateway, with four multiple-choice options describing different encryption scenarios.](https://kodekloud.com/kk-media/image/upload/v1752863999/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/amazon-api-gateway-encryption-quiz.jpg)

![The image is a diagram illustrating the support for Mutual TLS in an API Gateway setup using AWS services, including AWS Certificate Manager, Amazon S3, and Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752864000/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/mutual-tls-api-gateway-aws-diagram.jpg)

![The image is a flowchart illustrating the authorization process in an API Gateway using IAM, Cognito, and third-party identity providers. It shows the steps from user login to access evaluation by the API Gateway.](https://kodekloud.com/kk-media/image/upload/v1752864001/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/api-gateway-authorization-flowchart.jpg)

![The image presents a question about which Amazon API Gateway feature can help a fintech startup implement custom authorization logic based on user roles and permissions, with four options provided: API Gateway resource policies, AWS IAM policies, Lambda Authorizer, and API Gateway CORS headers.](https://kodekloud.com/kk-media/image/upload/v1752864002/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/amazon-api-gateway-authorization-options.jpg)

A common scenario is exposing a set of APIs to third-party developers while restricting access with API keys and usage plans. Throttling, along with detailed logging via CloudWatch and X-Ray tracing, ensures both security and performance.

![The image is a flowchart illustrating the process of an API Gateway, showing user requests going through authorization, method requests, integration requests, and responses, with integration options like Lambda, Amazon SNS, and HTTP endpoints.](https://kodekloud.com/kk-media/image/upload/v1752864003/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/api-gateway-flowchart-requests.jpg)

![The image shows a screenshot of an API Gateway interface, specifically the "dev Stage Editor" with settings for CloudWatch and custom access logging. The text "Logging is standard" is displayed below the screenshot.](https://kodekloud.com/kk-media/image/upload/v1752864004/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/api-gateway-dev-stage-editor-logging.jpg)

![The image presents a question about which Amazon API Gateway feature a financial technology startup should use for detailed logging of API requests and responses, with four options provided: custom domains, deployment stages, CloudWatch Logs integration, and caching.](https://kodekloud.com/kk-media/image/upload/v1752864005/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Application-Integration-Part-1/amazon-api-gateway-logging-options.jpg)

---

## Looking Ahead

In the next section, we will introduce AppFlow and explore its role in enhancing security and integration within the AWS ecosystem.

This concludes our detailed exploration of auto-scaling, load balancers, and API Gateway security features. Each service plays a unique yet complementary role in ensuring robust, scalable, and secure application integration in AWS.

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/8fa6bb47-27cb-4400-ae6f-2e49becd56e9)**
>
> Watch video content
