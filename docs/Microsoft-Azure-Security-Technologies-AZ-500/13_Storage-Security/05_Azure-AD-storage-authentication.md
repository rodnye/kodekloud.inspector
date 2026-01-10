# Azure AD storage authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Storage-Security/Azure-AD-storage-authentication)

---

## Table of Contents

- Azure AD storage authentication
  - Configuring Azure AD Authentication for Storage Access
  - Watch Video
    - Creating the Service Principal
    - Assigning the Appropriate Role
    - Generating and Using the Bearer Token in Postman

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Storage Security

# Azure AD storage authentication

Azure AD Storage Authentication provides a secure and streamlined method for accessing Azure Storage that overcomes many limitations found with shared access signatures (SAS). While SAS tokens offer fine-grained access control, managing them for multiple users or applications can be cumbersome. Moreover, since these tokens are time-bound, any lapse in renewal may cause service disruptions. In contrast, Azure Active Directory (Azure AD) leverages a robust, identity-based authentication and authorization process.

Imagine a scenario where a user who holds the "Storage Blob Contributor" role on a storage account needs to access the blob storage. The following sequence occurs:

1.  The user initiates a login request to Azure AD.
2.  Azure AD verifies the user's credentials.
3.  Upon successful verification, Azure AD issues a bearer token that serves as a temporary access pass.
4.  The user includes this bearer token in a subsequent request to the storage API.
5.  The storage API validates the token, retrieves the requested blob data, and returns it to the user.

Before Azure AD authentication can be implemented, the storage account must be configured with the appropriate Role-Based Access Control (RBAC) roles. Even if your user account has full subscription access—as an owner or contributor—specific RBAC roles are still required. Similar to configuring Key Vault for secret keys or certificates, each Azure Storage resource type (blob, queues, tables, etc.) has its own set of dedicated roles.

![The image illustrates the Azure AD Authentication process for accessing a Storage Blob Container, highlighting the secure authentication method and the requirement for dedicated RBAC roles.](https://kodekloud.com/kk-media/image/upload/v1752882271/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-storage-authentication/azure-ad-authentication-storage-blob.jpg)

> [!important]
> **Note**
>
> Azure AD authentication integrates access with user identity and RBAC permissions, eliminating the dependency on short-lived tokens like SAS.

## Configuring Azure AD Authentication for Storage Access

To configure Azure AD Authentication for accessing your Azure Storage, follow these steps:

- Create a service principal (app registration) in the [Azure Portal](https://portal.azure.com/).
- Generate a client secret and record the credentials securely.
- Use Postman to generate a token by making an API call to Azure AD.
- Access the blob storage using the obtained token.

### Creating the Service Principal

1.  Navigate to the Azure AD section in the Azure Portal and click on "App registrations". For this example, a dedicated service principal is created rather than using your user account.
2.  Click on "New app registration", provide a name (e.g., storage-SPN), and select "Single tenant".
3.  Once the app is created, open the application overview and copy the client ID.
4.  Generate a new client secret and save its value securely (for example, in Notepad).
5.  Record your tenant ID and the endpoint for V1 authentication.

![The image shows the Microsoft Azure portal, specifically the "App registrations" section under "Kodekloud," with options to manage applications and a message about no owned applications in the directory.](https://kodekloud.com/kk-media/image/upload/v1752882272/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-storage-authentication/azure-portal-app-registrations-kodekloud.jpg)

![The image shows a Microsoft Azure portal page for app registrations, specifically for an application named "storage-spn." It displays details like the application ID, object ID, and directory ID, along with options for managing credentials and settings.](https://kodekloud.com/kk-media/image/upload/v1752882273/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-storage-authentication/azure-portal-app-registration-storage-spn.jpg)

### Assigning the Appropriate Role

Next, ensure your service principal is granted proper access by assigning it the relevant RBAC role on your storage account:

1.  Open the target storage account in the Azure Portal.
2.  Navigate to "Access control (IAM)" or "RBAC" and add a new role assignment.
3.  If you require read-only access, search for "Storage Blob Data Reader" (or choose a role that matches your requirements).
4.  Select your service principal (e.g., storage-SPN) and complete the role assignment.

![The image shows a Microsoft Azure portal page for adding a role assignment, specifically for storage blob data roles. It lists various roles like "Defender for Storage Data Scanner" and "Storage Blob Data Contributor" with their descriptions and types.](https://kodekloud.com/kk-media/image/upload/v1752882274/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-AD-storage-authentication/azure-portal-role-assignment-storage.jpg)

### Generating and Using the Bearer Token in Postman

To interact with blob storage via Azure AD authentication, perform the following steps using Postman:

1.  Configure a request in Postman to the Azure AD token endpoint. Use these parameters:
    - client_id: (your copied client ID)
    - client_secret: (your generated client secret)
    - grant_type: client_credentials
    - resource: https://storage.azure.com

    If the request is not correctly formatted, you might receive an error response like the following:

    ```
    {
      "error": "invalid_request",
      "error_description": "AADSSO100441: The request body must contain the following parameter: 'grant_type'.\ntrace ID: b581a328-6080-4d1f-2335-4638b6344a4e\nCorrelation ID: b581a328-6080-4d1f-2335-4638b6344a4e\nTimestamp: 2023-10-18 15:21:22Z.",
      "error_codes": [
        900144
      ],
      "timestamp": "2023-10-18 15:21:22Z",
      "trace_id": "b581a328-6080-4d1f-2335-4638b6344a4e",
      "correlation_id": "b581a328-6080-4d1f-2335-4638b6344a4e",
      "error_uri": "https://login.microsoftonline.com/error?code=900144"
    }
    ```

2.  Once you obtain the bearer token, test access to your storage account. First, try sending a request to your storage URL without an authentication header. You will likely receive a "ResourceNotFound" error, similar to the example shown below:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <Error>
      <Code>ResourceNotFound</Code>
      <Message>The specified resource does not exist.</Message>
      <RequestId>c9c39606-7b0b-6106-7180-412912000000</RequestId>
      <Time>2023-10-18T16:01:23.569075Z</Time>
    </Error>
    ```

3.  Next, update your Postman request by adding the necessary headers:
    - Add the header `x-ms-version` with the value `2017-11-09` to specify the storage service version.
    - Include the Authorization header with the bearer token, formatted as:  
      Authorization: Bearer {your_token}

    Resend the request. If configured properly, the storage service should now return the expected data response.

> [!important]
> **Reminder**
>
> The bearer token is temporary. Once it expires, you need to re-authenticate to continue accessing the storage account. This process is similar regardless of whether you're using a service principal or a user account.

By following this guide, you can securely configure and use Azure AD Storage Authentication, harnessing the strength of identity-based access controls and dedicated RBAC roles to protect your data. Mastery of these concepts is crucial for exploring more complex topics like blob data retention policies.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7acacade-befa-46b1-99e2-3f298d33623d/lesson/7b677959-a885-40e4-8997-40db80f88e33)**
>
> Watch video content
