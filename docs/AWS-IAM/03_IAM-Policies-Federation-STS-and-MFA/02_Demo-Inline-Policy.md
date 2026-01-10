# Demo Inline Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/IAM-Policies-Federation-STS-and-MFA/Demo-Inline-Policy)

---

## Table of Contents

- Demo Inline Policy
  - Policy Structure
  - Steps to Create the Inline Policy
  - Verification
  - Links and References
  - Watch Video
    - Statement Breakdown

---

## Content

AWS - IAM

IAM Policies Federation STS and MFA

# Demo Inline Policy

In this walkthrough, we’ll attach an inline IAM policy to our DevOps engineer, **Alice**, allowing her to upload objects to the `my-deployment-bucket` S3 bucket only until **December 31, 2023**. Inline policies are embedded directly on a single IAM identity—ideal for granting one-off or time-limited permissions.

> [!important]
> **Note**
>
> Inline policies are specific to the IAM user, group, or role they’re attached to and cannot be reused by other identities. For reusable permissions, consider using [managed policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html).

## Policy Structure

Below is an overview of the key elements in our inline policy:

| Field     | Description                                                        | Example                               |
| --------- | ------------------------------------------------------------------ | ------------------------------------- |
| Version   | Specifies the policy language version.                             | `2012-10-17`                          |
| Statement | Container for one or more individual permission statements.        | See breakdown below                   |
| Effect    | Whether the statement allows or denies access.                     | `Allow`                               |
| Action    | The specific API call(s) permitted.                                | `s3:PutObject`                        |
| Resource  | The ARN of the S3 bucket (and objects) to which it applies.        | `arn:aws:s3:::my-deployment-bucket/*` |
| Condition | Optional restrictions (e.g., time, IP) on when the action applies. | `DateLessThan` with `aws:CurrentTime` |

### Statement Breakdown

- **Effect**: `Allow`
- **Action**: `s3:PutObject`
- **Resource**: All objects in **my-deployment-bucket**
- **Condition**: Only if the request timestamp is before **2023-12-31T23:59:59Z**

## Steps to Create the Inline Policy

1.  Open the **IAM console** and select the user **Alice**.
2.  Go to the **Permissions** tab, then click **Add permissions** → **Create inline policy**.
3.  Switch to the **JSON** editor and paste the following policy:

    ```
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": "s3:PutObject",
          "Resource": "arn:aws:s3:::my-deployment-bucket/*",
          "Condition": {
            "DateLessThan": {
              "aws:CurrentTime": "2023-12-31T23:59:59Z"
            }
          }
        }
      ]
    }
    ```

4.  Provide a name for the policy (e.g., **Alice-S3-Access-Inline-Policy**) and click **Create policy**.
5.  Back under Alice’s **Permissions** tab, verify the new inline policy appears in the list.

> [!important]
> **Warning**
>
> After December 31, 2023 at 23:59:59 UTC, Alice’s upload requests will be denied. Monitor or update the policy before it expires if continued access is needed.

## Verification

1.  Use the AWS CLI or console to attempt an S3 upload as Alice:

    ```
    aws s3 cp ./local-file.txt s3://my-deployment-bucket/ --profile alice
    ```

2.  Before the expiration date, the upload should succeed. Afterward, you’ll receive an `AccessDenied` error.

## Links and References

- [AWS IAM Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html)
- [Amazon S3 PutObject API](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/8ffebc04-c194-403a-ac2e-2a2f0a6221ce/lesson/1429ad07-aea1-4e6c-86fc-4c840903da7c)**
>
> Watch video content
