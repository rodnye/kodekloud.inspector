# Demo Vault Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/HashiCorp-Vault-Kubernetes/Demo-Vault-Secrets-Engine)

---

## Table of Contents

- Demo Vault Secrets Engine
  - Prerequisites
  - 1. Enable the KV v2 Secrets Engine
  - 2. Read from an Empty Path
  - 3. Storing Secrets
  - 4. Retrieve Secrets and Metadata
  - 5. Deleting Secrets
  - 6. Using KV Engine Inside Kubernetes
  - Links and References
  - Watch Video
    - 3.1 Create the First Version
    - 3.2 Update with a Password
    - 3.3 Add an API Key
    - 4.1 Fetch Both Data and Metadata
    - 4.2 Fetch Only Metadata
    - 5.1 Soft Delete Latest Version

---

## Content

DevSecOps - Kubernetes DevOps & Security

HashiCorp Vault Kubernetes

# Demo Vault Secrets Engine

In this guide, you’ll learn how to enable and use the Key-Value (KV) version 2 secrets engine in HashiCorp Vault. The KV secrets engine allows you to securely store arbitrary secrets—like database credentials, API keys, or certificates—and manage multiple versions, metadata, and lifecycle operations.

## Prerequisites

- Vault CLI installed and configured
- A running and unsealed Vault server
- [Vault Authentication](https://www.vaultproject.io/docs/auth) set up for your environment

> [!important]
> **Note**
>
> Ensure your Vault server is unsealed and your CLI is authenticated (`vault login`) before proceeding.

## 1\. Enable the KV v2 Secrets Engine

Mount the KV v2 engine at the `crds/` path:

```
vault secrets enable -path=crds kv-v2
# Success! Enabled the kv-v2 secrets engine at: crds/
```

## 2\. Read from an Empty Path

If no data exists at `crds/mysql`, Vault returns an error:

```
vault kv get crds/mysql
# Error reading crds/mysql: no value found at crds/mysql
```

## 3\. Storing Secrets

### 3.1 Create the First Version

Store only a username:

```
vault kv put crds/mysql username=root
# Key              Value
# ---              -----
# created_time     2021-08-31T11:17:38.755927206Z
# deletion_time    n/a
# destroyed        false
# version          1
```

### 3.2 Update with a Password

Add a password to create version 2:

```
vault kv put crds/mysql username=root password=12345
# Key              Value
# ---              -----
# created_time     2021-08-31T11:19:45.645227215Z
# deletion_time    n/a
# destroyed        false
# version          2
```

### 3.3 Add an API Key

You can append fields anytime (creates version 3):

```
vault kv put crds/mysql username=root password=12345 apiKey=Vbdj794MHUH8945tojrjf3
# Key              Value
# ---              -----
# created_time     2021-10-03T13:10:55.084433408Z
# deletion_time    n/a
# destroyed        false
# version          3
```

## 4\. Retrieve Secrets and Metadata

| Operation             | Command                            | Description                           |
| --------------------- | ---------------------------------- | ------------------------------------- |
| Fetch data & metadata | `vault kv get crds/mysql`          | Shows both secret values and metadata |
| Fetch only metadata   | `vault kv metadata get crds/mysql` | Displays metadata and version history |

### 4.1 Fetch Both Data and Metadata

```
vault kv get crds/mysql
# ====== Metadata ======
# Key              Value
# ---              -----
# created_time     2021-10-03T13:10:55.084433408Z
# deletion_time    n/a
# destroyed        false
# version          3
#
# ======= Data =======
# Key              Value
# ---              -----
# apiKey           Vbdj794MHUH8945tojrjf3
# password         12345
# username         root
```

### 4.2 Fetch Only Metadata

```
vault kv metadata get crds/mysql
# ==== Metadata ====
# Key                   Value
# ---                   -----
# cas_required          false
# created_time          2021-10-03T13:10:55.084433408Z
# current_version       3
# delete_version_after  0
# max_versions          10
# oldest_version        1
# updated_time          2021-10-03T13:10:55.084433408Z
#
# ==== Version 1 ====
# Key              Value
# ---              -----
# created_time     2021-08-31T11:17:38.755927206Z
# deletion_time    n/a
# destroyed        false
```

## 5\. Deleting Secrets

### 5.1 Soft Delete Latest Version

```
vault kv delete crds/mysql
# Success! Data deleted (if it existed) at: crds/mysql
```

Reading now shows the deleted version’s metadata:

```
vault kv get crds/mysql
# ====== Metadata ======
# Key              Value
# ---              -----
# created_time     2021-10-03T13:10:55.084433408Z
# deletion_time    2021-10-03T13:10:56.084433408Z
# destroyed        true
# version          3
```

> [!important]
> **Warning**
>
> Soft-deleted versions can be undeleted until permanently destroyed. To irreversibly remove versions, use `vault kv destroy`.

## 6\. Using KV Engine Inside Kubernetes

If Vault is running in Kubernetes, exec into the pod to run the same commands:

```
kubectl get pods
# NAME                                   READY   STATUS    RESTARTS   AGE
# vault-0                                1/1     Running   0          21m
kubectl exec -it vault-0 -- /bin/sh
/ # vault secrets enable -path=crds kv-v2
/ # vault kv put crds/mysql username=root password=12345
/ # vault kv get crds/mysql
```

> [!important]
> **Next Steps**
>
> After adding secrets, configure authentication methods and attach policies so applications can securely access your KV paths. See [Vault Policies](https://www.vaultproject.io/docs/concepts/policies) for more details.

---

## Links and References

- [Vault Secrets Engines: KV](https://www.vaultproject.io/docs/secrets/kv)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)
- [Kubernetes Exec](https://kubernetes.io/docs/tasks/debug/debug-cluster/container-debug/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/19b7b7d0-fd54-4cc1-ba0d-d1134e2b333f)**
>
> Watch video content
