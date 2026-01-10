# Demo BigQuery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Google-Clouds-solutions-for-machine-learning-and-AI/Demo-BigQuery)

---

## Table of Contents

- Demo BigQuery
  - Accessing BigQuery in GCP
  - Creating a Dataset
  - Creating a Table from a CSV File
  - Running SQL Queries
  - Additional Features
  - Conclusion
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

Google Clouds solutions for machine learning and AI

# Demo BigQuery

Welcome to this lesson on exploring BigQuery using the Google Cloud Platform (GCP) Console. In this guide, you will learn how to navigate to BigQuery in GCP, create datasets and tables, upload data, and run SQL queries. Follow the step-by-step instructions below to get started.

## Accessing BigQuery in GCP

1.  Log in to your [GCP Console](https://console.cloud.google.com/), select the appropriate project, and use the search bar to find "BigQuery". You will see options under **Data Warehouse** and **Analytics**.

    ![The image shows the Google Cloud Console interface with a search query for "BigQuery" and related options, documentation, and tutorials displayed. The console is set to the "KodeKloud-GCP-Training" project.](https://kodekloud.com/kk-media/image/upload/v1752875320/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-BigQuery/google-cloud-console-bigquery-query.jpg)

2.  Click on **BigQuery**. If prompted to activate the BigQuery API, please do so. Once activated, expand your project on the left-hand side to view its details. At this point, you may notice that no datasets exist in your project.

## Creating a Dataset

Before you can store tables, you need to create a dataset within your project.

1.  Click on **Create dataset**.
2.  In the dataset creation form, enter a dataset name (for example, "sample_data").
3.  Select the location where your data will be stored. Choosing the correct location is critical to meeting your company's data protection regulations and aligning with your organization's geographical preferences.

    ![The image shows a Google Cloud BigQuery interface where a user is creating a dataset. The "Create dataset" panel is open, displaying options for entering a Dataset ID and selecting a data location.](https://kodekloud.com/kk-media/image/upload/v1752875320/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-BigQuery/google-cloud-bigquery-create-dataset.jpg)

> [!important]
> **Note**
>
> If you encounter an error related to naming conventions, consider modifying the dataset name (for example, using an underscore like "sample_data") and try again.

Once you create the dataset, it will serve as a container for your tables.

## Creating a Table from a CSV File

Now that you have your dataset, you can create a table to store your data.

1.  Within the dataset view, click on **Create table**.

    ![The image shows a Google Cloud BigQuery interface with a dataset named "sample_data" selected, displaying its details and options like "Create table" and "Share."](https://kodekloud.com/kk-media/image/upload/v1752875321/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-BigQuery/google-cloud-bigquery-sample-data.jpg)

2.  You will be presented with several table creation options:
    - Create an Empty Table
    - Create a Table from Google Cloud Storage
    - **Upload Data** (choose this option for local file uploads)

3.  Click on **Upload**.
4.  Click on **Browse** to select a local CSV file that contains your sample data. BigQuery will automatically detect the file format. You can also upload other supported formats such as JSON, Avro, or Parquet.
5.  Choose your dataset (in this example, "sample_data") and specify a table name (for example, "user_data").
6.  Enable schema auto-detection so that BigQuery determines the table fields based on your CSV file.
7.  Finally, click on **Create Table** to finish the process. Your CSV data will be uploaded and the table will be created.

    ![The image shows a Google Cloud BigQuery interface where a user is in the process of creating a new table, with options for selecting the data source and configuring schema and partition settings.](https://kodekloud.com/kk-media/image/upload/v1752875323/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-BigQuery/google-cloud-bigquery-new-table.jpg)

Once the table is created, it will appear under your dataset. Expanding the table reveals the schema detected from your CSV file. Clicking on **Details** provides additional information such as the number of rows and the data size, while the **Preview** tab gives a glimpse of the table's entries.

![The image shows a Google Cloud BigQuery interface displaying the schema of a table named "user_data" with fields like id, first_name, last_name, email, gender, and ip_address.](https://kodekloud.com/kk-media/image/upload/v1752875324/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-BigQuery/google-cloud-bigquery-user-data-schema.jpg)

## Running SQL Queries

To analyze the table data, you can run SQL queries using the query editor:

1.  Click on the **Query** option to open a new query tab.
2.  Write your SQL query. For example, if you want to fetch 10 records from the table, use the following query:

    ```
    SELECT *
    FROM `kodekloud-gcp-training.sample_data.user_data`
    LIMIT 10;
    ```

> [!important]
> **Query Cost Consideration**
>
> Before executing the query, review the query plan to check that only 70 KB of data will be processed. Remember, BigQuery charges are calculated based on the volume of data processed, so it's important to optimize your queries for cost efficiency.

3.  Click **Run** to execute your query. The results will be displayed at the bottom of the screen.
4.  BigQuery also allows you to download query results in various formats. Additionally, review execution details such as query duration, read time, and compute time to further optimize query performance.

    ![The image shows a Google Cloud BigQuery interface displaying a table named "user_data" with columns for ID, first name, last name, email, gender, and IP address. The data is presented in a tabular format with various entries.](https://kodekloud.com/kk-media/image/upload/v1752875324/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-BigQuery/google-cloud-bigquery-user-data-table.jpg)

## Additional Features

On the left side of the BigQuery interface, you will find the **BI Engine** option in the administrator tools. BI Engine caches frequently accessed query results, reducing the need to recompute them for subsequent queries. This feature can significantly lower query costs and improve performance for popular tables.

Return to the SQL workspace, where you can:

- Review your query history (both personal and project-wide)
- Save or share queries for future use
- Schedule queries to run periodically

BigQuery thus provides a robust, scalable analytics engine within GCP that supports both ad-hoc querying and routine data analysis.

## Conclusion

This lesson covered how to:

- Access BigQuery through the GCP Console
- Create a dataset and upload a CSV file as a table
- Configure schema auto-detection
- Execute SQL queries and leverage BigQuery's cost management features

Thank you for following along, and we look forward to seeing you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/639d4273-10cb-496b-b455-1cc36c8698e6/lesson/c22ee3ec-4feb-4e41-8199-a47ac113acb9)**
>
> Watch video content
