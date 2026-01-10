# Turning up Reliability on Compute Services Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Turning-up-Reliability-on-Compute-Services-Part-1)

---

## Table of Contents

- Turning up Reliability on Compute Services Part 1
  - Designing Resilient EC2 Deployments
  - Monitoring and Auditing for Reliability
  - Leveraging EC2 Image Builder and Elastic Beanstalk
  - A Note on Lightsail and Containers
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Turning up Reliability on Compute Services Part 1

Future AWS Solutions Architects, in this lesson we explore designing for reliability on compute services with a focus on EC2. As you know, Amazon EC2 (Elastic Compute Cloud) requires you to assume more resiliency responsibilities compared to fully managed services like AWS Lambda. This lesson emphasizes the shared responsibility model, where AWS manages the underlying infrastructure and you manage elements such as workload architecture and failure management.

![The image is a diagram illustrating the shared responsibility model for cloud resilience, dividing responsibilities between the customer and AWS. It highlights customer responsibilities "in" the cloud, such as workload architecture and failure management, and AWS responsibilities "of" the cloud, like hardware, services, and global infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752863632/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/shared-responsibility-model-cloud-resilience.jpg)

When designing for resiliency on compute services, you often face questions about the division of responsibilities. For instance, consider a scenario where a company uses AWS for its application infrastructure and the CTO requires clarity on who handles tasks such as data replication. In a multi-region setup, AWS is responsible for data replication between Availability Zones and for managing the physical hardware and data centers. On the other hand, tasks like database backups, scaling compute resources, and securing virtual machine operating systems become the customer’s responsibility.

