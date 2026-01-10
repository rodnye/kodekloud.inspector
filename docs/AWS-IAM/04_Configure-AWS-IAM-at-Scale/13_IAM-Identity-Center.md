# IAM Identity Center - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/IAM-Identity-Center)

---

## Table of Contents

- IAM Identity Center
  - Key Features
  - Demo: Enabling IAM Identity Center
  - Links and References
  - Watch Video
    - 1. Verify SSO Status in a Member Account
    - 2. Enable in the Management Account
    - (Optional) CLI Alternative

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# IAM Identity Center

AWS IAM Identity Center provides a unified, organizational-level identity management solution for your AWS Organization. While AWS IAM manages users and groups within a single account, IAM Identity Center lets you centralize access, identities, and single sign-on (SSO) across multiple member accounts from your management account.

## Key Features

| Feature              | Description                                                                   | Benefit                                      |
| -------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- |
| Centralized Access   | Assign and manage permissions across all member accounts in your Organization | Consistent, audit-ready permission model     |
| User Identities      | Create users in AWS or connect to external identity providers (Okta, AD)      | Flexible identity source, no separate sync   |
| Single Sign-On (SSO) | Integrate cloud apps and AWS accounts for seamless access                     | One-click access to all authorized resources |

![The image describes IAM Identity Center features, highlighting centralized access, user identities, and single sign-on capabilities.](https://kodekloud.com/kk-media/image/upload/v1752862973/notes-assets/images/AWS-IAM-IAM-Identity-Center/iam-identity-center-access-features.jpg)

---

## Demo: Enabling IAM Identity Center

Follow these steps to enable IAM Identity Center (formerly AWS SSO) in your Organization.

> [!important]
> **Note**
>
> Ensure your AWS Organization is active and you have Management Account privileges before proceeding.

### 1\. Verify SSO Status in a Member Account

1.  Sign in to a **member account**.
2.  Go to **IAM Identity Center** in the AWS Console.
3.  You’ll see a message indicating SSO isn’t enabled yet.

### 2\. Enable in the Management Account

1.  Switch to your **Management Account**.
2.  Open the **IAM Identity Center** page.
3.  Click **Enable IAM Identity Center** to activate SSO for all member accounts.

![The image is a slide titled "Demo: Enable IAM Identity Center," featuring an illustration of a person with a speech bubble labeled "Demo" and instructions for enabling the IAM Identity Center for single sign-on.](https://kodekloud.com/kk-media/image/upload/v1752862974/notes-assets/images/AWS-IAM-IAM-Identity-Center/enable-iam-identity-center-demo-slide.jpg)

### (Optional) CLI Alternative

You can also enable SSO programmatically using the AWS CLI:

```
aws sso-admin enable-sso \
  --region us-east-1 \
  --cli-input-json file://enable-sso-config.json
```

## Links and References

- [AWS IAM Identity Center Documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
- [AWS Organizations Overview](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS CLI SSO Admin Commands](https://docs.aws.amazon.com/cli/latest/reference/sso-admin/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/45adee5e-4b5c-4099-8304-6df6e8b9c2cf)**
>
> Watch video content
