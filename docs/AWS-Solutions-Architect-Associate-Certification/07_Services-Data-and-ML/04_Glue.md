# Glue - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Glue)

---

## Table of Contents

- Glue
  - Key Components of AWS Glue
  - How AWS Glue Works
  - Built-in Transformation Libraries and Glue Studio
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Glue

Welcome back, Solutions Architects! In this presentation by Michael Forrester, we explore AWS Glue—a powerful service designed to simplify data ingestion, extraction, transformation, and loading (ETL). Although Glue is part of AWS’s machine learning suite, its primary purpose is to seamlessly move and transform data from various source systems into target repositories like data catalogs or Amazon S3.

## Key Components of AWS Glue

AWS Glue is built around three main components that work together to streamline your data workflows:

1.  **Crawler**  
    The crawler automatically connects to data sources (such as S3 buckets or RDBMS systems) to scan for data. It then populates the Glue Data Catalog with table definitions and associated metadata. This centralized catalog maintains both raw data references and the critical structural metadata required for ETL operations.
2.  **ETL Jobs with Apache Spark and PySpark**  
    AWS Glue supports ETL jobs that can be authored manually in Spark or PySpark, or you can use prebuilt scripts provided by Amazon. These jobs extract data from cataloged sources, apply transformations—including renaming fields, filtering records, joining datasets, or aggregating information—and load the transformed data into target destinations like S3, Redshift, Athena, or QuickSight.
3.  **Visual Interface with Glue Studio**  
    Glue Studio provides a user-friendly Integrated Development Environment (IDE) for creating, testing, and monitoring Apache Spark jobs visually, eliminating the need for managing local environments or physical infrastructure.

## How AWS Glue Works

The diagram below illustrates a typical data processing workflow using AWS Glue. It shows the flow from a data source through extraction, transformation, and loading stages into a data target, with the Data Catalog maintaining vital metadata:

![The image is a diagram illustrating a data processing workflow using Glue, showing the flow from a data source to a data target through extraction, transformation, and loading, with a data catalog involved.](https://kodekloud.com/kk-media/image/upload/v1752865063/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue/data-processing-workflow-glue-diagram.jpg)

In practice, you start by defining a data source for the crawler, which then automatically discovers the schema and structure of your data. If the inferred schema doesn’t perfectly align with your expectations, you can easily adjust the configuration. Once the data is cataloged, you can trigger an ETL job by scheduling it on-demand, via a time-based trigger, or driven by specific events. Since AWS Glue is a serverless service, you only pay for the underlying resources used during the job execution—thus, eliminating the need to manage dedicated instances.

The following flowchart further clarifies how AWS Glue operates. It shows data moving from an input S3 bucket through a crawler to the Glue Data Catalog, then through the ETL process, and finally into an output S3 bucket:

![The image is a flowchart illustrating the AWS Glue process, showing data moving from an input S3 bucket through a crawler, AWS Glue Data Catalog, AWS Glue, and finally to an output S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752865064/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue/aws-glue-process-flowchart.jpg)

> [!important]
> **Quick Tip**
>
> AWS Glue’s serverless nature means you can focus on developing your ETL processes without worrying about the underlying infrastructure.

## Built-in Transformation Libraries and Glue Studio

AWS Glue also includes built-in transformation libraries—simple, reusable functionalities for common data operations such as field renaming, record filtering, and data aggregation. This means you can quickly set up data cleaning and normalization routines without coding these functions from scratch. Moreover, the Glue Data Catalog acts as a persistent metadata repository, allowing other AWS services like Athena, EMR, or Redshift to utilize the stored data effectively.

Glue Studio enhances this process by offering a visual interface for designing, executing, and monitoring Spark jobs. This simplifies development, debugging, and management of ETL tasks, making it easier to maintain robust data pipelines.

The image below summarizes the key features of AWS Glue, including its serverless ETL capability, centralized Data Catalog, automatic schema discovery, visual job authoring, and built-in transformation libraries:

![The image lists five features: Serverless ETL Service, Data Catalog, Automatic Schema Discovery, Visual ETL Job Authoring, and Built-in Data Transformation Libraries. Each feature is represented with an icon and a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752865065/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue/serverless-etl-features-list.jpg)

## Conclusion

AWS Glue simplifies data transformation and migration across multiple platforms, supporting targets like S3, Redshift, QuickSight, and more. Its serverless model eliminates infrastructure management overhead while providing a centralized catalog that offers a consolidated view of your data assets. This makes AWS Glue an indispensable tool for modern data workflows.

If you have any questions about AWS Glue, please join us on the KodeKloud Slack under AWS Courses. We look forward to sharing more insights in our next lesson.

![The image is a flowchart illustrating the AWS Glue data processing workflow, showing data sources like S3 and Redshift, moving through a crawler, data catalog, ETL process, and into services like Amazon Redshift, Athena, EMR, and QuickSight for analysis.](https://kodekloud.com/kk-media/image/upload/v1752865066/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue/aws-glue-data-processing-flowchart.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/30eb8cf0-19f5-48aa-8a40-5bb2b21feecd)**
>
> Watch video content
