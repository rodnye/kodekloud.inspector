# Troubleshooting App Performance by Using Application Map - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Monitoring-App-Performance/Troubleshooting-App-Performance-by-Using-Application-Map)

---

## Table of Contents

- Troubleshooting App Performance by Using Application Map
  - Deploying a Web Application with Application Insights
  - The Broken App Demonstration
  - Watch Video
    - Simulated Exceptions in Code

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Monitoring App Performance

# Troubleshooting App Performance by Using Application Map

In this lesson, we'll explore how to troubleshoot application performance issues with the Application Map feature in Application Insights. Application Map gives you a high-level visual overview of how different components within your application interact. This tool enables you to quickly pinpoint performance bottlenecks and identify failing services through a clear depiction of dependencies.

Let's start by reviewing an overview diagram of Application Map:

At the center of the map is a circle that represents one instance of the application handling 12% of the total load. Surrounding this central instance are several connected components—including Azure Blob Storage, SQL, and Cube—that display their own performance metrics. Notice the availability circle on the left, illustrating an overall system availability of 25%. Application Insights allows you to set up an Availability Test, which in this case shows 517 tests conducted with an average response time of 8.3 seconds. This feature lets you test any HTTP or HTTPS endpoint without modifying the target website. It is particularly useful when monitoring dependencies like REST APIs, even if the site isn’t owned by you. Typically, you can create up to 100 Availability Tests per Application Insights resource. A red availability metric indicates that the application is not consistently available.

