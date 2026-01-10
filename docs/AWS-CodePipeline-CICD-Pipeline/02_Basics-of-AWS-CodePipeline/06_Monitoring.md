# Monitoring - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CodePipeline-CICD-Pipeline/Basics-of-AWS-CodePipeline/Monitoring)

---

## Table of Contents

- Monitoring
  - What Can You Monitor in CodePipeline?
  - Amazon EventBridge
  - AWS CloudTrail, Amazon S3 & Amazon SNS
  - Summary of Monitoring Options
  - References
  - Watch Video
    - Supported Event Levels

---

## Content

AWS CodePipeline (CI/CD Pipeline)

Basics of AWS CodePipeline

# Monitoring

Effective monitoring is crucial for identifying and troubleshooting CI/CD pipeline issues—such as a build stage that never starts. In this guide, we’ll explore how to monitor AWS CodePipeline at multiple levels and integrate with AWS services for alerts and log retention.

## What Can You Monitor in CodePipeline?

A single AWS account can host multiple pipelines. Each pipeline consists of stages (Source, Build, Test, Deploy), and each stage contains one or more actions. You can set up monitoring at three levels:

- Pipeline
- Stage
- Action

![The image shows a pipeline diagram labeled "MyPipeline" with four stages: Source, Build, Test, and Deploy, each represented by a circle with additional sub-circles below them.](https://kodekloud.com/kk-media/image/upload/v1752862564/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Monitoring/mypipeline-pipeline-diagram-four-stages.jpg)

## Amazon EventBridge

Amazon EventBridge is the primary service for reacting to CodePipeline events. It follows a publisher/subscriber model: AWS services publish events, and you define rules to trigger targets such as Lambda, SNS, or SQS.

> [!important]
> **Note**
>
> By default, AWS publishes pipeline events to EventBridge at no cost. You only incur charges for custom, cross-account, or third-party events ($1 per 1 million events).

### Supported Event Levels

| Level    | Event Types                           |
| -------- | ------------------------------------- |
| Pipeline | Started, Stopped, Succeeded, Failed   |
| Stage    | Started, Succeeded, Failed            |
| Action   | Started, Succeeded, Failed, Abandoned |

![The image shows a diagram titled "Pipeline Events" with four stages: Started, Stopped, Succeeded, and Failed, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752862566/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Monitoring/pipeline-events-diagram-four-stages.jpg)

![The image is an informational graphic about Amazon EventBridge, highlighting features such as AWS account integration, publisher/subscriber model, free default event publishing, cross-account access, and third-party access.](https://kodekloud.com/kk-media/image/upload/v1752862567/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Monitoring/amazon-eventbridge-features-graphic.jpg)

For more details, see [Amazon EventBridge Documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/).

## AWS CloudTrail, Amazon S3 & Amazon SNS

While EventBridge handles high-level pipeline events, AWS CloudTrail records **every** API call and user action across AWS services. Since CodePipeline orchestrates other services (for example, CodeCommit or CodeBuild), CloudTrail captures those underlying API calls.

- **Amazon S3**: Store CloudTrail logs for durable, scalable retention.
- **Amazon SNS**: Configure notifications for critical events, such as API call failures.

![The image is a diagram showing AWS CloudTrail sending notifications to Amazon SNS and log files to Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752862568/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Monitoring/aws-cloudtrail-sns-s3-diagram.jpg)

> [!important]
> **Warning**
>
> Consider the volume of CloudTrail logs when designing S3 lifecycle policies and SNS subscription limits to avoid unexpected costs.

## Summary of Monitoring Options

| Service            | Use Case                                                  |
| ------------------ | --------------------------------------------------------- |
| Amazon EventBridge | Real-time response to pipeline, stage, and action events  |
| AWS CloudTrail     | Audit trail of API calls made by CodePipeline             |
| Amazon S3          | Durable storage for large volumes of CloudTrail log files |
| Amazon SNS         | Alerting and notifications based on log events            |

![The image is a summary slide showing AWS EventBridge and AWS CloudTrail, along with configuration options at pipeline, stage, and action levels.](https://kodekloud.com/kk-media/image/upload/v1752862569/notes-assets/images/AWS-CodePipeline-CICD-Pipeline-Monitoring/aws-eventbridge-cloudtrail-summary-slide.jpg)

## References

- [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/)
- [Amazon EventBridge User Guide](https://docs.aws.amazon.com/eventbridge/latest/userguide/)
- [AWS CloudTrail Documentation](https://docs.aws.amazon.com/cloudtrail/latest/userguide/)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Amazon SNS Documentation](https://docs.aws.amazon.com/sns/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-codepipeline-ci-cd-pipeline/module/d9d0a786-1e14-426c-a9c6-7fe75f543824/lesson/9e0e45f3-0131-4a8e-8057-8aa6497caa88)**
>
> Watch video content
