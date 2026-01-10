# Discovering Azure Event Hubs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Hubs/Discovering-Azure-Event-Hubs)

---

## Table of Contents

- Discovering Azure Event Hubs
  - Overview of Azure Event Hubs
  - Core Components of Event Hubs
  - Deploying an Event Hub via Azure Portal
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Hubs

# Discovering Azure Event Hubs

In this article, we explore Azure Event Hubs, compare it with Azure Event Grid, and explain when to use each service for your data streaming and event-driven architecture needs.

Azure Event Grid is optimized for event-driven workflows where lightweight notifications trigger actions—ideal for scenarios like file uploads to storage accounts or database changes. In contrast, Azure Event Hubs is engineered as a big data pipeline for ingesting and processing large volumes of streaming data. This makes it perfect for telemetry collection, IoT device data streams, and real-time analytics.

## Overview of Azure Event Hubs

Azure Event Hubs is a unified streaming platform designed to collect, retain, and process data streams in real time. Key benefits include:

- Real-time data ingestion with configurable time retention, allowing you to replay or process data later.
- Decoupling of data producers and consumers so that multiple applications can consume the same data stream simultaneously.
- High scalability that supports millions of events per second, ensuring efficient handling of massive data volumes from IoT devices, applications, or cloud infrastructure.

> [!important]
> **Key Features of Azure Event Hubs**
>
> - Fully managed Platform as a Service (PaaS), minimizing configuration overhead.
> - Flexibility for both real-time and batch processing.
> - Dynamic scaling with features like auto-inflate to meet rising data demands.

![The image is a table listing features of Event Hubs, including being a fully managed PaaS, supporting real-time and batch processing, scalability, and a rich ecosystem. Each feature is briefly described in the adjacent column.](https://kodekloud.com/kk-media/image/upload/v1752866496/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Event-Hubs/event-hubs-features-table.jpg)

Azure Event Hubs also integrates seamlessly with [Apache Kafka](https://kafka.apache.org), allowing you to leverage existing Kafka ecosystems for smooth application integration.

## Core Components of Event Hubs

Understanding the main components of Azure Event Hubs is crucial before deployment. These include:

- **Event Hub Client:** The application interface for connecting and sending data.
- **Event Hub Producer:** Responsible for publishing events to the Event Hub.
- **Consumer:** Reads and processes incoming event streams.
- **Partition:** Organizes data into segments that allow parallel processing.
- **Consumer Group:** Enables multiple consumers to read from the same partition independently.
- **Receivers:** Components that retrieve events for further processing or storage.
- **Throughput/Processing Units:** Define the capacity for handling data, which can be scaled to meet your demand.

Armed with these concepts, you are ready to deploy an Event Hub using the Azure Portal.

## Deploying an Event Hub via Azure Portal

1.  **Create an Event Hub Namespace:**
    - In the Azure Portal, search for "Event Hub" and create a new namespace within a resource group.
    - Ensure that the namespace has a unique name registered under servicebus.windows.net.
    - Choose your region and select an appropriate pricing tier based on your required throughput units.

    ![The image shows the "Create Namespace" page in Microsoft Azure's Event Hubs, where users can configure project and instance details such as subscription, resource group, namespace name, location, pricing tier, and throughput units.](https://kodekloud.com/kk-media/image/upload/v1752866497/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Event-Hubs/create-namespace-azure-event-hubs.jpg)

    > [!important]
    > **Pricing Tier Options**
    >
    > For demonstration purposes, select the basic pricing tier. It offers a cost-effective option (approximately $11) with the potential to scale throughput. The standard tier includes additional features such as auto-inflate for autoscaling.

2.  **Configure Advanced Settings:**
    - Specify security settings, including the minimum TLS version and local authentication requirements. You must provide the access key or connection string when posting data.
    - Note that public networking is enabled by default. To enable private access, consider upgrading to the standard or premium tier.

3.  **Finalize Namespace Creation:**
    - After running the validation, create your Event Hub namespace.

    ![The image shows a Microsoft Azure portal screen for creating an Event Hubs namespace, displaying configuration details like namespace name, subscription, location, and security settings.](https://kodekloud.com/kk-media/image/upload/v1752866498/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Event-Hubs/azure-event-hubs-namespace-creation.jpg)

4.  **Create a New Event Hub:**
    - Once the namespace is deployed, click on "Go to resource" to proceed with creating an individual Event Hub within the namespace.
    - Familiarize yourself with additional concepts such as Event Hubs Capture, which is designed for automatic data capture and long-term retention or batch processing.

    ![The image shows the Microsoft Azure portal displaying details of an Event Hubs Namespace, including its status, location, subscription, and performance metrics like requests and throughput over time.](https://kodekloud.com/kk-media/image/upload/v1752866500/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Discovering-Azure-Event-Hubs/azure-portal-event-hubs-namespace.jpg)

A namespace serves as a container for multiple Event Hubs. With this in mind, you can now explore the benefits of Event Hubs Capture to automate data retention and facilitate batch processing.

Whether you're processing data from IoT sensors or analyzing application telemetry, Azure Event Hubs provides a robust, scalable solution to manage your high-volume data streams efficiently. For more information, visit the [Azure Event Hubs Documentation](https://learn.microsoft.com/en-us/azure/event-hubs/).

By leveraging these features and components, you can effectively design and implement scalable data streaming solutions using Azure Event Hubs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/a75906db-1eb1-43d3-a85d-1f45747df946/lesson/84cd7700-30f2-494b-aa3c-43ddaf4861e1)**
>
> Watch video content
