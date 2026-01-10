# Demo Configuring Auth Methods using the UI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Demo-Configuring-Auth-Methods-using-the-UI)

---

## Table of Contents

- Demo Configuring Auth Methods using the UI
  - 1. Logging in with Okta
  - 2. Enabling a New Auth Method
  - 3. Creating a User via the UI
  - 4. Testing Login via the CLI
  - 5. Disabling and Editing Auth Methods
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Demo Configuring Auth Methods using the UI

In this step-by-step guide, you’ll learn how to configure authentication methods in HashiCorp Vault via its web UI. We’ll cover:

| Step | Action                      | Description                                        |
| ---- | --------------------------- | -------------------------------------------------- |
| 1    | Logging in with Okta        | Authenticate using your Okta credentials           |
| 2    | Enabling a new auth method  | Mount the userpass plugin with customized settings |
| 3    | Creating a user             | Add credentials and assign policies                |
| 4    | Testing login via the CLI   | Verify access by obtaining a Vault token           |
| 5    | Disabling & editing methods | Manage or remove existing auth mounts              |

---

## 1\. Logging in with Okta

1.  Open the Vault UI and select **Okta** as the authentication method.
2.  Enter your **Username** and **Password**, then click **Sign In**.
3.  Optionally, choose to save your credentials for future sessions.

![The image shows a login page for "Vault" with fields for method, username, and password, and a "Sign In" button. The method selected is "Okta," and there are options for saving the password.](https://kodekloud.com/kk-media/image/upload/v1752878013/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Configuring-Auth-Methods-using-the-UI/vault-login-page-okta-sign-in.jpg)

After successful authentication, you’ll be redirected to the Vault dashboard.

---

## 2\. Enabling a New Auth Method

Navigate to **Access → Auth Methods**, then click **Enable new method**. You’ll see categories for Generic, Cloud, and Infra authentication plugins:

![The image shows a web interface for enabling an authentication method in Vault, with options for Generic, Cloud, and Infra authentication types. Various methods like AppRole, AWS, Azure, and Kubernetes are available for selection.](https://kodekloud.com/kk-media/image/upload/v1752878014/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Configuring-Auth-Methods-using-the-UI/vault-authentication-methods-web-interface.jpg)

Select **Username & Password** (userpass) and click **Next**. Configure the mount options:

- **Path**: `vault`
- **Default TTL**: `30m`
- **Max TTL**: `24h`
- **Token Type**: `service` (default)
- **Description**: _My cool new Auth Method_

> [!important]
> **Note**
>
> Default TTL controls how long issued tokens remain valid before renewal.

If you have Vault Enterprise, you can also enable **Seal Wrap** for enhanced security. When ready, click **Enable method**:

![The image shows a web interface for enabling a username and password authentication method in a Vault application, with various configuration options like path, description, and token type.](https://kodekloud.com/kk-media/image/upload/v1752878016/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Configuring-Auth-Methods-using-the-UI/vault-username-password-authentication-interface.jpg)

Your new userpass method is now mounted at `vault/`.

---

## 3\. Creating a User via the UI

1.  Go back to **Access → Auth Methods** and click on the **vault** mount (userpass).
2.  Select **Create User**.
3.  Fill out the form:
    - **Username**: `bob`
    - **Password**: `Bob is cool`
    - **Policies**: `bryan`, `default`

4.  Click **Save**. The user `bob` is now created and associated with the specified policies.

![The image shows a user interface for creating a new user in a system, with fields for username, password, and token settings. It includes options for configuring generated token policies and settings.](https://kodekloud.com/kk-media/image/upload/v1752878016/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Configuring-Auth-Methods-using-the-UI/user-interface-create-new-user-settings.jpg)

---

## 4\. Testing Login via the CLI

Set your Vault server address and an existing admin token (Okta):

```
export VAULT_ADDR="https://your-vault-address:8200"
export VAULT_TOKEN="s.TEKrNn3Cv53pZdbPh8xg4TPu"
```

Then log in as `bob`:

```
vault login -method=userpass username=bob password='Bob is cool'
```

If you encounter a permissions error, verify that policies and mount path are correct:

```
Error logging in: error validating credentials: permission denied
```

On success, Vault returns a new client token.

---

## 5\. Disabling and Editing Auth Methods

To manage existing mounts:

- **Disable**: Click the three-dot menu next to the method and choose **Disable**, then confirm deletion of all related data.
- **Edit**: Select **View/Edit** beside a method to update its configuration.

For example, updating Azure auth settings lets you change Tenant ID, Resource, and Environment:

![The image shows a configuration page for setting up Azure in a Vault application, with fields for Tenant ID, Resource, and Environment. There are options to save the configuration and view method options.](https://kodekloud.com/kk-media/image/upload/v1752878017/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-Configuring-Auth-Methods-using-the-UI/azure-vault-configuration-page-settings.jpg)

> [!important]
> **Warning**
>
> Disabling an auth method permanently removes its data. Make sure you’ve migrated or no longer need it before confirmation.

---

Configuring Vault auth methods via the UI simplifies access control management. You can rapidly enable plugins, define policies, onboard users, test logins, and remove methods without leaving your browser.

## Links and References

- [HashiCorp Vault Authentication](https://www.vaultproject.io/docs/auth)
- [Vault UI Overview](https://www.vaultproject.io/docs/upgrading/ui)
- [Okta Auth Method](https://www.vaultproject.io/docs/auth/okta)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/edecf4ab-342e-453d-9153-9d4d3ed0fc75)**
>
> Watch video content
