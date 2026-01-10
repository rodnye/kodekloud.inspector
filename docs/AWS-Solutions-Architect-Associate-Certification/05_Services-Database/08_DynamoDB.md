# DynamoDB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/DynamoDB)

---

## Table of Contents

- DynamoDB
  - Components of DynamoDB
  - Key Features and Integrations
  - Use Cases
  - Summary
  - Watch Video
    - Tables, Items, and Attributes
    - Primary Keys
    - Composite Primary Key Example
    - Secondary Indexes
    - DynamoDB Streams
    - Table Classes and Capacity Modes

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# DynamoDB

In this article, we explore AWS DynamoDB—a fully managed NoSQL database service designed to simplify database management and scaling for web applications and services. DynamoDB addresses common database administration challenges by offering a serverless architecture that ensures high availability, automatic sharding, data consistency, and durability. Its seamless scalability makes it ideal for applications dealing with rapidly changing workloads and vast datasets. Since DynamoDB is a managed service, AWS takes care of the provisioning and maintenance of the underlying resources.

![The image explains the benefits of using Amazon DynamoDB, highlighting features like managing and scaling, serverless architecture, handling high traffic, automatic sharding, and operations.](/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB/dynamodb-benefits-features-diagram.jpg)

Below, we dive into the core components of DynamoDB.

## Components of DynamoDB

### Tables, Items, and Attributes

Tables in DynamoDB function similarly to tables in a relational database—they act as collections where data is stored. Each table contains multiple items, with each item representing a single entry (such as a user or a product). Items are composed of attributes that are analogous to columns in a relational database.

![The image illustrates the components of Amazon DynamoDB, highlighting tables, items, and attributes with corresponding icons.](/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB/amazon-dynamodb-components-tables-items.jpg)

For example, consider a table named "people" that stores individual records. Each item in the "people" table could represent a person with attributes like name, email, or phone number. Below is an example representation of a table containing two people:

```
[
    {
        "PersonID": 101,
        "LastName": "Smith",
        "FirstName": "Fred",
        "Phone": "555-4321"
    },
    {
        "PersonID": 102,
        "LastName": "Jones",
        "FirstName": "Mary",
        "Address": {
            "Street": "123 Main",
            "City": "Anytown",
            "State": "OH",
            "ZIPCode": 12345
        }
    }
]
```

Each JSON object in the example above represents an item in the table, with attributes corresponding to properties about the person.

### Primary Keys

Every item in a DynamoDB table is uniquely identified by a primary key. There are two types of primary keys in DynamoDB:

- **Simple Primary Key (Partition Key):** Consists of a single attribute.
- **Composite Primary Key:** Consists of both a partition key and a sort key, ensuring uniqueness across the table by combining these attributes.

In the "people" table example, the `PersonID` attribute serves as the primary key, ensuring that each person is uniquely identified. It is important to avoid using non-unique attributes (e.g., first names) as primary keys.

For tables with composite primary keys, DynamoDB uses the partition key to determine the physical storage location (via an internal hash function) and stores items with the same partition key in order, sorted by the sort key. This design allows multiple items to share the same partition key as long as their sort key values differ.

### Composite Primary Key Example

Consider a music table that stores information about different songs. In this table, a composite primary key is defined by the combination of the artist and the song title. This uniqueness ensures that while an artist can have multiple songs—and different artists might have songs with the same title—the combination always remains unique.

```
[
    {
        "Artist": "No One You Know",
        "SongTitle": "My Dog Spot",
        "AlbumTitle": "Hey Now",
        "Price": 1.98,
        "Genre": "Country",
        "CriticRating": 8.4
    },
    {
        "Artist": "No One You Know",
        "SongTitle": "Somewhere Down The Road",
        "AlbumTitle": "Somewhat Famous",
        "Genre": "Country",
        "CriticRating": 8.4,
        "Year": 1984
    },
    {
        "Artist": "The Acme Band",
        "SongTitle": "Still in Love",
        "AlbumTitle": "The Buck Starts Here",
        "Price": 2.47,
        "Genre": "Rock",
        "PromotionInfo": {
            "RadioStationsPlaying": ["KHCR", "KQBX", "WTNR", "WJJH"],
            "TourDates": {
                "Seattle": "20150622",
                "Cleveland": "20150630"
            },
            "Rotation": "Heavy"
        }
    }
]
```

With a composite primary key, you can query the table efficiently—either by using just the partition key (to retrieve all songs by an artist) or by using both the partition and sort key (to retrieve a specific song by an artist).

### Secondary Indexes

Secondary indexes enable alternative query paths using non-primary key attributes. DynamoDB supports two types of secondary indexes:

- **Global Secondary Index (GSI):** Features a partition key and an optional sort key that can differ from the table's primary key attributes.
- **Local Secondary Index (LSI):** Uses the same partition key as the base table but requires a different sort key.

Each DynamoDB table can have up to 20 global secondary indexes and 5 local secondary indexes. For instance, if you need to query the music table by genre and album title, you can create a secondary index with genre as the partition key and album title as the sort key.

![The image illustrates the concept of secondary indexes in Amazon DynamoDB, showing the flow from a table to an index, with details on global and local secondary indexes.](/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB/dynamodb-secondary-indexes-diagram.jpg)

