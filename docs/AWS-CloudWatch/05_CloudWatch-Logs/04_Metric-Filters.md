# Metric Filters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/CloudWatch-Logs/Metric-Filters)

---

## Table of Contents

- Metric Filters
  - What Is a Metric Filter?
  - How It Works
  - Example: Tracking HTTP 404 Errors
  - Real-World Use Cases
  - Links and References
  - Watch Video
    - 1. Define the Filter Pattern
    - 2. Associate with Your Log Group
    - 3. Publish Metric Data
    - 4. Create an Alarm

---

## Content

AWS CloudWatch

CloudWatch Logs

# Metric Filters

In this guide, you’ll learn how to convert key log events into actionable metrics using Amazon CloudWatch **metric filters**. After your applications push log events to CloudWatch Logs, metric filters let you scan for patterns and generate custom metrics. You can then graph these metrics, set alarms, and include them in dashboards for real‐time visibility.

## What Is a Metric Filter?

A **metric filter** inspects each log event in a CloudWatch Logs group against a _filter pattern_. Whenever an event matches, CloudWatch Logs emits a metric datum—either incrementing a counter or setting a value. Once published, you can:

- Trigger CloudWatch Alarms
- Plot the data on CloudWatch Dashboards
- Automate responses with EventBridge or Lambda

> [!important]
> **Note**
>
> Metric filters operate in near real‐time and can be applied to both text and JSON‐formatted logs.

## How It Works

1.  Define a **filter pattern** (e.g., `"ERROR"`, `"[timestamp, requestId, ...]"`).
2.  Attach the filter to a **log group** in CloudWatch Logs.
3.  Configure the filter to **publish metric data**—choose a namespace, metric name, and value.
4.  Use CloudWatch Metrics to **visualize** data or **set alarms** on thresholds.

![The image illustrates the process of using metric filters to search and parse CloudWatch logs for HTTP 404 errors, converting them into custom CloudWatch metrics.](https://kodekloud.com/kk-media/image/upload/v1752862466/notes-assets/images/AWS-CloudWatch-Metric-Filters/cloudwatch-logs-metric-filters-404-errors.jpg)

## Example: Tracking HTTP 404 Errors

Monitor spikes in “HTTP 404” errors by turning each occurrence into a custom metric.

### 1\. Define the Filter Pattern

```
{
  "filterName": "HTTP404Filter",
  "filterPattern": "HTTP 404",
  "metricTransformations": [
    {
      "metricName": "MyApp-404Errors",
      "metricNamespace": "MyApp/Metrics",
      "metricValue": "1"
    }
  ]
}
```

### 2\. Associate with Your Log Group

```
aws logs put-metric-filter \
  --log-group-name "/aws/lambda/my-function" \
  --filter-name HTTP404Filter \
  --filter-pattern "HTTP 404" \
  --metric-transformations \
      metricName=MyApp-404Errors,metricNamespace=MyApp/Metrics,metricValue=1
```

### 3\. Publish Metric Data

Each time a log line contains `HTTP 404`, CloudWatch Logs will emit a `MyApp-404Errors` metric with a value of `1`.

### 4\. Create an Alarm

```
aws cloudwatch put-metric-alarm \
  --alarm-name "High-404-Rate" \
  --metric-name MyApp-404Errors \
  --namespace "MyApp/Metrics" \
  --statistic Sum \
  --period 300 \
  --threshold 50 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --evaluation-periods 1 \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:alerts-topic
```

> [!important]
> **Warning**
>
> Overly broad filter patterns can lead to high metric‐filter charges. Always scope patterns tightly and test with sample logs.

## Real-World Use Cases

| Use Case         | Filter Pattern             | Metric Name           |
| ---------------- | -------------------------- | --------------------- |
| API Latency      | `{ $.latency = * }`        | MyApp/APIResponseTime |
| Login Failures   | `"Authentication failure"` | MyApp/LoginFailures   |
| Disk Utilization | `{ $.diskUsage > 80 }`     | MyApp/DiskUtilization |
| Database Errors  | `"SQL ERROR"`              | MyApp/DatabaseErrors  |

By converting logs into metrics, you gain precise, real-time insight into system behavior—enabling faster troubleshooting and proactive alerting.

## Links and References

- [CloudWatch Logs Metric Filters](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html)
- [AWS CLI put-metric-filter](https://docs.aws.amazon.com/cli/latest/reference/logs/put-metric-filter.html)
- [Creating AWS CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/9fa50074-5184-4ea1-a0fb-233788bf9666/lesson/95e88558-1264-4bc9-9fc0-560f4fe81b34)**
>
> Watch video content
