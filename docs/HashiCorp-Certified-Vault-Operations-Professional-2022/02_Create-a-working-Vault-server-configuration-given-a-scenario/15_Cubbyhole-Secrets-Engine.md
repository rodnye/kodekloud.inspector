# Cubbyhole Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Cubbyhole-Secrets-Engine)

---

## Table of Contents

- Cubbyhole Secrets Engine
  - Viewing and Using Cubbyhole
  - Workflow Overview
  - Benefits
  - CLI: Wrapping a Secret
  - UI: Wrapping a Secret
  - CLI: Unwrapping a Secret
  - UI: Unwrapping a Secret
  - Links and References
  - Watch Video
    - CLI: Write and Read
    - API: Write and Read
    - Inspecting the Wrapping Token

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Cubbyhole Secrets Engine

Vault’s **Cubbyhole Secrets Engine** offers isolated, per-token storage for secrets. Just like kindergarten cubbies, each token gets its own private compartment: when the token is revoked or expires, its cubbyhole and all its contents are destroyed. No other token—even the root token—can access another token’s cubbyhole.

> [!important]
> **Note**
>
> The Cubbyhole engine is automatically enabled at the `cubbyhole/` path. It cannot be disabled, relocated, or instantiated multiple times.

![The image is an introduction slide about the Cubbyhole Secrets Engine, explaining its default settings, token linkage, and restrictions on disabling or moving it.](https://kodekloud.com/kk-media/image/upload/v1752878397/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Cubbyhole-Secrets-Engine/cubbyhole-secrets-engine-introduction-slide.jpg)

Imagine each basket below represents a token’s private cubbyhole. When the token’s TTL ends or it’s revoked, its basket—and everything inside—vanishes.

![The image illustrates the concept of service tokens having individual cubbyholes, with each token stored separately and inaccessible to others, and notes that cubbyholes expire with the tokens.](https://kodekloud.com/kk-media/image/upload/v1752878399/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Cubbyhole-Secrets-Engine/service-tokens-cubbyholes-expiration-illustration.jpg)

## Viewing and Using Cubbyhole

You don’t need to enable Cubbyhole—it’s always available. Verify it with:

```
vault secrets list
```

Example output:

```
Path          Type       Accessor                  Description
----          ----       ---------                 -----------
cloud/        kv         kv_dd590f0e
cubbyhole/    cubbyhole  cubbyhole_9c6c2ca2       per-token private secret storage
identity/     identity   identity_e55fbf01        n/a
kv/           kv         kv_ed482380              n/a
kvv2/         kv         kv_0559442e              n/a
```

### CLI: Write and Read

Use KV v1–style commands:

```
# Write a secret
vault write cubbyhole/training certification=hcvop

# Read the secret
vault read cubbyhole/training
```

### API: Write and Read

Using the HTTP API:

```
# Write
curl \
  --header "X-Vault-Token: ${VAULT_TOKEN}" \
  --request POST \
  --data '{"certification":"hcvop"}' \
  https://vault.example.com:8200/v1/cubbyhole/training

# Read
curl \
  --header "X-Vault-Token: ${VAULT_TOKEN}" \
  https://vault.example.com:8200/v1/cubbyhole/training
```

For more, see the [Vault API Reference](https://www.vaultproject.io/api-docs).

---

Response wrapping lets you transmit secrets securely over untrusted channels (e.g., email, chat). Instead of sending raw data, Vault issues a **wrapping token**, stores the secret in that token’s cubbyhole, and returns only the token. The recipient unpacks it to retrieve the secret.

![The image is a slide explaining the concept of "Response Wrapping" in a security context, highlighting the use of a temporary, single-use wrapping token to securely retrieve secrets over a network. It includes a cartoon character illustration at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878400/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Cubbyhole-Secrets-Engine/response-wrapping-security-token-illustration.jpg)

## Workflow Overview

1.  Requester asks Vault for a secret.
2.  Vault returns a wrapping token instead of the secret data.
3.  Vault stores the secret in the wrapping token’s cubbyhole.
4.  Requester shares the wrapping token over any channel.
5.  Recipient unwraps the token to fetch the secret.

![The image illustrates a process called "Response Wrapping" involving five steps for securely handling secrets using a token system. It shows two characters, one with access to secrets and one without, interacting with a vault to wrap and unwrap secrets.](https://kodekloud.com/kk-media/image/upload/v1752878401/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Cubbyhole-Secrets-Engine/response-wrapping-token-system-illustration.jpg)

## Benefits

| Benefit               | Description                                              |
| --------------------- | -------------------------------------------------------- |
| Privacy               | Only the wrapping token crosses the network.             |
| Malfeasance Detection | Single-use tokens prevent multiple unwrappings.          |
| Lifetime Limitation   | Tokens expire quickly (e.g., default TTL of 60 seconds). |

![The image outlines the benefits of response wrapping, highlighting privacy, malfeasance detection, and limitation of secret exposure lifetime. It features a yellow background with a cartoon character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878403/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Cubbyhole-Secrets-Engine/response-wrapping-benefits-privacy-cartoon.jpg)

---

## CLI: Wrapping a Secret

Use the `-wrap-ttl` flag on any read command. For example, wrapping a KV secret:

```
vault kv get -wrap-ttl=5m secrets/certification/hcvop
```

Sample output:

```
Key                           Value
---                           -----
wrapping_token                hvs.CAESIDgPWW9ok_h4KHGh2cyObTJ4...
wrapping_accessor             O5XSKsRf0c7CwXo996BJkYNi
wrapping_token_ttl            5m
wrapping_token_creation_time  2022-12-25T10:36:36.588947-04:00
wrapping_token_creation_path  secrets/certification/hcvop
```

### Inspecting the Wrapping Token

```
vault token lookup hvs.CAESIDgPWW9ok_h4KHGh2cyObTJ4WWO5XSKsRf0c7CwXo996BJkYNi
```

Output fields include `creation_ttl`, `expire_time`, `num_uses`, and the original `path`.

---

## UI: Wrapping a Secret

In the Vault UI:

1.  Navigate to the desired secret.
2.  Click **Copy**, then **Wrap Secret**.
3.  The wrap token appears in the bottom-right panel—copy and share it.

![The image is a tutorial on how to wrap a secret using a user interface, showing a screenshot of a Vault application with steps highlighted for copying and wrapping a secret.](https://kodekloud.com/kk-media/image/upload/v1752878404/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Cubbyhole-Secrets-Engine/vault-secret-wrapping-tutorial-screenshot.jpg)

---

## CLI: Unwrapping a Secret

```
vault unwrap hvs.CAESIDgPWW9ok_h4KHGh2cyObTJ4WWO5XSKsRf0c7CwXo996BJkYNi
```

Example response:

```
Key      Value
---      -----
data     map[admin:jenkins123 app:myapp]
metadata map[created_time:2022-12-25T14:33:10.525712Z ...]
```

Alternatively:

```
export VAULT_TOKEN=<wrapping-token>
vault unwrap
```

Or:

```
vault login <wrapping-token>
vault unwrap
```

## UI: Unwrapping a Secret

In the UI, go to **Tools » Unwrap**, paste your wrapping token, then click **Unwrap Data**. The secret fields will display in the panel.

![The image shows a user interface for unwrapping data using a tool, with steps highlighted for entering a wrapping token and viewing unwrapped data.](https://kodekloud.com/kk-media/image/upload/v1752878405/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Cubbyhole-Secrets-Engine/data-unwrapping-tool-user-interface.jpg)

---

Cubbyhole and response wrapping are key patterns for securely sharing static or dynamic credentials without exposing them directly. By sending only a single-use token with a short TTL, you ensure secrets remain protected until the moment of unwrapping.

## Links and References

- [Vault Documentation](https://www.vaultproject.io/docs)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [Vault API Reference](https://www.vaultproject.io/api-docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/fb642978-4f5c-4527-8d65-8c7d6fda5ece)**
>
> Watch video content
