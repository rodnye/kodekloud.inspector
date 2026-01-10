# Demo Kinesis in real time consumption and production - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Demo-Kinesis-in-real-time-consumption-and-production)

---

## Table of Contents

- Demo Kinesis in real time consumption and production
  - Creating a Kinesis Data Stream
  - Configuring the Kinesis Data Firehose
  - Setting Up an S3 Bucket
  - Sending Test Data to the Data Stream
  - Verifying Data Delivery in S3
  - Conclusion
  - Watch Video
    - Code Example: Sending a Single Record
    - Complete Snippet: Generating Dummy Data
    - Example 1
    - Example 2

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Demo Kinesis in real time consumption and production

In this lesson, you'll learn how to work with Amazon Kinesis by sending dummy data—simulating crypto or stock trading prices—to a Kinesis data stream. This data is then automatically forwarded to a Kinesis Data Firehose and delivered to an S3 bucket. Follow the steps and diagrams below to set up your streaming data pipeline.

## Creating a Kinesis Data Stream

Start by navigating to the Kinesis service page in the AWS console and creating a new data stream.

1.  Enter a stream name (for example, "crypto stock price").
2.  Choose the capacity mode:
    - Select **Provisioned** if you know your overall throughput requirements.
    - Select **On-Demand** for dynamic scaling.

    > [!important]
    > **Pricing Consideration**
    >
    > Note that the On-Demand option may be pricier compared to Provisioned capacity.

3.  Configure additional stream settings as required.

![The image shows an Amazon Kinesis services webpage, detailing options for collecting, processing, and analyzing data streams in real time. It includes sections on how it works, pricing, and getting started with options like Kinesis Data Streams and Firehose.](https://kodekloud.com/kk-media/image/upload/v1752865029/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Kinesis-in-real-time-consumption-and-production/amazon-kinesis-data-streams-webpage.jpg)

After configuring your settings, click **Create data stream** to complete this step.

## Configuring the Kinesis Data Firehose

Next, configure a Kinesis Data Firehose to channel data from the Kinesis data stream to an S3 bucket.

1.  Choose the data stream you just created as your source.
2.  For the destination, select or create an S3 bucket. In this example, a new bucket named "Kinesis Code Cloud Demo" is created.
3.  Optionally, enable data transformation by activating a Lambda function. For this demo, leave the transformation settings as default.
4.  Review your settings and create the delivery stream.

![The image shows an AWS Kinesis console screen with settings for creating a data stream, including options for capacity mode, data retention, and encryption.](https://kodekloud.com/kk-media/image/upload/v1752865030/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Kinesis-in-real-time-consumption-and-production/aws-kinesis-console-data-stream-settings.jpg)

![The image shows an Amazon Kinesis console screen where a data stream named "crypto-stock-price" is being created. It includes details like capacity mode, ARN, and creation time, with options for producers and consumers.](https://kodekloud.com/kk-media/image/upload/v1752865036/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Kinesis-in-real-time-consumption-and-production/amazon-kinesis-crypto-stock-price-creation.jpg)

![The image shows an AWS Kinesis Data Firehose configuration page, where users can set a delivery stream name, transform and convert records, and specify destination settings like an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752865037/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Kinesis-in-real-time-consumption-and-production/aws-kinesis-data-firehose-configuration.jpg)

## Setting Up an S3 Bucket

If you do not already have an S3 bucket, follow these steps to create one:

1.  Enter the bucket name ("Kinesis Code Cloud Demo" in this example).
2.  Select your AWS region and configure additional settings as needed.
3.  Click **Create bucket** to finalize the setup.

![The image shows the AWS S3 interface for creating a new bucket, with fields for bucket name, AWS region, and object ownership settings.](https://kodekloud.com/kk-media/image/upload/v1752865039/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Kinesis-in-real-time-consumption-and-production/aws-s3-create-bucket-interface.jpg)

After creation, verify the bucket's availability by browsing your bucket list.

![The image shows an Amazon S3 interface with a list of buckets, each with a name and region, allowing the user to choose one.](https://kodekloud.com/kk-media/image/upload/v1752865040/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Kinesis-in-real-time-consumption-and-production/amazon-s3-bucket-list-interface.jpg)

## Sending Test Data to the Data Stream

With the Kinesis data stream and Firehose set up, send test data using the AWS SDK with JavaScript. The sample code provided below sends a test record every 50 milliseconds.

### Code Example: Sending a Single Record

```
// Sample code to send a record using Kinesis PutRecordCommand
const command = new PutRecordCommand(input);
const response = await client.send(command);
console.log(response);
```

### Complete Snippet: Generating Dummy Data

This complete snippet generates dummy data with timestamps and simulated prices:

```
setInterval(async () => {
    const input = {
        // PutRecordInput
        StreamName: "crypto-stock-price",
        Data: Buffer.from(
            JSON.stringify({
                date: Date.now(),
                price: "$" + (Math.floor(Math.random() * 40000) + 1)
            })
        )
    };
    // Create and send the PutRecordCommand using your AWS SDK client
    const command = new PutRecordCommand(input);
    const response = await client.send(command);
    console.log(response);
}, 50);
```

Run this code from your working directory (for example, C:\\Users\\sanje\\Documents\\scratch\\kinesis). It will continuously generate and send data into the stream over several minutes.

![The image shows an Amazon Kinesis dashboard for a data stream named "crypto-stock-price," displaying its status, capacity mode, and stream metrics. The dashboard includes monitoring tabs and graphs for metrics like GetRecords and iterator age.](https://kodekloud.com/kk-media/image/upload/v1752865041/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Kinesis-in-real-time-consumption-and-production/amazon-kinesis-crypto-stock-dashboard.jpg)

## Verifying Data Delivery in S3

Once the test data has been sent, verify delivery by checking your S3 bucket. The Kinesis Data Firehose typically organizes files into folders based on the current date (e.g., "2023"). Opening one of these files should reveal JSON objects similar to the examples below:

### Example 1

```
{"date":169810779318,"price":"$46941"}
{"date":169810793259,"price":"$342561"}
{"date":169810793368,"price":"$301171"}
{"date":169810793418,"price":"$274001"}
{"date":169810793469,"price":"$6611"}
{"date":169810793518,"price":"$94176"}
```

### Example 2

```
{"date":1689188257344,"price":"115.48"}
{"date":1689188257345,"price":"348.47"}
{"date":1689188257346,"price":"519.32"}
```

These records confirm that data is successfully transmitted from your Kinesis data stream through the Firehose and stored in the S3 bucket.

## Conclusion

This demonstration has shown you how to set up a real-time data ingestion and delivery pipeline using Amazon Kinesis. The steps covered include:

- Creating a Kinesis data stream
- Configuring a Kinesis Data Firehose
- Setting up an S3 bucket
- Sending test data using the AWS SDK
- Verifying data delivery in S3

This robust setup not only supports real-time data processing but also offers capabilities such as data transformation via Lambda functions, providing a scalable solution for various applications. Happy streaming and exploring further real-time data processing techniques!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/8d780b58-284f-4028-9c88-b16b58f5d376)**
>
> Watch video content
