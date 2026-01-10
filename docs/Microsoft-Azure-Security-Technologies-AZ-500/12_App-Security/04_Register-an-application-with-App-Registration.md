# Register an application with App Registration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/App-Security/Register-an-application-with-App-Registration)

---

## Table of Contents

- Register an application with App Registration
  - Core Features of App Registration
  - Creating an App Registration in the Azure Portal
  - Obtaining and Using Tokens
  - Validating the JWT Token
  - Conclusion
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

App Security

# Register an application with App Registration

In this guide, you will learn how to integrate your application with Azure Active Directory (Azure AD) using the app registration process. App registration enables Azure AD to recognize your application by configuring credentials and settings for authentication and authorization. Once registered, your app is assigned a unique application (client) ID, which acts as an identifier during authentication—similar to a username for individuals.

## Core Features of App Registration

Registering your application with Azure AD provides several advantages:

- **Centralized Application Management:**  
  Manage all your registered applications through a unified Azure AD dashboard that streamlines configuration, permissions, and settings.
- **Secure User Authentication:**  
  Leverage robust authentication mechanisms provided by Azure AD to ensure only authorized users gain access to your application.
- **Fine-Grained Authorization:**  
  Define specific permissions for accessing resources or performing operations once a user is authenticated.
- **Seamless Azure Services Integration:**  
  Grant your application permission to access various Azure services such as Azure SQL Database and Blob Storage.

  > [!important]
  > **Tip**
  >
  > For example, in a Key Vault demonstration, an app registration was created and its credentials were shared with a function app to grant the appropriate permissions effortlessly.

- **App-to-App Authentication:**  
  Securely establish communication between your application and other services using application IDs and secrets or certificates.
- **Developer-Friendly Tools:**  
  Benefit from comprehensive SDKs, libraries, and samples available for multiple languages and platforms.
- **Enhanced Security and Scalability:**  
  Build on a globally distributed platform that follows industry-standard protocols to ensure high availability and robust security.

