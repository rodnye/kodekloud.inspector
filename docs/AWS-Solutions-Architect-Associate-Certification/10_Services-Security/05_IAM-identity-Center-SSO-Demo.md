# IAM identity Center SSO Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/IAM-identity-Center-SSO-Demo)

---

## Table of Contents

- IAM identity Center SSO Demo
  - Accessing IAM Identity Center
  - Creating Users
  - Creating Permission Sets
  - Assigning Permission Sets to Users
  - Configuring Distinct Permissions for User Two
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# IAM identity Center SSO Demo

In this lesson, we will walk through the process of configuring and using IAM Identity Center, enabling you to manage user access across multiple AWS accounts efficiently.

## Accessing IAM Identity Center

Begin by logging into the AWS Management Console and typing "IAM Identity Center" in the search box. Once selected, you will be directed to the service page. If this is your first time accessing IAM Identity Center, you may see an option to “Enable IAM Identity Center.” Follow the on-screen prompt to enable the service. After enabling, navigate to the settings page to customize your Identity Center configuration.

![The image shows the AWS IAM Identity Center dashboard, displaying recommended setup steps and a settings summary for managing user access to AWS accounts and applications.](https://kodekloud.com/kk-media/image/upload/v1752865844/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-dashboard.jpg)

Below the settings section, locate the access portal. This portal serves as the customized login page where users enter their username and password to access their assigned AWS accounts. Use the "Actions" menu to change the identity source by specifying the desired user directory. You can switch between the built-in Identity Center directory, Active Directory, or another external identity provider. In this demo, we are using the Identity Center directory.

![The image shows the AWS IAM Identity Center settings page, detailing configuration options for identity source, authentication, and management. It includes information about the instance ARN, region, and identity source settings.](https://kodekloud.com/kk-media/image/upload/v1752865845/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-settings.jpg)

![The image shows an AWS IAM Identity Center interface where users can choose an identity source, with options for Identity Center directory, Active Directory, and External identity provider. There are navigation steps on the left and a "Next" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752865847/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-interface.jpg)

> [!important]
> **Tip**
>
> For this demonstration, continue using the Identity Center directory and simply cancel any dialogs prompting for a change in identity source.

IAM Identity Center manages users and groups in a manner similar to IAM, with the key difference being that user creation occurs directly within Identity Center. If you decide to integrate a different identity provider, note that user and group management will be handled on that external platform. Additionally, this service enables the management of multiple AWS accounts from a centralized location.

![The image shows the AWS IAM Identity Center interface, displaying a list of AWS accounts under an organizational structure with options for assigning users or groups.](https://kodekloud.com/kk-media/image/upload/v1752865848/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-accounts.jpg)

## Creating Users

To begin, create a couple of users:

1.  Click on "Add user."
2.  Provide a name (for example, user one) along with a dummy email address.
3.  For this demo, you do not need to assign users to groups.

After creation, a registration email will be sent so that the user can set their password.

![The image shows the AWS IAM Identity Center interface with a list of users, where "user2" was successfully added and both users have their status set to "Enabled."](https://kodekloud.com/kk-media/image/upload/v1752865849/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-users-enabled.jpg)

Repeat the steps to create a second user (for example, user two). When the registration email is received, the user should click on "Accept invitation" and set a password. This completes the user creation process.

![The image shows an AWS new user sign-up page with fields for entering a username and password. There are geometric cube designs in the background.](https://kodekloud.com/kk-media/image/upload/v1752865851/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-new-user-signup-page.jpg)

## Creating Permission Sets

Permission sets in IAM Identity Center allow you to define the scope of operations users can execute within your AWS accounts, functioning similarly to IAM policies.

To create a permission set:

1.  Click "Create permission set."
2.  Choose between predefined permission sets (such as AdministratorAccess, Billing, or ViewOnlyAccess) or create a custom permission set.

For example, to create a custom permission set that grants Amazon S3 full access:

- Select the managed policy "Amazon S3 Full Access" which includes permissions for creating, reading, and editing S3 buckets.
- Click "Next," provide a name (e.g., s3.full.access), and then complete the creation process.

![The image shows the AWS console interface for selecting a predefined permission set, with options for various AWS managed policies like AdministratorAccess, Billing, and DatabaseAdministrator.](https://kodekloud.com/kk-media/image/upload/v1752865852/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-console-permission-set-selection.jpg)

![The image shows the AWS console interface where a user is selecting managed policies related to S3. Various policy options are listed with their names, types, and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752865854/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-console-s3-managed-policies.jpg)

![The image shows a web interface for creating a permission set in AWS IAM Identity Center, where users can specify details like the permission set name, description, session duration, and relay state.](https://kodekloud.com/kk-media/image/upload/v1752865856/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-permission-set.jpg)

You can also create a predefined permission set for view-only access. Once both permission sets are created, they can be assigned to users across different AWS accounts.

![The image shows the AWS console interface for assigning permission sets to AWS accounts, with options for "S3FullAccess" and "ViewOnlyAccess." There are navigation steps on the left and a "Next" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752865857/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-console-permission-sets-interface.jpg)

## Assigning Permission Sets to Users

To assign permission sets, navigate to the AWS accounts section in Identity Center. For example, to grant user one full S3 access in multiple accounts:

1.  Select the relevant AWS accounts.
2.  Assign the "S3 Full Access" permission set to user one.
3.  Confirm the assignment to configure the policies accordingly.

Next, open the access portal in a new browser tab and log in as user one. You will observe that user one has access to two different AWS accounts (for example, the main account and account two), each with the corresponding permissions. To confirm the assignment, log in as user one and attempt to create an S3 bucket in account two.

After switching back to the main account, log in as user one and attempt to create another S3 bucket. Successful bucket creation in the respective accounts confirms that permissions have been correctly assigned.

## Configuring Distinct Permissions for User Two

For user two, you might assign site-specific permissions. In this demonstration, user two will have:

- Full S3 access in account two.
- View-only access in the main account.

To configure these settings in the IAM Identity Center console:

1.  For account two, assign the custom permission set with full S3 access for user two.
2.  For the main account, assign the predefined ViewOnlyAccess permission set for user two.

![The image shows the AWS Identity Center interface, displaying a list of AWS accounts with their organizational structure and permission sets. Two accounts, "account2" and "main," are listed under the "Root" organizational unit, both with "S3FullAccess" permissions.](https://kodekloud.com/kk-media/image/upload/v1752865858/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-identity-center-accounts-permissions.jpg)

Review the assignments for user two to ensure the correct permissions have been applied.

![The image shows an AWS IAM Identity Center interface where a user is reviewing and submitting assignments for a user named "user2" with a "ViewOnlyAccess" permission set. The interface includes options to edit selections and a "Submit" button.](https://kodekloud.com/kk-media/image/upload/v1752865860/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-user2-viewonlyaccess.jpg)

Log in as user two and verify:

- In account two, full S3 access is available.
- In the main account, only view-only access is granted.

Attempting to create a bucket in the main account should result in a permissions error.

![The image shows an AWS S3 console screen with a notification indicating a failure to create a bucket due to missing permissions. A tooltip provides guidance on accessing AWS services.](https://kodekloud.com/kk-media/image/upload/v1752865861/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-s3-bucket-creation-failure.jpg)

Conversely, bucket creation in account two should succeed due to the granted full S3 access.

## Conclusion

This demo illustrates how IAM Identity Center streamlines access management across multiple AWS accounts by consolidating user and permission management into a single interface. By centralizing management, you can efficiently create users and groups, assign permission sets, and control account access without duplicative administrative overhead.

![The image shows the AWS Identity Center interface, displaying a list of AWS accounts under an organizational structure with associated permission sets.](https://kodekloud.com/kk-media/image/upload/v1752865862/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-identity-center-accounts-permissions-2.jpg)

![The image shows the AWS IAM Identity Center interface, specifically the "Permission sets" section, listing two permission sets: "S3FullAccess" and "ViewOnlyAccess," both with a status of "Provisioned."](https://kodekloud.com/kk-media/image/upload/v1752865863/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-identity-Center-SSO-Demo/aws-iam-identity-center-permission-sets.jpg)

By centralizing identity and access management tasks, IAM Identity Center minimizes administrative complexity and ensures that users have appropriate access levels across AWS accounts. This lesson has provided you with a clear understanding of the core functionalities of IAM Identity Center, equipping you to manage AWS account access with confidence.

Transcribed by: [otter.ai](https://otter.ai)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/075949b6-b346-4ef1-8bfa-ff1c8927b109)**
>
> Watch video content
