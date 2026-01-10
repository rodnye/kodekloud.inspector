# Initializing Client Applications - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Authentication-Using-MSAL/Initializing-Client-Applications)

---

## Table of Contents

- Initializing Client Applications
  - Advanced Client Application Customizations
  - Building a Confidential Client Application in Visual Studio Code
  - Creating a Service Principal Using Azure CLI
  - Testing the Application
  - Conclusion
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Authentication Using MSAL

# Initializing Client Applications

In this guide, you'll learn how to initialize both public and confidential client applications using MSAL.NET—a robust library provided by Microsoft for authenticating users and acquiring tokens from Microsoft Entra ID.

The code snippet below demonstrates how to initialize a public client application as well as a confidential client application:

```
// Public client initialization
IPublicClientApplication app = PublicClientApplicationBuilder.Create(clientId).Build();

// Confidential client initialization
string redirectUri = "https://myapp.azurewebsites.net";
IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(clientId)
    .WithClientSecret(clientSecret)
    .WithRedirectUri(redirectUri)
    .Build();
```

> [!important]
> **Note**
>
> Public client applications, commonly used in desktop or mobile contexts, do not store secrets. In contrast, confidential client applications (such as web APIs or backend servers) require a client secret and a redirect URI for secure authentication callbacks.

Using MSAL.NET, you can securely manage both application types, enabling seamless access to Azure Active Directory resources. This initialization process lays the foundation for more advanced authentication configurations that are covered in the following sections.

---

## Advanced Client Application Customizations

After initializing the client applications, you can customize their behavior using several important methods provided by the MSAL.NET library:

- **Authority**: Configure the application authority to Microsoft Entra or a custom endpoint, determining the cloud or tenant used for authentication.
- **WithTenantId**: Specifically sets the tenant ID, which is particularly useful for multi-tenant applications.
- **WithClientId**: Allows reusing the configuration across different clients by overriding the default client ID.
- **WithRedirectUri**: Defines the URI to which users are redirected after authentication, crucial for public client applications.
- **WithComponent**: Tags the library or component name used with MSAL.NET to assist in telemetry.
- **WithDebugLoggingCallback**: Enables custom debug logging to support troubleshooting during the authentication process.
- **WithLogging**: Provides general logging capabilities to track application behavior during authentication.
- **WithTelemetry**: Sends telemetry data for diagnostic purposes, helping to analyze and improve authentication performance over time.

---

## Building a Confidential Client Application in Visual Studio Code

In this section, we will build a confidential client application using Visual Studio Code. The process involves using the ConfidentialClientApplicationBuilder and providing essential details such as the client ID, client secret, required scopes, and authority URI built with your tenant ID. Below is a typical setup:

```
using System;
using System.Threading.Tasks;
using Microsoft.Identity.Client;

class Program
{
    private static string tenantId = "";
    private static string clientId = "";
    private static string clientSecret = "";
    private static string[] scopes = { "https://graph.microsoft.com/.default" };

    static async Task Main(string[] args)
    {
        IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(clientId)
            .WithClientSecret(clientSecret)
            .WithAuthority(new Uri($"https://login.microsoftonline.com/{tenantId}"))
            .Build();

        try
        {
            var result = await app.AcquireTokenForClient(scopes)
                .ExecuteAsync();

            Console.WriteLine("Access Token:");
            Console.WriteLine(result.AccessToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
```

This example shows how the application initializes and requests an access token for specified scopes. On success, the access token is printed to the console; if an error occurs, the exception message is displayed.

---

## Creating a Service Principal Using Azure CLI

You can create a service principal directly from the terminal with the Azure CLI command:

```
az ad sp create-for-rbac
```

This command provisions a service principal and returns credentials in JSON format. An example of the output might be:

```
{
  "title": "MSALClientApp",
  "appid": "a9672fa3-c786-47a2-82ed-5eb947b715a7",
  "password": "T0bclsNzL-nnLuejK-2020-09-17-16-10-026e8105-ed68-4c50-953b-f013w3vb3f1MSALAwCCQ9rnA6gAm",
  "tenant": "1e0f2212-3d4c-4586-bbff-b6068c7ac64b"
}
```

> [!important]
> **Security Warning**
>
> Ensure you securely copy and store these credentials. The password will not be displayed again, so avoid hard coding these values in your source code. Utilize a configuration file with proper security measures for production environments.

For testing purposes, you may temporarily include them in your code, but always follow security best practices when preparing your production applications.

---

## Testing the Application

Once you update the tenant ID, client ID, and client secret in your code, execute the application. An access token will be generated and printed to the console. To verify the token:

1.  Copy the access token.
2.  Paste it into [jwt.ms](https://jwt.ms).

This tool displays token details, such as the app ID and display name, which should match those from the service principal created with the Azure CLI.

The JSON output of the token might include fragments similar to:

```
{
  "typ": "JWT",
  "nonce": "djw1eJwltvFDlXVHZFNKD7hcw-SL71lcPqKQruiBK",
  "x5t": "NmJ5AOS5wMph15FxJav-L8w",
  "kid": "NmJ5AOS5wMph15FxJav-L8w"
}
```

And additional details such as:

```
{
  "aud": "https://graph.microsoft.com/",
  "iss": "https://sts.windows.net/126758962/",
  "exp": 1726598562,
  "nbf": 1726594962,
  "iat": 1697637808,
  "azp": "azure-cli-2024-09-17-16-16-10",
  "app_displayname": "azure-cli-2024-09-17-16-16-10",
  "appid": "8f8e714c-7b83-4d66-b3a6-3d1c9c84a0a0",
  "roles": [
    "app"
  ]
}
```

This access token can be used for additional scopes or delegated permissions, such as accessing the Microsoft Graph API and other services.

---

## Conclusion

This article demonstrated how to work with MSAL.NET to initialize both public and confidential client applications, build a confidential client application in Visual Studio Code, and create a service principal using the Azure CLI. By following these steps, you can securely authenticate and efficiently access Azure Active Directory resources.

Up next, we will discuss Shared Access Signatures and their critical role in enhancing modern application security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/d2c7bdbc-e8ee-4a3f-b742-534131149b1d/lesson/9af94088-1513-42bb-a0b1-e5abe8c936c6)**
>
> Watch video content
