# NACLs Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/NACLs-Demo)

---

## Table of Contents

- NACLs Demo
  - Step 1: Verifying Security Group Settings
  - Step 2: Confirming Subnet Consistency
  - Step 3: Testing Default NACL Settings
  - Step 4: Modifying NACL Rules
  - Step 5: Allowing HTTP and HTTPS Traffic via NACLs
  - Step 6: Implementing Explicit Deny Rules
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# NACLs Demo

Welcome to this technical lesson on Network Access Control Lists (NACLs). In this guide, we will explore the key differences between stateful security groups and stateless NACLs, as well as demonstrate how to configure NACLs to control traffic at the subnet level.

Before you begin testing NACLs, ensure that your EC2 instances have security groups configured correctly to avoid interference. Security groups are stateful and typically control traffic for individual instances, whereas NACLs filter traffic for the entire subnet. In our scenario, we configure our security groups to allow all traffic so that NACLs become the primary filter.

![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro, with details of "server1" displayed below.](https://kodekloud.com/kk-media/image/upload/v1752865621/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-management-console-instances.jpg)

## Step 1: Verifying Security Group Settings

Begin by verifying the security groups associated with your servers. For example, one server might be using the "webserver-sg" security group:

![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro. The details for "server1" are displayed, including security group information and inbound rules for ports 22, 80, and 443.](https://kodekloud.com/kk-media/image/upload/v1752865622/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-management-console-instances-2.jpg)

If a server shows no security group initially, refresh the console to load the updated details:

![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro. The details of "server-2" are displayed, including its instance ID, public IPv4 address, and instance state.](https://kodekloud.com/kk-media/image/upload/v1752865623/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-management-console-instances-3.jpg)

Update the security group on every instance to "webserver-sg." This configuration ensures that security groups allow all traffic, so that subsequent tests focus on NACL behavior. For example, update server two as shown below:

![The image shows an AWS EC2 Management Console with two running instances, displaying details for one instance named "server-2," including security group information.](https://kodekloud.com/kk-media/image/upload/v1752865624/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-management-console-server-2.jpg)

Next, change the security group settings for the instance:

![The image shows an AWS EC2 Management Console screen where security groups are being changed for an instance. It displays instance details and a dropdown menu for selecting security groups.](https://kodekloud.com/kk-media/image/upload/v1752865626/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-security-groups-console.jpg)

Then, open the "webserver-sg" settings and modify its rules to allow all inbound and outbound traffic:

![The image shows an AWS EC2 Management Console screen displaying details of a security group named "webserver-sg," including its inbound and outbound rules. The outbound rules section is highlighted, showing a rule allowing all traffic.](https://kodekloud.com/kk-media/image/upload/v1752865626/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-security-group-webserver-sg.jpg)

## Step 2: Confirming Subnet Consistency

Ensure that both instances reside on the same subnet by checking the networking details from the EC2 console. For example, inspect server one to verify that it is in the correct subnet (e.g., subnet 168.3):

![The image shows an AWS EC2 Management Console with details of two running instances, including instance IDs, types, and networking information.](https://kodekloud.com/kk-media/image/upload/v1752865632/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-management-console-instances-4.jpg)

Then, navigate to the VPC dashboard. Under the "Security Network ACLs" section, select the default NACL for your VPC (VPC A):

![The image shows the AWS Management Console displaying the Network ACLs section, listing various network ACL IDs and their associated subnets and VPCs. The interface includes details about a selected network ACL, including its ID and associated subnet.](https://kodekloud.com/kk-media/image/upload/v1752865633/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-management-console-network-acls.jpg)

Examine the inbound rules. You will notice a rule numbered 100 allowing all traffic. Since NACL rules are processed sequentially, any following rule (such as a deny rule) will not take effect if rule 100 already permits the traffic.

## Step 3: Testing Default NACL Settings

To confirm that your configuration is correct, attempt to SSH into an instance. You should be able to establish a connection because the security groups are not restricting any traffic. Below is an example output from a successful ping test and SSH session:

```
64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=1.58 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=53 time=1.61 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=53 time=1.61 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=53 time=1.91 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=53 time=1.62 ms
64 bytes from 8.8.8.8: icmp_seq=6 ttl=53 time=1.65 ms
64 bytes from 8.8.8.8: icmp_seq=7 ttl=53 time=1.57 ms
--- 8.8.8.8 ping statistics ---
7 packets transmitted, 7 received, 0% packet loss, time 6011ms
rtt min/avg/max/mdev = 1.572/1.651/1.909/0.107 ms
[ec2-user@ip-10-1-1-82 ~]$ exit
logout
Connection to 3.82.5.183 closed.


C:\Users\sanje\Documents\scratch\aws-demo> ssh -i main.pem ec2-user@3.82.5.183
  #
  ~  #####
  ~ ######
   #/   ___
  ~W~ https://aws.amazon.com/linux/amazon-linux-2023
  ~~~
   _m/
Last login: Sat Aug 26 04:37:31 2023 from 169.150.196.66
[ec2-user@ip-10-1-1-82 ~]$
```

Additionally, refresh your web browser to confirm that the hosted website is accessible.

## Step 4: Modifying NACL Rules

Now, modify the NACL rules to showcase their stateless behavior. Edit the inbound rules, and change rule 100 so that it allows only SSH access. Configure rule 100 to permit SSH (port 22) from any IP address, and then save the changes. Despite security groups still allowing all traffic, this modification will restrict inbound traffic to SSH only, and a subsequent deny rule will block other protocols.

To test this configuration, SSH into the instance using server two:

![The image shows an AWS EC2 Management Console with details of two running instances, including their instance IDs, states, types, and public IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752865635/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-ec2-management-console-instances-5.jpg)

Connect using a command similar to:

```
ssh -i main.pem ec2-user@54.225.35.112
```

After establishing the SSH connection, refresh the website in your browser. The page should hang due to the absence of HTTP access, confirming that the NACL is now enforcing SSH-only inbound traffic.

## Step 5: Allowing HTTP and HTTPS Traffic via NACLs

To enable web traffic, update the NACL by adding new inbound rules:

1.  Add a rule (for example, rule 101 or 110) that allows HTTP (port 80).
2.  Add another rule (for example, rule 120) to allow HTTPS (port 443).

After applying these changes, your inbound rules should now include entries permitting SSH, HTTP, and HTTPS traffic. Refreshing the website should now display properly on both EC2 instances since they share the same subnet.

At this point, you may observe that server two does not have NGINX installed, causing the website to remain unresponsive. To remedy this:

1.  SSH into server two:

    ```
    ssh -i main.pem ec2-user@54.225.35.112
    ```

2.  Install NGINX using the Yum package manager:

    ```
    [ec2-user@ip-10-1-1-13 ~]$ sudo yum install nginx -y
    ```

> [!important]
> **Note**
>
> If the package downloads hang, it is due to the stateless nature of NACLs. NACLs require explicit inbound rules for the response traffic (return packets) when an outbound HTTP request is made.

To temporarily allow the returning traffic needed to download NGINX, add a new inbound rule (for example, rule 130) permitting all traffic. Once NGINX is successfully installed, remove this broad rule.

After installation, start NGINX:

```
[ec2-user@ip-10-1-1-13 ~]$ sudo systemctl start nginx
```

Refresh the website to verify accessibility, then revert the temporary rule so that only the rules for SSH, HTTP, and HTTPS remain.

## Step 6: Implementing Explicit Deny Rules

One of the advantages of using NACLs over security groups is the ability to explicitly block traffic with deny rules. For instance, you can allow SSH by default but insert a high-priority deny rule for specific IP addresses.

To demonstrate this, add a deny rule with a lower rule number (e.g., rule 90) that blocks SSH from a defined IP range. This rule will override the general SSH allow rule for that specific range, while SSH from all other addresses will still be permitted.

![The image shows an AWS VPC dashboard displaying network ACLs and their associated inbound rules. It includes details such as rule numbers, types, protocols, port ranges, sources, and whether the traffic is allowed or denied.](https://kodekloud.com/kk-media/image/upload/v1752865636/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-NACLs-Demo/aws-vpc-dashboard-network-acls.jpg)

## Summary

In this lesson, we covered:

- The differences between stateful security groups and stateless NACLs.
- How NACLs operate at the subnet level and require both inbound and outbound rules.
- Configuring NACL rules to allow or block specific types of traffic.
- Demonstrating the practical application by restricting traffic to SSH only and then enabling HTTP/HTTPS traffic.
- Using explicit deny rules to block traffic from specific IP ranges.

By following these steps, you now have a clear understanding of how to leverage NACLs to manage network traffic effectively.

For more detailed information on AWS networking, consider visiting the [AWS Documentation](https://aws.amazon.com/documentation/) or exploring related topics such as [Networking & Content Delivery](https://aws.amazon.com/products/networking/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/4869332a-168d-4a98-af83-e8ed9e55fd0c)**
>
> Watch video content
