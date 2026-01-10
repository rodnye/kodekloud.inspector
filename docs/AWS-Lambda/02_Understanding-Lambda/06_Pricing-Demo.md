# Pricing Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Understanding-Lambda/Pricing-Demo)

---

## Table of Contents

- Pricing Demo
  - Why Use the AWS Pricing Calculator for Lambda?
  - Example Scenario
  - 1. Access the AWS Pricing Calculator
  - 2. Create a New Estimate
  - 3. Configure Your Lambda Estimate
  - 4. Review the Cost Estimate
  - 5. Experiment with Settings
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

AWS Lambda

Understanding Lambda

# Pricing Demo

Unlock accurate cost projections for your AWS Lambda functions using the AWS Pricing Calculator. Forecast monthly expenses by specifying key parameters—such as memory, execution time, architecture, and storage—and fine-tune your configuration to find the most cost-effective setup.

## Why Use the AWS Pricing Calculator for Lambda?

- Generate precise cost estimates without guessing
- Compare CPU architectures (ARM vs. x86)
- Test storage, memory, and duration impacts instantly
- Export calculation details for budgets and reports

## Example Scenario

We’ll estimate monthly costs for a Lambda function with these characteristics:

| Metric               | Value          |
| -------------------- | -------------- |
| Requests per Month   | 10,000,000     |
| Duration per Request | 500 ms         |
| Memory Allocation    | 512 MB         |
| Ephemeral Storage    | 512 MB         |
| Architecture         | ARM (Graviton) |

## 1\. Access the AWS Pricing Calculator

Open your browser and go to https://calculator.aws. No AWS account or sign-in is required.

## 2\. Create a New Estimate

1.  Click **Create estimate**.
2.  In **Search all services**, type **Lambda** and select **AWS Lambda**.
3.  Click **Configure**.

![The image shows the AWS Pricing Calculator interface, specifically the "Select service" section, where users can search for and configure AWS services like AWS Lambda, AWS Step Functions, and AWS AppSync.](https://kodekloud.com/kk-media/image/upload/v1752863183/notes-assets/images/AWS-Lambda-Pricing-Demo/aws-pricing-calculator-select-service.jpg)

## 3\. Configure Your Lambda Estimate

On the Lambda configuration page, enter the following:

1.  **Description**  
    e.g., `KodeKloud Lambda Test`
2.  **Region**  
    Select **US East (N. Virginia)** for this demo.
3.  **Free Tier**

    > [!important]
    > **Note**
    >
    > By default, AWS includes the free tier (1M requests and 400,000 GB-seconds). Deselect **Include free tier** to see actual charges.

4.  **Architecture**  
    Choose **ARM** (Graviton) for lower compute costs (default is x86).
5.  **Monthly Requests**  
    Enter `10000000`.
6.  **Duration per Request**  
    Enter `500 ms`.
7.  **Memory (MB)**  
    Enter `512`.
8.  **Ephemeral Storage (MB)**  
    Keep the default `512`.

After inputting these values, the calculator displays a cost forecast.

![The image shows the AWS Pricing Calculator interface for configuring an AWS Lambda service, with options to include or exclude the free tier and select a region.](https://kodekloud.com/kk-media/image/upload/v1752863184/notes-assets/images/AWS-Lambda-Pricing-Demo/aws-pricing-calculator-lambda-interface.jpg)

## 4\. Review the Cost Estimate

With our configuration, the estimated monthly cost is **$29.80**.

![The image shows the AWS pricing calculator interface for configuring AWS Lambda, with fields for the number of requests, duration, memory, and storage allocation. The total monthly cost is displayed at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752863185/notes-assets/images/AWS-Lambda-Pricing-Demo/aws-pricing-calculator-lambda-interface-2.jpg)

## 5\. Experiment with Settings

Use this table to explore how changes affect your monthly bill:

| Parameter              | Change                             | Estimated Impact                       |
| ---------------------- | ---------------------------------- | -------------------------------------- |
| Baseline               | 512 MB mem, 512 MB storage, 500 ms | **$29.80** (monthly)                   |
| Ephemeral Storage      | 10 GB (max)                        | +$1.47 (≈5%) → **$31.27**              |
| Memory Allocation      | 10 GB (max)                        | +$633.34 (≈2,125%) → **$663.14**       |
| Execution Duration     | 900,000 ms (15 min max)            | Significant increase; optimize runtime |
| Processor Architecture | x86 (default)                      | Higher compute cost vs. ARM            |

> [!important]
> **Warning**
>
> Long function durations and large memory allocations can dramatically raise your AWS Lambda bill. Always profile and optimize your code to minimize runtime.

## Conclusion

In this guide, you learned how to:

- Access the AWS Pricing Calculator
- Configure a Lambda cost estimate step by step
- Analyze pricing impacts of architecture, memory, storage, and execution time

Next, dive deeper into Lambda performance tuning and cost optimization strategies.

## Links and References

- [AWS Pricing Calculator](https://calculator.aws)
- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/fdb5ec1b-18a2-4034-baed-3231f187825b/lesson/862be1c1-2852-4b11-8412-b57ed2d23f57)**
>
> Watch video content
