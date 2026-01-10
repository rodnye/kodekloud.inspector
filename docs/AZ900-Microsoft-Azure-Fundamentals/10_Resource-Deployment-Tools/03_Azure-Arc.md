# Azure Arc - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Resource-Deployment-Tools/Azure-Arc)

---

## Table of Contents

- Azure Arc
  - Key Features of Azure Arc
  - Benefits and Use Cases
  - Demonstration: Onboarding a Windows Server
  - Watch Video
    - Step 1: Access the Azure Portal
    - Step 2: Add a Machine
    - Step 3: Configure Server Details
    - Step 4: Generate and Download the Onboarding Script
    - Step 5: Run the Onboarding Script
    - Step 6: Verify Onboarding in the Azure Portal

---

## Content

AZ900: Microsoft Azure Fundamentals

Resource Deployment Tools

# Azure Arc

Azure Arc extends Azure's powerful management capabilities to any infrastructure, whether on-premises, multi-cloud, or edge. With Azure Arc, organizations like Bella Innovation can manage servers across different environments directly from the Azure Portal, ensuring centralized control regardless of where your resources reside.

All connected resources become visible within the Azure Portal, and you can manage them using the Portal, PowerShell, or CLI. This is made possible by the Connected Machine Agent, which is installed on each machine to facilitate communication with Azure Arc.

