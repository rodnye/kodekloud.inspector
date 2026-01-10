# Discovering With CloudWatch Log Insights - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Discovering-With-CloudWatch-Log-Insights)

---

## Table of Contents

- Discovering With CloudWatch Log Insights
  - Example Query: Filtering S3 Events
  - Advanced Query: Natural Language Query Generation
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Discovering With CloudWatch Log Insights

Welcome students. In this article, we explore CloudWatch Log Insights, a powerful feature of Amazon CloudWatch designed to help you gain detailed insights from your log data. Building on our earlier discussions on CloudWatch metrics and logs, this guide focuses on leveraging Log Insights to perform robust queries on your log events, enabling efficient troubleshooting and monitoring.

CloudWatch Log Insights is an analytics tool that allows you to query and visualize log data effortlessly. For instance, if your AWS Lambda functions emit logs to CloudWatch, you can quickly extract trends, identify application errors, detect security breaches, or diagnose performance bottlenecks using Log Insights. Its SQL-like query language supports filtering, aggregation, and immediate visualization, making it a vital tool for operational insights.

![The image is a flowchart illustrating the process of emitting logs from AWS Lambda to Amazon CloudWatch, then to CloudWatch Logs, and finally to CloudWatch Log Insights.](https://kodekloud.com/kk-media/image/upload/v1752859936/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Discovering-With-CloudWatch-Log-Insights/aws-lambda-logs-flowchart.jpg)

Key features of CloudWatch Log Insights include:

- Real-time log analysis
- A powerful query language for filtering and aggregating log data
- Instant visualization and dashboard integrations
- Natural language query generation that converts simple textual requests into complex queries

![The image lists key features of CloudWatch Logs Insights, including real-time log analysis, a powerful query language, visualization and dashboard creation, and natural language query generation.](https://kodekloud.com/kk-media/image/upload/v1752859938/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Discovering-With-CloudWatch-Log-Insights/cloudwatch-logs-insights-features.jpg)

## Example Query: Filtering S3 Events

Let’s consider a scenario where you need to filter log events for AWS S3 operations. The following query retrieves logs related to S3 events by filtering events where the source is identified as S3:

```
fields @timestamp, @message
| filter @message like /"eventSource":"s3.amazonaws.com"/
```

In CloudWatch logs, each event includes a timestamp and a message field. The message can contain various details, such as user identity or event source. This query extracts the necessary fields and filters log events to display only those associated with S3.

> [!important]
> **Saving Queries**
>
> You can save your queries using the "Save" option in the upper-right area of the CloudWatch Logs Insights console. This makes it easier to reuse and organize your frequently used queries.

Once the logs are filtered, visualizing the query results is straightforward. CloudWatch Log Insights supports multiple graph types, including line, stacked area, bar, and pie charts. These visualization widgets can be incorporated into CloudWatch Dashboards to build comprehensive monitoring views.

![The image shows four types of data visualization options: Line, Stacked Area, Bar, and Pie charts, each represented by a colorful icon.](https://kodekloud.com/kk-media/image/upload/v1752859938/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Discovering-With-CloudWatch-Log-Insights/data-visualization-line-area-bar-pie.jpg)

## Advanced Query: Natural Language Query Generation

Another powerful capability of CloudWatch Log Insights is its natural language query generation. For example, if you want to fetch logs where a user is uploading objects to an S3 bucket, you might start with a natural language request. The system then converts this request into a query similar to the one below:

```
fields @timestamp, @message, userIdentity.userName, requestParameters.bucketName
| filter strcontains(@message, "PUT") and strcontains(@message, "s3") and strcontains(@message, "upload")
```

This query retrieves the timestamp, message, user name, and bucket name from your log events, filtering for entries that contain the terms "PUT", "s3", and "upload". Keep in mind that the query works within the context of the selected log group, which aggregates the relevant log streams containing multiple events.

## Conclusion

CloudWatch Log Insights empowers you to analyze log data efficiently with its robust query capabilities and integrated visualization options. Whether it's real-time log analysis or creating detailed dashboards, the tool is an essential component for monitoring applications and troubleshooting issues in your AWS environment.

We'll see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/9811f808-b19c-4a1c-867a-4fa6d8e98f7b)**
>
> Watch video content
