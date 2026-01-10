# Documents in Elasticsearch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Mastering-Elasticsearch-Fundamentals/Documents-in-Elasticsearch)

---

## Table of Contents

- Documents in Elasticsearch
  - Key Features of Elasticsearch Documents
  - How a Log File is Stored as a Document
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Mastering Elasticsearch Fundamentals

# Documents in Elasticsearch

Welcome to this comprehensive lesson on how logs are stored in Elasticsearch. In this guide, we will explain how a log file is transformed into a document within Elasticsearch and highlight the essential features that make Elasticsearch a powerful tool for real-time data search and analysis.

Elasticsearch stores all information in the form of documents. These documents are the fundamental data unit, structured in JSON format and optimized for rapid, full-text search.

![The image explains what gets stored in Elasticsearch, highlighting that documents are the fundamental unit of data, stored in structured JSON, and optimized for real-time search.](https://kodekloud.com/kk-media/image/upload/v1752874244/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Documents-in-Elasticsearch/elasticsearch-documents-json-storage.jpg)

## Key Features of Elasticsearch Documents

Documents in Elasticsearch are characterized by several key features:

1.  **JSON Format**  
    Documents are stored in a lightweight JSON format that is both human-readable and easy for machines to parse and generate. With support for complex nested structures, JSON is ideal for representing rich data objects and diverse data types such as numbers, strings, dates, arrays, and embedded objects.
2.  **Indexing**  
    Indexing is the process of storing documents in a manner that facilitates quick search operations. When a document is indexed, Elasticsearch converts the JSON data into an inverted index—a data structure that is optimized for fast full-text searches. In upcoming lessons, we will delve deeper into how indexing works and its role in improving search performance.
3.  **Nodes and Clusters**  
    A single instance of Elasticsearch is called a node, which stores data and participates in indexing and search operations. Multiple nodes work together to form a cluster that distributes data and search operations efficiently. Each node may serve various roles, such as master or client, contributing to the overall health and performance of the cluster.
4.  **Sharding and Replicas**  
    To manage large volumes of data, Elasticsearch splits an index into smaller, manageable pieces known as shards. Each shard is a self-contained index that can be distributed across nodes, enabling parallel processing of queries and enhancing overall performance. Additionally, replicas of shards offer redundancy to ensure data availability and faster search response times.
5.  **Schema-Less Flexibility**  
    Although Elasticsearch can use a predefined schema to control data structure, it is highly dynamic. You can start indexing documents without a defined schema, as Elasticsearch automatically detects and adds new fields as they appear. This schema-less approach is particularly useful in agile development environments where data structures quickly evolve.

![The image lists features of a document in Elasticsearch, including JSON Format, Indexing, Node, Sharding and Replicas, and Schema-Less.](https://kodekloud.com/kk-media/image/upload/v1752874246/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Documents-in-Elasticsearch/elasticsearch-document-features-json-indexing.jpg)

> [!important]
> **Key Takeaway**
>
> Together, these features—JSON formatting, advanced indexing, robust clusters, efficient sharding with replicas, and flexible schema management—form the backbone of Elasticsearch's ability to perform large-scale, complex data analysis in real time.

## How a Log File is Stored as a Document

When a log file is ingested, Elasticsearch transforms it into a document enriched with additional metadata, ensuring efficient search and retrieval. This metadata usually includes:

- A designated index name that groups related logs.
- A type identifier (commonly `_doc`).
- A unique document ID.
- A score representing the relevance of the document in search queries.
- The actual log data within the `_source` field.

Consider the following example of a transformed log file:

```
{
  "_index": "webserver_logs",
  "_type": "_doc",
  "_id": "DD46948BFqy1faFsINf8",
  "_score": 0.2876821,
  "_source": {
    "timestamp": "2024-02-28T10:35:12+0000",
    "ip": "192.168.1.100",
    "method": "GET",
    "url": "/images/logo.png",
    "status": 200,
    "bytes": 2326,
    "referer": "https://www.example.com/",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
  }
}
```

In this example:

- The "\_index" field groups related log entries.
- The "\_type" (typically `_doc`) identifies the document type.
- The "\_id" ensures each document is uniquely identifiable.
- The "\_score" plays a role during search queries to indicate document relevance.
- The "\_source" field contains the actual log data.

This structure is fundamental for harnessing Elasticsearch's powerful real-time search capabilities.

> [!important]
> **Next Steps**
>
> In our next lesson, we will explore how these documents are indexed and the mechanics behind the fast searching capabilities of Elasticsearch. Stay tuned for more in-depth insights!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/a70164d0-faba-407d-a6e8-4e227044c3aa/lesson/8fd047fc-c16a-4420-af28-fc5e22a55768)**
>
> Watch video content