![The image is a diagram illustrating app performance troubleshooting using an application map, showing availability metrics and call times for Azure Blob, SQL, and Azure Queue services.](https://kodekloud.com/kk-media/image/upload/v1752866723/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Troubleshooting-App-Performance-by-Using-Application-Map/app-performance-troubleshooting-diagram.jpg)

Observing the diagram further, on the right side, the application interacts with various services:

- **Azure Blob Storage:** Displays 1.5k calls with an alert indicating a response time of 12.5ms and approximately 25% failed calls—suggesting a potential bottleneck.
- **SQL Database:** Handles about 3.8k calls with a 16.3ms response time and 5% call failures, which needs further investigation to avoid database performance issues.
- **Azure Queue Storage:** Shows 1.1k calls with an 8.3-second response time, but with no critical errors, indicating acceptable performance.

Using Application Map, you can inspect all dependencies and click on individual items for detailed diagnostics and a comprehensive understanding of request flows.

---

> [!important]
> **Note**
>
> After exploring the Application Map, we will now demonstrate how to capture exceptions and monitor performance issues using Application Insights directly in the Azure Portal.

## Deploying a Web Application with Application Insights

In this demonstration, we will deploy an Azure App Service using Application Insights to monitor performance and capture telemetry data. Follow these steps in the [Azure Portal](https://portal.azure.com):

1.  Navigate to **App Services** and create a new Web App.
2.  Select an existing App Service plan (for example, one that already runs flight logs and other APIs) and create a new resource group named "RGAZ204 App Service".
3.  Name the app "Broken Application Insights".
4.  Choose .NET 8 and deploy in the Canada Central region.
5.  Even though a database isn’t required, enable Application Insights by selecting "Yes" on the configuration screen under the Monitor plus Secure section.

![The image shows a configuration screen for enabling Application Insights and Microsoft Defender for Cloud in an Azure environment. It includes options to enable these features and select a region for Application Insights.](https://kodekloud.com/kk-media/image/upload/v1752866724/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Troubleshooting-App-Performance-by-Using-Application-Map/azure-application-insights-defender-config.jpg)

After clicking on "Review and Create", the web app is deployed. Once completed, click "Go to Resource" to confirm that Application Insights is enabled and connected. You can later adjust telemetry data collection by selecting the Recommended option, which includes:

- **Application Insights SDK Interop:** Loads the Application Insights extension along with your SDK for seamless telemetry data collection.
- **Profiler:** Records detailed traces to analyze where time is spent in your code, helping to diagnose performance issues.
- **Snapshot Debugger:** Captures call stacks and local variables when exceptions occur to aid in root cause analysis.
- **SQL Commands:** Monitors SQL queries, showing compiled commands and associated parameters during web requests to identify inefficient queries.

Click "Apply" to set the desired monitoring settings for your application.

---

## The Broken App Demonstration

The demonstration application, known as the Broken App, is specifically designed to simulate several common exceptions for testing Application Insights. The landing page includes buttons to trigger different exception types:

- Null Reference Exception
- Divide By Zero Exception
- Custom Exception
- Broken Database Connection

Below is the HTML markup for the landing page:

```
@page
@model IndexModel
{
    ViewData["Title"] = "Broken App";
}


<h1>The Broken App 🐛</h1>
<br>
<div>
    <button onclick="location.href='?handler=NoneReference'">Null Reference Exception</button>
    <button onclick="location.href='?handler=DivideByZero'">Divide By Zero Exception</button>
    <button onclick="location.href='?handler=CustomException'">Custom Exception</button>
    <button onclick="location.href='?handler=DatabaseError'">Broken Database Connection</button>
</div>
```

The sample console output below shows the build information and runtime logs when the application starts:

```
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: Microsoft.Hosting.Lifetime[0]
      TheBrokenApp dotnet run
Building...
warn: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5196
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/TheBrokenApp
fail: Microsoft.AspNetCore.Hosting.Diagnostics[6]
      Failed to change the HTTP port for redirect.
```

### Simulated Exceptions in Code

The following code samples show how various exceptions are triggered within the app:

```
// Trigger DivideByZeroException
public IActionResult OnGetDivideByZero()
{
    int zero = 0;
    var result = 1 / zero;
    return Page();
}


// Trigger a Custom Exception
public IActionResult OnGetCustomException()
{
    throw new InvalidOperationException("This is a custom exception for demo purposes.");
}


// Trigger a Broken Database Connection
public IActionResult OnGetDatabaseError()
{
    string connectionString = "Server=tcp:brokenserver.database.windows.net;Database=NonExistentDB;User Id=baduser;Password=badpassword;";
    try
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
        }
    }
    catch (SqlException ex)
    {
        throw new InvalidOperationException("Database connection failed.", ex);
    }


    return Page();
}
```

The main page also handles a Null Reference Exception as demonstrated below:

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Data.SqlClient;


public class IndexModel : PageModel
{
    public void OnGet()
    {
    }


    // Trigger NullReferenceException
    public IActionResult OnGetNullReference()
    {
        string? nullString = null;
        var length = nullString.Length;
        return Page();
    }


    // Trigger DivideByZeroException
    public IActionResult OnGetDivideByZero()
    {
        int zero = 0;
        var result = 1 / zero;
        return Page();
    }
}
```

Below is an example run log of the Broken App:

```
TheBrokenApp> dotnet run
Building...
/Users/rithinskaria/Projects/TheBrokenApp/Pages/Index.cshtml.cs(16,22): warning CS8602: Dereference of a possibly null reference. [/Users/rithinskaria/Projects/TheBrokenApp/TheBrokenApp.csproj]
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5196
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down...
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/TheBrokenApp/TheBrokenApp
info: Microsoft.AspNetCore.Hosting.Diagnostics[2]
      Request starting HTTP/1.1 GET http://localhost:5196/  [/Users/rithinskaria/Projects/TheBrokenApp/TheBrokenApp]
info: Microsoft.AspNetCore.Hosting.Diagnostics[1]
      Request finished in 16.1776ms 200
```

After deploying the Broken App, navigate to its overview in the Azure Portal and click on Application Insights to verify that telemetry is being captured. Telemetry records include 500 errors corresponding to the simulated exceptions: Null Reference Exception, Divide By Zero Exception, Custom Exception, and Broken Database Connection. Clicking on each error reveals a complete call stack and diagnostic details, including specific information about the non-existent database during the database error scenario.

Additionally, Application Insights provides Live Metrics that enable you to monitor incoming requests and real-time exceptions. You can also use the Application Map to view your application instance, the database service (which, in this demo, does not return insights due to connection failure), and other related metadata services.

![The image shows a Microsoft Azure portal interface displaying the "Availability" section of "Application Insights" for a project named "thebrokenappinsights." It includes a graph of availability over time and a panel for creating a standard test with various configuration options.](https://kodekloud.com/kk-media/image/upload/v1752866725/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Troubleshooting-App-Performance-by-Using-Application-Map/azure-portal-application-insights-availability.jpg)

With Application Insights configured and exceptions captured, you now have a comprehensive view of your application's performance, dependencies, and issues. This monitoring setup allows you to diagnose problems quickly and optimize performance in your production environment.

---

For more details on Application Insights, please refer to the [Microsoft Azure Documentation](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/25287e89-7860-401f-a2c1-af5a7a2e07c6/lesson/5f846aeb-c6cb-4993-87fe-79fbbbd8b0f8)**
>
> Watch video content
