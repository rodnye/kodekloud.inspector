# Vault Policies Path - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Vault-Policies-Path)

---

## Table of Contents

- Vault Policies Path
  - Common Vault Paths
  - Understanding a Secrets Engine Path
  - Root-Protected Paths
  - Further Reading
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Vault Policies Path

Vault policies rely on hierarchical paths to control access. Everything in Vault is organized by path, reinforcing the core concepts of Vault’s architecture and pathing model. By understanding how paths work, you can craft precise policies that grant only the permissions your applications and operators need.

## Common Vault Paths

| Path                        | Type            | Description                                  |
| --------------------------- | --------------- | -------------------------------------------- |
| sys/policy                  | System          | Manage policies                              |
| auth/ldap/groups/developers | Auth method     | LDAP group binding for “developers”          |
| database/roles/prod-db      | Secrets engine  | Role definition for a production database    |
| sys/rekey                   | System-critical | Re-encrypt data keys during rekey operations |

> [!important]
> **Note**
>
> Paths prefixed with `sys/` map to Vault’s internal systems. For example, `sys/rekey` is used to rotate and re-encrypt data encryption keys.

---

## Understanding a Secrets Engine Path

When you enable the KV (Key-Value) secrets engine v2 at the mount point `secrets/`, all data operations use the `data/` prefix. For instance, storing Ansible credentials under a nested hierarchy might look like this:

```
secrets/data/platform/aws/tools/ansible
```

This path breaks down as:

| Segment                    | Description                            |
| -------------------------- | -------------------------------------- |
| secrets/                   | KV-v2 mount point                      |
| data/                      | Data API prefix for KV-v2              |
| platform/aws/tools/ansible | Custom, application-specific hierarchy |

Each segment after `data/` can contain key/value pairs. Always reference the complete path when reading, writing, or deleting secrets.

![The image explains the structure of a path used in a secrets management system, highlighting different segments for mounting, required elements, higher-level paths, and key/value storage.](https://kodekloud.com/kk-media/image/upload/v1752878145/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Policies-Path/secrets-management-path-structure-diagram.jpg)

---

## Root-Protected Paths

Certain Vault endpoints are root-protected and require either a root token or `sudo` capabilities to access. These paths control critical cluster operations.

| Path          | Action                                |
| ------------- | ------------------------------------- |
| sys/rotate    | Rotate the master encryption key      |
| sys/seal      | Manually seal (lock) the Vault        |
| sys/step-down | Force the current leader to step down |

> [!important]
> **Warning**
>
> Root-protected paths expose powerful operations. Grant `sudo` only to trusted administrators.

![The image is a slide titled "Vault Policies - Path," explaining root-protected paths in Vault, requiring a root token or sudo capability, with examples like creating an orphan token and rotating the encryption key. It features a lock icon and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878146/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Policies-Path/vault-policies-path-root-token-slide.jpg)

To grant `sudo` capabilities on these critical paths, include the following in your HCL policy:

```
path "sys/rotate" {
  capabilities = ["sudo"]
}

path "sys/seal" {
  capabilities = ["sudo"]
}

path "sys/step-down" {
  capabilities = ["sudo"]
}
```

Use this snippet to ensure only authorized operators can perform high-privilege Vault operations.

---

## Further Reading

- [Vault Policies and ACL](https://www.vaultproject.io/docs/concepts/policies)
- [KV Secrets Engine v2](https://www.vaultproject.io/docs/secrets/kv/kv-v2)
- [Vault System Endpoints](https://www.vaultproject.io/api/system)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/d009ce9a-7bf4-4d2d-b868-1c24d94392d4)**
>
> Watch video content
