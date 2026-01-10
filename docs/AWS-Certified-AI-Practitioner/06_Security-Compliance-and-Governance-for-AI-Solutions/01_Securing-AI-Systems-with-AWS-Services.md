# Securing AI Systems with AWS Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Security-Compliance-and-Governance-for-AI-Solutions/Securing-AI-Systems-with-AWS-Services)

---

## Table of Contents

- Securing AI Systems with AWS Services
  - The AWS Shared Responsibility Model
  - AWS Identity and Access Management (IAM)
  - Logging with AWS CloudTrail
  - Data Encryption with AWS KMS and TLS
  - Securing Your Network in AWS
  - Summary
  - Watch Video

---

## Content

AWS Certified AI Practitioner

Security Compliance and Governance for AI Solutions

# Securing AI Systems with AWS Services

Welcome back! In this lesson, we'll explore how to secure AI systems using AWS services. This guide is designed for students with foundational knowledge in cloud services and security. We'll begin with an overview of key security concepts and then dive into how AWS prioritizes security responsibilities, IAM best practices, logging, encryption, and network isolation.

## The AWS Shared Responsibility Model

Understanding the AWS Shared Responsibility Model is essential. AWS secures the underlying infrastructure—hardware, data centers, virtualization, and networking—while you are accountable for securing everything you configure or access.

