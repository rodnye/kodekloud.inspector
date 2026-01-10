# Demo Cubbyhole Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Cubbyhole-Secrets-Engine)

---

## Table of Contents

- Demo Cubbyhole Secrets Engine
  - Prerequisites
  - 1. Verify Vault Status
  - 2. Authenticate as Root
  - 3. Create an Unprivileged Token
  - 4. Working with Cubbyhole
  - 5. KV Secrets Engine & Access Control
  - 6. Response Wrapping
  - 7. UI Demonstration
  - Summary
  - References
  - Watch Video
  - Practice Lab
    - 4.1 Write to Cubbyhole
    - 4.2 Read from Cubbyhole
    - 4.3 Proving Token Isolation
    - 5.1 As Root: Write a KV Secret
    - 5.2 As Root: Read the KV Secret
    - 5.3 Denied Access for Unprivileged Token
    - 6.1 Generate a Wrapping Token
    - 6.2 Inspect the Wrapping Token
    - 6.3 Unwrap as Unprivileged User
    - 6.4 TTL & One-Time Use Demonstration

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Cubbyhole Secrets Engine

In this tutorial, you’ll learn how to leverage Vault’s **Cubbyhole Secrets Engine** for per-token data isolation and use **Response Wrapping** for secure, one-time delivery of secrets. We’ll cover:

- Writing and reading token-specific cubbyhole data
- Proving isolation between tokens
- Populating and protecting a KV secret
- Generating and unwrapping a wrapped secret both via CLI and UI

## Prerequisites

- Vault 1.10.0 Enterprise installed locally (initialized & unsealed)
- Environment variable: `VAULT_ADDR=http://127.0.0.1:8200`
- Familiarity with basic Vault concepts ([Vault Overview](https://www.vaultproject.io/docs/what-is-vault))

## 1\. Verify Vault Status

```
vault status
```

Expected output:

```
Key                         Value
---                         -----
Recovery Seal Type          shamir
Initialized                 true
Sealed                      false
Version                     1.10.0+ent
Storage Type                raft
HA Enabled                  true
```

## 2\. Authenticate as Root

```
vault login <root_token>
```

> Success! You are now authenticated as the root user.

## 3\. Create an Unprivileged Token

Create a token with only the `default` policy:

```
vault token create -policy=default
```

Output:

```
Key             Value
---             -----
token           hv.s.XXXXXXXXXXXXXX
token_accessor  NuBg8k455X2yQERKgRxV3134
token_policies  ["default"]
```

Save the token value and log in with it:

```
vault login hv.s.XXXXXXXXXXXXXX
```

> Success! You are now authenticated with limited permissions.

## 4\. Working with Cubbyhole

Every token receives a private cubbyhole path. Only the token owner can write/read its own cubbyhole.

### 4.1 Write to Cubbyhole

```
vault write cubbyhole/training certification=hcvop
```

### 4.2 Read from Cubbyhole

```
vault read cubbyhole/training
```

```
Key             Value
---             -----
certification   hcvop
```

### 4.3 Proving Token Isolation

> [!important]
> **Note**
>
> Cubbyhole paths are isolated per token. No token can access another token’s cubbyhole.

1.  **Switch back to root**

    ```
    vault login <root_token>
    ```

2.  **Attempt to read the unprivileged token’s cubbyhole**

    ```
    vault read cubbyhole/training
    ```

    Output: `No value found at cubbyhole/training`

3.  **Confirm unprivileged token can still read its own data**

    ```
    vault login hv.s.XXXXXXXXXXXXXX
    vault read cubbyhole/training
    ```

## 5\. KV Secrets Engine & Access Control

Next, we’ll show how an unprivileged token is denied access to KV secrets written by root.

| Token Type         | Accessible Path  | Permissions          |
| ------------------ | ---------------- | -------------------- |
| Root Token         | secret/data/\\\* | read, write, delete  |
| Unprivileged Token | cubbyhole/\\\*   | read, write own only |

### 5.1 As Root: Write a KV Secret

```
vault kv put secret/training goal=hcvop
```

### 5.2 As Root: Read the KV Secret

```
vault kv get secret/training
```

```
====== Secret Path ======
secret/data/training


=== Data ===
Key    Value
---    -----
goal   hcvop
```

### 5.3 Denied Access for Unprivileged Token

```
vault login hv.s.XXXXXXXXXXXXXX
vault kv get secret/training
```

```
Error making API request.
Code: 403. Errors:
* permission denied on path "secret/data/training"
```

## 6\. Response Wrapping

Response wrapping provides a one-time-use, time-limited wrapping token for secure secret transfer.

### 6.1 Generate a Wrapping Token

As root, request a 60-minute wrapped response:

```
vault kv get -wrap-ttl=60m secret/training
```

```
Key                           Value
---                           -----
wrapping_token                hvs.CAESIHHiPSBDnG75y4hN...
wrapping_token_ttl            1h
wrapping_token_creation_path  secret/data/training
```

### 6.2 Inspect the Wrapping Token

```
vault token lookup hvs.CAESIHHiPSBDnG75y4hN...
```

```
Key        Value
---        -----
path       secret/data/training
policies   [response-wrapping]
ttl        59m30s
num_uses   1
```

### 6.3 Unwrap as Unprivileged User

1.  Log in with the limited token:

    ```
    vault login hv.s.XXXXXXXXXXXXXX
    ```

2.  Unwrap the secret:

    ```
    vault unwrap hvs.CAESIHHiPSBDnG75y4hN...
    ```

    ```
    Key      Value
    ---      -----
    data     map[goal:hcvop]
    metadata map[created_time:... version:1]
    ```

### 6.4 TTL & One-Time Use Demonstration

```
vault kv get -wrap-ttl=5s secret/training
# wrapping_token: hvs.CAESI…XYZ
# Wait >5 seconds
vault unwrap hvs.CAESI…XYZ
# Error: wrapping token is not valid or does not exist
```

Or with 5-minute TTL:

```
vault kv get -wrap-ttl=5m secret/training
# wrapping_token: hvs.CAESI…ABC
vault unwrap hvs.CAESI…ABC  # succeeds
vault unwrap hvs.CAESI…ABC  # fails immediately
```

## 7\. UI Demonstration

In the Vault UI, a privileged user can:

1.  Navigate to **Secrets → KV**
2.  Select **training** and choose **Wrap**
3.  Copy the wrapping token and share via secure channels

An unprivileged user then goes to **Tools → Unwrap Secret**, pastes the token, and retrieves the secret.

![The image shows a web interface for HashiCorp Vault, displaying a secret with a key-value pair under the "training" section. A notification at the bottom indicates a secret was successfully wrapped.](https://kodekloud.com/kk-media/image/upload/v1752878420/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Cubbyhole-Secrets-Engine/hashicorp-vault-web-interface-secret-training.jpg)

---

## Summary

- Stored token-specific data in **Cubbyhole**
- Verified strict isolation between tokens
- Secured KV secrets and demonstrated access denial
- Generated, inspected, and unwrapped **response-wrapping** tokens
- Showed one-time-use and TTL behaviors via CLI & UI

By following this guide, you can securely share secrets without exposing them directly over the network.

---

## References

- [Vault Overview](https://www.vaultproject.io/docs/what-is-vault)
- [Cubbyhole Secrets Engine](https://www.vaultproject.io/docs/secrets/cubbyhole)
- [Response Wrapping Guide](https://www.vaultproject.io/docs/concepts/response-wrapping)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/4b3224f2-2952-45d2-95f8-dc95b46714a0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/9e8d0533-11b3-4299-81b1-0eece13c20e6)**
>
> Practice lab
