# Working With Microsoft - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Working-With-Azure-Cosmos-DB/Working-With-Microsoft)

---

## Table of Contents

- Working With Microsoft
  - Creating Items in Azure Cosmos DB
  - Reading An Item from Azure Cosmos DB
  - Querying Multiple Items with SQL Syntax
  - Creating a Database and Container in the Azure Portal
  - Using the Data Migration Tool (DMT)
  - Working with Azure Cosmos DB in Visual Studio
  - Next Steps
  - Watch Video
    - Inserting a New Airport Record
    - Querying Data from Cosmos DB

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Working With Azure Cosmos DB

# Working With Microsoft

In this article, you'll learn how to interact with Azure Cosmos DB using the Microsoft .NET SDK. We will cover operations such as creating, reading, and querying items, as well as setting up a Cosmos DB database and container via the Azure portal. Additionally, we explain how to use the Data Migration Tool (DMT) for bulk data imports and integrate Cosmos DB operations within Visual Studio. This guide is ideal for developers looking to efficiently manage Azure Cosmos DB resources with .NET.

---

## Creating Items in Azure Cosmos DB

This section demonstrates how to create a new item (an employee record) in an Azure Cosmos DB container using the .NET SDK. First, a connection is established using the CosmosClient class where the endpoint and key are provided, and a container reference is acquired. Then, an employee record is defined and uploaded using both the CreateItemAsync and UpsertItemAsync methods to ensure idempotency.

```
// Get container reference
CosmosClient client = new CosmosClient(endpoint, key);
Container container = client.GetContainer(databaseName, collectionName);


// Create employee record
Employee employeeRecord = new Employee {
    id = "123e4567-e89b-12d3-a456-426614174000",
    name = "John Doe",
    department = "Human Resources",
    isFullTime = true,
    salary = 4500,
    yearsOfExperience = 5
};


// Upload item
Employee item = await container.CreateItemAsync(employeeRecord);
item = await container.UpsertItemAsync(employeeRecord);
```

The snippet above shows the entire process: connecting to the database, defining an employee record with necessary fields (ID, name, department, full-time status, salary, and years of experience), and uploading that record while handling potential duplicates gracefully.

---

## Reading An Item from Azure Cosmos DB

After setting up the container, you might need to retrieve a specific item using its unique ID and partition key. The following example demonstrates how to read an employee record from the container:

```
// Get container reference
CosmosClient client = new CosmosClient(endpoint, key);
Container container = client.GetContainer(databaseName, collectionName);


// Define unique item properties
string id = "123e4567-e89b-12d3-a456-426614174000";
PartitionKey partitionKey = new PartitionKey("Human Resources");


// Read item using unique id and partition key
ItemResponse<Employee> response = await container.ReadItemAsync<Employee>(id, partitionKey);
Employee item = response.Resource;
```

This code utilizes the ReadItemAsync method with the unique identifier and the appropriate partition key ("Human Resources") to retrieve the employee record. The returned ItemResponse object holds the employee record that can be processed further in your application.

---

## Querying Multiple Items with SQL Syntax

Azure Cosmos DB supports rich SQL queries to retrieve multiple items that match specific criteria. In this example, we fetch all employees with the property `isFullTime` set to `true` using the GetItemQueryIterator method.

```
// Get container reference
CosmosClient client = new CosmosClient(endpoint, key);
Container container = client.GetContainer(databaseName, collectionName);


// Create a feed iterator using a SQL query
FeedIterator<Employee> iterator = container.GetItemQueryIterator<Employee>(
    "SELECT * FROM employees e WHERE e.isFullTime = true"
);


// Process query results in batches
while (iterator.HasMoreResults)
{
    FeedResponse<Employee> batch = await iterator.ReadNextAsync();
    foreach (Employee item in batch)
    {
        // Process each employee record
    }
}
```

This method is efficient for working with large datasets by processing results in batches. The SQL statement filters the records for full-time employees, and the code iterates through each batch to handle individual records.

---

## Creating a Database and Container in the Azure Portal

You can also create a Cosmos DB database and container directly through the Azure portal. In Data Explorer, select the option to create a new database if one does not exist. For example, you might create a database named **FlightDetails** and a container titled **Airport Codes**. During this process, you can configure the max Request Units (RUs) (e.g., 1000 RUs in the free tier) along with other indexing and partition key settings.

