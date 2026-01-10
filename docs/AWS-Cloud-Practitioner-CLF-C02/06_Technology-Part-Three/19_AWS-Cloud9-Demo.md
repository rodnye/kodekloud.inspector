# AWS Cloud9 Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/AWS-Cloud9-Demo)

---

## Table of Contents

- AWS Cloud9 Demo
  - Creating Your Cloud9 Environment
  - Verifying the EC2 Instance
  - Exploring the Cloud9 Interface
  - Advanced Features and Collaboration
  - Conclusion
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# AWS Cloud9 Demo

Welcome to this quick AWS Cloud9 demo lesson. In this guide, we'll explore AWS Cloud9—a fully integrated development environment (IDE) that lets you write, run, and debug code directly from your browser. Although you can connect via SSH, today we’ll demonstrate its seamless integration with AWS services.

For optimal performance, I switched my session to the Ohio region to ensure ample resources were available.

![The image shows the AWS Cloud9 webpage, describing it as a cloud IDE for writing, running, and debugging code, with features and getting started resources.](https://kodekloud.com/kk-media/image/upload/v1752862043/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud9-Demo/frame_30.jpg)

## Creating Your Cloud9 Environment

To begin, click on **Create Environment**. For this demo, I named the setup "KodeKloud"—our Cloud9 test server. I provided a description and chose to launch a new EC2 instance (although you can attach an existing one, if preferred). In this case, I selected a T3 small instance running Amazon Linux 2 (Ubuntu 22.04 is also available) and set an idle timeout of 30 minutes to automatically shut it down when inactive.

Additional configuration options include setting up secondary connection methods like Systems Manager or Secure Shell, as well as adjusting VPC settings if required.

![The image shows an AWS Cloud9 setup page, detailing platform, connection, VPC settings, and optional tags for configuring an EC2 instance environment.](https://kodekloud.com/kk-media/image/upload/v1752862044/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud9-Demo/frame_70.jpg)

> [!important]
> **Tip**
>
> AWS Cloud9 automatically creates and attaches a service role, access role, and instance profile to the EC2 instance, which simplifies the setup process.

After clicking **Create**, you might notice more than one instance listed—the new instance alongside any previous sessions. An instance could be connected via Secure Shell (SSH) while another uses Systems Manager (SSM); both connection methods work effectively.

![The image shows an AWS Cloud9 dashboard with two environments listed, "AWS-CLI" and "KodeKloudCloud9," both using EC2 instances with different connection methods.](https://kodekloud.com/kk-media/image/upload/v1752862046/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud9-Demo/frame_120.jpg)

In my demonstration, I had an older environment open to streamline the process. When I clicked **Open**, the system indicated that the EC2 instance was off—this occurred because a previous instance had been accidentally deleted. Remember, Cloud9 creates the EC2 instance in the background. If you inspect the EC2 dashboard, you will see that only the KodeKloud instance is running. Although its status is “running,” it may still be initializing; a T3 small typically takes about two minutes to fully boot.

## Verifying the EC2 Instance

Let's explore the EC2 console for more details.

![The image shows an AWS EC2 console with a running instance, displaying options for instance management and monitoring, including system logs and instance details.](https://kodekloud.com/kk-media/image/upload/v1752862047/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud9-Demo/frame_200.jpg)

After examining the system log and finding no additional information, I checked the EC2 serial console for troubleshooting. Even though the output was minimal, it confirmed that the instance had completed its initialization phase.

## Exploring the Cloud9 Interface

Returning to Cloud9, I clicked on the KodeKloud environment to load the integrated Cloud9 interface. The IDE displays a file directory on the left and multiple tabs along the top for opening files, terminals, or other configurations.

![The image shows the AWS Cloud9 console with two environments listed: "AWS-CLI" and "KodeKloudCloud9," both using EC2 instances with different connection types.](https://kodekloud.com/kk-media/image/upload/v1752862048/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Cloud9-Demo/frame_260.jpg)

Within the interface, you can easily open files (like READMEs) with a double-click or launch a terminal to run commands. For example, to assign an environment variable, you can execute:

```
export ip="172-31-3"
```

The AWS CLI is pre-installed in Cloud9. To demonstrate, I executed the following command to describe the running instances:

```
aws ec2 describe-instances
```

This command produced an output similar to the example below:

```
{
  "Reservations": [
    {
      "Groups": [],
      "Instances": [
        {
          "AmiLaunchIndex": 0,
          "ImageId": "ami-0836581452dcd0da4",
          "InstanceId": "i-0f8b8dda47bc41bd1",
          "InstanceType": "t3.small",
          "LaunchTime": "2023-10-05T14:04:31+00:00",
          "Monitoring": {
            "State": "disabled"
          }
        }
      ]
    }
  ],
  "Placement": {
    "AvailabilityZone": "us-east-2c",
    "GroupName": "",
    "Tenancy": "default"
  },
  "PrivateDnsName": "ip-172-31-35-38.us-east-2.compute.internal",
  "PrivateIpAddress": "172.31.35.38",
  "ProductCodes": [],
  "PublicDnsName": "ec2-18-219-230-176.us-east-2.compute.amazonaws.com"
}
```

This output corresponds to the T3 small instance currently running. Notice the publicly accessible DNS names, private DNS name, and the instance’s location in zone 2C. To retrieve further details about the instance, I ran the following command:

```
aws ec2 describe-instance-attribute --instance-id i-0f8b8dda47bc41bd1 --attribute instanceType
```

The command returned information such as:

```
{
  "ProductCodes": [],
  "PublicDnsName": "ec2-18-219-230-176.us-east-2.compute.amazonaws.com",
  "PublicIpAddress": "18.219.230.176",
  "State": {
    "Code": 16,
    "Name": "running"
  },
  "StateTransitionReason": "",
  "SubnetId": "subnet-055924a34e745b9b7",
  "VpcId": "vpc-071f996c392666118",
  "Architecture": "x86_64",
  "BlockDeviceMappings": [
    {
      "DeviceName": "/dev/xvda",
      "Ebs": {
        "AttachTime": "2023-10-05T14:04:32+00:00",
        "DeleteOnTermination": true,
        "Status": "attached",
        "VolumeId": "vol-011ab3e361e971c8"
      }
    }
  ],
  "ClientToken": "aws-c-Insta-5WYWTJQ9GYMM"
}
```

To further confirm that it is indeed the Cloud9 environment, you can inspect the instance’s metadata:

```
{
  "GroupId": "sg-0f1219c11a5b616eb",
  "SourceDestCheck": true,
  "Tags": [
    {
      "Key": "Name",
      "Value": "aws-cloud9-KodeKuldCloud9-2e3ecaad288134c45acdb3bdd3cbc87a4"
    },
    {
      "Key": "aws:cloudformation:logical-id",
      "Value": "Instance"
    },
    {
      "Key": "aws:cloud9:owner",
      "Value": "AIDAJODHA4ZKAQ2IIFUSE"
    },
    {
      "Key": "aws:cloud9:environment",
      "Value": "2e3ecaad288134c45acdb3bdd3cbc87a4"
    }
  ]
}
```

```
spartansage:~/environment $
```

This output confirms the instance name and tags that indicate it is the Cloud9 environment. In addition, Cloud9 offers built-in support for Python, Git cloning, and live application previews.

For a more detailed view, here’s a sample of additional instance metadata:

```
{
  "EnclaveOptions": {
    "Enabled": false
  },
  "PlatformDetails": "Linux/UNIX",
  "UsageOperation": "RunInstances",
  "UsageOperationUpdateTime": "2023-10-05T14:04:31+00:00",
  "PrivateDnsNameOptions": {
    "HostnameType": "ip-name",
    "EnableResourceNameDnsARecord": false,
    "EnableResourceNameDnsAAAARecord": false
  },
  "MaintenanceOptions": {
    "AutoRecovery": "default"
  },
  "CurrentInstanceBootMode": "legacy-bios",
  "OwnerId": "067670530788",
  "RequesterId": "043320217385",
  "ReservationId": "r-026178ac711e3d80e"
}
```

## Advanced Features and Collaboration

AWS Cloud9 isn’t just an IDE—it offers extensive customization and collaboration features:

- **Advanced Editing:** Easily perform find-and-replace operations, navigate a complex file structure, and work with multiple programming languages such as C, C++, CoffeeScript, and more.
- **Integrated Debugger:** Tailor your debugging workspace by repositioning breakpoints within an integrated debugger panel.
- **Collaboration:** Chat with teammates, share sessions (with read-only or full access), and invite others via their IAM usernames.

Cloud9 also integrates source control, allowing you to initialize repositories or clone existing ones seamlessly. If you rely on AWS services, the AWS Explorer feature offers a visual and hierarchical way to manage your services.

> [!important]
> **SEO Tip**
>
> For more information on AWS Cloud9 features and best practices, see the official [AWS Documentation](https://docs.aws.amazon.com/cloud9/).

## Conclusion

In summary, AWS Cloud9 is a feature-rich, in-browser integrated development environment designed to streamline coding and collaboration in the cloud. Its ease-of-use and seamless integration with AWS make it an excellent choice for developers looking to quickly set up a robust, fully functional development workspace.

Happy coding with AWS Cloud9!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/fba9b7c2-0882-4174-b2bd-4c96363fe5ee)**
>
> Watch video content
