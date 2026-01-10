# Building the sample ASP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Building-and-containerizing-sample-application/Building-the-sample-ASP)

---

## Table of Contents

- Building the sample ASP
  - Prerequisites
  - 1. Enable Kubernetes in Docker Desktop
  - 2. Verify Your .NET 6 Installation
  - 3. Create the ASP.NET Core Web App
  - 4. Modify the Page Model
  - 5. Configure appsettings.json
  - 6. Update the Razor Page
  - 7. Run and Validate
  - 8. Multi-Stage Dockerfile
  - 9. Build and Push the Docker Image
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Building and containerizing sample application

# Building the sample ASP

## Prerequisites

| Requirement                    | Purpose                                        | Link                                             |
| ------------------------------ | ---------------------------------------------- | ------------------------------------------------ |
| Docker Desktop                 | Container runtime and local Kubernetes cluster | https://www.docker.com                           |
| .NET 6 SDK                     | Build and run ASP.NET Core 6 applications      | https://dotnet.microsoft.com/download/dotnet/6.0 |
| JetBrains Rider (or other IDE) | Project creation and code editing              | https://www.jetbrains.com/rider/                 |

> [!important]
> **Note**
>
> These steps work on Windows, macOS, or Linux. Adjust commands for your OS and editor of choice.

## 1\. Enable Kubernetes in Docker Desktop

Open Docker Desktop, go to **Settings** > **Kubernetes**, then:

1.  Check **Enable Kubernetes**.
2.  Click **Apply & Restart** to bootstrap a single-node cluster.

![The image shows a computer desktop with Docker Desktop settings open, specifically the Kubernetes configuration section. The left side of the screen displays desktop icons for Recycle Bin, Docker Desktop, and JetBrains Rider.](https://kodekloud.com/kk-media/image/upload/v1752869448/notes-assets/images/Azure-Kubernetes-Service-Building-the-sample-ASP/docker-desktop-kubernetes-settings-desktop.jpg)

## 2\. Verify Your .NET 6 Installation

Run:

```
dotnet --list-sdks
```

> [!important]
> **Warning**
>
> Make sure `.NET 6.x` appears in the list. Earlier versions will not compile this sample.

## 3\. Create the ASP.NET Core Web App

1.  Launch JetBrains Rider and click **New Solution**.
2.  Select **ASP.NET Core Web Application**. Name the project `KodeKloudApp` and set the solution folder.
3.  Choose the **Web App** template.
4.  Enable **Docker** support and select **Linux** containers.

![The image shows a computer screen with JetBrains Rider open, displaying the "New Solution" window for creating an ASP.NET Core Web Application. The desktop background features a blue abstract design.](https://kodekloud.com/kk-media/image/upload/v1752869449/notes-assets/images/Azure-Kubernetes-Service-Building-the-sample-ASP/jetbrains-rider-new-solution-aspnet-core.jpg)

## 4\. Modify the Page Model

Open `Pages/Index.cshtml.cs` and inject `IConfiguration` to read a custom message:

```
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;


namespace KodeKloudApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly IConfiguration _configuration;


        public string Message { get; set; }


        public IndexModel(ILogger<IndexModel> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }


        public void OnGet()
        {
            Message = _configuration["Message"] ?? "Hello World";
        }
    }
}
```

## 5\. Configure appsettings.json

Add the `"Message"` key to the JSON file:

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Message": ""
}
```

## 6\. Update the Razor Page

In `Pages/Index.cshtml`, render the message:

```
@page
@model KodeKloudApp.Pages.IndexModel
@{
    ViewData["Title"] = "Home page";
}


<div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>@Model.Message</p>
    <p>
      Learn about
      <a href="https://docs.microsoft.com/aspnet/core">
        building Web apps with ASP.NET Core
      </a>.
    </p>
</div>
```

## 7\. Run and Validate

Start the application:

```
dotnet run
```

Open your browser to the displayed URL (e.g., `https://localhost:5001`). You should see **Hello World**.  
Stop the app, update `"Message"` in _appsettings.json_ to `"Hello World changed"`, save, then restart and refresh:

```
{
  // ...
  "Message": "Hello World changed"
}
```

![The image shows a web page titled "KodeKloudApp" with a welcome message and a highlighted text saying "Message: Hello World changed!!!" It includes links to "Home" and "Privacy" at the top.](https://kodekloud.com/kk-media/image/upload/v1752869450/notes-assets/images/Azure-Kubernetes-Service-Building-the-sample-ASP/kodekloudapp-welcome-message-hello-world.jpg)

## 8\. Multi-Stage Dockerfile

Use this Dockerfile to build and run with a minimal runtime image:

| Stage | Image                               | Purpose                       |
| ----- | ----------------------------------- | ----------------------------- |
| base  | mcr.microsoft.com/dotnet/aspnet:6.0 | Runtime                       |
| build | mcr.microsoft.com/dotnet/sdk:6.0    | Restore, build, publish       |
| final | mcr.microsoft.com/dotnet/aspnet:6.0 | Copy published output and run |

```
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["KodeKloudApp.csproj", "./"]
RUN dotnet restore "KodeKloudApp.csproj"
COPY . .
RUN dotnet build "KodeKloudApp.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "KodeKloudApp.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KodeKloudApp.dll"]
```

## 9\. Build and Push the Docker Image

From your project root:

```
cd RiderProjects/KodeKloudApp
docker build . -t kodekloudapp:1
docker image ls
```

Optionally, pull the sample image:

```
docker pull hpranav/kodekloudapp
```

## Links and References

- [Docker Desktop](https://www.docker.com)
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/azure/aks)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/20789863-851c-44c5-a251-8cb7f78f60b5/lesson/aaa7c969-7244-422d-bd3f-b3d32a4b72ce)**
>
> Watch video content
