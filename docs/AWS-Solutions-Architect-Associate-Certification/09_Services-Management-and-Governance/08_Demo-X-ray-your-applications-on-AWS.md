# Demo X ray your applications on AWS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/Demo-X-ray-your-applications-on-AWS)

---

## Table of Contents

- Demo X ray your applications on AWS
  - Getting Started
  - Exploring the Service Map
  - Analyzing Individual Traces
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# Demo X ray your applications on AWS

In this lesson, we explore how to leverage AWS X-Ray for analyzing application traces. The demonstration outlines working with the AWS X-Ray console to visualize, filter, and diagnose issues in your application's performance. An application has already been created, deployed on AWS, and instrumented using X-Ray libraries to capture and send trace data. This guide explains how to navigate the X-Ray console, interpret trace segments, and filter trace data for troubleshooting purposes.

> [!important]
> **Prerequisite**
>
> Ensure your application is correctly instrumented with the AWS X-Ray SDK to capture trace data effectively.

## Getting Started

Start by searching for "X-Ray" in the AWS Management Console, where you will discover that the X-Ray service is integrated within CloudWatch.

![The image shows the AWS Management Console with a search for "xray," displaying results related to AWS X-Ray services, resources, and documentation. On the right, there is a panel showing AWS Health information.](https://kodekloud.com/kk-media/image/upload/v1752865342/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-X-ray-your-applications-on-AWS/aws-management-console-xray-search.jpg)

If you navigate to CloudWatch, you will notice a dedicated section for X-Ray. This section is organized into two subsections: Service Map and Traces.

## Exploring the Service Map

The Service Map provides a visual diagram detailing the interconnected components of your application. In the diagram below, the client (front-end user) sends a request to the scorekeep application running on an ECS container. This container then interacts with various components, such as:

- The scorekeep notification SNS topic
- Multiple DynamoDB tables for state, session, move, and game data

These interactions are clearly represented in the trace.

![The image shows an AWS CloudWatch service map interface, displaying a network of interconnected services and nodes. The layout includes various AWS components like ECS containers and DynamoDB tables.](https://kodekloud.com/kk-media/image/upload/v1752865344/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-X-ray-your-applications-on-AWS/aws-cloudwatch-service-map-interface.jpg)

At the top of the interface, select a time frame (e.g., last 5 minutes or last 15 minutes). Clicking on a specific node will display all the traces involving that node. For instance, clicking a node reveals metrics like latency, request counts, total faults (including 500 status code failures), and response time distributions.

![The image shows an AWS CloudWatch service map interface displaying metrics for a DynamoDB table named "scorekeep-game," including latency, requests, and faults over time.](https://kodekloud.com/kk-media/image/upload/v1752865346/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-X-ray-your-applications-on-AWS/aws-cloudwatch-dynamodb-scorekeep-metrics.jpg)

The dashboard below highlights how metrics and traces are presented. Traces with failures or errors are emphasized, enabling rapid identification of problematic segments.

![The image shows an AWS CloudWatch dashboard displaying metrics and traces for various services, including latency graphs and trace details with response times and HTTP methods.](https://kodekloud.com/kk-media/image/upload/v1752865347/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-X-ray-your-applications-on-AWS/aws-cloudwatch-dashboard-metrics-traces.jpg)

## Analyzing Individual Traces

When you click on a trace, you will see the individual segments that form it. For example, a trace might begin with a request from your ECS container that interacts with the scorekeeping game table. In a simple trace, operations such as a "get item" on a DynamoDB table are segmented along with their durations.

Consider the following query that captures a segment related to the scorekeep game table:

```
service(id:{name:"scorekeep-game", type:"AWS::DynamoDB::Table"})
```

This query indicates that the application sends a get item request to the scorekeep game table, in addition to performing operations like retrieving an item from the scorekeep state table and sending an SNS notification. By examining the duration of each segment, you can pinpoint operations that may be increasing overall latency.

![The image shows an AWS CloudWatch Segments Timeline, displaying the performance of various operations like DynamoDB and SNS with their response codes, durations, and statuses.](https://kodekloud.com/kk-media/image/upload/v1752865348/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-X-ray-your-applications-on-AWS/aws-cloudwatch-segments-timeline.jpg)

If a fault occurs (for example, a 500 error), the trace will highlight the location of the failure. The diagram below identifies a fault in the "Scorekeep" service, making it easier to isolate the problematic component.

![The image shows an AWS CloudWatch console with a service map and segments timeline, indicating a fault in the "Scorekeep" service with a 5xx error. The timeline displays response codes and durations for different segments, including DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752865349/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-X-ray-your-applications-on-AWS/aws-cloudwatch-scorekeep-error-timeline.jpg)

To view all traces within the selected time frame without filtering for a specific component, simply remove the current filter query and execute the query again. This will provide a comprehensive list of all captured traces. You can then click on each segment to view detailed information such as response codes and operation durations (e.g., 3 milliseconds, 2 milliseconds, etc.).

![The image shows an AWS CloudWatch console displaying a segments timeline for a service called "Scorekeep," with various DynamoDB operations and their response times.](https://kodekloud.com/kk-media/image/upload/v1752865350/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-X-ray-your-applications-on-AWS/aws-cloudwatch-scorekeep-timeline.jpg)

Moreover, refine your queries by selecting specific nodes. For example, adding a filter for traces that involve both the SNS topic and the scorekeep game table may yield a detailed list of 43 traces, complete with response time distributions and additional metrics.

## Conclusion

This lesson demonstrates how AWS X-Ray serves as a powerful tool for tracing and monitoring your applications. By instrumenting your application with X-Ray and analyzing trace data in CloudWatch, you gain valuable insights into the journey of a request, allowing you to identify bottlenecks and enhance performance.

For more information on AWS X-Ray, consider exploring the following resources:

- [AWS X-Ray Documentation](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)
- [CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)

Thank you for reading this demonstration. We hope you found this step-by-step guide helpful, and we look forward to sharing more advanced lessons in the future.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/14fa5b62-0e96-46a1-a9f3-2d111503a130)**
>
> Watch video content
