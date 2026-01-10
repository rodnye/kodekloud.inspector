# Demo Setting up Global Tables with DynamoDB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-2-Reliability-and-BCP/Demo-Setting-up-Global-Tables-with-DynamoDB)

---

## Table of Contents

- Demo Setting up Global Tables with DynamoDB
  - CloudFormation Template for DynamoDB Table
  - Verifying DynamoDB Table Settings
  - Creating Global Table Replicas
  - Testing Global Replication
  - Monitoring Replication Latency
  - Key Takeaways
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 2 Reliability and BCP

# Demo Setting up Global Tables with DynamoDB

Welcome to this detailed lesson on setting up global tables using DynamoDB. In this guide, you will learn how to automate the creation of a DynamoDB table with CloudFormation and configure it for global replication to support robust, geographically distributed applications.

## CloudFormation Template for DynamoDB Table

The following CloudFormation template creates a basic DynamoDB table named "CustomerData." The table uses on-demand pricing (PAY_PER_REQUEST) and defines two attributes: CustomerId (partition key) and OrderDate (sort key). Additionally, it is configured with a stream that captures both new and old images—a prerequisite for enabling global tables.

```
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  CustomerDataTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: CustomerData
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: CustomerId
          AttributeType: S
        - AttributeName: OrderDate
          AttributeType: S
      KeySchema:
        - AttributeName: CustomerId
          KeyType: HASH
        - AttributeName: OrderDate
          KeyType: RANGE
      StreamSpecification:
        StreamViewType: NEW_AND_OLD_IMAGES
Outputs:
  TableName:
    Description: Name of the DynamoDB table
    Value: !Ref CustomerDataTable
  TableArn:
    Description: ARN of the DynamoDB table
    Value: !GetAtt CustomerDataTable.Arn
```

The CloudFormation template above automates the deployment of a DynamoDB table that meets the prerequisites for global replication. Once the table is created in the US West 2 (Oregon) region, you can then proceed with the replication setup.

## Verifying DynamoDB Table Settings

After deploying the table, log in to the DynamoDB console to verify its configuration. Navigate to the table details and check the "Exports and streams" tab to ensure that the DynamoDB stream is enabled and configured to capture both new and old images. The following images illustrate the settings you should see:

![The image shows an AWS DynamoDB console displaying details of a table named "CustomerData," including settings, partition key, sort key, and capacity mode. The table is active with no items and on-demand capacity mode.](https://kodekloud.com/kk-media/image/upload/v1752860088/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Global-Tables-with-DynamoDB/aws-dynamodb-customerdata-console.jpg)

![The image shows an AWS DynamoDB console interface focused on the "Exports and streams" tab for a table named "CustomerData," with options to export data to S3 and details about Amazon Kinesis and DynamoDB streams.](https://kodekloud.com/kk-media/image/upload/v1752860089/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Global-Tables-with-DynamoDB/aws-dynamodb-exports-streams-customerdata.jpg)

![The image shows an AWS DynamoDB console interface with details about data streams, including Amazon Kinesis and DynamoDB stream settings. The DynamoDB stream is active, and the view type is set to "New and old images."](https://kodekloud.com/kk-media/image/upload/v1752860090/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Global-Tables-with-DynamoDB/aws-dynamodb-console-data-streams.jpg)

## Creating Global Table Replicas

Once your table is properly configured and verified, switch to the Global Tables tab in the console.

Historically, setting up DynamoDB Global Tables required creating separate tables and manually configuring replicas. With the latest update, you can simply select your existing table and create a replica in another region.

Currently, the table is set up in the US West 2 region. You have the option to choose between eventual consistency, which offers lower write latencies, or global strong consistency for reads (which might introduce some delay due to additional replication overhead). In this example, you will create a replica in US East 1 (North Virginia) using eventual consistency.

> [!important]
> **Note**
>
> Strong consistency for global tables is still in preview and is not generally available.

During the replica creation, the console displays a status—initially showing that the table is updating. Once replication is complete, the status will change to "active," and the replica region count will update accordingly.

![The image shows a web interface for creating a replica in AWS, with options for selecting replication settings such as consistency type and available regions.](https://kodekloud.com/kk-media/image/upload/v1752860091/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Global-Tables-with-DynamoDB/aws-replica-creation-interface.jpg)

After completing the replica setup, switch to the North Virginia region to verify that the table has been successfully replicated. The Global Tables tab should display the new replica alongside the original table.

![The image shows an AWS DynamoDB console screen, specifically the "Global tables" tab for a table named "CustomerData," with options to create or delete replicas.](https://kodekloud.com/kk-media/image/upload/v1752860092/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Global-Tables-with-DynamoDB/aws-dynamodb-global-tables-console.jpg)

## Testing Global Replication

Once the global table is fully configured, test the replication by inserting sample items into the table. For instance, insert an item with a CustomerId such as "customer 123" and an OrderDate like "2023-01-15." Then, add additional items—e.g., with CustomerIds "customer four, five, and six" and an OrderDate set to "2025-04-09."

These entries will help you confirm that changes in one region are automatically replicated to the other. When you inspect the table in both Oregon and North Virginia, the presence of identical records verifies successful replication.

![The image shows an AWS DynamoDB console interface displaying a table named "CustomerData" with options to scan or query items. Two entries are listed with customer IDs and order dates.](https://kodekloud.com/kk-media/image/upload/v1752860093/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Setting-up-Global-Tables-with-DynamoDB/aws-dynamodb-console-customerdata.jpg)

## Monitoring Replication Latency

Keeping an eye on replication performance is crucial. Navigate to the Monitor section of your DynamoDB table to view key metrics such as query latency, scan latency, and replication latency. Replication latency (sometimes called replication lag) measures the delay—often in milliseconds—in propagating changes across regions. In this demonstration, you might observe a latency of approximately 300 milliseconds.

## Key Takeaways

- Global Tables can be easily configured by creating a DynamoDB table with a stream enabled for new and old images.
- Maintaining a consistent table name and key schema across regions is essential.
- CloudFormation automates the creation and configuration of DynamoDB tables, simplifying deployment.
- Global replication is achieved by creating replicas in additional regions directly from the Global Tables tab.
- Monitoring replication latency ensures your application meets cross-region consistency requirements.

This comprehensive demonstration shows how to set up and verify DynamoDB global tables, ultimately enabling you to build robust, globally distributed applications with ease.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/194d8c4f-705c-4185-aa00-e47c6cf20194)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/1b592900-bdef-468a-9a2b-de667b7e9cae/lesson/00e2ee4c-36ed-433e-b813-25a982710814)**
>
> Practice lab
