# Demo IAM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/Demo-IAM)

---

## Table of Contents

- Demo IAM
  - Creating an IAM User
  - Attaching Policies to a User
  - Creating Additional Users and Groups
  - Reviewing IAM Policies
  - Creating a Role
  - Conclusion
  - Watch Video
    - Creating an EC2 Read-Only Custom Policy
    - Creating an S3 Read-Only Custom Policy

---

## Content

Terraform Basics Training Course

Terraform with AWS

# Demo IAM

In this lesson, we will explore the AWS Identity and Access Management (IAM) service using the AWS Management Console. Learn how to create users and groups, attach both pre-built and custom policies, and set up IAM roles to delegate access securely across AWS services.

To access IAM, click the Services tab at the top left and navigate to the Security & Compliance group; IAM is the first service listed. Alternatively, use the search bar on the dashboard. Note that IAM is a global service—unlike other AWS services, once you create an IAM object (such as a user or group), it is available in every region across your account.

![The image shows the AWS Management Console interface, listing various AWS services under categories like Migration, Networking, Media, Security, and more.](https://kodekloud.com/kk-media/image/upload/v1752884217/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_30.jpg)

Once inside the IAM dashboard, you will notice that no users or groups have been created yet, and you are logged in as the root account. To begin, we will create an IAM user named Lucy.

## Creating an IAM User

1.  In the IAM dashboard, select **Users** under Account Management.
2.  Enter "Lucy" as the username.
3.  Choose the type of access to provide:
    - **Programmatic Access:** Generates an access key and secret access key for AWS CLI or SDK usage.
    - **AWS Management Console Access:** Provides a username and password for console login.

    > [!important]
    > **Note**
    >
    > These access methods are complementary. The programmatic access key allows API interactions, while console access permits direct usage via the browser.

4.  For Lucy, set a custom password and enable the option for her to reset the password upon first login. This automatically attaches an IAM policy that permits password changes.
5.  Click **Next: Permissions**. For now, do not attach any additional permissions. Then click **Next: Tags**.
6.  Skip adding tags by clicking **Next: Review**. Finally, review the details and click **Create User**.

After creating Lucy, you can download her access key and secret access key as a CSV file. Remember, this is the only time the secret access key is visible; if lost, new credentials must be generated.

![The image shows the AWS IAM dashboard, displaying user and role information, security alerts, best practices, and additional resources for identity and access management.](https://kodekloud.com/kk-media/image/upload/v1752884218/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_50.jpg)

![The image shows the AWS IAM Management Console, where a user named "lucy" is being added with programmatic access selected.](https://kodekloud.com/kk-media/image/upload/v1752884219/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_90.jpg)

![The image shows the AWS IAM Management Console, where a user named "lucy" is being set up with programmatic and console access.](https://kodekloud.com/kk-media/image/upload/v1752884220/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_110.jpg)

![The image shows the AWS IAM Management Console, reviewing user details for creating a new user named "lucy" with specific access and permissions.](https://kodekloud.com/kk-media/image/upload/v1752884222/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_150.jpg)

![The image shows the AWS IAM Management Console with a success message for creating a user named "lucy," displaying access key details.](https://kodekloud.com/kk-media/image/upload/v1752884223/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_170.jpg)

## Attaching Policies to a User

After Lucy is created, navigate to her user details and select the **Permissions** tab. You will see that the "IAM User Change Password" policy is attached by default—click on it to review its JSON document.

Now, attach an additional policy that grants Lucy full administrative privileges. As the team lead, she needs unrestricted access to all account services. We will attach the **AdministratorAccess Policy** with the following JSON:

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

Select the AdministratorAccess policy, click **Next**, review the permissions, and then click **Add Permissions**. Lucy now has both the default password change policy and the administrative policy attached.

![The image shows the AWS Management Console, specifically the IAM section for adding permissions to a user named "lucy" by attaching existing policies.](https://kodekloud.com/kk-media/image/upload/v1752884224/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_220.jpg)

## Creating Additional Users and Groups

Next, we will create another user named Abdul and group him with Lee. For Abdul, follow the same steps used earlier to create a user. When prompted, select to create a new group called "Project Sapphire Users" and attach the **AmazonEC2FullAccess Policy**.

Additionally, add a tag with the key "name" and value "Project Sapphire Users" during the group creation process. After creating Abdul, download his access keys (CSV file).

Proceed then to create another user named Lee, and add him to the existing "Project Sapphire Users" group. Both Abdul and Lee will now have full EC2 access.

To further enhance the group's capabilities, attach an additional policy that grants full access to the Amazon S3 service.

![The image shows the AWS IAM Management Console, where a user is creating a group named "project-sapphire-users" and selecting policies related to EC2.](https://kodekloud.com/kk-media/image/upload/v1752884226/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_280.jpg)

## Reviewing IAM Policies

IAM policies offer fine-grained control over user and service permissions. AWS provides many pre-built managed policies such as Amazon EC2 Full Access and Amazon S3 Full Access, along with specific role policies like Administrator Access and Billing.

### Creating an EC2 Read-Only Custom Policy

To illustrate policy creation, we will create a custom policy that restricts EC2 actions to read and list operations:

1.  Click **Create Policy**.
2.  Choose **EC2** as the target service.
3.  Select actions that permit only read and list operations.
4.  For this demo, choose **All Resources**.
5.  Click **Review** and name the policy "EC2-List-Read". Verify the JSON document to confirm it permits list and read actions on all EC2 resources.

Once finalized, this policy will appear in your list and be available for attachment to users, groups, or roles.

![The image shows the AWS IAM Management Console, specifically the "Create policy" page for configuring EC2 service permissions using the visual editor.](https://kodekloud.com/kk-media/image/upload/v1752884226/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_400.jpg)

![The image shows the AWS IAM Management Console with a policy summary for "EC2-List-Read," detailing various EC2 permissions in JSON format.](https://kodekloud.com/kk-media/image/upload/v1752884227/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_440.jpg)

### Creating an S3 Read-Only Custom Policy

Similarly, create a custom policy for the S3 service that allows only read and list operations. Name the policy "S3-Read-Only" and review the JSON document to ensure it properly grants read and list permissions on all S3 resources.

## Creating a Role

IAM roles enable secure delegation of access across AWS accounts and services. They are commonly used to allow users from different AWS accounts to access resources or to grant AWS services, such as EC2, permission to interact with other services.

In this example, we will create a role that permits EC2 instances read-only access to S3:

1.  Navigate to **Roles** and click **Create Role**.
2.  Under **Select type of trusted entity**, choose **AWS Service**.
3.  Select **EC2** as the service.
4.  Click **Next: Permissions** and attach the custom S3-Read-Only policy you created.
5.  Optionally, add a tag with the value "S3-Read-Only role for EC2 instances".
6.  Click **Next: Review**, provide a name (e.g., "S3-Read-Only Role"), and update the description if needed.
7.  Click **Create Role**.

The newly created role is now available for assignment to EC2 instances.

![The image shows the AWS IAM Management Console, specifically the "Create role" page, where a role is being configured for EC2 instances with S3 read-only access.](https://kodekloud.com/kk-media/image/upload/v1752884228/notes-assets/images/Terraform-Basics-Training-Course-Demo-IAM/frame_570.jpg)

## Conclusion

This lesson demonstrated how to manage IAM using the AWS Management Console by:

- Creating users with both programmatic and console access
- Attaching both default and custom policies
- Organizing users into groups for more efficient management
- Crafting custom read-only policies for EC2 and S3
- Creating a role to delegate access to EC2 instances

In the next article, we will dive into managing IAM services using Terraform, allowing you to automate and scale your infrastructure efficiently.

For further reading and detailed documentation, check the following resources:

- [AWS Identity and Access Management Documentation](https://docs.aws.amazon.com/iam/)
- [AWS Management Console](https://aws.amazon.com/console/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Security Best Practices](https://aws.amazon.com/iam/security-best-practices/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/beb58013-ae36-41e4-a55a-79fd1b3023a1)**
>
> Watch video content
