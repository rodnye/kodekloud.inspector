# Periodic Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Periodic-Tokens)

---

## Table of Contents

- Periodic Tokens
  - Why Use Periodic Tokens?
  - Required Permissions
  - How Periodic Tokens Work
  - Creating a Periodic Token
  - Inspecting a Periodic Token
  - Renewing a Periodic Token
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Periodic Tokens

Periodic tokens in Vault are renewable credentials that you can extend indefinitely—provided you renew them before their TTL (time to live) expires. They’re ideal for long-running services or applications that cannot tolerate token expiration or frequent re-authentication.

## Why Use Periodic Tokens?

- **Unlimited lifetime**: No `explicit_max_ttl` limit (set to `0s`).
- **Automatic renewal**: Reset the TTL back to the full period on each successful renewal.
- **Safe revocation**: You can revoke them at any time without leaving orphaned credentials.

> [!important]
> **Warning**
>
> Periodic tokens require careful management. Failing to renew before TTL expiry will invalidate the token and disrupt any dependent service.

---

## Required Permissions

You need one of the following to create a periodic token:

| Authentication Method | Required Privileges                                  |
| --------------------- | ---------------------------------------------------- |
| Root token            | Implicit full access                                 |
| Non-root token        | `sudo` capability on `auth/token/create` (see below) |

Here’s an example HCL policy granting the necessary permissions for non-root users:

```
path "auth/token/create" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}
```

For more on Vault ACL policies, see [Vault Policy Documentation](https://www.vaultproject.io/docs/concepts/policies#policy-syntax).

---

## How Periodic Tokens Work

1.  **Initial TTL**  
    On creation, the token receives a `token_duration` (e.g., `24h`).
2.  **Renewal Period**  
    The `period` field determines how far into the future you can renew (e.g., `24h`).
3.  **Infinite Renewal**  
    With `explicit_max_ttl = 0s`, you can renew the token indefinitely—until you choose to revoke it.

| Field              | Description                                         |
| ------------------ | --------------------------------------------------- |
| `token_duration`   | Initial TTL before first renewal                    |
| `explicit_max_ttl` | `0s` indicates no maximum TTL                       |
| `period`           | Allows renewal up to this period after each renewal |
| `renewable`        | Must be `true` to renew                             |

---

## Creating a Periodic Token

Use the Vault CLI to generate a periodic token. In this example, we assign the `training` policy and set a 24-hour renewal period:

```
vault token create \
  -policy=training \
  -period=24h
```

Sample output:

```
Key                  Value
---                  -----
token                s.2kjqZ12ofDr3efPdtMJ1z5dZ
token_accessor       73rjN1kmzwT7lpMw9H7p6P9
token_duration       24h
token_renewable      true
token_policies       ["default" "training"]
explicit_max_ttl     0s
period               24h
```

- `token_duration`: Initial TTL
- `token_renewable`: `true`
- `period`: Renewal window

---

## Inspecting a Periodic Token

To view the properties of your token:

```
vault token lookup s.2kjqZ12ofDr3efPdtMJ1z5dZ
```

Key fields in the output:

| Field              | Description                        |
| ------------------ | ---------------------------------- |
| `explicit_max_ttl` | `0s` (unlimited max TTL)           |
| `period`           | Renewal interval (e.g., `24h`)     |
| `renewable`        | `true`                             |
| `ttl`              | Remaining time before next renewal |

---

## Renewing a Periodic Token

Call `vault token renew` before the `ttl` expires to reset the TTL back to the full period:

```
vault token renew s.2kjqZ12ofDr3efPdtMJ1z5dZ
```

Repeat this process indefinitely to keep the token alive.

> [!important]
> **Note**
>
> Automate renewal for long-lived services using a cron job or HashiCorp Consul Template to avoid manual intervention.

---

## References

- [Vault Tokens](https://www.vaultproject.io/docs/concepts/tokens)
- [Vault Policy Documentation](https://www.vaultproject.io/docs/concepts/policies#policy-syntax)
- [CLI Commands: token create](https://www.vaultproject.io/docs/commands/token/create)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/db6e7827-230f-43f3-bb1b-34de59e69895)**
>
> Watch video content
