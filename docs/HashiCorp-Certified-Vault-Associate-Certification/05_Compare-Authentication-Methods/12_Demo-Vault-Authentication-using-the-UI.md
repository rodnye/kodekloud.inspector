# Demo Vault Authentication using the UI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Demo-Vault-Authentication-using-the-UI)

---

## Table of Contents

- Demo Vault Authentication using the UI
  - Prerequisites
  - Step 1: Access the Vault UI
  - Step 2: Select and Authenticate
  - Step 3: Explore the Vault Home Screen
  - Step 4: Use Your Token in the CLI
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Demo Vault Authentication using the UI

This guide demonstrates how to authenticate to HashiCorp Vault using the [Vault UI](https://www.vaultproject.io/docs/ui). You’ll learn how to log in with your preferred method, retrieve your client token, and switch to the CLI.

## Prerequisites

Ensure the following authentication methods are enabled in your Vault cluster:

| Auth Method | Description                 | Documentation                                                   |
| ----------- | --------------------------- | --------------------------------------------------------------- |
| token       | Static token authentication | [Token Auth](https://www.vaultproject.io/docs/auth/token)       |
| userpass    | Username/password login     | [Userpass Auth](https://www.vaultproject.io/docs/auth/userpass) |
| Okta        | Single sign-on with Okta    | [Okta Auth](https://www.vaultproject.io/docs/auth/okta)         |

## Step 1: Access the Vault UI

Open your browser and navigate to:

```
http://<your-vault-address>:8200
```

You will see the login screen where only the enabled methods appear in the dropdown.

> [!important]
> **Note**
>
> Only methods enabled on your Vault server will show up in the dropdown. Contact your administrator if you need a new auth method enabled.

## Step 2: Select and Authenticate

1.  From the dropdown, choose **Okta** (or any enabled method).
2.  Enter your **Username** and **Password**.
3.  Click **Sign In**.

![The image shows a login page for "Vault" with fields for method, username, and password, and a "Sign In" button. The method selected is "Okta," and there are options for more settings.](https://kodekloud.com/kk-media/image/upload/v1752878024/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Vault-Authentication-using-the-UI/vault-login-page-okta-sign-in.jpg)

After successful authentication, Vault redirects you to its home screen.

## Step 3: Explore the Vault Home Screen

On the UI home screen, you can:

- Browse **Secret Engines** (e.g., `cubbyhole`, `secret`)
- View and manage **Tokens**
- Configure **Policies**

Click the user menu in the top-right corner to copy the client token issued during login.

![The image shows a web interface for HashiCorp Vault, displaying a list of secret engines, including "cubbyhole" and "secret." The interface includes options for managing tokens and adding new engines.](https://kodekloud.com/kk-media/image/upload/v1752878024/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Vault-Authentication-using-the-UI/hashicorp-vault-web-interface-secret-engines.jpg)

## Step 4: Use Your Token in the CLI

Once you have your token, you can authenticate the Vault CLI:

```
# On Windows:
C:\> vault login s.TEKrNn3Cv53pZdbPh8xg41Pu
Success! You are now authenticated. The token information displayed below
is already stored in the token helper. You do NOT need to run "vault login"
again. Future Vault requests will automatically use this token.

Key                      Value
---                      -----
token                    s.TEKrNn3Cv53pZdbPh8xg41Pu
token_accessor           M0xoSDLdcWQyI19yLrdUKhI8
token_duration           767h58m21s
token_renewable          true
token_policies           ["bryan" "default"]
identity_policies        []
policies                 ["bryan" "default"]
token_meta_policies      bryan
token_meta_username      bryan@krausen.io

C:\> set VAULT_TOKEN=s.TEKrNn3Cv53pZdbPh8xg41Pu

# On Linux/macOS:
$ export VAULT_TOKEN=s.TEKrNn3Cv53pZdbPh8xg41Pu
```

> [!important]
> **Note**
>
> After exporting `VAULT_TOKEN`, all subsequent [Vault CLI](https://www.vaultproject.io/docs/commands) commands will use this token automatically. Consider adding this line to your shell profile for convenience.

Switching from the UI to the CLI lets you leverage commands not yet available in the interface.

---

## References

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/a8c5d884-c1a9-4047-bae9-3feeb5be5635)**
>
> Watch video content
