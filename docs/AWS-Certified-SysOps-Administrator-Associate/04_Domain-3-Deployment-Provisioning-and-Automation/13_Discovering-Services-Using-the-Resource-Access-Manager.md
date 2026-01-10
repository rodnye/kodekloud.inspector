# Discovering Services Using the Resource Access Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Discovering-Services-Using-the-Resource-Access-Manager)

---

## Table of Contents

- Discovering Services Using the Resource Access Manager
  - Overview of the Resource Access Manager
  - Simplified Resource Sharing and Policy Management
  - Visual Overview
  - Best Practices for Using RAM
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Discovering Services Using the Resource Access Manager

Welcome to this lesson on discovering and sharing services with the Resource Access Manager (RAM). In this session, we’ll explore how AWS RAM enables efficient sharing of AWS resources across multiple accounts within your AWS Organization.

## Overview of the Resource Access Manager

The Resource Access Manager (RAM) is an AWS service that allows you to centrally share supported AWS resources with any account in your AWS Organization. By leveraging RAM, you can avoid duplicating resources across accounts and reduce the operational overhead of managing them individually.

RAM streamlines resource sharing using three straightforward steps:

1.  Create a resource share.
2.  Specify the resources to be shared.
3.  Define the accounts or organizational units that can access these resources.

A significant benefit of RAM is that it comes at no additional charge. For example, you can share network resources like VPC subnets or Transit Gateways without incurring extra costs. This centralized approach not only optimizes resource utilization but also simplifies your overall resource management.

## Simplified Resource Sharing and Policy Management

RAM enables you to group resources—such as VPC subnets and Transit Gateways—and manage them from a central dashboard. This unified view helps in:

- Preventing resource fragmentation
- Simplifying policy configurations (for instance, VPN connections)
- Streamlining resource tracking and ensuring compliance

When creating a resource share, you designate the supported resources and assign access to specific accounts or organizational units. Organize your accounts by categorizing them into production, development, QA, or shared services groups. Once the invitation is accepted by the target accounts, you can easily manage and monitor the shared resources.

## Visual Overview

The diagram below illustrates the Resource Access Manager interface. In this example, a resource share includes an EC2 subnet. Although only one resource is depicted here, a resource share can include multiple resources.

![The image shows a screenshot of a Resource Access Manager (RAM) interface, detailing a subnet share with its ID, owner, ARN, and status. It also lists a shared resource, an EC2 subnet, with its associated status.](https://kodekloud.com/kk-media/image/upload/v1752860321/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Discovering-Services-Using-the-Resource-Access-Manager/resource-access-manager-subnet-share.jpg)

## Best Practices for Using RAM

For optimal results when using RAM, consider these best practices:

- **Integrate with AWS Organizations:**  
  Managing resource sharing through AWS Organizations simplifies invitations and enhances security.
- **Adhere to the Principle of Least Privilege:**  
  Only share the resources that are necessary for a particular account or organizational unit. Regularly review your share policies to maintain robust security.
- **Monitor Configurations with AWS Config:**  
  Implement AWS Config rules to track configuration changes. This ensures that your RAM setup remains compliant with company policies.

> [!important]
> **Exam Tip**
>
> When faced with an exam question related to sharing a large set of services with another account, remember that the optimal approach is to use RAM. Create a resource share, assign all required services to that share, and specify the target accounts. This method ensures centralized management and a streamlined sharing process.

![The image illustrates best practices for resource sharing with RAM, featuring icons and labels for AWS Organizations, Least Privilege Principle, and Centralized Control.](https://kodekloud.com/kk-media/image/upload/v1752860322/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Discovering-Services-Using-the-Resource-Access-Manager/resource-sharing-best-practices-aws.jpg)

## Conclusion

In conclusion, the Resource Access Manager is an essential tool for sharing AWS resources efficiently across multiple accounts. By centralizing the management of shared resources, RAM enhances operational efficiency, resource tracking, and compliance. Always consider integrating with AWS Organizations, following the principle of least privilege, and utilizing AWS Config to monitor changes.

Thank you for reading this lesson. We hope this guide has provided you with a clear understanding of how to effectively use the Resource Access Manager.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/98b2206e-861b-4e65-b0d0-b010d0a309b6)**
>
> Watch video content
