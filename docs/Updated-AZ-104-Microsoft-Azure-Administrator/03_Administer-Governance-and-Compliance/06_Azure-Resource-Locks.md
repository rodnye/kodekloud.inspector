# Azure Resource Locks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Governance-and-Compliance/Azure-Resource-Locks)

---

## Table of Contents

- Azure Resource Locks
  - What Are Resource Locks?
  - Types of Resource Locks
  - Implementing Resource Locks in the Azure Portal
  - Applying Locks at the Resource Group Level
  - Conclusion
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Governance and Compliance

# Azure Resource Locks

Imagine working late while deploying updates to your Azure environment. A single moment of distraction could lead to running a script without a proper double-check, causing your crucial DNS domain to be deleted. Azure Resource Locks act as a safeguard, preventing accidental modifications or deletions and ensuring that a small mistake doesn’t result in irreversible damage.

In this article, we explore how resource locks protect your Azure environment from unintentional changes.

## What Are Resource Locks?

Resource locks are a critical feature designed to protect your Azure resources from unintended modifications. Think of them as a safety cover on a switch—ensuring that nothing is toggled accidentally. When enabled, these locks keep your resources unchanged during routine maintenance or while scripts are running.

Azure allows you to apply locks at various scopes:

- **Subscription**
- **Resource Group**
- **Individual Resource**

Once a lock is applied at a particular scope, it is automatically inherited by all underlying resources. For instance, applying a lock at the resource group level means every resource within that group is protected.

## Types of Resource Locks

Azure provides two primary types of resource locks:

1.  **Read-Only Locks**  
    A read-only lock lets you view a resource without modifying or deleting it, much like placing valuable items in a display case—you can admire them but not alter them.
2.  **Delete Locks**  
    A delete lock allows modifications but prevents the complete removal of a resource. This is akin to writing with a pencil that does not have an eraser—you can adjust details, but the resource itself remains undeletable.

The following infographic illustrates the benefits of Azure Resource Locks, highlighting the prevention of accidental changes, inheritance across resources, and the flexibility to operate in both read-only and delete modes.

![The image is an infographic about resource locks, explaining their benefits such as avoiding accidental changes, inheritance, read-only locks, and delete locks.](https://kodekloud.com/kk-media/image/upload/v1752884530/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Locks/resource-locks-infographic-benefits.jpg)

## Implementing Resource Locks in the Azure Portal

Follow these steps to implement resource locks using the Azure portal:

1.  **Navigate to the Resource Groups Section**  
    Open the Azure portal and locate the Resource Group that contains the resource you wish to protect. For example, select a Resource Group that holds an automation account.
2.  **Select the Resource**  
    Within your chosen Resource Group, open the automation account. In the left-hand menu, click on the "Locks" option.
3.  **Add a Delete Lock**
    - Click on **Add lock**.
    - Provide a name (e.g., "DND" for "Do Not Delete").
    - Set the lock type to **Delete**.
    - Optionally, add a note for other users.
    - Click **Save**.

After saving, the delete lock becomes active. If you navigate back to the Overview blade for the resource and attempt to delete it, an error message will confirm that deletion is blocked due to the active lock.

![The image shows a Microsoft Azure portal page displaying a lock configuration for a resource group named "cleanup-env." It lists a lock named "DND" with a lock type of "Delete" and a note stating "Do not delete this resource."](https://kodekloud.com/kk-media/image/upload/v1752884531/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Locks/azure-portal-lock-configuration.jpg)

Even though the delete lock stops resource removal, you can still modify aspects of the resource. For instance, you can update runbooks within the automation account without any issues.

4.  **Switching to a Read-Only Lock**
    - Return to the "Locks" section in the automation account.
    - Remove the existing delete lock.
    - Add a new lock, setting the type to **Read-only**.
    - Name it "RO" and include any notes or descriptions.
    - Click **Save**.

![The image shows a Microsoft Azure portal interface where a user is adding a lock to a resource group named "cleanup-env." The lock type is set to "Read-only," and the lock name is being entered as "RO."](https://kodekloud.com/kk-media/image/upload/v1752884532/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Locks/azure-portal-lock-readonly-cleanup-env.jpg)

With the read-only lock in place, attempts to create a new resource—such as a Python runbook (version 3.8) named "demo2"—will result in an error message indicating that the scope is locked. This clearly demonstrates the difference in behavior between a read-only lock and a delete lock.

![The image shows a Microsoft Azure portal screen for creating a runbook with fields for name, runbook type, and runtime version. An error message indicates a "ScopeLocked" issue preventing the creation of the runbook.](https://kodekloud.com/kk-media/image/upload/v1752884533/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Locks/azure-portal-runbook-creation-error.jpg)

## Applying Locks at the Resource Group Level

From the Resource Groups view, you can inspect any locks applied at that level. The locking mechanism works similarly at the subscription level, where every resource within the subscription inherits the lock.

To further enhance protection, you can add an additional lock at the resource group level. For instance, add a delete lock named "RG lock" (or any custom name) to the Resource Group.

![The image shows a Microsoft Azure portal interface where a user is adding a lock to a resource group named "about-rithin." The lock type is set to "Delete," and the user is about to confirm by clicking "OK."](https://kodekloud.com/kk-media/image/upload/v1752884535/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Locks/azure-portal-add-lock-resource-group.jpg)

After saving this lock, all resources within the Resource Group—such as virtual machines (VMs), storage accounts, and network interfaces—are protected. Attempting to delete a VM along with its associated resources (disk, network interface, etc.) will fail due to the active lock.

![The image shows a Microsoft Azure portal interface displaying a resource group named "about-rithin," with a list of resources such as virtual machines, IP addresses, and network security groups, along with their types and locations.](https://kodekloud.com/kk-media/image/upload/v1752884536/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Locks/azure-portal-resource-group-about-rithin.jpg)

> [!important]
> **Important Note**
>
> Remember, to make any change to a resource that is locked, you must first remove the active lock, perform the necessary updates, and then reapply the lock to maintain continuous protection.

## Conclusion

Azure Resource Locks are a powerful tool that safeguards your cloud environment against accidental modifications or deletions. By strategically applying read-only or delete locks, you add an essential layer of protection to your resources. This ensures that routine maintenance or inadvertent script executions do not lead to critical mistakes.

Next, we will delve into strategies for managing costs in your Azure subscription, providing further insights for maintaining a secure and efficient cloud environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/df99187b-f512-443a-a64b-93af9d73c5bc/lesson/84a0bcaf-7696-445f-b093-5150e192b0c5)**
>
> Watch video content
