# Creating and Managing Azure Queue Storage Queues and Messages by Using - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Discovering-Azure-Message-Queues/Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using)

---

## Table of Contents

- Creating and Managing Azure Queue Storage Queues and Messages by Using
  - Required Libraries and Packages
  - Creating Azure Queue Storage Queues
  - Managing Queue Storage with the Azure Portal
  - Code Example: Function App with Managed Identity
  - Configuring the Function App with Managed Identity
  - Deploying the Function App
  - Verifying the Message with Storage Explorer
  - Conclusion
  - Watch Video
    - Sample Code: Creating a Queue
    - Sending a Message to the Queue
    - Alternate Sample Using StorageSharedKeyCredential
    - Final Function Sample with Exception Handling

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Discovering Azure Message Queues

# Creating and Managing Azure Queue Storage Queues and Messages by Using

This article explains how to create and manage Azure Queue Storage queues and messages using .NET. Learn how to set up your environment with the necessary libraries, create queues, send messages, and deploy your Function App with both connection string and managed identity approaches.

## Required Libraries and Packages

To work with Azure Queue Storage, start by installing the following essential libraries:

1.  **Azure Core Library for .NET**  
    This package provides shared primitives, abstractions, and helper utilities used by many Azure SDK client libraries.
2.  **Azure Storage Common Client Library for .NET**  
    Contains the shared infrastructure required to interact with various Azure Storage services such as blobs and queues.
3.  **Azure Storage Queues Client Library for .NET**  
    This is the primary library for working with queues. It supports creating, managing, and interacting with queues and their messages.
4.  **System.Configuration.Configuration Manager Library for .NET**  
    Provides access to configuration files (like _app.config_ or _appsettings.json_) to retrieve connection strings and other settings for connecting to Azure resources.

