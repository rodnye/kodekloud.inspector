# Turning up Reliability on Application Integration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Turning-up-Reliability-on-Application-Integration)

---

## Table of Contents

- Turning up Reliability on Application Integration
  - Auto Scaling and Application Load Balancers
  - Load Balancers: Application, Network, and Gateway
  - API Gateway
  - AppFlow
  - Messaging and Queueing Services
  - Workflows and Orchestration
  - Conclusion
  - Watch Video
    - Application Load Balancer (ALB)
    - Network Load Balancer (NLB)
    - Gateway Load Balancer (GLB)
    - Simple Notification Service (SNS)
    - Simple Queue Service (SQS)
    - Amazon MQ
    - EventBridge
    - Simple Email Service (SES)
    - AWS Step Functions
    - Simple Workflow Service (SWF) and Managed Apache Airflow

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Turning up Reliability on Application Integration

Welcome to this lesson on enhancing reliability in application integration services. In this guide, we explore how various AWS services—such as Auto Scaling, Load Balancers, API Gateway, AppFlow, messaging systems, and orchestration tools—work together to create highly resilient architectures.

---

## Auto Scaling and Application Load Balancers

Auto Scaling automatically launches new instances when failures occur, ensuring that your system remains resilient during disruptions. Although an auto scaling group might appear to have a single endpoint (the load balancer), the Application Load Balancer (ALB) is actually a virtual service comprised of multiple devices. It efficiently distributes traffic across instances, ensuring continuous availability even if one or more instances fail.

