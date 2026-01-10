# Event Patterns Scheduled Events and Pipes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/CloudWatch-Events-EventBridge-Event-Buses/Event-Patterns-Scheduled-Events-and-Pipes)

---

## Table of Contents

- Event Patterns Scheduled Events and Pipes
  - 1. Event Patterns
  - 2. Scheduled Events (Schedulers)
  - 3. Pipes
  - Links and References
  - Watch Video
    - Why Use Event Patterns
    - Key Pattern Attributes
    - Example: Match a Database Timeout
    - Rate Expressions
    - Cron Expressions
    - Example: Redacting Sensitive Fields

---

## Content

AWS CloudWatch

CloudWatch Events EventBridge Event Buses

# Event Patterns Scheduled Events and Pipes

In this guide, we’ll explore three core components of event-driven architectures in AWS EventBridge: Event Patterns, Scheduled Events, and Pipes. Mastering these concepts helps you build reliable, maintainable, and scalable systems that respond to events efficiently.

![The image is an infographic titled "Event Patterns, Scheduled Events, and Pipes," describing three concepts: Event Patterns, Scheduler, and Pipes, each with brief explanations of their functions.](https://kodekloud.com/kk-media/image/upload/v1752862432/notes-assets/images/AWS-CloudWatch-Event-Patterns-Scheduled-Events-and-Pipes/event-patterns-scheduled-events-pipes.jpg)

---

## 1\. Event Patterns

Event Patterns filter incoming events based on specific criteria so you only process what matters.

### Why Use Event Patterns

- Focus on critical events (e.g., `DatabaseTimeout`).
- Minimize alert noise and unnecessary processing.
- Improve system performance by discarding irrelevant events.

> [!important]
> **Warning**
>
> Overly broad patterns can flood your pipeline with unwanted events. Too narrow patterns risk missing important alerts.

### Key Pattern Attributes

| Attribute   | Description                        | Example                                |
| ----------- | ---------------------------------- | -------------------------------------- |
| source      | Originating service or application | `["com.myapp.database"]`               |
| detail-type | Event category                     | `["Error"]`                            |
| detail      | JSON object with custom filters    | `{ "errorCode": ["DatabaseTimeout"] }` |

### Example: Match a Database Timeout

```
{
  "source": ["com.myapp.database"],
  "detail-type": ["Error"],
  "detail": {
    "errorCode": ["DatabaseTimeout"]
  }
}
```

This pattern only matches events where:  
• `source` = `com.myapp.database`  
• `detail-type` = `Error`  
• `detail.errorCode` = `DatabaseTimeout`

---

## 2\. Scheduled Events (Schedulers)

Scheduled Events let you trigger rules on a fixed schedule, using either **rate** or **cron** expressions.

### Rate Expressions

Use `rate()` to fire at regular intervals—perfect for heartbeats and metrics.

```
{
  "ScheduleExpression": "rate(1 hour)",
  "State": "ENABLED"
}
```

This rule runs every hour for tasks like health checks or rolling metrics.

### Cron Expressions

Use `cron()` for precise timing—ideal for backups, reports, and maintenance windows.

```
{
  "ScheduleExpression": "cron(0 2 * * ? *)",
  "State": "ENABLED"
}
```

This fires daily at 2:00 AM UTC.

| Schedule Type | Expression          | Use Case                        |
| ------------- | ------------------- | ------------------------------- |
| Rate          | `rate(1 hour)`      | Hourly health checks            |
| Cron          | `cron(0 2 * * ? *)` | Nightly backups/reports at 2 AM |

---

## 3\. Pipes

Pipes connect an event source to a target, optionally transforming the data in transit. Think of them as an assembly line:

1.  **Source**: AWS service or custom producer (e.g., SQS, Kinesis).
2.  **Transformation**: Filter or enrich payloads using `InputTemplate`.
3.  **Target**: AWS service or HTTP endpoint (e.g., Lambda, SNS).

> [!important]
> **Note**
>
> Pipes simplify data flow and reduce the need for custom glue code by handling filtering, mapping, and retry logic automatically.

### Example: Redacting Sensitive Fields

```
Source:
  Arn: arn:aws:sqs:us-east-1:123456789012:my-queue
  Type: SQS
Target:
  Arn: arn:aws:lambda:us-east-1:123456789012:function:process-events
  Type: LAMBDA
InputTemplate: |
  {
    "userId": <$.detail.userId>,
    "action": <$.detail.action>,
    "timestamp": <$.time>
  }
```

Here, the pipe:

- Reads messages from an SQS queue.
- Discards sensitive fields (e.g., `$.detail.password`).
- Invokes a Lambda function with sanitized event data.

---

These three building blocks—Event Patterns, Scheduled Events, and Pipes—form the backbone of event-driven solutions in AWS EventBridge. Use them together to create efficient, scalable, and maintainable event workflows.

---

## Links and References

- [AWS EventBridge Documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/)
- [Scheduling Expressions in EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduled-events.html)
- [EventBridge Pipes Overview](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/943dddff-037a-4401-a679-e39be4809f10/lesson/35a4ef13-7d94-4582-9d13-01b66365c8d6)**
>
> Watch video content
