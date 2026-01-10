# Controlling Access to Events - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Hubs/Controlling-Access-to-Events)

---

## Table of Contents

- Controlling Access to Events
  - Built-In Roles for Event Hubs
  - Authorization Methods
  - Configuring Access in the Azure Portal
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Hubs

# Controlling Access to Events

In this guide, we explain how Azure controls access to events in Event Hubs by using built-in roles and various authorization methods. Leveraging these access configurations, you can secure your data and manage the event flow between different entities effectively.

## Built-In Roles for Event Hubs

Azure provides three primary built-in roles for Event Hubs, each designed for specific use cases:

1.  **Event Hub Data Owner**  
    This role grants full access to Event Hub resources. Users assigned as Data Owners can send, receive, and manage all aspects of Event Hubs.
2.  **Event Hub Data Sender**  
    This role is intended for applications or users that strictly need to send events. It provides send-only permissions, ensuring a controlled access environment.
3.  **Event Hub Data Receiver**  
    Tailored for applications or users that only require reading (or consuming) events, this role allows access to incoming event data without send privileges.

![The image shows three Azure built-in roles for Event Hubs: Data Owner, Data Sender, and Data Receiver, each with a brief description of their access permissions.](https://kodekloud.com/kk-media/image/upload/v1752866493/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Access-to-Events/azure-event-hubs-roles-descriptions.jpg)

## Authorization Methods

Azure offers multiple methods to securely authorize access to Event Hubs. Each method is designed for specific scenarios:

- **Managed Identities**  
  Managed Identities enable you to securely grant access to Event Hubs without the overhead of managing credentials. Integrating with the Microsoft Identity Platform, this method allows you to request an OAuth access token directly in your code.
- **Microsoft Identity Platform**  
  By using the Microsoft Identity Platform in conjunction with Managed Identities, you eliminate the need to embed credentials within your applications. This setup streamlines authentication and enhances security.
- **Event Hub Publisher with Shared Access Signature (SAS)**  
  An Event Publisher creates a virtual endpoint for an Event Hub and is used exclusively for sending messages. When using a SAS token for publishing, the permissions are limited to sending only.
- **Event Hub Consumer with Shared Access Signature (SAS)**  
  Consumers access Event Hubs to receive messages using SAS tokens. It’s important to note that these permissions do not allow the consumer to send messages.

![The image is a diagram titled "Authorize Access," showing four options: Managed Identities, Microsoft Identity Platform, Event Hubs publishers with shared access signatures, and Event Hubs consumers with shared access signatures.](https://kodekloud.com/kk-media/image/upload/v1752866494/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Controlling-Access-to-Events/authorize-access-diagram-options.jpg)

> [!important]
> **Note**
>
> For enhanced security, always follow the principle of least privilege when assigning roles and permissions in your Event Hubs.

## Configuring Access in the Azure Portal

You can configure access for Event Hubs directly within the Azure Portal. Under Shared Access Policies, you can:

- Create and manage policies for the entire namespace.
- Specify the required permissions for each policy.
- View essential details such as the primary key, secondary key, and connection string for each policy.

> [!important]
> **Warning**
>
> Ensure that only necessary permissions are granted to minimize exposure and potential security risks.

By leveraging these built-in roles and authorization methods, you can effectively control access to your Event Hubs. This approach allows you to define and enforce the actions that each user or application can perform, ensuring robust security and efficient event data management.

For further information, refer to the [Azure Event Hubs documentation](https://docs.microsoft.com/azure/event-hubs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/a75906db-1eb1-43d3-a85d-1f45747df946/lesson/ff06ec1b-20a9-4172-83cd-580b36ba1e5b)**
>
> Watch video content
