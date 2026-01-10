# Receiving Events by UsingnbspWebhooks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Grid/Receiving-Events-by-UsingnbspWebhooks)

---

## Table of Contents

- Receiving Events by UsingnbspWebhooks
  - Azure Logic Apps with Event Grid Connector
  - Azure Automation with Webhook Integration
  - Azure Functions with Event Grid Trigger
  - Verifying Event Subscription: Synchronous and Asynchronous Handshake
  - Demonstration: Validating an Endpoint in the Azure Portal
  - Watch Video
    - Synchronous Handshake
    - Asynchronous Handshake

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Grid

# Receiving Events by UsingnbspWebhooks

In this guide, we explore how to receive events from Azure Event Grid via webhooks and dive into three key Azure services that make event processing and automation seamless.

---

## Azure Logic Apps with Event Grid Connector

Azure Logic Apps integrate with Event Grid using a native Event Grid Connector, allowing you to automatically trigger workflows based on real-time events. This native connection streamlines the process by eliminating manual URL handling—a benefit over the previous method that used the Request Connector to obtain a webhook URL. With this setup, you can effortlessly build automation scenarios that react to your event streams.

> [!important]
> **Tip**
>
> Using the native connector not only simplifies configuration but also reduces potential errors associated with manual URL management.

---

## Azure Automation with Webhook Integration

Azure Automation Accounts can be configured to use webhooks for automatically executing runbooks or scripts when specific events occur. This integration with Event Grid enables you to trigger complex automation tasks based on event data. It is especially beneficial when you need to run predefined scripts or processes on demand, ensuring that your workflows remain efficient and responsive.

---

## Azure Functions with Event Grid Trigger

Azure Functions adopt a serverless paradigm that allows them to be directly triggered by events from Event Grid. This lightweight, event-driven compute model is perfect for tasks that require immediate processing of events without managing underlying infrastructure. Azure Functions automatically scale based on the event load, optimizing resource usage and reducing operational overhead.

![The image lists three Azure services: Azure Logic Apps with Event Grid Connector, Azure Automation via Webhook, and Azure Functions with Event Grid Trigger.](https://kodekloud.com/kk-media/image/upload/v1752866488/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Receiving-Events-by-UsingnbspWebhooks/azure-logic-apps-automation-functions.jpg)

---

## Verifying Event Subscription: Synchronous and Asynchronous Handshake

Ensuring that your event subscription is properly set up in Azure Event Grid requires a handshake process to validate your webhook endpoint. This handshake guarantees that the endpoint is active and capable of receiving events, enhancing the overall security and reliability of your event-driven architecture.

### Synchronous Handshake

In a synchronous handshake, when you create an event subscription, Event Grid immediately sends a subscription validation event to your webhook endpoint. Your server must promptly return a validation code to confirm the subscription. This immediate response demonstrates that the endpoint is online and ready to process incoming events.

### Asynchronous Handshake

In scenarios where an instant response isn’t feasible, asynchronous handshake enables the validation to occur at a later time. This approach provides greater flexibility for endpoints that may require additional processing time before returning the necessary validation code.

![The image explains two ways to verify a subscription: Synchronous Handshake and Asynchronous Handshake, with brief descriptions of each method.](https://kodekloud.com/kk-media/image/upload/v1752866490/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Receiving-Events-by-UsingnbspWebhooks/subscription-verification-handshake-methods.jpg)

> [!important]
> **Remember**
>
> Both synchronous and asynchronous handshakes are essential to ensure that only valid, reachable endpoints are registered for event delivery. Always choose the handshake method that best fits your operational needs.

---

## Demonstration: Validating an Endpoint in the Azure Portal

Let’s walk through a practical example in the Azure portal. Follow these steps to understand how endpoint validation works:

1.  Navigate to the Event Subscriptions section in the Azure portal.
2.  Create a new event subscription (for example, "SUB2") and select "webhook" as the endpoint type.
3.  When you configure the endpoint using a URL (e.g., "https://microsoft.com"), the system attempts to validate it by sending a validation request.

If the provided URL is improperly formatted or unreachable, the portal displays an error—such as "The supplied URL is invalid" or another message indicating that the POST request failed. This safeguard ensures that only correctly configured and accessible endpoints are used for event delivery.

![The image shows a Microsoft Azure portal screen for creating an event subscription, with a notification panel on the right displaying deployment status messages, including a failed event subscription deployment.](https://kodekloud.com/kk-media/image/upload/v1752866492/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Receiving-Events-by-UsingnbspWebhooks/azure-portal-event-subscription-failed.jpg)

> [!important]
> **Important**
>
> Always verify that your webhook endpoint URL is correctly formatted and reachable to avoid validation failures during event subscription creation.

---

This article has outlined how to receive events using webhooks in Azure, illustrated the roles of Azure Logic Apps, Azure Automation, and Azure Functions, and detailed the critical endpoint validation process via both synchronous and asynchronous handshakes. These practices ensure a robust, secure, and efficient event-driven architecture in your Azure environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/12346ae4-1f5e-4115-bb36-f10f47c8026e/lesson/0306e20d-b2ca-40d5-8e89-78c5c7ef69f7)**
>
> Watch video content
