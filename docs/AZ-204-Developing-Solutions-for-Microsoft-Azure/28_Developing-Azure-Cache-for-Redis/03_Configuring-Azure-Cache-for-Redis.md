# Configuring Azure Cache for Redis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Developing-Azure-Cache-for-Redis/Configuring-Azure-Cache-for-Redis)

---

## Table of Contents

- Configuring Azure Cache for Redis
  - Core Configuration Components
  - Essential Redis Commands
  - Setting Expiration Times on Cache Values
  - Accessing Azure Cache for Redis from a Client Application
  - Deploying and Connecting via the Azure Portal
  - Connecting to Azure Cache for Redis from .NET
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Developing Azure Cache for Redis

# Configuring Azure Cache for Redis

In this guide, you will learn how to configure Azure Cache for Redis and interact with it using essential Redis commands, the Redis CLI, and a .NET client. We cover core configuration components, key commands, and a step-by-step deployment process via the Azure portal.

---

## Core Configuration Components

When setting up Azure Cache for Redis, consider the following configurations to optimize your instance for your application needs:

- **Name:**  
  Assign a unique name to easily identify and manage your Azure Cache for Redis instance within the Azure portal. Ensure that the name is unique across Azure.
- **Location:**  
  Select a data center that is geographically close to your users or other services. This minimizes latency and enhances performance.
- **Pricing Tier:**  
  Azure Cache for Redis is available in various pricing tiers—Basic, Standard, Premium, Enterprise, and Enterprise Flash. Each tier provides different levels of scalability, features, and cost. Choose the tier that best meets your budget and performance requirements.
- **Virtual Network Support:**  
  Enhance security by deploying your Redis instance within a virtual network. This isolates your cache from the public internet and provides better control over network traffic.
- **Clustering Support:**  
  For high-workload environments, clustering enables data distribution across multiple nodes, which improves scalability and availability.

