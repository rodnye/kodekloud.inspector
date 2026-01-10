# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Network-Security/Introduction)

---

## Table of Contents

- Introduction
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Network Security

# Introduction

Welcome back! In this lesson, we continue our comprehensive exploration of network security as part of the broader defense-in-depth strategy. Previously, we discussed how Microsoft manages physical security in their data centers, while Azure AD handles identity and access management—including conditional access, identity management, and multi-factor authentication.

In an earlier lesson, we examined perimeter security through DDoS protection, Azure Firewall, and the hub-spoke network strategy. Now, we shift our focus specifically to network security.

The key topics covered in this lesson include:

- Network Security Groups (NSGs)
- Application Security Groups (ASGs)
- Enabling and configuring service endpoints
- Deploying private links
- Implementing Azure Application Gateway
- Deploying a Web Application Firewall (WAF)
- Configuring and managing Azure Front Door
- Reviewing ExpressRoute

> [!important]
> **Key Insight**
>
> Even if you have a firewall in place, using Network Security Groups (NSGs) provides an additional layer of micro-segmentation at the virtual network level, ensuring granular control over network traffic.

Below is a diagram that summarizes the essential network security tasks, including deploying NSGs, creating application security groups, and configuring various Azure network services.

![The image is a diagram listing various network security tasks, such as deploying network security groups, creating application security groups, and configuring Azure services. Each task is accompanied by a relevant icon.](https://kodekloud.com/kk-media/image/upload/v1752882149/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Introduction/network-security-tasks-diagram.jpg)

Let's begin by taking an in-depth look at Network Security Groups (NSGs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/0489a935-a4dd-41c6-b5d3-6054c570299b/lesson/a3bd9790-bcd0-44b3-8538-00ae0504a898)**
>
> Watch video content
