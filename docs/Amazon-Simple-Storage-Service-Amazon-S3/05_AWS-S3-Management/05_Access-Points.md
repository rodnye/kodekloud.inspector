# Access Points - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Simple-Storage-Service-Amazon-S3/AWS-S3-Management/Access-Points)

---

## Table of Contents

- Access Points
  - The Challenge of Complex Bucket Policies
  - Introducing Access Points
  - Restricting Access by VPC
  - Simplifying Policy Management
  - Links and References
  - Watch Video

---

## Content

Amazon Simple Storage Service (Amazon S3)

AWS S3 Management

# Access Points

Access Points streamline and secure Amazon S3 bucket access for multiple teams, applications, and workloads. Instead of a single, complex bucket policy, you can create dedicated Access Points—each with its own ARN and resource policy—to manage permissions at scale.

> [!important]
> **Note**
>
> Access Points work with existing S3 features, including bucket ACLs, public access settings, and server-side encryption.

## The Challenge of Complex Bucket Policies

When you have diverse stakeholders sharing one bucket, the policy can balloon:

| Team           | Required Permissions              | Use Case                                |
| -------------- | --------------------------------- | --------------------------------------- |
| Developers     | `s3:PutObject`, `s3:DeleteObject` | Upload and manage application assets    |
| Infrastructure | `s3:*`                            | Full lifecycle, encryption, and logging |
| Legal          | `s3:GetObject`, `s3:ListBucket`   | Compliance audits and data retrieval    |

Every change to a team’s access means editing the monolithic bucket policy, which increases the risk of errors and makes audits difficult.

## Introducing Access Points

With S3 Access Points, you assign each team or application its own “window” to the bucket. Each Access Point:

- Has a unique ARN (`arn:aws:s3:<region>:<account-id>:accesspoint/<name>`)
- Behaves like an independent bucket
- Carries a tailored resource policy

![The image illustrates access points for different roles (Developers, Admin, Infra, Legal) connecting to a central bucket, likely representing a data storage or resource access system.](https://kodekloud.com/kk-media/image/upload/v1752869365/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Access-Points/access-points-roles-data-storage.jpg)

Clients reference the Access Point ARN instead of the bucket ARN, and permissions live closer to the consumer. For example, developers use the `developer-ap` Access Point ARN with write/delete privileges, while the legal team uses `legal-ap` with read-only permissions.

## Restricting Access by VPC

You can tie an Access Point to a specific VPC Endpoint to enforce network-level boundaries. Bind the Access Point so only resources in your VPC can connect:

![The image illustrates a concept of access point restriction for Virtual Private Clouds (VPCs), showing one VPC with access to a resource (indicated by a check mark) and another without access (indicated by a cross mark).](https://kodekloud.com/kk-media/image/upload/v1752869366/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Access-Points/vpc-access-point-restriction-diagram.jpg)

For instance:

- **VPC A**: EC2 instances can access via `ap-vpc-a`.
- **All other VPCs**: Traffic is blocked by the endpoint policy.

> [!important]
> **Warning**
>
> Ensure your VPC Endpoint policy explicitly grants `s3:*` actions for the Access Point ARN; otherwise, requests will be denied.

## Simplifying Policy Management

Instead of embedding every role’s permissions in the bucket policy, you delegate authority to Access Points with a single bucket policy statement:

![The image illustrates an "Access Point Policy" with diagrams showing the process of copying policies to a bucket policy and delegating policies to an access point.](https://kodekloud.com/kk-media/image/upload/v1752869367/notes-assets/images/Amazon-Simple-Storage-Service-Amazon-S3-Access-Points/access-point-policy-diagram-bucket-delegation.jpg)

1.  **Delegate in the bucket policy** to allow S3 actions for any Access Point.
2.  **Define fine-grained permissions** within each Access Point resource policy.

Example: Delegate List and Get operations for all Access Points in the bucket policy:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DelegateAccessPointActions",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "StringLike": {
          "aws:PrincipalArn": "arn:aws:s3:us-west-2:123456789012:accesspoint/*"
        }
      }
    }
  ]
}
```

Then, move user- or group-specific permissions into each Access Point policy. Example for a developer Access Point:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/Developer"
      },
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:us-west-2:123456789012:accesspoint/developer-ap/object/*"
    }
  ]
}
```

With this approach, you only update the bucket policy once. All subsequent permission changes happen at the Access Point level, making management and compliance audits far simpler.

## Links and References

- [Amazon S3 Access Points Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html)
- [VPC Endpoints for Amazon S3](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html)
- [Managing S3 Bucket Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/manage-access-control.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3/module/985e08bc-a007-4d29-9e60-fe90b52410ae/lesson/2d9a3401-efd2-45b1-8957-bc024a82497a)**
>
> Watch video content
