# Tools for Interacting with Azure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Resource-Deployment-Tools/Tools-for-Interacting-with-Azure)

---

## Table of Contents

- Tools for Interacting with Azure
  - Overview of Azure Interaction Tools
  - Azure Portal
  - Azure PowerShell
  - Azure Cloud Shell
  - Azure CLI
  - Choosing the Right Tool
  - Best Practices
  - Demonstration of Tools
  - Conclusion
  - Watch Video
    - Installing Azure PowerShell
    - Installing Azure CLI on macOS
    - Logging into Azure with PowerShell
    - Creating a Resource Group and Storage Account with Azure PowerShell
    - Logging into Azure with Azure CLI
    - Using Cloud Shell

---

## Content

AZ900: Microsoft Azure Fundamentals

Resource Deployment Tools

# Tools for Interacting with Azure

Azure offers a variety of tools to manage and deploy your cloud resources. While many users prefer the intuitive graphical interface of the Azure Portal, others enjoy automating tasks through scripting using Azure PowerShell, Azure Cloud Shell, or Azure CLI. This guide covers these primary interaction methods, best practices, and code examples to help you efficiently manage your Azure environment.

## Overview of Azure Interaction Tools

Azure provides multiple ways to interact with its resources:

1.  **Azure Portal** – A web-based graphical interface.
2.  **Azure PowerShell** – A module with cmdlets to manage Azure resources via the command line.
3.  **Azure Cloud Shell** – A browser-accessible shell pre-configured with the necessary tools.
4.  **Azure CLI** – A cross-platform command-line tool ideal for automation and scripting.

In addition to these, advanced users can utilize software development kits (SDKs) and native REST APIs. Beginners should focus on the four primary methods mentioned above.

