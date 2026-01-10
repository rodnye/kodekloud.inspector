# Lambda Networking Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-Networking-Demo)

---

## Table of Contents

- Lambda Networking Demo
  - Step 1: Create the Lambda Function
  - Step 2: Configure VPC Settings
  - Step 3: Update Execution Role Permissions
  - Step 4: Verify the Configuration
  - Step 5: Test and Validate Network Interfaces
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda Networking Demo

In this lesson, we will guide you through configuring an AWS Lambda function within a Virtual Private Cloud (VPC). By integrating your Lambda with a VPC, you enable secure communication with private resources like an RDS instance or other services deployed within your VPC.

## Step 1: Create the Lambda Function

Begin by creating your Lambda function. For this demonstration, we'll name the function "VPC demo". By default, Lambda functions run in an environment that provides internet access. This initial setup allows you to later integrate VPC connectivity without impacting the function's execution.

![The image shows the AWS Lambda function creation page, where options for authoring from scratch, using a blueprint, or a container image are available. It includes fields for function name, runtime selection, architecture choice, and permissions settings.](https://kodekloud.com/kk-media/image/upload/v1752859537/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Networking-Demo/aws-lambda-function-creation-page.jpg)

## Step 2: Configure VPC Settings

To connect your Lambda function to internal resources within your VPC, navigate to the function's configuration tab and locate the VPC settings. Click "Edit" and then choose the desired VPC—using the default VPC is a convenient option. Select two subnets and assign a security group that allows the necessary traffic for your application.

![The image shows an AWS Lambda interface where a user is editing the VPC settings for a function. A dropdown menu is open, displaying various VPC options to select from.](https://kodekloud.com/kk-media/image/upload/v1752859538/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Networking-Demo/aws-lambda-vpc-settings-dropdown.jpg)

After selecting the subnets and security group, click "Save". At this stage, you may encounter an error indicating that the execution role does not have permissions to call CreateNetworkInterface on EC2.

![The image shows an AWS Lambda configuration screen where a VPC, subnets, and security groups are being set up. It includes details about inbound rules for specific ports.](https://kodekloud.com/kk-media/image/upload/v1752859540/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Networking-Demo/aws-lambda-vpc-configuration.jpg)

![The image shows an AWS Lambda configuration screen where subnets and security groups are being set up. An error message indicates that the execution role lacks permissions to call `CreateNetworkInterface` on EC2.](https://kodekloud.com/kk-media/image/upload/v1752859541/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Networking-Demo/aws-lambda-configuration-error.jpg)

> [!important]
> **Tip**
>
> If you encounter the `CreateNetworkInterface` error, it indicates that your Lambda function’s execution role lacks the required permissions. Proceed to Step 3 to resolve this issue.

## Step 3: Update Execution Role Permissions

When a Lambda function is deployed within a VPC, it must have permissions to create network interfaces and perform other network-related actions. To fix the error, update the Lambda function's execution role to include the necessary permissions. Follow these steps:

1.  Go to the Permissions tab in your Lambda function's configuration.
2.  Locate the VPC execution role.
3.  Attach a policy that grants the following permissions:
    - logs:CreateLogGroup
    - logs:CreateLogStream
    - logs:PutLogEvents
    - ec2:CreateNetworkInterface
    - ec2:DescribeNetworkInterfaces
    - ec2:DescribeSubnets
    - ec2:DeleteNetworkInterface
    - ec2:AssignPrivateIpAddresses
    - ec2:UnassignPrivateIpAddresses

Below is the JSON policy you can attach to your execution role:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSLambdaVPCAccessExecutionPermissions",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeSubnets",
        "ec2:DeleteNetworkInterface",
        "ec2:AssignPrivateIpAddresses",
        "ec2:UnassignPrivateIpAddresses"
      ],
      "Resource": "*"
    }
  ]
}
```

After updating the policy, return to your Lambda function and save the VPC configuration again. The update should now be accepted without any errors.

## Step 4: Verify the Configuration

After saving the configuration, review the VPC settings in your Lambda function. Verify that the selected VPC, configured subnets, and chosen security group (along with its rules) correctly reflect your intended setup.

![The image shows an AWS Lambda console screen for a function named "vpc-demo," displaying its configuration details, including VPC settings and subnets.](https://kodekloud.com/kk-media/image/upload/v1752859543/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Networking-Demo/aws-lambda-vpc-demo-config.jpg)

## Step 5: Test and Validate Network Interfaces

To ensure that your Lambda function is successfully connected to the VPC, run a test to confirm that your code executes as expected. Then, proceed to the EC2 console and inspect the network interfaces. You should observe one or more network interfaces associated with your Lambda function in the default VPC.

![The image shows an AWS console displaying a list of network interfaces, including details like security group IDs, interface type, instance ID, status, and IP addresses. The interface types include Elastic network interfaces and AWS Lambda VPC ENI.](https://kodekloud.com/kk-media/image/upload/v1752859544/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Networking-Demo/aws-console-network-interfaces-details.jpg)

For a refined view, filter by the default VPC to display only the relevant network interfaces created for your Lambda function along with their configuration details.

![The image shows an AWS console interface displaying a list of network interfaces, including details like interface IDs, availability zones, security groups, and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752859545/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Networking-Demo/aws-console-network-interfaces-list.jpg)

Once the network interfaces are in place, your Lambda function can securely communicate with resources located within the VPC.

> [!important]
> **Final Note**
>
> By following these steps and ensuring your execution role has the proper permissions, you can leverage the benefits of VPC integration for enhanced security and controlled network access in your AWS environment.

This concludes our lesson on configuring an AWS Lambda function to run within a VPC. With proper VPC settings and updated execution role permissions, your Lambda function can reliably access internal AWS resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/4c13980e-3491-48a7-8d93-9ee73c7cacbd)**
>
> Watch video content
