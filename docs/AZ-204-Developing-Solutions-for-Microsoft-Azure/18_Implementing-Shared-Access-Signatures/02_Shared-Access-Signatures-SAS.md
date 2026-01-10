# Shared Access Signatures SAS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Shared-Access-Signatures/Shared-Access-Signatures-SAS)

---

## Table of Contents

- Shared Access Signatures SAS
  - Types of SAS Tokens
  - Best Practices for Using SAS Tokens
  - Anatomy of a SAS URL
  - Generating SAS Tokens via the Azure Portal
  - Accessing Data Using SAS Tokens
  - Generating SAS Tokens Using the .NET SDK
  - Conclusion
  - Watch Video
    - 1. User Delegation SAS
    - 2. Service SAS
    - 3. Account SAS
    - 1. User Delegation SAS
    - 2. Account SAS

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Shared Access Signatures

# Shared Access Signatures SAS

In this lesson, you will learn about Shared Access Signatures (SAS) in Azure—a security feature that allows you to grant limited access to your resources without exposing your storage account keys. SAS tokens help you define specific permissions, constrain the allowed time window, and restrict access by IP range, making them ideal for secure data sharing in Azure.

---

## Types of SAS Tokens

There are three main types of SAS tokens in Azure:

### 1\. User Delegation SAS

User Delegation SAS is the most secure type because it is generated using Microsoft Entra ID credentials, thus enforcing the same access controls and Conditional Access Policies supported by Microsoft Entra ID.

For example, if you have a storage account holding sensitive financial data, you can generate a User Delegation SAS to provide temporary and controlled access for specific users or groups. To create a User Delegation SAS, you need appropriate storage roles, such as Storage Blob Data Contributor, Owner, or Reader.

### 2\. Service SAS

A Service SAS grants delegated access to specific resources within a storage account and is authenticated using the storage account key. With a Service SAS, you can limit access to particular services like Blob, File, Queue, or Table. A common scenario is a web application using a Service SAS to allow image uploads to a Blob container for a short duration.

### 3\. Account SAS

Account SAS tokens provide access to the entire storage account—including blob containers, queues, tables, and file shares—and are useful when multiple teams need concurrent access to different storage components.

![The image illustrates three types of Shared Access Signatures (SAS): User Delegation SAS, Service SAS, and Account SAS, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752866665/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Shared-Access-Signatures-SAS/shared-access-signatures-types-icons.jpg)

---

## Best Practices for Using SAS Tokens

- **Always Use HTTPS:** Enforce secure connections (HTTPS) when generating a SAS token to ensure data encryption during transmission.
- **Prefer User Delegation SAS:** When possible, choose User Delegation SAS since it leverages Microsoft Entra ID for stronger security.
- **Set Short Expiration Times:** Limit the SAS token validity period to minimize the exposure risk.
- **Apply the Principle of Least Privilege:** Grant only the permissions needed for the task at hand. For instance, if read-only access is sufficient, avoid providing write or delete permissions.
- **Assess Alternatives:** In environments with elevated security requirements, consider using Microsoft Entra ID directly instead of relying solely on SAS tokens.

> [!important]
> **Note**
>
> Ensure that your SAS token usage aligns with your overall security policies to maintain secure data access.

