# Turning up Security on Compute Services Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Compute-Services-Part-1)

---

## Table of Contents

- Turning up Security on Compute Services Part 1
  - The Shared Responsibility Model
  - A Scenario on the Shared Responsibility Model
  - Securing EC2 and the Role of Bastion Hosts
  - Managing EC2 Key Pairs Securely
  - Replacing Bastion Hosts with AWS Systems Manager
  - Securing Access to DynamoDB from EC2
  - IAM Roles Anywhere for External Workloads
  - Public versus Private Subnets and Routing Considerations
  - Enhancing Security with Private Subnets and NAT
  - EBS Encryption and Data Security
  - Instance Storage versus EBS
  - SSL Termination at the Load Balancer
  - Securing EC2 with Patch Management
  - Integrating CloudTrail and CloudWatch
  - UEFI Secure Boot and Nitro TPM
  - AWS Nitro Enclaves
  - EC2 Instance Types Overview
  - Watch Video
    - Bastion Host Security Options

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Compute Services Part 1

Welcome back, Future Solutions Architects! I'm Michael Forrester, and in this lesson we’ll explore how to enhance security on AWS compute services. After covering networking and storage, we're now shifting our focus to a range of security "knobs" specific to compute services in AWS. These configurations play a critical role in bolstering the overall security of your compute environment.

---

## The Shared Responsibility Model

Before we dive into compute services, let's revisit the AWS Shared Responsibility Model. In this framework, AWS is responsible for the security "of" the cloud—covering infrastructure, hardware, and managed services—while you are responsible for security "in" the cloud, which includes configuring your applications, data, and security settings.

For example:

- **Infrastructure Services (e.g., EC2):** You secure the virtual machines.
- **Container Services (e.g., ECS, EKS):** Security responsibilities are more evenly distributed.
- **Managed Services (e.g., Lambda):** AWS manages most security aspects on your behalf.

