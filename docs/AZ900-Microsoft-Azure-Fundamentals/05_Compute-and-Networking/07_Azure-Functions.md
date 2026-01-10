# Azure Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Compute-and-Networking/Azure-Functions)

---

## Table of Contents

- Azure Functions
  - Key Features
  - Benefits
  - Common Use Cases
  - Creating a Function App in Azure Portal
  - Creating Your First Function
  - Conclusion
  - Watch Video
    - Event-Driven Architecture
    - Multi-Language Support
    - Integration Capabilities
    - Scalability
    - Pay-Per-Execution
    - Fully Managed Platform

---

## Content

AZ900: Microsoft Azure Fundamentals

Compute and Networking

# Azure Functions

Azure Functions is a serverless compute service that enables you to run event-triggered code without needing to manage infrastructure. This guide explores how Azure Functions works, highlights its key features and benefits, and provides step-by-step instructions to create your first Function App using the Azure Portal.

Functions are activated by events. For example, an HTTP request can invoke a function, or an uploaded file can trigger code execution.  
![The image is an illustration about Azure Functions, describing it as a serverless compute service for running event-triggered code without managing infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752868279/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/azure-functions-serverless-illustration.jpg)

When an event triggers your function, the code is executed and the output is returned. Let’s dive into the prominent features of Azure Functions.

## Key Features

### Event-Driven Architecture

Azure Functions is built on an event-driven model where your code reacts to triggers such as HTTP requests, database changes, and queue messages. This design ensures your applications are responsive and scalable in real time.

### Multi-Language Support

Azure Functions supports a variety of programming languages including C#, JavaScript, Java, Python, and PowerShell. This flexibility lets you choose the language that best meets your project needs.

### Integration Capabilities

Seamless integration is at the core of Azure Functions. It easily connects with other Azure services and external systems, enabling you to build a cohesive, end-to-end application ecosystem.  
![The image outlines the key features of Azure Functions, highlighting event-driven architecture, support for multiple languages (C#, JavaScript, Java, Python, PowerShell), and integration capabilities.](https://kodekloud.com/kk-media/image/upload/v1752868281/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/azure-functions-key-features-diagram.jpg)

## Benefits

### Scalability

Azure Functions automatically adjusts compute resources to handle varying loads, ensuring that your application remains efficient and responsive regardless of demand.

### Pay-Per-Execution

With the pay-per-execution model, you pay only for the compute time that your code runs. This means you only incur costs when your function is active, leading to significant savings.

### Fully Managed Platform

Azure Functions is a fully managed service, often referred to as a Platform as a Service (PaaS) or Functions-as-a-Service (FaaS). This abstraction of the underlying infrastructure frees you from server management tasks.  
![The image lists the benefits of Azure Functions, highlighting scalability, pay per execution, and being fully managed.](https://kodekloud.com/kk-media/image/upload/v1752868282/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/azure-functions-benefits-scalability.jpg)

## Common Use Cases

Azure Functions is highly versatile. It is suitable for various tasks such as processing orders, managing IoT data streams, automating workflows, and building APIs.  
![The image illustrates common use cases for Azure Functions, including processing orders, managing IoT data, and automating workflows, with icons of a computer and a smartphone.](https://kodekloud.com/kk-media/image/upload/v1752868282/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/azure-functions-use-cases-icons.jpg)

## Creating a Function App in Azure Portal

Follow these steps to create a new Function App within the Azure Portal:

1.  **Sign in to the Azure Portal** and search for "Function App".  
    ![The image shows the Microsoft Azure portal interface with a search bar open, displaying recent services and resources.](https://kodekloud.com/kk-media/image/upload/v1752868284/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/azure-portal-interface-search-bar.jpg)
2.  **Select the Function App option** and choose to create a new Azure Function App.
3.  **Create a New Resource Group:**  
    For example, use "AZ900-function-rg". Then, choose a unique name for your Function App, which will be registered under azurewebsites.net.  
    ![The image shows the "Create Function App" page on the Microsoft Azure portal, where users can configure settings such as subscription, resource group, and instance details for a new function app.](https://kodekloud.com/kk-media/image/upload/v1752868285/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/create-function-app-azure-portal.jpg)
4.  **Configure Your Function App:**  
    Enter a unique name (e.g., "AZ900-function-demo" with random numbers appended), select the runtime stack (e.g., .NET Core), set the region to East US, and choose the consumption-based model to pay only when an event is triggered.
5.  **Review and Create:**  
    Click on "Review and create" and wait for the validation to complete. Once validated, create your Function App.  
    ![The image shows the "Create Function App" page on the Microsoft Azure portal, displaying details and settings for a function app deployment.](https://kodekloud.com/kk-media/image/upload/v1752868286/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/create-function-app-azure-portal-2.jpg)

## Creating Your First Function

After deploying your Function App, follow these steps to create your first function:

1.  **Navigate to Your Function App and Click "Create Function":**
2.  **Select a Trigger:**  
    For example, choose the HTTP trigger and name your function (e.g., "trigger").  
    ![The image shows a Microsoft Azure portal interface where a user is creating a new function. The "Create Function" panel is open, displaying options for selecting a development environment and template, such as an HTTP trigger.](https://kodekloud.com/kk-media/image/upload/v1752868287/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Azure-Functions/azure-portal-create-function-panel.jpg)
3.  **Review the Base Code:**  
    Azure provides default code which you can modify as needed. Click on "Create" to proceed with the base code.
4.  **Edit Your Function Code:**  
    Go to the "Code + Test" section to examine and make changes to your function's code.

> [!important]
> **PowerShell Example**
>
> If you prefer PowerShell, here is an example of an HTTP-triggered function. It checks for a "name" parameter in the URL query string or the request body and returns a personalized greeting if provided:

```
using namespace System.Net
param($Request, $TriggerMetadata)

# Write to the Azure Functions log stream.
Write-Host "PowerShell HTTP trigger function processed a request."

# Interact with query parameters or the body of the request.
$name = $Request.Query.Name
if (-not $name) {
    $name = $Request.Body.Name
}

$body = "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."

if ($name) {
    $body = "Hello, $name. This HTTP triggered function executed successfully."
}

# Associate values to output bindings by calling 'Push-OutputBinding'.
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $body
})
```

5.  **Test Your Function:**  
    Click on "Get Function URL" to copy the URL, then paste it into your browser with `?Name=Sam` appended to see the message "Hello, Sam. This HTTP triggered function executed successfully." If no name is provided, the function will prompt you to pass a name.

These event-driven functions demonstrate the serverless computing model by executing code in response to specific triggers.

## Conclusion

This guide covered the fundamentals of Azure Functions, including its architecture, significant benefits, and common use cases. Additionally, you learned how to create a Function App and implement an HTTP-triggered function using the Azure Portal. Future comparisons with other Azure compute services will further enhance your understanding of how to select the best service for your application needs.

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/8eca3741-67ac-4ee2-8439-aa23c16d33dd/lesson/4413b2d1-c5aa-466d-8b52-dff525e8b378)**
>
> Watch video content