![The image shows the Microsoft Azure portal interface, specifically the overview page for an Azure Cosmos DB account. It displays various details such as status, location, and monitoring options.](https://kodekloud.com/kk-media/image/upload/v1752866795/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Working-With-Microsoft/azure-cosmos-db-overview-portal.jpg)

![The image shows the Azure Cosmos DB interface, with options to launch a quick start or create a new container. A "New Container" setup panel is open, allowing configuration of database ID, throughput, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752866796/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Working-With-Microsoft/azure-cosmos-db-new-container-setup.jpg)

> [!important]
> **Tip**
>
> After creating the container, you can utilize it for bulk data import and advanced query operations through Data Explorer.

---

## Using the Data Migration Tool (DMT)

For bulk data import scenarios, the Data Migration Tool (DMT) is an excellent utility that allows for moving data from various sources (local JSON files, S3, Blob Storage, etc.) into Azure Cosmos DB.

Below is an example JSON configuration snippet that shows how to transfer data from a local JSON file to a Cosmos DB NoSQL container:

```
{
  "Source": "JSON",
  "Sink": "Cosmos-nosql",
  "SourceSettings": {
    "FilePath": "C:\\btcddata\\simple_json.json"
  },
  "SinkSettings": {
    "ConnectionString": "AccountEndpoint=https://localhost:8081;AccountKey=Czy6ybj...",
    "Database": "datamigration",
    "Container": "btcddata",
    "PartitionKeyPath": "/id",
    "CreateContainer": true,
    "IncludeMetadataFields": false
  }
}
```

This configuration demonstrates how to designate a JSON file as the source and specify the connection details for the Cosmos DB target.

A GitHub repository for the Data Migration Tool also provides additional sample configuration files and detailed usage instructions:

![The image shows a GitHub page for the Azure Cosmos DB data migration desktop tool, featuring sections on quick installation and extension documentation with links to various database and storage options.](https://kodekloud.com/kk-media/image/upload/v1752866798/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Working-With-Microsoft/azure-cosmos-db-migration-tool.jpg)

Another sample configuration after adjustments might look like this:

```
{
  "Source": "JSON",
  "Sink": "Cosmos-nosql",
  "SourceSettings": {
    "FilePath": "/Users/rithinskaria/Downloads/airports.json"
  },
  "SinkSettings": {
    "ConnectionString": "AccountEndpoint=https://az204cosmosdb01.documents.$",
    "Database": "flightDetails",
    "Container": "airport",
    "PartitionKeyPath": "/id",
    "RecreateContainer": false,
    "IncludeMetadataFields": false
  }
}
```

Running the DMT with the appropriate configuration will read the source file and transfer the data to Cosmos DB. For instance, if the file contains approximately 1,000 records, the import may complete in around eight seconds. You can verify the data import by inspecting the container with Data Explorer.

![The image shows a GitHub page with a form for configuring a new container in Azure Cosmos DB, including fields for "Container id" and "Partition key." There are numbered annotations highlighting specific parts of the form.](https://kodekloud.com/kk-media/image/upload/v1752866800/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Working-With-Microsoft/github-azure-cosmos-db-container-form.jpg)

---

## Working with Azure Cosmos DB in Visual Studio

This section explains how to use the .NET SDK in Visual Studio to insert, read, and query items in Cosmos DB.

### Inserting a New Airport Record

To begin, create a new Console Application (e.g., "Azure Cosmos DB Demo") in Visual Studio and add the NuGet package "Microsoft.Azure.Cosmos". Replace the default code with the following sample. This code initializes the Cosmos client, obtains a container reference, and inserts a new airport record into Cosmos DB.

```
using Microsoft.Azure.Cosmos;
using System;
using System.Threading.Tasks;


class Program
{
    static async Task Main(string[] args)
    {
        string endpoint = "https://<your-cosmosdb-account>.documents.azure.com:443/";
        string key = "<your-cosmosdb-account-key>";
        string databaseName = "<your-database-name>";
        string containerName = "<your-container-name>";


        CosmosClient client = new CosmosClient(endpoint, key);
        Container container = client.GetContainer(databaseName, containerName);


        var airportRecord = new
        {
            id = Guid.NewGuid().ToString(),
            airport_code = "DXB",
            airport_name = "Dubai International Airport",
            country_code = "AE"
        };


        try
        {
            var response = await container.CreateItemAsync(airportRecord);
        }
        catch (CosmosException ex)
        {
            Console.WriteLine($"Item creation failed: {ex.StatusCode} - {ex.Message}");
        }
    }
}
```

After retrieving the endpoint and key from the Azure portal (under the Keys section), replace the placeholders with your actual account information. Running the application adds the new airport record to your Cosmos DB container. Verify the insertion by querying Data Explorer.

![The image shows a Microsoft Azure portal interface displaying the keys section for an Azure Cosmos DB account, with options for primary and secondary keys and connection strings.](https://kodekloud.com/kk-media/image/upload/v1752866801/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Working-With-Microsoft/azure-cosmos-db-keys-interface.jpg)

### Querying Data from Cosmos DB

The following example shows how to query for all airports in the United States using a SQL-like statement and how to print the resulting airport names:

```
using Microsoft.Azure.Cosmos;
using System;
using System.Threading.Tasks;


class Program
{
    static async Task Main(string[] args)
    {
        string endpoint = "https://az204cosmosdb01.documents.azure.com:443/";
        string key = "CQVjdPcMPkByiLu40u646SHoywusm9VUvyJhJcqTpMCTHOxuie5dNdVhLLobQruzAEyfgcJACDbS3CUEg==";
        string databaseName = "flightDetails";
        string containerName = "airportCodes";


        CosmosClient client = new CosmosClient(endpoint, key);
        Container container = client.GetContainer(databaseName, containerName);


        FeedIterator<dynamic> iterator = container.GetItemQueryIterator<dynamic>(
            "SELECT * FROM c WHERE c.country_code = 'United States'"
        );


        while (iterator.HasMoreResults)
        {
            FeedResponse<dynamic> batch = await iterator.ReadNextAsync();
            foreach (var airport in batch)
            {
                Console.WriteLine($"{airport.airport_name}");
            }
        }
    }
}
```

The code above constructs a query to fetch airports with the country code 'United States'. It uses a feed iterator to process the results in batches and prints each airport's name on the console. An example output might be:

Burgos Airport  
Gregorio Luperon International Airport  
Zvartnots International Airport  
Caye Caulker Airport  
Parry Sound Area Municipal Airport  
Pompano Beach Airpark  
Akron Canton Regional Airport  
Susanville Municipal Airport  
Mogilev Airport

---

## Next Steps

Now that you know how to create, read, and query items using the .NET SDK—and how to import bulk data into your Cosmos DB account—the next lesson will focus on creating and managing stored procedures in Azure Cosmos DB to further optimize your data operations.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/9b20db07-78f4-4774-8a8c-8c2c182ebd0e/lesson/fa7aed3c-57f1-4c09-830f-ad374dad493b)**
>
> Watch video content
