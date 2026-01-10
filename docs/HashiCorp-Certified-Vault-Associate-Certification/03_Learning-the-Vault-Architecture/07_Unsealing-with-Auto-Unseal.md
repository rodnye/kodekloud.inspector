# Unsealing with Auto Unseal - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Unsealing-with-Auto-Unseal)

---

## Table of Contents

- Unsealing with Auto Unseal
  - How Auto Unseal Works
  - Supported Auto Unseal Providers
  - Configuration Example: AWS KMS
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Unsealing with Auto Unseal

Auto unseal removes the manual overhead of key-shares at startup by delegating master key encryption and decryption to an external Key Management Service (KMS) or Hardware Security Module (HSM). This streamlines Vault operations, improves reliability, and ensures high availability.

## How Auto Unseal Works

1.  **Master Key Encryption**  
    Vault encrypts its master key with a key stored in an external KMS/HSM instead of splitting it into manual key-share shards. Supported providers include cloud KMSes (AWS KMS, Azure Key Vault, Google Cloud KMS) and on-prem HSMs.
2.  **Storage Backend**  
    The encrypted master key is persisted in your chosen storage backend (Consul, etcd, S3, etc.).
3.  **Service Startup / Restart**  
    When Vault boots or restarts, it:
    - Reads the encrypted master key from storage.
    - Calls out to the configured KMS/HSM to decrypt the master key.
    - Uses the decrypted master key to unlock the data encryption key (DEK).
    - Loads the DEK into memory to access and serve secrets.

4.  **Automatic Unseal**  
    No operator action is needed. As soon as Vault initializes, it retrieves and decrypts its master key via the KMS/HSM and completes the unseal process automatically.

> [!important]
> **Note**
>
> Auto unseal works with both open-source and Enterprise Vault. Since Vault 1.0, this feature is available in the open-source edition.

## Supported Auto Unseal Providers

| Provider              | Seal Stanza          | Documentation                                                                |
| --------------------- | -------------------- | ---------------------------------------------------------------------------- |
| AWS KMS               | seal "awskms"        | https://www.vaultproject.io/docs/secrets/aws#auto-unseal-using-aws-kms       |
| Azure Key Vault       | seal "azurekeyvault" | https://www.vaultproject.io/docs/secrets/azure#auto-unseal-using-azure-kv    |
| Google Cloud KMS      | seal "gcpckms"       | https://www.vaultproject.io/docs/secrets/gcp#auto-unseal-using-gcp-kms       |
| AliCloud KMS          | seal "alicloudkms"   | https://www.vaultproject.io/docs/secrets/alicloud#auto-unseal                |
| On-prem HSM (PKCS#11) | seal "pkcs11"        | https://www.vaultproject.io/docs/secrets/pkcs11#auto-unseal-using-pkcs11-hsm |

## Configuration Example: AWS KMS

Add the `seal` stanza beneath your global configuration to enable AWS KMS auto unseal:

```
storage "consul" {
  address = "127.0.0.1:8500"
  path    = "vault/"
}


listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
}


seal "awskms" {
  region     = "us-east-1"       # AWS region where the KMS key resides
  kms_key_id = "arn:aws:kms:us-east-1:123456789012:key/abcd-1234"
}


api_addr = "https://<VAULT_IP>:8200"
ui       = true
```

- **seal "awskms"**: Configures AWS KMS as the unseal mechanism.
- **region**: The AWS region where your KMS key exists.
- **kms_key_id**: The full ARN or key ID of the KMS key used to encrypt/decrypt the Vault master key.

> [!important]
> **Warning**
>
> Do not commit your `kms_key_id` (or any credentials) into source control. Use environment variables or a secrets management workflow to inject sensitive data.

You can swap out `"awskms"` for any of the other supported providers by updating the seal stanza accordingly.

## Links and References

- [Vault Auto Unseal Overview](https://www.vaultproject.io/docs/concepts/seal)
- [Vault AWS KMS Seal](https://www.vaultproject.io/docs/secrets/aws#auto-unseal-using-aws-kms)
- [Vault Azure Key Vault Seal](https://www.vaultproject.io/docs/secrets/azure#auto-unseal-using-azure-kv)
- [Vault Google Cloud KMS Seal](https://www.vaultproject.io/docs/secrets/gcp#auto-unseal-using-gcp-kms)
- [Vault PKCS#11 HSM Seal](https://www.vaultproject.io/docs/secrets/pkcs11#auto-unseal-using-pkcs11-hsm)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/67201222-6b28-441e-8e82-ac0313868e85)**
>
> Watch video content
