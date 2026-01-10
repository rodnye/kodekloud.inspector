# Mandatory best practice - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/EC2-Real-Life-Problems-and-Solutions/Mandatory-best-practice)

---

## Table of Contents

- Mandatory best practice
  - Challenges Faced by Alex
  - Key Benefits of Tagging
  - Defining a Consistent Tagging Strategy
  - Implementing the Strategy at Acme Corporation
  - References
  - Watch Video
    - Service-Specific Tags

---

## Content

Amazon Elastic Compute Cloud (EC2)

EC2 Real Life Problems and Solutions

# Mandatory best practice

Managing large-scale EC2 fleets demands clear identification, cost visibility, and automation. In this guide, we’ll show how Acme Corporation’s engineer Alex standardizes tagging to meet application, finance, and business needs.

## Challenges Faced by Alex

- Autoscaling clouds the exact count of running instances per application.
- Hundreds of servers make resource pinpointing difficult.
- Finance needs accurate cost attribution; application teams need performance metrics.

AWS supports up to 50 key–value tags per resource. You can filter and manage these tags via the AWS CLI, SDKs, or the console for services like CloudWatch and Cost Explorer.

![The image is a diagram illustrating AWS Tagging, showing how AWS CLI and AWS API interact with tags like "app = backend" and "app = frontend" for services like CloudWatch and AWS Billing.](https://kodekloud.com/kk-media/image/upload/v1752869088/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Mandatory-best-practice/aws-tagging-diagram-cli-api.jpg)

## Key Benefits of Tagging

- Track server utilization metrics in real time.
- Generate chargeback reports by application.
- Automate workflows (start/stop schedules).
- Filter metrics in CloudWatch and costs in Cost Explorer.

---

## Defining a Consistent Tagging Strategy

To ensure organization-wide consistency, Alex establishes a set of **standard tags** and expands them with service-specific keys.

| Tag Key          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| name             | Resource identifier (e.g., `web-service`)   |
| environment      | `prod`, `staging`, `non-prod`               |
| team             | Owning team (e.g., `alpha`)                 |
| service          | Application or service name (e.g., `login`) |
| business\\\_unit | Business unit (e.g., `customer_support`)    |
| owner            | Resource owner or contact email             |

> [!important]
> **Note**
>
> Adjust tag values to match your naming conventions and compliance requirements.

### Service-Specific Tags

For EC2 instances that should start and stop automatically, Alex adds:

- `start_time` – Desired start hour (24-hour format)
- `stop_time` – Desired stop hour

A Lambda function leverages these tags to schedule instance state changes.

![The image outlines AWS tagging standards, including default tags like name and environment, and service-specific tags for EC2 and Lambda.](https://kodekloud.com/kk-media/image/upload/v1752869089/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Mandatory-best-practice/aws-tagging-standards-ec2-lambda.jpg)

Additional tags can be added based on new services or evolving business needs.

---

## Implementing the Strategy at Acme Corporation

1.  **Apply Default Tags**  
    All AWS resources receive the six standard tags.
2.  **Add Service-Specific Tags**  
    EC2 instances include `start_time`/`stop_time` for automated scheduling.
3.  **Configure Monitoring**  
    In CloudWatch, filter metrics by the `service` tag to satisfy application teams.
4.  **Enable Cost Reporting**  
    In Cost Explorer, filter by `business_unit` and `environment` to deliver finance chargebacks.
5.  **Set Budget Alerts**  
    Create budget alarms (e.g., at 80% spend) using cost and application-specific tags so teams act before overages.
6.  **Automate Cost Savings**  
    Stop non-production instances outside business hours to cut compute costs by up to 50%.

Example tags for a non-production web service:

```
# Default Tags
name = web-service
environment = non-prod
team = alpha
service = login
business_unit = customer_support
owner = alex


# EC2 Service-Specific Tags
start_time = 08:00
stop_time = 20:00
```

> [!important]
> **Warning**
>
> Inconsistent tagging can lead to gaps in automation and cost reporting. Enforce tag policies with AWS Organizations or Service Catalog.

## References

- [AWS Tagging Strategies](https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html)
- [Tagging Your Amazon EC2 Resources](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html)
- [AWS CLI: ec2 create-tags](https://docs.aws.amazon.com/cli/latest/reference/ec2/create-tags.html)
- [Amazon CloudWatch User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
- [AWS Cost Explorer API Reference](https://docs.aws.amazon.com/aws-cost-management/latest/APIReference/Welcome.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/1132ee02-eae9-44e0-a8a5-8f325254ba92/lesson/c88d1dd0-2bd0-410d-8d2e-a7c5c50a1a30)**
>
> Watch video content
