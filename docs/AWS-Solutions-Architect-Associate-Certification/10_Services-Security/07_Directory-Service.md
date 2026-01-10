# Directory Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/Directory-Service)

---

## Table of Contents

- Directory Service
  - Simple AD Mode
  - Managed Microsoft AD Mode
  - AD Connector Mode
  - Quick Comparison Table
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# Directory Service

In this article, we explore the capabilities of AWS Directory Service and its seamless integration with Microsoft Active Directory (AD). By understanding how Active Directory functions as a centralized system to manage users, permissions, and access rights, you can better appreciate how AWS Directory Service simplifies directory management in the cloud.

Active Directory is a directory service developed by Microsoft. It enables administrators to control access to applications, services, and network resources by centrally managing user permissions. Whether you're managing cloud applications, SaaS solutions, or on-premises applications, Active Directory is the backbone for secure and efficient access control.

![The image is a diagram illustrating the flow of authentication and access between a Workspace, Active Directory, and Resources. It shows the process of authenticating through Active Directory to access resources.](https://kodekloud.com/kk-media/image/upload/v1752865792/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Directory-Service/authentication-access-workspace-diagram.jpg)

AWS Directory Service delivers a fully managed implementation of directory services similar to Active Directory. Just as Amazon RDS eliminates the complexities of database management, AWS Directory Service reduces the operational burdens associated with running your own Active Directory infrastructure across multiple availability zones.

> [!important]
> **Key Benefit**
>
> Using AWS Directory Service, organizations can achieve high levels of availability and scalability while ensuring secure directory operations in the cloud.

Below, we outline the three primary modes in which AWS Directory Service can operate. Each mode is designed to meet distinct integration needs and use cases:

## Simple AD Mode

In Simple AD mode, AWS Directory Service functions as a standalone directory within the AWS environment. This mode is ideal for AWS-compatible services that require basic directory functionalities. However, Simple AD is built using the Samba protocol and does not offer the full range of features available in Microsoft AD. It is intended for isolated deployments and does not support integration with existing on-premises directories.

![The image illustrates a "Simple AD Mode" within a "Virtual Private Cloud (VPC)" for directory services. It features a diagram with a symbol representing Simple AD inside the VPC.](https://kodekloud.com/kk-media/image/upload/v1752865793/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Directory-Service/simple-ad-mode-vpc-diagram.jpg)

## Managed Microsoft AD Mode

For users who need advanced features and full compatibility with Microsoft Active Directory, AWS offers the Managed Microsoft AD mode. This service deploys a genuine instance of Microsoft AD in the AWS cloud, making it suitable for applications that depend on specific AD functionalities. Additionally, if you have an existing on-premises Active Directory, you can establish a trust relationship with your Managed Microsoft AD instance to create a seamless hybrid environment between your on-premises and cloud resources.

![The image illustrates a diagram of directory service modes for Managed Microsoft AD, showing a trust relationship between a virtual private cloud (VPC) and an on-premise setup.](https://kodekloud.com/kk-media/image/upload/v1752865794/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Directory-Service/managed-microsoft-ad-directory-service-diagram.jpg)

## AD Connector Mode

Organizations that already maintain an on-premises Active Directory and prefer not to deploy a separate cloud instance can opt for the AD Connector mode. In this configuration, AWS Directory Service provides a proxy that connects AWS services, such as AWS WorkSpaces, directly to your on-premises AD. This solution avoids duplicating directory infrastructure in the cloud while still enabling secure integration with AWS services.

![The image illustrates a diagram of a Directory Service Mode using an AD Connector, showing a connection between a Virtual Private Cloud (VPC) and an on-premise setup.](https://kodekloud.com/kk-media/image/upload/v1752865795/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Directory-Service/directory-service-mode-ad-connector-diagram.jpg)

## Quick Comparison Table

| Directory Service Mode | Description                                                                                   | Key Use Case                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Simple AD              | Standalone directory in AWS using Samba; supports basic directory operations.                 | Lightweight directory needs that do not require full AD features.                    |
| Managed Microsoft AD   | Full-featured Microsoft AD deployed in AWS; supports trust relationships with on-premises AD. | Applications that demand advanced AD functionalities and hybrid setups.              |
| AD Connector           | Acts as a proxy to connect AWS services to an existing on-premises Active Directory.          | Integrating AWS services with an existing on-premises directory without duplication. |

In summary, AWS Directory Service offers flexible modes—Simple AD, Managed Microsoft AD, and AD Connector—to address a variety of organizational needs. Whether you require a standalone cloud directory, an advanced Microsoft AD experience, or a proxy integration with your on-premises system, this managed service ensures enhanced performance, high availability, and seamless integration across your deployment scenarios.

> [!important]
> **Further Reading**
>
> For more in-depth information on AWS Directory Service and its features, refer to the [AWS Directory Service Documentation](https://aws.amazon.com/directoryservice/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/59718224-efd0-4b7f-8d9f-54f93a1ca397)**
>
> Watch video content
