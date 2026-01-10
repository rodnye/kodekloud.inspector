# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Section Introduction

In this lesson, we begin by discussing the key design requirements for authentication and authorization in modern applications. Our discussion will cover essential components such as Azure AD, Azure AD B2B, Azure AD B2C, and Conditional Access. We will also explore identity governance, access reviews, managed identities, and their application in securing access to KeyVault.

Given that the [AZ-305: Microsoft Azure Solutions Architect Expert](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert) exam emphasizes solution design, this lesson is structured around a real-world customer scenario.

> [!important]
> **Customer Scenario Overview**
>
> Vendata Corp plans to leverage Azure AD for their identity and access management needs. Their solution requirements are as follows:
>
> - Collaborate with external partners without managing individual usernames and passwords.
> - Allow application users to access their e-commerce website using Apple, Google, and Microsoft email accounts.
> - Restrict access to corporate applications to the specific IP range 52.11.11.0/27.
> - Enforce multi-factor authentication for users accessing corporate applications from external networks.
> - Mitigate risks associated with leaked passwords and compromised accounts.
> - Provide administrators with a weekly report of role assignments to verify and review access rights.
> - Manage several HTTPS applications requiring secure storage of SSL certificates.
> - Securely store credentials for multiple application users who rely on an SQL backend, thus eliminating the need to hardcode encrypted credentials.

![The image is a scenario description from KodeKloud for Vendetta Corp, detailing requirements for using Azure AD as their identity and access management solution, including collaboration, app access, network restrictions, and security measures.](https://kodekloud.com/kk-media/image/upload/v1752867243/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Section-Introduction/azure-ad-vendetta-corp-scenario.jpg)

With these requirements clearly defined, we now proceed to the first section of this module, which focuses on identity and access management. Explore how to architect a secure and scalable solution that meets modern enterprise needs while maintaining compliance with industry standards.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/f5063197-aec3-488d-8b09-06308f48bd9d)**
>
> Watch video content
