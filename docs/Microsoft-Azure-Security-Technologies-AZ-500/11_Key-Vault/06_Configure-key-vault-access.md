# Configure key vault access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Key-Vault/Configure-key-vault-access)

---

## Table of Contents

- Configure key vault access
  - Deploying a New Key Vault
  - Configuring Data Plane Access with RBAC
  - Working with Keys, Secrets, and Certificates
  - Managing RBAC Role Assignments for the Data Plane
  - Accessing Azure Key Vault Using a Function App
  - Reviewing the Function App Code
  - Watch Video
    - Creating a Key
    - Creating a Secret
    - Creating a Certificate

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Key Vault

# Configure key vault access

In this lesson, we explain how to access data stored in Azure Key Vault. In previous lessons, you learned how Key Vault stores secrets, certificates, and keys. Now, we focus on securely retrieving this data.

Authentication is performed using Azure Active Directory (Azure AD), while authorization is managed using either Role-Based Access Control (RBAC) or Key Vault Access Policies. These two methods apply to different aspects of Key Vault operations:

- RBAC is primarily used for management plane operations (e.g., creating, updating, or deleting the Key Vault, retrieving vault properties, and managing access policies).
- For the data plane—which involves keys, secrets, and certificates—permissions must be granted through the Key Vault Access Policy. However, you can also use RBAC for the data plane if preferred.

