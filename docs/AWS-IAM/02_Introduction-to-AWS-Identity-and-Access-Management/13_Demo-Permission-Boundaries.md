# Demo Permission Boundaries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/Demo-Permission-Boundaries)

---

## Table of Contents

- Demo Permission Boundaries
  - 1. Identify the Target S3 Bucket
  - 2. Review Customer-Managed Policies
  - 3. Inspect the Full-Access Logs Policy
  - 4. Scenario: Hiring a New Intern
  - 5. Apply the Permissions Boundary
  - References
  - Watch Video

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# Demo Permission Boundaries

In this tutorial, we’ll demonstrate how to enforce the principle of least privilege in AWS IAM by using permission boundaries. You’ll learn how to restrict a new user’s effective permissions so that they can only list S3 buckets without gaining full access.

## 1\. Identify the Target S3 Bucket

First, open the Amazon S3 Management Console. Filter your buckets by the prefix “Company1” and locate **company1-logs**, which stores daily logs used by your development team.

![The image shows an AWS S3 Management Console with a list of buckets named "company1-hr," "company1-logs," and "company1-sales," all located in the US West (Oregon) region and marked as not public.](https://kodekloud.com/kk-media/image/upload/v1752863041/notes-assets/images/AWS-IAM-Demo-Permission-Boundaries/aws-s3-management-console-buckets.jpg)

## 2\. Review Customer-Managed Policies

Next, navigate to the IAM console and filter customer-managed policies by “company1.” You should see:

![The image shows the AWS Identity and Access Management (IAM) console, displaying a list of customer-managed policies filtered by "company1," including "Company1-Logs-Policy" and "Company1_List_S3_Buckets."](https://kodekloud.com/kk-media/image/upload/v1752863042/notes-assets/images/AWS-IAM-Demo-Permission-Boundaries/aws-iam-console-company1-policies.jpg)

| Policy Name                       | Purpose                             | Key Actions                                                        |
| --------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| Company1-Logs-Policy              | Full S3 access to `company1-logs`   | `s3:ListBucket`, `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` |
| Company1\\\_List\\\_S3\\\_Buckets | Read-only listing of all S3 buckets | `s3:ListAllMyBuckets`, `s3:GetBucketLocation`                      |

## 3\. Inspect the Full-Access Logs Policy

Click on **Company1-Logs-Policy** to view its JSON document. This policy grants any principal full control over the `company1-logs` bucket.

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying a customer-managed policy with full access permissions for the S3 service.](https://kodekloud.com/kk-media/image/upload/v1752863044/notes-assets/images/AWS-IAM-Demo-Permission-Boundaries/aws-iam-console-s3-full-access-policy.jpg)

Currently, this policy is attached to the **Developers** group. All members—like John—inherit full S3 permissions on `company1-logs`.

---

## 4\. Scenario: Hiring a New Intern

We’ve hired an intern, Sara, but we want to limit her permissions to bucket listing only. Without adjustments, adding her to the Developers group would grant full S3 access.

1.  In the IAM console, click **Create User**.
2.  Enter **Sara-intern** as the username.
3.  Enable **AWS Management Console access**, generate a password, and require a reset on first login.
4.  Add **Sara-intern** to the **Developers** group and complete the user creation.

![The image shows the AWS Management Console interface for creating a new IAM user, with a username "Sara-intern" being specified.](https://kodekloud.com/kk-media/image/upload/v1752863046/notes-assets/images/AWS-IAM-Demo-Permission-Boundaries/aws-management-console-iam-user-sara.jpg)

> [!important]
> **Note**
>
> By default, Sara inherits every permission granted to the Developers group. We need a permissions boundary to cap her maximum privileges.

---

## 5\. Apply the Permissions Boundary

To restrict Sara’s permissions:

1.  Open **Sara-intern**’s user summary and go to the **Permissions** tab.
2.  Click **Set permissions boundary**.
3.  Select **Company1_List_S3_Buckets** and save.

![The image shows an AWS IAM Management Console screen where a user is setting a permissions boundary for "Sara-intern." Two customer-managed policies are listed: "Company1_List_S3_Buckets" and "Company1-Logs-Policy."](https://kodekloud.com/kk-media/image/upload/v1752863047/notes-assets/images/AWS-IAM-Demo-Permission-Boundaries/aws-iam-console-permissions-sara-intern.jpg)

> [!important]
> **Warning**
>
> A permissions boundary only defines the maximum rights a user can have. The user’s effective permissions are the intersection of their group policies and the boundary. Always validate by testing in a non-production account.

With **Company1_List_S3_Buckets** as Sara’s boundary, she can list bucket names (`s3:ListAllMyBuckets`) but cannot read, write, or delete any objects. This enforces least privilege for new users.

---

## References

- [AWS IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)
- [Using Permissions Boundaries for IAM Identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/1f3d6def-a65d-4768-be1a-106d6a69692e)**
>
> Watch video content
