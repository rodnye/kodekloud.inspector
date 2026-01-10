# Using the Transit Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Using-the-Transit-Secrets-Engine)

---

## Table of Contents

- Using the Transit Secrets Engine
  - Prerequisites
  - 1. Enable the Transit Secrets Engine
  - 2. Create an Encryption Key
  - 3. Encrypt Data
  - 4. Decrypt Data
  - 5. Rotate Encryption Keys
  - 6. Configure Minimum Decryption Version
  - 7. Rewrap Ciphertext
  - Links and References
  - Watch Video
    - Supported Key Types

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Using the Transit Secrets Engine

In this guide, you’ll learn how to enable and use the Transit Secrets Engine in HashiCorp Vault for secure data encryption workflows. We’ll cover:

- Enabling the engine
- Creating and managing encryption keys
- Encrypting and decrypting data
- Rotating keys and setting decryption constraints
- Rewrapping ciphertext to the latest key version

---

## Prerequisites

> [!important]
> **Note**
>
> Make sure you have:
>
> - Vault CLI installed and authenticated (`VAULT_ADDR` & token configured).
> - A running Vault server (Dev mode or Production).

---

## 1\. Enable the Transit Secrets Engine

By default, the Transit engine mounts at `transit/`. To enable it:

```
vault secrets enable transit
# Success! Enabled the transit secrets engine at: transit/
```

To use a custom path, append `-path`:

```
vault secrets enable -path=custom-transit transit
# Success! Enabled the transit secrets engine at: custom-transit/
```

---

## 2\. Create an Encryption Key

Every Transit operation requires a named key. Create `vault_training`:

```
vault write -f transit/keys/vault_training
# Success! Data written to: transit/keys/vault_training
```

To specify a key type (e.g., RSA-4096):

```
vault write -f transit/keys/training_rsa type="rsa-4096"
# Success! Data written to: transit/keys/training_rsa
```

### Supported Key Types

| Key Type               | Description                        |
| ---------------------- | ---------------------------------- |
| aes256-gcm96 (default) | AES-GCM symmetric encryption       |
| chacha20-poly1305      | ChaCha20-Poly1305 symmetric cipher |
| rsa-2048               | 2048-bit RSA asymmetric key        |
| rsa-3072               | 3072-bit RSA asymmetric key        |
| rsa-4096               | 4096-bit RSA asymmetric key        |

---

## 3\. Encrypt Data

Vault expects Base64-encoded plaintext. Encrypt the string `Getting Started with HashiCorp Vault`:

```
vault write transit/encrypt/vault_training \
  plaintext=$(base64 <<< "Getting Started with HashiCorp Vault")
```

Response:

```
Key          Value
---          -----
ciphertext   vault:v1:Fpyph6C7r5MUILiEiFhCoJbxelQbsGeEahal15LhDPSoN6HkTOhwn79DCwt0mctlttLokqikArOPAopzm2jQAKJg=
key_version  1
```

- `ciphertext`: Encrypted data with key version prefix (`vault:v1:`)
- `key_version`: Version of the key used

> [!important]
> **Note**
>
> You can use `base64 -d` to decode any Base64 output from Vault.

---

## 4\. Decrypt Data

Pass the ciphertext back to Vault to decrypt:

```
vault write transit/decrypt/vault_training \
  ciphertext="vault:v1:Fpyph6C7r5MUILiEiFhCoJbxelQbsGeEahal15LhDPSoN6HkTOhwn79DCwt0mctlttLokqikArOPAopzm2jQAKJg="
```

Response:

```
Key        Value
---        -----
plaintext  R2V0dGluZyBTdGFydGVkIHdpdGggSGFzaGlDb3JwIFZhdWx0Cg==
```

Decode to reveal the original message:

```
echo "R2V0dGluZyBTdGFydGVkIHdpdGggSGFzaGlDb3JwIFZhdWx0Cg==" | base64 -d
# Getting Started with HashiCorp Vault
```

---

## 5\. Rotate Encryption Keys

Regular key rotation enhances security. To rotate `vault_training`:

```
vault write -f transit/keys/vault_training/rotate
# Success! Data written to: transit/keys/vault_training/rotate
```

Inspect all key versions:

```
vault read transit/keys/vault_training
```

```
Key                    Value
---                    -----
keys                   map[1:1620000000 2:1620003600 3:1620007200]
latest_version         3
min_decryption_version 1
...
```

---

## 6\. Configure Minimum Decryption Version

To prevent decryption with older keys, set `min_decryption_version`:

```
vault write transit/keys/vault_training/config \
  min_decryption_version=4
# Success! Data written to: transit/keys/vault_training/config
```

Reading the key:

```
vault read transit/keys/vault_training
```

![The image is a slide titled "Working with Encryption Keys" discussing key configuration, specifically about limiting the version of keys used for decrypting data. It mentions configuring the minimum key version for each encryption key.](https://kodekloud.com/kk-media/image/upload/v1752878125/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Using-the-Transit-Secrets-Engine/working-with-encryption-keys-configuration.jpg)

```
Key                        Value
---                        -----
min_decryption_version     4
keys                       map[4:1620010800]
latest_version             4
...
```

Any ciphertext with versions below `4` will be rejected.

> [!important]
> **Warning**
>
> After raising `min_decryption_version`, older ciphertext **cannot** be decrypted. Plan rotations accordingly.

---

## 7\. Rewrap Ciphertext

Rewrapping updates existing ciphertext to the newest key version without exposing plaintext:

```
vault write transit/rewrap/vault_training \
  ciphertext="vault:v1:Fpyph6C7r5MUILiEiFhCoJbxelQbsGeEahal15LhDPSoN6HkTOhwn79DCwt0mctlttLokqikArOPAopzm2jQAKJg="
```

Response:

```
Key          Value
---          -----
ciphertext   vault:v4:RFzplkMpjtUIiS+6qxrNjIEdPqCepFUa2ivr70...
key_version  4
```

Vault decrypts with version `1` internally and re-encrypts with version `4`.

> [!important]
> **Note**
>
> Rewrap is ideal when you need to enforce new key policies on legacy data.

---

## Links and References

- [Vault Transit Secrets Engine](https://www.vaultproject.io/docs/secrets/transit)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)
- [Base64 Manual](https://linux.die.net/man/1/base64)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/fea3f659-ec9e-4df9-a616-7974b619aa02)**
>
> Watch video content
