# S3 Storage Classes Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Storage-Classes-Demo)

---

## Table of Contents

- S3 Storage Classes Demo
  - Creating an S3 Bucket
  - Uploading a File and Setting the Storage Class
  - Modifying the Storage Class of an Existing File
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Storage Classes Demo

In this guide, you'll learn how to set the storage class when uploading a file to [Amazon S3](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3) and modify the storage class for an existing file.

## Creating an S3 Bucket

First, create a new S3 bucket. For demonstration purposes, we will name the bucket **"kk-sc-demo"** and use the default configuration settings.

## Uploading a File and Setting the Storage Class

After creating the bucket, click on **Upload** to add a file. Select any file from your local system. As you proceed with the upload process, navigate to the **Properties** section. Here you can set the desired storage class. By default, the storage class is set to **"Standard."**

![The image shows an Amazon S3 console screen displaying different storage class options, including Standard, Intelligent-Tiering, and Glacier, with details on their designed use, availability zones, and minimum storage duration.](https://kodekloud.com/kk-media/image/upload/v1752859804/notes-assets/images/AWS-Certified-Developer-Associate-S3-Storage-Classes-Demo/amazon-s3-storage-classes-console.jpg)

For this demonstration, choose **"One Zone-Infrequent Access"** as the storage class. Once selected, click **Upload** to complete the process.

> [!important]
> **Tip**
>
> After uploading, verify that the file's storage class is set to **"One Zone-Infrequent Access"** by checking the file details in the S3 console.

## Modifying the Storage Class of an Existing File

If you wish to change the storage class after the file has been uploaded, follow these steps:

1.  Navigate to the file's **Properties** tab in the Amazon S3 console.
2.  Locate the storage class section.
3.  Select the new storage class (for example, **"Standard"**) from the options provided.

![The image shows an Amazon S3 console interface displaying details of an object named "beach1.jpg," including its properties like size, type, and last modified date.](https://kodekloud.com/kk-media/image/upload/v1752859805/notes-assets/images/AWS-Certified-Developer-Associate-S3-Storage-Classes-Demo/amazon-s3-console-beach1-details.jpg)

This process ensures you can easily manage and modify the storage class of your objects within Amazon S3, based on your evolving requirements.

> [!important]
> **Note**
>
> Remember that each S3 storage class is optimized for different use cases. Choose the class that best meets your performance, durability, and cost requirements.

By following these steps, you can effectively set and modify storage classes in Amazon S3, ensuring that your data is stored in the most cost-effective and efficient manner according to your needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/43b421b1-46c9-487d-aee9-673083aabe6f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/2e4d78c1-4cb5-49ab-9420-ab343579790a)**
>
> Practice lab
