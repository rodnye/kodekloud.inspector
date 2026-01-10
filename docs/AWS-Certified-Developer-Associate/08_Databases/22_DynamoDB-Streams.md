# DynamoDB Streams - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Streams)

---

## Table of Contents

- DynamoDB Streams
  - Stream Data Capture Options
  - How It Works in Practice
  - Key Features of DynamoDB Streams
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Streams

DynamoDB Streams is an optional feature that captures data modification events on your DynamoDB tables. Every time an item is created, updated, or deleted, a corresponding stream record is generated. This real-time logging allows you to integrate with various AWS services—such as Lambda, Kinesis Data Firehose, or Data Analytics—to trigger automated processes or analytical workflows.

## Stream Data Capture Options

DynamoDB Streams supports four configuration options to control the amount of data captured:

1.  **Keys Only**: Only the key attributes of the modified items are recorded.
2.  **New Image**: Captures the entire item as it appears after the modification.
3.  **Old Image**: Records the entire item as it appeared before being modified.
4.  **New and Old Image**: Records both the previous and current versions of the item.

> [!important]
> **Note**
>
> Choose "new and old image" for complete detail when every change is critical to your application. Otherwise, select the option that best matches your data requirements.

![The image illustrates the flow of DynamoDB Streams, showing data moving from a stream through different image types (Keys Only, New Image, Old Image, New and Old Image) to a Lambda function.](https://kodekloud.com/kk-media/image/upload/v1752858805/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams/dynamodb-streams-flow-lambda-function.jpg)

## How It Works in Practice

Consider a scenario where an item in your DynamoDB table changes its status from "In Progress" to "completed." When this change occurs, the event is captured in the DynamoDB stream. Any AWS service listening to this stream—be it an AWS Lambda function or another service like Data Firehose—can then automatically react to this update.

Below is a JSON snippet representing the change:

```
{
    "TodoID": "T1001",
    "Task": "Task 1",
    "DueDate": "2024-03-25",
    "Status": "In Progress"
}
{
    "TodoID": "T1001",
    "Task": "Task 1",
    "DueDate": "2024-03-25",
    "Status": "completed"
}
```

## Key Features of DynamoDB Streams

DynamoDB Streams offers several notable features:

- **Time-Ordered Records**: Stream records are stored in the exact order events occur.
- **Create, Update, and Delete Tracking**: Captures all changes made to table items.
- **24-Hour Retention**: Recorded events are available for up to 24 hours for processing.
- **Seamless AWS Lambda Integration**: Easily trigger AWS Lambda functions to create automated workflows based on data changes.

> [!important]
> **Note**
>
> Leveraging these features, you can build reactive, event-driven applications that respond in real time to changes in your DynamoDB tables.

![The image outlines key features of DynamoDB Streams, including time-ordered processing, item-level changes, 24-hour retention, and integration with AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752858806/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Streams/dynamodb-streams-key-features.jpg)

## Conclusion

DynamoDB Streams efficiently captures a time-ordered sequence of modifications in your DynamoDB tables. With customizable options for capturing varying levels of detail and seamless integration with AWS services, it provides a robust solution for developing real-time, event-driven applications. Whether you're building automated workflows or monitoring data changes, DynamoDB Streams offers the flexibility and reliability needed to drive your application forward.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/3f6302b4-7c6e-4ae6-86d2-642777b35f4a)**
>
> Watch video content
