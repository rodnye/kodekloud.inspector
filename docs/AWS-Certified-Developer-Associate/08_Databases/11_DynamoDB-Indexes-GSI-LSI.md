# DynamoDB Indexes GSI LSI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Indexes-GSI-LSI)

---

## Table of Contents

- DynamoDB Indexes GSI LSI
  - Example Table: Product Reviews
  - Querying the Reviews
  - Local Secondary Index (LSI)
  - Global Secondary Index (GSI)
  - Summary
  - Watch Video
    - Retrieve All Reviews for a Given Product
    - Retrieve a Specific User's Review
    - Retrieve Reviews with Specific Attributes
    - Retrieve All Reviews by a Specific User
    - Key Points About LSIs
    - Benefits of Using GSIs

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Indexes GSI LSI

This article explains how DynamoDB leverages Global Secondary Indexes (GSIs) and Local Secondary Indexes (LSIs) to overcome query limitations. By understanding these indexing strategies, you can optimize your DynamoDB queries for efficient data retrieval.

## Example Table: Product Reviews

Consider a table that stores product reviews with the following attributes:

- **Product ID:** The identifier of the reviewed product.
- **User:** The person who wrote the review.
- **Rating:** The score assigned to the product.
- **Content:** The text of the review.
- **Created_at:** The timestamp indicating when the review was created.

This table uses a composite primary key comprising the partition key (product ID) and the sort key (user), allowing a single user to review multiple products and each product to have reviews from different users.

## Querying the Reviews

### Retrieve All Reviews for a Given Product

To fetch every review for a product with an ID of 9999, query based solely on the partition key:

![The image shows a table structure for querying product reviews, with columns for product ID, user, rating, content, and creation date. It highlights a query for all reviews of product 99999.](https://kodekloud.com/kk-media/image/upload/v1752858757/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/product-reviews-query-table-99999.jpg)

Since the query relies on the product ID, it is fast and efficient.

### Retrieve a Specific User's Review

To obtain a review submitted by a specific user (for example, Sam) for product 9999, follow these steps:

1.  Query the partition key (product ID equals 9999).
2.  Narrow the results by filtering on the sort key (user equals sam@gmail.com).

![The image shows a table structure for querying product reviews, highlighting partition and sort keys, with an example query for a specific user's review of a product.](https://kodekloud.com/kk-media/image/upload/v1752858758/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/product-reviews-query-table-structure.jpg)

This method efficiently targets the desired review by using both keys.

### Retrieve Reviews with Specific Attributes

Suppose you need all five-star reviews for product 9999. First, query by the partition key (product_id equals 9999) to retrieve all reviews. Then, filter the results client-side to extract the five-star reviews:

![The image shows a table structure for querying reviews, focusing on retrieving all 5-star reviews for product ID 99999. It includes columns for product ID, user, rating, content, and creation date.](https://kodekloud.com/kk-media/image/upload/v1752858759/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/5-star-reviews-query-table-99999.jpg)

> [!important]
> **Note**
>
> Since the filtering by rating occurs on the client side and the rating attribute is not part of the table's primary key, this method can be inefficient when dealing with a large number of reviews.

### Retrieve All Reviews by a Specific User

Directly querying on the sort key (user) is not supported unless it is part of the primary key. To query all reviews made by Sam, you must:

1.  Scan the entire table.
2.  Filter the results where the user equals sam@gmail.com.

This approach is inefficient because scanning reads every item in the table.

> [!important]
> **Warning**
>
> Efficient querying in DynamoDB depends on leveraging the partition key and, optionally, the sort key. Avoid client-side filtering when possible to improve performance.

## Local Secondary Index (LSI)

LSIs enable you to use an alternative sort key while keeping the original partition key. For the reviews table, even though the primary sort key is the user, an LSI can allow querying based on the rating attribute.

For example, define an LSI on the "rating" attribute so that you can query:

- Partition key: product_id equals 9999
- Sort key (via LSI): rating equals 5

This design provides an efficient means to query by rating without resorting to client-side filtering.

### Key Points About LSIs

- LSIs must be defined during table creation; they cannot be added later.
- A table supports up to five LSIs.
- LSIs share the table’s provisioned read and write capacity units (RCUs and WCUs).

![The image illustrates a DynamoDB Local Secondary Index (LSI) setup, showing a query to retrieve all 5-star ratings for a specific product, with a table displaying product IDs, users, ratings, content, and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752858760/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/dynamodb-local-secondary-index-query.jpg)

![The image is a diagram explaining DynamoDB Local Secondary Index (LSI) with a table showing partition key, sort key, and various LSI attributes like rating, content, created_at, verified_purchase, and location. It includes notes on defining LSIs and their usage of the main table's capacity units.](https://kodekloud.com/kk-media/image/upload/v1752858761/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/dynamodb-local-secondary-index-diagram.jpg)

## Global Secondary Index (GSI)

GSIs allow you to create a completely new primary key configuration that consists of:

- A new partition key.
- An optional sort key.

This is especially useful when you need to query based on an attribute not included in the main table's primary key.

For example, to query all reviews written by Sam (regardless of product), you can create a GSI with:

- Partition key: user (allowing direct queries for user equals sam@gmail.com)
- Optional sort key: for example, rating, to further refine results to five-star reviews.

### Benefits of Using GSIs

- GSIs can be added or modified after the table has been created.
- They require separate provisioning of RCUs and WCUs.
- If the GSI write throughput is throttled, it may also throttle writes on the main table.

![The image explains DynamoDB's Global Secondary Index (GSI) with a table example, showing how a new primary key is defined using partition and sort keys. It compares the original reviews table with the GSI index table.](https://kodekloud.com/kk-media/image/upload/v1752858762/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/dynamodb-global-secondary-index-example.jpg)

![The image illustrates the use of a Global Secondary Index (GSI) in DynamoDB to query all 5-star reviews by a user named Sam, showing the original reviews table and the indexed GSI table with partition and sort keys.](https://kodekloud.com/kk-media/image/upload/v1752858764/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/dynamodb-gsi-5-star-reviews-sam.jpg)

![The image is a slide about DynamoDB Global Secondary Index (GSI), highlighting that GSIs can be added after table creation, require provisioning of RCU and WCU, and that throttling of GSI writes affects the main table.](https://kodekloud.com/kk-media/image/upload/v1752858764/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Indexes-GSI-LSI/dynamodb-global-secondary-index-slide.jpg)

## Summary

- **Local Secondary Index (LSI):**
  - Allows an alternative sort key while maintaining the same partition key.
  - Must be defined at table creation.
  - Supports up to five LSIs per table.
  - Shares provisioned capacity with the main table.

- **Global Secondary Index (GSI):**
  - Enables creation of a new primary key with its own partition key and optional sort key.
  - Can be added or modified after table creation.
  - Has separate provisioning for RCUs and WCUs.
  - Write throttling on a GSI can impact the main table's performance.

Understanding these indexing options is crucial for optimizing your DynamoDB queries, ensuring efficient data retrieval, and maintaining high performance for your applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/9cf8267c-f700-4ca1-af47-d1130d2d8293)**
>
> Watch video content
