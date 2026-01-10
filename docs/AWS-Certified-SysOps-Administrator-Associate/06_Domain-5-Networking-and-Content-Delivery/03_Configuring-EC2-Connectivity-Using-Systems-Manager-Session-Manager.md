# Configuring EC2 Connectivity Using Systems Manager Session Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager)

---

## Table of Contents

- Configuring EC2 Connectivity Using Systems Manager Session Manager
  - Overview of Systems Manager and Session Manager
  - How It Works
  - Supported Operating Systems
  - Configuring Your EC2 Instance
  - Managing Session Access
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Configuring EC2 Connectivity Using Systems Manager Session Manager

In this guide, you will learn how to configure secure connectivity to your EC2 instances using AWS Systems Manager's Session Manager. Session Manager, a key feature of AWS Systems Manager (SSM), enables secure and auditable access to your instances without relying on traditional SSH or RDP methods.

## Overview of Systems Manager and Session Manager

AWS Systems Manager simplifies operational tasks by allowing you to install an SSM Agent on your EC2 instances. Many Amazon Machine Images (AMIs) — including Amazon Linux 2 and those produced using tools like Packer or EC2 Image Builder — already come with the SSM Agent pre-installed. Alternatively, the agent can be installed during instance configuration, although this may slightly increase boot time.

Systems Manager is designed to address the challenges of managing diverse environments, including AWS cloud instances, on-premises servers, and even IoT devices. Its core capabilities include patch management, configuration management via the Parameter Store, and maintenance windows. Among these, Session Manager provides a secure method to connect to your instances without needing bastion hosts or managing SSH keys.

![The image is a diagram of a Systems Manager, showing various management tools like Inventory, Patch Manager, and Incident Manager, connected to different environments such as AWS, data centers, and IoT fleets.](https://kodekloud.com/kk-media/image/upload/v1752860795/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/systems-manager-management-tools-diagram.jpg)

By starting a Session Manager session, you can directly connect to your instances without opening additional ports. This method works seamlessly with both public and private subnets.

![The image is a diagram illustrating the flow of AWS Systems Manager's Session Manager, showing interactions between a user, AWS Systems Manager, and an SSM Agent.](https://kodekloud.com/kk-media/image/upload/v1752860796/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/aws-systems-manager-session-manager-diagram.jpg)

## How It Works

The process of configuring Session Manager involves the following key steps:

1.  **SSM Agent Installation**  
    Ensure that the SSM Agent is installed and running on your EC2 instance. Most modern AMIs include this agent by default, or it can be manually installed as part of your instance configuration.
2.  **IAM Permissions**  
    Attach an IAM role to your EC2 instance that includes the AmazonSSMManagedInstanceCore managed policy. This policy provides the necessary permissions for the instance to communicate with AWS Systems Manager.
3.  **Network Connectivity**  
    Your instance must have outbound HTTPS access (port 443) to AWS endpoints, such as ec2messages.region.amazonaws.com. This connectivity can be established either directly or via a private interface endpoint for secure interactions.

![The image illustrates the architecture of an AWS Session Manager setup, showing the interaction between AWS General Users, AWS Systems Manager, and components within a Virtual Private Cloud (VPC) such as EC2 instances and S3 buckets. It highlights the flow of creating sessions and viewing logs.](https://kodekloud.com/kk-media/image/upload/v1752860799/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/aws-session-manager-architecture-diagram.jpg)

Additionally, Session Manager allows logging of sessions to Amazon S3 or CloudWatch Logs for auditing. It also supports configurable session preferences such as default usernames, session timeout policies, and environment variables.

![The image outlines the prerequisites for using Session Manager, including supported operating systems like Linux, macOS, and Windows, and the required SSM Agent version.](https://kodekloud.com/kk-media/image/upload/v1752860799/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/session-manager-prerequisites-ssm-agent.jpg)

## Supported Operating Systems

Session Manager supports a variety of operating systems, including:

- **Linux:** Most distributions are supported.
- **Windows:** Supported from Windows Server 2012 onwards (note that support for Windows Server 2012 may be phased out in line with Microsoft’s lifecycle policies).
- **macOS**

> [!important]
> **Note**
>
> Unsupported platforms, such as Solaris or certain legacy systems, are not supported by Session Manager.

## Configuring Your EC2 Instance

Once the SSM Agent is installed and the instance possesses the appropriate IAM role and network configuration, you are ready to establish a session. You can initiate a Session Manager session either through the AWS Management Console or via the AWS CLI, connecting over HTTPS on port 443. This setup ensures that even instances in private subnets are managed securely.

![The image is about network connectivity, indicating that managed nodes need outbound HTTPS (port 443) to AWS endpoints, specifically to "ec2messages.region.amazonaws.com".](https://kodekloud.com/kk-media/image/upload/v1752860800/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/network-connectivity-https-aws-endpoints.jpg)

Ensure that your instance's IAM role includes the AmazonSSMManagedInstanceCore policy so that it can securely communicate with AWS Systems Manager.

![The image illustrates the process of verifying or adding instance permissions in AWS, showing the relationship between a VPC, private subnet, security group, SSM Agent, and AWS Systems Manager. It also includes a role and policy for AmazonSSMManagedInstanceCore.](https://kodekloud.com/kk-media/image/upload/v1752860802/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/aws-instance-permissions-diagram.jpg)

## Managing Session Access

Session Manager also provides fine-grained control over user sessions. As an administrator, you can grant or revoke access and control operations such as creating, describing, or closing sessions. In addition, you can define session management preferences to enhance security and efficiency. These settings include:

- Default user for sessions
- KMS encryption for session logs
- Logging defaults to Amazon S3 or CloudWatch Logs
- Session timeout durations
- Working directories and environment variables

![The image illustrates the concept of granting or revoking session access, showing user/group connections to instances and allowed Session Manager API operations like closing, creating, describing, and deleting sessions.](https://kodekloud.com/kk-media/image/upload/v1752860803/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/session-access-grant-revoke-diagram.jpg)

![The image is a flowchart titled "Configuring Session Preferences," detailing steps like "Run As Support," "KMS Encryption," "Session Logging," "Shell Profiles," and "Session Timeouts," with a computer and tools icon.](https://kodekloud.com/kk-media/image/upload/v1752860804/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-EC2-Connectivity-Using-Systems-Manager-Session-Manager/configuring-session-preferences-flowchart.jpg)

## Summary

To summarize, the key steps to configure EC2 connectivity using Systems Manager Session Manager include:

- Ensuring that your EC2 instances are running a supported operating system with the SSM Agent installed.
- Attaching the correct IAM role that includes the AmazonSSMManagedInstanceCore policy to enable communication with Systems Manager.
- Verifying outbound HTTPS connectivity (port 443) to the required AWS endpoints.
- Utilizing Session Manager to manage your instances securely without needing bastion hosts or direct SSH/RDP connectivity.
- Configuring session preferences and logging to enhance auditing and security practices.

By following these guidelines, you can efficiently and securely manage your EC2 instances using AWS Systems Manager Session Manager.

For further details, explore the [AWS Systems Manager Documentation](https://docs.aws.amazon.com/systems-manager/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/a3a48991-0f3a-4617-b0fc-698a1af35903)**
>
> Watch video content
