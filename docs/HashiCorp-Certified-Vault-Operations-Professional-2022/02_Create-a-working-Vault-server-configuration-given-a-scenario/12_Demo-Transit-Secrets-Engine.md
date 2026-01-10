# Demo Transit Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Transit-Secrets-Engine)

---

## Table of Contents

- Demo Transit Secrets Engine
  - Table of Contents
  - Overview
  - Verify Enabled Secrets Engines
  - Enable the Transit Engine
  - Create and Inspect an Encryption Key
  - Rotate an Encryption Key
  - Encrypt Data
  - Rewrap Data After Rotation
  - Decrypt Ciphertexts
  - Enforce Minimum Decryption Version
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Transit Secrets Engine

Welcome to this tutorial on the Vault Transit Secrets Engine. In this guide, you'll learn how to enable and configure the Transit engine, manage encryption keys, and perform encrypt, decrypt, and rewrap operations.

## Table of Contents

- [Overview](#overview)
- [Verify Enabled Secrets Engines](#verify-enabled-secrets-engines)
- [Enable the Transit Engine](#enable-the-transit-engine)
- [Create and Inspect an Encryption Key](#create-and-inspect-an-encryption-key)
- [Rotate an Encryption Key](#rotate-an-encryption-key)
- [Encrypt Data](#encrypt-data)
- [Rewrap Data After Rotation](#rewrap-data-after-rotation)
- [Decrypt Ciphertexts](#decrypt-ciphertexts)
- [Enforce Minimum Decryption Version](#enforce-minimum-decryption-version)
- [Conclusion](#conclusion)

## Overview

The Transit Secrets Engine provides cryptographic functions as a service. It allows you to offload encryption, decryption, key management, and more to Vault without storing raw data.

Learn more in the official docs: [Transit Secrets Engine](https://www.vaultproject.io/docs/secrets/transit).

## Verify Enabled Secrets Engines

First, check which secrets engines are active on your Vault dev server:

```
vault secrets list
```

Expected output in dev mode:

| Path       | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| cubbyhole/ | cubbyhole | per-token private secret storage         |
| identity/  | identity  | identity store                           |
| secret/    | kv (v2)   | key/value secret storage                 |
| sys/       | system    | system endpoints for control & debugging |

> [!important]
> **Dev Mode Defaults**
>
> In Vault dev mode, the `cubbyhole/`, `identity/`, `secret/` (KV v2), and `sys/` engines are enabled by default.

## Enable the Transit Engine

Enable the Transit engine at the default path `transit/`:

```
vault secrets enable transit
```

Verify it was added:

```
vault secrets list
```

| Path     | Type    | Description |
| -------- | ------- | ----------- |
| transit/ | transit | n/a         |

You can also add a description when enabling:

```
vault secrets disable transit
vault secrets enable -description="My transit engine" transit
vault secrets list
```

## Create and Inspect an Encryption Key

Create a new key named `training`:

```
vault write -f transit/keys/training
```

Then read its configuration:

```
vault read transit/keys/training
```

Key configuration highlights:

| Field                  | Value        |
| ---------------------- | ------------ |
| name                   | training     |
| type                   | aes256-gcm96 |
| latest\\\_version      | 1            |
| supports\\\_encryption | true         |
| supports\\\_decryption | true         |

## Rotate an Encryption Key

Rotate `training` to generate a new version:

```
vault write -f transit/keys/training/rotate
```

Verify the version bump:

```
vault read transit/keys/training | grep latest_version
# latest_version: 2
```

## Encrypt Data

1.  Base64-encode your plaintext:

    ```
    BASE64=$(base64 <<< "Getting Started with HashiCorp Vault")
    echo $BASE64
    ```

2.  Encrypt the encoded string:

    ```
    vault write transit/encrypt/training plaintext=$BASE64
    ```

Sample response:

```
Key         Value
---         -----
ciphertext  vault:v2:…
key_version 2
```

Store the `ciphertext` for later use.

## Rewrap Data After Rotation

After rotating to version 3:

```
vault write -f transit/keys/training/rotate
```

Rewrap the version 2 ciphertext to version 3:

```
vault write transit/rewrap/training \
  ciphertext="vault:v2:…"
```

Response:

```
Key         Value
---         -----
ciphertext  vault:v3:…
key_version 3
```

## Decrypt Ciphertexts

Decrypt version 2:

```
vault write transit/decrypt/training ciphertext="vault:v2:…"
```

Decrypt version 3:

```
vault write transit/decrypt/training ciphertext="vault:v3:…"
```

Both return the same Base64 plaintext.

## Enforce Minimum Decryption Version

To block decryption of older ciphertext, set `min_decryption_version=3`:

```
vault write transit/keys/training/config min_decryption_version=3
```

Verify:

```
vault read transit/keys/training
# min_decryption_version: 3
```

Attempting to decrypt version 2 now fails:

```
vault write transit/decrypt/training ciphertext="vault:v2:…"
```

> [!important]
> **Decryption Policy**
>
> Any ciphertext with a version lower than the `min_decryption_version` will be rejected.

Decryption of version 3 still succeeds:

```
vault write transit/decrypt/training ciphertext="vault:v3:…"
```

## Conclusion

In this lesson, you have:

- Enabled and configured the Transit Secrets Engine
- Created, rotated, and inspected encryption keys
- Encrypted, decrypted, and rewrapped data
- Enforced minimum decryption version policies

For more information, visit the [Vault Transit Secrets Engine documentation](https://www.vaultproject.io/docs/secrets/transit).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/73cc37b9-4677-4263-ab67-988cec966042)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/dc0cb54c-c853-4bdf-819c-83a0a0094bab)**
>
> Practice lab
