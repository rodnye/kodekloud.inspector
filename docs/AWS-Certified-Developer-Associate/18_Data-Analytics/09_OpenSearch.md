# OpenSearch - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Data-Analytics/OpenSearch)

---

## Table of Contents

- OpenSearch
  - What is OpenSearch?
  - Managed Service and Query Capabilities
  - Integrating OpenSearch into Your Application
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Data Analytics

# OpenSearch

In this article, we explore OpenSearch—a robust tool forked from Elasticsearch and managed by AWS. If you’re familiar with Elasticsearch, you'll appreciate how OpenSearch offers similar capabilities while addressing modern search and analytics challenges.

## What is OpenSearch?

OpenSearch empowers you to ingest, secure, search, aggregate, view, and analyze your data efficiently. Its robust features are particularly useful for log analytics and enhancing search functionality in modern applications—especially when traditional relational databases fall short.

![The image is a diagram illustrating the features of OpenSearch, including ingesting, securing, searching, aggregating, viewing, and analyzing data, with applications in log analytics, application search, and enterprise search.](https://kodekloud.com/kk-media/image/upload/v1752858639/notes-assets/images/AWS-Certified-Developer-Associate-OpenSearch/opensearch-features-diagram.jpg)

> [!important]
> **Key Advantage**
>
> OpenSearch allows efficient queries on any field, making it ideal for versatile search functionalities.

## Managed Service and Query Capabilities

OpenSearch is provided as a fully managed service, simplifying the tasks of deploying, operating, and scaling clusters. It supports two distinct modes:

- **Managed Cluster Mode**
- **Serverless Cluster Mode**

This flexibility, combined with its ability to query on any field, makes OpenSearch a preferred solution for applications that require dynamic search and log analytics capabilities.

![The image describes OpenSearch as a fully managed service supporting two modes: Managed Cluster and Serverless Cluster.](https://kodekloud.com/kk-media/image/upload/v1752858641/notes-assets/images/AWS-Certified-Developer-Associate-OpenSearch/opensearch-managed-serverless-cluster.jpg)

When compared to services like DynamoDB—which restrict queries to primary keys or predefined indexes—and relational databases that rely on specific column indexes, OpenSearch stands out. It enables comprehensive queries across all attributes without the need for extra configuration.

![The image is a comparison of query capabilities between DynamoDB, relational databases, and OpenSearch, highlighting OpenSearch's ability to efficiently query data on any field or attribute.](https://kodekloud.com/kk-media/image/upload/v1752858643/notes-assets/images/AWS-Certified-Developer-Associate-OpenSearch/query-capabilities-dynamodb-relational-opensearch.jpg)

## Integrating OpenSearch into Your Application

Integrating OpenSearch into your application architecture is straightforward. Imagine a setup where your primary data is stored in databases such as Amazon RDS or DynamoDB. For every database update—whether it’s creating, updating, or deleting records—the corresponding data is simultaneously synchronized to OpenSearch. This dual-database strategy ensures that while CRUD operations are managed efficiently through your primary database, powerful search queries run on the OpenSearch index.

When you insert, update, or delete an entry in your primary database, OpenSearch receives a corresponding update. Therefore, when you perform searches, your application leverages the indexed copy in OpenSearch to deliver fast and comprehensive results.

![The image is a diagram showing a data flow from Amazon DynamoDB and RDS as primary databases to OpenSearch, with user interactions for creating, updating, deleting, and getting data.](https://kodekloud.com/kk-media/image/upload/v1752858644/notes-assets/images/AWS-Certified-Developer-Associate-OpenSearch/dynamodb-rds-opensearch-data-flow-diagram.jpg)

> [!important]
> **Integration Tip**
>
> Ensure continuous synchronization between your primary database and OpenSearch to maintain data consistency across your applications.

## Summary

OpenSearch, a fork of Elasticsearch managed by AWS, offers a fully managed service that streamlines the deployment, operation, and scaling of search clusters. Its unique ability to conduct efficient queries on any field makes it an excellent choice for log analytics and dynamic search functionalities.

![The image is a summary slide highlighting two points: OpenSearch is a fork of Elasticsearch, and it is a fully managed service for deploying, operating, and scaling OpenSearch clusters.](https://kodekloud.com/kk-media/image/upload/v1752858645/notes-assets/images/AWS-Certified-Developer-Associate-OpenSearch/opensearch-elasticsearch-summary-slide.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/ac3fe785-4e7a-4f57-ae16-99fcd3cfde7e/lesson/7751f975-b0eb-4451-9b8a-afeb8dda15d5)**
>
> Watch video content
