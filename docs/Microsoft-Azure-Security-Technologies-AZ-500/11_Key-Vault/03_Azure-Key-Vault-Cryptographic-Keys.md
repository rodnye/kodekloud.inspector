# Azure Key Vault Cryptographic Keys - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Key-Vault/Azure-Key-Vault-Cryptographic-Keys)

---

## Table of Contents

- Azure Key Vault Cryptographic Keys
  - Resource Types: Vaults and Managed HSMs
  - Key Types and Protection Methods
  - Compliance Levels
  - Summary
  - Watch Video
    - HSM Protected Keys
    - Software Protected Keys

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Key Vault

# Azure Key Vault Cryptographic Keys

In this article, we explore cryptographic keys in Azure Key Vault—a secure service designed to store and manage sensitive information such as secrets, keys, and certificates. One of the primary features of Azure Key Vault is its robust management of cryptographic keys, ensuring that they are kept safe and accessed only by authorized entities.

## Resource Types: Vaults and Managed HSMs

Azure Key Vault supports two main resource types for handling cryptographic keys:

1.  **Vaults**  
    Standard key vaults allow you to store keys with two protection methods:
    - _Software protected_: Keys secured within the Azure infrastructure using advanced software protection.
    - _HSM protected_: Keys processed in a Hardware Security Module (HSM) for an extra layer of security (available with the premium SKU).

2.  **Managed HSMs**  
    Managed HSMs offer dedicated hardware from a third-party vendor, ensuring continuous HSM protection. This resource type provides the highest level of cryptographic key protection.

To interact with these resources, the base URLs differ:

- For vaults:  
  `https://<thevaultname>.vault.azure.net`
- For managed HSMs:  
  `https://<hsmname>.managedhsm.azure.net`

## Key Types and Protection Methods

Key types in Azure Key Vault are categorized based on two protection methods: HSM protected keys and software protected keys.

### HSM Protected Keys

There are three main key types supported as HSM keys:

- **Elliptic Curve (EC)**
- **RSA**
- **Octet**

> [!important]
> **Note**
>
> Only the premium SKU of Key Vault supports HSM protected keys. While the premium SKU offers various key sizes for most types, Octet HSM is not supported here. Managed HSM supports all the premium SKU options, including Octet HSM.

### Software Protected Keys

For vaults that support both premium and standard SKUs, the supported software protected key types are:

- **RSA**
- **Elliptic Curve (EC)**

It is important to note that Managed HSM does not support software protected keys. Therefore, if your organization relies on software protection for keys, the standard or premium vaults would be a better choice.

![The image is a chart comparing key types and protection methods, showing support for HSM-protected and software-protected keys in vaults and managed HSMs. It details support for elliptic curve, RSA, and symmetric keys with specific bit lengths.](https://kodekloud.com/kk-media/image/upload/v1752881986/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-Key-Vault-Cryptographic-Keys/key-types-protection-methods-chart.jpg)

## Compliance Levels

Compliance requirements can significantly influence your choice of SKUs and key protection methods:

- **Software Protected Keys in Vaults**  
  These keys comply with FIPS 140-2 Level 1, offering basic security suitable for general applications.
- **HSM Protected Keys in Vaults (Premium SKU)**  
  These keys achieve FIPS 140-2 Level 2 compliance. They incorporate physical tamper evidence and role-based authentication, providing enhanced security over Level 1.
- **HSM Protected Keys in Managed HSM**  
  Managed HSM keys comply with FIPS 140-2 Level 3, offering advanced tamper resistance suitable for highly sensitive operations.

![The image is a chart showing key types and protection methods with their corresponding FIPS 140-2 compliance levels. It lists software-protected keys, HSM-protected keys in vaults, and HSM-protected keys in Managed HSM.](https://kodekloud.com/kk-media/image/upload/v1752881987/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Azure-Key-Vault-Cryptographic-Keys/fips-140-2-key-types-chart.jpg)

## Summary

Azure Key Vault provides a comprehensive framework for managing cryptographic keys with different levels of protection and compliance. The decision to choose between vaults and Managed HSMs—as well as the selection of software or HSM protected keys—should be based on your organization’s specific security requirements and compliance mandates.

> [!important]
> **Next Steps**
>
> The discussion on cryptographic keys is now complete. The following sections will cover Azure Key Vault secrets and certificates. Once you've reviewed all three aspects, we will proceed to the Azure portal to deploy and interact with the Key Vault solution. Let's move forward and explore Azure Key Vault secrets.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/e6ef26f3-b79d-482a-8f38-130223404051/lesson/b64cc3ac-ebb2-4963-b0c8-7fcd8bedf15b)**
>
> Watch video content
