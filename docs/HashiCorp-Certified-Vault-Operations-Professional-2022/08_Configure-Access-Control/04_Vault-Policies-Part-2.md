# Vault Policies Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Access-Control/Vault-Policies-Part-2)

---

## Table of Contents

- Vault Policies Part 2
  - Core Capabilities Overview
  - Example 1: Simple CRUD Policy
  - Example 2: Glob Patterns with Explicit Deny
  - Wildcards in Policy Paths
  - ACL Templates (Variable Interpolation)
  - Assigning and Testing Policies
  - Example: Administrative Policy
  - Watch Video
    - Pop Quiz
    - Asterisk (\*) Globs
    - Plus (+) Wildcards

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Access Control

# Vault Policies Part 2

In this lesson, we'll dive into Vault policy capabilities—CRUD operations, `list`, `sudo`, `deny`—and explore wildcards, ACL templates, and policy testing. By the end, you’ll know how to craft precise, secure policies using glob patterns and variable interpolation.

## Core Capabilities Overview

Vault policy capabilities are declared as lists of strings within each `path` block. Here’s a quick reference:

| Capability | Description                                               |
| ---------- | --------------------------------------------------------- |
| create     | Add a new secret or configuration (fails if it exists)    |
| read       | Retrieve secrets, configurations, or policies             |
| update     | Overwrite an existing entry (fails if missing)            |
| delete     | Remove a secret or configuration                          |
| list       | Enumerate keys under a path (without revealing values)    |
| sudo       | Required for root-protected endpoints (e.g., seal, rekey) |
| deny       | Explicitly blocks access to a path (highest precedence)   |

> [!important]
> **Note**
>
> There is no generic `write` capability in Vault. Use `create` or `update` depending on whether the path should already exist.> [!important]
> **Warning**
>
> The `deny` capability always takes precedence over any granted rights. Use it carefully to lock down sensitive paths.

---

## Example 1: Simple CRUD Policy

Grant:

1.  Read access to `database/creds/dev-db01`.
2.  Full CRUD on `kv/apps/dev-app01`.

```
path "database/creds/dev-db01" {
  capabilities = ["read"]
}


path "kv/apps/dev-app01" {
  capabilities = ["create", "read", "update", "delete"]
}
```

- For KV v2, prefix paths with `data/` (e.g., `path "data/kv/apps/dev-app01"`).
- A single policy can include multiple `path` blocks; tokens inherit all rules.

---

## Example 2: Glob Patterns with Explicit Deny

Grant read across `kv/apps/webapp/` but block `super_secret`:

```
kv/
└── apps/
    ├── webapp/
    │   ├── api
    │   ├── token
    │   ├── hostname
    │   └── super_secret
    ├── mid-tier/
    └── database/
```

```
path "kv/apps/webapp/*" {
  capabilities = ["read"]
}


path "kv/apps/webapp/super_secret" {
  capabilities = ["deny"]
}
```

- The glob `webapp/*` matches all child paths—**not** the directory itself.
- `deny` on `super_secret` overrides any read rights.

### Pop Quiz

1.  Does `kv/apps/webapp/*` allow access to `kv/apps/webapp` (no trailing slash)?  
    No. The glob only matches subpaths after the slash.
2.  Can a user browse the UI down to `webapp`?  
    Not without `list` on the parent paths (`kv/`, `kv/apps/`, `kv/apps/webapp`).  
    Example policy to enable UI navigation:

    ```
    path "kv/apps/webapp/*" {
      capabilities = ["read", "list"]
    }


    # Or more broadly:
    path "kv/*" {
      capabilities = ["list"]
    }
    ```

---

## Wildcards in Policy Paths

Vault supports two wildcard patterns:

1.  Asterisk (`*`) at the **end** of a path segment (glob).
2.  Plus (`+`) replacing exactly **one** path segment.

### Asterisk (`*`) Globs

```
# Read anything under application1
path "secret/apps/application1/*" {
  capabilities = ["read"]
}


# Matches kv/platform/db-2, kv/platform/db-3/production, etc.
path "kv/platform/db-*" {
  capabilities = ["read"]
}
```

To include the parent path itself:

```
path "secret/apps/application1" {
  capabilities = ["read"]
}
```

### Plus (`+`) Wildcards

```
# Matches secret/dev/db, secret/prod/db, etc.
path "secret/+/db" {
  capabilities = ["read"]
}


# Matches kv/data/apps/dev/webapp or kv/data/apps/qa/webapp
path "kv/data/apps/+webapp" {
  capabilities = ["read"]
}
```

Combine both for advanced matching:

```
path "secret/apps/+/*team-*" {
  capabilities = ["create", "read"]
}
```

> [!important]
> **Warning**
>
> Wildcards can inadvertently grant broader access. Always test your patterns to ensure they match only the intended paths.

---

## ACL Templates (Variable Interpolation)

Use Vault templates to inject dynamic values:

```
path "secret/data/{{identity.entity.id}}/*" {
  capabilities = ["create", "read", "update", "delete"]
}


path "secret/metadata/{{identity.entity.id}}/*" {
  capabilities = ["list"]
}
```

Vault replaces `{{identity.entity.id}}` at runtime, generating per-user policies automatically. Other templates include `identity.entity.name`, group IDs, and more.

---

## Assigning and Testing Policies

1.  Create a policy (e.g., `web-app`) via the Vault CLI or API.
2.  Issue a token bound to that policy:

    ```
    vault token create -policy="web-app"
    ```

    Example output:

    Key Value \--- ----- token hvs.7uBlZwXSxOg31uGXIUetEdXD token_accessor 18r88muoe3x1xEqVqXdlTMwJ token_duration 8h token_renewable true token_policies \["default" "web-app"\] identity_policies \[\]

3.  Test with the new token:

    ```
    vault login <token>


    # Should succeed (read)
    vault read secret/apikey/Google


    # Should fail (no create/update)
    vault write secret/apikey/Google key="ABCDE12345"


    # Should succeed (AWS read-only creds)
    vault read aws/creds/s3-readonly
    ```

---

## Example: Administrative Policy

Operators require access to system (`sys/`) endpoints. Sample admin policy:

```
# License management
path "sys/license" {
  capabilities = ["read", "list", "create", "update", "delete"]
}


# Initialize Vault
path "sys/init" {
  capabilities = ["read", "create", "update"]
}


# UI settings
path "sys/config/ui" {
  capabilities = ["read", "list", "update", "delete", "sudo"]
}


# Rekey operations
path "sys/rekey/*" {
  capabilities = ["read", "list", "create", "update", "delete"]
}


# Rotate the master key
path "sys/rotate" {
  capabilities = ["update", "sudo"]
}


# Seal/unseal Vault
path "sys/seal" {
  capabilities = ["sudo"]
}
```

For more examples, see the official HashiCorp [Vault documentation](https://www.vaultproject.io/docs/) and community [Vault guides](https://github.com/hashicorp/vault-guides).

---

Mastering Vault policies—capabilities, wildcards, and templates—is essential for robust RBAC. Practice in a dev environment to solidify your understanding.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/968cf007-376b-48c8-83f9-17521b5dd575/lesson/8b8d6d11-227a-463c-8942-8d935f3ea30d)**
>
> Watch video content
