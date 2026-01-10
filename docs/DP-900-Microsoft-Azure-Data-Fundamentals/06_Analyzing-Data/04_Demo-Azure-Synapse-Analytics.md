# Demo Azure Synapse Analytics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Analyzing-Data/Demo-Azure-Synapse-Analytics)

---

## Table of Contents

- Demo Azure Synapse Analytics
  - 1. Creating a Synapse Workspace
  - 2. Security and Authentication
  - 3. Review, Create, and Deploy
  - 4. Exploring Your Workspace
  - Links and References
  - Watch Video
    - Accessing Synapse Studio

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Analyzing Data

# Demo Azure Synapse Analytics

Welcome to this step-by-step guide for provisioning an **Azure Synapse Analytics** workspace. Azure Synapse unifies data integration, enterprise data warehousing, and big data analytics into a single service. In this tutorial, you’ll learn how to:

- Create a Synapse workspace with Data Lake Storage Gen2
- Configure security, encryption, and networking
- Review and deploy the workspace
- Explore the resources in Synapse Studio

Let’s get started!

---

## 1\. Creating a Synapse Workspace

1.  Sign in to the [Azure portal](https://portal.azure.com/) and search for **Azure Synapse Analytics**.
2.  On the overview page, click **\+ Create**.

![The image shows a Microsoft Azure portal interface for creating a Synapse workspace, with options to select a subscription, resource group, and workspace details.](https://kodekloud.com/kk-media/image/upload/v1752872834/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-portal-synapse-workspace-creation.jpg)

3.  Under **Basics**, choose your subscription and an existing resource group.
    - The workspace resource itself will live here.
    - Supporting services (storage, Data Factory) are placed in a managed resource group. You may name it or let Azure auto-generate one.
4.  Enter a unique workspace name (e.g., `phvisanalysis`) in lowercase and select a Region (e.g., **East US**).
5.  For **Data Lake Storage Gen2**, either pick an existing account or click **Create new** to provision one with the required hierarchical namespace.

> [!important]
> **Note**
>
> Azure Synapse requires hierarchical namespace on your storage account. Letting the wizard create it ensures this setting is enabled automatically.

![The image shows a Microsoft Azure portal interface for creating a Synapse workspace, with fields for subscription, resource group, workspace name, region, and data lake storage options.](https://kodekloud.com/kk-media/image/upload/v1752872836/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-portal-synapse-workspace-creation-2.jpg)

6.  When you create storage, provide a name like `phvsynapseaccount`. This hosts your Data Lake containers.
7.  Since Synapse also leverages Azure Files, click **File system** and add another account such as `phvsynfiles`.

![The image shows a Microsoft Azure portal interface for creating a Synapse workspace, with fields for subscription, resource group, workspace name, region, and storage options.](https://kodekloud.com/kk-media/image/upload/v1752872838/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-portal-synapse-workspace-creation-3.jpg)

The wizard handles hierarchical namespace, access permissions, and resource linking, simplifying setup. If you need to grant additional users access later, assign Storage Blob Data roles on those accounts.

8.  Scroll down to review the summary where Synapse automatically links to your new Data Lake Storage Gen2 accounts.

![The image shows a Microsoft Azure portal interface for creating a Synapse workspace, with fields for workspace name, region, and Data Lake Storage Gen2 settings.](/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-synapse-workspace-setup.jpg)

---

## 2\. Security and Authentication

Switch to the **Security** tab to configure identity and network controls:

- **Authentication**
  - Enable **Azure Active Directory (AAD)** for centralized, secure access.
  - Optionally allow local SQL authentication if needed.
- **Network Access**
  - By default, all IP ranges are allowed.
  - You can restrict to specific IPs or Virtual Network rules later.

![The image shows a Microsoft Azure portal page for creating a Synapse workspace, focusing on configuring security options, including authentication methods and network access permissions.](https://kodekloud.com/kk-media/image/upload/v1752872839/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-synapse-workspace-security-configuration.jpg)

Below, you’ll find **Encryption** settings:

- **Microsoft-managed keys** are selected by default for data at rest.
- To use **Customer-managed keys**, click **Enable**, then choose your Key Vault and key.

> [!important]
> **Warning**
>
> Once the workspace is created, you cannot switch encryption between Microsoft-managed and customer-managed keys.

![The image shows a Microsoft Azure interface for creating a Synapse workspace, with options for system-assigned managed identity permissions and workspace encryption settings. A warning about double encryption configuration is also visible.](https://kodekloud.com/kk-media/image/upload/v1752872841/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-synapse-workspace-interface-settings.jpg)

---

## 3\. Review, Create, and Deploy

1.  Skip the **Networking** tab for now (you can integrate a Virtual Network later).
2.  Click **Review + create**.
3.  After validation completes successfully, select **Create**.

![The image shows a Microsoft Azure portal page for creating a Synapse workspace, with a validation success message and details about the serverless SQL cost.](https://kodekloud.com/kk-media/image/upload/v1752872842/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-portal-synapse-workspace-creation-4.jpg)

Deployment typically takes 5–10 minutes. Once finished, navigate to your managed resource group to inspect all created components.

![The image shows a Microsoft Azure portal interface displaying the overview of a Synapse Analytics deployment, including deployment details and status for various resources.](https://kodekloud.com/kk-media/image/upload/v1752872844/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-synapse-analytics-deployment-overview.jpg)

---

## 4\. Exploring Your Workspace

Open the managed resource group (e.g., **DefaultResourceGroup-EUS**):

| Resource                           | Purpose                                    |
| ---------------------------------- | ------------------------------------------ |
| Synapse Workspace                  | Core analytics environment                 |
| Managed Azure Cosmos DB            | Data Explorer for log and time series data |
| Storage Account: phvsynapseaccount | Data Lake Storage Gen2                     |
| Storage Account: phvsynfiles       | Azure Files for intermediate operations    |
| Recovery Services vault            | Backup and disaster recovery               |

![The image shows a Microsoft Azure portal interface displaying a resource group named "DefaultResourceGroup-EUS" with a list of resources, including a Synapse workspace, Azure Cosmos DB account, storage accounts, and a Recovery Services vault, all located in East US.](https://kodekloud.com/kk-media/image/upload/v1752872845/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Azure-Synapse-Analytics/azure-portal-default-resource-group-eus.jpg)

### Accessing Synapse Studio

1.  Click your **Synapse Workspace** to launch **Synapse Studio**.
2.  In the **Develop** hub, you can create:
    - SQL on-demand scripts
    - Dedicated SQL pool queries
    - Spark notebooks
    - Data Factory pipelines
3.  Use the **Manage** hub to link additional services or update credentials.
4.  Monitor job runs and pipeline status in the **Monitor** hub.

Congratulations! You’ve successfully set up an Azure Synapse Analytics workspace and explored its core components.

---

## Links and References

- [Azure Synapse Analytics Documentation](https://learn.microsoft.com/azure/synapse-analytics/)
- [Data Lake Storage Gen2 Overview](https://learn.microsoft.com/azure/storage/blobs/data-lake-storage-introduction)
- [Azure Storage RBAC Roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#storage-roles)
- [Azure Key Vault for Customer-Managed Keys](https://learn.microsoft.com/azure/key-vault/general/overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/a4f1a604-4743-4a3a-81ac-8210d6f9bb96/lesson/ba1d4bda-eace-4f0b-bd36-625e1fd51ac4)**
>
> Watch video content
