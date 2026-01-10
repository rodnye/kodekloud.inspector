# Authentication and Authorization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Identity-Access-and-Security/Authentication-and-Authorization)

---

## Table of Contents

- Authentication and Authorization
  - Azure's Approach to Authentication and Authorization
  - Benefits of Azure's Integrated Approach
  - Practical Applications
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Identity Access and Security

# Authentication and Authorization

In this lesson, we explore two core security concepts in cloud environments: authentication and authorization.

Imagine arriving at a high-security building.

> [!important]
> **Understanding Authentication**
>
> Authentication is like a security guard checking your ID. Methods such as passwords, tokens, and biometrics confirm that you are who you claim to be.

Once your identity is verified, authorization determines what you can access—much like the security guard granting you permission to specific floors based on your clearance level. This involves setting up user roles, access controls, and permissions.

In summary:

- Authentication verifies your identity.
- Authorization defines the actions you are allowed to perform.

![The image compares authentication and authorization, highlighting that authentication confirms identity using methods like passwords, while authorization determines access and permissions.](https://kodekloud.com/kk-media/image/upload/v1752868396/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Authentication-and-Authorization/auth-vs-authorization-comparison.jpg)

## Azure's Approach to Authentication and Authorization

Azure leverages Microsoft Entra ID as its primary identity service to provide robust authentication mechanisms. By integrating role-based access control (RBAC), Azure ensures that users receive the appropriate level of access based on detailed policies and rules.

![The image outlines Azure's approach to authentication and authorization, highlighting the use of Microsoft Entra ID for authentication and RBAC, policies, and rules for authorization.](https://kodekloud.com/kk-media/image/upload/v1752868398/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Authentication-and-Authorization/azure-authentication-authorization-diagram.jpg)

Microsoft Entra ID acts as an authentication broker while RBAC meticulously manages authorization, a topic we will explore further later in this course.

## Benefits of Azure's Integrated Approach

Azure’s integrated authentication and authorization framework offers several noteworthy benefits:

1.  **Enhanced Security:**  
    Only legitimate users gain access, significantly reducing the risk of unauthorized usage.
2.  **Fine-Grained Access Control:**  
    Administrators can precisely manage user actions and resource accessibility, aligning with specific operational requirements.
3.  **Compliance and Governance:**  
    Azure meets strict security standards and regulatory requirements, ensuring your organization remains compliant.

![The image outlines the benefits of authentication and authorization, highlighting enhanced security, fine-grained access control, and compliance and governance.](https://kodekloud.com/kk-media/image/upload/v1752868399/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Authentication-and-Authorization/authentication-authorization-benefits-diagram.jpg)

## Practical Applications

In practical terms, authentication is essential when users log into Azure services and applications, ensuring that only verified identities can access these systems. On the other hand, authorization is critical for managing access to various Azure resources such as Virtual Machines, databases, and applications, keeping your environment secure and compliant.

![The image shows two use cases for authentication and authorization: "User login authentication" and "Access control for Azure resources for authorization."](https://kodekloud.com/kk-media/image/upload/v1752868400/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Authentication-and-Authorization/authentication-authorization-use-cases.jpg)

> [!important]
> **Quick Tip**
>
> Understanding these security concepts is fundamental to designing a secure Azure environment. Employ both robust authentication methods and granular authorization techniques to safeguard your data and optimize resource management.

Now that you have a solid foundation in authentication and authorization, let’s move forward to discuss Multi-Factor Authentication and how it further enhances security in Azure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/89fa8b43-65f9-450e-9f65-ebd0bcd5ca8b/lesson/c1a535fd-043f-4b56-944b-de44f97c0f5b)**
>
> Watch video content
