# Managing Container Properties and Metadata - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Working-With-Azure-Blob-Storage/Managing-Container-Properties-and-Metadata)

---

## Table of Contents

- Managing Container Properties and Metadata
  - Using the .NET SDK to Set Metadata and Retrieve Container Properties
  - Managing Metadata with PowerShell
  - Example in Visual Studio Using .NET
  - Summary
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Working With Azure Blob Storage

# Managing Container Properties and Metadata

Managing container properties and metadata in Azure Blob Storage is a crucial task for organizing data and controlling access. In this guide, you'll learn how to manage both system properties and user-defined metadata using the .NET SDK and PowerShell with REST APIs. This capability allows you to store important information alongside your containers, facilitating better data organization and enhanced security.

## Using the .NET SDK to Set Metadata and Retrieve Container Properties

In this example, we set custom metadata on a blob container using the `SetMetadataAsync` method, which accepts a dictionary of key-value pairs. After setting the metadata, the container's properties are retrieved to verify important details such as the last modified date and public access level.

```
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.Threading.Tasks;

public class BlobContainerExample
{
    public static async Task SetMetadataAndGetPropertiesAsync(BlobContainerClient containerClient)
    {
        // Set metadata
        await containerClient.SetMetadataAsync(new Dictionary<string, string>
        {
            { "owner", "admin" },
            { "environment", "production" }
        });

        // Get properties
        BlobContainerProperties properties = await containerClient.GetPropertiesAsync();
        Console.WriteLine($"Container: {containerClient.Name}, Last Modified: {properties.LastModified}, Access: {properties.PublicAccess}");
    }
}
```

In the code above, the metadata keys "owner" and "environment" are set to "admin" and "production" respectively. Retrieving the container properties confirms that these updates have been successfully applied.

## Managing Metadata with PowerShell

For those who prefer using PowerShell, similar results can be achieved by leveraging REST APIs. Metadata is passed through HTTP headers using the format `x-ms-meta-<name>: <value>`. For instance, to set metadata with the key "owner" and value "admin", you would use the header `x-ms-meta-owner: admin`.

The following PowerShell script demonstrates how to set metadata via a PUT request and retrieve container properties using a GET request:

```
$accountName = "yourstorageaccount"
$containerName = "yourcontainer"
$accountKey = "youraccountkey"
$baseUri = "https://$accountName.blob.core.windows.net/$containerName"

# Set Metadata
$headers = @{
    "x-ms-version"            = "2021-04-10"
    "x-ms-date"               = (Get-Date).ToString("R")
    "x-ms-meta-owner"         = "admin"
    "x-ms-meta-environment"   = "production"
}

$authHeader = "SharedKey $accountName:$([Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($accountKey)))"
Invoke-RestMethod -Uri "$baseUri?restype=container" -Method Put -Headers $headers -Header @{Authorization = $authHeader}

# Get Properties
$response = Invoke-RestMethod -Uri "$baseUri?restype=container&comp=metadata" -Method Get -Headers $headers
Write-Host "Owner: $($response.Headers.'x-ms-meta-owner'), Env: $($response.Headers.'x-ms-meta-environment'), Last Modified: $($response.Headers.'Last-Modified')"
```

> [!important]
> **Note**
>
> When using the account key for authorization, ensure it is properly encoded to Base64 to secure your API calls.

## Example in Visual Studio Using .NET

The following example demonstrates how to work with container properties and metadata within a .NET console application. In this demonstration, you will create a new console project, add the necessary NuGet packages, and write code to connect to your storage account using a connection string.

1.  Create a new Console Application project in Visual Studio (targeting .NET 6) and name it "Container Metadata Demo".

![The image shows a software development environment with a dialog box for configuring a new console application, where you can enter a project name, solution name, and set the location. The left panel displays a project structure with dependencies and a program file.](https://kodekloud.com/kk-media/image/upload/v1752866782/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Container-Properties-and-Metadata/software-development-console-application-config.jpg)

2.  Open the NuGet Package Manager and install the required Azure Storage libraries. Once added, replace the default code with the following:

```
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        // Replace with your connection string and container name from the Azure portal.
        string connectionString = "your_connection_string";
        string containerName = "your_container_name";

        // Initialize the BlobServiceClient and BlobContainerClient.
        BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
        BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);
        await containerClient.CreateIfNotExistsAsync();

        // Define metadata to set on the container.
        var metadata = new Dictionary<string, string>
        {
            { "user", "admin" },
            { "env", "lab" }
        };

        // Set the metadata for the container.
        await containerClient.SetMetadataAsync(metadata);

        // Retrieve and display the container's metadata.
        BlobContainerProperties properties = await containerClient.GetPropertiesAsync();
        foreach (var item in properties.Metadata)
        {
            Console.WriteLine($"{item.Key}: {item.Value}");
        }
    }
}
```

This code initializes the Azure Blob Storage client, creates the container if it doesn't already exist, and sets metadata with the keys "user" and "env". It then retrieves the container properties and prints the metadata to the console.

For quick reference, here is a summarized version of the key operations:

```
var metadata = new Dictionary<string, string>
{
    { "user", "admin" },
    { "env", "lab" }
};

await containerClient.SetMetadataAsync(metadata);

BlobContainerProperties properties = await containerClient.GetPropertiesAsync();
foreach (var item in properties.Metadata)
{
    Console.WriteLine($"{item.Key}: {item.Value}");
}
```

Expected console output:

```
user:admin
env:lab
```

## Summary

In this guide, we demonstrated how to manage Azure Blob Storage container properties and metadata using both the .NET SDK and PowerShell with REST APIs. Key takeaways include:

- Using GET (or `GetPropertiesAsync` in .NET) to retrieve container properties and metadata.
- Using PUT (or `SetMetadataAsync` in .NET) to set metadata and properties.
- Ensuring the account key is properly Base64-encoded for secure API calls.
- Leveraging the .NET SDK to simplify container management tasks.

> [!important]
> **Helpful Resource**
>
> For more information on Azure Blob Storage and managing metadata, visit the [Azure Blob Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/).

By following this guide, you'll be able to efficiently organize and manage your Azure Blob Storage containers, ensuring your data is effectively maintained and secured.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/bd8aef3d-3583-45c6-a1a8-8161e7578cbb/lesson/c7b1dda0-8826-45c1-9035-a8dd08a2ece4)**
>
> Watch video content
