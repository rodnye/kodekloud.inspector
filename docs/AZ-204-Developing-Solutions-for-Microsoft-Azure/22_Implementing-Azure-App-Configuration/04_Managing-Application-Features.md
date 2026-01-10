# Managing Application Features - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-App-Configuration/Managing-Application-Features)

---

## Table of Contents

- Managing Application Features
  - Feature Flag
  - Feature Manager
  - Filter
  - Components for Managing Application Features
  - Feature Flag Declaration
  - Feature Flag Repository with Azure App Configuration
  - Integrating Azure App Configuration into Your Application
  - Managing Feature Flags with Azure App Configuration
  - Securing App Configuration Data
  - Watch Video
    - Setting Up program.cs
    - Configuring the csproj File
    - Configuration Explorer in Azure Portal
    - Updated program.cs for Caching
    - Home Controller: Accessing Configuration Values
    - Index View
    - Updated program.cs for Feature Management
    - Updated csproj File for Feature Management
    - Testing Feature Flags

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure App Configuration

# Managing Application Features

This article covers the fundamental concepts of managing application features using feature flags, a feature manager, and filters. We will also demonstrate how to integrate feature management in your application with Azure App Configuration.

## Feature Flag

A feature flag is an on/off switch used to enable or disable specific functionality in an application without redeploying code. This allows developers to roll out new features incrementally, test functionality in controlled groups, and prevent unwanted exposure. For example, when introducing a new login feature, you can deploy the code with a feature flag so that only a subset of users experience the new interface while others continue using the existing one.

## Feature Manager

The feature manager orchestrates the lifecycle of feature flags. It initializes, manages, and applies flags within the application, dynamically evaluating which flags to enable or disable based on specific conditions. In a shopping app, for instance, the feature manager can control features like discount codes or alternative payment methods.

## Filter

A filter defines criteria or conditions that determine when a feature flag is enabled or disabled. These conditions could be based on factors such as user roles, geographic location, browser type, or even a percentage of the user base. For example, a filter might enable a feature for users in a specific region or only during certain hours.

