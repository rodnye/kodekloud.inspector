# Introduction to Bicep - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Infrastructure-as-Code-IaC/Introduction-to-Bicep)

---

## Table of Contents

- Introduction to Bicep
  - How Bicep Works
  - Key Benefits
  - Example Bicep Template
  - Installing the Bicep CLI
  - Bicep File Structure
  - Authoring Best Practices
  - Advanced Scripting Tips
  - Deploying with Azure CLI
  - Visual Studio Code Integration
  - Deploying in Azure Cloud Shell
  - Azure Automanage Machine Configuration
  - Links and References
  - Watch Video
    - Prerequisites
    - Windows (PowerShell)
    - Linux (Bash)
    - macOS (Homebrew)
    - Example Deployment

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Infrastructure as Code IaC

# Introduction to Bicep

Azure Bicep is a domain-specific language for declaratively provisioning Azure resources. It builds on ARM templates by offering clearer syntax, built-in modularity, and first-class support for parameters and loops. In this guide, you’ll learn how Bicep works, its core benefits, how to install the Bicep CLI, and best practices for authoring and deploying Bicep code.

## How Bicep Works

You write infrastructure definitions in concise Bicep syntax instead of ARM JSON. The Bicep CLI then compiles your code into a standard ARM template, ensuring compatibility with all Azure services while improving readability and maintainability.

