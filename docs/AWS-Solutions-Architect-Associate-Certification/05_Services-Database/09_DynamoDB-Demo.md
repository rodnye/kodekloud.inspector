# DynamoDB Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/DynamoDB-Demo)

---

## Table of Contents

- DynamoDB Demo
  - Creating the Orders Table
  - Configuring Table Settings
  - Exploring the Table Overview
  - Adding Items to the Table
  - Querying the Table
  - Editing and Deleting Items
  - Using PartiQL for Queries
  - Monitoring and Cleanup
  - Watch Video
  - Practice Lab

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# DynamoDB Demo

In this demonstration, we explore how to work with DynamoDB by creating a table to store customer orders for an e-commerce website. The tutorial covers table creation, configuration, adding items (orders), performing queries, editing and deleting items, using PartiQL, and monitoring. The sequence below matches the original demonstration while enhancing clarity, technical accuracy, and SEO.

---

## Creating the Orders Table

Begin by searching for the DynamoDB service within the AWS Console. Once you are in the DynamoDB interface, click **Create table**. For this demonstration, we will store orders placed by customers on an e-commerce site. You can name the table “orders” (or any name you prefer).

When creating the table, choose a partition key (and optionally a sort key) that best suits your data model:

- **Partition key:** customer ID (String) – enables efficient queries.
- **Sort key:** order ID (String) – distinguishes multiple orders for the same customer.

Below is a screenshot of the Orders table creation interface:

![The image shows a screenshot of the AWS DynamoDB console where a user is creating a new table named "orders" with a partition key "customerId" of type String. There are options for table settings at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752865139/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-create-orders-table.jpg)

---

## Configuring Table Settings

After specifying the keys, you can choose default settings or customize them:

- **Table Class:**  
  Typically, DynamoDB Standard is used for general purposes. If your data is infrequently accessed, consider using DynamoDB Standard-IA.
- **Read/Write Capacity Settings:**
  - Set fixed capacity (e.g., five read and five write capacity units) or enable auto scaling.
  - With auto scaling, define minimum and maximum capacity units and a target utilization percentage to automatically adjust throughput based on demand.

Review the screenshots below to understand the settings configuration:

