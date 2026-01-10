# Security Groups Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Security-Groups-Demo)

---

## Table of Contents

- Security Groups Demo
  - Launching the EC2 Instance
  - Verifying Initial Connectivity
  - Blocking All Inbound Traffic
  - Creating a Web Server Security Group
  - Attaching the Security Group
  - Installing and Testing Nginx
  - Allowing HTTP and HTTPS Access
  - Demonstrating Stateful Behavior
  - Splitting Rules into Multiple Security Groups
  - Reusing Security Groups Across Instances
  - Referencing Security Groups as Rule Sources
  - Summary of Security Groups
  - Links and References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Security Groups Demo

In this lesson, we’ll explore how to secure AWS resources using Security Groups and Network ACLs (NACLs). You’ll learn to:

- Launch an EC2 instance
- Configure Security Groups to control inbound/outbound traffic
- Demonstrate stateful behavior
- Split and reuse groups for modular access control
- Reference Security Groups in other rules

By the end, you’ll have hands-on experience with AWS best practices for network security.

## Launching the EC2 Instance

Start by launching an EC2 instance named **server-one** with the default Amazon Linux 2 AMI.

![The image shows the AWS EC2 Management Console interface for launching an instance. It includes options for naming the instance, selecting an Amazon Machine Image (AMI), and configuring instance details like type and storage.](https://kodekloud.com/kk-media/image/upload/v1752863325/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-launch-instance.jpg)

On the **Networking** page, choose your VPC. AWS automatically creates a default Security Group allowing inbound SSH (TCP 22) from `0.0.0.0/0`. You can restrict this later.

![The image shows the AWS EC2 Management Console interface, where a user is configuring settings for launching an EC2 instance, including key pair, network settings, and instance details.](https://kodekloud.com/kk-media/image/upload/v1752863326/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-instance-setup.jpg)

Review your settings and click **Launch**.

![The image shows an AWS EC2 instance launch configuration screen, detailing security group settings, storage configuration, and a summary of the instance details. The "Launch instance" button is highlighted at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752863327/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-instance-launch-configuration.jpg)

## Verifying Initial Connectivity

Once **server-one** is in the **running** state, select it and open the **Security** tab. You should see:

- Inbound: SSH (TCP 22) from `0.0.0.0/0`
- Outbound: All traffic to `0.0.0.0/0`

![The image shows an AWS EC2 Management Console with two instances listed, both in the "Running" state, and details of one instance, including security group rules.](https://kodekloud.com/kk-media/image/upload/v1752863329/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-instances-running.jpg)

Connect via SSH to confirm:

```
ssh -i main.pem ec2-user@<Public-IP>
```

If you see the EC2 prompt, SSH is working.

## Blocking All Inbound Traffic

To illustrate rule enforcement, remove SSH access:

1.  Go to **Security Groups** → select the default group.
2.  Click **Edit inbound rules**.
3.  Delete the SSH (22) rule and **Save**.

![The image shows the AWS EC2 Management Console, specifically the "Edit inbound rules" section for a security group, with an SSH rule allowing traffic from any IP address.](https://kodekloud.com/kk-media/image/upload/v1752863330/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-inbound-rules.jpg)

> [!important]
> **Warning**
>
> By removing all inbound rules, you will lose SSH access to your instance. Be prepared to re-attach a group that allows SSH.

Now SSH attempts will time out:

```
ssh -i main.pem ec2-user@<Public-IP>
# (connection times out)
```

## Creating a Web Server Security Group

Next, create **web-server-sg** in the same VPC (Description: “Security group for web applications”):

- Inbound:  
  • SSH (TCP 22) from `0.0.0.0/0`
- Outbound: All traffic to `0.0.0.0/0`

![The image shows an AWS EC2 Management Console screen displaying details of a security group named "launch-wizard-20," with no inbound rules and one outbound rule.](https://kodekloud.com/kk-media/image/upload/v1752863331/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-security-group.jpg) ![The image shows an AWS EC2 security group configuration screen with inbound and outbound rules. The inbound rule allows SSH traffic from any IP, and the outbound rule allows all traffic to any destination.](https://kodekloud.com/kk-media/image/upload/v1752863332/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-security-group-configuration.jpg)

## Attaching the Security Group

Attach **web-server-sg** to **server-one**:

1.  Select the instance.
2.  **Actions → Security → Change security groups**.
3.  Remove the old group and add **web-server-sg**.
4.  Save.

![The image shows an AWS EC2 Management Console screen displaying details of a security group named "webserver-sg," including its inbound rules for SSH access.](https://kodekloud.com/kk-media/image/upload/v1752863333/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-webserver-sg.jpg) ![The image shows an AWS Management Console screen for changing security groups of an EC2 instance, displaying instance details and associated security groups.](https://kodekloud.com/kk-media/image/upload/v1752863334/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-management-console-ec2-security-groups.jpg)

Now SSH will succeed again.

## Installing and Testing Nginx

SSH into **server-one** and run:

```
sudo yum install nginx -y
sudo systemctl start nginx
```

Verify locally:

```
curl localhost
```

You should see the Nginx welcome page HTML.

## Allowing HTTP and HTTPS Access

By default, HTTP (80) and HTTPS (443) are blocked. Update **web-server-sg**:

1.  Edit inbound rules.
2.  Add:  
    • HTTP (TCP 80) from `0.0.0.0/0`  
    • HTTPS (TCP 443) from `0.0.0.0/0`
3.  Save.

![The image shows an AWS EC2 security group settings page where inbound rules for SSH, HTTP, and HTTPS are being edited. Each rule specifies the protocol, port range, and source IP address.](https://kodekloud.com/kk-media/image/upload/v1752863335/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-security-group-inbound-rules.jpg)

Visiting the instance’s public IP in a browser now displays the Nginx welcome page.

## Demonstrating Stateful Behavior

Security Groups are stateful: return traffic is automatically allowed, even if outbound rules are removed.

![The image shows the AWS EC2 Management Console, specifically the "Edit outbound rules" section for a security group, with settings for allowing all traffic to a custom destination.](https://kodekloud.com/kk-media/image/upload/v1752863336/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-outbound-rules.jpg)

1.  Remove all outbound rules.
2.  Refresh the Nginx page in your browser—it still loads.
3.  From the instance, try an outbound ping:

```
ping 8.8.8.8
# 100% packet loss
```

4.  Re-add “All traffic” outbound rule and retry:

```
ping 8.8.8.8
64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=1.58 ms
```

![The image shows an AWS EC2 Management Console screen displaying the details of a security group named "webserver-sg," including its inbound rules for SSH, HTTP, and HTTPS protocols.](https://kodekloud.com/kk-media/image/upload/v1752863337/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-security-group-webserver-sg.jpg)

## Splitting Rules into Multiple Security Groups

For modularity, create two groups:

- **allow-ssh-sg**  
  • Inbound: SSH (TCP 22) from `0.0.0.0/0`
- **allow-http-sg**  
  • Inbound: HTTP (TCP 80) from `0.0.0.0/0`

![The image shows the AWS Management Console interface for creating a security group, with fields for entering the security group name, description, and VPC, along with sections for inbound and outbound rules.](https://kodekloud.com/kk-media/image/upload/v1752863338/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-management-console-security-group-creation.jpg)

Detach **web-server-sg** and attach both **allow-ssh-sg** and **allow-http-sg** to **server-one**. You now have combined SSH + HTTP access.

![The image shows an AWS EC2 Management Console with details of running instances, including security settings for a specific instance. It displays security group rules for HTTP and SSH access.](https://kodekloud.com/kk-media/image/upload/v1752863339/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-security-settings.jpg)

## Reusing Security Groups Across Instances

Apply **allow-ssh-sg** and **allow-http-sg** to **server-two** to grant identical access controls.

![The image shows an AWS EC2 Management Console with details of two running instances, both of type t2.micro, including their instance IDs, public IP addresses, and status checks.](https://kodekloud.com/kk-media/image/upload/v1752863340/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-t2-micro.jpg)

## Referencing Security Groups as Rule Sources

For database connectivity, create **db-sg**:

- Inbound: PostgreSQL (TCP 5432)  
  • Source: **allow-http-sg**

This ensures any instance with **allow-http-sg** can connect on port 5432.

![The image shows an AWS EC2 Management Console screen with security group settings, including inbound and outbound rules for network traffic. The inbound rule specifies a custom TCP protocol on port 5432, and the outbound rule allows all traffic.](https://kodekloud.com/kk-media/image/upload/v1752863342/notes-assets/images/AWS-Networking-Fundamentals-Security-Groups-Demo/aws-ec2-management-console-security-groups.jpg)

By referencing another group, new web servers automatically gain DB access as soon as they attach **allow-http-sg**.

Subnet-level filtering with NACLs provides an additional control layer for stateless, rule-based traffic filtering.

## Summary of Security Groups

| Security Group | Description                      | Inbound Rules                            | Outbound Rules |
| -------------- | -------------------------------- | ---------------------------------------- | -------------- |
| web-server-sg  | Web application servers          | SSH (22), HTTP (80), HTTPS (443)         | All traffic    |
| allow-ssh-sg   | Modular SSH access               | SSH (22)                                 | All traffic    |
| allow-http-sg  | Modular HTTP access              | HTTP (80)                                | All traffic    |
| db-sg          | Database access from web servers | PostgreSQL (5432) from **allow-http-sg** | All traffic    |

## Links and References

- [AWS Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [AWS Network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
- [Amazon EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [Nginx Official Site](https://nginx.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/8c2cb5f8-5808-46ec-898a-b9563712623f)**
>
> Watch video content
