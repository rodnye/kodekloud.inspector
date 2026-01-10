# DynamoDB Basics Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Basics-Demo)

---

## Table of Contents

- DynamoDB Basics Demo
  - Table Creation and Key Configuration
  - Table Settings and Provisioned Throughput
  - Exploring the Table
  - Adding Data to the Table
  - Querying Data
  - Editing and Deleting Items
  - Exploring Advanced Query Features
  - Monitoring and Table Deletion
  - Additional Resources
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Basics Demo

In this tutorial, we demonstrate how to work with DynamoDB using the AWS Console. This guide shows you how to create a table, configure keys, add sample data, query records, and eventually delete the table. In our example, we simulate an e-commerce scenario where customer orders are stored in a table named "orders."

## Table Creation and Key Configuration

Begin by accessing the DynamoDB service from the AWS Console. Then, start creating a new table by providing the necessary details:

- **Table Name:** orders (You can choose any name suitable for your application.)
- **Partition Key:** customerId (A unique identifier for each customer)
- **Sort Key:** orderId (Ensures uniqueness when a customer places multiple orders)

Both keys are defined as strings, which makes data querying efficient and effective.

![The image shows a screenshot of the AWS DynamoDB console where a user is creating a new table named "orders" with a partition key "customerId" and an optional sort key "orderId".](https://kodekloud.com/kk-media/image/upload/v1752858700/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-console-create-table-orders.jpg)

## Table Settings and Provisioned Throughput

After setting up the keys, you can customize your table settings or use the defaults. The key configuration options include:

- **Table Class:**
  - Default is DynamoDB Standard.
  - Option to choose DynamoDB Standard Infrequent Access for less frequently accessed data.

- **Provisioned Throughput:**
  - Choose between fixed provisioned capacity and auto-scaling.
  - When auto-scaling is enabled, configure the minimum and maximum capacity units and set the target utilization (70% in this demo) so that DynamoDB adjusts throughput based on workload.

- **Additional Settings:**
  - Configure secondary indexes, encryption options, and deletion protection.

![The image shows an AWS DynamoDB console interface where users can configure table settings, choose a table class, and set read/write capacity settings.](https://kodekloud.com/kk-media/image/upload/v1752858701/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-console-table-settings.jpg)

![The image shows the AWS DynamoDB console with settings for read/write capacity, including options for on-demand and provisioned capacity modes, and auto-scaling settings for read and write capacity.](https://kodekloud.com/kk-media/image/upload/v1752858702/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-console-capacity-settings.jpg)

Once you are satisfied with the configurations, click "Create Table." The table will take a few seconds to become active.

![The image shows a section of the AWS DynamoDB console, focusing on encryption key management, deletion protection, and tagging options for creating a table.](https://kodekloud.com/kk-media/image/upload/v1752858704/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-console-encryption-key-management.jpg)

## Exploring the Table

After the table activation, select the table to explore its details. The table overview pane displays:

- **Table Configurations:** Partition key (customerId), sort key (orderId), capacity mode, and other metrics.
- **Indexes Tab:** Displays any configured secondary indexes.
- **Monitor Tab:** Provides CloudWatch metrics such as read/write usage and latency.
- **Exports and Streams Tab:** Facilitates setting up data exports and streams for further processing.

![The image shows the AWS DynamoDB console with details of an "orders" table, including partition and sort keys, capacity mode, and table status. The console also displays options for managing and monitoring the table.](https://kodekloud.com/kk-media/image/upload/v1752858705/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-orders-table-console.jpg)

![The image shows the AWS DynamoDB console, specifically the "Indexes" tab for a table named "orders," with no global secondary indexes created yet. The interface includes options to create an index and explore table items.](https://kodekloud.com/kk-media/image/upload/v1752858706/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-indexes-orders-tab.jpg)

![The image shows the AWS DynamoDB console with various monitoring metrics for a table named "orders," including read and write usage, throttled requests, and latency graphs.](https://kodekloud.com/kk-media/image/upload/v1752858707/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-console-orders-metrics.jpg)

![The image shows an AWS DynamoDB console interface, specifically the "Exports and streams" tab for a table named "orders," with options for exporting to S3 and managing data streams.](https://kodekloud.com/kk-media/image/upload/v1752858708/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-exports-streams-orders.jpg)

## Adding Data to the Table

Next, add sample data using the "Explore Table Items" feature in the AWS Console. Although the AWS CLI or SDK are common for production use, the Console is ideal for demo purposes.

Follow these steps:

1.  Click "Create Item."
2.  Set the partition key (customerId) and sort key (orderId). As an example:
    - For the first item:
      - customerId: "customer1"
      - orderId: "order10"
3.  Add additional attributes:
    - price (number)
    - delivered (Boolean)

Here’s how you might structure your data:

- **Item 1:** customerId = "customer1", orderId = "order10", price = 100, delivered = false.
- **Item 2:** customerId = "customer1", orderId = "order20", price = 50, delivered = true.
- **Item 3:** customerId = "customer2", orderId = "order30", price = 35, delivered = false.

![The image shows an AWS DynamoDB console where a user is creating an item with attributes "customerId" and "orderId." A dropdown menu for adding a new attribute type is visible.](https://kodekloud.com/kk-media/image/upload/v1752858709/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-console-create-item.jpg)

![The image shows an AWS DynamoDB console where a user is creating an item with attributes like customerId, orderId, price, and delivered status. The "Create item" button is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752858710/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-create-item-console.jpg)

After adding the items, the table will display three entries.

![The image shows the AWS DynamoDB console with a table named "orders" being queried. It displays options for scanning or querying items, but no items are currently returned.](https://kodekloud.com/kk-media/image/upload/v1752858712/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-console-orders-table.jpg)

## Querying Data

Use the "Query" feature for efficient data retrieval. To query all orders for "customer1," follow these steps:

1.  Choose the "Query" option.
2.  Specify the partition key value: customerId = "customer1".
3.  Execute the query to display the relevant orders.

![The image shows the AWS DynamoDB console with a query for items in the "orders" table, displaying results for customer ID "CUST-1" with two orders listed.](https://kodekloud.com/kk-media/image/upload/v1752858713/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-orders-query-cust1.jpg)

For more refined queries, add filters. For example, to retrieve orders for "customer1" with a price greater than 60:

1.  Use the filter settings.
2.  Define the "price" attribute with the condition "greater than 60."
3.  Run the query to see only the qualifying orders.

![The image shows an AWS DynamoDB console interface where a query is being executed on the "orders" table. The query filters items with a price greater than 60, and one item is returned with customer ID "CUST-1" and order ID "ORDER-10".](https://kodekloud.com/kk-media/image/upload/v1752858714/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-orders-query-console-2.jpg)

## Editing and Deleting Items

Editing an item is straightforward:

- Select an item and click "Edit Item."
- Modify the desired fields (for example, change the price from 100 to 120).
- Save the changes to update the item.

To delete an item:

1.  Select the item.
2.  Go to "Actions" and choose "Delete Item."
3.  Confirm deletion when prompted.

> [!important]
> **Note**
>
> Always back up your data before performing delete operations to avoid accidental loss.

## Exploring Advanced Query Features

DynamoDB offers advanced query capabilities that mimic SQL-like syntax for users with a SQL background. While the underlying operations remain DynamoDB queries, this feature simplifies complex query logic.

![The image shows the AWS DynamoDB console with a query setup for the "orders" table, filtering items where the price is greater than 60. The interface includes options for scanning or querying items and setting partition and sort keys.](https://kodekloud.com/kk-media/image/upload/v1752858716/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-orders-query-setup.jpg)

## Monitoring and Table Deletion

Monitor your table's performance through the "Monitor" tab. Here you can view metrics such as read/write usage, latency, and set up CloudWatch alarms for proactive management.

![The image shows the AWS DynamoDB console with a focus on monitoring the "orders" table, displaying CloudWatch metrics and options for alarms and insights.](https://kodekloud.com/kk-media/image/upload/v1752858717/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Basics-Demo/aws-dynamodb-orders-monitoring-console.jpg)

When your demo is complete and you no longer need the table, follow these steps to delete it:

1.  Select the table.
2.  Click "Delete."
3.  Confirm the deletion.

> [!important]
> **Warning**
>
> Be cautious when deleting tables, as the deletion process is irreversible and results in permanent data loss.

This concludes our demonstration of creating, managing, querying, and deleting a DynamoDB table using the AWS Console. For production scenarios, consider integrating DynamoDB with the AWS CLI or SDK to perform operations programmatically.

Happy learning!

## Additional Resources

- [AWS DynamoDB Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [AWS DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/577d791f-026e-4eed-8a1e-26fb1d66a35b)**
>
> Watch video content
