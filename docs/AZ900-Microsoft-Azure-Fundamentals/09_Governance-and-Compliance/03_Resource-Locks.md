# Resource Locks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Governance-and-Compliance/Resource-Locks)

---

## Table of Contents

- Resource Locks
  - Types of Resource Locks
  - Key Features of Resource Locks
  - Benefits of Using Resource Locks
  - Use Cases for Resource Locks
  - Managing Resource Locks in the Azure Portal
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Governance and Compliance

# Resource Locks

Azure resource locks are a powerful feature designed to protect your critical assets from accidental deletion or modification. In this article, we explore how Beta Innovation can use Azure resource locks to safeguard important resources and ensure operational continuity.

![The image illustrates a challenge in preventing resource accidents, showing icons for "Delete" and "Modify" alongside gears labeled as "Critical Resources" with exclamation marks.](https://kodekloud.com/kk-media/image/upload/v1752868379/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/resource-accidents-challenge-icons.jpg)

Azure resource locks serve as protective measures by blocking unintended changes. They can be applied at multiple points in the resource hierarchy, including subscriptions, resource groups, and individual resources.

## Types of Resource Locks

Azure provides two types of resource locks:

1.  **Read-Only Lock**  
    This lock restricts any modifications by allowing only viewing access. Think of it as a museum exhibit—you can inspect details such as replication settings, files, or containers, but you cannot make any changes.
2.  **Delete Lock**  
    This lock allows modifications while preventing the deletion of a resource. For instance, if you apply a Delete lock to a virtual machine, you can still perform actions like starting, stopping, or resizing the VM, but deleting it is blocked.

![The image shows two types of resource locks: "Read-Only Lock" and "Delete Lock," each represented with an icon and numbered 01 and 02.](https://kodekloud.com/kk-media/image/upload/v1752868380/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/resource-locks-read-only-delete-icons.jpg)

## Key Features of Resource Locks

- **Scope of Application:**  
  Resource locks can be applied broadly across an entire subscription or narrowly to a specific resource. This flexibility is similar to setting up a security system for an entire building or just a single room.
- **Flexible Control:**  
  Choose between a Read-Only lock and a Delete lock based on your specific security requirements.

![The image shows two key features of resource locks: "Scope of Application" and "Flexible Control," each represented by a colored card with icons.](https://kodekloud.com/kk-media/image/upload/v1752868381/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/resource-locks-scope-control-icons.jpg)

## Benefits of Using Resource Locks

Resource locks provide several advantages:

- **Protection Against Accidental Actions:**  
  They help prevent unintended changes, reducing the risk of human error.
- **Customizable Security:**  
  Lock configurations can be tailored to meet your operational needs, ensuring a secure environment.
- **Enhanced Governance:**  
  Resource locks contribute to improved compliance and governance by establishing an extra layer of control over resource modifications.

![The image outlines the benefits of resource locks, highlighting protection against accidental actions, customizable security, and enhanced governance.](https://kodekloud.com/kk-media/image/upload/v1752868382/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/resource-locks-benefits-diagram.jpg)

## Use Cases for Resource Locks

Resource locks are particularly useful for protecting high-value assets, such as:

- Production databases
- Key networking components
- Essential services

They ensure that your most critical components remain secure and fully operational.

![The image illustrates three use cases for resource locks: protecting critical resources, securing production databases, and safeguarding key network components.](https://kodekloud.com/kk-media/image/upload/v1752868384/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/resource-locks-use-cases-illustration.jpg)

## Managing Resource Locks in the Azure Portal

Managing resource locks via the Azure Portal is straightforward. Follow these steps to implement and oversee locks on your resources:

1.  **Navigating the Locks:**  
    Sign in to the Azure Portal, navigate to your subscription, and search for "locks." Locks set at the subscription level are inherited by all resource groups and underlying resources.
2.  **Applying a Lock to a Resource Group:**  
    Within a specific resource group, search for "lock" and add a new lock. For instance, you might name the lock "dnd" (do not delete) and then confirm by clicking OK.

    ![The image shows a Microsoft Azure portal interface where a user is adding a lock to a resource group named "az900-fn-rg." The "Add lock" dialog box is open, requiring a lock name and type.](https://kodekloud.com/kk-media/image/upload/v1752868386/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/azure-portal-add-lock-resource-group.jpg)

3.  **Effect of Locks on Resources:**  
    When a lock is applied to a resource group, attempts to delete any resource within that group (such as a storage account) will be blocked. An error message will inform you that the deletion is prevented by the active Delete lock.

    ![The image shows a Microsoft Azure portal interface displaying details of a storage account named "az900fnrgbee0" with a pop-up for deleting the storage account, listing dependent resources like containers, file shares, and tables.](https://kodekloud.com/kk-media/image/upload/v1752868387/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/azure-portal-storage-account-details.jpg)

4.  **Understanding Inheritance and Overrides:**  
    Locks applied at the resource group level are automatically inherited by all resources within that group. However, additional locks can be set on individual resources. For example, adding a Read-Only lock at the resource level will override other operations, such as restarting the resource.

    ![The image shows a Microsoft Azure portal interface displaying the "Locks" section for a resource named "az900fndemo984." It lists two locks: one with a "Delete" type and another with a "Read-only" type.](https://kodekloud.com/kk-media/image/upload/v1752868388/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Resource-Locks/azure-portal-locks-az900fndemo984.jpg)

5.  **Removing Locks:**  
    To remove a lock, return to the "locks" section. If a lock is inherited from a parent scope (like a resource group), you will need to remove it from that parent level rather than individually on the resource.

> [!important]
> **Note**
>
> When managing resource locks, always verify the scope from which the lock originates to avoid unintentional exposure of critical resources.

This concludes our detailed guide on managing Azure resource locks. By employing these locks effectively, you can enhance the security and governance of your Azure environment while protecting valuable assets.

For further reading on Azure security features, refer to the [Azure Documentation](https://docs.microsoft.com/azure/security/) and explore additional resources on our website.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/8a56eadd-85fb-481a-8092-da2e93436abf/lesson/98bbaab0-92bb-469b-a5c5-08ee523b8058)**
>
> Watch video content
