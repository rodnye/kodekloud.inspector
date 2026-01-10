# Demo Vault Authentication using the CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Demo-Vault-Authentication-using-the-CLI)

---

## Table of Contents

- Demo Vault Authentication using the CLI
  - Auth Methods Overview
  - 1. Okta Authentication with Vault CLI
  - 2. Performing Vault Operations
  - 3. AppRole Authentication
  - 4. Userpass Authentication
  - 5. Direct Token Login
  - Next Steps & References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Demo Vault Authentication using the CLI

Learn how to authenticate to HashiCorp Vault using the CLI with various methods—Okta, AppRole, Userpass, token, and more. Follow these steps to obtain a Vault token and perform operations without re-entering credentials.

## Auth Methods Overview

| Auth Method | Command Example                                                  | Description                                     |
| ----------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| Okta        | `vault login -method=okta username=<email>`                      | Authenticate via Okta SSO                       |
| AppRole     | `vault write auth/approle/login role_id="ID" secret_id="SECRET"` | Machine-to-machine auth using RoleID & SecretID |
| Userpass    | `vault login -method=userpass username=<user>`                   | Username/password authentication                |
| Token       | `vault login <token>`                                            | Directly supply an existing token               |

---

## 1\. Okta Authentication with Vault CLI

To log in using Okta, run:

```
PS C:\> vault login -method=okta username=bryan@krausen.io
Password (will be hidden):
```

After entering your password, you’ll see:

```
Success! You are now authenticated. The token information displayed below
is already stored in the token helper. Future Vault requests will
automatically use this token.


Key                      Value
---                      -----
token                    s.WVWlWxsVF9X6lXmhaJaKrYiz
token_accessor           nHTiWyp513OXwT1bZNkZlBq4
token_duration           768h
token_renewable          true
token_policies           ["bryan" "default"]
identity_policies        []
policies                 ["bryan" "default"]
token_meta_username      bryan@krausen.io
```

> [!important]
> **Note**
>
> Vault stores this token in the helper file (`$HOME/.vault-token` on Linux/macOS or `C:\Users\<User>\.vault-token` on Windows). You can verify it with:
>
> ```
> PS C:\> Get-Content $HOME\.vault-token
> s.WVWlWxsVF9X6lXmhaJaKrYiz
> ```

---

## 2\. Performing Vault Operations

Once authenticated, you can enable or disable auth methods, list policies, and perform other Vault operations without re-entering credentials:

```
PS C:\> vault auth enable aws
Success! Enabled aws auth method at: aws/


PS C:\> vault auth disable aws
Success! Disabled the auth method (if it existed) at: aws/


PS C:\> vault policy list
bryan
default
root
```

---

## 3\. AppRole Authentication

AppRole requires both a Role ID and a Secret ID. Use this method for machine-to-machine authentication:

```
PS C:\> vault write auth/approle/login \
    role_id="YOUR_ROLE_ID" \
    secret_id="YOUR_SECRET_ID"
```

You’ll receive a token and metadata in a similar table format.

> [!important]
> **Warning**
>
> Keep your `secret_id` secure and rotate it regularly. Do not commit your credentials to version control.

---

## 4\. Userpass Authentication

For the built-in Userpass method, provide your username and password:

```
PS C:\> vault login -method=userpass username=bryan
Password (will be hidden):
```

Vault issues a token and stores it in the helper file for future CLI commands.

---

## 5\. Direct Token Login

If you already have a valid Vault token, you can log in directly:

```
PS C:\> vault login s.wYWWXsVfF9X6lXhmaJaKrYiz
Success! You are now authenticated. The token information displayed below
is already stored in the token helper.
```

Future commands will use this token automatically. You can then enable another auth method, for example Azure:

```
PS C:\> vault auth enable azure
Success! Enabled azure auth method at: azure/
```

---

## Next Steps & References

- Explore additional auth methods in the [Vault Authentication Methods Docs](https://www.vaultproject.io/docs/auth).
- Learn more about AppRole: [AppRole Authentication](https://www.vaultproject.io/docs/auth/approle).
- Manage tokens and helpers: [Vault Tokens](https://www.vaultproject.io/docs/concepts/tokens).

You now have a solid understanding of using various authentication methods with the Vault CLI.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/05faae12-5f30-4f13-b196-353d2e305409)**
>
> Watch video content
