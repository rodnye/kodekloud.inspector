# Roles and Responsibilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/File-Based-Storage/Roles-and-Responsibilities)

---

## Table of Contents

- Roles and Responsibilities
  - User Responsibilities
  - Administrator Responsibilities
  - Data Engineer Responsibilities
  - Storage Account Tiers Comparison
  - References
  - Watch Video

---

## Content

DP-900: Microsoft Azure Data Fundamentals

File Based Storage

# Roles and Responsibilities

In this lesson, we'll outline the key groups involved in managing file-based storage on Azure and map them to built-in roles that enforce the principle of least privilege.

> [!important]
> **Note**
>
> Grant only the minimum permissions required—this enforces security and reduces the risk of accidental data exposure.

We typically organize access into three groups:

- **Users**  
  Need read or read/write access to files, blobs, or file shares for day-to-day operations.
- **Administrators**  
  Manage storage accounts, assign or revoke permissions, configure backups, and define data governance policies.
- **Data Engineers**  
  Provision and configure storage resources without direct access to the data itself.

Once responsibilities are defined, assign each group an Azure role that aligns with their tasks.

![The image is a diagram showing a central file icon connected to various user icons and checklists, indicating a workflow or process. It is labeled "Introduction" and includes a copyright notice from KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752873008/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/introduction-workflow-diagram-kodekloud.jpg)

---

## User Responsibilities

Users operate in a self-service environment. They receive scoped permissions on the storage objects they need, enabling independent work without frequent administrative requests.

- Read data from files, blobs, or containers
- Modify or upload new data when granted write access
- Access only the shares or containers explicitly assigned to them

---

## Administrator Responsibilities

Administrators oversee the lifecycle and compliance of storage resources:

- Assign and revoke RBAC permissions (`Storage Blob Data Reader`, `Storage Blob Data Contributor`)
- Configure and manage automated backups for point-in-time restores
- Integrate with [Microsoft Purview](https://learn.microsoft.com/azure/purview/) to define retention and classification policies

> [!important]
> **Warning**
>
> Incorrect or overly broad RBAC assignments can lead to unintended data exposure. Always audit role assignments regularly.

---

## Data Engineer Responsibilities

Data Engineers handle provisioning and configuration tasks without accessing content directly:

- Create and configure storage accounts and file shares
- Optimize performance tiers based on workload patterns
- Automate deployments using [Azure CLI](https://learn.microsoft.com/cli/azure/storage) or [Terraform](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_account)

![The image outlines three data roles: Users, Administrators, and Data Engineers, each with specific responsibilities. Users operate in a self-serve environment, Administrators handle permissions and backups, and Data Engineers use Microsoft Purview.](https://kodekloud.com/kk-media/image/upload/v1752873010/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/data-roles-users-administrators-engineers.jpg)

---

We’ve explored unstructured data storage on Azure and the roles needed to manage it securely.

- File and object storage support binary files and common text formats (CSV, JSON, XML).
- Azure storage accounts host both [Azure Files](https://learn.microsoft.com/azure/storage/files/) and [Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/).
- **Premium** accounts use SSDs for low-latency I/O.
- File shares utilize the [SMB protocol](https://en.wikipedia.org/wiki/Server_Message_Block) for broad OS compatibility.

## Storage Account Tiers Comparison

| Tier    | Storage Cost               | Access Cost       | Use Case                                |
| ------- | -------------------------- | ----------------- | --------------------------------------- |
| Hot     | Higher                     | Lower             | Frequently accessed data                |
| Cool    | Lower                      | Higher            | Infrequently accessed, but not archival |
| Archive | Lowest (hours to retrieve) | Highest (latency) | Long-term retention with rare retrieval |

![The image is a summary of file-based storage options, highlighting different tiers: hot (cheaper transfers, more expensive storage), cool (more expensive transfers, cheaper storage), and archives (cheap storage with high latency).](https://kodekloud.com/kk-media/image/upload/v1752873012/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Roles-and-Responsibilities/file-storage-options-summary-hot-cool-archives.jpg)

---

## References

- [Azure Files documentation](https://learn.microsoft.com/azure/storage/files/)
- [Azure Blob Storage overview](https://learn.microsoft.com/azure/storage/blobs/)
- [RBAC in Azure Storage](https://learn.microsoft.com/azure/role-based-access-control/overview)
- [Microsoft Purview governance](https://learn.microsoft.com/azure/purview/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/e229086c-adc3-444d-a6da-f77b41067675/lesson/3978ebee-b780-4920-9618-f730ba98efd2)**
>
> Watch video content