![The image explains three basic concepts of managing application features: Feature Flag, Feature Manager, and Filter, each with a brief description and icon.](https://kodekloud.com/kk-media/image/upload/v1752866584/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Application-Features/feature-flag-manager-filter-diagram.jpg)

## Components for Managing Application Features

Effective feature management requires a number of components:

1.  **Application with Feature Flags:**  
    Your application must support feature flags as a core part of its development and deployment strategy. This enables selective activation of features based on user or environment.
2.  **Feature Flag Repository:**  
    A dedicated repository (such as Azure App Configuration) stores the feature flags and their statuses (enabled/disabled) independently from your application code.

    ![The image describes components for managing application features, highlighting an application using feature flags and a separate repository storing these flags and their states.](https://kodekloud.com/kk-media/image/upload/v1752866585/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Application-Features/feature-flags-management-components.jpg)

3.  **App Configuration Service:**  
    This service provides a centralized location for storing feature flags, allowing real-time management of application configuration.

## Feature Flag Declaration

Feature flags are declared using two main components:

- **Name:** A unique identifier for the flag.
- **List of Filters:** Conditions that determine whether the flag is enabled or disabled.

When multiple filters are specified, they are evaluated sequentially. As soon as one filter condition is satisfied, the feature state is set according to your defined logic. Feature managers can also support external configuration files like `appsettings.json` to manage flags without hardcoding them.

![The image describes three aspects of managing application features: feature flags have a name and filters, multiple filters are evaluated in order, and the feature manager supports appsettings.json for configuration.](https://kodekloud.com/kk-media/image/upload/v1752866588/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Application-Features/feature-flags-management-overview.jpg)

## Feature Flag Repository with Azure App Configuration

For optimal use of feature flags, externalizing them is crucial. Hardcoding feature flags negates the benefit of dynamic configuration. Instead, use an external system like Azure App Configuration, which facilitates centralized management across various environments and services.

![The image explains managing application features using a feature flag repository, highlighting the importance of externalizing feature flags and using Azure App Configuration as a centralized repository.](https://kodekloud.com/kk-media/image/upload/v1752866589/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Application-Features/feature-flag-repository-azure-app-config.jpg)

In the Azure portal, you can configure and manage feature flags, integrate Azure App Configuration into your code, and retrieve configuration values dynamically using paired keys and values.

## Integrating Azure App Configuration into Your Application

Below is an example demonstrating how to integrate Azure App Configuration into an MVC application using Visual Studio Code.

### Setting Up program.cs

In `program.cs`, add the NuGet package for Azure App Configuration and configure it with your connection string. For production scenarios, always secure your connection string using managed identities or other secure methods instead of hardcoding it.

```
using Microsoft.Extensions.Configuration.AzureAppConfiguration;

var builder = WebApplication.CreateBuilder(args);

// Connect to Azure App Configuration
builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect("endpoint=https://appconfig1990.azconfig.io;Id=Id4;Secret=3cs9faC4e3CeJ3nSL2s7Y6dftGdjJhxM6rBm7UQAJQ8eyjIBTyAggEJfTt5BAACZACM30T")
           .ConfigureRefresh(refresh =>
           {
               refresh.Register("LandingPageMessage", refreshAll: true)
                      .Register("LandingPageBackgroundColor", refreshAll: true)
                      .Register("LandingPageFontSize", refreshAll: true)
                      .SetCacheExpiration(TimeSpan.FromSeconds(5));
           });
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});
```

```
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/AppConfig
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5114
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/AppConfig
```

### Configuring the csproj File

Ensure that your project file includes the necessary packages:

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Configuration.AzureAppConfiguration" Version="7.3.0" />
    <PackageReference Include="Microsoft.FeatureManagement.AspNetCore" Version="3.5.0" />
  </ItemGroup>

</Project>
```

> [!important]
> **Secure Connection String Considerations**
>
> In production environments, avoid hardcoding connection strings. Use secure methods, such as managed identities and Azure Key Vault, to access sensitive configuration data.

### Configuration Explorer in Azure Portal

In Azure App Configuration, create key-value pairs for your app settings (e.g., background color, font size, welcome message). The image below shows the key-value pairs in the configuration explorer:

![The image shows a Microsoft Azure Configuration Explorer interface displaying key-value pairs for app configuration settings, including background color, font size, and a welcome message.](https://kodekloud.com/kk-media/image/upload/v1752866591/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Application-Features/azure-configuration-explorer-settings.jpg)

For example, you might set the landing page background color to a specific hex code, font size as a numeric value, and a custom welcome message. Caching (set to five seconds) ensures your application retrieves the latest configurations automatically.

### Updated program.cs for Caching

Below is an enhanced example of `program.cs` with caching enabled:

```
using Microsoft.Extensions.Configuration.AzureAppConfiguration;

var builder = WebApplication.CreateBuilder(args);

// Connect to Azure App Configuration and set refresh options
builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect("Endpoint=https://az204appconfig919.azconfig.io;Id=Id14;Secret=3cs9faCe4Jesd3J2sLksfVdjyJhxN6G7B7mBFL7JQ0A1JYCEjbFLTvBvSAAACAZCM30T")
           .ConfigureRefresh(refresh =>
           {
               refresh.Register("LandingPageMessage", refreshAll: true)
                      .Register("LandingPageBackgroundColor", refreshAll: true)
                      .Register("LandingPageFontSize", refreshAll: true)
                      .SetCacheExpiration(TimeSpan.FromSeconds(5));
           });
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});

app.Run();
```

```
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/AppConfig
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5114
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/AppConfig
```

### Home Controller: Accessing Configuration Values

In your HomeController, configuration values are retrieved and passed to the view. The following example demonstrates how to check for a feature flag (e.g., "ShowNewUI") and override default settings when enabled:

```
public class HomeController : Controller
{
    private readonly IConfiguration _configuration;
    private readonly IFeatureManager _featureManager;

    public HomeController(IConfiguration configuration, IFeatureManager featureManager)
    {
        _configuration = configuration;
        _featureManager = featureManager;
    }

    public async Task<IActionResult> Index()
    {
        // Default settings from App Configuration
        ViewBag.Message = _configuration["LandingPageMessage"];
        ViewBag.BackgroundColor = _configuration["LandingPageBackgroundColor"];
        ViewBag.FontSize = _configuration["LandingPageFontSize"];

        // Override settings if the "ShowNewUI" feature flag is enabled
        if (await _featureManager.IsEnabledAsync("ShowNewUI"))
        {
            ViewBag.Message = "Welcome to the new UI";
            ViewBag.BackgroundColor = "#fab691";
            ViewBag.FontSize = "18px";
        }

        return View();
    }
}
```

### Index View

In the `Index.cshtml` view, use the values stored in `ViewBag` to set styles dynamically:

```
@{
    ViewData["Title"] = "Home Page";
}

<div style="background-color:@ViewBag.BackgroundColor; padding:50px;">
    <h1 style="font-size:@ViewBag.FontSize;">@ViewBag.Message</h1>
    <p>This page is dynamically configured using Azure App Configuration.</p>
</div>
```

```
AppConfig dotnet run
Building...
Now listening on: http://localhost:5114
Application started. Press Ctrl+C to shut down.
```

Every time you update a value in Azure App Configuration—such as changing the background color via the Azure portal—the application will eventually reflect the new configuration thanks to caching and refresh settings. While local development might sometimes require a restart, production environments benefit from seamless configuration updates.

## Managing Feature Flags with Azure App Configuration

Feature flags are managed directly through the Azure portal. Follow these steps to create and configure a feature flag:

1.  Click on "Create" and select "Feature Flag".
2.  Provide a unique name (e.g., "ShowNewUI") and optionally add a description and label.
3.  Add filters if you require targeted control, such as a time window filter for scheduling.

![The image shows a Microsoft Azure portal interface for creating a new feature flag with options to set a feature name, key, and description, along with a time window filter for scheduling.](https://kodekloud.com/kk-media/image/upload/v1752866593/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Application-Features/azure-portal-feature-flag-creation.jpg)

After configuring the feature flag in the portal, update your application code to incorporate feature management.

### Updated program.cs for Feature Management

Below is the enhanced `program.cs` configuration that includes support for feature flags:

```
using Microsoft.Extensions.Configuration.AzureAppConfiguration;

var builder = WebApplication.CreateBuilder(args);

// Connect to Azure App Configuration with feature flag support
builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect("Endpoint=https://az204appconfig019.azconfig.io;Id=Id;Secret=3cs9faC4e2Jc3E3r3nS1z2lSkdfwdjxHn6ER7Bm7U7JQQ9AIAcygBEFiTvD5AAACAZCM30T")
           .UseFeatureFlags()
           .ConfigureRefresh(refresh =>
           {
               refresh.Register("LandingPageMessage", refreshAll: true)
                      .Register("LandingPageBackgroundColor", refreshAll: true)
                      .Register("LandingPageFontSize", refreshAll: true)
                      .SetCacheExpiration(TimeSpan.FromSeconds(5));
           });

    builder.Services.AddAzureAppConfiguration();
    builder.Services.AddFeatureManagement();
    builder.Services.AddControllersWithViews();
});

