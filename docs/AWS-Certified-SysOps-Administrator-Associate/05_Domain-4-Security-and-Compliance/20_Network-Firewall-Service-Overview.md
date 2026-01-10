# Network Firewall Service Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Network-Firewall-Service-Overview)

---

## Table of Contents

- Network Firewall Service Overview
  - How AWS Network Firewall Works
  - Centralized Security with AWS Firewall Manager
  - Conclusion
  - Watch Video
    - Rule Groups and Firewall Policies
    - VPC Routing and Firewall Deployment
    - Choosing Between Stateless and Stateful Rule Engines
    - Prerequisites for AWS Firewall Manager

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Network Firewall Service Overview

Welcome to this comprehensive guide on the AWS Network Firewall Service. In this article, we explore how this managed service stands out from other firewall offerings in AWS by providing advanced threat protection at the edge of your Virtual Private Cloud (VPC). AWS Network Firewall is designed to allow legitimate traffic while filtering out malicious requests through features like domain blocking and deep packet inspection.

![The image is a diagram illustrating a network firewall setup, showing legitimate users accessing a Virtual Private Cloud (VPC) with public subnets through a firewall.](https://kodekloud.com/kk-media/image/upload/v1752860564/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-vpc-diagram.jpg)

A key benefit of this AWS proprietary solution is its simplified rule management along with granular control, advanced threat protection, logging, monitoring, and synchronized rule updates across multiple firewalls. Unlike third-party appliances from the AWS Marketplace or integrations via gateway load balancers, this managed service streamlines firewall operations.

![The image lists five features of a network firewall: simplified rule management, granular control, advanced threat protection, logging and monitoring, and rule synchronization. Each feature is represented with an icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752860565/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-features-list.jpg)

## How AWS Network Firewall Works

The AWS Network Firewall Service operates based on rules that filter traffic by IP, port, protocol, or specific patterns. These rules are structured into rule groups, which are then aggregated into a firewall policy. This policy is enforced on a network firewall instance to determine if traffic should be allowed, dropped, or alerted.

> [!important]
> **Firewall Rule Types**
>
> There are two types of firewall rules:
>
> - **Stateless rules:** Evaluate each network packet individually, similar to traditional network access control lists.
> - **Stateful rules:** Monitor ongoing connections to track packet dialogs, ensuring that established sessions (e.g., web traffic) are properly managed.

![The image is a diagram explaining network firewall rules, distinguishing between stateless rules, which apply actions to each packet individually, and stateful rules, which monitor connections and apply rules on packet flow.](https://kodekloud.com/kk-media/image/upload/v1752860566/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-rules-diagram.jpg)

### Rule Groups and Firewall Policies

Rule groups, which are collections of individual rules, are combined to create a comprehensive firewall policy. This policy is then applied to a network firewall instance, streamlining traffic filtering with both default actions and custom configurations.

![The image shows a diagram of a "Network Firewall Rule Group" with four rules and icons representing IP addresses, ports, protocols, and patterns.](https://kodekloud.com/kk-media/image/upload/v1752860567/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-rule-group-diagram.jpg)

The overall firewall policy encompasses multiple rule groups that define how traffic is managed. After establishing these rules and rule groups, you deploy the firewall and update your Amazon VPC route tables to direct traffic to the correct network interfaces or endpoints.

![The image is a diagram titled "Network Firewall Policy," showing six rule groups used to filter VPC traffic. It explains that these groups contain rules and configurations for the firewall.](https://kodekloud.com/kk-media/image/upload/v1752860567/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-policy-diagram.jpg)

![The image illustrates a network firewall policy consisting of two rule groups, each containing two rules, connected to a firewall icon.](https://kodekloud.com/kk-media/image/upload/v1752860568/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-policy-rules-diagram.jpg)

### VPC Routing and Firewall Deployment

When deploying a network firewall, it is vital to update your VPC route tables to ensure traffic (both inbound and outbound) is appropriately routed through the firewall subnet. For instance, incoming traffic from the internet is first inspected by the firewall before being forwarded to the private subnet if allowed.

![The image outlines four steps for setting up a network firewall: creating rule groups, creating a firewall policy, creating a firewall, and updating Amazon VPC route tables.](https://kodekloud.com/kk-media/image/upload/v1752860569/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-setup-steps.jpg)

Because the network firewall service operates in a managed environment, each availability zone hosting a firewall instance must have routes directed to the subnet with the network interface. This design ensures that both public and private traffic is accurately inspected and forwarded.

![The image is a diagram illustrating a network firewall setup within a Virtual Private Cloud (VPC), showing private and firewall subnets across two availability zones. It includes icons representing network components and connections.](https://kodekloud.com/kk-media/image/upload/v1752860570/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/vpc-firewall-setup-diagram.jpg)

For single availability zone configurations, route tables manage the connection between the gateway, firewall, and customer subnets.

![The image illustrates a network architecture diagram showing route tables in a single-zone setup with a firewall, including an internet gateway, firewall subnet, and customer subnet within a VPC.](https://kodekloud.com/kk-media/image/upload/v1752860571/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-architecture-route-tables-diagram.jpg)

In multi-zone environments, the firewall is deployed in every availability zone, ensuring that all traffic is inspected as it enters or exits the VPC.

![The image illustrates network firewall deployment models within a Virtual Private Cloud (VPC), showing private and firewall subnets in multiple availability zones connected to external networks.](https://kodekloud.com/kk-media/image/upload/v1752860572/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-deployment-vpc-diagram.jpg)

### Choosing Between Stateless and Stateful Rule Engines

Selecting the appropriate rule engine is crucial depending on your traffic inspection needs. Stateless rules process traffic rapidly without session tracking, while stateful rules provide deeper packet inspection by tracking connection states. Depending on your configuration, you can implement actions such as passing, dropping, or alerting.

![The image is a diagram illustrating the flow of network firewall rules engines, showing the processes of a Firewall Stateless Engine and a Firewall Stateful Engine, with paths for passing, dropping, and alerting packets.](https://kodekloud.com/kk-media/image/upload/v1752860573/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/network-firewall-rules-diagram-2.jpg)

The stateless engine offers fast processing akin to network access control lists, whereas the stateful engine delivers comprehensive security resembling security groups. These capabilities make AWS Network Firewall a robust, managed solution for your security needs.

## Centralized Security with AWS Firewall Manager

Managing multiple firewall configurations across an organization can be complex. Manual management of firewall rule sets may lead to inconsistencies, increased complexity, slower threat response times, and compliance challenges. AWS Firewall Manager provides a centralized solution to manage these configurations across all accounts in your AWS Organization.

![The image outlines challenges in manually managing firewall rules for multiple accounts, highlighting issues such as being time-consuming, lack of centralized control, complexity and scalability, and compliance management.](https://kodekloud.com/kk-media/image/upload/v1752860574/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/firewall-management-challenges-outline.jpg)

AWS Firewall Manager streamlines the centralized management of firewall settings, distributing rule sets across your organization. It supports AWS WAF, security groups, network ACLs, and Shield Advanced, ensuring a consistent security policy is applied throughout your environment.

![The image is a diagram titled "Firewall Manager for Multiple Accounts," showing a structure for managing firewall settings across production and development environments within AWS Cloud. It includes icons representing different security features connected under each environment.](https://kodekloud.com/kk-media/image/upload/v1752860576/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/firewall-manager-multiple-accounts-diagram.jpg)

### Prerequisites for AWS Firewall Manager

To ensure smooth operation of Firewall Manager, the following prerequisites must be met:

1.  Join or create an AWS Organization and designate a management account specifically for Firewall Manager.
2.  Enable AWS Config in every region where you plan to operate the service, ensuring continuous tracking of configuration changes.
3.  Use the AWS Resource Access Manager (RAM) to share firewall resources among member accounts.
4.  Enable Firewall Manager in each active region.

![The image outlines four steps for setting up AWS Firewall Manager: joining AWS Organizations, creating a default administrator account, enabling AWS Config, and enabling resource sharing for network and DNS firewall policies.](https://kodekloud.com/kk-media/image/upload/v1752860576/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/aws-firewall-manager-setup-steps.jpg)

For example, after joining or creating an AWS Organization, assign a management account dedicated to Firewall Manager operations.

![The image is a step-by-step guide for joining and configuring AWS Organizations, showing a flow from AWS Organizations to AWS Firewall Manager, with actions like creating an organization, enabling features, and assigning a management account.](https://kodekloud.com/kk-media/image/upload/v1752860578/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/aws-organizations-configuration-guide.jpg)

Next, centralize firewall management by establishing a default administrator account and enabling AWS Config in all member accounts across the necessary regions. This ensures that any changes to your firewall policies are continuously tracked.

![The image is a diagram illustrating the creation of an AWS Firewall Manager Default Administrator Account, showing the relationship between AWS Organizations, AWS Firewall Manager, and account roles.](https://kodekloud.com/kk-media/image/upload/v1752860578/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/aws-firewall-manager-account-diagram.jpg)

Then, navigate to the AWS Config console and enable it for each required region.

![The image provides instructions for enabling AWS Config, including navigating to the AWS Config console and enabling it for each region where Firewall Manager will be used.](https://kodekloud.com/kk-media/image/upload/v1752860579/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/aws-config-instructions-firewall-manager.jpg)

Finally, use AWS Resource Access Manager (RAM) to share firewall rules and DNS filtering policies across all member accounts.

![The image illustrates Step 4 of enabling resource sharing for network firewall and DNS firewall policies using AWS Resource Access Manager, showing a flow between accounts and firewall resources.](https://kodekloud.com/kk-media/image/upload/v1752860582/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/aws-resource-sharing-firewall-step4.jpg)

After these configurations are complete, enable Firewall Manager in all regions where you plan to deploy firewall protections. This provides comprehensive coverage and centralized policy management for resources such as WAF, security groups, network ACLs, and Shield Advanced.

![The image provides instructions for using AWS Firewall Manager in regions that are disabled by default, including enabling AWS Config in those regions.](https://kodekloud.com/kk-media/image/upload/v1752860584/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Network-Firewall-Service-Overview/aws-firewall-manager-instructions-config.jpg)

Centralizing rule management with Firewall Manager not only simplifies administrative tasks and auditing but also integrates seamlessly with AWS Security Hub for a consolidated view of your security posture.

## Conclusion

AWS Network Firewall Service, when combined with AWS Firewall Manager, offers a powerful solution for both individual firewall deployment and centralized security management. This integrated approach mitigates the challenges of manual rule management, enhances scalability, and ensures compliance with your security policies.

Thank you for reading this guide on AWS Network Firewall Service and Firewall Manager. We hope this article has provided you with clear insights into service architecture and best practices for a secure AWS environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/e36ae633-8396-4b7a-b7a0-a09f5f87986b)**
>
> Watch video content
