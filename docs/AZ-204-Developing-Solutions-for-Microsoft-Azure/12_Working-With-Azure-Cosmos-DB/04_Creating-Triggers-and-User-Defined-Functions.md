# Creating Triggers and User Defined Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Working-With-Azure-Cosmos-DB/Creating-Triggers-and-User-Defined-Functions)

---

## Table of Contents

- Creating Triggers and User Defined Functions
  - Overview
  - Pre-Triggers
  - Post-Triggers
  - User-Defined Functions
  - Creating Triggers and UDFs in the Azure Portal
  - Conclusion
  - Watch Video
    - Creating a Pre-Trigger
    - Verifying the Pre-Trigger Execution
    - Creating Other Triggers and UDFs

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Working With Azure Cosmos DB

# Creating Triggers and User Defined Functions

In this guide, we demonstrate how to create and utilize triggers and user-defined functions (UDFs) in Azure Cosmos DB. We also highlight the key differences between these components and stored procedures in terms of scope, functionality, and execution.

## Overview

Azure Cosmos DB provides three types of programmable components to embed custom logic into your operations:

- **Pre-Triggers:** Executed before an item is created or updated. They are useful for validating or modifying data before it is stored.
- **Post-Triggers:** Executed after an item is created or updated. These triggers are commonly used for logging actions or updating associated documents.
- **User-Defined Functions (UDFs):** Invoked within SQL queries to perform custom calculations or logic.

For instance, when inserting an airport record without a country code, you can employ a pre-trigger to automatically assign a default value, such as "unidentified".

## Pre-Triggers

Pre-triggers run before creating or modifying items. They ensure that the incoming data adheres to validation rules or undergoes necessary modifications prior to storage. Consider the following example where the pre-trigger checks for a missing country code and assigns a default value:

```
function preTrigger() {
    var item = getContext().getRequest().getBody();

    if (!item.country_code) {
        item.country_code = "unidentified";
    }

    item.timestamp = new Date().toISOString();
    getContext().getRequest().setBody(item);
}
```

> [!important]
> **Note**
>
> Ensure that your pre-trigger logic correctly handles all edge cases to prevent data inconsistencies.

## Post-Triggers

Post-triggers execute after an item has been created or modified and are ideal for handling supplementary operations such as logging metadata or updating related documents. For example, after inserting a new airport record, you might use a post-trigger to log activity to a designated container.

## User-Defined Functions

UDFs extend the query capabilities within SQL queries by allowing you to embed custom logic. For instance, you can create a UDF to check if an airport belongs to a specific country. The diagram below summarizes key concepts for pre-triggers, post-triggers, and user-defined functions in Azure Cosmos DB:

