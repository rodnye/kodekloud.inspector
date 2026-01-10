# Change Feed in Azure Cosmos DB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Working-With-Azure-Cosmos-DB/Change-Feed-in-Azure-Cosmos-DB)

---

## Table of Contents

- Change Feed in Azure Cosmos DB
  - Key Components of the Change Feed Processor Architecture
  - Sample Code: Setting Up the Change Feed Processor
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Working With Azure Cosmos DB

# Change Feed in Azure Cosmos DB

Azure Cosmos DB's change feed is a robust feature that maintains a persistent record of all modifications made to items within a container. By leveraging the change feed, applications can track updates in real time and process them sequentially, ensuring that no changes are overlooked.

There are two primary models for utilizing the change feed: the push model and the pull model.

- In the **push model**, changes are immediately sent to consumers as soon as they occur. This approach is ideal for event-driven architectures where continuous polling is not desirable.
- In the **pull model**, the application periodically polls the change feed to retrieve changes. This method offers greater control over when and how frequently changes are processed, making it suitable for scenarios where immediate reaction is not required. However, it does demand additional management of the polling infrastructure to maintain consistency.

For most real-time processing scenarios, the push model is often preferred as it eliminates the need for constant polling and simplifies the overall process.

![The image illustrates the change feed in Azure Cosmos DB, showing a flow from Azure Cosmos DB to push and pull models, with Azure Functions triggers and a change feed processor library.](https://kodekloud.com/kk-media/image/upload/v1752866783/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Change-Feed-in-Azure-Cosmos-DB/azure-cosmos-db-change-feed-diagram.jpg)

Azure recommends two native options for implementing the push model:

1.  **Azure Functions with Cosmos DB triggers**  
    Automatically trigger functions when changes occur. This option removes the need for continuous polling and simplifies scaling within event-driven architectures.
2.  **Change Feed Processor Library**  
    Available as part of the Cosmos DB SDK for .NET and Java, this library facilitates reading the change feed and distributing events across multiple consumers, ensuring horizontally scalable processing.

![The image explains the use of Azure Functions and Change Feed Processor in Azure Cosmos DB. It highlights how Azure Functions are triggered by new events in the change feed, and how the Change Feed Processor simplifies event processing across multiple consumers.](https://kodekloud.com/kk-media/image/upload/v1752866785/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Change-Feed-in-Azure-Cosmos-DB/azure-functions-change-feed-processor.jpg)

## Key Components of the Change Feed Processor Architecture

The change feed processor architecture comprises four main components:

- **Monitored Container:** The source container where changes occur.
- **Lease Container:** Manages distributed processing by coordinating leases.
- **Compute Instance:** Processes the changes.
- **Delegate:** Contains custom logic to handle each change.

Together, these components enable you to build scalable and resilient systems that respond to changes in real time.

> [!important]
> **Tip**
>
> For optimized processing and scalability, ensure that your lease container is appropriately provisioned to handle the expected throughput.

## Sample Code: Setting Up the Change Feed Processor

The following C# code snippet demonstrates how to set up the change feed processor using the Cosmos DB SDK. In this example, the processor is initialized with the source container, lease container, and a delegate function that processes the changes.

```
private static async Task<ChangeFeedProcessor> StartChangeFeedProcessorAsync(
    CosmosClient cosmosClient,
    IConfiguration configuration)
{
    string databaseName = configuration["SourceDatabaseName"];
    string sourceContainerName = configuration["SourceContainerName"];
    string leaseContainerName = configuration["LeasesContainerName"];

    Container leaseContainer = cosmosClient.GetContainer(databaseName, leaseContainerName);

    ChangeFeedProcessor changeFeedProcessor = cosmosClient.GetContainer(databaseName, sourceContainerName)
        .GetChangeFeedProcessorBuilder<ToDoItem>(
            processorName: "changeFeedSample",
            onChangesDelegate: HandleChangesAsync)
        .WithInstanceName("consoleHost")
        .WithLeaseContainer(leaseContainer)
        .Build();

    Console.WriteLine("Starting Change Feed Processor...");
    await changeFeedProcessor.StartAsync();
    Console.WriteLine("Change Feed Processor started.");

    return changeFeedProcessor;
}
```

In this sample:

- Configuration values define the database, source container, and lease container names.
- The change feed processor is constructed using the `GetChangeFeedProcessorBuilder` method. The delegate `HandleChangesAsync` is provided to process the incoming changes.
- The processor starts asynchronously, continuously monitoring and handling changes without requiring manual polling.

> [!important]
> **Note**
>
> This sample demonstrates how to leverage Azure Cosmos DB’s change feed functionality to create efficient, real-time data processing systems. The underlying infrastructure manages scaling and consistency, allowing you to focus on processing the data.

This guide has covered the foundational concepts and provided a practical example of implementing a change feed processor in Azure Cosmos DB. For further reading and best practices in managing cloud-based data workflows, explore additional resources such as [Azure Cosmos DB Documentation](https://docs.microsoft.com/azure/cosmos-db/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/9b20db07-78f4-4774-8a8c-8c2c182ebd0e/lesson/76179776-b51b-4260-8d55-2cbe8b471f30)**
>
> Watch video content
