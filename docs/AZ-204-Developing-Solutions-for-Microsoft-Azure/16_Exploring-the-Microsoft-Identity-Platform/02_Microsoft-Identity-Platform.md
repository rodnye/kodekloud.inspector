# Microsoft Identity Platform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-the-Microsoft-Identity-Platform/Microsoft-Identity-Platform)

---

## Table of Contents

- Microsoft Identity Platform
  - Key Components
  - App Registrations
  - Microsoft Authentication Library (MSAL)
  - Microsoft Entra Endpoints
  - Target User Accounts
  - Diagram of Microsoft Identity Platform
  - Summary
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring the Microsoft Identity Platform

# Microsoft Identity Platform

The Microsoft Identity Platform is a robust authentication and authorization solution that streamlines user access across a variety of applications. By integrating with Microsoft Identity Services, your applications can securely interact with numerous account types and resources.

## Key Components

Below, we outline the essential components of the Microsoft Identity Platform.

## App Registrations

When developing applications that interact with Microsoft Identity Services, you begin with app registrations. By registering your application with Microsoft Entra ID (formerly Azure Active Directory), you obtain a unique identity for your app. This registration process not only tracks the permissions your application requires but also facilitates a secure connection with Microsoft’s identity ecosystem.

## Microsoft Authentication Library (MSAL)

The Microsoft Authentication Library (MSAL) is a critical SDK that simplifies the authentication process. It abstracts the complexities of underlying protocols and provides straightforward functions to authenticate users and acquire tokens. These tokens grant your application access to protected resources such as Microsoft Graph and your custom APIs.

> [!important]
> **Tip**
>
> Consider leveraging MSAL in your applications to simplify authentication and enhance security without deep-diving into intricate protocol details.

## Microsoft Entra Endpoints

Microsoft Entra endpoints manage the authentication workflow and token issuance. Once a user is authenticated, these endpoints ensure that your application securely accesses the necessary APIs using the issued tokens.

## Target User Accounts

The Microsoft Identity Platform supports a broad range of user accounts including:

- **Work or School Accounts:** Provided through Microsoft Entra ID.
- **Personal Microsoft Accounts:** Examples include Xbox, Hotmail, or Outlook.
- **Social or Local Accounts (via Azure B2C):** Tailored for consumer-facing applications.
- **External Customer Accounts:** Managed through Microsoft Entra ID External to allow secure access for external identities.

## Diagram of Microsoft Identity Platform

The diagram below demonstrates the interaction between app registrations, client SDKs, the Microsoft Authentication Library (MSAL), and various Microsoft Entra endpoints for different account types:

![The image is a diagram of the Microsoft Identity Platform, illustrating the flow from app registrations and client SDKs through the Microsoft Authentication Library (MSAL) to various Microsoft Entra endpoints for different account types.](https://kodekloud.com/kk-media/image/upload/v1752866554/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Microsoft-Identity-Platform/microsoft-identity-platform-diagram.jpg)

## Summary

In summary, the Microsoft Identity Platform equips you with the necessary tools and components to authenticate users securely and manage access to protected resources. This seamless integration with Microsoft's identity services ensures that your application supports a diverse range of identity providers and offers a unified authentication experience.

> [!important]
> **Next Steps**
>
> Now that you have a clear understanding of the Microsoft Identity Platform, the next step is to explore app registrations (also known as service principals) in greater detail.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1187412d-55be-474d-874c-8868fe5b335a/lesson/d669a075-305b-4a1b-898f-1d6aee62dd8a)**
>
> Watch video content
