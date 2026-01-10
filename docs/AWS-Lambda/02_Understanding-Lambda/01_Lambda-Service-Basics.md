# Lambda Service Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Understanding-Lambda/Lambda-Service-Basics)

---

## Table of Contents

- Lambda Service Basics
  - The Caveman Story
  - What Is AWS Lambda?
  - Supported Languages
  - Next Steps
  - Watch Video
    - Beyond the Built-In Runtimes

---

## Content

AWS Lambda

Understanding Lambda

# Lambda Service Basics

Welcome to the Cold Cloud AWS Lambda course – your guide to mastering serverless compute on AWS. In this lesson, we’ll explore the core concepts of AWS Lambda, discover its key benefits, and see why it’s revolutionizing how you run code in the cloud.

---

## The Caveman Story

Once upon a time, a clever caveman invented a program that generated fire by rubbing two sticks together. He called it his “Lambda program” and dreamed of seeing in the dark, staying warm, and cooking with fire. Unfortunately, provisioning a server meant waiting in a long queue.

A solutions architect then introduced him to AWS Lambda. Instead of managing servers, he could simply upload his code and let AWS handle the rest.

![The image shows a cartoon caveman and a modern man facing each other with an orange square featuring a lambda symbol between them.](https://kodekloud.com/kk-media/image/upload/v1752863178/notes-assets/images/AWS-Lambda-Lambda-Service-Basics/caveman-modern-man-lambda-symbol.jpg)

By dinner time, the caveman’s fire application was grilling steaks—all without a single server provisioned. While the story is fictional, AWS Lambda’s power is very real.

---

## What Is AWS Lambda?

AWS Lambda is a serverless compute service that runs your code in response to events. Upload your functions, define triggers, and AWS takes care of the servers:

![The image illustrates a process flow from a code file to a computer, with an AWS Lambda icon in the center, under the title "Bring your own Code."](https://kodekloud.com/kk-media/image/upload/v1752863179/notes-assets/images/AWS-Lambda-Lambda-Service-Basics/bring-your-own-code-process-flow-aws-lambda.jpg)

| Key Feature          | Description                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Automatic scaling    | Scales out instantly to handle thousands of concurrent executions, then scales to zero when idle. |
| Pay-per-use pricing  | Billed only for actual compute time, metered in 1 ms increments.                                  |
| No server management | AWS handles provisioning, patching, capacity planning, and underlying infrastructure.             |

---

## Supported Languages

AWS Lambda natively supports these popular runtimes:

| Runtime    | Typical Use Cases            |
| ---------- | ---------------------------- |
| Python     | Data processing, scripting   |
| Java       | Enterprise applications      |
| C#/.NET    | Windows-centric workloads    |
| Node.js    | Web backends, APIs           |
| Ruby       | Prototyping, web apps        |
| Go         | High-performance services    |
| PowerShell | AWS automation, DevOps tasks |

![The image shows a diagram of supported programming languages for AWS Lambda, including Python, Java, C#, Node.js, Ruby, Go, and PowerShell, arranged around the AWS Lambda logo.](https://kodekloud.com/kk-media/image/upload/v1752863180/notes-assets/images/AWS-Lambda-Lambda-Service-Basics/aws-lambda-supported-languages-diagram.jpg)

### Beyond the Built-In Runtimes

If your favorite language isn’t listed above, the **Lambda Runtime API** lets you bring any language you choose. For example, you can run legacy COBOL applications on Lambda by implementing a custom runtime.

> [!important]
> **Note**
>
> Use the Runtime API to package and invoke functions in unsupported languages. AWS provides [runtime examples](https://github.com/aws/aws-lambda-runtime-interface-emulator) to help you get started.

![The image shows a flowchart with COBOL leading to an API icon, which then leads to an AWS Lambda icon, under the title "Supported Languages."](https://kodekloud.com/kk-media/image/upload/v1752863181/notes-assets/images/AWS-Lambda-Lambda-Service-Basics/cobol-api-aws-lambda-flowchart.jpg)

---

## Next Steps

Now that you understand the basics of AWS Lambda and its benefits:

1.  Write your first Lambda function in your preferred language.
2.  Configure an event trigger (e.g., S3, API Gateway, DynamoDB).
3.  Deploy, test, and monitor with AWS CloudWatch Logs and metrics.

Up next, we dive under the hood to explore Lambda’s execution environment, event lifecycle, and best practices for performance and security. Stay tuned!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/fdb5ec1b-18a2-4034-baed-3231f187825b/lesson/24e81f72-84e9-4ca1-a2e8-b4858fa9b63a)**
>
> Watch video content
