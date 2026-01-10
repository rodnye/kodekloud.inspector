# Lambda Networking Demonstration Option 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Advanced-Topics/Lambda-Networking-Demonstration-Option-2)

---

## Table of Contents

- Lambda Networking Demonstration Option 2
  - Step 1: Create the Lambda Interface Endpoint
  - Step 2: Verify Endpoint Availability
  - Next Steps
  - Watch Video
    - Configure Endpoint Basics
    - Select VPC, Subnets & Security Groups
    - Set Endpoint Policy

---

## Content

AWS Lambda

Advanced Topics

# Lambda Networking Demonstration Option 2

In this walkthrough, you’ll learn how to connect your private VPC to the AWS-managed Lambda service VPC by creating an **AWS Lambda Interface Endpoint**. This approach lets your functions remain in the default service VPC while securely accessing resources in your own network.

![The image is a diagram illustrating Lambda networking within a Virtual Private Cloud (VPC) across two availability zones, showing connections between various cloud services and components.](https://kodekloud.com/kk-media/image/upload/v1752863088/notes-assets/images/AWS-Lambda-Lambda-Networking-Demonstration-Option-2/lambda-networking-vpc-diagram.jpg)

## Step 1: Create the Lambda Interface Endpoint

1.  Sign in to the AWS Management Console.
2.  Search for **VPC** and open the **VPC** dashboard.
3.  In the left menu, choose **Endpoints** → **Create Endpoint**.
4.  Verify the selected Region matches your Lambda function’s region.

### Configure Endpoint Basics

Use the table below to set up your interface endpoint:

| Parameter        | Description                               | Example                        |
| ---------------- | ----------------------------------------- | ------------------------------ |
| Name             | Friendly identifier for the endpoint      | CodeCloud Lambda Demo Endpoint |
| Service category | Endpoint type grouping                    | AWS services                   |
| Service name     | The AWS Lambda interface endpoint service | com.amazonaws.<region>.lambda  |
| Endpoint type    | Interface or Gateway                      | Interface                      |

> [!important]
> **High Availability**
>
> Select at least two subnets in different Availability Zones to ensure that ENIs remain reachable even if one AZ experiences issues.

### Select VPC, Subnets & Security Groups

- **VPC**: Pick your private VPC (for example, `KodeKloud Demo VPC`).
- **Subnets**: Choose multiple subnets across AZs for redundancy.
- **Security Groups**: Attach security groups to control inbound/outbound traffic for the endpoint’s Elastic Network Interfaces (ENIs).

![The image shows an Amazon Web Services (AWS) console interface, specifically the VPC (Virtual Private Cloud) section, displaying security group settings and policy options.](https://kodekloud.com/kk-media/image/upload/v1752863089/notes-assets/images/AWS-Lambda-Lambda-Networking-Demonstration-Option-2/aws-vpc-console-security-group-settings.jpg)

### Set Endpoint Policy

For testing or demos, you can allow all actions. In production, scope down permissions:

```
{
  "Statement": [
    {
      "Action": "lambda:*",
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

> [!important]
> **Security Best Practice**
>
> Avoid using wildcard (`*`) permissions in production. Restrict the `Resource` field to specific Lambda functions or ARNs.

Finally, click **Create Endpoint**. The console will show the new endpoint in **pending** state as AWS provisions it.

---

## Step 2: Verify Endpoint Availability

Once provisioning completes, the endpoint’s status changes to **Available**. Your private VPC is now linked to the AWS Lambda service VPC via the interface endpoint.

![The image shows an AWS console screen where a VPC endpoint has been successfully created, with its status marked as "Available."](https://kodekloud.com/kk-media/image/upload/v1752863090/notes-assets/images/AWS-Lambda-Lambda-Networking-Demonstration-Option-2/aws-console-vpc-endpoint-available.jpg)

## Next Steps

- Test Lambda function connectivity to resources in your private VPC.
- Review [AWS VPC Endpoints Documentation](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html) for advanced policies.
- Explore Option 1 or dive deeper into Lambda networking optimizations in upcoming lessons.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/71600a46-a390-4f40-884f-7588445b5976/lesson/4c8fe01e-6c51-4c5f-bb67-7f0066ceea2c)**
>
> Watch video content
