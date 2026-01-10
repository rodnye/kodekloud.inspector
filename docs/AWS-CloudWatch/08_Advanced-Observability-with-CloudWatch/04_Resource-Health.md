# Resource Health - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Advanced-Observability-with-CloudWatch/Resource-Health)

---

## Table of Contents

- Resource Health
  - Key Features
  - Prerequisites
  - Benefits
  - Next Steps
  - References
  - Watch Video

---

## Content

AWS CloudWatch

Advanced Observability with CloudWatch

# Resource Health

AWS CloudWatch Resource Health provides an automated, unified solution for discovering, monitoring, and managing the health and performance of your EC2 instances. With zero additional cost, you gain real-time visibility into key metrics, fully customizable dashboards, and centralized alerts to streamline operations and troubleshooting.

## Key Features

| Feature                      | Benefit                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| Automated Discovery          | Instantly discovers all EC2 instances and begins monitoring without manual setup.          |
| Centralized Dashboard        | Offers a single pane of glass across accounts and regions to spot trends and anomalies.    |
| Customizable Views & Filters | Drill into CPU, memory, network I/O or filter by tag, instance type, or availability zone. |
| Grouping & Sorting           | Organize instances by custom tags, AZ, or type to quickly isolate performance issues.      |
| Real-Time Monitoring         | See live updates on all metrics, enabling faster response to unexpected behavior.          |

## Prerequisites

- Install the CloudWatch agent on each EC2 instance to collect OS-level metrics (memory, disk, etc.).
- Configure IAM roles and policies to allow the agent to push metrics and grant users dashboard viewing rights.

> [!important]
> **Warning**
>
> Memory and disk metrics are not collected by default. Ensure the CloudWatch agent configuration file includes the appropriate sections for `mem_used_percent`, `disk_used_percent`, and any other OS-level metrics you require.> [!important]
> **Note**
>
> Your IAM policy must include permissions such as `cloudwatch:PutMetricData`, `logs:CreateLogStream`, `logs:PutLogEvents`, and `cloudwatch:GetDashboard` to fully leverage Resource Health.

## Benefits

- **Improved Troubleshooting:** Quickly pinpoint underutilized or overutilized instances with contextual metrics.
- **Performance Analysis:** Combine historical and real-time data to optimize capacity planning.
- **Zero Additional Cost:** Resource Health is included at no extra charge for all AWS customers.

## Next Steps

1.  Deploy the CloudWatch agent using the AWS Systems Manager Run Command.
2.  Create a Resource Health dashboard and apply custom filters for your critical workloads.
3.  Explore automated alerts and integrate with Amazon SNS or third-party tools for notifications.

![The image is an infographic about "Resource Health in AWS CloudWatch," highlighting features like automated discovery, centralized views, customizable filters, and no additional charges for AWS customers.](https://kodekloud.com/kk-media/image/upload/v1752862355/notes-assets/images/AWS-CloudWatch-Resource-Health/resource-health-aws-cloudwatch-infographic.jpg)

## References

- [AWS CloudWatch Resource Health Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ResourceHealth.html)
- [Installing and Configuring the CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent.html)
- [AWS Identity and Access Management User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/74326609-21c0-467c-a033-b526c2af16f2/lesson/16b3cfc5-f69a-419b-9796-87b2a0eab423)**
>
> Watch video content
