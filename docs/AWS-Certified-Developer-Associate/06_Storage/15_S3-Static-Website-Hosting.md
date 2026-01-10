# S3 Static Website Hosting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Storage/S3-Static-Website-Hosting)

---

## Table of Contents

- S3 Static Website Hosting
  - Understanding Websites and Static Content
  - Enabling Static Website Hosting on S3
  - Pricing Considerations
  - Accessing Your Static Website
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Storage

# S3 Static Website Hosting

In this lesson, we explore how to use [Amazon S3](https://learn.kodekloud.com/user/courses/amazon-simple-storage-service-amazon-s3) for static website hosting. By uploading your website files into an S3 bucket, you can transform it into a fully functional web server.

## Understanding Websites and Static Content

When a user visits a URL, the browser sends an HTTP GET request to a web server, which responds with an HTML file that the browser renders. A complete website typically includes:

- **HTML:** Structures your content.
- **CSS:** Styles and formats the display.
- **JavaScript:** Adds dynamic functionality.
- **Assets:** Incorporates images, videos, audio, and other media.

![The image illustrates components of static hosting, including HTML for structure, CSS for visual elements, JavaScript for dynamic functionality, and media files like images, videos, and audio.](https://kodekloud.com/kk-media/image/upload/v1752859798/notes-assets/images/AWS-Certified-Developer-Associate-S3-Static-Website-Hosting/static-hosting-components-html-css-js.jpg)

Since S3 can store all these elements as objects, you can host an entire website simply by uploading the necessary files to your bucket.

## Enabling Static Website Hosting on S3

S3 allows you to serve static websites by hosting your HTML, CSS, and JavaScript files. Once you enable static website hosting, S3 provides a URL that grants HTTP access to your site.

> [!important]
> **Static Content Only**
>
> S3 static website hosting is designed solely for static content. If your website requires server-side processing or dynamic content rendering, consider using services like [Amazon EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), [Amazon ECS](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs), or [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda).

For those wishing to leverage a custom domain instead of the S3-provided URL, note that your bucket must be named exactly as your custom domain. For example, for the domain **bestcars.com**, your S3 bucket should also be named **bestcars.com**.

![The image is an infographic about static hosting, explaining that it allows access to website files through HTTP and provides a URL via S3. It includes a note about usage for static websites and domain customization requirements.](https://kodekloud.com/kk-media/image/upload/v1752859799/notes-assets/images/AWS-Certified-Developer-Associate-S3-Static-Website-Hosting/static-hosting-infographic-s3.jpg)

## Pricing Considerations

When hosting a static website on S3, you incur standard S3 fees, which include:

- **Storage Costs:** Charged per gigabyte of stored data.
- **Data Transfer Costs:** Charged per gigabyte for outbound data.
- **Per Request Charges:** Each HTTP request (e.g., GET) is billed at a minimal rate (e.g., $0.0004 per 1,000 GET requests at the time of recording).

![The image illustrates a pricing model for storage and requests, showing two user icons with arrows pointing to storage and server icons, labeled with "Price/GB (storage)", "Price/GB (egress)", and "Per request".](https://kodekloud.com/kk-media/image/upload/v1752859800/notes-assets/images/AWS-Certified-Developer-Associate-S3-Static-Website-Hosting/pricing-model-storage-requests-diagram.jpg)

## Accessing Your Static Website

Once static website hosting is enabled, your S3 bucket provides an access URL with the following pattern:

```
http://bucketname.s3-website-<region-name>.amazonaws.com
```

For instance, if your bucket is named "mybucket" in the us-east-1 region, your website URL will be:

```
http://mybucket.s3-website-us-east-1.amazonaws.com
```

If you opt for a custom domain to create a more memorable URL, set up Amazon Route 53 and ensure that your bucket name exactly matches your domain (for example, **bestcars.com**).

![The image illustrates a process involving a custom domain name, showing a user, a Route 53 icon, a URL (http://bestcars.com), and a server.](https://kodekloud.com/kk-media/image/upload/v1752859801/notes-assets/images/AWS-Certified-Developer-Associate-S3-Static-Website-Hosting/custom-domain-route53-process-diagram.jpg)

## Summary

Amazon S3 static website hosting enables you to serve your static website files—HTML, CSS, JavaScript, and media—directly from an S3 bucket. Key takeaways include:

1.  S3 static website hosting is intended for static content only; server-side logic isn't supported.
2.  Standard S3 pricing applies, covering storage, data transfer, and per-request fees.
3.  The provided URL format is:

    ```
    http://bucketname.s3-website-<region-name>.amazonaws.com
    ```

4.  To use a custom domain, the bucket must have the same name as the domain, with Amazon Route 53 facilitating DNS routing.

![The image is a summary slide about using S3 for hosting static websites, detailing costs, URL access, and domain requirements. It includes four key points with numbered icons.](https://kodekloud.com/kk-media/image/upload/v1752859802/notes-assets/images/AWS-Certified-Developer-Associate-S3-Static-Website-Hosting/s3-static-website-hosting-summary.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/e8ae2293-e16b-42d3-b32b-5c260a1f1e5d/lesson/dce1c4fe-6d49-4bbd-a992-c6e9a886a44d)**
>
> Watch video content
