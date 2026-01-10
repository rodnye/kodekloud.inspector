# Dynamic and Explicit Mapping in Elasticsearch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Mastering-Elasticsearch-Fundamentals/Dynamic-and-Explicit-Mapping-in-Elasticsearch)

---

## Table of Contents

- Dynamic and Explicit Mapping in Elasticsearch
  - Dynamic Mapping
  - Explicit Mapping
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Mastering Elasticsearch Fundamentals

# Dynamic and Explicit Mapping in Elasticsearch

Hello and welcome back to our Elasticsearch tutorial. In this lesson, we'll dive into the two primary mapping strategies in Elasticsearch: dynamic mapping and explicit mapping.

## Dynamic Mapping

Dynamic mapping allows Elasticsearch to automatically detect and assign data types as new documents are ingested. This feature enables you to deploy data without predefined schemas, as Elasticsearch intelligently infers the data types for each field.

Consider the following JSON document:

```
{
  "product_id": "12345",
  "name": "Awesome Sneakers",
  "description": "The most comfortable shoes ever!",
  "price": 99.99,
  "in_stock": true,
  "release_date": "2023-12-15"
}
```

When this document is indexed with dynamic mapping enabled, Elasticsearch may generate a mapping similar to this:

```
{
  "mappings": {
    "_doc": {
      "properties": {
        "product_id": { "type": "long" },
        "name": { "type": "text" },
        "description": { "type": "text" },
        "price": { "type": "float" },
        "in_stock": { "type": "boolean" },
        "release_date": { "type": "date" }
      }
    }
  }
}
```

In this process, Elasticsearch infers that the product ID is best stored as a long, the price as a float, among other data types. This schema-less approach offers rapid development by removing the need for explicit schema definitions.

> [!important]
> **Note**
>
> Dynamic mapping is ideal for rapid prototyping and agile development since it seamlessly handles changes and automatically adjusts to new data structures.

The benefits of dynamic mapping include:

- **Automatic Detection:** New fields are automatically recognized and assigned appropriate data types (e.g., string, number, date, boolean).
- **Real-Time Updates:** The index mapping is updated on the fly, enabling immediate queries on newly added fields.
- **Data Type Inference:** Elasticsearch employs intelligent algorithms to determine the correct data type, ensuring optimal indexing and query speed.
- **Evolving Schemas:** As your data evolves, Elasticsearch adapts without requiring manual intervention.

![The image is an infographic about "Dynamic Mapping in Elasticsearch," highlighting features like evolving schemas, schema-less flexibility, automatic detection, rapid prototyping, on-the-fly mapping updates, and data type inference.](https://kodekloud.com/kk-media/image/upload/v1752874247/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Dynamic-and-Explicit-Mapping-in-Elasticsearch/dynamic-mapping-elasticsearch-infographic.jpg)

## Explicit Mapping

While dynamic mapping offers excellent flexibility, there are scenarios where precise control over data indexing is necessary. Explicit mapping provides this control by allowing you to define the schema before inserting any data, ensuring that each field is mapped exactly as intended.

For instance, if you want to create a customized schema for a product index, you can define your mapping as follows:

```
PUT /product_index
{
  "mappings": {
    "_doc": {
      "properties": {
        "product_id": { "type": "keyword" },
        "name": {
          "type": "text",
          "analyzer": "english"
        },
        "description": { "type": "text" },
        "price": { "type": "float" },
        "in_stock": { "type": "boolean" },
        "release_date": {
          "type": "date",
          "format": "yyyy-MM-dd"
        }
      }
    }
  }
}
```

Key aspects of this explicit mapping:

- The `product_id` field is set as a keyword to ensure exact matching.
- The `name` field utilizes the English analyzer to enhance search relevancy.
- The `release_date` field is precisely defined as a date following the `yyyy-MM-dd` format.

Once the mapping is created, you can index documents that match this schema:

```
{
  "product_id": "12345",
  "name": "Awesome Sneakers",
  "description": "The most comfortable shoes ever!",
  "price": 99.99,
  "in_stock": true,
  "release_date": "2023-12-15"
}
```

Explicit mapping, although requiring more initial configuration, offers several advantages:

- **Control and Precision:** You have complete control over field storage and indexing, which can enhance search performance.
- **Accurate Data Types:** Manually defining data types reduces the risk of type inference errors.
- **Customized Analyzers:** Tailor text analyzers to meet your specific search and relevancy requirements.
- **Schema Evolution Management:** While updates must be made manually, this approach ensures consistency and accuracy as your data evolves.

> [!important]
> **Note**
>
> Dynamic mapping is typically the default approach, particularly when setting up a new Elasticsearch cluster. As your application scales and demands more refined search capabilities, transitioning to explicit mapping can significantly improve search accuracy and performance.

That concludes our discussion on dynamic and explicit mapping in Elasticsearch. Thank you for reading, and we look forward to exploring more advanced Elasticsearch features in our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/a70164d0-faba-407d-a6e8-4e227044c3aa/lesson/c9570c83-2c1f-498b-8097-631182b58311)**
>
> Watch video content
