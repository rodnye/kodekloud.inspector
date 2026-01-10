# Working with the KeyValue Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Working-with-the-KeyValue-Secrets-Engine)

---

## Table of Contents

- Working with the KeyValue Secrets Engine
  - KV CLI Command Overview
  - Comparing KV Version 1 vs. Version 2
  - Writing Secrets to the KV Store
  - Managing Versions: Rollback
  - Reading Secrets
  - Working with Specific Versions
  - Deleting and Destroying Secrets
  - Summary
  - Links and References
  - Watch Video
    - KV Version 1
    - KV Version 2
    - Basic Write
    - Bulk Write from File
    - Overwriting vs. Patching
    - JSON Output
    - KV Version 1
    - KV Version 2
      - Soft Delete
      - Destroy

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Working with the KeyValue Secrets Engine

In this guide, you’ll learn how to manage secrets in HashiCorp Vault’s Key/Value (KV) Secrets Engine using the Vault CLI. We’ll cover writing, reading, deleting, and listing secrets in both KV v1 and v2, plus advanced v2-only operations: undelete, destroy, patch, and rollback.

> [!important]
> **Prerequisites**
>
> Ensure you have Vault CLI installed and authenticated. For installation instructions, see the [Vault Installation Guide](https://www.vaultproject.io/docs/install).

## KV CLI Command Overview

Vault provides a unified `vault kv` command with these core subcommands:

| Subcommand | Description               |
| ---------- | ------------------------- |
| put        | Write data to a KV path   |
| get        | Read data from a KV path  |
| delete     | Delete data at a KV path  |
| list       | List keys under a KV path |

KV v2 adds these metadata and versioning operations:

| Subcommand | Description                                |
| ---------- | ------------------------------------------ |
| undelete   | Restore a soft-deleted version             |
| destroy    | Permanently delete one or more versions    |
| patch      | Update specific fields without overwriting |
| rollback   | Restore an older version as the latest     |

![The image is a guide on using the `vault kv` command in the CLI, detailing commands like `put`, `get`, `delete`, and `list`, with additional commands for KV V2 such as `undelete`, `destroy`, `patch`, and `rollback`. It also features a cartoon character and a certification badge.](https://kodekloud.com/kk-media/image/upload/v1752878546/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Working-with-the-KeyValue-Secrets-Engine/vault-kv-command-guide-cartoon-badge.jpg)

## Comparing KV Version 1 vs. Version 2

Although `vault kv put kv/app/db pass=123` uses the same syntax in both versions, the output and data paths differ:

### KV Version 1

```
$ vault kv put kv/app/db pass=123
Success! Data written to: kv/app/db
```

### KV Version 2

```
$ vault kv put kv/app/db pass=123
== Secret Path ==
kv/data/app/db


======= Metadata =======
Key              Value
---              -----
created_time     2022-03-27T15:52:29.361762Z
custom_metadata  <nil>
deletion_time    n/a
destroyed        false
version          1
```

Version 2 automatically prefixes your path with `data/` and returns metadata, including version details.

## Writing Secrets to the KV Store

### Basic Write

```
$ vault kv put kv/app/db pass=123 user=admin api=a8ee4b50cce124
Success! Data written to: kv/app/db
```

### Bulk Write from File

```
$ vault kv put kv/app/db @secrets.json
Success! Data written to: kv/app/db
```

Vault will read key/value pairs from `secrets.json` and store them at the specified path.

> [!important]
> **Data Replacement**
>
> Each `put` command **replaces** the entire data set at that path. It does _not_ merge with existing keys.

### Overwriting vs. Patching

To overwrite all data:

```
$ vault kv put kv/app/db api=39cms1204mfi2m


== Secret Path ==
kv/data/app/db


=== Data ===
Key   Value
---   -----
api   39cms1204mfi2m
```

To update a single key without removing others:

```
$ vault kv patch kv/app/db user=bryan


======= Metadata =======
Key           Value
---           -----
created_time  2022-12-22T17:57:35.157363Z
destroyed     false
version       4


$ vault kv get kv/app/db
=== Data ===
Key   Value
---   -----
pass  123
user  bryan
api   a8ee4b50cce124
```

## Managing Versions: Rollback

Restore a previous version as the latest:

```
$ vault kv rollback -version=1 kv/app/db


== Secret Path ==
kv/data/app/db


======= Metadata =======
Key            Value
---            -----
created_time   2022-12-21T14:49:23.746331Z
version        3


$ vault kv get kv/app/db
=== Data ===
Key   Value
---   -----
pass  123
user  admin
api   a8ee4b50cce124
```

A new version (3) is created based on version 1, restoring the old data.

## Reading Secrets

Retrieve the latest version:

```
$ vault kv get kv/app/db
== Secret Path ==
kv/data/app/db


======= Metadata =======
Key             Value
---             -----
created_time    2022-12-15T04:35:56.395821Z
deletion_time   n/a
destroyed       false
version         1


=== Data ===
Key    Value
---    -----
pass   123
user   admin
api    a8ee4b50cce124
```

### JSON Output

For machine-friendly output, use `-format=json` or set `VAULT_OUTPUT=json`:

```
$ vault kv get -format=json kv/app/db
{
  "data": {
    "data": {
      "pass": "123",
      "user": "admin",
      "api": "a8ee4b50cce124"
    },
    "metadata": {
      "created_time": "2022-12-21T13:59:29.917893Z",
      "custom_metadata": null,
      "deletion_time": "",
      "destroyed": false,
      "version": 1
    }
  }
}
```

## Working with Specific Versions

- **Latest version**:

  ```
  $ vault kv get kv/app/db
  ```

- **Specific version** (`N`):

  ```
  $ vault kv get -version=N kv/app/db
  ```

## Deleting and Destroying Secrets

![The image explains the differences between deleting secrets in KV V1 and KV V2 stores, highlighting that KV V1 deletes are permanent, KV V2 deletes are soft and restorable, and KV V2 destroys are permanent. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878548/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Working-with-the-KeyValue-Secrets-Engine/kv-v1-vs-v2-secrets-deletion.jpg)

### KV Version 1

A delete permanently removes the data:

```
$ vault kv delete secret/app/database
Success! Data deleted (if it existed) at: secret/app/database


$ vault kv get secret/app/database
No value found at secret/app/database
```

### KV Version 2

- **delete** performs a _soft delete_ (marks data without purging).
- **destroy** permanently purges specified versions.

#### Soft Delete

```
$ vault kv delete secret/app/web
Success! Data deleted (if it existed) at: secret/app/web


$ vault kv get secret/app/web
== Secret Path ==
secret/data/app/web


======= Metadata =======
Key             Value
---             -----
created_time    2022-12-15T17:41:41.130520Z
deletion_time   2022-12-15T17:42:03.369955Z
destroyed       false
version         3
```

#### Destroy

```
$ vault kv destroy --versions=3 secret/app/web
Success! Purged version(s) from: secret/app/web


$ vault kv get secret/app/web
== Secret Path ==
secret/data/app/web


======== Metadata ========
Key               Value
---               -----
created_time      2022-12-21T14:49:23.746331Z
destroyed         true
version           3
```

> [!important]
> **Permanent Destruction**
>
> Once destroyed, the data cannot be recovered without a snapshot restore.

## Summary

Vault’s KV Secrets Engine is your go-to store for arbitrary secrets. KV v2 enhances this with:

- Versioning and detailed metadata
- Soft deletes and permanent destroys
- Granular updates via `patch`
- Recovery operations: `undelete` and `rollback`

With these commands, you can confidently manage, version, and protect your secrets in Vault.

## Links and References

- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands/kv)
- [KV Secrets Engine Overview](https://www.vaultproject.io/docs/secrets/kv)
- [Semantic Versioning](https://semver.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/4af5cae4-de15-4015-aa34-367819942566)**
>
> Watch video content
