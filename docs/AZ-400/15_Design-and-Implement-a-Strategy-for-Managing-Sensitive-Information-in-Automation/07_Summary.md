# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Strategy-for-Managing-Sensitive-Information-in-Automation/Summary)

---

## Table of Contents

- Summary
  - Azure Key Vault Essentials
  - Integrating Secret Management in DevSecOps Pipelines
  - Azure Pipelines Service Connections
  - Links and References
  - Watch Video
    - 1. GitHub Actions
    - 2. Azure Pipelines
    - 3. General Best Practices
    - Overview
    - Types of Service Connections
    - Configuration Steps
    - ARM Service Connection
    - GitHub Service Connection
    - Usage in Pipelines
    - Best Practices

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Strategy for Managing Sensitive Information in Automation

# Summary

This article reviews the core concepts and best practices for managing secrets, keys, and certificates in Azure DevOps—covering Azure Key Vault essentials, DevSecOps secret integration, and Azure Pipelines service connections. These techniques align with AZ-400 exam objectives and real-world security requirements.

## Azure Key Vault Essentials

Azure Key Vault provides a secure, centralized store for secrets, keys, and certificates.

- **Purpose**  
  Securely store API keys, passwords, certificates, and cryptographic keys.
- **Access Policies**  
  Configure who can read, write, or manage vault objects.
- **Monitoring & Logging**  
  Integrate with Azure Monitor and Azure Activity Logs to audit access and changes.
- **Best Practices**
  - Enable **soft-delete** and **purge protection**
  - Enforce **role-based access control (RBAC)**
  - Regularly **rotate** and **audit** secrets

```
# Create a new Key Vault with soft-delete enabled
az keyvault create \
  --name MyKeyVault \
  --resource-group MyResourceGroup \
  --location eastus \
  --enable-soft-delete true


# Add a secret to Key Vault
az keyvault secret set \
  --vault-name MyKeyVault \
  --name MySecret \
  --value "MySecretValue"
```

> [!important]
> **Note**
>
> Enable **purge protection** to prevent accidental or malicious deletion of vault contents.

---

## Integrating Secret Management in DevSecOps Pipelines

Implement automated, secure retrieval of secrets in CI/CD workflows.

### 1\. GitHub Actions

- Use the [Azure/login action](https://github.com/Azure/login) to authenticate.
- Fetch secrets from Key Vault at runtime.
- Apply [environment protection rules](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment).
- Rotate credentials on a regular schedule.

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}


      - name: Fetch secret from Key Vault
        run: |
          az keyvault secret show \
            --vault-name MyKeyVault \
            --name MySecret
```

### 2\. Azure Pipelines

- Link Key Vault as a **Variable Group**.
- Reference secrets in YAML or classic pipelines without exposing them in code.
- Turn on diagnostic logging for Key Vault access.

```
variables:
- group: KV-Secrets-Group


steps:
- task: AzureKeyVault@2
  inputs:
    azureSubscription: 'MyServiceConnection'
    KeyVaultName: 'MyKeyVault'
    SecretsFilter: '*'
```

### 3\. General Best Practices

- Enforce **least-privilege** for all identities and service principals.
- Rotate secrets, keys, and certificates at least every 90 days.
- Monitor access logs and trigger alerts on anomalous patterns.

> [!important]
> **Warning**
>
> Always restrict service principal permissions to only the required Azure scopes. Overprivileged identities increase security risk.

---

## Azure Pipelines Service Connections

Service connections allow pipelines to authenticate with external systems without embedding credentials in code.

### Overview

Securely connect to Azure, GitHub, container registries, and third-party services.

### Types of Service Connections

| Service Connection Type          | Use Case                          | Example CLI Command                             |
| -------------------------------- | --------------------------------- | ----------------------------------------------- |
| Azure Resource Manager           | Deploy and manage Azure resources | `az devops service-endpoint azurerm create ...` |
| GitHub                           | Access GitHub repositories        | `az devops service-endpoint github create ...`  |
| Docker Registry / ACR            | Push/pull container images        | —                                               |
| Third-Party (SonarQube, Jenkins) | Integrate analysis and CI tools   | —                                               |

### Configuration Steps

1.  In Azure DevOps, go to **Project Settings > Service connections**.
2.  Click **New service connection** and select the type.
3.  Provide authentication details (service principal, token, or PAT).
4.  Assign the minimal required scope and permissions.
5.  Validate and save the connection.

```
# Example: Create a service connection via Azure CLI (ARM)
az devops service-endpoint create \
  --service-endpoint-configuration azurerm.json
```

### ARM Service Connection

- Use an existing or new service principal with a Contributor or custom role.
- Specify subscription ID, resource group, and scope.
- Test the connection before saving.

### GitHub Service Connection

- Authorize Azure DevOps via OAuth or provide a Personal Access Token (PAT).
- Limit repository permissions to only those needed for your pipelines.

![The image is a slide titled "Using Service Connections in Pipeline," listing topics related to Azure Pipelines and service connections, each marked with a colored dot.](https://kodekloud.com/kk-media/image/upload/v1752867979/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Summary/using-service-connections-pipeline-slide.jpg)

### Usage in Pipelines

Reference service connections in YAML tasks or classic releases:

```
steps:
- task: AzureCLI@2
  inputs:
    azureSubscription: 'MyServiceConnection'
    scriptType: bash
    scriptLocation: inlineScript
    inlineScript: az group list
```

### Best Practices

- Audit service connection permissions regularly.
- Adopt custom roles with just-enough permissions.
- Rotate service principal credentials and tokens on a scheduled basis.

---

## Links and References

- [Azure Key Vault Documentation](https://docs.microsoft.com/azure/key-vault/)
- [Azure DevOps Service Connections](https://docs.microsoft.com/azure/devops/pipelines/library/service-endpoints)
- [GitHub Actions for Azure](https://docs.github.com/actions/deployment/deploying-to-your-cloud-provider/deploying-to-azure)
- [AZ-400 Exam Guide](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4vjQ0)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/2f8974b7-9aa9-46b8-a562-d7ed568269af/lesson/8153439c-3754-4c66-b4c9-f7cdb2bb1fc4)**
>
> Watch video content
