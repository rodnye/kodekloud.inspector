# Design for Azure AD B2C - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Design-for-Azure-AD-B2C)

---

## Table of Contents

- Design for Azure AD B2C
  - Best Practices for Azure AD B2C
  - B2B vs. B2C: A Quick Comparison
  - Watch Video
    - Create User Flows
    - Choose Your Identity Providers
    - Customize User Experience
    - Additional Attributes and External Data Sources
    - Third-Party Verification
    - Interactions Between Users
    - Branding

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Design for Azure AD B2C

Azure AD B2C is a robust solution designed to manage customer identities effectively. Unlike Azure AD B2B—which is crafted for internal employees and business partners—Azure AD B2C focuses exclusively on customer accounts.

Imagine the difference: if you're an employee at Google or Microsoft, your work email might be yourname@google.com or yourname@microsoft.com. As a customer, however, your email could be yourname@gmail.com, yourname@outlook.com, or another similar address. This distinction highlights how B2B and B2C serve very different use cases.

Azure AD B2C operates using a dedicated tenant that houses only customer identities. In contrast, a standard Azure AD tenant (e.g., cloud.com) manages on-premises identities and facilitates collaboration with partners via invitation. When a customer signs up, their identity is directly created in the B2C tenant, enabling seamless integration with popular social identity providers such as Twitter, Facebook, Google, Apple, Amazon, and more.

When developers build an application, they can integrate these social identity options. For instance, if a user selects "Sign Up with Facebook," they are redirected to Facebook for credential verification. Once verified, the user is seamlessly incorporated into the Azure AD B2C tenant, ready to engage with your application.

## Best Practices for Azure AD B2C

### Create User Flows

User flows are essential for defining how users sign in and manage their profiles. During the sign-up process, you can specify which metadata to collect—such as date of birth, age, or gender. For example, when signing up with Google, users are presented with a consent form outlining the profile data (email, date of birth, etc.) that the application will access. This control over data collection ensures that all necessary metadata is captured during the consent process.

### Choose Your Identity Providers

Azure AD B2C supports a broad range of identity providers, including Amazon, Facebook, Google, and Microsoft. When architecting your application, select the identity providers that best serve your audience's needs.

![The image is an infographic from KodeKloud outlining best practices for Azure AD B2C, including creating user flows, choosing identity providers, customizing user experience, adding attributes, and third-party verification.](https://kodekloud.com/kk-media/image/upload/v1752867198/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-AD-B2C/azure-ad-b2c-best-practices-infographic.jpg)

### Customize User Experience

Developers have the flexibility to create custom HTML and CSS templates, allowing you to craft a unique branding experience for your application. Whether you use the built-in templates or develop your own, you can tailor the sign-in and registration pages to reflect your organization’s identity.

### Additional Attributes and External Data Sources

Azure AD B2C permits the addition of up to 100 custom attributes to a customer profile. These attributes make it possible to integrate external systems—such as a CRM—to enhance customer information. For example, you might add a subscription plan attribute (premium, standard, etc.) to enrich the profile data beyond what is provided by social identity providers like Facebook or Amazon.

### Third-Party Verification

For heightened security and data validation, Azure AD B2C can be configured to forward user data to a third-party system for verification. This approach is especially useful when you need to validate usernames or other details through external identity providers or validation services.

## B2B vs. B2C: A Quick Comparison

The following comparison highlights the key differences between Azure AD B2B and Azure AD B2C:

| Feature                | Azure AD B2B                                              | Azure AD B2C                                       |
| ---------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| User Base              | Internal employees and external partners                  | Only customer identities                           |
| Management             | Uses invitations, access reviews, and role-based controls | Managed exclusively within the B2C tenant          |
| Directory Structure    | Employees and guest users share the same directory        | Customer accounts are isolated to ensure privacy   |
| Social Sign-In Support | Limited or not applicable                                 | Enables seamless sign-ins through social providers |

![The image is a comparison between B2B and B2C models in Azure AD, highlighting differences in user management, interaction, and customization. It includes bullet points detailing specific features of each model.](https://kodekloud.com/kk-media/image/upload/v1752867199/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-AD-B2C/b2b-b2c-azure-ad-comparison.jpg)

### Interactions Between Users

In a B2B environment, guest users—such as partners and vendors—share the same directory as employees, enabling interaction within the organization’s network. In contrast, the B2C model ensures that customers remain isolated from direct interaction with employees. For example, when customers sign up using an identity like Microsoft, they gain access to support services without the ability to browse or contact other customers.

### Branding

Both Azure AD and Azure AD B2C support branding options. With Azure AD, you can upload a background image or a sign-in banner. However, Azure AD B2C offers complete control over the user interface, allowing you to choose between built-in templates or develop a custom HTML and CSS design that perfectly aligns with your brand identity.

> [!important]
> **Note**
>
> When implementing Azure AD B2C, it is crucial to consider the unique requirements of your customer base to ensure a seamless and secure user experience.

With this comprehensive understanding of Azure AD B2C and its best practices, you can now explore how Conditional Access further enhances security for your applications. For more detailed information on implementing security measures, be sure to review additional Azure documentation and resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/30ba32c1-bcac-46ac-85d3-9181d89f49df)**
>
> Watch video content
