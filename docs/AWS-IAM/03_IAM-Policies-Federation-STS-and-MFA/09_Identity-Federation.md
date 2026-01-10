# Identity Federation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/IAM-Policies-Federation-STS-and-MFA/Identity-Federation)

---

## Table of Contents

- Identity Federation
  - How Identity Federation Works
  - AWS Federation Standards
  - Web Identity Federation
  - Benefits of AWS Identity Federation
  - Links and References
  - Watch Video

---

## Content

AWS - IAM

IAM Policies Federation STS and MFA

# Identity Federation

Identity federation enables users authenticated by an external Identity Provider (IdP) to access AWS resources without managing separate AWS credentials. By establishing a trust relationship between your IdP and AWS Security Token Service (STS), you can issue temporary, scoped credentials that improve security and simplify user management.

## How Identity Federation Works

When you federate identities with AWS:

1.  A user signs in to your organizational IdP (e.g., Active Directory Federation Services, Okta).
2.  The IdP returns an authentication response (SAML assertion, OIDC token).
3.  Your application or client calls AWS STS to exchange the response for temporary credentials.
4.  AWS STS issues short-lived security credentials (access key ID, secret access key, session token).
5.  The user or application uses these credentials to call AWS APIs.

> [!important]
> **Note**
>
> Temporary credentials are valid for a limited duration (from 15 minutes up to 12 hours). Always request only the permissions required to follow the principle of least privilege.

## AWS Federation Standards

AWS supports multiple federation protocols, enabling integration with on-premises directories, web identity providers, and custom IdPs.

| Protocol       | Use Case                                       | AWS Integration                 |
| -------------- | ---------------------------------------------- | ------------------------------- |
| SAML 2.0       | Enterprise federation (LDAP, Active Directory) | `AssumeRoleWithSAML` API        |
| OpenID Connect | Modern web/mobile apps                         | `AssumeRoleWithWebIdentity` API |
| OAuth 2.0      | Granular authorization for APIs                | Supported via OIDC/OAuth flows  |

![The image illustrates identity federation standards with AWS, featuring SAML 2.0, OpenID Connect, and OAuth 2.0.](https://kodekloud.com/kk-media/image/upload/v1752862987/notes-assets/images/AWS-IAM-Identity-Federation/identity-federation-aws-saml-openid-oauth.jpg)

## Web Identity Federation

Web and mobile applications can let users sign in with social or external IdPs (e.g., Facebook, Google, Amazon, Apple). The flow typically follows these steps:

1.  **User selects a provider** (e.g., Google) on your app’s login page.
2.  **User authenticates** and the provider returns an identity token (OIDC ID token).
3.  **App calls** `AssumeRoleWithWebIdentity` on AWS STS, passing the token.
4.  **STS returns** temporary AWS credentials.
5.  **App uses** these credentials to access AWS services on behalf of the user.

```
aws sts assume-role-with-web-identity \
  --role-arn arn:aws:iam::123456789012:role/WebIdentityRole \
  --role-session-name WebSession \
  --web-identity-token file://token.jwt
```

![The image illustrates a web identity federation process, showing how a user can authenticate through various identity providers (like Facebook, Google, Amazon, and Apple) to access AWS resources via the AWS Security Token Service.](https://kodekloud.com/kk-media/image/upload/v1752862988/notes-assets/images/AWS-IAM-Identity-Federation/web-identity-federation-authentication-process.jpg)

> [!important]
> **Warning**
>
> Do not embed long-lived AWS keys in your mobile or browser-based applications. Always use temporary credentials obtained through web identity federation.

## Benefits of AWS Identity Federation

- Simplified User Management  
  Leverage existing corporate or social identities—no separate AWS passwords.
- Centralized Access Control  
  Define policies in IAM roles and manage permissions in one place.
- Enhanced Security  
  Temporary, automatically rotated credentials reduce the risk of compromised keys.

## Links and References

- [AWS Security Token Service API Reference](https://docs.aws.amazon.com/STS/latest/APIReference/Welcome.html)
- [AWS IAM Identity Federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html)
- [OpenID Connect on AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html)
- [SAML 2.0 Federation on AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/8ffebc04-c194-403a-ac2e-2a2f0a6221ce/lesson/e6dd0ace-ef00-4d52-9891-afc29ceaecfd)**
>
> Watch video content
