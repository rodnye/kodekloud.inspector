# Configuring scope of PIM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Azure-AD-Privileged-Identity-Management/Configuring-scope-of-PIM)

---

## Table of Contents

- Configuring scope of PIM
  - Azure AD Roles
  - Azure Resources
  - Comparison to Linux's Sudo
  - An Introduction to PIM for Groups
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Azure AD Privileged Identity Management

# Configuring scope of PIM

This lesson demonstrates how to configure the scope of Privileged Identity Management (PIM) to enhance your organization's security posture. In PIM, "scope" refers to the set of entities that you can onboard, and there are two primary scopes:

1.  Azure AD roles
2.  Azure resources

A third scope, PIM for groups, is a new feature not covered in this exam. Future exam versions may require studying PIM for groups. For now, this lesson focuses on Azure AD roles and Azure resources.

---

## Azure AD Roles

In the PIM framework, users do not hold permanent elevated access. Instead, when elevated privileges are necessary, users must request to temporarily elevate their roles. For instance, a user with a standard role can request Global Administrator access, but such a request is subject to review and approval. It is particularly crucial to monitor roles that grant extensive permissions, such as:

- Global Administrator
- Security Administrator
- Privileged Role Administrator
- Other roles that have significant control over your environment

---

## Azure Resources

When managing Azure resources, it is essential to identify critical management groups and subscriptions. A subscription housing your production environment should be considered critical and afforded restricted access. Similarly, resources crucial to your operations—such as production databases or virtual machines running vital applications—warrant special governance by PIM.

Access to these sensitive resources is managed through just-in-time activation combined with multi-factor authentication. This methodology provides granular, time-bound access control, significantly reducing potential security risks.

> [!important]
> **Key Insight**
>
> Remember, securing your production subscriptions and critical resources is paramount to maintaining a robust security posture.

Below is a diagram illustrating the scope of PIM for Azure resources, highlighting key groups, subscriptions, and essential resources:

![The image is about the scope of PIM (Privileged Identity Management) and highlights key groups, subscriptions, and essential resources related to Azure Resources. It asks which Azure AD roles and resources should be protected with PIM.](https://kodekloud.com/kk-media/image/upload/v1752881656/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configuring-scope-of-PIM/pim-scope-azure-resources-diagram.jpg)

---

## Comparison to Linux's Sudo

An effective analogy is the way user permissions function on a Linux system. Typically, you operate as a standard user, but when you need to execute administrative commands, you invoke "sudo" to gain temporary elevated privileges. In a similar fashion, within Azure, you work as a regular user until an administrative task necessitates elevating your permissions through PIM.

---

## An Introduction to PIM for Groups

PIM for groups extends Azure AD PIM capabilities by managing risks associated with group membership, notably for groups with elevated permissions. For example, if a user requires membership in an Azure AD group with elevated privileges, they can request temporary elevated access via PIM. This time-bound access significantly minimizes the risks related to permanent elevated permissions.

When you explore the portal, you might encounter a demonstration of how PIM for groups is implemented. However, for the purposes of this exam, the emphasis remains on Azure AD roles and Azure resources.

---

With these concepts clarified, you are now ready to proceed with PIM onboarding.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/4c177d01-df52-459d-8089-073ff3170c4f/lesson/14124da9-f312-4856-a274-9d2297ff4a60)**
>
> Watch video content
