# Kinesis Firehose - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Data-Analytics/Kinesis-Firehose)

---

## Table of Contents

- Kinesis Firehose
  - How Kinesis Data Firehose Works
  - Comparing Kinesis Data Streams and Kinesis Data Firehose
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Data Analytics

# Kinesis Firehose

Kinesis Data Firehose is a fully managed service that automatically delivers real-time streaming data to destination services like Amazon S3, Redshift, or OpenSearch. Unlike Kinesis Data Streams—which focuses on rapid data ingestion and processing—Kinesis Data Firehose is tailored for direct, near real-time data delivery.

> [!important]
> **Key Insight**
>
> Kinesis Data Firehose not only transports streaming data to its final location but also supports inline data transformation using AWS Lambda. This ensures that your data is formatted optimally before reaching its destination.

## How Kinesis Data Firehose Works

The following outlines the process flow of Kinesis Data Firehose:

- **Data Producers:**  
  Data is sent to Kinesis Data Firehose by various producers. Notably, Kinesis Data Streams can also forward its processed data to Firehose as a producer.
- **Data Transformation:**  
  An optional AWS Lambda function can transform the incoming data into a preferred format, if necessary.
- **Data Delivery:**  
  The transformed data is then forwarded to the target destination, which may be:
  - An Amazon S3 bucket
  - An OpenSearch domain
  - Splunk
  - A custom endpoint

- **Error Handling:**  
  Records that fail during transformation or delivery are automatically redirected to a backup S3 bucket for further inspection.

Below is the diagram that depicts the data flow architecture:

!/images/Python_Basics-Comments/frame_100.jpg  
Image description: \[Original image description preserved.\]

## Comparing Kinesis Data Streams and Kinesis Data Firehose

Below is a table summarizing the key differences between Kinesis Data Streams and Kinesis Data Firehose:

| Feature             | Kinesis Data Streams                                   | Kinesis Data Firehose                           |
| ------------------- | ------------------------------------------------------ | ----------------------------------------------- |
| Primary Focus       | Real-time data ingestion and processing                | Direct streaming of data to destination         |
| Scaling Management  | User-managed scaling (e.g., shard splitting/merging)   | Fully managed with automatic scaling            |
| Data Storage        | Retains data for up to 365 days with replay capability | No data storage or replay capability            |
| Data Transformation | N/A                                                    | Supports inline transformation using AWS Lambda |
| Failure Handling    | N/A                                                    | Redirects failed records to a backup S3 bucket  |

> [!important]
> **Important Note**
>
> Kinesis Data Firehose is ideal for applications requiring efficient, near real-time delivery of streaming data without the overhead of managing infrastructure, making it a perfect choice for many modern data architectures.

## Conclusion

Kinesis Data Firehose offers an efficient, fully managed solution for delivering real-time streaming data directly to various endpoints. With built-in support for data transformation and robust error handling, it simplifies the process of building scalable data pipelines.

For more detailed information, refer to the [Kinesis Data Firehose Documentation](https://docs.aws.amazon.com/firehose/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/ac3fe785-4e7a-4f57-ae16-99fcd3cfde7e/lesson/a7e2e7e7-5302-4cb8-a075-d7a7d8710170)**
>
> Watch video content
