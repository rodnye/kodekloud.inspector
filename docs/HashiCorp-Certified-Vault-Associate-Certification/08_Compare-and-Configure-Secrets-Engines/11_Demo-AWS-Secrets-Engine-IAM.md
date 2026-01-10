# Demo AWS Secrets Engine IAM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-and-Configure-Secrets-Engines/Demo-AWS-Secrets-Engine-IAM)

---

## Table of Contents

- Demo AWS Secrets Engine IAM
  - 1. Enable the AWS Secrets Engine
  - 2. Prepare Vault’s AWS Permissions
  - 3. Configure Vault’s Root AWS Credentials
  - 4. Rotate Vault’s Root Credentials
  - 5. Define a Vault Role for Dynamic IAM Users
  - 6. Generate Dynamic IAM Credentials
  - 7. Revoke a Single Lease
  - 8. Revoke All Leases for a Role
  - Vault AWS Secrets Engine Endpoints
  - Links and References
  - Watch Video
    - 2.1 Core AWS Permissions
    - 2.2 IAM Management Permissions
    - 2.3 Demo: Create an IAM User

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare and Configure Secrets Engines

# Demo AWS Secrets Engine IAM

In this tutorial, you’ll learn how to leverage HashiCorp Vault’s AWS Secrets Engine to manage IAM user credentials dynamically. We cover enabling the secrets engine, configuring and rotating Vault’s root AWS credentials, defining roles for on-demand IAM users, and revoking credentials both individually and in bulk.

## 1\. Enable the AWS Secrets Engine

First, enable the AWS engine at the `aws/` path:

```
vault secrets enable aws
```

Verify that it’s active:

```
vault secrets list
```

Expected output:

```
Path       Type       Accessor
----       ----       --------
aws/       aws        aws_698889cf
cubbyhole/ cubbyhole  bacba503
identity/  identity   identity441f683a
sys/       system     system_a7a15816
```

## 2\. Prepare Vault’s AWS Permissions

Vault requires AWS credentials capable of managing IAM users, policies, and optional EC2/KMS operations.

> **Least Privilege**  
> In production, attach an IAM role to the Vault server using instance profiles. Only use an IAM user for demos or CI pipelines.

### 2.1 Core AWS Permissions

Grant Vault rights to describe EC2 instances and decrypt KMS keys if needed:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "kms:Decrypt",
        "kms:DescribeKey"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:DescribeParameters"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2.2 IAM Management Permissions

To let Vault create, attach policies, and delete IAM users/key pairs dynamically:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:CreateUser",
        "iam:DeleteUser",
        "iam:CreateAccessKey",
        "iam:DeleteAccessKey",
        "iam:AttachUserPolicy",
        "iam:DetachUserPolicy",
        "iam:ListAttachedUserPolicies",
        "iam:PutUserPolicy",
        "iam:AddUserToGroup",
        "iam:RemoveUserFromGroup"
      ],
      "Resource": ["arn:aws:iam::ACCOUNT-ID:user/vault-*"]
    }
  ]
}
```

### 2.3 Demo: Create an IAM User

For this demonstration, create a Vault-specific IAM user with broad privileges:

1.  In AWS Console, navigate to **IAM → Users → Add user**.
2.  Enable **Programmatic access** and click **Next**.
3.  Under **Set permissions**, choose **Attach existing policies directly** and select **AdministratorAccess**.

![The image shows an AWS Management Console screen for adding a user, specifically the "Set permissions" step. It includes options to add the user to a group, copy permissions from an existing user, or attach existing policies directly.](https://kodekloud.com/kk-media/image/upload/v1752878060/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-AWS-Secrets-Engine-IAM/aws-management-console-add-user-permissions.jpg)

4.  Complete the wizard and download the access key ID and secret access key.

![The image shows an AWS IAM Management Console screen where a user has been successfully added, displaying their access key ID and an option to download credentials.](https://kodekloud.com/kk-media/image/upload/v1752878062/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-AWS-Secrets-Engine-IAM/aws-iam-management-console-user-added.jpg)

## 3\. Configure Vault’s Root AWS Credentials

Point Vault at your new IAM user:

```
vault write aws/config/root \
  access_key=AKIA…YOURACCESSKEY… \
  secret_key=YOUR_SECRET_KEY \
  region=us-east-1
