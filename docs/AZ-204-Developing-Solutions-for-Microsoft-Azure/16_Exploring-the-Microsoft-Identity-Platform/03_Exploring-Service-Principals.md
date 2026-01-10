# Exploring Service Principals - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-the-Microsoft-Identity-Platform/Exploring-Service-Principals)

---

## Table of Contents

- Exploring Service Principals
  - Application Registration: Single Tenant vs. Multi-Tenant
  - Application and Service Principal Objects
  - Creating a Service Principal in the Azure Portal
  - Next Steps: Permissions and Consent
  - Watch Video
    - Relationship Between Application Objects and Service Principals
    - Creating a New App Registration

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring the Microsoft Identity Platform

# Exploring Service Principals

In this lesson, we explore service principals in Azure and explain how they allow applications to securely access Azure resources. By understanding service principals, you can improve the security and management of your Azure applications.

A service principal acts as an identity for an application, enabling it to authenticate and access resources. When you register an application in Azure, several objects are created behind the scenes to facilitate secure access.

## Application Registration: Single Tenant vs. Multi-Tenant

When registering an app in the Azure Portal, you can choose the appropriate access model:

- **Single Tenant:** The app is limited to usage within your tenant. This option is ideal for enterprises serving internal users.
- **Multi-Tenant:** The app can be accessed by users from multiple tenants. This model is common in SaaS solutions where external organizations also utilize the app.
- Additionally, you might see options for personal accounts (e.g., Outlook or Xbox accounts), though these are less common for enterprise applications.

## Application and Service Principal Objects

Upon registering an application, Azure automatically creates two essential objects:

1.  **Application Object:** Represents the blueprint of your application, including its permissions and core behavior.
2.  **Service Principal Object:** Serves as the authentication identity, allowing the app to access the designated resources.

There are different types of service principals, including those for applications, managed identities, and legacy models. For instance, if an internal HR application needs access to Azure SQL, its service principal is used during the authentication process.

### Relationship Between Application Objects and Service Principals

- **One-to-One Relationship:** Each application object corresponds to a specific software application or service and acts as its blueprint.
- **One-to-Many Relationship:** While a single application object exists, multiple service principals can be linked to it when deployed across tenants. For example, a multi-tenant app used by several companies will have distinct service principals to ensure isolated access control.

![The image explains the process of registering an app in the Azure portal, detailing choices between single and multi-tenant, the creation of application and service principal objects, and their relationships.](https://kodekloud.com/kk-media/image/upload/v1752866549/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Service-Principals/azure-app-registration-process-diagram.jpg)

## Creating a Service Principal in the Azure Portal

To create a service principal, navigate through Microsoft Entra ID in the Azure Portal where a list of app registrations is available. Details such as application names, IDs, and status indicators (e.g., "Expired" and "Current") are displayed for each registered app.

![The image shows the Microsoft Azure portal displaying a list of app registrations under the "Kodekloud" directory, with details such as application names, IDs, and status indicators like "Expired" and "Current."](https://kodekloud.com/kk-media/image/upload/v1752866550/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Service-Principals/azure-portal-kodekloud-app-registrations.jpg)

It is recommended to use the Azure Portal if you are already familiar with it. Make sure you have at least an application developer role in Microsoft Entra ID to proceed with the registration process.

### Creating a New App Registration

Follow these steps to create a new app registration:

1.  Navigate to the "App Registrations" section in the Azure Portal.
2.  Click on "New Registration" to initiate a new application registration. For example, you might name the new app "AZ204 App".
3.  Select the appropriate supported account type—this demonstration uses the **Single Tenant** option. You will be prompted to fill in fields such as application name, supported account types, and an optional redirect URI.

![The image shows a Microsoft Azure portal page for registering an application, with fields for the application name, supported account types, and an optional redirect URI.](https://kodekloud.com/kk-media/image/upload/v1752866551/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Service-Principals/azure-portal-application-registration.jpg)

4.  Click "Register" to complete the registration process.

Once registered, the application details include essential information like authentication endpoints, permissions, and configuration settings. You can review the manifest and API permissions associated with the application directly within the portal.

![The image shows a Microsoft Azure portal interface for an app registration named "az204-app," displaying options for managing authentication, certificates, and API permissions. It includes details like application ID, object ID, and directory ID, along with a section on building applications with the Microsoft identity platform.](https://kodekloud.com/kk-media/image/upload/v1752866552/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Service-Principals/azure-portal-app-registration-az204.jpg)

> [!important]
> **Note**
>
> After creating the app registration, make sure to review and configure all authentication and API permissions to ensure your application meets security best practices.

## Next Steps: Permissions and Consent

In the upcoming sections, we will explore in detail how to manage permissions and consent for the service principal. This will ensure that your application is properly configured and has the necessary access rights to function securely within Azure.

For additional reading on Azure security and app registrations, consider visiting [Azure Identity Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/) and [Microsoft Entra Documentation](https://learn.microsoft.com/en-us/azure/active-directory/entra-overview).

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1187412d-55be-474d-874c-8868fe5b335a/lesson/20894653-6493-428c-9b5d-47eeeff0ea66)**
>
> Watch video content
