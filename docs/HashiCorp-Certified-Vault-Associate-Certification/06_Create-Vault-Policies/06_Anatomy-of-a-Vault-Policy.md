# Anatomy of a Vault Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Anatomy-of-a-Vault-Policy)

---

## Table of Contents

- Anatomy of a Vault Policy
  - Policy Template
  - Common Capabilities
  - Concrete Example
  - Links and References
  - Watch Video
    - Rule Breakdown

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Anatomy of a Vault Policy

Vault implements path-based access control. A **policy** is a set of rules, where each rule associates:

1.  A target **path pattern**
2.  A list of **capabilities** (permissions) for that path

You can combine multiple rules within a single policy to enforce the principle of least privilege.

## Policy Template

```
path "<path-pattern>" {
  capabilities = ["<permission1>", "<permission2>", ...]
}


path "<another-path>" {
  capabilities = ["<permissionA>", "<permissionB>", ...]
}
```

> [!important]
> **Note**
>
> Path patterns support wildcards (`*`, `?`) and must match the Vault mount and engine.
> For details, see the [Vault Policy Rules](https://www.vaultproject.io/docs/concepts/policies) documentation.

## Common Capabilities

| Capability | Description                                |
| ---------- | ------------------------------------------ |
| create     | Write new data or secret                   |
| read       | Retrieve existing data or secret           |
| update     | Modify existing data or secret             |
| delete     | Remove data or secret                      |
| list       | Enumerate keys or names under a path       |
| sudo       | Allow operations on behalf of another user |

## Concrete Example

Below is a policy that combines KV secrets, policy administration, and dynamic AWS credentials:

```
path "kv/data/apps/jenkins" {
  capabilities = ["read", "update", "delete"]
}


path "sys/policies/*" {
  capabilities = ["create", "update", "list", "delete"]
}


path "aws/creds/web-app" {
  capabilities = ["read"]
}
```

### Rule Breakdown

- **kv/data/apps/jenkins**  
  Grants `read`, `update`, and `delete` permissions on the Jenkins application data in the KV Secrets Engine.
- **sys/policies/**\*  
  Allows managing all policies (`*` wildcard) with `create`, `update`, `list`, and `delete`.
- **aws/creds/web-app**  
  Permits `read` access to dynamic AWS credentials from the `web-app` role in the AWS Secrets Engine.

> [!important]
> **Warning**
>
> Overly broad path patterns (e.g., `*`) can expose more resources than intended. Always validate wildcard usage to avoid privilege escalation.

By composing targeted rules, Vault policies help you grant only the permissions required for each team or application, adhering to security best practices.

## Links and References

- [Vault Policies & ACLs](https://www.vaultproject.io/docs/concepts/policies)
- [KV Secrets Engine](https://www.vaultproject.io/docs/secrets/kv)
- [AWS Secrets Engine](https://www.vaultproject.io/docs/secrets/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/582cbe44-54fe-4ede-bcd6-16b8d736ab93)**
>
> Watch video content
