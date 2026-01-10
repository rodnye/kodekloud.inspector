# Demo Deploying an EC2 Instance optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Provisioners/Demo-Deploying-an-EC2-Instance-optional)

---

## Table of Contents

- Demo Deploying an EC2 Instance optional
  - Launching an Instance
  - Connecting via SSH
  - Verifying Nginx Installation
  - Watch Video
    - Step 1: Choose an AMI
    - Step 2: Choose an Instance Type
    - Step 3: Configure Storage
    - Step 4: Add Tags
    - Step 5: Configure Security Group
    - Step 6: Review and Launch

---

## Content

Terraform Basics Training Course

Terraform Provisioners

# Demo Deploying an EC2 Instance optional

In this lesson, you will learn how to provision a Linux EC2 instance using the AWS Management Console and configure it to serve web content using Nginx. This step-by-step guide is perfect for beginners seeking a hands-on introduction to AWS EC2 deployments.

Access the EC2 service from the AWS Management Console by clicking on the Services tab at the top left.

![The image shows the AWS Management Console homepage, featuring service search, recently visited services, solution-building options, and links to AWS resources and training.](https://kodekloud.com/kk-media/image/upload/v1752884197/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_10.jpg)

The EC2 service is grouped under the Compute category. Alternatively, you can use the service search bar on the dashboard to quickly locate EC2.

![The image shows the AWS Management Console, displaying a list of various AWS services categorized under sections like Compute, Storage, Database, and Machine Learning.](https://kodekloud.com/kk-media/image/upload/v1752884198/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_20.jpg)

For an even faster start, click the "launch a virtual machine" link located just below the search bar.

Once inside the EC2 console, ensure you are in the central Canada region; this is where your instance will be deployed.

![The image shows the Amazon EC2 management console, displaying resources and options for launching instances in the Canada (Central) region, with service health status.](https://kodekloud.com/kk-media/image/upload/v1752884199/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_40.jpg)

---

## Launching an Instance

To create your EC2 instance, click the **Launch Instance** button to open the launch wizard.

### Step 1: Choose an AMI

Select an Amazon Machine Image (AMI). For this demonstration, we will deploy a web server on Ubuntu. Choose the Ubuntu 20.04 AMI, which is free tier eligible.

### Step 2: Choose an Instance Type

Choose an instance type; for example, select **t2.micro** to remain within the free tier.

![The image shows the AWS EC2 launch instance wizard, specifically the step for choosing an Amazon Machine Image (AMI) with various operating system options.](https://kodekloud.com/kk-media/image/upload/v1752884200/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_60.jpg)

The subsequent screens allow you to configure instance parameters. For most settings, the default options are suitable. Use the default VPC for the region and select the default subnet.

![The image shows the AWS EC2 instance selection screen, highlighting the "t2.micro" instance type, which is eligible for the free usage tier.](https://kodekloud.com/kk-media/image/upload/v1752884201/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_70.jpg)

![The image shows the "Configure Instance Details" page of the AWS EC2 launch instance wizard, displaying options for setting up a virtual server.](https://kodekloud.com/kk-media/image/upload/v1752884203/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_90.jpg)

> [!important]
> **Using User Data for Instance Setup**
>
> To serve web content, leverage the EC2 user data feature by pasting the following shell script in the "Advanced Details" section. This script installs and configures Nginx automatically.

Paste the following script:

```
#!/bin/bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Step 3: Configure Storage

Click **Next** to proceed to the storage configuration stage. By default, an 8 GB gp2 SSD volume is provisioned as the root partition.

![The image shows the "Add Storage" step in the AWS EC2 launch instance wizard, detailing volume configuration options like size, type, and encryption.](https://kodekloud.com/kk-media/image/upload/v1752884204/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_130.jpg)

### Step 4: Add Tags

For easy identification, add a tag with the key `Name` and the value `web server`.

### Step 5: Configure Security Group

Set up the security group to allow SSH access. Create a new security group (e.g., "SSH access") and supply a suitable description. Under rule type, select SSH with the default source set to `0.0.0.0/0`. Note that while this configuration is convenient for testing, it is not recommended for production environments.

![The image shows the AWS EC2 instance launch wizard, specifically the "Configure Security Group" step, with SSH access settings being configured.](https://kodekloud.com/kk-media/image/upload/v1752884205/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_160.jpg)

### Step 6: Review and Launch

Review your instance configuration and click **Launch**. You will then be prompted to choose an existing key pair or create a new one. Since no key pair exists in this region, opt to create a new key pair named `web` and download it. This key pair is essential for SSH authentication.

![The image shows an AWS EC2 instance launch wizard, prompting to select or create a key pair for secure access.](https://kodekloud.com/kk-media/image/upload/v1752884206/notes-assets/images/Terraform-Basics-Training-Course-Demo-Deploying-an-EC2-Instance-optional/frame_210.jpg)

It may take a few minutes for the instance to launch. Click **View Instances** to monitor its status. Once launched, look for the instance tagged as `web server` in the running state. Clicking on the instance will display essential details such as the public IP address, VPC, subnet, instance type, AMI ID, security group, and attached EBS volumes.

---

## Connecting via SSH

Open your local terminal to SSH into the instance using the downloaded key pair. Replace `<PUBLIC_IP_ADDRESS>` with the actual public IP copied from the console.

```
ssh -i ~/Downloads/web.pem ubuntu@<PUBLIC_IP_ADDRESS>
```

On your first connection attempt, you might see a warning about the host's authenticity:

```
The authenticity of host '3.97.9.249 (3.97.9.249)' can't be established.
ECDSA key fingerprint is SHA256:mUC8nA+kT4mFnGx46Yda1CH7LsxGtQtHd6+miQvs6I.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '3.97.9.249' (ECDSA) to the list of known hosts.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
WARNING: UNPROTECTED PRIVATE KEY FILE!
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0664 for '/home/yourusername/Downloads/web.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "/home/yourusername/Downloads/web.pem": bad permissions
ubuntu@3.97.9.249: Permission denied (publickey).
```

> [!important]
> **Private Key Permissions**
>
> If you receive this error about private key file permissions, ensure the key file is restricted so that only the owner can read it. Execute the following command:

```
chmod 400 ~/Downloads/web.pem
```

Try connecting again with:

```
ssh -i ~/Downloads/web.pem ubuntu@<PUBLIC_IP_ADDRESS>
```

---

## Verifying Nginx Installation

After successfully connecting via SSH, verify that Nginx is running by checking its status:

```
systemctl status nginx
```

You should see an output similar to the following, confirming that Nginx is active and running:

```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2020-11-19 22:14:38 UTC; 2min 45s ago
     Docs: man:nginx(8)
 Main PID: 2343 (nginx)
    Tasks: 2 (limit: 1164)
   Memory: 5.2M
   CGroup: /system.slice/nginx.service
           ├─2343 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2344 nginx: worker process


Nov 19 22:14:38 ip-172-31-18-154 systemd[1]: Starting A high performance web server and a...
Nov 19 22:14:38 ip-172-31-18-154 systemd[1]: Started A high performance web server an...
```

This verification confirms that Nginx was successfully installed using the user data configuration.

---

This concludes the lesson on deploying an EC2 instance using the AWS Management Console and setting up Nginx with EC2's user data feature. For further details on AWS deployments, check out [AWS EC2 Documentation](https://aws.amazon.com/ec2/).

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9fcbd3cd-b06d-4816-8646-3639ca3d19cd/lesson/d8ee21e7-848e-4775-b878-b7093917153c)**
>
> Watch video content
