# Enable managed identities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/App-Security/Enable-managed-identities)

---

## Table of Contents

- Enable managed identities
  - Using Plain Text Credentials
  - Using Managed Identity for Azure AD Authentication
  - Managed Identity with Key Vault and Function Apps
  - Overview of Managed Identities
  - Configuring Managed Identity in the Azure Portal
  - Testing the Functions
  - Summary
  - Watch Video
    - Infrastructure Deployment with PowerShell
    - Function Code Samples
    - Comparison of Managed Identity Types
      - Function Using Plain Text Connection String
      - Function Using Managed Identity to Access Key Vault

---

## Content

Microsoft Azure Security Technologies (AZ-500)

App Security

# Enable managed identities

In this article, you will learn how to enable managed identities to securely connect to a SQL database without exposing credentials in plain text. Managed identities allow an Azure resource (such as a Function App) to authenticate with Azure Active Directory (Azure AD) and access other resources that support Azure AD authentication.

> [!important]
> **Security Tip**
>
> Avoid hardcoding credentials in your source code. Instead, leverage managed identities to improve your security posture.

## Using Plain Text Credentials

Initially, consider a Python script that connects to a SQL database by hardcoding the username and password. Hardcoding credentials is a major vulnerability since anyone with access to the code can see the sensitive data.

```
import pyodbc


server = 'mykodekloud.database.windows.net'
database = 'products'
username = 'dbAdmin'
password = 'VeryStrongPassword#889'
driver = '{ODBC Driver 17 for SQL Server}'


with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+password) as conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
        row = cursor.fetchone()
        while row:
            print(str(row[0]) + " " + str(row[1]))
            row = cursor.fetchone()
```

Using this method exposes your database to unauthorized access. While storing the connection string in [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/) is an option, a more secure alternative is to utilize managed identities.

## Using Managed Identity for Azure AD Authentication

Managed identities enable your code to authenticate with Azure AD by obtaining a token. Azure SQL Database then uses this token for authentication without the need for a username and password. The following Python example shows the modifications needed to use Azure AD authentication via a managed identity:

```
import pyodbc
import struct


server = 'mykodekloud.database.windows.net'
database = 'products'
driver = '{ODBC Driver 17 for SQL Server}'
connection_string = 'DRIVER='+driver+';SERVER='+server+';DATABASE='+database


# Authentication using Azure AD Managed Identity
# Note: Ensure that 'Active DirectoryMsi' is formatted correctly as per driver support.
conn = pyodbc.connect(connection_string + ';Authentication=Active DirectoryMsi')
tokenstruct = struct.pack("=I", len(extoken)) + exptoken
conn = pyodbc.connect(connection_string, attrs_before={SQL_COPT_SS_ACCESS_TOKEN: tokenstruct})


with conn.cursor() as cursor:
    cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
    row = cursor.fetchone()
    while row:
        print(row[0])
        row = cursor.fetchone()
```

In this code, the managed identity of the resource is used to securely retrieve authentication details from Azure AD without exposing any credentials.

## Managed Identity with Key Vault and Function Apps

Another approach is to configure your Function App to use a managed identity for accessing a Key Vault. The Function App obtains an access token from Azure AD, retrieves the connection string stored in the Key Vault, and uses it to connect securely to the SQL database.

### Infrastructure Deployment with PowerShell

The following PowerShell script deploys the infrastructure by creating a SQL server with a preloaded sample database (AdventureWorksLT), a Key Vault to securely store the connection string, and two Function Apps—one using a plain text connection string and the other using a managed identity:

```
# Create firewall rules
Write-Host "Configuring SQL server firewall" -ForegroundColor Green
$serverFirewallRule = New-AzSqlServerFirewallRule -ResourceGroupName $rg `
    -ServerName $serverName `
    -FirewallRuleName "AllowedIPs" -StartIpAddress $startIp -EndIpAddress $endIp
Write-Host "Created rule - $($serverFirewallRule.FirewallRuleName) for ($($server.ServerName))" -ForegroundColor Green


Write-Host "Creating database" -ForegroundColor Green
$database = New-AzSqlDatabase -ResourceGroupName $rg `
    -ServerName $serverName `
    -DatabaseName $databaseName `
    -Edition Basic `
    -SampleName "AdventureWorksLT"
Write-Host "Created database - $($database.DatabaseName) for ($($server.ServerName))" -ForegroundColor Green


$connectionString = "Server=tcp:$($serverName).database.windows.net,1433;Initial Catalog=$databaseName;Persist Security Info=False;User ID=$adminLogin;Password=$plainPassword;MultipleActiveResultSets=False"


# Key Vault creation
Write-Host "Creating Key Vault" -ForegroundColor Green
$kv = New-AzKeyVault -ResourceGroupName $rg `
    -Name $keyVaultName `
    -Location $location `
    -Sku Standard
