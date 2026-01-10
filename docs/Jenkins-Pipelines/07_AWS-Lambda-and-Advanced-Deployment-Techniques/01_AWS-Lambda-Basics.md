# AWS Lambda Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/AWS-Lambda-and-Advanced-Deployment-Techniques/AWS-Lambda-Basics)

---

## Table of Contents

- AWS Lambda Basics
  - A Story of Innovation
  - What Does "Serverless" Mean?
  - Supported Programming Languages
  - How AWS Lambda Works
  - Next Steps
  - Watch Video

---

## Content

Jenkins Pipelines

AWS Lambda and Advanced Deployment Techniques

# AWS Lambda Basics

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. In simple terms, you only bring your code, and Lambda takes care of the rest—from scaling your applications to handling the underlying infrastructure.

## A Story of Innovation

Imagine a smart caveman who invented an ingenious program using two wooden sticks to create fire. This breakthrough not only lit up his world but also revolutionized how he lived—giving him the power to see in the dark, keep warm during winter, and even cook his food.

![The image shows a cartoon caveman with a club standing near a campfire, depicted in two circular frames and one larger image below.](https://kodekloud.com/kk-media/image/upload/v1752879574/notes-assets/images/Jenkins-Pipelines-AWS-Lambda-Basics/caveman-campfire-cartoon-frames.jpg)

The caveman excitedly declared that his invention would change the world. However, back then, programs could only run on physical servers, meaning lengthy waits for server setup and provisioning. One day, a solution architect introduced him to AWS Lambda.

With AWS Lambda, you simply upload your code, and it runs your application without the hassle of managing servers. The caveman quickly migrated his “fire application” to Lambda and by the end of the day, he was using it to cook steak!

While this story is fictional, it captures the core idea behind AWS Lambda: run your code without the burdens of managing infrastructure.

## What Does "Serverless" Mean?

AWS Lambda automates infrastructure tasks such as provisioning, maintenance, and scaling, so you don’t have to worry about them. Your application scales automatically based on incoming traffic—from thousands of simultaneous executions to zero when there is no traffic—and you only pay for what you use.

> [!important]
> **Note**
>
> With Lambda, you don’t need to worry about the underlying servers or scaling conditions, making it an ideal solution for dynamic workloads.

## Supported Programming Languages

AWS Lambda supports a wide range of programming languages, including:

- Python
- Java
- C#
- Node.js
- Ruby
- Go
- PowerShell

Furthermore, AWS Lambda provides a Runtime API extension that allows you to use other languages beyond the ones officially supported. For example, AWS has featured use cases for running legacy COBOL applications using Lambda.

![The image shows the AWS Lambda logo surrounded by icons representing supported programming languages: Python, Java, C#, Node.js, Ruby, Go, and PowerShell.](https://kodekloud.com/kk-media/image/upload/v1752879575/notes-assets/images/Jenkins-Pipelines-AWS-Lambda-Basics/aws-lambda-logo-programming-languages.jpg)

## How AWS Lambda Works

In technical terms, AWS Lambda is a serverless compute service. This means:

- No need to manage server provisioning.
- Automatic scaling with traffic.
- Payment based solely on usage.

![The image explains AWS Lambda as a "Serverless Compute Service" with an icon representing servers and tools.](https://kodekloud.com/kk-media/image/upload/v1752879576/notes-assets/images/Jenkins-Pipelines-AWS-Lambda-Basics/aws-lambda-serverless-compute-icon.jpg)

## Next Steps

In this article, we will show you how to deploy a Node.js application to AWS Lambda and trigger the Lambda function using Jenkins. For more in-depth learning and hands-on experience, consider exploring Matthew's [AWS Lambda course](https://learn.kodekloud.com/user/courses/aws-lambda) on KodeKloud.

Thank you for reading, and happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/78297356-097c-4793-b690-bc83f9aba3f0/lesson/4d248814-17e2-4c22-90b0-64343d944b9c)**
>
> Watch video content
