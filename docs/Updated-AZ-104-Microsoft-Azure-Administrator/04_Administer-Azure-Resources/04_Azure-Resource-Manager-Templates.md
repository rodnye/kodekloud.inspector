# Azure Resource Manager Templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Resources/Azure-Resource-Manager-Templates)

---

## Table of Contents

- Azure Resource Manager Templates
  - Overview
  - Basic Structure
  - Benefits of ARM Templates
  - Deployment Approaches
  - Authoring ARM Templates
  - Next Steps
  - Watch Video
    - 1. Single Template for Multiple Resources
    - 2. Linked Templates (Nested Deployment)
    - 3. Individual Templates per Resource Group

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Resources

# Azure Resource Manager Templates

Azure Resource Manager (ARM) templates offer a declarative method for deploying and managing Azure resources. Written in JSON, these templates follow a defined structure that we'll explore in detail below.

## Overview

ARM templates let you specify the desired resources without dictating the deployment procedure—similar to writing HTML to create content while letting the browser handle rendering. By defining your infrastructure declaratively, Azure Resource Manager automatically creates and configures your resources, ensuring consistency and reducing human error.

## Basic Structure

Below is an example of a basic ARM template structure:

```
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {},
  "functions": [],
  "variables": {},
  "resources": [],
  "outputs": {}
}
```

In this template, you specify parameters, functions, variables, resources, and outputs. Parameters are particularly useful for creating dynamic, reusable templates rather than hard-coding values.

## Benefits of ARM Templates

- **Declarative Automation**: List the resources to be created, and let Azure handle the deployment.
- **Consistency and Reusability**: Ensure each environment is set up consistently with standardized templates.
- **Reduced Human Error**: Automated deployments decrease the likelihood of manual mistakes.
- **Modular Design**: Link smaller templates to a parent template to manage and deploy complex environments more efficiently.

> [!important]
> **Tip**
>
> Consider using parameters and variables to enhance template reusability and simplify management.

## Deployment Approaches

ARM templates can be structured in several ways to meet different deployment requirements:

### 1\. Single Template for Multiple Resources

Deploy a multi-tier application—for instance, an app service, a virtual machine, and a database—by defining all components within a single ARM template. This approach allows internal referencing, such as linking a SQL database to an app service.

### 2\. Linked Templates (Nested Deployment)

Using linked or nested templates is another effective strategy. In this approach, you might combine:

- A main template that orchestrates the overall deployment.
- A nested template for deploying VMs.
- A nested template for deploying App Services.
- A nested template for deploying SQL databases.

This modular design simplifies managing complex deployments and ensures that dependencies are created in the correct order.

![The image illustrates an ARM Template Design, showing a flow from a main template to nested templates for a Virtual Machine, App Service, and SQL Database.](https://kodekloud.com/kk-media/image/upload/v1752884368/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Azure-Resource-Manager-Templates/arm-template-design-virtual-machine-app-service-sql-database.jpg)

### 3\. Individual Templates per Resource Group

For scenarios where resources are grouped into different Resource Groups by type or project, you can maintain a separate ARM template for each resource group. This approach is best for logically separated deployments, while the linked template approach is more efficient when managing a large number of interconnected resources.

> [!important]
> **Deployment Strategy**
>
> For larger deployments, the linked (nested) template approach is generally more efficient, whereas a single comprehensive template works well for one or two resources.

## Authoring ARM Templates

For a streamlined ARM template authoring experience, use the Azure Resource Manager Tools extension in [Visual Studio Code](https://code.visualstudio.com/). This extension offers features such as syntax highlighting, validation, and deployment assistance to make writing ARM templates easier and more efficient.

## Next Steps

In the following section, we'll dive deeper into each part of an ARM template—parameters, resources, variables, functions, and outputs. This detailed explanation will provide you with a solid foundation for authoring ARM templates and managing your deployments effectively. Although not required for certification exams, understanding this structure is invaluable for automating and maintaining your Azure environments.

Let's now explore the detailed structure of ARM templates.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/7f421132-242f-4d10-85e5-6673b7307d12/lesson/366b6cd1-dd53-4350-bc7b-41320a321c77)**
>
> Watch video content
