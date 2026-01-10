# Design a messaging solution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-an-app-architecture-solution/Design-a-messaging-solution)

---

## Table of Contents

- Design a messaging solution
  - Azure Queue Storage
  - Azure Service Bus
  - Choosing the Right Messaging Service
  - Watch Video
    - Service Bus Queues
    - Service Bus Topics (Publish/Subscribe Model)

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design an app architecture solution

# Design a messaging solution

In this lesson, we explore how to design a robust messaging solution using Azure services. You will learn about two primary Azure messaging services: **Queue Storage** and **Service Bus**. The Service Bus itself offers two models for message handling—queues and topics—which will be discussed in detail.

## Azure Queue Storage

Azure Queue Storage, a component of Azure Storage, is designed to store large volumes of messages that are processed asynchronously. These messages are securely accessed from anywhere over HTTPS, making it ideal for scalable applications. With support for millions of messages (limited only by the storage account capacity), Queue Storage ensures high reliability, guaranteed message delivery, and transactional support.

Consider the following scenario for a photo sharing application:

- **Component A:** A mobile application that uploads pictures.
- **Component B:** A web API that processes these pictures.

When a user uploads a picture via Component A, the picture details are sent as a message to the Azure Queue. The web API then retrieves and processes these messages sequentially, ensuring that the pictures are stored in the database and made available to other users.

> [!important]
> **Key Benefits**
>
> - Increased reliability
> - Guaranteed message delivery
> - Transactional support

![The image illustrates the design for Azure Queue storage, showing components A and B connected through a message queue, with details about access, message size, and capacity.](https://kodekloud.com/kk-media/image/upload/v1752867180/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-a-messaging-solution/azure-queue-storage-design-diagram.jpg)

Each message in Azure Queue Storage can be up to 64 KB in size. The queue can store millions of messages, only limited by the total capacity of the storage account.

## Azure Service Bus

Azure Service Bus is a fully managed enterprise message broker engineered for more complex messaging scenarios. It supports two distinct models:

- **Service Bus Queues:** Function similarly to Azure Queues but are built on a dedicated messaging infrastructure, supporting multiple communication protocols and complex data contracts.
- **Service Bus Topics (Publish/Subscribe Model):** Enable a single message to be delivered to multiple subscribers concurrently, allowing multiple processing tasks to be triggered from one event.

### Service Bus Queues

Service Bus Queues provide an enterprise-grade messaging solution. In these queues, messages are temporarily stored until the receiving component is ready to process them. The workflow mirrors that of Azure Queue Storage: Component A sends a message that Component B later processes.

![The image is an infographic about designing for Azure Service Bus, featuring a message queue diagram and key points about its infrastructure and delivery guarantees. It includes illustrations of planes and text highlighting its use for enterprise applications.](https://kodekloud.com/kk-media/image/upload/v1752867180/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-a-messaging-solution/azure-service-bus-infographic.jpg)

### Service Bus Topics (Publish/Subscribe Model)

Service Bus Topics extend the basic queuing model to support the publish/subscribe paradigm. In this model, when a message is sent to a topic, it notifies multiple subscribers at the same time. For instance, in a music sharing application, when a user listens to a song:

- One subscription might update the user's listening history.
- A different subscription could update an artist's playlist.
- A third subscription might add the song to a list of favorites.

This model demonstrates how a single message can serve multiple processing needs concurrently.

## Choosing the Right Messaging Service

When selecting the appropriate messaging service in Azure, consider the following guidelines:

| Service                 | Key Features                                                                                                       | Use Case                                                                     | SLA                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Azure Queue Storage** | Supports simple queuing, large storage sizes (up to the storage account capacity), secure access over HTTPS.       | Straightforward message organization for asynchronous processing.            | Varies (dependent on storage tier: GRS, LRS, RA-GRS) |
| **Service Bus Queues**  | FIFO guarantee, peek lock and receive-delete modes, ability to process message batches without continuous polling. | Enterprise applications requiring advanced messaging features and protocols. | 99.9%                                                |
| **Service Bus Topics**  | Publish/subscribe model allowing one message to trigger multiple subscribers.                                      | Scenarios where a single event must initiate various processing tasks.       | 99.9%                                                |

> [!important]
> **Service Comparison**
>
> When deciding on a messaging service, ensure that the selected option aligns with your application's complexity and the required level of delivery guarantees.

![The image is a table comparing messaging services, specifically Azure Queue Storage, Service Bus Queues, and Service Bus Topics, highlighting their use cases and SLA details.](https://kodekloud.com/kk-media/image/upload/v1752867182/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-a-messaging-solution/messaging-services-comparison-table.jpg)

That concludes our overview of Azure messaging solutions. In the next section, we will transition to discussing event-driven solutions. For more in-depth insights on Azure services, refer to the [Azure Documentation](https://docs.microsoft.com/azure).

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/e4a90bf7-20e1-4e3a-a0e8-36c9595943f1/lesson/277c3ee2-0fb1-4b8e-84f8-895863607f9d)**
>
> Watch video content