```

Verify (the secret key is masked):

```
vault read aws/config/root
```

Expected output:

```
Key           Value
---           -----
access_key    AKIA…YOURACCESSKEY…
region        us-east-1
max_retries   -1
```

## 4\. Rotate Vault’s Root Credentials

Avoid long-lived credentials by rotating automatically:

```
vault write -force aws/config/rotate-root
vault read aws/config/root
```

You’ll observe a new `access_key`—Vault created a fresh key pair in AWS and removed the old one.

![The image shows an AWS Identity and Access Management (IAM) console with a list of users and their details, such as access key age and last activity. The console is displayed on a computer screen with a terminal window in the background.](https://kodekloud.com/kk-media/image/upload/v1752878063/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-AWS-Secrets-Engine-IAM/aws-iam-console-users-details-screen.jpg)

## 5\. Define a Vault Role for Dynamic IAM Users

Each Vault role maps to one or more AWS IAM policies. Let’s create `vaultadvanced` using AWS’s **ReadOnlyAccess** managed policy:

```
vault write aws/roles/vaultadvanced \
  credential_type=iam_user \
  policy_arns=arn:aws:iam::aws:policy/ReadOnlyAccess
```

Verify:

```
vault read aws/roles/vaultadvanced
```

Expected output:

```
Key               Value
---               -----
credential_type   iam_user
policy_arns       [arn:aws:iam::aws:policy/ReadOnlyAccess]
default_sts_ttl   0s
max_sts_ttl       0s
```

![The image shows an AWS Identity and Access Management (IAM) console with a list of read-only policies. The left sidebar displays various IAM management options, and the main section lists policies with their names, types, and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752878064/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-AWS-Secrets-Engine-IAM/aws-iam-console-read-only-policies.jpg)

## 6\. Generate Dynamic IAM Credentials

Request a short-lived IAM user and keys:

```
vault read aws/creds/vaultadvanced
```

Sample response:

```
Key             Value
---             -----
lease_id        aws/creds/vaultadvanced/DwkGgdaohbFga6Y1Kk4NF9B
lease_duration  768h
lease_renewable true
access_key      AKIA…NEWACCESSKEY…
secret_key      NEW_SECRET_KEY…
```

In the AWS Console under **IAM → Users**, you’ll find a user named like `vaultadvanced-…` with **ReadOnlyAccess** attached.

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying user details and permissions, with a "ReadOnlyAccess" policy applied.](https://kodekloud.com/kk-media/image/upload/v1752878065/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-AWS-Secrets-Engine-IAM/aws-iam-console-user-permissions-readonly.jpg)

## 7\. Revoke a Single Lease

To delete one credential before it expires:

```
vault lease revoke aws/creds/vaultadvanced/DwkGgdaohbFga6Y1Kk4NF9B
```

Vault removes that IAM user and its keys in AWS.

## 8\. Revoke All Leases for a Role

After issuing multiple credentials:

```
vault read aws/creds/vaultadvanced
vault read aws/creds/vaultadvanced
vault read aws/creds/vaultadvanced
```

You’ll see several IAM users:

![The image shows an AWS Identity and Access Management (IAM) console with a list of users, their access key age, password age, last activity, and MFA status. A red box highlights several users with similar names.](https://kodekloud.com/kk-media/image/upload/v1752878066/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Demo-AWS-Secrets-Engine-IAM/aws-iam-console-users-access-mfa.jpg)

Revoke all leases created by `vaultadvanced`:

```
vault lease revoke -prefix aws/creds/vaultadvanced
```

Or revoke **all** AWS credentials managed by Vault:

```
vault lease revoke -prefix aws/
```

---

## Vault AWS Secrets Engine Endpoints

| Endpoint                         | Use Case                         | Example                                              |
| -------------------------------- | -------------------------------- | ---------------------------------------------------- |
| aws/config/root                  | Configure root AWS credentials   | `vault write aws/config/root …`                      |
| aws/config/rotate-root           | Rotate root AWS credentials      | `vault write -force aws/config/rotate-root`          |
| aws/roles/<role>                 | Define dynamic IAM roles         | `vault write aws/roles/vaultadvanced …`              |
| aws/creds/<role>                 | Generate dynamic IAM credentials | `vault read aws/creds/vaultadvanced`                 |
| aws/creds/<role> (prefix revoke) | Bulk revoke IAM credentials      | `vault lease revoke -prefix aws/creds/vaultadvanced` |

## Links and References

- [Vault AWS Secrets Engine Documentation](https://www.vaultproject.io/docs/secrets/aws)
- [AWS IAM User Guide](https://docs.aws.amazon.com/iam/latest/UserGuide/)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/cb962cde-84d3-4b26-8875-e8f093d77244/lesson/1b235872-0d8a-44f8-87ab-838b2f5b6dec)**
>
> Watch video content
