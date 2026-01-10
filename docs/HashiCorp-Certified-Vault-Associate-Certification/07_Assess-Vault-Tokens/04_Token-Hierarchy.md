# Token Hierarchy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Token-Hierarchy)

---

## Table of Contents

- Token Hierarchy
  - Token TTL and Renewal
  - Manual Revocation
  - Parent-Child Token Relationships
  - Links and References
  - Watch Video
    - Cascading Revocation Timeline

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Token Hierarchy

In this lesson, we’ll dive into how HashiCorp Vault manages token time-to-live (TTL), renewal, revocation, and the parent-child relationships that form a token hierarchy. Understanding these concepts is essential for secure, scalable Vault deployments.

![The image is a slide titled "Token Hierarchy," explaining the concept of token time-to-live (TTL) and revocation, with a note that root tokens have no TTL and a sad face emoji.](https://kodekloud.com/kk-media/image/upload/v1752878005/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Token-Hierarchy/token-hierarchy-ttl-revocation-slide.jpg)

## Token TTL and Renewal

Every Vault token is issued with a TTL—the duration after which Vault automatically revokes the token. The initial root token is the exception, as it has no TTL by default (though you can configure a TTL for additional root tokens).

| Scenario                                 | Description                                                                              |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| Token TTL = 1 hour; Max Renewable = 24 h | Must renew within 1 hour. Each renewal resets the TTL until 24 hours total have elapsed. |
| Renewal before TTL expiry                | Resets the TTL back to its original value, up to the maximum renewable period.           |
| Exceeding Max Renewable Period           | Vault permanently revokes the token, regardless of further renewal attempts.             |

> [!important]
> **Note**
>
> Root tokens have no TTL by default. Use `vault token create -policy="root" -ttl="48h"` to issue a root token with a custom TTL.

## Manual Revocation

You can revoke tokens on demand using either the Vault CLI or the HTTP API. Immediate revocation invalidates the token and its descendants.

| Method   | Command / Endpoint                                         |
| -------- | ---------------------------------------------------------- |
| CLI      | `vault token revoke <token>`                               |
| HTTP API | `POST /v1/sys/revoke` with JSON payload `{ "token": ... }` |

```
# Revoke a token via CLI
vault token revoke s.1234567890abcdef
```

> [!important]
> **Warning**
>
> Revoking a parent token will also revoke **all** of its child tokens, regardless of their remaining TTL.

## Parent-Child Token Relationships

When you authenticate with a Vault token and create another token, the new token becomes a “child” of the creator (“parent”). Revoking a parent cascades through all descendants.

![The image illustrates a token hierarchy with tokens marked for revocation, showing their time-to-live (TTL) and the sequence in which they are revoked.](https://kodekloud.com/kk-media/image/upload/v1752878006/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Token-Hierarchy/token-hierarchy-revocation-ttl-diagram.jpg)

1.  A green token (parent) is issued with a 3-hour TTL.
2.  The green token spawns two children:
    - A pink token (4 h TTL).
    - A yellow token (1 h TTL).
3.  The yellow token issues a blue token (2 h TTL).

### Cascading Revocation Timeline

- **After 1 hour**:
  - The yellow token expires → revoked automatically.
  - Its child (blue token) is immediately revoked, despite having remaining TTL.
- **After 3 hours**:
  - The green token expires → revoked automatically.
  - Its remaining child (pink token) is immediately revoked.

This cascading revocation model ensures no orphaned tokens remain when a parent token becomes invalid.

## Links and References

- [Vault CLI Commands](https://developer.hashicorp.com/vault/docs/commands)
- [Vault HTTP API](https://developer.hashicorp.com/vault/api-docs)
- [HashiCorp Vault Concepts](https://developer.hashicorp.com/vault/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/25d25dc9-571f-4051-8ccc-dafc01ea07be)**
>
> Watch video content
