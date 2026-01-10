# Vault Authentication using the CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Vault-Authentication-using-the-CLI)

---

## Table of Contents

- Vault Authentication using the CLI
  - Table of Contents
  - Overview of Auth Methods
  - 1. Authenticating with an Existing Token
  - 2. Authenticating with Userpass
  - 3. Token Helper & Caching
  - 4. Machine-Friendly JSON Authentication (AppRole)
  - Next Steps
  - References
  - Watch Video
    - Command Breakdown

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Vault Authentication using the CLI

In this guide, you’ll learn how to authenticate to HashiCorp Vault using the CLI. Once you’ve enabled an auth method (e.g., Token, Userpass, OIDC, AppRole), you can log in and cache your client token for seamless future requests.

## Table of Contents

1.  [Overview of Auth Methods](#overview-of-auth-methods)
2.  [1\. Authenticating with an Existing Token](#1-authenticating-with-an-existing-token)
3.  [2\. Authenticating with Userpass](#2-authenticating-with-userpass)
4.  [3\. Token Helper & Caching](#3-token-helper--caching)
5.  [4\. Machine-Friendly JSON Authentication (AppRole)](#4-machine-friendly-json-authentication-approle)
6.  [Next Steps](#next-steps)
7.  [References](#references)

---

## Overview of Auth Methods

| Auth Method | CLI Usage                                      | Description                                   |
| ----------- | ---------------------------------------------- | --------------------------------------------- |
| Token       | `vault login <token>`                          | Authenticate with a pre-generated Vault token |
| Userpass    | `vault login -method=userpass username=<user>` | Username/password authentication              |
| AppRole     | `vault write auth/approle/login ...`           | Machine-to-machine auth for automation        |
| OIDC        | `vault login -method=oidc`                     | Single Sign-On via OIDC providers             |

---

## 1\. Authenticating with an Existing Token

If you already have a Vault token, simply run:

```
vault login s.fhNBot4hRBfDWJ2jBdTwimaG
```

Example output:

```
Success! You are now authenticated. The token information displayed below is already stored in the token helper. You do NOT need to run "vault login" again.
Future Vault requests will automatically use this token.


Key                   Value
---                   -----
token                 s.fhNBot4hRBfDWJ2jBdTwimaG
token_accessor        502YCRmp1sfZ8YcdfbYes9fj
token_duration        ∞
token_renewable       false
token_policies        ["root"]
identity_policies     []
policies              ["root"]
```

By default, `vault login` uses the **token** auth method and caches your token for subsequent commands.

---

## 2\. Authenticating with Userpass

Use the **userpass** auth method when you don’t have a token but have Vault credentials:

```
vault login -method=userpass username=bryan
Password (will be hidden):
```

After providing the correct password, you’ll see:

```
Success! You are now authenticated. The token information displayed below is already stored in the token helper. You do NOT need to run "vault login" again.
Future Vault requests will automatically use this token.


Key                   Value
---                   -----
token                 s.jgSgKqDOnaOxu30ffCOrZWB0
token_accessor        SpiJi6bghz4huS8MG4HsLmNp
token_duration        768h
token_renewable       true
token_policies        ["admin" "default"]
identity_policies     []
policies              ["admin" "default"]
token_meta_username   bryan
```

### Command Breakdown

- `vault login`  
  The Vault CLI subcommand for authentication.
- `-method=userpass`  
  Selects the Userpass auth method.
- `username=bryan`  
  Supplies the required username parameter.

> [!important]
> **Note**
>
> If you have multiple mounts of the same auth type, add `-path=<mount_path>` to specify the correct one.

---

## 3\. Token Helper & Caching

After a successful `vault login`, the CLI writes your token to `~/.vault-token`. This token helper:

1.  Stores your token so you don’t have to re-enter it for every command
2.  Automatically reads and attaches the token to subsequent API calls

> [!important]
> **Warning**
>
> Keep `~/.vault-token` secure. Anyone with access can perform Vault operations under your identity.

---

## 4\. Machine-Friendly JSON Authentication (AppRole)

For CI/CD pipelines or automation, request JSON output and parse the token:

```
export VAULT_ADDR="https://vault.example.com:8200"
export VAULT_FORMAT=json


OUTPUT=$(vault write auth/approle/login \
  role_id="12345657" secret_id="1nv84nd3821s")


VAULT_TOKEN=$(echo "$OUTPUT" | jq -r '.auth.client_token')


vault login "$VAULT_TOKEN"
```

**Steps Explained:**

1.  `export VAULT_FORMAT=json`  
    Instructs the Vault CLI to return JSON.
2.  `vault write auth/approle/login ...`  
    Authenticates via AppRole and captures the full JSON response in `OUTPUT`.
3.  `jq -r '.auth.client_token'`  
    Extracts the client token.
4.  `vault login "$VAULT_TOKEN"`  
    Caches the token for subsequent CLI calls.

---

## Next Steps

Now that you’ve authenticated:

- Read secrets: `vault kv get secret/my-app/config`
- Write secrets: `vault kv put secret/my-app/config key=value`
- Renew tokens: `vault token renew`

Explore more in the [Vault CLI documentation](https://www.vaultproject.io/docs/commands).

---

## References

- [HashiCorp Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [Vault Authentication](https://www.vaultproject.io/docs/auth)
- [jq Manual](https://stedolan.github.io/jq/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/b219c536-90c0-412b-a602-f08571bd0ff7)**
>
> Watch video content
