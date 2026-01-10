# Azure Key Vault Secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Key-Vault/Azure-Key-Vault-Secrets)

---

## Table of Contents

- Azure Key Vault Secrets
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Key Vault

# Azure Key Vault Secrets

Azure Key Vault Secrets provide a secure way to manage sensitive data used by your applications or infrastructure. For instance, if your application running on an Azure server needs to connect to an SQL database, you can store the SQL connection string as a secret in Azure Key Vault instead of embedding it directly in your application's code. This method greatly reduces the security risks associated with hard-coded credentials.

A secret in Azure Key Vault can be any piece of confidential information, such as:

- Database connection strings
- API keys
- Passwords
- Custom strings

Unlike cryptographic keys, which are used for encryption and decryption, secrets are stored as plain text values. Nevertheless, to ensure maximum security, Azure Key Vault encrypts these secrets internally before they are stored.

![The image is a diagram illustrating the flow of data from a server to an application, then to Azure Key Vaults, and finally to an SQL database, under the context of Azure Key Vault secrets management.](https://kodekloud.com/kk-media/image/upload/v1752881987/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-Key-Vault-Secrets/data-flow-server-application-azure-sql.jpg)

> [!important]
> **How Secrets Are Managed**
>
> The Key Vault APIs accept and return secret values as strings. Internally, the Key Vault manages secrets as a collection of objects, each with a maximum size of 25k bytes. Regardless of the internal encryption processes, any secret retrieved (such as a connection string) via an API request is returned as a plain text string.

This concludes our overview of secrets in Azure Key Vault.

Next, we will explore how to work with certificates within the Key Vault environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/e6ef26f3-b79d-482a-8f38-130223404051/lesson/dc9d0a3e-d28a-4f54-9cc8-629a65591130)**
>
> Watch video content
