# Sample GCP Architecture Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Understanding-GCP-Architecture/Sample-GCP-Architecture-Part-1)

---

## Table of Contents

- Sample GCP Architecture Part 1
  - Data Ingestion
  - Data Processing
  - Data Presentation
  - Watch Video
    - Storage Options Overview

---

## Content

GCP Cloud Digital Leader Certification

Understanding GCP Architecture

# Sample GCP Architecture Part 1

Hello and welcome back!

In this lesson, we dive into a robust Internet of Things (IoT) architecture using Google Cloud Platform (GCP). This architecture seamlessly connects multiple devices to the internet, aggregates their data in GCP, and analyzes it to extract actionable insights.

Imagine various devices—such as a sound system, lighting system, or sensors—being connected online. For instance, you might capture data to monitor the power consumption of household electrical systems. This scenario is just one of many practical applications of IoT data management.

## Data Ingestion

The first step in our architecture is efficient data ingestion. Incoming data from your IoT devices is handled by GCP’s Pub/Sub service, a real-time streaming solution that effortlessly transports all incoming requests to the cloud.

> [!important]
> **Note**
>
> Pub/Sub not only supports seamless data streaming but also allows you to monitor and log activities, ensuring immediate alerts in case of any issues.

## Data Processing

Once the data is ingested, the next phase involves processing the data to make it analysis-ready. There are two common approaches for processing:

- **Direct Stream Processing:** Route data directly from Pub/Sub to Dataflow for real-time analysis.
- **Batch Processing Alternative:** Alternatively, send data to Dataproc for batch analysis, then stream the refined data onward.

After processing, the data can be stored long-term using solutions such as Google Cloud Storage, Datastore, or Cloud Bigtable. These storage options make it possible to perform further analysis, including real-time data analytics.

### Storage Options Overview

| Storage Option       | Purpose                            | Use Case Example                              |
| -------------------- | ---------------------------------- | --------------------------------------------- |
| Google Cloud Storage | Long-term file storage             | Storing large data sets for archival          |
| Google Datastore     | NoSQL document storage             | Managing structured data with minimal latency |
| Cloud Bigtable       | Scalable, high-performance storage | Real-time analytics of vast time-series data  |

## Data Presentation

The final step in the architecture is presenting the processed data through an intuitive application. Whether it’s a mobile app or a website, end users can readily access the insights. Depending on your needs, you might choose to host this application on:

- App Engine (Platform-as-a-Service)
- Kubernetes (Containerized deployment)
- Compute Engine (Traditional virtual machines)

This comprehensive, end-to-end IoT architecture is ideal for sensor-based projects. It allows you to capture and visualize critical metrics such as:

- Device activation times
- Device shutdown times
- Kilowatt usage during operation

These metrics can be visualized in interactive graphs to uncover trends in power consumption and other operational insights.

That concludes this lesson. Thank you for joining us, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/d31d9cda-d4bd-482b-981c-12bc7f6fb4e9/lesson/451a4e64-363a-4b97-83ff-e695c176b21e)**
>
> Watch video content
