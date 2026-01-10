# Cluster Information Elasticsearch CRUD Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Mastering-Elasticsearch-Fundamentals/Cluster-Information-Elasticsearch-CRUD-Commands)

---

## Table of Contents

- Cluster Information Elasticsearch CRUD Commands
  - Retrieving Cluster Details
  - Creating and Querying an Index
  - Updating Index Settings
  - Summary
  - Watch Video
  - Practice Lab
    - Step 1: Create the "products" Index
    - Step 2: Insert a Document
    - Step 3: Verify the Document
    - Step 4: Check Index Settings and Statistics

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Mastering Elasticsearch Fundamentals

# Cluster Information Elasticsearch CRUD Commands

Welcome back! In this guide, we explore several REST API commands that allow you to fetch essential cluster information and metadata from your Elasticsearch deployment. These commands are invaluable for monitoring, debugging, and managing Elasticsearch indices, shards, disk usage, and more.

![The image is a slide with the title "Demo" on the left and "Cluster Information – Elasticsearch CRUD commands" on a blue background on the right. It includes a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752874243/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Cluster-Information-Elasticsearch-CRUD-Commands/demo-cluster-info-elasticsearch.jpg)

> [!important]
> **Overview**
>
> The following commands help you gather comprehensive insights including cluster health, detailed statistics, index settings, and more.

## Retrieving Cluster Details

Start by checking the overall health of your Elasticsearch cluster. The following GET command provides a snapshot of cluster status:

```
GET /_cluster/health
```

A typical successful response is shown in the JSON snippet below:

```
{
  "cluster_name": "elasticsearch",
  "status": "yellow",
  "timed_out": false,
  "number_of_nodes": 1,
  "number_of_data_nodes": 1,
  "active_primary_shards": 11,
  "active_shards": 11,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 3,
  "delayed_unassigned_shards": 0,
  "number_of_opening_tasks": 0,
  "number_of_in_flight_fetch": 0,
  "task_max_waiting_in_queue_millis": 0,
  "active_shards_percent_as_number": 78.57142857142857
}
```

For additional metadata about your cluster, such as statistics and configuration settings, execute the following commands in your development tool:

```
GET /_cluster/health
GET /_cluster/stats
GET /_cluster/settings
GET /_cat/indices
```

These commands return detailed information about the cluster's health, metrics, configuration settings, and a list of all indices with their current statuses. For example, while a GeoIP index might be marked as green (healthy), another index like a school index could be yellow.

## Creating and Querying an Index

In this section, you'll learn how to create an index and add a document to inspect index-specific configurations and statistics.

### Step 1: Create the "products" Index

Create an index named "products" by running:

```
PUT /products
```

### Step 2: Insert a Document

Add a sample document to the "products" index with the following POST request:

```
POST /products/_doc/1
{
  "product_id": 67890,
  "name": "Cozy Winter Sweater",
  "description": "Soft and stylish sweater for cold days.",
  "price": 59.99,
  "category": "Apparel",
  "brand": "Trendly Threads"
}
```

### Step 3: Verify the Document

To ensure the document has been stored correctly, retrieve it using:

```
GET /products/_doc/1
```

### Step 4: Check Index Settings and Statistics

Inspect the index’s settings (like the number of shards and replicas) and detailed statistics by executing:

```
GET /products/_settings
GET /products/_stats
```

## Updating Index Settings

If you need to adjust dynamic settings for an index (for example, increasing the number of replicas), use a PUT request. The following command updates the dynamic setting for the "products" index:

```
PUT /products/_settings
{
  "index.number_of_replicas": 2
}
```

A successful update will return an acknowledgment. Keep in mind that:

> [!important]
> **Important**
>
> Not all settings are dynamic. Many cluster-wide settings are persistent and must be modified in configuration files rather than through the REST API. Also, certain cluster-wide settings cannot be deleted directly using REST API calls.

## Summary

In this guide, you learned how to:

- Retrieve cluster health, comprehensive statistics, and configuration settings.
- List all indices and review their health statuses.
- Create a new index ("products") and insert a document.
- Fetch specific index settings and detailed statistics.
- Update dynamic index settings, such as the number of replicas.

These Elasticsearch CRUD commands and REST API endpoints are essential tools for administering and troubleshooting your Elasticsearch cluster in both testing and production environments.

For more information on Elasticsearch management and best practices, check out the [Elasticsearch Documentation](https://www.elastic.co/guide/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/a70164d0-faba-407d-a6e8-4e227044c3aa/lesson/96493e3b-adb8-4450-bd90-e5251338a2e2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/a70164d0-faba-407d-a6e8-4e227044c3aa/lesson/d22095d8-791c-4a3e-ab17-e53fdbaf99d1)**
>
> Practice lab
