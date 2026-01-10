# Azure AD Connect Demonstration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Hybrid-Identity/Azure-AD-Connect-Demonstration)

---

## Table of Contents

- Azure AD Connect Demonstration
  - Running the Deployment Scripts
  - Deploying and Logging Into the Domain Controller
  - Creating User Accounts with the "prep-users" Script
  - Joining the Domain and Installing Azure AD Connect
  - Verifying Synchronization
  - Final Thoughts
  - Watch Video
    - Joining the Domain
    - Installing Azure AD Connect

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Hybrid Identity

# Azure AD Connect Demonstration

Welcome to this detailed guide on deploying Azure AD Connect for a hybrid identity environment. In this lesson, you'll learn how to set up a Domain Controller (DC), a domain-joined client machine, and synchronize on-premises users with Azure AD. Although these machines can be created manually, pre-written PowerShell scripts are available in a repository (which will be public after the recording). These scripts automate the following tasks:

1.  Preparing the virtual machines (VMs)
2.  Preparing the users
3.  Preparing the Domain Controller

![The image shows a GitHub repository interface with a list of PowerShell script files related to "Hybrid Identity" under the "kodekloud-az500" project. The files include "prep-dc.ps1," "prep-users.ps1," "prep-vms.ps1," and "prepare-vms.ps1."](https://kodekloud.com/kk-media/image/upload/v1752881899/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/github-repo-hybrid-identity-scripts.jpg)

> [!important]
> **Quick Start**
>
> To deploy all required resources, clone the repository and execute the scripts from the specified deployment directory. Running the scripts from a different directory may lead to internal script reference issues.

## Running the Deployment Scripts

Once you have cloned the repository, run the scripts from the deployment directory. The only manual steps are logging into the client server, joining it to the domain, and installing Azure AD Connect. All other configurations are handled by the scripts.

Below is an example command to run one of the scripts locally:

```
PS C:\Users\RithinSkaria\Documents\kodekloud-az500> & '.\30-Hybrid Identity\prep-vms.ps1'
```

When executed, the script will prompt you for a resource group name. For example, entering "azure-dc-connect" initiates the following output:

```
PS C:\Users\RithinSkaria\Documents\kodekloud-az500> & '.\30-Hybrid Identity\prep-vms.ps1'
Azure AD Connect Demo - v1.0, written by Rithin Skaria
(new) Resource Group Name: azure-dc-connect
INFO: Az Module is already installed, skipping to next step
WARNING: To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code L8KN8A64WG to authenticate.
```

> [!important]
> **Administrator Rights Required**
>
> Ensure you run the console window as an administrator. The script needs administrator privileges to update the execution policy and import necessary modules.

After authentication via the Microsoft device login, the script deploys the resource group, subnet, virtual network, and the domain controller.

![The image shows a Microsoft Azure portal interface with a PowerShell window open, displaying a command prompt in a specific directory.](https://kodekloud.com/kk-media/image/upload/v1752881899/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-portal-powershell-command.jpg)

During deployment, you might see output similar to this:

```
ps C:\Users\RithinSkaria\Documents\kodekloud-az500> & '.\30-Hybrid Identity\prep-vms.ps1'
Azure AD Connect Demo - v1.0, written by Rithin Skaria
Creating Azure resources
27% [oooooooooooooooooooooooo]
Creating virtualMachines/dc=01.
rithinskariaq@kodekloud.com Kodekloud - AZ500 - POC 1e0fa212-37dc-45f5-bb6f-b60867cacc64b AzureCloud
ResourceGroupName: azure-dc-connect
Location               : eastus
ProvisioningState      : Succeeded
...
Creating domain controller
```

After the DC is provisioned, additional resources, including the client VM and user accounts, are automatically deployed. The on-premises users are later synchronized to Azure AD.

![The image shows a Microsoft Azure portal interface displaying a list of virtual machines, including details like name, type, subscription, location, status, operating system, and IP address.](https://kodekloud.com/kk-media/image/upload/v1752881902/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-portal-virtual-machines-list.jpg)

## Deploying and Logging Into the Domain Controller

Once the deployment completes, navigate to the virtual machine named "dc-01" in the Azure portal and copy its public IP address for Remote Desktop (RDP) access. The username and password details are provided at the top of the `prep-dc.ps1` module.

![The image shows a Microsoft Azure portal interface with a virtual machine named "dc-01" selected, displaying its details and a Windows Security prompt for entering credentials.](https://kodekloud.com/kk-media/image/upload/v1752881903/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-portal-virtual-machine-dc-01.jpg)

Below is an example snippet used in the domain controller configuration script:

```
Write-Host "Azure AD Connect Demo - v1.0, written by Rithin Skaria" `
    -ForegroundColor "Red" -BackgroundColor "White"


# Variables
$rg = Read-Host "New Resource Group Name"
$region = "eastus"
$username = "kodekloud#username for the VM"
$plainPassword = "V@P5$w0rd"  # Your VM password
$VMSize = "Standard_D2s_v3"


# Create VM credential
$password = ConvertTo-SecureString $plainPassword -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential ($username, $password)


# Set execution policy
Set-ExecutionPolicy Bypass


# Check if required modules are installed
if (Get-Command -Name 'Get-AzContext' -ErrorAction SilentlyContinue) {
    Write-Host "INFO: Az Module is already installed, skipping to next step" -ForegroundColor Green
} else {
    Write-Host "INFO: Requires installation of Az module" -ForegroundColor Yellow
    Install-Module Az -Force -AllowClobber
    Import-Module Az -Force
}
```

After the script runs, you should see confirmation of module installation:

```
Copyright (c) Microsoft Corporation.
PowerShell Extension v2022.6.0
PS C:\Users\RithinSkaria\Documents\kodekloud-az500> Get-Module Az
PS C:\Users\RithinSkaria\Documents\kodekloud-az500> Get-Module Az.Account
```

A Windows Security prompt will then appear to verify your credentials for RDP connectivity.

![The image shows a Windows Security prompt asking for credentials to connect to a specific IP address, overlaid on a code editor with a PowerShell script open.](https://kodekloud.com/kk-media/image/upload/v1752881904/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/windows-security-prompt-powershell.jpg)

Once logged into the server, allow time for Server Manager to launch. Open "Active Directory Users and Computers" (found in Windows Administrative Tools) to view the domain users created by the script.

![The image shows a Windows Server Manager dashboard with the Start menu open, displaying various administrative tools and settings options.](https://kodekloud.com/kk-media/image/upload/v1752881905/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/windows-server-manager-dashboard.jpg)

## Creating User Accounts with the "prep-users" Script

The "prep-users" script uses a loop to generate user accounts with preset credentials. Below is an example snippet:

```
# Set values for your environment
$Users = 10
$UserPrefix = "KodeKloud-User"
$PassWord = "UserP@ssw0rd"
$UserDomain = "KodeKloudlab.local"  # Update with your custom domain name


# Import the AD Module
Import-Module ActiveDirectory


# Convert the password to a secure string
$UserPass = ConvertTo-SecureString $PassWord -AsPlainText -Force


# Add the users
for ($i = 1; $i -le $Users; $i++) {
    $newUser = $UserPrefix + $i
    New-ADUser -Name $newUser -SamAccountName $newUser -UserPrincipalName "$newUser@$UserDomain" -GivenName $newUser `
    -Surname $newUser -DisplayName $newUser -AccountPassword $UserPass -ChangePasswordAtLogon $false -PasswordNeverExpires $true -Enabled $true
}
```

After verifying the new users in Active Directory, return to the Azure portal and log into the client machine (e.g., "vc01") using its public IP address. Use the same credentials specified during VM creation.

![The image shows a Microsoft Azure portal interface displaying details of a virtual machine named "server-01," alongside a Remote Desktop Connection window with an IP address entered.](https://kodekloud.com/kk-media/image/upload/v1752881906/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-portal-server01-remote-desktop.jpg)

## Joining the Domain and Installing Azure AD Connect

### Joining the Domain

On the client machine, complete the following steps:

1.  Open System Properties (Advanced system settings) and change the computer name.
2.  Join the domain by entering "kodekloud.local" as specified in the prep DC module.

The domain join script typically resembles the following:

```
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False
$admKey = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A59801A3-37EF-41B3-8CFC-4F3A74784073}"
Set-ItemProperty $admKey -Name "Installed" -Value 0
Add-WindowsFeature RSAT-ADDS-Tools
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
$pwd = Read-Host -AsSecureString
Install-ADDSForest -DomainName "kodekloud.local" -SafeModeAdministratorPassword $pwd -Confirm:$false -InstallDns:$true -DomainNetbiosName Kodekloud -NoRebootOnCompletion
Start-Sleep 5
Restart-Computer
```

After the computer reboots, you should receive a welcome message for the "KodeKloud lab.local" domain. Verify the client machine appears in the Computers container via "Active Directory Users and Computers" on the domain controller.

![The image shows a Windows Server settings screen with a dialog box for changing the computer's domain, requiring a username and password for domain access. The system properties and Windows specifications are also visible.](https://kodekloud.com/kk-media/image/upload/v1752881908/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/windows-server-domain-settings-dialog.jpg)

### Installing Azure AD Connect

With the client machine now domain joined, proceed to install Azure AD Connect:

1.  Open Microsoft Edge and search for [Azure AD Connect download](https://www.microsoft.com/en-us/download/details.aspx?id=47594).
2.  Download the installer, launch it, and agree to the licensing terms.

![The image shows a Microsoft Azure AD Connect installation window with instructions and options for setting up identity synchronization. In the background, there's a webpage with a graphic indicating a transition from Internet Explorer to Microsoft Edge.](https://kodekloud.com/kk-media/image/upload/v1752881909/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-ad-connect-installation-window.jpg)

Choose the "Customize" option during installation. This allows you to review the components to be installed, such as a SQL Server Express instance (if you don’t already have one). For the sign-on methods, select Password Hash Synchronization (PHS) and enable Single Sign-On. Connect to Azure AD by entering the global administrator credentials for your tenant (note that lab environments might not grant global administrator privileges).

![The image shows a Microsoft Azure Active Directory Connect setup window prompting for Azure AD credentials, with a background webpage about downloading Azure AD Connect.](https://kodekloud.com/kk-media/image/upload/v1752881910/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-ad-connect-setup-window.jpg)

Next, configure the connection to your on-premises directory. Provide the custom domain name (e.g., "CloudCloudLab.local") and enter the corresponding enterprise admin credentials. After the directory schema is retrieved, the default setting for matching on-premises user principal names (UPNs) with Azure AD is applied.

![The image shows a Microsoft Azure AD Connect configuration window for Azure AD sign-in, with options for setting up UPN suffixes and user principal names. In the background, there's a webpage indicating that Internet Explorer 11 is no longer accessible, suggesting a transition to Microsoft Edge.](https://kodekloud.com/kk-media/image/upload/v1752881912/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-ad-connect-configuration-window.jpg)

Optional filtering (e.g., synchronizing specific Organizational Units) is available, though the defaults suit most greenfield single OU environments. You can also enable features like password writeback for disaster recovery and verify that Single Sign-On is active by providing the relevant domain credentials.

Once the configuration checks are complete, the installation and initial synchronization begin. When finished, click "Exit" to close the wizard.

## Verifying Synchronization

After installation, return to the Azure portal to confirm that on-premises users are synchronized. You can run a PowerShell script to filter and display only those accounts that have the "on-premises sync enabled" flag set to "Yes"—this will exclude the service account created during synchronization.

![The image shows a Microsoft Azure portal displaying a list of users with details such as display name, user principal name, and user type. The interface includes options for managing users, such as adding filters and performing bulk operations.](https://kodekloud.com/kk-media/image/upload/v1752881913/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-portal-user-list-management.jpg)

Keep in mind that the service account should not be modified or deleted. Additionally, you can monitor Azure AD Connect health metrics and sync errors from the Azure portal:

![The image shows a Microsoft Azure portal page for AAD Connect, displaying settings and statuses for Azure AD Connect Sync, user sign-in options, and other related features.](https://kodekloud.com/kk-media/image/upload/v1752881915/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/azure-portal-aad-connect-settings.jpg)

If necessary, you can trigger an immediate synchronization using PowerShell instead of waiting for the default 30-minute interval. The Synchronization Service Manager provides detailed logs for each sync operation.

![The image shows a computer screen with a Microsoft Download Center webpage open, and a "Synchronization Service Manager" window displaying synchronization operations and their statuses.](https://kodekloud.com/kk-media/image/upload/v1752881916/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-Connect-Demonstration/microsoft-download-center-synchronization-manager.jpg)

## Final Thoughts

In this guide, you learned how to deploy Azure AD Connect, join client machines to a domain, and synchronize on-premises users with Azure AD using automated PowerShell scripts. This approach allows for both rapid lab deployment and further customization for production environments.

Feel free to ask questions in our community or try the lab yourself if you have your own tenant. Happy synchronizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/ec3dd1c7-a3f1-4d9a-ae3c-59b398091a52/lesson/fb2477a1-eea8-4a8b-a4a8-33c0bc1feaab)**
>
> Watch video content
