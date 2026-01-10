# Explaining Time to Live TTL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Explaining-Time-to-Live-TTL)

---

## Table of Contents

- Explaining Time to Live TTL
  - Understanding Maximum TTL (Max TTL)
  - Default Token TTL
  - How to Set Token TTL
  - References
  - Watch Video
    - 1. Explicit CLI TTL
    - 2. Auth Method Configuration
    - 3. Rely on the Default TTL

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Explaining Time to Live TTL

Time-to-Live (TTL) in HashiCorp Vault determines how long a non-root token remains valid before it’s automatically revoked. Think of it like a hotel room key: if you book for eight nights, the key stops working on day nine. Vault’s TTL works the same way for tokens—no more, no less.

Every non-root token you create or renew in Vault receives a TTL. Root tokens, by default, do not have a TTL and stay active until explicitly revoked.

![The image explains the concept of Time-To-Live (TTL) for non-root tokens, detailing how TTL is determined by creation or renewal time and the necessity of renewal before expiration to maintain validity.](https://kodekloud.com/kk-media/image/upload/v1752877989/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Explaining-Time-to-Live-TTL/ttl-non-root-tokens-explanation.jpg)

When you issue a token with a specified TTL (for example, 30 minutes), Vault calculates its expiration time from the creation or last renewal timestamp. Renewing the token before it expires resets the TTL countdown. Letting the TTL lapse causes Vault to revoke the token, after which it cannot be renewed or used again.

## Understanding Maximum TTL (Max TTL)

In addition to the rolling TTL, Vault enforces a **Max TTL**, an absolute cap on a token’s lifetime. No matter how many times you renew, the token cannot live longer than its Max TTL from the original creation time.

![The image explains the concept of Time-To-Live (TTL) and Max TTL for tokens, illustrating how a token can be renewed until it reaches its Max TTL of 6 hours, beyond which it cannot be renewed. A timeline shows token creation and renewal events.](https://kodekloud.com/kk-media/image/upload/v1752877990/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Explaining-Time-to-Live-TTL/ttl-max-ttl-token-renewal-timeline.jpg)

**Example Timeline**

- **0 h:** Token created (TTL = 2 h, Max TTL = 6 h)
- **1 h:** Renew → New expiry at 3 h
- **3 h:** Renew → New expiry at 5 h
- **6 h:** Max TTL reached → Token revoked

![The image explains the concept of Time-To-Live (TTL) and Max TTL for tokens, illustrating how a token can be renewed until it reaches its Max TTL of 6 hours, after which it cannot be renewed further. A timeline shows the token's creation, renewal, and eventual revocation.](https://kodekloud.com/kk-media/image/upload/v1752877991/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Explaining-Time-to-Live-TTL/ttl-max-ttl-token-renewal-diagram.jpg)

> [!important]
> **Renewal Missed?**
>
> If you fail to renew the token before its current TTL expires (e.g., at 2 h), Vault revokes it immediately—even if its Max TTL (6 h) hasn’t been reached.

## Default Token TTL

If you don’t specify a TTL when creating a token, Vault applies a **default TTL** of 768 hours (32 days). You can customize this in your Vault configuration:

```
default_lease_ttl = "24h"
```

> [!important]
> **Note**
>
> In many development environments, you may still see the unchanged default of `768h` in screenshots or logs.

## How to Set Token TTL

Vault provides three methods to define token TTL and Max TTL. Use the approach that best fits your workflow:

| Method                        | Command / Configuration                                                                                  | TTL Applied              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Explicit CLI**              | `vault token create -policy=training -ttl=60m`                                                           | 60 minutes, no Max TTL   |
| **Auth Method Configuration** | `bash<br>vault write auth/approle/role/training-role \\ <br> token_ttl=1h \\ <br> token_max_ttl=24h<br>` | 1 hour TTL, 24 hours Max |
| **Omit TTL in CLI**           | `vault token create -policy=training`                                                                    | Default TTL (768 hours)  |

### 1\. Explicit CLI TTL

```
vault token create -policy=training -ttl=60m
```

This issues a token with a fixed 60-minute TTL.

### 2\. Auth Method Configuration

Configure your auth method (e.g., AppRole) to set default TTLs for tokens it issues:

```
vault write auth/approle/role/training-role \
    token_ttl=1h \
    token_max_ttl=24h
```

When a client logs in via this AppRole, its token inherits a 1 hour TTL and a 24 hour Max TTL.

### 3\. Rely on the Default TTL

If you omit the `-ttl` flag:

```
vault token create -policy=training
```

Vault applies the default TTL defined in your configuration (`default_lease_ttl`).

## References

- [Vault Token Management](https://www.vaultproject.io/docs/concepts/tokens)
- [Vault Configuration](https://www.vaultproject.io/docs/configuration)
- [HashiCorp Vault – Lease and Renewal](https://www.vaultproject.io/docs/concepts/lease)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/c2bffc28-80f8-4959-bc25-32271d82e8ed)**
>
> Watch video content