Write-Host "Granting access policy to user to write connection string" -ForegroundColor Green
$AzKeyVaultAccessPolicy = New-AzKeyVaultAccessPolicy `
    -VaultName $kv.VaultName `
    -UserPrincipalName $signedInUser `
    -PermissionsToSecrets get,set,delete
Write-Host "Creating Key Vault secret" -ForegroundColor Green
New-AzKeyVaultSecret -VaultName $kv.VaultName -Name "sql" -SecretValue $secret


# Creating Function App
Write-Host "Creating Function App" -ForegroundColor Green
$storageAccount = New-AzStorageAccount -ResourceGroupName $rg -Name "stfn$(Get-Random)" -Location $location -SkuName "Standard_LRS" -AllowBlobPublicAccess $true
New-AzFunctionApp -ResourceGroupName $rg `
    -StorageAccount $storageAccount.StorageAccountName `
    -Location $location `
    -Runtime PowerShell `
    -Version 1.0 `
    -OsType Windows
```

### Function Code Samples

Below are two function examples—one with a plain text connection string, and the other using a managed identity to access Key Vault.

#### Function Using Plain Text Connection String

This function demonstrates the risk of using a hardcoded connection string:

```
# Input bindings are provided via the param block.
param('$Request', $TriggerMetadata)


# Connection string stored in plain text
$connectionString = "Server=tcp:sql-server-1668970856.database.windows.net,1433;Initial Catalog=db-adv-works;Persist Security Info=False;User ID=kodek"


# Create a SQL connection
$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString


# Open the connection
$connection.Open()


# Create a SQL command to fetch table names
$command = $connection.CreateCommand()
$command.CommandText = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"


# Execute the command and fetch results
$reader = $command.ExecuteReader()
$tables = @()
while ($reader.Read()) {
    $tables += $reader["TABLE_NAME"]
}


# Close the connection
$connection.Close()


# Return table names as the response
$body = @{ tables = $tables } | ConvertTo-Json


Push-OutputBinding -Name Response -Value @{
    status = 200
    body = $body
}
```

#### Function Using Managed Identity to Access Key Vault

This function uses a system-assigned managed identity to request an access token. It then retrieves the connection string from Key Vault and connects to the SQL database:

```
# Input bindings are provided via the param block.
param($Request, $TriggerMetadata)
$keyVaultUrl = $env:AKV
$resourceUri = 'https://vault.azure.net'
$tokenAuthUri = $env:MSI_ENDPOINT + '?resource=' + $resourceUri + '&api-version=2017-09-01'
$tokenResponse = Invoke-RestMethod -Uri $tokenAuthUri -Headers @{ "Secret" = "$env:MSI_SECRET" } -Method GET
$token = $tokenResponse.access_token


$connectionString = (Invoke-RestMethod -Method GET -Headers @{ "Authorization" = "Bearer $token" } -Uri "$keyVaultUrl/secrets/sql?api-version=7.1").value


# Create a SQL connection
$connection = New-Object System.Data.SqlClient.SqlConnection
$connection.ConnectionString = $connectionString


# Open the connection
$connection.Open()


# Create a SQL command to fetch table names
$command = $connection.CreateCommand()
$command.CommandText = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"


# Execute the command and fetch results
$reader = $command.ExecuteReader()
$tables = @()
while ($reader.Read()) {
    $tables += $reader["TABLE_NAME"]
}


# Close the connection
$connection.Close()


