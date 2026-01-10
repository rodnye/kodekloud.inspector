# Enable Azure Container Registry authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Container-Security/Enable-Azure-Container-Registry-authentication)

---

## Table of Contents

- Enable Azure Container Registry authentication
  - Individual Azure Active Directory Identity
  - Admin User
  - Azure AD Service Principal
  - Managed Identity for Azure Resources
  - AKS Cluster Managed Identity
  - AKS Cluster Service Principal
  - Repository-Scoped Access Tokens
  - Demonstration: Using ACR with a Container Instance
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Container Security

# Enable Azure Container Registry authentication

Azure Container Registry (ACR) requires authentication for every access—anonymous access is not supported. In this guide, we explore the various authentication methods available for ACR, discussing their ideal use cases, commands, and limitations. The authentication methods include:

- Individual Azure Active Directory (AD) identity
- Admin user (built into the registry)
- Azure AD service principal
- Managed identity for Azure resources
- AKS cluster managed identity
- AKS cluster service principal
- Repository-scoped access tokens

Read on to review each method in detail.

---

## Individual Azure Active Directory Identity

Using your individual AD identity allows for interactive authentication via Azure CLI or Azure PowerShell. This method is particularly useful for developers or testers who manually push or pull images. It supports Azure Role-Based Access Control (RBAC); however, note that the AD token must be renewed every three hours. If you log out, reauthentication is required.

**Commands:**

```
az acr login --name <registryName>    # Azure CLI command
```

```
Connect-AzContainerRegistry -Name <registryName>    # Azure PowerShell command
```

> [!important]
> **Note**
>
> Make sure to keep track of token renewal to avoid authentication failures during your session.

---

## Admin User

Every container registry includes a built-in admin user independent of your Azure AD administrator account. When enabled, you can authenticate using the Docker CLI. This method is suitable for both interactive operations and unattended pulls by systems or external devices.

**Key Considerations:**

- Azure RBAC is not supported since the credentials are managed outside Azure Resource Manager.
- Only one admin account exists per registry. Sharing these credentials makes it difficult to trace individual user activities.

**Authentication Command:**

```
docker login
```

> [!important]
> **Warning**
>
> If you encounter an error about the admin user not being enabled, navigate to the ACR access keys section in the Azure portal to enable it.

---

## Azure AD Service Principal

An Azure AD service principal can provide authentication across multiple tools, such as Docker CLI, Azure CLI, PowerShell, REST API, or even Kubernetes pull secrets. This method is ideal for unattended scenarios like CI/CD pipelines or external services.

**Benefits & Limitations:**

- Supports RBAC since it is tied to Azure Resource Manager.
- The default service principal password expires after one year. You must renew it in Azure Active Directory and update all affected pipelines or services.

**Authentication Commands:**

```
docker login
az acr login --name <registryName>    # Azure CLI command
```

For Kubernetes or other tools, configure the registry login settings or create a pull secret accordingly.

---

## Managed Identity for Azure Resources

Managed identities are designed to simplify authentication for Azure resources such as Function Apps or App Services. When using managed identities, you no longer need to manage explicit credentials for unattended push or pull operations.

**Common Commands:**

```
docker login
az acr login --name <registryName>    # Azure CLI command
```

> [!important]
> **Note**
>
> Ensure that the Azure resource you are using supports managed identities.

---

## AKS Cluster Managed Identity

When working with an Azure Kubernetes Service (AKS) cluster, you can utilize the cluster's managed identity to authenticate against ACR. This is achieved by attaching your container registry during the creation or update of the AKS cluster.

**Important Points:**

- This method does not support RBAC since the authentication is directly linked to the AKS cluster.
- Both the registry and the AKS cluster must reside within the same tenant; it cannot be used for cross-tenant authentication.

Below is an image detailing the authentication differences for AKS clusters:

