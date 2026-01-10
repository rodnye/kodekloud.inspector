# IAM Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/IAM-Demo)

---

## Table of Contents

- IAM Demo
  - Accessing IAM and Creating a User
  - Testing the New User's Permissions
  - Granting Permissions via Policies
  - Using Groups to Manage Permissions
  - Creating and Assuming a Role
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# IAM Demo

In this lesson, we demonstrate how to manage AWS Identity and Access Management (IAM) by creating users, groups, and roles, as well as by customizing permissions and policies. Using IAM, you can control which users have access to specific AWS services, ensuring secure and organized access management.

When you visit the [AWS Management Console](https://aws.amazon.com/console) and click the "Sign in to the console" button at the top right, you'll be prompted to log in.

![The image shows the AWS Management Console webpage, featuring options for logging in and various AWS training and certification resources.](https://kodekloud.com/kk-media/image/upload/v1752865818/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-management-console-training-resources.jpg)

There are two ways to log in: as the root user or as an IAM user. When you create an account, a root user is automatically created with the email address you registered. On the root user sign-in page, enter your email address and password.

![The image shows an AWS sign-in page for root users, with fields for email and password, and an advertisement for AWS Training and Certification on the right.](https://kodekloud.com/kk-media/image/upload/v1752865819/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-sign-in-root-users-page.jpg)

If multi-factor authentication (MFA) is enabled, enter the MFA code when prompted. Once logged in as the root user, note that you have full access to all services. Because root credentials have complete privileges, it is best practice to use them sparingly. Instead, create a separate IAM user with specific permissions for everyday tasks.

> [!important]
> **Best Practice**
>
> For enhanced security, avoid daily use of root credentials. Create and use limited-permission IAM users instead.

## Accessing IAM and Creating a User

To create a new IAM user:

1.  Navigate to IAM from the AWS Management Console (use the search bar or the recent services section).
2.  In the IAM dashboard, manage your groups, users, roles, and policies.

![The image shows the AWS Management Console home page, displaying recently visited services, AWS health status, cost and usage information, and a welcome section with resources.](https://kodekloud.com/kk-media/image/upload/v1752865820/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-management-console-home-page.jpg)

![The image shows an AWS IAM dashboard with security recommendations and IAM resources statistics, including user groups, users, roles, policies, and identity providers. It also displays account details and quick links for managing security credentials.](https://kodekloud.com/kk-media/image/upload/v1752865821/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-dashboard-security-recommendations.jpg)

To create a user:

- Click the **Users** section.
- Since there are no users yet, click **Add users**.
- Enter a user name (for example, "Sanjeev Thiyagarajan") and check the option to **Provide user access to the AWS Management Console**.

![The image shows the AWS Management Console, specifically the "Specify user details" page for creating a new IAM user. The username "sanjeev" is entered in the user details section.](https://kodekloud.com/kk-media/image/upload/v1752865822/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-management-console-iam-user-sanjeev.jpg)

Decide whether AWS should auto-generate a password or if you want to specify one. You can also choose if the user must change the password upon the first sign-in. In this demonstration, uncheck the "Users must create a new password at next sign-in" option as you are creating the account for yourself.

On the **Set permissions** page, you have several options:

- Add the user to a group to inherit permissions.
- Copy permissions from another user.
- Attach policies directly to the user.

For now, create the user without any permissions.

![The image shows the "Set permissions" page in the AWS Management Console for creating a user, with options to add the user to a group, copy permissions, or attach policies directly. There is also an option to set a permissions boundary.](https://kodekloud.com/kk-media/image/upload/v1752865823/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-set-permissions-user-page.jpg)

Review your selections and click **Create user**. After creation, click **Continue** to return to the users list, where the newly created user "Sanjeev Thiyagarajan" is listed without any group associations and with MFA disabled.

![The image shows the "Review and create" page in the AWS Management Console for creating a new IAM user. It displays user details, permissions summary, and an option to add tags.](https://kodekloud.com/kk-media/image/upload/v1752865825/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-user-review-create-page.jpg)

## Testing the New User's Permissions

Now, log in as the "Sanjeev Thiyagarajan" IAM user. Since this IAM user currently has no permissions, it will not be able to perform any actions. Open a new browser tab, incognito window, or use a session management extension for this purpose.

On the sign-in page, select **Sign in as IAM user** and enter:

- The AWS Account ID (available from the root user’s account dropdown),
- The IAM user name, and
- The password you specified.

![The image shows the AWS sign-in page with options for "Root user" and "IAM user" login, alongside an advertisement for Amazon Aurora I/O-Optimized.](https://kodekloud.com/kk-media/image/upload/v1752865827/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-sign-in-page-root-iam.jpg)

Once logged in as Sanjeev, you'll notice that the user does not have permissions to create, modify, or delete resources. For example, if you try to create an Amazon S3 bucket:

1.  Click on S3 from the console search.
2.  Choose to create a bucket (name it and select a region as needed).
3.  Attempting to create the bucket will fail with an error stating that the "S3 Create Bucket" permission is required.

![The image shows the AWS Identity and Access Management (IAM) console, displaying a user management interface with a notification about a user being created successfully. It lists one user with details such as username, groups, last activity, and MFA status.](https://kodekloud.com/kk-media/image/upload/v1752865828/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-console-user-management.jpg)

This confirms that new IAM users have no permissions by default.

## Granting Permissions via Policies

Since the Sanjeev user cannot modify any resources, log back in as the root user to grant permissions. Follow these steps:

1.  Navigate to the IAM **Users** page.
2.  Select the "Sanjeev Thiyagarajan" user.
3.  Go to the **Permissions** tab and click **Add permissions**.

![The image shows the AWS Identity and Access Management (IAM) console, displaying a user management interface with a notification about a user being created successfully. A user named "sanjeev" is listed with details such as groups, last activity, and MFA status.](https://kodekloud.com/kk-media/image/upload/v1752865829/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-console-user-management-2.jpg)

When adding permissions, you have multiple options:

- Create an inline policy.
- Copy permissions from another user.
- Add the user to a group.
- Attach AWS managed policies directly.

For demonstration purposes, attach the AWS managed policy **AdministratorAccess** to grant full administrative permissions. You can view the policy contents by clicking its plus icon. The policy is defined as follows:

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

This policy allows any action ("_") on any resource ("_"). Click **Next** and then **Add permissions**. Now, when you check the Sanjeev user details, the **AdministratorAccess** policy is applied.

![The image shows an AWS Identity and Access Management (IAM) console screen for a user named "sanjeev," displaying user details, permissions, and a warning about console access being enabled without MFA.](https://kodekloud.com/kk-media/image/upload/v1752865831/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-console-sanjeev-user-details.jpg)

Switch back to your Sanjeev session. You should now see a list of existing S3 buckets and be able to create a new bucket successfully.

![The image shows an Amazon S3 management console with a list of three S3 buckets, their regions, access status, and creation dates. The buckets are not publicly accessible.](https://kodekloud.com/kk-media/image/upload/v1752865832/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/amazon-s3-management-console-buckets.jpg)

To test, try creating a new bucket (for example, "cloudtest12345"). The bucket should be created successfully, confirming that Sanjeev now has full administrative access.

![The image shows the AWS S3 console interface for creating a new bucket, with fields for bucket name, AWS region, and object ownership settings.](https://kodekloud.com/kk-media/image/upload/v1752865833/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-s3-console-create-bucket.jpg)

![The image shows an Amazon S3 management console with a list of buckets, their regions, access status, and creation dates. A green notification at the top indicates a successfully created bucket named "kodekloudtest12345."](https://kodekloud.com/kk-media/image/upload/v1752865834/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/amazon-s3-management-console-buckets-2.jpg)

## Using Groups to Manage Permissions

Managing permissions individually can be tedious, especially when onboarding multiple employees. IAM groups simplify this by allowing you to assign a set of policies to multiple users at once.

For example, after revoking direct permissions from Sanjeev, you could:

- Create a group named **admin**
- Add users (for instance, Sanjeev and a dummy user "user1") to the group
- Attach the **AdministratorAccess** policy to the group

Users in the group inherit these permissions automatically.

![The image shows the AWS IAM Management Console, specifically the "Add permissions" page for a user, with options to add the user to a group, copy permissions, or attach policies directly. A list of permission policies is displayed below.](https://kodekloud.com/kk-media/image/upload/v1752865835/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-add-permissions-console.jpg)

Review the group details to confirm that permissions are correctly inherited:

![The image shows the AWS Identity and Access Management (IAM) console, displaying user groups and permission policies. Two users are listed, and various policies, including "AdministratorAccess," are shown for selection.](https://kodekloud.com/kk-media/image/upload/v1752865837/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-console-user-groups-policies.jpg)

In the **Users** section, if you select "user1," you will see that the **AdministratorAccess** policy is attached via the group rather than directly.

![The image shows an AWS Identity and Access Management (IAM) console screen for a user named "user1," displaying their summary, permissions policies, and access settings. The user has console access enabled without MFA and is part of the "admin" group with "AdministratorAccess" permissions.](https://kodekloud.com/kk-media/image/upload/v1752865838/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-console-user1-summary.jpg)

Back on the Sanjeev session, verify that he can create S3 buckets again:

![The image shows an Amazon S3 management console with a list of buckets, their regions, access status, and creation dates. A notification at the top indicates a bucket named "kodekloudtest12345" was successfully created.](https://kodekloud.com/kk-media/image/upload/v1752865839/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/amazon-s3-management-console-buckets-3.jpg)

You can create additional groups for different departments. For instance, create a **monitoring** group with the AWS managed policy **ReadOnlyAccess** for users who only need to view resources but not modify them. Add Sanjeev to this group as well so he inherits permissions from both groups. Then, remove him from the **admin** group to limit his permissions to read-only actions. If an unauthorized action is attempted—such as deleting an S3 bucket—a permission error will be displayed.

![The image shows an AWS S3 console screen for deleting a bucket named "sanjeevkodekloudbucket," with a warning about permissions needed to delete the bucket.](https://kodekloud.com/kk-media/image/upload/v1752865840/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-s3-delete-bucket-warning.jpg)

## Creating and Assuming a Role

Roles in AWS IAM allow users or services to assume temporary permissions that differ from their default permissions. This is useful when a user occasionally needs elevated access—for example, full S3 access.

To create a role with temporary S3 permissions:

1.  Navigate to the **Roles** section in IAM and click **Create Role**.
2.  Select **AWS account** as the trusted entity if the role is to be assumed by an IAM user within your account.

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, listing various service roles and their trusted entities.](https://kodekloud.com/kk-media/image/upload/v1752865842/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-console-roles-section.jpg)

3.  Proceed by clicking **Next** and select the permission policy **S3FullAccess** (an AWS managed policy) to grant full Amazon S3 access. Reviewing this policy, you will see it permits S3 actions as shown below:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "s3-object-lambda:*"
      ],
      "Resource": "*"
    }
  ]
}
```

4.  Name the role, for example, **S3FullAccess**, and create it.

To restrict which IAM users can assume this role, attach a custom inline policy to the specific user (Sanjeev):

- Navigate to the **Sanjeev** user's permissions.
- Click **Add Inline Policy**.
- For the service **STS**, allow the **AssumeRole** action only for the specific role's Amazon Resource Name (ARN).

For example:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::<ACCOUNT_ID>:role/S3FullAccess"
    }
  ]
}
```

Name this policy (e.g., **AssumeS3Access**) and create it. This ensures that only Sanjeev can assume the **S3FullAccess** role.

To test the role:

1.  In the **Roles** section, click on the **S3FullAccess** role and copy the **Switch Role** URL.
2.  In the Sanjeev session, paste the URL. The console will automatically populate the necessary details (account ID and role name), allowing you to specify a display name for the session (e.g., "S3 role").
3.  Click **Switch Role** to assume the role.

![The image shows the AWS Identity and Access Management (IAM) console screen, displaying details of a role named "S3FullAccess" with permissions for Amazon S3. The role has an AWS managed policy attached and a maximum session duration of one hour.](https://kodekloud.com/kk-media/image/upload/v1752865843/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo/aws-iam-s3fullaccess-role-details.jpg)

A badge (e.g., "S3 role" in blue) will appear, indicating that the role is active. Test S3 operations, such as deleting a bucket. As the assumed role, you should be able to delete the bucket, confirming that the temporary permissions are in effect. To return to your original session, click **Switch Back**.

## Summary

In this lesson, we covered how to:

- Create IAM users and provide them with console access.
- Grant permissions directly via policies.
- Use groups to manage permissions efficiently across multiple users.
- Create roles for temporary elevated access and control who may assume these roles.

This comprehensive demonstration illustrates how AWS IAM enables you to securely manage access across your AWS environment while ensuring best practices for security and scalability.

For further reading:

- [AWS IAM Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- [AWS Best Practices for IAM](https://aws.amazon.com/iam/details/best-practices/)

Happy cloud computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/12ca8f79-e712-431e-a9fa-4e9e3fd5a8e9)**
>
> Watch video content
