# Querying Microsoft Graph - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Microsoft-Graph/Querying-Microsoft-Graph)

---

## Table of Contents

- Querying Microsoft Graph
  - Microsoft Graph REST API
  - Microsoft Graph SDK
  - Complete Sample in Visual Studio Code
  - App Registration Considerations
  - Conclusion
  - Watch Video
    - REST APIs Overview
    - Key Components of the Microsoft Graph SDK
    - Example: Setting Up the SDK

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Microsoft Graph

# Querying Microsoft Graph

This guide demonstrates how to interact with Microsoft Graph using both REST APIs and SDKs. Learn about the URL structure, HTTP methods, versioning, and query parameters, and explore the Microsoft Graph SDK along with authentication flows to streamline your development process.

## Microsoft Graph REST API

Microsoft Graph can be accessed via two primary approaches: REST APIs or SDKs.

### REST APIs Overview

When using REST APIs, the endpoint follows this structure:

```
{HTTP method} https://graph.microsoft.com/{version}/{resource}?{query-parameters}
```

Key components include:

- **HTTP Method:** Specifies the action (e.g., GET, POST, PATCH, PUT, DELETE).
- **Version:** Use "v1.0" for stable releases or "beta" for preview features.
- **Resource:** The target entity (e.g., users, groups, drives, devices) along with its associated properties.
- **Query Parameters:** (Optional) Enhance query results with filters like `$filter` and `$select` to choose specific fields.

Tools such as Microsoft Graph Explorer and Postman are useful for testing and understanding these endpoints.

## Microsoft Graph SDK

While the REST API offers direct access, the Microsoft Graph SDK simplifies development by abstracting REST calls into object-oriented methods.

### Key Components of the Microsoft Graph SDK

- **Microsoft Graph Library:** Provides an object-oriented mapping that converts REST APIs into corresponding classes.
- **Core SDK Functions:** Encapsulate functions to call Microsoft Graph endpoints, offering high-level methods for data retrieval.
- **Authentication:** Utilizes authentication providers integrated with the Microsoft Authentication Library (MSAL) for secure token management.

![The image is a slide titled "Querying Microsoft Graph by Using SDKs (1/4)" and describes three components: Microsoft.Graph, Microsoft.Graph.Core, and Authentication, each with brief explanations of their functions.](https://kodekloud.com/kk-media/image/upload/v1752866545/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Querying-Microsoft-Graph/querying-microsoft-graph-sdks-1-4.jpg)

Application builders help retrieve tokens by abstracting various authentication flows. MSAL efficiently handles token acquisition, reducing the need for extra code in your application.

![The image is a slide titled "Querying Microsoft Graph by Using SDKs (2/4)" and describes the use of the MSAL library as a wrapper for authentication, with a flowchart showing the relationship between Microsoft Graph SDK, MSAL, and Microsoft Graph.](https://kodekloud.com/kk-media/image/upload/v1752866546/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Querying-Microsoft-Graph/querying-microsoft-graph-sdks-flowchart.jpg)

### Example: Setting Up the SDK

Below is an example of how to build a Microsoft Graph client using the SDK, configuring the authentication provider, and querying the API for user profile details.

> [!important]
> **SDK Initialization Note**
>
> The following example demonstrates the creation of a GraphServiceClient that leverages device code authentication to access specific user details.

```
// Build a client application.
IPublicClientApplication publicClientApplication = PublicClientApplicationBuilder
    .Create("INSERT-CLIENT-APP-ID")
    .Build();


// Create an authentication provider using the client application and required Graph scopes.
DeviceCodeProvider authProvider = new DeviceCodeProvider(publicClientApplication, graphScopes);


// Initialize GraphServiceClient with the authentication provider.
GraphServiceClient graphClient = new GraphServiceClient(authProvider);
```

Next, query the API to retrieve specific properties from the authenticated user's profile. Instead of fetching the entire profile, select only the necessary fields (display name, user principal name, job title, and mobile phone):

```
// GET https://graph.microsoft.com/v1.0/me with selected properties.
var userProfile = await graphClient.Me
    .Request()
    .Select(u => new {
        u.DisplayName,
        u.UserPrincipalName,
        u.JobTitle,
        u.MobilePhone
    })
    .GetAsync();
```

## Complete Sample in Visual Studio Code

The following complete example demonstrates how to use Public Client Application Builder with a device code flow to acquire an access token and make a Graph API call:

```
using Microsoft.Graph;
using Microsoft.Identity.Client;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;


class Program
{
    // Replace these with your actual application details.
    private static string clientId = "a967af23-c786-47a2-a2ed-5eb9da7b157a";
    private static string tenantId = "1e0fa212-37dc-455f-bb0f-d66867cac64b";
    private static string[] scopes = new[] { "User.Read" };


    static async Task Main(string[] args)
    {
        var publicClientApp = PublicClientApplicationBuilder
            .Create(clientId)
            .WithAuthority($"https://login.microsoftonline.com/{tenantId}")
            .WithRedirectUri("http://localhost")
            .Build();


        var authResult = await publicClientApp
            .AcquireTokenWithDeviceCode(scopes, deviceCodeResult =>
            {
                Console.WriteLine(deviceCodeResult.Message);
                return Task.FromResult(0);
            })
            .ExecuteAsync();


        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", authResult.AccessToken);


        var graphClient = new GraphServiceClient(httpClient);
        var user = await graphClient.Me.GetAsync();


        Console.WriteLine($"Display Name: {user.DisplayName}");
        Console.WriteLine($"User Principal Name: {user.UserPrincipalName}");
        Console.WriteLine($"Job Title: {user.JobTitle ?? "N/A"}");
        Console.WriteLine($"Mobile Phone: {user.MobilePhone ?? "N/A"}");
    }
}
```

In this example, the client ID, tenant ID, and scopes are defined as variables. The device code authentication flow prompts the user via the terminal to visit [microsoft.com/devicelogin](https://microsoft.com/devicelogin) for authentication. Once authenticated, the access token is retrieved and used to execute a Microsoft Graph API call to obtain the user profile.

## App Registration Considerations

Before using the service principal or app registration, ensure that the authentication settings in your Azure portal app registration are correctly configured for device code flow.

> [!important]
> **Important**
>
> Ensure that the device code flow setting is enabled in your app registration configuration. Failing to do so will cause the authentication process to fail.

![The image shows the Microsoft Azure portal's authentication settings for an application, displaying options for redirect URIs and supported account types. It includes sections for mobile and desktop applications and a warning about enabling personal Microsoft accounts.](https://kodekloud.com/kk-media/image/upload/v1752866547/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Querying-Microsoft-Graph/azure-portal-authentication-settings.jpg)

Make sure that after creating your app registration or service principal, the device code flow option is enabled to ensure proper functionality.

## Conclusion

This article has demonstrated how to query Microsoft Graph using both REST APIs and the Microsoft Graph SDK. We covered the endpoint structure, query parameters, and used SDK integration with MSAL for simplified authentication and API calls. By following these practices, you can effectively integrate Microsoft Graph into your applications.

Next, we will explore best practices to further enhance your integration strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/e10b0468-d089-42c7-85af-bae4774dc00c/lesson/59e6ed85-d743-4da0-9be4-62da0c6d2c3b)**
>
> Watch video content
