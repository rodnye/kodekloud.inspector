# Glue Databrew - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Glue-Databrew)

---

## Table of Contents

- Glue Databrew
  - How Glue DataBrew Works
  - Key Features of Glue DataBrew
  - In Summary
  - Watch Video
    - Example Workflow

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Glue Databrew

Welcome back, AWS Solutions Architects. In this article, presented by Michael Forrester, we explore the power of data transformation with Glue DataBrew—a service that markedly differs from Glue ETL.

Glue DataBrew is a visual data preparation tool that enables you to clean and normalize data without writing a single line of code. Unlike Glue ETL, which allows you to apply Python or PySpark code for data transformations, DataBrew relies purely on a graphical user interface.

## How Glue DataBrew Works

The workflow of Glue DataBrew is straightforward:

1.  **Create a Project:** Establish a workspace to interact, analyze, explore, and perform data preparation tasks.
2.  **Select Datasets and/or Data Sources:** Import data from various sources such as S3, Redshift, or other services—similar to the process in Glue ETL.
3.  **Choose Recipes:** Recipes are sets of visual data transformation steps, including operations like filtering rows and converting data types (e.g., string to number). All operations are applied from an intuitive menu without the need for coding.
4.  **Run the Recipe:** When executed, DataBrew applies all specified transformations to the complete dataset. The processed data is then stored in Amazon S3 for consumption by other services.

> [!important]
> **Serverless Advantage**
>
> One significant advantage of Glue DataBrew is its serverless nature. This means you do not need to manage, secure, or scale servers manually. Instead, operational aspects like monitoring are seamlessly handled via services such as CloudWatch.

Data sources for Glue DataBrew include the Glue Catalog, various database services, and S3, all of which can be directly integrated into your workflows.

![The image is a diagram showing AWS Glue Databrew connected to Amazon S3, Amazon Redshift, Amazon RDS, and AWS Glue.](https://kodekloud.com/kk-media/image/upload/v1752865059/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue-Databrew/aws-glue-databrew-diagram.jpg)

### Example Workflow

Consider a workflow where data is sourced from S3 and ingested into Glue DataBrew. It leverages pre-built transformations, and the output is subsequently loaded into Athena. The processed data then becomes accessible to QuickSight for analysis by data and business analysts.

![The image is a flowchart illustrating the data processing workflow using AWS services, including AWS Glue Databrew, AWS Glue, Athena, and QuickSight, with roles for Data Analyst and Business Analyst.](https://kodekloud.com/kk-media/image/upload/v1752865060/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue-Databrew/aws-data-processing-workflow-flowchart.jpg)

Under the hood, Glue DataBrew utilizes AWS Glue to perform data transformations and supports machine learning workflows. For example, you can source data via DataBrew and export the processed output to services such as SageMaker, Rekognition, or Polly.

![The image is a diagram showing the integration of AWS services, including Amazon S3, Amazon Redshift, AWS Glue, AWS Glue Databrew, and Amazon SageMaker. It illustrates a data processing workflow from storage to machine learning.](https://kodekloud.com/kk-media/image/upload/v1752865061/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue-Databrew/aws-services-integration-diagram.jpg)

## Key Features of Glue DataBrew

| Feature                          | Description                                                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Visual Data Preparation          | Clean and transform data through an intuitive graphical interface—no coding required.                            |
| Data Profiling                   | Automatically generate metadata statistics to identify outliers, anomalies, missing values, and inconsistencies. |
| Scalability                      | Automatically scales with your data preparation workload without manual intervention.                            |
| Integration with AWS Data Stores | Seamlessly integrates with services such as Aurora, Redshift, and RDS.                                           |
| Job Scheduling and Reusability   | Schedule data tasks based on triggers or time, and create reusable project templates.                            |

![The image lists five features: Visual Data Preparation, Data Profiling, Scalability and Performance, Integration with AWS Data Stores, and Job Scheduling and Reusability. Each feature is represented with an icon and a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752865062/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Glue-Databrew/data-preparation-profiling-features.jpg)

## In Summary

Glue DataBrew offers a streamlined, visual, and code-free solution for data transformation that harnesses the power of AWS Glue behind the scenes. By simplifying the data preparation process, DataBrew makes it accessible for users who prefer not to write code and accelerates the journey from raw data to actionable insights.

Thank you for reading—see you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/9c773745-6141-49e6-ad9a-b3226fd73803)**
>
> Watch video content
