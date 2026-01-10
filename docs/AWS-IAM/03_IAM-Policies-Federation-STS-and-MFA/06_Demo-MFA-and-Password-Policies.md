# Demo MFA and Password Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/IAM-Policies-Federation-STS-and-MFA/Demo-MFA-and-Password-Policies)

---

## Table of Contents

- Demo MFA and Password Policies
  - Configuring MFA for an IAM User
  - Customizing Password Policies
  - Links and References
  - Watch Video

---

## Content

AWS - IAM

IAM Policies Federation STS and MFA

# Demo MFA and Password Policies

In this tutorial, you’ll learn how to secure your AWS environment by enabling Multi-Factor Authentication (MFA) for IAM users and enforcing custom password policies in the AWS Identity and Access Management (IAM) console.

## Configuring MFA for an IAM User

1.  Sign in to the AWS Management Console and open the **IAM** dashboard.
2.  Select **Users** in the navigation pane to view all IAM accounts.

![The image shows an AWS Identity and Access Management (IAM) dashboard displaying a list of users with details such as username, path, groups, last activity, MFA, and password age.](https://kodekloud.com/kk-media/image/upload/v1752862979/notes-assets/images/AWS-IAM-Demo-MFA-and-Password-Policies/aws-iam-dashboard-users-list-details.jpg)

3.  Click on the user **John**, then open the **Security credentials** tab.
4.  Under **Multi-Factor Authentication (MFA)**, click **Assign MFA device**.

![The image shows an AWS Identity and Access Management (IAM) console screen, focusing on multi-factor authentication (MFA) settings for a user, with an option to assign an MFA device.](https://kodekloud.com/kk-media/image/upload/v1752862981/notes-assets/images/AWS-IAM-Demo-MFA-and-Password-Policies/aws-iam-console-mfa-settings.jpg)

5.  Provide a **Device label** (for example, “MFA”) and choose your device type from the table below:

| Device Type         | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| Virtual MFA device  | Software authenticator (Google Authenticator, Authy, Duo Mobile) |
| Security key        | FIDO2/WebAuthn hardware key                                      |
| Hardware TOTP token | Physical token generating time-based codes                       |

![The image shows an AWS IAM interface for selecting a multi-factor authentication (MFA) device, with options for an authenticator app, security key, and hardware TOTP token.](https://kodekloud.com/kk-media/image/upload/v1752862982/notes-assets/images/AWS-IAM-Demo-MFA-and-Password-Policies/aws-iam-mfa-device-selection-interface.jpg)

> [!important]
> **Note**
>
> Make sure your chosen authenticator app supports Time-based One-Time Passwords (TOTP).

6.  To set up a **Virtual MFA device**:
    - Install and open a compatible authenticator app.
    - Scan the QR code displayed in the console.
    - Enter the two consecutive codes from your app (MFA Code 1 and MFA Code 2).
    - Click **Assign MFA** to finalize.

> [!important]
> **Warning**
>
> If you lose access to your MFA device and haven’t saved the seed key, you may need to contact your AWS account administrator or use your root credentials to regain access.

## Customizing Password Policies

1.  In the IAM console, select **Account settings** to view the **Password policy** section.
2.  Review the default requirements, which ensure basic password strength:

| Requirement               | Default Setting                                                  |
| ------------------------- | ---------------------------------------------------------------- |
| Minimum length            | 8 characters                                                     |
| Character categories      | At least 3 of: uppercase, lowercase, numbers, special characters |
| Exclusions                | Cannot match username or email address                           |
| Password expiration       | Disabled                                                         |
| Password reuse prevention | None                                                             |

![The image shows an AWS Identity and Access Management (IAM) account settings page, detailing the default password policy requirements, including minimum length and character types.](https://kodekloud.com/kk-media/image/upload/v1752862983/notes-assets/images/AWS-IAM-Demo-MFA-and-Password-Policies/aws-iam-account-settings-password-policy.jpg)

3.  Click **Edit**, select **Custom**, and modify settings such as:
    - **Minimum password length**
    - **Maximum password age**
    - **Required character types**
    - **Prevent password reuse**

![The image shows an AWS IAM password policy settings page, where custom password requirements can be configured, including minimum length and strength criteria.](https://kodekloud.com/kk-media/image/upload/v1752862985/notes-assets/images/AWS-IAM-Demo-MFA-and-Password-Policies/aws-iam-password-policy-settings.jpg)

4.  Once you've tailored the policy to your organizational standards, click **Save changes**. All IAM users will now be subject to the updated policy.

## Links and References

- [AWS IAM User Guide: Managing MFA Devices](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_manage.html)
- [AWS IAM: Password Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html)
- [AWS Security Best Practices](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/8ffebc04-c194-403a-ac2e-2a2f0a6221ce/lesson/375879f4-c1ae-4165-837d-69d3892ce0cd)**
>
> Watch video content
