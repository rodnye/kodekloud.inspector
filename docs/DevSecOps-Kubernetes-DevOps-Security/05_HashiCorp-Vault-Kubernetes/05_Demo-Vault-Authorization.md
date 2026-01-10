# Demo Vault Authorization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/HashiCorp-Vault-Kubernetes/Demo-Vault-Authorization)

---

## Table of Contents

- Demo Vault Authorization
  - Vault Policies and Paths
  - 1. Create the app Policy
  - 2. Enable KV v2 and Apply the Policy
  - 3. Generate a Token Bound to the app Policy
  - 4. Test Policy Enforcement
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

HashiCorp Vault Kubernetes

# Demo Vault Authorization

In this lesson, we’ll dive into Vault’s authorization model and learn how to define fine-grained access controls using policies. Vault policies, written in HCL, dictate which operations a user or machine can perform on specific secret paths. Every Vault token attaches to one or more policies, and access is always scoped by path.

## Vault Policies and Paths

Imagine you have credential data for MongoDB and MySQL stored under a KV v2 secrets engine mounted at `crds`. You want:

- Full CRUD (create, read, update) access to `crds/data/mongodb`
- Read-only access to `crds/data/mysql`

| Path                | Capabilities         | Description                       |
| ------------------- | -------------------- | --------------------------------- |
| `crds/data/mongodb` | create, read, update | Manage MongoDB credentials        |
| `crds/data/mysql`   | read                 | Read-only access to MySQL secrets |

> [!important]
> **Note**
>
> Vault policies are defined in HCL and loaded from local files. Capabilities include `create`, `read`, `update`, `delete`, among others.

## 1\. Create the `app` Policy

Create a file at `/home/vault/app-policy.hcl`:

```
path "crds/data/mongodb" {
  capabilities = ["create", "read", "update"]
}

path "crds/data/mysql" {
  capabilities = ["read"]
}
```

## 2\. Enable KV v2 and Apply the Policy

Use your root token to enable the KV engine and load the policy:

```
# Enable KV v2 at mount path "crds"
vault secrets enable -path=crds kv-v2

# Upload the "app" policy from your HCL file
vault policy write app /home/vault/app-policy.hcl

# List all policies to confirm
vault policy list
```

You should see:

```
app
default
root
```

Inspect the rules in the `app` policy:

```
vault policy read app
```

> [!important]
> **Warning**
>
> Avoid using the root token for routine operations. Instead, generate scoped tokens for applications and users.

## 3\. Generate a Token Bound to the `app` Policy

Create a new token that attaches only the `app` policy. Store it in the `VAULT_TOKEN` environment variable:

```
export VAULT_TOKEN="$(vault token create -field token -policy=app)"
echo $VAULT_TOKEN
# Example output: s.1S3rgiveIvhIn2gBe9RwUc2cf
```

All subsequent Vault CLI commands will automatically use this token.

## 4\. Test Policy Enforcement

1.  **Allowed Operation**  
    Read MongoDB credentials:

    ```
    vault kv get crds/data/mongodb
    ```

2.  **Denied Operation**  
    Attempt to write MySQL credentials (not permitted by the `app` policy):

    ```
    vault kv put crds/data/mysql username=siddharth
    ```

    You will see a **403 permission denied** error:

    ```
    Error writing data to crds/data/mysql: Error making API request.

    URL: PUT http://127.0.0.1:8200/v1/crds/data/mysql
    Code: 403. Errors:
    * 1 error occurred:
    * permission denied
    ```

This confirms that the `app` policy correctly restricts write access to the MySQL path.

## Next Steps

After defining and testing policies, integrate them with an authentication method:

- Kubernetes Auth
- AppRole Auth
- LDAP Auth

These methods use **roles** to assign policies to authenticated entities, enabling seamless integration with external identity systems.

## Links and References

- [Vault Policies](https://www.vaultproject.io/docs/concepts/policies)
- [KV Secrets Engine (v2)](https://www.vaultproject.io/docs/secrets/kv/kv-v2)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/98b0333a-cf76-48a9-b662-5c6165cdb414)**
>
> Watch video content
