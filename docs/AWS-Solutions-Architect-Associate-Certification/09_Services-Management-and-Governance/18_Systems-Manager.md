# Systems Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/Systems-Manager)

---

## Table of Contents

- Systems Manager
  - Application Management
  - Change Management
  - Node Management
  - Operations Management
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# Systems Manager

In this article, we delve into AWS Systems Manager, a robust service designed to simplify the management of your EC2 instances, on-premises servers, and various resources across multiple platforms and environments. Whether your servers run on AWS, another cloud provider, or on-premises, Systems Manager streamlines operations for large-scale infrastructures.

AWS Systems Manager empowers you to collect software inventory, enforce configuration standards, and execute a wide range of tasks—from creating necessary users and configuring firewalls to running commands and applying OS patches. This centralized approach ensures consistent configurations, prevents drift, and maintains software compliance regardless of the underlying system.

![The image is a diagram of a Systems Manager, showing various components like Inventory, Patch Manager, and Incident Manager, connected to different environments such as AWS, Data Centers, and IoT Fleets.](https://kodekloud.com/kk-media/image/upload/v1752865385/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Systems-Manager/systems-manager-diagram-components.jpg)

> [!important]
> **SSM Agent Overview**
>
> To manage various systems seamlessly, Systems Manager relies on the SSM agent. This lightweight software runs on both EC2 instances and on-premises servers or virtual machines, ensuring secure communication between your servers and the Systems Manager service. With the SSM agent, you can efficiently handle configuration management, inventory collection, and remote command execution.

![The image is a diagram showing the relationship between an Amazon EC2 or on-premises server with an SSM Agent and a Systems Manager.](https://kodekloud.com/kk-media/image/upload/v1752865386/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Systems-Manager/ec2-ssm-agent-relationship-diagram.jpg)

You can interact with Systems Manager through the AWS CLI, the Management Console, or various SDKs. This flexibility allows you to push configuration changes across multiple servers simultaneously, group servers based on specific roles, and automate routine IT tasks efficiently.

Systems Manager's key features and capabilities include:

- Centralized control via a unified user interface.
- Grouping resources to target specific subsets of servers.
- Automation of repetitive IT operations, such as patch management and configuration updates.
- Operational insights through Systems Manager Explorer and Insights.
- The State Manager, ensuring servers remain in their predefined configuration state.
- Secure hierarchical storage for configuration data and secrets via the Parameter Store.
- Remote management with Session Manager, offering browser-based shell access or CLI connectivity.
- Compliance scanning to verify adherence to defined configuration and patch policies.

![The image lists ten key features and capabilities, including Centralized Control, Resource Grouping, Automation, Patch Management, Operational Insights, Configuration Management, Secret and Configuration Management, Remote Management, Compliance Enforcement, and Hybrid Capabilities. Each feature is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752865387/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Systems-Manager/key-features-capabilities-list.jpg)

Systems Manager offers a broad array of features that can be grouped into several key categories:

## Application Management

AWS Systems Manager enhances application management through two primary services:

1.  **Application Manager**  
    Application Manager assists in investigating and mitigating issues within applications and clusters. For instance, if your e-commerce application (which might include resources like EC2, RDS, and Lambda functions) exhibits a spike in error rates, Application Manager helps visualize the architecture, pinpoint problematic components (e.g., a non-responsive EC2 instance), and leverage features like Run Command to resolve issues.
2.  **Parameter Store**  
    Parameter Store provides a secure storage mechanism for configuration data and secrets. Instead of embedding credentials directly in your application code, store sensitive information such as database usernames and passwords securely in the Parameter Store with KMS encryption. Your application can then retrieve these credentials at runtime, simplifying credential rotation and enhancing security.

![The image is a diagram showing an AWS VPC containing Amazon EC2, AWS Lambda, and Amazon RDS, with an arrow pointing to a Parameter Store.](https://kodekloud.com/kk-media/image/upload/v1752865389/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Systems-Manager/aws-vpc-ec2-lambda-rds-diagram.jpg)

## Change Management

Managing changes in dynamic environments is seamless with Systems Manager. Its suite of tools includes:

- **Change Manager**  
  An enterprise framework that governs operational changes to application configurations and infrastructure. For example, when upgrading a critical database, Change Manager allows you to create a structured workflow with necessary approvals from involved teams before any modifications are implemented.
- **Automation**  
  This tool automates repetitive IT tasks. For instance, if new EC2 instances require specific security configurations, Automation can attach the correct IAM role and apply necessary security groups automatically.
- **Change Calendar**  
  Change Calendar helps schedule modifications to avoid critical business periods. For example, during peak shopping seasons like Thanksgiving or Christmas, you can prevent significant changes to sustain stability.
- **Maintenance Windows**  
  Maintenance Windows are designed to schedule system tasks during off-peak hours. Whether patching or updating code, you can plan these activities during late nights or weekends to minimize impact on business operations.

![The image is a diagram titled "Change Management" featuring four icons labeled Change Manager, Automation, Change Calendar, and Maintenance Windows. Each icon represents a different aspect of change management.](https://kodekloud.com/kk-media/image/upload/v1752865389/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Systems-Manager/change-management-diagram-icons.jpg)

## Node Management

For effective day-to-day server management, Systems Manager includes several essential tools:

- **Compliance** – Scan your server fleet for patch compliance and configuration discrepancies.
- **Inventory** – Generate comprehensive reports on all servers managed by Systems Manager.
- **Session Manager** – Provides secure, remote connectivity to managed instances.
- **Run Command** – Execute commands and configurations across multiple servers without manual intervention.
- **State Manager** – Maintain defined configuration states across instances.
- **Patch Manager** – Automate patching processes for managed instances.
- **Distributor** – Seamlessly distribute software packages to your instances.

![The image shows a diagram titled "Node Management" with six green circular icons labeled Compliance, Inventory, Session Manager, Run Command, State Manager, and Patch Manager.](https://kodekloud.com/kk-media/image/upload/v1752865390/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Systems-Manager/node-management-diagram-icons.jpg)

## Operations Management

To effectively manage and resolve operational issues, AWS Systems Manager offers:

- **Incident Manager**  
  Incident Manager aids in mitigating and recovering from critical incidents. For example, during website downtime at peak hours, it can detect outages through pre-set CloudWatch alarms, alert on-call engineers via SMS or email, and initiate predefined response plans that include diagnostic instructions and runbooks.
- **OpsCenter**  
  OpsCenter consolidates alerts and findings from various AWS services onto a centralized dashboard, making it easier to investigate and resolve operational challenges. It can, for instance, help identify which EC2 instances need patching.

![The image shows two icons labeled "Incident Manager" and "OpsCenter" under the heading "Operations Management." Each icon has a gradient background with relevant symbols.](https://kodekloud.com/kk-media/image/upload/v1752865391/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Systems-Manager/operations-management-incident-manager-opscenter.jpg)

> [!important]
> **Best Practices Reminder**
>
> Always ensure that your Systems Manager configurations and permissions follow AWS best practices. Properly managing roles, policies, and security settings is crucial to safeguard your infrastructure.

## Conclusion

AWS Systems Manager offers a comprehensive centralized solution to manage, automate, and secure your IT infrastructure across diverse environments. Its extensive feature set—including application management, change control, node management, and operations management—ensures that you maintain high levels of operational performance and reliability in a scalable and efficient manner.

For further reading on AWS Systems Manager features and best practices, consider visiting the [AWS Documentation](https://aws.amazon.com/documentation/systems-manager/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/e58222d2-effe-47fd-86b4-ec8168715275)**
>
> Watch video content
