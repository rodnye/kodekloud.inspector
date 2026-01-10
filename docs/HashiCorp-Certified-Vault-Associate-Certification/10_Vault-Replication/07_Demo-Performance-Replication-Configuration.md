# Demo Performance Replication Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Replication/Demo-Performance-Replication-Configuration)

---

## Table of Contents

- Demo Performance Replication Configuration
  - Prerequisites
  - 1. Enable Performance Replication on the Primary
  - 2. Generate a Secondary Bootstrap Token
  - 3. Activate the Secondary Cluster
  - 4. Verify Replication Status
  - 5. Demonstrate Configuration Propagation
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Replication

# Demo Performance Replication Configuration

In this guide, you’ll configure performance replication between two Vault clusters—a primary and a secondary. After completing these steps, any changes made on the primary will automatically mirror to the secondary.

**What You’ll Achieve:**

1.  Enable performance replication on the primary cluster
2.  Generate a secondary-token for bootstrapping
3.  Activate the secondary cluster
4.  Verify replication health
5.  Demonstrate configuration propagation

---

## Prerequisites

| Cluster         | Address      | Root Token                     |
| --------------- | ------------ | ------------------------------ |
| Primary Vault   | 10.1.102.170 | `hvs.KYjTNrIdzAoPkriOuDStfClA` |
| Secondary Vault | 10.1.102.156 | `hvs.AVecCoMzQSmLYTQ9ufdpRAZ`  |

- Both clusters must be initialized and unsealed.
- Vault CLI installed and pointing to the correct `VAULT_ADDR`.

---

## 1\. Enable Performance Replication on the Primary

1.  Authenticate to the primary cluster

    ```
    export VAULT_ADDR=https://10.1.102.170:8200
    vault login hvs.KYjTNrIdzAoPkriOuDStfClA
    ```

2.  Turn on performance replication

    ```
    vault write -f sys/replication/performance/primary/enable
    ```

    > [!important]
    > **Warning**
    >
    > Enabling primary replication will make Vault briefly unavailable. Plan for a short maintenance window.

---

## 2\. Generate a Secondary Bootstrap Token

Create a wrapped token to securely initialize the secondary:

```
vault write sys/replication/performance/primary/secondary-token \
    id=hcvop-performance
```

Example output:

```
Key                          Value
---                          -----
wrapping_token               eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
wrapping_token_ttl           30m
wrapping_token_creation_time 2022-06-02T01:19:11.387715359 +0000 UTC
```

Copy the `wrapping_token` to use in the next step.

---

## 3\. Activate the Secondary Cluster

1.  Authenticate to the secondary cluster

    ```
    export VAULT_ADDR=https://10.1.102.156:8200
    vault login hvs.AVecCoMzQSmLYTQ9ufdpRAZ
    ```

2.  Enable performance replication on the secondary using the wrapped token

    ```
    vault write sys/replication/performance/secondary/enable \
        token=<WRAPPING_TOKEN>
    ```

    > [!important]
    > **Warning**
    >
    > Vault will be unavailable until the initial sync and setup tasks complete.

---

## 4\. Verify Replication Status

On the **secondary** cluster, confirm health and connectivity:

```
vault read sys/replication/performance/status
```

Expected fields:

| Key                                  | Example Value                     |
| ------------------------------------ | --------------------------------- |
| mode                                 | `secondary`                       |
| connection\\\_state                  | `ready`                           |
| known\\\_primary\\\_cluster\\\_addrs | \\[`https://10.1.102.170:8201`\\] |
| state                                | `stream-wal`                      |

A `ready` state with `stream-wal` indicates that performance replication is healthy.

---

## 5\. Demonstrate Configuration Propagation

Make a change on the primary to prove replication works:

1.  On the **primary**, enable the `userpass` auth method and create a user:

    ```
    vault auth enable userpass
    vault write auth/userpass/users/bryan \
        password=bryan policies=default
    ```

2.  Within seconds, log in on the **secondary** using that user:

    ```
    vault login -method=userpass username=bryan
    ```

Success confirms that auth methods, users, and policies (along with future secrets engines, audit devices, KV data, etc.) propagate automatically.

---

## Links and References

- [Vault Replication Documentation](https://www.vaultproject.io/docs/enterprise/replication)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [HashiCorp Vault GitHub](https://github.com/hashicorp/vault)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cfd009a3-718e-46c1-b509-a1354fc1e2a6/lesson/acf15a9d-4551-4abb-868c-ef19d4b560e5)**
>
> Watch video content
