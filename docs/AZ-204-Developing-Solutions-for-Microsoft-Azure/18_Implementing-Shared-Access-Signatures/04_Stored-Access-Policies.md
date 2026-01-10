# Stored Access Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Shared-Access-Signatures/Stored-Access-Policies)

---

## Table of Contents

- Stored Access Policies
  - Key Benefits
  - Example Code
  - How to Use Stored Access Policies
  - Summary
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Shared Access Signatures

# Stored Access Policies

In this article, you will learn about Stored Access Policies and how they enhance the security and management of shared access signatures (SAS tokens) in Azure Blob Storage. While SAS tokens provide fine-grained control over resources, Stored Access Policies offer an additional layer of server-side control by decoupling permission management from token issuance.

> [!important]
> **Overview**
>
> Stored Access Policies allow you to centrally manage access permissions, simplify expiry management, and swiftly revoke access without the need to recreate SAS tokens.

## Key Benefits

1.  **Centralized Management**  
    Administrators can streamline the management of access permissions by applying updates to a single stored access policy, which multiple SAS tokens can reference. This centralization simplifies overall access control.
2.  **Enhanced Expiry Management**  
    With a stored access policy, you can adjust permissions and expiry times without issuing new tokens. Simply update the policy to extend or reduce access according to your requirements.
3.  **Rapid Revocation**  
    If you need to revoke access immediately, modify or delete the stored access policy. Any SAS token linked to that policy will automatically inherit the updated restrictions, ensuring quick enforcement of security changes.

## Example Code

Below are examples demonstrating how to create a stored access policy using both C# and the Azure CLI. In these examples, a policy is set with a one-hour expiry and read/write permissions.

```
BlobSignedIdentifier identifier = new BlobSignedIdentifier
{
    Id = "stored access policy identifier",
    AccessPolicy = new BlobAccessPolicy
    {
        ExpiresOn = DateTimeOffset.UtcNow.AddHours(1),
        Permissions = "rw"
    }
};
```

```
az storage container policy create \
    --name <stored access policy identifier> \
    --container-name <container name> \
    --start <start time UTC datetime> \
    --expiry <expiry time UTC datetime> \
    --permissions a,c,d,l,r,w \
    --account-key <storage account key> \
    --account-name <storage account name>
```

These snippets illustrate how to define an access policy using the BlobSignedIdentifier and BlobAccessPolicy classes in C#, and how to achieve the same with the Azure CLI. In both cases, the policy settings include a one-hour expiry and permissions for read and write (noting that the CLI command syntax specifies permissions for a broader range of actions).

## How to Use Stored Access Policies

When creating or modifying a SAS token, you can reference a stored access policy rather than embedding permissions and expiry details directly into the token. For example, in the Azure Portal:

1.  Navigate to your storage account's container.
2.  Go to the Access Policies section.
3.  Add a new policy (for instance, a "manager's read policy") with the desired start and expiry times.
4.  Save the configuration, then proceed to the Shared Access Signatures section.
5.  Instead of directly specifying permissions, select the stored access policy you created.

This method ensures that the generated SAS token simply references the policy by its identifier. Any future changes to the policy, such as updating permissions, are automatically reflected in the token’s effective access rights.

![The image shows a Microsoft Azure portal interface for generating a shared access token for a storage container named "airportcodes." It includes options for setting permissions, start and expiry dates, and generating a SAS token and URL.](https://kodekloud.com/kk-media/image/upload/v1752866672/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Stored-Access-Policies/azure-portal-shared-access-token.jpg)

> [!important]
> **Tip**
>
> Using stored access policies minimizes administrative overhead and reduces the risk of outdated or misconfigured SAS tokens when access requirements change.

## Summary

Stored Access Policies provide a robust and efficient mechanism to manage access to Azure Blob Storage by decoupling permission control from SAS tokens. This strategy offers flexibility through centralized management, simplified expiry adjustments, and rapid revocation of access rights. Whether you are managing policies via code or directly through the Azure Portal, leveraging Stored Access Policies can significantly streamline your storage security and operational management.

Stay tuned for further insights, including our upcoming discussion on integrating the Microsoft Graph API for enhanced resource interaction.

For additional reading on Azure Storage features, visit the [Azure Documentation](https://docs.microsoft.com/en-us/azure/storage/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/00cea585-8945-49f2-bd87-be0ce9c88985/lesson/34610bef-fc04-4922-87c8-b8b7b4ca987d)**
>
> Watch video content
