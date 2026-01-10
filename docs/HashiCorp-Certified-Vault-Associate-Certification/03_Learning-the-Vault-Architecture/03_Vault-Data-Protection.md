# Vault Data Protection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Vault-Data-Protection)

---

## Table of Contents

- Vault Data Protection
  - How It Works: Two-Tier Key Flow
  - Master Key vs. Data Encryption Key
  - Master Key Details
  - Data Encryption Key Details
  - Further Reading
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Vault Data Protection

Vault secures all data at rest by employing a two-tier key architecture. Your secrets are always encrypted in the storage backend, ensuring that even if an attacker gains full access to the backend, they cannot decrypt your data without the appropriate keys.

![The image illustrates how Vault protects data, showing a process where a Vault Node uses a Master Key to protect an Encryption Key, which in turn protects Vault Data.](https://kodekloud.com/kk-media/image/upload/v1752878237/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Data-Protection/vault-data-protection-process-diagram.jpg)

## How It Works: Two-Tier Key Flow

1.  Vault **initialization** (or a **rekey** operation) generates the Master Key.
2.  Vault creates a **Data Encryption Key** (DEK) used to encrypt/decrypt your actual data.
3.  The Master Key encrypts the DEK; this encrypted DEK is stored alongside your encrypted data in the backend.
4.  On **unseal**, Vault operators supply unseal keys (traditional) or Vault fetches the Master Key from the auto-unseal backend. Vault then decrypts the DEK in memory, allowing seamless data operations.

> [!important]
> **Warning**
>
> If you lose all unseal key shares and have no auto-unseal configured, you will permanently lose access to your data. Always back up unseal keys or configure auto-unseal.

## Master Key vs. Data Encryption Key

| Key Type                | Role                                                    | Storage Location                                                               |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Master Key**          | Encrypts/Decrypts the DEK                               | \\- In memory (traditional unseal)<br>- `core/master` in backend (auto-unseal) |
| **Data Encryption Key** | Encrypts/Decrypts actual payloads stored in the backend | Encrypted by Master Key, stored in the key ring alongside data                 |

## Master Key Details

![The image is a slide explaining how Vault protects data using a Master Key and an Encryption Key, detailing their creation, storage, and usage.](https://kodekloud.com/kk-media/image/upload/v1752878238/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Data-Protection/vault-data-protection-master-key.jpg)

- **Creation**  
  Generated at Vault initialization or during any rekey operation.
- **Storage**
  - Traditional Unseal: Never written to disk; reconstructed in memory from unseal key shares.
  - Auto-Unseal: Stored encrypted at `core/master` in the storage backend, protected by your chosen KMS.
- **Usage**  
  Encrypts and decrypts the DEK, ensuring only an unsealed Vault node can access data encryption keys.

## Data Encryption Key Details

The Data Encryption Key (DEK) is responsible for encrypting payloads in your storage backend.

- **Protection**  
  Always encrypted by the Master Key before being written to storage.
- **Storage**  
  Held in a key ring alongside encrypted data blocks; older keys remain available to decrypt existing data.
- **Rotation**  
  Vault supports automatic DEK rotation:
  - New write operations use the latest key in the ring.
  - Reads first try the newest key, then fall back to older keys if needed.

> [!important]
> **Note**
>
> Regularly rotate your Data Encryption Key to limit the amount of data encrypted under a single key. See [Vault Encryption Key Rotation](https://www.vaultproject.io/docs/concepts/replication#encryption-key-rotation) for details.

## Further Reading

- [Vault Auto-Unseal](https://www.vaultproject.io/docs/configuration/seal)
- [Vault Encryption at Rest](https://www.vaultproject.io/docs/configuration/encryption)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/22434dd1-4734-40d4-b1fb-79fa90abccdf)**
>
> Watch video content
