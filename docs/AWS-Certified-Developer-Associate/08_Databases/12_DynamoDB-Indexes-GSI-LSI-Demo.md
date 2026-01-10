# DynamoDB Indexes GSI LSI Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Indexes-GSI-LSI-Demo)

---

## Table of Contents

- DynamoDB Indexes GSI LSI Demo
  - Creating the Base Table
  - Adding Data to the Table
  - Querying the Table without Secondary Indexes
  - Introducing Local Secondary Indexes (LSI)
  - Introducing Global Secondary Indexes (GSI)
  - Conclusion
  - Watch Video
    - Querying by Partition Key
    - Querying by Partition and Sort Key Combination
    - Limitations with Filters for Non-Key Attributes

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Indexes GSI LSI Demo

In this lesson, we demonstrate how to work with DynamoDB Local Secondary Indexes (LSI) and Global Secondary Indexes (GSI) through a practical example. We use a table representing university courses to showcase different querying techniques and index configurations for optimal performance.

## Creating the Base Table

We begin by creating a table named "courses" to represent various university classes or courses. This table uses a partition key called "department" (e.g., Math, English) and a sort key called "class" (e.g., Calculus I, Algebra).

![The image shows a screenshot of the AWS DynamoDB console, specifically the "Create table" page, where a table named "courses" is being set up with fields for partition and sort keys.](https://kodekloud.com/kk-media/image/upload/v1752858742/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-create-table-courses.jpg)

Next, we customize the capacity settings by selecting provisioned mode, disabling auto scaling, and setting the read/write capacity units to two. At this stage, no secondary indexes are created to highlight the limitations of this configuration.

![The image shows a section of the AWS DynamoDB console where read/write capacity settings are being configured, with options for provisioned and on-demand capacity modes. The provisioned capacity units are set to 5, and auto-scaling is turned off.](https://kodekloud.com/kk-media/image/upload/v1752858744/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-capacity-settings-config.jpg)

After confirming these settings, the "courses" table is successfully created.

![The image shows the AWS DynamoDB console with a focus on the "courses" table, displaying its general information and status. The table is active, with details about partition and sort keys, and point-in-time recovery options.](https://kodekloud.com/kk-media/image/upload/v1752858745/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-courses-table-console.jpg)

## Adding Data to the Table

We proceed to insert data into the table. For instance, an item representing a Calculus One course offered by the Math department includes additional attributes such as:

- Instructor: Isaac Newton
- City: New York
- Seats: 5

After adding this initial entry, more items are inserted to provide a variety of courses from multiple departments, including Math, English, and Engineering.

![The image shows the AWS DynamoDB console with a table named "courses" selected, displaying a list of items with details such as department, class, city, instructor, and seats.](https://kodekloud.com/kk-media/image/upload/v1752858746/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-console-courses-table.jpg)

## Querying the Table without Secondary Indexes

### Querying by Partition Key

If a student wants to view all courses offered by the Math department, the query leverages the partition key by specifying "math" as its value. This query is highly efficient because it directly targets the partition key.

### Querying by Partition and Sort Key Combination

To retrieve a specific course, such as Algebra within the Math department, both the partition key ("math") and the sort key ("algebra") are specified. This combination uniquely identifies the course.

![The image shows an AWS DynamoDB console with a query for courses in the "math" department, specifically for the "algebra" class. The results display three items with details such as department, class, city, instructor, and seats.](https://kodekloud.com/kk-media/image/upload/v1752858747/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-query-math-algebra.jpg)

### Limitations with Filters for Non-Key Attributes

When filtering courses by non-key attributes such as city (e.g., all Math courses in New York) or instructor (e.g., courses taught by John Mann), the query must use additional filters because these attributes are not part of the primary key. This approach first retrieves all courses under the Math department and then applies the filter client-side, leading to inefficient use of read capacity units.

![The image shows an AWS DynamoDB console where a query is being executed on a table named "courses" with filters applied for department and city. The results display items with attributes like department, class, city, instructor, and seats.](https://kodekloud.com/kk-media/image/upload/v1752858748/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-courses-query-results.jpg)

A similar inefficiency is observed when filtering by instructor, such as "John Mann."

![The image shows the AWS DynamoDB console with a query setup for a table named "courses," filtering items where the instructor is "new york." The interface includes options for selecting tables, setting partition and sort keys, and applying filters.](https://kodekloud.com/kk-media/image/upload/v1752858749/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-console-query-courses.jpg)

> [!important]
> **Note**
>
> Filtering on non-key attributes involves additional costs in read capacity units since the filtering is applied after retrieving data using the partition key.

## Introducing Local Secondary Indexes (LSI)

Local Secondary Indexes provide an alternate sort key while using the same partition key, enabling efficient queries without client-side filtering. Because LSIs must be defined during table creation, we create a new table named "courses2" with the same base configuration (partition key "department" and sort key "class"). In addition, we add LSIs for the "instructor" and "city" attributes.

![The image shows the AWS DynamoDB console where a user is creating a new table named "courses2" with a partition key labeled "department."](https://kodekloud.com/kk-media/image/upload/v1752858750/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-console-create-table-courses2.jpg)

After configuring the capacity settings and LSIs, the new "courses2" table is created.

![The image shows the AWS DynamoDB console, displaying details of a table named "courses2" with its general information and status. The table is active, with no items currently present.](https://kodekloud.com/kk-media/image/upload/v1752858752/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-courses2-table-status.jpg)

Data from the original "courses" table is then copied into "courses2" to benefit from the improved query capabilities provided by the LSIs:

- The "instructor" index enables efficient queries for courses taught by a specific instructor within a department.
- The "city" index allows you to quickly retrieve courses based on city for a given department.

For example, to find Math courses taught by "John Mannie" using the instructor index:

![The image shows an AWS DynamoDB console with a query result displaying a list of items from a table named "courses2," filtered by the "math" department.](https://kodekloud.com/kk-media/image/upload/v1752858753/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-courses2-query-results.jpg)

Similarly, to query courses in New York, the city index is used:

![The image shows an AWS DynamoDB console where a query is being run on a table named "courses2" to filter items by department "math" and city "new york," returning two results.](https://kodekloud.com/kk-media/image/upload/v1752858754/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-query-courses2-math-newyork.jpg)

## Introducing Global Secondary Indexes (GSI)

Global Secondary Indexes allow you to define a completely new primary key (with a partition key and an optional sort key), independent of the base table's keys. This is particularly useful for queries that require filtering solely based on non-primary key attributes.

In our example, if the requirement is to retrieve courses solely by city (regardless of department), a GSI is created on the "courses2" table with "city" as the partition key. Optionally, a sort key (such as "instructor" or "seats") can be added to support range-based queries—like filtering for classes with a minimum number of available seats.

![The image shows a web interface for creating a global secondary index in DynamoDB, with fields for partition key, sort key, and index name. The partition key is set to "city" and the index name is "city-index".](https://kodekloud.com/kk-media/image/upload/v1752858755/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/dynamodb-global-secondary-index-creation.jpg)

After the GSI is created, efficient queries—such as retrieving all courses available in New York—are possible. Note that GSIs can be added after table creation, but caution is required: insufficient write capacity on the GSI can throttle both the index and the base table, even though read capacity issues on a GSI do not affect the base table.

> [!important]
> **Warning**
>
> Ensure that you configure adequate write capacity for your GSIs to prevent throttling of both the index and the base table.

The new global index appears in the table details alongside the previously defined LSIs:

![The image shows an AWS DynamoDB console displaying details of a table named "courses2," including global and local secondary indexes. The global index "city-seats-index" is active, and there are two local indexes: "city-index" and "instructor-index."](https://kodekloud.com/kk-media/image/upload/v1752858756/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI-Demo/aws-dynamodb-courses2-table-details.jpg)

This configuration allows you to select the global index (e.g., "city-seats-index") when performing queries based on city and to further refine results using the sort key attributes if needed.

## Conclusion

In summary:

- Primary key queries using only the partition key or a combination of the partition and sort key are highly efficient in DynamoDB.
- Using filters on non-key attributes consumes extra read capacity, so it is best to avoid them when possible.
- Local Secondary Indexes (LSIs) offer an alternative sort key while maintaining the base table’s partition key but must be set during table creation.
- Global Secondary Indexes (GSIs) enable completely new primary key configurations and can be added after table creation, making them ideal for queries that span attributes outside the base table’s primary key.

This tutorial highlights how and when to use LSIs and GSIs to achieve optimal query performance in DynamoDB.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/2d0fe21e-c6b5-41c8-a7e1-4d44ddf4b1a5)**
>
> Watch video content
