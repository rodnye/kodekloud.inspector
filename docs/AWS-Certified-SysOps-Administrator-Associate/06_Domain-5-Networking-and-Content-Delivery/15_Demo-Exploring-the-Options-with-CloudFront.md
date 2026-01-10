# Demo Exploring the Options with CloudFront - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Demo-Exploring-the-Options-with-CloudFront)

---

## Table of Contents

- Demo Exploring the Options with CloudFront
  - Creating a CloudFront Distribution
  - Configuring Additional Settings
  - Cache Keys and Origin Requests
  - Customizing Distribution Properties
  - Managing Origins and Behaviors
  - Handling Invalidations and Tags
  - Monitoring and Metrics
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Demo Exploring the Options with CloudFront

Welcome everyone, this is Michael Forrester.

In this lesson, we explore the range of settings available when creating a CloudFront distribution. CloudFront offers a variety of features—from built-in functions for request manipulation and telemetry to advanced logging, analytics, and enhanced security features such as origin security and field-level encryption. Today, we will focus on the core distribution options.

## Creating a CloudFront Distribution

Let's start by creating a new CloudFront distribution. Although I have several distributions already configured, I'll build one from scratch for this demonstration. When selecting an origin, you can choose from multiple sources, including Amazon S3 buckets, load balancers, and more. In this example, we'll select a web Application Load Balancer (ALB) configured for secure connections.