![The image shows an AWS DynamoDB console interface where table settings and capacity options are being configured. It includes options for table class and read/write capacity settings.](https://kodekloud.com/kk-media/image/upload/v1752865140/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-table-settings.jpg)

![The image shows the AWS DynamoDB console with settings for configuring read/write capacity, including options for auto-scaling and specifying minimum and maximum capacity units.](https://kodekloud.com/kk-media/image/upload/v1752865141/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-capacity-settings.jpg)

After setting the capacity and reviewing additional options like secondary indexes, encryption settings, and deletion protection, click the button to create the table. The creation process should take a few seconds until the table's status becomes “active.”

Below is an image showing the active table:

![The image shows an AWS DynamoDB console with a table named "orders" that is active, displaying details like partition key, sort key, and capacity modes.](https://kodekloud.com/kk-media/image/upload/v1752865142/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-orders-table.jpg)

---

## Exploring the Table Overview

After creation, select your orders table from the console to view an overview of its configurations:

- **Key Information:** Displays the partition key (customerId) and sort key (orderId), along with the chosen capacity mode.
- **Metrics:** Initially, the table contains zero items. The overview provides details like table size, average item size, and capacity metrics.
- **Indexes and Monitoring:** Explore secondary indexes in the “Indexes” section and review CloudWatch metrics in the “Monitor” section, including read/write usage, latency, and alarms for performance tracking.

Refer to the images below for an overview and monitoring dashboard:

![The image shows an AWS DynamoDB console interface displaying general information, item summary, and table capacity metrics for a database table. The table is active with no items currently stored.](https://kodekloud.com/kk-media/image/upload/v1752865143/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-table-metrics.jpg)

![The image shows an AWS DynamoDB monitoring dashboard with various metrics such as read and write usage, throttled requests, and latency for a table named "orders." The graphs display data points and indicate no throttled requests or events.](https://kodekloud.com/kk-media/image/upload/v1752865144/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-monitoring-dashboard-orders.jpg)

---

## Adding Items to the Table

To populate your table with data, navigate to **Explore Table Items**. Since the table is initially empty, you will see a message indicating no items and minimal read capacity usage:

![The image shows the AWS DynamoDB console with a table named "orders" selected. It displays a scan operation with no items returned and a message indicating that 0.5 read capacity units were consumed.](https://kodekloud.com/kk-media/image/upload/v1752865146/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-orders-scan.jpg)

Click **Create item** and populate the required fields:

- **Partition Key (customerId):** For example, “cust1” for customer one.
- **Sort Key (orderId):** For example, “order10” as the order identifier.

You can add additional attributes, such as:

- **Price:** Numeric (e.g., 100)
- **Delivered:** Boolean (true or false)

The following image shows the item creation interface:

![The image shows an AWS DynamoDB interface for creating an item, with fields for "customerId" and "orderId" as attributes. There are options to add new attributes and buttons to cancel or create the item.](https://kodekloud.com/kk-media/image/upload/v1752865146/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-create-item-interface.jpg)

Add further attributes as needed:

![The image shows an AWS DynamoDB console where a user is creating an item with attributes like customerId, orderId, price, and NewValue.](https://kodekloud.com/kk-media/image/upload/v1752865148/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-create-item-attributes.jpg)

For demonstration purposes, add the following orders:

1.  **First Order for Customer One:**
    - Partition Key: cust1
    - Sort Key: order10
    - Price: 100
    - Delivered: true

2.  **Second Order for Customer One:**
    - Partition Key: cust1
    - Sort Key: order20
    - Price: 50
    - Delivered: true

3.  **Order for Customer Two:**
    - Partition Key: cust2
    - Sort Key: order30
    - Price: 35
    - Delivered: false

The image below shows another item creation interface:

![The image shows an AWS DynamoDB interface for creating an item with attributes like customerId, orderId, price, and delivered status. The "Create item" button is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752865149/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-create-item-interface-2.jpg)

And a final form view:

![The image shows a form in the AWS DynamoDB console for creating an item with attributes like customerId, orderId, price, and a boolean for delivered status.](https://kodekloud.com/kk-media/image/upload/v1752865151/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-create-item-form.jpg)

After adding these items, you will have three orders stored in your table.

---

## Querying the Table

Queries are more efficient than scans, so use them to retrieve specific data based on the partition key. For example, to retrieve orders for customer one:

1.  Navigate to the **Query Editor** in the DynamoDB Console.
2.  Enter the partition key value (“cust1”) and run the query to return both orders associated with that customer.

See the example below:

![The image shows an AWS DynamoDB console interface with a query on the "orders" table, displaying two returned items with details like customer ID, order ID, delivery status, and price.](https://kodekloud.com/kk-media/image/upload/v1752865152/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-orders-query-2.jpg)

To retrieve orders for customer two, simply change the partition key to “cust2”.

For more refined searches, you can apply filters. For example, to retrieve only orders for customer one with a price greater than 60:

1.  Set **cust1** as the partition key.
2.  Add a filter condition where **price > 60**.
3.  Run the query to obtain only those orders that match the condition.

A filtered query example is displayed below:

![The image shows the AWS DynamoDB console with a query filtering items from the "orders" table where the price is greater than 60. One item is returned with customerId "CUST-1" and orderId "ORDER-10".](https://kodekloud.com/kk-media/image/upload/v1752865154/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-query-orders-filter.jpg)

---

## Editing and Deleting Items

To update an existing item, select it from the table view and click **Edit item**. For instance, you might update the price from 100 to 120 if the order cost has changed:

![The image shows an AWS DynamoDB console where an item is being edited with attributes like `customerId`, `orderId`, `delivered`, and `price`.](https://kodekloud.com/kk-media/image/upload/v1752865155/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-console-edit-item.jpg)

After making the changes, save your updates.

To delete an item, select it and choose **Actions** > **Delete item**. This will remove the selected item from your table.

> [!important]
> **Note**
>
> Always ensure you have a backup or have exported your data if you need to retain it before deleting any items.

---

## Using PartiQL for Queries

DynamoDB supports PartiQL, an SQL-compatible query language that allows you to interact with your table using familiar SQL-like syntax. PartiQL translates SQL commands into DynamoDB queries, making it a useful alternative if you are more comfortable with SQL.

For further details on PartiQL, check out the [DynamoDB Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/QL-reference.html).

---

## Monitoring and Cleanup

To monitor your table's performance, navigate to the **Monitor** tab in the DynamoDB Console. Here you can review CloudWatch metrics such as read/write usage, latency, and throttled requests.

![The image shows an AWS DynamoDB console screen displaying the monitoring tab for an "orders" table, with CloudWatch metrics and insights.](https://kodekloud.com/kk-media/image/upload/v1752865156/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-DynamoDB-Demo/aws-dynamodb-orders-monitoring-tab.jpg)

When your demonstration is complete and you wish to clean up resources, simply select the table, click **Delete**, and confirm the deletion.

> [!important]
> **Warning**
>
> Deleting the table will permanently remove all stored data. Ensure you have backed up any necessary information before proceeding with the deletion.

---

This demonstration has guided you through creating and configuring a DynamoDB table, adding and querying items, updating and deleting entries, leveraging PartiQL for SQL-style operations, and monitoring performance. We hope this tutorial offers a solid foundation for using DynamoDB in your projects.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/f07132ba-1b62-4a8f-bcdc-37d9a2245706)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/8fa7256f-d2ca-427d-8d02-083a55e22320)**
>
> Practice lab
