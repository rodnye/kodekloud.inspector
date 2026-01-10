# Azure Cosmos DB Resource Hierarchy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-Cosmos-DB/Azure-Cosmos-DB-Resource-Hierarchy)

---

## Table of Contents

- Azure Cosmos DB Resource Hierarchy
  - Overview of the Resource Model
  - Resource Hierarchy Diagram
  - JSON Document Handling in Azure Cosmos DB
  - Conclusion
  - Watch Video
    - Additional Functionalities

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure Cosmos DB

# Azure Cosmos DB Resource Hierarchy

This article provides a detailed examination of the Azure Cosmos DB resource model, illustrating its hierarchical structure to help you manage resources efficiently. By understanding how the components relate to one another, you can better leverage Cosmos DB’s powerful capabilities.

## Overview of the Resource Model

At the top of the hierarchy is the **account**. This global entry point is tied to a specific subscription and can span multiple regions to ensure high availability and low latency. When you create an account through the Azure Portal, you're provided with a resource URI (commonly referred to as an endpoint) along with keys—both read-write and read-only—similar to what you see with an Azure Storage account.

Within an account, you create **databases**. In Azure Cosmos DB, a database acts much like a traditional relational database but is inherently distributed. It serves as a logical container for various collections or tables, depending on the API you choose.

Inside each database, you further organize your resources into **containers**. Containers are fundamental to Cosmos DB; they store multiple items and are partitioned to facilitate horizontal scaling. The throughput provisioned automatically manages the scalability and performance of each container. Depending on the Cosmos DB API, these containers may be realized as collections, tables, graphs, or alternative data structures.

Within a container, the primary data elements are **items**, which are analogous to rows in a relational database. Each item is stored as a JSON document, making it well-suited for unstructured or semi-structured data.

> [!important]
> **Cosmos DB Server-Side Programming**
>
> Azure Cosmos DB supports powerful server-side functionalities including stored procedures, triggers, user-defined functions (UDFs), and conflict resolution policies.

### Additional Functionalities

- **Stored Procedures:** Written in JavaScript, these allow complex operations to execute directly within the database.
- **Triggers:** Automatically executed upon data changes, ensuring business rules are enforced and data integrity is maintained.
- **User-Defined Functions (UDFs):** Custom functions that can be embedded within SQL queries to apply advanced business logic.

In multi-region deployments, conflicts may occur due to concurrent data modifications. Azure Cosmos DB offers built-in conflict resolution policies and the option to define custom logic, ensuring data consistency according to your application requirements.

## Resource Hierarchy Diagram

The diagram below provides a visual representation of the Cosmos DB resource hierarchy, beginning at the account level and progressing through databases, containers, items, and server-side functionalities such as stored procedures, triggers, and UDFs.

![The image depicts a resource hierarchy diagram for a cloud service, showing the structure from an account to database, container, and various elements like item, sproc, trigger, UDF, and conflict. It includes references to Azure and a key icon, suggesting a focus on cloud resource management.](https://kodekloud.com/kk-media/image/upload/v1752866432/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Cosmos-DB-Resource-Hierarchy/cloud-resource-hierarchy-diagram.jpg)

## JSON Document Handling in Azure Cosmos DB

Depending on the Cosmos DB API, an item can be represented as a document, row, node, or edge. Azure Cosmos DB stores items as JSON documents—ideal for supporting flexible schemas, attribute-value pairs, recursive embedding, and embedded arrays. For example, the NoSQL API supports JSON documents up to 2 megabytes, while the MongoDB API supports documents up to 16 megabytes.

The diagram below highlights the key features of JSON documents utilized by Cosmos DB:

![The image is a diagram explaining JSON documents, highlighting features such as being an open standard document format, language-dependent, made of attribute-value pairs, supporting recursive embedding, embedded arrays, and having a flexible schema.](https://kodekloud.com/kk-media/image/upload/v1752866433/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Azure-Cosmos-DB-Resource-Hierarchy/json-document-features-diagram.jpg)

Below is a sample JSON document demonstrating the flexible schema capabilities of Azure Cosmos DB:

```
{
    "InvoiceID": "IN12341287",
    "TotalItems": 9,
    "TotalValue": 52.15,
    "Customer": {
        "CSID": 112423532,
        "FullName": "Fred Flaire"
    },
    "Lines": [
        {
            "ProductCode": 63137,
            "Description": "Formal Work Pants (M)",
            "Quantity": 1,
            "Size": 32,
            "Color": "Black"
        },
        {
            "ProductCode": 63137,
            "Description": "Kitkat Jumbo",
            "Quantity": 8,
            "Size": 2.34,
            "Pack": 6,
            "Color": "Bars"
        }
    ]
}
```

## Conclusion

With this comprehensive overview of the Azure Cosmos DB resource hierarchy—including accounts, databases, containers, and items—you are now equipped to provision Azure Cosmos DB via the Azure Portal. The next lesson will guide you through the step-by-step process of setting up your Cosmos DB environment.

For further information and detailed instructions, visit the [Azure Cosmos DB Documentation](https://docs.microsoft.com/azure/cosmos-db/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/4324d56c-2a24-4e04-8462-56f31e16be95/lesson/27c471df-3430-440c-b4c2-a9ab8733d76b)**
>
> Watch video content
