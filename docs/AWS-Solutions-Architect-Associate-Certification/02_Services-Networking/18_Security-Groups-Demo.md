# Security Groups Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Networking/Security-Groups-Demo)

---

## Table of Contents

- Security Groups Demo
  - Launching an EC2 Instance with a Security Group
  - Modifying Security Group Rules
  - Creating and Applying a New Security Group
  - Installing and Testing a Web Server (nginx)
  - Outbound Rules and Stateful Behavior
  - Combining Multiple Security Groups
  - Creating a Database Security Group
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Networking

# Security Groups Demo

In this lesson, you'll learn how to leverage AWS security groups and network ACLs (NACLs) to control traffic to and from your AWS resources. We begin by launching an [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance and applying security groups to efficiently manage access. This method applies equally to other resources such as load balancers and databases, as they use similar configuration processes.

## Launching an EC2 Instance with a Security Group

First, create an EC2 instance using the default Linux image. For demonstration, name the instance "server one" and launch it within an existing Virtual Private Cloud (VPC). During setup, you will have the option to configure a security group. If you do not select an existing security group, AWS will automatically create one for you. By default, this security group contains an inbound rule that permits SSH (TCP port 22) access from any IP address (0.0.0.0/0).

![The image shows the AWS EC2 Management Console, specifically the configuration page for launching a new instance, including security group settings and instance details.](https://kodekloud.com/kk-media/image/upload/v1752865668/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-ec2-management-console-instance-launch.jpg)

The default rule uses the TCP protocol, essential for SSH connections. However, you can customize this rule to use a different protocol or port, such as HTTP on port 80. For this demo, we keep the default SSH configuration.

Once the instance is launched, navigate to it in the EC2 console. Although the status may initially show as "initializing," it will quickly change to "running." To verify the security group settings, select the instance and check the "Security" tab. You will see an inbound rule allowing SSH (port 22) and an outbound rule permitting all traffic.

![The image shows the AWS EC2 Management Console, specifically the configuration page for launching an instance, including security group settings and storage configuration.](https://kodekloud.com/kk-media/image/upload/v1752865670/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-ec2-management-console-instance-launch-2.jpg)

To test connectivity, use the following SSH command:

```
ssh -i main.pem ec2-user@3.82.5.183
```

If port 22 is open in the security group, the connection will be successful. Otherwise, the connection attempt will fail.

## Modifying Security Group Rules

Now, let's modify the security group rules to restrict access. Open the security group page in a new tab and click "Edit inbound rules." Remove the existing SSH inbound rule so that the instance has no inbound rules, effectively blocking all traffic.

![The image shows the AWS Management Console interface for editing inbound rules of a security group, specifically allowing SSH traffic on port 22 from any IP address.](https://kodekloud.com/kk-media/image/upload/v1752865672/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-management-console-security-group-ssh.jpg)

When you attempt to SSH into the instance again, the connection will hang because no inbound rules permit access:

```
C:\Users\sanje\Documents\scratch\aws-demo>ssh -i main.pem ec2-user@3.82.5.183 - launch-wizard-20
The authenticity of host '3.82.5.183 (3.82.5.183)' can't be established.
ECDSA key fingerprint is SHA256:8kdgYdu32+mHW5/8xQ49708P4ChRwRBn+oSeBmM.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '3.82.5.183' (ECDSA) to the list of known hosts.
Amazon Linux 2023
```

And similarly:

```
C:\Users\sanje\Documents\scratch\aws-demo>ssh -i main.pem ec2-user@3.82.5.183
The authenticity of host '3.82.5.183 (3.82.5.183)' can't be established.
ECDSA key fingerprint is SHA256:BDxdgWyu32+mHHW5/8xQ409708P4CHRwRBn+oSeBmM.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '3.82.5.183' (ECDSA) to the list of known hosts.
             #
          ~  #####
        ~~~~~ #####
       ~~~~~~  ###|#
      ~~~~~~~~ #/__
   ~~~~~~~~~~~ V\'-._
  ~~~~~~~~~~~~  _.-'
                /m/
[ec2-user@ip-10-1-1-82 ~]$ client_loop: send disconnect: Connection reset
C:\Users\sanje\Documents\scratch\aws-demo>ssh -i main.pem ec2-user@3.82.5.183
```

> [!important]
> **Note**
>
> Since there are no inbound rules, remote connections cannot be established. Stop this test connection to prevent unintended lockouts.

## Creating and Applying a New Security Group

To restore connectivity, create a new security group for the server. Name it "web server security group" (or a similar descriptive name such as "web applications") and ensure you select the correct VPC where the server exists. Define an inbound rule that allows SSH traffic (port 22) from any IP address (0.0.0.0/0), keeping the outbound rule to allow all traffic.

This newly created security group mirrors the initial default rule but is manually set up. After creation, reattach it to your EC2 instance ("server one"):

1.  In the EC2 console, select the instance.
2.  Click on "Actions" > "Security" > "Change Security Groups."
3.  Remove the old security group and add the new "web server security group."
4.  Click "Add" and then "Save."

![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro. The "Security" tab for "server1" is open, displaying security group details and inbound rules.](/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-ec2-security-console-instances.jpg)

After attaching the correct security group, you should be able to SSH into the instance as it now permits SSH traffic per the new rules.

## Installing and Testing a Web Server (nginx)

With SSH access restored, install the nginx web server on your EC2 instance by running:

```
[ec2-user@ip-10-1-1-82 ~]$ sudo yum install nginx
```

Next, start the nginx service with:

```
[ec2-user@ip-10-1-1-82 ~]$ sudo systemctl start nginx
```

To verify that nginx is running correctly, execute a local cURL command:

```
[ec2-user@ip-10-1-1-82 ~]$ curl localhost
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

Once confirmed, open a browser and navigate to the instance's public IP address. If the web page fails to load and hangs, it is likely due to the security group allowing only SSH traffic.

> [!important]
> **Warning**
>
> Ensure that you update the "web server security group" to allow HTTP (port 80) and HTTPS (port 443) traffic for full web server functionality.

To add these rules:

1.  Open the security group in the EC2 console.
2.  Click "Edit inbound rules."
3.  Add an HTTP rule (automatically sets protocol to TCP and port to 80) and an HTTPS rule (TCP port 443).
4.  Set the source to 0.0.0.0/0 for both rules and save your changes.

![The image shows the AWS Management Console interface for editing inbound rules of a security group, allowing SSH, HTTP, and HTTPS traffic. Each rule specifies the protocol, port range, and source IP address.](https://kodekloud.com/kk-media/image/upload/v1752865673/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-management-console-security-group-rules.jpg)

Now, reloading the public IP in your browser should display the nginx welcome page, confirming that the web server is accessible.

## Outbound Rules and Stateful Behavior

Security groups in AWS are stateful. This means that even if the default outbound rule allows all traffic, AWS automatically permits return traffic for any inbound connection. For example, if an inbound request is received on port 80, the outbound response is allowed even in the absence of an explicit outbound rule.

You can test outbound connectivity by pinging an external server:

```
[ec2-user@ip-10-1-1-82 ~]$ ping 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=53 time=1.58 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=53 time=1.61 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=53 time=1.91 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=53 time=1.62 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=53 time=1.65 ms
64 bytes from 8.8.8.8: icmp_seq=6 ttl=53 time=1.57 ms
--- 8.8.8.8 ping statistics ---
7 packets transmitted, 7 received, 0% packet loss, time 601ms
rtt min/avg/max/mdev = 1.572/1.651/1.909/0.107 ms
```

If outbound traffic is blocked, the ping test will fail. Reinstate the outbound rule allowing all traffic to enable responses from your EC2 instance.

![The image shows an AWS EC2 Management Console screen displaying details of a security group named "webserver-sg," including inbound rules for SSH, HTTP, and HTTPS protocols.](https://kodekloud.com/kk-media/image/upload/v1752865675/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-ec2-security-group-webserver-sg.jpg)

## Combining Multiple Security Groups

AWS allows you to attach multiple security groups to a single EC2 instance, providing a modular approach to access control. For demonstration, create the following two security groups:

1.  **Allow SSH Security Group** – contains an inbound rule for SSH (port 22) from any IP.
2.  **Allow HTTP Security Group** – contains an inbound rule for HTTP (port 80) from any IP.

![The image shows the AWS Management Console interface for creating a new security group, with fields for entering the security group name, description, and VPC selection. There are sections for adding inbound and outbound rules.](https://kodekloud.com/kk-media/image/upload/v1752865676/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-management-console-security-group.jpg)

After creating these security groups, update the instance ("server one") by following these steps:

1.  In the EC2 console, select your instance.
2.  Go to "Actions" > "Security" > "Change Security Groups."
3.  Remove the previous security group.
4.  Attach both the SSH and HTTP security groups.
5.  Save your changes.

![The image shows an AWS EC2 Management Console screen for changing security groups, displaying instance and network interface details, and associated security groups with options to add or remove them.](https://kodekloud.com/kk-media/image/upload/v1752865677/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-ec2-security-groups-console.jpg)

The rules of both security groups will merge, allowing both SSH and HTTP traffic. You can verify the updated configuration by checking the instance details in the EC2 instances list:

![The image shows the AWS EC2 Management Console displaying a list of security groups, including details like security group IDs, names, VPC IDs, and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752865678/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-ec2-security-groups-console-2.jpg)

This modular approach simplifies management across instances. You can apply the same security groups to another instance (e.g., server two) if similar access requirements exist.

## Creating a Database Security Group

Lastly, create a security group specifically for a database. Name it "database security group" and add an inbound rule for your database port (for example, port 5432 for PostgreSQL). Although you could set the source to 0.0.0.0/0 for universal access, it is best practice in production to restrict access to only your web servers.

One advanced option is to use the security group of your web servers (e.g., the "Allow HTTP Security Group") as the source. This ensures that the database only accepts connections from trusted sources, and any changes to web server configurations automatically update the access rules.

![The image shows an AWS EC2 Management Console with two running instances, "server-2" and "server1," both of type t2.micro, with details of "server1" displayed.](https://kodekloud.com/kk-media/image/upload/v1752865679/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Security-Groups-Demo/aws-ec2-management-console-instances-3.jpg)

## Conclusion

In this lesson, you learned how to:

- Launch an EC2 instance with a default security group.
- Modify security group rules to restrict access.
- Create and attach a new security group that enables SSH, HTTP, and HTTPS access.
- Combine multiple security groups to modularize and simplify access control.
- Create a dedicated database security group with restricted access linked to another security group.

Next, we will explore filtering traffic at the subnet level using NACLs. Happy cloud computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/e03ffb87-3345-4fbb-9576-cb53d21d7a6a/lesson/05c85ddc-42e1-44d4-9877-27fd030ff460)**
>
> Watch video content
