# Mapping in Elasticsearch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Mastering-Elasticsearch-Fundamentals/Mapping-in-Elasticsearch)

---

## Table of Contents

- Mapping in Elasticsearch
  - What Is Mapping in Elasticsearch?
  - Visualizing Elasticsearch Mapping
  - Summary
  - Watch Video
    - 1. Dynamic Mapping
    - 2. Explicit Mapping

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Mastering Elasticsearch Fundamentals

# Mapping in Elasticsearch

Welcome back! In this article, we dive into the concept of mapping in Elasticsearch. Imagine a library divided into sections such as history, fiction, geography, and technology. Each section holds many books, and when you create an index—for example, for the history section—you decide which parts of the books (like title, author, and publication date) are most important. Choosing the appropriate data types for these fields (for instance, strings for titles and authors, and dates for publication dates) is the essence of mapping in Elasticsearch.

## What Is Mapping in Elasticsearch?

Mapping in Elasticsearch is the process of defining how documents and their individual fields are stored and indexed. This configuration is critical because it directly influences how data is searched, analyzed, and retrieved within your Elasticsearch cluster.

There are two primary approaches to mapping:

### 1\. Dynamic Mapping

Dynamic mapping allows Elasticsearch to automatically detect new fields within a document and add them to the index mappings. This flexibility is particularly useful when dealing with unstructured data or evolving schemas, as it simplifies the process of indexing new or unexpected data without manual intervention.

> [!important]
> **Note**
>
> Dynamic mapping is a great starting point when you are unsure of the schema. However, always consider reviewing the automatically generated mappings for optimal performance.

### 2\. Explicit Mapping

Explicit mapping gives you complete control over how each field in your document is indexed and stored. Although this approach requires more upfront work, it enhances search performance and precision by allowing tailored configurations that match your application's specific requirements.

Below is a table that outlines the key differences between dynamic and explicit mapping:

| Mapping Type     | Description                                                              | Use Case                                                              |
| ---------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Dynamic Mapping  | Automatically detects and indexes new fields dynamically                 | Ideal for unstructured data or evolving schemas                       |
| Explicit Mapping | Requires manual definition of each field's data type and indexing method | Best for applications with strict search and performance requirements |

## Visualizing Elasticsearch Mapping

The image below illustrates how document fields are defined in Elasticsearch, highlighting the differences between dynamic and explicit mapping:

![The image explains mapping in Elasticsearch, describing it as the process of defining how a document and its fields are stored and indexed, with options for dynamic and explicit mapping.](https://kodekloud.com/kk-media/image/upload/v1752874253/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Mapping-in-Elasticsearch/elasticsearch-mapping-document-fields.jpg)

## Summary

In summary, dynamic mapping offers the flexibility to adapt as new fields emerge, while explicit mapping provides the control and precision needed for specialized applications. Understanding these two approaches will empower you to choose the best mapping strategy for your Elasticsearch deployment.

Next, we will examine dynamic mapping in more detail.

Thank you for reading, and we look forward to continuing this lesson in our next installment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/a70164d0-faba-407d-a6e8-4e227044c3aa/lesson/638abcc1-b087-482d-a5a5-253f83c541a7)**
>
> Watch video content
