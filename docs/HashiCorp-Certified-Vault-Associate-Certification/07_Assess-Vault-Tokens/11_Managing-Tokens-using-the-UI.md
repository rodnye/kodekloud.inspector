# Managing Tokens using the UI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Managing-Tokens-using-the-UI)

---

## Table of Contents

- Managing Tokens using the UI
  - Table of Contents
  - Overview of Token Authentication
  - Logging In with a Token
  - Copying Your Active Token
  - Examples: CLI & API Usage
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Managing Tokens using the UI

In this guide, you’ll learn how to authenticate to HashiCorp Vault’s web interface using tokens and how to copy your active token for CLI or API use. This workflow is essential for administrators and operators who need to manage secrets or automate Vault interactions without repeatedly entering credentials.

## Table of Contents

- [Overview of Token Authentication](#overview-of-token-authentication)
- [Logging In with a Token](#logging-in-with-a-token)
- [Copying Your Active Token](#copying-your-active-token)
- [Examples: CLI & API Usage](#examples-cli--api-usage)
- [References](#references)

## Overview of Token Authentication

Vault’s **Token** auth method is the simplest form of authentication. It’s most commonly used when:

- You have the initial root token after deploying a new Vault cluster.
- You generated a token via the Vault CLI or another auth method.

> [!important]
> **Warning**
>
> Treat Vault tokens like passwords. Never share them publicly or commit them to version control. Always store tokens securely (e.g., in a secrets manager).

## Logging In with a Token

Follow these steps to authenticate in the Vault UI using a token:

| Step | Action                                                             |
| ---- | ------------------------------------------------------------------ |
| 1    | Navigate to the Vault UI and click **Token** under “Authenticate”. |
| 2    | Paste your token into the input field.                             |
| 3    | Click **Sign In** to access the UI.                                |

Once authenticated, you’ll see the Vault dashboard and can begin managing secrets, policies, and more.

## Copying Your Active Token

After signing in (via Token, LDAP, Okta, OIDC, etc.), you can quickly retrieve your current token for use in scripts or API calls:

1.  Click the user menu in the top-right corner of the Vault UI.
2.  Select **Copy Token**.

This copies your active token to the clipboard.

> [!important]
> **Note**
>
> Copying the token from the UI is ideal for one-off CLI commands or testing API endpoints without re-authenticating.

## Examples: CLI & API Usage

Use the copied token to interact with Vault programmatically:

```
# Check Vault status via CLI
export VAULT_TOKEN=<your-copied-token>
vault status
```

```
# Query Vault health endpoint via API
curl \
  --header "X-Vault-Token: $VAULT_TOKEN" \
  http://127.0.0.1:8200/v1/sys/health
```

These examples demonstrate how easy it is to switch from the UI to scripted workflows.

## References

- [Vault UI Overview](https://www.vaultproject.io/docs/getting-started/ui)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/a5ce78d5-1851-4f25-a69b-2fe15446ae3c)**
>
> Watch video content
