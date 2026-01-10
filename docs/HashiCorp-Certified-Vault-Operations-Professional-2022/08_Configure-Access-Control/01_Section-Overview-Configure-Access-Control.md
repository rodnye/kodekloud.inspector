# Section Overview Configure Access Control - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Access-Control/Section-Overview-Configure-Access-Control)

---

## Table of Contents

- Section Overview Configure Access Control
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Access Control

# Section Overview Configure Access Control

In this lesson, you’ll learn how to secure your Vault deployment by defining who can do what—and where. We’ll cover five fundamental topics to establish a robust access-control strategy:

| Topic                              | Description                                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Vault Identity Entities and Groups | Structure user identities, group memberships, and attribute mappings for consistent access management.     |
| ACL Policies                       | Author, deploy, and debug fine-grained policies using Vault’s HCL-based policy language.                   |
| Sentinel Policies                  | (Enterprise) Enforce or advise on customizable governance rules across your Vault infrastructure.          |
| Control Groups                     | (Enterprise) Require multi-approval workflows for sensitive operations by defining and configuring groups. |
| Namespaces                         | (Enterprise) Implement multi-tenancy with isolated “Vaults within a Vault” for delegation and isolation.   |

> [!important]
> **Note**
>
> Identity entities, groups, and ACL policies are available in both Vault Open Source and Enterprise editions.
> Sentinel policies, control groups, and namespaces require Vault Enterprise.

With this roadmap in place, let’s dive into our first topic: interpreting Vault identity entities and groups.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/968cf007-376b-48c8-83f9-17521b5dd575/lesson/3a41c487-459d-4bed-9293-912ed4bde51e)**
>
> Watch video content