![The image explains AWS autoscaling, showing a diagram of an AWS cloud setup with an application load balancer and auto-scaling groups across availability zones. It also includes a graph illustrating capacity adjustments throughout the week.](https://kodekloud.com/kk-media/image/upload/v1752863582/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-autoscaling-diagram-load-balancer.jpg)

Auto Scaling not only replaces failed instances but also evenly distributes instances across multiple Availability Zones (AZs). Note that enabling cross-zone load balancing is crucial for even connection distribution. For example, without cross-zone load balancing, you might see connection counts like 8.3, 8, or 12.5 per zone instead of a consistent value (e.g., 10-10).

![The image explains how Auto Scaling can ensure reliability for a company's EC2 instances behind an Application Load Balancer, listing methods such as launching new instances, distributing across zones, caching content, and enabling health checks.](https://kodekloud.com/kk-media/image/upload/v1752863583/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/auto-scaling-ec2-reliability-diagram.jpg)

In addition, Auto Scaling improves resiliency during traffic surges by launching instances on-demand. By placing a load balancer between clients and services, it decouples components, buffering the system against potential failures.

![The image explains how Auto Scaling can improve the resiliency of a web tier on EC2 instances by handling traffic spikes, distributing instances, caching content, and setting up scheduled scaling actions.](https://kodekloud.com/kk-media/image/upload/v1752863584/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/auto-scaling-ec2-resiliency-diagram.jpg)

Auto Scaling also integrates with load balancers to ensure that even minimal auto scaling groups are automatically replenished when instances are replaced, maintaining system loose coupling.

![The image presents a question about how Auto Scaling can help decouple components in a system with EC2 instances and an Application Load Balancer, offering four options: using multiple smaller Auto Scaling groups, distributing instances across Availability Zones, caching content in Amazon ElastiCache, and enabling ELB health checks for ASG instances.](https://kodekloud.com/kk-media/image/upload/v1752863585/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/auto-scaling-decouple-ec2-options.jpg)

When cross-zone load balancing is enabled, connections are uniformly distributed across zones, further enhancing overall resiliency.

![The image illustrates the concept of autoscaling with a comparison between cross-zone load balancing disabled and enabled, showing how connections are distributed across availability zones.](https://kodekloud.com/kk-media/image/upload/v1752863585/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/autoscaling-cross-zone-load-balancing.jpg)

---

## Load Balancers: Application, Network, and Gateway

### Application Load Balancer (ALB)

Operating at layer 7, ALBs can abstract HTTP/HTTPS traffic and perform target group health checks to detect and replace unhealthy instances. They support multiple listeners and rules, which allows you to distribute traffic based on geography or URL path patterns.

![The image shows a configuration screen for an Application Load Balancer, highlighting settings for health check protocol and path. It includes options for selecting the protocol and specifying a custom path for health checks.](https://kodekloud.com/kk-media/image/upload/v1752863586/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/application-load-balancer-health-checks.jpg)

For example, a Fintech company might use SSL termination at the ALB to decrypt TLS traffic, offloading backend servers and boosting overall performance and resiliency.

![The image describes a scenario where a financial technology company is using an Application Load Balancer (ALB) for encrypted data transmission and backend server optimization, listing four ALB features to achieve these objectives.](https://kodekloud.com/kk-media/image/upload/v1752863588/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/alb-encrypted-data-transmission-features.jpg)

ALBs also generate rich metrics (e.g., response times) via CloudWatch, enabling proactive monitoring of application availability across AZs.

![The image shows a graph of target response times for an Application Load Balancer, displaying metrics like p50, p90, p99, and minimum response times over a selected period. Below the graph, there is a table listing these metrics with details such as namespace, dimensions, and statistics.](https://kodekloud.com/kk-media/image/upload/v1752863588/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/application-load-balancer-response-times.jpg)

Furthermore, ALB access logs can be sent to S3 or CloudWatch Logs to capture critical data such as client IP addresses, request paths, and response codes for in-depth analysis and troubleshooting.

![The image describes monitoring and logging options for an Application Load Balancer (ALB) in a global e-commerce platform, listing CloudWatch Metrics, CloudTrail Logs, Access Logs, and VPC Flow Logs as options.](https://kodekloud.com/kk-media/image/upload/v1752863590/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/alb-monitoring-logging-options.jpg)

When deployed across multiple AZs, integrating ALBs with Auto Scaling and ensuring cross-zone load balancing are essential practices to maintain availability and balanced routing.

![The image presents a question about ensuring resiliency in an application load balancer across multiple availability zones, with four options: integrating with Auto Scaling, enabling sticky sessions, setting up multiple target groups, and configuring cross-zone load balancing.](https://kodekloud.com/kk-media/image/upload/v1752863591/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/resiliency-application-load-balancer-options.jpg)

### Network Load Balancer (NLB)

Operating at the transport layer, Network Load Balancers are engineered for high performance and handle TCP, UDP, and TLS traffic efficiently. Their straightforward configurations include target group health checks on specified ports. While NLBs do not support path-based routing, they integrate seamlessly with Auto Scaling as reliable targets.

![The image is a diagram illustrating a network load balancer setup in an AWS cloud environment, showing components like public subnets, EC2 instances, and availability zones. It highlights the flow from internet-facing to internal network load balancers.](https://kodekloud.com/kk-media/image/upload/v1752863591/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-network-load-balancer-diagram.jpg)

Enabling cross-zone load balancing allows the NLB to associate virtual endpoints under a single DNS name and direct connections to healthy target instances without interruption.

![The image presents a question about maintaining a Network Load Balancer's availability during AZ outages, with four potential solutions: enabling cross-zone load balancing, implementing multiple target groups, setting up Network ACL rules, and integrating with Amazon Route 53.](https://kodekloud.com/kk-media/image/upload/v1752863593/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/network-load-balancer-availability-solutions.jpg)

![The image is a diagram illustrating a Network Load Balancer setup with cross-zone load balancing enabled, showing the flow from NLB CNAME to endpoints and target instances.](https://kodekloud.com/kk-media/image/upload/v1752863593/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/network-load-balancer-diagram.jpg)

Even with its simplicity, correctly configured health checks (which may even support TLS) are essential to guarantee that the service remains available.

![The image shows a configuration interface for editing health check settings of a Network Load Balancer, including protocol, path, and advanced settings like thresholds and timeout.](https://kodekloud.com/kk-media/image/upload/v1752863595/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/network-load-balancer-health-check-settings.jpg)

NLBs can also be deployed with static IP addresses and integrated with on-premises resources, making them a flexible choice for hybrid architectures.

![The image is a diagram illustrating a network load balancer setup, showing the flow from a corporate data center through an egress firewall to AWS Cloud, involving public and private subnets, target groups, and services.](https://kodekloud.com/kk-media/image/upload/v1752863596/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/network-load-balancer-setup-diagram.jpg)

For detailed traffic monitoring, VPC Flow Logs capture low-level metadata that aids in troubleshooting network issues.

![The image shows a screenshot of AWS CloudWatch Logs displaying VPC Flow Logs, with a note indicating that these logs capture traffic for Network Load Balancers (NLBs).](https://kodekloud.com/kk-media/image/upload/v1752863597/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-cloudwatch-vpc-flow-logs.jpg)

If detailed logs for TLS listeners are required, NLB listener access logs offer standard metrics and logging capabilities.

![The image is a diagram illustrating a Network Load Balancer (NLB) setup, showing the flow from a user to app nodes, with logs being stored in an S3 bucket. It notes that NLBs have standard metrics and logging, including access logs for TLS listeners.](https://kodekloud.com/kk-media/image/upload/v1752863598/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/network-load-balancer-setup-diagram-2.jpg)

### Gateway Load Balancer (GLB)

Gateway Load Balancers are built for traffic inspection appliances such as firewalls and packet inspectors. They receive traffic from endpoints defined in routing tables, forward it to inspection devices, and then deliver approved traffic to application servers. GLBs work closely with Auto Scaling groups to adjust capacity on demand.

![The image is a diagram illustrating a Gateway Load Balancer setup, showing the flow of traffic between application servers, a load balancer endpoint, and security appliances within different availability zones and VPCs.](https://kodekloud.com/kk-media/image/upload/v1752863599/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/gateway-load-balancer-traffic-diagram.jpg)

Monitoring the health of GLBs is essential. Use dedicated health checks and enable cross-zone load balancing to ensure continuous availability, even if an AZ encounters issues.

![The image illustrates a Gateway Load Balancer setup within a VPC, showing instances in two subnets and the use of CloudWatch, CloudTrail, and VPC Flow Logs for monitoring, with data being sent to an Amazon S3 bucket and CloudWatch Logs.](https://kodekloud.com/kk-media/image/upload/v1752863600/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/gateway-load-balancer-vpc-setup.jpg)

---

## API Gateway

Amazon API Gateway enables you to create, deploy, and monitor both REST and WebSocket APIs. It offers additional features beyond what ALBs provide, such as caching, throttling, and rate limiting.

![The image is a diagram illustrating the Amazon API Gateway, showing its integration with various services like AWS Lambda, Amazon EC2, and Amazon DynamoDB, as well as its connection to users, applications, and data centers.](https://kodekloud.com/kk-media/image/upload/v1752863601/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-api-gateway-diagram.jpg)

For instance, API Gateway supports stateful WebSocket APIs and stateless REST APIs through distinct deployment stages. Throttling policies are implemented to protect backend services from sudden traffic spikes, ensuring controlled burst capacity and preventing cascading failures.

![The image presents a question about how an API Gateway supports both REST and WebSocket APIs, with four possible answers related to enabling support, implementing deployment stages, enabling private endpoints, and caching responses.](https://kodekloud.com/kk-media/image/upload/v1752863603/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/api-gateway-rest-websocket-question.jpg)

Canary deployments allow you to test new API versions with a small percentage of traffic before a full rollout.

![The image shows an API Gateway interface with a "Prod Stage Editor" for managing canary deployments, including options to promote or delete a canary. It highlights the distribution of requests between the canary and production stages.](https://kodekloud.com/kk-media/image/upload/v1752863604/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/api-gateway-canary-deployments-editor.jpg)

API Gateway is engineered with fault tolerance in mind. Features such as client token policies and built-in error handling help prevent service failures by isolating issues effectively.

---

## AppFlow

AWS AppFlow is a fully managed integration service that securely transfers data between AWS services and third-party applications. With built-in redundancy across multiple AZs, AppFlow ensures continuous data transfers even during an AZ failure.

![The image is a flowchart illustrating the design for reliability using AWS AppFlow, showing data transfer and processing between Jira Cloud, Amazon S3, AWS Glue, and Amazon Athena. It highlights the use of built-in redundancy to ensure transfer reliability.](https://kodekloud.com/kk-media/image/upload/v1752863605/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-appflow-reliability-flowchart.jpg)

For enhanced monitoring and visibility, CloudWatch dashboards combined with service logs provide insights into flow metrics and data transfer statuses.

![The image presents a question about providing visibility into flow metrics for a company using AWS AppFlow, with four options: enabling flow logs in Amazon S3, creating CloudWatch dashboards, caching flow data in Amazon ElastiCache, and implementing an Application Load Balancer.](https://kodekloud.com/kk-media/image/upload/v1752863606/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-appflow-flow-metrics-visibility.jpg)

---

## Messaging and Queueing Services

### Simple Notification Service (SNS)

SNS is a fully managed publish/subscribe messaging service designed for high availability and fault tolerance. It automatically handles message retries and supports dead-letter queues for undeliverable messages, ensuring that no critical message is lost.

![The image is a diagram illustrating the use of AWS Simple Notification Service (SNS) and Simple Queue Service (SQS) for managing encrypted data flow between EC2 instances in a healthcare system. It shows interactions between physicians, an EMR system, and various integration systems like billing, scheduling, and prescription.](https://kodekloud.com/kk-media/image/upload/v1752863607/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-sns-sqs-healthcare-diagram.jpg)

Using dead-letter queues allows you to capture and analyze any messages that fail to be delivered, preventing cascading failures.

![The image is a diagram illustrating the flow of a Simple Notification Service (SNS) with a Dead Letter Queue for handling undeliverable items, involving components like Event Bridge, Lambda Function, and SQS.](https://kodekloud.com/kk-media/image/upload/v1752863609/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/sns-dead-letter-queue-diagram.jpg)

CloudWatch and AWS X-Ray can further augment your observability into SNS message processing and detect potential issues.

![The image is a flowchart illustrating the process of Amazon's Simple Notification Service (SNS) integrating with various AWS services like Amazon Connect, CloudWatch, and AWS Chatbot, with outputs to email, SMS, and Slack. It highlights the use of CloudTrail and CloudWatch for metrics and auditing.](https://kodekloud.com/kk-media/image/upload/v1752863609/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-sns-integration-flowchart.jpg)

### Simple Queue Service (SQS)

SQS is a robust, fully managed queueing service designed to ensure that messages are processed at least once. Features like long polling reduce unnecessary responses, and the visibility timeout mechanism prevents duplicate processing.

![The image illustrates the process of a Simple Queue Service (SQS) with three steps: sending a message to the queue, retrieving it with a visibility timeout, and processing and deleting it. It highlights the locking mechanism to ensure at least once processing.](https://kodekloud.com/kk-media/image/upload/v1752863611/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/sqs-message-processing-diagram.jpg)

For applications that require maintaining order, FIFO (First-In-First-Out) queues provide strict ordering, albeit with a trade-off in throughput.

![The image illustrates a Simple Queue Service (SQS) FIFO queue, showing the order of auction items being processed from last in to first in. It includes a note about enabling First In First Out for increased ordering reliability.](https://kodekloud.com/kk-media/image/upload/v1752863611/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/sqs-fifo-queue-auction-items.jpg)

SQS’s distributed architecture also provides excellent scalability across multiple servers.

![The image illustrates a Simple Queue Service (SQS) setup, showing distributed system components and a queue distributed across multiple servers, highlighting built-in scalability.](https://kodekloud.com/kk-media/image/upload/v1752863613/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/sqs-setup-distributed-architecture.jpg)

### Amazon MQ

Amazon MQ offers managed messaging brokers that support industry-standard protocols such as MQTT, AMQP, and more. With capabilities like message mirroring, redelivery policies, and priority dispatch, Amazon MQ ensures reliable message delivery even during broker failures.

![The image is a diagram illustrating the architecture of Amazon MQ, showing the integration of customer data centers, firewalls, transit gateways, and AWS services like Lambda and VPC. It highlights the reliability features of Amazon MQ through redelivery and priority dispatch policies.](https://kodekloud.com/kk-media/image/upload/v1752863614/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-mq-architecture-diagram.jpg)

Dead-letter queues are also available in Amazon MQ to handle messages that exceed the maximum redelivery count.

![The image presents a question about configuring Amazon MQ to manage message redeliveries effectively, with four suggested solutions: using Dead Letter Queue, integrating with AWS Lambda, utilizing message filtering, and publishing to an SNS topic.](https://kodekloud.com/kk-media/image/upload/v1752863615/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-mq-message-redeliveries-solutions.jpg)

Additionally, priority dispatch policies and message eviction strategies further help prioritize and manage critical workloads.

![The image presents a question about prioritizing message processing in Amazon MQ, with four options: implementing priority dispatch policies, using Multi-AZ redundancy, message compression, and caching messages.](https://kodekloud.com/kk-media/image/upload/v1752863616/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-mq-message-prioritization-options.jpg)

![The image is a diagram illustrating the architecture of Amazon MQ, showing the integration of customer data centers, firewalls, transit gateways, and AWS services like Lambda and VPC. It highlights message eviction strategies for ensuring message availability when storage is constrained.](https://kodekloud.com/kk-media/image/upload/v1752863617/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-mq-architecture-diagram-2.jpg)

### EventBridge

Amazon EventBridge, the evolution of CloudWatch Events, is a serverless event bus that enables event-driven architectures by connecting AWS services with SaaS applications. It supports features like event replay, retry policies, and filtering to manage events appropriately.

![The image presents a question about Amazon EventBridge, asking which description best fits it, with four options provided.](https://kodekloud.com/kk-media/image/upload/v1752863619/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-eventbridge-question-options.jpg)

Event replay capabilities allow you to resend unprocessed events, while integration with SQS dead-letter queues helps capture failed events.

![The image is a diagram illustrating the use of Amazon EventBridge to connect services, including AWS Lambda, with scheduling and custom event pattern rules. It shows how events from an order service are processed and routed to different AWS Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752863620/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-eventbridge-lambda-diagram.jpg)

![The image illustrates a flowchart of an Amazon EventBridge system handling a ThrottlingException, with a queue for retries, leading to an Amazon API Gateway, a backend application, and a constrained database. It mentions the use of Dead Letter Queues for retry and catchall purposes.](https://kodekloud.com/kk-media/image/upload/v1752863622/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/amazon-eventbridge-throttling-flowchart.jpg)

### Simple Email Service (SES)

Amazon Simple Email Service (SES) is a managed email service engineered for high deliverability. With built-in redundancy and virus scanning, SES integrates with CloudWatch for performance metrics while the Virtual Deliverability Manager helps optimize email campaigns.

![The image is a flowchart illustrating the process of a Simple Email Service (SES) using AWS components, including Route 53, SNS Fanout, Lambda, and S3 buckets for email and attachment handling. It shows how emails are processed, encrypted, and stored, with a focus on virus scanning and large-scale email distribution.](https://kodekloud.com/kk-media/image/upload/v1752863623/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/simple-email-service-flowchart.jpg)

A mailbox simulator is available in SES to test email rendering and performance across different providers.

![The image shows a dashboard for a Simple Email Service (SES) with metrics like open rate, click rate, and total send volume, alongside a table of sending identities and their performance statistics.](https://kodekloud.com/kk-media/image/upload/v1752863624/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/ses-dashboard-metrics-performance.jpg)

---

## Workflows and Orchestration

### AWS Step Functions

AWS Step Functions offer serverless workflow orchestration with built-in error handling through retry and catch configurations. This visual state machine enables you to monitor workflow executions via both the console and CloudWatch.

![The image is a diagram illustrating an AWS Step Functions workflow, showing interactions between a user, IAM roles, Amazon EventBridge, Amazon SNS, and an API Gateway. It highlights steps like validating policy, choosing actions, and applying choices.](https://kodekloud.com/kk-media/image/upload/v1752863626/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-step-functions-workflow-diagram.jpg)

Enhanced error handling is achievable by configuring catchers that manage unexpected failures within workflows.

![The image is a slide discussing how AWS Step Functions can support error handling in workflows, listing methods such as configuring error handling states, using activity heartbeats, synchronous Express workflows, and long-running Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752863628/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-step-functions-error-handling.jpg)

For visual execution tracking, the Step Functions console provides detailed state transitions, error messages, and metrics.

![The image presents a question about monitoring AWS Step Functions executions visually, with four possible solutions: using the Step Functions console, Express workflows, error handling with Retry states, and enabling activity heartbeats.](https://kodekloud.com/kk-media/image/upload/v1752863629/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/aws-step-functions-monitoring-solutions.jpg)

### Simple Workflow Service (SWF) and Managed Apache Airflow

While the Simple Workflow Service (SWF) is an older orchestration solution requiring manual setup and consideration of AZ distribution, it offers reliability for long-running workflows. For modern orchestration demands, Managed Workflows for Apache Airflow (MWAA) provides a scalable, managed solution for complex data orchestration tasks. Airflow automatically retries failed tasks and supports multi-AZ deployments to ensure high availability.

![The image is a diagram of Amazon MWAA (Managed Workflows for Apache Airflow) architecture, showing components like Airflow Schedulers, Workers, and Web Server, along with integrations with AWS services such as CloudWatch and S3. It highlights the complexity and management features of MWAA.](https://kodekloud.com/kk-media/image/upload/v1752863630/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/mwaa-architecture-diagram-aws.jpg)

A typical MWAA configuration distributes tasks across multiple AZs with integrated CloudWatch logging for observability.

![The image presents a question about ensuring workflow continuity in Managed Apache Airflow, followed by four options for providing reliability, including automatic retries, caching, message queues, and multi-region deployments.](https://kodekloud.com/kk-media/image/upload/v1752863631/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Application-Integration/workflow-continuity-managed-airflow-options.jpg)

---

## Conclusion

In summary, this lesson has covered a broad range of AWS services that enhance reliability and resiliency in application integration. From Auto Scaling and various load balancers to API Gateway, AppFlow, messaging services (SNS, SQS, Amazon MQ, and EventBridge), SES, and orchestration tools such as Step Functions and Managed Apache Airflow, the guiding principles of loose-coupling and redundancy are paramount. By integrating these services effectively, you can design robust, fault-tolerant architectures that gracefully handle failures and manage traffic surges.

Thank you for joining this lesson on turning up reliability in application integration. We hope these insights help you design resilient and scalable systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/dde6dc63-fcc1-46ff-873e-60de74a997b4)**
>
> Watch video content
