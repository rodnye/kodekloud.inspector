# AWS Systems Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Miscellaneous-Services/AWS-Systems-Manager)

---

## Table of Contents

- AWS Systems Manager
  - How It Works
  - Key Features and Capabilities
  - Conclusion
  - Watch Video
    - Application Manager
    - Parameter Store
    - Change Management Components
    - Node Management

---

## Content

AWS Certified Developer - Associate

Miscellaneous Services

# AWS Systems Manager

In this lesson, you will learn about AWS Systems Manager—a comprehensive tool designed to streamline the management of your servers. Whether your servers are on AWS, on-premises, hosted on other cloud providers, or even part of an IoT fleet, Systems Manager provides the capabilities you need to manage, monitor, and maintain them efficiently.

AWS Systems Manager consolidates operations such as software inventory collection, configuration management (for example, adding new users or executing commands), and OS patch management into a single management console. This centralization minimizes the need for manual logins and simplifies day-to-day server administration.

![The image is a diagram of a Systems Manager, showing various components like Inventory, Patch Manager, and Incident Manager, connected to cloud providers, AWS, data centers, and IoT fleets.](https://kodekloud.com/kk-media/image/upload/v1752859111/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Systems-Manager/systems-manager-diagram-components.jpg)

## How It Works

For a server to interact with AWS Systems Manager, it must have the SSM agent installed. This agent facilitates secure communication between the server and Systems Manager, enabling remote command execution and configuration changes seamlessly.

![The image is a diagram showing the relationship between an Amazon EC2 or on-premises server with an SSM Agent and a Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752859112/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Systems-Manager/ec2-ssm-agent-relationship-diagram.jpg)

You can manage Systems Manager through various interfaces such as the AWS CLI, the AWS Management Console, or the AWS SDK. For example, the "Run Command" feature employs SSM documents that specify the instructions to be executed on target servers.

## Key Features and Capabilities

AWS Systems Manager offers a unified interface to monitor operational data and automate tasks across your resources. Its core features include:

- **Centralized Management:** Group and manage your resources based on applications, workloads, or environments.
- **Automation:** Automate routine IT operations and maintenance tasks safely.
- **Patch Manager:** Ensure automated deployment of OS and security patches across managed instances.
- **Operational Insights:** Gain detailed insights into the health and status of your infrastructure.
- **Parameter Store:** Securely store configuration data and secrets using a hierarchical structure.
- **Remote Management:** Access and manage instances via a browser-based shell or AWS CLI without the need to open inbound ports or handle SSH keys.
- **Compliance and Inventory:** Continuously monitor patch compliance, configuration consistency, and collect metadata from instances.
- **Hybrid Management:** Seamlessly manage both cloud-based and on-premises resources.

![The image lists ten key features and capabilities, including Centralized Control, Resource Grouping, Automation, Patch Management, and others, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752859113/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Systems-Manager/key-features-capabilities-icons.jpg)

> [!important]
> **Key Insight**
>
> AWS Systems Manager centralizes management tasks, enabling greater operational efficiency and reducing the risk associated with manual interventions.

### Application Manager

The Application Manager feature enables you to troubleshoot issues in AWS resources by visualizing them within the context of applications and clusters. For instance, if an application reliant on an EC2 instance, an RDS instance, and Lambda functions experiences increased error rates, the Application Manager will provide a detailed architecture view. This visualization aids in quickly identifying anomalies, such as a misbehaving EC2 instance, by presenting in-depth metrics, logs, and configuration details.

### Parameter Store

Parameter Store is a secure repository for storing configuration data and secrets. This tool ensures that applications can retrieve necessary settings and credentials at runtime in a secure and centralized manner.

![The image illustrates an AWS architecture diagram showing a VPC containing Amazon EC2, AWS Lambda, and Amazon RDS, with an arrow pointing to a Parameter Store.](https://kodekloud.com/kk-media/image/upload/v1752859114/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Systems-Manager/aws-architecture-vpc-ec2-lambda-rds.jpg)

### Change Management Components

AWS Systems Manager includes several features to support controlled and auditable operational changes:

- **Change Manager:** Establish a structured workflow for critical changes—such as upgrading databases—that require pre-approval before implementation.
- **Automation:** Automatically execute pre-defined tasks (e.g., applying security configurations or assigning IAM roles) when launching new EC2 instances to ensure compliance.
- **Change Calendar:** Schedule blackout periods (like high-traffic holidays) during which operational changes are not permitted.
- **Maintenance Windows:** Plan tasks during off-peak hours, like late night or early morning, to reduce user impact when performing updates or patches.

![The image illustrates four components of change management: Change Manager, Automation, Change Calendar, and Maintenance Windows, each represented by a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752859116/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Systems-Manager/change-management-components-icons.jpg)

### Node Management

Within node management, Systems Manager provides a range of functionalities designed to maintain and secure your servers:

- **Compliance and Inventory:** Continuously scan your server fleet for patch compliance and configuration consistency while collecting detailed metadata.
- **Session Manager:** Securely access and manage instances via an auditable session without requiring open inbound ports.
- **Run Command:** Execute commands remotely on multiple servers simultaneously.
- **State Manager:** Ensure that instances adhere to a desired state automatically.
- **Patch Manager:** Automate the deployment of operating system patches.
- **Distributor:** Facilitate the distribution of software packages across your instances.
- **Incident Manager:** Quickly respond to incidents such as website downtime by detecting outages via CloudWatch alarms, notifying on-call engineers, and executing a pre-defined response plan.
- **Ops Center:** Consolidate alerts from various AWS services into a centralized dashboard to manage operational issues effectively.

![The image shows icons representing different aspects of node management, including Compliance, Inventory, Session Manager, Run Command, State Manager, Patch Manager, and Distributor.](https://kodekloud.com/kk-media/image/upload/v1752859117/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Systems-Manager/node-management-icons-compliance-inventory.jpg)

## Conclusion

In summary, AWS Systems Manager simplifies the management of both EC2 and on-premises servers by providing a single, powerful interface for configuration, automation, patch management, and operational insights. For successful integration, ensure that the SSM agent is installed and properly configured on each server. By leveraging the rich features of Systems Manager, you can achieve robust, secure, and efficient infrastructure management across your entire environment.

![The image is a summary slide highlighting the management of EC2 and on-premise servers, the need for servers to be configured with the SSM agent, and the provision of configuration, secret management, automation, patch management, and operation insights.](https://kodekloud.com/kk-media/image/upload/v1752859118/notes-assets/images/AWS-Certified-Developer-Associate-AWS-Systems-Manager/ec2-on-premise-server-management-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/de8f3e67-8f0c-4bc3-8a42-023e28485788/lesson/f4c759b2-56c5-44ed-bca7-890e7128562a)**
>
> Watch video content
