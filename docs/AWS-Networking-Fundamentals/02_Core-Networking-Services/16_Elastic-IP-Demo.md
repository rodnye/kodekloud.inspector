# Elastic IP Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Elastic-IP-Demo)

---

## Table of Contents

- Elastic IP Demo
  - Why Use Elastic IPs?
  - 1. Allocating an Elastic IP
  - 2. Associating the Elastic IP
  - 3. Verifying Reachability
  - 4. Cleaning Up (Optional)
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Elastic IP Demo

In this lesson, we’ll demonstrate how to allocate, associate, and manage Elastic IPs in AWS. Elastic IPs provide a static, public IPv4 address that remains constant across instance stop/start cycles, ensuring reliable access to your EC2 workloads.

## Why Use Elastic IPs?

By default, EC2 instances in a public subnet receive a **dynamic** public IP that changes whenever you stop and start the instance. This can disrupt services or remote connections.

1.  Launch an EC2 instance named **myserver** in your VPC’s public subnet (with an Internet Gateway attached).
2.  Note its current public IP (e.g., `52.90.159.117`).
3.  Stop and then restart **myserver** via **Instance state > Stop instance** and **Start instance**.
4.  Observe that its public IP has changed:

![The image shows an AWS EC2 management console with details of a running instance named "myserver." It displays information such as the instance ID, public and private IP addresses, instance type, and status.](https://kodekloud.com/kk-media/image/upload/v1752863211/notes-assets/images/AWS-Networking-Fundamentals-Elastic-IP-Demo/aws-ec2-management-console-myserver.jpg)

![The image shows an AWS EC2 Management Console with a list of instances, highlighting one named "myserver" that is currently running. The details of the selected instance, including its public and private IP addresses, are displayed below.](https://kodekloud.com/kk-media/image/upload/v1752863212/notes-assets/images/AWS-Networking-Fundamentals-Elastic-IP-Demo/aws-ec2-management-console-myserver-instance.jpg)

| Public IP Type    | Persistence            | Cost                    | Use Case                       |
| ----------------- | ---------------------- | ----------------------- | ------------------------------ |
| Dynamic Public IP | Changes on stop/start  | Free                    | Short-lived, test instances    |
| Elastic IP (EIP)  | Remains until released | Charged when unattached | Static endpoint for production |

> [!important]
> **Note**
>
> Elastic IPs are free when associated with a running instance. AWS charges apply if you reserve an Elastic IP without attaching it.

## 1\. Allocating an Elastic IP

1.  In the EC2 console, select **Elastic IPs**.
2.  Click **Allocate Elastic IP address**.
3.  Accept the default settings (Amazon’s IPv4 pool) and click **Allocate**.

![The image shows an AWS console page for allocating an Elastic IP address, with options for selecting a network border group and public IPv4 address pool. There are also sections for global static IP addresses and optional tags.](https://kodekloud.com/kk-media/image/upload/v1752863214/notes-assets/images/AWS-Networking-Fundamentals-Elastic-IP-Demo/aws-console-elastic-ip-allocation.jpg)

After allocation, you’ll see your new Elastic IP (e.g., `35.173.92.86`):

![The image shows an AWS Management Console screen where an Elastic IP address has been successfully allocated. The allocated public IPv4 address is 35.173.92.86.](https://kodekloud.com/kk-media/image/upload/v1752863216/notes-assets/images/AWS-Networking-Fundamentals-Elastic-IP-Demo/aws-management-console-elastic-ip-allocated.jpg)

## 2\. Associating the Elastic IP

1.  Select the allocated Elastic IP.
2.  Choose **Actions > Associate Elastic IP address**.
3.  For **Resource type**, pick **Instance** and select **myserver**.
4.  If applicable, choose the correct private IP, then click **Associate**.

![The image shows an AWS console interface for associating an Elastic IP address with an EC2 instance. It includes options to select the resource type and instance, with a warning about reassociation.](https://kodekloud.com/kk-media/image/upload/v1752863218/notes-assets/images/AWS-Networking-Fundamentals-Elastic-IP-Demo/aws-console-elastic-ip-ec2-instance.jpg)

Once associated, **myserver** will display the Elastic IP as its public address:

![The image shows an AWS Management Console screen where an Elastic IP address has been successfully associated with an EC2 instance. The interface displays details like the public IPv4 address and associated instance ID.](https://kodekloud.com/kk-media/image/upload/v1752863219/notes-assets/images/AWS-Networking-Fundamentals-Elastic-IP-Demo/aws-management-console-elastic-ip-ec2.jpg)

## 3\. Verifying Reachability

Run a simple ping test from your local machine or CloudShell:

```
PS C:\> ping 35.173.92.86


Pinging 35.173.92.86 with 32 bytes of data:
Reply from 35.173.92.86: bytes=32 time=22ms TTL=112
Reply from 35.173.92.86: bytes=32 time=21ms TTL=112
Reply from 35.173.92.86: bytes=32 time=15ms TTL=112
Reply from 35.173.92.86: bytes=32 time=19ms TTL=112


Ping statistics for 35.173.92.86:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 15ms, Maximum = 22ms, Average = 19ms
```

Stop and start **myserver** again. Notice that `35.173.92.86` remains unchanged—your Elastic IP stays attached throughout.

## 4\. Cleaning Up (Optional)

To prevent unnecessary charges, release the Elastic IP when you’re done:

1.  Select the Elastic IP, then **Actions > Disassociate Elastic IP address**.
2.  After it’s disassociated, choose **Actions > Release Elastic IP address**.
3.  Confirm to remove the reservation from your account.

> [!important]
> **Warning**
>
> Releasing an Elastic IP makes it available to other AWS customers. You cannot reclaim the same address once released.

---

## Links and References

- [AWS Elastic IP Addresses Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)
- [EC2 User Guide: Managing Elastic IPs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)
- [AWS EC2 Service Home](https://aws.amazon.com/ec2/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/352c84b3-410d-4463-be74-29ec189ce4c7)**
>
> Watch video content
