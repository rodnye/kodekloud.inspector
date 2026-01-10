# Securing App Configuration Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-App-Configuration/Securing-App-Configuration-Data)

---

## Table of Contents

- Securing App Configuration Data
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure App Configuration

# Securing App Configuration Data

In this guide, we explore best practices for securing your application configuration data in Azure. We'll address key dimensions such as encryption, networking, and identity management, starting with encrypting configuration data using customer-managed keys.

Customer-managed keys are available in the standard and premium tiers of Azure App Configuration. The standard tier offers robust integration with these keys, providing enhanced security and improved access control features.

> [!important]
> **Note**
>
> In our demonstration, we used the free tier; therefore, customer-managed key options were not visible.

To implement customer-managed encryption, you must store your keys in Azure Key Vault. When configuring Key Vault, it is critical to enable both soft delete and purge protection:

- **Soft Delete:** Allows recovery of keys if they are accidentally deleted.
- **Purge Protection:** Prevents keys from being permanently removed until a specified retention period has elapsed.

Next, generate an RSA or RSA-HSM key in Azure Key Vault. These cryptographic keys are essential for securely encrypting and decrypting your app configuration data. RSA-HSM keys offer enhanced security by being generated and stored in hardware security modules, ensuring additional tamper resistance.

![The image outlines steps for securing app configuration data using customer-managed keys, involving a standard-tier Azure App Configuration instance, an Azure Key Vault with specific features, and an RSA or RSA-HSM key.](https://kodekloud.com/kk-media/image/upload/v1752866596/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-App-Configuration-Data/secure-app-config-keys-diagram.jpg)

To enable Azure App Service configuration to use Key Vault keys, assign a Managed Identity to your App Configuration instance. Managed Identities allow for secure, credential-free access to the Key Vault. Once the managed identity is assigned, ensure that it has the necessary permissions to read the keys by configuring either the Key Vault access policy or Role-Based Access Control (RBAC).

![The image outlines steps for securing app configuration data using customer-managed keys, including assigning a managed identity to the Azure App Configuration instance and granting permissions in the Key Vault's access policy.](https://kodekloud.com/kk-media/image/upload/v1752866597/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-App-Configuration-Data/securing-app-configuration-keys.jpg)

From a networking perspective, restricting access to your configuration store is equally important. By default, the configuration store is publicly accessible—albeit requiring a connection string for use. To enhance security, configure the Azure App Configuration firewall to block all public connections. This measure ensures that only trusted networks have access, thereby reducing the risk of unauthorized entry.

For environments that require on-premises connectivity, consider establishing a secure connection to your Azure virtual network using a VPN or ExpressRoute. This approach guarantees secure data transfer without exposing sensitive configurations to the public internet.

![The image outlines three steps for securing app configuration data using private endpoints: configuring firewalls, enhancing virtual network security, and securely connecting from on-premises networks.](https://kodekloud.com/kk-media/image/upload/v1752866599/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-App-Configuration-Data/secure-app-config-private-endpoints.jpg)

This article outlined the critical steps in securing app configuration data in Azure App Configuration:

- Implementing customer-managed keys stored in Azure Key Vault with soft delete and purge protection.
- Assigning Managed Identities for secure Key Vault access.
- Enhancing network security through private endpoints and the appropriate configuration of firewalls.

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/705e9ab6-55cd-4824-8c7a-79570dc8e52f/lesson/ba5c778e-20ae-41b5-a8a6-101256240682)**
>
> Watch video content
