# CloudFront Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Edge-Networks/CloudFront-Demo)

---

## Table of Contents

- CloudFront Demo
  - Prerequisites
  - Project Structure
  - 1. Create and Configure an S3 Bucket
  - 2. Secure Bucket Access
  - 3. Create a CloudFront Distribution
  - 4. Apply an S3 Bucket Policy for CloudFront
  - 5. Validate Your Distribution
  - 6. Review and Customize Cache Settings
  - 7. Invalidate Cached Objects
  - Next Steps
  - References
  - Watch Video
  - Practice Lab
    - Why Set a Default Root Object?

---

## Content

AWS Networking Fundamentals

Edge Networks

# CloudFront Demo

In this tutorial, we’ll walk through how to serve a simple static website (HTML, CSS, images) from Amazon S3 and accelerate it globally with Amazon CloudFront. You’ll learn how to:

1.  Set up an S3 bucket and upload your assets
2.  Secure S3 with a bucket policy for CloudFront access
3.  Create and configure a CloudFront distribution
4.  Customize caching behavior and invalidate objects

## Prerequisites

- An AWS account with IAM permissions for S3 and CloudFront
- A local project folder containing:
  - `index.html`
  - `index.css`
  - `images/` (your asset directory)

## Project Structure

Here’s our local directory layout. It contains an HTML page, a CSS stylesheet, and an images folder:

