# Triggers and Bindings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Developing-Azure-Functions/Triggers-and-Bindings)

---

## Table of Contents

- Triggers and Bindings
  - Programming Language Variations
  - Example: Writing to Azure Table Storage
  - Sample C# Function Using the Azure Storage SDK
  - Local Development and Testing
  - Creating a Function App in Azure
  - Developing and Deploying Using Visual Studio Code
  - Verifying the Deployment
  - Conclusion
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Developing Azure Functions

# Triggers and Bindings

In this article, we explain the fundamental concepts of triggers and bindings in Azure Functions. These components are essential for integrating your functions with external sources and services.

Triggers are events that automatically start your function. They can be an HTTP request, a new queue message, a timer event, and more. Each function can only have one trigger, but the trigger type can vary based on your specific use case.

Bindings, on the other hand, offer a declarative way to connect your function to other Azure services—such as storage accounts, databases, or messaging systems—without extensive coding. They simplify managing input and output data flows. You can configure bindings as input, output, or both. For example, an input binding could retrieve a message from a queue, while an output binding could save a record to a database. Some bindings even support dual (in-out) configurations.

You can combine multiple bindings within a single function. For example, a function may be triggered by a new queue message (input binding), process the data, and then write the result to Azure Blob Storage (output binding). This approach eliminates the need to hardcode service interactions in your function, simplifying development and maintenance.

---

![The image is an infographic titled "Creating Triggers and Bindings," explaining five key points about triggers and bindings in functions, including their roles and benefits. Each point is accompanied by an icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752866239/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Triggers-and-Bindings/creating-triggers-bindings-infographic.jpg)

---

## Programming Language Variations

Azure Functions supports multiple programming languages, and the method to define triggers and bindings depends on the language:

- **C#**: Use attributes within the class library to define triggers and bindings. For instance, annotate your function with `[HttpTrigger]` for an HTTP trigger and `[Blob]` for Blob Storage access.
- **Java**: Similar to C#, Java leverages annotations to declare input and output bindings.
- **JavaScript, PowerShell, Python, and TypeScript**: In these languages, triggers and bindings are configured in a separate `function.json` file that specifies the binding type, direction, and other properties. Although C# functions can also use JSON configuration, separating the configuration enhances language-agnostic development.

Below is an example of a binding configuration within a `function.json` file using an HTTP trigger:

```
{
  "dataType": "binary",
  "type": "httpTrigger",
  "name": "req",
  "direction": "in"
}
```

The JSON configuration clarifies the following binding directions:

- **Input bindings**: Import data into the function.
- **Output bindings**: Export data from the function.
- **Dual (in-out) bindings**: Manage both input and output data (for advanced scenarios).

When using attribute-based configuration in languages like C#, the binding direction might be explicitly stated or inferred from the type of the parameter.

---

