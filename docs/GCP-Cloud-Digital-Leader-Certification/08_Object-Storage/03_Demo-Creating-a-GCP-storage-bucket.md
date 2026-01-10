# Demo Creating a GCP storage bucket - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Object-Storage/Demo-Creating-a-GCP-storage-bucket)

---

## Table of Contents

- Demo Creating a GCP storage bucket
  - Verify Your Project in GCP Console
  - Access Cloud Storage
  - Create a New Storage Bucket
  - Configure Bucket Location and Storage Class
  - Enforce Public Access Prevention
  - Upload Files to Your New Bucket
  - Next Steps
  - Watch Video
    - Choose a Region
    - Select a Storage Class

---

## Content

GCP Cloud Digital Leader Certification

Object Storage

# Demo Creating a GCP storage bucket

Welcome to this guide on creating a Google Cloud Platform (GCP) Storage Bucket. In this walkthrough, you'll learn how to set up a storage bucket, review its key configuration settings, and understand best practices when managing your cloud storage.

## Verify Your Project in GCP Console

Start by confirming that you're working within the correct GCP project. In the console, you should see details similar to those in the image below:

![The image shows the Google Cloud Console interface for a project named "KodeKloud-GCP-Training," featuring options to create a VM, run a query in BigQuery, and other quick access tools.](https://kodekloud.com/kk-media/image/upload/v1752875357/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Creating-a-GCP-storage-bucket/google-cloud-console-kodekloud-training.jpg)

## Access Cloud Storage

In the GCP Console, search for “Cloud Storage” and select the corresponding option from the menu. This will navigate you to the storage buckets overview screen:

![The image shows the Google Cloud Console interface with a search for "cloud storage" displaying related options and documentation. The console is part of a project named "KodeKloud-GCP-Training."](https://kodekloud.com/kk-media/image/upload/v1752875359/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Creating-a-GCP-storage-bucket/google-cloud-console-cloud-storage.jpg)

Since there are no storage buckets listed yet, click on **Create Bucket** to get started.

## Create a New Storage Bucket

When creating a bucket, you need to provide a name. Remember, the bucket name must be globally unique, not just unique within your organization.

![The image shows a Google Cloud Platform interface for creating a storage bucket, with options to name the bucket, choose storage location, class, access control, and protection settings.](https://kodekloud.com/kk-media/image/upload/v1752875360/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Creating-a-GCP-storage-bucket/google-cloud-storage-bucket-interface.jpg)

> [!important]
> **Naming Tip**
>
> A helpful naming strategy is to start with your company prefix (e.g., "pharma") followed by a descriptor for its purpose (e.g., "store-data-information").

Once the name is set, click **Continue**. If the chosen name isn’t globally unique, GCP will alert you with an error, prompting you to try a different name.

## Configure Bucket Location and Storage Class

### Choose a Region

Select the region where your data will be stored. Depending on your compliance and data residency requirements, you might choose a specific region. Alternatively, you can opt for a **multi-region** setting if you want high availability by replicating data across multiple regions. For this demonstration, the multi-region option is selected. Click **Continue** after making your choice.

### Select a Storage Class

At this step, you choose a storage class that best meets your needs. Although we won’t dive deep into the different storage classes in this article, the default setting is sufficient for this demonstration. Move forward with the default options.

![The image shows a Google Cloud interface for creating a storage bucket, with options to choose storage location, default storage class, access control, and data protection settings.](https://kodekloud.com/kk-media/image/upload/v1752875362/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Creating-a-GCP-storage-bucket/google-cloud-storage-bucket-interface-2.jpg)

## Enforce Public Access Prevention

Before finalizing the creation, GCP displays an important warning regarding public access:

> [!important]
> **Security Warning**
>
> Exposing a bucket to the public internet can be risky because unauthorized users might gain access to your stored data. GCP recommends enabling the option "Enforce public access prevention on this bucket" to keep your data secure.

Check that the public access prevention setting is enabled and then click **Confirm**.

![The image shows a Google Cloud Storage interface where a user is creating a bucket with a pop-up message indicating that public access will be prevented. The user can choose to enforce public access prevention on the bucket.](https://kodekloud.com/kk-media/image/upload/v1752875363/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Creating-a-GCP-storage-bucket/google-cloud-storage-bucket-creation.jpg)

## Upload Files to Your New Bucket

After your bucket has been successfully created, you can start uploading files. The bucket supports various file types such as images, documents, and audio files. To upload, simply click on the **Upload** button and select either individual files or an entire folder from your laptop.

For this demonstration, the process of clicking **Upload Files** and selecting a file is illustrated below:

![The image shows a Google Cloud Storage interface displaying the details of a bucket named "pharma-store-data-information," which contains a text file named "11.txt" with no public access.](https://kodekloud.com/kk-media/image/upload/v1752875364/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Creating-a-GCP-storage-bucket/google-cloud-storage-pharma-store-bucket.jpg)

An important note is that the bucket and its contents are private by default. Only users with the necessary permissions can access the stored data.

## Next Steps

Once your bucket is set up and files are uploaded, you can leverage it for various live activities within your projects. Stay tuned as future guides will cover more advanced configurations and best practices.

Thank you for following along with this demo. For further information, check out:

- [Google Cloud Storage Documentation](https://cloud.google.com/storage/docs/)
- [GCP Security Best Practices](https://cloud.google.com/security)

Happy cloud computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/3bb690eb-cb02-483e-a380-0a7231ba9480/lesson/165e4981-352c-47ec-95ec-adb84be0694d)**
>
> Watch video content
