# S3 Static Website Hosting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Storage/S3-Static-Website-Hosting)

---

## Table of Contents

- S3 Static Website Hosting
  - What Is a Website?
  - Enabling Static Website Hosting on S3
  - Pricing Considerations
  - Accessing Your Static Website
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Storage

# S3 Static Website Hosting

In this lesson, we explore how to host a static website on Amazon S3. With this service, you can transform an S3 bucket into a web server that serves static files such as HTML, CSS, JavaScript, and media assets.

## What Is a Website?

When a user enters a URL in a browser, an HTTP GET request is sent to a web server. The server then responds with an HTML file that the browser renders as a website. While an HTML file forms the core of any website, its look and functionality are enhanced by additional components:

- **HTML**: Provides the document structure and content.
- **CSS**: Improves visual styling with colors, layouts, and fonts.
- **JavaScript**: Adds dynamic behavior and interactivity.
- **Assets**: Includes images, videos, audio, and other media files.

![The image illustrates components of static hosting, including HTML for structure, CSS for visual elements, JavaScript for dynamic functionality, and media files like images, videos, and audio.](https://kodekloud.com/kk-media/image/upload/v1752866081/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting/static-hosting-components-html-css-js.jpg)

All these elements can be stored in an S3 bucket. Since S3 is designed for object storage, it can efficiently house and serve all files necessary for a static website.

## Enabling Static Website Hosting on S3

Amazon S3 supports static website hosting by offering a configuration option to serve all files (HTML, CSS, and JavaScript) over HTTP. Once you enable this option, S3 provides you with a URL to access your website.

> [!important]
> **Note**
>
> Static website hosting on S3 is ideal for sites without server-side processing. If you require dynamic functionality, consider services like [Amazon EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), [Amazon ECS](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs), or [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda).> [!important]
> **Warning**
>
> If you plan to use a custom domain (e.g., bestcars.com), ensure that your S3 bucket is named exactly as your custom domain.

![The image is an infographic about static hosting, explaining that it allows access to website files through HTTP and provides a URL via S3. It notes that this is used only for static websites and requires a specific format for domain customization.](https://kodekloud.com/kk-media/image/upload/v1752866083/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting/static-hosting-infographic-s3.jpg)

## Pricing Considerations

When hosting a static website on S3, you incur two main types of costs:

1.  **Storage and Data Transfer Fees**: Charged per gigabyte stored and for data transferred out.
2.  **HTTP Request Fees**: A minor fee is applied for each HTTP request, such as GET operations.

For instance, if you're using S3 Standard Infrequent Access (IA) and reviewing GET request pricing, you might pay around $0.0004 per thousand GET requests. It’s essential to consider these costs as part of your overall budget for hosting your static website on AWS.

![The image illustrates a pricing model for cloud services, showing costs per gigabyte for storage and egress, and per request, with icons representing storage and cloud services.](https://kodekloud.com/kk-media/image/upload/v1752866084/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting/cloud-services-pricing-model-diagram.jpg)

## Accessing Your Static Website

After enabling static website hosting, S3 generates a URL you can use to access your site. The URL follows this format:

```
http://bucketname.s3-website-<region-name>.amazonaws.com
```

Replace "bucketname" with your actual S3 bucket name and "<region-name>" with the AWS region where your bucket is hosted. By simply visiting this URL, users can access the hosted static website.

If you prefer to use a custom domain, you can integrate Amazon Route 53 with your S3 bucket to map your domain (for example, http://bestcars.com) directly to your hosted site.

![The image illustrates a process involving a custom domain name, showing a user, a Route 53 icon, a URL (http://bestcars.com), and a server, indicating a flow from the user to the server.](https://kodekloud.com/kk-media/image/upload/v1752866084/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting/custom-domain-process-user-server.jpg)

## Summary

- **S3 for Static Content**: Ideal for hosting static files such as HTML, CSS, JavaScript, and media.
- **Cost Factors**: Incur charges for storage, data transfer, and HTTP requests.
- **URL Structure**: When enabled, S3 provides a URL in the format:

  ```
  http://bucketname.s3-website-<region-name>.amazonaws.com
  ```

- **Custom Domain Setup**: To use your own domain (e.g., example.com), ensure your S3 bucket's name matches your domain name exactly.

![The image is a summary slide about using S3 for hosting static websites, highlighting key points such as limitations with server-side logic, cost considerations, URL access, and custom domain requirements.](https://kodekloud.com/kk-media/image/upload/v1752866085/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-S3-Static-Website-Hosting/s3-static-website-hosting-summary.jpg)

In summary, Amazon S3 static website hosting provides a cost-effective and scalable solution for serving static content. By understanding its configuration options, pricing models, and domain requirements, you can efficiently host and manage your static website on AWS.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/23e00d1f-6422-4fef-a9bf-e8f007be5514/lesson/9143b1a4-c743-458e-bab0-4bd3dc117ccb)**
>
> Watch video content