var app = builder.Build();

app.UseAzureAppConfiguration();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});
```

```
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/AppConfig
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5114
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /Users/rithinskaria/Projects/AppConfig
```

### Updated csproj File for Feature Management

Ensure your project file includes the appropriate packages:

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Azure.AppConfiguration.AspNetCore" Version="7.3.0" />
    <PackageReference Include="Microsoft.Extensions.Configuration.AzureAppConfiguration" Version="7.3.0" />
    <PackageReference Include="Microsoft.FeatureManagement.AspNetCore" Version="5.0.0" />
  </ItemGroup>

</Project>
```

### Testing Feature Flags

In the HomeController (as shown earlier), default configuration values are overridden when the "ShowNewUI" feature flag is enabled. Activating this flag in the Azure portal will update your application UI dynamically, while disabling the flag will revert to the default configuration.

![The image shows the Microsoft Azure portal's Feature Manager interface, displaying a feature flag named "ShowNewUI" that is currently disabled.](https://kodekloud.com/kk-media/image/upload/v1752866595/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Application-Features/azure-portal-feature-manager-shownewui.jpg)

Run your application to see the changes. Refreshing the page will reflect any new configuration based on the active feature flags.

## Securing App Configuration Data

Securing your configuration data is critical in production. Avoid hardcoding connection strings or sensitive data within your application. Instead, leverage managed identities and retrieve secrets from Azure Key Vault. This practice ensures secure access while maintaining dynamic configuration.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/705e9ab6-55cd-4824-8c7a-79570dc8e52f/lesson/5b591cba-9cba-461f-a723-3eb345529a67)**
>
> Watch video content
