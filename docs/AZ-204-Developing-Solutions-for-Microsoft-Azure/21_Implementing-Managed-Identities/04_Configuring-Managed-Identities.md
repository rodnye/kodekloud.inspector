# Configuring Managed Identities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Managed-Identities/Configuring-Managed-Identities)

---

## Table of Contents

- Configuring Managed Identities
  - System-Assigned Managed Identity
  - User-Assigned Managed Identity
  - Configuring Managed Identities via the Azure Portal
  - Managing Environment Variables
  - Summary
  - Watch Video
    - Creating a User-Assigned Identity
    - Associating the Identity with a Resource
    - Enabling a System-Assigned Identity
    - Adding a User-Assigned Identity
    - Modifying Identity Assignment for Other Resources

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Managed Identities

# Configuring Managed Identities

In this lesson, you will learn how to configure managed identities in Azure. Azure supports two types of managed identities: system-assigned and user-assigned. Each type provides a secure mechanism for your applications to access Azure resources without the need to manage credentials.

## System-Assigned Managed Identity

A system-assigned managed identity is directly linked to an Azure resource, such as a virtual machine (VM). When you create a new VM with a system-assigned managed identity or enable it on an existing VM, the minimum required role is the Virtual Machine Contributor. No additional Microsoft Entra ID (Azure Active Directory) permissions are necessary.

To enable a system-assigned managed identity when creating a VM via the Azure CLI, use the following command. This command creates a new VM, generates SSH keys (for Linux), and assigns the managed identity in one step:

```
az vm create --resource-group myResourceGroup \
  --name myVM \
  --image Canonical:0001-com-ubuntu-minimal-jammy:minimal-22_04-lts-gen2:latest \
  --generate-ssh-keys \
  --assign-identity \
  --admin-username azureuser \
  --admin-password myPassword12
```

This approach applies to other Azure services as well. Whether you are provisioning an App Service, function app, or another resource, you can enable a system-assigned managed identity at creation time.

## User-Assigned Managed Identity

User-assigned managed identities are standalone resources that you create independently and can associate with multiple resources.

### Creating a User-Assigned Identity

To create a user-assigned identity, run the following command using the Azure CLI:

```
az identity create --resource-group myResourceGroup --name myUserAssignedIdentity
```

### Associating the Identity with a Resource

After creating the identity, you can associate it with a VM (or another Azure service) during its creation. For example, use the following command to create a VM:

```
az vm create --resource-group myResourceGroup \
  --name myVM \
  --image Canonical:0001-com-ubuntu-minimal-jammy:minimal-22_04-lts-gen2:latest \
  --generate-ssh-keys
```

Then, assign the user-assigned identity to the resource by specifying its name. This flexibility allows you to share the identity across multiple services, unlike the one-to-one relationship of system-assigned identities.

## Configuring Managed Identities via the Azure Portal

Azure Portal also provides an intuitive interface for managing both types of identities.

### Enabling a System-Assigned Identity

1.  Navigate to your function app (or another resource) in the Azure portal.
2.  In the left-hand menu, select **Identity**.
3.  Under **System assigned**, toggle the switch to **On** and click **Save**.

    > [!important]
    > **Note**
    >
    > When you save, an app registration is automatically created in your tenant. This registration includes the object ID, app ID, certificate, and other details that allow you to assign permissions as needed.