![The image explains binding directions in a system, detailing properties like triggers, input/output bindings, and special directions, with each point numbered and color-coded.](https://kodekloud.com/kk-media/image/upload/v1752866240/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Triggers-and-Bindings/binding-directions-system-diagram.jpg)

---

## Example: Writing to Azure Table Storage

Consider a function that writes a new row to Azure Table Storage upon receiving an HTTP POST request. This function utilizes three bindings:

1.  **HTTP Trigger (Input)**: Captures the POST request.
2.  **HTTP Output**: Returns a response indicating a successful operation.
3.  **Table Output Binding**: Writes the data to Azure Table Storage.

Below is an example of the JSON binding configuration for this scenario:

```
{
  "bindings": [
    {
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "authLevel": "function",
      "methods": [ "post" ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    },
    {
      "type": "table",
      "direction": "out",
      "name": "outputTable",
      "tableName": "MyTable",
      "connection": "AzureWebJobsStorage",
      "partitionKey": "{partitionKey}",
      "rowKey": "{rowKey}"
    }
  ]
}
```

In this configuration:

- The trigger accepts POST requests and requires an API key (denoted by the authorization level "function").
- The HTTP output binding returns a response message.
- The table binding utilizes the connection string stored in the "AzureWebJobsStorage" environment variable and requires both a partition key and a row key.

Note that you can also use the Azure Storage SDK directly within your function code if you prefer managing storage operations in code.

---

## Sample C# Function Using the Azure Storage SDK

Below is an example C# function that processes an HTTP POST request. The function deserializes the JSON payload and writes an entity to Azure Table Storage using the Azure.Data.Tables SDK.

```
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Data.Tables;
using Azure;

public static class WebToTableFunction
{
    [FunctionName("WebToTableFunction")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);

        string partitionKey = data?.partitionKey;
        string rowKey = data?.rowKey;
        string name = data?.name;
        string email = data?.email;

        if (string.IsNullOrEmpty(partitionKey) || string.IsNullOrEmpty(rowKey))
        {
            return new BadRequestObjectResult("Please pass both partitionKey and rowKey in the request body");
        }

        string storageConnectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
        TableServiceClient tableServiceClient = new TableServiceClient(storageConnectionString);
        TableClient tableClient = tableServiceClient.GetTableClient(tableName: "UserDetails");

        await tableClient.CreateIfNotExistsAsync();

        var entity = new TableEntity(partitionKey, rowKey)
        {
            { "Name", name },
            { "Email", email }
        };

        await tableClient.AddEntityAsync(entity);

        return new OkObjectResult("Data has been written to Azure Table Storage.");
    }
}
```

> [!important]
> **Note**
>
> This function uses the HTTP trigger to read the JSON payload, verifies required properties (partitionKey and rowKey), and then interacts with Azure Table Storage using the Azure.Data.Tables SDK.

---

## Local Development and Testing

For local development, store your connection string in the `local.settings.json` file. Below is an example configuration:

```
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet"
    }
}
```

To run the function locally, use the Azure Functions Core Tools with the following command:

```
func start --verbose
```

You can test the function by sending a POST request with a JSON payload using Curl:

```
curl -X POST "http://localhost:7071/api/WebToTableFunction" \
  -H "Content-Type: application/json" \
  -d '{
        "partitionKey": "1",
        "rowKey": "1",
        "name": "John Doe",
        "email": "john@gmail.com"
     }'
```

If successful, the function will respond indicating the data has been written to Azure Table Storage. You can verify the data using Azure Storage Explorer.

---

![The image shows the Microsoft Azure portal dashboard, displaying a list of recent resources with their types and last viewed times. A cursor is hovering over a resource named "webtotable," which is a Function App.](https://kodekloud.com/kk-media/image/upload/v1752866243/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Triggers-and-Bindings/azure-portal-dashboard-recent-resources.jpg)

---

## Creating a Function App in Azure

To deploy your function, you must first create a Function App in the Azure portal. Follow these steps:

1.  Click on **Create** and choose the desired hosting plan (for example, the Consumption plan).
2.  Provide a unique name for your Function App (e.g., "web2tablefunc") and select the appropriate runtime (e.g., .NET LTS).
3.  A storage account will be automatically created with your Function App, but you can select a custom one if needed.
4.  Configure your networking options and enable public access (network injection options are available with higher SKUs).
5.  Enable Application Insights for monitoring.
6.  Click **Review and Create** to deploy your Function App.

Once created, click **Go to Resource** to manage your functions. You can develop functions directly in the portal or use Visual Studio Code along with Azure Functions extensions or Core Tools for local development.

---

![The image shows a networking configuration screen for Azure Function Apps, with options to enable public access and network injection. A warning indicates that network injection is only available in certain service plans.](https://kodekloud.com/kk-media/image/upload/v1752866245/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Triggers-and-Bindings/azure-function-apps-networking-config.jpg)

---

## Developing and Deploying Using Visual Studio Code

You can also develop and test your functions locally using Visual Studio Code. To get started, initialize a new Azure Functions project with the Core Tools:

```
func init WebToTable --worker-runtime dotnet
```

Next, create a new HTTP trigger function with the command:

```
func new --template "HTTP trigger" --name WebTableTrigger
```

This scaffolds a new function where you can replace the default code with your implementation and add any required NuGet packages (such as Azure.Data.Tables). Once your function is tested locally, deploy it to Azure directly from Visual Studio Code using the Azure Functions extension.

---

![The image shows a Microsoft Azure portal screen for creating a Function App, displaying details like subscription ID, resource group, runtime stack, hosting plan, and monitoring settings. The "Validating" status is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752866246/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Triggers-and-Bindings/azure-portal-function-app-creation.jpg)

---

## Verifying the Deployment

After deploying your function, use the Azure portal to access the function's configuration and logs. An auto-generated `function.json` might appear as follows:

```
{
  "generatedBy": "Microsoft.NET.Sdk.Functions.Generator-4.0.0",
  "configurationSource": "attributes",
  "bindings": [
    {
      "type": "httpTrigger",
      "methods": [ "post" ],
      "authLevel": "function",
      "name": "req"
    }
  ],
  "disabled": false,
  "scriptFile": "../bin/WebToTable.dll",
  "entryPoint": "WebToTableFunction.Run"
}
```

Test the deployed function using the portal's test tab by providing a JSON payload such as:

```
{
  "partitionKey": "2",
  "rowKey": "2",
  "name": "Mark Doe",
  "email": "mark.doe@example.com"
}
```

If everything is configured correctly, the function will process the request, write the data to Azure Table Storage, and log the corresponding activity.

---

![The image shows the Microsoft Azure portal with the "Environment variables" section open for a Function App. It displays a list of application settings and an "Add/Edit application setting" panel on the right.](https://kodekloud.com/kk-media/image/upload/v1752866248/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Triggers-and-Bindings/azure-portal-function-app-environment-variables.jpg)

---

## Conclusion

This article demonstrated how to integrate your Azure Functions with various Azure services using triggers and bindings. We explored both the declarative JSON configurations and code-based approaches (in C#) with the Azure Storage SDK. Additionally, we covered local development, testing with Azure Functions Core Tools, and deployment strategies using Visual Studio Code or the Azure portal.

Happy coding!

For more information, explore the [Azure Functions documentation](https://docs.microsoft.com/azure/azure-functions/) and the [Azure Storage documentation](https://docs.microsoft.com/azure/storage/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1a92d04b-4927-4475-87b1-0d8f4cf020a9/lesson/7a5e34cb-0e61-4bc8-8bdb-82ad8db55f7e)**
>
> Watch video content
