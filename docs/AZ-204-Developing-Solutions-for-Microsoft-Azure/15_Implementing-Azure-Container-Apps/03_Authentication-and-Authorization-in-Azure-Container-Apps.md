# Authentication and Authorization in Azure Container Apps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-Container-Apps/Authentication-and-Authorization-in-Azure-Container-Apps)

---

## Table of Contents

- Authentication and Authorization in Azure Container Apps
  - Authentication Flows
  - Implementing Server-Directed Authentication via the Azure Portal
  - Example JSON Response Post-Authentication
  - Additional JSON Output Example
  - Summary
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure Container Apps

# Authentication and Authorization in Azure Container Apps

Azure Container Apps is a powerful service that enables developers to effortlessly run microservices and containerized applications. This guide explains how authentication and authorization are implemented, ensuring only verified users can access designated resources.

Authentication confirms user identity, while authorization determines the level of access granted to authenticated users. Azure Container Apps leverages federated identity by integrating with third-party identity providers such as Microsoft Identity Platform (Azure Active Directory or Microsoft Entra ID), Facebook, GitHub, Google, Twitter, and any provider supporting OpenID Connect. This approach streamlines identity management and integrates seamlessly with your existing authentication schemes.

![The image illustrates Azure Container Apps' authentication and authorization using third-party identity providers, including logos of Microsoft, Facebook, GitHub, and Google.](https://kodekloud.com/kk-media/image/upload/v1752866600/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-Container-Apps/azure-container-apps-authentication-logos.jpg)

The authentication flow remains consistent across providers, though the details may vary depending on whether you use the provider's SDK.

## Authentication Flows

There are two primary authentication flows:

1.  **Server-Directed (Server-Flow) Authentication:**  
    This flow delegates the authentication process to the identity provider. It typically involves a browser-based sign-in experience similar to that used in Azure App Service.
2.  **Client-Directed (Client-Flow) Authentication:**  
    When using the provider's SDK, the application handles the sign-in process directly on behalf of the user. The SDK then submits the obtained authentication token to the container app for validation.

![The image is a flowchart illustrating two authentication processes for Azure Container Apps: "Browser-Based Sign-In" and "Client-Directed Authentication," each showing steps from user request to validation.](https://kodekloud.com/kk-media/image/upload/v1752866601/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-Container-Apps/azure-container-apps-authentication-flowchart.jpg)

> [!important]
> **Note**
>
> For detailed implementation examples, refer to the official [Azure Container Apps documentation](https://learn.microsoft.com/en-us/azure/container-apps/).

## Implementing Server-Directed Authentication via the Azure Portal

Follow these steps to implement server-directed authentication (without the provider's SDK):

1.  Using the same container app created earlier, navigate to the **Authentication** section in the Azure Portal.
2.  Select the desired identity provider. For this example, choose **Microsoft** and create a new app registration.

![The image shows a Microsoft Azure portal interface for adding an identity provider, with options for app registration and additional checks.](https://kodekloud.com/kk-media/image/upload/v1752866603/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-Container-Apps/azure-portal-identity-provider-interface.jpg)

3.  Configure the settings for the identity provider:
    - Set the token expiration to 90 days (or as required).
    - Leave other settings as default.
    - In the permissions section, enable the "user.read" permission to allow the application to access user profile data.
4.  Click **Add** to register the identity provider. This registration will appear in your Microsoft Entra ID.

> [!important]
> **Important**
>
> If you are not using the provider's SDK, follow these steps directly. When utilizing the SDK, additional code modifications will be required to manage the authentication flow.

After the identity provider is added, refresh the portal. If caching occurs, open an incognito window to verify the login page displays correctly. On the incognito page, you should be redirected to the sign-in page. Once you complete the sign-in process and accept the consent prompt, the app will gain permission to access your profile data—the same app created during the identity provider setup is used for authentication.

## Example JSON Response Post-Authentication

Below is an example JSON response retrieved after successful authentication:

```
[{"code":"URM","airport_name":"Uji in Airport","country_code":"China"},{"code":"YYZ","airport_name":"Aupatuk Airport","country_code":"Serbia"},{"code":"TYE","airport_name":"Tyonek Airport","country_code":"China"},{"code":"PPM","airport_name":"Ides-de-la-Madeleine Airport","country_code":"Democratic Republic of the Congo"},{"code":"MJZ","airport_name":"Phrae Airport","country_code":"Thailand"},{"code":"MWA","airport_name":"Mtwara Airport","country_code":"Tanzania"},{"code":"GHE","airport_name":"Gisborne Municipal Airport","country_code":"New Zealand"},{"code":"NON","airport_name":"Chino Airport","country_code":"United States"},{"code":"CNA","airport_name":"Panama Al Airport","country_code":"China"},{"code":"CPO","airport_name":"Coppertown Westville Airport","country_code":"France"},{"code":"VZZ","airport_name":"Natal Airport","country_code":"Sweden"},{"code":"STW","airport_name":"Stawag Airport","country_code":"Philippines"},{"...}]
```

Upon sign-in, the Microsoft login page will display a consent request indicating the permissions required by the application.

![The image shows a Microsoft login page requesting permissions for an application named "airportcodeapiapp2," with options to accept or cancel.](https://kodekloud.com/kk-media/image/upload/v1752866605/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Authentication-and-Authorization-in-Azure-Container-Apps/microsoft-login-airportcodeapiapp2.jpg)

## Additional JSON Output Example

Below is another example of the JSON output as part of the authentication process:

```
[{"code":"URM","airport_name":"Uji in Airport","country_code":"China"},{"code":"VPY","airport_name":"Aupaluk Airport","country_code":"Serbia"},{"code":"TYE","airport_name":"Tyonek Airport","country_code":"China"},{"code":"PMR","airport_name":"Ides-de-la-Madeleine Airport","country_code":"Democratic Republic of the Congo"},{"code":"GHE","airport_name":"Gisenyi Airport","country_code":"Rwanda"},{"code":"KHE","airport_name":"Pihrek Airport","country_code":"Uzbekistan"},{"code":"NOJ","airport_name":"Gainesville Municipal Airport","country_code":"England"},{"code":"ONN","airport_name":"Aliko Airport","country_code":"Chino"},{"code":"CDW","airport_name":"Dadu West Airport","country_code":"Philippines"},{"code":"CQP","airport_name":"Copseworth-Wesley Airport","country_code":"France"},{"code":"YYZ","airport_name":"Toronto Pearson International Airport","country_code":"Canada"},{"code":"PDN","airport_name":"Halpula Downs Airport","country_code":"Argentina"},{"code":"CQM","airport_name":"Chilpancingo State Airport","country_code":"Mexico"},{"code":"VLA","airport_name":"Nagari Airport","country_code":"Indonesia"},{"code":"KIH","airport_name":"Niigata Airport","country_code":"Japan"},{"code":"PHR","airport_name":"Hale Fkeet Airport","country_code":"Philippines"},{"code":"GBJ","airport_name":"Runaway Bay Airport","country_code":"Jamaica"},{"code":"DIA","airport_name":"Palmaria Savona Airport","country_code":"Italy"},{"code":"WOO","airport_name":"Ras el Hanout Airport","country_code":"Egypt"},{"code":"CIU","airport_name":"Chippewa County International Airport","country_code":"United States"},{"code":"SCD","airport_name":"Gatwick Airport","country_code":"United Kingdom"},{"code":"SGZ","airport_name":"Cangzhou Airport","country_code":"China"},{"code":"TKB","airport_name":"Ile Boulon Airport","country_code":"Mozambique"},{"code":"LGD","airport_name":"Laguna de Gasco Airport","country_code":"Chile"},{"code":"YOW","airport_name":"Ottawa Macdonald-Cartier International Airport","country_code":"Canada"},{"code":"CZA","airport_name":"Northwestern Water Airport","country_code":"United States"},{"code":"RKZ","airport_name":"Rosarito Airport","country_code":"Mexico"},{"code":"GCY","airport_name":"Greece Manov Airport","country_code":"Greece"},{"code":"RSI","airport_name":"RSI-Apango Airport","country_code":"Cameroon"},{"code":"VFC","airport_name":"Marlon County Fife Airport","country_code":"American Samoa"},{"code":"KZG","airport_name":"Kiango Airport","country_code":"Egypt"},{"code":"ERB","airport_name":"King George Airport","country_code":"United Kingdom"},{"code":"RICE","airport_name":"Redding AIRPORT","country_code":"United States"},{"code":"GNI","airport_name":"Gillian National Airport","country_code":"France"},{"code":"TPA","airport_name":"St. Pete-Clearwater International Airport","country_code":"United States"}]
```

## Summary

This lesson demonstrated how to implement authentication in Azure Container Apps using both SDK-based and non-SDK-based approaches. Future sessions will address managing revisions and secrets within Azure Container Apps, as well as a deeper dive into the Microsoft Authentication Library and its integration.

For more detailed guidance, visit the [official Azure Container Apps documentation](https://learn.microsoft.com/en-us/azure/container-apps/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/8ecdad92-d6a0-4292-9798-efa24d97f567/lesson/9fff7f26-698c-45a4-9fac-7f36fea90ec8)**
>
> Watch video content
