# Overview of Azure Event Grid - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Grid/Overview-of-Azure-Event-Grid)

---

## Table of Contents

- Overview of Azure Event Grid
  - Real-World Example: Auto-Processing Images
  - Understanding the Event Schema
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Grid

# Overview of Azure Event Grid

Azure Event Grid is a fully managed event-routing service that simplifies communication between applications and services by efficiently transmitting events. It acts as a central hub, enabling seamless routing of events from various sources directly to the appropriate handlers. This service plays a key role in modern event-driven architectures by streamlining event processing and reducing the complexity of integrating diverse systems.

Azure Event Grid offers native integration with several Azure services, including [Azure Blob Storage](https://docs.microsoft.com/azure/storage/blobs/), [Azure Functions](https://docs.microsoft.com/azure/azure-functions/), [Logic Apps](https://docs.microsoft.com/azure/logic-apps/), and [IoT Hub](https://docs.microsoft.com/azure/iot-hub/). In addition to these built-in sources, you can create custom events and topics to address unique requirements. With the ability to define specific filters, you can ensure that only the relevant events reach designated endpoints, enhancing both efficiency and accuracy in event handling.

![The image is a diagram explaining Azure Event Grid, showing event sources on the left, event handlers on the right, and the Event Grid in the center as a mediator. It highlights various Azure services involved in event processing.](https://kodekloud.com/kk-media/image/upload/v1752866487/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Overview-of-Azure-Event-Grid/azure-event-grid-diagram.jpg)

> [!important]
> **Note**
>
> Azure Event Grid leverages the Cloud Native Foundation's Cloud Events 1.0 specification to standardize event formats, ensuring consistency across different systems.

Below are the five fundamental concepts that form the backbone of Azure Event Grid:

1.  **Events and Cloud Events:**  
    Events are the core units of data that signal activity within a system. With adherence to the Cloud Native Foundation Cloud Events 1.0 specification, all events maintain a standardized format, ensuring broad compatibility and consistency.
2.  **Event Sources:**  
    Event sources, such as Azure Blob Storage or IoT Hub, are the origins of events. Each source may generate multiple event types based on system activities, providing diverse insights into system behavior.
3.  **Topics:**  
    Topics serve as logical endpoints to which event sources send their events. They help organize and manage different event types efficiently, making it easier to handle and process multiple streams of data.
4.  **Event Subscriptions:**  
    Event subscriptions allow you to filter and direct specific events to designated endpoints or services. By specifying criteria during the subscription process, you ensure that only pertinent events are processed, reducing noise and improving system performance.
5.  **Event Handlers:**  
    Event handlers, such as Azure Function Apps, Logic Apps, or message queues, are endpoints designed to process incoming events. They execute specific actions—like triggering image processing or updating records—based on the event content.

In addition, the concept of a **Publisher** is vital. Publishers are applications or services responsible for generating and dispatching events to the Event Grid.

## Real-World Example: Auto-Processing Images

Consider a scenario that involves the automatic processing of images uploaded to Azure Blob Storage:

- **Event Generation:**  
  Azure Blob Storage acts both as the publisher and event source. When a new image is uploaded, an event is published containing detailed information such as the file name, file size, upload time, and file extension.
- **Event Routing:**  
  The published event is sent to a custom Event Grid topic, for instance, "image processing events."
- **Event Filtering:**  
  An event subscription on this topic applies filters to capture only specific image types (e.g., JPEG and PNG), excluding others like BMP or GIF for targeted processing.
- **Event Handling:**  
  An Azure Function, serving as the event handler, is triggered by the subscription. This Function processes the uploaded image according to the defined logic.

This real-world workflow clearly demonstrates how the core concepts of Azure Event Grid work together to form a robust, event-driven system.

## Understanding the Event Schema

Now that you are familiar with the core concepts behind Azure Event Grid, the next step is to explore the event schema. This schema lays out the structure and format of the events transmitted, providing clarity on how to consume and process these events effectively. By understanding the framework of the event schema, developers can design better integrations and improve overall system performance.

For more information, visit the [Azure Event Grid Documentation](https://docs.microsoft.com/azure/event-grid/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/12346ae4-1f5e-4115-bb36-f10f47c8026e/lesson/1ab614c9-f3b7-4952-8379-eea8e8b3ce5d)**
>
> Watch video content
