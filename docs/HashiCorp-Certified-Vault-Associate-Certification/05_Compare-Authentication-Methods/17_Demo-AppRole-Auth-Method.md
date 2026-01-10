# Demo AppRole Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Demo-AppRole-Auth-Method)

---

## Table of Contents

- Demo AppRole Auth Method
  - Prerequisites
  - 1. Check Enabled Auth Methods
  - 2. Enable AppRole
  - 3. Create an AppRole
  - 4. List AppRole Roles
  - 5. Retrieve the Role ID
  - 6. Generate a Secret ID
  - 7. Log In with AppRole
  - Summary
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Demo AppRole Auth Method

Welcome to this hands-on lab where we’ll configure the AppRole authentication method in HashiCorp Vault. By the end of this guide, you’ll be able to enable AppRole, create a role, and authenticate using a `role_id` and `secret_id`.

![The image is a solid dark purple background with a few small white squares scattered on the right side.](https://kodekloud.com/kk-media/image/upload/v1752878012/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-AppRole-Auth-Method/dark-purple-background-white-squares.jpg)

## Prerequisites

- A running Vault server in development or production mode
- Vault CLI installed and configured (`vault login` with a root or privileged token)
- Basic familiarity with Vault policies and tokens

---

## 1\. Check Enabled Auth Methods

List the authentication methods currently enabled in Vault:

```
vault auth list
```

Example output:

```
Path    Type    Accessor            Description
----    ----    --------            -----------
token/  token   auth_token_12345    token based credentials
```

> [!important]
> **Note**
>
> By default, Vault enables only the `token` auth method. You’ll add AppRole in the next step.

---

## 2\. Enable AppRole

Enable AppRole at its default path (`approle/`):

```
vault auth enable approle
```

Expected response:

```
Success! Enabled approle auth method at: approle/
```

---

## 3\. Create an AppRole

An AppRole ties Vault policies to applications or machines. Create a role named `bryan` that references the `bryan` policy and issues tokens valid for 20 minutes:

```
vault write auth/approle/role/bryan \
    policies=bryan \
    token_ttl=20m
```

Successful output:

```
Success! Data written to: auth/approle/role/bryan
```

> [!important]
> **Note**
>
> Adjust the `token_ttl` to match your security requirements. You can also set `token_max_ttl` to enforce a hard limit.

---

## 4\. List AppRole Roles

Verify the roles available under the AppRole auth method:

```
vault list auth/approle/role
```

Example output:

```
Keys
----
bryan
```

---

## 5\. Retrieve the Role ID

Each AppRole has a stable `role_id`. Fetch it with:

```
vault read auth/approle/role/bryan/role-id
```

Sample response:

```
Key      Value
---      -----
role_id  2d7d168a-806b-520d-40b6-597841cf8d42
```

---

## 6\. Generate a Secret ID

Every login requires a one-time `secret_id`. Create it now:

```
vault write -force auth/approle/role/bryan/secret-id
```

You’ll see output similar to:

```
Key                 Value
---                 -----
secret_id           fe323f09-72db-1a83-1846-a150b669686c
secret_id_accessor  2e69247f-568a-70dc-c2a5-45a262eefc87
secret_id_ttl       0s
```

> [!important]
> **Warning**
>
> The generated `secret_id` is sensitive and should be transmitted securely. Consider customizing `secret_id_ttl` or using CIDR restrictions.

---

## 7\. Log In with AppRole

Use the `role_id` and `secret_id` to authenticate and receive a Vault token:

```
vault write auth/approle/login \
    role_id=2d7d168a-806b-520d-40b6-597841cf8d42 \
    secret_id=fe323f09-72db-1a83-1846-a150b669686c
```

Sample response:

```
Key                  Value
---                  -----
token                s.20UtHiDfKIehjDfgMuEDkzB8
token_accessor       itew3hMdKQ6SAVNL38XZzB8
token_duration       20m
token_renewable      true
token_policies       ["bryan" "default"]
identity_policies    []
policies             ["bryan" "default"]
token_meta_role_name bryan
```

> [!important]
> **Note**
>
> When specifying parameters in the CLI, use underscores (`role_id`, `secret_id`). In API paths, hyphens appear in the endpoint (e.g., `role-id`, `secret-id`).

---

## Summary

In this lab you have:

- Enabled the **AppRole** auth method
- Created a new role (`bryan`) linked to a Vault policy
- Retrieved the stable **role_id** for that role
- Generated a one-time **secret_id**
- Authenticated with AppRole to get a Vault token

You can now use this token for subsequent Vault operations, such as reading secrets or managing dynamic credentials.

---

## Links and References

- [Vault AppRole Authentication](https://www.vaultproject.io/docs/auth/approle)
- [Vault Authentication Methods Overview](https://www.vaultproject.io/docs/auth)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/e487e09a-81c9-416e-b1f8-56c04ef5fcbb)**
>
> Watch video content
