# Highly Managed AWS Services Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-6-Cost-and-Performance-Optimization/Highly-Managed-AWS-Services-Overview)

---

## Table of Contents

- Highly Managed AWS Services Overview
  - Storage Services
  - Database Services
  - Networking Services
  - Analytics Services
  - Machine Learning Services
  - Security and Identity
  - Application Integration
  - Management and Governance
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 6 Cost and Performance Optimization

# Highly Managed AWS Services Overview

Welcome students!

In this lesson, we explore highly managed AWS services—platforms that abstract much of the underlying infrastructure management. These services, delivered as Platform as a Service (PaaS) or Software as a Service (SaaS), enable you to control costs while freeing you from mundane infrastructure tasks.

AWS offerings span numerous domains such as compute, storage, databases, networking, analytics, machine learning, security and identity, application integration, as well as management and governance. AWS categorizes these services based on the level of abstraction and management provided.

![The image displays icons representing various technology elements such as Compute, Storage, Databases, Networking, Analytics, Machine Learning, Security and Identity, Application Integration, and Management and Governance.](https://kodekloud.com/kk-media/image/upload/v1752861034/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/technology-elements-icons-diagram.jpg)

Consider these services as interfaces that largely operate via APIs rather than requiring direct interaction with virtual machines or operating systems. For instance, AWS Lambda executes your code in a serverless manner—there is no need to log into an operating system or manage any compute environment. Similarly, AWS Elastic Beanstalk orchestrates and manages compute resources on your behalf rather than exposing raw servers.

Another excellent example is AWS Fargate, which underpins container services such as Amazon ECS and EKS. Although Fargate is not directly visible in the AWS console, it abstracts server management entirely, delivering a serverless container orchestration experience.

![The image shows icons for three AWS compute services: AWS Lambda, AWS Elastic Beanstalk, and AWS Fargate.](https://kodekloud.com/kk-media/image/upload/v1752861036/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/aws-compute-services-icons.jpg)

## Storage Services

When it comes to storage solutions, Amazon S3 is a prime example of a highly managed service with its API-driven approach. In contrast, the Elastic File System (EFS) offers network file storage using NFS, but it does not provide the same level of abstraction as S3. AWS FSx, which encompasses services like Windows File Server, Lustre, OpenZFS, and NetApp ONTAP, also fits into the platform-as-a-service category while giving you occasional granular control compared to S3.

![The image shows icons for AWS storage services: S3, EFS, and FSx, each represented with a green icon and labeled accordingly.](https://kodekloud.com/kk-media/image/upload/v1752861037/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/aws-storage-services-icons-s3-efs-fsx.jpg)

## Database Services

AWS offers diverse database services tailored to different needs:

- **Amazon RDS**: A robust PaaS solution for relational databases.
- **Amazon DynamoDB**: A nearly completely serverless service with zero infrastructure management.
- **Amazon Aurora**: Available in both serverless and traditional deployment models.

![The image displays icons for three AWS database services: AWS RDS, AWS DynamoDB, and AWS Aurora, with a "Databases" heading.](https://kodekloud.com/kk-media/image/upload/v1752861039/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/aws-database-services-icons.jpg)

AWS also delivers serverless options for databases and analytics services, including Redshift and OpenSearch. Be sure to understand these options as they frequently appear in exam questions.

## Networking Services

Networking in AWS ranges from fully managed solutions to more configurable environments:

- **Amazon CloudFront** provides a completely managed content delivery network experience.
- **Elastic Load Balancing** abstracts the underlying infrastructure, though you cannot log into the load balancer itself.
- **Virtual Private Cloud (VPC)** allows you to define subnets, routing, and gateways, letting you work within a managed environment without direct control over the hardware.

## Analytics Services

Amazon’s analytics offerings are designed to offload scaling and infrastructure management:

- **Amazon Redshift Serverless** simplifies data warehouse management.
- **Amazon Kinesis** and **AWS Glue** enable real-time data processing and ETL tasks with minimal configuration.
- **Amazon QuickSight** enhances data visualization as a complementary dashboard service.

![The image displays icons for three AWS analytics services: Amazon Redshift, Amazon Kinesis, and AWS Glue.](https://kodekloud.com/kk-media/image/upload/v1752861040/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/aws-analytics-services-icons.jpg)

## Machine Learning Services

AWS provides managed machine learning services that help you implement sophisticated AI solutions without heavy server management:

- **Amazon SageMaker** offers serverless or lightweight deployment options.
- Services like **Amazon Comprehend**, **Amazon Rekognition**, **Amazon Transcribe**, and **Amazon Lex** allow you to leverage powerful ML capabilities with minimal configuration.

![The image displays icons for three Amazon machine learning services: SageMaker, Comprehend, and Rekognition.](https://kodekloud.com/kk-media/image/upload/v1752861041/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/amazon-machine-learning-services-icons.jpg)

## Security and Identity

Security services in AWS provide robust management of identities and protection without exposing the underlying systems:

- **AWS IAM** allows you to manage user permissions and policies efficiently.
- **Amazon GuardDuty** and **AWS Shield** are more SaaS-oriented, offering extensive security monitoring with minimal configuration.

![The image displays icons for three AWS security and identity services: AWS IAM, Amazon GuardDuty, and AWS Shield.](https://kodekloud.com/kk-media/image/upload/v1752861042/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/aws-security-identity-services-icons.jpg)

## Application Integration

AWS application integration services simplify communications between distributed systems:

- **Amazon SNS** and **Amazon SQS** provide managed messaging services.
- **AWS Step Functions** orchestrate workflows seamlessly, eliminating the need to manage server capacity.

![The image shows icons for Amazon SNS, Amazon SQS, and AWS Step Functions under the heading "Application Integration."](https://kodekloud.com/kk-media/image/upload/v1752861043/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/application-integration-aws-icons.jpg)

## Management and Governance

AWS management and governance tools help you oversee your infrastructure with varying levels of control:

- **AWS CloudFormation** requires defining configuration templates.
- **AWS Config** offers a highly managed solution that continuously monitors configurations against predefined rules.
- **AWS Systems Manager** is powerful but may require more detailed configuration.

![The image displays icons for AWS management and governance services: AWS CloudFormation, AWS Config, and AWS Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752861044/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Highly-Managed-AWS-Services-Overview/aws-management-governance-icons.jpg)

> [!important]
> **Key Takeaway**
>
> Remember, the goal is to differentiate between services that allow low-level infrastructure access and those that provide a fully managed, serverless experience.

## Conclusion

In this lesson, we provided an overview of highly managed AWS services across various domains. As you progress, you will delve deeper into these differentiations and discover how to leverage each service to optimize your applications and reduce management overhead.

For more detailed insights, consider exploring the following resources:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [AWS Whitepapers](https://aws.amazon.com/whitepapers/)
- [AWS Certified Training](https://aws.amazon.com/training/)

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/c363221d-1b2d-4c1c-876a-cb6108f473e3/lesson/6cf64634-3605-45c8-924a-2e07042987dc)**
>
> Watch video content
