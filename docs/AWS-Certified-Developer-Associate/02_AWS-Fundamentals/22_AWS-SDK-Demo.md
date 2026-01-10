# AWS SDK Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-SDK-Demo)

---

## Table of Contents

- AWS SDK Demo
  - Setting Up the SDK
  - Creating and Listing S3 Buckets
  - Running the Application
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS SDK Demo

In this guide, we explore how to work with AWS using the AWS SDK. The AWS SDK enables you to interact with AWS services directly from your application code. Whether you're building applications in JavaScript, Python, or any other supported language, simply provide your AWS credentials, install the appropriate SDK, and perform operations programmatically—just as you would via the AWS Console or CLI.

![The image shows a webpage from AWS's Developer Center, highlighting tools for building applications on AWS, with a focus on programming languages like C++, Java, and Python. It includes sections for building applications, getting started, and connecting with the community.](https://kodekloud.com/kk-media/image/upload/v1752858142/notes-assets/images/AWS-Certified-Developer-Associate-AWS-SDK-Demo/aws-developer-center-tools-apps.jpg)

Consider a scenario where you are using Amazon S3 to store images or files for a web application. Every time a user uploads a file, your server can use the AWS SDK to seamlessly store that file in S3. For comprehensive documentation and setup instructions tailored for different programming languages, visit the AWS Developer Tools page. Selecting JavaScript, for example, will guide you to the AWS SDK for JavaScript documentation. This article focuses on a Node.js example.

![The image shows a webpage from AWS, detailing options for developing server-side, web, and mobile apps using Node.js, JavaScript, and React Native, with links to get started using AWS SDK for JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752858143/notes-assets/images/AWS-Certified-Developer-Associate-AWS-SDK-Demo/aws-nodejs-react-native-webpage.jpg)

> [!important]
> **Getting Started with AWS SDK**
>
> Before you begin, ensure that you have Node.js installed on your development environment. For detailed setup instructions, refer to the [official AWS SDK documentation](https://aws.amazon.com/sdk-for-node-js/).

## Setting Up the SDK

For JavaScript (Node.js), third-party libraries are installed using npm. To work with Amazon S3, execute the following command in your terminal:

```
npm install @aws-sdk/client-s3
```

This command installs the necessary S3 client library so you can integrate its functionalities within your application.

![The image shows a Visual Studio Code interface with a JavaScript file open, displaying code related to AWS SDK commands, and a terminal window at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752858145/notes-assets/images/AWS-Certified-Developer-Associate-AWS-SDK-Demo/visual-studio-code-javascript-aws-sdk.jpg)

## Creating and Listing S3 Buckets

The first step in using the AWS SDK is to import the required methods or objects from the library. In this Node.js example, we import the S3 client along with the commands needed to create and list S3 buckets. (Note that for other programming languages, the library installation and syntax might differ; for example, Python uses pip instead of npm.)

Below is a consolidated code example that imports the S3 client, creates a bucket with specific configuration parameters, and then lists all available S3 buckets:

```
import {
  S3Client,
  CreateBucketCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";


// Initialize the S3 client with the default region
const client = new S3Client({ region: "us-east-1" });


// Configure the new bucket
const bucketConfig = {
  Bucket: "kk-sdk1-demo",
  CreateBucketConfiguration: {
    LocationConstraint: "us-east-2", // Overrides the default region for bucket creation
  },
};


// Create the bucket
const command = new CreateBucketCommand(bucketConfig);
const response = await client.send(command);


// List all buckets
const listCommand = new ListBucketsCommand({});
const listResponse = await client.send(listCommand);


// Output the list of buckets to the console
console.log(listResponse);
```

Refer to the AWS SDK documentation to determine which commands and objects to import for your particular needs. The documentation for AWS SDK version 3 for JavaScript provides a full list of available operations for Amazon S3, including the CreateBucketCommand and ListBucketsCommand.

## Running the Application

After setting up your code (for example, saving it as `sdkDemo.mjs`), run the application using Node.js. The terminal output should confirm that the bucket was created and list all existing buckets. A sample terminal output might resemble the following:

```
C:\Users\sanje\Documents\scratch\sdk>node sdkDemo.mjs
{
  $metadata: {
    httpStatusCode: 200,
    requestId: 'YWX6K8TXKZJ3YGE',
    extendedRequestId: '2K0QC2UCHH3WcpJiovErQkX6eah48ocNvKEM2/Byti3We4Tcg47DFVJN0tH26SNx6sTXYP8LQc=',
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  Buckets: [
    { Name: 'kk-access-point', CreationDate: 2023-04-07T07:39:04.000Z },
    { Name: 'kk-sdk1-demo', CreationDate: 2023-05-02T01:32:35.000Z },
    { Name: 'kodekloud-cli-demo', CreationDate: 2023-05-02T01:20:20.000Z }
  ],
  Owner: {
    DisplayName: 'sktdemo91',
    ID: 'a343e01f12c18a7944ebc48e83af2b8608e270b3c72619a67e2dd6569ceec0'
  }
}
C:\Users\sanje\Documents\scratch\sdk>
```

This output confirms that the bucket "kk-sdk1-demo" was successfully created and shows other existing buckets. The process of interfacing with the AWS SDK is analogous to using the AWS Console or CLI; once you understand the documentation, you can perform most tasks programmatically.

## Summary

Integrating AWS services like Amazon S3 into your applications is simplified by using the AWS SDK. By installing the SDK and following the official AWS documentation for commands and configuration, you can streamline the interactions with AWS services. This abstraction allows you to focus on your application logic while the SDK handles the complexities of interacting with AWS.

> [!important]
> **Additional Resources**
>
> - [AWS SDK for JavaScript Documentation](https://docs.aws.amazon.com/sdk-for-javascript/)
> - [Getting Started with Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/811cd272-559a-47ac-af5b-8ad402dc83c9)**
>
> Watch video content
