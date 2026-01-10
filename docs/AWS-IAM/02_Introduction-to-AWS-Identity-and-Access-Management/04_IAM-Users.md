# IAM Users - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/IAM-Users)

---

## Table of Contents

- IAM Users
  - Why IAM User Permissions Matter
  - AWS Services and CLI Examples
  - Methods to Attach IAM Policies
  - Creating an IAM User
  - Next Steps
  - Links and References
  - Watch Video
    - 1. Using the AWS Management Console
    - 2. Using the AWS CLI

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# IAM Users

In this lesson, you’ll learn how to set up IAM users and grant them access to AWS services. An IAM user can interact with AWS through the Management Console, AWS CLI, or SDKs, based on the permissions you attach.

## Why IAM User Permissions Matter

> [!important]
> **Note**
>
> By default, a newly created IAM user has **no permissions**. You must attach policies to grant access.

## AWS Services and CLI Examples

| Service                      | Description                         | CLI Example                       |
| ---------------------------- | ----------------------------------- | --------------------------------- |
| Amazon EC2                   | Virtual machines in the cloud       | `aws ec2 describe-instances`      |
| Amazon RDS                   | Managed relational databases        | `aws rds describe-db-instances`   |
| Amazon EKS                   | Kubernetes clusters                 | `aws eks list-clusters`           |
| AWS Lambda                   | Serverless compute for code         | `aws lambda list-functions`       |
| Amazon DynamoDB              | Fast NoSQL database                 | `aws dynamodb list-tables`        |
| Amazon S3                    | Object storage for files            | `aws s3 ls s3://your-bucket`      |
| Elastic Load Balancing (ELB) | Distribute incoming traffic         | `aws elb describe-load-balancers` |
| Amazon Route 53              | Scalable DNS service                | `aws route53 list-hosted-zones`   |
| Amazon VPC                   | Isolated virtual networks           | `aws ec2 describe-vpcs`           |
| Amazon SNS                   | Pub/Sub messaging and notifications | `aws sns list-topics`             |

## Methods to Attach IAM Policies

You can grant AWS permissions by attaching policies to:

- **IAM Users**: Directly attach policies to the user.
- **IAM Groups**: Assign users to groups; they inherit group policies.
- **IAM Roles**: Allow users or services to assume roles with temporary credentials.

## Creating an IAM User

### 1\. Using the AWS Management Console

1.  Sign in to the [AWS Management Console](https://console.aws.amazon.com/iam/).
2.  Navigate to **IAM** > **Users** > **Add users**.
3.  Enter a **User name** and select the access type:
    - **Programmatic access** (for AWS CLI/SDK).
    - **AWS Management Console access** (for web console).
4.  Click **Next: Permissions** and choose how to assign permissions:
    - **Add user to group**
    - **Attach existing policies directly**
    - **Copy permissions from existing user**
5.  Review and create the user. Download or copy the Access Key ID and Secret Access Key.

### 2\. Using the AWS CLI

Create an IAM user:

```
aws iam create-user --user-name alice
```

Generate access keys for programmatic access:

```
aws iam create-access-key --user-name alice
```

Attach a policy (e.g., AmazonS3ReadOnlyAccess):

```
aws iam attach-user-policy \
  --user-name alice \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
```

> [!important]
> **Warning**
>
> Store your Access Key ID and Secret Access Key securely. Treat them like password credentials.

## Next Steps

After creating IAM users and attaching policies, consider:

- Enforcing Multi-Factor Authentication (MFA) for console users.
- Rotating access keys regularly.
- Applying the principle of least privilege.

## Links and References

- [IAM Users Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html)
- [AWS CLI IAM Commands](https://docs.aws.amazon.com/cli/latest/reference/iam/)
- [Best Practices for IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/0b6fea37-8542-48bf-a00c-623913b0d94f)**
>
> Watch video content