![The image is an introduction to Bicep, showing a flowchart where Bicep Language is compiled into an ARM Template JSON, resulting in more readable and maintainable code.](https://kodekloud.com/kk-media/image/upload/v1752867728/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction-to-Bicep/bicep-introduction-flowchart-arm-template.jpg)

## Key Benefits

Adopting Bicep over raw ARM JSON gives you:

- **Readable syntax** that’s easier to navigate and review.
- **Modularity** with native support for reusable modules.
- **First-class parameters & loops** to reduce boilerplate and scale deployments.

![The image is an introduction slide for Bicep, highlighting three features: clearer syntax, easier code reuse, and better support for modularity.](https://kodekloud.com/kk-media/image/upload/v1752867729/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction-to-Bicep/bicep-introduction-clearer-syntax-features.jpg)

> [!important]
> **Note**
>
> Bicep compiles directly to ARM templates under the hood, so you retain full compatibility with Azure Resource Manager.

## Example Bicep Template

Here’s a simple Bicep file that deploys an Azure Storage account. Notice the concise syntax and built-in property types:

```
@description('Specifies the location for resources.')
param location string = 'eastus'


resource storageAccount 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: 'examplestorageacct'
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Premium_LRS'
  }
}


output storageAccountName string = storageAccount.name
```

## Installing the Bicep CLI

You need the Azure CLI and the Bicep CLI to compile and deploy Bicep files.

### Prerequisites

| Requirement            | Minimum Version | Link                                                        |
| ---------------------- | --------------- | ----------------------------------------------------------- |
| Azure CLI              | 2.20.0          | [Azure CLI](https://docs.microsoft.com/cli/azure/)          |
| Visual Studio Code\\\* | Latest          | [VS Code](https://code.visualstudio.com/) + Bicep extension |

\*VS Code is optional but recommended for IntelliSense and snippets.

> [!important]
> **Note**
>
> Verify your Azure CLI version with `az --version` before installing Bicep.

### Windows (PowerShell)

```
# Install or update Azure CLI if needed
Set-ExecutionPolicy Bypass -Scope Process -Force
iwr -useb https://aka.ms/installbicep | iex
```

### Linux (Bash)

```
# Download the latest Bicep binary
curl -Lo bicep https://github.com/Azure/bicep/releases/latest/download/bicep-linux-x64
chmod +x ./bicep
sudo mv ./bicep /usr/local/bin/bicep
```

### macOS (Homebrew)

```
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


# Install Bicep
brew tap azure/bicep
brew install bicep
```

## Bicep File Structure

A typical Bicep file is organized into four sections:

- **Parameters**: External inputs to customize deployments.
- **Variables**: Reusable values within the template.
- **Resources**: Declarations of Azure resources to create or update.
- **Outputs**: Values returned after deployment.

## Authoring Best Practices

Follow these guidelines to keep your Bicep code clean and maintainable:

- Use **parameters** and **variables** for configurable values.
- Break complex deployments into **modules**.
- Employ **resource loops** for bulk creation.
- Adopt consistent **naming conventions**.

![The image is a guide titled "Authoring With Bicep" that provides four tips for effective scripting in Azure Bicep: using parameters and variables effectively, organizing code, leveraging modules, and using resource loops.](https://kodekloud.com/kk-media/image/upload/v1752867731/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction-to-Bicep/authoring-with-bicep-scripting-guide.jpg)

## Advanced Scripting Tips

- Run `bicep build --stdout` or `bicep build --file` to validate logic before deployment.
- Use **output** values to expose resource IDs and connection strings.
- Explicitly set **dependsOn** to control resource ordering.
- Manage secrets securely with **Azure Key Vault**.

> [!important]
> **Warning**
>
> Avoid hard-coding credentials or secrets directly in Bicep templates. Always reference Key Vault or Azure Managed Identities.

![The image provides tips for effective scripting in Azure Bicep, including following naming conventions, validating templates, implementing output values, handling dependencies, and using secure data handling.](https://kodekloud.com/kk-media/image/upload/v1752867732/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction-to-Bicep/azure-bicep-scripting-tips-guide.jpg)

## Deploying with Azure CLI

You can compile and deploy your Bicep files in one step using the Azure CLI:

1.  Ensure Azure CLI (with Bicep) is installed.
2.  Sign in to your Azure account (`az login`).
3.  Run `az deployment group create` against a resource group or subscription.

![The image outlines the process of deploying a Bicep file using Azure CLI in five steps: installing Azure CLI, installing Bicep CLI, logging into Azure, compiling the Bicep file, and deploying the Bicep file.](https://kodekloud.com/kk-media/image/upload/v1752867733/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction-to-Bicep/bicep-deployment-azure-cli-steps.jpg)

### Example Deployment

```
# Create a resource group
az group create --name myResourceGroup --location eastus


# Deploy the Bicep template
az deployment group create \
  --resource-group myResourceGroup \
  --template-file main.bicep \
  --parameters storageAccountType=Premium_LRS
```

## Visual Studio Code Integration

With the Bicep extension in VS Code, you get:

- **IntelliSense** for resource types and properties.
- Prebuilt **code snippets** for common patterns.
- **In-editor deployments** via Azure CLI commands.

## Deploying in Azure Cloud Shell

You can also author and deploy Bicep files directly in Cloud Shell:

1.  Upload your `.bicep` file to Cloud Shell.
2.  Run the same Azure CLI commands:

```
az group create --name ExampleGroup --location eastus
az deployment group create \
  --resource-group ExampleGroup \
  --template-file azureddeploy.bicep \
  --parameters storageAccountType=Standard_GRS
```

## Azure Automanage Machine Configuration

Azure Automanage Machine Configuration automates VM management by continuously applying best practices and security guidelines. It leverages Desired State Configuration (DSC) to ensure your virtual machines always conform to the specified configuration.

![The image is a slide titled "Azure Automanage Machine Configuration Extension" with two sections labeled "01 Best Practices" and "02 Security Guidelines."](https://kodekloud.com/kk-media/image/upload/v1752867734/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Introduction-to-Bicep/azure-automanage-machine-configuration-slide.jpg)

## Links and References

- [Azure Bicep Documentation](https://docs.microsoft.com/azure/azure-resource-manager/bicep/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)
- [Azure Bicep GitHub Repository](https://github.com/Azure/bicep)
- [Visual Studio Code](https://code.visualstudio.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/75eafabe-1911-4a4e-a7fb-277f6aa6e2d0/lesson/cb59c871-c341-4dbd-94f6-02ef1f601474)**
>
> Watch video content
