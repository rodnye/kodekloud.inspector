# Centralized Logging and Monitoring - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/Centralized-Logging-and-Monitoring)

---

## Table of Contents

- Centralized Logging and Monitoring
  - AWS CloudTrail
  - Amazon CloudWatch
  - AWS Config
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# Centralized Logging and Monitoring

Centralized logging and monitoring are critical for maintaining security, compliance, and operational visibility in your AWS environment. By aggregating audit trails, metrics, and resource configurations into a single pane of glass, you can troubleshoot faster, detect anomalies early, and meet regulatory requirements.

In this guide, we’ll show you how to implement centralized logging and monitoring using three AWS services:

| Service           | Purpose                                                 | Key Features                                                              |
| ----------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| AWS CloudTrail    | Records API calls and user activity                     | Full audit trail, log file integrity validation, multi-region trails      |
| Amazon CloudWatch | Collects and visualizes logs and metrics                | Real-time dashboards, alarms, log aggregation, custom metrics             |
| AWS Config        | Assesses, audits, and evaluates resource configurations | Continuous compliance checks, resource change tracking, conformance packs |

## AWS CloudTrail

AWS CloudTrail provides governance, compliance, and risk auditing by capturing all API calls and delivering log files to an Amazon S3 bucket.

```
# Create a new trail that delivers logs to S3
aws cloudtrail create-trail \
  --name MyCloudTrail \
  --s3-bucket-name my-cloudtrail-bucket \
  --is-multi-region-trail


# Start logging events for the trail
aws cloudtrail start-logging \
  --name MyCloudTrail
```

> [!important]
> **Note**
>
> Enable CloudTrail Insights to detect unusual API activities, such as spikes in resource provisioning or configurations changes.

## Amazon CloudWatch

Amazon CloudWatch collects logs and metrics from AWS services and your applications, allowing you to build dashboards, set alarms, and route log data to various targets.

1.  Create a CloudWatch Log Group:

    ```
    aws logs create-log-group --log-group-name /my-application/logs
    ```

2.  Install and configure the CloudWatch Agent on your EC2 instances:

    ```
    # On Amazon Linux 2
    sudo yum install -y amazon-cloudwatch-agent
    sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
    sudo systemctl start amazon-cloudwatch-agent
    ```

3.  Define alarms based on metrics:

    ```
    aws cloudwatch put-metric-alarm \
      --alarm-name HighCPUUtilization \
      --metric-name CPUUtilization \
      --namespace AWS/EC2 \
      --statistic Average \
      --period 300 \
      --threshold 80 \
      --comparison-operator GreaterThanOrEqualToThreshold \
      --dimensions Name=InstanceId,Value=i-0123456789abcdef0 \
      --evaluation-periods 2 \
      --alarm-actions arn:aws:sns:us-east-1:123456789012:NotifyMe
    ```

## AWS Config

AWS Config continuously evaluates resource configurations against desired settings. It records configuration changes and can trigger automated remediation.

```
# Create an S3 bucket and SNS topic for AWS Config delivery
aws s3 mb s3://my-config-bucket
aws sns create-topic --name config-topic


# Set up the configuration recorder
aws configservice put-configuration-recorder \
  --configuration-recorder name=default,roleARN=arn:aws:iam::123456789012:role/AWSConfigRole


# Specify where to deliver configuration snapshots
aws configservice put-delivery-channel \
  --delivery-channel name=default \
  --s3-bucket-name my-config-bucket \
  --sns-topic-arn arn:aws:sns:us-east-1:123456789012:config-topic


# Start recording
aws configservice start-configuration-recorder --configuration-recorder-name default
```

> [!important]
> **Warning**
>
> AWS Config is enabled per region. Be sure to deploy your recorder and delivery channel in each region where you have resources.

## Next Steps

- Consolidate logs from AWS CloudTrail, CloudWatch, and AWS Config into a centralized SIEM or log analytics platform.
- Define custom CloudWatch dashboards to monitor key metrics in real time.
- Use AWS Config Conformance Packs for pre-built compliance frameworks.

## Links and References

- [AWS CloudTrail Documentation](https://docs.aws.amazon.com/cloudtrail/)
- [Amazon CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [AWS Config Documentation](https://docs.aws.amazon.com/config/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/048799c5-bf74-40c3-8607-89445f79440b)**
>
> Watch video content
