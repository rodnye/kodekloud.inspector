# Enable resource locks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Enterprise-Governance/Enable-resource-locks)

---

## Table of Contents

- Enable resource locks
  - Overview
  - Understanding Inheritance in Azure Locks
  - Types of Resource Locks
  - Configuring Azure Resource Locks
  - Demonstration: Creating and Locking a Storage Account
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Enterprise Governance

# Enable resource locks

This article explains how to enable Azure Resource Locks—a powerful yet often underutilized Azure security feature—to protect your critical resources from accidental modifications or deletions. Resource locks are essential for maintaining the stability of production environments, and they can be configured to meet your specific requirements.

## Overview

Azure resource locks serve as a safeguard against unintended changes. For example, if a production database is mistakenly modified or removed, a resource lock will restrict such actions and enhance the security and resilience of your environment.

## Understanding Inheritance in Azure Locks

Similar to Azure RBAC, resource locks provide flexible deployment options. They can be applied at various scopes:

- **Subscription**
- **Resource Group**
- **Individual Resource**

Although locks cannot be applied at the management group level, any lock assigned at a higher scope is automatically inherited by all underlying resources. For example, applying a lock to an entire resource group ensures that all production resources within that group remain protected from unauthorized modifications or deletions.

## Types of Resource Locks

There are two primary types of Azure resource locks, each serving a specific purpose:

1.  **Read-only Lock**  
    A read-only lock permits you to view the resource details but prevents any modifications. This lock is ideal for configurations that should remain unchanged. For instance, a Network Security Group meeting organizational compliance can be safeguarded against modifications by applying a read-only lock.
2.  **Delete Lock**  
    A delete lock allows modifications but prevents the resource from being deleted. This is particularly useful for resources that require frequent updates, such as virtual machines running critical applications, but must never be accidentally deleted.

![The image is an informational graphic about resource locks, detailing their benefits such as avoiding accidental changes, inheritance, read-only locks, and delete locks. It includes icons representing different types of resources and a lock symbol.](https://kodekloud.com/kk-media/image/upload/v1752881830/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-resource-locks/resource-locks-benefits-graphic.jpg)

Consider a virtual machine that requires routine software updates. By applying a delete lock, you can modify its configuration without risking accidental deletion.

> [!important]
> **Note**
>
> When using resource locks on shared environments, always review possible limitations. For instance, a read-only lock on a storage account prevents the creation of a blob container, and a read-only lock on app servers may interfere with file interactions in Visual Studio Server Explorer.

## Configuring Azure Resource Locks

Azure resource locks are configured directly from the Azure portal. To add a lock, navigate to the desired resource and click on "Add Lock". Below is an example of creating a delete lock named "dnd" (do not delete) on a storage account.

![The image shows a Microsoft Azure portal interface where a user is adding a lock to a storage account, with options for lock name, type, and notes.](https://kodekloud.com/kk-media/image/upload/v1752881832/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-resource-locks/azure-portal-storage-account-lock.jpg)

When a locked resource is deleted, Azure displays an error message:

![The image shows a Microsoft Azure portal interface with details of a storage account named "demoaz356453546" and a dialog box for deleting the storage account, which cannot be deleted due to a delete lock.](https://kodekloud.com/kk-media/image/upload/v1752881833/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-resource-locks/azure-portal-storage-account-delete-lock.jpg)

The error clearly indicates that the lock must be removed before deletion can proceed.

## Demonstration: Creating and Locking a Storage Account

Before applying locks at the resource group level, you can create a new storage account. Use the following Azure CLI command to check policies and ensure the storage account name is unique:

```
az policy check
```

After the storage account is successfully created, you can assign a lock via the Azure portal, which provides a streamlined process for both creating storage accounts and applying locks.

![The image shows a Microsoft Azure portal page for creating a storage account, displaying a review of the configuration settings before finalizing the creation.](https://kodekloud.com/kk-media/image/upload/v1752881834/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-resource-locks/azure-portal-storage-account-creation.jpg)

Once created, you can review and manage locks for the resource group. For example, the "azpolicy-check-rg" resource group might show both delete and read-only locks:

![The image shows a Microsoft Azure portal page displaying the "Locks" section for a resource group named "azpolicy-check-rg," with two locks listed: one with a "Delete" lock type and another with a "Read-only" lock type.](https://kodekloud.com/kk-media/image/upload/v1752881835/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-resource-locks/azure-portal-locks-azpolicy-check-rg.jpg)

If an operation violates the lock policy—such as attempting to create a storage container in a locked scope—you will see an error message:

![The image shows a Microsoft Azure portal interface with a storage account selected, displaying an error message about a failed attempt to create a storage container due to a locked scope.](https://kodekloud.com/kk-media/image/upload/v1752881836/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-resource-locks/azure-portal-storage-error-message.jpg)

This confirms that the lock is active and functioning as intended.

## Conclusion

Azure resource locks are a critical tool for maintaining a secure and stable environment. By carefully configuring read-only and delete locks at the appropriate scopes, you can efficiently protect your valuable assets from accidental changes and deletions. Always review the limitations of resource locks and consider their impact on operations before applying them.

For more information on Azure security features, visit [Microsoft Azure Documentation](https://docs.microsoft.com/azure/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/3c48a4f2-a6f3-45fd-87d7-c53f36f2fb2a/lesson/36eeceaa-2552-4489-885d-06e67129cc96)**
>
> Watch video content
