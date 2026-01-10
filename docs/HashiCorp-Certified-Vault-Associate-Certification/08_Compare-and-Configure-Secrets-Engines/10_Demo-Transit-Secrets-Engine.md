# Demo Transit Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Demo-Transit-Secrets-Engine)

---

## Table of Contents

- Demo Transit Secrets Engine
  - Prerequisites
  - 1. Verify Installed Secret Engines
  - 2. Enable the Transit Secrets Engine
  - 3. Create an Encryption Key
  - 4. Rotate the Key
  - 5. Encrypt Data
  - 6. Rotate Again & Rewrap Ciphertext
  - 7. Decrypt Ciphertext
  - 8. Enforce a Minimum Decryption Version
  - References
  - Watch Video
  - Practice Lab
    - 7.1 Decrypt Version 2
    - 7.2 Decrypt Version 3

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Demo Transit Secrets Engine

In this hands-on lab, you'll learn how to enable and configure the Vault Transit Secrets Engine. You’ll work through:

- Enabling Transit at its mount point
- Creating, rotating, and inspecting keys
- Encrypting and decrypting data
- Rewrapping ciphertext after key rotation
- Enforcing a minimum decryption version

> [!important]
> **Note**
>
> This demo uses a Vault development server for simplicity. Do **not** use a dev server in production workloads.

---

## Prerequisites

- A running Vault development server (default mounts).
- The `vault` CLI installed and authenticated (`VAULT_ADDR`, `VAULT_TOKEN`).

| Default Mount | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| cubbyhole/    | cubbyhole | Per-token private secret storage    |
| identity/     | identity  | Identity store                      |
| secret/       | kv        | Key/value secret storage (KV v2)    |
| sys/          | system    | System endpoints (control & policy) |

---

## 1\. Verify Installed Secret Engines

Ensure Transit is not yet enabled:

```
vault secrets list
```

| Path       | Type      | Accessor              | Description                         |
| ---------- | --------- | --------------------- | ----------------------------------- |
| cubbyhole/ | cubbyhole | cubbyhole\\\_XXXXXXXX | Per-token private secret storage    |
| identity/  | identity  | identity\\\_YYYYYYYY  | Identity store                      |
| secret/    | kv        | kv\\\_ZZZZZZZZZZZZ    | Key/value secret storage (KV v2)    |
| sys/       | system    | system\\\_AAAAAAAA    | System endpoints (control & policy) |

---

## 2\. Enable the Transit Secrets Engine

Enable at the default mount (`transit/`):

```
vault secrets enable transit
```

Confirm it’s listed:

```
vault secrets list
```

| Path     | Type    | Accessor            | Description           |
| -------- | ------- | ------------------- | --------------------- |
| transit/ | transit | transit\\\_BBBBBBBB | Vault Transit Secrets |

Optionally add a description when enabling:

```
vault secrets disable transit
vault secrets enable -description="My Transit Secrets Engine" transit
```

---

## 3\. Create an Encryption Key

Create a new key named `training` (default: AES-256-GCM96):

```
vault write -f transit/keys/training
```

Inspect its metadata:

```
vault read transit/keys/training
```

Key metadata fields include `latest_version`, `min_decryption_version`, and supported operations.

---

## 4\. Rotate the Key

Generate a new version for the `training` key:

```
vault write -f transit/keys/training/rotate
vault read transit/keys/training
```

You should see `latest_version` incremented.

---

## 5\. Encrypt Data

First, Base64-encode your plaintext:

```
export PLAINTEXT_B64=$(echo -n "Getting Started with HashiCorp Vault" | base64)
echo $PLAINTEXT_B64
```

Encrypt with the `training` key:

```
vault write transit/encrypt/training plaintext=$PLAINTEXT_B64
```

Response fields:

| Field          | Description                              |
| -------------- | ---------------------------------------- |
| ciphertext     | Resulting ciphertext (e.g. `vault:v2:…`) |
| key\\\_version | Version used for encryption              |

---

## 6\. Rotate Again & Rewrap Ciphertext

Rotate to version 3:

```
vault write -f transit/keys/training/rotate
```

Rewrap an existing ciphertext (v2 → v3):

```
vault write transit/rewrap/training \
  ciphertext="vault:v2:…(old-ciphertext)…"
```

Response includes new `ciphertext` and `key_version=3`.

---

## 7\. Decrypt Ciphertext

### 7.1 Decrypt Version 2

```
vault write transit/decrypt/training \
  ciphertext="vault:v2:…(old-ciphertext)…"
```

Decode the Base64 plaintext:

```
echo R2V0dGluZyBTdGFydGVkIHdpdGggSGFzaGlDb3JjIFZhdWx0 \
  | base64 --decode
```

### 7.2 Decrypt Version 3

```
vault write transit/decrypt/training \
  ciphertext="vault:v3:…(new-ciphertext)…"
```

---

## 8\. Enforce a Minimum Decryption Version

Disallow decryption of data encrypted with older key versions:

```
vault write transit/keys/training/config min_decryption_version=3
vault read transit/keys/training
```

| Key                          | Value                |
| ---------------------------- | -------------------- |
| min\\\_decryption\\\_version | 3                    |
| latest\\\_version            | 3                    |
| keys                         | map\\[1:… 2:… 3:…\\] |

> [!important]
> **Warning**
>
> After setting `min_decryption_version=3`, any attempt to decrypt version 2 will fail with:
>
> ```
> Error writing data to transit/decrypt/training: ... ciphertext version is disallowed by policy
> ```

---

## References

- [Vault Transit Secrets Engine](https://www.vaultproject.io/docs/secrets/transit)
- [Vault CLI Reference](https://www.vaultproject.io/docs/commands)
- [Base64 Encoding Guide](https://en.wikipedia.org/wiki/Base64)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/70c7da67-c9a5-429b-abe5-c00ad7526ccc)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/30ce1064-55d2-4aa3-af73-10e6a8882078)**
>
> Practice lab
