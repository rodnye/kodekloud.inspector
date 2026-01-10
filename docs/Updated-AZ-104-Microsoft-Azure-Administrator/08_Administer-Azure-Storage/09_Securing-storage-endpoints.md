# Securing storage endpoints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Securing-storage-endpoints)

---

## Table of Contents

- Securing storage endpoints
  - Key Security Capabilities for Storage Accounts
  - In-Depth Topics Covered
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Securing storage endpoints

This article explains how to secure your storage account endpoints using robust networking rules. By following these guidelines, you can control and restrict access to your storage resources, ensuring secure and efficient communication.

When you access the Networking blade in your storage account, you will observe that public network access is enabled by default. However, you have several options to enhance security:

- Restrict public access by selecting specific virtual networks or IP addresses.
- Disable public network access completely.
- Integrate your existing virtual networks or create new ones for communication through service endpoints.
- Add designated IP ranges from your organization to the firewall for precise access control.

![The image is a screenshot of a networking settings interface for securing storage endpoints, highlighting options to control public access, restrict access to specific virtual networks, and allow IP ranges from the internet or on-premises.](https://kodekloud.com/kk-media/image/upload/v1752884391/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Securing-storage-endpoints/networking-settings-storage-endpoints.jpg)

> [!important]
> **Note**
>
> For organizations that prefer to eliminate all public communication, consider disabling public network access and configuring a private endpoint. This approach ensures a fully private connection to your storage accounts.

## Key Security Capabilities for Storage Accounts

Storage accounts are equipped with built-in security features that provide comprehensive protection:

- **Encryption:**  
  All data stored in your storage account is encrypted by default using Storage Service Encryption (SSE). No additional configuration is required, ensuring data remains secure at rest.
- **Authentication:**  
  Leveraging Azure Active Directory (Azure AD) and Role-Based Access Control (RBAC), you can authenticate requests and authorize access to your storage accounts with fine-grained control.
- **Data in Transit:**  
  Data is protected during transfer through HTTPS, client-side encryption, and protocols such as SMB 3.0. Additionally, Azure Disk Encryption secures the operating system and data disks in both Linux and Windows virtual machines.
- **Shared Access Signatures (SAS):**  
  SAS tokens provide granular control by defining which operations can be performed on your storage account, enhancing overall security and access management.

![The image illustrates "Storage Security Capabilities" with icons and labels for encryption, authentication, data in transit, disk encryption, and shared access signature.](https://kodekloud.com/kk-media/image/upload/v1752884392/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Securing-storage-endpoints/storage-security-capabilities-icons.jpg)

## In-Depth Topics Covered

This article will delve into the following areas to help you understand and implement these security features effectively:

- Storage Service Encryption (SSE)
- Azure Disk Encryption
- Configuring networking rules for secure access
- Integrating virtual networks and private endpoints

By the end of this guide, you will be well-equipped to secure the endpoints of your storage accounts, ensuring your data remains protected and accessible only to authorized networks and users.

For further details on securing your Azure resources, consider exploring the following helpful resources:

- [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/)
- [Networking in Azure](https://docs.microsoft.com/en-us/azure/virtual-network/)
- [Azure Security Best Practices](https://docs.microsoft.com/en-us/azure/security/fundamentals/)

Implement these best practices to strengthen the security posture of your Azure storage accounts and safeguard your critical data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/4468a3ee-4be1-427e-9774-0654b86bd6f5)**
>
> Watch video content