![The image illustrates the AWS Shared Responsibility Model, showing the division of security responsibilities between AWS and the customer across different services like Amazon EC2, Amazon RDS, AWS S3, AWS KMS, and DynamoDB. It highlights varying levels of customer responsibility and customization from infrastructure to managed services.](https://kodekloud.com/kk-media/image/upload/v1752864045/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-shared-responsibility-model.jpg)

---

## A Scenario on the Shared Responsibility Model

Imagine a rapidly growing startup migrating its infrastructure to AWS. The Chief Information Security Officer (CISO), who is new to cloud computing, wants to adhere to best practices under the AWS Shared Responsibility Model. Which of the following best describes this model?

1.  AWS is responsible for the security of the cloud while customers are responsible for security in the cloud.
2.  AWS is responsible for both security of the cloud and security in the cloud.
3.  Customers are responsible for security of the cloud while AWS is responsible for security in the cloud.
4.  AWS and customers share equal responsibility for all aspects of security.

The correct interpretation is option 1: AWS secures the underlying infrastructure, while you manage security within your environment.

![The image presents a scenario about a startup migrating to AWS, focusing on understanding the AWS Shared Responsibility Model, with four options describing different responsibility distributions between AWS and customers.](https://kodekloud.com/kk-media/image/upload/v1752864046/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-shared-responsibility-model-startup.jpg)

---

## Securing EC2 and the Role of Bastion Hosts

Amazon EC2, AWS’s virtual machine service, is a key component of your compute environment. A common practice is to use a bastion host (or jump box) to manage remote access securely. In basic setups, an EC2 instance located in a public subnet uses a bastion host secured by a security group that allows inbound SSH (port 22). IAM roles further restrict access, granting specific permissions to services like CloudTrail and S3.

![The image is a diagram of an AWS architecture featuring a bastion host within a security group, connected to Amazon S3, AWS CloudTrail, and an EC2 instance. It illustrates the use of AWS roles and a public subnet for secure access.](https://kodekloud.com/kk-media/image/upload/v1752864048/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-architecture-bastion-host-diagram.jpg)

When implementing bastion hosts, consider these best practices:

- Place the bastion host in a public subnet.
- Restrict SSH access to known IP addresses and use the bastion host as a gateway for accessing instances in private subnets.
- Minimize direct exposure of numerous instances to the internet by consolidating access points.

### Bastion Host Security Options

An e-commerce company deploying a multi-tier application on EC2 is evaluating the best approach to secure administrative access. Which option best enhances security?

1.  Deploy the bastion host in a public subnet, restrict SSH access to known IP addresses, and use it as a jump box to access private application servers.
2.  Deploy the bastion host in a private subnet and allow direct SSH access from the internet.
3.  Deploy multiple bastion hosts across different public subnets while distributing SSH access load with unrestricted access.
4.  Avoid using a bastion host that allows open SSH access to all EC2 instances.

Option 1 is the most secure and resilient, ensuring that only defined access points provide a pathway to private resources.

![The image presents a scenario where an e-commerce company is considering different approaches to secure administrative access to application servers using a bastion host. It lists four options for deploying the bastion host to ensure security and resilience.](https://kodekloud.com/kk-media/image/upload/v1752864049/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ecommerce-bastion-host-security-options.jpg)

---

## Managing EC2 Key Pairs Securely

Secure key pair management is crucial when deploying EC2 instances across multiple regions. Consider the following approaches:

1.  Use a single EC2 key pair across all regions.
2.  Generate a unique EC2 key pair for each region and store them in a centralized, encrypted storage solution with strict access controls.
3.  Share the private key among team members via email.
4.  Avoid using EC2 key pairs and rely solely on usernames and passwords.

Option 2 is best practice. Using unique key pairs per region with centralized, encrypted storage not only separates keys but also enhances access control and accountability.

![The image presents a scenario where a financial institution is deploying an application on EC2 instances and is considering best practices for managing EC2 key pairs. It lists four approaches for securely managing these key pairs.](https://kodekloud.com/kk-media/image/upload/v1752864051/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ec2-key-pairs-management-best-practices.jpg)

> [!important]
> **Tip**
>
> In many deployments, a dedicated key pair is used during initial setup. Afterward, assign each user their unique key pair to enforce one-to-one accountability.

---

## Replacing Bastion Hosts with AWS Systems Manager

AWS Systems Manager Session Manager offers a modern alternative to traditional bastion hosts. This service allows administrators to securely access EC2 instances without the need to open inbound ports or manage SSH keys.

For instance, a healthcare company managing critical applications with sensitive patient data can leverage Systems Manager. Which statement is accurate regarding this service?

1.  Systems Manager enables direct access to the underlying hardware for diagnostics.
2.  Systems Manager provides a unified interface to access EC2 instances without opening inbound ports or managing SSH keys.
3.  Using Systems Manager requires EC2 instances to be publicly accessible.
4.  Systems Manager replaces EC2 virtual machines.

The correct answer is option 2. With Systems Manager, secure access is managed without the traditional pitfalls of jump boxes, thereby reducing both administrative overhead and exposure risk.

![The image is a diagram illustrating the architecture of an AWS EC2 setup, showing components like AWS CLI, AWS Console, AWS IAM, Amazon CloudWatch, Amazon S3, and a VPC with security groups. It depicts the flow of interactions between an admin user and these AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864052/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-ec2-architecture-diagram.jpg)

Additional benefits include integration with AWS Identity Center (formerly Single Sign-On) and detailed role-based permissions.

![The image is a diagram illustrating an AWS cloud architecture, showing the interaction between users, a browser, and various AWS services like EC2 instances, VPCs, and AWS System Manager within an organization.](https://kodekloud.com/kk-media/image/upload/v1752864053/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-cloud-architecture-diagram.jpg)

---

## Securing Access to DynamoDB from EC2

For applications utilizing DynamoDB, it is imperative to avoid embedding AWS credentials in your code. Instead, leverage EC2 instance roles, which securely grant the necessary permissions on demand. Consider these approaches:

1.  Store AWS access and secret keys in the user data of an EC2 instance.
2.  Store the keys in user data and retrieve them during application initialization.
3.  Use the EC2 instance role to provide necessary permissions without requiring long-term credentials.
4.  Manually generate temporary access keys.

Option 3 is best practice, as it uses AWS’s built-in mechanism to securely provision temporary credentials without hardcoding sensitive information.

![The image presents a scenario about securely accessing DynamoDB from EC2 instances, with four options for best practices. Option 3 suggests using EC2 instance roles to grant necessary permissions without hardcoding AWS credentials.](https://kodekloud.com/kk-media/image/upload/v1752864054/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/dynamodb-ec2-access-best-practices.jpg)

A supporting diagram demonstrates an EC2 instance with an attached IAM role that uses the Security Token Service (STS) to provide temporary credentials for interacting with DynamoDB.

![The image is a diagram showing the interaction between Amazon EC2, IAM roles, and DynamoDB, illustrating the use of STS temporary credentials for read-only access.](https://kodekloud.com/kk-media/image/upload/v1752864055/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ec2-iam-dynamodb-sts-diagram.jpg)

---

## IAM Roles Anywhere for External Workloads

For workloads running outside AWS, AWS IAM Roles Anywhere offers a solution for obtaining temporary security credentials safely. Consider these approaches:

1.  Use long-term AWS credentials and bypass X.509 certificates.
2.  Register your certificate authority with IAM Roles Anywhere as a trust anchor.
3.  Use self-signed X.509 certificates with a trust anchor.
4.  Avoid using IAM roles by managing separate IAM users with static credentials.

Option 2 is recommended. Registering a trusted certificate authority establishes a secure trust relationship, allowing external workloads to obtain temporary credentials without risking exposure through long-term, static keys.

![The image presents a scenario where a global e-commerce company seeks to implement AWS IAM Roles Anywhere for secure credential management, with four suggested approaches for integration.](https://kodekloud.com/kk-media/image/upload/v1752864056/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-iam-roles-anywhere-integration.jpg)

---

## Public versus Private Subnets and Routing Considerations

Understanding the difference between public and private subnets is essential when architecting your EC2 environment. In a typical VPC setup:

- **Public Subnets:** These subnets have a route directing 0.0.0.0/0 traffic to an Internet Gateway (IGW), and instances here usually receive a public IP address.
- **Private Subnets:** In these subnets, traffic does not route directly to an IGW; rather, it passes through a NAT gateway or NAT instance for internet access.

![The image is a diagram of an AWS EC2 setup, showing a VPC with two availability zones, each containing an EC2 instance, connected to an internet gateway and a main route table.](https://kodekloud.com/kk-media/image/upload/v1752864058/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-ec2-setup-diagram.jpg)

For a startup deploying multiple EC2 instances, best practices include:

- Tighten security group rules to disable unnecessary inbound and outbound traffic.
- Regularly update operating systems and software patches.
- Avoid practices such as storing sensitive data on the root volume or using the root user for day-to-day operations.

![The image presents a scenario about a startup deploying EC2 instances and lists four practices to enhance their security, including disabling unnecessary traffic rules and applying updates.](https://kodekloud.com/kk-media/image/upload/v1752864059/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/startup-ec2-security-practices.jpg)

---

## Enhancing Security with Private Subnets and NAT

To mitigate threats like DDoS attacks, consider re-evaluating your routing strategies. Instead of exposing every instance to the internet, you can place instances in private subnets and direct traffic through a NAT gateway or NAT instance. This strategy minimizes your public exposure and significantly enhances security.

![The image is a diagram of an AWS EC2 setup with two availability zones, each containing public and private subnets for web and database servers, connected through a security group and an internet gateway.](https://kodekloud.com/kk-media/image/upload/v1752864060/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-ec2-setup-diagram-subnets.jpg)

---

## EBS Encryption and Data Security

Data stored on EBS volumes must be secured, as these volumes are not encrypted by default. To protect data-at-rest, consider the following practices:

- Enable encryption when creating your EBS volume.
- Choose between AWS-managed keys or customer-managed keys via AWS KMS.

![The image presents a scenario where a healthcare company needs to encrypt data on EBS volumes attached to EC2 instances, with four suggested steps for ensuring encryption.](https://kodekloud.com/kk-media/image/upload/v1752864061/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/healthcare-ec2-ebs-encryption-steps.jpg)

Leveraging built-in encryption minimizes operational overhead and avoids modifying application-level code to handle encryption.

---

## Instance Storage versus EBS

For workloads that demand high IOPS and low latency—such as an online multiplayer game—EC2 instance store volumes might be considered. However, keep in mind:

- Instance store volumes are intended for temporary storage.
- Data is lost if the instance stops or fails.
- Instance store volumes do not come encrypted by default using AWS-managed keys; any encryption would need to be implemented at the application level.

The key takeaway is that instance store volumes are designed for temporary data processing and lack persistence if the instance is interrupted.

![The image presents a scenario about a gaming company using EC2 instance store volumes for temporary data processing, with four statements about the characteristics of these volumes. It asks which statement is accurate.](https://kodekloud.com/kk-media/image/upload/v1752864062/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ec2-instance-store-volumes-gaming.jpg)

---

## SSL Termination at the Load Balancer

An Application Load Balancer (ALB) can manage SSL termination, which offloads the decryption process from your EC2 instances. Key points include:

- Traffic between the client and the load balancer is encrypted.
- Communication between the load balancer and the EC2 instance can be configured to be unencrypted or re-encrypted using a different certificate.
- Offloading SSL termination improves EC2 performance by reducing the processing load.

For example, a healthcare application can benefit from SSL termination at the load balancer to ensure that sensitive patient data is securely transmitted.

![The image presents a scenario involving a healthcare company's web application on EC2 instances, discussing SSL termination options and asking which statement about SSL termination on EC2 is accurate. Five statements are provided for consideration.](https://kodekloud.com/kk-media/image/upload/v1752864064/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ssl-termination-ec2-healthcare-app.jpg)

The optimal configuration involves offloading SSL termination at the load balancer, ensuring secure transmission between client and load balancer while reducing the decryption burden on EC2 instances.

---

## Securing EC2 with Patch Management

Ongoing patch management is critical for maintaining the security of your EC2 instances. AWS Systems Manager Patch Manager allows you to automate the patching process by:

- Defining patch baselines that specify approved updates.
- Patching both operating systems and application software.
- Automating the patching process (including reboots) without manual intervention.
- Eliminating the need for exposing instances to the public internet during patching.

The recommended approach uses Patch Manager to enforce patch baselines that secure both the operating system and application layers.

![The image is a flowchart illustrating the integration of EC2 in task statements for security design, involving AWS Systems Manager, AWS Run Patch Baseline, and Maintenance Window, targeting Patch Groups A and B, and Tagged Instances.](https://kodekloud.com/kk-media/image/upload/v1752864065/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ec2-integration-security-design-flowchart.jpg)

---

## Integrating CloudTrail and CloudWatch

Integrating AWS CloudTrail with CloudWatch is essential for monitoring API calls and system changes:

- CloudTrail logs API calls made on EC2 instances.
- These logs can be forwarded to CloudWatch for real-time monitoring and analysis.

For instance, an e-commerce company can integrate these services to audit system activities without requiring instances to have public IP addresses.

![The image presents a scenario involving an e-commerce company using AWS EC2 instances, considering integrating CloudTrail and CloudWatch for monitoring and auditing API calls. It lists five statements about the integration, asking which one accurately describes it.](https://kodekloud.com/kk-media/image/upload/v1752864066/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864066/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ecommerce-aws-ec2-cloudtrail-cloudwatch.jpg)

Option 2 is correct: CloudTrail captures API calls and streams logs to CloudWatch for real-time analysis.

![The image is a comparison of AWS services: CloudTrail, AWS Config, and CloudWatch, highlighting their monitoring and change management features. Each service is described with its specific functions related to API, configuration, and performance monitoring.](https://kodekloud.com/kk-media/image/upload/v1752864067/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-services-comparison-monitoring.jpg)

---

## UEFI Secure Boot and Nitro TPM

AWS EC2 integrates advanced security features such as UEFI Secure Boot and Nitro TPM. Here’s how they enhance security:

- The UEFI secure boot process validates the bootloader’s signature.
- After validation, the bootloader securely measures and loads the kernel.
- Nitro TPM unseals the boot volume only when the measurements match expected values, ensuring the integrity of the operating system.

This process protects against unauthorized modifications during boot, thereby enhancing overall system security.

![The image presents a scenario involving an e-commerce company using AWS EC2 instances, considering integrating CloudTrail and CloudWatch for monitoring and auditing API calls. It lists five statements about the integration, asking which one accurately describes it.](https://kodekloud.com/kk-media/image/upload/v1752864066/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864066/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ecommerce-aws-ec2-cloudtrail-cloudwatch.jpg)

![The image is a flowchart illustrating the UEFI Secure Boot and Measured Boot process with NitroTPM in EC2, showing steps from inserting a UEFI binary to booting the system.](https://kodekloud.com/kk-media/image/upload/v1752864068/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/uefi-secure-boot-flowchart-nitrotpm.jpg)

---

## AWS Nitro Enclaves

AWS Nitro Enclaves offer a way to process highly sensitive data within a highly isolated environment. Key considerations include:

- Nitro Enclaves create an isolated, secure computing environment within your EC2 instance.
- Data processed inside an enclave remains inaccessible to the parent instance.
- Communication between the enclave and the parent instance is limited to a virtual socket (vsock).

For instance, a healthcare company processing sensitive patient information can use Nitro Enclaves to meet strict compliance and data protection requirements.

![The image presents a scenario where a healthcare company is considering using AWS Nitro Enclaves for secure data processing on EC2 instances, followed by multiple-choice statements about Nitro Enclaves.](https://kodekloud.com/kk-media/image/upload/v1752864069/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/aws-nitro-enclaves-secure-data-processing.jpg)

Option 2 is correct: Nitro Enclaves create a highly isolated environment that communicates with the parent instance only through a virtual socket.

---

## EC2 Instance Types Overview

When choosing an EC2 instance, AWS offers several instance families to suit different workloads:

- **General Purpose:** Includes T and M family instances.
- **Compute Optimized:** Denoted by instance types starting with C (e.g., C5, C6, C7).
- **Memory Optimized:** Designed for memory-intensive tasks; instance types typically begin with R.
- **Storage Optimized:** Often indicated by instance types such as I, D, or H.
- **Accelerated Computing:** Equipped with GPUs (e.g., G and P families) for tasks like rendering or machine learning.

For example, an animation studio looking to optimize rendering performance might benefit from accelerated computing instances. Consider this statement:

1.  Accelerated computing instances are optimized for memory-intensive applications.
2.  They come with pre-installed animation software.
3.  They leverage hardware accelerators (GPUs) to perform computations more efficiently than CPUs.
4.  They are primarily designed for storage-intensive workloads.

Option 3 is correct—accelerated computing instances utilize hardware accelerators to efficiently handle complex computations such as graphics processing.

![The image presents a scenario where an animation studio is considering using EC2 Accelerated Computing instances to speed up rendering times, followed by four statements describing potential benefits of these instances.](https://kodekloud.com/kk-media/image/upload/v1752864071/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-1/ec2-accelerated-computing-animation-studio.jpg)

---

This lesson has covered key aspects of securing compute services on AWS—from understanding the shared responsibility model to configuring secure access for EC2, managing key pairs, leveraging Systems Manager, ensuring data encryption on EBS, handling instance storage correctly, and integrating advanced features such as Nitro TPM and Nitro Enclaves. By applying these best practices and understanding AWS’s security mechanisms, you can significantly enhance the security posture of your compute workloads.

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/de5baa0c-6e55-4e6b-a084-6eb7794601c0)**
>
> Watch video content
