# Lambda Networking Demonstration Option 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Advanced-Topics/Lambda-Networking-Demonstration-Option-1)

---

## Table of Contents

- Lambda Networking Demonstration Option 1
  - Steps to Enable VPC Access
  - Links and References
  - Watch Video

---

## Content

AWS Lambda

Advanced Topics

# Lambda Networking Demonstration Option 1

Configuring AWS Lambda networking in your own private VPC allows your function to securely access resources such as RDS databases, ElastiCache clusters, or internal APIs. In this guide, you’ll move a Lambda function out of the default AWS-managed VPC and into a custom VPC.

## Steps to Enable VPC Access

1.  **Open or create your Lambda function**  
    In the AWS Lambda console, choose your existing function or click **Create function** to define a new one.
2.  **Enable VPC configuration**  
    Scroll to **Configuration**, expand **Advanced settings**, and toggle **Enable VPC** on.
3.  **Select your VPC**  
    From the **VPC** dropdown, pick the VPC you’ve already provisioned (e.g., `cold-cloud-demo-vpc`).
4.  **Choose subnets for high availability**  
    Expand **Subnets** and select at least two subnets in different Availability Zones. This ensures your function remains resilient during AZ outages.
    - One subnet in **us-west-1a**
    - One subnet in **us-west-1c**

    > [!important]
    > **Note**
    >
    > Always select subnets from multiple Availability Zones to maintain high availability. If one AZ goes down, Lambda can still execute in the other.

5.  **Assign security groups**  
    Under **Security groups**, pick existing security groups or create new ones to control inbound and outbound traffic for your function’s Elastic Network Interface (ENI).

    > [!important]
    > **Warning**
    >
    > Attaching a Lambda function to a VPC can increase cold start times because ENIs must be initialized. Review [AWS Lambda cold start considerations](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html) for mitigation strategies.

![The image shows an AWS Lambda configuration screen where a user is selecting VPC, subnets, and security groups for a function. The security group section shows no inbound or outbound rules displayed.](https://kodekloud.com/kk-media/image/upload/v1752863086/notes-assets/images/AWS-Lambda-Lambda-Networking-Demonstration-Option-1/aws-lambda-vpc-subnets-security-groups.jpg)

Once these steps are complete, your Lambda function will operate within your private VPC, able to access internal resources while being protected by your defined security groups.

---

## Links and References

- [AWS Lambda Networking](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html)
- [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/)
- [AWS Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/71600a46-a390-4f40-884f-7588445b5976/lesson/383b3c12-1670-4a07-9f8c-a9874d47b55e)**
>
> Watch video content
