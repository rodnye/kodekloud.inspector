# Azure Functions Scaling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Functions/Azure-Functions-Scaling)

---

## Table of Contents

- Azure Functions Scaling
  - How Scaling Works
  - Scaling by Hosting Plan
  - Function Timeout Configuration
  - Summary
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Functions

# Azure Functions Scaling

This comprehensive guide explains how Azure Functions scale in various hosting plans, while discussing performance nuances, cold start delays, and timeout configurations. Understanding these concepts is key to optimizing your serverless applications.

## How Scaling Works

Azure Functions are designed to dynamically scale based on event demand. The key scaling principles include:

1.  The function app is the primary scaling unit. All functions within a function app scale together.
2.  A dedicated scale controller continuously monitors events from sources like webhooks, Event Hubs, Service Bus, timers, queues, blobs, and HTTP requests. It automatically adds or removes instance counts based on current demand.
3.  In a Consumption Plan, instances can scale down to zero when there is no activity, ensuring you only pay for actual execution time. However, a new request after scaling to zero triggers a cold start, causing a slight delay as the function app initializes.

> [!important]
> **Note**
>
> Be mindful that while scaling to zero maximizes cost efficiency, it may introduce latency if a cold start is required.

![The image is an infographic explaining the scaling process of Azure Functions, detailing four steps: function app scaling, scale controller monitoring, instances scaling to zero, and cold start scaling.](https://kodekloud.com/kk-media/image/upload/v1752866530/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Functions-Scaling/azure-functions-scaling-infographic.jpg)

Once an event is detected, the scale controller promptly spins up the necessary instances to process it without compromising performance.

![The image illustrates the process of scaling Azure Functions, showing how a scale controller monitors events from various sources and creates instances to process them.](https://kodekloud.com/kk-media/image/upload/v1752866531/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Functions-Scaling/azure-functions-scaling-process-diagram.jpg)

## Scaling by Hosting Plan

The available instance limits and scaling behaviors vary by hosting plan. Below is a breakdown of each option:

- **Consumption Plan:**
  - Windows: Up to 200 instances
  - Linux: Up to 100 instances  
    Designed for event-driven execution, this plan scales to zero during inactivity, which may lead to cold starts.

- **Premium Plan:**
  - Provides pre-warmed instances to eliminate cold start delays.
  - Typically offers up to 100 instances on Windows, while Linux supports 20 to 100 instances depending on the selected tier.

- **Dedicated (App Service) Plan:**
  - Manual scaling on Basic plans is available; auto-scaling is supported on Standard, Premium, or Isolated plans.
  - Instance limits range from 10 to 30, with possible expansion up to 100 instances in App Service Environment or Isolated Plans.

- **Container Apps:**
  - Functions can be hosted using Container Apps, similar to Kubernetes orchestrators provided by Azure, with instance limits ranging from 10 to 300 depending on the selected tier.

![The image is a table describing the scaling options for Azure Functions, detailing different plans, their scale-out methods, and maximum instances for Windows and Linux.](https://kodekloud.com/kk-media/image/upload/v1752866532/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Functions-Scaling/azure-functions-scaling-options-table.jpg)

## Function Timeout Configuration

Timeout settings for Azure Functions vary by hosting plan, aiding in performance tuning and stability:

- **Consumption Plan:**
  - Default Timeout: 5 minutes
  - Maximum Execution Time: 10 minutes  
    Best used for functions meant to execute quickly.

- **Premium Plan:**
  - Default Timeout: 30 minutes
  - Maximum Execution Time: Unlimited (configurable)

- **Dedicated and Container Apps Plans:**
  - Default Timeout: 30 minutes
  - Maximum Execution Time: Configurable up to unlimited

Timeouts are established via the host.json file using the `functionTimeout` property. For instance, to set a 60-minute timeout on a Premium plan, include the following configuration:

```
{
  "functionTimeout": "01:00:00"
}
```

![The image is a table comparing Azure Functions plans, showing default and maximum timeout values for Consumption, Premium, Dedicated, and Container Apps plans.](https://kodekloud.com/kk-media/image/upload/v1752866533/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Functions-Scaling/azure-functions-plans-timeout-comparison.jpg)

## Summary

While Consumption Plans emphasize cost efficiency by scaling to zero (resulting in cold starts), Premium, Dedicated, and Container Apps Plans offer pre-warmed instances for faster response times. This guide helps you select the right hosting plan based on your application's demands and execution requirements.

Armed with these insights on scaling, hosting plans, and timeout configurations, you are now better prepared to develop optimized and efficient Azure Functions that cater to your application's specific needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/a6ee4dbc-0975-43de-8374-1bbe9b7f5895/lesson/0c551796-7eba-43b1-b092-cb0f7c1dadb2)**
>
> Watch video content
