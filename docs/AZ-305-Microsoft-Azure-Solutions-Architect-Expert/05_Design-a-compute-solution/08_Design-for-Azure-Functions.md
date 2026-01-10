# Design for Azure Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-compute-solution/Design-for-Azure-Functions)

---

## Table of Contents

- Design for Azure Functions
  - Introduction to Azure Functions
  - Considerations for Designing with Azure Functions
  - Deploying an Azure Function via the Azure Portal
  - Testing the Function
  - Beyond Functions: An Overview of Logic Apps
  - Watch Video
    - Step 1: Creating the Function App
    - Step 2: Creating a Function
    - Step 3: Editing the Function Code

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a compute solution

# Design for Azure Functions

This article provides a comprehensive overview of Azure Functions, highlights best use cases, and demonstrates a deployment example using the Azure portal.

---

## Introduction to Azure Functions

Azure Functions is a powerful serverless compute platform provided by [Microsoft Azure](https://azure.microsoft.com/). It enables you to execute small pieces of event-driven code, known as functions, without managing any underlying infrastructure. Simply write your application logic, and when a trigger—such as an HTTP call, a timer event, or another type of signal—is activated, your code runs seamlessly. This capability makes Azure Functions an ideal choice for event-driven, short-lived workloads.

Key benefits include:  
• Support for multiple programming languages, including Python, PowerShell, .NET, JavaScript, and more  
• Microservices design that promotes code reuse  
• Automatic scaling through the consumption plan, where you pay only for the actual executions  
• Option to switch to dedicated infrastructure via App Service Plans when needed  
• Support for various triggers such as schedules, queues, and service bus messages

> [!important]
> **Note**
>
> Azure Functions is best suited for scenarios with event-driven and short-duration processes. Consider other services if your workload requires long-running operations.

---

## Considerations for Designing with Azure Functions

When architecting solutions with Azure Functions, keep these key considerations in mind:

1.  **Long-Running Functions**  
    Running lengthy functions on the consumption plan may consume excessive resources. For processes that require extended execution, switch to a dedicated plan to maintain performance and efficiency.
2.  **Durable Functions**  
    If your workload requires state management across multiple function calls, use the Durable Functions extension. This ensures that state is properly maintained, even during complex workflows.
3.  **Performance**  
    Your Function App's performance is closely tied to the chosen SKU. Although the consumption plan offers cost efficiency, resource limitations might apply. Deploying with an existing App Service Plan or using a premium plan may be more cost-effective for resource-intensive functions.
4.  **Scalability**  
    The scalability of your functions depends on the billing model. While the consumption plan utilizes shared resources, Function Apps in App Service or premium plans can scale more robustly to meet demand.
5.  **Defensive Programming**  
    Emphasize proper exception handling within your function code to maintain uninterrupted service even when encountering unexpected errors.

![The image is an infographic from KodeKloud outlining considerations for designing solutions with Azure Functions, including long-running functions, durable functions, performance, scalability, and designing defensive functions.](https://kodekloud.com/kk-media/image/upload/v1752866857/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Functions/azure-functions-design-considerations.jpg)

---

## Deploying an Azure Function via the Azure Portal

In this section, we'll deploy an HTTP-triggered function that returns the flag of a specified country using PowerShell in the Azure portal.

### Step 1: Creating the Function App

- Sign in to the Azure portal and search for "Function App."
- Click on "Create" to start a new Function App.
- Select your subscription and create a new resource group.
- Enter a unique name for your Function App (for example, "flagshowfunction"). This function is designed to return a country's flag based on the provided country name.
- Choose PowerShell as the runtime stack and select your preferred region (e.g., East US).
- For the plan type, select the consumption (serverless) plan, which charges based on each execution.
- A unique storage account is automatically created along with the function.
- Optionally, skip configuring networking and Application Insights at this time.
- Finally, review the settings and create the Function App.

### Step 2: Creating a Function

Once the Function App is deployed:

- Navigate to your Function App and create a new function.

![The image shows a Microsoft Azure portal screen indicating that a deployment is complete, with options for next steps and feedback.](https://kodekloud.com/kk-media/image/upload/v1752866858/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Functions/azure-portal-deployment-complete.jpg)

- Select the HTTP trigger template and give your function a name (e.g., "ShowFlagFunction").

![The image shows the Microsoft Azure portal interface for creating a function within a Function App. It displays options for selecting a template and configuring function details.](https://kodekloud.com/kk-media/image/upload/v1752866859/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Functions/azure-portal-function-app-creation.jpg)

### Step 3: Editing the Function Code

Head over to the "Code + Test" section where you can modify the default code. The function logic will:

- Extract the country name from the query string or request body.
- Call the REST Countries API using the country name to retrieve the corresponding flag.
- Return the flag image or an error message if the country name is invalid.

Below is the final PowerShell code for the function:

```
using namespace System.Net


# Input bindings are passed in via the param block.
param($Request, $TriggerMetadata)


# Retrieve the "Name" parameter from the query string or request body.
$name = $Request.Query.Name
if (-not $name) {
    $name = $Request.Body.Name
}


# Default response message.
$body = "Enter a valid country name to show the flag"


if ($name) {
    # Invoke the REST Countries API to retrieve flag information.
    $response = Invoke-RestMethod -Uri "https://restcountries.com/v3.1/name/$name?fullText=true&fields=flags"
    $flag = $response.flags.png
    # Fetch the flag image content.
    $body = (Invoke-WebRequest $flag).Content
}


# Return the HTTP response.
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $body
})
```

---

## Testing the Function

To test your Azure Function:

- Navigate to the function URL in your browser.
- Append a query string parameter (e.g., "?Name=France").
- The function will call the REST Countries API and display the flag for the specified country.
- If an invalid country name is provided, you will see the message: "Enter a valid country name to show the flag."

Try testing with different country names such as India or Qatar to view their corresponding flags.

---

## Beyond Functions: An Overview of Logic Apps

Azure provides another event-driven service called Logic Apps. Although both Azure Functions and Logic Apps support event-driven scenarios, they have different strengths. Logic Apps offer a visual workflow designer that simplifies integrating multiple services without coding, making it ideal for orchestrating complex workflows. Conversely, Azure Functions are best suited for lightweight, code-centric tasks.

---

This article has detailed the design considerations for Azure Functions, guided you through a practical deployment example, and outlined when to choose between Functions and Logic Apps. Use these insights to build scalable, efficient, and robust event-driven solutions on Azure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/bf1d18e5-9589-48cf-99af-4150d985241a/lesson/5f1615c3-eeee-41cc-8566-5abb6cf3a78b)**
>
> Watch video content