![The image presents a question about AWS reliability responsibilities, asking which aspects are managed by AWS, with options including data replication, database backup, resource scaling, security, and hardware maintenance.](https://kodekloud.com/kk-media/image/upload/v1752863633/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-reliability-responsibilities-question.jpg)

![The image presents a scenario where a company needs to recover EC2 application instances rapidly, with a recovery time objective of 10 minutes, and lists four approaches to meet this requirement.](https://kodekloud.com/kk-media/image/upload/v1752863635/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-application-recovery-approaches-2.jpg)

A key point to remember is the distinction between the host operating system (managed by AWS) and the instance operating system (managed by you). For example, in Amazon RDS (except for RDS Custom), you cannot log in to the underlying virtual machines, so AWS handles patching and security. In contrast, with EC2, EMR, or RDS Custom where you have operating system-level access, it becomes your responsibility to ensure that the OS remains secure and up to date.

## Designing Resilient EC2 Deployments

To enhance EC2 resilience, the most common strategy is to use load balancing and Auto Scaling groups. These tools automatically add additional EC2 instances to ensure minimal downtime if an instance fails.

![The image is a diagram of an AWS architecture setup, showing a VPC with multiple availability zones containing EC2 instances, NAT gateways, an Elastic Load Balancer, and connections to Amazon RDS, S3, and DynamoDB. It illustrates a scalable and distributed cloud infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752863636/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-architecture-diagram-vpc-ec2.jpg)

For example, if your critical EC2 application instances need to be restored rapidly within a 10-minute Recovery Time Objective (RTO), consider using an Auto Scaling group combined with EC2 Fast Snapshot Restore. Since “cold” instance start-up may take too long, using immutable infrastructure with pre-configured AMIs accelerates recovery. Additionally, enabling EC2 auto-recovery ensures that an instance can be automatically replaced while preserving its IP address so that recovery occurs within the desired window.

![The image presents a scenario where a company needs to restore critical EC2 application instances rapidly, with a recovery time objective of 10 minutes. It lists five approaches, asking which two will meet the RTO requirement.](https://kodekloud.com/kk-media/image/upload/v1752863638/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-application-recovery-approaches.jpg)

Beyond recovery measures, rigorous security management is essential. Monitoring access and ensuring proper authentication remain high-priority tasks. To further enhance resiliency, consider integrating intermediary AWS services—such as load balancers, queues, or notification systems—to decouple client interactions from direct connections with EC2 instances. This decoupling, whether implemented synchronously or asynchronously, improves the overall resilience of your application architecture.

![The image illustrates different ways EC2 instances fit into task statements, showing tight and loose coupling with synchronous and asynchronous communication using Elastic Load Balancing and Amazon Simple Queue Service.](https://kodekloud.com/kk-media/image/upload/v1752863639/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-instances-coupling-communication-diagram.jpg)

For instance, imagine EC2 instances processing messages from an SQS queue after S3 triggers notifications for new video uploads. By including a unique message identifier, processing becomes idempotent, ensuring that messages are not reprocessed unnecessarily if retries occur.

![The image describes a video processing pipeline using AWS services, with suggestions for making the system resilient, such as using SQS FIFO queues, processing messages idempotently, enabling EC2 Auto Scaling, and fanning out SNS messages.](https://kodekloud.com/kk-media/image/upload/v1752863640/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-video-processing-pipeline-resilience.jpg)

Another effective pattern is using EC2 Image Builder to create consistent AMIs, which are then deployed via launch templates. These AMIs can be refreshed automatically within your Auto Scaling group to maintain consistency across various environments such as development, testing, and production.

![The image is a flowchart illustrating the integration of EC2 in task statements, showing a process involving EC2 Image Builder, Amazon SNS, AWS Lambda, and Auto Scaling Group. It details steps from AMI creation to refreshing EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752863641/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-integration-flowchart-ami-refresh.jpg)

Monitoring is the cornerstone of any resilient system. Installing CloudWatch agents on your instances helps capture vital performance metrics, including CPU utilization, disk operations, and network performance. These metrics provide deep insights into your system's health and help guide Auto Scaling actions based on dynamic loads.

![The image shows a dashboard with Amazon EC2 instance details and CloudWatch metrics, including graphs for CPU utilization, disk operations, and network activity. The title asks about the role of EC2 in task statements.](https://kodekloud.com/kk-media/image/upload/v1752863642/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-instance-details-cloudwatch-dashboard.jpg)

Predictive scaling policies can further improve resiliency by proactively scaling EC2 capacity in anticipation of traffic spikes when historical usage data is available.

![The image is a diagram showing the integration of EC2 Auto Scaling within an AWS Cloud architecture, featuring an Elastic Load Balancer distributing traffic across two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752863643/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-auto-scaling-aws-diagram.jpg)

![The image presents a scenario where a company needs to scale EC2 capacity predictively, with four options listed, highlighting "Use EC2 Auto Scaling with predictive scaling" as a solution.](https://kodekloud.com/kk-media/image/upload/v1752863644/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-auto-scaling-predictive-scaling.jpg)

Remember to follow best practices when implementing Auto Scaling. For example, avoid using Instance Store volumes for critical data and ensure that auto-recovery features are enabled where applicable. A typical resilient EC2 deployment might use a launch template that installs a CloudWatch agent, configures parameters in Parameter Store, and creates an Auto Scaling group with target tracking scaling policies—maintaining CPU utilization at a defined target (e.g., 40% or 80%).

![The image illustrates how Amazon EC2 fits into task statements, showing an auto-scaling group with CloudWatch integration for scaling policies and parameter configuration.](https://kodekloud.com/kk-media/image/upload/v1752863645/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/amazon-ec2-auto-scaling-cloudwatch.jpg)

![The image provides strategies for configuring EC2 Auto Scaling to maintain CPU utilization around 40%, including scheduled scaling, CloudWatch alarms, predictive scaling, and target tracking policies.](https://kodekloud.com/kk-media/image/upload/v1752863647/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-auto-scaling-cpu-strategies.jpg)

## Monitoring and Auditing for Reliability

Reliability also means tracking changes and monitoring system behavior so issues can be addressed early. AWS Config audits EC2 configuration changes, CloudTrail logs all API calls, and CloudWatch monitors system metrics. Together, these services help ensure that operational changes do not compromise your environment’s stability.

![The image is a comparison of three AWS services: CloudTrail, AWS Config, and CloudWatch, highlighting their monitoring and notification features. Each service is described with its specific functions related to reliability metrics.](https://kodekloud.com/kk-media/image/upload/v1752863648/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-services-comparison-monitoring.jpg)

![The image provides a solution for auditing EC2 configuration changes, suggesting enabling AWS CloudTrail logging, installing the AWS Config agent, using EC2 Systems Manager Associations, and setting up AWS Config rules and recording.](https://kodekloud.com/kk-media/image/upload/v1752863649/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-configuration-auditing-solution.jpg)

One common area of concern is whether the machine type affects reliability. Generally, for instance types with dedicated resources (such as the M, C, or R series), AWS guarantees that you receive the resources requested. However, the T-Series instances use burstable CPU credits. These provide baseline performance with the ability to burst. Once the credits are spent, performance throttling occurs. For workloads requiring consistent CPU performance, it is best to avoid burstable instance types.

![The image is a diagram showing different instance types categorized into General Purpose, Compute Optimized, Memory Optimized, Storage Optimized, and Accelerated Computing. It poses the question, "Does machine type affect reliability?"](https://kodekloud.com/kk-media/image/upload/v1752863651/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/instance-types-reliability-diagram.jpg)

For additional security or regulatory compliance, consider dedicated hosts or dedicated instances. These options ensure that the physical hardware is not shared with other AWS customers.

![The image presents a question about deploying EC2 instances on dedicated hosts, with four options provided as possible solutions.](https://kodekloud.com/kk-media/image/upload/v1752863652/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-dedicated-hosts-deployment-question.jpg)

Also, consider the impact of machine placement strategies on reliability. AWS offers placement groups to control instance placement:

- **Cluster Placement Group**: Maximizes performance by grouping instances in a single rack. However, if that rack fails, all instances may be affected.
- **Partition Placement Group**: Distributes instances on different hosts within a single Availability Zone to reduce risk.
- **Spread Placement Group**: Distributes instances across multiple hardware units, and even Availability Zones, for maximum availability.

![The image illustrates different AWS EC2 placement groups: Cluster, Spread, and Partition, showing how machine placement can affect reliability. Each group is depicted with EC2 instances distributed across different configurations and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752863654/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-ec2-placement-groups-diagram.jpg)

## Leveraging EC2 Image Builder and Elastic Beanstalk

When standardizing deployments, EC2 Image Builder is a managed service that creates secure and consistent AMIs automatically. It is ideal for automating the AMI patching process and integrates smoothly with your CI/CD pipelines.

![The image illustrates the EC2 Image Builder cascading pipelines, showing the process from image recipe creation to output image, and how a standard secured image (Gold Image) is used in multiple workload pipelines.](https://kodekloud.com/kk-media/image/upload/v1752863655/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/ec2-image-builder-pipelines-diagram.jpg)

Elastic Beanstalk serves as a configuration wizard that ties together several AWS services. Although you cannot directly adjust the resiliency settings of Elastic Beanstalk itself, you can design highly redundant architectures by choosing options such as multi-AZ deployments. For example, a blue-green deployment strategy can significantly reduce downtime during updates.

![The image is a diagram of an AWS Elastic Beanstalk architecture, showing components like an Elastic Load Balancer, EC2 instances in Auto Scaling groups, RDS databases, CloudFront distribution, and an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752863657/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-elastic-beanstalk-architecture-diagram.jpg)

![The image provides strategies for architecting an AWS Elastic Beanstalk environment for high redundancy, including enabling health checks, deploying across multiple instance types, using Elastic Load Balancing, and launching instances in multiple Availability Zones.](https://kodekloud.com/kk-media/image/upload/v1752863658/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-elastic-beanstalk-redundancy-strategies.jpg)

Understanding the differences between deployment types is key. For instance, blue-green deployments minimize downtime by running new and old environments concurrently and then switching traffic through a DNS change. In contrast, all-at-once deployments might result in noticeable service interruptions.

![The image is a table comparing different deployment methods in Elastic Beanstalk, detailing aspects like impact of failed deployment, deploy time, zero downtime, DNS change, rollback process, and code deployment targets.](https://kodekloud.com/kk-media/image/upload/v1752863659/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/elastic-beanstalk-deployment-comparison-table.jpg)

When deeper application insights are needed, enabling AWS X-Ray on your EC2 instances within an Elastic Beanstalk environment can provide a comprehensive service map and help identify performance bottlenecks.

![The image presents a scenario about a company using AWS Elastic Beanstalk for a web application, seeking insights into performance and errors. It lists four approaches for enabling request tracing through the Elastic Beanstalk architecture.](https://kodekloud.com/kk-media/image/upload/v1752863660/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-elastic-beanstalk-request-tracing.jpg)

## A Note on Lightsail and Containers

AWS Lightsail is a low-cost VPS solution that offers simplified management. However, it lacks many of the robust reliability and scalability features provided by EC2. Although Lightsail is not a focal point for the AWS Solutions Architect exam, it is useful to know for basic use cases.

![The image presents a question about which AWS service provides low-cost virtual machines with simplified management, with options including AWS EC2, AWS LightSail, AWS ECS, and AWS EKS. The highlighted answer is AWS LightSail.](https://kodekloud.com/kk-media/image/upload/v1752863662/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-1/aws-lightsail-low-cost-vm-question.jpg)

The discussion now transitions to designing for reliability in container-based environments, where similar principles such as scaling, monitoring, and decoupling are applied to containerized workloads.

> [!important]
> **Note**
>
> This concludes our deep dive into designing for reliability on compute services with a focus on EC2, Elastic Beanstalk, and an overview of Lightsail. Up next, we will explore container-based architectures and detail strategies for achieving resiliency with AWS container services.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/0f271a8c-f9f1-4f10-8468-e030f4213dfc)**
>
> Watch video content
