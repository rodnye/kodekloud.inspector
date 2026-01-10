# Controlling Caching Behavior - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Developing-for-storage-on-CDNs/Controlling-Caching-Behavior)

---

## Table of Contents

- Controlling Caching Behavior
  - Time-to-Live (TTL) Values
  - Content Updates and Refresh Mechanisms
  - Demonstration: Integrating Azure CDN with an Azure Storage Static Website
  - Verifying CDN Behavior with nslookup
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Developing for storage on CDNs

# Controlling Caching Behavior

Caching is a critical component of modern content delivery systems, enabling faster response times and reduced server load. However, proper management of cached content is equally important to ensure users always receive the most up-to-date resources. This guide explains how Azure CDN controls caching behavior to maximize both performance and content freshness.

Azure CDN reduces unnecessary origin server checks by considering cached resources fresh until their specified expiration (TTL) is reached. A resource remains fresh if its age is below the TTL value defined in the caching rules. Once the TTL expires, the CDN node reconnects with the origin server to verify whether a new version of the resource exists.

Azure CDN provides two primary methods for managing caching behavior:

1.  **Caching Rules**
    - **Global Caching Rules:** Apply a single rule across all requests to a CDN endpoint, streamlining default caching management.
    - **Custom Caching Rules:** Allow granular control by detailing how specific resources are cached, with the ability to override global rules for individual cases.

2.  **Query String Caching**  
    Query string caching offers flexibility in handling requests with query parameters. You can choose to:
    - **Ignore Query Strings:** Serve the same cached content regardless of query variations.
    - **Bypass Caching:** Force requests with query strings to bypass the cache and retrieve content directly from the origin server.
    - **Cache Each Variant:** Treat each unique query string as a separate cached entry, which is useful when query parameters change the content.

![The image is a diagram titled "Controlling Caching Behavior," showing two main categories: "Caching Rules" and "Query String Caching," with subcategories like "Global Caching Rules," "Custom Caching Rules," "Query String," and "Cacheable Files only."](https://kodekloud.com/kk-media/image/upload/v1752866249/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Caching-Behavior/controlling-caching-behavior-diagram.jpg)

## Time-to-Live (TTL) Values

TTL settings dictate how long content is stored in the cache before a refresh is required. Azure CDN honors the TTL values provided by the origin server via the Cache-Control header. When no explicit TTL is set, Azure CDN applies default values based on the content type:

- **General Web Delivery:** 7 days
- **Large Files:** 1 day
- **Media Streaming:** 1 year

These default settings help ensure that content remains fresh even if the origin server does not specify TTL headers.

![The image illustrates the caching and Time to Live (TTL) process involving an origin server, a CDN node, and a user, with default TTL values for different types of content delivery optimizations.](https://kodekloud.com/kk-media/image/upload/v1752866251/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Caching-Behavior/caching-ttl-process-cdn-user.jpg)

## Content Updates and Refresh Mechanisms

Delivering the latest version of assets is essential when using a CDN. Azure CDN supports content updates through the following mechanisms:

- **Normal Operation:** The CDN edge serves a cached asset until its TTL expires. After expiration, it revalidates content with the origin server.
- **Versioning for Updates:** Including version strings in asset URLs forces the CDN to immediately fetch the new asset without waiting for TTL expiration.
- **Manual Purging:** Administrators can manually purge cached content, ensuring that subsequent requests retrieve the latest version directly from the origin server.

> [!important]
> **Note**
>
> Using versioning in asset URLs is a best practice for ensuring immediate propagation of updates.

![The image is a slide titled "Controlling Caching behavior – Content Update," showing three steps: "Normal Operation," "Versioning for Updates," and "Purging Content," each in a colored box.](https://kodekloud.com/kk-media/image/upload/v1752866252/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Caching-Behavior/controlling-caching-behavior-slide.jpg)

## Demonstration: Integrating Azure CDN with an Azure Storage Static Website

In this demonstration, you will learn how to integrate Azure CDN with a static website hosted on an Azure Storage account.

1.  Open the Azure portal and navigate to your storage account configured for static web hosting (typically using the $web container). Verify that the website is up and running by opening its URL in your browser.
2.  Connect the Azure CDN to your storage account. You can either link the CDN directly from the storage account or create a new CDN endpoint. In this demonstration, the CDN is already configured.
3.  Within the Azure portal under the Azure CDN service, create a new endpoint by:
    - Providing a unique endpoint name (which will include the azureedge.net domain).
    - Selecting the origin (choose the static website).
    - Configuring the pricing tier (such as Microsoft or Verizon).
4.  Set up the query string caching behavior by choosing one of these options:
    - **Ignore Query Strings:** All variations are served from the same cached content.
    - **Bypass Caching:** Requests with query strings are forwarded directly to the origin.
    - **Use Query Strings:** Cache each distinct query string separately.

![The image shows a Microsoft Azure portal interface for configuring a Front Door and CDN service, with options to create a new endpoint.](https://kodekloud.com/kk-media/image/upload/v1752866254/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Caching-Behavior/azure-portal-front-door-cdn.jpg)

Once the CDN is configured and the endpoint is active, access your website via the CDN URL. For instance, an endpoint like "happylearning.azureedge.net" will deliver your static website content from the nearest point of presence.

![The image shows a Microsoft Azure portal page displaying details of a CDN profile named "happylearning-cdn," with an endpoint that is running and using HTTP/HTTPS protocols.](https://kodekloud.com/kk-media/image/upload/v1752866256/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Caching-Behavior/azure-portal-cdn-happylearning.jpg)

## Verifying CDN Behavior with nslookup

To verify that your content is being served from the nearest point of presence, use the nslookup command to check the IP address associated with your CDN endpoint. The resulting IP address may vary based on your geographic location.

For example, running the following command in your terminal:

```
nslookup happylearning.azureedge.net
Server:         162.252.172.57
Address:        162.252.172.57#53

Non-authoritative answer:
happylearning.azureedge.net    canonical name = happylearning.afd.azureedge.net.
happylearning.afd.azureedge.net canonical name = azureedge-t-prod.trafficmanager.net.
azureedge-t-prod.trafficmanager.net canonical name = shed.dual-low.s-part-0039.t-0009.t-msedge.net.
shed.dual-low.s-part-0039.t-0009.t-msedge.net    canonical name = s-part-0039.t-0009.t-msedge.net.
Name:   s-part-0039.t-0009.t-msedge.net
Address: 13.107.246.67
```

If you connect from different geographic regions (for example, via a VPN in Australia, Austria, or the United States), you will observe different IP addresses corresponding to the closest CDN nodes. This dynamic routing significantly enhances content delivery performance.

Additional configurations, such as geo-restrictions, advanced caching rules, and content optimization, can further boost performance, though these topics are beyond the scope of this guide.

By mastering Azure CDN's caching rules, TTL settings, and update mechanisms, you can optimize your content delivery strategy and ensure a healthy balance between performance and content freshness.

---

For further details on Azure CDN and related optimization techniques, consider exploring the [Azure CDN Documentation](https://docs.microsoft.com/en-us/azure/cdn/) and other related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/892d3923-3191-43b5-a566-3db2ad980268/lesson/a16c6304-12a7-4118-9075-ac21f83303e4)**
>
> Watch video content
