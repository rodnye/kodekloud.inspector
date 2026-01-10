# S3 demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-demo)

---

## Table of Contents

- S3 demo
  - Creating a Bucket
  - Uploading Files
  - Creating Folders and Organizing Files
  - Deleting Files and Moving Objects
  - Deleting the Bucket
  - Conclusion
  - Watch Video
    - Deleting Files
    - Moving Objects

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 demo

In this lesson, you will learn how to create your first Amazon S3 bucket and explore its key functionalities. This guide covers steps from accessing the AWS console to creating buckets, uploading files, organizing content, moving objects, and finally deleting buckets—all while ensuring your S3 operations remain secure and efficient.

Start by opening the AWS console and searching for the S3 service.

![The image shows an AWS console interface with a search for "S3," displaying related services like S3, S3 Glacier, AWS Snow Family, and AWS Transfer Family. The sidebar lists categories such as Services, Features, and Documentation.](https://kodekloud.com/kk-media/image/upload/v1752866133/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-console-s3-search-services.jpg)

This search directs you to the S3 page. If no buckets have been created, you will see a prompt to create one. Otherwise, your existing buckets will be listed with an option to create a new bucket.

![The image shows the Amazon S3 console interface, featuring options for creating a bucket, pricing information, and a video introduction to Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752866134/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-console-interface.jpg)

Before proceeding, notice the "global" indicator on the interface. Although S3 employs a global namespace, you still specify a bucket's region during creation.

## Creating a Bucket

To begin, click on "Create bucket" and follow these steps:

1.  **Bucket Naming:**  
    Specify a globally unique bucket name. Avoid common names like "demo" that may already exist; instead, use unique identifiers such as "KodeKloud-demo-123."  
    To understand the naming conventions, click the link provided next to the bucket name field.

    ![The image shows a screenshot of the AWS S3 "Create bucket" configuration page, where users can set the bucket name, region, and object ownership settings.](https://kodekloud.com/kk-media/image/upload/v1752866136/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-s3-create-bucket-screenshot.jpg)

2.  **Region Selection:**  
    Choose the region where your bucket will reside (e.g., US East 1).

    > [!important]
    > **Note**
    >
    > If you have existing buckets and wish to mirror their settings, you can copy the configuration.

3.  **Default Settings:**  
    You can configure options including object ownership, block public access, versioning, encryption, and advanced settings like object lock. For this demonstration, use the default settings and keep block public access enabled to restrict access solely to you.

    ![The image shows a settings page for configuring public access permissions for an AWS S3 bucket, including options to block all public access and specific access control list settings. It also includes warnings about the implications of turning off these settings.](https://kodekloud.com/kk-media/image/upload/v1752866138/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-s3-bucket-public-access-settings.jpg)

After configuring your options, click "Create bucket." Your newly created bucket (for example, "kk-demo-123") will now appear in your bucket list with details such as its region and creation date.

![The image shows an Amazon S3 console with details of a bucket named "kk-demo-123" in the US East (N. Virginia) region. It includes an account snapshot with storage metrics and options to manage the bucket.](https://kodekloud.com/kk-media/image/upload/v1752866141/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-bucket-kk-demo-123.jpg)

Select the bucket to view its contents and properties. The Objects page displays all uploaded files (initially empty), while the Properties page outlines configuration details such as region, ARN, versioning status, tags, encryption, server access logging, CloudTrail data events, event notifications, transfer acceleration, object lock, requester pays, and static website hosting.

![The image shows the properties page of an Amazon S3 bucket named "kk-demo-123," displaying details about bucket versioning, tags, and default encryption settings.](https://kodekloud.com/kk-media/image/upload/v1752866141/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-bucket-properties-kk-demo-123.jpg)

In the Permissions tab, manage access controls. By default, only you have access to the bucket and its content. You can update bucket policies and permissions to grant access to other users if necessary.

![The image shows the permissions settings for an Amazon S3 bucket named "kk-demo-123," indicating that the bucket and its objects are not public. It includes options to block public access and edit bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752866142/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/s3-bucket-permissions-kk-demo-123.jpg)

The Metrics section shows CloudWatch metrics (data size, object count) and the Management section enables you to set up lifecycle rules, replication configurations, inventory setups, and access points. These topics are explored in more detail in advanced lessons.

![The image shows a section of the Amazon S3 management console, displaying options for creating lifecycle rules, replication rules, and inventory configurations, with no existing rules or configurations set up.](https://kodekloud.com/kk-media/image/upload/v1752866143/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-management-console-lifecycle-rules.jpg)

![The image shows an Amazon S3 bucket interface for "kk-demo-123," specifically the "Access Points" tab, indicating no access points are currently set up. There is an option to create a new access point.](https://kodekloud.com/kk-media/image/upload/v1752866144/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-bucket-access-points.jpg)

## Uploading Files

Follow these steps to upload your first file:

1.  Navigate back to the Objects page and click "Upload."  
    You can either add files, upload entire folders, or drag and drop files directly into the interface. In this example, drag and drop a photo file.

    ![The image shows an AWS S3 upload interface with a file named "pexels-julio-nery-1687147.jpg" ready to be uploaded. The file is 2.7 MB in size, and the destination bucket is "kk-demo-123".](https://kodekloud.com/kk-media/image/upload/v1752866146/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-s3-upload-interface-pexels-file.jpg)

2.  Review the file details, which typically include file type, size, and destination bucket. You can adjust object details or enable bucket versioning if needed. For this demonstration, retain the default bucket permissions and storage class settings.

    ![The image shows an Amazon S3 console interface for uploading a file, with options for destination details, permissions, and properties. Bucket versioning and object lock are disabled, and there's a recommendation to enable bucket versioning.](https://kodekloud.com/kk-media/image/upload/v1752866147/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-console-upload-interface.jpg)

3.  S3 offers various storage classes—Standard, Intelligent-Tiering, and Glacier—that help balance data access, resiliency, and cost. For now, use the default settings.

    ![The image shows an Amazon S3 console screen displaying storage class options, including Standard, Intelligent-Tiering, and Glacier, with details on availability zones and storage duration.](https://kodekloud.com/kk-media/image/upload/v1752866148/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-storage-class-options.jpg)

Click "Upload" to start the file transfer. When the upload completes, a green checkmark indicates success.

![The image shows an AWS S3 upload status page indicating a successful upload of a file named "pexels-julio-nery-1687147.jpg" with a size of 2.7 MB. The upload summary shows 1 file succeeded and 0 files failed.](https://kodekloud.com/kk-media/image/upload/v1752866149/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-s3-upload-success-pexels-file.jpg)

After closing the confirmation, the file appears in the Objects section of your bucket. Click the file to view details such as region, file size, last modified date, unique URI, ARN, entity tag, and access URL.

![The image shows an Amazon S3 console interface displaying details of an object named "pexels-julio-nery-1687147.jpg," including its properties, S3 URI, and object URL.](https://kodekloud.com/kk-media/image/upload/v1752866151/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-console-object-details.jpg)

Scrolling further reveals settings like object lock, storage class, server-side encryption, checksum tags, and more. Note that these configurations can be applied on an individual object basis.

![The image shows an Amazon S3 console interface displaying details about an object, including sections for additional checksums, tags, metadata, and object lock settings. The object lock is currently disabled.](https://kodekloud.com/kk-media/image/upload/v1752866152/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-console-object-details-2.jpg)

If you attempt to view the object using its public URL, you might get an "Access Denied" error because the file is not accessible to unauthenticated users.

```
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
  <RequestId>PDW0A5Z2R3E2K3J6J0G6</RequestId>
  <HostId>bsEm1k1oTn3u1kND7MbjamVADURSB1Vw6d2q2LKwRkMExUjBfoxTIgLkS</HostId>
</Error>
```

When you click the "Open" button while authenticated, your session credentials allow you access to view the file.

![The image shows an Amazon S3 console interface displaying details of an object named "pexels-julio-nery-1687147.jpg," including its size, type, and S3 URI.](https://kodekloud.com/kk-media/image/upload/v1752866154/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-console-object-details-3.jpg)

> [!important]
> **Security Reminder**
>
> By default, your S3 bucket and its objects are secured so that only the creator has access. Adjust these settings only if you intend to share the file publicly.

## Creating Folders and Organizing Files

Although S3 does not support a traditional folder structure, it simulates folders by using object prefixes. Follow these steps to organize your files:

1.  In your bucket, click "Create folder" and provide a name (e.g., "food").
2.  Open the folder and upload files, such as food-related images, using the same upload process and designating the folder as the destination.

![The image shows an Amazon S3 bucket interface with a file named "pexels-julio-nery-1687147.jpg" listed, along with options to create a folder and upload files.](https://kodekloud.com/kk-media/image/upload/v1752866155/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-bucket-interface-file-listing.jpg)

![The image shows an Amazon S3 bucket interface with a folder named "food" containing four image files: burger.jpg, pizza.jpg, sandwich.jpg, and steak.jpg. Each file is listed with its type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752866156/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-bucket-food-folder.jpg)

If you inspect the URI or ARN of a file within the folder (for example, burger.jpg), you will see that the file name is prefixed with the folder name. This prefix system simulates folders in a flat file system.

To view an object, simply select it and click "Open." Remember, accessing it publicly may be blocked if proper permissions are not set.

## Deleting Files and Moving Objects

### Deleting Files

Removing objects from S3 is straightforward. To delete a file, follow these steps:

1.  Select the file and click "Delete."
2.  In the confirmation pop-up, type "permanently delete" to confirm the action.

    ![The image shows an Amazon S3 interface for deleting objects, with a file named "pexels-julio-nery-1687147.jpg" selected for deletion. The user is prompted to type "permanently delete" to confirm the action.](https://kodekloud.com/kk-media/image/upload/v1752866157/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-delete-object-interface.jpg)

If bucket versioning is disabled, the file will be permanently removed.

### Moving Objects

You can simulate moving files between folders within S3. For example, to move "steak.jpg" into a new folder named "test":

1.  Select the file and choose "Actions" > "Move."
2.  Specify the full destination path (e.g., "s3://kk-demo-123/test") either manually or by browsing.
3.  Confirm the move operation.

    ![The image shows an Amazon S3 bucket interface with a list of files, including images named "burger.jpg," "pizza.jpg," "sandwich.jpg," and "steak.jpg," along with their details like size and last modified date.](https://kodekloud.com/kk-media/image/upload/v1752866159/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/amazon-s3-bucket-file-list.jpg)

    ![The image shows an AWS S3 console interface for moving objects, with options for selecting a destination bucket or access point. It includes a warning about object settings and encryption.](https://kodekloud.com/kk-media/image/upload/v1752866161/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-s3-console-move-objects.jpg)

After the move is initiated, the status screen will display the results of the operation.

![The image shows an AWS S3 console screen displaying the status of a move operation, indicating that zero objects were successfully moved or failed to move.](https://kodekloud.com/kk-media/image/upload/v1752866162/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-s3-move-operation-status.jpg)

Finally, navigate to the "test" folder to confirm that "steak.jpg" has been successfully moved.

## Deleting the Bucket

Before deleting a bucket, ensure it is completely empty. Deleting a non-empty bucket will result in an error.

1.  Click the "Empty" button, type "permanently delete" in the confirmation box, and empty the bucket.

    ![The image shows an AWS S3 interface for emptying a bucket named "kk-demo-123," with a warning about permanent deletion and a text box to confirm the action by typing "permanently delete."](https://kodekloud.com/kk-media/image/upload/v1752866163/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-demo/aws-s3-empty-bucket-confirmation.jpg)

2.  Once empty, proceed to delete the bucket by typing its name to confirm the deletion.

This completes the process of managing your S3 bucket, from creation and file management to deletion.

## Conclusion

This lesson provided a comprehensive overview of working with Amazon S3 buckets. You learned how to:

- Create and configure buckets
- Upload and review files
- Organize files using simulated folders
- Move objects between folders
- Delete files and entire buckets

For more information on AWS S3 and its features, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/s3/) for further details and advanced configurations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/bc3fc9ae-9b55-439f-a590-a91f2dac3b16)**
>
> Watch video content
