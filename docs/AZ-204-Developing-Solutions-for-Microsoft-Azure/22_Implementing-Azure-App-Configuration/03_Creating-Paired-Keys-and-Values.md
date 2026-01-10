# Creating Paired Keys and Values - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-App-Configuration/Creating-Paired-Keys-and-Values)

---

## Table of Contents

- Creating Paired Keys and Values
  - Key Naming and Structure
  - Value Assignment and Encryption
  - Deploying Azure App Configuration via the Azure Portal
  - Configuring Key-Value Pairs
  - Next Steps: Feature Flags and Integration
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure App Configuration

# Creating Paired Keys and Values

In this guide, you will learn how to create paired keys and values using Azure App Configuration—a service that simplifies managing and organizing configuration data by efficiently pairing keys with their respective values.

## Key Naming and Structure

Azure App Configuration allows you to structure keys using one of two approaches:

- **Flat Namespace:** A simple approach with minimal structure.
- **Hierarchical Namespace:** Offers an organized method, grouping related keys together.

Each key can be optionally tagged with a label, which is useful for managing different environments or multiple versions (for example, production vs. development). Remember, Azure App Configuration does not automatically version key values; if versioning is required, you must implement it manually. Every key-value pair is uniquely identified by its key and label (if applicable), ensuring the precise configuration is always available.

![The image is an infographic about creating paired keys and values, detailing four aspects: design key namespaces, label key, version key values, and query key values. Each section includes a brief description and an icon.](https://kodekloud.com/kk-media/image/upload/v1752866568/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/paired-keys-infographic-design.jpg)

## Value Assignment and Encryption

Values in Azure App Configuration are stored as Unicode strings, which support a wide range of characters. You can also specify a content type for each value, ensuring the data is interpreted correctly by your application. All configuration data—both keys and values—is securely encrypted at rest and in transit, maintaining data integrity and confidentiality.

![The image is an infographic about creating paired keys and values, highlighting that values are Unicode strings, can have user-defined content types, and are encrypted in app configuration stores.](https://kodekloud.com/kk-media/image/upload/v1752866569/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/paired-keys-values-infographic.jpg)

## Deploying Azure App Configuration via the Azure Portal

Follow these steps to create an App Configuration resource using the Azure Portal:

1.  **Search and Create the Resource:**  
    In the Azure Portal, use the search bar to locate "App Configuration" and click "Create."
2.  **Create a New Resource Group:**  
    Create a new resource group (e.g., "RGAZ204AppConfig") and click "OK."
3.  **Specify a Unique Resource Name:**  
    Provide a unique name for your App Configuration instance. For instance, if "AZ204AppConfig" is unavailable, try an alternative such as "AZ204AppConfig019."

![The image shows a Microsoft Azure portal page for creating an app configuration, with fields for project and instance details such as subscription, resource group, location, and resource name.](https://kodekloud.com/kk-media/image/upload/v1752866570/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/azure-portal-app-configuration.jpg)

4.  **Review Pricing Tiers:**  
    Azure offers multiple pricing tiers. For a demo, the Free tier typically suffices. To review details, click the pricing link.

![The image shows a webpage from Azure's pricing configuration section, detailing pricing options and features for different subscription tiers: Free, Standard, and Premium. It includes a dropdown for selecting region and currency, and a table comparing features and quotas for each tier.](https://kodekloud.com/kk-media/image/upload/v1752866572/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/azure-pricing-configuration-webpage.jpg)

5.  **Configure Access Settings:**  
    Go to "Access Settings," where keys should be enabled by default. Set the authentication mode to local.

    > [!important]
    > **Tip**
    >
    > In production, enable purge protection and soft delete for enhanced security, even though the Free tier does not support purge protection.

![The image shows a settings page for configuring authentication in Azure, with options for enabling access keys and selecting an authentication mode for Azure Resource Manager.](https://kodekloud.com/kk-media/image/upload/v1752866574/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/azure-authentication-settings-page.jpg)

6.  **Configure Networking:**  
    For demonstration purposes, select automatic networking with public access. In production environments, configuring private access is recommended for better security.

![The image shows a networking configuration screen for an app, with options for public and private access settings, including Azure Resource Manager Private Network Access.](https://kodekloud.com/kk-media/image/upload/v1752866574/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/networking-configuration-app-settings.jpg)

7.  **Encryption Settings:**  
    For production scenarios, consider using customer-managed keys stored in Azure Key Vault. Note that the Free tier does not support this option, but you can integrate it later for increased control over encryption.
8.  **Create the Resource:**  
    After reviewing your settings, click "Create" to deploy your App Configuration resource.

![The image shows a Microsoft Azure portal page for creating an app configuration, displaying various settings such as subscription, resource group, location, and access settings. The validation has passed, and there are options to create or go back.](https://kodekloud.com/kk-media/image/upload/v1752866575/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/azure-portal-app-configuration-settings.jpg)

## Configuring Key-Value Pairs

With your resource deployed, follow these steps to set up configuration data:

1.  Click on "Go to Resource" and expand the configuration settings to access the Configuration Explorer.
2.  Create a new configuration by defining a key (e.g., "DB") and assigning a corresponding value (e.g., "Azure Cosmos DB").
3.  Optionally, add a label and specify a content type (for example, "text").
4.  Click "Apply" to store the key-value pair for future application use.

![The image shows the Microsoft Azure portal with the Configuration Explorer open, displaying a key-value pair for a database configuration. The key is "Db" with the value "ProdDb," labeled "Dev," and last modified on 9/21/2024.](https://kodekloud.com/kk-media/image/upload/v1752866577/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Paired-Keys-and-Values/azure-portal-configuration-explorer-db-prod.jpg)

## Next Steps: Feature Flags and Integration

After configuring your key-value pairs, you can further explore advanced features such as feature flags and enhanced app configuration security. In the upcoming lessons, we will demonstrate how to integrate Azure App Configuration with your codebase for dynamic configuration management.

> [!important]
> **Further Learning**
>
> For additional insights and best practices, be sure to explore the official [Azure documentation](https://docs.microsoft.com/azure/azure-app-configuration/) and related guides.

This concludes our step-by-step guide on creating paired keys and values in Azure App Configuration. Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/705e9ab6-55cd-4824-8c7a-79570dc8e52f/lesson/728debd6-30d3-4a66-ace8-c097c79b18ca)**
>
> Watch video content