![The image lists four NuGet packages for .NET, each with a brief description: Azure.Core Library, Azure.Storage.Common Client Library, Azure.Storage.Queues Client Library, and System.Configuration.ConfigurationManager Library.](https://kodekloud.com/kk-media/image/upload/v1752866278/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/nuget-packages-dotnet-libraries.jpg)

## Creating Azure Queue Storage Queues

This section demonstrates how to create a queue using the QueueClient class with a connection string retrieved from your application settings.

> [!important]
> **Note**
>
> If you are using an _appsettings.json_ file, store your connection string there and retrieve it via the Configuration Manager.

### Sample Code: Creating a Queue

```
// Retrieve the storage account connection string from app settings
string connectionString = ConfigurationManager.AppSettings["StorageConnectionString"];


// Instantiate a QueueClient to manage the queue
QueueClient queueClient = new QueueClient(connectionString, queueName);


// Create the queue only if it does not already exist
queueClient.CreateIfNotExists();
```

The `CreateIfNotExists` method ensures that the queue is created only if it hasn't been set up previously.

### Sending a Message to the Queue

Once your queue is set up, you can add messages using the SendMessage method. Check out the following example:

```
// Retrieve the storage account connection string from app settings
string connectionString = ConfigurationManager.AppSettings["StorageConnectionString"];


// Instantiate the QueueClient to interact with the queue
QueueClient queueClient = new QueueClient(connectionString, queueName);


// Ensure the queue exists or create it if necessary
queueClient.CreateIfNotExists();


if (queueClient.Exists())
{
    // Send a message to the queue
    queueClient.SendMessage(message);
}
```

## Managing Queue Storage with the Azure Portal

You can also manage Azure Queues through the Azure portal:

1.  Log in to the [Azure portal](https://portal.azure.com) and create a new storage account, which is essential for using Azure Queue Storage.
2.  Navigate to your storage account and create a new queue. Although your code can automatically create a queue, creating one manually clarifies the process.

![The image shows the Microsoft Azure portal dashboard, displaying various Azure services and a list of recent resources with their types and last viewed times.](https://kodekloud.com/kk-media/image/upload/v1752866279/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-portal-dashboard-services.jpg)

![The image shows a configuration screen for setting up an Azure Storage account, including fields for project details, instance details, and options for performance and redundancy.](https://kodekloud.com/kk-media/image/upload/v1752866280/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-storage-account-configuration.jpg)

For example, name your queue (e.g., "AZ204") and complete the process.

![The image shows a Microsoft Azure portal interface where a user is adding a new queue named "az" in the storage account section. The "Add queue" dialog box is open with options to confirm or cancel the action.](https://kodekloud.com/kk-media/image/upload/v1752866282/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-portal-add-queue-dialog.jpg)

## Code Example: Function App with Managed Identity

Below is an example of a Function App that processes POST requests and writes messages to an Azure Queue using Managed Identity credentials. This method eliminates the need for a connection string.

```
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
    ILogger log)
{
    log.LogInformation("Processing a POST request to write message to Azure Queue...");


    try
    {
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);


        if (data == null)
        {
            return new BadRequestObjectResult("Invalid payload");
        }


        var credential = new DefaultAzureCredential();
        var queueClient = new QueueClient(new Uri($"https://{storageAccount}.queue.core.windows.net/{queueName}"), credential);
        await queueClient.CreateIfNotExistsAsync();


        if (queueClient.Exists())
        {
            await queueClient.SendMessageAsync(requestBody);
            log.LogInformation($"Message added to the queue: {requestBody}");
        }
    }
    catch (Exception ex)
    {
        log.LogError($"Error processing the request: {ex.Message}");
    }
}
```

Below is sample console output from a successful function execution:

```
2024-09-27T10:42:51.859 [Information] Processing a POST request to write message to Azure Queue.....
2024-09-27T10:42:33.855 [Information] Message added to the queue: {"name": "Admin", "ingURL": "https://bit.ly/c56yhs"}
2024-09-27T10:42:33.867 [Information] Executed 'QueuePost' (Succeeded, Id=14b124e2-36db-43ba-b877-7ef76da7613, Duration=2157ms)
2024-09-27T10:42:33.867 [Information] The log streaming has ended. Please reconnect to continue streaming logs.
```

### Alternate Sample Using StorageSharedKeyCredential

For testing with a connection string, you might use the StorageSharedKeyCredential as shown below:

```
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
    ILogger log)
{
    log.LogInformation("Processing a POST request to write message to Azure Queue...");


    try
    {
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);


        if (data == null)
        {
            return new BadRequestObjectResult("Invalid request body");
        }


        var credential = new StorageSharedKeyCredential(accountName, accountKey);
        var queueClient = new QueueClient(storageUri, credential);


        if (queueClient.Exists())
        {
            await queueClient.SendMessageAsync(requestBody);
            log.LogInformation($"Message added to the queue: {requestBody}");
        }
        else
        {
            log.LogError("Queue does not exist.");
        }
        return new OkResult();
    }
    catch (Exception ex)
    {
        log.LogError($"Error: {ex.Message}");
        return new StatusCodeResult(500);
    }
}
```

Sample console logging for this approach:

```
2024-09-21T10:42:51.859 [Information] Processing a POST request to write message to Azure Queue.....
2024-09-21T10:42:33.855 [Information] Added to the queue: {"name": "Admin", "imgUrl": "https://bit.ly/c56yhs"}
2024-09-21T10:42:33.867 [Information] Executed 'QueuePost' (Succeeded, Id=14b182cd-36db-43b7-7ef7f6da7613, Duration=2157ms)
2024-09-21T10:42:33.870 [Error] The log-streaming session has been terminated. Please reconnect to continue streaming logs.
```

### Final Function Sample with Exception Handling

The following consolidated sample includes exception handling to ensure robustness:

```
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
    ILogger log)
{
    try
    {
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        if (queueClient.Exists())
        {
            await queueClient.SendMessageAsync(requestBody);
            log.LogInformation($"Message added to the queue: {requestBody}");
            return new OkObjectResult($"Message added to queue: {queueName}");
        }
        else
        {
            log.LogError("Queue does not exist.");
            return new BadRequestObjectResult("Queue does not exist.");
        }
    }
    catch (Exception ex)
    {
        log.LogError($"Error occurred while writing to the queue: {ex.Message}");
        return new StatusCodeResult(500);
    }
}
```

Example console output:

```
2024-09-27T10:42:51.859 [Information] Processing a POST request to write message to Azure queue.....
2024-09-27T10:42:33.855 [Information] Message added to the queue: {'name': 'Admin', 'imgUrl': 'https://bit.ly/65yhys'}
2024-09-27T10:42:33.867 [Information] Executed 'QueuePost' (Succeeded, Id=141e82c4-36db-43b8-b877-7e7f76da7613, Duration=2157ms)
2024-09-27T10:42:38.073 The log-streaming service is running. Please reconnect to continue streaming logs.
```

## Configuring the Function App with Managed Identity

When using managed identities, provide your storage account name and queue name directly in your code. Managed identities remove the need for a connection string. For example:

```
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
    ILogger log)
{
    log.LogInformation("Processing a POST request to write message to Azure Queue...");


    try
    {
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);


        if (data == null)
        {
            return new BadRequestObjectResult("Invalid payload");
        }


        var credential = new DefaultAzureCredential();
        var queueClient = new QueueClient(new Uri($"https://{storageAccount}.queue.core.windows.net/{queueName}"), credential);
        // Additional queue operations...
    }
}
```

To grant your Function App's managed identity access, add a role assignment in the Azure portal:

1.  Navigate to the Access Control (IAM) section of your storage account.
2.  Search for "queue" and select the **Queue Data Contributor** role.
3.  Choose the managed identity associated with your Function App.

![The image shows the Access Control (IAM) section of a Microsoft Azure portal, displaying options for managing access, role assignments, and permissions.](https://kodekloud.com/kk-media/image/upload/v1752866283/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-iam-access-control-portal.jpg)

![The image shows a Microsoft Azure portal interface for adding a role assignment, with a list of job function roles related to Azure Storage Queue data.](https://kodekloud.com/kk-media/image/upload/v1752866285/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-portal-role-assignment-storage-queue.jpg)

![The image shows a Microsoft Azure portal interface for adding a role assignment, specifically for a "Storage Queue Data Contributor" role. It includes options to assign access to a managed identity and a section to select members.](https://kodekloud.com/kk-media/image/upload/v1752866288/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-portal-role-assignment-storage-queue-2.jpg)

![The image shows a Microsoft Azure portal screen where a role assignment is being added, specifically assigning the "Storage Queue Data Contributor" role to a function app named "az204queuefunction."](https://kodekloud.com/kk-media/image/upload/v1752866289/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-portal-role-assignment-storage-queue-3.jpg)

Confirm the assignment and proceed to deploy your Function App.

## Deploying the Function App

Using Visual Studio Code, open the terminal and deploy your Function App. Below is a sample class for your Function App:

```
public static class QueuePost
{
    private const string queueName = "az204";
    private const string storageAccount = "az204fqueuewriter";


    [FunctionName("QueuePost")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("Processing a POST request to write message to Azure Queue...");


        try
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);


            if (data == null)
            {
                return new BadRequestObjectResult("Invalid payload");
            }


            var credential = new DefaultAzureCredential();
            // Additional logic to process queue messages...
        }
    }
}
```

After deploying, navigate to your Function App details in the Azure portal:

![The image shows the Microsoft Azure portal interface displaying details of a Function App named "az204queuefunction." It includes sections for overview, settings, and monitoring options.](https://kodekloud.com/kk-media/image/upload/v1752866290/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-portal-function-app-details.jpg)

Use the function URL to test with Postman. Set the header "Content-Type" to "application/json" and send a POST request with a JSON payload similar to the sample below:

```
{
  "generatedBy": "Microsoft.NET.Sdk.Functions.Generator-4.4.0",
  "configurationSource": "attributes",
  "bindings": [
    {
      "type": "httpTrigger",
      "methods": [
        "post"
      ],
      "authLevel": "function",
      "name": "req"
    }
  ],
  "disabled": false,
  "scriptFile": "../bin/QueueWriter.dll",
  "entryPoint": "QueuePost.Run"
}
```

Include your message details (e.g., a URL like "www.abc.com/admin.png") and click "Run" to update the queue.

## Verifying the Message with Storage Explorer

Once the message is added to the queue, verify it using the Storage Explorer in the Azure portal:

1.  Open Storage Explorer.
2.  Navigate to the storage account and view its queues.
3.  Confirm that the message you sent appears in the queue.

![The image shows the Microsoft Azure Storage Explorer interface, displaying options for managing Azure resources, accounts, and subscriptions. The left panel lists storage accounts and resources, while the main panel provides tasks and resources for getting started.](https://kodekloud.com/kk-media/image/upload/v1752866292/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Creating-and-Managing-Azure-Queue-Storage-Queues-and-Messages-by-Using/azure-storage-explorer-interface.jpg)

## Conclusion

This guide demonstrated how to work with Azure Queue Storage using .NET and the Azure SDK. You learned about the necessary packages, how to create and manage queues, methods to send messages using connection strings and managed identities, and how to deploy your Function App. You also saw how to verify messages using Storage Explorer, ensuring your solution is monitored effectively with tools like Application Insights.

For more details on Azure Queue Storage and .NET integration, visit the [Azure Documentation](https://docs.microsoft.com/en-us/azure/storage/queues/) page.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/832be194-8cc3-4e29-b04e-c2fe027078a7/lesson/6158d644-3131-4ffe-a4de-d2d600d9fc1b)**
>
> Watch video content
