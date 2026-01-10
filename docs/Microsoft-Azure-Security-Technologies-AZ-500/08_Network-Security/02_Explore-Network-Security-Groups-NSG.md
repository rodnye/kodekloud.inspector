# Explore Network Security Groups NSG - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Explore-Network-Security-Groups-NSG)

---

## Table of Contents

- Explore Network Security Groups NSG
  - Azure Firewall vs. Network Security Groups
  - Core Functionalities of Network Security Groups
  - Summary
  - Watch Video
    - Filter Traffic
    - Rule Set
    - Association
    - Evaluation

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Explore Network Security Groups NSG

In this guide, we dive into how Network Security Groups (NSGs) operate within Azure to complement other security services and enforce a secure network environment. By understanding the roles of both NSGs and Azure Firewall, you can design a robust security strategy for your cloud infrastructure.

## Azure Firewall vs. Network Security Groups

Azure offers two primary security services: Azure Firewall and NSGs. Choosing the right service for your scenario is crucial.

- **Azure Firewall:**  
  A managed service that filters inbound and outbound network traffic across large, complex networks. It supports both network and application-level filtering (with premium SKU for intrusion prevention) and is ideal in scenarios requiring centralized traffic management, such as in Hub-Spoke or landing zone architectures.
- **Network Security Groups (NSGs):**  
  NSGs operate at the virtual machine or subnet level, controlling access to resources like NICs, subnets, and VM instances. Using layer four filtering, NSGs inspect IP protocols, port numbers, and source/destination addresses. While unable to perform the detailed layer seven filtering of Azure Firewall, they provide effective control for more granular security management.

> [!important]
> **Layered Security Approach**
>
> For comprehensive security, consider deploying a centralized Azure Firewall for high-level filtering alongside NSGs for granular control at the NIC or subnet level.

## Core Functionalities of Network Security Groups

NSGs offer several key functionalities within Azure:

### Filter Traffic

NSGs work at layer four of the OSI model to filter both inbound and outbound traffic within a virtual network. Rules are defined based on source and destination IP addresses and ports, ensuring that all network communications comply with your security policies.

### Rule Set

Traffic filtering in NSGs is governed by a set of prioritized rules. Each rule's priority determines the order in which it is evaluated—rules with lower numbers are assessed before those with higher numbers. For instance, a rule numbered 100 will precede one numbered 400.

> [!important]
> **Rule Priority Reminder**
>
> Remember that the lower the number, the higher the priority.

### Association

NSGs can be associated with both subnets and individual network interfaces (NICs), allowing you to apply a uniform set of policies across multiple resources. This flexibility simplifies the management of network security across your Azure environment.

### Evaluation

NSG rules are evaluated independently at the subnet and NIC levels. For traffic to flow, an allow rule must be present at both levels. This dual evaluation process provides an added layer of verification, ensuring only trusted traffic is permitted.

![The image is an infographic about Network Security Groups (NSG), featuring a central shield icon surrounded by four elements: Filter Traffic, Rule Set, Evaluation, and Association.](https://kodekloud.com/kk-media/image/upload/v1752882126/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Explore-Network-Security-Groups-NSG/network-security-groups-infographic.jpg)

This diagram illustrates the two-tier evaluation process where traffic filtering is applied at both the subnet and network interface levels, ensuring a robust security posture by allowing only authorized traffic to access your Azure resources.

## Summary

Azure Firewall and NSGs serve distinct but complementary roles in securing your network. Azure Firewall is best suited for complex, large-scale environments requiring centralized management, while NSGs offer effective control at the individual resource level. Implementing both solutions together creates a layered defense strategy, enhancing the security across your overall network infrastructure.

For further details and advanced configurations, explore additional [Azure Security Documentation](https://docs.microsoft.com/azure/security/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/e8e64cdf-3ebf-4ac3-90e9-254616b615bd)**
>
> Watch video content
