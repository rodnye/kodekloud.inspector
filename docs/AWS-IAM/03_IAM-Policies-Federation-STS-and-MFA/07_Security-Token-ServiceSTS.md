# Security Token ServiceSTS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/IAM-Policies-Federation-STS-and-MFA/Security-Token-ServiceSTS)

---

## Table of Contents

- Security Token ServiceSTS
  - Use Case: External Application Access to Amazon S3
  - References
  - Watch Video
    - Step 1: Authenticate with Your Identity Provider
    - Step 2: Call AssumeRoleWithSAML to Obtain Temporary Credentials
    - Step 3: Use the Temporary Credentials to Access S3

---

## Content

AWS - IAM

IAM Policies Federation STS and MFA

# Security Token ServiceSTS

AWS Security Token Service (STS) is a managed web service that issues temporary, limited-privilege credentials for IAM users, IAM roles, or federated identities. By leveraging STS, you can enforce the principle of least privilege, avoid long-term credentials, and securely grant short-term access to AWS resources.

## Use Case: External Application Access to Amazon S3

Consider an application running on-premises in your corporate data center. To retrieve objects from an S3 bucket without embedding long-term AWS keys, you can integrate STS with your identity provider (IdP) and SAML federation.

### Step 1: Authenticate with Your Identity Provider

1.  The client application prompts the user for corporate credentials.
2.  These credentials are sent to an external LDAP-based IdP for verification.
3.  Upon successful login, the IdP issues a SAML assertion to the client.

> [!important]
> **Why SAML Federation?**
>
> SAML federation lets you use existing corporate credentials for AWS access, reducing password sprawl and improving security posture.

### Step 2: Call AssumeRoleWithSAML to Obtain Temporary Credentials

With the SAML assertion in hand, the application calls the STS endpoint:

```
aws sts assume-role-with-saml \
  --role-arn arn:aws:iam::123456789012:role/S3AccessRole \
  --principal-arn arn:aws:iam::123456789012:saml-provider/CorpIdP \
  --saml-assertion file://assertion-response.xml
```

STS validates the SAML assertion, then returns these temporary credentials:

| Credential        | Description                                     |
| ----------------- | ----------------------------------------------- |
| Access Key ID     | Unique identifier for the session               |
| Secret Access Key | Secret used to sign AWS API requests            |
| Session Token     | Token that authorizes API calls for the session |

These credentials inherit the permissions defined in the assumed role’s policy and expire automatically (up to 12 hours).

![The image is a flowchart illustrating an STS (Security Token Service) example, showing the interaction between a client app, a portal identity provider (IDP), and AWS as the service provider. It details the authentication process and the exchange of SAML assertions and temporary security credentials.](https://kodekloud.com/kk-media/image/upload/v1752862997/notes-assets/images/AWS-IAM-Security-Token-ServiceSTS/sts-security-token-service-flowchart.jpg)

### Step 3: Use the Temporary Credentials to Access S3

Export the returned credentials into your environment:

```
export AWS_ACCESS_KEY_ID=ASIAXXXXXXXXXXXXXXXX
export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
export AWS_SESSION_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Now you can run S3 operations with least-privilege access:

```
aws s3 ls s3://your-bucket-name/path/
```

> [!important]
> **Temporary Credentials Expire**
>
> Temporary credentials automatically expire after the duration specified in the role trust policy (maximum 12 hours). Always handle session renewal and error retries in your application.

---

## References

- [AWS STS API Reference](https://docs.aws.amazon.com/STS/latest/APIReference/Welcome.html)
- [AWS IAM Roles and Permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/8ffebc04-c194-403a-ac2e-2a2f0a6221ce/lesson/bcbf1532-728f-4915-a4f1-909291e3b8a6)**
>
> Watch video content
