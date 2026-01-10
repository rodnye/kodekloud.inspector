# Kinesis Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Data-Analytics/Kinesis-Demo)

---

## Table of Contents

- Kinesis Demo
  - Step 1: Create a Kinesis Data Stream
  - Step 2: Configure the Kinesis Data Firehose
  - Step 3: Send Test Data to the Data Stream
  - Step 4: Verify Data Delivery in S3
  - Additional Considerations
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Data Analytics

# Kinesis Demo

This guide demonstrates how to work with Amazon Kinesis for streaming dummy data that mimics crypto or stock trading prices. The process involves transmitting data from a Kinesis Data Stream to a Kinesis Firehose Delivery Stream, which then deposits the data in an S3 bucket. In this tutorial, you will learn how to configure each component and run a test using the AWS SDK for JavaScript.

## Step 1: Create a Kinesis Data Stream

Begin by navigating to the [Amazon Kinesis](https://aws.amazon.com/kinesis/) service page, then create a new data stream.

![The image shows the Amazon Kinesis services webpage, highlighting options for collecting, processing, and analyzing data streams in real time, with a section for getting started and pricing details.](https://kodekloud.com/kk-media/image/upload/v1752858628/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/amazon-kinesis-data-streams-webpage.jpg)

Enter a name for your data stream (e.g., "crypto stock price") and select the most appropriate capacity mode for your use case:

- **Provisioned:** Choose this mode if you have predefined throughput requirements.
- **On Demand:** Use this option for dynamic scaling, keeping in mind that it might incur higher costs.

Additionally, review and adjust other available configuration options as needed.

![The image shows an AWS Kinesis console screen where a user is configuring data stream settings, including capacity mode, data retention, and encryption options. The "Create data stream" button is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752858629/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/aws-kinesis-console-data-stream-settings.jpg)

Click on **Create Data Stream**. Once your stream (named "crypto stock price") is successfully created, proceed to set up the Kinesis Data Firehose.

## Step 2: Configure the Kinesis Data Firehose

Set up a Kinesis Data Firehose delivery stream to channel data into an S3 bucket. Follow these steps:

1.  **Source Selection:** Choose the Kinesis Data Stream you just created as the data source.
2.  **Destination:** Set the destination to an S3 bucket.

![The image shows an Amazon Kinesis console screen where a data stream named "crypto-stock-price" is being created. It displays details like status, capacity mode, ARN, and creation time, along with options for producers and consumers.](https://kodekloud.com/kk-media/image/upload/v1752858630/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/amazon-kinesis-crypto-stock-price.jpg)

If needed, enable data transformation by configuring a Lambda function. This feature is useful when you need to modify record formats. For demonstration purposes, we will use the default settings.

![The image shows an AWS Kinesis Data Firehose configuration page, where users can set a delivery stream name, transform and convert records, and specify destination settings like an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752858631/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/aws-kinesis-data-firehose-configuration.jpg)

Before completing the Firehose configuration, confirm that an S3 bucket is available. If you do not have one, create a new bucket (using "Kinesis Code Cloud demo" as an example). Refresh or browse for your bucket, then finalize the setup by keeping the remaining settings at default and clicking **Create Delivery Stream**.

![The image shows an Amazon S3 console interface with a list of buckets, each with a name and region, allowing the user to choose one.](https://kodekloud.com/kk-media/image/upload/v1752858632/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/amazon-s3-console-buckets-list.jpg)

## Step 3: Send Test Data to the Data Stream

Once your data stream and Firehose are configured, test the setup by sending sample data to the Kinesis Data Stream using the AWS SDK for JavaScript.

The following code snippet demonstrates how to construct a record and send it to the data stream:

```
const input = {
  // Required PutRecordInput parameters
  StreamName: "crypto-stock-price",
  Data: Buffer.from(
    JSON.stringify({
      date: Date.now(),
      price: "$" + Math.floor(Math.random() * 40000) + 1,
    })
  ),
  PartitionKey: "test" // Required partition key
};


const command = new PutRecordCommand(input);
const response = await client.send(command);
console.log(response);
```

To simulate continuous data streaming, use the code below. This snippet sends a new record every 50 milliseconds:

```
setInterval(async () => {
  const input = {
    // Required PutRecordInput parameters
    StreamName: "crypto-stock-price",
    Data: Buffer.from(
      JSON.stringify({
        date: Date.now(),
        price: "$" + Math.floor(Math.random() * 40000) + 1,
      })
    ),
    PartitionKey: "test"
  };


  const command = new PutRecordCommand(input);
  const response = await client.send(command);
  console.log(response);
}, 50);
```

Assume your workspace is located at:

```
C:\Users\sanje\Documents\scratch\kinesis
```

Allow the code to run for a couple of minutes to accumulate sufficient data in both the Kinesis stream and the S3 bucket.

![The image shows an Amazon Kinesis dashboard for a data stream named "crypto-stock-price," displaying its status as active and various stream metrics.](https://kodekloud.com/kk-media/image/upload/v1752858634/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/amazon-kinesis-crypto-stock-dashboard.jpg)

## Step 4: Verify Data Delivery in S3

Once the data is processed by the Firehose delivery stream, navigate to your S3 bucket to verify the records. You should observe a directory matching the current date (e.g., "2023") that contains several files with the streamed data.

![The image shows an Amazon Kinesis Data Firehose console with one active delivery stream named "KDS-S3-d4TxI," which is set to deliver data to an Amazon S3 destination.](https://kodekloud.com/kk-media/image/upload/v1752858635/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/amazon-kinesis-data-firehose-s3.jpg)

If you open one of these files, the output will appear similar to this:

```
{"date":169810799318,"price":"$46941"}{"date":169810793259,"price":"$342561"}{"date":169810793368,"price":"$301171"}{"date":169810793418,"price":"$274001"}{"date":169810793469,"price":"$6611"}{"date":169810793487,"price":"$901"}
```

This output confirms that the data stream has successfully transmitted the records to your S3 bucket.

![The image shows an Amazon S3 bucket interface with a list of objects, including one file named "KDS-S3-d4Txl-1-2023-10-24-00-38-57-2d4a1335-eefd-4211-b481-9fa70f927165" that was last modified on October 23, 2023.](https://kodekloud.com/kk-media/image/upload/v1752858636/notes-assets/images/AWS-Certified-Developer-Associate-Kinesis-Demo/amazon-s3-bucket-interface-objects.jpg)

> [!important]
> **Note**
>
> Ensure that your bucket permissions are correctly set so that Kinesis Firehose can write data to your S3 bucket.

## Additional Considerations

While this guide covers the fundamental process of transmitting data from a Kinesis Data Stream to an S3 bucket using Kinesis Firehose, additional features are available. For example, you can utilize Lambda functions for on-the-fly data transformation, which is beneficial if you need to modify the record formats or convert data types.

That concludes this comprehensive demo of setting up and using Amazon Kinesis. We hope this guide helps you effectively integrate and manage streaming data for your applications.

For further information, consult the following resources:

| Resource Type          | Use Case                                | Example Command/Link                                                   |
| ---------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| AWS Kinesis Streams    | Real-time data ingestion and processing | [Amazon Kinesis](https://aws.amazon.com/kinesis/)                      |
| Kinesis Firehose       | Data delivery to S3 and other services  | [Kinesis Data Firehose](https://aws.amazon.com/kinesis/data-firehose/) |
| AWS SDK for JavaScript | Integrating Kinesis in applications     | [AWS SDK Docs](https://docs.aws.amazon.com/sdk-for-javascript/)        |
| Amazon S3              | Object storage for streamed data        | [Amazon S3](https://aws.amazon.com/s3/)                                |

Happy streaming!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/ac3fe785-4e7a-4f57-ae16-99fcd3cfde7e/lesson/a2b44087-f85a-4b29-9c95-621fc7640600)**
>
> Watch video content
