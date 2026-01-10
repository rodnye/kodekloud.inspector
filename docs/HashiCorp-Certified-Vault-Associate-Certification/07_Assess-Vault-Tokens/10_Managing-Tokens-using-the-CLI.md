# Managing Tokens using the CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Managing-Tokens-using-the-CLI)

---

## Table of Contents

- Managing Tokens using the CLI
  - Table of Contents
  - 1. Creating a Token
  - 2. Looking Up a Token
  - 3. Renewing a Token
  - 4. Revoking a Token
  - 5. Checking Token Capabilities
  - 6. References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Managing Tokens using the CLI

Vault tokens are the primary authentication mechanism for interacting with HashiCorp Vault. Using the Vault CLI, you can create, inspect, renew, revoke, and check capabilities of tokens to tailor access control for your applications and users.

## Table of Contents

1.  [Creating a Token](#1-creating-a-token)
2.  [Looking Up a Token](#2-looking-up-a-token)
3.  [Renewing a Token](#3-renewing-a-token)
4.  [Revoking a Token](#4-revoking-a-token)
5.  [Checking Token Capabilities](#5-checking-token-capabilities)
6.  [References](#6-references)

---

## 1\. Creating a Token

Use the `vault token create` command to generate a new token with a specified TTL (time-to-live) and attached policies.

```
vault token create \
  -ttl=5m \
  -policy=training
```

Example output:

```
Key                  Value
---                  -----
token                s.12VNpg4OA9tTdCd4V60DuDRK
token_accessor       lMIaz4Tn1t57wKXdsfNv7vlm
token_duration       5m
token_renewable      true
policies             ["default" "training"]
```

| Property           | Description                                               |
| ------------------ | --------------------------------------------------------- |
| token              | Authentication token string                               |
| token\\\_accessor  | String used to renew or revoke without exposing the token |
| token\\\_duration  | Initial TTL before expiration                             |
| token\\\_renewable | Indicates if the token can be renewed                     |
| policies           | List of Vault policies attached to the token              |

> [!important]
> **Note**
>
> You can further customize a token with `-display_name`, multiple policies, and an explicit maximum TTL.

```
vault token create \
  -display_name=jenkins \
  -policy=training,certs \
  -ttl=24h \
  -explicit-max-ttl=72h
```

- `-display_name`: Human-friendly identifier
- `-policy`: Comma-separated Vault policies
- `-ttl`: Initial lifetime (e.g., `24h`)
- `-explicit-max-ttl`: Maximum lifetime across renewals

---

## 2\. Looking Up a Token

Inspect metadata for any token by running:

```
vault token lookup <token-or-accessor>
```

Example:

```
vault token lookup s.12VNpg4OA9tTdCd4V60DuDRK
```

```
Key               Value
---               -----
accessor          lMIaz4Tn1t57wKXdsfNv7vlm
creation_time     1630613718
creation_ttl      5m
display_name      jenkins
expire_time       2021-09-02T16:23:02Z
explicit_max_ttl  72h
id                s.12VNpg4OA9tTd4V60DuDRK
issue_time        2021-09-02T16:15:18Z
last_renewal      2021-09-02T16:18:02Z
num_uses          0
orphan            false
path              auth/token/create
policies          [default training certs]
renewable         true
ttl               3m12s
type              service
```

If you omit the identifier, Vault returns details for the token in your `$VAULT_TOKEN`:

```
vault token lookup
```

---

## 3\. Renewing a Token

Extend a token’s TTL using `vault token renew`. You can renew by token ID or accessor:

```
# Renew by token ID
vault token renew s.12VNpg4OA9tTdCd4V60DuDRK


# Renew by accessor
vault token renew -accessor lMIaz4Tn1t57wKXdsfNv7vlm
```

Renewal output confirms the new TTL and policies:

```
Key             Value
---             -----
token           s.12VNpg4OA9tTdCd4V60DuDRK
token_duration  5m
renewable       true
policies        ["default" "training"]
```

---

## 4\. Revoking a Token

To immediately invalidate a token, use:

```
vault token revoke <token-or-accessor>
```

Example:

```
vault token revoke s.12VNpg4OA9tTdCd4V60DuDRK
```

> [!important]
> **Warning**
>
> Revoking a token is irreversible. Any sessions or processes using that token will lose access immediately.

---

## 5\. Checking Token Capabilities

Determine which operations a token can perform on a specific path:

```
vault token capabilities <token> <path>
```

Example:

```
vault token capabilities s.dhtIk8VsE3Mj61PuGP3ZfFrg kv/data/apps/webapp
```

Output:

```
create, list, read, sudo, update
```

This helps you audit and verify permissions for service accounts or automation tools.

---

## 6\. References

- [Vault CLI Reference](https://www.vaultproject.io/docs/commands)
- [Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault Token Authentication](https://www.vaultproject.io/docs/concepts/tokens)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/b2c77d39-3dea-4fce-986c-393f8df33b0a)**
>
> Watch video content
