# Elastic IP Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Elastic-IP-Demo)

---

## Table of Contents

- Elastic IP Demo
  - Demonstrating Ephemeral Public IP Behavior
  - Introducing Elastic IP Addresses
  - Ensuring Persistence Through Reboots
  - Releasing an Elastic IP
  - Watch Video
    - Allocating an Elastic IP
    - Associating the Elastic IP with an Instance
    - Verifying Connectivity

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Elastic IP Demo

This guide explores Elastic IPs in AWS and demonstrates how they offer a static, persistent IP address for your AWS instances. In our pre-configured environment, the instance is launched within a VPC, a public subnet, and an attached Internet Gateway. A server, named "my server," is deployed with an initially assigned public IP address.

## Demonstrating Ephemeral Public IP Behavior

Initially, the server is accessible via the public IP address 52.90.159.117. However, to illustrate the non-persistent nature of ephemeral public IPs, we will stop the server and then start it again. When the instance shuts down, it loses its public IP address. Upon restarting, the instance is assigned a new public IP address, which may differ from the original (for instance, starting with a different digit).

![The image shows an AWS EC2 management console with a list of instances, highlighting one named "myserver" that is currently running. The instance details, including its ID, public IP address, and instance type, are displayed below.](https://kodekloud.com/kk-media/image/upload/v1752859128/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-IP-Demo/aws-ec2-console-myserver-instance.jpg)

This behavior underscores a significant challenge: if your application’s users rely on an ephemeral IP, a server restart can break connectivity until client configurations or code are updated.

## Introducing Elastic IP Addresses

Elastic IPs solve this problem by offering a persistent public IP address that remains associated with your account regardless of instance reboots. Once allocated, the Elastic IP is reserved exclusively for your account, ensuring that no other user can claim it.

### Allocating an Elastic IP

To allocate an Elastic IP, follow these steps:

1.  Navigate to the EC2 dashboard.
2.  Select the Elastic IPs section.
3.  Click on “Allocate Elastic IP address” and choose the Amazon pool of IP addresses.

After a successful allocation, you might receive an IP address like 35.173.92.86.

![The image shows an AWS EC2 console page for allocating an Elastic IP address, with options for selecting a network border group and public IPv4 address pool.](https://kodekloud.com/kk-media/image/upload/v1752859129/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-IP-Demo/aws-ec2-elastic-ip-allocation.jpg)

You can further verify the allocation with the following display:

![The image shows an AWS Management Console screen displaying the allocation of an Elastic IP address, specifically 35.173.92.86, in the EC2 section.](https://kodekloud.com/kk-media/image/upload/v1752859130/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-IP-Demo/aws-ec2-elastic-ip-allocation-2.jpg)

### Associating the Elastic IP with an Instance

Once allocated, the next step is associating the Elastic IP with your instance. To do this:

1.  In the EC2 console, select the allocated Elastic IP.
2.  Click on “Actions” and then select “Associate Elastic IP address”.
3.  Choose to associate it with an instance (or network interface) and select your instance. If the environment includes multiple private IP addresses, specify the correct one. In our case, the instance has only one.

![The image shows an AWS EC2 console screen for associating an Elastic IP address with an instance. It includes options to select the resource type and instance, with a warning about disassociating previous IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752859131/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-IP-Demo/aws-ec2-associate-elastic-ip.jpg)

After associating, the instance’s public IP address should now appear as 35.173.92.86.

### Verifying Connectivity

To verify that the Elastic IP is correctly associated and reachable, you can use the ping command as demonstrated below.

```
C:\scratch\aws-demo> clear
'clear' is not recognized as an internal or external command,
operable program or batch file.


C:\Users\sanje\Documents\scratch\aws-demo> ping 35.173.92.86


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

> [!important]
> **Note**
>
> The successful ping test confirms that the Elastic IP is active and properly routed to your instance.

## Ensuring Persistence Through Reboots

Elastic IPs are designed to remain constant even if you reboot your instance. After stopping and starting the instance, verify that the public IP continues to display as 35.173.92.86. This persistent behavior ensures uninterrupted connectivity for your applications—unlike ephemeral IP addresses that change upon every reboot.

## Releasing an Elastic IP

When the Elastic IP is no longer needed, it is important to disassociate it from your instance before releasing it to avoid incurring additional charges. If you attempt to release an Elastic IP without disassociating it, AWS will issue a warning indicating that the address cannot be released while it remains associated.

Follow these steps to properly release an Elastic IP:

1.  In the EC2 console, select the Elastic IP.
2.  Choose "Actions" followed by "Disassociate Elastic IP address".
3.  Once disassociated, select "Release Elastic IP address".

> [!important]
> **Warning**
>
> Ensure that you disassociate the Elastic IP before releasing it to prevent unnecessary charges.

After this process, the Elastic IP is removed from your account and is no longer reserved.

---

In summary, Elastic IPs provide a stable, persistent public IP address that remains associated with your AWS instance even after reboots. This ensures that your applications continue to be reachable without requiring modifications to client configurations or code.

For more information on AWS networking and IP management, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/8a7a4b66-8aad-49ae-b72c-de99ac0c33d8)**
>
> Watch video content
