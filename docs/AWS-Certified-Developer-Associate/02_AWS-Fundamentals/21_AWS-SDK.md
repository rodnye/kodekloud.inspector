# AWS SDK - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-SDK)

---

## Table of Contents

- AWS SDK
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS SDK

In this lesson, we explore how to interact with AWS programmatically using the AWS SDK. This powerful tool allows you to manage your AWS environment directly from your application code—enabling you to create, delete, or modify resources without relying solely on manual interventions.

Below is an example of using the AWS SDK with JavaScript. The following code snippet demonstrates how to create an S3 bucket named "my-new-bucket":

```
import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
const client = new S3Client(config);


const input = {
  Bucket: "my-new-bucket"
};


const command = new CreateBucketCommand(input);
const response = await client.send(command);
```

> [!important]
> **Note**
>
> This programmatic approach offers an alternative to traditional methods, such as using the [AWS CLI](https://aws.amazon.com/cli/) or the [AWS Console](https://aws.amazon.com/console/), providing more flexibility and automation capabilities for managing AWS resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/d5d0d79b-09db-4325-a643-2f8caa39c21d)**
>
> Watch video content
