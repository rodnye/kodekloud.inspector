# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-governance-solution/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - Governance Scenario: Vendita Corp
  - Testing Environment Setup
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a governance solution

# Section Introduction

Hello everyone, and welcome to this module on governance solutions. In this article, we will explore the concept of governance, which encompasses the rules, policies, and structures that organizations rely on to manage their operational environments. For example, a military organization might require data to be deployed and stored domestically, along with strictly defined policies, role-based access controls, metadata assignments, and hierarchical setups in Azure to address both isolation and billing requirements.

In this article, we will demonstrate how to implement effective governance solutions through a detailed scenario.

## Governance Scenario: Vendita Corp

Vendita Corp is setting out to enforce comprehensive organizational standards. The key objectives for Vendita Corp’s governance strategy include:

1.  Establishing an Azure hierarchy with two primary entities: Marketing and HR. Each entity will host production, disaster recovery (DR), and testing environments.
2.  Creating a separate Hub entity to manage shared services accessible by both Marketing and HR.
3.  Utilizing multiple subscriptions to clearly define ownership by department, along with mapping the subscription name to its respective environment.
4.  Ensuring that all resources are deployed exclusively in the East and West US regions.
5.  Restricting testing subscriptions to specific virtual machine families only—B-series, DSV3, and DSV4.
6.  Mandating audits of production resources to confirm that diagnostic settings are correctly configured.
7.  Empowering a dedicated IT Helpdesk group to create Microsoft support requests on behalf of any department.
8.  Allowing IT Admins to manage role assignments and deployments across all subscriptions.
9.  Enabling Marketing administrators to manage their subscriptions and HR administrators to manage theirs, with IT administrators handling any role assignment tasks.
10. Enforcing a tagging convention where all resource groups in Marketing subscriptions include a "department" tag (which is inherited by all underlying resources), and similarly, resource groups within HR must have a "department" tag set to HR.

![The image outlines organizational standards for Vendetta Corp, detailing requirements for resource deployment, VM usage, auditing, and role management across different departments. It specifies permissions for IT, Marketing, and HR groups, and includes guidelines for testing environments.](https://kodekloud.com/kk-media/image/upload/v1752866942/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Section-Introduction/vendetta-corp-organizational-standards.jpg)

> [!important]
> **Note**
>
> The scenario serves as a blueprint for understanding how to structure and enforce governance standards across various organizational entities. It emphasizes the importance of clear hierarchies, controlled access, and targeted resource deployment strategies.

## Testing Environment Setup

Additionally, Vendita Corp’s testing environment must be defined using a rapid deployment template. This template will quickly set up two resource groups (for example, Resource Group A and Resource Group B) with core configurations that include:

- Role assignments
- Policy assignments
- Appropriately distributed Azure resources across the resource groups

Due to the testing environment’s weekly rebuild and decommission cycle, manually recreating these resources is impractical. As a result, leveraging Azure automation and tracking features is essential to streamline the deployment process.

With this context in mind, let’s move on to our first lesson: understanding the hierarchy in Azure governance solutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/4e67e086-384c-4b65-a1e4-fe8c434076c4/lesson/a3100fe5-3004-444b-995f-5a6f55b05f95)**
>
> Watch video content
