# Infrastructure as Code - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Resource-Deployment-Tools/Infrastructure-as-Code)

---

## Table of Contents

- Infrastructure as Code
  - Azure IaC Components
  - Benefits of Using Infrastructure as Code
  - ARM Templates
  - Azure Bicep
  - Wrapping Up
  - Watch Video
    - Key Features of ARM Templates
    - Benefits of ARM Templates
    - Key Features of Bicep
    - Benefits of Bicep
    - Example Bicep Code

---

## Content

AZ900: Microsoft Azure Fundamentals

Resource Deployment Tools

# Infrastructure as Code

Infrastructure as Code (IaC) is a fundamental DevOps practice that enables the automated provisioning and management of cloud resources using machine-readable definition files. Bena Innovation currently deploys resources manually and is working to eliminate inconsistencies across its cloud environments. By adopting IaC, every environment can be deployed identically and automatically, eliminating manual errors and speeding up deployments.

![The image highlights challenges in ensuring consistent deployments, emphasizing the need to avoid manual deployment and maintain consistency across cloud environments.](https://kodekloud.com/kk-media/image/upload/v1752868491/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/consistent-deployments-cloud-challenges.jpg)

IaC allows you to define your infrastructure in configuration files rather than interactively via the Azure Portal or ad hoc scripts. Previously, selections were made through manual configurations and single-resource deployments, increasing the risk of errors when scaling to multiple or complex resources. With IaC, configuration files ensure consistent and reliable deployments every time.

![The image illustrates the concept of "Infrastructure as Code" with a flowchart showing the cycle of managing, provisioning, and defining resources using machine-readable files in a DevOps context.](https://kodekloud.com/kk-media/image/upload/v1752868492/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/infrastructure-as-code-flowchart.jpg)

## Azure IaC Components

In Azure, several tools support the implementation of Infrastructure as Code:

1.  **Azure Resource Manager (ARM) Templates**  
    These are JSON files that define the resources you intend to deploy. ARM, the underlying Azure management layer, reads these templates and creates, updates, or manages the specified resources.
2.  **Azure Bicep**  
    Bicep is a domain-specific language that simplifies the declaration of Azure resources. It provides more readable and concise syntax compared to ARM templates while still compiling down to standard ARM JSON.
3.  **Terraform**  
    Developed by HashiCorp, Terraform uses the HashiCorp Configuration Language (HCL) to define infrastructure. Unlike ARM templates and Bicep which are specific to Azure, Terraform can manage environments across AWS, GCP, and other providers.

![The image lists three tools for Infrastructure as Code in Azure: Azure Resource Manager Templates, Azure Bicep, and Terraform, each represented with an icon and numbered from 01 to 03.](https://kodekloud.com/kk-media/image/upload/v1752868493/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/infrastructure-as-code-azure-tools.jpg)

## Benefits of Using Infrastructure as Code

Implementing IaC offers numerous advantages:

- **Speed and Simplicity:** Deploy and manage infrastructure quickly with minimal manual intervention.
- **Consistency and Accuracy:** Automated deployments ensure environments remain uniform and reduce errors tied to manual configurations.
- **Reusability and Scalability:** Template-based deployments are easily replicated across regions or subscriptions. For instance, deploying App Services in East US and later in West Europe only requires a change in the region parameter.

![The image outlines the benefits of Infrastructure as Code, highlighting speed and simplicity, consistency and accuracy, and reusability and scalability.](https://kodekloud.com/kk-media/image/upload/v1752868494/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/infrastructure-as-code-benefits-outline.jpg)

Common use cases for IaC include automated environment setups, multi-cloud management, and the implementation of robust DevOps practices that ensure secure, consistent, and repeatable deployments.

## ARM Templates

ARM templates are JSON files that declare the resources required for your cloud applications. These templates are submitted to Azure Resource Manager, which interprets the schema and deploys resources such as storage accounts, virtual machines, databases, and load balancers.

![The image illustrates the concept of ARM Templates, showing a flow from a cloud application to a wide variety of resources, with icons representing JSON, Azure, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752868495/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/arm-templates-cloud-resources-flow.jpg)

### Key Features of ARM Templates

- **Declarative Syntax:** Describe what resources are needed without outlining the creation process.
- **Idempotency:** Repeated deployments produce consistent results, ensuring operational reliability.
- **Modularity:** Templates can be composed of reusable modules for specific resource types (e.g., virtual machines, load balancers, databases).

![The image outlines the key features of ARM Templates: Declarative Syntax, Idempotency, and Modularity, each represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752868495/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/arm-templates-features-diagram.jpg)

### Benefits of ARM Templates

- **Automation and Scalability:** Simplifies the deployment of complex environments.
- **Consistency:** Ensures that all environments are uniformly deployed.
- **Source Control Integration:** Track changes easily by integrating templates with version control systems like GitHub or Azure DevOps, and leverage them within CI/CD pipelines.

![The image shows four use cases for ARM templates: Development, Testing, Staging, and Production, each represented by a colored box with an icon.](https://kodekloud.com/kk-media/image/upload/v1752868496/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/arm-templates-use-cases-diagram.jpg)

An ARM template consists of a schema, a content version, parameters, functions, variables, and a list of resources. For example, an ARM template that creates a storage account may look like this:

```
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {},
  "functions": [],
  "variables": {},
  "resources": [
    {
      "name": "deploystorage",
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2019-06-01",
      "location": "[resourceGroup().location]",
      "kind": "StorageV2",
      "sku": {
        "name": "Premium_LRS",
        "tier": "Premium"
      }
    }
  ],
  "outputs": {}
}
```

> [!important]
> **Note**
>
> This configuration can be made more dynamic by parameterizing values such as the storage account name, which improves reusability across multiple deployments.

## Azure Bicep

Azure Bicep offers a simplified, intuitive syntax for deploying Azure resources. It abstracts much of the complexity found in ARM templates while still compiling down to the underlying ARM JSON, offering both ease-of-use and the robustness of ARM.

![The image is a diagram illustrating the Bicep workflow, showing a progression from "Domain-Specific Language" to "Azure Resources" and ending with "Simplified Authoring."](https://kodekloud.com/kk-media/image/upload/v1752868497/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/bicep-workflow-diagram-azure-resources.jpg)

### Key Features of Bicep

- **Simplified Syntax:** More concise and readable code compared to the verbose JSON of ARM templates.
- **First-Class Tooling:** Seamlessly integrated with Visual Studio Code and the Azure CLI for an enhanced development experience.
- **No State Files:** Unlike Terraform, Bicep does not require state files and directly interacts with Azure Resource Manager for deployments.

![The image lists key features of Bicep, highlighting simplified syntax, first-class tooling, and no state or state files.](https://kodekloud.com/kk-media/image/upload/v1752868499/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/bicep-key-features-syntax-tooling.jpg)

In contrast, Terraform uses state files to track resource deployments. Bicep, however, eliminates potential state management complications by querying the Azure Resource Manager directly.

![The image compares key features of Terraform and Bicep, highlighting Terraform's state management and file dependency, and Bicep's lack of state management and direct integration with Azure Resource Manager.](https://kodekloud.com/kk-media/image/upload/v1752868500/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/terraform-vs-bicep-features-comparison.jpg)

### Benefits of Bicep

- **Easier to Understand:** Its concise syntax is accessible to new users and promotes faster learning.
- **Less Boilerplate:** Results in leaner code that is more maintainable over time.
- **Transparent Abstraction:** Automatically compiles to ARM template JSON while keeping the underlying operations hidden.
- **Strong Typing and Validation:** Enhances development with real-time error checking and IntelliSense support in popular editors.

![The image lists the benefits of Bicep, highlighting four points: easier to understand, less boilerplate code, transparent abstraction, and strong typing and validation.](https://kodekloud.com/kk-media/image/upload/v1752868501/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Infrastructure-as-Code/bicep-benefits-easier-understand.jpg)

Bicep is ideal for developers and cloud engineers who wish to streamline the provisioning and management of Azure resources.

### Example Bicep Code

Below is an example Bicep file that deploys a storage account. Notice the simplicity compared to the equivalent ARM JSON template:

```
@description('The location in which the Azure Storage resources should be deployed.')
param location string = resourceGroup().location

param storageAccountName string

resource storageaccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}
```

This code defines parameters for the storage account name and location, and then specifies the resource properties needed to deploy the storage account.

## Wrapping Up

In this lesson, we explored the fundamentals of Infrastructure as Code and its role in automating resource deployment in Azure. We covered key Azure tools like ARM templates and Azure Bicep, discussed their benefits, and reviewed practical code examples. These tools not only enhance consistency and reduce manual errors but also integrate seamlessly with CI/CD workflows through source control.

> [!important]
> **Next Steps**
>
> With a strong understanding of ARM templates and Bicep, you are now well-equipped to automate resource deployments in Azure. Next, explore effective monitoring techniques to manage and optimize your deployed resources.

For further readings and documentation, be sure to check out [Azure Documentation](https://docs.microsoft.com/azure/) and [Azure Resource Manager Overview](https://docs.microsoft.com/azure/azure-resource-manager/management/overview).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/3a2acdf1-9246-4605-93a4-e0b3d2aa8139/lesson/f622f09c-86f2-41a1-b9a7-15188a843134)**
>
> Watch video content
