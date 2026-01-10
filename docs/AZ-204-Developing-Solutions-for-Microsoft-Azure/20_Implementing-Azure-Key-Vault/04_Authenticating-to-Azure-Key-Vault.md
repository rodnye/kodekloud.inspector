# Authenticating to Azure Key Vault - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-Key-Vault/Authenticating-to-Azure-Key-Vault)

---

## Table of Contents

- Authenticating to Azure Key Vault
  - Managed Identities for Azure Resources
  - Service Principal with Certificate or Secret
  - Authenticating with Code Libraries and APIs
  - Authenticating from an Azure Function
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure Key Vault

# Authenticating to Azure Key Vault

In this guide, we explore multiple methods to authenticate your application with Azure Key Vault. Azure Key Vault securely stores secrets and keys, making proper authentication essential for managing access. We discuss two primary authentication techniques—managed identities and service principals—and provide detailed code examples utilizing the Azure SDK.

## Managed Identities for Azure Resources

The most secure and recommended option for Azure Key Vault authentication is using managed identities. When deploying your application on an Azure service (such as a virtual machine) that supports managed identities, Azure handles the authentication automatically. This approach eliminates the need for storing secrets or credentials in your code, substantially enhancing security.

Managed identities are not limited to Key Vault; they are also compatible with other Azure services that support Microsoft Entra ID.

## Service Principal with Certificate or Secret

Another approach is using a service principal. Creating an app registration in Azure Active Directory offers two credential options: certificate or secret.

- **Service Principal with Certificate:** Create and register a service principal, then generate a certificate for your application to authenticate with Azure Key Vault.
- **Service Principal with Secret:** Traditionally, a secret is stored in the application for authentication. While this method is common, it is generally less secure compared to managed identities due to the challenges of securely managing secrets in your code.

![The image illustrates three methods for authenticating to Azure Key Vault: managed identities for Azure resources, service principal and certificate, and service principal and secret.](https://kodekloud.com/kk-media/image/upload/v1752866629/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authenticating-to-Azure-Key-Vault/azure-key-vault-authentication-methods.jpg)

## Authenticating with Code Libraries and APIs

Azure offers SDKs for various programming languages, including .NET, Python, Java, and JavaScript, so you can securely connect to Azure Key Vault using the language of your choice. This flexibility ensures compatibility regardless of your development platform.

For frameworks not covered by these SDKs, the REST API is also available. You can, for example, send a PUT request to the keys endpoint with the required API version and access token to perform operations such as creating or retrieving keys.

```
PUT /keys/MYKEY?api-version=<api_version> HTTP/1.1
Authorization: Bearer <access_token>
```

![The image is a table showing how to authenticate to Azure Key Vault using different programming languages (.NET, Python, Java, JavaScript) with their respective Azure Identity SDKs.](https://kodekloud.com/kk-media/image/upload/v1752866630/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authenticating-to-Azure-Key-Vault/azure-key-vault-authentication-table.jpg)

## Authenticating from an Azure Function

This section demonstrates how to authenticate to Azure Key Vault from an Azure Function using a service principal with a secret. While using secrets in applications is not best practice, this approach is useful for comparison until transitioning to managed identities.

Before you begin, ensure an app registration is created and the corresponding secret is generated. Additionally, verify that your service principal has the necessary permissions (e.g., the "secret user" role) in the Key Vault.

![The image shows a Microsoft Azure portal interface displaying details of a function app named "getmedbstring," including its status, location, and associated functions.](https://kodekloud.com/kk-media/image/upload/v1752866631/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authenticating-to-Azure-Key-Vault/azure-portal-function-app-getmedbstring.jpg)

![The image shows the Microsoft Azure portal, specifically the Access Control (IAM) section for a key vault named "akvaz204." It displays options for checking access, role assignments, and managing permissions.](https://kodekloud.com/kk-media/image/upload/v1752866632/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authenticating-to-Azure-Key-Vault/azure-portal-access-control-akvaz204.jpg)

Below is an example C# Azure Function that retrieves essential environment variables—such as tenant ID, client ID, client secret, Key Vault URL, and secret name—and uses these values to connect to Key Vault, securely retrieving a secret.

```
using System;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;


public static class GetSecretFromKeyVault
{
    [FunctionName("GetSecretFromKeyVault")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("# HTTP trigger function processed a request.");


        // Retrieve environment variables
        string tenantId = Environment.GetEnvironmentVariable("AZURE_TENANT_ID");
        string clientId = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID");
        string clientSecret = Environment.GetEnvironmentVariable("AZURE_CLIENT_SECRET");
        string keyVaultUrl = Environment.GetEnvironmentVariable("KEY_VAULT_URL");
        string secretName = Environment.GetEnvironmentVariable("SECRET_NAME");


        if (string.IsNullOrEmpty(tenantId) || string.IsNullOrEmpty(clientId) ||
            string.IsNullOrEmpty(clientSecret) || string.IsNullOrEmpty(keyVaultUrl) ||
            string.IsNullOrEmpty(secretName))
        {
            return new BadRequestObjectResult("Missing one or more environment variables: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, KEY_VAULT_URL, SECRET_NAME");
        }


        try
        {
            // Create a client secret credential
            var clientSecretCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
            // Create a Key Vault client
            var secretClient = new SecretClient(new Uri(keyVaultUrl), clientSecretCredential);
            // Retrieve the secret from the Key Vault
            KeyVaultSecret secret = await secretClient.GetSecretAsync(secretName);
            // Return the secret value
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

This function performs the following steps:

- Reads configuration values from environment variables.
- Validates the presence of all necessary variables.
- Creates a client secret credential and a Key Vault client.
- Retrieves the secret using the `GetSecretAsync` method.
- Returns the secret value on success or logs an error and returns an HTTP 500 error if something goes wrong.

After deploying the function via Visual Studio Code, test it by accessing the function URL. The output might resemble the following JSON response:

```
{
    "value": [
        {
            "businessPhones": [],
            "displayName": "Audrey Adams",
            "givenName": null,
            "jobTitle": null,
            "mail": null,
            "mobilePhone": null,
            "officeLocation": null,
            "preferredLanguage": null,
            "surname": null,
            "userPrincipalName": "ad.adams@kodekloudlab.onmicrosoft.com",
            "id": "bd95babe-8bde-4c1a-9cfa-dcceceba495c"
        }
    ]
}
```

Verifying the secret value stored in Key Vault confirms the successful retrieval:

```
The value of the secret 'sql-conn-string' is: Data Source=airports;Database=airportcodes;Application Name=app;Integrated Security=false;User ID=sqldadmin;Password=M43djurgb1
```

> [!important]
> **Important**
>
> Storing sensitive configuration details, such as client secrets and tenant IDs, directly in environment variables is a common practice but not ideal for long-term security. Consider transitioning to managed identities for enhanced security and simplified credential management.

![The image shows a Microsoft Azure portal displaying environment variables for a function app named "getmedbstring." It lists various variables with options to show their values, edit, or delete them.](https://kodekloud.com/kk-media/image/upload/v1752866634/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authenticating-to-Azure-Key-Vault/azure-portal-function-app-variables.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/49244587-2545-429d-974d-1856a8953562/lesson/c0acf6a8-7243-47a5-8863-88a90e4b79ee)**
>
> Watch video content
