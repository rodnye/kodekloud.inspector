# Token Accessors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Token-Accessors)

---

## Table of Contents

- Token Accessors
  - Token Accessor Operations
  - 1. Authenticate and View Your Token Accessor
  - 2. Lookup Token Metadata
  - 3. Renewing a Token
  - 4. Revoking a Token
  - Why Token Accessors?
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Token Accessors

Learn how to use token accessors to manage Vault tokens—lookup, renew, and revoke—without exposing the token itself.

Every Vault token has an associated accessor that supports exactly four operations:

- Lookup token metadata (no token reveal)
- Check a token’s capabilities on a given path
- Renew a token’s TTL
- Revoke a token

> [!important]
> **Note**
>
> A token accessor cannot be used to authenticate to Vault or perform standard data operations.

![The image is a slide about "Token Accessors," explaining their use as references to tokens and listing actions they can perform, such as looking up properties and renewing tokens. It also notes that token accessors cannot be used for authentication or additional requests.](https://kodekloud.com/kk-media/image/upload/v1752878004/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Token-Accessors/token-accessors-references-actions-slide.jpg)

## Token Accessor Operations

| Operation          | Description                                         | CLI Example                                             |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------- |
| Lookup metadata    | View creation time, TTL, policies (no token reveal) | `vault token lookup -accessor <accessor>`               |
| Check capabilities | Inspect capabilities on a specific path             | `vault token capabilities -accessor <accessor> secret/` |
| Renew token        | Extend a token’s TTL                                | `vault token renew -accessor <accessor>`                |
| Revoke token       | Disable a token immediately                         | `vault token revoke -accessor <accessor>`               |

## 1\. Authenticate and View Your Token Accessor

Log in and note your token accessor:

```
vault login s.cbC7GJ6U6JaDuDSgkyVcKDv
```

```
Success! You are now authenticated.
Key                  Value
---                  -----
token                s.cbC7GJ6U6JaDuDSgkyVcKDv
token_accessor       K6pHtVc9LbXQdUavg2J1Ixa2
token_duration       ∞
token_renewable      false
policies             ["root"]
```

Create a service token with the `training` policy and a 30-minute TTL:

```
vault token create -policy=training -ttl=30m
```

```
Key                  Value
---                  -----
token                s.5YmCHHV80mN3dJpzOwvVAYk8
token_accessor       2ogWa36gDH5ws08VbuxroByx
token_duration       30m
token_renewable      true
policies             ["default" "training"]
```

## 2\. Lookup Token Metadata

Use the accessor to inspect metadata without revealing the secret:

```
vault token lookup -accessor 2ogWa36gDH5ws08VbuxroByx
```

```
Key                Value
---                -----
accessor           2ogWa36gDH5ws08VbuxroByx
creation_time      1632576647
creation_ttl       30m
display_name       token
expire_time        2021-09-25T10:00:47.0615482-04:00
policies           [default training]
renewable          true
ttl                29m18s
type               service
```

## 3\. Renewing a Token

Extend a token’s TTL using its accessor:

```
vault token renew -accessor 2ogWa36gDH5ws08VbuxroByx
```

```
Key                Value
---                -----
token_accessor     2ogWa36gDH5ws08VbuxroByx
token_duration     30m
token_renewable    true
policies           ["default" "training"]
```

## 4\. Revoking a Token

Revoke the token securely by referencing its accessor:

```
vault token revoke -accessor 2ogWa36gDH5ws08VbuxroByx
```

```
Success! Revoked token (if it existed)
```

> [!important]
> **Warning**
>
> Setting `VAULT_TOKEN` to an accessor will **not** permit secret-read or write operations. Always use the actual token for data access.

Attempting a KV get with an accessor:

```
export VAULT_TOKEN=2ogWa36gDH5ws08VbuxroByx
vault kv get secret/apps/training
```

```
Error making API request.
Code: 403. Errors:
* permission denied
```

## Why Token Accessors?

- Safely delegate token lookup, renewal, and revocation without sharing the secret.
- Minimize blast radius when handing off token management.
- Automate bookkeeping tasks in CI/CD pipelines without exposing credentials.

## References

- [Vault Token Authentication](https://www.vaultproject.io/docs/auth/token)
- [Vault CLI Reference](https://www.vaultproject.io/docs/commands)
- [HashiCorp Vault Best Practices](https://learn.hashicorp.com/tutorials/vault/best-practices)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/ed5e572d-c91e-4cb6-829d-9a964f8fbb35)**
>
> Watch video content