![The image lists best practices for using Shared Access Signatures, including using HTTPS, setting minimal expiration times, and applying minimum-required privileges. It also notes that SAS isn't always the correct solution.](https://kodekloud.com/kk-media/image/upload/v1752866666/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Shared-Access-Signatures-SAS/shared-access-signatures-best-practices.jpg)

---

## Anatomy of a SAS URL

A typical SAS URL is composed of the following components:

- **Base URL:** e.g., medicalrecords.blob.core.windows.net
- **Container Name:** e.g., patientimage
- **Blob or Object Name:** e.g., a JPEG file
- **SAS Token Parameters:** Includes permissions, start and expiry times, API version, storage type, and a cryptographic signature

![The image explains the components of a Shared Access Signature (SAS) URL for accessing data, detailing parameters like access rights, start and end times, API version, storage type, and cryptographic signature.](https://kodekloud.com/kk-media/image/upload/v1752866668/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Shared-Access-Signatures-SAS/shared-access-signature-url-components.jpg)

For example:

- **SP:** Lists permissions (R for read, W for write, D for delete, etc.)
- **ST/SE:** Define the start and expiry times.
- **SV:** Specifies the storage API version.
- **SRB:** Indicates the type of storage resource (B for blob, F for file, etc.)
- **Signature:** A unique cryptographic string that verifies authenticity.

---

## Generating SAS Tokens via the Azure Portal

You can generate SAS tokens using the Azure portal before implementing them with SDKs:

1.  Open your storage account and navigate to a container (e.g., "airportcodes") that holds a file (such as airports.json).
2.  Scroll down to the "Shared Access Signatures" section.
3.  Configure the SAS by choosing the services, resource types, permissions, start/end times, IP restrictions, and the protocol (ensure HTTPS is enforced).
4.  Click to generate the SAS token.> [!important]
    > **Warning**
    >
    > If you rotate the signing key, any previously generated SAS tokens will be revoked.

![The image shows a Microsoft Azure portal interface for configuring a Shared Access Signature (SAS) for a storage account, with options for setting permissions, allowed services, and expiration dates.](https://kodekloud.com/kk-media/image/upload/v1752866669/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Shared-Access-Signatures-SAS/azure-portal-sas-configuration.jpg)

After generating the SAS token, append it to your resource URL. Without a valid SAS token, trying to access a private container might return an error similar to:

```
<Error>
    <Code>ResourceNotFound</Code>
    <Message>The specified resource does not exist. RequestId:231217b3-301e-0065-1f25-09a821000000 Time:2024-09-17T17:15:49.4907161Z</Message>
</Error>
```

Once the SAS token is appended, your access to the resource is granted.

![The image shows a Microsoft Azure portal interface displaying details of a JSON file named "airports.json" within a storage container. It includes properties like URL, size, content type, and encryption status.](https://kodekloud.com/kk-media/image/upload/v1752866670/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Shared-Access-Signatures-SAS/azure-portal-airports-json-details.jpg)

---

## Accessing Data Using SAS Tokens

By appending the SAS token to the resource URL, you enable access to your resource content. For instance, when accessing an airport codes blob with a valid SAS token, you might receive a JSON response similar to the following:

```
[
    {"code": "UNN", "airport_name": "Ujín Airport", "country_code": "China"},
    {"code": "YRE", "airport_name": "Ujáku Airport", "country_code": "Serbia"},
    {"code": "YVR", "airport_name": "Vancouver International Airport", "country_code": "Canada"},
    {"code": "YGR", "airport_name": "Iles-de-la-Madeleine Airport", "country_code": "Democratic Republic of the Congo"},
    {"code": "YJT", "airport_name": "Whea Airport", "country_code": "Uzbekistan"},
    {"code": "WRA", "airport_name": "Wara Airport", "country_code": "Finland"},
    {"code": "MWJ", "airport_name": "Mo i Rana Airport", "country_code": "Norway"},
    {"code": "GNV", "airport_name": "Gainesville Municipal Airport", "country_code": "Poland"},
    {"code": "CNO", "airport_name": "Chino Airport", "country_code": "Central African Republic"},
    {"code": "PAV", "airport_name": "Paranaval Airport", "country_code": "China"},
    {"code": "DVO", "airport_name": "Francisco Bangoy International Airport", "country_code": "Philippines"},
    {"code": "PDO", "airport_name": "Palo Duro Airport", "country_code": "Philippines"},
    {"code": "CDP", "airport_name": "Cooperstown-Westville Airport", "country_code": "France"},
    {"code": "GKB", "airport_name": "Gasaki Airport", "country_code": "Philippines"},
    {"code": "BWK", "airport_name": "Brač Airport", "country_code": "Croatia"},
    {"code": "HKG", "airport_name": "Hong Kong International Airport", "country_code": "China"},
    {"code": "KTH", "airport_name": "Katohew Airport", "country_code": "Australia"},
    {"code": "SDZ", "airport_name": "Shangqiao Airport", "country_code": "Western Sahara"},
    {"code": "CDT", "airport_name": "Kwiak Airport", "country_code": "China"},
    {"code": "PZR", "airport_name": "Paz del Río Airport", "country_code": "Colombia"},
    {"code": "HIL", "airport_name": "Hindu Island Airport", "country_code": "Madagascar"},
    {"code": "ZEM", "airport_name": "Zary Airport", "country_code": "Kazakhstan"},
    {"code": "KGR", "airport_name": "Kugra Airport", "country_code": "United States"},
    {"code": "KOS", "airport_name": "Kodair Airport", "country_code": "Philippines"},
    {"code": "KDA", "airport_name": "Little Mech Airport", "country_code": "China"},
    {"code": "SST", "airport_name": "Santo Airport", "country_code": "Brazil"}
]
```

---

## Generating SAS Tokens Using the .NET SDK

Below are examples demonstrating how to generate SAS tokens programmatically using the .NET SDK.

### 1\. User Delegation SAS

The following example illustrates how to generate a User Delegation SAS token:

```
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Azure.Identity;


class Program
{
    static async Task Main(string[] args)
    {
        string storageAccountName = "az204st8890";
        string containerName = "airportcodes";
        string blobName = "airports.json";
        var credential = new DefaultAzureCredential();
        string blobServiceUri = $"https://{storageAccountName}.blob.core.windows.net/";
        BlobServiceClient blobServiceClient = new BlobServiceClient(new Uri(blobServiceUri), credential);


        DateTimeOffset keyStart = DateTimeOffset.UtcNow;
        DateTimeOffset keyExpiry = keyStart.AddHours(1);
        UserDelegationKey userDelegationKey = await blobServiceClient.GetUserDelegationKeyAsync(keyStart, keyExpiry);

        // Create a SAS builder for the blob resource
        BlobSasBuilder sasBuilder = new BlobSasBuilder
        {
            BlobContainerName = containerName,
            BlobName = blobName,
            Resource = "b",
            StartsOn = DateTimeOffset.UtcNow.AddMinutes(-5),
            ExpiresOn = DateTimeOffset.UtcNow.AddHours(1)
        };


        sasBuilder.SetPermissions(BlobSasPermissions.Read | BlobSasPermissions.Write);
        string sasToken = sasBuilder.ToSasQueryParameters(userDelegationKey, storageAccountName).ToString();


        UriBuilder futureUri = new UriBuilder($"{blobServiceUri}/{containerName}/{blobName}");
        futureUri.Query = sasToken;


        Console.WriteLine($"User Delegation SAS URL: {futureUri.Uri}");
    }
}
```

This code initializes a BlobServiceClient using default Azure credentials, retrieves a user delegation key, configures the SAS parameters, and then constructs the full URL required to access the blob resource.

### 2\. Account SAS

The following example shows how to generate an Account SAS using the storage account key:

```
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Azure.Identity;
using Azure.Storage;


class Program
{
    static void Main(string[] args)
    {
        string storageAccountName = "a2045t8899";
        string storageAccountKey = "7Mw4j4xVhss68PBXICd0t85Du9cwZ4Qttyh9PdRvzjW9I3du/+Xl2pUc80gimSpvtZ0QW+ASftwfxNg==";


        StorageSharedKeyCredential sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);


        AccountSasBuilder sasBuilder = new AccountSasBuilder
        {
            Services = AccountSasServices.Blobs | AccountSasServices.Files,
            ResourceTypes = AccountSasResourceTypes.Service | AccountSasResourceTypes.Container | AccountSasResourceTypes.Object,
            Protocol = SasProtocol.Https,
            ExpiresOn = DateTimeOffset.UtcNow.AddHours(1)
        };


        sasBuilder.SetPermissions(AccountSasPermissions.Read | AccountSasPermissions.Write | AccountSasPermissions.List);


        string sasToken = sasBuilder.ToSasQueryParameters(sharedKeyCredential).ToString();
        string blobServiceUrl = $"https://{storageAccountName}.blob.core.windows.net/";
        UriBuilder fullUri = new UriBuilder(blobServiceUrl)
        {
            Query = sasToken
        };


        Console.WriteLine($"Account SAS URL: {fullUri.Uri}");
    }
}
```

This example uses the storage account key to generate an Account SAS token. Be sure to rotate your storage account key immediately if it is ever compromised, as it grants broad access to your storage resources.

---

## Conclusion

Shared Access Signatures (SAS) provide a flexible and secure method to grant temporary access to Azure resources while maintaining strict security controls. By using User Delegation SAS, Service SAS, or Account SAS in accordance with best practices—such as enforcing HTTPS, limiting token lifespans, and applying the principle of least privilege—you can effectively manage secure access to your resources.

We encourage you to experiment with these techniques using the Azure portal as well as SDKs like .NET to build a robust understanding of SAS token generation and management. For further details, check out relevant [Azure Documentation](https://docs.microsoft.com/azure/storage/common/storage-sas-overview) and additional [security best practices](https://docs.microsoft.com/azure/security/fundamentals/identity-management-best-practices).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/00cea585-8945-49f2-bd87-be0ce9c88985/lesson/820189a8-4b39-4b17-a106-cb3701d3c709)**
>
> Watch video content
