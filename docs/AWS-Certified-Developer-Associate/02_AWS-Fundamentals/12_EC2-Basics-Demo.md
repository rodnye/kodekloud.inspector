# EC2 Basics Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/EC2-Basics-Demo)

---

## Table of Contents

- EC2 Basics Demo
  - Launching an EC2 Instance
  - Configuring Instance Details
  - Reviewing Instance Details
  - Connecting to the EC2 Instance
  - Stopping and Terminating the Instance
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# EC2 Basics Demo

In this lesson, you will learn how to deploy an Amazon EC2 instance, connect securely using a key pair, and manage the instance lifecycle. Follow the step-by-step instructions below.

---

## Launching an EC2 Instance

Begin by accessing the EC2 service from the AWS Management Console. In the EC2 dashboard, navigate to "Instances" where you will find a shortcut to launch a new instance:

![The image shows the Amazon Web Services (AWS) EC2 dashboard, displaying various resources and options for managing instances in the US East (N. Virginia) region.](https://kodekloud.com/kk-media/image/upload/v1752858173/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-dashboard-us-east.jpg)

Click the **Launch Instances** button. First, assign a name to your instance (e.g., "EC2 demo instance") and then select an Amazon Machine Image (AMI).

![The image shows an AWS EC2 instance launch configuration screen, where a user is selecting an Amazon Machine Image (AMI) and configuring instance details like type and storage.](https://kodekloud.com/kk-media/image/upload/v1752858175/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-instance-launch-configuration.jpg)

The chosen AMI serves as a blueprint by defining the operating system and including any pre-installed applications or services. You have the option to select popular AMIs like Amazon Linux, macOS, or Ubuntu in the Quick Start section. If you require a custom or specific AMI, use the "My AMIs" tab or search (e.g., type "Ubuntu"):

![The image shows an AWS EC2 console displaying a list of Ubuntu AMIs available for selection, with options for different versions and architectures.](https://kodekloud.com/kk-media/image/upload/v1752858176/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-ubuntu-amis-list.jpg)

You may also explore the Amazon Marketplace for additional AMIs. In this demo, we select the Amazon Linux 2023 AMI from Quick Start. Remember, each AMI has a region-specific unique AMI ID. For instance, the AMI ID in Northern Virginia will differ from Ohio. Verify the AMI ID for your region before proceeding.

---

## Configuring Instance Details

After selecting your AMI, choose an instance type that fits your workload. This demo uses a T2 micro instance, which is free tier eligible.

Next, specify the key pair required for secure connection management. You can select an existing key pair or create a new one. To create a new key pair:

1.  Select **Create new key pair**.
2.  Enter a name, for example, "EC2 demo".
3.  Leave the RSA option and the .pem file format as default.
4.  Click **Create key pair** and securely save the downloaded PEM file (e.g., "EC2.pem").

![The image shows a dialog box on the AWS EC2 console for creating a key pair, with options to name the key pair, select the key pair type (RSA or ED25519), and choose the private key file format (.pem or .ppk).](https://kodekloud.com/kk-media/image/upload/v1752858177/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-key-pair-dialog.jpg)

Scroll down to the network settings. Choose the desired VPC and subnet (the default settings are pre-selected). Ensure that the instance is assigned a public IP address by enabling the appropriate option.

Proceed to set up the Security Group. Either choose an existing security group or create a new one. A new security group by default allows SSH access. Unless you require customization, the default settings are sufficient.

![The image shows an AWS EC2 instance launch configuration screen, detailing security group settings and instance summary information.](https://kodekloud.com/kk-media/image/upload/v1752858178/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-instance-launch-configuration-2.jpg)

The storage configuration displays a default root volume (typically 8 GB). Additional volumes can be added later if needed. In the "Advanced Details" section, options such as Spot Instances, instance profiles, or auto recovery are available, but the default settings are appropriate for this demo.

Once all options are configured, click the **Launch Instance** button. A confirmation message indicates that your instance ("EC2 demo instance") has been successfully launched.

![The image shows an AWS EC2 console with a success message indicating the launch of an instance. Below, there are options for next steps, such as creating billing alerts, connecting to the instance, and managing monitoring.](https://kodekloud.com/kk-media/image/upload/v1752858180/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-console-instance-launch.jpg)

---

## Reviewing Instance Details

After launching your instance, go to the EC2 console and click the instance to review its details. Verify critical metadata such as the instance ID, state (e.g., running), instance type, public IP address, and public DNS name. These details are essential for managing and connecting to the instance.

Additional instance information includes:

- Security Group settings (SSH inbound and outbound rules)
- Network configuration (VPC, subnet, public/private IP addresses, availability zone)
- Storage data (volume ID, device name)
- Monitoring metrics (CPU utilization, status checks)
- Tags

![The image shows an Amazon Web Services (AWS) EC2 management console with details of a running instance named "ec2-demo-instance." It displays security group settings, including inbound and outbound rules.](https://kodekloud.com/kk-media/image/upload/v1752858181/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-management-console-instance.jpg)

![The image shows an AWS EC2 management console with details of a running instance named "ec2-demo-instance," including its instance ID, public and private IP addresses, and instance type.](https://kodekloud.com/kk-media/image/upload/v1752858185/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-management-console-instance-2.jpg)

![The image shows an AWS EC2 management console displaying the monitoring metrics for an instance named "ec2-demo-instance," including CPU utilization, status checks, and network activity.](https://kodekloud.com/kk-media/image/upload/v1752858186/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-monitoring-metrics.jpg)

---

## Connecting to the EC2 Instance

To securely connect to your EC2 instance:

1.  Retrieve the instance's public IP address or public DNS.
2.  Open your terminal and navigate to the directory containing your PEM file (e.g., EC2.pem).
3.  Confirm the presence of your PEM file:

    ```
    Documents\scratch\aws-demo took 5s
    > ls
    ec2.pem    kubeseal-windows-installer/    main.pem    main2.pem    test.code-workspace    test.yaml    wacom.pem
    Documents\scratch\aws-demo
    ```

4.  Use the SSH command below, replacing "username" with the correct value as per your AMI documentation. For example, for Amazon Linux the default username is "ec2-user":

    ```
    ssh -i "EC2.pem" ec2-user@<YOUR_INSTANCE_PUBLIC_IP>
    ```

Alternatively, refer to the **Connect** button in the EC2 console for specific SSH commands. An example command might be:

```
chmod 400 ec2-demo.pem
ssh -i "ec2-demo.pem" ec2-user@ec2-3-88-162-255.compute-1.amazonaws.com
```

When prompted with a security warning, type "yes" to add the host to your known hosts. Once connected, your terminal will switch to the EC2 instance shell:

```
Documents\scratch\aws-demo took 5s
  ls
ec2.pem kubeseal-windows-installer/ main.pem main2.pem test.code-workspace test.yaml wacom.pem


Documents\scratch\aws-demo
  ssh -i ec2.pem ec2-user@3.88.162.255
The authenticity of host '3.88.162.255 (3.88.162.255)' can't be established.
ED25519 key fingerprint is SHA256:kaXd1AucPPazbXb3o4W61zUjj1Qsh/zcHpchoQKuo.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '3.88.162.255' (ED25519) to the list of known hosts.
  ,    #
  ~      #####
  ~~     ###
  ~~     #/
  ~v~     '-
  ~~~~
  _.-._.-._/
  /m/
[ec2-user@ip-172-31-81-100 ~]$
```

To confirm your session environment, list the contents of the home directory:

```
[ec2-user@ip-172-31-81-100 ~]$ ls
[ec2-user@ip-172-31-81-100 ~]$ ls -la
total 12
drwx------.  3 ec2-user ec2-user  74 Sep 28 23:43 .
drwxr-xr-x.  3 root     root      22 Sep 28 23:43 ..
-rw-r--r--.  1 ec2-user ec2-user 141 Jan 28  2023 .bash_logout
-rw-r--r--.  1 ec2-user ec2-user 492 Jan 28  2023 .bash_profile
-rw-r--r--.  1 ec2-user ec2-user  49 Jan 28  2023 .bashrc
drwx------.  2 ec2-user ec2-user   29 Sep 28 23:43 .ssh
[ec2-user@ip-172-31-81-100 ~]$
```

> [!important]
> **Tip**
>
> For enhanced security, always protect your PEM file and set the correct permissions (e.g., using `chmod 400`) before connecting.

---

## Stopping and Terminating the Instance

When you have finished using the instance, return to the AWS Management Console to manage its state.

To stop the instance, select it and choose **Stop Instance** from the Instance State menu. The instance will change from running to stopping, and eventually to stopped.

![The image shows an AWS EC2 management console with details of a stopped instance named "ec2-demo-instance," including its instance ID, type, and private IP address.](https://kodekloud.com/kk-media/image/upload/v1752858187/notes-assets/images/AWS-Certified-Developer-Associate-EC2-Basics-Demo/aws-ec2-console-stopped-instance.jpg)

Once the instance is stopped, you can either start it again, reboot, or hibernate. If you no longer need the instance and want to avoid additional charges, terminate it. The instance will enter a terminating state and then be deleted from your account.

> [!important]
> **Reminder**
>
> Remember to terminate your EC2 instance if it is no longer needed. Unused instances may continue to incur costs.

---

This lesson has demonstrated how to deploy an Amazon EC2 instance, securely connect to it, and manage its lifecycle effectively. For more details on EC2 instance management and additional AWS services, visit the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/21d9820c-51e6-46b5-a2fe-47b3072ae5c9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/fa7bb4ed-bcd1-423b-9821-ad835f182042)**
>
> Practice lab
