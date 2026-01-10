# Demo PubSub - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Google-Clouds-solutions-for-machine-learning-and-AI/Demo-PubSub)

---

## Table of Contents

- Demo PubSub
  - Accessing the Pub/Sub Interface
  - Creating a Pub/Sub Topic
  - Exploring Topic Details and Subscriptions
  - Publishing Messages to Your Topic
  - Understanding Data Ingestion and Retention Options
  - Configuring and Editing Subscriptions
  - Cleaning Up Resources
  - Conclusion
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

Google Clouds solutions for machine learning and AI

# Demo PubSub

Welcome to this comprehensive lesson on integrating and managing Pub/Sub within Google Cloud Platform (GCP). In this guide, you will learn how to create a Pub/Sub topic, publish JSON messages to it, and understand the subscription process. We will also explore how to connect Pub/Sub with services like BigQuery and Cloud Storage for real-time analytics and batch data processing.

---

## Accessing the Pub/Sub Interface

After logging into your GCP console and confirming you are in the desired project, follow these steps to access the Pub/Sub interface:

1.  Enter "Pub/Sub" in the search bar and select it.
2.  If prompted to enable the API, proceed with the activation (this demo assumes the API is already enabled).

On the left-hand side of the Pub/Sub console, you will see several options:

- **Topics:** Temporary storage or streams where incoming data is held.
- **Subscriptions:** Connect to a topic to read the data and allow for further processing by other applications.
- **Snapshots:** Create backups of your topic.
- **Schemas:** (Not covered in this lesson) Define the structure for your messages.

---

## Creating a Pub/Sub Topic

Follow these steps to create a Pub/Sub topic that will serve as your data pipeline:

1.  Click on **Create Topic**.
2.  Provide a unique topic name (e.g., "data-ingestion").
3.  Ensure the option "Add a default subscription" is selected.

![The image shows a Google Cloud Platform interface for creating a Pub/Sub topic, with a dialog box open for entering a topic ID and configuring a default subscription.](https://kodekloud.com/kk-media/image/upload/v1752875326/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-pubsub-topic-creation.jpg)

Once you click **Create Topic**, the topic along with its default subscription is established. This unique topic name becomes the ingestion endpoint for your applications that will push data.

---

## Exploring Topic Details and Subscriptions

After creating the topic, click on it to view detailed settings and options:

- The topic details page provides insights on sending data to BigQuery or Cloud Storage.
- The default subscription is clearly visible and is configured to pull data from the topic.

![The image shows a Google Cloud Platform Pub/Sub console interface for a topic named "data-ingestion," with options to export data to BigQuery or Cloud Storage. It also displays subscription details and permissions settings.](https://kodekloud.com/kk-media/image/upload/v1752875327/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-pubsub-data-ingestion.jpg)

Next, switch to the **Subscriptions** section. Here, you can find options like "Messages" accompanied by a "pull" button to retrieve the messages from your topic.

---

## Publishing Messages to Your Topic

To demonstrate publishing, follow these steps to push messages and validate the subscription retrieval:

1.  Return to your topic and click on **Messages**.
2.  Initiate message publishing by selecting the appropriate subscription.
3.  Enter your message using JSON format.

For example, your initial message can be:

```
{
  "id": 101
}
```

![The image shows a Google Cloud Pub/Sub interface where a user is preparing to publish a message to a topic named "data-ingestion." The interface includes options for message count, interval, and attributes.](https://kodekloud.com/kk-media/image/upload/v1752875328/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-pubsub-message-publish.jpg)

Enhance the message with additional details:

```
{
  "shipment_id": 101,
  "dest": "sri_lanka"
}
```

After entering the desired message, click **Publish** to push it into the topic.

Then, navigate back to the **Subscriptions** section, select your subscription, and click **Pull** to retrieve the message from the topic. The message details will then be displayed, confirming that the subscription successfully processed the published content.

![The image shows a Google Cloud Pub/Sub subscription page for "data-ingestion-sub," displaying details like subscription state, topic name, and permissions. There are no messages currently found in the subscription.](https://kodekloud.com/kk-media/image/upload/v1752875330/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-pubsub-data-ingestion-sub.jpg)

![The image shows a Google Cloud Pub/Sub interface displaying a subscription named "data-ingestion-sub" with a message containing shipment details. The message body includes a shipment ID and destination.](https://kodekloud.com/kk-media/image/upload/v1752875331/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-pubsub-data-ingestion-2.jpg)

---

## Understanding Data Ingestion and Retention Options

Pub/Sub is designed for real-time data streaming and offers flexible data ingestion capabilities:

- Data can be exported directly to BigQuery for instant analytics.
- If the data requires further processing (e.g., cleansing or computation), it can first be transferred to Cloud Storage, then loaded into BigQuery.

By default, a topic retains data for seven days. You can extend the retention period up to a maximum of 31 days by adjusting the topic settings.

> [!important]
> **Important**
>
> Remember: A Pub/Sub topic is optimized for streaming real-time data rather than serving as a permanent data repository. Ensure that data is either consumed by a subscription or exported to long-term storage.

---

## Configuring and Editing Subscriptions

To optimize how your data is processed, you can modify the configuration settings for your subscriptions. To do this:

1.  Navigate to the **Subscriptions** section.
2.  Click on **Edit** for the subscription you want to modify.

Within the edit view, you can configure various options such as:

- Directly streaming data export to BigQuery (ensure that your BigQuery datasets and tables are set up in advance).
- Adjusting message retention settings.
- Changing delivery options for real-time analytics.

![The image shows the Google Cloud Console interface for editing a Pub/Sub subscription, with options for delivery type, message retention, expiration period, and permissions settings.](https://kodekloud.com/kk-media/image/upload/v1752875332/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-console-pubsub-editing.jpg)

These configurations facilitate near real-time data analytics by enabling a seamless data flow into BigQuery or further processing via Cloud Storage.

---

## Cleaning Up Resources

Before proceeding to further lessons—where integration with Cloud Storage and BigQuery is explored—it's essential to clean up the resources created during this demo. To do so:

1.  Navigate back to the topic.
2.  Delete the subscription by clicking on the **Delete** button.
3.  Finally, delete the topic.

Note that once a topic is deleted, its data is irretrievable. If the data is critical, consider enabling a snapshot before deletion.

![The image shows a Google Cloud Platform interface with a pop-up window asking for confirmation to delete a subscription named "data-ingestion-sub." The options available are "CANCEL" and "DELETE."](https://kodekloud.com/kk-media/image/upload/v1752875334/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-delete-subscription-popup.jpg)

![The image shows a Google Cloud console interface where a user is prompted to confirm the deletion of a topic named "data-ingestion" by typing "delete."](https://kodekloud.com/kk-media/image/upload/v1752875335/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-PubSub/google-cloud-console-delete-topic.jpg)

> [!important]
> **Warning**
>
> Deleting topics and subscriptions is irreversible. Make sure to export or backup necessary data before performing deletion.

---

## Conclusion

In this lesson, you have learned how to effectively create and manage Pub/Sub topics and subscriptions in GCP, publish JSON-based messages, and configure data export options to BigQuery and Cloud Storage. As you continue your journey, the next lesson will delve deeper into leveraging BigQuery for advanced data analysis.

Thank you for following along and happy streaming!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/639d4273-10cb-496b-b455-1cc36c8698e6/lesson/21a0b6c6-d06a-4ef4-9d56-0e17cb6b36a3)**
>
> Watch video content
