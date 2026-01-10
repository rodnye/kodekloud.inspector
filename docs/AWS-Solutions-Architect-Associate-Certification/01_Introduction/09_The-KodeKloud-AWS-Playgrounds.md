# The KodeKloud AWS Playgrounds - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Introduction/The-KodeKloud-AWS-Playgrounds)

---

## Table of Contents

- The KodeKloud AWS Playgrounds
  - Exploring AWS Services
  - Starting Your Lab
  - Launching an EC2 Instance
  - Creating a Key Pair for Secure Access
  - Accessing and Experimenting with AWS Services
  - Watch Video
    - Steps to Launch an EC2 Instance

---

## Content

AWS Solutions Architect Associate Certification

Introduction

# The KodeKloud AWS Playgrounds

Welcome, Future Solutions Architects! In this lesson, we explore the powerful features of the KodeKloud AWS Playground. Whether you’re refining your cloud skills or preparing for your AWS Solutions Architect exam, this guide will help you navigate and utilize the AWS Sandbox effectively.

When you log in with your subscription, you gain access to multiple environments via the "Playgrounds" section on KodeKloud. Visit [KodeKloud Playgrounds](https://KodeKloud.com/Playgrounds) to discover a hidden gem that includes:

- Cloud Playgrounds
- Linux Playgrounds
- Kubernetes Environments and related tools
- Container Playgrounds
- HashiCorp Playgrounds
- Machine Learning Playground
- Observability Playgrounds

While not every option directly relates to AWS, selecting AWS reveals the specific services and configurations available in your AWS Sandbox.

![The image shows a webpage from KodeKloud about the AWS Sandbox Playground, explaining Amazon Web Services and offering a launch button. There's also a small video call window with a person in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752864631/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/aws-sandbox-playground-webpage.jpg)

## Exploring AWS Services

After clicking on AWS, you will see a detailed list of available services in your AWS playground. These include features to:

- Run virtual machines
- Configure object storage
- Manage RDS
- Deploy EKS
- Utilize services such as DocumentDB, ECR, SNS, and KMS

> [!important]
> **Note**
>
> AWS services related to code management (e.g., CodeStar, CodePipeline, and CodeDeploy) are generally aligned with operations exams rather than the AWS Solutions Architecture exam.

This organized service list eliminates permission errors, letting you experiment freely with every feature.

![The image shows a webpage listing various AWS services and features, with a "Launch now" button and a small video overlay of a person gesturing.](https://kodekloud.com/kk-media/image/upload/v1752864632/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/aws-services-features-webpage.jpg)

## Starting Your Lab

To start using the playground, simply click the **Launch Now** button. You will be redirected to a page where you can select **Start Lab**. The lab might already be running if you’ve visited previously. Here, you can also access:

- A list of supported services
- A troubleshooting guide
- Links to community support via Slack or forums

Once the lab starts, you’ll be presented with a console that provides you with the necessary credentials and a link to access the AWS console. Copy the link into your browser and log in with the provided username and password. This setup connects you to a pre-configured IAM user account.

![The image shows a KodeKloud AWS playground screen with a console link, username, and password for accessing AWS, along with a timer indicating expiration. A person is visible in a small video overlay at the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752864633/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/kodekloud-aws-playground-console.jpg)

At the IAM sign-in page, the account ID is pre-filled. Simply input your IAM username and password, then click **Sign in**. You may be prompted to save these details via your password manager. Enjoy full access to the AWS console in a secure sandbox environment that lets you experiment without risk or cost.

![The image shows an AWS IAM user sign-in page with fields for account ID, IAM username, and password, alongside an advertisement for AWS data services. There's also a small circular video feed of a person in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752864634/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/aws-iam-user-signin-page.jpg)

## Launching an EC2 Instance

To launch an EC2 instance, navigate to the EC2 dashboard. Use the region dropdown at the top of the page to select your desired region (e.g., US East 1, US West 2, Europe, or AP Southeast 1 in Singapore).

![The image shows an AWS EC2 dashboard with a dropdown menu displaying various AWS regions. A person is visible in a small overlay at the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752864636/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/aws-ec2-dashboard-regions-dropdown.jpg)

### Steps to Launch an EC2 Instance

1.  **Click the "Launch Instance" Button.**
2.  **Name Your Instance:** For example, "my-test-instance."
3.  **Choose an Amazon Linux 2023 AMI:** This AMI is optimized for cloud environments (Ubuntu or RHEL are valid alternatives).
4.  **Select an Instance Type:** T2 Micro is a good starting point; you can later switch to a T3 or another instance type as needed.

![The image shows an AWS console screen for launching an EC2 instance, with options for selecting an Amazon Machine Image (AMI) and instance type. A person is visible in a small video overlay at the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752864637/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/aws-ec2-launch-console-ami-instance.jpg)

When configuring your instance, review the offered virtual machine types in the playground. Although some settings might reference other cloud platforms (like Azure), ensure you select the AWS-specific settings. If you need more resources, adjust the instance type and storage allocation (for example, change storage from 8GB to 12GB on a GP2 volume).

## Creating a Key Pair for Secure Access

Before launching the instance, create a key pair for secure SSH access. AWS uses key pairs in place of traditional passwords for EC2 instances. Follow these steps:

1.  Create a new key pair (e.g., "test-instance").
2.  Choose the PEM file format.
3.  The key pair file will automatically download to your browser.

![The image shows an AWS console screen for creating a key pair, with options for key pair name, type, and file format. There's also a small video overlay of a person speaking in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752864638/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/aws-console-key-pair-creation.jpg)

After configuring storage, selecting the proper instance type, and setting up your key pair, proceed to launch your instance. If you receive a notification about missing networking settings (such as a VPC or subnet), follow the prompts to create a new default VPC. Refresh the page to view available subnets, enable automatic IP address assignment, and then complete the instance launch process.

![The image shows an AWS EC2 instance launch configuration screen, detailing storage volumes and instance settings. A person is visible in a small video overlay at the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752864639/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-KodeKloud-AWS-Playgrounds/aws-ec2-instance-launch-configuration.jpg)

## Accessing and Experimenting with AWS Services

Once your EC2 instance is running, use your downloaded key pair to log in. Besides EC2, the AWS Playground allows you to experiment with other AWS services such as RDS and SNS. Remember that some code-specific services are not required for the Solutions Architecture exam, but exploring the entire range enriches your overall understanding.

> [!important]
> **Tip**
>
> If any service is missing or if you need additional practice, revisit the playground and experiment until you feel confident with the platform’s capabilities.

This lesson provided an overview of the AWS services available through the KodeKloud sandbox playground. We hope you enjoy this hands-on experience and build a solid foundation for your future in cloud architecture.

Thank you for reading, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/1a87a522-2fb5-41e9-a36f-0157341c75d9/lesson/2dbfa1b0-5c72-4bb9-bb49-3343036808fc)**
>
> Watch video content
