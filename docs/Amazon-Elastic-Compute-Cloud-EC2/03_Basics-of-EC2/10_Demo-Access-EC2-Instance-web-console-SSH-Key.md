# Demo Access EC2 Instance web console SSH Key - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Basics-of-EC2/Demo-Access-EC2-Instance-web-console-SSH-Key)

---

## Table of Contents

- Demo Access EC2 Instance web console SSH Key
  - Connection Methods Overview
  - 1. Select Your EC2 Instance
  - 2. EC2 Instance Connect (Browser SSH)
  - 3. EC2 Instance Connect (Private IP)
  - 4. AWS Systems Manager Session Manager
  - 5. SSH Client Using a PEM Key Pair
  - 6. EC2 Serial Console (Low-Level Access)
  - Further Reading and References
  - Watch Video
  - Practice Lab

---

## Content

Amazon Elastic Compute Cloud (EC2)

Basics of EC2

# Demo Access EC2 Instance web console SSH Key

In this tutorial, you’ll learn multiple ways to connect to your Amazon EC2 instance—from the AWS Management Console and directly from your terminal using an SSH key pair.

## Connection Methods Overview

| Method                | Use Case                                               | Requirements                                   |
| --------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| EC2 Instance Connect  | Browser-based SSH via public or private IP             | IAM permissions, Instance Connect enabled      |
| Session Manager       | SSH-less console access without open inbound ports     | SSM Agent installed, IAM role with SSM perms   |
| SSH Client (Key Pair) | CLI-based SSH from local machine                       | `.pem` key file, SSH client                    |
| EC2 Serial Console    | Low-level troubleshooting (console, BIOS, boot issues) | Explicit IAM permission, Nitro-based instances |

---

## 1\. Select Your EC2 Instance

1.  Open the AWS Management Console and navigate to **EC2 > Instances**.
2.  Select your running instance (e.g., “demo”).
3.  Click the **Connect** button in the top right.

![The image shows an AWS EC2 management console with a running instance named "demo," displaying details like instance ID, type, and IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752868956/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Access-EC2-Instance-web-console-SSH-Key/aws-ec2-management-console-running-instance.jpg)

You’ll now see all available connection options.

---

## 2\. EC2 Instance Connect (Browser SSH)

EC2 Instance Connect provides a quick, browser-based SSH session—no local keys required.

1.  In the **Connect** dialog, choose **EC2 Instance Connect**.
2.  Confirm the **Username** (default is `ec2-user` on Amazon Linux).
3.  Click **Connect**.

![The image shows an AWS EC2 console interface for connecting to an instance, with options for connection type and details like instance ID and public IP address.](https://kodekloud.com/kk-media/image/upload/v1752868957/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Access-EC2-Instance-web-console-SSH-Key/aws-ec2-console-connection-interface.jpg)

A new tab opens with your SSH shell. Verify connectivity:

```
[ec2-user@ip-172-31-81-18 ~]$ ping -c 4 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=1.05 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=53 time=1.07 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=53 time=1.09 ms


--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
```

To disconnect, simply close the browser tab.

---

## 3\. EC2 Instance Connect (Private IP)

If your instance lacks a public IP but sits in a network-accessible subnet (VPN, Direct Connect), you can still launch EC2 Instance Connect over its **private IP**:

- Select **Connect over private IP** in the same dialog.

> [!important]
> **Note**
>
> You must be within the same VPC (or have network routing configured) for private IP SSH sessions.

---

## 4\. AWS Systems Manager Session Manager

Session Manager lets you establish a shell session without SSH keys or opening inbound ports.

> [!important]
> **Note**
>
> Ensure your instance has:
>
> - The **SSM Agent** installed
> - An IAM role attached with `AmazonSSMManagedInstanceCore` policy

No additional network configuration is required. Just select **Session Manager** in the **Connect** dialog.

---

## 5\. SSH Client Using a PEM Key Pair

To SSH from your workstation, use the `.pem` file downloaded when you launched the instance.

1.  Set secure permissions on the key:

    ```
    chmod 400 demo.pem
    ```

2.  Connect via SSH:

    ```
    ssh -i "demo.pem" ec2-user@ec2-54-85-134-101.compute-1.amazonaws.com
    ```

3.  Accept the fingerprint when prompted:

    ```
    The authenticity of host 'ec2-54-85-134-101.compute-1.amazonaws.com (100.82.78.53)' can't be established.
    ED25519 key fingerprint is SHA256:TTVrUr5IXAYZa2vFYtPx90hNGkphIpubYjaNHm9uYLs.
    Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
    ```

4.  Test network connectivity:

    ```
    [ec2-user@ip-172-31-81-18 ~]$ ping -c 4 8.8.8.8
    PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
    64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=1.01 ms
    64 bytes from 8.8.8.8: icmp_seq=2 ttl=53 time=1.07 ms
    64 bytes from 8.8.8.8: icmp_seq=3 ttl=53 time=1.09 ms


    --- 8.8.8.8 ping statistics ---
    3 packets transmitted, 3 received, 0% packet loss, time 2002ms
    ```

5.  Exit the session:

    ```
    exit
    ```

---

## 6\. EC2 Serial Console (Low-Level Access)

For troubleshooting boot or BIOS issues, use the EC2 Serial Console.

![The image shows an AWS EC2 console screen with a message indicating that the account is not authorized to use the EC2 serial console. There are options for connecting to an instance using different methods.](https://kodekloud.com/kk-media/image/upload/v1752868958/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Demo-Access-EC2-Instance-web-console-SSH-Key/aws-ec2-console-unauthorized-message.jpg)

> [!important]
> **Warning**
>
> Your IAM principal must have explicit permission (`ec2-instance-connect:SendSerialConsoleSSHPublicKey`) to use the EC2 Serial Console.

---

## Further Reading and References

- [Amazon EC2 Instance Connect](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Connect-using-EC2-Instance-Connect.html)
- [AWS Systems Manager Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)
- [Connect to Your Linux Instance Using SSH](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)
- [EC2 Serial Console](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-serial-console.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/84ed596e-1cff-4517-ab73-e90928d07d65)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/7913fd83-e703-433b-8979-b1c605a499ab)**
>
> Practice lab
