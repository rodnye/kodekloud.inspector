# EC2 Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/EC2-Demo)

---

## Table of Contents

- EC2 Demo
  - Launching an EC2 Instance
  - Configuring Networking and Security
  - Viewing Instance Details
  - Connecting to Your EC2 Instance
  - Stopping and Terminating the Instance
  - Watch Video
  - Practice Lab

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# EC2 Demo

In this detailed tutorial, you will learn how to deploy, connect to, and manage an Amazon EC2 instance securely using AWS. We will walk through launching an EC2 instance using a specific Amazon Machine Image (AMI), configuring networking and security, and connecting via SSH with a certificate.

---

## Launching an EC2 Instance

Begin by accessing the AWS console and using the search bar to navigate to the EC2 service. In the EC2 dashboard, click on the "Instances" section. You can either click the direct "Launch instances" button on the dashboard or select the option within the instances page.

![The image shows the Amazon EC2 dashboard from AWS, displaying resources, account attributes, and options to launch instances in the US East (N. Virginia) region. It includes sections for service health, scheduled events, and AWS exploration tips.](https://kodekloud.com/kk-media/image/upload/v1752864820/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/amazon-ec2-dashboard-us-east.jpg)

On the instances page, click "Launch instances" to start the configuration process. The first step is to assign a name to your instance – for example, "EC2 demo instance" – and select a specific AMI. The selected AMI acts as a blueprint for your instance by defining the operating system and optionally including pre-installed software or services.

![The image shows an AWS EC2 instance launch configuration screen, where a user is selecting an Amazon Machine Image (AMI) and configuring instance details. The summary section on the right provides an overview of the selected options.](https://kodekloud.com/kk-media/image/upload/v1752864822/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-ec2-instance-launch-configuration.jpg)

You can choose AMIs from the Quick Start section, which include popular options like Amazon Linux, Ubuntu, and macOS. Custom AMIs will appear under "My AMIs", or you can use the search bar to find a specific image, such as typing "Ubuntu" to explore different versions and architectures.

![The image shows an AWS EC2 console displaying a list of Ubuntu AMIs (Amazon Machine Images) available for selection, with options for different versions and architectures.](https://kodekloud.com/kk-media/image/upload/v1752864823/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-ec2-ubuntu-amis-list.jpg)

If preferred, explore the Amazon Marketplace for pre-configured AMIs provided by software vendors. This can help you deploy applications like a Cisco router with the appropriate license without manual setup of a base OS.

![The image shows an AWS console page for selecting an Amazon Machine Image (AMI), specifically displaying Ubuntu options from the AWS Marketplace.](https://kodekloud.com/kk-media/image/upload/v1752864824/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-console-ami-ubuntu-options.jpg)

For this demo, we will use the Amazon Linux 2023 AMI from the Quick Start tab. Keep in mind that each AMI includes a unique ID associated with a specific region, so verify the AMI ID for your desired region before proceeding.

Next, choose your instance type. For example, the T2 micro is free tier eligible. Then, configure the key pair to securely connect to your instance. You have the option to select an existing key pair or create a new one by following these steps:

1.  Select "Create new key pair".
2.  Enter a name (e.g., "EC2 demo").
3.  Choose the default RSA type and the .pem format.
4.  Download the PEM file and store it securely.

![The image shows a dialog box in the AWS console for creating a key pair, with options to name the key pair, select the key pair type (RSA or ED25519), and choose the private key file format (.pem or .ppk).](https://kodekloud.com/kk-media/image/upload/v1752864825/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-console-key-pair-dialog.jpg)

---

## Configuring Networking and Security

After setting up your key pair, proceed to configure the networking settings including the Virtual Private Cloud (VPC), subnet, and public IP assignment. The default VPC and subnet are usually sufficient, but ensure that you enable a public IP if you need to connect to your instance over the internet.

Next, assign an existing security group or create a new one. By default, a new security group includes an inbound rule allowing SSH traffic and outbound rules permitting all traffic. Configure your storage options, such as an 18 GB root volume, and leave advanced options like spot instances or auto recovery settings as default unless your scenario demands a custom setup.

Once all settings are applied, click "Launch instance". Your "EC2 demo instance" will now be deployed.

![The image shows an AWS EC2 console with a success message indicating the launch of an instance. Below, there are options for next steps, such as creating billing alerts, connecting to the instance, and managing monitoring.](https://kodekloud.com/kk-media/image/upload/v1752864826/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-ec2-console-instance-launch.jpg)

---

## Viewing Instance Details

After launching the instance, return to the Instances page to review its details. Here you will find important information such as:

- Instance ID
- Current state (running)
- Instance type
- Availability zone
- Public and private IP addresses
- Public DNS name

Additional details include the security group settings, key pair name, launch time, and monitoring metrics like CPU utilization. You can also review network settings such as inbound/outbound rules, subnet, and network interfaces.

![The image shows an AWS EC2 management console with details of a running instance named "ec2-demo-instance," including its security group settings and inbound/outbound rules.](https://kodekloud.com/kk-media/image/upload/v1752864828/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-ec2-management-console-instance.jpg)

![The image shows an AWS EC2 management console with monitoring details for an instance named "ec2-demo-instance." It displays metrics like CPU utilization, network activity, and status checks.](https://kodekloud.com/kk-media/image/upload/v1752864829/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-ec2-management-console-metrics.jpg)

---

## Connecting to Your EC2 Instance

To establish an SSH connection with your instance, copy its public IP or public DNS address from the instance details page. Then, verify that your PEM file (e.g., "EC2.pem") is available in your terminal directory:

```
ls
# Expected output:
# ec2.pem
# kubeseal-windows-installer/
# main.pem
# main2.pem
# test.code-workspace
# test.yaml
# wacom.pem
```

Use the SSH command with the following format to connect to your instance:

```
ssh -i ec2.pem username@<PUBLIC_IP_OR_DNS>
```

Refer to the AMI documentation for the correct default username. For an Amazon Linux AMI, the username is typically "ec2-user". AWS also provides connection instructions when you click the "Connect" button. An example command is:

```
chmod 400 ec2-demo.pem
ssh -i "ec2-demo.pem" ec2-user@ec2-3-88-162-255.compute-1.amazonaws.com
```

After executing the command, type "yes" when prompted to confirm the connection. Once connected, your prompt should look similar to the following:

```
[ec2-user@ip-172-31-81-100 ~]$ ls
[ec2-user@ip-172-31-81-100 ~]$ ls -la
total 12
drwx------.  3 ec2-user ec2-user  74 Sep 28 23:43 .
drwxr-xr-x.  3 root     root       22 Sep 28 23:43 ..
-rw-r--r--.  1 ec2-user ec2-user 141 Jan 28  2023 .bash_profile
-rw-r--r--.  1 ec2-user ec2-user 492 Jan 28  2023 .bashrc
drwx------.  2 ec2-user ec2-user   29 Sep 28 23:43 .ssh
[ec2-user@ip-172-31-81-100 ~]$
```

> [!important]
> **Tip**
>
> Always ensure your PEM file permissions are set correctly using the chmod command (e.g., chmod 400 ec2-demo.pem) to avoid connection issues.

---

## Stopping and Terminating the Instance

To avoid unnecessary costs, it is important to stop or terminate your instance after use. To stop the instance, navigate back to the AWS console, select your instance, and choose "Stop instance" from the "Instance State" menu. The state will transition from "running" to "stopping" and finally to "stopped". You can restart, reboot, or hibernate the instance if needed.

![The image shows an AWS EC2 management console with details of a stopped instance named "ec2-demo-instance." The instance type is t2.micro, and it is located in the N. Virginia region.](https://kodekloud.com/kk-media/image/upload/v1752864830/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EC2-Demo/aws-ec2-console-stopped-instance.jpg)

For complete cleanup and to prevent incurring additional charges, terminate the instance by selecting "Terminate" from the instance state options and confirming the action. After termination, the instance state will be updated to "terminated", and you will no longer be billed.

> [!important]
> **Caution**
>
> Always terminate instances that are no longer in use to prevent unexpected billing charges.

---

This concludes our comprehensive guide on deploying, connecting to, and managing an Amazon EC2 instance. Enjoy your journey in cloud computing and explore more advanced AWS features to scale your infrastructure!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/efba7507-bb4d-4073-b95a-7d4938cd0a74)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/c3240323-f7b9-486d-9574-628a009fa3e9)**
>
> Practice lab
