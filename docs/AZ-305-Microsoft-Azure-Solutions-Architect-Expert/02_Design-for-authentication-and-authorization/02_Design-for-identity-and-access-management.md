# Design for identity and access management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Design-for-identity-and-access-management)

---

## Table of Contents

- Design for identity and access management
  - Designing an IAM Solution
  - IAM Scenarios and Azure Solutions
  - Watch Video
    - Identity
    - Access

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Design for identity and access management

This article delves into creating robust Identity and Access Management (IAM) systems based on the Zero Trust model—an approach where every access request is rigorously verified, ensuring a secure and reliable environment.

The Zero Trust model adheres to the principle: never trust, always verify. This means that every time a user requests access to resources, regardless of device or location, the request undergoes a thorough verification process. Verification involves checking device details, user credentials, location, application context, and risk factors. The conditional access module then decides whether to grant or deny access based on these assessments.

The Zero Trust model is built on three core principles:

1.  Verify explicitly – Always confirm every request, no matter where it originates.
2.  Use the principle of least privilege – Assign only the permissions necessary for routine tasks. Overprivileging can lead to security vulnerabilities, while underprivileging may hinder productivity.
3.  Assume breach – Operate with the assumption that a breach could occur, ensuring every request is carefully scrutinized.

![The image illustrates the Zero Trust Model, emphasizing explicit verification, least privilege access, and breach assumption. It shows a flowchart of user access requests, conditions, actions, and Microsoft resources involved in the process.](https://kodekloud.com/kk-media/image/upload/v1752867226/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-identity-and-access-management/zero-trust-model-flowchart.jpg)

## Designing an IAM Solution

Building an effective IAM solution starts with the Zero Trust model. There are two key components to consider: Identity and Access.

> [!important]
> **Unified Identity Management**
>
> Implement centralized management for all users, groups, devices, and identities—whether they reside on-premises, in remote Active Directories, or in the cloud.

### Identity

- **Unified Identity Management:** Utilize a centralized system for managing users, groups, devices, and identities regardless of their location.
- **Seamless User Experience:** Ensure a smooth sign-in process and provide efficient password reset options, including self-service capabilities, to decrease reliance on IT support.

### Access

- **Secure Adaptive Access:** Establish dynamic policies that grant or restrict access based on pre-defined conditions and real-time context.
- **Simplified Identity Governance:** Streamline access procedures to maintain high security standards while ensuring that legitimate users can quickly access the resources they need.

![The image is a diagram illustrating the design for identity and access management, highlighting aspects like unified identity management, seamless user experience, secure adaptive access, and simplified identity governance.](https://kodekloud.com/kk-media/image/upload/v1752867228/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-identity-and-access-management/identity-access-management-diagram.jpg)

## IAM Scenarios and Azure Solutions

IAM plays a critical role in various scenarios. Below are several common use cases along with their corresponding Azure solutions:

1.  **Employee and On-Premises User Management:**  
    Manage internal users seamlessly regardless of their location with [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/). Azure AD centralizes identity management, while Azure Active Directory Connect synchronizes on-premises users with the cloud.
2.  **Collaborating with External Users or Guests:**  
    Enhance collaboration by enabling secure access for external partners, vendors, or guests through [Azure AD B2B](https://docs.microsoft.com/en-us/azure/active-directory/external-identities/what-is-b2b). This solution allows external users to access your systems securely without the need for separate credentials.
3.  **Customer-Facing Access Control:**  
    For customer-centric applications like e-commerce platforms, manage user access with [Azure AD B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/overview). This solution offers a secure and customizable way for customers to sign in and interact with your applications.

> [!important]
> **Choosing the Right Azure Solution**
>
> Selecting the appropriate Azure solution for your IAM needs ensures that identity management remains secure, streamlined, and tailored to your organization's specific requirements.

![The image is an infographic from KodeKloud about designing identity and access management solutions, outlining three scenarios using Azure AD, Azure AD B2B, and Azure AD B2C.](https://kodekloud.com/kk-media/image/upload/v1752867229/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-identity-and-access-management/identity-access-management-infographic.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/09a085c2-a55f-4f40-afac-d957d7e76499)**
>
> Watch video content