![The image shows an AWS CloudFront interface where a user is creating a distribution and selecting an origin domain from a list of Amazon S3 buckets.](https://kodekloud.com/kk-media/image/upload/v1752860823/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-distribution-s3-buckets.jpg)

During configuration, you can set the origin path. For instance, adding "/mobile" might indicate that this distribution serves a mobile site exclusively. With the load balancer selected, the DNS name is auto-populated. You can also modify headers and enable Origin Shield, which adds an extra cache layer near the edge. This additional layer can substantially improve availability, especially for static websites.

![The image shows an AWS CloudFront configuration screen where settings for an origin path, name, and additional options like enabling Origin Shield and connection attempts are being configured.](https://kodekloud.com/kk-media/image/upload/v1752860824/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-configuration-screen.jpg)

## Configuring Additional Settings

Several settings can be fine-tuned during setup, including:

- **Timeouts and Connection Attempts:** Adjust these parameters as necessary.
- **Protocol Enforcement and SSL/TLS Versions:** Specify the origin domain, enforce protocols (or allow matching viewer protocols), and choose SSL/TLS versions.
- **Path Patterns, Custom Headers, and Viewer Protocol Policies:** Set up default or custom path patterns (e.g., for JPEGs or HTML files) and configure policies to force redirection from HTTP to HTTPS.

![The image shows an AWS CloudFront settings page, where options for viewer protocol policy and allowed HTTP methods are being configured.](https://kodekloud.com/kk-media/image/upload/v1752860825/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-settings-viewer-policy.jpg)

By default, CloudFront captures GET and HEAD requests, but you can enable other HTTP methods if needed. You also have the choice to use signed URLs or signed cookies to restrict access.

## Cache Keys and Origin Requests

Beyond viewer settings, you can configure cache keys and origin requests. By setting up a cache policy, CloudFront can forward viewer request parameters to your Elastic Load Balancer, enhancing load balancing efficiency.

![The image shows a section of the AWS CloudFront console, specifically focusing on cache key and origin request settings, with options for cache policy and origin request policy.](https://kodekloud.com/kk-media/image/upload/v1752860826/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-cache-key-settings.jpg)

Additional advanced settings include:

- Leveraging Origin Cache Control headers.
- Defining response header policies for cross-origin resource sharing (CORS).
- Enabling support for smooth streaming in IIS.
- Configurations for field-level encryption, real-time logs, and CloudFront functions.

> [!important]
> **Note**
>
> Enhance your CloudFront distribution security further by integrating AWS WAF (Web Application Firewall). While we are not configuring WAF in this demo, its SQL protections, rate limiting, and other security measures can significantly bolster your security posture.

![The image shows an AWS Web Application Firewall (WAF) configuration page, where security protections can be enabled or disabled, with options for additional protections like SQL and rate limiting.](https://kodekloud.com/kk-media/image/upload/v1752860827/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-waf-configuration-page.jpg)

## Customizing Distribution Properties

You can also refine your distribution by choosing which edge locations to utilize. By default, CloudFront serves all available locations, but you can restrict them to specific regions (e.g., North America and Europe) to enhance performance for users in targeted areas without significantly increasing costs.

Other customization options include:

- Adding alternate domain names (CNAMEs).
- Attaching your own SSL certificate (note that AWS Certificate Manager certificates must reside in Virginia).
- Configuring settings for newer HTTP versions, default root objects, centralized logging (with bucket and prefix configurations), and IPv6.

![The image shows an AWS settings page for configuring a distribution, including options for price class, alternate domain names, custom SSL certificates, and supported HTTP versions.](https://kodekloud.com/kk-media/image/upload/v1752860829/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-distribution-settings-page.jpg)

Once active, CloudFront automatically handles scaling. To demonstrate, let's examine an existing configuration with an origin signature. The provided DNS name is used to redirect users—via a CNAME or other redirection method—to the nearest CloudFront edge location.

The example distribution features standard logging, disabled cookie logging, basic security settings (with WAF and geographic restrictions turned off), and a simple setup. Geographic restrictions can be added later using an allowlist or blocklist.

![The image shows an AWS CloudFront security settings page, specifically for Web Application Firewall (WAF) configurations, with options for core protections, SQL protections, and rate limiting, all currently disabled. There are also options for CloudFront geographic restrictions.](https://kodekloud.com/kk-media/image/upload/v1752860830/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-waf-settings-disabled.jpg)

## Managing Origins and Behaviors

CloudFront allows multiple origin configurations or origin groups that define primary and secondary failover behaviors.

![The image shows an AWS CloudFront console page displaying the "Origins" tab for a specific distribution, with options to edit, delete, or create origins and origin groups.](https://kodekloud.com/kk-media/image/upload/v1752860831/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-origins-tab-console.jpg)

Custom behaviors can direct some requests over HTTP while forcing HTTPS for others, depending on your application needs.

![The image shows an AWS CloudFront distribution settings page, specifically the "Behaviors" tab, displaying a default behavior with settings for path pattern, origin, and protocol policy.](https://kodekloud.com/kk-media/image/upload/v1752860832/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-behaviors-settings.jpg)

You can also define custom error pages (for example, a tailored 404 response) to provide a better user experience during errors.

![The image shows an AWS CloudFront interface for creating a custom error response, with a dropdown menu listing various HTTP error codes like 400, 403, and 404.](https://kodekloud.com/kk-media/image/upload/v1752860834/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-custom-error-response.jpg)

## Handling Invalidations and Tags

Invalidations let you remove objects from the CloudFront cache if assets are updated. However, note that invalidations carry costs and impact your entire distribution. A more efficient approach is to version your assets (for example, picture_101.jpg, picture_102.jpg) when updates occur.

![The image shows an AWS CloudFront interface for creating an invalidation, where users can add object paths to remove from the cache. There are options to cancel or create the invalidation.](https://kodekloud.com/kk-media/image/upload/v1752860835/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-invalidation-interface.jpg)

Tags can be applied to CloudFront distributions to help organize and manage your AWS resources efficiently.

## Monitoring and Metrics

Once the distribution is active, navigate to the metrics dashboard to review key performance indicators, such as hit rates, request counts, and error rates. Even if no data appears immediately, this dashboard provides valuable insights as traffic increases. Metrics for CloudFront functions or Lambda@Edge events will also be displayed here.

![The image shows an AWS CloudFront monitoring dashboard with graphs for requests, data transfer, and error rates, all displaying "No data available." The sidebar includes options for telemetry, reports, analytics, and security settings.](https://kodekloud.com/kk-media/image/upload/v1752860836/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Exploring-the-Options-with-CloudFront/aws-cloudfront-monitoring-dashboard.jpg)

## Conclusion

This lesson has detailed the extensive configuration options available with CloudFront distributions. Key points include:

- A multitude of security features, such as field-level encryption and AWS WAF integration.
- Flexibility in choosing origins, path patterns, and caching policies.
- The ease of scaling distributions and the ability to customize error responses and behaviors.
- Robust monitoring capabilities to keep track of distribution performance.

> [!important]
> **Final Note**
>
> CloudFront offers a comprehensive and secure content delivery solution that is highly adaptable to your website, API, and web server needs. Experiment with these settings to optimize performance and security for your audience.

That's it for this lesson. We'll catch you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/da045c8f-50bf-4d6d-bca7-3b36f02d8aa4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/42c8ed5b-4d28-4f38-846f-563d70d2000f)**
>
> Practice lab