![The image is a diagram illustrating Azure Arc's management capabilities over infrastructure, including on-premises, multi-cloud, and edge resources.](https://kodekloud.com/kk-media/image/upload/v1752868480/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/azure-arc-management-diagram.jpg)

## Key Features of Azure Arc

Azure Arc delivers a range of robust features that help streamline hybrid and multi-cloud management:

- **Unified Management:** Centralize and manage resources across on-premises, multi-cloud, and edge environments using a single pane of glass.
- **Extended Azure Services:** Unlock the power of Azure services for your entire infrastructure, regardless of location.
- **Policy-Driven Governance:** Apply Azure policies to non-Azure resources to ensure consistent compliance, security, and operational practices.

![The image outlines the key features of Azure Arc, highlighting unified management, extending Azure services, and policy-driven governance.](https://kodekloud.com/kk-media/image/upload/v1752868481/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/azure-arc-key-features-outline.jpg)

## Benefits and Use Cases

Azure Arc offers numerous benefits and is ideal for various use cases:

- **Flexibility and Interoperability:** Manage resources seamlessly regardless of whether they are on-premises, at the edge, or across multiple clouds.
- **Streamlined Operations:** Utilize familiar Azure tools for a consistent operational experience across all environments.
- **Enhanced Security:** Extend Azure’s security and identity services to maintain monitoring and robust protection for all connected resources.

![The image outlines the benefits of Azure Arc, highlighting flexibility and interoperability, streamlined operations, and comprehensive security.](https://kodekloud.com/kk-media/image/upload/v1752868482/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/azure-arc-benefits-outline.jpg)

The optimal scenarios for Azure Arc include hybrid cloud deployments, modernizing on-premises infrastructure, and managing edge resources.

![The image outlines three use cases for Azure Arc: hybrid cloud deployments, on-premises infrastructure modernization, and edge resource management.](https://kodekloud.com/kk-media/image/upload/v1752868483/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/azure-arc-use-cases-diagram.jpg)

## Demonstration: Onboarding a Windows Server

This section walks you through onboarding an on-premises Windows Server to Azure Arc.

> [!important]
> **Pre-requisites**
>
> Ensure you have access to the Azure Portal, PowerShell, and appropriate administrative credentials before starting.

### Step 1: Access the Azure Portal

Log in to the [Azure Portal](https://portal.azure.com) and navigate to the Azure Arc section. Azure Arc supports not only servers but also solutions such as Azure Stack HCI, Kubernetes clusters, VMware environments, and data services like SQL Server Managed Instances.

![The image shows the Azure Arc portal interface, featuring options for managing infrastructure, services, and getting started with Azure Arc. It includes sections for hands-on experience, adding infrastructure, and deploying Azure services.](https://kodekloud.com/kk-media/image/upload/v1752868484/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/azure-arc-portal-interface.jpg)

### Step 2: Add a Machine

Click on "Add" or "Create" and select "Add a machine." While you can onboard multiple servers at once, this demonstration focuses on a single Windows server.

### Step 3: Configure Server Details

Provide the necessary server details:

- **Resource Group:** Create a new group or select an existing one.
- **Region:** Choose a region, such as East US.
- **Operating System:** Select Windows.
- **Public Endpoint Details:** Enter the required public endpoint information.

![The image shows a Microsoft Azure portal interface for adding a server with Azure Arc, where users can select project and server details, including subscription, resource group, region, and operating system. A dropdown menu is open for selecting a region.](https://kodekloud.com/kk-media/image/upload/v1752868486/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/azure-portal-add-server-arc.jpg)

### Step 4: Generate and Download the Onboarding Script

After configuring the server details, click to generate and download the PowerShell script. This script installs the Connected Machine Agent and connects the server to Azure Arc.

Below is an example PowerShell script:

```
try {
    $env:SUBSCRIPTION_ID = "1b278476-75fd-46ed-bd68-6a9966ed33a3"
    $env:RESOURCE_GROUP = "ps-demo"
    $env:TENANT_ID = "1e0fa212-37dc-45f7-bb4b-b6687ca264b"
    $env:LOCATION = "eastus"
    $env:AUTH_TYPE = "Token"
    $env:CORRELATION_ID = "a63fa33c-3271-41b2-91ca-0e609c5adb83"
    $env:CLOUD = "AzureCloud"


    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12


    # Download the installation package
    Invoke-WebRequest -UseBasicParsing -Uri "https://aka.ms/azureconnectedmachines" -TimeoutSec 30 -OutFile "$env:TEMP\install_windows_azcmagent.ps1"


    # Install the hybrid agent
    $env:TEMP = "\install_windows_azcmagent.ps1"
    if ($LASTEXITCODE -ne 0) { exit 1; }


    # Connect command
    & "$env:ProgramW6432\AzureConnectedMachineAgent\azcmagent.exe" connect --resource-group "$env:RESOURCE_GROUP" --tenant "$env:TENANT_ID" --subscription-id "$env:SUBSCRIPTION_ID"
}
```

Download this script, transfer it to your Windows server (via Remote Desktop or another method), and execute it to install the Connected Machine Agent.

![The image shows the Server Manager interface on a Windows Server, displaying details about the local server, including properties, events, and services.](https://kodekloud.com/kk-media/image/upload/v1752868488/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/server-manager-windows-server-interface.jpg)

### Step 5: Run the Onboarding Script

When you run the script, it will install the Azure Connected Machine Agent and prompt you to sign in via a pop-up browser:

1.  The script begins installation and provides verbose logs similar to:

    ```
    VERBOSE: Installing Azure Connected Machine Agent
    VERBOSE: PowerShell version: 5.1.20348.558
    VERBOSE: .NET Framework version: 4.8.4161
    VERBOSE: checking if this is an Azure virtual machine
    VERBOSE: Error The operation has timed out. checking if we are in Azure
    VERBOSE: Downloading agent package from https://aka.ms/AzureConnectedMachineAgent to C:\Users\ADMINI~1\AppData\Local\Temp\AzureConnectedMachineAgent.msi
    VERBOSE: Installing agent package
    ```

2.  Complete the sign-in when prompted. After authentication, the script continues:

    ```
    VERBOSE: Installing Azure Connected Machine Agent
    VERBOSE: Total Physical Memory: 1826 MB
    VERBOSE: .NET Framework version: 4.8.4161
    VERBOSE: Checking if this is an Azure virtual machine
    VERBOSE: Error The operation has timed out. checking if we are in Azure
    VERBOSE: Installing agent package
    VERBOSE: Downloading agent package from https://aka.ms/Temp/AzureConnectedMachineAgent.msi
    INFO: Connecting machine to Azure... This might take a few minutes.
    INFO: Testing connectivity to endpoints that are needed to connect to Azure...
    INFO: Please login using the pop-up browser to authenticate.
    20%
    30%
    INFO: Creating resource in Azure...
    /subscription/1b228746-75fd-46ed-8a6b-6a906d6d6d3a/resourceGroups/ps-demo/providers/Microsoft.HybridCompute/machines/WI-N-QTKCNPLV2M
    ```

Once the script finishes, your Windows Server is successfully onboarded to Azure Arc.

### Step 6: Verify Onboarding in the Azure Portal

Return to the Azure Portal and navigate back to the Azure Arc section. Confirm that your server appears with its hostname and details. You can now manage policies, run commands, and view logs just like any Azure resource—even if the server resides on-premises.

![The image shows the Microsoft Azure portal interface displaying details of a virtual machine named "WIN-QTKCNPQLV2M," including its status, operating system, and various configuration options.](https://kodekloud.com/kk-media/image/upload/v1752868489/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Arc/azure-portal-virtual-machine-details.jpg)

> [!important]
> **Key Takeaway**
>
> By onboarding your Windows Server to Azure Arc, you extend Azure's robust management, security, and compliance capabilities to your on-premises resources, simplifying hybrid and multi-cloud operations.

This demonstration highlights how Azure Arc empowers you to extend cloud management capabilities to on-premises environments. With Azure Arc, you can apply policies, perform updates, and monitor performance from a single management platform.

Next, we will explore Azure Resource Manager and its advanced infrastructure management features.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/3a2acdf1-9246-4605-93a4-e0b3d2aa8139/lesson/4261728f-eb15-4d97-bff6-bb100a65185f)**
>
> Watch video content
