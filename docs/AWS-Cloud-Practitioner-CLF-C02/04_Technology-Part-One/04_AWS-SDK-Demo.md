# AWS SDK Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-SDK-Demo)

---

## Table of Contents

- AWS SDK Demo
  - Installing the AWS SDK
  - Creating an S3 Bucket with AWS SDK for JavaScript
  - Sample Output
  - Summary
  - Watch Video
    - How the Code Works

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS SDK Demo

This lesson demonstrates how to integrate AWS services programmatically using the AWS SDK. By providing your credentials and installing the appropriate SDK library, you can seamlessly incorporate AWS functionality directly into your application, regardless of the programming language you choose.

For example, if your web application enables users to upload images or files, you can automatically transfer them to an S3 bucket using the AWS SDK.

For a comprehensive setup guide and additional resources, visit [AWS Developer Tools](https://aws.amazon.com/developer/tools/). In this lesson, we focus on JavaScript. After selecting AWS SDK for JavaScript and Node.js, you will be guided through the necessary setup instructions and prerequisites.

![The image shows an AWS documentation page for getting started with Node.js using the AWS SDK for JavaScript, including setup instructions and prerequisites.](https://kodekloud.com/kk-media/image/upload/v1752861820/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SDK-Demo/frame_90.jpg)

> [!important]
> **Quick Tip**
>
> Remember that each programming language requires its own SDK installation process. For JavaScript, the package manager npm is used to install the S3 library.

## Installing the AWS SDK

Before you start developing your application, install the SDK library. For JavaScript, run the following command to install the S3 client library using npm:

```
npm install @aws-sdk/client-s3
```

After installation, your application can interact with AWS using the SDK just like any other third-party library. Note that the installation command may vary based on your programming language; for example, in Python, you would use pip with the appropriate library name.

## Creating an S3 Bucket with AWS SDK for JavaScript

The snippet below demonstrates how to create an S3 bucket and list all buckets in your account using AWS SDK for JavaScript (version 3):

```
import {
  S3Client,
  CreateBucketCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";


const client = new S3Client({ region: "us-east-1" });


const bucketConfig = {
  Bucket: "kk-sdk1-demo",
  CreateBucketConfiguration: {
    LocationConstraint: "us-east-2",
  },
};


const createCommand = new CreateBucketCommand(bucketConfig);
const response = await client.send(createCommand);


const listCommand = new ListBucketsCommand({});
const listResponse = await client.send(listCommand);


console.log(listResponse);
```

### How the Code Works

- The script imports the S3 client and the commands required to create and list buckets.
- An S3 client is instantiated with a default region (`us-east-1`).
- The bucket configuration defines the bucket name (`kk-sdk1-demo`) and specifies that the bucket should be created in a different region (`us-east-2`).
- The `CreateBucketCommand` is executed using `client.send()`, followed by a command to list all S3 buckets.
- The resulting list of buckets is printed to the console.

For additional details about available commands and configurations, refer to the [AWS SDK for JavaScript v3 documentation for S3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/).

![The image shows a webpage from AWS SDK for JavaScript v3 documentation, detailing S3Client configuration and operations, including multipart upload commands.](https://kodekloud.com/kk-media/image/upload/v1752861822/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SDK-Demo/frame_190.jpg)

> [!important]
> **Running Your Script**
>
> After writing and saving your script (e.g., as sdkDemo.mjs), execute it from the terminal with the command:
>
> ```
> node sdkDemo.mjs
> ```

## Sample Output

Executing the script will display an output similar to the following, which confirms that the bucket was successfully created and lists all available S3 buckets for your account:

```
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "YmX6I8TKX7Z3YGE",
    "extendedRequestId": "2K0QC2UCHH3WcpjovErQkX6eaH48ocNvkEM2/Byti3We4Tcg47DFVJN0tH26SNx6sTXPY98LQc-",
    "cfId": undefined,
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Buckets": [
    {
      "Name": "kk-access-point",
      "CreationDate": "2023-04-07T07:39:04.000Z"
    },
    {
      "Name": "kk-sdk1-demo",
      "CreationDate": "2023-05-02T01:32:35.000Z"
    },
    {
      "Name": "kodekloud-cli-demo",
      "CreationDate": "2023-05-02T01:00:20.000Z"
    }
  ],
  "Owner": {
    "DisplayName": "sktdem091",
    "ID": "a343e01f12c18a7944ebc48e8b3af2b86082e70b3c72619a67e2dd6569cece0"
  }
}
```

This output verifies that the AWS SDK has successfully created the S3 bucket and retrieved a list of all existing buckets in your account.

## Summary

The AWS SDK empowers developers to perform AWS operations directly via code, offering similar capabilities to the AWS console or CLI. By following the official documentation and using the appropriate commands for your programming language, you can integrate powerful AWS functionalities into your applications without any hassle.

For more articles and tutorials on AWS SDK integrations, continue exploring our documentation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/0d712da5-7715-4068-978a-e59d384b7a4d)**
>
> Watch video content