![The image is a guide on registering an application with app registration, highlighting features like centralized management, secure authentication, and Azure integration. It includes a screenshot of an application registration interface with details like application ID and tenant ID.](https://kodekloud.com/kk-media/image/upload/v1752881627/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/app-registration-guide-azure-authentication.jpg)

## Creating an App Registration in the Azure Portal

Follow these steps to create an app registration using the Azure Portal:

1.  **Access the Azure Portal and Microsoft Entra ID:**  
    Sign in to the [Azure Portal](https://portal.azure.com). Navigate to **Microsoft Entra ID** (formerly Azure Active Directory).

    ![The image shows the Microsoft Azure portal interface, displaying various services and resources, with a sidebar menu highlighting "Microsoft Entra ID."](https://kodekloud.com/kk-media/image/upload/v1752881629/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/azure-portal-microsoft-entra-id.jpg)

2.  **Navigate to App Registrations:**  
    In the Microsoft Entra ID menu, select **App registrations** to view your existing applications or create a new one.

    ![The image shows the Microsoft Azure portal, specifically the "App registrations" section under "Kodekloud," with options to manage applications and a notification about updates to authentication libraries.](https://kodekloud.com/kk-media/image/upload/v1752881631/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/azure-portal-app-registrations-kodekloud.jpg)

3.  **Initiate a New Registration:**  
    Click **New registration**. Enter a descriptive name for your application (for example, "appsecreg"). Choose the supported account type based on whether your users are in a single organizational directory or multiple directories/personal accounts. This selection determines the authentication methods and credential types available.

    ![The image shows a Microsoft Azure portal page for registering an application, with fields for the application name and supported account types. The user is in the process of entering "app-sec-reg" as the application name.](https://kodekloud.com/kk-media/image/upload/v1752881632/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/azure-portal-app-registration.jpg)

4.  **Configure the Redirect URI:**  
    Specify the Redirect URI where users are sent after authentication. If your application requires a redirect (for instance, to a homepage), provide the appropriate URL. If not, simply click **Register**.
5.  **Review Registration Details:**  
    Once registered, the application details page displays critical information such as the application ID, object ID, and directory (tenant) ID.

    ![The image shows a Microsoft Azure portal page for an app registration named "app-sec-reg," displaying details like application ID, object ID, and directory ID, along with options for managing authentication and API permissions.](https://kodekloud.com/kk-media/image/upload/v1752881634/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/azure-portal-app-sec-reg-details.jpg)

## Obtaining and Using Tokens

After completing app registration, you can use the provided credentials (client ID and client secret) to authenticate against Azure AD and acquire tokens.

1.  **Copy Essential Registration Details:**  
    On the app registration page, copy the application (client) ID and note the token endpoint provided under **Endpoints**. This token endpoint is necessary when making authentication requests.

    ![The image shows a Microsoft Azure portal interface displaying details of an app registration named "app-sec-reg," including its endpoints and essential information like application and directory IDs.](https://kodekloud.com/kk-media/image/upload/v1752881636/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/azure-portal-app-sec-reg-details-2.jpg)

2.  **Generate a Client Secret:**  
    Navigate to the **Certificates & secrets** section. Create a new client secret by assigning it a descriptive name (for example, "app secret") and choosing an appropriate expiration period.

    > [!important]
    > **Important**
    >
    > Make sure to copy the client secret value immediately after creating it, as it will only be displayed once.

3.  **Test with Postman:**  
    Use Postman to verify token generation by performing a POST request to the token endpoint URL. In the request, set the parameters in the **x-www-form-urlencoded** body:
    - client_id
    - client_secret
    - grant_type (for instance, client_credentials)
    - scope (for example, graph.microsoft.com/.default)

    The snippet below shows an example of the token endpoint and credentials:

    ```
    https://login.microsoftonline.com/1e0fa212-37dc-45f5-bbbf-b66867cac64b/oauth2/v2.0/token
    client_id: 5463b367-8a0d-4834-84a5-f81670632e3d
    client_secret: xWNq7_W_x1O1WGyQGxC8twgCwK83mvDenbLG
    ```

4.  **Handling API Errors:**  
    If any required parameters are missing, Postman will display an error message indicating the missing field (for example, a missing grant_type). Include all necessary values and click **Send** to receive an access token.

    ![The image shows a Microsoft Azure portal interface with a focus on "Certificates & secrets" for an app registration. A Postman window is open, displaying a POST request to a Microsoft login URL, with an error message indicating a missing parameter.](https://kodekloud.com/kk-media/image/upload/v1752881637/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/azure-portal-certificates-postman-error.jpg)

    After correcting the request:

    ![The image shows a Microsoft Azure portal interface with an API request being configured in Postman. It includes details like client ID, client secret, and a response with an access token.](https://kodekloud.com/kk-media/image/upload/v1752881638/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Register-an-application-with-App-Registration/azure-portal-postman-api-request.jpg)

## Validating the JWT Token

The access token returned by Azure AD is a JWT (JSON Web Token). To inspect its content:

1.  Copy the JWT token from Postman.
2.  Visit a JWT validation website, such as [jwt.ms](https://jwt.ms).
3.  Paste the token to review details including audience, issuer, application ID, tenant ID, and additional claims.

Below is an example of a decoded JWT payload:

```
{
  "type": "JWT",
  "nonce": "qN0I_Mj8hC-NIsp0hiqzdHqm663-kLuYjGL7FeD08",
  "alg": "RS256",
  "kid": "KI3g0Mn7RboKfxmeZoXqbhHZGew",
  "aud": "https://graph.microsoft.com/",
  "iss": "https://sts.windows.net/10efa212-37dc-45f5-bb6f-606876cac64b/",
  "iat": 1696666347,
  "exp": 1696669947,
  "azp": "sa368d87-8ad8-4834-84d5-fb816780e32d",
  "appid": "9c4de6c6-33f1-46cf-ad9d-55c840123798",
  "oid": "33f9f41d-55d1-4ece-97d5-55c840123798",
  "tid": "ABCdAEIptP1uU3D7Y0hGrShSAAAAAAAAAAAAAAAAAAA",
  "sub": "33f9f41d-55d1-4ece-97d5-55c840123798",
  "upn": "app_sec-reg@theidk1Xk-UV13@dev.onmicrosoft.com",
  "wids": []
}
```

If you inspect tokens generated via user-based authentication (using password or Azure MFA) through the Developer Console, you will observe additional details indicating user impersonation. For example:

```
{
  "typ": "JWT",
  "alg": "RS256",
  "kid": "KI3Q9hN7RfoKmeZoXqbHZGew",
  "aud": "https://management.core.windows.net/",
  "iss": "https://sts.windows.net/1e0fa212-37dc-45f5-bbe6-b6687cace64b/",
  "iat": 1696617373,
  "exp": 1696686867,
  "acr": "1",
  "aio": "AVQAAQ/8UAAAAPzxmG5u82DxmphEHaqQbJHZARn43EhDyyb1ProUY10GxTrJ8R9Y10h38Y8nq4dRCb4a4-9K1B11xGCYuaZL6FNcrg1lMYQr8aTx8/",
  "amr": [
    "pwd"
  ],
  "appid": "c44bd083-3bb0-49c1-b47d-974e53cbdf3c",
  "appidacr": "0",
  "groups": [
    "12052lea-47ad-455b-abf8-287697d9544f"
  ],
  "idtyp": "user",
  "ipaddr": "2a04:7f80:2:daba:8c54:272:95b2:c2d0",
  "name": "Rithin Skaria",
  "oid": "4d469429-1f09-4d4b-b476-9c72c74b3639",
  "rh": "1A0J3022E8F35673",
  "sid": "A8cEia6jPhtW3U7DVGrhG6S2f1XakutPukPawf2MBPJACC.",
  "sub": "hZdyYtUtbW8hUYPKIyLPLoQkb8BSRoUeJAP7y7Yf",
  "tid": "1e0fa212-37dc-45f5-bbe6-b6687cace64b",
  "unique_name": "rithinskariaqdokeloudlab.onmicrosoft.com",
  "upn": "rithinskariaqdokeloudlab.onmicrosoft.com",
  "ver": "odxG1G6ubctB43dAfaA",
  "xms_caa": "1",
  "xms_tcd": 1692377386
}
```

These tokens provide all the necessary data to verify both the user's and the application's authenticity.

## Conclusion

App registration is a crucial first step for securing your application with Azure AD by leveraging Microsoft's Identity Services. By following the steps in the Azure Portal, generating tokens with Postman, and validating JWT tokens, you can ensure secure authentication and authorization for your application.

For further details on integrating with Microsoft services, explore the [Graph API](https://docs.microsoft.com/graph/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/c93091f0-246d-47cc-a399-0e33ad87ee7f/lesson/3746d8ca-434f-4383-86d9-954ef1dbb6a3)**
>
> Watch video content
