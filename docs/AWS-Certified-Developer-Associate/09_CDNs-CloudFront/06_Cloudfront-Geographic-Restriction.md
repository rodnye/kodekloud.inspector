# Cloudfront Geographic Restriction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/CDNs-CloudFront/Cloudfront-Geographic-Restriction)

---

## Table of Contents

- Cloudfront Geographic Restriction
  - Configuring Geographic Restrictions
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

CDNs CloudFront

# Cloudfront Geographic Restriction

CloudFront geographic restriction (also known as geo restriction) is a powerful feature that allows you to control content access based on the geographic location of your users. By configuring this feature, you can tailor your content delivery strategy—ensuring that only users from allowed countries can access your content, while users from other regions are restricted.

![The image is a world map showing CloudFront geographic restrictions, with countries marked in red indicating blocked access and countries in green indicating allowed access.](https://kodekloud.com/kk-media/image/upload/v1752858485/notes-assets/images/AWS-Certified-Developer-Associate-Cloudfront-Geographic-Restriction/cloudfront-geographic-restrictions-map.jpg)

## Configuring Geographic Restrictions

There are two main methods to configure geographic restrictions in CloudFront:

1.  **Whitelist:** Allows access only to users from the specified countries. All other locations are blocked.
2.  **Blacklist:** Permits access by default to all countries except those defined in the blacklist.

> [!important]
> **Note**
>
> When a user makes a request, CloudFront checks the relevant whitelist or blacklist to determine if the request should be processed. If the user's geographic location is permitted, the request is forwarded to the origin (such as an S3 bucket via an edge location) and the content is returned.

![The image illustrates CloudFront Geographic Restriction with two options: "Whitelist" represented by an unlocked padlock and "Blacklist" represented by a prohibition symbol.](https://kodekloud.com/kk-media/image/upload/v1752858485/notes-assets/images/AWS-Certified-Developer-Associate-Cloudfront-Geographic-Restriction/cloudfront-geographic-restriction-options.jpg)

If a user’s location does not satisfy the allowed criteria under the configured rules, CloudFront denies access to the content.

> [!important]
> **Warning**
>
> Improper configuration of your whitelist or blacklist rules may inadvertently block legitimate users. Always verify your geographic settings to ensure that your content is accessible to the intended audience.

![The image illustrates the process of CloudFront geographic restriction, showing how requests are allowed or denied based on a whitelist/blacklist, with content fetched from an S3 bucket via an edge location.](https://kodekloud.com/kk-media/image/upload/v1752858487/notes-assets/images/AWS-Certified-Developer-Associate-Cloudfront-Geographic-Restriction/cloudfront-geographic-restriction-diagram.jpg)

## Summary

CloudFront geographic restrictions enhance your content distribution strategy by enabling you to:

| Restriction Type | Description                                                   | Benefit                                  |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------- |
| Whitelist        | Only allow specified countries                                | Greater security for sensitive regions   |
| Blacklist        | Block selected countries while allowing all others by default | Broader reach with targeted restrictions |

For more detailed information on CloudFront and content delivery strategies, consider reviewing the [CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/d25d5e41-6379-4261-9036-c1d8017dbdab/lesson/c26e7a62-40b1-46dc-bc59-cc01de75b6e3)**
>
> Watch video content
