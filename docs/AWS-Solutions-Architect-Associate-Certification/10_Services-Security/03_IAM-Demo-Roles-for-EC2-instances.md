# IAM Demo Roles for EC2 instances - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/IAM-Demo-Roles-for-EC2-instances)

---

## Table of Contents

- IAM Demo Roles for EC2 instances
  - Creating an S3 Bucket with Explicit Credentials
  - Handling Authentication Errors
  - Creating an IAM User and Generating Credentials
  - Transitioning to IAM Roles
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# IAM Demo Roles for EC2 instances

In this lesson, you’ll learn how to use IAM roles to provide your EC2 instance with the permissions it needs to interact with other AWS services, such as Amazon S3. We’ll start with a simple application that uses the AWS SDK to programmatically create an S3 bucket.

## Creating an S3 Bucket with Explicit Credentials

The code snippet below demonstrates how to configure an S3 client using explicit credentials. The application conditionally adds credentials if a secret access key is provided. It retrieves the bucket name from a command-line argument and then creates the bucket using the S3 API.

```
const accessKeyId = "";
const secretAccessKey = "";


const s3Config = { region: "us-east-1" };


if (secretAccessKey != "" || null) {
    s3Config.credentials = {
        accessKeyId,
        secretAccessKey,
    };
}


const s3Client = new S3Client(s3Config);


// Create the parameters for calling createBucket
var bucketName = process.argv[2];


// Call S3 to create the bucket
const main = async () => {
    try {
        const response = await s3Client.send(
            new CreateBucketCommand({ Bucket: bucketName })
        );
    }
};
```

To run the application and create a bucket (for example, named "bucket123"), execute:

```
node index.js bucket123
```

After uploading the code to an EC2 instance (named “SDK demo”), you can verify its contents by running commands such as `ls` and `cat index.js` on the instance.

When you execute the application with:

```
node index.js iam-role-kodekloud-demo
```

you might see output similar to:

```
123, then that's going to create a bucket called bucket123.
[ec2-user@ip-172-31-18-206 app]$ node index.js bucket123
```

This confirms that the instance is running the code and creating the bucket, assuming the provided credentials are valid.

## Handling Authentication Errors

When you first run the application with provided (but incorrect) credentials, you might see an error like:

```
[ec2-user@ip-172-31-18-206 app]$ node index.js iam-role-kodekloud-demo
Error: Code invalid access key ID. The AWS access key ID you provided does not exist in our records.
```

> [!important]
> **Warning**
>
> This error indicates that the access key ID is invalid. Before using IAM roles, our application used explicit access keys. For demonstration purposes, we then generated valid credentials by creating an IAM user.

