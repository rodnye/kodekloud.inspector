# Demo IAM Identity Center - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/Demo-IAM-Identity-Center)

---

## Table of Contents

- Demo IAM Identity Center
  - Prerequisites
  - Enabling IAM Identity Center
  - IAM vs. IAM Identity Center
  - References
  - Watch Video

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# Demo IAM Identity Center

In this guide, you’ll learn how to enable and use AWS IAM Identity Center to centrally manage user and group access across multiple AWS accounts and cloud applications.

## Prerequisites

- An AWS Organizations management account
- Permissions to manage IAM Identity Center and AWS Organizations

> [!important]
> **Note**
>
> IAM Identity Center can only be enabled from your organization’s management account. Member accounts cannot enable or configure it.

## Enabling IAM Identity Center

1.  Sign in to the AWS Management Console with your **management account**.
2.  In the top search bar, type **IAM Identity Center** and select it:

    ![The image shows the AWS Console Home with a search for "IAM Identity Center," displaying services like IAM Identity Center, IAM, Cloud9, and Amazon CodeWhisperer.](https://kodekloud.com/kk-media/image/upload/v1752862966/notes-assets/images/AWS-IAM-Demo-IAM-Identity-Center/aws-console-home-iam-identity-center.jpg)

3.  Click **Enable**.
4.  Choose your identity source:
    - Connect an existing directory (AWS Managed Microsoft AD, AD Connector, or external IdP)
    - Use the built-in Identity Center directory

5.  After activation, create users and groups (if using the built-in directory), then assign permission sets to your AWS accounts or cloud applications.

## IAM vs. IAM Identity Center

When you go to the **IAM** console and click **Create user**, selecting **Provide console access** will direct you to specify an Identity Center user:

![The image shows a webpage from the AWS Management Console, specifically the "Specify user details" section for creating a new user in IAM. It includes fields for entering a username and options for providing console access.](https://kodekloud.com/kk-media/image/upload/v1752862968/notes-assets/images/AWS-IAM-Demo-IAM-Identity-Center/aws-iam-create-user-console-access.jpg)

Use the following table to decide between IAM users and IAM Identity Center:

| Capability                        | IAM User           | IAM Identity Center               |
| --------------------------------- | ------------------ | --------------------------------- |
| Console access across accounts    | Manual per account | Centralized via permission sets   |
| Programmatic access (access keys) | Yes                | No (create separate IAM users)    |
| Service-specific credentials      | Yes                | No                                |
| External identity federation      | Limited            | Built-in SAML and OIDC support    |
| Multi-account role assignments    | Manual             | Automated through a single portal |

> [!important]
> **Warning**
>
> Reserve IAM users for programmatic or service-specific credentials. For scalable, centralized console access across multiple accounts, adopt IAM Identity Center.

## References

- [AWS IAM Identity Center User Guide](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
- [AWS Organizations Documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS IAM User Guide](https://docs.aws.amazon.com/iam/latest/UserGuide/introduction.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/c0ec95bf-93dc-47c2-98e0-7a2aa4b6e813)**
>
> Watch video content
