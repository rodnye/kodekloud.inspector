# Database Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Programming/Database-Question-1)

---

## Table of Contents

- Database Question 1
  - Understanding NoSQL
  - Visual Comparison: NoSQL vs. SQL
  - Interview Insights: Explaining NoSQL
  - AWS and NoSQL: DynamoDB
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Programming

# Database Question 1

A development team has decided to use a NoSQL database. But what exactly is a NoSQL database, and does AWS offer a service that can serve as one? In this lesson, we explore the concept of NoSQL databases, outline their differences compared to SQL databases, and introduce AWS DynamoDB as a key example in the NoSQL landscape.

## Understanding NoSQL

Both SQL and NoSQL databases are built to store information, yet they differ significantly in how they manage data structure:

- In **SQL databases**, you must define a strict table schema—such as columns for ID, name, or age—before inserting any data. Any deviation from this structure (for example, attempting to add a "city" or "country" column) typically triggers an error.
- In **NoSQL databases**, on the other hand, there is no mandatory schema. This schema-less design allows you to store data with varying structures. For instance, one JSON or YAML record may contain the fields "name," "age," and "gender," while another might also include "city" or "country." The only requirement is that each record includes a unique identifier (UID).

> [!important]
> **Note**
>
> NoSQL databases are particularly valuable when dealing with applications in which data formats can evolve over time or include unpredictable fields.

SQL databases are ideal when you require stringent data integrity and consistency, such as in banking systems, where every record must adhere to a predetermined structure.

## Visual Comparison: NoSQL vs. SQL

The diagram below presents a clear comparison between NoSQL and SQL database approaches, emphasizing how each manages data structure and use cases:

![The image is a handwritten comparison between NoSQL and SQL databases, highlighting differences in data structure and use cases, with examples of JSON format and a table.](https://kodekloud.com/kk-media/image/upload/v1752873396/notes-assets/images/DevOps-Interview-Preparation-Course-Database-Question-1/nosql-vs-sql-databases-comparison.jpg)

In NoSQL databases, the absence of a predefined structure means that any change in incoming data is seamlessly supported. In contrast, SQL databases enforce strict adherence to an existing table structure and reject any data that does not conform.

## Interview Insights: Explaining NoSQL

When responding to an interview question about NoSQL, consider the following points:

- Emphasize that NoSQL databases do not require a predefined schema.
- Highlight that they can store diverse data formats without modifications to an underlying structure.
- Explain that, unlike SQL databases with fixed schemas, NoSQL systems offer the flexibility necessary to accommodate dynamic and evolving data needs.

## AWS and NoSQL: DynamoDB

When discussing AWS services, it's important to mention [DynamoDB](https://aws.amazon.com/dynamodb/). AWS DynamoDB is a serverless NoSQL database that scales automatically to handle high-traffic and variable workloads. This service allows you to store and retrieve data without the overhead of managing database servers, making it ideal for modern, flexible applications.

> [!important]
> **Additional Information**
>
> AWS DynamoDB is a great choice when you require a scalable and managed NoSQL solution. It supports high performance and low-latency responses in diverse application scenarios.

This explanation provides a comprehensive overview of NoSQL versus SQL databases and clarifies how AWS DynamoDB fits into the broader NoSQL ecosystem. Whether you are preparing for an interview or evaluating database options for your project, understanding these differences is key to making the right choice.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/5e7996c8-ac3e-49b6-bfce-717b5a2ff2d3/lesson/b0387639-a048-431d-adb3-2cb56eb14480)**
>
> Watch video content
