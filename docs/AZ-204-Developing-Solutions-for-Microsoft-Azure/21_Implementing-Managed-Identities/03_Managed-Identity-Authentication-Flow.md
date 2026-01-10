# Managed Identity Authentication Flow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Managed-Identities/Managed-Identity-Authentication-Flow)

---

## Table of Contents

- Managed Identity Authentication Flow
  - How It Works
  - Configuring Managed Identity
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Managed Identities

# Managed Identity Authentication Flow

In this article, we explore how a system-assigned managed identity functions with an Azure Virtual Machine. While the process is nearly identical for a user-assigned managed identity, note that user-assigned identities are standalone resources that must be created before use.

> [!important]
> **Note**
>
> User-assigned managed identities are created independently and can be associated with multiple resources.

## How It Works

The managed identity authentication flow involves several key steps:

1.  **Enable Managed Identity**  
    Azure Resource Manager (ARM) receives a request to enable a system-assigned managed identity on a virtual machine (or any resource that supports managed identities).
2.  **Service Principal Creation**  
    Once enabled, a service principal is automatically generated in Microsoft Entra ID (formerly Azure Active Directory) for the virtual machine’s identity.
3.  **VM Configuration Update**  
    ARM configures the virtual machine by updating the Azure Instance Metadata Service with the newly created service principal's client ID and certificate.
4.  **Resource Access Provisioning**  
    With the virtual machine now equipped with an identity, the service principal can be used to grant access to additional Azure resources.
5.  **Token Request**  
    The code running on the virtual machine requests an access token from the Azure Instance Metadata Service endpoint, which is accessible only internally.
6.  **JWT Acquisition**  
    The access token is then used to contact Microsoft Entra ID to retrieve a JSON Web Token (JWT) using the pre-configured client ID and certificate.
7.  **Resource Access**  
    Finally, your application sends the JWT to services that support Microsoft Entra Authentication—such as [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/) or [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/)—to access the required resources.

## Configuring Managed Identity

To configure the identity, navigate to the [Azure Portal](https://portal.azure.com). In this example, we demonstrate the process using a Function App; however, the same configuration applies to any Azure resource that supports managed identities.

This streamlined process ensures a secure and automated approach to managing resource access in the Azure ecosystem.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1eedbbfa-a866-48dd-b220-34f52aefc67c/lesson/f05ddcac-e70d-4521-9f2e-a0647dd5265b)**
>
> Watch video content
