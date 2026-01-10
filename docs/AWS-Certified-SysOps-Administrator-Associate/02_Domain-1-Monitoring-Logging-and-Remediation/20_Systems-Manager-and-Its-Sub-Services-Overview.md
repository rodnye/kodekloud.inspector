# Systems Manager and Its Sub Services Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Systems-Manager-and-Its-Sub-Services-Overview)

---

## Table of Contents

- Systems Manager and Its Sub Services Overview
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Systems Manager and Its Sub Services Overview

Welcome to this lesson on AWS Systems Manager and its extensive sub-services. AWS Systems Manager is a comprehensive management solution designed to help you efficiently manage your AWS resources—ranging from virtual machines and container worker nodes (ECS/EKS) to on-premises systems and IoT devices. This robust service addresses common operational challenges including compliance, inventory, and automation by offering a centralized control plane.

AWS Systems Manager supports the management of operating systems at scale. It features multiple sub-services such as State Manager, Change Calendar, Application Manager, Session Manager, and Incident Manager. In addition, it provides essential capabilities for automation, maintenance windows, patch management, application configuration, and secure storage through Parameter Store. Its flexibility allows you to manage AWS environments, on-premises data centers outfitted with the Systems Manager agent, and even systems deployed on other cloud platforms.

![The image is a diagram of a Systems Manager, showing various management tools like Inventory, Patch Manager, and Incident Manager, connected to different environments such as AWS, other cloud providers, data centers, and IoT fleets.](https://kodekloud.com/kk-media/image/upload/v1752859958/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Systems-Manager-and-Its-Sub-Services-Overview/systems-manager-management-tools-diagram.jpg)

You can access Systems Manager via the AWS Management Console, command line interfaces, and SDKs. For example, the run command feature in combination with automation documents (which are defined using Systems Manager automation syntax) allows you to manage a fleet of EC2 instances within a VPC. This functionality covers a wide spectrum of operational tasks.

Among its sub-services, Session Manager stands out by enabling you to securely log into instances without the need for traditional jump boxes or open ports. By leveraging the Systems Manager (SSM) agent running on your instances, Session Manager simplifies secure access. Furthermore, Systems Manager centralizes inventory management, patching, and baseline settings through maintenance windows and patch groups, making it easy to group resources by operating system (Windows or Linux), application role, or geographical location. It also offers significant automation via SSM documents, similar in concept to [Puppet Manifests](https://puppet.com/docs/puppet/latest/puppet_index.html), [Chef Recipes](https://docs.chef.io/recipes/), or [Ansible Playbooks](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) — albeit with a simplified approach.

> [!important]
> **Tip**
>
> For scenarios involving sensitive information, always use the secure Parameter Store to store configuration details and secrets. However, remember that Parameter Store does not support automatic rotation of secrets.

For automatic secret rotation, [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) is the recommended solution—an important distinction for exam preparation.

In addition to Session Manager and Parameter Store, AWS Systems Manager includes several key capabilities:

- **Automation Documents and Run Command:** Automate patching, gather operational insights, group nodes, and remediate issues.
- **Change Manager:** Utilize a comprehensive change management framework with change calendars and maintenance windows. This framework logs all automated changes and can include approval processes when necessary.
- **Node Management:** Perform compliance scans, inventory assessments, state management with State Manager, patching for both Windows and Linux, and software distribution.

![The image illustrates a Systems Manager workflow involving AWS, showing components like VPC, run commands, and documents interacting with various system elements.](https://kodekloud.com/kk-media/image/upload/v1752859959/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Systems-Manager-and-Its-Sub-Services-Overview/aws-systems-manager-workflow-diagram.jpg)

Consider an e-commerce application that requires both server configuration management and application settings oversight. With Application Manager, you can visualize your entire application architecture, identify problematic components, and automatically trigger corrective actions such as restarting servers or clearing logs using run commands. Parameter Store securely holds connection strings and credentials, ensuring that sensitive data is not hard-coded into your applications.

Change Manager adds another layer by offering a structured framework to manage and audit changes throughout your environment. Integrating automation, change calendars, and maintenance windows creates a streamlined change control process that can capture, execute, and even roll back changes as needed.

![The image illustrates four aspects of change management: Change Manager, Automation, Change Calendar, and Maintenance Windows, each represented by a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752859960/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Systems-Manager-and-Its-Sub-Services-Overview/change-management-aspects-icons.jpg)

Node management in Systems Manager provides a centralized approach to manage individual resources. This includes:

- Compliance monitoring
- Inventory scans
- Secure session management
- State management to enforce desired configurations
- Patch management for both Windows and Linux
- Software distribution

![The image shows a diagram titled "Node Management" with seven icons representing different management functions: Compliance, Inventory, Session Manager, Run Command, State Manager, Patch Manager, and Distributor.](https://kodekloud.com/kk-media/image/upload/v1752859961/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Systems-Manager-and-Its-Sub-Services-Overview/node-management-diagram-icons.jpg)

On the operations side, Incident Manager plays a critical role in handling outages. For instance, if your e-commerce site experiences downtime, Incident Manager can detect the issue based on [CloudWatch alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) and alert the appropriate engineers using predefined response plans, including diagnostic instructions, communication templates, and runbooks. Additionally, Ops Center consolidates patch notifications and operational issues into a centralized dashboard, streamlining both incident management and resolution.

![The image shows two icons labeled "Incident Manager" and "OpsCenter" under the heading "Operations Management." Each icon has a distinct design related to its function.](https://kodekloud.com/kk-media/image/upload/v1752859962/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Systems-Manager-and-Its-Sub-Services-Overview/operations-management-incident-manager-opscenter.jpg)

This overview highlights some of the key sub-services provided by AWS Systems Manager. The primary focus is on State Manager, Patch Manager, Automation Documents, and Session Manager—with Incident Manager and the Systems Manager Dashboard also playing important roles. While not every feature is covered in exhaustive detail, especially those less commonly discussed at the Associate level, this discussion provides a solid foundation for understanding Systems Manager's capabilities.

> [!important]
> **Next Steps**
>
> For hands-on experience, explore demo environments in AWS Systems Manager. This practical engagement will reinforce the concepts discussed and prepare you for further studies and exam preparation.

Thank you for reading this lesson. We look forward to exploring more AWS services in our next session.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/a30c3aa9-ab22-4074-8194-fcef4114417f)**
>
> Watch video content
