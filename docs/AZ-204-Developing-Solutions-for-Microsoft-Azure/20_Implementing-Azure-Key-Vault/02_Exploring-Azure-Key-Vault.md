# Exploring Azure Key Vault - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-Key-Vault/Exploring-Azure-Key-Vault)

---

## Table of Contents

- Exploring Azure Key Vault
  - Key Features of Azure Key Vault
  - Benefits of Using Azure Key Vault
  - Creating an Azure Key Vault in the Azure Portal
  - Managing Keys, Secrets, and Certificates
  - Role-Based Access Control and Data Plane Permissions
  - Example: Storing a SQL Connection String as a Secret
  - Best Practices Recap
  - Watch Video
    - Step 1: Launch the Azure Portal
    - Step 2: Configure the Key Vault
    - Step 3: Explore the Deployed Key Vault
    - Keys
    - Secrets
    - Configuring Role-Based Access Control

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure Key Vault

# Exploring Azure Key Vault

Azure Key Vault is a powerful cloud service designed to securely store and manage application secrets, encryption keys, and certificates. By centralizing secret management, it ensures robust protection for sensitive data while simplifying application key workflows.

## Key Features of Azure Key Vault

Azure Key Vault offers three primary functionalities:

1.  **Secrets Management**  
    Securely store and rigorously control access to sensitive data such as passwords, connection strings, and other confidential application details.
2.  **Key Management**  
    Generate, store, and manage cryptographic keys used for data encryption and decryption. This feature serves as an effective key management solution (KMS).
3.  **Certificate Management**  
    Provision, manage, and deploy both public and private SSL/TLS certificates, which are crucial for secure communications.

![The image is an infographic about Azure Key Vault, highlighting its three main features: Secrets Management, Key Management, and Certificate Management. Each feature is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752866636/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-key-vault-infographic.jpg)

## Benefits of Using Azure Key Vault

Azure Key Vault provides significant advantages:

- **Centralized Storage**  
  Maintain all of your application secrets in one secure location, enabling centralized control and distribution.
- **Enhanced Security**  
  Leverage strict authentication and authorization measures to protect secrets and adhere to compliance standards and industry best practices.
- **Activity Monitoring and Auditing**  
  Benefit from detailed logging and auditing, which is essential for tracking access and ensuring security compliance.
- **Simplified Administration**  
  Enjoy easier management with features like automatic renewal and high availability, reducing administrative overhead.

