# Encrypting Data with the Transit Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Encrypting-Data-with-the-Transit-Secrets-Engine)

---

## Table of Contents

- Encrypting Data with the Transit Secrets Engine
  - Encryption Challenges in the Enterprise
  - Introducing the Transit Secrets Engine
  - How It Works
  - Key Management and Rotation
  - Application-Specific Keys
  - Supported Key Types
  - Convergent Encryption Mode
  - Base64 Encoding Requirement
  - Watch Video
    - Limitations of Database Encryption
    - Drawbacks of Custom Libraries
    - Re-wrapping Ciphertext

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Encrypting Data with the Transit Secrets Engine

In this guide, you’ll learn how Vault’s Transit Secrets Engine centralizes encryption operations, removes the burden of key management from application teams, and provides a consistent API for data protection.

## Encryption Challenges in the Enterprise

Consider a typical three-tier application flow: web tier → app tier → database tier. When data (for example, name, credit card number, expiration date, date of birth) is stored in clear text, any compromise of a tier exposes sensitive information.

![The image illustrates a flow of data from the web tier to the app tier and then to a database, highlighting encryption in the enterprise. A character with sunglasses comments, "Yes! Encrypted in Much Better!"](https://kodekloud.com/kk-media/image/upload/v1752878080/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/data-flow-web-app-database-encryption.jpg)

Teams typically address this in one of two ways:

- **Use the database’s built-in encryption.**
- **Integrate an external crypto library or SDK in the app tier.**

![The image illustrates options for encrypting data in an enterprise, highlighting two methods: relying on database capabilities and using an external solution or library. It includes visual elements like code symbols, a database icon, and text labels.](https://kodekloud.com/kk-media/image/upload/v1752878081/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/data-encryption-options-enterprise-diagram.jpg)

### Limitations of Database Encryption

High-performance stores like Cassandra often lack advanced encryption capabilities, forcing teams to choose legacy platforms (e.g., MSSQL) solely for encryption support.

![The image discusses encryption issues in enterprise database selection, comparing Cassandra as an ideal database with MSSQL as the required choice due to its encryption capabilities.](https://kodekloud.com/kk-media/image/upload/v1752878083/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/encryption-issues-database-selection-cassandra-mssql.jpg)

### Drawbacks of Custom Libraries

When each team picks its own solution—[OpenSSL](https://www.openssl.org), [Go](https://golang.org)'s crypto, [.NET](https://dotnet.microsoft.com) libraries, in-house code, or tools like [Voltage](https://www.thalesgroup.com/en/markets/digital-identity-and-security/data-protection/voltage-security)—you end up with:

- Multiple custom implementations
- Inconsistent security practices
- Fragmented audit and compliance

> [!important]
> **Warning**
>
> Decentralized encryption makes it hard to enforce policies, rotate keys, and audit usage.

![The image illustrates the challenges of encryption in enterprises, highlighting different teams using various encryption technologies like OpenSSL, Golang, .NET, internally developed solutions, and Voltage.](https://kodekloud.com/kk-media/image/upload/v1752878084/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/encryption-challenges-enterprises-teams-solutions.jpg)

## Introducing the Transit Secrets Engine

Vault’s Transit Secrets Engine provides a centralized encryption service. Applications send plaintext to Vault, request encryption, and store the returned ciphertext wherever they choose. Vault never persists the encrypted data.

![The image illustrates a solution using Vault's Transit Secrets Engine, showing a process where cleartext data is sent, encrypted into ciphertext, and then stored. It includes icons representing data flow and storage, with a character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878084/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/vault-transit-secrets-engine-diagram.jpg)

All your services simply point to Vault:

![The image illustrates a solution for centralizing an organization's encryption needs, featuring colorful code icons with arrows pointing towards a central "TRANSIT" symbol.](https://kodekloud.com/kk-media/image/upload/v1752878085/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/encryption-centralization-solution-transit-icons.jpg)

## How It Works

Vault exposes simple API endpoints under `/transit`:

1.  **Authenticate** and obtain a token scoped to specific keys.
2.  **Encrypt**: send Base64-encoded plaintext to `/transit/encrypt/<key>` → receive ciphertext.
3.  **Store** ciphertext in any datastore (database, object store, etc.).
4.  **Decrypt**: send ciphertext to `/transit/decrypt/<key>` → receive Base64 plaintext.

![The image is a slide titled "Intro to Transit Secrets Engine," explaining how the engine provides encryption and decryption functions, allowing applications to send cleartext data to Vault for encryption, with the encryption key stored securely in Vault.](https://kodekloud.com/kk-media/image/upload/v1752878086/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/intro-to-transit-secrets-engine.jpg)

> [!important]
> **Note**
>
> Vault’s Transit engine does _not_ store ciphertext—it simply encrypts or decrypts and returns the result.

## Key Management and Rotation

Vault manages your keys and their versions:

- **Secure storage:** Keys live only in Vault.
- **Versioning:** Rotate keys by adding new versions to the key ring.
- **Backward compatibility:** Old versions remain available to decrypt legacy data.
- **Access control:** Enforce version-based decryption limits (e.g., only allow versions ≥ 3).

![The image is a slide titled "Intro to Transit Secrets Engine," explaining how encryption keys are created, stored, and managed in a Vault, including key rotation and permission requirements.](https://kodekloud.com/kk-media/image/upload/v1752878087/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/intro-to-transit-secrets-engine-2.jpg)

### Re-wrapping Ciphertext

To upgrade ciphertext to the latest key version without exposing plaintext:

1.  Call `/transit/rewrap/<key>` with existing ciphertext.
2.  Vault returns new ciphertext using the current key version.

## Application-Specific Keys

Assign each service its own encryption key. Your token policy can grant only the necessary operations:

- A customer-facing service might have **encrypt** permissions only.
- A billing service could have both **encrypt** and **decrypt** permissions.

![The image is an infographic titled "Intro to Transit Secrets Engine," showing a process where applications send vault requests to obtain encryption keys, resulting in ciphertext. It includes colorful icons and text, with a character illustration in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878088/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/intro-to-transit-secrets-engine-infographic.jpg)

## Supported Key Types

Vault supports a variety of key algorithms. By default, it uses `aes256-gcm96`. Choose according to your security requirements:

| Key Type          | Use Case                                     |
| ----------------- | -------------------------------------------- |
| aes256-gcm96      | Default: AES-GCM with 96-bit nonce           |
| chacha20-poly1305 | ChaCha20-Poly1305                            |
| ed25519           | EdDSA signatures                             |
| ecdsa-p256        | ECDSA P-256 signing                          |
| rsa-2048          | RSA encryption/signing with 2048-bit modulus |

![The image is a table listing different encryption key types along with their descriptions, including AES, ChaCha20, Ed25519, ECDSA, and RSA. The table highlights "aes256-gcm96" as the default key type.](https://kodekloud.com/kk-media/image/upload/v1752878090/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Encrypting-Data-with-the-Transit-Secrets-Engine/encryption-key-types-table-aes256-gcm96.jpg)

## Convergent Encryption Mode

Enable convergent encryption to ensure that encrypting the same plaintext with the same key always yields identical ciphertext. This feature is useful for searchable encryption but requires supported key types like AES-GCM or ChaCha20-Poly1305.

## Base64 Encoding Requirement

All plaintext sent to Transit must be Base64 encoded to support arbitrary binary data (PDFs, images, etc.). Remember, Base64 is reversible encoding, not encryption.

---

For a hands-on experience, try the lab to enable Transit, create keys, and perform encrypt, decrypt, and rewrap operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/2eaeee8e-4665-48f7-afd5-41ef6c71466c)**
>
> Watch video content
