# S3 ACL and Resource Policies Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-ACL-and-Resource-Policies-Demo)

---

## Table of Contents

- S3 ACL and Resource Policies Demo
  - Environment Setup
  - Creating the S3 Bucket
  - Testing IAM Policy Permissions
  - Defining a Resource Policy for User Two
  - Allowing Deletion in the Traces Folder
  - Combining Multiple Actions in a Single Statement
  - Allowing Public (Anonymous) Access to a Specific Folder
  - Granting Access to a User in a Different AWS Account
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# S3 ACL and Resource Policies Demo

In this lesson, you will learn how to define resource policies that grant specific users access to certain objects or folders within an S3 bucket. Additionally, you'll see how to combine these resource policies with IAM policies to achieve fine-grained access control. Testing these policies involves simulating access from multiple AWS users using three different tabs, each representing a unique AWS user.

---

## Environment Setup

On your screen, you should see three colored tabs:

- **Blue Tab:** Account One, User One (the bucket creator)
- **Green Tab:** Account One, User Two
- **Yellow Tab:** Account Two, User One (commonly named "Admin")

These distinct logins enable you to simulate different permission scenarios.

---

## Creating the S3 Bucket

Log in as **Account One, User One** (Blue Tab) and complete the following steps:

1.  Open the S3 console.
2.  Create a new bucket (e.g., `demo-bucket`) using default settings.> [!important]
    > **Note**
    >
    > ACLs are not used in this demo because they are considered a legacy method.
    - Public access is blocked.
    - Versioning is disabled.
3.  After the bucket is created, open it and upload several files.

After uploading, verify the access behavior:

- When accessing a file through the **Open** action in the S3 console, the file is viewable.
- Accessing the file via its public URL returns an "Access Denied" error due to the bucket's secure default settings.

---

## Testing IAM Policy Permissions

Switch to the **Green Tab** (Account One, User Two) and evaluate the following:

- Review the IAM policy attached to User Two. This policy, named "list buckets," permits listing buckets and their contents.
- As a result, User Two can see the bucket and its file list but receives an "Access Denied" error when trying to open any object.

**Summary:**

- **Account One, User One:** Has full access as the bucket creator.
- **Account One, User Two:** Can list buckets and view their contents based on the IAM policy, but cannot open files such as `file1.txt`.

---

## Defining a Resource Policy for User Two

Switch back to **Account One, User One** (Blue Tab) to create a resource policy that allows User Two to access the `logs` folder in the bucket.

1.  Navigate to the bucket’s **Permissions** tab and click **Edit Bucket Policy**.
2.  Start with the provided policy wizard template and modify the statement as follows:
    - **Statement Name:** `user2-allow-logs`
    - **Principal:** Specify the ARN of Account One, User Two (e.g., `arn:aws:iam::<account-number>:user/user2`).
    - **Effect:** `Allow`
    - **Action:** `s3:GetObject`  
      (Refer to the [S3 Actions reference](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html) for more details.)
    - **Resource:** Apply the policy only to objects within the `logs` folder. For example:  
      `arn:aws:s3:::kk-resource-policies/logs/*`  
      The asterisk ensures that all objects under `logs` are covered.
3.  Save the policy.

Now, test the configuration by switching back to **Account One, User Two**:

- Navigate to the `logs` folder and open a file (e.g., `log1`). It should open successfully.
- Attempting to open files outside the `logs` folder (like `file1.txt`) should result in "Access Denied."

---

## Allowing Deletion in the Traces Folder

Next, allow User Two to delete objects within the `traces` folder:

1.  While still logged in as **Account One, User One**, add a new statement to the bucket policy:
    - **Statement Name:** `user2-allow-delete`
    - **Principal:** Same as before (Account One, User Two).
    - **Effect:** `Allow`
    - **Action:** `s3:DeleteObject`
    - **Resource:** Limit this action to objects in the `traces` folder, for example:  
      `arn:aws:s3:::kk-resource-policies/traces/*`
2.  Save the updated policy.

Then, switch back to **Account One, User Two**:

- Navigate to the `traces` folder and try deleting an object (e.g., `trace1`). The deletion should succeed.
- Attempts to delete objects outside this folder should fail.

---

## Combining Multiple Actions in a Single Statement

It's possible to include multiple actions in a single policy statement with proper resource definitions. For example, if you try to add `s3:DeleteBucket` (which applies to the bucket) alongside `s3:GetObject` (which applies to objects), you will encounter errors unless you specify both resources correctly.

