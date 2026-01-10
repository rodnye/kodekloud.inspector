# Configuring Amazon S3 for Hosting Static Sites - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Configuring-Amazon-S3-for-Hosting-Static-Sites)

---

## Table of Contents

- Configuring Amazon S3 for Hosting Static Sites
  - Overview
  - Setting Up the S3 Bucket
  - Enabling Static Website Hosting
  - Configuring Bucket Policies for Public Access
  - Adding a Custom Domain
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Configuring Amazon S3 for Hosting Static Sites

Welcome to this lesson on configuring Amazon S3 for static website hosting. In this guide, you will learn how to set up an S3 bucket to serve static content such as HTML, CSS, JavaScript, images, and more. This method helps you deploy websites without managing servers or using services like AWS App Runner.

![The image discusses hosting static websites on S3, featuring icons for HTML, CSS, and JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752860777/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/s3-hosting-static-websites-html-css-js.jpg)

## Overview

The process to host your static site on Amazon S3 includes the following steps:

1.  Create an S3 bucket with a globally unique name.
2.  Upload your website files (at a minimum, index.html and error.html).
3.  Configure a bucket policy to allow public access.
4.  Enable static website hosting on the bucket.
5.  Optionally, set up a custom domain using Route 53 or another DNS provider.
6.  Test the hosted website.

![The image outlines five steps for configuring Amazon S3 to host static sites: creating an S3 bucket, uploading website files, setting a bucket policy for public access, using a custom domain with Route 53, and testing the website.](https://kodekloud.com/kk-media/image/upload/v1752860779/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/amazon-s3-static-site-setup.jpg)

## Setting Up the S3 Bucket

When you create your S3 bucket (for example, "KodeKloud"), remember that the bucket name must be globally unique—Amazon S3 verifies that your chosen name is not already in use across all AWS accounts. If you plan to host your site publicly, make sure you deselect the option to block all public access.

![The image provides instructions for creating an S3 bucket, emphasizing the need for a unique bucket name and adjusting public access settings. It includes a graphic of a bucket with shapes and text detailing the steps.](https://kodekloud.com/kk-media/image/upload/v1752860780/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/s3-bucket-creation-instructions.jpg)

You can also configure additional features such as local encryption or bucket versioning. After completing the configuration, upload your website files. Ensure that the main files are correctly named (typically, index.html and error.html) or that they are properly designated in your website configuration.

![The image shows icons for two website files, "Index.html" and "error.html," with a title "Uploading Website Files."](https://kodekloud.com/kk-media/image/upload/v1752860781/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/uploading-website-files-icons.jpg)

## Enabling Static Website Hosting

Once your website files are in place, the next step is to enable static website hosting on your bucket. In the setup, you need to specify:

- The index document (commonly index.html).
- The error document (often error.html).
- Any redirection rules if needed.

After enabling static hosting, your bucket generates a URL endpoint, which may appear in formats such as:

- kodekloudbucket.s3-website-region.amazonaws.com
- kodekloudbucket.s3-website.\[region\].amazonaws.com

While these URL variations are informative, focus on understanding the overall configuration process.

![The image shows options for enabling static website hosting, with choices to host a static website or redirect requests for an object.](https://kodekloud.com/kk-media/image/upload/v1752860782/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/static-website-hosting-options.jpg)

In some cases, you might need to specify protocol settings (HTTP or HTTPS). Although HTTPS is widely adopted today, earlier implementations required the use of CloudFront to enforce HTTPS redirection. CloudFront remains a popular option as a CDN for S3-hosted websites due to its advanced redirection capabilities, although other third-party solutions can be used as well.

![The image is a screenshot showing settings for enabling static website hosting, including fields for specifying an index document, an optional error document, and optional redirection rules.](https://kodekloud.com/kk-media/image/upload/v1752860784/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/static-website-hosting-settings-screenshot.jpg)

![The image shows a configuration screen for enabling static website hosting, with options to host a static website or redirect requests, and fields for host name and protocol selection.](https://kodekloud.com/kk-media/image/upload/v1752860785/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/static-website-hosting-configuration.jpg)

## Configuring Bucket Policies for Public Access

By default, objects within an S3 bucket are set to private. To make your website files publicly accessible, you'll need to attach a resource-based bucket policy. Below is an example policy that grants public read access:

```
{
  "Version": "2012-10-17",
  "Id": "Policy1725703857393",
  "Statement": [
    {
      "Sid": "Stmt1725703855018",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::kodekloudbucket/*"
    }
  ]
}
```

> [!important]
> **Note**
>
> This is a resource-based policy attached directly to the S3 bucket. In contrast, identity-based policies (which do not include the "Principal" element) are associated with IAM identities.

## Adding a Custom Domain

To map your static website to a custom domain (for example, example.com), follow these steps:

1.  Create a hosted zone in Amazon Route 53 (or use your DNS provider).
2.  Publish the hosted zone and configure it to match your S3 bucket.
3.  In Route 53, create an A record with an alias that directs your naked domain (example.com) to the S3 website endpoint.

If you are using CloudFront for additional caching or HTTPS redirection, you may opt to create a CNAME record pointing to the CloudFront distribution. However, when using naked domains, the A record with an alias is the recommended solution.

![The image is a diagram illustrating the process of using a custom domain with Amazon Route 53, showing the flow from a user to a website endpoint via Route 53 and AWS S3.](https://kodekloud.com/kk-media/image/upload/v1752860786/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Configuring-Amazon-S3-for-Hosting-Static-Sites/custom-domain-amazon-route53-diagram.jpg)

## Conclusion

This lesson has guided you through the process of hosting a static website on Amazon S3. By following these steps—bucket creation, file upload, public access configuration, static website hosting setup, and custom domain integration—you can deploy a cost-effective and scalable website on AWS.

For further details and extended examples, additional resources are available. Happy hosting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/0be83cd6-38ee-4443-9e16-9e29eff94794)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/8994655c-37f7-400f-8533-9c7e85d5d917)**
>
> Practice lab
