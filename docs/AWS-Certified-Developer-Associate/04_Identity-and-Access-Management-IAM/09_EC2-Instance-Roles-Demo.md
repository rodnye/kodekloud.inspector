# EC2 Instance Roles Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Identity-and-Access-Management-IAM/EC2-Instance-Roles-Demo)

---

## Table of Contents

- EC2 Instance Roles Demo
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Identity and Access Management IAM

# EC2 Instance Roles Demo

In this article, you will learn how to grant an EC2 instance the necessary permissions to interact with other AWS services by leveraging IAM roles. The example demonstrates how a simple application uses the AWS SDK to programmatically create an S3 bucket. Although the code is straightforward, the focus is on the authentication process using credentials initially, and then transitioning to the more secure IAM role-based access.

Below is an excerpt of the code that creates a new S3 bucket:

```
const accessKeyId = "";
const secretAccessKey = "";


const s3Config = { region: "us-east-1" };


if (secretAccessKey !== "" && secretAccessKey !== null) {
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
  } catch (e) {
    console.log("failed to create bucket");
  }
};
```

To run this application, execute the following command, providing the desired bucket name as an argument:

```
[ec2-user@ip-172-31-18-206 app]$ node index.js bucket123
```

This command creates a bucket named "bucket123" in S3.

---

When reviewing the output on the EC2 instance, you may see details similar to the following:

```
httpStatusCode: 200,
requestId: 'NQD565DPGF96PYED',
extendedRequestId: 'IBXYtkvqkHkOS/Zx2W+qSv/Cl18Jbb+I1TuIwDOBHpUrSNxkIW7gPVk/azYQphZkl+gyeJriLA=',
cfId: undefined,
attempts: 1,
totalRetryDelay: 0,
Location: '/testing123123123123-kode'
```

```
[ec2-user@ip-172-31-18-206 app]$ node index.js bucket123
```

After confirming that the code remains unchanged (using commands like `ls` and `cat index.js` on the EC2 instance), test the application by running:

```
[ec2-user@ip-172-31-18-206 app]$ node index.js iam-role-kodekloud-demo
```

If you encounter an error similar to "InvalidAccessKeyId", it indicates that the AWS access key provided does not exist in AWS records. This confirms an authentication issue when using explicit credentials.

> [!important]
> **Using Hardcoded Credentials**
>
> Initially, the application was configured to accept AWS access keys by directly embedding a user’s credentials:

For example, here’s the section of code where the credentials are defined:

```
const {
  S3Client,
  CreateBucketCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");


// Set the region
const accessKeyId = "";
const secretAccessKey = "";


const s3Config = { region: "us-east-1" };


if (secretAccessKey !== "" && secretAccessKey !== null) {
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
  // ...
};
```

To authenticate with AWS, a dedicated IAM user was created for the application. The steps followed include:

1.  Accessing the IAM console and creating a new user (e.g., SDK demo).
2.  Attaching the "Amazon S3 Full Access" policy directly to this user.
3.  Generating an access key for the user and updating the application with the provided access key and secret access key.

The following images illustrate parts of this process:

