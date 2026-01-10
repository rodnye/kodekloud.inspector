# Authentication and Authorization in Azure App Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-App-Service/Authentication-and-Authorization-in-Azure-App-Service)

---

## Table of Contents

- Authentication and Authorization in Azure App Service
  - Identity Providers Supported by Azure App Service
  - Configuring Authentication in the Azure Portal
  - Setting Up App Registration
  - Testing the Authentication Flow
  - Next Steps: Exploring Networking in Azure App Service
  - References and Further Reading
  - Watch Video
    - Adding an Identity Provider

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure App Service

# Authentication and Authorization in Azure App Service

Authentication and authorization are fundamental to any secure web application. Azure App Service simplifies the process by offering built-in support for these features, allowing you to secure your application without extensive custom coding. By enabling authentication and authorization, you ensure that only authorized users can access your resources while keeping your application secure.

In this article, we explore how Azure App Service integrates authentication and review the various identity provider options available to meet your security requirements.

## Identity Providers Supported by Azure App Service

Azure App Service supports a broad range of identity providers. Primarily, it integrates with the Microsoft Identity Platform, which allows you to leverage Azure Active Directory (now Microsoft Entra ID) for enterprise-grade authentication and access management. Additionally, you can enable sign-ins using popular services such as Facebook, Google, X (formerly Twitter), and Apple ID. For maximum flexibility, Azure App Service also supports the OpenID Connect protocol—allowing integration with any provider adhering to this open standard.

> [!important]
> **Note**
>
> Selecting the right identity provider depends on your user base. For internal users, Microsoft Entra ID is ideal, while external users might benefit from integrating social login providers.

## Configuring Authentication in the Azure Portal

In this section, we will configure authentication using the Microsoft Identity Platform for an existing App Service through the Azure Portal.

1.  Navigate to your Azure App Service in the Azure Portal.
2.  From the left-hand menu, click **Authentication**.

![The image shows a Microsoft Azure portal interface displaying details of a web app named "az204demoapp01," including its properties, deployment settings, and configuration options.](https://kodekloud.com/kk-media/image/upload/v1752866370/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-App-Service/azure-portal-web-app-details.jpg)

By default, anonymous access is enabled. This means that accessing your web application does not require credentials until you configure authentication.

### Adding an Identity Provider

To set up authentication through a trusted provider:

1.  Click on **Add Identity Provider**.
2.  Choose **Microsoft** as the provider to manage employee and internal user access using your Microsoft Entra ID. (Note: For external users, configuring a B2C tenant is required, which is beyond the scope of this guide.)

This setup enables Microsoft authentication, allowing employees to securely sign in and access the application.

![The image shows a form for adding an identity provider, specifically for Microsoft, with options for tenant configuration, app registration, and supported account types. It includes selections for workforce or external configuration and additional checks for client application requirements.](https://kodekloud.com/kk-media/image/upload/v1752866372/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-App-Service/microsoft-identity-provider-form.jpg)

## Setting Up App Registration

After adding the identity provider, the next step is to create an app registration within your Microsoft Entra ID (formerly Azure Active Directory). The app registration handles essential delegated permissions (e.g., User.Read).

When a user signs in, the app registration captures their credentials and uses the delegated permissions to validate access. During the setup:

- Create a new app registration for your tenant.
- Ensure access is restricted and authentication enforced.
- Note that the default permission, User.Read, is automatically assigned. This permission allows your app to read basic user profile details such as name, picture, and email address.

![The image shows a configuration screen for adding an identity provider, with options for client application, identity, and tenant requirements, as well as app service authentication settings. It includes radio buttons and dropdown menus for setting authentication and access restrictions.](https://kodekloud.com/kk-media/image/upload/v1752866373/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-App-Service/identity-provider-configuration-screen.jpg)

> [!important]
> **Warning**
>
> Ensure that additional permissions are only granted if absolutely necessary. Over-granting permissions may expose sensitive user data.

![The image shows a screen for adding an identity provider with Microsoft Graph permissions, specifically highlighting the "User.Read" permission for signing in and reading user profiles.](https://kodekloud.com/kk-media/image/upload/v1752866375/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-App-Service/microsoft-graph-identity-provider-permissions.jpg)

After verifying these settings, click **Add**. The Azure Portal will then update the authentication settings accordingly.

![The image shows the Microsoft Azure portal, specifically the authentication settings page for a web app named "az204demoapp01." It displays options for configuring identity providers and authentication settings.](https://kodekloud.com/kk-media/image/upload/v1752866382/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-App-Service/azure-portal-authentication-settings-az204demoapp01.jpg)

## Testing the Authentication Flow

To ensure that your authentication configuration works correctly:

1.  Return to your application's overview and copy the URL.
2.  Open an incognito or private browsing window and paste the URL.

A login page should now be displayed, prompting for user credentials. When you attempt to sign in:

- A message will indicate that the application intends to read your profile due to the default User.Read permission.
- After entering your credentials, you will be prompted to consent to allowing the application to access your basic profile information (name, picture, and email address). Accepting consent ensures this process is not repeated for future logins.

Once the consent is accepted, you will be redirected back to your website. The primary advantage of this configuration is that it eliminates the need for custom authentication code—Azure App Service handles everything seamlessly.

## Next Steps: Exploring Networking in Azure App Service

With authentication configured, the next step is to explore how networking is managed within Azure App Service. This integration allows you to further secure access and manage application traffic effectively, which will be discussed in the following section.

By leveraging the built-in capabilities of Azure App Service for authentication and networking, you can secure your applications with minimal custom code while ensuring smooth and secure user management.

## References and Further Reading

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
- [OpenID Connect Explained](https://openid.net/connect/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/94d21b81-de82-4d33-a347-4404baa9f869/lesson/5954ded5-b5d8-48e5-9e0c-96be72183634)**
>
> Watch video content
