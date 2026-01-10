# Using Service Connections in Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Strategy-for-Managing-Sensitive-Information-in-Automation/Using-Service-Connections-in-Pipeline)

---

## Table of Contents

- Using Service Connections in Pipeline
  - What Are Service Connections?
  - Benefits of Service Connections
  - Types of Service Connections
  - Creating a Service Connection
  - Setting Up an Azure Resource Manager Connection
  - Setting Up a GitHub Connection
  - Using Service Connections in Pipelines
  - Best Practices for Managing Service Connections
  - Links and References
  - Watch Video
    - Docker Connection
    - Kubernetes Connection
    - Deploying an ARM Template

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Strategy for Managing Sensitive Information in Automation

# Using Service Connections in Pipeline

Service connections in Azure DevOps enable your CI/CD pipelines to securely authenticate and interact with external systems—such as Azure subscriptions, GitHub repos, and container registries—without exposing secrets in your code. Mastering service connections is essential for both the AZ-400 exam and practical DevOps workflows.

![The image illustrates the flow of service connections in Azure Pipelines, showing the sequence from Azure Pipeline to Azure Resource Manager Service Connection, Service Principal, and Resource Group, with a role associated with the Service Principal.](https://kodekloud.com/kk-media/image/upload/v1752867980/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/azure-pipelines-service-connections-flow.jpg)

> [!important]
> **Note**
>
> Service connections act like secure bridges, letting your pipelines authenticate against external services without hard-coding credentials.

## What Are Service Connections?

Service connections are configuration entries in Azure DevOps that store authentication details for external resources. Instead of embedding passwords, tokens, or keys in your scripts, you reference a service connection in your pipeline YAML or Classic definitions, and Azure DevOps handles the secure login.

![The image is an introduction to service connections in Azure Pipelines, showing a diagram with "Credentials," "Authentication Details," and "Service Connections" linked to "External services," along with the Azure DevOps logo.](https://kodekloud.com/kk-media/image/upload/v1752867981/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/azure-pipelines-service-connections-diagram.jpg)

## Benefits of Service Connections

- **Security**: Credentials are encrypted and stored centrally.
- **Maintainability**: Rotate or update credentials in one place.
- **Least Privilege**: Grant each connection only the permissions it needs.
- **Scalability**: Reuse connections across multiple pipelines and projects.

## Types of Service Connections

| Connection Type              | Use Case                                      | Example                               |
| ---------------------------- | --------------------------------------------- | ------------------------------------- |
| Azure Resource Manager (ARM) | Automate Azure resource deployments           | Deploy ARM templates via `AzureCLI@2` |
| GitHub                       | Pull code or trigger builds from GitHub repos | Clone with `checkout: self`           |
| Docker Registry              | Push and pull container images                | `docker push myrepo/myimage:latest`   |
| Kubernetes                   | Deploy to Kubernetes using kubeconfig or SA   | `kubectl apply -f deployment.yaml`    |
| Other (Bitbucket, Jenkins)   | Integrate with additional DevOps services     | Varies by service                     |

### Docker Connection

Enables pipelines to authenticate with Docker Hub or private registries for pulling base images and pushing built artifacts.

![The image describes a type of service connection, specifically Docker, which connects to Docker Hub or private Docker registries to pull and push container images.](https://kodekloud.com/kk-media/image/upload/v1752867982/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/docker-service-connection-hub-registries.jpg)

### Kubernetes Connection

Lets you deploy applications to Kubernetes clusters by providing a kubeconfig file or a service account token.

![The image describes a type of service connection involving Kubernetes, highlighting its ability to enable deployments to Kubernetes clusters using kubeconfig files or service accounts.](https://kodekloud.com/kk-media/image/upload/v1752867983/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/kubernetes-service-connection-deployments.jpg)

Azure DevOps supports many more connection types—always pick the one best aligned with your service.

## Creating a Service Connection

1.  In Azure DevOps, select the **gear icon** (Project Settings) in the lower-left corner.
2.  Under **Pipelines**, click **Service Connections**.
3.  Hit **New Service Connection** and choose the desired type.

![The image is a step in a guide titled "Creating a Service Connection," instructing users to go to the project settings in their Azure DevOps project.](https://kodekloud.com/kk-media/image/upload/v1752867984/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/creating-service-connection-azure-devops.jpg)

4.  Complete the authentication form with credentials or OAuth details.

![The image shows a step in creating a service connection, specifically providing details like authentication method and credentials, with a form for a new NuGet service connection.](https://kodekloud.com/kk-media/image/upload/v1752867986/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/nuget-service-connection-authentication-form.jpg)

5.  Test the connection and save it under a clear, descriptive name for use in your pipeline definitions.

## Setting Up an Azure Resource Manager Connection

1.  Select **Azure Resource Manager** as the connection type.
2.  Choose **Service Principal** authentication to enforce least-privilege access.
3.  Enter your Service Principal ID, Key, and Tenant ID from Azure AD.

![The image shows a configuration screen for setting up an Azure Resource Manager (ARM) connection, with options for selecting an authentication method such as service principal or workload identity federation.](https://kodekloud.com/kk-media/image/upload/v1752867987/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/azure-arm-connection-configuration-screen.jpg)

4.  Pick the target Azure subscription and optionally scope down to a specific resource group.

![The image shows a step in configuring an Azure Resource Manager (ARM) connection, specifically selecting the Azure subscription and optionally the resource group. It includes a screenshot of the "New Azure service connection" dialog box with options for scope level and fields for service connection name and description.](https://kodekloud.com/kk-media/image/upload/v1752867988/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/azure-arm-connection-configuration-screenshot.jpg)

5.  Confirm that the Service Principal has only the permissions required for your deployment tasks.

## Setting Up a GitHub Connection

- Choose **GitHub** from the service connection list.
- Authenticate via **OAuth** or **Personal Access Token (PAT)**:
  - OAuth automatically grants permission through a consent screen.
  - PAT lets you configure fine-grained scopes—create it in GitHub and paste the token into Azure DevOps.
- Test and save the integration under a memorable name.

## Using Service Connections in Pipelines

Reference service connections in YAML or Classic pipelines. Below is an example using the Azure CLI task in YAML:

```
jobs:
- job: deploy
  pool:
    vmImage: 'ubuntu-latest'
  steps:
    - task: AzureCLI@2
      inputs:
        azureSubscription: 'My-ARM-Service-Connection'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          az login --service-principal \
                   -u $(clientId) \
                   -p $(clientSecret) \
                   --tenant $(tenantId)
```

### Deploying an ARM Template

```
trigger:
  branches:
    include:
      - main
pool:
  vmImage: 'ubuntu-latest'
steps:
  - task: AzureResourceManagerTemplateDeployment@3
    inputs:
      azureSubscription: 'ARM-Service-Connection'
      resourceGroupName: 'myResourceGroup'
      location: 'West US'
      templateLocation: 'Linked artifact'
      csmFile: 'templates/template.json'
      csmParametersFile: 'templates/parameters.json'
```

This task uses your ARM service connection to deploy resources defined in your template and parameters files without exposing credentials.

## Best Practices for Managing Service Connections

1.  Audit connections periodically and remove unused entries.
2.  Follow the **least privilege** principle—grant only necessary permissions.
3.  Rotate credentials on a regular schedule.
4.  Document each connection’s purpose and scope for team transparency.

![The image outlines best practices for managing service connections, including regular audits, least privilege principle, documentation, and rotation of credentials. It features a central icon with a thumbs-up and ribbon, surrounded by these four practices.](https://kodekloud.com/kk-media/image/upload/v1752867989/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Using-Service-Connections-in-Pipeline/service-connections-best-practices-diagram.jpg)

> [!important]
> **Warning**
>
> Failing to rotate or audit credentials may lead to unauthorized access and compliance risks. Schedule regular reviews.

## Links and References

- [Azure Pipelines Documentation](https://learn.microsoft.com/azure/devops/pipelines/)
- [AZ-400 Exam Guide](https://learn.microsoft.com/certifications/exams/az-400)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/2f8974b7-9aa9-46b8-a562-d7ed568269af/lesson/67bffc6c-030b-444f-8f8e-9ecfd23b49d4)**
>
> Watch video content
