# AWS IAM user groups and roles Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Security-and-Compliance/AWS-IAM-user-groups-and-roles-Demo)

---

## Table of Contents

- AWS IAM user groups and roles Demo
  - Creating an IAM User
  - Testing User Permissions
  - Granting Permissions Using AWS Managed Policies
  - Using Groups for Easier Permission Management
  - Using Roles for Temporary Elevated Permissions
  - Summary
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Security and Compliance

# AWS IAM user groups and roles Demo

In this lesson, we will demonstrate how to manage AWS Identity and Access Management (IAM) by working with users, groups, roles, and custom policies. You will learn how to control access across your AWS account while following best practices for security.

![The image shows the AWS Management Console webpage, featuring options for AWS training, certification, and cloud services, with a "Log back in" button prominently displayed.](https://kodekloud.com/kk-media/image/upload/v1752861691/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_10.jpg)

When you visit [aws.amazon.com/console](https://aws.amazon.com/console), you will see a "Sign in to the console" button at the top right. There are two ways to log in: as the root user or as an IAM user. When you create an AWS account, a root user is automatically created, which uses the email address registered with AWS and has full, unrestricted access to the account.

> [!important]
> **Security Best Practice**
>
> Minimize usage of the root user. Any leaked root credentials would grant complete control of your account. Always use an IAM user for day-to-day tasks.

![The image shows an AWS login page for root users, with fields for email and password, alongside an advertisement for AWS Training and Certification.](https://kodekloud.com/kk-media/image/upload/v1752861692/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_50.jpg)

After successfully entering your credentials (and multi-factor authentication if enabled), you arrive at the AWS console home page as the root user.

![The image shows the AWS Management Console home page, displaying recently visited services, AWS health, cost and usage, and welcome information.](https://kodekloud.com/kk-media/image/upload/v1752861693/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_90.jpg)

Because the root user has complete access, it is recommended to create a separate IAM user for regular operations. This approach helps secure your account in case of any issues or compromised credentials.

## Creating an IAM User

To create an IAM user, navigate to the IAM console. You can find IAM either in the "Recently visited services" area or by using the search bar.

On the IAM dashboard, you can manage:

- Users
- Groups
- Roles
- Policies

![The image shows an AWS IAM dashboard with security recommendations, IAM resources, and account details. It highlights roles, policies, and security alerts for managing access.](https://kodekloud.com/kk-media/image/upload/v1752861695/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_150.jpg)

Select the **Users** section and click **Add users**. Provide a name for the new user (for example, "Sanjeev"). Ensure that you select the option to provide access to the AWS Management Console. Next, choose whether to auto-generate a password or specify one manually. In this example, we specify the password and disable the option for the user to set a new password at the next sign-in, as this account is for personal use.

![The image shows the AWS Management Console's "Specify user details" page for creating a new IAM user named "sanjeev."](https://kodekloud.com/kk-media/image/upload/v1752861696/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_180.jpg)

Proceed to the permissions step. By default, a newly created IAM user has no permissions. You can add the user to a group, copy permissions from an existing user, or attach policies directly. For the purpose of this demonstration, we create a blank account by not assigning any permissions.

![The image shows the AWS IAM Management Console, specifically the "Set permissions" page for creating a user, with options to add users to groups or attach policies.](https://kodekloud.com/kk-media/image/upload/v1752861697/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_240.jpg)

Review your selections on the final page and click **Create user**.

![The image shows the AWS Management Console's "Review and create" page for user creation, displaying user details, permissions summary, and optional tags.](https://kodekloud.com/kk-media/image/upload/v1752861698/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_260.jpg)

Once the user is created, you will see the new user ("Sanjeev Thiyagarajan") in the users list. Initially, this user will have no permissions, as indicated by the absence of multi-factor authentication and group associations.

![The image shows the AWS Identity and Access Management (IAM) console, displaying user management details with one user listed and options for managing workforce access.](https://kodekloud.com/kk-media/image/upload/v1752861699/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_290.jpg)

## Testing User Permissions

Log in as the new IAM user ("Sanjeev Thiyagarajan") to verify access. Since no permissions have been assigned, this user will not be able to create, modify, or delete any AWS resources. For example, an attempt to create an S3 bucket will fail due to the lack of the required "s3:CreateBucket" permission.

![The image shows an AWS S3 bucket creation page with a failed attempt due to missing `s3:CreateBucket` permissions, prompting a permissions check in the IAM console.](https://kodekloud.com/kk-media/image/upload/v1752861700/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_520.jpg)

## Granting Permissions Using AWS Managed Policies

To grant the IAM user the ability to perform actions (e.g., managing S3 buckets), sign back in as the root user. In the IAM console, select the user ("Sanjeev Thiyagarajan"), go to the permissions tab, and click **Add permissions**. You have three options:

- Add the user to a group
- Copy permissions from an existing user
- Attach policies directly

For this demonstration, we attach the AWS managed policy called **Administrator Access** to grant full permissions. The policy content is as follows:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```

After adding the policy, verify that the user's permissions are updated by checking the IAM console.

![The image shows an AWS Identity and Access Management (IAM) console, displaying user permissions settings with options to add permissions or create an inline policy.](https://kodekloud.com/kk-media/image/upload/v1752861702/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_590.jpg)

Switch back to the IAM user session and confirm that S3 buckets and other resources are now visible and manageable. For example, you should be able to create an S3 bucket successfully.

![The image shows an Amazon S3 management console with a list of buckets, their regions, access status, and creation dates. A new bucket was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752861703/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_790.jpg)

## Using Groups for Easier Permission Management

When onboarding multiple employees with similar roles, it's more efficient to assign permissions through groups rather than individually attaching policies. For example, if several users require full administrator access, you would:

1.  Create each IAM user (with console access but without direct permissions).
2.  Create an **admin** group.
3.  Attach the **Administrator Access** policy to the group.
4.  Add the users to the group so they automatically inherit the permissions.

Later, if you need to assign read-only permissions (for monitoring purposes), you can create another group (e.g., **monitoring**) and attach AWS's managed **ReadOnlyAccess** policy. A user can belong to multiple groups; for instance, "Sanjeev Thiyagarajan" can initially be in the admin group and later be moved to the monitoring group.

![The image shows the AWS Identity and Access Management (IAM) console, displaying user groups and permission policies, with "AdministratorAccess" selected for a user group.](https://kodekloud.com/kk-media/image/upload/v1752861704/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_820.jpg)

After configuring groups, verify that a user inherits the expected permissions by checking the permissions tab. Users in a monitoring group will be able to list S3 buckets, while attempts to delete a bucket will be denied due to missing "s3:DeleteBucket" permissions.

![The image shows an AWS IAM user details page, highlighting user permissions, console access status, and attached policies, with MFA not enabled.](https://kodekloud.com/kk-media/image/upload/v1752861705/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_980.jpg)

If you attempt to delete a bucket while the user is in a read-only group, an error will display due to insufficient "s3:DeleteBucket" permissions.

![The image shows an AWS S3 console screen for deleting a bucket named "sanjeevkodekloudbucket," with a warning about insufficient permissions to delete it.](https://kodekloud.com/kk-media/image/upload/v1752861707/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_1200.jpg)

## Using Roles for Temporary Elevated Permissions

Roles allow users or AWS services to assume temporarily elevated permissions to perform tasks outside their standard privileges. For example, a user in a monitoring group might occasionally need permission to modify S3 buckets. In such cases, you can create a role that grants S3 full access temporarily.

To create a role:

1.  In the IAM console, select **Roles** and click **Create Role**.
2.  Choose **AWS account** as the trusted entity since the role will be assumed by users in your account.
3.  Attach the appropriate permission policy, such as **S3 Full Access**.

![The image shows the AWS Identity and Access Management (IAM) console, displaying a list of roles with their trusted entities and last activity details.](https://kodekloud.com/kk-media/image/upload/v1752861709/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_1280.jpg)

AWS provides a managed policy for S3 Full Access, which essentially allows all S3 actions on all resources. After attaching the policy, name the role (for example, "S3FullAccess") and create it.

Next, restrict role assumption so that only the intended user (e.g., "Sanjeev Thiyagarajan") can assume this role. To do this, add an inline policy to the IAM user allowing the STS AssumeRole action on the new role. An example inline policy is shown below:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::841860927373:role/S3FullAccess"
        }
    ]
}
```

![The image shows an AWS IAM user details page, highlighting user "sanjeev" with console access enabled without MFA and a "ReadOnlyAccess" policy attached.](https://kodekloud.com/kk-media/image/upload/v1752861710/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_1440.jpg)

To create this inline policy:

1.  Go to the **Users** section, select the user, and click **Add permissions**.
2.  Choose **Create inline policy**.
3.  Using the visual editor or JSON tab, select **STS** as the service and the **AssumeRole** action.
4.  Specify the role’s ARN in the resources section.
5.  Review, name the policy (e.g., "AssumeS3Access"), and complete the creation process.

![The image shows the AWS Management Console's "Create policy" page, where users can define permissions using a visual editor or JSON.](https://kodekloud.com/kk-media/image/upload/v1752861711/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_1460.jpg)

After attaching the inline policy, the user "Sanjeev Thiyagarajan" can assume the S3FullAccess role. There is a link in the role's details for switching roles via the console. Once the role is assumed, a badge (for example, displaying "S3 role") indicates the active role.

![The image shows an AWS IAM console with details of the "S3FullAccess" role, including permissions and settings.](https://kodekloud.com/kk-media/image/upload/v1752861712/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_1580.jpg)

After assuming the role, the user can perform S3 operations such as deleting a bucket. For instance, try deleting the "Sanjeev Thiyagarajan KodeKloud bucket" to confirm that S3 full access is in effect.

![The image shows an Amazon S3 management console with a list of buckets, their regions, access status, and creation dates. A new bucket was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752861713/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-IAM-user-groups-and-roles-Demo/frame_750.jpg)

To switch back to the original IAM user's permissions, simply select the "Switch back" option within the console.

## Summary

In this lesson, we covered how to:

- Log in as both the root user and an IAM user.
- Create an IAM user with console access.
- Test and verify user permissions (observing failures when permissions are missing).
- Grant permissions directly using AWS managed policies.
- Use groups to efficiently manage permissions for multiple users.
- Create and configure roles for temporary privilege escalation.
- Restrict role assumption to specific users via an inline policy.

This demonstration illustrates best practices in managing and securing your AWS account—minimizing root user exposure, enforcing the principle of least privilege for day-to-day operations, and leveraging roles for temporary access as needed.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/4528372a-a177-43ff-b4b6-236c0eee4029/lesson/855192fb-4ecd-4abf-b72f-683685d647f9)**
>
> Watch video content
