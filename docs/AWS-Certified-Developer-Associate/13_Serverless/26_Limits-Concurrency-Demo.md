# Limits Concurrency Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Limits-Concurrency-Demo)

---

## Table of Contents

- Limits Concurrency Demo
  - AWS Lambda Concurrency Settings
  - Provisioned Concurrency
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Limits Concurrency Demo

In this lesson, we will learn how to configure and adjust concurrency settings for your AWS Lambda functions to ensure optimal performance and resource management.

## AWS Lambda Concurrency Settings

First, navigate to the **Configuration** tab of your Lambda function and select **Concurrency**. This section allows you to manage settings related to concurrent executions. By default, your AWS account provides 1000 unreserved concurrent executions, meaning that up to 1000 requests can be processed simultaneously across all your Lambda functions. However, these concurrent executions are shared, which may lead to resource contention if one function is critical.

![The image shows an AWS Lambda console page focused on concurrency settings, including options for function concurrency and provisioned concurrency configurations.](https://kodekloud.com/kk-media/image/upload/v1752859579/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency-Demo/aws-lambda-concurrency-settings.jpg)

> [!important]
> **Important Note**
>
> To prevent crucial Lambda functions from being resource-starved, you can reserve a portion of the concurrent executions. For example, by setting a reserved concurrency of 10, you ensure that this specific function always has 10 concurrent executions available—even when other functions are under heavy load.

## Provisioned Concurrency

Provisioned concurrency is a configuration designed to reduce the latency caused by cold starts. Normally, a cold start occurs when a function instance is initialized from scratch, which can delay response times. With provisioned concurrency, AWS Lambda maintains a pool of pre-initialized instances ready to handle requests, ensuring a swift response.

Before setting up provisioned concurrency, note that you must specify a specific version or alias of your Lambda function; the latest version cannot be used. For instance, publish your function as a new version (e.g., tagged as "v1").

Once you have a published version, go back to the Lambda configuration page and navigate to the provisioned concurrency section. Here, you can add a configuration for your published version by specifying the desired number of pre-initialized instances (up to 900). If you set the number to three, the system will display the estimated monthly cost for maintaining these instances, giving you an understanding of the financial impact of reducing cold start latency.

![The image shows an AWS Lambda configuration page for setting up provisioned concurrency, with options to select a qualifier type and version, and a section for entering concurrency details. An error message is displayed at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752859581/notes-assets/images/AWS-Certified-Developer-Associate-Limits-Concurrency-Demo/aws-lambda-provisioned-concurrency-config.jpg)

## Summary

This lesson covered two primary options for configuring AWS Lambda concurrency:

- **Reserved Concurrency:** Guarantees a fixed number of concurrent executions for a specific function, ensuring that critical applications always have the necessary resources.
- **Provisioned Concurrency:** Reduces latency by pre-initializing a designated number of function instances, thereby minimizing the delays associated with cold starts.

By understanding and applying these configurations, you can fine-tune your resource allocation to meet your application's demands efficiently. For further details, consider exploring additional [AWS Lambda documentation](https://aws.amazon.com/documentation/lambda/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/680ddf07-0b06-4321-9e87-e745971d8c95)**
>
> Watch video content
