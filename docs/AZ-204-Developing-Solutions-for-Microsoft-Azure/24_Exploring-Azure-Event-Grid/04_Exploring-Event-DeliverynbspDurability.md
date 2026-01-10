# Exploring Event DeliverynbspDurability - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Grid/Exploring-Event-DeliverynbspDurability)

---

## Table of Contents

- Exploring Event DeliverynbspDurability
  - Retry Mechanism and Schedule
  - Customizing the Retry Policy
  - Output Batching
  - Delayed Delivery
  - Dead-Letter Events
  - Setting Up an Event Subscription in the Azure Portal
  - Testing the Setup
  - Controlling Access to Events
  - Watch Video
    - Creating the Subscription
    - Configuring Filters and Advanced Options

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Grid

# Exploring Event DeliverynbspDurability

In this article, we dive into how Azure Event Grid ensures reliable event delivery, even when facing errors or delivery issues. You'll learn about the platform’s built-in durability mechanisms and how to leverage them to create robust, event-driven solutions.

---

## Retry Mechanism and Schedule

Azure Event Grid automatically implements a retry mechanism when errors occur during event delivery. The system dynamically assesses errors and decides to either retry the delivery, mark the event as a dead-letter, or drop it altogether. This strategy ensures that transient issues do not block event processing.

