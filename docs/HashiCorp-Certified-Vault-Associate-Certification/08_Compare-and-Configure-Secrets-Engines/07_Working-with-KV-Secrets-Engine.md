# Working with KV Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Working-with-KV-Secrets-Engine)

---

## Table of Contents

- Working with KV Secrets Engine
  - KV CLI Command Overview
  - Writing Data with vault kv put
  - Reading Data with vault kv get
  - Updating Secrets
  - Deleting Secrets
  - Links and References
  - Watch Video
    - KV Version 1 vs. Version 2
    - Writing Multiple Pairs or JSON Files
    - Table Output
    - JSON Output for Automation
    - Reading Specific Versions (KV V2)
    - Overwrite with put
    - Revert Changes with rollback (KV V2)
    - Merge Fields with patch (KV V2)
    - Soft Delete with delete
    - Permanent Removal with destroy (KV V2)
    - Remove All Versions and Metadata
      - KV V1 Example
      - KV V2 Example
      - KV V1
      - KV V2
      - After Delete

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Working with KV Secrets Engine

In this guide, you’ll learn how to manage secrets with Vault’s Key/Value (KV) Secrets Engine using the `vault kv` CLI. We’ll cover KV version 1 and version 2 operations:

- Core commands: `put`, `get`, `delete`, `list`
- KV V2–only versioning commands: `undelete`, `destroy`, `patch`, `rollback`

Master these commands to automate secrets management in scripts and CI/CD pipelines.

## KV CLI Command Overview

Use `vault kv <subcommand>` to perform KV operations. The table below summarizes each subcommand:

| Subcommand | Description                               |
| ---------- | ----------------------------------------- |
| put        | Write or update secrets                   |
| get        | Read secrets                              |
| delete     | Remove latest version (soft delete in V2) |
| list       | List child keys                           |
| undelete   | Restore deleted version (KV V2 only)      |
| destroy    | Permanently delete specific versions      |
| patch      | Merge fields into an existing version     |
| rollback   | Revert to a previous version (KV V2)      |

![The image is a guide on using the `vault kv` command in the CLI, detailing various operations like put, get, delete, and list, with additional commands available for KV V2.](https://kodekloud.com/kk-media/image/upload/v1752878126/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Working-with-KV-Secrets-Engine/vault-kv-command-guide-cli-operations.jpg)

---

## Writing Data with `vault kv put`

Use `vault kv put` to store or update secrets. The syntax is:

```
vault kv put <mount-path>/<secret-path> key1=value1 key2=value2 ...
```

- `<mount-path>/<secret-path>`: The mount and path for your secret
- `key=value`: Each key/value pair becomes a field in the secret

### KV Version 1 vs. Version 2

#### KV V1 Example

```
$ vault kv put kv/app/db pass=123
Success! Data written to: kv/app/db
```

#### KV V2 Example

```
$ vault kv put kv/app/db pass=123
Key            Value
---            -----
creation_time  2022-12-15T04:35:56.395821Z
deletion_time  n/a
destroyed      false
version        1
```

On KV V2, `put` returns extra metadata (creation time, deletion time, destroyed flag, and version).

### Writing Multiple Pairs or JSON Files

Inline multiple pairs:

```
$ vault kv put kv/app/db pass=123 user=admin api=a8ee4b50cce124
Success! Data written to: kv/app/db
```

> [!important]
> **JSON File Input**
>
> You can also read key/value pairs from a JSON file:
>
> ```
> $ vault kv put kv/app/db @secrets.json
> ```
>
> `secrets.json` example:
>
> ```
> {"pass":"123","user":"admin","api":"a8ee4b50cce124"}
> ```

---

## Reading Data with `vault kv get`

Retrieve secrets in table or JSON format.

### Table Output

#### KV V1

```
$ vault kv get kv/app/db
====== Data ======
Key    Value
----   -----
pass   123
user   admin
api    a8ee4b50cce124
```

#### KV V2

```
$ vault kv get kv/app/db
===== Metadata =====
Key             Value
---             -----
creation_time   2022-12-15T04:35:56.395821Z
deletion_time   n/a
destroyed       false
version         1


===== Data =====
Key    Value
---    -----
pass   123
user   admin
api    a8ee4b50cce124
```

### JSON Output for Automation

```
$ vault kv get -format=json kv/app/db
```

Pipe to [jq](https://stedolan.github.io/jq/) for CI/CD automation:

```
vault kv get -format=json kv/app/db | jq '.data.data'
```

### Reading Specific Versions (KV V2)

- Default (latest): `vault kv get kv/app/db`
- Specific: `vault kv get -version=3 kv/app/db`

If the latest version is soft‐deleted, only metadata is returned.

---

## Updating Secrets

### Overwrite with `put`

A full `put` replaces all fields:

```
$ vault kv put kv/app/db api=new-api-key
Key            Value
---            -----
version        2
```

Existing fields are lost; only the new `api` remains in version 2.

### Revert Changes with `rollback` (KV V2)

```
$ vault kv rollback -version=1 kv/app/db
Key            Value
---            -----
version        3
```

This creates version 3 with data from version 1.

### Merge Fields with `patch` (KV V2)

```
$ vault kv patch kv/app/db user=bryan
======= Metadata =======
Key            Value
---            -----
version        4
```

`patch` adds or updates fields without removing existing data.

---

## Deleting Secrets

![The image explains the process of deleting secrets from a KV store, detailing the differences between delete actions in KV V1 and KV V2, and the concept of a destroy action in KV V2. It highlights the permanence and recoverability of data in each scenario.](https://kodekloud.com/kk-media/image/upload/v1752878127/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Working-with-KV-Secrets-Engine/delete-secrets-kv-store-process.jpg)

### Soft Delete with `delete`

- KV V1: Permanently removes data
- KV V2: Marks the latest version as deleted (soft delete)

```
$ vault kv delete secret/app/database
Success! Data deleted (if it existed) at: secret/app/database
```

#### After Delete

KV V1:

```
$ vault kv get secret/app/database
No value found at secret/app/database
```

KV V2:

```
$ vault kv get secret/app/database
===== Metadata =====
Key            Value
---            -----
version        3
deletion_time  2022-12-15T17:42:03.369955Z
destroyed      false
# No Data table shown
```

### Permanent Removal with `destroy` (KV V2)

> [!important]
> **Warning**
>
> `destroy` permanently deletes specified versions. This action cannot be undone.

```
$ vault kv destroy -versions=3 secret/app/web
Success! Data destroyed at: secret/app/web
```

### Remove All Versions and Metadata

```
$ vault kv metadata delete secret/app/web
Success! All metadata and versions deleted at: secret/app/web
```

---

You’ve now mastered the KV Secrets Engine CLI operations for both KV V1 and KV V2. Next up: exploring the Transit Secrets Engine for encryption-as-a-service.

## Links and References

- [Vault KV Secrets Engine](https://developer.hashicorp.com/vault/docs/secrets/kv)
- [Vault CLI Documentation](https://developer.hashicorp.com/vault/docs/commands/kv)
- [jq: Command-line JSON Processor](https://stedolan.github.io/jq/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/a2021b6a-3c7b-48f3-9f7c-fc37eca251a6)**
>
> Watch video content
