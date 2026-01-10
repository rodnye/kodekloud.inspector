# Demo Batch Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Scale-Vault-for-Performance/Demo-Batch-Tokens)

---

## Table of Contents

- Demo Batch Tokens
  - Inspecting Existing Tokens
  - Creating and Revoking a Service Token
  - Creating a Batch Token
  - Batch Token Characteristics
  - Using a Batch Token
  - Watch Video
  - Practice Lab
    - Inspecting the Batch Token
    - Creating an Orphaned Batch Token

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Scale Vault for Performance

# Demo Batch Tokens

In this guide, we’ll cover how to work with HashiCorp Vault Batch Tokens. You’ll learn how to inspect existing tokens, create and revoke service tokens, generate batch tokens (including orphaned ones), and understand their key characteristics. Finally, you’ll see how to authenticate using a batch token.

## Inspecting Existing Tokens

First, verify your current root token accessor:

```
vault token lookup
```

Example output:

```
Key               Value
---               -----
accessor          HMqNT7nOPAsreghAyixLeRks
creation_time     1655409760
display_name      root
policies          [root]
type              service
```

List all token accessors in Vault:

```
vault list auth/token/accessors
```

```
Keys
----
HMqNT7nOPAsreghAyixLeRks
```

Since only the root token exists, that accessor is the one you see.

## Creating and Revoking a Service Token

To create a standard service token with a specific policy:

```
vault token create -policy=cloud-policy
```

Sample response:

```
Key                Value
---                -----
token              hvs.CAESIJBJBIUD...
token_accessor     3hwz8fd5p5U108UGxbeDb3D
token_duration     768h
renewable          true
policies           ["cloud-policy" "default"]
```

Now list accessors again:

```
vault list auth/token/accessors
```

```
Keys
----
3hwz8fd5p5U108UGxbeDb3D
HMqNT7nOPAsreghAyixLeRks
```

Revoke the new service token by its accessor:

```
vault token revoke -accessor 3hwz8fd5p5U108UGxbeDb3D
```

```
Success! Revoked token (if it existed)
```

Any login attempt with the revoked token fails:

```
vault login hvs.CAESIJBJBIUD...
```

```
Error authenticating: permission denied
```

> [!important]
> **Note**
>
> Granting `list` and `revoke` permissions on `auth/token/accessors` lets users revoke any token by accessor. Assign this capability with care.

## Creating a Batch Token

Batch tokens are designed for high-performance use cases. They are longer, non-renewable, and have no accessor.

```
vault token create \
  -policy=cloud-policy \
  -type=batch \
  -ttl=24h
```

```
Key                Value
---                -----
token              hvb.AAAAAQJIifEa...
token_accessor     n/a
token_duration     24h
renewable          false
policies           ["cloud-policy" "default"]
```

- Prefix `hvb.` indicates a HashiCorp Vault Batch Token.
- No accessor means it won’t appear in `auth/token/accessors`.

### Inspecting the Batch Token

Retrieve its metadata:

```
vault token lookup hvb.AAAAAQJIifEa...
```

```
Key               Value
---               -----
accessor          n/a
creation_ttl      24h
expire_time       2022-06-22T08:49:50Z
orphan            false
policies          [cloud-policy default]
renewable         false
type              batch
```

Because `orphan: false`, this token has a parent and cannot be used across performance-replicated clusters.

### Creating an Orphaned Batch Token

An orphaned batch token has no parent, making it usable across performance clusters:

```
vault token create \
  -policy=cloud-policy \
  -type=batch \
  -ttl=24h \
  -orphan=true
```

Verify the orphan status:

```
vault token lookup hvb.AAAAQL7ypVnQ...
```

```
Key               Value
---               -----
orphan            true
# [...]
```

## Batch Token Characteristics

| Feature       | Description                            |
| ------------- | -------------------------------------- |
| No Accessor   | Won’t appear in `auth/token/accessors` |
| Non-Renewable | `renewable: false`                     |
| Non-Revocable | Attempts to revoke result in an error  |

```
vault token revoke hvb.AAAAQL7ypVnQ...
vault token renew hvb.AAAAQL7ypVnQ...
# Error renewing token: batch tokens cannot be renewed
```

> [!important]
> **Warning**
>
> Batch tokens cannot be renewed or revoked. Plan token lifecycles accordingly.

## Using a Batch Token

Authenticate and export the token:

```
vault login hvb.AAAAQL7ypVnQ...
```

```
Success! You are now authenticated.
```

```
export VAULT_TOKEN=hvb.AAAAQL7ypVnQ...
```

If you lack permissions, listing secrets fails:

```
vault secrets list
# Error listing secrets engines: permission denied
```

Clean up by unsetting the token:

```
unset VAULT_TOKEN
vault secrets list
# Error listing secrets engines: permission denied
```

---

You’ve now learned how to create, inspect, and securely use Vault Batch Tokens. For more details, see the [Vault Tokens documentation](https://www.vaultproject.io/docs/concepts/token/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/38df6481-bcbd-4c5c-b7ea-061362970f7f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/b6d94cbf-1da0-4a4b-a8e0-b898706cc2b3)**
>
> Practice lab