![The image is a guide for configuring Azure Cache for Redis, highlighting key elements like Name, Location, Pricing Tier, Virtual Network Support, and Clustering Support.](https://kodekloud.com/kk-media/image/upload/v1752866208/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Azure-Cache-for-Redis/azure-cache-redis-configuration-guide.jpg)

---

## Essential Redis Commands

After configuring your Azure Cache for Redis instance, you can interact with it using a variety of Redis commands. Below is a list of common commands for managing your cache:

```
# Check server availability
ping


# Store a key-value pair
set [key] [value]


# Increment the value of a key by 1
incr [key]


# Return the data type of the value stored at key
type [key]


# Retrieve the value stored under a key
get [key]


# Check if a key exists (returns 1 if present, 0 otherwise)
exists [key]


# Increment the value of a key by a specified amount
incrby [key] [amount]


# Delete a key and its value
del [key]


# Clear all data in the current database
flushdb
```

For example, you can use the `set` command to save a key-value pair and the `get` command to retrieve that value.

---

## Setting Expiration Times on Cache Values

Managing cache lifetime is crucial. Redis allows you to set an expiration time on keys using the `expire` command, ensuring that stale data is automatically removed. Consider the following example, which sets a 5-second expiration on a counter key:

```
# Set the counter key with a value of 100
> set counter 100
OK


# Set the key "counter" to expire after 5 seconds
> expire counter 5
(integer) 1


# Immediately retrieve the value (it should still exist)
> get counter
"100"


# After waiting for more than 5 seconds, retrieving the key returns nil
> get counter
(nil)
```

> [!important]
> **Note**
>
> The `SET` command stores the counter value while the `EXPIRE` command ensures that the value is removed after the specified time.

---

## Accessing Azure Cache for Redis from a Client Application

Once your cache is configured, you need two key pieces of information to access it from a client application:

1.  **Hostname:**  
    This is the fully qualified domain name of your Azure Cache for Redis instance, available in the Azure portal.
2.  **Access Key:**  
    This key acts like a password. Retrieve it from the authentication section in the Azure portal.

Ensure that the Azure Cache for Redis CLI is installed on your system (available for Windows, macOS, and Linux) before you attempt to connect.

---

## Deploying and Connecting via the Azure Portal

Follow these steps to deploy and connect to an Azure Cache for Redis instance using the Azure portal and the Redis CLI:

1.  **Searching for Redis in the Azure Portal:**  
    Open the Azure portal and search for "Redis" to display available Azure Cache for Redis options.

    ![The image shows the Microsoft Azure portal with a search for "redis" in progress, displaying options like "Azure Cache for Redis." The portal also lists recent resources and their last viewed times.](https://kodekloud.com/kk-media/image/upload/v1752866210/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Azure-Cache-for-Redis/azure-portal-redis-search-options.jpg)

2.  **Creating a Redis Cache Instance:**
    - Click on "Create Redis Cache."
    - Create a new resource group (for example, "RG AZ204 Cache").
    - Provide a unique DNS name for the cache instance (e.g., "Canada Central").
    - Select a pricing tier. For demonstration, choose the basic tier (C0 with 250 MB).
    - In the networking tab, configure settings as per your security requirements.
    - In the advanced settings tab, ensure that access keys authentication is enabled.

    ![The image shows a Microsoft Azure portal interface for creating a new Redis Cache, with fields for subscription, resource group, DNS name, location, and cache size.](https://kodekloud.com/kk-media/image/upload/v1752866212/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Azure-Cache-for-Redis/azure-portal-redis-cache-creation.jpg)

    ![The image shows a Microsoft Azure portal page for creating a new Redis Cache, specifically on the "Advanced" tab, with options for enabling Microsoft Entra Authentication and Access Keys Authentication.](https://kodekloud.com/kk-media/image/upload/v1752866214/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Azure-Cache-for-Redis/azure-portal-redis-cache-advanced.jpg)

    Once validation passes, click on "Review and Create" followed by "Create." After deployment, navigate to the resource overview where the hostname and access keys are displayed.

    ![The image shows the Microsoft Azure portal displaying an overview of a Redis cache instance, including memory usage and server load graphs.](https://kodekloud.com/kk-media/image/upload/v1752866221/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Configuring-Azure-Cache-for-Redis/azure-portal-redis-cache-overview.jpg)

3.  **Connecting Using the Redis CLI:**  
    Open your terminal and connect to your instance using the Redis CLI. If TLS is enabled (which is the default for Azure Cache for Redis), use the following command by replacing the hostname and access key with your resource’s specific details:

    ```
    redis-cli -h az204rediscache09.redis.cache.windows.net -a pqtzSgrxbqWWWIp9uh0xHG1gEuDjImDwzAzCaIkfKZU= -p 6380 --tls
    ```

    Verify connectivity by issuing a `ping` command:

    ```
    az204rediscache09.redis.cache.windows.net:6380> ping
    PONG
    ```

    Then, set and retrieve a key to further confirm connectivity:

    ```
    # Setting the key "name" with value "admin"
    az204rediscache09.redis.cache.windows.net:6380> set name admin
    OK


    # Retrieving the value of "name"
    az204rediscache09.redis.cache.windows.net:6380> get name
    "admin"
    ```

> [!important]
> **Note**
>
> This demonstration shows how to deploy, connect, and interact with an Azure Cache for Redis instance using the Redis CLI.

---

## Connecting to Azure Cache for Redis from .NET

After verifying connectivity via the Redis CLI, you can connect to your cache from a .NET application. Follow these steps in your .NET project:

1.  Add the appropriate Redis client library (such as [StackExchange.Redis](https://stackexchange.github.io/StackExchange.Redis/)).
2.  Use the hostname and access key from your Azure Cache for Redis instance, and connect via port 6380 for TLS connections.
3.  Implement the client code to interact with the cache as needed.

This enables your .NET application to seamlessly leverage Azure Cache for Redis for high-performance caching.

---

This article provides a comprehensive overview of configuring and managing Azure Cache for Redis—from its initial deployment in the Azure portal to performance tuning using Redis commands and secure client connections.

For further reading and detailed information, please refer to the official [Azure Cache for Redis Documentation](https://learn.microsoft.com/azure/azure-cache-for-redis/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/1d6464e7-4ccd-4858-850d-60397cdf3293/lesson/963456da-2bed-4061-b952-9afc9de64064)**
>
> Watch video content