![The image is about ACR Authentication, highlighting the method, scenario, Azure RBAC, and limitations related to AKS clusters. It mentions enabling authentication when an AKS cluster is created or updated.](https://kodekloud.com/kk-media/image/upload/v1752881746/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Container-Registry-authentication/acr-authentication-aks-rbac-limitations.jpg)

---

## AKS Cluster Service Principal

Alternatively, you can integrate an Azure AD service principal with your AKS cluster during cluster creation or update. This method supports cross-tenant scenarios, which is beneficial if your AKS cluster and ACR reside in different tenants. Similar to the managed identity approach, it does not support RBAC.

---

## Repository-Scoped Access Tokens

Repository-scoped access tokens are designed to provide tokens for authenticating directly to ACR. They are suitable for both interactive push/pull operations by developers or testers and unattended pulls by external systems. These tokens support RBAC; however, they are generated externally and are not integrated with Azure AD identities.

**Authentication Commands:**

```
docker login
az acr login --name <registryName>    # Azure CLI command
```

For Kubernetes implementations, create a pull secret using the generated token.

---

## Demonstration: Using ACR with a Container Instance

This section demonstrates how to use the admin account in ACR to pull an image into a container instance.

1.  In the Azure portal, navigate to your container registry and select it.
2.  Go to the Access Keys section to enable the admin user. Once enabled, you will see a username and password which can be used with the Docker login command.

![The image shows a Microsoft Azure portal interface for creating a container instance, with fields for subscription, resource group, container details, and image source.](https://kodekloud.com/kk-media/image/upload/v1752881747/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Container-Registry-authentication/azure-portal-container-instance-creation.jpg)

3.  Open the container registry access keys view:

![The image shows the Microsoft Azure portal displaying the access keys section for a container registry named "acr56652." It includes details like the registry name, login server, and passwords.](https://kodekloud.com/kk-media/image/upload/v1752881748/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Container-Registry-authentication/azure-portal-acr56652-access-keys.jpg)

4.  Create a container instance by following these steps:
    - Navigate to Container Instances in the Azure portal.
    - Create a new instance by selecting the previously configured container registry and using the admin credentials.
    - Set container details (e.g., name, OS type, size) and configure the networking settings to expose port 80 publicly.

![The image shows a Microsoft Azure portal interface for creating a container instance, with fields for container details such as name, region, SKU, and image source.](https://kodekloud.com/kk-media/image/upload/v1752881749/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Container-Registry-authentication/azure-portal-container-instance-creation-2.jpg)

5.  Configure the networking options for the container instance:

![The image shows a Microsoft Azure interface for creating a container instance, specifically focusing on the networking options. It allows the user to choose between public, private, or no networking for the container instance.](https://kodekloud.com/kk-media/image/upload/v1752881750/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Container-Registry-authentication/azure-container-instance-networking-options.jpg)

6.  Review all settings and click the "Create" button to deploy the container instance:

![The image shows a Microsoft Azure portal interface for creating a container instance, with details like subscription, resource group, region, and container specifications. The "Create" button is highlighted, indicating readiness to proceed with the creation.](https://kodekloud.com/kk-media/image/upload/v1752881750/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Container-Registry-authentication/azure-portal-create-container-instance.jpg)

7.  After deployment, click "Go to Resource" to check the container details:

![The image shows a Microsoft Azure portal interface displaying details of a container instance named "aci-bootstrap," including its status, location, and resource usage metrics for CPU and memory.](https://kodekloud.com/kk-media/image/upload/v1752881751/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-Azure-Container-Registry-authentication/azure-portal-aci-bootstrap-details.jpg)

Once deployed, you will see that the container has successfully pulled the ACI bootstrap image from your registry, started the instance, and is serving the expected Bootstrap template. Copy the public IP address from the portal and verify in your browser that the correct page is loading.

---

In this article, we covered the various authentication methods available for Azure Container Registry and demonstrated the use of the admin account with container instances. Stay tuned for more details on integrating ACR with Azure Kubernetes Service in future articles.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/146650b0-63f9-4c4b-b452-716a780e5fc7/lesson/8e48b542-22b7-420a-9be2-d81f490a1e59)**
>
> Watch video content
