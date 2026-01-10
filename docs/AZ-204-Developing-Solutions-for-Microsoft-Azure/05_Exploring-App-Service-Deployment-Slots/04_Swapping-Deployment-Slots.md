# Swapping Deployment Slots - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-App-Service-Deployment-Slots/Swapping-Deployment-Slots)

---

## Table of Contents

- Swapping Deployment Slots
  - Swap Deployment Slots
  - Auto Swap
  - Swap with Preview
  - Custom Warmup
  - Roll Back and Monitor a Swap
  - Demonstration in the Azure Portal
  - Conclusion
  - Watch Video
    - Configuring Auto Swap for the Staging Slot
    - Performing a Slot Swap Using the Overview Blade

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring App Service Deployment Slots

# Swapping Deployment Slots

Swapping deployment slots in Azure App Service provides a seamless approach to transitioning between different versions of your application. This feature minimizes downtime and streamlines the update process. In this guide, we will explore various methods to manage and optimize slot swapping, with practical demonstrations using the Azure Portal.

## Swap Deployment Slots

You can initiate a slot swap directly from your application's deployment slots or overview page. This simple action enables you to shift traffic from staging to production environments without interrupting service. The following sections detail the different swap strategies available.

## Auto Swap

Auto Swap automates the swap process. Once enabled, it automatically swaps slots following a successful deployment to a staging slot. This capability ensures that your latest updates are deployed to production quickly and efficiently with minimal manual intervention.

## Swap with Preview

The Swap with Preview feature allows you to review and validate changes in a production-like setting before finalizing the swap. This step provides insight into the differences between the source and target configurations, ensuring that application settings are correctly aligned.

## Custom Warmup

Custom warmup configurations enable you to define specific initialization tasks that your application must complete before a swap occurs. Tasks such as loading data into the cache and performing health checks can be completed ahead of time, ensuring the application is fully prepared to handle user traffic.

## Roll Back and Monitor a Swap

![The image outlines five steps for swapping deployment slots, including configuring auto swap, swapping with preview, specifying a custom warm-up, and monitoring or rolling back a swap.](https://kodekloud.com/kk-media/image/upload/v1752866352/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Swapping-Deployment-Slots/deployment-slots-swap-steps.jpg)

> [!important]
> **Note**
>
> If any issues arise during the swap, you can effortlessly roll back to the previous slot configuration. Monitoring the process is key to ensuring that each step is executed as planned, ensuring high availability and reliability.

## Demonstration in the Azure Portal

Follow these steps in the Azure Portal to configure and execute a slot swap.

### Configuring Auto Swap for the Staging Slot

1.  Navigate to the configuration settings of your staging slot.
2.  Under General Settings, locate the Auto Swap option.
3.  Scroll down and select the target slot for automatic swapping.

![The image shows a Microsoft Azure portal configuration page for a staging deployment slot, with various settings like session affinity, HTTPS, TLS encryption, debugging, and deployment slot options.](https://kodekloud.com/kk-media/image/upload/v1752866353/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Swapping-Deployment-Slots/azure-portal-staging-deployment-settings.jpg)

In this demonstration, the only target slot available for swapping is the production slot. For this example, we will leave the Auto Swap setting turned off without applying any changes.

### Performing a Slot Swap Using the Overview Blade

Switch your focus to the production application. Both production and staging apps are visible, allowing you to initiate the swap. To swap the slots:

1.  Click on "Swap" from either the Overview blade or the Deployment Slots blade.
2.  Set the staging environment as the source slot and the production slot (for example, "demo app 01") as the target slot.
3.  Optionally, use the Swap with Preview option to examine the configuration changes on both sides, which displays the modifications to application settings and shows the old and new values.

![The image shows a Microsoft Azure portal interface for managing deployment slots of a web app. It includes options for swapping configurations between a staging slot and a production slot, with a summary of configuration changes.](https://kodekloud.com/kk-media/image/upload/v1752866355/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Swapping-Deployment-Slots/azure-portal-deployment-slots-management.jpg)

Once you click "Start Swapping," the code sets between the production and staging slots are exchanged. After completion, verify the changes by:

- Visiting the production slot URL in your browser to confirm the updated version (Version 2) of your site.
- Refreshing the staging slot to see that it now contains the previous version of your code.

> [!important]
> **Important**
>
> This dual-slot capability is highly valuable for traffic management. For example, if preview features are hosted in the staging slot, you can route a portion of user traffic (e.g., 20%) to the staging slot to test new functionalities.

## Conclusion

Swapping deployment slots in Azure App Service is an essential strategy for managing application updates with minimal service interruption. By leveraging features like Auto Swap, Swap with Preview, and custom warmup configurations, you can ensure seamless transitions between application versions and maintain a high-quality user experience.

Enjoy optimizing your deployment strategies with Azure App Service!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/c2500ec0-a3d9-49e3-bab7-75609ceda6f4/lesson/33320a24-2ab1-4544-86ee-9cfb09bda4cf)**
>
> Watch video content
