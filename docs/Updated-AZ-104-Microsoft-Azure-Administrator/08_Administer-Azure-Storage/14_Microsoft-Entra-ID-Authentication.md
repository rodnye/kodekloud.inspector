# Microsoft Entra ID Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Storage/Microsoft-Entra-ID-Authentication)

---

## Table of Contents

- Microsoft Entra ID Authentication
  - Authentication and Authorization Workflow
  - Setting Up a Service Principal for Storage Access in Azure Portal
  - Generating an Access Token Using Postman
  - Conclusion
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Storage

# Microsoft Entra ID Authentication

Microsoft Entra ID Authentication (formerly Azure AD Authentication) offers a secure and modern method to access Azure Storage resources—such as blobs, queues, and tables—while avoiding the risks associated with SAS tokens. Unlike SAS tokens, which may inadvertently expose your storage account through logs or application history, Entra ID brings built-in multi-factor authentication and conditional access policies. These advanced features allow you to restrict access based on corporate network conditions or geographic regions. Even if you hold owner or contributor permissions at the subscription level, you still require storage-specific RBAC (Role-Based Access Control) assignments to access storage resources.

> [!important]
> **Note**
>
> For enhanced security, always prefer Entra ID Authentication over SAS tokens to protect your storage account. Integrated features such as multi-factor authentication and conditional access provide an additional layer of security.

In the following sections, we detail the authentication and authorization workflow using Microsoft Entra ID and demonstrate the process in the Azure Portal via a service principal setup.

---

## Authentication and Authorization Workflow

Consider a scenario where you have the "Storage Blob Data Contributor" role and need to access a storage account. The process involves three key steps:

1.  **Authentication:**  
    The process begins with submitting a login request to Microsoft Entra ID using your credentials (username and password). After successful authentication—potentially including multi-factor verification—Microsoft Entra ID returns an HTTP 200 status with a bearer token.
2.  **Authorization:**  
    This bearer token is then used to authenticate your subsequent request to the Azure Storage API. Access is verified against your assigned RBAC role (e.g., Storage Blob Data Contributor), ensuring that only authorized operations are allowed.
3.  **Data Access:**  
    On successful authorization, the storage service processes your request and returns the requested data.