![The image illustrates the AWS Shared Responsibility Model, highlighting AWS's responsibility for "Security of the cloud" and the customer's responsibility for "Security in the cloud."](https://kodekloud.com/kk-media/image/upload/v1752857758/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/aws-shared-responsibility-model.jpg)

AWS has an excellent track record of managing its portion of security. However, you must carefully manage security settings for the services you control. For instance, if you can log into an operating system, patching becomes your responsibility. Similarly, if you access a database system, applying updates is your task. Meanwhile, managed services like AWS Lambda only require you to focus on securing your code.

![The image illustrates AWS's role in the Shared Responsibility Model, highlighting its responsibilities in protecting infrastructure, data centers, and hardware, as well as managing hardware, virtualization, and networking. It includes icons of servers, a cloud, a shield, and a laptop.](https://kodekloud.com/kk-media/image/upload/v1752857759/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/aws-shared-responsibility-model-diagram.jpg)

![The image outlines the customer's role in the Shared Responsibility Model, emphasizing secure configuration of AWS services and limiting access with encryption and best practices.](https://kodekloud.com/kk-media/image/upload/v1752857761/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/shared-responsibility-model-aws-security.jpg)

## AWS Identity and Access Management (IAM)

AWS Identity and Access Management (IAM) is crucial for controlling user access, groups, roles, and policies. Implementing multi-factor authentication (MFA) significantly enhances security by enforcing strong access practices. Assign permissions wisely when configuring services such as Bedrock and SageMaker.

![The image is an illustration related to AWS Identity and Access Management (IAM), showing icons for "User" and "Role."](https://kodekloud.com/kk-media/image/upload/v1752857762/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/aws-iam-user-role-illustration.jpg)

IAM policies, commonly defined using JSON or configured via the AWS console, dictate the access permissions for various AWS resources. Always adhere to the principle of least privilege, granting only the permissions necessary for each task.

![The image is a slide titled "IAM Policies and Permissions," explaining that policies define permissions for resources and are JSON-based to enable least privilege access.](https://kodekloud.com/kk-media/image/upload/v1752857763/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/iam-policies-permissions-slide.jpg)

Below is an example of an IAM policy that grants permissions to list buckets and to get or put objects within a specific S3 bucket:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow", // This policy allows access
            "Action": [
                "s3:ListBucket" // Permission to list all buckets in S3
            ],
            "Resource": [
                "arn:aws:s3:::example-bucket" // Specifies the bucket resource
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject", // Permission to read object data
                "s3:PutObject"  // Permission to upload or modify object data
            ],
            "Resource": [
                "arn:aws:s3:::example-bucket/*" // Applies to all objects within the bucket
            ]
        }
    ]
}
```

> [!important]
> **Exam Tip**
>
> This sample IAM policy is provided as a reference and is not mandatory for the AWS AI Practitioner exam.

Avoid using the AWS root user for everyday tasks since it has unrestricted access. Instead, create IAM users and assign them to appropriately named groups (e.g., "Developer-ProjectB" or "Read-Only") to simplify permission management and enhance security.

![The image provides best practices for AWS root user security, emphasizing that the root user has unrestricted access and should be used only for essential administrative functions. It includes icons of a computer and a lock to symbolize security.](https://kodekloud.com/kk-media/image/upload/v1752857764/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/aws-root-user-security-best-practices.jpg)

![The image illustrates a diagram of IAM (Identity and Access Management) groups for efficient permission management, showing connections between AWS IAM and three groups: Dev, QA, and Admin.](https://kodekloud.com/kk-media/image/upload/v1752857765/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/iam-groups-permission-management-diagram.jpg)

IAM roles provide temporary access by allowing one entity to assume another's security profile. Each role comprises a permissions policy and a trust policy. For example, to assume a role in another account, that role must explicitly trust your IAM user. Think of roles as temporary security identities, similar to using the "sudo" command in Linux.

![The image illustrates IAM roles and temporary access in AWS, showing connections between AWS Identity and Access Management (IAM) and three groups: Dev, QA, and Admin. Each group is represented with icons indicating temporary access permissions.](https://kodekloud.com/kk-media/image/upload/v1752857767/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/iam-roles-temporary-access-aws.jpg)

## Logging with AWS CloudTrail

AWS CloudTrail is indispensable for recording all API calls made to your AWS account. Even though it doesn't log operating system or database activities, it tracks requests made through tools like the AWS CLI, SDK, or console. Storing these logs in an S3 bucket is critical for auditing and forensic analysis.

![The image is a diagram illustrating how AWS CloudTrail logs API calls and events for activity logging and auditing, showing the flow from SDK, Console, and CLI to AWS resources and then to CloudTrail.](https://kodekloud.com/kk-media/image/upload/v1752857768/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/aws-cloudtrail-api-logs-diagram.jpg)

It is best practice to enable CloudTrail by default and configure it to write logs to a secured S3 bucket—ideally in a separate account to prevent unauthorized changes. Ensure that public access to these S3 buckets is blocked, and that roles (e.g., those used by SageMaker) are set up for different functions such as data science, operations, and compute.

![The image is a diagram showing the SageMaker Role Manager for ML Permissions, connecting roles like Data Scientist, MLOps, and Compute to the manager.](https://kodekloud.com/kk-media/image/upload/v1752857769/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/sagemaker-role-manager-ml-permissions-diagram.jpg)

## Data Encryption with AWS KMS and TLS

Another critical service is the AWS Key Management Service (KMS), which manages encryption keys to secure data at rest. AWS supports various encryption methods—from client-side encryption to server-side encryption using KMS (the latter often used for disk storage).

![The image illustrates AWS Key Management Service (KMS) for data encryption, showing a connection between a key icon and a storage bucket icon, indicating KMS manages encryption keys.](https://kodekloud.com/kk-media/image/upload/v1752857770/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/aws-kms-data-encryption-diagram.jpg)

For data in transit, AWS offers robust encryption methods. Load balancers can be configured with TLS/SSL certificates to ensure secure connections between end users and the load balancer. Moreover, you can encrypt the traffic between the load balancer and backend EC2 instances, based on your security needs.

![The image is a diagram illustrating TLS encrypted connections for API requests in an AWS cloud environment, showing users connecting via HTTPS to a load balancer with a TLS certificate, which then routes to multiple EC2 instances.](https://kodekloud.com/kk-media/image/upload/v1752857771/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/tls-encrypted-api-aws-diagram.jpg)

For distributed training jobs in SageMaker, you can enforce inter-node encryption to secure communications between worker nodes—an essential feature when transmitting sensitive data.

![The image is a diagram illustrating SageMaker Distributed Training with inter-node encryption, showing the flow between a master node, worker nodes, data source, and output storage.](https://kodekloud.com/kk-media/image/upload/v1752857773/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/sagemaker-distributed-training-diagram.jpg)

## Securing Your Network in AWS

AWS regions encompass multiple Availability Zones, which are clusters of data centers within a geographic area and are by default connected to the internet. To enhance network security, you can isolate your network environments using VPC endpoints—powered by PrivateLink—or NAT gateways, ensuring that your traffic remains within the AWS network.

![The image is a diagram illustrating a Virtual Private Cloud (VPC) setup in AWS, showing four availability zones with network configurations. It highlights the concept of creating isolated, private networks for enhanced security and network access control.](https://kodekloud.com/kk-media/image/upload/v1752857774/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/vpc-setup-aws-diagram.jpg)

When launching SageMaker instances within customer-managed VPCs, it is crucial to control network access through built-in security groups, network ACLs, or even an additional network firewall. AWS also provides VPC interface endpoints (and gateway endpoints for S3 and DynamoDB) to securely access AWS services without using public internet routes.

## Summary

In this lesson, we covered the essential AWS security options required for safeguarding data at rest, securing data in transit, and protecting network access. This high-level overview builds on the foundational concepts needed to design secure AI systems on AWS.

![The image is a diagram illustrating private network access with VPC interface endpoints, showing a Virtual Private Cloud (VPC) connecting to AWS services via AWS PrivateLink. It highlights the use of endpoints for secure access to services like SageMaker, S3, and CloudWatch without internet exposure.](https://kodekloud.com/kk-media/image/upload/v1752857775/notes-assets/images/AWS-Certified-AI-Practitioner-Securing-AI-Systems-with-AWS-Services/vpc-private-network-access-diagram.jpg)

Thank you for reading! For further information or any clarifications, please refer to the [AWS Documentation](https://aws.amazon.com/documentation/) or join discussions in the AWS forums. We look forward to seeing you in the next lesson.

> [!important]
> **Next Steps**
>
> Explore additional AWS security features and real-world use cases to deepen your understanding and expertise in securing AI systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/ec2a70a1-c3fc-4b7a-adef-26ae64d8f107/lesson/cc2d8683-3134-4a76-8038-d648919e23b1)**
>
> Watch video content
