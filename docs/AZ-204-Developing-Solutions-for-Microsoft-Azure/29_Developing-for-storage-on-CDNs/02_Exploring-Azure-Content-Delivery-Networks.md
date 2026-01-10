# Exploring Azure Content Delivery Networks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Developing-for-storage-on-CDNs/Exploring-Azure-Content-Delivery-Networks)

---

## Table of Contents

- Exploring Azure Content Delivery Networks
  - Benefits of Using Azure CDN
  - How Azure CDN Works
  - Requirements and Limitations of Azure CDN
  - Azure CDN Product Offerings
  - Next Steps
  - Watch Video
    - Requirements
    - Limitations

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Developing for storage on CDNs

# Exploring Azure Content Delivery Networks

Azure Content Delivery Networks (CDN) empower your applications by delivering high-bandwidth content quickly and reliably. By caching content on globally distributed edge servers, Azure CDN reduces latency and improves the user experience. This article provides an in-depth overview of Azure CDN, its benefits, how it works, its requirements and limitations, and the various product offerings.

![The image is a world map showing the locations of Azure Content Delivery Networks, marked with blue cloud icons in various regions.](https://kodekloud.com/kk-media/image/upload/v1752866257/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Content-Delivery-Networks/azure-cdn-world-map-clouds.jpg)

Azure CDN caches high-bandwidth assets at strategically placed physical nodes worldwide, ensuring that content is delivered from a location closer to your users. This proximity reduces latency and ensures smooth, fast content delivery.

![The image is an overview diagram of Azure Content Delivery Networks (CDN), showing the difference in content delivery with and without a CDN. With a CDN, content is cached and delivered optimally, while without a CDN, content is delivered directly from the origin server.](https://kodekloud.com/kk-media/image/upload/v1752866259/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Content-Delivery-Networks/azure-cdn-overview-diagram.jpg)

## Benefits of Using Azure CDN

Azure CDN offers several advantages that can significantly enhance your content delivery strategy:

- **Enhanced Performance:** Serving content from edge locations minimizes the distance data travels, leading to faster load times.
- **Efficient Traffic Distribution:** During high-traffic events like live streams or product launches, Azure CDN distributes the load across multiple servers, reducing the risk of server overload.
- **Reduced Origin Server Load:** By offloading traffic to edge servers, the origin server handles fewer requests, improving its overall reliability and performance.

![The image lists the benefits of Azure Content Delivery Networks, highlighting enhanced performance, scalability, and traffic distribution.](https://kodekloud.com/kk-media/image/upload/v1752866260/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Content-Delivery-Networks/azure-cdn-benefits-performance-scalability.jpg)

> [!important]
> **Note**
>
> Azure CDN not only speeds up access to static assets but also improves website scalability by efficiently managing high volumes of traffic.

## How Azure CDN Works

Azure CDN optimizes content delivery through a streamlined flow that begins with a user request and ends with content delivery from an edge server. Here’s a step-by-step breakdown of the process:

1.  **Request Initiation:**  
    A user (e.g., Ben) requests a file using a common URL (e.g., endpoint.azureedge.net), which is key for routing the request through the CDN.
2.  **Cache Check at the Edge Server:**  
    The request reaches the nearest edge server in the point of presence (POP), where the server checks if the requested file is already cached.

    ![The image illustrates how Azure Content Delivery Network (CDN) works, showing the flow from users to an edge server and origin, with steps like cache check and file retrieval.](https://kodekloud.com/kk-media/image/upload/v1752866261/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Content-Delivery-Networks/azure-cdn-flow-diagram.jpg)

3.  **Content Fetching:**
    - **If Cached:** The edge server immediately provides the cached file to the user, ensuring a rapid response.
    - **If Not Cached:** The edge server relays the request to the origin server. After retrieving the file, it caches the content for future requests and then delivers it to the user.

4.  **Subsequent Requests:**  
    For any further requests, the edge server serves the content from its cache until the Time To Live (TTL) expires, after which the cached data is refreshed from the origin server.

This process minimizes the load on your origin server and ensures that users receive the information quickly and reliably.

## Requirements and Limitations of Azure CDN

### Requirements

To start using Azure CDN, you need to set up a CDN profile. Consider the following prerequisites:

- A CDN profile, which acts as a container for one or more CDN endpoints.
- Each CDN endpoint defines specific settings for asset delivery.
- The ability to organize endpoints into multiple profiles depending on your domain or application needs.

![The image outlines the requirements for Azure Content Delivery Networks, listing three points: creating at least one CDN profile, each CDN endpoint representing a specific configuration, and the ability to use multiple profiles.](https://kodekloud.com/kk-media/image/upload/v1752866263/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Content-Delivery-Networks/azure-cdn-requirements-outline.jpg)

### Limitations

While Azure CDN is a robust solution for content delivery, there are some limitations to keep in mind for effective planning:

- **Subscription Limits:** There is a cap on the number of CDN profiles per Azure subscription.
- **Endpoint Limits:** Each CDN profile supports a limited number of endpoints.
- **Custom Domain Limits:** There is a restriction on the number of custom domains that can be associated with CDN endpoints.

![The image outlines the limitations of Azure Content Delivery Networks, highlighting the number of CDN profiles, endpoints, and custom domains that can be created or mapped.](https://kodekloud.com/kk-media/image/upload/v1752866264/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Content-Delivery-Networks/azure-cdn-limitations-profiles-endpoints.jpg)

> [!important]
> **Warning**
>
> When planning large-scale deployments, be sure to verify your subscription and endpoint limits, as these factors can impact your CDN strategy.

## Azure CDN Product Offerings

Azure offers a variety of CDN products to meet diverse content delivery needs:

1.  **Azure CDN from Microsoft:**  
    Ideal for general-purpose content delivery with essential caching and acceleration capabilities.
2.  **Azure CDN Standard from Edgio (formerly Verizon):**  
    Suitable for users who prefer the Edgio technology stack and robust CDN services.
3.  **Azure CDN Premium from Edgio:**  
    Provides advanced features, including enhanced traffic management and more configuration options, for applications with specific performance requirements.

![The image lists three Azure Content Delivery Network products: Azure CDN Standard from Microsoft, Azure CDN Standard from Edgio (formerly Verizon), and Azure CDN Premium from Edgio (formerly Verizon).](https://kodekloud.com/kk-media/image/upload/v1752866266/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Azure-Content-Delivery-Networks/azure-cdn-products-list.jpg)

Below is a table summarizing these product offerings:

| Product Type                  | Use Case                                       | Description                                       |
| ----------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| Azure CDN from Microsoft      | General-purpose content delivery               | Basic caching and acceleration                    |
| Azure CDN Standard from Edgio | Reliable performance with alternative support  | Leverages Edgio’s CDN technology                  |
| Azure CDN Premium from Edgio  | Advanced performance and configuration options | Enhanced traffic management for specialized needs |

## Next Steps

With a solid understanding of Azure CDN's benefits, operation, requirements, limitations, and product options, you are now ready to dive deeper. Next, explore how you can control caching behavior within Azure CDN to optimize your content delivery strategy further.

For more in-depth details on Azure and CDN technologies, visit the [Azure Documentation](https://docs.microsoft.com/en-us/azure/cdn/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/892d3923-3191-43b5-a566-3db2ad980268/lesson/ab818483-d58a-4559-9d44-357c77de990e)**
>
> Watch video content
