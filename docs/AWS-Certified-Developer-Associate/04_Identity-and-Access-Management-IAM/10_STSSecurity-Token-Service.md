# STSSecurity Token Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Identity-and-Access-Management-IAM/STSSecurity-Token-Service)

---

## Table of Contents

- STSSecurity Token Service
  - Key STS API Operations
  - Using the Assume Role API
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Identity and Access Management IAM

# STSSecurity Token Service

In this lesson, we explore AWS's Security Token Service (STS), a web service that enables you to request temporary, limited-privilege credentials for users. STS essentially allows you to assume a role and receive temporary credentials that grant access to AWS resources without sharing long-term credentials.

## Key STS API Operations

Below are the primary STS API calls that you need to know:

1.  **Assume Role**  
    This API call lets you assume a role. It returns temporary credentials that inherit the permissions of the specified role.
2.  **Assume Role with SAML**  
    Use this API call to obtain temporary credentials for users who are authenticated via SAML.
3.  **Assume Role with Web Identity**  
    Similar to the SAML method, this call returns temporary credentials for users authenticated through a web identity provider (e.g., Google, Facebook, or another OIDC provider).
4.  **Decode Authorization Message**  
    This API decodes additional information from an error message when an AWS request fails, offering more insights into the error.
5.  **Get Caller Identity**  
    This call returns details about the IAM user or role that issued the API call.
6.  **Get Session Token**  
    This API retrieves credentials for users who have multi-factor authentication (MFA) enabled.

## Using the Assume Role API

To obtain temporary credentials using a specific role, follow these steps:

1.  Locate the desired role in AWS and note its Amazon Resource Name (ARN).
2.  Use the AWS Command Line Interface (CLI) to assume the role.

For example, run the following CLI command:

```
aws sts assume-role --role-arn arn:aws:iam::841860927337:role/S3AccessRole --role-session-name s3-access-example
```

The command outputs a JSON structure containing temporary credentials. A typical response looks like this:

```
{
  "Credentials": {
    "AccessKeyId": "ASI4IAWSJ5U4LQZBLVM",
    "SecretAccessKey": "p6H40tU7Jza2Xptv5yFDoK6y9qiT34ouhaeU7!",
    "SessionToken": "IQoJbJpZ2LuX2VjE///////wEaaCXZLvwchQTMjSGMEQCIFA2tQMSSmEd5zWhLxZ3KZbAYfH9dDUuahH0fz+BTV0AiTi8g+auLQ0WibNV57TepezBiKGqCrQ4haM+yKeJeoGiqnAgj/////////88BEaEaD0Mg2MbkyNzMyMlHtr0lYjBp3igDuwCKvsBGSJwZlFUlNjk/1vbWmgpnUOpPW/24XILGsz02+LM5oXNlzNGEXBH8ok7SXvRceyKkHdLcp3/MNU464LP2ShCaQukrTWGTv8R4tb42LITlZIExjHWrifDA9RSkFtLylsJXPKYypfUO0fr0C6JUrhQis6dAifRVCl3ylHkLFxpsK3G1otEw6ZHJxk02EkxFZOGdSMboTHuscoFpguzU0jpJq4Q2c/duvUBpIYfY76B6FmcRn/8YSCbEhtTbg2EC5apXdqGagg4vRehRvFU4k5i26h4gUkpSeKRAIselsIZgQZ0qwocO8sQYkngFn+Z/5zU2SuVd/bpiQeFrntaD6BlcZ560KPYRDocMRCaD0WaD0Z2GbF+HmLaeBIdhDuTyUq3oqMtXw3nTFYo+B4L2vN2kH3ID0K3wzoilhpnGpKvwD2bGZLtronkVGC42RFoVDhARhy+ipSzhmQ4a+6/7M218JNtssy5GXTQkWejRzT7d7NtP5G+4tgMFF7j1BpsuUBuCkw==",
    "Expiration": "2024-04-29T05:27:21+00:00"
  },
  "AssumedRoleUser": {
    "AssumedRoleId": "ARO4I4AWSJ5U53H3KY74:s3-access-example",
    "Arn": "arn:aws:sts::841860927337:assumed-role/S3AccessRole/s3-access-example"
  }
}
```

> [!important]
> **Note**
>
> The parameter `--role-session-name` is a descriptive name provided to help identify the session. This output includes the Access Key ID, Secret Access Key, Session Token, and the expiration time for these temporary credentials.

By understanding and using these API operations, you will be well-prepared for AWS certification exams and real-world scenarios that require temporary AWS credentials.

For further information, consider visiting the [AWS STS Documentation](https://docs.aws.amazon.com/STS/latest/APIReference/Welcome.html).

Happy learning and secure your AWS resources with best practices!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/683c50bc-9bd3-4094-b666-354fcc06941f/lesson/e7b94024-2ca9-4069-bf7a-d45157f9bb5a)**
>
> Watch video content
