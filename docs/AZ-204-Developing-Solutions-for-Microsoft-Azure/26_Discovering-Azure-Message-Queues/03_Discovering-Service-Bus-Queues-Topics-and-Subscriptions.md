# Discovering Service Bus Queues Topics and Subscriptions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Discovering-Azure-Message-Queues/Discovering-Service-Bus-Queues-Topics-and-Subscriptions)

---

## Table of Contents

- Discovering Service Bus Queues Topics and Subscriptions
  - Queues
  - Topics and Subscriptions
  - Rules and Actions in Subscriptions
  - Conclusion
  - Watch Video
    - Message Receive Modes

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Discovering Azure Message Queues

# Discovering Service Bus Queues Topics and Subscriptions

In this lesson, we explore Azure Service Bus and its fundamental components: queues, topics, and subscriptions. Azure Service Bus provides a reliable mechanism for storing and retrieving messages using a first-in, first-out (FIFO) approach. This ensures that messages are processed sequentially, which is essential for many business applications.

## Queues

Queues are ideal when messages must be processed in order and handled only once. Think of a queue as a waiting line where the first person in line is the first served. They also support the competing consumers pattern, where multiple receivers can process messages concurrently but each message is exclusively handled by one receiver.

![The image illustrates the concept of a queue with the acronym "FIFO" (First In, First Out) using colored boxes, showing the flow from "IN" to "OUT."](https://kodekloud.com/kk-media/image/upload/v1752866293/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Service-Bus-Queues-Topics-and-Subscriptions/fifo-queue-concept-illustration.jpg)

In scenarios with multiple consumers accessing a queue, Azure Service Bus guarantees that each message is processed only once, regardless of the number of receivers attempting to handle them.

![The image illustrates a concept of queues, showing a group of people lined up and branching out into four separate paths, each represented by a colored circle with a walking figure.](https://kodekloud.com/kk-media/image/upload/v1752866294/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Service-Bus-Queues-Topics-and-Subscriptions/queues-people-branching-paths.jpg)

### Message Receive Modes

Azure Service Bus queues offer two distinct message receive modes:

1.  **Receive and Delete:**  
    In this mode, when a receiver picks up a message, it is immediately marked as consumed and deleted from the queue. This approach is straightforward and efficient but does not allow for recovery in case of an error during processing. It is best suited for non-critical applications such as logging or telemetry data.

    ![The image illustrates a concept of "Receive and Delete" with two envelope icons on the left and a receiver icon with a crossed-out envelope on the right.](https://kodekloud.com/kk-media/image/upload/v1752866296/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Service-Bus-Queues-Topics-and-Subscriptions/receive-and-delete-envelope-icons.jpg)

    ![The image shows two labeled sections: "Logging" with an icon of a document and "Telemetry data" with an icon of a satellite.](https://kodekloud.com/kk-media/image/upload/v1752866297/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Service-Bus-Queues-Topics-and-Subscriptions/logging-telemetry-data-icons.jpg)

2.  **Peek Lock:**  
    In this more reliable mode, a receiver locks the message without immediately deleting it. The message can be processed, and only after successful handling, it is explicitly completed and removed from the queue. If processing fails, the message remains available for reprocessing. This mode is ideal for critical applications like order processing or financial transactions, where ensuring delivery is paramount.

    ![The image illustrates a concept called "Peek Lock" with icons of envelopes and a receiver, suggesting a process of message handling or delivery.](https://kodekloud.com/kk-media/image/upload/v1752866298/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Service-Bus-Queues-Topics-and-Subscriptions/peek-lock-message-handling-icons.jpg)

> [!important]
> **Key Takeaway**
>
> Choosing between "Receive and Delete" and "Peek Lock" depends on the robustness of your application. Use "Receive and Delete" for high-throughput, low-risk scenarios, and "Peek Lock" when message reliability is critical.

## Topics and Subscriptions

Topics in Azure Service Bus operate like broadcast stations. When a message is sent to a topic, it is broadcast to multiple subscribers, enabling a one-to-many communication model. This is highly advantageous for delivering the same message to various endpoints.

Imagine a news broadcast where a single update is sent out to multiple subscribers, each receiving news that is relevant to their interests.

![The image illustrates a publish-and-subscribe model, showing a publisher connected to multiple subscribers, indicating a one-to-many communication pattern.](https://kodekloud.com/kk-media/image/upload/v1752866300/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Service-Bus-Queues-Topics-and-Subscriptions/publish-subscribe-model-illustration.jpg)

Subscriptions act as individual listeners or endpoints that receive messages from a topic. Each subscription may include filters to ensure that only messages matching defined criteria are delivered. For instance, a news service might use subscriptions to send only sports, technology, or political updates to subscribers based on their preferences.

## Rules and Actions in Subscriptions

Subscriptions can be fine-tuned with rules and actions to customize message delivery. These rules allow you to identify messages based on specific properties and apply modifications so that each subscription only receives notifications that are of interest. For example, you can set up a rule to filter and process only error notifications or high-priority orders for expedited processing in an e-commerce system.

![The image is a flowchart titled "Rules and Actions," showing a process from configuring subscriptions to identifying messages with desired properties and applying modifications, followed by filtering actions to copy a subset of messages.](https://kodekloud.com/kk-media/image/upload/v1752866300/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Service-Bus-Queues-Topics-and-Subscriptions/rules-and-actions-flowchart.jpg)

## Conclusion

This lesson provided an in-depth look at the core concepts of Azure Service Bus:

- Queues, which ensure FIFO message delivery and offer versatile receive modes such as "Receive and Delete" and "Peek Lock."
- Topics and subscriptions, which facilitate one-to-many communication, making them ideal for broadcast scenarios.
- Customization of message delivery through rules and actions, enabling tailored message filtering for diverse applications.

Next, we will delve into how Service Bus handles message payloads and serialization.

For more detailed information on Azure Service Bus concepts, check out the [Azure Service Bus Documentation](https://docs.microsoft.com/en-us/azure/service-bus-messaging/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/832be194-8cc3-4e29-b04e-c2fe027078a7/lesson/9bfe2152-da3c-461e-a911-a02eb0b5bb71)**
>
> Watch video content