![The image explains the concepts of pre-triggers, post-triggers, and user-defined functions in Azure Cosmos DB. It describes when each is executed and their specific uses in database operations.](https://kodekloud.com/kk-media/image/upload/v1752866793/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Triggers-and-User-Defined-Functions/azure-cosmos-db-triggers-functions.jpg)

Below is an example UDF to determine if an airport is in the United States:

```
function isFromCountry(country_code) {
    return country_code === "United States";
}
```

You can then incorporate this UDF into your SQL queries as shown:

```
SELECT * FROM C WHERE udf.isFromCountry(C.country_code)
```

This query retrieves all airport records where the country code is "United States".

## Creating Triggers and UDFs in the Azure Portal

Next, we explore creating these components via the Azure portal.

### Creating a Pre-Trigger

1.  Navigate to your Azure Cosmos DB account in the Azure portal and select the **Triggers** section.
2.  Click on the option to create a new trigger.
3.  Name your trigger (for example, "pre-trig01") and designate it as a pre-trigger.
4.  Paste the pre-trigger code snippet into the trigger editor.
5.  Save the trigger. (You might see an error message that can safely be ignored.)

When creating an item, specify the pre-trigger in your request options. For example, in a C# application, you might implement the following:

```
ItemRequestOptions requestOptions = new ItemRequestOptions
{
    PreTriggers = new[] { "pre-trig01" }
};


var response = await container.CreateItemAsync(airportRecord, null, requestOptions);
Console.WriteLine($"Successfully added ID: {response.Resource.id}");
```

Assume the following JSON document represents an example airport record prior to trigger execution:

```
{
    "id": "60889698-42eb-463d-924d-574c729be91",
    "airport_code": "AIK",
    "airport_name": "Aluik Airport",
    "country_code": "Philippines",
    "rid": "MncaImngwBAAAAAAAAAA==",
    "etag": "\"680b79db-0000-0300-0000-660dde2c2000\"",
    "attachments": "attachments/",
    "_ts": 1725816364
}
```

### Verifying the Pre-Trigger Execution

After running your application (e.g., inserting an item with airport code "XYZ" but missing the country code), navigate to the **Items** section in the Azure portal. Use a filter (for example, where airport code equals "XYZ") to inspect the document. You will notice that the country code is automatically set to "unidentified" by the pre-trigger.

Here is an example document post pre-trigger execution:

```
{
  "id": "60889668-42b2-463d-924d-574c729eb91",
  "airport_code": "AIM",
  "airport_name": "Aluik Airport",
  "country_code": "Philippines",
  "_rid": "MncaIngmawAAAAAAA==",
  "_self": "dbs/MncaAA==/colls/MncaIngmaw=/docs/MncaIngmawBAAAAAAAAAA=/",
  "_attachments": "attachments/",
  "_ts": 1725816364
}
```

The structured query results in the Azure portal make it easy to verify the trigger execution without relying solely on visual cues.

![The image shows the Microsoft Azure Data Explorer interface, displaying a query on a Cosmos DB account with navigation options on the left and a query editor on the right.](https://kodekloud.com/kk-media/image/upload/v1752866794/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Triggers-and-User-Defined-Functions/azure-data-explorer-cosmosdb-query.jpg)

Below is a complete C# example demonstrating the process of specifying a pre-trigger during item creation:

```
string collectionName = "airportCodes";
CosmosClient client = new CosmosClient(endpoint, key);
Container container = client.GetContainer(databaseName, collectionName);
string preTrigger = "pre-trig01";


var airportRecord = new
{
    id = Guid.NewGuid().ToString(),
    airport_code = "XYZ",
    airport_name = "XYZ Airport"
};


try
{
    ItemRequestOptions requestOptions = new ItemRequestOptions
    {
        PreTriggers = new[] { preTrigger }
    };


    var response = await container.CreateItemAsync(airportRecord, null, requestOptions);
    Console.WriteLine($"Successfully added ID: {response.Resource.id}");
}
catch (CosmosException ex)
{
    Console.WriteLine($"Cosmos DB error: {ex.StatusCode} - {ex.Message}");
}
```

Console output:

```
Successfully added ID: 3ae003a7-1375-4ba0-ac65-cbb966c40a39
Process completed.
```

### Creating Other Triggers and UDFs

You can create post-triggers similarly by selecting the "Post" option and defining the appropriate logic. When a post-trigger runs, you might see a document similar to this:

```
{
  "id": "3ae003a7-1375-4ba0-ac65-cbb96c4a03b9",
  "airport_code": "XYZ",
  "airport_name": "XYZ Airport",
  "country_code": "undetermined",
  "timestamp": "2024-09-10T18:29:25.136Z",
  "_rid": "McnIAqmW7uAAAAAAAM",
  "_self": "dbs/McnCMAE=/colls/McnIAqmW4=/docs/McnIAqmW7uAAAAAAAM=/",
  "_etag": "\"0002299-0000-0300-0000-66e549650800\"",
  "_attachments": "attachments/",
  "_ts": 1726382565
}
```

User-defined functions (UDFs) are created similarly. For example, define a UDF named "isFromCountry" to check if an airport's country code equals "United States":

```
function isFromCountry(country_code) {
    return country_code === "United States";
}
```

You can use this UDF within your SQL queries like this:

```
SELECT * FROM c WHERE udf.isFromCountry(c.country_code)
```

This query returns all airport records from the United States.

## Conclusion

In this article, we explored how pre-triggers, post-triggers, and user-defined functions (UDFs) can be implemented in Azure Cosmos DB using the Azure portal and sample code. These features empower you to enforce data validation rules, extend SQL query functionality, and manage custom operations before and after document modifications.

> [!important]
> **Next Steps**
>
> For further optimization, consider exploring the change feed in Azure Cosmos DB to enhance your data processing strategies.

By leveraging these techniques, you improve the consistency and reliability of data operations in your Azure Cosmos DB solutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/9b20db07-78f4-4774-8a8c-8c2c182ebd0e/lesson/8517729f-614d-4512-b555-a8da201cdb1f)**
>
> Watch video content
