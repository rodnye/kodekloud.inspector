# Cache Key Caching Policies Cache Behavior Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/CDNs-CloudFront/Cache-Key-Caching-Policies-Cache-Behavior-Demo)

---

## Table of Contents

- Cache Key Caching Policies Cache Behavior Demo
  - Default Behavior Overview
  - Customizing Cache Policies and Origin Request Settings
  - Creating a New Behavior
  - Example XML Error Response
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

CDNs CloudFront

# Cache Key Caching Policies Cache Behavior Demo

In this article, we explore how Amazon CloudFront caching works with an emphasis on cache behaviors and their configuration. By following these steps, you can optimize content delivery and tailor caching based on your application’s requirements.

## Default Behavior Overview

Begin by navigating to the behaviors section of your CloudFront distribution. Initially, you will see a single behavior that was automatically created when you set up the distribution. This behavior acts as a default or catch-all configuration—any request that doesn't match a more specific behavior (if defined) will follow this configuration.

Click on **Edit** to inspect the configuration details. For the default catch-all behavior, CloudFront uses an Amazon S3 bucket as its origin.

![The image shows an AWS CloudFront "Edit behavior" settings page, where options like path pattern, origin, compression, and viewer protocol policy are configured.](https://kodekloud.com/kk-media/image/upload/v1752858455/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior-Demo/aws-cloudfront-edit-behavior-settings.jpg)

Apart from basic settings like compression and viewer protocol policy, the primary focus is on the cache key and origin request settings. Notice that the cache policy is a managed policy provided by AWS called **CachingOptimized**. This policy includes various Time-to-Live (TTL) settings:

- **Minimum TTL:** Set to 1 second.
- **Default TTL:** Configured at 24 hours.
- **Maximum TTL:** Defined as per the policy details (refer to the image for specifics).

Additionally, the cache key settings in this case are configured to "all none," including compression support options for Gzip and Brotli.

![The image shows an AWS CloudFront console page displaying a caching policy named "Managed-CachingOptimized." It includes details about TTL settings, cache key settings, and compression support for Gzip and Brotli.](https://kodekloud.com/kk-media/image/upload/v1752858457/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior-Demo/aws-cloudfront-caching-policy-diagram.jpg)

> [!important]
> **Note**
>
> If you need to customize your caching behavior, you can create your own cache policy by returning to this section and selecting **Create Cache Policy**.

## Customizing Cache Policies and Origin Request Settings

When creating a custom cache policy, you can define a policy name, set desired TTL values, and specify which request elements (cache keys) should be included. For instance, you might choose to add headers like **Authorization** or **Host** as cache keys, or include specific query strings (e.g., for sorting or filtering on a shopping website) or cookies.

![The image shows a screenshot of the AWS CloudFront console, specifically the "Cache key settings" page, where headers and query strings are being configured.](https://kodekloud.com/kk-media/image/upload/v1752858458/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior-Demo/aws-cloudfront-cache-key-settings.jpg)

Once the cache policy is configured, you can also set up an optional origin request policy. This policy is useful when your origin requires extra details about the original request, such as additional headers, specific query strings, or cookies.

![The image shows an AWS CloudFront console screen where a user is configuring an origin request policy, including settings for headers and query strings.](https://kodekloud.com/kk-media/image/upload/v1752858459/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior-Demo/aws-cloudfront-origin-request-policy.jpg)

> [!important]
> **Warning**
>
> Ensure that your origin request policy forwards only the necessary information; unnecessary data may lead to increased latency or security risks.

## Creating a New Behavior

Beyond the default behavior, you can add new behaviors to manage different types of requests. To do this, click on **Create Behavior**. You must specify a path pattern which determines the requests that will follow this behavior. For example, if your application handles API requests on the "/api" path, you can create a behavior for "/api" so that all matching requests are directed to a specific origin.

Similarly, you might create different behaviors for images or other assets to assign unique cache keys, origin request policies, and TTL configurations based on specific needs.

![The image shows an AWS CloudFront interface for creating a behavior, with a focus on setting a path pattern, specifically "/api". Commonly used path patterns are listed below the input field.](https://kodekloud.com/kk-media/image/upload/v1752858460/notes-assets/images/AWS-Certified-Developer-Associate-Cache-Key-Caching-Policies-Cache-Behavior-Demo/aws-cloudfront-behavior-path-pattern.jpg)

By configuring behaviors in this manner, you gain precise control over cache keys, origin request policies, and caching durations tailored to each origin's needs.

## Example XML Error Response

Below is an example of an XML error response that might be returned if access is denied due to an unauthorized request to a specific path:

```
<error>
   <Code>AccessDenied</Code>
   <Message>Access Denied</Message>
   <RequestId>18H5T95E1I8G5E1G9B4W1X5T0G9W1I8G9B4W1I8G9B4W1I8G</RequestId>
</error>
```

This snippet exemplifies a scenario where a behavior—such as one associated with the "/api" path—might be configured to handle access control differently.

## Conclusion

Through careful configuration of cache behaviors, cache key settings, and origin request policies, you can efficiently optimize content delivery with Amazon CloudFront. Tailor these configurations to your application’s specific requirements to ensure that requests are routed and cached effectively, improving performance and scalability.

For more information on AWS CloudFront and its caching mechanisms, consider exploring other resources such as [AWS Documentation](https://docs.aws.amazon.com/cloudfront/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/d25d5e41-6379-4261-9036-c1d8017dbdab/lesson/41da42a5-7f7c-49af-b07d-ed162ccfa3d5)**
>
> Watch video content
