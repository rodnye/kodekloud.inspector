# Using - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Developing-for-storage-on-CDNs/Using)

---

## Table of Contents

- Using
  - Creating a CDN Management Client
  - Listing CDN Profiles and Endpoints
  - A Comprehensive CDN Management Demo
  - Conclusion
  - References
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Developing for storage on CDNs

# Using

In this lesson, you'll learn how to leverage the Azure CDN Library for .NET to automate the creation, management, and monitoring of Azure Content Delivery Networks (CDN). This integration simplifies working with CDN profiles and endpoints, allowing .NET developers to manage CDN resources programmatically.

The Azure CDN Library for .NET enables you to:

- Create a CDN client that serves as the entry point for managing Azure CDN.
- Retrieve detailed information about existing CDN profiles and their endpoints.
- Automate the creation of new CDN profiles and endpoints, reducing manual intervention.
- Purge CDN endpoints to clear cached content and ensure users receive the most updated origin content.

> [!important]
> **Quick Tip**
>
> Using the .NET SDK for Azure CDN enables seamless integration into your existing .NET applications while automating otherwise manual CDN operations.

## Creating a CDN Management Client

The following C# code snippet demonstrates how to instantiate a CDN management client using token credentials and a subscription ID:

```
static void Main(string[] args)
{
    // Create CDN client using token credentials generated from an authentication result
    CdnManagementClient cdn = new CdnManagementClient(new TokenCredentials(authResult.AccessToken))
    {
        SubscriptionId = subscriptionId
    };
}
```

Once the CDN client is instantiated, you can perform various operations such as listing CDN profiles and endpoints.

## Listing CDN Profiles and Endpoints

Use the method below to list all CDN profiles within a specified resource group and enumerate each profile's endpoints. This method is useful for auditing your current CDN configuration and ensuring optimal resource allocation.

```
private static void ListProfilesAndEndpoints(CdnManagementClient cdn, string resourceGroupName)
{
    // List all the CDN profiles in the specified resource group
    var profileList = cdn.Profiles.ListByResourceGroup(resourceGroupName);
    foreach (Profile p in profileList)
    {
        Console.WriteLine("CDN profile: {0}", p.Name);


        // List all the CDN endpoints for the current profile
        Console.WriteLine("Endpoints:");
        var endpointList = cdn.Endpoints.ListByProfile(p.Name, resourceGroupName);
        foreach (Endpoint e in endpointList)
        {
            Console.WriteLine(" - {0} ({1})", e.Name, e.HostName);
        }
        Console.WriteLine();
    }
}
```

This method iterates through each CDN profile in the resource group and prints both the profile name and its associated endpoints, including endpoint names and hostnames.

## A Comprehensive CDN Management Demo

The following comprehensive example shows how to list existing CDN profiles and their endpoints within your Azure subscription. This demo uses default Azure credentials from Visual Studio Code to generate the necessary token for accessing the Azure Management API.

```
static async Task Main(string[] args)
{
    var cdnClient = new CdnManagementClient(serviceClientCredentials)
    {
        SubscriptionId = "5487d26-b51b-468e-ad45-6e12acfc7e7"
    };


    ListProfilesAndEndpoints(cdnClient, "rg-az2204-cdn");
}


static void ListProfilesAndEndpoints(CdnManagementClient cdnClient, string resourceGroupName)
{
    // List all the CDN profiles in the specified resource group
    var profileList = cdnClient.Profiles.ListByResourceGroup(resourceGroupName);
    foreach (Profile p in profileList)
    {
        Console.WriteLine($"CDN profile: {p.Name}");
        Console.WriteLine("Endpoints:");
        var endpointList = cdnClient.Endpoints.ListByProfile(p.Name, resourceGroupName);
        foreach (Endpoint e in endpointList)
        {
            Console.WriteLine($" - {e.Name} ({e.HostName})");
        }
        Console.WriteLine();
    }
}
```

When you run this code with valid credentials, it authenticates your request and retrieves a list of CDN profiles and their respective endpoints for the specified resource group. An example console output might look like this:

```
CdnManagement  dotnet run
CDN profile: happylearning-cdn
Endpoints:
 - happylearning (happylearning.azureedge.net)
```

> [!important]
> **Additional Resources**
>
> For real-world scenarios, many CDN management tasks are commonly executed using Azure CLI, PowerShell, or the Azure Portal. However, if you are a .NET developer aiming to integrate CDN management within your application, the .NET SDK offers a practical solution.

## Conclusion

In this lesson, you learned how to create a CDN management client using the Azure .NET SDK and automate several CDN operations such as profile enumeration, endpoint listing, and content purging. These operations provide enhanced control over your CDN resources and contribute to more efficient content delivery.

This concludes the last lesson in [AZ-204: Developing Solutions for Microsoft Azure](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure).

## References

- [Azure CDN Documentation](https://learn.microsoft.com/en-us/azure/cdn/)
- [Azure SDK for .NET](https://learn.microsoft.com/en-us/dotnet/azure/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/892d3923-3191-43b5-a566-3db2ad980268/lesson/a380770f-030a-43d4-9c33-e63ef501d5a6)**
>
> Watch video content
