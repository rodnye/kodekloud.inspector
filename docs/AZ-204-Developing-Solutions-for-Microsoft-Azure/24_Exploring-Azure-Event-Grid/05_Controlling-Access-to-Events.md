# Controlling Access to Events - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Grid/Controlling-Access-to-Events)

---

## Table of Contents

- Controlling Access to Events
  - Built-in Roles for Event Grid
  - Permissions for Event Subscriptions
  - Managing Topics and Subscriptions
  - Receiving Events Using Webhooks
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Grid

# Controlling Access to Events

Azure Event Grid uses Role-Based Access Control (RBAC) to manage who can access and manage events. This article explains how to control access using Azure Event Grid's built-in roles and the corresponding permissions required for various operations. These guidelines ensure you can securely delegate tasks like listing events, creating subscriptions, managing those subscriptions, or generating keys for custom event ingestion.

## Built-in Roles for Event Grid

Azure provides several built-in roles tailored for routine Event Grid tasks:

- **Event Grid Subscription Reader**  
  Grants read-only access to event subscriptions. This role is ideal for monitoring and viewing events without making any modifications.
- **Event Grid Subscription Contributor**  
  Enables users to create, modify, and delete event subscriptions. This role is suited for users who need to manage the lifecycle of subscriptions.
- **Event Grid Contributor**  
  Offers full control over various Event Grid resources, including topics and subscriptions. This role is not limited to the subscription scope and allows comprehensive management.
- **Event Grid Data Sender**  
  Provides restricted permissions; it allows users to send events to Event Grid topics without managing or modifying other resources.

## Permissions for Event Subscriptions

When using an event handler that is not a webhook (for example, Event Hubs or Queue Storage), write access to the resource is required. These permissions help prevent unauthorized users from sending events.

For example, if you need to write events to an Azure Queue Storage, access keys or Entitlement ID authentication must be used. Without these security measures, anyone could potentially write to the Queue Storage.

> [!important]
> **Warning**
>
> Always ensure that proper access controls are in place on resources like Queue Storage to prevent unauthorized event writing.

## Managing Topics and Subscriptions

Managing system topics and custom topics requires appropriate write permissions at the resource level:

- For system topics, you must have write access at the scope of the publishing resource. For instance, capturing events from a storage account demands write permissions on that storage account.
- When creating custom topics, it is necessary to have permissions to write a new event subscription at the scope of the Event Grid topic. This level of access guarantees complete control to deliver events correctly.

![The image outlines permissions for event subscriptions, highlighting the need for write access for non-WebHook event handlers and ensuring only authorized users can send events. It also describes permissions for system and custom topics.](https://kodekloud.com/kk-media/image/upload/v1752866459/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Access-to-Events/event-subscription-permissions-outline.jpg)

## Receiving Events Using Webhooks

After securing access with proper roles and permissions, you can proceed to configure your webhook to receive events. In the upcoming sections, you will learn how to set up and use webhooks to process events efficiently, ensuring seamless integration with your event-driven applications.

> [!important]
> **Note**
>
> Webhooks are a robust method for real-time event processing. It is essential to secure your webhook endpoint and validate incoming events to maintain system integrity.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/12346ae4-1f5e-4115-bb36-f10f47c8026e/lesson/b000d6ac-9746-4321-b8e8-d6651519c9b3)**
>
> Watch video content
