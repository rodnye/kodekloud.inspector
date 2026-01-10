# Acquiring Access Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Managed-Identities/Acquiring-Access-Tokens)

---

## Table of Contents

- Acquiring Access Tokens
  - Updating an Azure Function for Managed Identity
  - Verifying Deployment in the Azure Portal
  - Using Managed Identities for Other Azure Resources
  - Watch Video
    - Configuring Permissions in Key Vault

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Managed Identities

# Acquiring Access Tokens

In this guide, we explain how to acquire an access token using Managed Identities in Azure. Managed Identities enable your application to request an app-only access token for Azure resources without the need for hard-coded credentials, significantly enhancing your solution's security. The token generated is based on the Managed Identity's service principal assigned to your Azure resources. With this token, your application can securely access various Azure services.

Microsoft recommends using the DefaultAzureCredential class for token acquisition. This class combines multiple authentication methods—including Managed Identities—and automatically selects the appropriate one based on the environment in which your code is running.

![The image provides information on acquiring an access token for Azure resources, highlighting the use of managed identities and recommending the DefaultAzureCredential.](https://kodekloud.com/kk-media/image/upload/v1752866649/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Acquiring-Access-Tokens/azure-access-token-managed-identities.jpg)

Previously, you may have used a command to collect the default credentials that you were logged in with. In this article, we modify the approach to leverage Managed Identities for authentication. Below is an example demonstrating how to specify a user-assigned managed identity:

```
// When deployed to an Azure host, the DefaultAzureCredential authenticates the specified user-assigned managed identity.
string userAssignedClientId = "<your managed identity client Id>";
var credential = new DefaultAzureCredential(new DefaultAzureCredentialOptions {
    ManagedIdentityClientId = userAssignedClientId
});
var blobClient = new BlobClient(new Uri("URI"), credential);
```

In this example, the managed identity client ID is explicitly passed in the credential options. Once the credential is generated, you can use it with your BlobClient or other service clients.

---

## Updating an Azure Function for Managed Identity

Next, we demonstrate how to update an Azure Function that originally used client secret credentials to now employ Managed Identities. Consider the following function that retrieves secrets from Azure Key Vault using a client secret:

```
public static class GetSecretFromKeyVault
{
    [FunctionName("GetSecretFromKeyVault")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed request.");


        string tenantId = Environment.GetEnvironmentVariable("AZURE_TENANT_ID");
        string clientId = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID");
        string keyVaultUrl = Environment.GetEnvironmentVariable("KEY_VAULT_URL");
        string secretName = Environment.GetEnvironmentVariable("SECRET_NAME");


        if (string.IsNullOrEmpty(tenantId) || string.IsNullOrEmpty(clientId) ||
            string.IsNullOrEmpty(keyVaultUrl) || string.IsNullOrEmpty(secretName))
        {
            return new BadRequestObjectResult("Missing one or more environment variables: AZURE_TENANT_ID, AZURE_CLIENT_ID, KEY_VAULT_URL, SECRET_NAME");
        }


        try
        {
            var clientSecretCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
            var secretClient = new SecretClient(new Uri(keyVaultUrl), clientSecretCredential);
            KeyVaultSecret secret = await secretClient.GetSecretAsync(secretName);
            return new OkObjectResult($"The value of the secret '{secretName}' is: {secret.Value}");
        }
        catch (Exception ex)
        {
            log.LogError($"Error retrieving secret: {ex.Message}");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
```

To convert this function to use Managed Identities, replace the client secret credential with DefaultAzureCredential. If you're using a system-assigned managed identity, simply instantiate DefaultAzureCredential without any options:

```
var credential = new DefaultAzureCredential();
```

Below is the updated code block for retrieving the secret from Key Vault using a Managed Identity:

```
if (string.IsNullOrEmpty(tenantId) || string.IsNullOrEmpty(keyVaultUrl) ||
    string.IsNullOrEmpty(secretName))
{
    return new BadRequestObjectResult("Missing one or more environment variables: AZURE_TENANT_ID, AZURE_CLIENT_ID, KEY_VAULT_URL, SECRET_NAME");
}


try
{
    var credential = new DefaultAzureCredential();
    var secretClient = new SecretClient(new Uri(keyVaultUrl), credential);
    KeyVaultSecret secret = await secretClient.GetSecretAsync(secretName);
    return new OkObjectResult(secret.Value);
}
catch (Exception ex)
{
    log.LogError($"Error retrieving secret: {ex.Message}");
    return new StatusCodeResult(StatusCodes.Status500InternalServerError);
}
```

After updating your code, deploy the changes to Azure.

> [!important]
> **Note**
>
> Keep in mind that although your Function App will be deployed, it may initially return an unauthorized error if the system-assigned identity has not yet been granted permission to access the Key Vault.

---

## Verifying Deployment in the Azure Portal

Once deployed, navigate to the Azure portal to view your Function App details and to obtain the function URL.

![The image shows a Microsoft Azure portal interface displaying details of a Function App named "getmedbstring." It includes information about the app's status, location, subscription, and a function named "GetSecretFromKeyVault" with an HTTP trigger.](https://kodekloud.com/kk-media/image/upload/v1752866651/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Acquiring-Access-Tokens/azure-portal-function-app-details.jpg)

When you test the endpoint in your browser, a 500 error is expected if access permissions have not been configured. To resolve this, you must configure your Key Vault to grant your Function App access.

### Configuring Permissions in Key Vault

First, review the function’s configuration JSON:

```
{
  "generatedBy": "Microsoft.NET.Sdk.Functions.Generator-4.4.1",
  "configurationSource": "attributes",
  "bindings": [
    {
      "type": "HttpTrigger",
      "methods": [
        "get",
        "post"
      ],
      "authLevel": "function",
      "name": "req"
    }
  ],
  "disabled": false,
  "scriptFile": "../bin/KeyVaultFunction.dll",
  "entryPoint": "FunctionAppKeyVault.GetSecretFromKeyVault.Run"
}
```

Then, navigate to the Function App's Identity settings in the Azure portal:

![The image shows a Microsoft Azure portal interface for a Function App named "getmedbstring," focusing on the "Identity" settings. It displays options for managing system-assigned identities, with the status set to "On" and an object (principal) ID provided.](https://kodekloud.com/kk-media/image/upload/v1752866652/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Acquiring-Access-Tokens/azure-function-app-identity-settings.jpg)

Copy your Function App's name and go to your Key Vault. Under Access Control (IAM), add a role assignment for the "Key Vault Secrets User" role. During the role assignment process, select members or search for the managed identity by its name.

![The image shows a Microsoft Azure portal interface for adding a role assignment, specifically displaying job function roles related to Key Vault, such as Key Vault Administrator and Key Vault Secrets User.](https://kodekloud.com/kk-media/image/upload/v1752866653/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Acquiring-Access-Tokens/azure-portal-role-assignment-key-vault.jpg)

![The image shows a Microsoft Azure portal interface for adding a role assignment, specifically selecting members for the "Key Vault Secrets User" role. A list of potential members is displayed on the right for selection.](https://kodekloud.com/kk-media/image/upload/v1752866655/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Acquiring-Access-Tokens/azure-portal-role-assignment-key-vault-2.jpg)

After the role assignment is complete, your Function App will have permission to retrieve secrets from the Key Vault, and the secret retrieval should succeed.

---

## Using Managed Identities for Other Azure Resources

You can also use connection strings or credentials for other Azure resources via Azure Active Directory authentication. For example, you might adapt the following connection string to authenticate with Microsoft Entra ID:

```
Data Source=airports;Database=airportcodes;Application Name=app;Integrated Security=false;User ID=sqldadmin;Password=Mw34@jjurgb;
```

This approach applies to other Azure resources as well. When both the source and destination support Microsoft Entra ID authentication, your applications can securely connect using Managed Identities.

With that, the Managed Identities section is complete. Up next, we will explore Azure App Configuration.

```
Data Source=airports;Database=airportcodes;Application Name=app;Integrated Security=false;User ID=sqladmin;Password=Mw34@jjurgb;
```

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1eedbbfa-a866-48dd-b220-34f52aefc67c/lesson/71cf07ba-d8e8-4dba-925e-837c6730ee90)**
>
> Watch video content
