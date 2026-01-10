# Data Ingestion ETL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Data-Collection-and-Preparation/Data-Ingestion-ETL)

---

## Table of Contents

- Data Ingestion ETL
  - Data Storage in Organizations
  - The ETL Process
  - Watch Video

---

## Content

Fundamentals of MLOps

Data Collection and Preparation

# Data Ingestion ETL

Hello and welcome back. In this lesson, we are diving into data ingestion, more commonly known as ETL (Extract, Transform, Load). This process is central to integrating data from multiple sources, enabling insightful analytics and robust machine learning models.

## Data Storage in Organizations

Organizations store and manage their data across a variety of systems. Each of these systems serves a distinct purpose to ensure all aspects of data are captured:

1.  **CRM Systems**  
    Customer Relationship Management systems house customer data, track interactions, and manage sales leads—vital for sales and marketing teams.
2.  **Marketing Tools**  
    These platforms facilitate email campaigns and deliver detailed insights on campaign performance, including metrics like open rates and engagement levels.
3.  **Social Media Platforms**  
    Social media is used not only for content dissemination but also for gauging customer sentiment through interactions.

    ![The image illustrates three types of platforms for storing data in an organization: Customer Relationship Management (CRM) Systems, Marketing Automation Platforms, and Social Media Platforms, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752875023/notes-assets/images/Fundamentals-of-MLOps-Data-Ingestion-ETL/data-storage-platforms-crm-marketing-social.jpg)

4.  **Web and Mobile Analytics**  
    Tools in this category capture user behavior, track traffic sources, and determine key engagement metrics across digital channels.
5.  **Traditional Databases**  
    These databases power applications and microservices by offering fast and reliable access to structured data.
6.  **IoT Devices**  
    Internet of Things devices, commonly found in factories or on machines, generate real-time data that is crucial for monitoring operations and improving efficiency.
7.  **Additional Sources**  
    Beyond the primary systems, data can also originate from miscellaneous platforms like Google Sheets, documents, images, and various other sources.

> [!important]
> **Note**
>
> It is essential to consider the diversity of data storage sources when planning your ETL strategy, as each source may require different extraction and transformation techniques.

## The ETL Process

With data dispersed across multiple systems, consolidating it into a single, unified repository is crucial. The ETL process helps achieve this objective by following these steps:

1.  **Extract**  
    Data is gathered from numerous sources such as databases, APIs, and files. Tools like Talend and DBT can simplify this extraction, ensuring that data from various systems is collected accurately.
2.  **Transform**  
    Once data is extracted, it often exists in incompatible formats. The transformation step cleanses, normalizes, filters, and aggregates the data, ensuring consistency and preparing it for analysis.
3.  **Load**  
    In the final step, the transformed data is loaded into a centralized repository, such as a data warehouse or a dedicated analytics platform, making it readily available for analysis and decision-making.

    ![The image illustrates the ETL (Extract, Transform, Load) process in data integration, detailing each step: extracting raw data, transforming it for analysis, and loading it into a target system.](https://kodekloud.com/kk-media/image/upload/v1752875024/notes-assets/images/Fundamentals-of-MLOps-Data-Ingestion-ETL/etl-process-data-integration-diagram.jpg)

Each of these three steps—Extract, Transform, and Load—is crucial in the data ingestion pipeline, laying the foundation for robust data analytics and efficient MLOps workflows.

> [!important]
> **Warning**
>
> Ensure that the data transformation step is carefully designed to handle inconsistencies and variations in source data. Inadequate transformations can lead to errors in downstream analysis.

This summary marks the first part of our MLOps journey. In our next lesson, we will explore the loading process in more depth.

Thank you, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/d72a3430-8b54-48d6-89ad-6a5f8b74f4ab/lesson/6685b4dc-7d48-4dc8-b375-a65f81b9afe2)**
>
> Watch video content
