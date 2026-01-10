# Kinesis Data analytics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Data-Analytics/Kinesis-Data-analytics)

---

## Table of Contents

- Kinesis Data analytics
  - Key Use Cases
  - Architecture Overview
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Data Analytics

# Kinesis Data analytics

In this lesson, we explore Amazon Kinesis Data Analytics—an intuitive service that empowers you to process and analyze streaming data in real time using SQL. By repurposing traditional SQL queries for live data, this service provides immediate insights and improved decision-making capabilities.

## Key Use Cases

Amazon Kinesis Data Analytics is ideal for a variety of real-time data scenarios, such as:

- Enabling time series analysis to uncover trends.
- Feeding real-time dashboards with aggregated, actionable data.
- Creating and monitoring live metrics for timely insights.

> [!important]
> **Note**
>
> This service utilizes SQL for data processing, making it accessible for teams already familiar with SQL query techniques.

## Architecture Overview

The architecture of Amazon Kinesis Data Analytics is straightforward and efficient, consisting of the following components:

1.  Data ingestion from sources, which are limited to either Kinesis Data Streams or Kinesis Data Firehose.
2.  Real-time processing of incoming streaming data using SQL.
3.  Publishing the query results to sinks, which are similarly limited to Kinesis Data Streams or Kinesis Data Firehose.

This design allows you to seamlessly process continuous streams of data, ensuring your analytics remain current and actionable.

> [!important]
> **Warning**
>
> Ensure that your data sources and sinks are correctly configured—only Kinesis Data Streams and Kinesis Data Firehose are supported. Incorrect configuration may lead to processing interruptions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/ac3fe785-4e7a-4f57-ae16-99fcd3cfde7e/lesson/6423a19c-f761-40fb-8fc9-7d3a8e9994ad)**
>
> Watch video content
