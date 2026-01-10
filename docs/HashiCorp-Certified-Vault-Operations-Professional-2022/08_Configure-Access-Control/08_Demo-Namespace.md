# Demo Namespace - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Access-Control/Demo-Namespace)

---

## Table of Contents

- Demo Namespace
  - Prerequisites
  - Listing and Creating Namespaces via CLI
  - Exploring Namespaces in the UI
  - Enabling Secrets Engines in a Child Namespace
  - Writing a Policy in a Namespace
  - Enabling Userpass Authentication
  - Logging in as the New User
  - Extending the Policy
  - Summary
  - Watch Video
  - Practice Lab
    - Creating Child Namespaces

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Access Control

# Demo Namespace

In this lesson, you’ll work with Vault namespaces using both the CLI and UI. We assume Vault Enterprise 1.11 is running locally, unsealed, and you’re authenticated as `root`.

---

## Prerequisites

- Vault Enterprise 1.11 installed and unsealed
- `root` token available

---

## Listing and Creating Namespaces via CLI

1.  List existing namespaces:

    ```
    vault namespace list
    ```

    If none exist, you’ll see:

    ```
    No namespaces found
    ```

2.  Create a top-level namespace named `hcvop`:

    ```
    vault namespace create hcvop
    ```

    Output:

    ```
    Key     Value
    ---     -----
    id      4clCR
    path    hcvop/
    ```

3.  Verify it’s listed:

    ```
    vault namespace list
    ```

    ```
    Keys
    ----
    hcvop/
    ```

### Creating Child Namespaces

Method 1: use the `-namespace` flag.

```
vault namespace create -namespace=hcvop certification
```

Method 2: set `VAULT_NAMESPACE`:

```
export VAULT_NAMESPACE=hcvop
vault namespace create training
```

List the children under `hcvop`:

```
vault namespace list
```

```
Keys
----
certification/
training/
```

Return to root:

```
unset VAULT_NAMESPACE
vault namespace list
```

```
Keys
----
hcvop/
```

---

## Exploring Namespaces in the UI

Fetch your root token if needed:

```
vault token lookup
```

1.  Open the Vault UI.
2.  Log in with your root token.
3.  Click the **Namespaces** dropdown—you’ll see `hcvop/` listed:

![The image shows a web interface of HashiCorp Vault displaying a list of secret engines and namespaces. The background features various tech-related logos.](https://kodekloud.com/kk-media/image/upload/v1752878332/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Namespace/hashicorp-vault-secret-engines-interface.jpg)

4.  Select `hcvop`, re-enter your token, then switch between its `certification` and `training` child namespaces.

---

## Enabling Secrets Engines in a Child Namespace

Target `hcvop/certification` in your shell:

```
export VAULT_NAMESPACE=hcvop/certification
vault secrets list
```

Enable AWS and KV v2:

```
vault secrets enable aws
vault secrets enable -path=certification-kv kv-v2
```

Confirm:

```
vault secrets list
```

| Path              | Type            | Description                      |
| ----------------- | --------------- | -------------------------------- |
| aws/              | aws             | AWS credential management        |
| certification-kv/ | kv              | Key/Value secrets engine v2      |
| cubbyhole/        | ns\\\_cubbyhole | Per-token private secret storage |
| identity/         | ns\\\_identity  | Identity store                   |
| sys/              | ns\\\_system    | System control & debugging       |

In the UI under **Secrets**, you’ll see your enabled engines:

![The image shows a web interface for HashiCorp Vault, displaying a list of secret engines such as AWS, certification-kv, cubbyhole, and Kubernetes. There's also a warning about being logged in with a root token.](https://kodekloud.com/kk-media/image/upload/v1752878334/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Namespace/hashicorp-vault-web-interface-secrets.jpg)

---

## Writing a Policy in a Namespace

Still in `hcvop/certification`, write `certification-policy`:

```
vault policy write certification-policy -<<EOF
path "certification-kv/*" {
  capabilities = ["read","create","update","delete","list"]
}
EOF
```

Success! In the UI under **Access > Policies**, you’ll see your new policy:

![The image shows a web interface for managing ACL policies in HashiCorp Vault, with a warning about using a root token. The background features various tech-related logos.](https://kodekloud.com/kk-media/image/upload/v1752878335/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Namespace/acl-policies-hashi-vault-interface.jpg)

---

## Enabling Userpass Authentication

> [!important]
> **Note**
>
> Authentication methods are namespace-specific. Confirm your context is `hcvop/certification`.

1.  In the UI, navigate to **Auth > Enable new method**.
2.  Select **Username & Password**, then click **Enable**:

![The image shows a web interface for enabling a username and password authentication method in HashiCorp Vault, with a terminal window partially visible in the background.](https://kodekloud.com/kk-media/image/upload/v1752878336/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Namespace/hashicorp-vault-username-password-authentication.jpg)

3.  Create a user `Bryan` with password `HCVOP` and attach `certification-policy`:

![The image shows a web interface for creating a user in a system, with fields for entering a username and password. The background features a terminal window with text and a pattern of logos.](https://kodekloud.com/kk-media/image/upload/v1752878338/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Namespace/user-creation-interface-username-password.jpg)

---

## Logging in as the New User

Log out of the root session. On the UI login page:

- Namespace: `hcvop/certification`
- Method: **Username & Password**
- Credentials: `Bryan` / `HCVOP`

You’ll see only the `certification-kv/` engine. Other paths (e.g., `aws/`) will return an authorization error:

![The image shows a login page for "Vault" with fields for namespace, method, and token, alongside a terminal window displaying a list of keys.](https://kodekloud.com/kk-media/image/upload/v1752878339/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Demo-Namespace/vault-login-page-keys-terminal.jpg)

---

## Extending the Policy

To allow users to list policies:

```
vault policy write certification-policy -<<EOF
path "certification-kv/*" {
  capabilities = ["read","create","update","delete","list"]
}
path "sys/policies/*" {
  capabilities = ["read","list"]
}
EOF
```

After re-login, visit **Access > Policies** to confirm.

---

## Summary

You can target a namespace in two ways:

1.  Add `-namespace=<ns>` to your Vault commands
2.  Export `VAULT_NAMESPACE=<ns>`

Namespaces let you organize and isolate Vault resources for different teams, applications, or environments.  
Learn more: [Vault Namespaces](https://www.vaultproject.io/docs/enterprise/namespaces)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/968cf007-376b-48c8-83f9-17521b5dd575/lesson/eeacf0fa-a9ef-4b59-96b6-0777cb3adcab)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/968cf007-376b-48c8-83f9-17521b5dd575/lesson/b8e4cb0b-90a0-4e8b-9c5d-5b5a94a0e374)**
>
> Practice lab
