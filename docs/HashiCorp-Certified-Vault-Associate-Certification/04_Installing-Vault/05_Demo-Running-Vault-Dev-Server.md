# Demo Running Vault Dev Server - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Installing-Vault/Demo-Running-Vault-Dev-Server)

---

## Table of Contents

- Demo Running Vault Dev Server
  - Prerequisites
  - 1. Starting Vault in Dev Mode
  - 2. Configuring Your Environment
  - 3. Checking Vault Status
  - 4. Listing Enabled Secrets Engines
  - 5. Writing and Reading KV Secrets
  - 6. Cleaning Up
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Vault Associate Certification

Installing Vault

# Demo Running Vault Dev Server

In this tutorial, we’ll demonstrate how to launch HashiCorp Vault in **development mode** on your local machine. Dev mode is perfect for demos, testing integrations, or learning Vault—it runs entirely in-memory, starts unsealed, and provides a single unseal key and root token.

> [!important]
> **Warning**
>
> **Dev mode is not secure.** Do **not** use it in production environments.

---

## Prerequisites

Before you begin:

- Vault CLI installed and in your `PATH`.
- Windows PowerShell or Command Prompt (for Windows users).

Verify your installation:

```
PS C:\> vault version
Vault v1.7.0 (4e222b85c040a810b74400ee3c544494494797e32bb9f)
```

---

## 1\. Starting Vault in Dev Mode

In a new shell (PowerShell or cmd), start Vault:

```
vault server -dev
```

You should see output similar to:

```
WARNING! Dev mode is enabled! In this mode, Vault runs entirely in-memory
and starts unsealed with a single unseal key. The root token is already
authenticated to the CLI, so you can immediately begin using Vault.

You may need to set the following environment variable:

PowerShell:
  $env:VAULT_ADDR="http://127.0.0.1:8200"
cmd.exe:
  set VAULT_ADDR=http://127.0.0.1:8200

Unseal Key: ZEgZgHSEEmmlnRboqtY0A00TUpleaoxo8SqqtFP2Q=
Root Token: s.d6931rVSdkpBINnnRvMHBRXR

Development mode should NOT be used in production installations!
```

> [!important]
> **Note**
>
> This command runs Vault in the foreground. Open a **second** terminal window to interact with Vault without stopping the server.

---

## 2\. Configuring Your Environment

By default, Vault listens on `https://127.0.0.1:8200`, but dev mode uses HTTP. Configure the `VAULT_ADDR` variable accordingly:

PowerShell:

```
PS C:\> $env:VAULT_ADDR = "http://127.0.0.1:8200"
```

Command Prompt:

```
C:\> set VAULT_ADDR=http://127.0.0.1:8200
```

---

## 3\. Checking Vault Status

Confirm Vault is unsealed and running in-memory:

```
vault status
```

Example output:

```
Key             Value
---             -----
Seal Type       shamir
Initialized     true
Sealed          false
Total Shares    1
Threshold       1
Version         1.7.0
Storage Type    inmem
Cluster Name    vault-cluster-48151c3a
HA Enabled      false
```

Notice `Storage Type: inmem`—all data resides in memory.

---

## 4\. Listing Enabled Secrets Engines

Dev mode automatically enables several secrets engines. View them with:

```
vault secrets list
```

| Path       | Type      | Description                                |
| ---------- | --------- | ------------------------------------------ |
| cubbyhole/ | cubbyhole | Per-token private secret storage           |
| identity/  | identity  | Identity store                             |
| secret/    | kv        | Versioned key/value secret storage (KV v2) |
| sys/       | system    | System endpoints for control and debugging |

---

## 5\. Writing and Reading KV Secrets

The KV (Key/Value) engine is mounted at `secret/`.

1.  **Write** a secret:

    ```
    vault kv put secret/vaultcourse/bryan bryan=bryan
    ```

    Sample response:

    ```
    Key            Value
    ---            -----
    created_time   2021-05-12T12:27:09.504562727Z
    deletion_time  n/a
    destroyed      false
    version        1
    ```

2.  **Read** the secret back:

    ```
    vault kv get secret/vaultcourse/bryan
    ```

    Example output:

    ```
    === Metadata ===
    Key            Value
    ---            -----
    created_time   2021-05-12T12:27:09.504562727Z
    deletion_time  n/a
    destroyed      false
    version        1

    === Data ===
    Key    Value
    ---    -----
    bryan  bryan
    ```

---

## 6\. Cleaning Up

When you stop the dev server (e.g., `Ctrl+C`), all in-memory data is lost—ideal for ephemeral testing.

> [!important]
> **Note**
>
> Every restart returns Vault to a clean slate.

---

## Next Steps

- Explore additional [Vault Dev Mode capabilities](https://www.vaultproject.io/docs/commands/server#dev-server).
- Integrate with the [AWS Secrets Engine](https://www.vaultproject.io/docs/secrets/aws) for dynamic credentials.
- Practice writing policies and managing access control in dev mode.

---

## Links and References

- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)
- [Vault Secrets Engines](https://www.vaultproject.io/docs/secrets)
- [Getting Started with Vault](https://learn.hashicorp.com/vault)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/a5a3d715-00ac-4573-aa63-061912aafce2/lesson/ff6a4647-f0d0-4128-adc1-234a4cf0e060)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/a5a3d715-00ac-4573-aa63-061912aafce2/lesson/1570bd34-be02-4233-a742-17dc75862e3d)**
>
> Practice lab
