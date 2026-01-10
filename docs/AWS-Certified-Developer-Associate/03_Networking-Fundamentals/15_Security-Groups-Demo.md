# Security Groups Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Security-Groups-Demo)

---

## Table of Contents

- Security Groups Demo
  - Launching an EC2 Instance with a Security Group
  - Testing SSH Connectivity
  - Modifying Security Group Rules
  - Creating a New Security Group for a Web Server
  - Installing and Testing a Web Server
  - Understanding Stateful Firewalls
  - Combining Multiple Security Groups
  - Creating a Security Group for a Database
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Security Groups Demo

In this lesson, we explore how to use AWS Security Groups and Network ACLs (NACLs) to control traffic flow to and from your resources. We begin by launching an EC2 instance and applying a security group, then move on to modifying rules and setting up a web server.

## Launching an EC2 Instance with a Security Group

First, create an EC2 instance—named "server one"—using the default Linux AMI. During the networking configuration, select your pre-existing VPC. At this point, a new security group is automatically created with a default inbound rule for SSH (TCP port 22).

![The image shows the AWS EC2 Management Console interface for launching an instance. It includes options for naming the instance, selecting an Amazon Machine Image (AMI), and configuring instance details.](https://kodekloud.com/kk-media/image/upload/v1752859210/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-management-console-launch-instance.jpg)

By default, the SSH rule permits access from any IP address (0.0.0.0/0), which is useful for testing. However, in a production environment, it is recommended to restrict SSH access to known IP addresses—for example, your corporate headquarters.

After launching the instance, navigate to the security tab in the console. Here, you will see the security group details, confirming the inbound access on port 22 and an outbound rule that permits all traffic.

## Testing SSH Connectivity

With port 22 open, you can connect to the EC2 instance using SSH. For example, run the following command:

```
ssh -i main.pem ec2-user@3.82.5.183
```

If SSH traffic were blocked by the security group, the connection would fail.

## Modifying Security Group Rules

To simulate a restrictive security scenario, you can modify the security group by deleting the SSH rule. Follow these steps:

1.  Open the security group settings.
2.  Click on "Edit inbound rules."
3.  Delete the SSH rule.

After deleting the rule, the inbound rules section will be empty, blocking all incoming traffic.

![The image shows the AWS EC2 Management Console, specifically the "Edit inbound rules" section for a security group, with an SSH rule allowing traffic from any IP address.](https://kodekloud.com/kk-media/image/upload/v1752859211/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-inbound-rules-ssh.jpg)

Now, if you try connecting to the instance via SSH again:

```
ssh -i main.pem ec2-user@3.82.5.183
```

The connection will hang because the security group no longer permits inbound SSH traffic.

## Creating a New Security Group for a Web Server

Next, create a new security group for web server use. Name it "web server security group" (or "web applications") and select the appropriate VPC. Configure the following rules:

- **Inbound:** Allow SSH (TCP port 22) from any IP.
- **Outbound:** Allow all traffic.

![The image shows an AWS EC2 Management Console screen displaying security group settings, with inbound rules allowing SSH access from any IP and outbound rules allowing all traffic.](https://kodekloud.com/kk-media/image/upload/v1752859212/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-security-group-settings.jpg)

Attach this new security group to your EC2 instance by choosing "Actions" → "Security" → "Change Security Groups." Remove the old group and add the "web server security group." With this configuration, SSH connectivity is restored as the new security group permits traffic on port 22.

## Installing and Testing a Web Server

Since "server one" is now set up to host a web server, install Nginx by executing:

```
sudo yum install nginx
```

After installation, start the Nginx service. Verify that Nginx is running locally on the instance using:

```
curl localhost
```

The command should return an HTML document similar to the following, confirming that Nginx is operational:

```
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto; font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working. Further configuration is required.</p>
<p>For online documentation and support please refer to <a href="http://nginx.org">nginx.org</a>.<br/> Commercial support is available at <a href="http://nginx.com">nginx.com</a>.</p>
<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

To access the web server from your browser using the instance’s public IP, note that the current security group only allows SSH (port 22), causing the page to hang. To resolve this, update the security group by adding new inbound rules for web traffic:

- **HTTP:** Allow TCP port 80 from any IP.
- **HTTPS:** Allow TCP port 443 from any IP.

![The image shows an AWS EC2 security group settings page where inbound rules are being edited, allowing SSH, HTTP, and HTTPS traffic from any IP address.](https://kodekloud.com/kk-media/image/upload/v1752859213/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-security-group-inbound-rules.jpg)

After updating the rules, refresh the security group settings. You should now be able to access the Nginx welcome page via your browser.

## Understanding Stateful Firewalls

> [!important]
> **Note**
>
> Security groups act as stateful firewalls. When an inbound request is allowed (e.g., on port 80), the returning outbound traffic is automatically permitted—even if outbound rules are restrictive.

If your instance initiates an outbound connection (for example, using the `ping` command), ensure your outbound rules explicitly allow that traffic. For instance, running:

```
ping 8.8.8.8
```

will fail if no corresponding outbound rule exists. Restoring an outbound rule that allows all traffic will enable such outbound connections.

## Combining Multiple Security Groups

AWS allows you to attach multiple security groups to a single EC2 instance. The rules from all attached groups are merged. This modular approach enables you to separate concerns by creating:

- An "allow SSH" security group (permitting only SSH inbound traffic).
- An "allow HTTP" security group (permitting only HTTP inbound traffic).

Attach both groups to your instance to collectively allow SSH and HTTP traffic.

![The image shows the AWS EC2 Management Console screen displaying security group settings with inbound and outbound rules. The inbound rule allows SSH access from anywhere, and the outbound rule allows all traffic.](https://kodekloud.com/kk-media/image/upload/v1752859214/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-security-group-settings-2.jpg)

![The image shows the AWS EC2 Management Console, specifically the security group settings where inbound rules are being configured. The user is selecting HTTP from a dropdown menu to allow HTTP access.](https://kodekloud.com/kk-media/image/upload/v1752859216/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-security-group-http-settings.jpg)

To update the security groups for "server one," follow these steps:

1.  Go to "Actions" → "Security" → "Change Security Groups."
2.  Remove the existing security group.
3.  Add both the "allow SSH" and "allow HTTP" security groups.
4.  Save the changes to ensure that port 22 (SSH) and port 80 (HTTP) are permitted.

This modular method simplifies the management of standardized rules across multiple instances. For example, you can secure 50 web servers by applying a common HTTP security group.

## Creating a Security Group for a Database

Finally, create a security group for your database instance. Name it "database security group" and include an inbound rule for your database port (such as port 5432 for PostgreSQL). In production systems, avoid exposing the database directly to the internet. Instead of allowing access from 0.0.0.0/0, restrict inbound access to your web servers.

One effective method is to set the source to any resource associated with the "allow HTTP" security group. This dynamic approach automatically includes new web servers with that security group without manually updating IP addresses.

![The image shows the AWS Management Console interface for creating a new security group in EC2, with fields for entering the security group name, description, and VPC, along with sections for inbound and outbound rules.](https://kodekloud.com/kk-media/image/upload/v1752859217/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-security-group-console.jpg)

![The image shows an AWS Management Console screen, specifically the security group settings for configuring inbound and outbound rules, with options for setting protocol, port range, and source or destination.](https://kodekloud.com/kk-media/image/upload/v1752859218/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-management-console-security-groups.jpg)

![The image shows an AWS EC2 Management Console with details of two running instances, both of type t2.micro, including their instance IDs, public IP addresses, and status checks.](https://kodekloud.com/kk-media/image/upload/v1752859220/notes-assets/images/AWS-Certified-Developer-Associate-Security-Groups-Demo/aws-ec2-management-console-instances-2.jpg)

## Conclusion

In this lesson, you learned how to:

- Launch an EC2 instance with a default security group.
- Modify security group rules to control traffic.
- Install and validate a web server (Nginx) on an EC2 instance.
- Apply multiple security groups for modular and scalable rule management.
- Implement security group-based restrictions for database instances instead of using static IP addresses.

Additionally, exploring Network ACLs (NACLs) for subnet-level traffic filtering is a natural next step in enhancing your network security. Happy cloud computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/40983421-03a9-4a1c-a611-773796219d5b)**
>
> Watch video content