When a secondary index is created, DynamoDB automatically maintains it as items in the base table are added, updated, or deleted. You can also specify which attributes should be included in the index projection; by default, key attributes are included.

### DynamoDB Streams

DynamoDB Streams is an optional feature that captures data modification events in near-real time. Every modification—whether an insert, update, or delete—creates a stream record that includes details such as the table name, timestamp, and a snapshot of the item.

For example, when a new item is added to the table, DynamoDB Streams captures the complete image of the new item. Similarly, for an update, the stream records both the before and after images. When an item is deleted, the stream captures its pre-deletion image. Each stream record is retained for 24 hours.

You can integrate DynamoDB Streams with AWS Lambda to trigger code execution in response to these events. For instance, in a customer table, a Lambda function could be triggered to send a welcome email whenever a new customer is added.

```
{
    "CustomerID": 1034,
    "LastName": "Major",
    "FirstName": "Alice",
    "EmailAddress": "alice@example.com"
}
```

### Table Classes and Capacity Modes

DynamoDB offers two table classes for optimizing cost and performance:

- **Standard Table Class:** The default option suitable for most workloads.
- **Standard-Infrequent Access (Standard-IA):** Designed for scenarios where storage cost is significant and data is accessed less frequently (e.g., application logs or historical records).

All secondary indexes inherit the table class of the base table. DynamoDB also provides two capacity modes:

- **Provisioned Mode:** Requires capacity planning for predictable workloads.
- **On-Demand Mode:** Automatically scales capacity using a pay-per-read/write model, ideal for unpredictable workloads.

![The image illustrates two table classes for Amazon DynamoDB: "Standard Access Table Class" and "Standard Infrequent Access Table Class," each represented by icons of a database with arrows and a lightning bolt.](/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB/dynamodb-table-classes-illustration.jpg)

## Key Features and Integrations

DynamoDB supports both key-value and document data models, offering a flexible schema that easily adapts to changing application requirements without the need for pre-defining a schema before data insertion.

> [!important]
> **Serverless Benefits**
>
> One of DynamoDB's most impressive features is its serverless nature. With no servers to provision, patch, or manage, DynamoDB offers on-demand pricing with auto-scaling and maintains high availability even during unexpected traffic surges.

Another powerful feature is global tables, which enable active-active replication across multiple AWS regions. This ensures that globally distributed applications can achieve single-digit millisecond read and write performance by accessing data locally.

Additional features include:

- **Secondary Indexes:** Provide additional query flexibility beyond the primary key.
- **On-Demand Backup and Restore:** Allow full backups of your tables at any time.
- **Read/Write Capacity Modes:** Offer both provisioned and on-demand throughput configurations.
- **Integrations:** Seamlessly integrate with AWS services such as Amazon S3, AWS Glue, Amazon Kinesis Data Streams, CloudWatch, and CloudTrail to support data streaming, monitoring, logging, and long-term data archiving.

![The image lists features of DynamoDB, including key-value document data models, serverless architecture, global tables, secondary indexes, global secondary indexes, on-demand backup and restore, and read/write capacity modes.](/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB/dynamodb-features-key-value-serverless.jpg)

![The image illustrates Amazon DynamoDB integrations, highlighting key features like NoSQL workbench and encryption, and shows connections to services such as Amazon S3, AWS Glue, and Amazon Kinesis Data Streams.](/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB/dynamodb-integrations-key-features.jpg)

## Use Cases

DynamoDB is versatile and can be applied to a wide range of scenarios. It is particularly well-suited for:

- High-concurrency, internet-scale applications that handle millions of requests per second.
- Applications managing user-generated content, metadata, and caching.
- Real-time video streaming and interactive content platforms due to its low-latency and multi-region replication features.

> [!important]
> **Ideal Use Cases**
>
> DynamoDB's ability to handle unpredictable workloads and scale seamlessly makes it an excellent choice for applications with rapidly changing data access patterns and extensive read/write demands.

## Summary

DynamoDB is a fully managed NoSQL database service by AWS that delivers fast, predictable performance and seamless scalability. Its key components include:

- **Tables:** The primary data storage units.
- **Items:** Individual entries within each table.
- **Attributes:** The properties or fields of an item.
- **Primary Keys:** Unique identifiers for items, which can be either simple or composite (combining a partition key and a sort key).
- **Secondary Indexes:** Global and local indexes that extend query flexibility.
- **Table Classes:** Options include Standard and Standard-IA, allowing cost and performance optimization based on access patterns.
- **Capacity Modes:** Provisioned for predictable workloads or on-demand for unpredictable workloads.

With features such as serverless operations, on-demand scalability, global tables, and comprehensive integrations with other AWS services, DynamoDB is ideally positioned for building modern, high-performance, and highly responsive systems.

![The image is a summary of DynamoDB, highlighting its features as a fully managed NoSQL database by AWS, its components like tables, items, and attributes, and details about primary keys.](/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB/dynamodb-features-summary-aws.jpg)

This article provides an in-depth overview of DynamoDB's architecture, core components, and practical applications—guiding you on how to leverage it for building scalable and responsive systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/d96ad1a2-42fd-412a-a667-55682b781357)**
>
> Watch video content
