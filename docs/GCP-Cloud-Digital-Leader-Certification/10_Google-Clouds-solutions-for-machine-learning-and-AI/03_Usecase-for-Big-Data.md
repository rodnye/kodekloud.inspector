# Usecase for Big Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Google-Clouds-solutions-for-machine-learning-and-AI/Usecase-for-Big-Data)

---

## Table of Contents

- Usecase for Big Data
  - Business Process Overview
  - Integrating Google Cloud Services
  - Summary of the Data Pipeline
  - Watch Video
    - Data Ingestion with Pub/Sub
    - Data Storage with Cloud Storage
    - Data Processing with Dataproc
    - Analytics with BigQuery
    - AI and Machine Learning with Vertex AI

---

## Content

GCP Cloud Digital Leader Certification

Google Clouds solutions for machine learning and AI

# Usecase for Big Data

Hello and welcome back! In this lesson, we explore how a pharmaceutical company leverages big data using [Google Cloud Platform (GCP)](https://cloud.google.com) to optimize its shipment and delivery processes. This real-time data processing workflow enhances logistics efficiency and improves customer experience.

## Business Process Overview

In our scenario, the pharmaceutical company distributes various drugs, prescription tablets, and health-related products. The shipment process from the warehouse to pharmacies includes several critical steps:

1.  A notification is sent to the pharmacy when a shipment is initiated.
2.  Pharmacies can track the order’s location during transit.
3.  A confirmation notification is sent upon successful delivery.

This end-to-end process demonstrates a real-time application where continuous monitoring and prompt notifications are essential for operational excellence.

![The image illustrates the process of a pharmaceutical shipment from a company, showing stages from "Shipment Sent" to "Shipment Received," with transit through the USA to Sri Lanka. It includes icons of a building, transport vehicles, and a world map indicating successful delivery.](https://kodekloud.com/kk-media/image/upload/v1752875336/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Usecase-for-Big-Data/pharmaceutical-shipment-process-diagram.jpg)

By capturing data across the entire shipment journey, the company collects a vast volume of diverse information. This data is then transformed into actionable insights that help refine shipment strategies and boost overall efficiency.

## Integrating Google Cloud Services

GCP’s suite of services plays a central role in addressing the big data challenges in this scenario. Below is an overview of each service and its role in the data pipeline:

### Data Ingestion with Pub/Sub

Immediately after a product leaves the warehouse, data is ingested via Internet of Things (IoT) devices into [Cloud Pub/Sub](https://cloud.google.com/pubsub). This service streams real-time events by publishing shipment data to a dedicated topic, ensuring that every event is captured as it occurs.

### Data Storage with Cloud Storage

Once ingested, the data is securely stored in [Cloud Storage](https://cloud.google.com/storage). This cost-effective object storage solution holds vast amounts of shipment data, serving as a reliable repository for subsequent analysis and processing.

### Data Processing with Dataproc

With large data volumes at play, processing is essential. [Cloud Dataproc](https://cloud.google.com/dataproc) – a fully managed service supporting over 30 open-source tools (including [Apache Spark](https://spark.apache.org) and [Apache Flink](https://flink.apache.org)) – cleans and transforms the raw data. This modern ETL process is both scalable and cost-efficient under a pay-as-you-go pricing model.

![The image is an informational graphic about "Data Processing - DataProc," highlighting its features such as being a fully managed service for Apache Spark, used for data lake modernization, and offering a pay-as-you-go model.](https://kodekloud.com/kk-media/image/upload/v1752875337/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Usecase-for-Big-Data/dataproc-data-processing-graphic.jpg)

### Analytics with BigQuery

For in-depth analysis, the processed data is analyzed using [BigQuery](https://cloud.google.com/bigquery). Whether queried directly from BigQuery or integrated from Cloud Storage, this powerful data warehouse allows for rapid and efficient exploration of large datasets, supporting data-driven decision-making.

### AI and Machine Learning with Vertex AI

The final step involves leveraging artificial intelligence to derive predictive insights. [Vertex AI](https://cloud.google.com/vertex-ai) offers an end-to-end platform for developing, training, testing, and deploying machine learning models. It supports multiple frameworks such as [TensorFlow](https://www.tensorflow.org) and [scikit-learn](https://scikit-learn.org), making it a versatile tool for data science engineers.

![The image is a flowchart illustrating a data processing pipeline on Google Cloud Platform, showing stages of ingest, storage, analytics, and AI/machine learning using services like Cloud Pub/Sub, Cloud Storage, BigQuery, Cloud Dataproc, and Cloud Vertex AI.](https://kodekloud.com/kk-media/image/upload/v1752875338/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Usecase-for-Big-Data/google-cloud-data-pipeline-flowchart.jpg)

## Summary of the Data Pipeline

- **Data Ingestion:** Real-time events are streamed via Pub/Sub as soon as the shipment process starts.
- **Data Storage:** Cloud Storage holds the extensive shipment data securely.
- **Data Processing:** Dataproc processes and cleans the raw data for better analysis.
- **Data Analysis:** BigQuery allows for quick querying and deep insights.
- **AI/ML Deployment:** Vertex AI facilitates the development and deployment of machine learning models.

> [!important]
> **Key Takeaway**
>
> Google Cloud Platform services collectively establish a robust and scalable data pipeline that effectively addresses the big data challenges encountered during the pharmaceutical shipment process. This seamless integration not only supports real-time monitoring but also drives strategic decision-making through advanced analytics and AI.

![The image is about "Streaming Data - Pub/Sub" and includes a diagram of interconnected circles, with text highlighting real-time data streaming and event ingestion into BigQuery, data lakes, or operational databases.](https://kodekloud.com/kk-media/image/upload/v1752875339/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Usecase-for-Big-Data/streaming-data-pubsub-diagram.jpg)

![The image is a slide titled "Storage - Cloud Storage" with an illustration of two server icons and a list of benefits, including lower-cost storage, acting as a data warehouse, and connectivity to BigQuery and DataProc.](https://kodekloud.com/kk-media/image/upload/v1752875340/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Usecase-for-Big-Data/storage-cloud-storage-benefits.jpg)

In summary, GCP provides a comprehensive suite of services that enable real-time data ingestion, efficient storage, streamlined processing, and advanced analytics. This integrated solution optimizes shipment tracking and lays the groundwork for deploying AI and machine learning models to further enhance operational decision-making.

That concludes our lesson on leveraging GCP for big data applications in the pharmaceutical industry. Thank you for reading, and we look forward to exploring more topics in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/639d4273-10cb-496b-b455-1cc36c8698e6/lesson/a51af642-beb2-4af3-85f2-870442b2e9ff)**
>
> Watch video content
