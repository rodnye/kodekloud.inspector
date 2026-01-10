# Demo Getting Started with Confluent for Free - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Event-Streaming-with-Kafka/Confluent-Kafka-and-Its-Offerings/Demo-Getting-Started-with-Confluent-for-Free)

---

## Table of Contents

- Demo Getting Started with Confluent for Free
  - 1. Sign Up for the Free Tier
  - 2. Create Your First Kafka Cluster
  - 3. Overview and Producing Sample Data
  - 4. Create a Kafka Topic
  - 5. Launch Sample Data
  - 6. View the Produced Messages
  - 7. Set Up a Sink Connector
  - 8. Monitor Topic Metrics and Settings
  - Additional Resources
  - Watch Video

---

## Content

Event Streaming with Kafka

Confluent Kafka and Its Offerings

# Demo Getting Started with Confluent for Free

Now that you know what Confluent adds on top of [Apache Kafka](https://kafka.apache.org), let's walk through signing up for [Confluent Cloud](https://confluent.cloud)’s Free Tier and launching a managed Kafka cluster in minutes.

---

## 1\. Sign Up for the Free Tier

1.  Open your browser and go to **[Confluent Cloud](https://confluent.cloud)**.
2.  Click **Start for Free** on the landing page.
3.  Ensure **Cloud** (default) is selected instead of Self-Managed.
4.  You’ll receive **$400 in credits** valid for 30 days—perfect for experimenting with Kafka.

> [!important]
> **Warning**
>
> Confluent will authorize $1 on your card to verify it but won’t charge you as long as you stay within $400 or the 30-day window.

5.  Log in with Google (recommended) or provide your email, full name, company, country, and credit-card details.
6.  After validation, you’ll land on your Confluent Cloud dashboard.

![The image shows a webpage for Confluent Cloud, a cloud-native service for Apache Kafka, with options to start for free or contact the company. There is also a cookie consent banner at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752874656/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-apache-kafka-webpage.jpg)

---

## 2\. Create Your First Kafka Cluster

1.  In the dashboard sidebar, click **Environment** → **Default** environment.
2.  Click **Create a Cluster**.

![The image shows a dashboard interface for Confluent, featuring options for data processing and cluster management, along with recommendations for multi-factor authentication and sample data production.](https://kodekloud.com/kk-media/image/upload/v1752874657/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-dashboard-data-processing-management.jpg)

3.  Select the **Basic** plan and click **Begin Configuration**.

![The image shows a webpage from Confluent Cloud displaying different cluster configuration options: Basic, Standard, Enterprise, Dedicated, and Freight, each with varying features and pricing.](https://kodekloud.com/kk-media/image/upload/v1752874659/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-cluster-configurations.jpg)

4.  Choose your **Cloud provider** (AWS, GCP, or Azure) and **Region**.

> [!important]
> **Note**
>
> Selecting a region tells Confluent where to launch its managed nodes—it doesn’t provision resources in your own cloud account.

5.  Name your cluster (e.g., **Kafka cluster**) and click **Launch Cluster**.

![The image shows a web interface for creating a cluster on Confluent Cloud, with options for naming the cluster, viewing costs, and configuring settings like provider and region. There are tabs for configuration, usage limits, and uptime SLA, and a button to review the payment method.](https://kodekloud.com/kk-media/image/upload/v1752874659/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-cluster-creation-interface.jpg)

6.  Wait a few minutes for the status to change to **Running**.

---

## 3\. Overview and Producing Sample Data

On the cluster overview page, you can configure connectors, clients, and even generate sample events automatically:

![The image shows a Confluent Cloud dashboard for a Kafka cluster, displaying an overview with options to set up connectors, clients, and produce sample data. The interface includes navigation options on the left and a section for throughput metrics.](https://kodekloud.com/kk-media/image/upload/v1752874660/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-kafka-dashboard-overview.jpg)

Click **Produce Sample Data** to see predefined event templates, or continue below to create your own topic.

---

## 4\. Create a Kafka Topic

1.  In the left menu, select **Topics** → **Create topic**.
2.  Enter your topic name (e.g., **random-topic**).
3.  Leave **Partitions** at the default (6) and click **Create with defaults** → **Skip**.

![The image shows a Confluent Cloud interface for creating a new Kafka topic, with fields for topic name and partitions, and options for infinite retention and advanced settings.](https://kodekloud.com/kk-media/image/upload/v1752874661/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-kafka-topic-creation.jpg)

Your topic is now ready to receive messages.

---

## 5\. Launch Sample Data

1.  Go back to the **Overview** page.
2.  Under **Produce Sample Data**, click **Get started**.
3.  Select a template (e.g., **Stock trade**) and hit **Launch**.

![The image shows a Confluent Cloud interface with a "Launch Sample Data" popup, allowing users to generate sample data for topics like orders, users, and stock trades. The background displays various connectors available for integration.](https://kodekloud.com/kk-media/image/upload/v1752874662/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-launch-sample-data.jpg)

Confluent creates its own topic (e.g., `sample_data_stock_trade`) and provisions a connector to push events:

![The image shows a Confluent Cloud interface displaying a "Connectors" page with a running connector named "sample_data" and options to connect with popular connectors like Amazon S3 Sink and MongoDB Atlas Sink.](https://kodekloud.com/kk-media/image/upload/v1752874665/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-connectors-sample-data.jpg)

Wait until the connector status is **Running**.

---

## 6\. View the Produced Messages

1.  In **Topics**, click the sample-data topic (e.g., `sample_data_stock_trades`).
2.  Wait a few seconds for messages to populate.

![The image shows a Confluent Cloud interface displaying a Kafka topic named "sample_data_stock_trades" with a bar chart and a table of stock trade messages, including details like timestamp, partition, offset, key, and value.](https://kodekloud.com/kk-media/image/upload/v1752874666/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-kafka-sample-data.jpg)

You’ll see a live table of messages with `timestamp`, `partition`, `offset`, `key`, and `value` fields.

---

## 7\. Set Up a Sink Connector

Stream your Kafka topic data to an external system:

1.  Click **Connectors** in the sidebar.
2.  Under **Sink connectors**, choose **Amazon S3 Sink** (or another sink).
3.  Select the topic(s) and click **Continue**.
4.  Enter your AWS credentials and S3 bucket details.
5.  Finish the setup to start streaming data to S3.

![The image shows a web interface for adding an Amazon S3 Sink connector, focusing on selecting or creating an API key for Kafka credentials. It includes options for "My account," "Service account," and "Use an existing API key," with documentation on the right.](https://kodekloud.com/kk-media/image/upload/v1752874667/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/amazon-s3-sink-connector-api-key.jpg)

> [!important]
> **Note**
>
> In this demo, we skip the full AWS configuration—refer to the [Confluent AWS Sink Connector guide](https://docs.confluent.io/cloud/current/connectors/aws-s3-sink.html) for details.

---

## 8\. Monitor Topic Metrics and Settings

1.  Go to **Topics** → your topic → **Monitor** to view production and consumption graphs.
2.  Open **Settings** to adjust partitions, retention, cleanup policy, and more.

![The image shows a Confluent Cloud interface displaying a Kafka topic named "sample_data_stock_trades" with production and consumption metrics. The sidebar includes options like Cluster Overview, Networking, and Topics.](https://kodekloud.com/kk-media/image/upload/v1752874668/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-kafka-topic-metrics.jpg)

![The image shows a Confluent Cloud interface displaying the configuration settings for a Kafka topic named "sample_data_stock_trades." It includes details like partitions, cleanup policy, and retention settings, with a Confluent AI Assistant chat window on the right.](https://kodekloud.com/kk-media/image/upload/v1752874669/notes-assets/images/Event-Streaming-with-Kafka-Demo-Getting-Started-with-Confluent-for-Free/confluent-cloud-kafka-topic-settings.jpg)

Confluent’s **AI Assistant** can help troubleshoot configuration or performance issues in real time.

---

With these steps, you’ve successfully registered for Confluent Cloud’s free tier, launched a Kafka cluster, produced and viewed sample data, and configured a sink connector. Enjoy exploring Confluent’s advanced features and integrations!

---

## Additional Resources

- [Confluent Cloud Quickstart](https://docs.confluent.io/cloud/current/get-started/index.html)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Confluent Sink Connectors](https://docs.confluent.io/home/connect/overview.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/event-streaming-with-kafka/module/360e4117-a201-4aad-9777-a8ab70972060/lesson/f97b6993-25a9-44ea-9279-adf980fef38b)**
>
> Watch video content
