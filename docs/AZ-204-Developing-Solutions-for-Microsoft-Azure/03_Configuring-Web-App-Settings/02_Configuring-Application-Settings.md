# Configuring Application Settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Configuring-Web-App-Settings/Configuring-Application-Settings)

---

## Table of Contents

- Configuring Application Settings
  - Adding New Application Settings
  - Configuring Connection Strings
  - Navigating the Azure Portal
  - Setting Up Connection Strings
  - Accessing Environment Variables from Your Application
  - Next Steps
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Configuring Web App Settings

# Configuring Application Settings

In this article, you will learn how to configure application settings and connection strings for your web app or App Service using the Azure portal. This guide explains the changes brought by recent updates and illustrates how to efficiently manage environment variables and connection details.

Historically, application settings were managed under the Configuration blade. However, these settings have now moved to a dedicated blade called Environment Variables. If you reference older documentation, you may still encounter instructions related to Application Settings under Configuration. The new Environment Variables blade organizes these settings in a more intuitive manner.

## Adding New Application Settings

To add a new application setting, simply click the "Add" button on the Environment Variables screen. For example, if your application requires a specific API key for accessing a third-party service, you can securely store that API key as an application setting. This approach prevents hard coding sensitive information directly into your application code.

If you need to add or modify multiple settings simultaneously, select the **Advanced Edit** option. This feature is particularly useful when migrating configurations from one environment to another, such as transitioning from staging to production.

> [!important]
> **Tip**
>
> Using the Advanced Edit option, you can manage your settings in JSON format. This enables you to copy, paste, and make bulk edits efficiently.

## Configuring Connection Strings

In addition to application settings, you can also configure connection strings. These strings are essential for connecting your app to external resources, including databases. For instance, if your app uses an Azure SQL Database, add the corresponding connection string here. One significant advantage of managing connection strings in this way is that they can be linked to specific deployment slots—ensuring that your app connects to the appropriate database based on its environment (e.g., production versus staging).

By properly configuring both application settings and connection strings, you enhance your application's security, maintainability, and adaptability without modifying the underlying code.

## Navigating the Azure Portal

To review your configuration settings, open the Azure portal and navigate to your App Service. From here, click on the Environment Variables blade. On this screen, you might see various environment variables, including one labeled "Microsoft Graph provider authentication secret." This secret, established during an earlier app registration process, can be revealed by clicking the eye icon.

![The image shows a screen displaying environment variables in an app settings interface, with options to show values for specific variables like "MICROSOFT_PROVIDER_AUTHENTICATION_SECRET" and "WEBSITE_AUTH_AAD_ALLOWED_TENANTS."](https://kodekloud.com/kk-media/image/upload/v1752866176/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Application-Settings/app-settings-environment-variables.jpg)

Additionally, by clicking the gear icon next to the allowed tenants entry, you can view a GUID representing your tenant's directory ID. This GUID confirms that the web app is correctly configured for your environment.

## Setting Up Connection Strings

Scroll down to the Connection Strings section. Here, add a new connection string by providing a name, a value (for instance, a random string to simulate a connection string), and selecting the appropriate type, such as SQL Server. Failure to provide the mandatory "Type" property will trigger an error message prompting you to complete the field.

![The image shows a Microsoft Azure portal interface where a user is adding or editing a connection string for a web app, with fields for name, value, and type. An error message indicates that the "Type" is a required property for all connection strings.](https://kodekloud.com/kk-media/image/upload/v1752866177/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Application-Settings/azure-portal-connection-string-error.jpg)

After entering the required details, click "Apply" to save your connection string.

Returning to the Environment Variables screen, you will see all the configured application settings. For bulk operations, instead of clicking the "Add" button repeatedly, use the Advanced Edit option. This will present your settings in JSON format, allowing you to modify multiple entries—such as renaming keys from ENV_1 to ENV_one and ENV_2 to ENV_two. Once you've made your changes, click "OK" and then "Apply" to save all modifications.

![The image shows the Microsoft Azure portal displaying environment variables for a web app named "az204demoapp01." It lists variables like ENV_1, ENV_2, and others, with options to show their values.](https://kodekloud.com/kk-media/image/upload/v1752866178/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Application-Settings/azure-portal-env-variables-az204demoapp01.jpg)

## Accessing Environment Variables from Your Application

With these configurations in place, your application can access the environment variables using the appropriate SDKs. This method securely manages your configuration values and ensures they are easily available to your app at runtime.

> [!important]
> **Security Reminder**
>
> Always store sensitive configuration data such as API keys and passwords using environment variables or connection strings instead of hard coding them into your codebase.

## Next Steps

In the next section, we will explore how to configure the general settings for an App Service. By following these best practices, you can streamline the setup process and improve your application's overall deployment strategy.

For further reading, check out the following resources:

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Azure Environment Variables Best Practices](https://docs.microsoft.com/azure/app-service/configure-common)

This comprehensive guide ensures that you can set up and manage your application settings effectively within the Azure portal. Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/874e2f85-3b70-421e-94c6-722d572e440f/lesson/22f2b848-1f6d-4d54-a5c6-c7f8058f1824)**
>
> Watch video content
