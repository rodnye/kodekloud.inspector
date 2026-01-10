# AWS Shared Responsibility Model - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/AWS-Shared-Responsibility-Model)

---

## Table of Contents

- AWS Shared Responsibility Model
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# AWS Shared Responsibility Model

Welcome back, future AWS architects. In this article, we revisit the AWS Shared Responsibility Model—a critical framework that outlines the security responsibilities shared between AWS and its customers. Understanding this model is essential as it forms the foundation of security, resiliency, and compliance best practices in the cloud.

The model clearly delineates roles. Responsibilities below the "hardware line" (e.g., compute, storage, databases, and networking components housed in AWS data centers) are managed entirely by AWS. In other words, if a component is part of the underlying infrastructure that you cannot access or configure, AWS is responsible for securing it.

On the other hand, anything above that line falls under customer control. For instance, if you have the ability to log into and configure a compute instance or storage service, you are accountable for patching, managing, and securing these elements. This division of responsibilities evolves depending on the type of service:

- **Infrastructure as a Service (IaaS):** Customers maintain significant control and responsibility.
- **Platform as a Service (PaaS):** AWS manages a larger portion of the security, reducing customer responsibility.
- **Software as a Service (SaaS):** AWS handles almost everything, leaving customers with minimal security responsibilities.

AWS recommends using managed services whenever possible to offload the operational burden, allowing your team to focus on higher-level tasks.

Below is a diagram that illustrates the division of responsibilities across various service types:

![The image illustrates the AWS Shared Responsibility Model, showing the division of responsibilities between the customer and AWS across infrastructure, platform, and managed services. It uses color coding to indicate areas of customer and AWS responsibility, with a legend explaining the customization and responsibility levels.](https://kodekloud.com/kk-media/image/upload/v1752863942/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-AWS-Shared-Responsibility-Model/aws-shared-responsibility-model.jpg)

In this diagram, you can see that with infrastructure services such as [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), you are responsible for managing compute, storage, databases, and networking. Imagine an additional block representing data centers—this block would give you more direct control over your network security. Conversely, services like serverless computing offer very little control over the underlying infrastructure since AWS fully manages those environments.

As you move from IaaS to Platform as a Service (PaaS) and finally to Software as a Service (SaaS), the customer's security responsibilities continue to diminish. For example:

- With [AWS RDS](https://learn.kodekloud.com/user/courses/aws-rds) (a PaaS offering), AWS handles most of the underlying management.
- With SaaS offerings like [Amazon Simple Storage Service (Amazon S3)](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3), DynamoDB, SNS, and SQS, your interaction is largely limited to an API, and you have virtually no insight into the servers or infrastructure details.

Take a look at the following diagram for further clarity on how these responsibilities shift between AWS and the customer:

![The image illustrates the AWS Shared Responsibility Model for infrastructure, showing the division of responsibilities between the customer and AWS, with a focus on services like AWS S3, AWS KMS, and AWS DynamoDB. It uses a gradient color scheme to differentiate customer responsibilities from AWS responsibilities.](https://kodekloud.com/kk-media/image/upload/v1752863943/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-AWS-Shared-Responsibility-Model/aws-shared-responsibility-model-2.jpg)

> [!important]
> **Key Takeaways**
>
> - If you can access, configure, or manage a component, you are responsible for its security.
> - If you cannot access or configure a component, AWS assumes responsibility for its security.
> - IaaS places the most responsibility on the customer, while PaaS and SaaS shift more responsibility to AWS.

This model acts as a filtering mechanism to help you identify which aspects of security management require your attention and which can be entrusted to AWS. Customers agree to these defined responsibilities when setting up an AWS account, bearing the duty to secure what they control while relying on AWS to secure everything else. As services become more managed, your overall security responsibilities decrease correspondingly.

For additional documentation on AWS security, compliance details, or audit attestations, visit [AWS Artifact](https://aws.amazon.com/artifact/). AWS Artifact provides a repository of certifications, attestations, and compliance documents that are especially useful during compliance audits.

![The image is a summary of the AWS Shared Responsibility Model, highlighting the division of security responsibilities between customers and AWS. It explains that customers are responsible for what they can configure, while AWS handles everything else, and notes that more managed services reduce customer responsibility.](https://kodekloud.com/kk-media/image/upload/v1752863944/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-AWS-Shared-Responsibility-Model/aws-shared-responsibility-model-summary.jpg)

If you have any questions or need further clarification, feel free to reach out via KodeKloud.com, join our Slack community, or participate in our forums.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/84984ed1-6724-4390-8df6-640ecc314e1f)**
>
> Watch video content