![The image is an infographic highlighting the key benefits of Azure Key Vault, including centralized application secrets, secure storage of secrets and keys, monitoring access and use, and simplified administration of application secrets.](https://kodekloud.com/kk-media/image/upload/v1752866638/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-key-vault-benefits-infographic.jpg)

> [!important]
> **Key Takeaway**
>
> Implementing Azure Key Vault enhances the security posture of your applications by ensuring that sensitive assets are centrally managed and rigorously monitored.

## Creating an Azure Key Vault in the Azure Portal

This section outlines the step-by-step process to create a Key Vault using the Azure Portal.

### Step 1: Launch the Azure Portal

Begin by searching for "Key Vault" within the Azure Portal. Select the option to create a new Key Vault.

### Step 2: Configure the Key Vault

Carefully configure the following settings:

1.  **Resource Group**  
    Create or select an existing resource group (for example, "AKV").
2.  **Key Vault Name**  
    Provide a unique name (e.g., "AKVAZ204") for your Key Vault. The name must be unique across Azure as it forms part of the endpoint (`vaults.azure.net`).
3.  **Pricing Tier**  
    Choose between:

    | Pricing Tier | Description                                                                  |
    | ------------ | ---------------------------------------------------------------------------- |
    | Standard     | Software-based security                                                      |
    | Premium      | Hardware-based security modules, ideal for stringent compliance requirements |

4.  **Control Features**  
    Configure additional options such as soft delete, retention period for deleted vaults, and purge protection.

After reviewing the configuration settings, click the "Create" button.

![The image shows a configuration review screen for creating a resource in Azure, detailing settings like subscription, resource group, region, and access configurations. A "Create" button is highlighted at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752866638/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-resource-configuration-review.jpg)

### Step 3: Explore the Deployed Key Vault

Once deployment is complete, click "Go to resource" to access your Key Vault. The overview page displays key sections for managing keys, secrets, and certificates, along with the vault URI for retrieving stored objects.

![The image shows the Microsoft Azure portal interface for a key vault named "akvaz204," displaying its overview, settings, and management options for keys and secrets.](https://kodekloud.com/kk-media/image/upload/v1752866640/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-portal-key-vault-akvaz204.jpg)

## Managing Keys, Secrets, and Certificates

### Keys

To manage cryptographic keys:

- Navigate to the "Keys" section.
- Generate or import keys according to your cryptographic requirements.
- Configure key properties such as key type, size, activation, and expiration dates.

![The image shows a Microsoft Azure interface for creating a key, with options to set the key type, RSA key size, activation and expiration dates, and other configurations.](https://kodekloud.com/kk-media/image/upload/v1752866642/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-key-creation-interface.jpg)

### Secrets

Adding and managing secrets is straightforward:

- Go to the "Secrets" section.
- Click on "Generate/Import" to add a new secret.
- Fill in the necessary fields such as the secret name, value, content type, activation/expiration dates, and associated tags.

> [!important]
> **Permission Notice**
>
> You may receive a warning regarding insufficient access permissions if your current account does not have the required data plane permissions.

![The image shows a Microsoft Azure interface for creating a secret in the Key Vault. It includes fields for entering the secret's name, value, content type, activation and expiration dates, and tags, with options to enable or disable the secret.](https://kodekloud.com/kk-media/image/upload/v1752866643/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-key-vault-secret-creation.jpg)

## Role-Based Access Control and Data Plane Permissions

Azure Key Vault enforces role-based access control (RBAC) on its data plane alongside the subscription-level management plane. While owning the subscription provides management plane control, explicit permissions are required for accessing and managing stored secrets, keys, and certificates.

- **Access Policies vs. Azure RBAC**  
  Two methods ensure proper access control:
  1.  **Vault Access Policies:** Utilize checkboxes to grant specific permissions.
  2.  **Azure Role-Based Access Control (RBAC):** Offers more granular access control and is the recommended approach.

![The image shows the "Access configuration" page for a key vault in Microsoft Azure, where options for permission models and resource access are being configured.](https://kodekloud.com/kk-media/image/upload/v1752866645/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-key-vault-access-configuration.jpg)

### Configuring Role-Based Access Control

To configure RBAC for secrets management, follow these steps:

1.  Open the "Access Control (IAM)" tab.
2.  Click to add a role assignment by selecting an appropriate role (e.g., "Key Vault Secrets Officer" for modifying secrets or "Key Vault Secrets User" for read-only access).
3.  Assign the role to the relevant account or service principal to unlock data plane access.

![The image shows a Microsoft Azure portal interface for adding a role assignment, specifically listing various Key Vault roles with descriptions, types, categories, and details.](https://kodekloud.com/kk-media/image/upload/v1752866646/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-portal-role-assignment-key-vault.jpg)

For scenarios centered on secret management, assign the "Key Vault Secrets Officer" role:

![The image shows a Microsoft Azure portal screen where a role assignment is being added, specifically assigning the "Key Vault Secrets Officer" role to a user within a specified scope.](https://kodekloud.com/kk-media/image/upload/v1752866648/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Key-Vault/azure-portal-role-assignment-key-vault-2.jpg)

## Example: Storing a SQL Connection String as a Secret

After establishing the required RBAC permissions, you can add secrets to the Key Vault. For instance, to store a SQL connection string, follow these steps:

1.  Navigate to the "Secrets" section.
2.  Click "Generate/Import" to create a new secret.
3.  Enter a name for the secret (e.g., "SQLConnectionString") and provide the connection string value.
4.  Optionally, specify activation and expiration dates.

Below is an example of a SQL connection string stored as a secret:

```
Data Source=airports;Database=airportcodes;Application Name=app;Integrated Security=false;User
```

After saving, the secret is versioned and can be retrieved using the Key Vault URI.

## Best Practices Recap

- Ensure that applications or service principals have the necessary RBAC permissions before accessing any Key Vault data plane features.
- Follow the principle of least privilege by assigning only the required roles.
- Utilize Azure Key Vault's logging and monitoring capabilities to audit and track access to sensitive data.

With these practices in place, Azure Key Vault can seamlessly safeguard sensitive information and enhance the security infrastructure of your applications.

For further details, explore the [Azure Key Vault Documentation](https://docs.microsoft.com/azure/key-vault/) and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/49244587-2545-429d-974d-1856a8953562/lesson/0b3f6d22-ee8f-43b6-8d85-63d7bcd3c262)**
>
> Watch video content
