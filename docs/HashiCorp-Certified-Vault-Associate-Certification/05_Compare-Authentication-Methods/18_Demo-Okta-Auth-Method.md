# Demo Okta Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Demo-Okta-Auth-Method)

---

## Table of Contents

- Demo Okta Auth Method
  - 1. Create an Okta API Token
  - 2. Enable the Okta Auth Method in Vault
  - 3. Configure the Okta Auth Method
  - 4. Map an Okta User to a Vault Policy
  - 5. Sign in to Vault via Okta
  - Links and References
  - Watch Video
    - CLI Authentication
    - UI Authentication

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Demo Okta Auth Method

In this tutorial, you’ll configure HashiCorp Vault to authenticate users through Okta. You will:

1.  Create an Okta API token
2.  Enable and verify the Okta auth method in Vault
3.  Configure Vault with your Okta organization details
4.  Map Okta users (and groups) to Vault policies
5.  Sign in to Vault via Okta (CLI and UI)

By the end, Vault will trust Okta as an identity provider, enforcing your Vault policies based on Okta users and groups.

---

## 1\. Create an Okta API Token

1.  Log in to the [Okta Admin Console](https://developer.okta.com/docs/guides/create-an-api-token/overview/).
2.  Go to **Security** → **API** → **Tokens**.
3.  Click **Create Token**, give it a descriptive name (for example, `Vault-Integration`), and copy the generated token.

![The image shows a web interface for creating an API token on Okta, with a pop-up message confirming the token creation and displaying the token value.](https://kodekloud.com/kk-media/image/upload/v1752878019/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Okta-Auth-Method/okta-api-token-creation-interface.jpg)

> [!important]
> **Warning**
>
> Treat your Okta API token like a password. Store it securely (for example, in Vault’s [Cubbyhole](https://www.vaultproject.io/docs/secrets/cubbyhole) or an environment variable).

---

## 2\. Enable the Okta Auth Method in Vault

On your Vault server (shown here running in **dev** mode), enable the Okta auth backend:

```
vault auth enable okta
vault auth list
```

| Path   | Type  | Description             |
| ------ | ----- | ----------------------- |
| okta/  | okta  | Okta authentication     |
| token/ | token | Built-in token provider |

Sample output:

```
Path    Type   Accessor
----    ----   --------
okta/   okta   auth_okta_90844582
token/  token  auth_token_0ba527c3
```

---

## 3\. Configure the Okta Auth Method

Provide Vault with your Okta **base URL**, **organization name**, and the **API token** you created:

```
vault write auth/okta/config \
  base_url="okta.com" \
  org_name="your-org-name" \
  api_token="00SkFU6jMj8HkcuH03AUs6zdiGzQFTOBebVbbP9K"
```

Verify the settings:

```
vault read auth/okta/config
```

Expected response:

```
Key                     Value
---                     -----
base_url                okta.com
org_name                your-org-name
organization            your-org-name
bypass_okta_mfa         false
token_policies          []
...
```

> [!important]
> **Note**
>
> If your organization requires multi-factor authentication, set `bypass_okta_mfa` to `false` (default) to enforce it.

---

## 4\. Map an Okta User to a Vault Policy

Assign an Okta user (for example, **bryan@krausen.io**) to a Vault policy (e.g., `bryan`):

```
vault write auth/okta/users/bryan@krausen.io policies=bryan
```

Output:

```
Success! Data written to: auth/okta/users/bryan@krausen.io
```

| Resource Type | Example Command                                                  |
| ------------- | ---------------------------------------------------------------- |
| Map User      | `vault write auth/okta/users/jane@domain.com policies=developer` |
| Map Group     | `vault write auth/okta/groups/engineering policies=eng-team`     |

---

## 5\. Sign in to Vault via Okta

### CLI Authentication

```
vault login -method=okta username="bryan@krausen.io"
```

You will be prompted for your Okta password and any additional MFA factors.

### UI Authentication

1.  Open the Vault UI and select **Okta** as the login method.
2.  Enter your Okta **username** and **password**, then click **Sign in**.

![The image shows a login page for "Vault" with fields for method, username, and password, and a "Sign in" button. The method selected is "Okta."](https://kodekloud.com/kk-media/image/upload/v1752878020/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Okta-Auth-Method/vault-login-page-okta-sign-in.jpg)

After signing in, view mapped users under **Access** → **Okta** → **Users**. You can also add or edit users:

![The image shows a user interface for creating a new user in a system, with fields for name, groups, and policies, and options to save or cancel.](https://kodekloud.com/kk-media/image/upload/v1752878021/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Okta-Auth-Method/user-interface-create-new-user-fields.jpg)

To map Okta groups in Vault, navigate to **Access** → **Okta** → **Groups**, specify the group name and Vault policies, then save:

![The image shows a web interface for creating a group in a Vault application, with fields for entering a name and policies, and options to save or cancel. A pop-up warning about unsaved changes is also visible.](https://kodekloud.com/kk-media/image/upload/v1752878023/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Okta-Auth-Method/vault-application-group-creation-interface.jpg)

---

With these steps complete, Vault is now integrated with Okta for user and group authentication. Policies defined in Vault will be enforced based on your Okta identities.

## Links and References

- [Vault Okta Auth Method](https://www.vaultproject.io/docs/auth/okta)
- [Okta API Token Guide](https://developer.okta.com/docs/guides/create-an-api-token/overview/)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Best Practices for Secrets Management](https://www.vaultproject.io/docs/best-practices/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/12f9f7b7-8e8a-4e6c-b561-0bf16edbed13)**
>
> Watch video content
