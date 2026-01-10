# Routing Traffic in Slots - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-App-Service-Deployment-Slots/Routing-Traffic-in-Slots)

---

## Table of Contents

- Routing Traffic in Slots
  - Automatic Traffic Distribution
  - Manual Traffic Routing
  - Configuring Traffic Routing in the Azure Portal
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring App Service Deployment Slots

# Routing Traffic in Slots

Routing traffic in Azure App Service lets you efficiently control access to different versions of your application, especially when using deployment slots. In this guide, you'll learn how to manage traffic routing using two primary methods: automatic traffic distribution and manual traffic routing.

## Automatic Traffic Distribution

Automatic traffic distribution enables you to gradually shift user traffic from your production environment to a new version deployed in a staging slot. This approach minimizes risks by exposing the new version incrementally. To set up automatic routing:

1.  Navigate to the resource page in the Azure portal.
2.  Select **Deployment slots**.
3.  In the **Traffic percentage** column for the desired slot, specify a value between 0 and 100 to indicate the share of total traffic that should be directed there.

> [!important]
> **Tip**
>
> Automatic distribution is ideal for rolling updates and controlled exposure to new application versions.

## Manual Traffic Routing

Manual traffic routing provides more precise control, allowing you to direct specific users to a particular slot. This method is especially useful when deploying beta versions that users can opt in or out of. By appending the `X-MS-Routing-Name` parameter to the URL, you can target particular requests without changing the overall traffic split.

![The image explains two methods for routing traffic in an app service: one using deployment slots with a specified traffic percentage, and the other allowing manual routing to specific slots using a query parameter.](https://kodekloud.com/kk-media/image/upload/v1752866345/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Routing-Traffic-in-Slots/app-service-traffic-routing-methods.jpg)

## Configuring Traffic Routing in the Azure Portal

Setting up and managing traffic routing via the Azure portal is straightforward. Consider the following configuration examples:

- Setting a **50%** traffic distribution for the staging slot means half of all incoming traffic is automatically routed to staging, while the remaining traffic is served by production.
- For directing specific users to a particular slot, manually include headers (e.g., the `X-MS-Routing-Name` parameter) in the URL. This option provides selective access control, such as allowing beta users to test new features without affecting the general user base.

![The image shows a Microsoft Azure portal page displaying deployment slots for a web app, with two slots listed: one for production and one for staging, both running with equal traffic distribution.](https://kodekloud.com/kk-media/image/upload/v1752866347/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Routing-Traffic-in-Slots/azure-portal-deployment-slots-web-app.jpg)

> [!important]
> **Caution**
>
> When manually routing traffic using the `X-MS-Routing-Name` parameter, ensure that your application logic correctly interprets the headers to avoid unintended behavior.

This flexible configuration allows you to manage traffic distribution effectively during deployments, ensuring smooth transitions between application versions. The techniques discussed here are also applicable to other Azure services, including Function Apps.

See you in the next module.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/c2500ec0-a3d9-49e3-bab7-75609ceda6f4/lesson/f21ea43c-4d87-428f-83f0-f010ca6e40a0)**
>
> Watch video content
