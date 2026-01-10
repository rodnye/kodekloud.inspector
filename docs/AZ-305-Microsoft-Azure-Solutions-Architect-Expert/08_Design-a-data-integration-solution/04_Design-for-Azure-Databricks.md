# Design for Azure Databricks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-data-integration-solution/Design-for-Azure-Databricks)

---

## Table of Contents

- Design for Azure Databricks
  - 1. Databricks SQL
  - 2. Databricks Data Science and Engineering
  - 3. Databricks Machine Learning
  - How Azure Databricks Works
  - Use Case Scenario
  - When to Use Azure Databricks
  - Conclusion
  - Watch Video
    - Control Plane
    - Data Plane
    - Data Preparation
    - Developing Insights
    - Big Data Processing
    - Machine Learning

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a data integration solution

# Design for Azure Databricks

Azure Databricks is a fully managed, cloud-based platform for big data processing and machine learning. It empowers data science and engineering teams to accelerate AI initiatives, drive innovation, and derive actionable insights—all within a unified environment. By bridging the gap between big data processing and machine learning, Azure Databricks is an essential tool for modern data-driven organizations.

There are three main offerings available in Azure for developing data-intensive applications:

## 1\. Databricks SQL

Databricks SQL provides an intuitive interface for analysts to query data stored in Azure Data Lake Storage (ADLS). ADLS serves as the primary data lake where data is ingested and archived. Once stored, Databricks SQL enables users to analyze, visualize, and explore the data. The insights gained can be seamlessly shared across various dashboards, including those in Power BI, to support enterprise-wide decision-making.

## 2\. Databricks Data Science and Engineering

This collaborative environment is tailored for ML engineers, data engineers, and data scientists. Data ingested through Azure Data Factory (ADF) or other services is stored in ADLS, after which Databricks leverages Apache Spark to generate both batch and real-time analytics. This environment supports the integration of data from diverse sources, enabling teams to derive meaningful insights and make data-driven decisions.

## 3\. Databricks Machine Learning

Databricks Machine Learning offers a comprehensive, end-to-end solution for managing the entire machine learning lifecycle. From experiment tracking and model training to feature development and model serving, this environment covers every aspect of deploying machine learning models in production.

![The image is an infographic about Azure Databricks, highlighting its features: Databricks SQL, Databricks Data Science and Engineering, and Databricks Machine Learning.](https://kodekloud.com/kk-media/image/upload/v1752866911/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Databricks/azure-databricks-infographic-features.jpg)

## How Azure Databricks Works

Azure Databricks operates using two distinct planes: the control plane and the data plane. Understanding this architecture is key to leveraging the platform effectively.

### Control Plane

- Hosts jobs, notebooks with query results, and the cluster manager.
- Manages user sessions through components such as the web application, Hive metastore, and access control lists (ACLs).
- Is managed by Databricks in collaboration with Microsoft and does not reside within your Azure subscription.

![The image explains how Azure Databricks works, highlighting the control plane and data plane, with a puzzle cube illustration.](https://kodekloud.com/kk-media/image/upload/v1752866912/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Databricks/azure-databricks-control-data-plane.jpg)

> [!important]
> **Note**
>
> The separation between the control and data planes ensures that while Databricks manages the orchestration and session governance, your data remains secure within your own Azure subscription.

### Data Plane

- Consists of the runtime clusters within your Databricks workspace.
- Handles all data processing and storage, ensuring your data remains under your control within your Azure subscription.

## Use Case Scenario

Imagine a scenario where your team—comprising data scientists, data analysts, and data engineers—needs to collaborate to extract valuable insights from large datasets. The process typically unfolds as follows:

1.  Data is ingested into Azure Data Lake Storage (ADLS) using Azure Data Factory.
2.  Databricks, deployed within your Azure subscription, accesses this stored data.
3.  The control plane, managed by Databricks, orchestrates the session and job management, while the data plane processes and stores the data.
4.  You manage your environment through a dedicated portal, maintaining a clear separation between control management and data handling.

## When to Use Azure Databricks

Azure Databricks is versatile and can be applied in various scenarios. Here are some key use cases:

### Data Preparation

- Involves cleaning, transforming, and staging raw or unstructured data.
- Facilitates processes such as dataset creation, cloning, and conversion, which are essential for preparation and subsequent analysis.

### Developing Insights

- Supports complex analyses like building recommendation engines, performing churn analysis, or detecting intrusions.
- Enhances productivity by offering a collaborative workspace for data engineers, analysts, and scientists.

### Big Data Processing

- Enables the construction of multi-step data pipelines integrating ADLS and Apache Spark.
- Ensures high reliability and performance for large-scale data processing workloads.

### Machine Learning

- Streamlines end-to-end machine learning workflows, covering experiment tracking, model training, feature development, and model deployment.
- Is ideal for organizations looking to manage the entire lifecycle of machine learning models within a single environment.

![The image is an infographic from KodeKloud titled "When to use Azure Databricks?" It outlines five scenarios for using Azure Databricks: data preparation, developing insights, increasing productivity, big data, and machine learning.](https://kodekloud.com/kk-media/image/upload/v1752866914/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Databricks/azure-databricks-use-cases-infographic.jpg)

Depending on your specific requirements, you might choose:

- **Databricks SQL or Databricks Data Science and Engineering:** if your primary focus is on data preparation and insights development.
- **Databricks Data Science and Engineering:** if you require a collaborative workspace for your team.
- **Databricks Machine Learning:** if you need an end-to-end solution for managing machine learning workflows.

> [!important]
> **Warning**
>
> Ensure you select the environment that best matches your use case to maximize efficiency and simplify your data operations.

## Conclusion

This article provided an in-depth look at Azure Databricks, covering its architecture, functionalities, and various use cases. Understanding its dual-plane structure (control and data planes) and knowing which environment to use is crucial for efficiently managing big data, performing advanced analytics, and executing machine learning tasks.

For further exploration of Azure’s data solutions, continue with the next module on Azure Synapse Analytics (formerly known as Azure SQL Data Warehouse).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/acee17bd-e9e6-4b46-a8da-fb80d01b1523/lesson/9965f480-9baa-41ee-a782-daf17db5b8fc)**
>
> Watch video content
