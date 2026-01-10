# Demo Resource Health - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Advanced-Observability-with-CloudWatch/Demo-Resource-Health)

---

## Table of Contents

- Demo Resource Health
  - Deploying the CloudFormation Stack
  - Verifying Stack Creation
  - Confirming EC2 Instances
  - Exploring the CloudWatch Resource Health Dashboard
  - Conclusion
  - References
  - Watch Video
  - Practice Lab
    - Template Overview

---

## Content

AWS CloudWatch

Advanced Observability with CloudWatch

# Demo Resource Health

In this tutorial, you’ll learn how to deploy EC2 instances via AWS CloudFormation and monitor their health using the CloudWatch Resource Health dashboard.

## Deploying the CloudFormation Stack

### Template Overview

The CloudFormation template below launches three `t2.micro` EC2 instances across different Availability Zones. It automatically retrieves the latest Amazon Linux 2 AMI ID from the AWS Systems Manager (SSM) Parameter Store.

```
AWSTemplateFormatVersion: '2010-09-09'
Description: Launch 3 EC2 Instances in separate Subnets/AZs

Parameters:
  LatestAmiId:
    Type: AWS::SSM::Parameter::Value<AWS::EC2::Image::Ids>
    Default: /service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2

Resources:
  EC2Instance1:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref LatestAmiId
      InstanceType: t2.micro
      SubnetId: subnet-64e600e

  EC2Instance2:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref LatestAmiId
      InstanceType: t2.micro
      SubnetId: subnet-68cf014

  EC2Instance3:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref LatestAmiId
      InstanceType: t2.micro
      SubnetId: subnet-a5e028e9
```

> [!important]
> **Note**
>
> Ensure you replace the `subnet-xxxxxxx` values with valid subnet IDs from your VPC before deployment.

1.  Open the AWS Management Console and navigate to **CloudFormation**.
2.  Choose **Create stack** > **With new resources (standard)**.
3.  Under **Template source**, select **Upload a template file** and upload `resource_health.yaml`.
4.  Click **Next**, name your stack (e.g., `resource-health-demo`), then proceed through the configuration pages.
5.  Review and click **Create stack** to launch the resources.

![The image shows the AWS CloudFormation console where a user is in the process of creating a stack. The interface allows the user to prepare and specify a template, with options to upload a template file or use other sources.](https://kodekloud.com/kk-media/image/upload/v1752862336/notes-assets/images/AWS-CloudWatch-Demo-Resource-Health/aws-cloudformation-console-create-stack.jpg)

---

## Verifying Stack Creation

Return to the **CloudFormation** dashboard and monitor the stack status. Deployment completes when the status changes to **CREATE_COMPLETE**.

> [!important]
> **Warning**
>
> Stack creation can take several minutes. Do not interrupt the process or delete the stack until it reaches `CREATE_COMPLETE`.

![The image shows an AWS CloudFormation console with details of two stacks: "resource-health-demo" and "xray-sample." The "resource-health-demo" stack is in a "CREATE_COMPLETE" status, while "xray-sample" has a "DELETE_FAILED" status.](https://kodekloud.com/kk-media/image/upload/v1752862338/notes-assets/images/AWS-CloudWatch-Demo-Resource-Health/aws-cloudformation-stacks-status-diagram.jpg)

---

## Confirming EC2 Instances

Once the stack reaches `CREATE_COMPLETE`, go to the **EC2** console. Under **Instances**, verify that three `t2.micro` instances are **Initializing** or **Running**.

![The image shows an AWS EC2 dashboard with three running instances, each with the instance type "t2.micro" and status "Initializing."](https://kodekloud.com/kk-media/image/upload/v1752862339/notes-assets/images/AWS-CloudWatch-Demo-Resource-Health/aws-ec2-dashboard-three-instances-initializing.jpg)

---

## Exploring the CloudWatch Resource Health Dashboard

The **CloudWatch Resource Health** dashboard gives you a centralized view of instance-level metrics and status checks:

1.  Open the **CloudWatch** console and select **Resource Health**.
2.  Choose **EC2** as the resource type.

Initially, CPU charts may take up to five minutes to populate. Once data is available, customize your view:

| Dimension | Options                                        | Use Case                              |
| --------- | ---------------------------------------------- | ------------------------------------- |
| Metric    | CPUUtilization, StatusCheckFailed              | Monitor CPU load and health checks    |
| Group by  | Availability Zone, Instance Type, Image ID     | Visualize grouping by AZ or instance  |
| Sort by   | CPUUtilization, StatusCheckFailed, Instance ID | Quickly identify high-usage instances |

In **Map view**, instances are color-coded by CPU utilization:

- Blue: < 25%
- Green: 25%–50%
- Yellow: 50%–75%
- Red: > 75%

Switch to **List view** for a detailed table showing:

- CPU and memory usage (Memory requires \[CloudWatch Agent\] installation)
- Alarm state
- System and instance status checks

![The image shows an AWS CloudWatch Resource Health dashboard for EC2, displaying a status check with all checks passed.](https://kodekloud.com/kk-media/image/upload/v1752862340/notes-assets/images/AWS-CloudWatch-Demo-Resource-Health/aws-cloudwatch-ec2-health-dashboard.jpg)

> [!important]
> **Note**
>
> For large environments (hundreds of instances), use filters and grouping by tags, subnets, or Auto Scaling groups to quickly narrow down potential issues.

---

## Conclusion

You’ve learned how to:

- Deploy EC2 instances with AWS CloudFormation
- Retrieve the latest AMI via SSM Parameter Store
- Monitor instance health and metrics using the CloudWatch Resource Health dashboard

This workflow scales seamlessly across large fleets, ensuring proactive maintenance and rapid troubleshooting.

---

## References

- AWS CloudFormation Documentation: https://docs.aws.amazon.com/cloudformation/
- Amazon EC2 User Guide: https://docs.aws.amazon.com/ec2/
- Amazon CloudWatch User Guide: https://docs.aws.amazon.com/cloudwatch/
- AWS Systems Manager Parameter Store: https://docs.aws.amazon.com/systems-manager/maintenance-windows/latest/userguide/parameter-store.html

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/74326609-21c0-467c-a033-b526c2af16f2/lesson/2d93b7da-3bbc-4c7a-9c60-cd57883a8177)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/74326609-21c0-467c-a033-b526c2af16f2/lesson/b94d816a-69ff-41e2-9050-98ed33e7e193)**
>
> Practice lab