![The image lists four tools for interacting with Azure: Azure Portal, Azure PowerShell, Azure Cloud Shell, and Azure CLI.](https://kodekloud.com/kk-media/image/upload/v1752868502/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Tools-for-Interacting-with-Azure/azure-interaction-tools-list.jpg)

## Azure Portal

The Azure Portal is a user-friendly, web-based interface for managing Azure services. It enables you to effortlessly create, manage, and monitor a wide range of resources—from simple web apps to complex cloud deployments.

![The image shows a browser window with the URL "https://portal.azure.com" and three icons labeled "Create," "Manage," and "Monitor," representing features of the Azure Portal.](https://kodekloud.com/kk-media/image/upload/v1752868503/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Tools-for-Interacting-with-Azure/azure-portal-browser-window-icons.jpg)

With the Azure Portal, you can quickly deploy or scale resources without needing to write any scripts.

## Azure PowerShell

Azure PowerShell provides a robust set of cmdlets that allow you to manage your Azure resources directly from the command line. It is especially useful for automating repetitive or complex tasks.

Below is an example of creating a Storage Account using Azure PowerShell:

```
New-AzStorageAccount `
  -ResourceGroupName MyResourceGroup `
  -Name mystorageaccount `
  -Location westus `
  -SkuName Standard_GRS
```

> [!important]
> **Note**
>
> This command creates a new storage account and is ideal for repeated deployments.

## Azure Cloud Shell

Azure Cloud Shell is a browser-accessible shell that comes pre-configured with essential Azure tools. It eliminates the need for local installations, providing a ready-to-use environment for managing your resources.

![The image is a flowchart titled "Azure Cloud Shell," showing a sequence from "Command-Line Experience" to "Browser Accessible Shell" and then to "Azure Management Task."](https://kodekloud.com/kk-media/image/upload/v1752868504/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Tools-for-Interacting-with-Azure/azure-cloud-shell-flowchart.jpg)

Cloud Shell is integrated with the Azure Portal, making it convenient for managing tasks on-the-go.

## Azure CLI

Azure CLI is a versatile command-line tool that functions across Linux, Windows, and macOS. It is particularly popular among users with a Linux background or those who prefer a bash-like environment, though its cross-platform support makes it an excellent choice for any operating system.

Here is an example of creating a Storage Account using Azure CLI:

```
az storage account create \
  -n mystorageaccount \
  -g MyResourceGroup \
  -l westus \
  --sku Standard_LRS
```

![The image illustrates the Azure CLI, showing a connection between a command-line experience and Azure resources, with a Linux user depicted on the side.](https://kodekloud.com/kk-media/image/upload/v1752868505/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Tools-for-Interacting-with-Azure/azure-cli-linux-user-connection.jpg)

## Choosing the Right Tool

The best tool for interacting with Azure depends on your workflow, operating system, and preference for a graphical interface or command-line automation. Consider the following:

- **Graphical vs. Command-Line:** The Azure Portal provides an excellent visual experience for individual or simple deployments. For deploying multiple Virtual Machines or executing complex tasks, automation with PowerShell or Azure CLI is more effective.
- **Operating System Considerations:** While both Azure PowerShell and Azure CLI work on Linux, Windows, and macOS, users comfortable with bash will likely prefer Azure CLI, whereas those familiar with Windows might lean towards PowerShell.

![The image is a graphic titled "Interacting With Azure – Choosing Your Tool," featuring three sections: Workflow, Operating System, and Graphical vs Command-Line Interface. Each section is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752868507/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Tools-for-Interacting-with-Azure/interacting-with-azure-tool-graphic.jpg)

> [!important]
> **Tip**
>
> For quick demonstrations, the Azure Portal is ideal. When dealing with complex scenarios or repetitive tasks, consider using scripting with PowerShell, Azure CLI, or other Infrastructure as Code tools like Bicep or ARM templates.

## Best Practices

- **Azure Portal:** Ideal for key tasks and visual monitoring.
- **Azure PowerShell and Azure CLI:** Best used for automating and streamlining deployments.
- **Azure Cloud Shell:** Convenient for on-the-go management since it requires no local installation; it automatically configures Azure CLI and PowerShell and links to a persistent storage account.

## Demonstration of Tools

### Installing Azure PowerShell

Before you begin, ensure you have PowerShell installed. Windows usually comes with it pre-installed, while macOS and Linux users need to install PowerShell manually. To install the Azure PowerShell module, run:

```
Install-Module -Name Az -Repository PSGallery -Force
```

### Installing Azure CLI on macOS

MacOS users can install Azure CLI using Homebrew:

```
brew update && brew install azure-cli
```

For installation on Windows and Linux, refer to the [official Azure CLI documentation](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

### Logging into Azure with PowerShell

Open PowerShell (using the command-line tool "pwsh") and run the following command to log in via device authentication:

```
Login-AzAccount -UseDeviceAuthentication
```

The console will prompt you similar to:

```
PowerShell 7.4.1
PS /Users/rithinskar/> Login-AzAccount -UseDeviceAuthentication
Login to Azure
To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code GLLAB36TF to authenticate.
```

Open your browser, navigate to https://aka.ms/device-login, and enter the provided code. This method is particularly useful when working in a Linux terminal without an integrated web browser.

Upon successful authentication, your subscription details will be displayed:

```
PS /Users/rithnskaria> Login-AzAccount -UseDeviceAuthentication
Login to Azure, to sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code GLLAB36TF to authenticate.


Account                               SubscriptionName TenantId                                 Environment
-------                               ----------------  --------                                 -----------
rithnskaria@kodekloudlab.onmicrosoft.com  Kodekloud Labs  1e0fa212-37dc-45f5-bb0f-b60867ac64b  AzureCloud
```

### Creating a Resource Group and Storage Account with Azure PowerShell

After logging in, list your resource groups and create a new one. For example, to create a resource group named "ps-demo" in the East US region, execute the appropriate command. The output will display various details similar to:

```
ResourceGroupName         Value
-------------------------  ------------------------
ResourceId                /subscriptions/1b228746-75fd-46ed-8a6b-6a9066d3a3a/resourceGroups/NetworkWatcherRG
ResourceGroupName         az900-vm-rg
Location                  eastus
ProvisioningState         Succeeded
...
```

Once the resource group is set up, you can deploy a storage account by specifying a unique name, location, resource group, and SKU (e.g., Standard_LRS). Missing parameters will prompt the command to request further details.

### Logging into Azure with Azure CLI

To log in using Azure CLI with device authentication, run:

```
az login --use-device-code
```

Follow the on-screen instructions by visiting https://aka.ms/device-login and entering the provided code. Once authenticated, you'll be securely connected to your Azure account.

![The image shows a Microsoft Azure login screen where a user is prompted to pick an account to sign in. The screen includes options to select an existing account or use another account.](https://kodekloud.com/kk-media/image/upload/v1752868508/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Tools-for-Interacting-with-Azure/azure-login-screen-account-selection.jpg)

List your resource groups with:

```
az group list
```

For a table formatted view, use:

```
az group list -o table
```

Sample table output:

```
Name                          Location      Status
----------------------------  ------------  ---------
azurelates-prod-ctl          centralindia  Succeeded
azurelates-wp-site           centralindia  Succeeded
backup-rg                    eastus        Succeeded
...
ps-demo                      eastus        Succeeded
```

### Using Cloud Shell

To access Cloud Shell, click the terminal icon at the top-right of the Azure Portal. If it’s your first time using Cloud Shell, you will be prompted to create a linked storage account for persistent file storage.

Once launched, Cloud Shell provides a Bash (or PowerShell) prompt. For example, you might see output like:

```
WARNING: You're using Az version 11.4.0. The latest version of Az is 11.5.0. Upgrade your Az modules using the following commands:
    Update-PSResource Az -whatif   -- Simulate updating your Az modules.
    Update-PSResource Az            -- Update your Az modules.
MOTD: Azure Cloud Shell includes Predictive IntelliSense! Learn more: https://aka.ms/CloudShell/IntelliSense
VERBOSE: Authenticating to Azure ...
VERBOSE: Building your Azure drive ...
PS /home/rithm>
```

Then, list all resource groups with:

```
Get-AzResourceGroup | Format-Table
```

The output will display details such as Resource Group Names, Locations, and Provisioning States in a neatly formatted table:

```
ResourceGroupName          Location      ProvisioningState    ResourceId
-----------------          --------      ------------------   -----------------------------------------------
azuretales-prod-ci        centralindia  Succeeded          /subscriptions/...
...
ps-demo                   eastus        Succeeded          /subscriptions/...
```

This demonstrates how Cloud Shell offers a fully configured environment for managing your Azure resources without any local installations.

## Conclusion

In this lesson, we explored the primary tools for interacting with Azure: Azure Portal, Azure PowerShell, Azure Cloud Shell, and Azure CLI. Each tool offers distinct advantages whether you prefer a graphical interface or command-line automation. Stay tuned for our upcoming module, where we will dive into the concept of [Azure Arc](https://docs.microsoft.com/en-us/azure/azure-arc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/3a2acdf1-9246-4605-93a4-e0b3d2aa8139/lesson/f7fd7979-851f-4b0a-be5f-5f9f05fd66bd)**
>
> Watch video content