![The image shows an AWS Identity and Access Management (IAM) console screen, displaying user details and permissions, including an attached policy named "AmazonS3FullAccess."](https://kodekloud.com/kk-media/image/upload/v1752858903/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/aws-iam-console-user-permissions-s3.jpg)

![The image shows an AWS IAM interface for creating an access key, with options for different use cases like CLI, local code, and third-party services.](https://kodekloud.com/kk-media/image/upload/v1752858904/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/aws-iam-access-key-interface.jpg)

After updating the credentials, the application code looked like this:

```
const {
  S3Client,
  CreateBucketCommand,
  GetObjectCommand
} = require("@aws-sdk/client-s3");


// Set the region
const accessKeyId = "AKIAIAWSJ5U7MTRXX52";
const secretAccessKey = "WW1UN1SS/bIaEf+VlqYpXRlc4vQpNbQEOGKRg7D73";


const s3Config = { region: "us-east-1" };


if (secretAccessKey !== "" && secretAccessKey !== null) {
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
  } catch (err) {
    console.error(err);
  }
};
```

A successful bucket creation produces an output similar to:

```
[ec2-user@ip-172-31-18-206 app]$ vi index.js
[ec2-user@ip-172-31-18-206 app]$ node index.js iam-role-kodekloud-demo
{
  $metadata: {
    httpStatusCode: 200,
    requestId: '3G23256RKWZ23NH',
    extendedRequestId: 'ybXkufnGsdQX1DoM5/GdVQ+uImphU7RaqxludjBuzIMDxSqiPmJP8XiTNWZC+C2+x2fk1Gjhfno=',
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  Location: '/iam-role-kodekloud-demo'
}
[ec2-user@ip-172-31-18-206 app]$
```

After refreshing the S3 console, you’ll see that a new bucket (named "IAM Role - Code Cloud - Demo") has been created. This confirms that your application successfully authenticated and communicated with S3 using the provided credentials.

---

The next step is to remove the dependency on hardcoded credentials by using IAM roles. First, delete the bucket to clean up:

![The image shows an AWS S3 console page for deleting a bucket named "iam-role-kodekloud-demo," with warnings about the action being irreversible and requiring confirmation by entering the bucket name.](https://kodekloud.com/kk-media/image/upload/v1752858905/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/aws-s3-delete-bucket-confirmation.jpg)

After deleting the bucket, remove the credentials from your code. Without any authentication details, running the application will now fail and display an error such as:

```
InvalidAccessKeyId: The AWS Access Key ID you provided does not exist in our records.
    at throwDeFaultError (/.../default-error-handler.js:8:22)
    ...
    Code: 'InvalidAccessKeyId',
    AWSAccessKeyId: 'ASIAIAWSJ5JUYPMTDGI',
    RequestId: 'F6T0F9WQRS8BTV4',
    HostId: 'WtZX27Bif8wIk+wfmF9ISEeo2BdC8ER4TsWCVBLJfwtjI1mC8WqNwruenGSYzgS08CMaX6xA='
```

Next, create an IAM role that allows EC2 instances to interact with S3 without the need for explicit credentials:

1.  In the IAM console, select "Roles" and create a new role.
2.  Choose "AWS service" as the trusted entity since the role will be assumed by an EC2 instance.
3.  Under "Use case", select EC2 to enable the instance to call AWS services on your behalf.
4.  On the permissions page, attach the "Amazon S3 Full Access" policy.
5.  Name the role (e.g., AWS SDK S3) and complete the role creation.

The image below shows the use case selection screen:

![The image shows an AWS console interface where a user is selecting a use case for the EC2 service, with options like EC2 Systems Manager and Spot Fleet Role.](https://kodekloud.com/kk-media/image/upload/v1752858906/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/aws-ec2-console-use-case-selection.jpg)

After creating the role, return to your EC2 instances and modify the instance’s IAM role to assign the newly created role:

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, listing various IAM roles with their trusted entities and last activity details.](https://kodekloud.com/kk-media/image/upload/v1752858908/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/aws-iam-console-roles-listing.jpg)

![The image shows an AWS EC2 management console with details of two instances, one running and one stopped, including instance IDs, types, and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752858910/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/aws-ec2-management-console-instances.jpg)

![The image shows an AWS console screen where a user is modifying the IAM role for an EC2 instance. The instance ID is displayed, and an IAM role named "aws-sdk-s3" is selected.](https://kodekloud.com/kk-media/image/upload/v1752858911/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/aws-console-iam-role-ec2-instance.jpg)

Since the application no longer includes any credentials, running:

```
[ec2-user@ip-172-31-18-206 app]$ node index.js iam-role-kodekloud-demo
```

allows the EC2 instance to assume the attached IAM role. The application then automatically authenticates and creates the S3 bucket. Double-check in the S3 console to confirm that the bucket has been successfully created.

> [!important]
> **Key Takeaway**
>
> By assigning an IAM role to your EC2 instance, you enhance security and eliminate the risk associated with hardcoding access keys in your application. This method is applicable not only to the AWS SDK but also to the AWS CDK and other AWS platform tools.

Finally, view the S3 console to see the bucket list:

![The image shows an Amazon S3 console with a list of buckets, their regions, access settings, and creation dates. A notification at the top indicates a bucket was successfully deleted.](https://kodekloud.com/kk-media/image/upload/v1752858912/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Instance-Roles-Demo/amazon-s3-console-bucket-list.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/683c50bc-9bd3-4094-b666-354fcc06941f/lesson/dd905a56-7f45-48bc-8490-085e3b7665b2)**
>
> Watch video content
