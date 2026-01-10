# Event Event Bus and Event Rule - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/CloudWatch-Events-EventBridge-Event-Buses/Event-Event-Bus-and-Event-Rule)

---

## Table of Contents

- Event Event Bus and Event Rule
  - What Is an Event?
  - What Is an Event Bus?
  - What Is an Event Rule?
  - How They Work Together
  - References
  - Watch Video
    - E-Commerce Order Processing Workflow

---

## Content

AWS CloudWatch

CloudWatch Events EventBridge Event Buses

# Event Event Bus and Event Rule

Welcome to this lesson on AWS Events, Event Buses, and Event Rules. By the end of this guide, you’ll understand how these components interact to build decoupled, scalable architectures.

## What Is an Event?

An **event** is a JSON document that captures a state change or activity in your environment. Think of it as a structured message with metadata and payload—whenever something happens (for example, a new order is placed), an event is emitted.

Example event payload:

```
{
  "version": "0",
  "id": "abcd-1234-efgh-5678",
  "detail-type": "OrderPlaced",
  "source": "ecommerce.app",
  "time": "2024-06-01T12:34:56Z",
  "detail": {
    "orderId": "12345",
    "paymentStatus": "SUCCESS",
    "amount": 99.99
  }
}
```

> [!important]
> **Note**
>
> Events are immutable and timestamped. Use descriptive `detail-type` and `source` fields to simplify filtering.

## What Is an Event Bus?

An **event bus** acts as a central router for all your events. AWS EventBridge provides three types of buses:

| Bus Type | Description                                                 |
| -------- | ----------------------------------------------------------- |
| Default  | Automatically available; receives events from AWS services. |
| Custom   | Created by you; receives events from your applications.     |
| Partner  | Ingests events from SaaS partners and third-party services. |

The event bus handles ingestion, filtering, and routing—abstracting away the need to maintain custom message brokers.

## What Is an Event Rule?

An **event rule** inspects incoming events on a bus against a pattern or schedule. When an event matches, the rule routes it to one or more targets (Lambda functions, SNS topics, SQS queues, Step Functions, etc.).

Key features:

- **Pattern matching**: Filter by JSON fields, prefixes, or numeric ranges.
- **Scheduled events**: Trigger actions on cron or rate-based schedules.
- **Multiple targets**: Fan out a single event to various downstream services.

Example rule pattern:

```
{
  "source": ["ecommerce.app"],
  "detail-type": ["OrderPlaced"],
  "detail": {
    "paymentStatus": ["SUCCESS"]
  }
}
```

## How They Work Together

The following table summarizes the roles of each component:

| Component  | Role                                 | Example Target                  |
| ---------- | ------------------------------------ | ------------------------------- |
| Event      | Payload describing a change          | `{ "paymentStatus":"SUCCESS" }` |
| Event Bus  | Central router for events            | Default or custom bus           |
| Event Rule | Filters and forwards matching events | Lambda, SNS, SQS, etc.          |

### E-Commerce Order Processing Workflow

1.  **OrderPlaced** event is emitted when a customer completes checkout.
2.  EventBridge sends the event to the **default event bus**.
3.  An **event rule** filters for `paymentStatus: ["SUCCESS"]`.
4.  Matched events trigger a **Lambda function** that fulfills the order and sends a confirmation email.

```
# Create a rule targeting a Lambda function
aws events put-rule \
  --name ProcessSuccessfulOrders \
  --event-pattern '{
    "source": ["ecommerce.app"],
    "detail-type": ["OrderPlaced"],
    "detail": { "paymentStatus": ["SUCCESS"] }
  }'


aws events put-targets \
  --rule ProcessSuccessfulOrders \
  --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:123456789012:function:FulfillOrder"
```

> [!important]
> **Warning**
>
> Ensure your event rule IAM role has permission to invoke the target service (`lambda:InvokeFunction`, `sns:Publish`, etc.).

## References

- [AWS EventBridge User Guide](https://docs.aws.amazon.com/eventbridge/latest/userguide/)
- [EventBridge Event Patterns](https://docs.aws.amazon.com/eventbridge/latest/userguide/eventbridge-and-event-patterns.html)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/943dddff-037a-4401-a679-e39be4809f10/lesson/f96b75ea-ee12-4639-9f10-8fa2e689220f)**
>
> Watch video content
