# Secondary AWS Services Analytics Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/Secondary-AWS-Services-Analytics-Services)

---

## Table of Contents

- Secondary AWS Services Analytics Services
  - Amazon Athena – The Query Tool Telescope
  - AWS Data Exchange – The Data Marketplace Telescope
  - Amazon EMR – Elastic MapReduce
  - AWS Glue – The Data Catalog Telescope
  - Amazon Kinesis – The Streaming Telescope
  - Amazon MSK – The Kafka Telescope
  - OpenSearch
  - Amazon QuickSight – The Visualization Telescope
  - Amazon Redshift – The Data Warehouse Telescope
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# Secondary AWS Services Analytics Services

Welcome AWS Cloud Practitioners! I'm Michael Forrester, and in this article, we explore the dynamic world of AWS Analytics Services. As AWS continues to expand its portfolio—including innovative ML and AI solutions—this guide serves as your comprehensive tour through a data observatory where each service is a unique "telescope" designed to unlock powerful insights.

![The image outlines objectives, including an overview, tasks it accomplishes, and use cases, with a blue gradient background and icons.](https://kodekloud.com/kk-media/image/upload/v1752862119/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_20.jpg)

Imagine stepping into an intergalactic observatory where every AWS Analytics service acts as a specialized telescope. For instance, Amazon Athena offers lightning-fast SQL queries on data stored in Amazon S3, while Amazon Kinesis functions as your real-time streaming telescope, capturing live data as it happens.

Consider this representation of the expansive AWS Analytics universe:

![The image features a title "The Universe of AWS Analytics Services" and an icon representing AWS Analytics Services, with a graph on a laptop screen.](https://kodekloud.com/kk-media/image/upload/v1752862120/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_30.jpg)

Each service in our discussion provides distinct capabilities. Athena accelerates data exploration with fast SQL querying, Kinesis enables real-time data streaming, and other services introduce specialized functions that optimize data ingestion, transformation, and visualization. This wide array of options empowers IT professionals—from data engineers to business analysts—to make data-driven decisions and support groundbreaking research.

Let's dive into the details of each service.

---

## Amazon Athena – The Query Tool Telescope

Amazon Athena serves as a high-powered telescope that zooms into datasets stored in Amazon S3. With S3's nearly limitless storage—where individual files can be up to five terabytes—Athena leverages an in-memory SQL engine (Presto) to rapidly execute queries. This makes it exceptionally useful for log analysis or querying a data lake comprising diverse datasets such as CloudTrail logs, security events, and business metrics.

![The image illustrates Amazon Athena as a "Query Telescope," featuring icons for Amazon S3 and SQL, highlighting data querying capabilities.](https://kodekloud.com/kk-media/image/upload/v1752862121/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_140.jpg)

> [!important]
> **Tip**
>
> Consider using Amazon Athena for quick insights into voluminous datasets stored in S3 without the overhead of setting up complex ETL processes.

---

## AWS Data Exchange – The Data Marketplace Telescope

AWS Data Exchange operates as an intergalactic marketplace for data. This service allows you to both purchase third-party datasets, such as demographic statistics, and monetize your own data. Its secure, efficient platform simplifies accessing and commercializing data, thereby expanding your analytical capabilities.

![The image illustrates AWS Data Exchange as a data marketplace, featuring icons of a store, rocket, and a head with a dollar sign.](https://kodekloud.com/kk-media/image/upload/v1752862122/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_210.jpg)

---

## Amazon EMR – Elastic MapReduce

Amazon EMR is a legacy service designed for handling big data processing at scale. Operating on a cloud-native platform, EMR allows you to orchestrate large clusters to process massive datasets. It is particularly well-suited for data transformation, large-scale analytics, and computationally intensive tasks, rather than direct machine learning workloads.

> [!important]
> **Best Practice**
>
> Optimize your cost and performance by leveraging Amazon EMR when processing extensive datasets and performing heavy computational analytics.

---

## AWS Glue – The Data Catalog Telescope

AWS Glue functions as the central star chart of your data observatory by acting as a comprehensive data catalog. This fully managed ETL service cleans, catalogs, indexes, and orchestrates data movement across different data stores. It is invaluable for preparing large and disparate datasets for seamless analytics.

![The image illustrates AWS Glue as a data catalog, featuring various colorful icons and a central AWS Glue logo.](https://kodekloud.com/kk-media/image/upload/v1752862123/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_270.jpg)

---

## Amazon Kinesis – The Streaming Telescope

Amazon Kinesis is tailored for real-time or near real-time data ingestion and processing. If your application demands dynamic collection, processing, and analysis of streaming data—be it for interactive dashboards or real-time analytics—Kinesis is the ideal solution. This service efficiently captures and processes live data streams for immediate insights.

![The image illustrates Amazon Kinesis as "The Streaming Telescope," highlighting three stages: Collecting, Processing, and Analyzing, with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752862124/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_350.jpg)

> [!important]
> **Insight**
>
> Use Amazon Kinesis to build responsive, real-time applications that require immediate data feedback for business intelligence.

---

## Amazon MSK – The Kafka Telescope

Amazon MSK is a fully managed service for Apache Kafka, engineered for high-throughput data ingestion and real-time analytics. By relieving you of the complexities involved in managing Kafka clusters, Amazon MSK enables you to focus on developing applications that leverage live data streaming. This managed service provides a reliable environment for running Kafka workloads seamlessly.

![The image illustrates Amazon MSK's features: real-time analytics, Apache Kafka, and data ingestion, with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752862125/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_400.jpg)

---

## OpenSearch

OpenSearch is a highly scalable search and analytics engine that offers versatility beyond specialized enterprise search platforms. While AWS Kendra enhances enterprise search through natural language processing, OpenSearch is a general-purpose NoSQL database optimized for search, real-time analytics, and log analysis. Its flexible design makes it suitable for a broad range of applications.

---

## Amazon QuickSight – The Visualization Telescope

Amazon QuickSight revolutionizes the way you visualize data by transforming raw inputs into interactive and actionable dashboards. As AWS’s flagship business intelligence service, QuickSight empowers organizations to craft compelling visual stories, turning complex data into accessible insights.

> [!important]
> **Quick Tip**
>
> Integrate Amazon QuickSight with existing AWS Analytics services to deliver a unified, interactive data visualization experience.

---

## Amazon Redshift – The Data Warehouse Telescope

Amazon Redshift stands as a high-performance data warehousing solution optimized for historical reporting, data aggregation, and in-depth SQL-based analysis. Originally built on PostgreSQL, Redshift integrates tightly with Amazon S3 and supports advanced analytics, including forecasting and trend analysis. It is the go-to service for structured, large-scale data analytics.

![The image features the text "Amazon Redshift – The Data Warehouse Telescope" with an icon of a database and an SQL document, indicating data warehousing and SQL usage.](https://kodekloud.com/kk-media/image/upload/v1752862126/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Analytics-Services/frame_530.jpg)

---

This concludes our guided tour of AWS Analytics Services. From Amazon Athena's rapid SQL querying capabilities to Amazon Redshift’s robust data warehousing, these services empower you to transform raw data into powerful, data-driven insights.

If you have any questions, please join our discussions on Slack or visit the KodeKloud forums.

For further reading on AWS concepts and best practices, check out these resources:

- [AWS Analytics Documentation](https://aws.amazon.com/big-data/analytics/)
- [AWS Big Data Blog](https://aws.amazon.com/blogs/big-data/)
- [Getting Started with AWS Analytics](https://aws.amazon.com/getting-started/)

Happy Analyzing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/c6bdef90-f79e-4124-b41b-f2f5014828ba)**
>
> Watch video content
