# Vault Tokens Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Vault-Tokens-Auth-Method)

---

## Table of Contents

- Vault Tokens Auth Method
  - Token Types Comparison
  - Creating Tokens
  - Configuring Auth Methods for Token Types
  - Authenticating with a Token
  - Revoking Tokens
  - Watch Video
  - Practice Lab
    - Periodic Tokens
    - Use-Limited Tokens
    - Orphan Tokens
    - UI
    - API
    - CLI

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Vault Tokens Auth Method

Vault’s token authentication is the default and core method for accessing Vault. Almost every Vault operation (aside from health checks and auth endpoints) requires a valid token. Since all auth methods eventually issue tokens, mastering tokens is essential for secure and efficient Vault usage.

> [!important]
> **Note**
>
> Tokens are written to Vault’s storage backend and cannot be disabled. Each token carries one or more policies, determining its permissions. By default, every token inherits the `default` policy.

## Token Types Comparison

Vault supports multiple token types. Below is a comparison of the two primary types:

| Token Type    | Prefix | Persistence    | Renewable | Typical Use Case                             |
| ------------- | ------ | -------------- | --------- | -------------------------------------------- |
| Service Token | hvs    | Stored on disk | Yes       | Long-lived sessions, child token creation    |
| Batch Token   | hvb    | Ephemeral      | No        | High-volume operations, DR replication sales |

![The image is a slide titled "Introduction to Tokens," explaining the differences between service tokens and batch tokens in Vault, highlighting their features and use cases.](https://kodekloud.com/kk-media/image/upload/v1752878542/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Tokens-Auth-Method/introduction-to-tokens-vault-differences.jpg)

For more details, see the [Vault Token Auth Method](https://www.vaultproject.io/docs/auth/token) documentation.

---

## Creating Tokens

Vault lets you tailor tokens for different scenarios: periodic, use-limited, or orphan. Below are examples for each.

### Periodic Tokens

Periodic tokens have no maximum TTL and can be renewed indefinitely at a fixed interval.

```
vault token create \
  -policy="hcvop" \
  -period="24h"
```

Example output:

```
Key                Value
---                -----
token              hvs.CAESINq3yTGLYZofP7iZBStz3zAktvOHfWBigN
token_accessor     fy9Jjse9SRTLIYLufysE6qP0
token_duration     24h
token_renewable    true
token_policies     ["default" "hcvop"]
policies           ["default" "hcvop"]
```

> [!important]
> **Use Case**
>
> Ideal for long-running applications that can renew instead of rotating tokens frequently.

### Use-Limited Tokens

Use-limited tokens expire after a specified number of uses or when the TTL is reached.

```
vault token create \
  -policy="hcvop" \
  -use-limit=2
```

### Orphan Tokens

Orphan tokens have no parent relationship. They remain valid even if the creator token is revoked.

```
vault token create \
  -policy="hcvop" \
  -orphan
```

---

## Configuring Auth Methods for Token Types

You can configure other auth backends (e.g., AppRole) to issue specific token types:

```
# Enable AppRole
vault auth enable approle


# Create a role that issues batch tokens
vault write auth/approle/role/hcvop \
  policies="engineering" \
  token_type="batch" \
  token_ttl="60s"


# Create a role that issues periodic tokens
vault write auth/approle/role/hcvop \
  policies="hcvop" \
  period="72h"
```

- `token_type="batch"` → batch tokens
- `period="72h"` → periodic tokens

---

## Authenticating with a Token

### UI

1.  Choose the **Token** auth method.
2.  Paste your token and click **Sign In**.

![The image shows a login interface for "Vault" where users can authenticate using a token. It includes instructions to log in directly with a token and features a certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878544/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Tokens-Auth-Method/vault-login-interface-token-authentication.jpg)

After signing in, select **Copy Token** from the user menu:

![The image shows a screenshot of a Vault interface with a dropdown menu highlighting the "Copy token" option. It includes instructions to "Copy the Token You are Using" and features a Vault certification badge.](https://kodekloud.com/kk-media/image/upload/v1752878545/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Tokens-Auth-Method/vault-interface-copy-token-screenshot.jpg)

### API

Include the token in the `X-Vault-Token` header or as a Bearer token:

```
curl --header "X-Vault-Token: hvs.cDIPyitdJKSm46ydTXJOsaQR" \
     --request POST \
     --data '{"apikey":"3230sc$832d"}' \
     https://vault.example.com:8200/v1/secret/data/apikey/splunk


curl --header "Authorization: Bearer hvs.cDIPyitdJKSm46ydTXJOsaQR" \
     --request GET \
     https://vault.example.com:8200/v1/secret/data/apikey/splunk
```

### CLI

Interactive login (token entry hidden from history):

```
vault login
# Token (will be hidden): <enter your token>
```

Or pass the token directly (it will appear in your shell history):

```
vault login hvs.cDIPyitdJKSm46ydTXJOsaQR
```

> [!important]
> **Security Warning**
>
> Avoid embedding long-lived tokens in scripts or logs. Use short-lived, renewable tokens and dynamic secrets where possible.

---

## Revoking Tokens

Revoke any token, including root, with:

```
vault token revoke hvs.cDIPyitdJKSm46ydTXJOsaQR
```

---

Tokens are Vault’s fundamental authentication mechanism. You now know how to choose the right token type, create periodic/use-limited/orphan tokens, configure auth backends for specific token issuance, and authenticate or revoke tokens. For further reading, explore the [Vault Authentication Methods](https://www.vaultproject.io/docs/auth) guide.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/6904571f-302d-4646-9e9c-e115b5231dc6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/e034a521-c13c-44cc-8080-34a85853547e)**
>
> Practice lab
