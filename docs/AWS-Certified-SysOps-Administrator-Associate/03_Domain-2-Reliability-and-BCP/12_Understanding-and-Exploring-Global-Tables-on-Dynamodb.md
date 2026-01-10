# Understanding and Exploring Global Tables on Dynamodb - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Understanding-and-Exploring-Global-Tables-on-Dynamodb)

---

## Table of Contents

- Understanding and Exploring Global Tables on Dynamodb
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Understanding and Exploring Global Tables on Dynamodb

Welcome back, students!

In this lesson, we delve into the world of DynamoDB Global Tables—a powerful feature that enables eventually consistent, active–active replication across multiple regions.

Imagine Global Tables as an advanced DynamoDB capability that supports multi-region, multi-master replication. This means you can deploy tables in regions such as EU Central, AP South 1, Africa South 1, and US East 1, with any data written in one region eventually propagating to all others.

![The image is a map illustrating the concept of DynamoDB Global Tables, showing various global regions (us-east-1, eu-central-1, sa-east-1, ap-south-1, ap-southeast-2) connected with lines labeled "In-Sync."](https://kodekloud.com/kk-media/image/upload/v1752860226/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-and-Exploring-Global-Tables-on-Dynamodb/dynamodb-global-tables-map.jpg)

Typically, replication delays occur within a range of a few milliseconds up to one or two seconds. By configuring Global Tables, you can create a mesh network of DynamoDB tables worldwide. For instance, when you perform writes on a local table, you benefit from DynamoDB’s native speed, whereas accessing replicated data from a distant region (such as writing in US East 1 and reading in AP Southeast 2) might incur a delay of one to three seconds, depending on the network latency.

> [!important]
> **Key Advantage**
>
> Global Tables offer fully managed, multi-region, multi-master (active–active) database functionalities. This enables your applications to conduct both local reads and writes while ensuring global data replication.

Global Tables are designed to provide enhanced fault tolerance and robust disaster recovery (DR) solutions. While local transactions can maintain strong consistency, the global operations operate on an eventual consistency basis, making it essential to keep this in mind during application design.

![The image lists features of DynamoDB Global Table, including multi-region replication, multi-master architecture, fault tolerance, and consistency models.](https://kodekloud.com/kk-media/image/upload/v1752860228/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-and-Exploring-Global-Tables-on-Dynamodb/dynamodb-global-table-features.jpg)

One significant benefit of using Global Tables is improved availability—even achieving five nines of availability. This is because the system can seamlessly route your application to an alternative region if one region becomes isolated or degraded. To set this up, simply associate your regional tables (for example, linking your Virginia table with others) and configure the appropriate IAM permissions. In this configuration, local reads and writes remain fast and strongly consistent while the system asynchronously propagates changes across all replicas.

![The image lists the benefits of DynamoDB Global Tables, including availability, ease of setup, global data access, and consistency.](https://kodekloud.com/kk-media/image/upload/v1752860229/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-and-Exploring-Global-Tables-on-Dynamodb/dynamodb-global-tables-benefits.jpg)

Each replica in a Global Table holds an identical set of data; there is no partial replication. Conflict resolution is managed using a "last writer wins" mechanism. For example, if two updates occur at 12:01 and 12:02 respectively, the update at 12:02 will override the previous one—even down to microsecond differences.

From a performance perspective, local operations typically incur a latency in the single-digit milliseconds—even in a globally distributed environment. This impressive performance is achieved thanks to active–active replication, which allows simultaneous data writes and reads across regions. While local operations are immediate, data written in one region is asynchronously propagated to others, adhering to an eventual consistency model.

![The image is a diagram illustrating how Amazon DynamoDB Global Tables work, showing user interactions through Amazon Route 53 with latency-based routing, and data processing in AWS Regions A and B using Amazon API Gateway, AWS Lambda, and DynamoDB. Replication between regions is managed using DynamoDB global tables.](https://kodekloud.com/kk-media/image/upload/v1752860231/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-and-Exploring-Global-Tables-on-Dynamodb/dynamodb-global-tables-diagram.jpg)

When a write request is made, DynamoDB leverages latency-based routing to direct the request to the nearest region. This ensures the lowest possible latency. In many cases, writing to the nearest regional table is sufficient, though you may also integrate API Gateway or WAN enhancements if necessary.

Consider common use cases such as globally replicated login systems, media streaming authentication, and disaster recovery solutions. Global Tables also prove beneficial for multi-region microservices that demand fast access to both local and remote data copies.

![The image shows three use cases for global tables: global applications, disaster recovery, and multi-region microservices, each represented by a colored icon.](https://kodekloud.com/kk-media/image/upload/v1752860232/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-and-Exploring-Global-Tables-on-Dynamodb/global-tables-use-cases-icons.jpg)

Below is a summary of best practices to consider when implementing Global Tables:

| Best Practice                | Description                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| Consistent Write Patterns    | Design your application to handle consistent write operations across regions.                       |
| Monitor Replication Lag      | Regularly monitor the replication delay to ensure latency remains within acceptable limits.         |
| Conflict Resolution Strategy | Understand that the system uses a last-writer-wins model, and implement additional logic if needed. |

![The image outlines best practices for global tables, including using consistent write patterns, monitoring replication lag, and handling conflicts gracefully.](https://kodekloud.com/kk-media/image/upload/v1752860233/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Understanding-and-Exploring-Global-Tables-on-Dynamodb/global-tables-best-practices-outline.jpg)

> [!important]
> **Important Note**
>
> While local transactional consistency is available, always ensure you design your application around the eventual consistency model for global operations. This approach is crucial for avoiding data conflicts and ensuring predictable behavior.

In summary, DynamoDB Global Tables offer an efficient and resilient framework for replicating data across multiple regions. They combine local performance with global availability under an eventual consistency model, making them ideal for modern, distributed applications.

We hope you found this lesson informative. Stay tuned for our next session where we explore more advanced DynamoDB features and best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/0cd4a11d-01e8-4e5b-bbf5-767bc8375310)**
>
> Watch video content
