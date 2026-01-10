# Interacting With Azure Cache for Redis by Using - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Developing-Azure-Cache-for-Redis/Interacting-With-Azure-Cache-for-Redis-by-Using)

---

## Table of Contents

- Interacting With Azure Cache for Redis by Using
  - Establishing a Secure Connection
  - Advanced Commands and Operations
  - A Complete Example
  - Verifying Data with Redis CLI
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Developing Azure Cache for Redis

# Interacting With Azure Cache for Redis by Using

In this guide, you'll learn how to connect to Azure Cache for Redis using .NET. We will demonstrate how to create a secure connection using the StackExchange.Redis library, access the database, execute basic key-value operations, and explore advanced Redis commands for more complex caching scenarios.

## Establishing a Secure Connection

Begin by creating a connection to your Azure Cache for Redis instance. Your connection string includes the Redis Cache name, password, and SSL settings to ensure a secure connection—similar to configuring a connection in the Redis CLI.

Once connected, you can access a specific database and perform operations. For instance, the code below shows how to store and retrieve a key-value pair using the `StringSet` and `StringGet` methods:

```
// Accessing the database and performing basic operations
IDatabase db = redisConnection.GetDatabase();


// Store a key/value pair in the cache
bool wasSet = db.StringSet("favorite:flavor", "i-love-rocky-road");


// Retrieve and display the value
string value = db.StringGet("favorite:flavor");
Console.WriteLine(value); // displays: "i-love-rocky-road"
```

> [!important]
> **Note**
>
> The StackExchange.Redis library is widely used in .NET applications for seamless integration with Redis caches. Ensure your connection string is secure and properly stored.

## Advanced Commands and Operations

Beyond basic operations, Redis offers several advanced commands that are beneficial for complex caching scenarios:

- **Create Batch**: Groups multiple operations and sends them as a single unit to the Redis server. (Note that these operations are not executed as a transaction.)
- **Create Transaction**: Ensures that grouped operations are executed atomically—all commands succeed or none are applied.
- **Key Delete**: Removes a key-value pair from the cache, which is useful for cleaning outdated or unnecessary data.
- **Key Exists**: Checks if a specific key exists, returning a Boolean result to verify data presence before further operations.
- **Key Expire**: Sets a Time-To-Live (TTL) for a key. Once the TTL expires, the key is automatically removed—ideal for managing data lifecycles.
- **Key Rename**: Renames an existing key without affecting the stored data.
- **Key Time To Live**: Retrieves the remaining TTL for a key. A return value of -1 indicates the key will persist indefinitely.
- **Key Type**: Identifies the data type stored at a specified key, assisting in managing various data structures such as strings, lists, and sets.

![The image is a table describing methods for interacting with Azure Cache for Redis using .NET, including method names and their descriptions.](https://kodekloud.com/kk-media/image/upload/v1752866227/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Interacting-With-Azure-Cache-for-Redis-by-Using/azure-cache-redis-dotnet-methods.jpg)

These commands provide robust control over your Redis cache, from handling key expirations to managing operations within batches or transactions.

## A Complete Example

Below is a complete example that walks you through:

1.  Connecting to Azure Cache for Redis using a connection string.
2.  Generating a unique key with a GUID.
3.  Prompting the user to enter a value.
4.  Storing the value in the cache with a TTL of 30 seconds.
5.  Retrieving and displaying the stored value.
6.  Waiting for the key to expire and checking its status.

```
using StackExchange.Redis;
using System;
using System.Threading.Tasks;


class Program
{
    static async Task Main(string[] args)
    {
        // Connection string to Azure Redis Cache
        string redisConnectionString = "az204rediscache09.redis.cache.windows.net:6380,password=pqTzsqrbxqWwIp9uh0xHGlEubDjmDwAzCaIkKZbU,,ssl=True,abortConnect=False";
        ConnectionMultiplexer redisConnection = await ConnectionMultiplexer.ConnectAsync(redisConnectionString);
        IDatabase db = redisConnection.GetDatabase();


        Console.WriteLine("Welcome to Redis Console App!");
        string key = Guid.NewGuid().ToString();
        Console.WriteLine("Enter the value to store in Redis:");
        string? value = Console.ReadLine();
        bool wasSet = await db.StringSetAsync(key, value, TimeSpan.FromSeconds(30));


        if (wasSet)
        {
            Console.WriteLine($"Value '{value}' has been stored with key: {key} and TTL of 30 seconds.");
        }
        else
        {
            Console.WriteLine("Failed to store the value.");
        }


        string? retrievedValue = await db.StringGetAsync(key);
        Console.WriteLine($"Retrieved value: {retrievedValue}");


        Console.WriteLine("Waiting for 30 seconds to let the key expire...");
        await Task.Delay(30000);


        retrievedValue = await db.StringGetAsync(key);
        if (retrievedValue == null)
        {
            Console.WriteLine("The key has expired.");
        }
        else
        {
            Console.WriteLine($"The key is still available with value: {retrievedValue}");
        }
    }
}
```

The expected console output during execution might look like this:

```
Welcome to Redis Console App!
Enter the value to store in Redis:
Value 'azure' has been stored with key: bcba098f-860d-419c-88a8-3ca98b8dfb83 and TTL of 30 seconds.
Retrieved value: azure
Waiting for 30 seconds to let the key expire...
Welcome to Redis Console App!
Enter the value to store in Redis:
Value 'demo' has been stored with key: 36c5d98e-d9ba-48c1-a020-250c911395eb and TTL of 30 seconds.
Waiting for 30 seconds to let the key expire...
```

> [!important]
> **Warning**
>
> Ensure proper error handling and secure management of connection strings in production environments. Avoid exposing sensitive information in your source code.

## Verifying Data with Redis CLI

You can verify data storage and expiration using the Redis CLI. For example, to list keys and retrieve a specific key's value:

```
az204rediscache09.redis.cache.windows.net:6380> keys *
az204rediscache09.redis.cache.windows.net:6380> get 48db0c57-718a-4016-9f77-fda43ee31fbe
"hello-all"
```

After the TTL expires, running the `get` command for the same key will return nil, indicating the key has expired.

This concludes our walkthrough on interacting with Azure Cache for Redis using .NET. Next, we'll explore another popular caching solution in Azure: Azure CDN.

For more information, you may find these resources useful:

- [Azure Cache for Redis Documentation](https://docs.microsoft.com/en-us/azure/azure-cache-for-redis/)
- [StackExchange.Redis GitHub](https://github.com/StackExchange/StackExchange.Redis)
- [Azure CDN Documentation](https://docs.microsoft.com/en-us/azure/cdn/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1d6464e7-4ccd-4858-850d-60397cdf3293/lesson/008ded06-b164-4db1-af75-e6f7c1826fcd)**
>
> Watch video content
