# Explore Azure Resource Locks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Implement-Security-and-Validate-Code-Bases-for-Compliance/Explore-Azure-Resource-Locks)

---

## Table of Contents

- Explore Azure Resource Locks
  - Lock Types in Azure
  - Managing Locks in Azure
  - Integration with RBAC and Governance
  - Exam and Real-World Scenarios
  - Links and References
  - Watch Video
    - Cannot Delete Lock
    - Read Only Lock
    - Sample ARM Template Snippet
    - Key Points

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Implement Security and Validate Code Bases for Compliance

# Explore Azure Resource Locks

Resource locks in Azure are essential for preventing accidental modifications or deletions of critical resources. Whether you’re preparing for the [AZ-400 exam](https://learn.microsoft.com/en-us/certifications/exams/az-400/) or managing production environments, understanding how to apply and manage locks will help you maintain stability and security.

## Lock Types in Azure

Azure offers two built-in lock levels:

| Lock Type     | Description                                                              | Operations Allowed  |
| ------------- | ------------------------------------------------------------------------ | ------------------- |
| Cannot Delete | Prevents deletion but permits all other operations (read, write, update) | Read, Write, Update |
| Read Only     | Blocks create, update, and delete operations                             | Read only           |

### Cannot Delete Lock

The **Cannot Delete** lock (also known as `CanNotDelete`) ensures a resource remains in place:

- Read and write operations are fully supported.
- Any attempt to delete the resource is blocked.

Use this lock for resources such as production databases, critical storage accounts, or network appliances.

```
# Create a Cannot Delete lock via Azure CLI
az lock create \
  --name BlockDeletion \
  --lock-type CanNotDelete \
  --resource-group MyResourceGroup \
  --resource-name MyVM \
  --resource-type Microsoft.Compute/virtualMachines
```

> [!important]
> **Best Practice**
>
> Apply locks at the highest possible scope (subscription or resource group) to cover all child resources automatically.

### Read Only Lock

The **Read Only** lock restricts a resource to read-only mode:

- Only **GET** operations are permitted.
- All **PUT**, **PATCH**, **POST**, and **DELETE** actions are blocked.

This lock is ideal for archival assets or environments where changes must be fully prohibited.

```
# Create a Read Only lock via Azure CLI
az lock create \
  --name ViewOnly \
  --lock-type ReadOnly \
  --resource-group MyResourceGroup
```

> [!important]
> **Warning**
>
> Applying a Read Only lock will prevent even administrative updates. Always verify you won’t need to modify the resource before locking.

## Managing Locks in Azure

You can manage locks in multiple ways:

| Method           | Command / Action                                                |
| ---------------- | --------------------------------------------------------------- |
| Azure Portal     | Navigate to **Resource > Locks** and **Add** new lock           |
| Azure CLI        | `az lock create` / `az lock delete`                             |
| Azure PowerShell | `New-AzResourceLock` / `Remove-AzResourceLock`                  |
| ARM Template     | Use `"Microsoft.Authorization/locks"` under `resources` in JSON |

### Sample ARM Template Snippet

```
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "resources": [
    {
      "type": "Microsoft.Authorization/locks",
      "apiVersion": "2016-09-01",
      "name": "BlockDeletion",
      "properties": {
        "level": "CanNotDelete",
        "notes": "Prevent accidental deletion"
      }
    }
  ]
}
```

## Integration with RBAC and Governance

Resource locks complement Azure Role-Based Access Control (RBAC) and policies:

- **RBAC** defines _who_ can perform operations.
- **Locks** define _which_ operations are blocked, regardless of RBAC rights.
- Combine both for granular governance across subscriptions.

### Key Points

- Locks are inherited by child resources.
- You need **Microsoft.Authorization/locks/delete** permission to remove a lock.
- Policy-based locks can enforce organizational standards at scale.

## Exam and Real-World Scenarios

For the AZ-400 certification and practical deployments, be prepared to:

- Differentiate between **Cannot Delete** and **Read Only** locks.
- Choose the appropriate lock type based on business requirements.
- Explain how locks interact with RBAC roles and Azure Policy.

Master resource locks to safeguard your Azure workloads and ensure uninterrupted operations.

---

## Links and References

- [Azure Role-Based Access Control (RBAC)](https://learn.microsoft.com/en-us/azure/role-based-access-control/)
- [AZ-400: Designing and Implementing Microsoft DevOps Solutions](https://learn.microsoft.com/en-us/certifications/exams/az-400/)
- [Azure CLI Lock Documentation](https://learn.microsoft.com/en-us/cli/azure/lock)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/1bd9c8cc-efae-414c-b4be-838e767634f6/lesson/492d6353-2ae8-4308-8311-07d0a709632b)**
>
> Watch video content
