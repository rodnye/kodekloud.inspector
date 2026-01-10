# NACLs Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/NACLs-Demo)

---

## Table of Contents

- NACLs Demo
  - Adjusting Security Groups
  - Reviewing and Configuring NACLs
  - Modifying NACL Rules to Restrict Traffic
  - Installing NGINX on Server Two
  - Advanced NACL Configuration: Allow and Deny
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# NACLs Demo

Welcome to this lesson on Network Access Control Lists (NACLs). In this article, we will explore how NACLs operate, how they differ from security groups, and how to configure them in AWS. Unlike stateful security groups that protect individual instances, NACLs are stateless and apply at the subnet level, controlling traffic to and from an entire subnet.

Before diving into NACL configurations, we first ensure that the EC2 instances are not limited by their security groups. This allows us to focus solely on NACL functionality.

---

## Adjusting Security Groups

We begin by reviewing and updating the security group settings for our EC2 instances:

- **Server 1:** This instance is associated with a "web server security group."  
  ![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro. The details for "server1" are displayed, including security group information and inbound rules for ports 22, 80, and 443.](https://kodekloud.com/kk-media/image/upload/v1752859171/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-ec2-management-console-instances.jpg)
- **Server 2:** Initially, this instance has no security group assigned. To ensure consistency, we update it by assigning the same web server security group.

For both servers, we modify the security group rules to allow all inbound and outbound traffic. This setup prevents the security group from interfering with our NACL tests.

![The image shows the AWS EC2 Management Console interface for changing security groups of an instance, with options to add or remove security groups.](https://kodekloud.com/kk-media/image/upload/v1752859172/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-ec2-management-console-security-groups.jpg)

After the updates, the security group now permits all traffic:

![The image shows an AWS EC2 Management Console screen displaying details of a security group named "webserver-sg," including its inbound and outbound rules. The outbound rules section is highlighted, showing a rule allowing all traffic to destination 0.0.0.0/0.](https://kodekloud.com/kk-media/image/upload/v1752859173/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-ec2-security-group-rules.jpg)

Next, verify that both EC2 instances reside in the same subnet. For example, by selecting Server 1 and reviewing its networking details, you can see it is on subnet E1683:

![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro, displaying details for "server1" including its public and private IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752859174/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-ec2-management-console-instances-2.jpg)

---

## Reviewing and Configuring NACLs

Switch to the VPC console and navigate to the "Security" section, then click on "Network ACLs." Locate the default ACL for VPC A—the one associated with your EC2 instances—and confirm that subnet E1683 is attached to this ACL.

Examine the inbound rules. Notice that rule 100 allows all traffic on all protocols and ports from any IP address. Because NACL evaluation is top-down, placing any rule below rule 100 would be ineffective. This default configuration guarantees that all traffic reaches the instance until we modify the rules.

![The image shows the AWS Management Console displaying the Network ACLs section, with details of inbound rules for a selected ACL. The interface lists various ACLs associated with subnets and their respective inbound rules.](https://kodekloud.com/kk-media/image/upload/v1752859175/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-management-console-network-acls.jpg)

At this stage, test connectivity by SSHing into your instance:

```
# Example SSH test and ping output:
[ec2-user@ip-10-1-1-82 ~]$ ping 8.8.8.8
64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=1.58 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=53 time=1.61 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=53 time=1.61 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=53 time=1.91 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=53 time=1.62 ms
64 bytes from 8.8.8.8: icmp_seq=6 ttl=53 time=1.65 ms
64 bytes from 8.8.8.8: icmp_seq=7 ttl=53 time=1.57 ms


--- 8.8.8.8 ping statistics ---
7 packets transmitted, 7 received, 0% packet loss, time 601ms
rtt min/avg/max/mdev = 1.572/1.651/1.909/0.107 ms
```

After exiting the SSH session and reconnecting, the successful test confirms that connectivity is intact.

---

## Modifying NACL Rules to Restrict Traffic

Next, modify the inbound rules for the NACL to allow only SSH traffic. Update rule 100 to permit SSH (port 22) from any IP address and save the changes. With this update, even though the security groups allow all traffic, the NACL now blocks all inbound traffic except for SSH.

![The image shows the AWS Management Console displaying the Network ACLs section, with details of inbound rules for a specific ACL, including rules for SSH and all traffic.](https://kodekloud.com/kk-media/image/upload/v1752859176/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-management-console-network-acls-2.jpg)

Test this configuration by SSHing into one of the instances. Since both instances are in the same subnet, they adhere to the same rules. Confirm SSH access with Server 2:

![The image shows an AWS EC2 Management Console with two instances listed, both running with instance type t2.micro. The details of one instance, "server-2," are displayed, including its instance ID, IP addresses, and status.](https://kodekloud.com/kk-media/image/upload/v1752859178/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-ec2-management-console-instances-3.jpg)

After confirming that SSH remains functional, attempt to access the web service by refreshing your browser. The request should hang because only SSH is allowed. To restore web access, update the NACL by adding:

- A new inbound rule (e.g., rule 110) to allow HTTP (port 80)
- Another inbound rule (e.g., rule 120) to allow HTTPS (port 443)

Save the changes. With these rules in place, both servers can handle SSH, HTTP, and HTTPS traffic. Remember that Server 2 must have NGINX (or another web server) installed to serve HTTP content.

![The image shows the AWS Management Console interface for editing inbound rules in a VPC network ACL. It lists rules for SSH, HTTP, and HTTPS traffic, with options to allow or deny access.](https://kodekloud.com/kk-media/image/upload/v1752859179/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-management-console-vpc-acl-rules.jpg)

---

## Installing NGINX on Server Two

If NGINX is not already installed on Server Two, you can install it using the following command:

```
[ec2-user@ip-10-1-1-13 ~]$ sudo yum install nginx -y
```

The terminal output will resemble:

```
Last metadata expiration check: 21:18:14 ago on Fri Aug 25 07:39:09 2023.
Dependencies resolved.


=================================================================================================================================
 Package                            Architecture       Version                                Repository                Size
=================================================================================================================================
Installing:
 nginx                              x86_64           1:1.24.0-1.amzn2023.0.1                amazonlinux               32 k
Installing dependencies:
 generic-logos-httpd                noarch            18.0.0-12.amzn2023.0.3                 amazonlinux               19 k
 gperftools-libs                    x86_64           2.9.1-1.amzn2023.0.2                   amazonlinux              309 k
 libunwind                          x86_64           1.4.0-5.amzn2023.0.2                   amazonlinux               66 k
 nginx-core                         x86_64           1:1.24.0-1.amzn2023.0.1                amazonlinux              586 k
 nginx-filesystem                   noarch            1:1.24.0-1.amzn2023.0.1                amazonlinux                9.0 k
 nginx-mimetypes                    noarch            2.1.49-3.amzn2023.0.3                  amazonlinux               21 k


Transaction Summary
Install  7 Packages


Total download size: 1.0 M
Installed size: 3.4 M
Downloading Packages:
```

> [!important]
> **Note**
>
> Because NACLs are stateless, outbound package installation requests are allowed by the security group's outbound rules. However, the corresponding inbound responses must be explicitly permitted by the NACL. If the inbound rules are restricted to only SSH, HTTP, and HTTPS, the package download may fail. To resolve this, temporarily add an inbound rule (e.g., rule 130) that allows all traffic. Once the installation is complete, remove the temporary rule.

After installing NGINX, start the web server:

```
[ec2-user@ip-10-1-1-13 ~]$ sudo systemctl start nginx
```

Verify that the web server is accessible via your browser.

---

## Advanced NACL Configuration: Allow and Deny

One major advantage of NACLs over security groups is the ability to set both allow and deny rules. This flexibility enables scenarios like allowing SSH from everywhere except a specific IP address range. To configure such a setup:

1.  Create a rule (e.g., rule 90) that denies SSH traffic from the unwanted IP range.
2.  Create another rule (with a higher rule number) that allows SSH from all other IP addresses.

Remember that NACLs evaluate rules in numeric order from lowest to highest. Ensure that the deny rule comes before the allow rule to enforce the intended restriction.

![The image shows an AWS VPC Management Console displaying Network ACLs with a list of inbound rules, including SSH, HTTP, and HTTPS protocols, along with their allow or deny statuses.](https://kodekloud.com/kk-media/image/upload/v1752859180/notes-assets/images/AWS-Certified-Developer-Associate-NACLs-Demo/aws-vpc-management-network-acls.jpg)

---

## Conclusion

This lesson demonstrated how to work with NACLs and highlighted the key differences compared to security groups. By filtering traffic at the subnet level and configuring both allow and deny rules, NACLs provide granular control over network traffic. A proper understanding of NACL configurations is essential for maintaining secure and efficient network environments in AWS.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/af74b6ba-02f1-498f-8307-2e65256e1f89)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/e722a422-2f31-4e09-98c5-d6f520f4bc47)**
>
> Practice lab