![The image is a diagram titled "Retry Schedule" that explains how an event grid handles delivery errors, with options to retry, dead-letter, or drop based on error type. It includes two sections: one for determining actions based on error type and another for decision-making upon receiving an error.](https://kodekloud.com/kk-media/image/upload/v1752866470/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/retry-schedule-event-grid-diagram.jpg)

---

## Customizing the Retry Policy

You have the flexibility to customize the retry policy for your event subscriptions. By configuring parameters like the maximum number of retry attempts and the event time-to-live (TTL), you can tailor how aggressively Event Grid should attempt redelivery.

![The image is an infographic about customizing retry policies for event subscriptions, highlighting setting a maximum number of attempts and configuring event time-to-live settings.](https://kodekloud.com/kk-media/image/upload/v1752866471/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/customizing-retry-policies-infographic.jpg)

> [!important]
> **Note**
>
> Customizing the retry policy helps optimize event delivery based on your system’s tolerance for transient failures and ensures that your events are handled within the desired time constraints.

---

## Output Batching

For environments with high event throughput, Azure Event Grid supports output batching. This capability groups multiple events into a single HTTP request, reducing overhead and significantly enhancing delivery performance and efficiency.

![The image is a diagram titled "Output Batching," showing two benefits of configuring event batching for improved HTTP performance: enabling Event Grid to batch events for delivery and enhancing performance in high-throughput scenarios.](https://kodekloud.com/kk-media/image/upload/v1752866472/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/output-batching-event-delivery-diagram.jpg)

---

## Delayed Delivery

When an endpoint experiences temporary unavailability, Event Grid employs a delayed delivery mechanism. In this mode, events are held and subsequently retried until the endpoint becomes accessible, ensuring that no events are lost due to short-term downtimes.

![The image illustrates "Event Grid Handling of Delivery Failures," showing two processes: delaying event delivery and retrying events in case of delivery failures.](https://kodekloud.com/kk-media/image/upload/v1752866473/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/event-grid-delivery-failures-diagram.jpg)

---

## Dead-Letter Events

If an event cannot be delivered after multiple retry attempts, it is routed to a dead-letter destination, such as a storage account. This mechanism allows you to troubleshoot failed deliveries and determine what corrective actions are needed.

![The image illustrates "Dead-Letter Events" with a focus on "Event Delivery Failure Handling." It shows two processes: sending undelivered events to a storage account and triggering actions if delivery fails within a specified time or attempts.](https://kodekloud.com/kk-media/image/upload/v1752866475/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/dead-letter-events-delivery-failure.jpg)

---

With these durability features, Azure Event Grid is designed to reliably deliver events even in complex and high-throughput scenarios. This level of control over retries and error handling makes it a powerful choice for building resiliency into your event-driven architecture.

---

## Setting Up an Event Subscription in the Azure Portal

Follow these steps to configure event delivery with an event subscription in the Azure Portal.

### Creating the Subscription

1.  Navigate to your Event Grid System Topic in the Azure Portal (the one you previously created).
2.  Click on **Add an Event Subscription**.

![The image shows a Microsoft Azure portal interface displaying details of an Event Grid System Topic, including metrics and event subscriptions. The interface includes options for managing subscriptions and viewing diagnostic settings.](https://kodekloud.com/kk-media/image/upload/v1752866476/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/azure-portal-event-grid-topic.jpg)

3.  Select a webhook by choosing a Logic App as the endpoint. Although the Logic App here functions as a basic webhook by displaying the JSON payload, it effectively demonstrates the event processing pipeline.
4.  In your Logic App, obtain the HTTP URL from the trigger configuration.

![The image shows the Microsoft Azure portal with the Logic App Designer open, displaying a configuration for an HTTP request trigger. The interface includes options for setting parameters, such as the HTTP URL and method.](https://kodekloud.com/kk-media/image/upload/v1752866477/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/azure-portal-logic-app-http-trigger.jpg)

5.  Return to your system topic and create a new event subscription. For example, name it "sub-events-st-blob".
6.  Choose the desired schema (Event Grid schema, Cloud Event schema, or a custom schema). In this example, the Event Grid schema is selected, and the storage account is auto-selected since the subscription is created under a specific topic.
7.  Select the event types you wish to capture. By default, events like blob creation and deletion are pre-selected, though you can also include events such as blob tier changes.
8.  For the endpoint type, choose "webhook" and paste the previously copied URL from your Logic App. Confirm your selection.

![The image shows a Microsoft Azure portal interface for creating an event subscription, with fields for event subscription details, topic details, event types, and endpoint details.](https://kodekloud.com/kk-media/image/upload/v1752866478/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/azure-portal-event-subscription-interface.jpg)

### Configuring Filters and Advanced Options

- In the Filters section, you can apply advanced filters based on key values to refine the events you capture.

![The image shows a Microsoft Azure portal interface for creating an event subscription, with options for subject and advanced filters. There are fields for specifying filter keys, operators, and values.](https://kodekloud.com/kk-media/image/upload/v1752866479/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/azure-portal-event-subscription-interface-2.jpg)

- You can also set additional options such as retry policies (to define the number of retry attempts), dead-lettering configurations, expiration time, batching, and authentication. These settings enable you to fine-tune the event delivery process based on your specific requirements.

![The image shows a Microsoft Azure portal page for creating an event subscription, with options for configuring dead-lettering, retry policies, expiration time, batching, and authentication.](https://kodekloud.com/kk-media/image/upload/v1752866481/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/azure-portal-event-subscription-setup.jpg)

> [!important]
> **Tip**
>
> Remember, you can add additional headers in the HTTP request to pass extra parameters to your event handler, allowing for more flexible processing options.

Once all configurations are set, deploy the subscription and monitor its provisioning status for success.

---

## Testing the Setup

To ensure that your event subscription is working as expected, follow these testing steps:

1.  Navigate back to your storage account.
2.  Go to the containers section and upload your file (for example, employees.json).

![The image shows a Microsoft Azure portal interface displaying details of an Event Grid System Topic, including metrics and event subscriptions. It includes a graph and various settings related to the topic.](https://kodekloud.com/kk-media/image/upload/v1752866482/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/azure-portal-event-grid-topic-2.jpg)

3.  After uploading the file, check Event Hubs to verify that one or more events have been published.
4.  Inspect the Logic App run history by selecting its latest run. Review the headers and JSON payload received. An example JSON payload is shown below:

```
{
  "topic": "/subscriptions/5487d26-5b51-468b-ad45-ee1e2cacf77e/resourceGroups/rg-az204-evgird/providers/Microsoft.Storage/storageAccounts/a224steyg",
  "subject": "/blobServices/default/containers/events/blobs/objects.json",
  "eventType": "Microsoft.Storage.BlobCreated",
  "id": "185f21a7-71ee-8043-72c2-de126c868f71"
}
```

This payload provides details such as the topic, subject (related to a blob operation on employees.json), and event type. A similar payload will be generated for blob deletion events.

![The image shows a Microsoft Azure portal interface displaying the run history of a logic app named "webhook-ide-oauth," with details of an HTTP request received, including headers and body content.](https://kodekloud.com/kk-media/image/upload/v1752866484/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Exploring-Event-DeliverynbspDurability/azure-portal-logic-app-run-history.jpg)

---

## Controlling Access to Events

Once event delivery is confirmed and verified, the next priority is controlling access to ensure that only authorized systems and users engage with your event-driven architecture. Implement access control measures to secure your events and data.

---

This article has reviewed the essential features of Azure Event Grid’s event delivery durability. By understanding and utilizing the retry mechanism, customizable retry policies, output batching, delayed delivery, and dead-letter processing, you can confidently build scalable and robust event-driven solutions with Azure Event Grid.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/12346ae4-1f5e-4115-bb36-f10f47c8026e/lesson/8fddcb37-5de3-4c3c-bafa-4739b983a24d)**
>
> Watch video content
