# Choose between Service Principals and Managed Identity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Authentication-and-Authorization-Methods/Choose-between-Service-Principals-and-Managed-Identity)

---

## Table of Contents

- Choose between Service Principals and Managed Identity
  - Introduction to Identity Management in Azure
  - Service Principals
  - Managed Identities
  - Service Principals vs. Managed Identities
  - Security Best Practices
  - Links and References
  - Watch Video
    - Create a Service Principal
    - Assign Roles to an Existing Service Principal
    - Delete a Service Principal
    - System-assigned Managed Identity
    - User-assigned Managed Identity
      - Create a VM with System-assigned Identity
      - Create a User-assigned Managed Identity

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Authentication and Authorization Methods

# Choose between Service Principals and Managed Identity

In this guide, you’ll learn how to secure your Azure resources by choosing the right identity mechanism. We’ll compare **Service Principals** and **Managed Identities**, cover best practices, and show you step-by-step CLI commands.

## Introduction to Identity Management in Azure

Effective identity management acts as the gatekeeper for your cloud environment. It ensures only authorized users and applications can access sensitive data and services in Azure. By implementing the correct identity model, you strengthen your security posture and simplify credential management.

![The image is an introduction to identity management in Azure, showing a flow from identity management to an authorized user accessing sensitive data.](https://kodekloud.com/kk-media/image/upload/v1752867534/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/azure-identity-management-introduction-flow.jpg)

Azure provides two primary identity mechanisms for applications and services:

- **Service Principals**: Custom identities you create and manage manually.
- **Managed Identities**: Azure-managed credentials that automatically rotate.

---

## Service Principals

A Service Principal is an identity created for use with applications, hosted services, and automated tools to access Azure resources. It follows the principle of least privilege by granting only the needed permissions.

![The image is a diagram illustrating the concept of "Service Principals" in Azure, showing their connection to security identities and Azure resources like applications, hosted services, and automated tools.](https://kodekloud.com/kk-media/image/upload/v1752867536/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/service-principals-azure-diagram.jpg)

A key scenario for Service Principals is non-interactive access—your app or CI/CD pipeline can authenticate without a user’s credentials:

![The image is a diagram titled "Service Principals," showing a central icon connected to three user icons, with two having green check marks and one with a red cross.](https://kodekloud.com/kk-media/image/upload/v1752867537/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/service-principals-diagram-user-icons.jpg)

### Create a Service Principal

Use the Azure CLI to create a Service Principal with a specific role and scope. You need Contributor (or higher) privileges on the target scope.

```
az ad sp create-for-rbac \
  --name <name> \
  --role <role> \
  --scopes <scope>
```

> [!important]
> **Note**
>
> Replace `<name>`, `<role>`, and `<scope>` with your desired values, for example `"/subscriptions/00000000-0000-0000-0000-000000000000"`.

### Assign Roles to an Existing Service Principal

Grant additional permissions by assigning roles:

```
az role assignment create \
  --assignee <objectId> \
  --role <role> \
  --scope <scope>
```

![The image illustrates the concept of managing service principals, showing a flow from "Service Principals" to "Permissions and Roles" with icons and a connecting shield symbol.](https://kodekloud.com/kk-media/image/upload/v1752867539/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/service-principals-permissions-roles-flow.jpg)

### Delete a Service Principal

Remove unused Service Principals to reduce risk:

```
az ad sp delete --id <objectId>
```

---

## Managed Identities

Managed Identities in Azure Active Directory eliminate the need to store credentials in code. Azure handles credential issuance and rotation automatically.

![The image is a diagram illustrating the concept of Managed Identity in Azure, showing the relationship between Azure Active Directory, Managed Identity, and Azure Services.](https://kodekloud.com/kk-media/image/upload/v1752867540/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/managed-identity-azure-diagram-relationship.jpg)

Azure offers two flavors:

1.  **System-assigned**
2.  **User-assigned**

### System-assigned Managed Identity

Tied to a single Azure resource (VM, App Service, Function). Created and deleted alongside that resource.

![The image is a diagram illustrating a system-assigned managed identity in Azure, showing its connection to app services, key vaults, and blob storage. It includes a note that this identity is tied to a single Azure resource.](https://kodekloud.com/kk-media/image/upload/v1752867540/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/azure-managed-identity-diagram.jpg)

**Lifecycle**

- Automatically created with the resource
- Automatically deleted when the resource is removed

**Use Case:**  
An Azure VM fetching secrets from Key Vault without storing credentials.

#### Create a VM with System-assigned Identity

```
az vm create \
  --resource-group <resourceGroup> \
  --name <vmName> \
  --assign-identity
```

### User-assigned Managed Identity

A standalone Azure resource that can be shared across multiple services. You manage its lifecycle independently.

![The image is a diagram illustrating the life cycle of a user-assigned managed identity, showing its interactions with app services, key vaults, and blob storage. It includes check and cross marks to indicate successful and unsuccessful connections.](https://kodekloud.com/kk-media/image/upload/v1752867541/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/user-assigned-managed-identity-lifecycle-diagram.jpg)

**Use Case:**  
Multiple App Services using one managed identity to access a SQL database.

#### Create a User-assigned Managed Identity

```
az identity create \
  --resource-group <resourceGroup> \
  --name <identityName>
```

---

## Service Principals vs. Managed Identities

Both Service Principals and Managed Identities enable secure Azure authentication but differ in management overhead and flexibility.

![The image compares Service Principals and Managed Identities, highlighting their differences in control, flexibility, and ease of use. Service Principals offer more control but require manual management, while Managed Identities provide simplified management with automatic credential rotation.](https://kodekloud.com/kk-media/image/upload/v1752867543/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Choose-between-Service-Principals-and-Managed-Identity/service-principals-managed-identities-comparison.jpg)

| Identity Type      | Credential Management      | Lifecycle                 | Best For                              |
| ------------------ | -------------------------- | ------------------------- | ------------------------------------- |
| Service Principal  | Manual creation & rotation | Independent of resources  | Custom roles, cross-tenant scenarios  |
| System-assigned MI | Automatic rotation         | Tied to single resource   | VM-to-KeyVault, Function-to-Storage   |
| User-assigned MI   | Automatic rotation         | Reusable across resources | Shared identity in multi-service apps |

**When to choose:**

- **Service Principals** when you need custom credential lifecycles or multi-tenant access.
- **Managed Identities** for seamless, credential-free Azure resource authentication.

---

## Security Best Practices

- Grant minimal permissions (Principle of Least Privilege).
- Rotate Service Principal credentials regularly.
- Monitor and audit identity usage with Azure AD logs and Azure Monitor.

> [!important]
> **Warning**
>
> Avoid storing credentials in code or configuration files. Always leverage Managed Identities or Key Vault to keep secrets secure.

---

## Links and References

- [Azure CLI Documentation](https://learn.microsoft.com/cli/azure/)
- [Azure Active Directory Documentation](https://learn.microsoft.com/azure/active-directory/)
- [Azure Managed Identities Overview](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/)
- [Azure Service Principal Documentation](https://learn.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/6dcff123-ec53-4c16-b939-97d0b60183e2/lesson/be39539f-e41b-45e7-b8a2-f700ee0bd3fc)**
>
> Watch video content
