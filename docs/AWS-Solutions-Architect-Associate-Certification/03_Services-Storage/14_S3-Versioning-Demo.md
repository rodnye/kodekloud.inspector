# S3 Versioning Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Versioning-Demo)

---

## Table of Contents

- S3 Versioning Demo
  - 1. Creating the Bucket with Versioning Disabled
  - 2. Uploading the First Version of the File
  - 3. Re-uploading and Overwriting the File without Versioning
  - 4. Enabling Bucket Versioning
  - 5. Adding Additional Versions
  - 6. Suspending Bucket Versioning
  - 7. Demonstrating Versioning with a New Object Key
  - 8. Multi-Factor Authentication (MFA) Delete
  - 9. Cleaning Up: Deleting Objects and the Bucket
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Versioning Demo

In this tutorial, we'll explore how versioning works in Amazon S3. First, we'll create an S3 bucket with versioning disabled to review the default behavior. Later, we'll enable versioning and compare the differences.

## 1\. Creating the Bucket with Versioning Disabled

Begin by navigating to the AWS S3 console and create a new bucket. For this example, name the bucket "versioning demo" and retain all default settings. Ensure that bucket versioning is set to disabled.

![The image shows the AWS S3 interface for creating a new bucket, with fields for bucket name, AWS region, and object ownership settings.](https://kodekloud.com/kk-media/image/upload/v1752866099/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/aws-s3-create-bucket-interface.jpg)

![The image shows an AWS S3 console screen with options for blocking public access and bucket versioning settings. It includes a notification about upcoming permission changes for enabling block public access settings.](https://kodekloud.com/kk-media/image/upload/v1752866101/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/aws-s3-console-block-public-access.jpg)

## 2\. Uploading the First Version of the File

Open the newly created bucket and upload a dummy text file named "file1.txt" containing the following content:

```
this is version 1
```

This simple content makes it easy to track changes in later versions. After uploading the file, click "Close".

![The image shows an Amazon S3 upload interface where a file named "file1.txt" is being prepared for upload to a bucket named "kk-versioning-demo." The file is 17 bytes in size and the "Upload" button is visible.](https://kodekloud.com/kk-media/image/upload/v1752866102/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-upload-file1-kk-demo.jpg)

Once uploaded, open the file from the bucket to verify it displays "this is version 1". Next, select the file and attempt to delete it. Since versioning is disabled, Amazon S3 will prompt you to permanently delete the file:

![The image shows an Amazon S3 interface for deleting objects, specifically a file named "file1.txt" with details like type, last modified date, and size. There's a prompt to confirm permanent deletion by typing "permanently delete."](https://kodekloud.com/kk-media/image/upload/v1752866104/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-delete-file-interface.jpg)

> [!important]
> **Warning**
>
> When versioning is disabled, deleting a file permanently removes it from your bucket with no recovery option.

## 3\. Re-uploading and Overwriting the File without Versioning

To continue the demonstration, re-upload "file1.txt" ensuring it still contains "this is version 1". Then, modify the file content to the following:

```
this is version 2
```

When you upload the updated file using the same key, Amazon S3 overwrites the existing file. Opening "file1.txt" will now display "this is version 2". Note that the original version is lost because versioning is not enabled.

![The image shows an Amazon S3 interface for deleting objects, with a file named "file1.txt" selected for permanent deletion. The user is typing "permanently" to confirm the deletion.](https://kodekloud.com/kk-media/image/upload/v1752866106/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-delete-file1-confirmation.jpg)

## 4\. Enabling Bucket Versioning

Now, let's enable versioning for the bucket. Navigate to the bucket's properties, select "Versioning", and click "Edit". Then, enable versioning and save your changes. The interface will now display a "show versions" option when you view your bucket's contents.

![The image shows an Amazon S3 bucket properties page with details about bucket versioning, tags, and default encryption settings. The bucket versioning and multi-factor authentication (MFA) delete are both disabled.](https://kodekloud.com/kk-media/image/upload/v1752866107/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-bucket-properties.jpg)

After enabling versioning, upload "file1.txt" again. Even though the UI looks similar, the file now receives a version ID. Open the file to confirm it contains "this is version 1". Then, update the file content to:

```
this is version 2
```

Upload the file using the same key. Click on "show versions" to reveal both versions. The older version will have an earlier timestamp, while the current version shows the updated content.

![The image shows an Amazon S3 bucket interface with two versions of a file named "file1.txt" listed, displaying details like version ID, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752866109/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-bucket-file-versions.jpg)

Review both file versions by opening them, ensuring that each version retains its specific content.

## 5\. Adding Additional Versions

Next, update "file1.txt" again by changing its content to:

```
this is version 3
```

Upload the file, and the bucket will now contain three versions, with the most recent version reflecting the update.

![The image shows an Amazon S3 upload interface with a file named "file1.txt" ready to be uploaded to a bucket named "kk-versioning-demo." The file is 17.0 bytes in size and is of type "text/plain."](https://kodekloud.com/kk-media/image/upload/v1752866110/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-upload-file1-kk-versioning-demo.jpg)

With versioning enabled, each distinct version is preserved using its unique version ID. When you delete a file now, Amazon S3 places a delete marker instead of permanently removing the object.

Select the file and click "Delete". Notice that the prompt simply asks for confirmation without requiring "permanently delete":

![The image shows an Amazon S3 interface for deleting objects, specifically a file named "file1.txt" with a prompt to confirm deletion by typing "delete."](https://kodekloud.com/kk-media/image/upload/v1752866111/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-delete-file-interface-2.jpg)

After deletion, the file might not be visible until you enable "show versions". Then all versions, including the delete marker, can be viewed.

![The image shows an Amazon S3 bucket interface with a list of objects, including multiple versions of "file1.txt" with details like version ID, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752866112/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-bucket-objects-list.jpg)

To restore the file, simply delete the delete marker:

![The image shows an Amazon S3 interface for deleting objects, specifically a file named "file1.txt" with a prompt to confirm permanent deletion.](https://kodekloud.com/kk-media/image/upload/v1752866114/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-delete-file1txt.jpg)

You can also permanently delete individual versions. For example, permanently removing version two will leave only versions one and three in your bucket.

## 6\. Suspending Bucket Versioning

Once enabled, versioning cannot be fully disabled; it can only be suspended. To suspend versioning, go to the bucket properties and edit the versioning settings:

![The image shows the "Edit Bucket Versioning" page in Amazon S3, where options to suspend or enable bucket versioning are displayed, along with a warning about the impact of changes.](https://kodekloud.com/kk-media/image/upload/v1752866115/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/edit-bucket-versioning-amazon-s3.jpg)

When versioning is suspended, existing versions remain intact. However, new uploads for an existing key will receive a version ID of "null". Upload an updated "file1.txt" with the following content:

```
this is version 4
```

Even though versioning is suspended, you can still view all historical versions. The newly uploaded file will have a version ID of "null". For further demonstration, upload another update with:

```
this is version 5
```

The bucket continues using "null" as the version ID for subsequent changes. This behavior indicates that only one live version is maintained for each key, although previous versions are still stored. If required, you can manually delete older versions.

## 7\. Demonstrating Versioning with a New Object Key

To illustrate versioning behavior for a new object key, create and upload a new file called "file2.txt" with the initial content:

```
this is version 5
```

After uploading "file2.txt", enabling "show versions" will display that the file has a version ID of "null". Updating the file (for example, changing the content to "this is version 2") will overwrite the existing object, and the new upload will also have a version ID of "null" because versioning is suspended.

![The image shows an Amazon S3 console with a bucket named "kk-versioning-demo" displaying versioned text files, alongside a Windows File Explorer window showing local text files.](https://kodekloud.com/kk-media/image/upload/v1752866117/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-versioning-demo-files.jpg)

## 8\. Multi-Factor Authentication (MFA) Delete

Another key feature is MFA delete. When enabled in the versioning configuration, MFA delete requires multi-factor authentication to make changes to the versioning status. Note that MFA delete can only be enabled via the AWS CLI or SDK, not through the console. For detailed setup instructions, please refer to the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **Note**
>
> MFA delete adds an additional layer of security by ensuring that changes to your versioning configuration require multi-factor authentication.

## 9\. Cleaning Up: Deleting Objects and the Bucket

After completing the demonstration, it's important to clean up. Delete the objects and then the bucket. When you delete objects with multiple versions, ensure that you review all versions and effectively remove them as needed.

![The image shows an Amazon S3 interface for deleting objects, listing several text files with details like version ID, type, last modified date, and size. There's a prompt to confirm permanent deletion by typing "permanently delete."](https://kodekloud.com/kk-media/image/upload/v1752866118/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Versioning-Demo/amazon-s3-delete-objects-interface.jpg)

Finally, delete the bucket to finish the cleanup process.

This concludes our detailed demonstration of Amazon S3 versioning. Happy cloud computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/409d2753-c6b5-41ae-a3c0-11c8bc926c7f)**
>
> Watch video content