![The image shows an AWS Console Home page with a file explorer window open, displaying a folder named "cloudfront" containing an HTML file, a CSS file, and an images folder.](https://kodekloud.com/kk-media/image/upload/v1752863385/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-console-file-explorer-cloudfront.jpg)

All assets will reside in an S3 bucket. CloudFront will then cache these files at edge locations to minimize latency for end users.

---

## 1\. Create and Configure an S3 Bucket

1.  Open the [Amazon S3 console](https://console.aws.amazon.com/s3/), then click **Create bucket**.
2.  Enter a globally unique name (e.g., `kodekloud-cloudfront-demo`), leave other settings at their defaults, and click **Create bucket**.

![The image shows an AWS S3 interface for creating a new bucket, with options for general configuration, bucket type, and object ownership settings. The bucket name "kodekloud-cloudfront-demo" is entered in the text field.](https://kodekloud.com/kk-media/image/upload/v1752863386/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-s3-create-bucket-interface.jpg)

After creation, verify your bucket appears in the list:

![The image shows an AWS S3 management console with a list of general-purpose buckets, their regions, and creation dates. A green notification at the top indicates the successful creation of a bucket named "kodekloud-cloudfront-demo."](https://kodekloud.com/kk-media/image/upload/v1752863388/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-s3-management-console-buckets-list.jpg)

3.  Click on your bucket name, then choose **Upload**. Add `index.html`, `index.css`, and the entire `images` folder.

---

## 2\. Secure Bucket Access

By default, S3 blocks public access to buckets:

![The image shows an AWS S3 bucket permissions settings page, highlighting options for blocking public access and managing bucket policies.](https://kodekloud.com/kk-media/image/upload/v1752863389/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-s3-bucket-permissions-settings.jpg)

> [!important]
> **Warning**
>
> Do not disable **Block Public Access**. Instead, grant CloudFront permission via a bucket policy in Step 4.

---

## 3\. Create a CloudFront Distribution

1.  Navigate to the [CloudFront console](https://console.aws.amazon.com/cloudfront/), then click **Create distribution** → **Get started** under **Web**.
2.  For **Origin domain**, select your S3 bucket (`kodekloud-cloudfront-demo`).
3.  Leave **Origin path** blank unless you want to serve a subdirectory. Use the default Origin ID or customize it.

![The image shows a screenshot of the AWS CloudFront console, specifically the "Create distribution" page where the user is configuring the origin settings for a distribution.](https://kodekloud.com/kk-media/image/upload/v1752863390/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-cloudfront-create-distribution-screenshot.jpg)

Scroll to other settings—most can remain at their defaults:

- Web Application Firewall: **Disabled**
- Price Class: **Use all edge locations (Best Performance)**
- SSL Certificate: **Default CloudFront certificate (\*.cloudfront.net)**
- Default Root Object: **index.html**

![The image shows a configuration page for creating a CloudFront distribution on the AWS Management Console, with options for SSL certificates, HTTP versions, logging, and IPv6 settings.](https://kodekloud.com/kk-media/image/upload/v1752863391/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/cloudfront-distribution-configuration-aws.jpg)

### Why Set a Default Root Object?

When you request the root of a distribution (`/`), CloudFront needs to know which file to serve. By setting **Default Root Object** to `index.html`, you avoid typing the full filename in the URL.

![The image shows an Amazon S3 bucket interface with three objects: a folder named "images" and two files, "index.css" and "index.html," along with their details like type, last modified date, size, and storage class.](https://kodekloud.com/kk-media/image/upload/v1752863392/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/amazon-s3-bucket-interface-objects.jpg)

Ensure **Default Root Object** is `index.html`:

![The image shows a configuration page for creating a CloudFront distribution on AWS, with options for SSL certificates, HTTP versions, and logging settings.](https://kodekloud.com/kk-media/image/upload/v1752863393/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/cloudfront-distribution-configuration-aws-2.jpg)

4.  Click **Create distribution**. Distribution creation can take several minutes.

![The image shows an AWS CloudFront distribution page with a notification about a successfully created distribution and a warning to update the S3 bucket policy. It includes details like the distribution domain name and settings.](https://kodekloud.com/kk-media/image/upload/v1752863394/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-cloudfront-distribution-notification.jpg)

> [!important]
> **Note**
>
> CloudFront distributions typically deploy within 10–20 minutes. You’ll know it’s ready when the status changes to **Enabled**.

---

## 4\. Apply an S3 Bucket Policy for CloudFront

To allow CloudFront to fetch objects without making the bucket public:

1.  In the CloudFront console, click the **Copy Policy** link from the warning banner.
2.  Go back to your S3 bucket’s **Permissions** tab → **Bucket policy** → **Edit**.
3.  Paste and save the following JSON (replace `kodekloud-cloudfront-demo` with your bucket name):

```
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::kodekloud-cloudfront-demo/*"
    }
  ]
}
```

If you wish to lock it down to a specific distribution, add a `Condition` block with your Distribution ARN:

```
"Condition": {
  "StringEquals": {
    "AWS:SourceArn": "arn:aws:cloudfront:841860927337:distribution/E2D1BKS7RKY1GR"
  }
}
```

---

## 5\. Validate Your Distribution

Once the distribution status is **Enabled**, copy its **Domain Name** (e.g., `d111111abcdef8.cloudfront.net`) and open it in a browser with a trailing slash:

```
https://d111111abcdef8.cloudfront.net/
```

- **First request:** CloudFront fetches content from S3.
- **Subsequent requests:** Content is served from the nearest edge location.

---

## 6\. Review and Customize Cache Settings

By default, CloudFront applies the **Managed-CachingOptimized** policy with a 24 hour (86,400 s) TTL.

1.  In your distribution, go to the **Behaviors** tab and click **Edit** on the default behavior.
2.  Note the **Cache policy** in use (e.g., `Managed-CachingOptimized`).
3.  Click **View policy** to inspect TTL values:

![The image shows the settings page of an AWS CloudFront distribution, displaying options for path patterns, origin groups, compression, viewer protocol policy, allowed HTTP methods, and cache key and origin requests.](https://kodekloud.com/kk-media/image/upload/v1752863395/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-cloudfront-settings-page-options.jpg)

![The image shows an AWS CloudFront settings page for a caching policy named "Managed-CachingOptimized," detailing TTL settings, cache key settings, and compression support options.](https://kodekloud.com/kk-media/image/upload/v1752863396/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-cloudfront-managed-caching-policy-settings.jpg)

| Setting             | Default                  | Description                                |
| ------------------- | ------------------------ | ------------------------------------------ |
| Price Class         | All edge locations       | Global performance vs. cost.               |
| Default Root Object | index.html               | Serves root URL without a filename.        |
| Cache Policy        | Managed-CachingOptimized | TTL: 86,400 s (min/max can be customized). |
| SSL Certificate     | Default CloudFront cert  | HTTPS support for `*.cloudfront.net`.      |

---

## 7\. Invalidate Cached Objects

When you overwrite a file in S3 (e.g., update `images/car.jpg`), CloudFront may still serve the old version until its TTL expires:

![The image shows an AWS S3 bucket permissions page for "kodekloud-cloudfront-demo," highlighting settings for blocking public access and bucket policy options.](https://kodekloud.com/kk-media/image/upload/v1752863397/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-s3-bucket-permissions-kodekloud.jpg)

To force CloudFront to fetch the updated file:

1.  In the CloudFront console, select your distribution and open **Invalidations**.
2.  Click **Create invalidation**, then specify paths:

    ```
    /images/car.jpg
    /images/*
    /*
    ```

    Use wildcards to cover multiple objects.

![The image shows an AWS CloudFront distribution settings page, specifically the "Behaviors" tab, displaying a default behavior configuration with options for creating and editing behaviors.](https://kodekloud.com/kk-media/image/upload/v1752863398/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-cloudfront-behaviors-settings-page.jpg)

![The image shows an AWS CloudFront interface where a user is creating an invalidation by adding object paths to remove from the CloudFront cache.](https://kodekloud.com/kk-media/image/upload/v1752863399/notes-assets/images/AWS-Networking-Fundamentals-CloudFront-Demo/aws-cloudfront-invalidation-object-paths.jpg)

3.  Click **Create invalidation**. Once it completes, refresh your distribution URL to see the new image.

> [!important]
> **Warning**
>
> Invalidations may incur additional charges if you exceed the free tier (1,000 paths/month).

---

## Next Steps

You’ve successfully deployed a static website with S3 and CloudFront. In future lessons, we’ll cover:

- Custom cache-key and origin-request policies
- Geographic restrictions and geo-blocking
- Using Lambda@Edge for dynamic content transformations

---

## References

- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/index.html)
- [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/)
- [How CloudFront Caching Works](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/d31cb856-303b-4a11-b280-b8729906670b/lesson/bdbb21b3-aeb7-4e93-bee5-b0f6143c3d31)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/d31cb856-303b-4a11-b280-b8729906670b/lesson/673352ab-7c79-42aa-a62a-f9e64f8b60b0)**
>
> Practice lab
