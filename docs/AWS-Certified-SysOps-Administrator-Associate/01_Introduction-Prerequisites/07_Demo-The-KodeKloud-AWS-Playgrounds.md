# Demo The KodeKloud AWS Playgrounds - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Introduction-Prerequisites/Demo-The-KodeKloud-AWS-Playgrounds)

---

## Table of Contents

- Demo The KodeKloud AWS Playgrounds
  - Accessing the AWS Playground
  - Starting Your Lab Environment
  - Working with AWS Services
  - Navigating the AWS Console
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Introduction Prerequisites

# Demo The KodeKloud AWS Playgrounds

Welcome to this lesson! I’m Michael Forrester, and in this article, we’ll dive into the AWS Playgrounds available on KodeKloud.com. This tutorial is designed to help you explore, experiment, and gain hands-on experience with AWS services in a safe, sandboxed environment.

## Accessing the AWS Playground

After logging into your KodeKloud account, navigate to the "Playgrounds" section. While multiple playgrounds are available, this lesson focuses exclusively on the AWS playground.

Key features on the AWS playground page include:

• The **"Launch Now"** button, which initiates your terminal environment.  
• A curated list of approximately 60 AWS service options (including service sizes such as nano, micro, small, medium variants of T1, T2, T3, etc.). Note that while GP2 is accessible, GP3 and T4 instances aren’t available.

![The image is a webpage from KodeKloud featuring the "AWS Sandbox Playground," which offers access to cloud computing services. It includes a brief explanation of AWS and cloud computing, with a "Launch now" button.](https://kodekloud.com/kk-media/image/upload/v1752861257/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-The-KodeKloud-AWS-Playgrounds/aws-sandbox-playground-webpage.jpg)

Once you click on **"Launch Now,"** you will receive a unique URL for logging into the AWS environment. Keep in mind that your access is limited to the specific AWS services provided by the playground.

![The image is a webpage from KodeKloud detailing AWS services available for testing, including EC2 instances, S3 object storage, RDS, and EKS. It includes specific guidelines and limitations for each service.](https://kodekloud.com/kk-media/image/upload/v1752861258/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-The-KodeKloud-AWS-Playgrounds/aws-services-testing-guidelines.jpg)

At the bottom of the page, you will see a summary list of additional AWS services—from Cloud Shell to SES, Managed Kubernetes, and CodeCommit. Although CodeCommit is scheduled for retirement soon, it remains available for your use.

![The image shows a list of services available in a playground environment, including SNS, KMS, VPC, and others, with options to launch them.](https://kodekloud.com/kk-media/image/upload/v1752861259/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-The-KodeKloud-AWS-Playgrounds/playground-services-list-sns-kms-vpc.jpg)

## Starting Your Lab Environment

After launching the playground environment, a standard lab interface will appear—one that many of you might recognize from previous courses. Click on **"Start Lab"** to view your lab credentials, which include a lab user ID, password, and a console login URL.

![The image shows a KodeKloud AWS Playground interface with a console link, username, password, and expiration time for accessing an AWS console.](https://kodekloud.com/kk-media/image/upload/v1752861260/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-The-KodeKloud-AWS-Playgrounds/kodekloud-aws-playground-interface.jpg)

Open a new browser tab and paste the AWS console link. Notice how the account ID is automatically populated. Then, copy your lab user ID and password into the respective fields.

![The image shows an AWS IAM user sign-in page with fields for account ID, username, and password. There's also an advertisement for Amazon Bedrock, a service for building and scaling generative AI applications.](https://kodekloud.com/kk-media/image/upload/v1752861262/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-The-KodeKloud-AWS-Playgrounds/aws-iam-user-signin-page.jpg)

Click **"Sign In"** to access the AWS console. Remember that the service limitations provided on the playground page continue to apply—you are limited to the curated list of approximately 60 AWS services.

> [!important]
> **Exploration Tip**
>
> After signing into the AWS console, use AWS Cloud Shell for an instant command line interface. This tool is great for running AWS CLI commands to interact with your AWS resources.

## Working with AWS Services

Once logged in, you can explore and practice with various AWS services. For example, you can launch Cloud Shell by clicking its icon. Once activated, the Cloud Shell environment is set up within seconds, allowing you immediate access.

Try running commands to list your AWS resources. For instance:

```
aws ec2 describe-instances
{
    "Reservations": []
}

aws ec2 describe-vpcs
{
    "Vpcs": [
        {
            "CidrBlock": "172.31.0.0/16",
            "DhcpOptionsId": "dopt-8763c58c1fbe0e9d",
            "State": "available",
            "VpcId": "vpc-8dbe8ee12783ae82",
            "OwnerId": "63742338722",
            "InstanceTenancy": "default",
            "CidrBlockAssociationSet": []
        }
    ]
}
```

Even if you close and then reopen Cloud Shell, your environment remains persistent. Alternatively, you can manually manage services like EC2 or RDS directly via the AWS console.

> [!important]
> **Important**
>
> Keep in mind that the lab user's region is set to Virginia. This reflects the playground's limitations and ensures consistency throughout your session.

![The image shows the AWS Management Console home page, featuring sections for recently visited services, applications, and widgets for AWS Health and cost usage.](https://kodekloud.com/kk-media/image/upload/v1752861263/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-The-KodeKloud-AWS-Playgrounds/aws-management-console-home-page.jpg)

## Navigating the AWS Console

In addition to using Cloud Shell, you are free to explore other console interfaces offered by AWS. For example, the EC2 Dashboard provides an overview of your resources and offers options to launch new instances.

![The image shows an Amazon EC2 Dashboard from AWS, displaying resources, service health, and options to launch instances in the US East (N. Virginia) region.](https://kodekloud.com/kk-media/image/upload/v1752861265/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-The-KodeKloud-AWS-Playgrounds/amazon-ec2-dashboard-us-east.jpg)

## Conclusion

Thank you for following along with this walkthrough of the KodeKloud AWS Playground. Enjoy exploring the AWS environment, experiment with the available services, and enhance your cloud computing skills. Happy sandboxing!

For additional AWS concepts and hands-on practice, consider checking out other tutorials and resources on [KodeKloud](https://kodekloud.com) and [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fe04c358-004c-414b-8cb1-74c131a8428e/lesson/f5c22c7b-85f0-4ac9-a777-9adb6cfb20dd)**
>
> Watch video content