![The image is a flowchart illustrating the configuration of Key Vault access, showing the process from user authentication via Azure AD to authorization, and detailing operations in the management and data planes.](https://kodekloud.com/kk-media/image/upload/v1752881996/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/key-vault-access-flowchart.jpg)

The Azure Portal provides an option to switch between these access models. You can choose to manage both the management and data planes exclusively with Azure RBAC, or use RBAC for managing the Key Vault and rely on Access Policies for data operations.

The general workflow is as follows:

1.  Users authenticate using Azure AD.
2.  Authorization is executed using either RBAC or Key Vault Access Policies.
3.  RBAC controls management plane activities, while the Access Policy secures data plane elements.
4.  If needed, RBAC can fully replace Access Policies.

Let's dive into the Azure Portal and perform the following tasks:

- Deploy a new Key Vault
- Add a secret, key, and certificate
- Configure access using both Access Policies and RBAC

---

## Deploying a New Key Vault

Within the Azure Portal, search for "Key Vault". Even if you have an existing vault (for example, one created for Azure Disk Encryption), this demonstration involves creating a new one. Select your desired resource group (such as "RG App Security") and provide a unique name like "AKV AppSec". The Key Vault's data plane URL is in the format:  
  yourKeyVaultName.vault.azure.net  
This URL format ensures uniqueness across Azure.

![The image shows a Microsoft Azure portal page for creating a key vault, with fields for subscription, resource group, key vault name, region, and pricing tier.](https://kodekloud.com/kk-media/image/upload/v1752881997/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-portal-key-vault-creation.jpg)

If you require Hardware Security Module (HSM) usage, switch to the premium tier, although the standard tier is sufficient for this demonstration. Additional options, such as configuring soft delete and purge protection, aid in vault recovery and will be discussed later.

![The image shows a Microsoft Azure interface for creating a key vault, with options to set the key vault name, region, pricing tier, and recovery options like soft delete and purge protection.](https://kodekloud.com/kk-media/image/upload/v1752881998/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-key-vault-creation-interface.jpg)

Next, in the "Permission model" blade, choose how to control access to the data plane (keys, secrets, and certificates). The recommended option is Azure RBAC, although the Vault Access Policy is still available.

![The image shows a Microsoft Azure portal screen for creating a key vault, specifically on the "Access configuration" tab. It includes options for configuring data plane access and selecting a permission model, with "Azure role-based access control" recommended.](https://kodekloud.com/kk-media/image/upload/v1752882000/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-portal-key-vault-access-config.jpg)

After selecting a permission model, add access policies as needed. For example, virtual machines might require access to Key Vault certificates during ARM template deployments, and disk encryption scenarios require corresponding permissions. Click "Next" to proceed.

On the networking blade, control access by enabling/disabling public access, restricting access to selected networks, or configuring a private endpoint. For demonstration purposes, the public access option is used.

![The image shows a Microsoft Azure portal page for creating a key vault, specifically focusing on the networking configuration options. It includes settings for enabling public access and creating private endpoints.](https://kodekloud.com/kk-media/image/upload/v1752882001/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-key-vault-networking-options.jpg)

Once the settings are reviewed, click "Review and Create". After validation, create the Key Vault. Once deployment is complete, click "Go to Resource" to view your new vault and note its vault URI.

![The image shows a Microsoft Azure portal page indicating that a deployment named "akvappsec" is complete. It provides details such as the subscription, resource group, and start time, with options to view deployment details and next steps.](https://kodekloud.com/kk-media/image/upload/v1752882002/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-portal-deployment-akvappsec.jpg)

---

## Configuring Data Plane Access with RBAC

When retrieving objects like keys from the Key Vault, you might encounter notifications stating that the operation is not permitted through RBAC—even for subscription owners. This is because the data plane operations require explicit RBAC roles. To modify keys, secrets, or certificates, assign roles like "Key Vault Administrator" to allow full management access. Other available roles include "Certificate Officer", "Key Vault Contributor", "Key Vault Crypto Officer", and "Key Vault Reader".

![The image shows a Microsoft Azure portal interface for a Key Vault named "akvappsec," displaying a message that the user is unauthorized to view the contents due to role-based access control (RBAC) restrictions.](https://kodekloud.com/kk-media/image/upload/v1752882004/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-portal-key-vault-rbac.jpg)

Even users with global administrative privileges must have explicit RBAC permissions for the data plane. In this demonstration, assigning the "Key Vault Administrator" role removes the access banner when retrieving keys.

---

## Working with Keys, Secrets, and Certificates

### Creating a Key

1.  Navigate to the "Keys" section.
2.  Choose to generate, import, or restore a backup of a key. For this example, create an "app key" using RSA 2048.
3.  Optionally, set an expiration date, define a rotation policy, and adjust export or immutability settings.
4.  Click "Create" when ready.

![The image shows a Microsoft Azure interface for creating a key, with options to set the key name, type, RSA key size, and other configurations.](https://kodekloud.com/kk-media/image/upload/v1752882004/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-key-creation-interface.jpg)

Upon creation, details such as the current version number and key identifier are shown, with an option to download the public key.

![The image shows a Microsoft Azure Key Vault interface displaying details of an RSA key, including its key type, size, creation and update dates, and permitted operations like encrypt and decrypt.](https://kodekloud.com/kk-media/image/upload/v1752882006/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-key-vault-rsa-key-details.jpg)

### Creating a Secret

1.  Select "Secrets" and opt for manual input (or file upload if needed).
2.  For example, store a SQL database connection string as a secret.
3.  Set optional details such as activation and expiration dates.
4.  Click "Create".

![The image shows a Microsoft Azure portal interface for creating a secret, with fields for name, secret value, and optional settings like activation and expiration dates. The secret is named "sql-db-connstring" and is currently enabled.](https://kodekloud.com/kk-media/image/upload/v1752882007/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-portal-create-secret-sql-db.jpg)

After creation, verify the secret's value by selecting it and clicking "Show Secret".

### Creating a Certificate

1.  Navigate to "Certificates" to create a new certificate.
2.  For example, create an SSO certificate with a subject CN such as "KodeKloud.com".
3.  Optionally, add DNS names, set a validity period, and configure automatic renewal when the certificate reaches 80% of its lifetime.
4.  Click "Create".
5.  After deployment, enable and review detailed certificate properties (note that some details may take a few minutes to load).

---

## Managing RBAC Role Assignments for the Data Plane

When accessing keys, secrets, or certificates in Key Vault, specific RBAC roles must be assigned regardless of subscription-level privileges. For instance, to retrieve secrets, an application needs the "Secret User" role; to access keys, the "Crypto User" role may be required. Here are some common roles:

| Role Name               | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| Key Vault Administrator | Full access to all Key Vault objects                           |
| Certificate Officer     | Manage certificates (excluding permissions management)         |
| Key Vault Contributor   | Manage the Key Vault resource (but not its data)               |
| Key Vault Reader        | Read metadata and certificates, without exposing secret values |

![The image shows a Microsoft Azure portal page for adding role assignments, listing various job function roles with descriptions, types, and categories.](https://kodekloud.com/kk-media/image/upload/v1752882008/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-portal-role-assignments.jpg)

> [!important]
> **Least Privilege Principle**
>
> Always assign only the necessary roles to users and applications to adhere to the principle of least privilege.

---

## Accessing Azure Key Vault Using a Function App

This section demonstrates how an application can retrieve a Key Vault secret using an HTTP-triggered Function App running PowerShell code. The deployment process involves:

- Creating a Function App configured with HTTP trigger.
- Utilizing an Azure AD–created service principal whose client ID, client secret, tenant ID, and service principal name are provided as environment variables.
- Passing the Key Vault name and secret name as URL parameters.

The Function App retrieves an access token from Azure AD for "https://vault.azure.net", then calls the Key Vault API to get the secret.

Below is the deployment log of the Function App:

```
Writing C:\Users\RithinSkaria\Documents\kodekloud-az500\110-Key Vault\function\.vscode\extensions.json
Use the up/down arrow keys to select a template: HTTP trigger
Function name: [HttpTrigger] Writing C:\Users\RithinSkaria\Documents\kodekloud-az500\110-Key Vault\function\RetrieveKey\function.json
The function "RetrieveKey" was created successfully from the "HTTP trigger" template.
Publishing function
Getting site publishing info...
[2023-10-05T15:31:39.360Z] Starting the function app deployment...
Creating archive for current directory...
Uploading 2.4 KB [###############################################################################################################################################################################################]
Upload completed successfully.
Deployment completed successfully.
[2023-10-05T15:31:39.360Z] Syncing triggers...
Functions in fn12676699750510:
    RetrieveKey = [httpTrigger]
    Invoke url: https://fn12676699750510.azurewebsites.net/api/retrievekey
PS C:\Users\RithinSkaria\Documents\kodekloud-az500\110-Key Vault\function>
```

After deployment, review the Function App's "Application Settings" in the Azure Portal to verify the environment variables (client ID, client secret, service principal name, and tenant ID) are configured. Although embedding secrets in environment variables is acceptable for testing purposes, consider using Managed Identity for production to enhance security.

---

## Reviewing the Function App Code

In the Azure Portal, navigate to the "Code + Test" tab for the "RetrieveKey" function. Despite its name, the function retrieves a secret from the Key Vault. The following PowerShell code illustrates the process:

```
using namespace System.Net
param($Request, $TriggerMetadata)
$tenantId = $env:TenantId
$clientId = $env:ClientId
$clientSecret = $env:ClientSecret
$keyVaultName = $Request.Query.keyVaultName
$keyName = $Request.Query.secret


$body = @{
    grant_type    = "client_credentials"
    client_id     = "$clientId"
    client_secret = "$clientSecret"
    resource      = "https://vault.azure.net"
}
$tokenResponse = Invoke-RestMethod -Method Post -Uri "https://login.microsoftonline.com/$tenantId/oauth2/token" -Body $body
$token = $tokenResponse.access_token
$headers = @{
    "Authorization" = "Bearer $token"
}
```

In this block, the script retrieves the tenant ID, client ID, and client secret from environment variables, while the Key Vault name and secret name come from URL parameters. It then calls Azure AD to acquire an access token for "https://vault.azure.net" and prepares an authorization header for subsequent API requests.

The following section retrieves the secret from the Key Vault:

```
$uri = "https://$keyVaultName.vault.azure.net/secrets/$keyName"
$appendString = "?api-version=7.0"
$uri = "{0}{1}" -f $uri, $appendString
$keyVaultResponse = Invoke-RestMethod -Method Get -Headers $headers -Uri $uri


if ($keyVaultResponse) {
    $status = [HttpStatusCode]::ok
    $body = $keyVaultResponse.value
} else {
    $status = [HttpStatusCode]::InternalServerError
    $body = "Failed to retrieve the key from 'Key Vault..`n $uri `n $keyVaultResponse"
}


Push-OutputBinding -Name Response -Value [HttpResponseContext]@{
    StatusCode = $status
    Body = $body
}
```

If the secret is successfully retrieved, its value is returned with an HTTP 200 (OK) status. Otherwise, the function returns an error message with a 500 (Internal Server Error) status.

> [!important]
> **Testing the Function App**
>
> To test this configuration:
>
> 1.  Copy the function URL.
> 2.  Append the required parameters (for example, keyVaultName and secret) to the URL.
> 3.  Open the URL in your browser. If retrieval fails, verify that the service principal has been assigned the appropriate role (e.g., "Secret User") on the Key Vault.

For example, assign the service principal by navigating to the Key Vault's "Access control (IAM)", selecting an appropriate role, adding the service principal as a member, and confirming the assignment. Then, reattempt the function URL.

![The image shows a Microsoft Azure portal interface displaying details of a Key Vault named "akvappsec." It includes information such as resource group, location, subscription ID, and settings related to keys and secrets management.](https://kodekloud.com/kk-media/image/upload/v1752882009/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-key-vault-access/azure-portal-key-vault-akvappsec-2.jpg)

Once correctly configured, the secret’s value (for example, a connection string) will be returned in the browser, matching the value stored in the Key Vault. An example secret might be:

```
ABxgstevsgdu6364837--248673873674
```

This demonstration shows how a Function App can retrieve a secret from Azure Key Vault. In production, consider using Managed Identity as a more secure alternative to employing a service principal.

We hope this lesson clarifies how Azure Key Vault access is configured, and how RBAC and Access Policies work together to manage keys, secrets, and certificates.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/e6ef26f3-b79d-482a-8f38-130223404051/lesson/40281a0e-d70a-4075-9e08-59aae423e2b0)**
>
> Watch video content
