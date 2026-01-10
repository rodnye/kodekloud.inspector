# Demo TOTP Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Demo-TOTP-Secrets-Engine)

---

## Table of Contents

- Demo TOTP Secrets Engine
  - 1. Enable the TOTP secrets engine
  - 2. Create an AWS IAM user and assign a virtual MFA device
  - 3. Register the TOTP key in Vault
  - 4. Generate and use TOTP codes
  - References
  - Watch Video
    - 2.1 Create a new IAM user
    - 2.2 Open MFA settings
    - 2.3 Select Virtual MFA
    - 2.4 Copy the QR code or Base32 secret
    - 4.1 Complete AWS MFA setup
    - 4.2 Sign in to AWS with Vault MFA

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Demo TOTP Secrets Engine

In this tutorial, you’ll leverage HashiCorp Vault’s TOTP (Time-Based One-Time Password) secrets engine to act as a virtual MFA device for AWS IAM users. We’ll walk through:

1.  Enabling the TOTP engine in Vault
2.  Creating an AWS IAM user and setting up a virtual MFA device
3.  Registering the TOTP key in Vault
4.  Generating and applying TOTP codes for AWS sign-in

---

## 1\. Enable the TOTP secrets engine

Start by enabling the TOTP engine at the `totp/` path in Vault:

```
vault secrets enable totp
```

You should see:

```
Success! Enabled the totp secrets engine at: totp/
```

Verify it’s enabled:

```
vault secrets list
```

Ensure the `totp/` entry appears in the output.

> [!important]
> **Note**
>
> Be sure you’re authenticated as a Vault user with permission to enable secrets engines.

---

## 2\. Create an AWS IAM user and assign a virtual MFA device

### 2.1 Create a new IAM user

1.  In the AWS IAM console, click **Users → Add user**.
2.  Enter **TOTP** as the username.
3.  Enable **Programmatic access** and **AWS Management Console access**.
4.  Attach the necessary policies (e.g., **AdministratorAccess**).
5.  Review and create the user.

![The image shows the AWS IAM Management Console's "Add User" page, where user details and access types are being configured. It includes options for setting a username, selecting AWS access types, and creating a console password.](https://kodekloud.com/kk-media/image/upload/v1752878075/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-TOTP-Secrets-Engine/aws-iam-add-user-console-page.jpg)

### 2.2 Open MFA settings

1.  In IAM, go to **Users** and select **TOTP**.
2.  Under **Security credentials**, locate **MFA device: None assigned** and click **Manage**.

![The image shows the AWS Identity and Access Management (IAM) console, displaying a list of users with details such as access key age, password age, last activity, and MFA status.](https://kodekloud.com/kk-media/image/upload/v1752878076/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-TOTP-Secrets-Engine/aws-iam-console-users-details.jpg)

### 2.3 Select Virtual MFA

In the **Manage MFA** popup, choose **Virtual MFA device** and click **Continue**.

![The image shows the AWS Identity and Access Management (IAM) console with a pop-up window for managing MFA devices, offering options like a virtual MFA device, U2F security key, or other hardware MFA device.](https://kodekloud.com/kk-media/image/upload/v1752878078/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-TOTP-Secrets-Engine/aws-iam-console-mfa-management-popup.jpg)

### 2.4 Copy the QR code or Base32 secret

AWS displays both a QR code and a Base32-encoded secret. You need the underlying `otpauth://` URL and the secret string to configure Vault.

![The image shows an AWS Identity and Access Management (IAM) console screen with a pop-up for setting up a virtual MFA device, including a QR code and fields for entering MFA codes.](https://kodekloud.com/kk-media/image/upload/v1752878079/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-TOTP-Secrets-Engine/aws-iam-mfa-setup-console-screen.jpg)

> [!important]
> **Warning**
>
> Keep the Base32 secret private. Anyone with this secret can generate valid MFA codes for your AWS account.

---

## 3\. Register the TOTP key in Vault

With your `<ACCOUNT_ID>` and `<SECRET>`, write the TOTP key into Vault:

```
vault write totp/keys/aws \
  url="otpauth://totp/Amazon%20Web%20Services/TOTP@<ACCOUNT_ID>?secret=<SECRET>"
```

Expected response:

```
Success! Data written to: totp/keys/aws
```

---

## 4\. Generate and use TOTP codes

Use Vault to generate the current 6-digit code:

```
vault read -field=code totp/code/aws
```

```
123456
```

| Action                                  | Command                                    |
| --------------------------------------- | ------------------------------------------ |
| Generate current TOTP code              | `vault read -field=code totp/code/aws`     |
| Verify code during AWS MFA assignment   | Enter two consecutive codes from Vault     |
| Sign in to AWS with Vault-generated MFA | Provide code in the AWS console MFA prompt |

### 4.1 Complete AWS MFA setup

In the AWS console’s Virtual MFA setup, enter two consecutive codes from the previous command to finalize the association.

### 4.2 Sign in to AWS with Vault MFA

When prompted for MFA at AWS login:

1.  Enter your **TOTP** username and password.
2.  Run:

    ```
    vault read -field=code totp/code/aws
    ```

3.  Supply the returned code in the MFA field.

---

Congratulations! You’ve successfully configured Vault’s TOTP secrets engine as a virtual MFA device for an AWS IAM user. This centralizes MFA management in Vault and eliminates the need for individual authenticator apps or hardware tokens.

## References

- [Vault TOTP Secrets Engine](https://www.vaultproject.io/docs/secrets/totp)
- [AWS IAM Virtual MFA Devices](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/08fa46b8-3e47-4ced-a9d8-c01a6858e885)**
>
> Watch video content
