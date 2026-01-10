# S3 Storage Classes Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Storage-Classes-Demo)

---

## Table of Contents

- S3 Storage Classes Demo
  - Uploading Files with a Custom Storage Class
  - Modifying the Storage Class of an Existing Object
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Storage Classes Demo

This guide demonstrates how to set and modify the storage class for files in Amazon S3. You will learn how to configure the storage class during file upload and change it later if needed, ensuring your data is stored cost-effectively and in accordance with your access requirements.

## Uploading Files with a Custom Storage Class

1.  Create a new S3 bucket (for example, "kk-sc-demo") using the default settings.
2.  Once the bucket is created, click the **Upload** button and select a file from your computer.
3.  During the upload process, in the file properties section, notice that the default storage class is set to _Standard_.

![The image shows an Amazon S3 console screen displaying different storage class options, including Standard, Intelligent-Tiering, and Glacier, with details on their designed use, availability zones, and minimum storage duration.](https://kodekloud.com/kk-media/image/upload/v1752866087/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes-Demo/amazon-s3-storage-classes-console.jpg)

> [!important]
> **Tip**
>
> For optimal cost management, consider selecting the **One Zone Infrequent Access** storage class if your data is accessed less frequently but requires rapid retrieval.

4.  Change the storage class from _Standard_ to **One Zone Infrequent Access**, then upload the file.
5.  Once the upload completes, verify that the file's storage class is set to **One Zone Infrequent Access**.

## Modifying the Storage Class of an Existing Object

If you need to change the storage class after the upload:

1.  Navigate to the object's properties in the S3 console.
2.  Edit the storage class setting and choose the desired option. For example, you can switch it back to _Standard_.

![The image shows an Amazon S3 console interface displaying details of an object named "beach1.jpg," including its properties, permissions, and versions. It provides information such as the S3 URI, ARN, last modified date, size, and object URL.](https://kodekloud.com/kk-media/image/upload/v1752866088/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Storage-Classes-Demo/amazon-s3-console-beach1-details.jpg)

> [!important]
> **Note**
>
> Changing storage classes can help optimize costs and performance. Review your storage needs and access patterns to select the most appropriate option.

## Conclusion

This tutorial has shown that setting the storage class is straightforward during the initial upload and can be easily adjusted later through the object properties in S3. Managing your storage class effectively can lead to significant cost savings and ensure that your data is stored appropriately based on its usage.

For more detailed information, please visit the [Amazon S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/55b5dc35-0154-4eed-89d1-751b50e7a101)**
>
> Watch video content
