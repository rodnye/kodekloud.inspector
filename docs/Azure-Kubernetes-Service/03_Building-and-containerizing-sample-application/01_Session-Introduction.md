# Session Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Building-and-containerizing-sample-application/Session-Introduction)

---

## Table of Contents

- Session Introduction
  - Prerequisites
  - 1. Creating the ASP.NET Core Application
  - 2. Containerizing with Docker
  - 3. Using a Pre-built Image (Optional)
  - References
  - Watch Video

---

## Content

Azure Kubernetes Service

Building and containerizing sample application

# Session Introduction

Welcome to this module of our Azure Kubernetes Service (AKS) course. In this lesson, you’ll learn how to:

- Scaffold and run a simple ASP.NET Core Razor Pages application
- Containerize the app using Docker Desktop
- Optionally pull a pre-built image from Docker Hub

The Docker image you build here will be deployed to Azure in a later lesson.

## Prerequisites

Make sure you have the following installed:

| Prerequisite   | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| .NET 6 SDK     | Download from [Microsoft .NET](https://dotnet.microsoft.com/download/dotnet/6.0) |
| Docker Desktop | Install via [Docker Desktop](https://www.docker.com/products/docker-desktop)     |
| Code Editor    | Visual Studio Code, Visual Studio, or any editor of your choice                  |

> [!important]
> **Note**
>
> Ensure Docker Desktop is running before you build or pull any images.

---

## 1\. Creating the ASP.NET Core Application

We'll scaffold a basic Razor Pages app and review the `IndexModel` class. Create a new project and replace the contents of `Pages/Index.cshtml.cs` with:

```
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;


namespace KodeKloudApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;


        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }


        public void OnGet()
        {
        }
    }
}
```

This minimal page model logs requests and serves the Razor Page on HTTP GET.

---

## 2\. Containerizing with Docker

At the root of your ASP.NET project, add a `Dockerfile` similar to:

```
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app


FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "KodeKloudApp.dll"]
```

Build the Docker image:

```
docker build -t yourrepo/kodekloudapp:latest .
```

A successful build will output stages like:

```
[+] Building 12.4s (5/17)
 => CACHED [build 1/7] FROM mcr.microsoft.com/dotnet/sdk:6.0 ...
 => [build 3/7] COPY . .
 => [build 4/7] RUN dotnet restore
 => [build 5/7] RUN dotnet build
 => [build 6/7] RUN dotnet publish
[base 1/2] FROM mcr.microsoft.com/dotnet/aspnet:6.0 ...
...
```

| Dockerfile Stage | Purpose                                 |
| ---------------- | --------------------------------------- |
| build            | Restores, builds, and publishes the app |
| runtime          | Hosts the compiled app                  |

After completion, you’ll have an image tagged `yourrepo/kodekloudapp:latest`.

---

## 3\. Using a Pre-built Image (Optional)

If you’d rather skip local builds, pull the image directly from Docker Hub:

```
docker pull yourrepo/kodekloudapp:latest
```

> [!important]
> **Note**
>
> You can browse [Docker Hub](https://hub.docker.com) and search for `yourrepo/kodekloudapp` to verify the image and get the exact pull command.

---

## References

- [Azure Kubernetes Service Documentation](https://docs.microsoft.com/azure/aks/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/20789863-851c-44c5-a251-8cb7f78f60b5/lesson/79d99d21-6950-474c-a918-4e86a670eb45)**
>
> Watch video content
