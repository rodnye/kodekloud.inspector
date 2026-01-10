# Discovering Event Schemas - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Grid/Discovering-Event-Schemas)

---

## Table of Contents

- Discovering Event Schemas
  - Overview of Event Schema Properties
  - Example: Azure Blob Storage Event
  - Deploying an Event Grid in Azure
  - Summary
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Grid

# Discovering Event Schemas

In this lesson, you will explore the structure of events processed via Azure Event Grid. We will dissect the event schema, which outlines the standard properties used to describe events. A thorough understanding of these properties is essential for effectively processing and responding to Azure events.

## Overview of Event Schema Properties

Each event in Azure Event Grid is comprised of several key properties. Below is a breakdown of these components:

- **topic**: Represents the resource path associated with the event. This property may be optional in certain contexts.
- **subject**: A required field that provides context about the event. For example, in a storage event, this might reference a specific Blob Storage container or file.
- **eventType**: A mandatory property that specifies the type of event, such as a blob created or blob deleted event in Azure Blob Storage.
- **eventTime**: Captures the timestamp when the event occurred, which is crucial for tracking event activities.
- **id**: A unique identifier for the event, useful for deduplication and correlating multiple events.
- **data**: An optional field that holds additional details specific to the event type. For instance, in a blob event, you might find information about blob type, size, and access tier.
- **dataVersion** and **metadataVersion**: Optional properties that provide versioning details for the event data and its metadata.

Below is a sample JSON representation of an Azure Event Grid event schema:

```
[
  {
    "topic": "string",
    "subject": "string",
    "id": "string",
    "eventType": "string",
    "eventTime": "string",
    "data": {
      "object-unique-to-each-publisher"
    },
    "dataVersion": "string",
    "metadataVersion": "string"
  }
]
```

> [!important]
> **Note**
>
> Ensure that your event processing logic can handle optional properties and version changes to maintain compatibility with evolving Azure services.

## Example: Azure Blob Storage Event

Consider a typical scenario where an Azure Blob Storage event is triggered upon the creation of a new block blob. Below is an example JSON snippet representing this event:

```
[
  {
    "topic": "...",
    "subject": "...",
    "eventType": "Microsoft.Storage.BlobCreated",
    "eventTime": "2017-06-26T18:41:00.9584103Z",
    "id": "831e1650-001e-001b-66ab-eeb76e069631",
    "data": {
      "api": "PutBlockList",
      "eTag": "0x8D4BCC2E4835CD0",
      "storageDiagnostics": {
        "batchId": "b68529f3-68cd-4744-baa4-3c0498ec19f0"
      },
      "clientRequestId": "6d79dbfb-0e37-4fc4-981f-442c9ca65760",
      "requestId": "831e1650-001e-001b-66ab-eeb76e000000",
      "contentType": "application/octet-stream",
      "contentLength": 524288,
      "blobType": "BlockBlob",
      "sequencer": "00000000000442020000000028963",
      "url": "https://test.blob.core.windows.net/container/blob"
    },
    "dataVersion": "",
    "metadataVersion": "1"
  }
]
```

In this example:

- The `"eventType"` is set to `"Microsoft.Storage.BlobCreated"` to indicate a new blob creation.
- The `"eventTime"` records the precise moment of the event.
- The `"id"` uniquely identifies the event.
- The `"data"` object contains detailed information such as the API used, content type, content length, blob type, and the blob URL. Additional identifiers like request and batch IDs assist in tracking and troubleshooting.

## Deploying an Event Grid in Azure

Now that you understand the event schema, follow these steps to deploy an Event Grid system topic in Azure to capture events:

1.  Open the Azure portal and search for "Event Grid".
2.  In the Event Grid section, you will see various options. One notable feature is the use of system topics, which automatically capture events published by Azure services (e.g., Azure Blob Storage). While you can also publish custom events, this example focuses on system topics for monitoring storage events.
3.  Select the appropriate subscription and resource you wish to monitor. The image below shows the Azure portal interface for creating an Event Grid System Topic:

    ![The image shows a Microsoft Azure portal interface for creating an Event Grid System Topic. It includes fields for selecting topic types, subscription, resource group, and entering a name.](https://kodekloud.com/kk-media/image/upload/v1752866461/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Event-Schemas/azure-portal-event-grid-topic.jpg)

4.  Before configuring your Event Grid, create a storage account that will generate events. In the Azure portal, search for "Storage Account". Create a new Storage Account by selecting a subscription and creating a new resource group (for example, RGAZ204). Provide a unique name for the storage account (e.g., AZ204ST Event Grid) and choose a region. The following image illustrates the storage account creation process:

    ![The image shows a Microsoft Azure portal page for creating a storage account, with fields for subscription, resource group, storage account name, region, and other configuration options.](https://kodekloud.com/kk-media/image/upload/v1752866463/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Event-Schemas/azure-portal-storage-account-creation.jpg)

    > [!important]
    > **Tip**
    >
    > When choosing a region, consider factors such as latency and regulatory compliance to optimize performance and meet local requirements.

5.  Deploy the storage account (for example, in Canada Central using standard performance and LRS redundancy). After successfully creating the storage account, return to the Event Grid section and select the appropriate storage system topic.
6.  Choose the corresponding subscription and resource group. Assign a name to your system topic (e.g., SysTopicBlobST). Optionally, configure a managed identity if required.
7.  Click on "Review and Create" to deploy the system topic. Once the deployment is complete, click "Go to Resource." The Event Grid system topic resource will provide an overview of various metrics, such as published, failed, and matched events. The image below displays the system topic details:

    ![The image shows a Microsoft Azure portal interface for creating an Event Grid System Topic, with fields for topic details, system topic details, and identity settings.](https://kodekloud.com/kk-media/image/upload/v1752866467/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Event-Schemas/azure-portal-event-grid-topic-2.jpg)

8.  Following the deployment, you can add event subscriptions—for example, to trigger a Function App, Logic App, or webhook—to process the captured events. The next image showcases the Event Grid system topic along with its event subscription details:

    ![The image shows a Microsoft Azure portal interface displaying details of an Event Grid System Topic, including metrics and event subscription information. The page includes options for managing the topic and viewing metrics over different time periods.](https://kodekloud.com/kk-media/image/upload/v1752866469/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Event-Schemas/azure-portal-event-grid-topic-3.jpg)

> [!important]
> **Warning**
>
> Ensure to configure proper event subscriptions to handle events securely and efficiently. Misconfigurations may lead to loss of critical event data or unintended operations.

## Summary

This lesson introduced the Azure Event Grid event schema and demonstrated the deployment of an Event Grid system topic to capture events from Azure services like Blob Storage. In upcoming lessons, we will delve deeper into creating event subscriptions to deliver messages through various handlers, enhancing your ability to build responsive and scalable solutions on Azure.

For more information, refer to the [Azure Event Grid documentation](https://learn.microsoft.com/en-us/azure/event-grid/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/12346ae4-1f5e-4115-bb36-f10f47c8026e/lesson/54bae393-ad77-42a4-8956-05f92d2fc10d)**
>
> Watch video content