![The image shows a Microsoft Azure portal interface for a function app named "getmedbstring," with a pop-up asking to enable a system-assigned managed identity. The status toggle is set to "On."](https://kodekloud.com/kk-media/image/upload/v1752866656/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Managed-Identities/azure-portal-function-app-managed-identity.jpg)

### Adding a User-Assigned Identity

1.  First, create the user-assigned managed identity from the **Managed Identities** section in the Azure portal.
2.  Return to your function app, select **Identity**, and go to the **User assigned** tab.
3.  Click **Add** and search for the identity you created (for example, "MSI Functions").

![The image shows a Microsoft Azure portal interface for managing identities, specifically focusing on user-assigned managed identities for a function app. The screen indicates no user-assigned managed identities are currently found, with an option to add one.](https://kodekloud.com/kk-media/image/upload/v1752866657/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Managed-Identities/azure-portal-user-assigned-identities.jpg)

After associating the identity with your function app, you can also assign it to other resources, such as a container instance, to leverage the same credentials across multiple services.

![The image shows a Microsoft Azure portal interface where a user is managing identities for a Function App named "getmedbstring." A sidebar is open for adding user-assigned managed identities.](https://kodekloud.com/kk-media/image/upload/v1752866658/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Managed-Identities/azure-portal-function-app-identities.jpg)

### Modifying Identity Assignment for Other Resources

To manage identities for a container instance:

1.  Navigate to the container instance in the Azure portal.
2.  Select **Identity**.
3.  Add or remove user-assigned identities as necessary.

![The image shows a Microsoft Azure portal interface displaying the "Identity" section for a container instance named "aci-02," with options for system and user-assigned identities.](https://kodekloud.com/kk-media/image/upload/v1752866660/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Managed-Identities/azure-portal-identity-aci-02.jpg)

You can also remove an assigned identity by clicking **Remove**. After removal, you can rely solely on the system-assigned identity for permission assignments.

![The image shows a Microsoft Azure portal interface for a Function App named "getmedbstring," specifically focusing on the Identity settings where a system-assigned managed identity is enabled.](https://kodekloud.com/kk-media/image/upload/v1752866661/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Managed-Identities/azure-function-app-identity-settings.jpg)

## Managing Environment Variables

Proper configuration of environment variables is crucial. If you remove variables such as AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, or AZURE_TENANT_ID from your function app’s environment, your application will not be able to retrieve tokens for accessing services like Key Vault.

Below is an example of an environment variable configuration:

```
[
    {
        "name": "APPLICATIONINSIGHTS_CONNECTION_STRING",
        "value": "InstrumentationKey=9d5fa6f6-a01f-47b4-8d9e-e9f4c4c5e5",
        "slotSetting": false
    },
    {
        "name": "AZURE_CLIENT_ID",
        "value": "a967a243-6784-42d2-a2ed-56b9da79157a",
        "slotSetting": false
    },
    {
        "name": "AZURE_CLIENT_SECRET",
        "value": "sh-8v-go-5xTy3f1PkU4eE4ACC74UyRgfm30a1m",
        "slotSetting": false
    },
    {
        "name": "AZURE_TENANT_ID",
        "value": "1e0fa212-37dc-4f51-bbbf-668678cac64b",
        "slotSetting": false
    },
    {
        "name": "AzureWebJobsStorage",
        "value": "DefaultEndpointsProtocol=https;AccountName=rgaz204wkt",
        "slotSetting": false
    },
    {
        "name": "FUNCTIONS_EXTENSION_VERSION",
        "value": "~4",
        "slotSetting": false
    },
    {
        "name": "FUNCTIONS_WORKER_RUNTIME",
        "value": "dotnet",
        "slotSetting": false
    },
    {
        "name": "KEY_VAULT_URL",
        "value": "https://rgaz204.vault.azure.net/",
        "slotSetting": false
    }
]
```

If any of these variables are absent, services such as Key Vault will not be able to obtain the necessary access tokens.

For example, here is a sample function configuration that depends on these environment variables:

```
{
  "generatedBy": "Microsoft.NET.Sdk.Functions.Generator-4.4.1",
  "configurationSource": "attributes",
  "bindings": [
    {
      "type": "httpTrigger",
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

When the function is executed without the required environment variables, you might see log output similar to the following:

```
Connected: You are now viewing logs of Function runs in the current Code + Test panel. To see all the logs for this Function, please go to 'Logs' from the Function in the Function App.
[Information] Executing 'GetSecretFromKeyVault' (Reason='This function was programmatically called via the host APIs.', Id=10cdf7b7-3718-4b74-ae07-b81707e14c5, Duration=117ms)
[Information] Executed 'GetSecretFromKeyVault' (Succeeded, Id=10cdf7b7-3718-4b74-ae07-b81707e14c5, Duration=117ms)
Missing one or more environment variables: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, KEY_VAULT, URI, SECRET_NAME
```

> [!important]
> **Warning**
>
> Missing any of these environment variables will cause errors, such as failing to retrieve tokens for Key Vault access.

## Summary

In this article, we demonstrated how to configure both system-assigned and user-assigned managed identities to securely access Azure resources. We covered the following:

- How to enable a system-assigned managed identity during resource creation using the Azure CLI.
- The process for creating and assigning a user-assigned managed identity.
- Step-by-step instructions for configuring these identities via the Azure portal.
- How to manage environment variables to ensure secure access to services like Key Vault.

By following these best practices, you can effectively manage identities and improve the security of your Azure applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1eedbbfa-a866-48dd-b220-34f52aefc67c/lesson/1d40bd11-0056-4f7a-a027-e8480f1dfbc1)**
>
> Watch video content