![The image illustrates Microsoft Entra ID Authentication, highlighting a secure authentication process that requires dedicated RBAC roles. It includes a flow diagram showing interactions between a user, authentication service, and storage blob container using bearer tokens.](https://kodekloud.com/kk-media/image/upload/v1752884383/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Microsoft-Entra-ID-Authentication/microsoft-entra-id-authentication-diagram.jpg)

---

## Setting Up a Service Principal for Storage Access in Azure Portal

This section explains how to set up a service principal (an app registration in Microsoft Entra ID) to access an Azure Storage account without using a personal user account.

1.  **Create the Service Principal:**
    - Log in to the Azure Portal and navigate to **Azure AD (Microsoft Entra ID)**.
    - Open **App registrations** and create a new registration (for instance, "storage-spn") for a single tenant.
    - After the app is created, copy the **Client ID** from the overview page.
    - Move to the **Certificates & secrets** section, generate a new client secret, and save its value for later use.
    - Also, note the **Tenant ID** found on the Azure AD overview page.

    ![The image shows a Microsoft Azure portal page for managing "Certificates & secrets" under an app registration named "storage-spn." It displays details of a client secret, including its description, expiration date, and value.](https://kodekloud.com/kk-media/image/upload/v1752884384/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Microsoft-Entra-ID-Authentication/azure-portal-certificates-secrets-storage-spn.jpg)
    - Additionally, copy the endpoint for V1 if required.

2.  **Assign RBAC Roles on the Storage Account:**
    - Navigate to the desired Storage Account.

      ![The image shows a Microsoft Azure portal interface displaying details of an app registration named "storage-spn," including its application ID, object ID, and various OAuth and API endpoints.](https://kodekloud.com/kk-media/image/upload/v1752884385/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Microsoft-Entra-ID-Authentication/azure-portal-storage-spn-details.jpg)

    - Under the **Access Control (IAM)** section, add a role assignment.
    - For example, assign the built-in **Storage Blob Data Reader** role to grant read-only access to blob data.
    - Click **Next**, select **Members**, and search for the registered service principal named "storage-spn" to complete the role assignment.

      ![The image shows a Microsoft Azure portal interface for adding a role assignment, specifically for managing access to Azure Storage Blob Data with various built-in roles listed.](https://kodekloud.com/kk-media/image/upload/v1752884386/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Microsoft-Entra-ID-Authentication/azure-portal-role-assignment-storage.jpg)

      ![The image shows a Microsoft Azure portal interface for adding a role assignment, specifically for the "Storage Blob Data Reader" role. A sidebar is open for selecting members, displaying a list of potential users to assign the role to.](https://kodekloud.com/kk-media/image/upload/v1752884387/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Microsoft-Entra-ID-Authentication/azure-portal-role-assignment-storage-blob-reader.jpg)

---

## Generating an Access Token Using Postman

After configuring the service principal with the appropriate RBAC role, you can generate an access token to communicate with the Storage API via Postman.

1.  **Token Request Setup:**
    - In Postman, initiate a POST request to the Azure AD token endpoint.
    - Set the following form data parameters:
      - **client_id:** Paste the Client ID obtained from your app registration.
      - **client_secret:** Paste the generated client secret.
      - **grant_type:** Use `client_credentials` to indicate the type of authentication.
      - **resource:** Set this parameter to `https://storage.azure.com`.

    - Send the request; a successful call returns a JSON response similar to the following:

    ```
    {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImYzYTA4MjJjZWVkZTc5Y2ExOWM3ZTA5MjcyYTY2MGE2MTA1YzBiYTciLCJ4NXAiOiJhbGciOiJSUzI1NiIsImtpZCI6ImYzYTA4MjJjZWVkZTc5Y2ExOWM3ZTA5MjcyYTY2MGE2MTA1YzBiYTci... (truncated for brevity)"
    }
    ```

2.  **Accessing Storage Resources:**
    - Use the generated access token in subsequent requests to the storage API.
    - Paste the storage endpoint URL in Postman.
    - If you send the request without setting an authentication header, you will receive a "ResourceNotFound" response.
    - To resolve this, add the following headers:
      - **X-MS-Version:** Set to `2017-11-09` to specify the storage service version.
      - **Authorization:** Use the format `Bearer <your_access_token>` to include your token.

    - After adding these headers, resend the request. If the token is valid and RBAC permissions are correct, the storage service will return the file data.

Below is an example of an XML error response encountered when authentication is not properly applied:

```
<?xml version="1.0" encoding="utf-8"?>
<Error>
    <Code>ResourceNotFound</Code>
    <Message>The specified resource does not exist.</Message>
    <RequestId>e9c936c6-9780-4b66-716c-fa1920098900</RequestId>
    <Time>2023-10-09T14:09:23.6599575Z</Time>
</Error>
```

Once the authentication headers are correctly set, Azure AD validates the token and the storage resource is successfully retrieved. Keep in mind that when the token expires, you must repeat the process to obtain a new token.

![The image shows a Postman interface with a POST request to an Azure AD token endpoint, displaying form data parameters and a JSON response containing an access token.](https://kodekloud.com/kk-media/image/upload/v1752884389/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Microsoft-Entra-ID-Authentication/postman-azure-ad-token-request.jpg)

---

## Conclusion

By integrating Microsoft Entra ID Authentication with Azure RBAC, you achieve robust security for accessing Azure Storage. This method ensures that access is granted only through verified identity and precise role-based permissions, whether accessed via a user account or service principal. These practices form a strong foundation for secure and scalable Azure administration.

For further details on Azure administration and identity management, explore additional resources on [Azure Documentation](https://docs.microsoft.com/azure) and [Microsoft Entra](https://docs.microsoft.com/azure/active-directory/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/48d08f66-feb9-4bae-83b0-2e6aa34e24ae/lesson/d8b58f6f-2018-4125-94c3-9ceaa343755a)**
>
> Watch video content
