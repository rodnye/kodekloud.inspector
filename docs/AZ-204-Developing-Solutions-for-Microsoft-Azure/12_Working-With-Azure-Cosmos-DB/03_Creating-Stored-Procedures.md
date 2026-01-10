# Creating Stored Procedures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Working-With-Azure-Cosmos-DB/Creating-Stored-Procedures)

---

## Table of Contents

- Creating Stored Procedures
  - Sample Stored Procedure
  - Detailed Example: Inserting Airport Data
  - Bounded Execution Model
  - Transaction Continuation
  - Working with the Azure Portal
  - Conclusion
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Working With Azure Cosmos DB

# Creating Stored Procedures

Stored procedures in Azure Cosmos DB are written in JavaScript and executed in the same memory space as the database. This architecture minimizes latency by running operations close to the data and significantly improves performance. By grouping operations—such as creating, querying, updating, or deleting documents—within a single stored procedure, you ensure that all actions execute atomically and consistently within one database session.

As shown in the diagram below, the process begins with a client (an application or user interface) that sends a request to the database. The Azure Cosmos DB service then processes this request by executing the corresponding JavaScript stored procedure.

![The image illustrates the process of creating stored procedures using JavaScript for Azure Cosmos DB, showing interactions between a client, database, and various document operations.](https://kodekloud.com/kk-media/image/upload/v1752866786/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Stored-Procedures/javascript-stored-procedures-azure-cosmos-db.jpg)

Within this environment, a stored procedure can perform several actions, such as creating a new document, querying existing documents, updating records, or deleting items. After processing, the stored procedure returns the result to the client, ensuring that the entire operation occurs within a single, atomic transaction.

---

## Sample Stored Procedure

Below is an example of a stored procedure that demonstrates how to query documents and return either a notification that no documents were found or the first document from the query results.

```
// SAMPLE STORED PROCEDURE
function sample(prefix) {
    var collection = getContext().getCollection();


    // Query documents and evaluate the query result
    var isAccepted = collection.queryDocuments(
        collection.getSelfLink(),
        'SELECT * FROM root r',
        function(err, feed, options) {
            if (err) {
                throw err;
            }


            var response = getContext().getResponse();
            // If no documents found, indicate so; otherwise, return the first document
            if (!feed || feed.length === 0) {
                response.setBody('no docs found');
            } else {
                response.setBody(JSON.stringify(feed[0]));
            }
        }
    );

    if (!isAccepted) {
        throw new Error('The query was not accepted by the server.');
    }
}
```

---

## Detailed Example: Inserting Airport Data

In this example, the stored procedure first validates that the input JSON contains an "id" field. It then checks whether a document with the same ID already exists in the container. If it does, an error message is returned; if not, the new document is inserted.

```
function insertAirportData(airportData) {
    var context = getContext();
    var container = context.getCollection();
    var response = context.getResponse();


    // Validate that the airportData contains an 'id' field
    if (!airportData.id) {
        throw new Error('Error: Document must have an "id" field.');
    }


    // Define the query to check if a document with the same id exists
    var query = {
        query: 'SELECT * FROM c WHERE c.id = @id',
        parameters: [{ name: '@id', value: airportData.id }]
    };


    // Execute the query within the same partition using the provided id
    var isAccepted = container.queryDocuments(
        container.getSelfLink(),
        query,
        { partitionKey: airportData.id },
        function (err, documents) {
            if (err) {
                throw new Error('Error querying documents: ' + err.message);
            }
            if (documents.length > 0) {
                // Document with the same id already exists
                response.setBody('Error: A document with this ID already exists.');
            } else {
                // Insert the new document within the same partition
                var isInserted = container.createDocument(
                    container.getSelfLink(),
                    airportData,
                    { partitionKey: airportData.id },
                    function (err, newDocument) {
                        if (err) {
                            throw new Error('Error inserting document: ' + err.message);
                        }
                        response.setBody(newDocument);
                    }
                );
                if (!isInserted) {
                    throw new Error('Failed to insert document.');
                }
            }
        }
    );
    if (!isAccepted) {
        throw new Error('The query was not accepted by the system.');
    }
}
```

> [!important]
> **Note**
>
> Always ensure that the correct partition key (in this case, the "id" field) is provided to guarantee proper operation and maintain data integrity.

When testing this stored procedure, if the provided airport data lacks an "id" field or if a document with the same "id" already exists, an error is returned. Otherwise, the document is successfully inserted. This robust error handling helps maintain data integrity by preventing duplicates.

---

## Bounded Execution Model

Azure Cosmos DB mandates that all operations—whether they are stored procedures, triggers, or functions—complete within a predefined timeframe. This bounded execution model means that if an operation finishes successfully within the allotted time, the change is committed. If it exceeds the time limit or encounters an error, the entire transaction is rolled back automatically.

![The image illustrates the process of creating stored procedures in Azure Cosmos DB, showing a function that leads to either a "True" (completion) or "False" (rollback) outcome.](https://kodekloud.com/kk-media/image/upload/v1752866788/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Stored-Procedures/azure-cosmos-db-stored-procedures.jpg)

For example, if you try to update an airport code but the stored procedure exceeds its execution bounds, any changes will be rolled back to preserve data integrity.

---

## Transaction Continuation

Azure Cosmos DB supports transaction continuation to handle long-running operations that might exceed the bounded execution time. Through this continuation-based model, a stored procedure can return a continuation token—a pointer that allows the transaction to resume later and process documents in smaller batches. This feature is particularly useful for bulk operations, ensuring both efficiency and transactional integrity.

![The image illustrates the process of creating stored procedures in Azure Cosmos DB using JavaScript, showing a flow from document processing to completion with a pointer for resuming later.](https://kodekloud.com/kk-media/image/upload/v1752866790/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Stored-Procedures/azure-cosmos-db-stored-procedures-2.jpg)

For instance, when updating multiple airport records, the stored procedure can process a batch until the execution time limit is reached and then return a continuation token. This token is used in subsequent sessions to finish processing the remaining records.

---

## Working with the Azure Portal

The Azure Portal offers an integrated environment for writing and testing your stored procedures. Imagine a demo database containing several airport records. Below is an example of an airport record in JSON format:

```
{
  "id": "5472ace0-d68a-40be-8de2-bc16a124c7bd",
  "airport_code": "KTI",
  "airport_name": "Kibuli Airstrip",
  "country_code": "Argentina",
  "_rid": "MnCalmAIngMAAAAAAAAAAA==",
  "_self": "docs/MnCalmAIngMA/docs/MnCalmAIngMAcAAAAAAAAAA==",
  "_etag": "\"b60e7eb0-e8e0-0300-666dcd2e0000\"",
  "_attachments": "attachments/",
  "_ts": 1725816364
}
```

To add a new stored procedure, paste your JavaScript code (like one of the examples above) into the portal’s stored procedure editor and save it. When executing the procedure, ensure the correct partition key is provided—the "id" field in this instance.

When you test the procedure, if you attempt to insert a document without an "id" field or use a duplicate ID, you'll receive an error message highlighting the issue. Here’s an example of a simulated success output after inserting a document with a new unique ID ("2"):

```
console.log('Document inserted successfully: {"id":"2","airport_code":"DEM","airport_name":"Demo Airport","country_code":"Demo Country"}');
```

To verify that the document was inserted, run a query in the Data Explorer like:

```
SELECT * FROM C where c.id = '2'
```

![The image shows the Azure Cosmos DB Data Explorer interface, displaying a list of items from a database with a query editor and JSON document details on the right. The interface includes options for creating containers, running queries, and managing database settings.](https://kodekloud.com/kk-media/image/upload/v1752866792/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-Stored-Procedures/azure-cosmos-db-data-explorer.jpg)

This interface allows you to test your stored procedures and verify validations, such as checking for duplicate IDs or missing fields before inserting a document.

---

## Conclusion

Leveraging stored procedures in Azure Cosmos DB enables you to encapsulate complex logic on the server side, reduce network round trips, and ensure atomic execution of operations. With features like bounded execution and transaction continuation, you can efficiently manage bulk operations while upholding high data integrity.

Next, explore how to work with triggers and user-defined functions in Azure Cosmos DB to further enhance your database operations.

Learn more about best practices in server-side programming for Azure Cosmos DB by visiting [Azure Cosmos DB Documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/9b20db07-78f4-4774-8a8c-8c2c182ebd0e/lesson/0fcb8d45-d8a6-4093-8a36-573b5a72e717)**
>
> Watch video content
