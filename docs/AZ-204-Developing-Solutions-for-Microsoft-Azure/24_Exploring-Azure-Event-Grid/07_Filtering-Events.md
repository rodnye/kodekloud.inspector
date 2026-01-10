# Filtering Events - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Grid/Filtering-Events)

---

## Table of Contents

- Filtering Events
  - Subject Filtering
  - Advanced Filtering
  - Configuring Filters in the Azure Portal
  - Watch Video
    - Using Advanced Filtering in Practice

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Grid

# Filtering Events

In this lesson, we explore how Azure Event Grid filters incoming events so that only relevant events are delivered to your endpoint. By default, all event types from the event source are sent to the subscribed endpoint. However, you can customize this behavior by configuring Event Grid to deliver only selected event types, reducing unnecessary noise and ensuring that your application processes only the events it needs.

![The image shows a comparison between "Default" and "Option" event type filtering, with "Default" sending all event types to the endpoint and "Option" allowing specific event types to be sent.](/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Filtering-Events/event-type-filtering-comparison.jpg)

For example, if you prefer to receive only deletion events from a storage account rather than every possible event, you can set up targeted filtering rules.

## Subject Filtering

Subject filtering allows for refining events based on a resource path or subject. This is accomplished by specifying a starting or ending value for the event subject. If you work with Azure Blob Storage and need to receive events solely from specific containers (such as default or test containers), subject filtering enables you to restrict events to just those containers while ignoring all others.

![The image is about "Subject Filtering" and includes two colored boxes. The first box explains specifying starting or ending values for a subject, and the second provides an example of filtering subjects for specific events.](/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Filtering-Events/subject-filtering-boxes-example.jpg)

## Advanced Filtering

Advanced filtering offers the capability to inspect values within an event's data field for more granular filtering. This method allows you to filter based on metadata, payload content, or other specific event properties. Supported comparison operators include:

- string contains
- string ends with
- string does not begin with
- string does not end with
- is null
- number is in
- boolean equals

Using these operators, you can construct filters for complex JSON arrays within event data. This is especially useful when targeting properties like access tier, blob type, or content length exceeding a specified threshold.

![The image is a slide titled "Advanced Filtering" with two colored boxes. The left box says "Filter by values in data fields," and the right box says "Specify comparison operators for precise filtering.](/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Filtering-Events/advanced-filtering-data-fields-comparison.jpg)

> [!important]
> **Note**
>
> Advanced filtering is ideal for scenarios requiring precise control over event processing. By leveraging various comparison operators, you can effectively handle complex events tailored to your application needs.

## Configuring Filters in the Azure Portal

To configure these filters, navigate to your event subscription in the Azure Event Grid setup within the Azure Portal. Under the **Filters** section, you can view and manage the available event types – a critical step in limiting the events that reach your endpoint.

If you enable subject filtering, you can specify a particular container name to further fine-tune which events are delivered. For instance, you might restrict events to those where the subject ends with a specific extension, and you even have the option for case-sensitive matching when needed.

![The image shows a Microsoft Azure portal page for configuring an event subscription with filters for event types and subject filters. It includes options for enabling subject filtering and advanced filters.](/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Filtering-Events/azure-portal-event-subscription-filters.jpg)

### Using Advanced Filtering in Practice

Advanced filtering is also available for a detailed inspection of event data. For example, when reviewing a captured event within a Logic App, you might observe a property in the event’s data, such as API. To filter for events where data.API equals "put blob," you would create an advanced filter with that condition. This approach empowers you to process complex JSON arrays effectively, like filtering based on blob properties.

![The image shows a Microsoft Azure portal interface displaying the run history of a logic app named "webhook-ide-oauth." It includes details of HTTP requests received, with parameters and outputs visible on the right side.](/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Filtering-Events/azure-portal-logic-app-history.jpg)

> [!important]
> **Warning**
>
> Ensure that your filter conditions are meticulously tested to avoid inadvertently excluding important events from your workflow.

By configuring these filters, Azure Event Grid ensures that your application processes only the events relevant to your business logic, improving performance and reducing unnecessary load.

As we conclude our discussion on Event Grid filtering, proceed to the next section where we cover Event Hubs for further insights into event-driven architectures.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/12346ae4-1f5e-4115-bb36-f10f47c8026e/lesson/586ed7a2-f02e-412c-8879-dc0d33212762)**
>
> Watch video content
