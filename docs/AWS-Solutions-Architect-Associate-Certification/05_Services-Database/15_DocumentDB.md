# DocumentDB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/DocumentDB)

---

## Table of Contents

- DocumentDB
  - Overview
  - DocumentDB Architecture
  - Global Clusters
  - Key Benefits and Features
  - Use Cases
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# DocumentDB

In this lesson, we explore AWS DocumentDB—a fully managed, MongoDB-compatible database service that simplifies the deployment and management of scalable NoSQL databases in the cloud.

## Overview

MongoDB is renowned for its flexibility and scalability as a NoSQL database. However, scaling MongoDB—like any database—can present operational challenges that require considerable expertise. AWS DocumentDB eliminates these obstacles by providing a managed service that mimics the functionality of MongoDB without the burden of manual scaling and infrastructure management. With AWS handling the complexities behind the scenes, you can focus on building and optimizing your application.

## DocumentDB Architecture

Amazon DocumentDB architecture consists of a cluster that is made up of two main components:

1.  **Cluster Volume**  
    The cluster volume is a unified storage unit that manages the data for all instances in the cluster. It employs cloud-native storage to replicate your data six different ways across three Availability Zones, ensuring high durability and availability. With support for up to 128 terabytes of data, the cluster volume is engineered to handle immense workloads with reliability.
2.  **Instances**  
    Instances provide the computational resources necessary for database operations, reading from and writing to the cluster volume. A cluster can include between zero and 16 instances, grouped into two roles:
    - **Primary Instance:**  
      This instance handles both read and write operations and is solely responsible for data modifications. Every cluster has exactly one primary instance.
    - **Replica Instances:**  
      Replica instances are designated for read-only operations. With up to 15 replicas, you can distribute read workloads effectively, freeing up the primary instance for write operations.

![The image illustrates the architecture of DocumentDB, showing a setup with a primary database and multiple replica instances connected to compute and storage layers.](https://kodekloud.com/kk-media/image/upload/v1752865127/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DocumentDB/documentdb-architecture-replica-instances.jpg)

> [!important]
> **Note**
>
> Cluster instances can be provisioned in different instance classes and scaled up or down as needed, allowing you to adjust compute capacity independently from storage.

## Global Clusters

To support critical global workloads, DocumentDB offers global clusters. This feature allows for automatic data replication across multiple AWS regions with sub-second latency. Typically, you can maintain a primary cluster in one region and secondary clusters in up to five different AWS regions. These secondary clusters are independently scalable, ensuring optimal cost and performance based on regional demand.

Fast, storage-based physical replication from the primary to secondary clusters ensures that compute resources remain dedicated to handling application requests rather than replication tasks.

![The image illustrates a DocumentDB Global Cluster with a map showing primary and secondary regions, highlighting features like disaster recovery, low latency global reads, scalable secondary clusters, and high-speed replication.](https://kodekloud.com/kk-media/image/upload/v1752865129/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DocumentDB/documentdb-global-cluster-map.jpg)

## Key Benefits and Features

AWS DocumentDB is designed to deliver a robust, scalable, and highly available data storage solution with these standout features:

- **MongoDB Compatibility:**  
  Continue leveraging your existing MongoDB tools and libraries with minimal to no changes required.
- **High Availability and Durability:**  
  Data is automatically replicated across three Availability Zones, which minimizes the risk of data loss and ensures continuous availability. Automatic storage repair techniques detect and resolve failures using redundant data copies.
- **Efficient Crash Recovery:**  
  By managing the page cache separately from the database process, DocumentDB ensures rapid recovery. The asynchronous, parallel crash recovery process quickly re-warms the buffer pool to the most current state.
- **Write Durability:**  
  Client acknowledgments are only issued after writes have been durably recorded on a majority of nodes.
- **Read Scaling with Replicas:**  
  Dedicated read-only replicas efficiently handle query loads, allowing you to adjust the number of replicas based on your application's read capacity needs.

![The image lists features of DocumentDB, including MongoDB compatibility, storage auto-repair, cache warming, crash recovery, and write durability, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865130/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DocumentDB/documentdb-features-icons-list.jpg)

To optimize client-side read scaling, DocumentDB supports various read preference options:

- **Primary:**  
  Routes reads exclusively to the primary instance. If the primary instance is unavailable, the read operation will fail.

  ```
  db.example.find().readPref('primary')
  ```

- **Primary Preferred:**  
  By default, reads are directed to the primary instance; if it becomes unavailable, a replica is used.

  ```
  db.example.find().readPref('primaryPreferred')
  ```

- **Secondary:**  
  Directs all read operations to replica instances. If no replicas are available, the read operation fails.

  ```
  db.example.find().readPref('secondary')
  ```

- **Secondary Preferred:**  
  Prefers replica instances for read operations but falls back to the primary instance if necessary.

  ```
  db.example.find().readPref('secondaryPreferred')
  ```

- **Nearest:**  
  Allocates read queries to the instance with the lowest network latency, whether it is a primary or replica.

  ```
  db.example.find().readPref('nearest')
  ```

## Use Cases

AWS DocumentDB is well-suited for applications that demand high scalability and low-latency global reads. Typical use cases include:

- Content management systems
- User profile management, including preferences and requests
- Applications designed to handle millions of user requests per second

## Summary

AWS DocumentDB is a managed document database service that brings the power of MongoDB to the cloud with enhanced scalability and simplified operations. Its advanced architecture—with six-way data replication across three Availability Zones and support for global clusters—ensures high availability and durability. Additionally, flexible read preferences and independent scaling of secondary clusters provide optimized performance tailored to your needs.

![The image is a summary of Amazon DocumentDB, highlighting its MongoDB compatibility and storage replication features. It explains that DocumentDB is a managed database service that supports MongoDB workloads and ensures high availability through data replication across multiple zones.](https://kodekloud.com/kk-media/image/upload/v1752865131/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DocumentDB/amazon-documentdb-mongodb-summary.jpg)

Global clusters deliver low-latency reads on a global scale, while flexible read preferences enable you to direct traffic between primary and replica instances to best meet your application's requirements.

![The image is a summary of DocumentDB features, highlighting global clusters for low-latency global reads and flexible read preferences for optimizing read latency, throughput, or consistency.](https://kodekloud.com/kk-media/image/upload/v1752865133/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DocumentDB/documentdb-features-global-clusters.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/311007d5-2110-4b01-aa6b-e5b0007af08e)**
>
> Watch video content
