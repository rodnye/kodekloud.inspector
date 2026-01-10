# Synthetics Canaries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Advanced-Observability-with-CloudWatch/Synthetics-Canaries)

---

## Table of Contents

- Synthetics Canaries
  - Historical Background: Coal Mines and Canaries
  - What Are Synthetic Canaries?
  - Continuous Monitoring and Performance Insights
  - Seamless Integration with AWS Services
  - Diagnostics: Screenshots and HAR Files
  - Metrics and Logs Analysis
  - Cost Considerations for Canary Execution
  - Links and References
  - Watch Video

---

## Content

AWS CloudWatch

Advanced Observability with CloudWatch

# Synthetics Canaries

In this article, learn how AWS CloudWatch Synthetic Canaries proactively monitor your applications by mimicking user interactions. We’ll explore origins, features, integrations, diagnostics, and cost considerations to help you maintain flawless user experiences.

## Historical Background: Coal Mines and Canaries

Early 20th-century coal miners used canaries to detect toxic gases like carbon monoxide and methane. Because canaries are more sensitive, their distress signaled miners to evacuate before gas levels became lethal.

![The image depicts three cartoon miners working in a mine, with one holding a pickaxe, another pushing a cart, and the third using a tool.](https://kodekloud.com/kk-media/image/upload/v1752862356/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/cartoon-miners-working-in-mine.jpg)

When gas levels rose, canaries reacted immediately, giving miners a vital early warning system.

![The image shows several cloud-like shapes labeled "CH4" and a small bird with a speech bubble, set against a dark background.](https://kodekloud.com/kk-media/image/upload/v1752862358/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/cloud-shapes-ch4-bird-speech-bubble.jpg)

Today’s monitoring tools borrow this concept to catch anomalies before they impact users.

## What Are Synthetic Canaries?

Synthetic Canaries in AWS CloudWatch are automated scripts running on a schedule to test your application's endpoints, APIs, and workflows. Acting like a virtual QA team, they ensure availability and functionality.

- Fully managed, serverless monitoring
- Scripts written in Node.js or Python
- Simulate real user actions (navigation, clicks, form submissions)

![The image is an infographic about Synthetics Canaries in AWS CloudWatch, highlighting features like lightweight automation, configurable scripts, user interaction simulation, and application functionality testing.](https://kodekloud.com/kk-media/image/upload/v1752862359/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/synthetics-canaries-aws-cloudwatch-infographic.jpg)

> [!important]
> **Note**
>
> Synthetic Canaries support [Selenium/WebDriver](https://aws.amazon.com/cloudwatch/features/#Synthetics) in Node.js and Python for custom workflows.

## Continuous Monitoring and Performance Insights

With CloudWatch Synthetics, you gain real-time visibility into availability and performance metrics:

- Measure response times and latency distributions
- Track HTTP status codes and error rates
- Trigger alerts on threshold breaches

This continuous vigilance helps detect degradations immediately, reducing mean time to resolution.

![The image is an informational graphic about Synthetics Canaries in AWS CloudWatch, highlighting features like continuous monitoring, application and endpoint monitoring, and real-time performance data.](https://kodekloud.com/kk-media/image/upload/v1752862360/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/synthetics-canaries-aws-cloudwatch-graphic.jpg)

## Seamless Integration with AWS Services

Synthetic Canaries connect monitoring events to automated workflows across AWS:

| AWS Service       | Use Case                                  | Example                                                              |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| CloudWatch Alarms | Trigger alerts on canary failures         | Create an alarm on the `CanaryFailed` metric                         |
| AWS Lambda        | Run remediation scripts or rollbacks      | Invoke a Lambda function to restart a service                        |
| Step Functions    | Orchestrate multi-step incident workflows | Chain alerts, notifications, and recovery actions in a state machine |

![The image is a slide about "Synthetics Canaries in AWS CloudWatch," highlighting integration features such as seamless integration with AWS services, CloudWatch Alarms, AWS Lambda, AWS Step Functions, and action triggers based on monitoring results.](https://kodekloud.com/kk-media/image/upload/v1752862361/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/synthetics-canaries-aws-cloudwatch-slide.jpg)

## Diagnostics: Screenshots and HAR Files

When a canary runs, it captures artifacts for in-depth analysis:

- Full-page screenshots at key script steps
- HAR (HTTP Archive) files with detailed request/response traces

These artifacts act as your application’s “black box,” enabling forensic troubleshooting.

![The image is a slide titled "Synthetics Canaries in AWS CloudWatch," highlighting the role of screenshots and HAR files in capturing performance insights and aiding troubleshooting.](https://kodekloud.com/kk-media/image/upload/v1752862362/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/synthetics-canaries-aws-cloudwatch-insights.jpg)

## Metrics and Logs Analysis

Every canary execution emits CloudWatch metrics and logs. Use CloudWatch Logs Insights and dashboards to:

- Track success/failure rates over time
- Correlate latency spikes with deployments
- Drill into error stack traces for root-cause analysis

![The image is about "Synthetics Canaries in AWS CloudWatch," focusing on metrics and logs, and their role in analyzing canary-generated data to gain insights into application behavior.](https://kodekloud.com/kk-media/image/upload/v1752862363/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/synthetics-canaries-aws-cloudwatch-insights-2.jpg)

## Cost Considerations for Canary Execution

Synthetic Canaries use a pay-as-you-go model:

| Cost Component          | Description                                    |
| ----------------------- | ---------------------------------------------- |
| Canary runs             | Charged per run based on schedule frequency    |
| Compute duration        | Billed per second of script execution          |
| Data transfer & storage | For HAR files, screenshots, and logs retention |

![The image is a diagram about "Synthetics Canaries in AWS CloudWatch," focusing on "Canary Execution Costs," which include charges based on canary runs, payment for each run, script execution time, and data transfer costs.](https://kodekloud.com/kk-media/image/upload/v1752862364/notes-assets/images/AWS-CloudWatch-Synthetics-Canaries/synthetics-canaries-aws-cloudwatch-diagram.jpg)

> [!important]
> **Warning**
>
> Longer scripts and high-frequency runs can increase costs. Regularly review your canary schedules and artifact retention settings to optimize spend.

---

By deploying Synthetic Canaries in AWS CloudWatch, you gain proactive, end-to-end monitoring to maintain optimal availability and performance for your users.

## Links and References

- [AWS CloudWatch Synthetics Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics.html)
- [AWS CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/)
- [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/74326609-21c0-467c-a033-b526c2af16f2/lesson/06e53257-8ddd-4609-8920-b8803ed4817e)**
>
> Watch video content
