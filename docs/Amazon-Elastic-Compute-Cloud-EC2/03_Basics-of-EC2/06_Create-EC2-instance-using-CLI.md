# Create EC2 instance using CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Basics-of-EC2/Create-EC2-instance-using-CLI)

---

## Table of Contents

- Create EC2 instance using CLI
  - Table of Contents
  - 1. Exploring EC2 Commands
  - 2. Finding a Suitable AMI
  - 3. Launching an EC2 Instance
  - 4. Inspecting Instance Details
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Amazon Elastic Compute Cloud (EC2)

Basics of EC2

# Create EC2 instance using CLI

In this guide, you’ll learn how to launch and inspect EC2 instances using the AWS Command Line Interface (CLI). We’ll cover:

1.  Prerequisites
2.  Exploring EC2 commands
3.  Finding a suitable AMI
4.  Launching an instance
5.  Inspecting instance details

> [!important]
> **Note**
>
> Make sure you have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and configured with valid credentials. Set your default region with `aws configure` or by exporting the `AWS_DEFAULT_REGION` environment variable.

## Table of Contents

| Step                          | Description                                | Sample Command                                 |
| ----------------------------- | ------------------------------------------ | ---------------------------------------------- |
| 1\\. Explore EC2 commands     | View available EC2 operations and options  | `aws ec2 help`                                 |
| 2\\. Find an AMI              | List AMIs you own or public AMIs by Amazon | `aws ec2 describe-images --owners self amazon` |
| 3\\. Launch an instance       | Start a new instance with AMI ID and type  | `aws ec2 run-instances …`                      |
| 4\\. Inspect instance details | Retrieve instance metadata and status      | `aws ec2 describe-instances`                   |

## 1\. Exploring EC2 Commands

To discover all EC2 subcommands, options, and examples:

```
aws ec2 help
```

For details on a specific operation—such as launching instances:

```
aws ec2 run-instances help
```

These built-in help pages include required parameters, optional flags, and sample usage.

## 2\. Finding a Suitable AMI

An Amazon Machine Image (AMI) is required to launch an EC2 instance. To list AMIs you own and public AMIs provided by Amazon:

```
aws ec2 describe-images --owners self amazon
```

Example JSON output:

```
{
  "Images": [
    {
      "ImageId": "ami-056b35f582f6afbe7",
      "Name": "Cloud9AmazonLinux2-2023-04-04",
      "Architecture": "x86_64",
      "CreationDate": "2023-04-04T18:10:12.000Z",
      "PlatformDetails": "Linux/UNIX",
      "BlockDeviceMappings": [
        {
          "DeviceName": "/dev/xvda",
          "Ebs": {
            "SnapshotId": "snap-0875cc8a125bc63fd",
            "VolumeSize": 10,
            "VolumeType": "gp2"
          }
        }
      ]
    }
  ]
}
```

Key fields:

| Field               | Description                               |
| ------------------- | ----------------------------------------- |
| ImageId             | AMI identifier (used by `run-instances`)  |
| Name                | Human-readable name of the AMI            |
| Architecture        | CPU architecture (e.g., x86\\\_64, arm64) |
| PlatformDetails     | OS platform (Linux/UNIX, Windows)         |
| BlockDeviceMappings | Root volume size and type                 |

## 3\. Launching an EC2 Instance

With your chosen AMI ID, launch a `t2.micro` instance:

```
aws ec2 run-instances \
  --image-id ami-056b35f582f6afbe7 \
  --instance-type t2.micro \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyDemoInstance}]'
```

> [!important]
> **Warning**
>
> Running EC2 instances incurs AWS charges. Always terminate resources you no longer need:
>
> ```
> aws ec2 terminate-instances --instance-ids <your-instance-id>
> ```

Example JSON response:

```
{
  "Instances": [
    {
      "InstanceId": "i-076290d4a72165019",
      "ImageId": "ami-056b35f582f6afbe7",
      "InstanceType": "t2.micro",
      "LaunchTime": "2023-09-13T06:35:11+00:00",
      "Placement": {
        "AvailabilityZone": "ap-southeast-1a"
      }
    }
  ]
}
```

## 4\. Inspecting Instance Details

To view the full set of metadata, including networking and state:

```
aws ec2 describe-instances --instance-ids i-076290d4a72165019
```

Partial JSON output:

```
{
  "Reservations": [
    {
      "Instances": [
        {
          "PrivateIpAddress": "172.31.39.161",
          "PublicDnsName": "",
          "State": {
            "Code": 0,
            "Name": "pending"
          }
        }
      ]
    }
  ]
}
```

Important fields to track:

| Field            | Description                       |
| ---------------- | --------------------------------- |
| InstanceId       | Unique identifier of the instance |
| PrivateIpAddress | Internal IP within the VPC        |
| PublicDnsName    | Public DNS assigned (if any)      |
| State.Name       | Current state (pending, running)  |
| LaunchTime       | Timestamp of instance launch      |

## Links and References

- [AWS CLI Command Reference: ec2](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html)
- [Amazon EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [AWS Pricing Calculator](https://calculator.aws/#/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/73521775-8b40-44e8-8934-97d12606b167)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/3e1e8206-0aca-4367-966c-0076d55dcebe)**
>
> Practice lab