![The image shows an AWS EC2 management console with details of two instances, one running and one stopped. The selected instance, "sdk-demo," is running with a t2.micro type and has passed status checks.](https://kodekloud.com/kk-media/image/upload/v1752865804/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-ec2-management-console-instances.jpg)

## Creating an IAM User and Generating Credentials

To generate valid credentials, follow these steps:

1.  Navigate to the IAM console and create a new user named “SDK demo.”
2.  Attach policies directly by searching for and selecting **Amazon S3 Full Access**.
3.  In the Security Credentials tab for the new user, create an access key. For this lesson, choose the Command Line Interface (CLI) option, then click "Next" and "Create Access Key."

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying user details and permissions. It highlights a user with the "AmazonS3FullAccess" policy attached directly.](https://kodekloud.com/kk-media/image/upload/v1752865805/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-iam-console-user-permissions.jpg)

![The image shows an AWS IAM console screen for creating an access key, with options for different use cases like CLI, local code, and third-party services. It includes steps for accessing key best practices and alternatives.](https://kodekloud.com/kk-media/image/upload/v1752865807/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-iam-access-key-creation.jpg)

![The image shows an AWS IAM console screen displaying access key details and best practices for managing access keys. A green banner at the top indicates that an access key has been created.](https://kodekloud.com/kk-media/image/upload/v1752865808/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-iam-access-key-details.jpg)

After copying the correct Access Key and Secret Access Key into your code, update the snippet as follows:

```
const { S3Client, CreateBucketCommand, GetObjectCommand } = require("@aws-sdk/client-s3");


// Set the region and provide valid credentials
const accessKeyId = "AKIAIAIWSJ5U7MTRXX52";
const secretAccessKey = "WW1UNLSS/bIa+V1qYpXRlC4vQpNb0EQGKrg7D73";


const s3Config = { region: "us-east-1" };


if (secretAccessKey != "" || null) {
    s3Config.credentials = {
        accessKeyId,
        secretAccessKey,
    };
}


const s3Client = new S3Client(s3Config);


// Create the parameters for calling createBucket
var bucketName = process.argv[2];


// Call S3 to create the bucket
const main = async () => {
    try {
        const response = await s3Client.send(
            new CreateBucketCommand({ Bucket: bucketName })
        );
        console.log(response);
    } catch (e) {
        console.log("failed to create bucket");
        console.log(e);
    }
};


main();
```

Run the updated application with:

```
node index.js iam-role-kodekloud-demo
```

This produces an output similar to:

```
{
    '$metadata': {
        httpStatusCode: 200,
        requestId: '3G32E56RK5V2Z3NH',
        extendedRequestId: 'yb9KufnGSDqX1DoM5/GdVQ+uImphU7RaqxludjBzIMDxsQipmJP8XiTWNZC+C2+x2fk1Gjhfno=',
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0
    },
    Location: 'iam-role-kodekloud-demo'
}
```

After verifying through the AWS S3 console, you should see the new bucket listed:

![The image shows an Amazon S3 console with a list of buckets, their regions, access settings, and creation dates. A notification at the top indicates a bucket was successfully deleted.](https://kodekloud.com/kk-media/image/upload/v1752865809/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/amazon-s3-console-buckets-list.jpg)

## Transitioning to IAM Roles

To remove the need for managing access keys manually, we now transition to using IAM roles. When you remove credentials from your code and run the application, you’ll encounter an "InvalidAccessKeyId" error, as expected.

To resolve this, create an IAM role for the EC2 instance by following these steps:

1.  In the IAM console, select **Roles** and click **Create Role**.
2.  Choose **AWS service** as the trusted entity type, since the role will be used by an EC2 instance.
3.  For the use case, select **EC2** so the instance can perform actions on your behalf—specifically, interacting with S3.

![The image shows an AWS IAM console screen for creating a role, where the user is selecting a trusted entity type, such as AWS service, AWS account, or web identity.](https://kodekloud.com/kk-media/image/upload/v1752865810/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-iam-console-create-role.jpg)

![The image shows an AWS IAM console screen where a user is selecting a use case for creating a role, specifically for EC2 services. Various options for EC2 roles are listed, and the "Next" button is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752865812/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-iam-ec2-role-selection.jpg)

4.  Attach the **Amazon S3 Full Access** policy to the role.
5.  Name the role (e.g., "AWS SDK S3") and use the following trust policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sts:AssumeRole"
            ],
            "Principal": {
                "Service": [
                    "ec2.amazonaws.com"
                ]
            }
        }
    ]
}
```

After creating the role, update your EC2 instance to use it. In the AWS EC2 management console:

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, listing various IAM roles with their trusted entities and last activity details.](https://kodekloud.com/kk-media/image/upload/v1752865813/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-iam-console-roles-list.jpg)

Locate your instance (SDK demo), select **Security**, then **Modify IAM Role**, and choose the newly created role “AWS SDK S3.”

![The image shows an AWS EC2 management console with details of an instance named "sdk-demo" that is currently running. It displays instance information such as instance ID, public and private IP addresses, and instance type.](https://kodekloud.com/kk-media/image/upload/v1752865814/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-ec2-management-console-sdk-demo.jpg)

![The image shows an AWS console screen for modifying an IAM role attached to an EC2 instance. The selected IAM role is "aws-sdk-s3," and there are options to update or cancel the role change.](https://kodekloud.com/kk-media/image/upload/v1752865815/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/aws-console-iam-role-ec2.jpg)

Now that the role is attached and your code no longer contains hard-coded credentials, run the application again:

```
[ec2-user@ip-172-31-18-206 app]$ node index.js iam-role-kodekloud-demo
```

The bucket is now created successfully. Verify its creation in the S3 console:

![The image shows an Amazon S3 console with a list of buckets, their regions, access settings, and creation dates. A notification at the top indicates a bucket was successfully deleted.](https://kodekloud.com/kk-media/image/upload/v1752865816/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-IAM-Demo-Roles-for-EC2-instances/amazon-s3-console-bucket-list.jpg)

## Summary

There are two primary methods for authenticating an application with AWS services:

| Authentication Method         | Description                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Explicit IAM User Credentials | Uses generated access keys. Manual credential management is required.                                      |
| IAM Roles for EC2 Instances   | Automatically provides authentication by attaching a role to the EC2 instance; eliminates hard-coded keys. |

Using IAM roles simplifies security management by allowing your EC2 instance to assume a role with the correct permissions—enabling seamless interactions with AWS services like S3.

> [!important]
> **Note**
>
> This lesson demonstrated the transition from explicit credentials to using IAM roles, enhancing your application's security posture while reducing manual credential management.

This concludes our lesson on using IAM roles for EC2 instances. For further reading, visit the [AWS Documentation](https://aws.amazon.com/documentation/) and explore the [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/1ac880f2-d43f-4b39-ae0a-890a39c8fad9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/9b0c0d4a-7ad6-4341-b881-cb5d8a8b3327)**
>
> Practice lab
