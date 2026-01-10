# Demo Identity Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Identity-Secrets-Engine)

---

## Table of Contents

- Demo Identity Secrets Engine
  - 1. Review Existing Policies
  - 2. Create a Userpass User
  - 3. Authenticate as bryan and Test Access
  - 4. Obtain the Userpass Mount Accessor
  - 5. Create an Entity and Entity Alias
  - 6. Verify Combined Policies
  - 7. Using the Vault UI
  - Links and References
  - Watch Video
    - Policy Permissions Overview
    - Test Allowed Access
    - Test Denied Access
    - Test Enhanced Access

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Identity Secrets Engine

In this guide, you’ll learn how to leverage the HashiCorp Vault Identity Secrets Engine to:

- Create a user with the **userpass** auth method
- Define entities and entity aliases
- Observe how combined policies affect access
- (Optionally) Manage entities via the Vault UI

Before you begin, make sure a Vault server is running and you have a root token.

> [!important]
> **Prerequisites**
>
> - Vault ≥ 1.0 installed and unsealed
> - Root token for policy/entity management
> - `vault` CLI available in your `$PATH`

---

## 1\. Review Existing Policies

List current policies to confirm what’s available:

```
vault policy list
```

Expected output:

```
default
engineering
kv-policy
manager
root
```

We will use **kv-policy** and **manager** in this demo.

### Policy Permissions Overview

| Policy    | Path                      | Capabilities |
| --------- | ------------------------- | ------------ |
| kv-policy | kv/data/automation        | read         |
| manager   | kv/data/operations/\\_\\_ | read         |

---

## 2\. Create a Userpass User

Define a new user `bryan` with the `kv-policy` attached:

```
vault write auth/userpass/users/bryan \
    password=bryan \
    policies=kv-policy
```

You should see:

```
Success! Data written to: auth/userpass/users/bryan
```

Verify the policy:

```
vault policy read kv-policy
```

```
path "kv/data/automation" {
  capabilities = ["read"]
}
```

And inspect the `manager` policy:

```
vault policy read manager
```

```
path "kv/data/operations/**" {
  capabilities = ["read"]
}
```

---

## 3\. Authenticate as `bryan` and Test Access

Log in with the new user:

```
vault login -method=userpass username=bryan
Password (will be hidden):
```

Successful login shows:

```
token_policies       ["default" "kv-policy"]
```

### Test Allowed Access

```
vault kv get kv/automation
```

```
=== Secret Path ===
kv/data/automation


 ======= Metadata =======
 Key     Value
 version 1


 ======= Data =======
 Key           Value
 certification hcvop
```

### Test Denied Access

```
vault kv get kv/operations/admin
```

```
Error reading kv/data/operations/admin: 403 Permission denied
```

> [!important]
> **Access Denied**
>
> You should see a **403 Permission denied** error because `kv-policy` does not cover `operations/**`.

---

## 4\. Obtain the Userpass Mount Accessor

Re-authenticate as root and list auth methods to retrieve the `mount_accessor`:

```
vault auth list
```

```
Path       Type       Accessor
----       ----       --------
token      token      auth_token_9e81d3bb
userpass/  userpass   auth_userpass_0479382c
```

Note the `auth_userpass_0479382c` value for the next step.

---

## 5\. Create an Entity and Entity Alias

1.  **Create an entity** named “Bryan Krausen” with the `manager` policy:

    ```
    vault write identity/entity \
        name="Bryan Krausen" \
        policies=manager
    ```

    ```
    Key   Value
    ---   -----
    id    7a0f656b-8c8e-d6fd-83da-1d5650d85c38
    name  Bryan Krausen
    ```

2.  **Link the user to that entity** via an alias:

    ```
    vault write identity/entity-alias \
        name="bryan" \
        canonical_id="7a0f656b-8c8e-d6fd-83da-1d5650d85c38" \
        mount_accessor="auth_userpass_0479382c"
    ```

    ```
    Key            Value
    ---            -----
    canonical_id   7a0f656b-8c8e-d6fd-83da-1d5650d85c38
    id             7a2a8c47-d65b-44a5-c0b5-8a45a9ddb588
    ```

---

## 6\. Verify Combined Policies

Log back in as `bryan`:

```
vault login -method=userpass username=bryan
Password (will be hidden):
```

Now your token includes three policies:

```
policies            ["default" "kv-policy" "manager"]
identity_policies   ["manager"]
```

### Test Enhanced Access

- **Automation secret** (via `kv-policy`):

  ```
  vault kv get kv/automation
  ```

- **Operations secret** (via `manager` policy):

  ```
  vault kv get kv/operations/admin
  ```

  ```
  === Secret Path ===
  kv/data/operations/admin


  ===== Data =====
  Key    Value
  ---    -----
  creds  lj3ofdj2posl2
  ```

You can repeat this process to add additional aliases (e.g., [GitHub](https://www.vaultproject.io/docs/auth/github), [OIDC](https://www.vaultproject.io/docs/auth/oidc)) to grant the same `manager` policy across auth methods.

---

## 7\. Using the Vault UI

1.  In the Vault UI, navigate to **Access → Entities**.
2.  Create or delete entities, view details, and manage aliases.

![The image shows a user interface for managing entities in a system, displaying details such as name, ID, and timestamps for creation and last update. It appears to be part of a software application related to access management.](https://kodekloud.com/kk-media/image/upload/v1752878422/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Identity-Secrets-Engine/access-management-entity-ui-details.jpg)

3.  To add an alias, choose **Create Entity Alias**:

![The image shows a web interface for creating an entity alias in HashiCorp Vault, with fields for "Name" and "Auth Backend" and options to create or cancel.](https://kodekloud.com/kk-media/image/upload/v1752878423/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Identity-Secrets-Engine/hashicorp-vault-entity-alias-interface.jpg)

4.  Inspect token settings and policies:

![The image shows a user interface for managing access in HashiCorp Vault, displaying token settings and policies for a user named "bryan." The sidebar includes options like Auth Methods, Entities, and Groups.](https://kodekloud.com/kk-media/image/upload/v1752878424/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Identity-Secrets-Engine/hashicorp-vault-user-interface-bryan.jpg)

5.  View or merge entities as needed:

![The image shows a web interface for managing entities in HashiCorp Vault, displaying a list of entities with their aliases and options to merge or create new entities.](https://kodekloud.com/kk-media/image/upload/v1752878425/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Identity-Secrets-Engine/hashicorp-vault-entity-management-interface.jpg)

---

## Links and References

- [Vault Identity Secrets Engine](https://www.vaultproject.io/docs/secrets/identity)
- [Userpass Auth Method](https://www.vaultproject.io/docs/auth/userpass)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/f695566f-8dbe-454e-8c59-ccb5a035daf5)**
>
> Watch video content