# Return table names as the response
$body = @{ tables = $tables } | ConvertTo-Json


Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [System.Net.HttpStatusCode]::OK
    Body = $body
})
```

After configuring both functions, deploy the Function App. The deployment script creates the functions "GetDatabaseTables" (using a plain text connection string) and "GetDatabaseTablesMSI" (using managed identity):

```
Set-AzWebApp -ResourceGroupName $rg -Name $functionAppName -AppSettings $envVariables | Out-Null
Write-Host "Creating functions" -ForegroundColor Green
func new function --name "GetDatabaseTables" --template "HTTP trigger" --authLevel "function" --worker-runtime PowerShell
func new function --name "GetDatabaseTablesMSI" --template "HTTP trigger" --authLevel "function" --worker-runtime PowerShell
Set-Content -Path .\function\GetDatabaseTables\run.ps1 -Value $code
Set-Content -Path .\function\GetDatabaseTablesMSI\run.ps1 -Value $codeMsi
Write-Host "Publishing function" -ForegroundColor Green
func azure functionapp publish $functionAppName
```

Once deployed, you can review the created resources in the [Azure portal](https://portal.azure.com).

![The image illustrates the concept of Managed Identities, showing various source icons accessing a target that supports Azure AD authentication.](https://kodekloud.com/kk-media/image/upload/v1752881617/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-managed-identities/managed-identities-azure-ad-authentication.jpg)

## Overview of Managed Identities

Managed identities ensure that only Azure resources can authenticate using credentials stored in Azure AD. Since the source must be an Azure resource, on-premises solutions cannot directly use managed identities.

There are two types of managed identities:

- **System-assigned Managed Identity:** Tied directly to a single Azure resource, this identity is deleted if the resource is removed.
- **User-assigned Managed Identity:** A separate Azure resource that can be associated with multiple resources and remains even if one resource is deleted.

### Comparison of Managed Identity Types

| Feature       | System-assigned Managed Identity                                          | User-assigned Managed Identity                                        |
| ------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Alignment** | Identity of a single resource                                             | Standalone identity that can be shared                                |
| **Lifecycle** | Deleted with the resource                                                 | Remains even if associated resources are deleted                      |
| **Sharing**   | Not shareable                                                             | Can be mapped to multiple resources                                   |
| **Use Cases** | Ideal for individual workloads (e.g., a Function App accessing Key Vault) | Best for scenarios where multiple resources require a common identity |

![The image is a comparison table of system-assigned and user-assigned managed identities in Azure, highlighting differences in alignment, lifecycle, sharing, and use cases.](https://kodekloud.com/kk-media/image/upload/v1752881618/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-managed-identities/azure-managed-identities-comparison-table.jpg)

## Configuring Managed Identity in the Azure Portal

To enable a system-assigned managed identity for a Function App in the Azure portal:

1.  Navigate to the Function App’s Configuration.
2.  Under the Identity section, toggle the system-assigned managed identity to “On.”
3.  Save the settings. The identity is now registered with Azure AD.

![The image shows the configuration settings page of a Microsoft Azure Function App, displaying application settings with options to view, edit, or delete them. The interface includes a sidebar with various settings and deployment options.](https://kodekloud.com/kk-media/image/upload/v1752881620/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-managed-identities/azure-function-app-settings-page.jpg)

For shared identity requirements across multiple functions, consider creating and assigning a user-assigned managed identity manually.

![The image shows a Microsoft Azure portal screen where a user is prompted to enable a system-assigned managed identity for a function app. The status toggle is set to "On."](https://kodekloud.com/kk-media/image/upload/v1752881620/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-managed-identities/azure-portal-managed-identity-toggle.jpg)

After enabling the managed identity, verify its status in the Identity section of the Function App:

![The image shows a Microsoft Azure portal interface, specifically the Identity section for a function app, with options for managing system-assigned identities.](https://kodekloud.com/kk-media/image/upload/v1752881621/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-managed-identities/azure-portal-identity-function-app.jpg)

## Testing the Functions

After deployment, navigate to your Function App in the Azure portal to test the functions:

- **Plain Text Function:**  
  This function returns a list of table names from the SQL database using a hardcoded connection string.
- **Managed Identity Function:**  
  This function leverages a managed identity to authenticate with Azure AD, retrieve the connection string from Key Vault, and connect securely to the SQL database. If you encounter an error, it may be due to missing permissions for the Function App’s managed identity in Key Vault.

> [!important]
> **Access Policy Reminder**
>
> Ensure you configure the Key Vault access policy to grant the Function App's managed identity permission to read secrets. Without this permission, the managed identity function will fail.

To add the required access policy:

1.  In the Azure portal, navigate to the Key Vault's Access Policies.
2.  Add an access policy that grants the Function App's managed identity permission to read secrets.
3.  Save your changes.

![The image shows a Microsoft Azure portal interface displaying details of a Key Vault named "akv982393682," including its essentials, settings, and monitoring options.](https://kodekloud.com/kk-media/image/upload/v1752881623/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Enable-managed-identities/azure-portal-key-vault-akv982393682.jpg)

Once the access policy is properly configured, the managed identity function will retrieve the connection string from the Key Vault and display the SQL table names. A typical JSON response might look like:

```
{
  "tables": [
    "Customer",
    "ProductModel",
    "ProductDescription",
    "Product",
    "ProductModelProductDescription",
    "ProductCategory",
    "BuildVersion",
    "ErrorLog",
    "Address",
    "CustomerAddress",
    "SalesOrderDetail",
    "SalesOrderHeader"
  ]
}
```

Both functions return the same results, but the managed identity function does so without exposing sensitive credentials.

## Summary

Managed identities provide a secure way for Azure resources to authenticate with other resources via Azure AD. In this article, we explored two approaches:

- Using a plain text connection string (an insecure method)
- Using a system-assigned managed identity to retrieve secrets from Azure Key Vault

This approach is applicable not only to PowerShell but also to other languages like C#, Python, or Java, whether you are using an official SDK or making direct REST API calls.

Now, let’s move on to securing web applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/c93091f0-246d-47cc-a399-0e33ad87ee7f/lesson/102c5454-b260-4ea5-bbdf-58b261e435f3)**
>
> Watch video content
