# S3 Static Website Hosting Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Static-Website-Hosting-Demo)

---

## Table of Contents

- S3 Static Website Hosting Demo
  - Website File Structure
  - Uploading Files to S3
  - Enabling Static Website Hosting
  - Configuring Public Access
  - Verifying Your Website
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Static Website Hosting Demo

In this tutorial, you'll learn how to host a static website using Amazon S3. We'll cover everything from the website file structure to uploading your files and configuring public access. This guide assumes you have a basic static site that consists of an HTML file, a CSS file for styling, a custom 404 error page, and an images folder containing pictures of food.

## Website File Structure

Before uploading your site to S3, it’s important to familiarize yourself with the file structure. Below is an illustration of the website components:

![The image shows an AWS Console Home page with a Windows File Explorer window open, displaying a folder named "static-demo" containing files like "404.html," "index.css," and "index.html."](https://kodekloud.com/kk-media/image/upload/v1752866072/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/aws-console-windows-file-explorer-static-demo.jpg)

The main components include:

- **index.html**: The landing page that loads the CSS file and displays images.
- **index.css**: Contains the styling and visual presentation for the website.
- **404.html**: A custom error page shown when a user navigates to a non-existent page.
- **images folder**: Stores various food images referenced in the HTML file.

Below is an example of the main index file:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="index.css" />
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="images">
            <div class="image"><img src="images/food1.jpg" alt="" /></div>
            <div class="image"><img src="images/food2.jpg" alt="" /></div>
            <div class="image"><img src="images/food3.jpg" alt="" /></div>
            <div class="image"><img src="images/food4.jpg" alt="" /></div>
            <div class="image"><img src="images/food5.jpg" alt="" /></div>
            <div class="image"><img src="images/food6.jpg" alt="" /></div>
            <div class="image"><img src="images/food7.jpg" alt="" /></div>
            <div class="image"><img src="images/food8.jpg" alt="" /></div>
            <div class="image"><img src="images/food9.jpg" alt="" /></div>
            <div class="image"><img src="images/food10.jpg" alt="" /></div>
        </div>
    </div>
</body>
</html>
```

Similarly, the 404 error page is structured as follows:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="index.css" />
    <title>Document</title>
</head>
<body>
    <div class="container">
        <h1 class="head-404">404</h1>
        <h2 class="text-404">Page not found</h2>
    </div>
</body>
</html>
```

When users visit your website, the S3 bucket serves the `index.html` file by default, which in turn loads the necessary CSS and images. If a non-existent file is requested, the custom 404 page is returned.

## Uploading Files to S3

To get started, log in to the S3 console and create a new bucket for your static website.

1.  Create a new bucket (e.g., "static-demo") using the default settings.

    ![The image shows the AWS S3 console interface for creating a new bucket, with fields for bucket name, AWS region, and object ownership settings.](https://kodekloud.com/kk-media/image/upload/v1752866073/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/aws-s3-console-create-bucket.jpg)

2.  After creating the bucket, you will receive a confirmation notification.

    ![The image shows an Amazon S3 console with a notification of a successfully created bucket named "kk-static-demo." The interface displays bucket details such as name, AWS region, access, and creation date.](https://kodekloud.com/kk-media/image/upload/v1752866074/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/amazon-s3-bucket-creation-notification.jpg)

3.  Open the bucket and proceed to upload all website files, including HTML, CSS, the 404 error page, and the images folder. Note that the upload duration may vary based on file size and quantity.

    ![The image shows an AWS S3 console screen with a successful upload status for 13 files totaling 2.5 MB. The files include images and an HTML file, all marked as succeeded.](https://kodekloud.com/kk-media/image/upload/v1752866076/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/aws-s3-console-upload-success-13-files.jpg)

## Enabling Static Website Hosting

Once your files are uploaded, enable the static website hosting feature:

1.  Navigate to the **Properties** tab in your bucket.
2.  Scroll down to the **Static website hosting** section and click **Edit**.
3.  Select the "Host a static website" option.
4.  Configure the following settings:
    - **Index document**: Set this to `index.html` to serve as the homepage.
    - **Error document**: Set this to `404.html` to handle error messages.

Click **Save** to update your settings.

After saving, you will see a bucket website endpoint URL in the static website hosting section. This URL is how users will access your website.

![The image shows an Amazon S3 console page with settings for transfer acceleration, object lock, requester pays, and static website hosting. Static website hosting is enabled, and a bucket website endpoint URL is provided.](https://kodekloud.com/kk-media/image/upload/v1752866077/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/amazon-s3-console-settings-static-hosting.jpg)

> [!important]
> **Note**
>
> Clicking the website endpoint URL might initially result in an "Access Denied" error. This is expected until you configure public access.

## Configuring Public Access

To allow public access to your website, you'll need to adjust the bucket's permissions and include a bucket policy.

1.  Click on the **Permissions** tab and disable the "Block all public access" setting.

    ![The image shows an Amazon S3 console screen with settings for blocking public access to a bucket. The "Block all public access" option is turned on, and there is a note indicating that public access is blocked.](https://kodekloud.com/kk-media/image/upload/v1752866078/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/amazon-s3-block-public-access.jpg)

2.  Confirm your changes to allow public access.

    ![The image shows an AWS S3 settings page for editing block public access options for a bucket, with checkboxes for various access control settings.](https://kodekloud.com/kk-media/image/upload/v1752866080/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/aws-s3-block-public-access-settings.jpg)

Even after these changes, your bucket is not entirely public. You must add a proper bucket policy to permit public read (GetObject) access. Open the bucket policy editor and add the following policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublic",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

Replace "your-bucket-name" with the actual bucket name. This policy enables any user to read your files while preventing modifications or deletions.

After saving the policy, the bucket becomes publicly accessible.

## Verifying Your Website

Return to the **Properties** tab and check the **Static website hosting** section again. The provided URL should now load your website for public access.

- Navigating to the bucket URL without specifying a file returns the `index.html` automatically.
- You can access specific assets by appending their paths (for example, `/images/food1.jpg`) to the URL.
- If a user navigates to an invalid path, the custom `404.html` page will be shown.

![The image shows an Amazon S3 bucket interface with a list of objects, including HTML and CSS files, and a folder named "images/". The bucket is labeled "kk-static-demo" and is publicly accessible.](https://kodekloud.com/kk-media/image/upload/v1752866081/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting-Demo/amazon-s3-bucket-kk-static-demo.jpg)

This concludes the lesson on hosting a static website with Amazon S3. By following these steps, you can create a secure and publicly accessible static website with ease.

For more detailed information about AWS and static website hosting, refer to the [Amazon S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html).

Happy hosting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/e1e46244-1c8a-47a2-94b8-d4cba432b6c5)**
>
> Watch video content
