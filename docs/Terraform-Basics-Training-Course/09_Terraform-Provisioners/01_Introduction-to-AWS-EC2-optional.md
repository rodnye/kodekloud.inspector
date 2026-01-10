# Introduction to AWS EC2 optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Provisioners/Introduction-to-AWS-EC2-optional)

---

## Table of Contents

- Introduction to AWS EC2 optional
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform Provisioners

# Introduction to AWS EC2 optional

In this article, we explore Amazon EC2, one of AWS's most popular services for running virtual machines in the cloud. EC2 instances—short for "Elastic Compute Cloud"—provide scalable compute resources that can be deployed in minutes. Like any physical or virtual computer, an EC2 instance runs an operating system (e.g., a Linux distribution or Windows) and can host software such as databases, web servers, and application servers.

![The image illustrates a cloud computing setup with MySQL on Ubuntu, a web server on RHEL, and ASP.NET Core on Windows, using Elastic Compute Cloud.](https://kodekloud.com/kk-media/image/upload/v1752884207/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-AWS-EC2-optional/frame_40.jpg)

AWS supplies pre-configured templates known as Amazon Machine Images (AMIs). These images include the operating system and any additional software configurations required for your EC2 instances. Popular AMIs include Ubuntu 20.04, RHEL 8, Amazon Linux 2, and Windows 2019.

![The image lists Amazon Machine Images (AMIs) for Amazon Linux 2, Red Hat Enterprise Linux 8, and Ubuntu Server 20.04 LTS with their respective IDs.](https://kodekloud.com/kk-media/image/upload/v1752884208/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-AWS-EC2-optional/frame_70.jpg)

Each AMI comes with an ID that is specific to the AWS region where you plan to deploy your instance. Additionally, EC2 provides various instance types, which are configurations combining CPU, memory, and networking performance tailored for specific workloads.

> [!important]
> **Instance Types Overview**
>
> For example, general purpose instance types offer a balanced mix for many common workloads. In contrast, compute-optimized types are ideal for high-performance CPU operations such as batch processing and data modeling, while memory-optimized types cater to applications that process large data sets in memory. For more details, consult the [AWS Documentation](https://aws.amazon.com/ec2/instance-types/).

General purpose instance types are subdivided into categories such as T2, T3, and M5, each available in various sizes to meet different requirements. For instance, the T2 Nano provides one virtual CPU and half a gigabyte of RAM, while the T2 Micro offers one vCPU and one gigabyte of RAM. Workloads requiring higher resources can select from sizes that range from small to 2xlarge, though these options vary among the different instance families.

![The image shows a table of AWS T2 General Purpose instance types, detailing vCPU and memory specifications, alongside icons for T2, T3, and M5 instances.](https://kodekloud.com/kk-media/image/upload/v1752884209/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-AWS-EC2-optional/frame_150.jpg)

Persistent storage for EC2 instances is managed by Amazon EBS (Elastic Block Storage). AWS currently offers five types of EBS volumes, including three high-performance SSD options and two cost-effective HDD alternatives. You can choose the storage type and size to attach to your instance during provisioning, and additional disks can be attached later if needed.

Another powerful feature of EC2 is the ability to pass user data during instance creation. This feature lets you execute configuration tasks or scripts automatically during startup. For instance, to install the Nginx package on an Ubuntu server, you can supply the following shell script as user data:

```
#!/bin/bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

Similarly, Windows instances can be configured using PowerShell or BAT scripts.

> [!important]
> **Accessing EC2 Instances**
>
> After deployment, Linux EC2 instances are typically accessed via SSH keys, while Windows instances are accessed using Remote Desktop (RDP) along with the appropriate username and password.

In the upcoming demo, we will walk through the process of deploying a Linux EC2 instance using the AWS Management Console.

![The image illustrates authentication methods for servers: SSH key pair for Ubuntu Server 20.04 LTS and user/password for Windows Server 2019.](https://kodekloud.com/kk-media/image/upload/v1752884210/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-AWS-EC2-optional/frame_260.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9fcbd3cd-b06d-4816-8646-3639ca3d19cd/lesson/a67eb482-93a5-4f0e-b3ce-7ee75c6f7c0e)**
>
> Watch video content
