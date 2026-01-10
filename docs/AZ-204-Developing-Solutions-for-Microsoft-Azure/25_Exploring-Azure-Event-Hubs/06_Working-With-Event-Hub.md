# Working With Event Hub - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Event-Hubs/Working-With-Event-Hub)

---

## Table of Contents

- Working With Event Hub
  - Inspecting an Event Hub
  - Publishing Events to an Event Hub
  - Reading Events from an Event Hub
  - Combined Example in Visual Studio Code
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Event Hubs

# Working With Event Hub

This article demonstrates how to interact with Azure Event Hubs using the .NET SDK. You will learn how to inspect an Event Hub, publish event batches, and read events with a consumer client.

---

## Inspecting an Event Hub

In this section, we connect to an Event Hub using the Event Hubs producer client and retrieve its partition identifiers. This helps to understand how messages are distributed across partitions.

```
await using (var producer = new EventHubProducerClient(connectionString, eventHubName))
{
    string[] partitionIds = await producer.GetPartitionIdsAsync();
}
```

> [!important]
> **Note**
>
> The asynchronous method `GetPartitionIdsAsync` returns the list of available partition IDs from the Event Hub.

---

## Publishing Events to an Event Hub

This example demonstrates how to create a batch of events and publish it to an Event Hub. The batch is initialized using `CreateBatchAsync`, and events are added with `TryAdd`. Finally, the batch is sent using `SendAsync`.

```
await using (var producer = new EventHubProducerClient(connectionString, eventHubName))
{
    using EventDataBatch eventBatch = await producer.CreateBatchAsync();
    eventBatch.TryAdd(new EventData(new BinaryData("First")));
    eventBatch.TryAdd(new EventData(new BinaryData("Second")));


    await producer.SendAsync(eventBatch);
}
```

> [!important]
> **Note**
>
> In this snippet, two events are added to the batch before publishing them. Ensure that the messages fit within the batch size limit.

---

## Reading Events from an Event Hub

This section explains how to read events from an Event Hub using the consumer client. The example utilizes a cancellation token to limit the read operation to 45 seconds, preventing the application from waiting indefinitely when no messages are available.

```
string consumerGroup = EventHubConsumerClient.DefaultConsumerGroupName;


await using (var consumer = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName))
{
    using var cancellationSource = new CancellationTokenSource();
    cancellationSource.CancelAfter(TimeSpan.FromSeconds(45));


    await foreach (PartitionEvent receivedEvent in consumer.ReadEventsAsync(cancellationSource.Token))
    {
        // The loop waits for events available in the Event Hub.
        // When an event is received, it iterates with the event data.
        Console.WriteLine("Event Received: " + receivedEvent.Data.EventBody.ToString());
    }
}
```

> [!important]
> **Note**
>
> The cancellation token ensures that the event listening process terminates after 45 seconds, making it ideal for testing or short-lived processes.

---

## Combined Example in Visual Studio Code

Below is a comprehensive example that consolidates inspection, publishing, and reading of events. Before executing the code in Visual Studio Code, ensure that you have provided the correct connection string, event hub name, and credentials with appropriate send and listen permissions.

![The image shows the Microsoft Azure portal, specifically the "Shared access policies" section for an Event Hubs namespace. It displays details of a SAS policy, including keys and connection strings.](https://kodekloud.com/kk-media/image/upload/v1752866526/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Working-With-Event-Hub/azure-portal-event-hubs-sas-policy.jpg)

```
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Consumer;
using Azure.Messaging.EventHubs.Producer;
using System;
using System.Threading;
using System.Threading.Tasks;


class Program
{
    private const string connectionString = "Endpoint=sb://az204evhubssn.servicebus.windows.net/;SharedAccessKeyName=send-listen;SharedAccessKey=PhvjKQPF/Lmj+cE6NqlKLsKuBzJP3BJB+7hg=;EntityPath=hub-01";
    private const string eventHubName = "hub-01";
    private static readonly string consumerGroup = EventHubConsumerClient.DefaultConsumerGroupName;


    static async Task Main(string[] args)
    {
        await InspectEventHub();
        await PublishEventsToEventHub();
        await ReadEventsFromEventHub();
    }


    static async Task InspectEventHub()
    {
        Console.WriteLine("Inspecting Event Hub...");


        await using (var producer = new EventHubProducerClient(connectionString, eventHubName))
        {
            string[] partitionIds = await producer.GetPartitionIdsAsync();
            Console.WriteLine("Partition IDs: " + string.Join(", ", partitionIds));
        }
    }


    static async Task PublishEventsToEventHub()
    {
        Console.WriteLine("Publishing Events to Event Hub...");


        await using (var producer = new EventHubProducerClient(connectionString, eventHubName))
        {
            using EventDataBatch eventBatch = await producer.CreateBatchAsync();
            eventBatch.TryAdd(new EventData(new BinaryData("Hello, let's learn Azure Event Hubs!")));
            eventBatch.TryAdd(new EventData(new BinaryData("Let's learn to send events to Event Hubs!")));

            await producer.SendAsync(eventBatch);
            Console.WriteLine("Events sent.");
        }
    }


    static async Task ReadEventsFromEventHub()
    {
        Console.WriteLine("Reading Events from Event Hub...");


        await using (var consumer = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName))
        {
            using var cancellationSource = new CancellationTokenSource();
            cancellationSource.CancelAfter(TimeSpan.FromSeconds(45));


            await foreach (PartitionEvent receivedEvent in consumer.ReadEventsAsync(cancellationSource.Token))
            {
                Console.WriteLine($"Event Received: {receivedEvent.Data.EventBody.ToString()}");
            }
        }
    }
}
```

> [!important]
> **Key Takeaways**
>
> - The InspectEventHub method retrieves and prints partition IDs.
> - The PublishEventsToEventHub method creates an event batch and sends messages.
> - The ReadEventsFromEventHub method listens for events and prints them until a timeout occurs.

---

This tutorial has provided a practical guide to working with Azure Event Hubs using the .NET SDK. By understanding how to inspect, send, and receive events, you are well-equipped to integrate Event Hubs into your applications and harness the full potential of real-time data processing in Azure.

For additional resources, consider visiting:

- [Azure Event Hubs Documentation](https://docs.microsoft.com/azure/event-hubs/)
- [Microsoft Azure Portal](https://portal.azure.com/)
- [Azure SDK for .NET](https://github.com/Azure/azure-sdk-for-net)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/a75906db-1eb1-43d3-a85d-1f45747df946/lesson/8c90d334-7f20-4a16-8c80-9c47be67db85)**
>
> Watch video content