**Solution:**  
Include an array of resources:

- One for bucket-level actions (e.g., `arn:aws:s3:::kk-resource-policies`)
- Another for object-level actions (e.g., `arn:aws:s3:::kk-resource-policies/*`)

After updating the resource specifications, save your changes and confirm that the policy now supports both actions.

![The image shows an Amazon S3 console with a JSON policy editor open, displaying a resource policy for a bucket. There is an "Unknown Error" message at the bottom indicating an unexpected error occurred.](https://kodekloud.com/kk-media/image/upload/v1752859679/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-json-policy-error.jpg)

![The image shows an Amazon S3 bucket policy configuration screen with JSON code detailing access permissions. Public access is blocked, and specific user permissions are outlined.](https://kodekloud.com/kk-media/image/upload/v1752859680/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-json.jpg)

![The image shows an Amazon S3 console screen with settings for blocking public access to a bucket, including a JSON bucket policy configuration.](https://kodekloud.com/kk-media/image/upload/v1752859682/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-console-block-public-access.jpg)

![The image shows an Amazon S3 console displaying details of a file named "file1.txt," including its size, type, and last modified date. It also provides information about the file's S3 URI, ARN, and object URL.](https://kodekloud.com/kk-media/image/upload/v1752859683/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-file-details-file1.jpg)

---

## Allowing Public (Anonymous) Access to a Specific Folder

By default, the bucket is not publicly accessible. To allow anonymous users to access specific objects (for instance, those in the `media` folder), follow these steps:

1.  Open the bucket's **Permissions** tab and add a new policy statement.
2.  Update the statement as follows:
    - **Principal:** `"*"` (all users)
    - **Effect:** `Allow`
    - **Action:** `s3:GetObject`
    - **Resource:** Specify access to the `media` folder objects; for example:  
      `arn:aws:s3:::kk-resource-policies/media/*`
3.  Save the changes.

If an error occurs when saving the policy, it likely stems from the bucket’s block public access settings. To resolve this:

- Navigate to the **Block public access** settings.
- Disable the relevant settings that prevent public access (either all or selectively as needed).
- Confirm the changes and save the bucket policy again.

After saving, verify public access by obtaining the public URL of an object (e.g., an image) in the `media` folder. Accessing the URL should display or download the file, confirming that the policy works.

![The image shows an Amazon S3 console with a bucket policy editor open, displaying JSON code for setting permissions. The interface includes options to add actions and resources, with a sidebar for navigating AWS services.](https://kodekloud.com/kk-media/image/upload/v1752859685/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-editor.jpg)

![The image shows an Amazon S3 console with a JSON policy editor open, displaying a bucket policy. There's an error message indicating that the bucket policy changes can't be saved due to permission issues or public access settings.](https://kodekloud.com/kk-media/image/upload/v1752859686/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-error.jpg)

![The image shows an Amazon S3 console screen with settings for blocking public access to a bucket, including a JSON bucket policy.](https://kodekloud.com/kk-media/image/upload/v1752859687/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-console-block-public-access-2.jpg)

![The image shows the "Edit Block public access (bucket settings)" page in Amazon S3, where users can configure settings to block public access to buckets and objects. Options include blocking access through ACLs and public bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752859689/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/edit-block-public-access-s3.jpg)

After updating the settings and saving the policy:

- Verify that an object in the `media` folder (e.g., an icon or image) can be accessed via its public URL.
- Confirm that the file displays or downloads correctly.

![The image shows an Amazon S3 bucket permissions page with public access settings and a JSON bucket policy. The bucket is publicly accessible, and the block public access setting is off.](https://kodekloud.com/kk-media/image/upload/v1752859690/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-permissions-json.jpg)

![The image shows an Amazon S3 console interface displaying details of an object named "image1" within a bucket, including properties like owner, region, and object URL.](https://kodekloud.com/kk-media/image/upload/v1752859692/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-console-image1-details.jpg)

---

## Granting Access to a User in a Different AWS Account

Finally, allow a user from **Account Two** (Yellow Tab) to access your bucket.

1.  Open AWS CloudShell in Account Two.
2.  Run the following command to list buckets:

    ```
    aws s3 ls
    ```

    This should result in an "Access Denied" error initially.

3.  Attempt to list a specific bucket (replace `<bucket-name>` with your bucket's name):

    ```
    aws s3 ls s3://kk-resource-policies
    ```

    You'll see an "Access Denied" error since no resource policy for external account access has yet been defined.

Return to **Account One, User One** (Blue Tab) to add a new policy statement that grants access:

1.  In the bucket’s **Permissions** tab, add a statement with the following details:
    - **Statement Name:** `allow-account2-user-admin`
    - **Principal:** Specify the ARN for the admin user in Account Two (e.g., `arn:aws:iam::<account2-number>:user/Admin`).
    - **Actions:** Grant actions such as `s3:ListBucket` and `s3:DeleteObject`.
      - For bucket-level actions like `s3:ListBucket`, specify the bucket ARN (e.g., `arn:aws:s3:::kk-resource-policies`).
      - For object-level actions like `s3:DeleteObject`, specify the ARN for objects in a specific folder (e.g., `arn:aws:s3:::kk-resource-policies/logs/*`).
2.  Save the policy.

Return to **Account Two** and test again:

- Run `aws s3 ls` to confirm the bucket contents are visible.
- Attempt to delete an object:
  - Deletions in unauthorized folders (like the root) should be blocked.
  - Deleting an object in the `logs` folder (e.g., `log1`) should succeed.

![The image shows an Amazon S3 bucket policy configuration screen with JSON code for setting permissions. The interface includes options for editing statements and selecting services.](https://kodekloud.com/kk-media/image/upload/v1752859693/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-json-3.jpg)

![The image shows an Amazon S3 console with a bucket policy editor open, displaying JSON code for setting access permissions. The interface includes options for adding actions, resources, and conditions to the policy.](https://kodekloud.com/kk-media/image/upload/v1752859694/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-editor-2.jpg)

![The image shows an Amazon S3 bucket policy configuration screen, displaying JSON code for setting access permissions. The interface includes options to add actions, resources, and conditions.](https://kodekloud.com/kk-media/image/upload/v1752859696/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-json-4.jpg)

![The image shows an Amazon S3 bucket policy configuration screen, displaying JSON code for setting access permissions. The interface includes options for editing statements and adding actions, resources, and conditions.](https://kodekloud.com/kk-media/image/upload/v1752859697/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-json-5.jpg)

![The image shows an Amazon S3 console screen displaying a bucket policy in JSON format, with options to edit statements and save changes. The policy includes permissions for actions like "s3:DeleteObject" and "s3:ListBucket" for specific resources.](https://kodekloud.com/kk-media/image/upload/v1752859698/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/amazon-s3-bucket-policy-json-6.jpg)

Back in AWS CloudShell on **Account Two**, verify the following:

- Listing the bucket contents now succeeds.
- Attempting to delete an object in a folder without permission (e.g., `file1.txt`) returns an "Access Denied" error.
- Deleting an object within the `logs` folder (e.g., `log1`) completes successfully.

![The image shows an AWS CloudShell interface with a command line session where an attempt to list S3 bucket contents results in an "Access Denied" error, followed by a successful listing of files in a different directory.](https://kodekloud.com/kk-media/image/upload/v1752859699/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/aws-cloudshell-access-denied-s3.jpg)

![The image shows an AWS CloudShell interface with commands being executed to list and manage files in an S3 bucket, including an "Access Denied" error message.](https://kodekloud.com/kk-media/image/upload/v1752859700/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/aws-cloudshell-s3-access-denied.jpg)

![The image shows an AWS CloudShell interface where a user is attempting to list and delete files in an S3 bucket, encountering "Access Denied" errors for some operations.](https://kodekloud.com/kk-media/image/upload/v1752859702/notes-assets/images/AWS-Certified-Developer-Associate-S3-ACL-and-Resource-Policies-Demo/aws-cloudshell-s3-access-denied-2.jpg)

---

## Conclusion

In this lesson, you explored various scenarios for configuring S3 bucket resource policies. Key takeaways include:

- Restricting access to specific folders (e.g., `logs`, `traces`, and `media`).
- Combining IAM policies with resource policies for detailed access control.
- Allowing public access to select parts of the bucket.
- Extending permissions to users from different AWS accounts.

These strategies provide granular control over S3 bucket access, ensuring that each user is granted only the permissions they require.

Happy cloud securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/c437f327-4f2b-4d74-809b-11677b97b9f0)**
>
> Watch video content
