# IAM Permission Boundaries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Introduction-to-AWS-Identity-and-Access-Management/IAM-Permission-Boundaries)

---

## Table of Contents

- IAM Permission Boundaries
  - What Is a Permission Boundary?
  - Step-by-Step: Create and Attach a Permission Boundary
  - Assigning Interns to Groups
  - Benefits of Using Permission Boundaries
  - References
  - Watch Video

---

## Content

AWS - IAM

Introduction to AWS Identity and Access Management

# IAM Permission Boundaries

In this guide, you’ll learn how to enforce the principle of least privilege for new IAM users—such as interns—by using **permission boundaries**. This lets you assign them to existing groups (e.g., Accounting and Dev) without granting any permissions beyond what you intend.

![The image shows a diagram with two groups, "Accounting Group" and "Dev Group," each containing a red bucket icon linked to a checklist icon. The text at the top reads, "Manager Request: We are hiring interns."](https://kodekloud.com/kk-media/image/upload/v1752863053/notes-assets/images/AWS-IAM-IAM-Permission-Boundaries/manager-request-hiring-interns-diagram.jpg)

Currently, both the Accounting Group and the Dev Group have rights to specific S3 buckets. If you simply add interns to these groups:

- Accounting interns could view or modify confidential financial data.
- Dev interns could access or change log files in S3.

To prevent over-permissioning, apply a **permission boundary** that caps the maximum actions an intern can perform—even if their group policies allow more.

## What Is a Permission Boundary?

A permission boundary is an advanced IAM feature that specifies the upper limit of permissions an identity (user or role) can have. No matter how many permissions you attach via identity-based or group policies, the boundary ensures the principal cannot exceed its scope.

![The image explains the concept of a "Permission Boundary" in IAM, highlighting its role in setting maximum permissions, preventing unintended access, restricting IAM policies, and controlling permission scope for users and roles.](https://kodekloud.com/kk-media/image/upload/v1752863054/notes-assets/images/AWS-IAM-IAM-Permission-Boundaries/permission-boundary-iam-concept-explanation.jpg)

> [!important]
> **Note**
>
> Permission boundaries do **not** grant permissions by themselves. They only restrict the maximum permissions that an IAM principal can utilize.

## Step-by-Step: Create and Attach a Permission Boundary

Follow these steps in the AWS Management Console:

| Step | Console Navigation      | Action                                                                            |
| ---- | ----------------------- | --------------------------------------------------------------------------------- |
| 1    | IAM Dashboard           | Click **Policies** → **Create policy**                                            |
| 2    | **JSON** tab            | Paste the boundary policy definition (see below)                                  |
| 3    | Review policy           | Name it `InternBoundaryPolicy` and create                                         |
| 4    | **Users** → Select User | Under **Permissions** pick **Add permissions boundary** and attach the new policy |

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::example-log-bucket"
      ]
    }
  ]
}
```

![The image is a tutorial slide titled "Create Permission Boundary," showing a stick figure labeled "Demo" and instructions for creating a permission boundary on AWS.](https://kodekloud.com/kk-media/image/upload/v1752863056/notes-assets/images/AWS-IAM-IAM-Permission-Boundaries/create-permission-boundary-tutorial-slide.jpg)

> [!important]
> **Warning**
>
> Even if an intern’s group policy grants broader access, they cannot exceed the actions allowed by their permission boundary.

## Assigning Interns to Groups

Once the boundary is in place:

1.  Attach the `InternBoundaryPolicy` as a permissions boundary to each intern’s IAM user.
2.  Add the intern to the relevant group (Accounting or Dev).
3.  The intern inherits group permissions, but all actions are capped by the boundary.

## Benefits of Using Permission Boundaries

| Benefit                 | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| Enforce Least Privilege | Limits every principal to only the actions you explicitly allow |
| Granular Control        | Applies max-permission caps even when multiple policies overlap |
| Risk Mitigation         | Prevents accidental or malicious privilege escalation           |

## References

- [Permission Boundaries in AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)
- [IAM JSON Policy Elements](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policies-json)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/84a65700-7455-4ad8-aeb5-27dfaf07b8cc/lesson/b39e535a-f5b7-4f71-b27e-ede3d528f0e1)**
>
> Watch video content
