# Design for storage security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-nonrelational-data-storage-solution/Design-for-storage-security)

---

## Table of Contents

- Design for storage security
  - Limit Access to the Storage Account
  - Use SAS Instead of Sharing Account Keys
  - Enable Firewall Policies
  - Restrict Access Using Service Endpoints
  - Enable Private Endpoint for Hybrid Scenarios
  - Use Customer-Managed Keys (CMK)
  - Enable Secure Transfer
  - Conclusion
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a nonrelational data storage solution

# Design for storage security

This article outlines essential security best practices for designing Azure storage accounts to ensure your data remains secure and accessible only to authorized users.

## Limit Access to the Storage Account

Restrict access to your storage account to minimize exposure to the internet and unauthorized actors. Microsoft’s comprehensive [Azure Security Baselines for Storage](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) document details steps across network security, identity management, conditional access, credential controls, and privileged access. Below, we highlight key measures discussed in detail throughout this guide.

> [!important]
> **Note**
>
> For an in-depth understanding of these practices, refer to the official Azure documentation.

## Use SAS Instead of Sharing Account Keys

Account keys provide full control over your storage account, including deletion, updates, and resource management. For scenarios requiring limited, time-bound permissions—such as read-only access from specific IP addresses and protocols—use Shared Access Signatures (SAS). In the [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course, you will learn how to create SAS tokens, read SAS details, and configure the necessary permissions.

## Enable Firewall Policies

Azure Storage comes with an integrated firewall to restrict access to designated virtual networks and IP ranges. By default, access is permitted from all networks; however, you can tighten security by modifying settings to allow only selected virtual networks or specifying particular IP ranges.

![The image is a visual guide on storage security best practices in Azure, highlighting limited access, using SAS instead of sharing account keys, and enabling firewall policies. It features a step-like design with colored blocks and text annotations.](https://kodekloud.com/kk-media/image/upload/v1752867149/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-storage-security/azure-storage-security-best-practices.jpg)

## Restrict Access Using Service Endpoints

Service endpoints enable you to securely connect your virtual network to Azure Storage (and other PaaS services) via private IP addresses. Although the storage account’s name resolves to its public IP address, connections originate from your virtual network’s private IP. This design ensures that while DNS resolution is public, access remains confined to your trusted network.

## Enable Private Endpoint for Hybrid Scenarios

For hybrid environments where secure access from on-premises systems through ExpressRoute or VPN is necessary, enable a private endpoint. This configuration ensures that the storage account name resolves to a private IP, offering enhanced security for hybrid setups.

## Use Customer-Managed Keys (CMK)

Customer-managed keys (CMK) allow you to control the encryption keys that secure your data, an essential feature for organizations with strict compliance and key rotation requirements. To utilize CMK, navigate to the encryption settings in your storage account and select a key from one of your Azure Key Vaults.

![The image outlines best practices for storage security in Azure, including using SAS, enabling firewall policies, and restricting access with service endpoints. It features a flowchart design with various security tips.](https://kodekloud.com/kk-media/image/upload/v1752867150/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-storage-security/azure-storage-security-best-practices-2.jpg)

## Enable Secure Transfer

Enforcing secure transfers ensures that all connections to your storage account use HTTPS. Any attempts to connect via an insecure channel are automatically blocked. This critical security feature is enabled by default when a storage account is created.

![The image shows a Microsoft Azure portal interface focused on the encryption settings for a storage account named "eventanalyticsab46." It displays options for encryption selection, key selection, and identity type.](https://kodekloud.com/kk-media/image/upload/v1752867151/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-storage-security/azure-portal-encryption-settings-eventanalyticsab46.jpg)

## Conclusion

Implementing these security measures is vital for safeguarding your Azure storage account. For additional configurations and recommendations, review the [Azure Security Baselines for Storage](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) document provided by Microsoft.

> [!important]
> **Warning**
>
> Do not expose your storage account to the internet without proper restrictions, as this can lead to unauthorized access and potential data breaches.

Next, we will explore best practices for Cosmos DB and tables.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/7f522b0e-e9c6-4a0a-acfa-345ee6ebb885/lesson/fce189ab-b1f0-4a77-a29c-b5310453630f)**
>
> Watch video content
