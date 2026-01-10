# AWS Management Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Two/AWS-Management-Demo)

---

## Table of Contents

- AWS Management Demo
  - A Simple CloudFormation Template
  - Creating the Stack in the Console
  - An Example of a More Complex Template
  - Deleting the Stack
  - Conclusion
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Two

# AWS Management Demo

Hi, welcome back Cloud Practitioners!

In this lesson, we will walk through a short demo of AWS CloudFormation—a service that accelerates cloud provisioning by defining your infrastructure as code. Essentially, you create a YAML or JSON file that describes the desired AWS resources, and CloudFormation uses that file to automatically provision and configure them.

![The image explains AWS CloudFormation's process: coding infrastructure, using Amazon S3, deploying with CloudFormation, and outputting resources. It highlights use cases like DevOps management.](https://kodekloud.com/kk-media/image/upload/v1752862254/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Management-Demo/frame_40.jpg)

Let's dive into a simple CloudFormation example.

## A Simple CloudFormation Template

Consider the following basic CloudFormation template. This file consists solely of a Resources section that defines an S3 bucket by specifying its type and a single property: its bucket name.

```
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "mydembucket10230661977"
```

The bucket name is arbitrary—you can name it "bucket99" or any valid name. When you run this template in the AWS Management Console, CloudFormation leverages the region defined in your console session to create the bucket.

For example, launching the stack might use a YAML snippet like:

```
Bucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: "mydembucket120236191977"
```

This concise definition, just a few lines of YAML, shows how simple it is to define and provision a resource.

## Creating the Stack in the Console

Switch to the AWS Management Console and navigate to the CloudFormation service. CloudFormation is AWS’s native management tool for infrastructure as code. To create your new stack:

1.  Choose "Create Stack" with new resources.
2.  Select "Upload a template file" and click "Choose file" to locate your simple S3 bucket template.
3.  After uploading, click "Next."

![The image shows an AWS CloudFormation interface for creating a stack, with options to prepare and specify a template using a JSON or YAML file.](https://kodekloud.com/kk-media/image/upload/v1752862257/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Management-Demo/frame_130.jpg)

Assign a stack name, such as "mys3demostack." Since the template contains no parameters, simply click "Next."

![The image shows an AWS CloudFormation interface for specifying stack details, with a stack named "mys3demostack" and no parameters defined.](https://kodekloud.com/kk-media/image/upload/v1752862259/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Management-Demo/frame_150.jpg)

Scroll down, click "Next" again, then confirm your settings and submit your stack creation request. The simple five-line template starts provisioning your defined S3 bucket.

You can monitor the progress in the CloudFormation stack’s Events tab, which logs each action during the creation process. In a separate tab, navigate to the Amazon S3 dashboard to verify the presence of your new bucket. Even if there was a previously created demo bucket, the new bucket—named as per your file—should now appear.

![The image shows an Amazon S3 management console with a list of buckets, their regions, access settings, and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752862261/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Management-Demo/frame_200.jpg)

After refreshing your CloudFormation stack view, you should see that the bucket creation is complete. To confirm, switch back to the S3 console and refresh the page—your bucket (for example, "2023-06-19-777") should be visible.

![The image shows an Amazon S3 dashboard listing multiple buckets, their regions, access settings, and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752862263/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Management-Demo/frame_240.jpg)

Since no objects have been uploaded to the bucket, its contents appear empty. More advanced CloudFormation templates can include Outputs or even automatically create and manage objects within the bucket, but this simple example clearly illustrates the foundational process.

![The image shows an Amazon S3 bucket interface named "mydemobucket20230619777" with no objects uploaded. Options for uploading and managing files are visible.](https://kodekloud.com/kk-media/image/upload/v1752862265/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Management-Demo/frame_250.jpg)

> [!important]
> **Key Takeaway**
>
> With just a few lines of YAML, CloudFormation allows you to deploy and manage AWS resources effortlessly.

## An Example of a More Complex Template

CloudFormation is capable of much more than simple resource creation. Here’s an example of a more complex template that demonstrates the use of conditions for access control, encryption, custom KMS keys, and outputs for the bucket's URL and ARN:

```
Conditions:
  hasACL:
    !Not
      - !Ref ACL
        - "None"
  isEncrypted:
    !Equals
      - !Ref Encryption
        - "true"
  hasKmsKey:
    !Not
      - !Equals
        - !Ref KmsKeyId
          - "12345678-aaaa-bbbb-cccc-123456789abc"
  useCustomKey:
    !And
      - Condition: isEncrypted
      - Condition: hasKmsKey


Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      AccessControl: !If
        - hasACL
        - !Ref ACL
        - !Ref "AWS::NoValue"
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: !If
                - useCustomKey
                - !Ref kmsKeyId
                - "aws:kms"
                - AES256
      BucketName: !Ref BucketName
      VersioningConfiguration:
        Status: !Ref Versioning


Outputs:
  BucketURL:
    Value: !Join
      - ""
      -
        - "https://"
        - !GetAtt Bucket.DomainName
    Export:
      Name: !Join
        - ""
        -
          - !Ref AWS::StackName
          - "BucketURL"
  BucketARN:
    Value: !GetAtt Bucket.Arn
    Export:
      Name: !Join
        - ""
        -
          - !Ref AWS::StackName
          - "BucketARN"
```

This example illustrates how CloudFormation can manage configurations for a variety of AWS services beyond S3, including EC2 and VPCs, by starting with simple constructs and progressively adding complexity.

## Deleting the Stack

To remove the resources created by your CloudFormation stack, return to the CloudFormation console, select your stack, and click "Delete." Confirm the deletion process, and the removal will commence immediately.

> [!important]
> **Important**
>
> If the S3 bucket contains any objects, CloudFormation will prompt you to delete them before the stack can be deleted.

![The image shows an AWS CloudFormation console with stack events, including creation and deletion statuses for "mys3demostack" and other stacks.](https://kodekloud.com/kk-media/image/upload/v1752862266/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Management-Demo/frame_310.jpg)

## Conclusion

This demo shows that even a straightforward CloudFormation template—merely a few lines of YAML—can effectively manage AWS resources. CloudFormation is a powerful tool for infrastructure as code that scales from simple deployments to complex, multi-resource architectures.

Thank you for following along in this lesson. Michael Forrester, I look forward to seeing you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/f47a1e6e-5593-4fac-bc8b-f24ef6e6f418/lesson/1a7b5c3e-b1dc-41e2-835d-86163f98a57c)**
>
> Watch video content
