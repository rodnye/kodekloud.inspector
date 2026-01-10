# CloudWatch Events EventBridge Event Buses - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/CloudWatch-Events-EventBridge-Event-Buses/CloudWatch-Events-EventBridge-Event-Buses)

---

## Table of Contents

- CloudWatch Events EventBridge Event Buses
  - Key Features of EventBridge
  - Real-World Use Case: Order Processing Notifications
  - Next Steps
  - Links and References
  - Watch Video
    - Sample EventBridge Rule (AWS CLI)

---

## Content

AWS CloudWatch

CloudWatch Events EventBridge Event Buses

# CloudWatch Events EventBridge Event Buses

Amazon EventBridge (formerly CloudWatch Events) provides a fully managed event bus for building scalable, event-driven architectures. In this guide, you’ll learn how EventBridge ingests, routes, and processes events—then see it in action with an e-commerce order processing use case.

> [!important]
> **Note**
>
> EventBridge offers both a default event bus and the ability to create custom buses. You can also subscribe to partner SaaS event sources directly.

## Key Features of EventBridge

| Feature                           | Description                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Advanced Routing and Patterns     | Use content-based filters and transforms to route specific events to the right targets.               |
| Reliable Ingestion and Delivery   | Benefit from high throughput, built-in retries, and durable delivery guarantees.                      |
| Flexible Event Sources            | Connect AWS services, custom applications, and third-party SaaS partners on the same event bus.       |
| Schema Registry and Code Bindings | Define, discover, and enforce JSON schemas—then auto-generate client libraries in multiple languages. |

> [!important]
> **Warning**
>
> Be sure to clean up unused rules, buses, and schemas to avoid incurring unexpected charges. See [EventBridge pricing](https://aws.amazon.com/eventbridge/pricing/).

## Real-World Use Case: Order Processing Notifications

Imagine an e-commerce site where, after a successful payment, warehouse staff automatically receive shipping instructions:

1.  A customer places an order via your website, running on an Auto Scaling group of EC2 instances.
2.  The application publishes a `PaymentSucceeded` event to a custom EventBridge bus.
3.  An EventBridge rule matches on `"detail-type": ["PaymentSucceeded"]` and forwards the event to a Lambda function.
4.  The Lambda function formats order details and sends an email to the warehouse team.
5.  Warehouse staff receive the notification, pack the items, and dispatch the shipment.

![The image illustrates a real-world use case of AWS EventBridge, showing a flow from user interaction through an auto-scaling group, successful payment, event triggering, and rule processing with a Lambda function, leading to email notifications and warehouse updates.](https://kodekloud.com/kk-media/image/upload/v1752862422/notes-assets/images/AWS-CloudWatch-CloudWatch-Events-EventBridge-Event-Buses/aws-eventbridge-use-case-flow-diagram.jpg)

### Sample EventBridge Rule (AWS CLI)

```
# Create the rule
aws events put-rule \
  --name PaymentSucceededRule \
  --event-bus-name custom-order-bus \
  --event-pattern '{
    "detail-type": ["PaymentSucceeded"],
    "source": ["com.myapp.orders"]
  }'


# Attach the Lambda target
aws events put-targets \
  --rule PaymentSucceededRule \
  --event-bus-name custom-order-bus \
  --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:123456789012:function:NotifyWarehouse"
```

## Next Steps

1.  Define additional event patterns for order cancellations, returns, or promotions.
2.  Explore the EventBridge schema registry to generate strongly typed client code in Java, Python, or TypeScript.
3.  Integrate third-party SaaS partners (e.g., Stripe, Zendesk) for richer cross-system workflows.

## Links and References

- [Amazon EventBridge Developer Guide](https://docs.aws.amazon.com/eventbridge/latest/userguide/)
- [Working with Event Buses](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-using-event-buses.html)
- [AWS Lambda Integration](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-lambda.html)
- [EventBridge Schema Registry](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-schema.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/943dddff-037a-4401-a679-e39be4809f10/lesson/ba848d79-d0a2-4b66-a026-38616974e61e)**
>
> Watch video content
