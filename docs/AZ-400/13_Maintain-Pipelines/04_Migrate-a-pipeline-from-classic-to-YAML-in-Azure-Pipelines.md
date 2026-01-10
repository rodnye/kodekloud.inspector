# Migrate a pipeline from classic to YAML in Azure Pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Maintain-Pipelines/Migrate-a-pipeline-from-classic-to-YAML-in-Azure-Pipelines)

---

## Table of Contents

- Migrate a pipeline from classic to YAML in Azure Pipelines
  - Why Use YAML Pipelines?
  - Pre-Migration Checklist
  - Migration Process
  - Challenges and Solutions
  - Best Practices
  - References
  - Watch Video
    - 1. Export or View Generated YAML
    - 2. Create a New YAML Pipeline

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Maintain Pipelines

# Migrate a pipeline from classic to YAML in Azure Pipelines

Migrating your Azure Pipelines definitions from the Classic Editor to YAML unlocks version control, peer reviews, and repeatable workflows. By storing the pipeline as code alongside your application, you gain granular change history, easier rollbacks, and seamless integration with GitHub or Azure Repos.

## Why Use YAML Pipelines?

- Version your pipeline in source control
- Enable pull-request reviews for CI/CD changes
- Reuse templates and parameters across projects
- Support complex, multi-stage workflows
- Align with DevSecOps best practices

## Pre-Migration Checklist

Before you begin, review and document every aspect of your existing Classic Pipeline:

![The image is a "Pre-Migration Checklist" with four steps: reviewing existing pipeline features, identifying scripts and environment variables, checking for unsupported tasks, and planning for testing the YAML pipeline. There's also an icon of a checklist and pencil.](https://kodekloud.com/kk-media/image/upload/v1752868134/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Migrate-a-pipeline-from-classic-to-YAML-in-Azure-Pipelines/pre-migration-checklist-four-steps.jpg)

| Task                                    | Description                                                                              |
| --------------------------------------- | ---------------------------------------------------------------------------------------- |
| Review pipeline steps                   | Inventory GUI tasks, environment variables, triggers, and deployment steps               |
| Identify inline scripts & variables     | Find PowerShell/Bash blocks and secret/environment variable usage                        |
| Check for unsupported marketplace tasks | Note any tasks not available in YAML and research alternatives or extensions             |
| Plan testing strategy                   | Define a branch or isolated project to validate your new YAML pipeline before production |

## Migration Process

Follow these steps to convert a Classic pipeline stage into YAML.

### 1\. Export or View Generated YAML

In the Classic pipeline, locate the Terraform deployment step and view its YAML equivalent. For example:

```
variables:
  terraformstoragegroup: 'terraform'
  terraformstorageaccount: 'terraform'
steps:
  - task: AzureCLI@1
    displayName: 'Azure CLI to deploy required Azure resources'
    inputs:
      azureSubscription: 'MCT'
      scriptLocation: 'inlineScript'
      inlineScript: |
        # Create Azure resource group
        az group create --location westus --name $(terraformstoragegroup)


        # Create Azure storage account
        az storage account create --name $(terraformstorageaccount) \
          --resource-group $(terraformstoragegroup) \
          --location westus \
          --sku Standard_LRS
```

### 2\. Create a New YAML Pipeline

Copy the generated snippet into a new `azure-pipelines.yml` file. Customize triggers, variables, and steps to fit your environment:

```
trigger:
  branches:
    include:
      - main


pool:
  vmImage: 'ubuntu-latest'


variables:
  terraformstoragerg: 'terraformrg'
  terraformstorageaccount: 'terraformstorage09834d9'


steps:
  - task: AzureCLI@1
    displayName: 'Azure CLI to deploy required Azure resources'
    inputs:
      azureSubscription: 'MCT'
      scriptLocation: 'inlineScript'
      inlineScript: |
        # Create resource group
        az group create --location westus --name $(terraformstoragerg)


        # Create storage account
        az storage account create --name $(terraformstorageaccount) \
          --resource-group $(terraformstoragerg) \
          --location westus \
          --sku Standard_LRS


        # Create storage container
        az storage container create --name terraform --account-name $(terraformstorageaccount)


        # Retrieve storage account keys
        az storage account keys list \
          --resource-group $(terraformstoragerg) \
          --account-name $(terraformstorageaccount)
```

> [!important]
> **Note**
>
> Use the **Validate** feature in the Azure Pipelines UI to catch syntax errors before running the pipeline.

![The image illustrates a step-by-step migration process for validating and testing a YAML pipeline, showing a menu selection for "Validate" and a confirmation that the pipeline is valid, followed by a "Run" option.](https://kodekloud.com/kk-media/image/upload/v1752868136/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Migrate-a-pipeline-from-classic-to-YAML-in-Azure-Pipelines/yaml-pipeline-migration-validation-testing.jpg)

Iterate on your YAML until it passes validation and your test runs succeed. Repeat for each Classic task to fully migrate your build or release pipeline.

## Challenges and Solutions

Migrating real-world pipelines often surfaces these challenges:

| Challenge                   | Solution                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Secure secret management    | Use Azure DevOps Library, Variable Groups, or [Azure Key Vault](https://docs.microsoft.com/azure/key-vault/) |
| Unsupported or custom tasks | Explore the [Azure DevOps Marketplace](https://marketplace.visualstudio.com/) for community extensions       |
| Complex multi-stage flows   | Leverage YAML templates, parameters, and `extends` syntax for modular pipelines                              |

![The image outlines common challenges and solutions in software development, including managing secrets, handling complex deployments, ensuring CI/CD best practices, and dealing with unsupported tasks.](https://kodekloud.com/kk-media/image/upload/v1752868137/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Migrate-a-pipeline-from-classic-to-YAML-in-Azure-Pipelines/software-development-challenges-solutions.jpg)

## Best Practices

- Review and replicate every Classic step in YAML
- Validate and test in an isolated branch before merging
- Use templates and reusable modules for consistency
- Document pipeline changes via pull requests

![The image is a diagram titled "Best Practices," highlighting two key points: reviewing steps in migrating to YAML and emphasizing the importance of testing and iteration.](https://kodekloud.com/kk-media/image/upload/v1752868139/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Migrate-a-pipeline-from-classic-to-YAML-in-Azure-Pipelines/best-practices-yaml-migration-diagram.jpg)

## References

- [Azure Pipelines documentation](https://docs.microsoft.com/azure/devops/pipelines?view=azure-devops)
- [YAML schema for Azure Pipelines](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)
- [Azure DevOps Developer Community](https://developercommunity.visualstudio.com/spaces/21/index.html)
- [azure-devops-docs on GitHub](https://github.com/MicrosoftDocs/azure-devops-docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/c3626b7f-1518-4df3-8499-73782a79b6fe/lesson/4293c949-cd09-4004-93ea-5ccd5bc55dbe)**
>
> Watch video content
