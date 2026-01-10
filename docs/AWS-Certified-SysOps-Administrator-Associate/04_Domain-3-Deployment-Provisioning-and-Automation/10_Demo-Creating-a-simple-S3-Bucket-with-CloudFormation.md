# Demo Creating a simple S3 Bucket with CloudFormation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-3-Deployment-Provisioning-and-Automation/Demo-Creating-a-simple-S3-Bucket-with-CloudFormation)

---

## Table of Contents

- Demo Creating a simple S3 Bucket with CloudFormation
  - Simple S3 Bucket CloudFormation Template
  - A More Comprehensive S3 Bucket Template
  - Summary
  - Watch Video
  - Practice Lab
    - Deploying the Template via CloudFormation Console
    - Key Features of the Comprehensive Template

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 3 Deployment Provisioning and Automation

# Demo Creating a simple S3 Bucket with CloudFormation

Welcome to this detailed guide on using AWS CloudFormation to create an Amazon S3 bucket. In this lesson, we first explore a minimal CloudFormation template for creating a basic S3 bucket and then expand the topic with a more comprehensive example that includes additional best practices and configurations.

## Simple S3 Bucket CloudFormation Template

Every CloudFormation template starts with a version declaration and may include a brief description. In the example below, the "Resources" section defines an S3 bucket named using your account ID and region. This ensures uniqueness across AWS environments.

```
AWSTemplateFormatVersion: '2010-09-09'
Description: Simple CloudFormation template to create an S3 bucket
Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub 'my-simple-log-bucket-${AWS::AccountId}-${AWS::Region}'
```

Save this template locally and then proceed to the CloudFormation console for deployment.

### Deploying the Template via CloudFormation Console

1.  Open the CloudFormation console and select the option to upload an existing template file.
2.  Upload the file containing the S3 bucket definition.
3.  Click **Next**, and provide a stack name, such as "kk-s3-simple-bucket."

Since there are no parameters for this template, proceed by clicking through the remaining steps without additional input.

![The image shows an AWS CloudFormation interface where users can prepare and specify a template for creating a stack, with options to choose an existing template, use a sample, or build from Application Composer. It also includes options to upload a template file, use an Amazon S3 URL, or sync from Git.](https://kodekloud.com/kk-media/image/upload/v1752860290/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-a-simple-S3-Bucket-with-CloudFormation/aws-cloudformation-template-interface.jpg)

After setting the stack name and reviewing the configuration parameters, continue by clicking **Next**. Since there are no tags or specific permissions required, default settings apply.

![The image shows an AWS CloudFormation interface where a user is specifying stack details, including providing a stack name "kk-s3-simple-bucket." There are no parameters defined in the template.](https://kodekloud.com/kk-media/image/upload/v1752860291/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-a-simple-S3-Bucket-with-CloudFormation/aws-cloudformation-kk-s3-bucket.jpg)

Review the default failure options and deletion policies. Once confirmed, click **Submit** to launch the stack creation process. You can monitor resource status in both the "Resources" and "Events" tabs.

![The image shows the AWS CloudFormation interface, specifically the "Stack failure options" settings, where users can configure behavior on provisioning failure and deletion policies for newly created resources.](https://kodekloud.com/kk-media/image/upload/v1752860292/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-a-simple-S3-Bucket-with-CloudFormation/aws-cloudformation-stack-failure-options.jpg)

During the stack creation process, status updates for the S3 bucket will appear.

![The image shows an AWS CloudFormation console with a stack named "kk-s3-simple-bucket" in progress, displaying details of an S3 bucket resource being created.](https://kodekloud.com/kk-media/image/upload/v1752860294/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-a-simple-S3-Bucket-with-CloudFormation/aws-cloudformation-kk-s3-bucket-2.jpg)

After the events show that the S3 bucket has been created successfully, switch to the Amazon S3 console to verify the bucket. The bucket name will include your account number and region (for example, us-east-2).

![The image shows an AWS CloudFormation console with a stack named "kk-s3-simple-bucket." The events tab displays the creation progress and completion status of the stack and its resources.](https://kodekloud.com/kk-media/image/upload/v1752860295/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-a-simple-S3-Bucket-with-CloudFormation/aws-cloudformation-kk-s3-bucket-3.jpg)

![The image shows an Amazon S3 console with a list of general-purpose buckets, including details like bucket names, AWS regions, IAM access analyzers, and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752860296/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-a-simple-S3-Bucket-with-CloudFormation/amazon-s3-console-bucket-list.jpg)

> [!important]
> **Note**
>
> This simple example demonstrates that AWS CloudFormation allows you to define your infrastructure as code with just the minimum details necessary to launch resources.

## A More Comprehensive S3 Bucket Template

For advanced use cases, enhance your CloudFormation template to include additional configurations such as versioning, encryption, lifecycle rules, logging, website hosting, CORS (Cross-Origin Resource Sharing) configuration, and tagging. The example below sets up a comprehensive S3 bucket along with a dedicated log bucket.

```
Resources:
  MyComprehensiveS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub 'my-comprehensive-bucket-${AWS::AccountId}-${AWS::Region}'
      AccessControl: Private
      VersioningConfiguration:
        Status: Enabled
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256
      LifecycleConfiguration:
        Rules:
          - Id: 'MoveToGlacier'
            Status: Enabled
            Transitions:
              - TransitionInDays: 60
                StorageClass: GLACIER
            ExpirationInDays: 365
      LoggingConfiguration:
        DestinationBucketName: !Ref LogBucket
        LogFilePrefix: 'logs/'
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html
      CorsConfiguration:
        CorsRules:
          - AllowedOrigins:
              - '*'
            AllowedMethods:
              - GET
      Tags:
        - Key: Environment
          Value: Production


  LogBucket:
    Type: AWS::S3::Bucket
    Properties: {}
```

### Key Features of the Comprehensive Template

- **Unique Bucket Naming:** The bucket name incorporates the AWS account ID and region for uniqueness.
- **Versioning:** Enabled to maintain a history of object changes.
- **Encryption:** Server-side encryption is set using AES256 to secure your data.
- **Lifecycle Management:** Objects are transitioned to Glacier storage after 60 days and deleted after 365 days.
- **Logging:** Access logs are stored in a dedicated log bucket.
- **Website Hosting:** Configured with specified index and error documents.
- **CORS Settings:** Allows GET requests from all origins.
- **Tagging:** Applies tags to efficiently manage resources in production environments.

> [!important]
> **Tip**
>
> Integrating these advanced configurations into your CloudFormation templates enables you to adopt best practices in security, data management, and resource monitoring.

## Summary

Whether you choose a simple or comprehensive approach, AWS CloudFormation provides the flexibility to manage your infrastructure as code. From launching a basic S3 bucket to configuring a fully featured storage solution with encryption, versioning, and logging, these templates empower you to scale and manage your resources effectively.

Thank you for following along in this lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/1e1d071b-5cd6-4b1b-86dc-3b4aa3be8239)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/ecf54f06-735d-43ee-b254-f6ff814e676f/lesson/dccb11a9-cdac-4837-8729-144d5866ea64)**
>
> Practice lab
