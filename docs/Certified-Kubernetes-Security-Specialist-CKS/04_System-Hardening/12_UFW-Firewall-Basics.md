# UFW Firewall Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/UFW-Firewall-Basics)

---

## Table of Contents

- UFW Firewall Basics
  - Inspecting Active Ports
  - Installing UFW
  - Configuring Default Firewall Rules
  - Defining Specific Allow Rules
  - Enabling UFW
  - Deleting Firewall Rules
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# UFW Firewall Basics

In this lesson, we introduce UFW (Uncomplicated Firewall), a user-friendly interface designed to simplify managing Linux firewall rules. We'll walk through configuring UFW on an Ubuntu server (app01) to restrict network access and secure your environment.

Imagine a setup where access to app01 must be limited. In this scenario, only the jump server with IP address 172.16.238.5 is allowed to establish SSH connections. This jump server is the primary access point for system administrators. Additionally, app01 hosts a web server on port 80, which needs to be accessible not only from the jump server but also from internal clients within the IP range 172.16.100.0/28.

![The image illustrates a network setup with an Admin Jump Server and Internal Users accessing an application server (app01) via SSH, HTTP, and TCP protocols.](https://kodekloud.com/kk-media/image/upload/v1752871753/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-UFW-Firewall-Basics/frame_40.jpg)

All other ports on app01 must remain closed to inbound traffic. To achieve this, we leverage Netfilter, the Linux kernel's internal packet filtering system. Although IPTables is a common command-line tool for managing firewall rules, its complexity often demands a simpler solution. UFW serves as an intuitive front-end for configuring IPTables.

![The image shows a comparison between "iptables" and "ufw (Uncomplicated Firewall)" under the title "Install UFW."](https://kodekloud.com/kk-media/image/upload/v1752871754/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-UFW-Firewall-Basics/frame_80.jpg)

## Inspecting Active Ports

Before configuring UFW, log in via SSH to app01 and inspect the active listening ports using the netstat utility. Run the following command to confirm that SSH (port 22) and HTTP (port 80) are active, along with port 8080 which should be blocked from inbound connections:

```
netstat -an | grep -w LISTEN
```

Expected output:

```
tcp        0      0 0.0.0.0:22          0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80           0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:8080         0.0.0.0:*               LISTEN
```

## Installing UFW

To install UFW on app01, start by updating your package list and then installing UFW:

```
apt-get update
# ... additional update output ...
apt-get install ufw
```

After installation, check the current status of UFW:

```
ufw status
```

The expected output should state:

```
Status: inactive
```

## Configuring Default Firewall Rules

Since no firewall rules are active yet, begin by setting default policies. We want to permit all outbound traffic while denying inbound connections. Execute these commands as the root user:

```
ufw default allow outgoing
```

The system will confirm:

```
Default outgoing policy changed to 'allow'
(be sure to update your rules accordingly)
```

Next, set the default rule to deny all inbound connections:

```
ufw default deny incoming
```

## Defining Specific Allow Rules

Now that the default policies are in place, add rules to allow specific traffic:

1.  Allow SSH connections on port 22 only from the jump server with IP address 172.16.238.5:

    ```
    ufw allow from 172.16.238.5 to any port 22 proto tcp
    ```

2.  Allow HTTP connections on port 80 from the jump server:

    ```
    ufw allow from 172.16.238.5 to any port 80 proto tcp
    ```

3.  Allow HTTP access on port 80 from the internal network (IP range 172.16.100.0/28):

    ```
    ufw allow from 172.16.100.0/28 to any port 80 proto tcp
    ```

Since port 8080 is actively listening but must be blocked, add an explicit deny rule:

```
ufw deny 8080
```

> [!important]
> **Note**
>
> Although the default policy already denies incoming connections, explicitly denying port 8080 clarifies its intended blocked status.

## Enabling UFW

Before enabling UFW, verify that all necessary rules are correctly set to avoid unintended disconnections. Once reviewed, enable UFW with:

```
ufw enable
```

The system warns that enabling UFW may disrupt existing SSH connections. Confirm by entering “y” when prompted:

```
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
```

After UFW is enabled, check its status:

```
ufw status
```

Expected output:

```
Status: active
To                         Action      From
--                         -----       ----
22/tcp                     ALLOW       172.16.238.5
80/tcp                     ALLOW       172.16.238.5
80/tcp                     ALLOW       172.16.100.0/28
8080                       DENY        Anywhere
8080 (v6)                  DENY        Anywhere (v6)
```

## Deleting Firewall Rules

To remove a specific rule, such as the deny rule for port 8080, use the following command:

```
ufw delete deny 8080
```

The system confirms the deletion:

```
Rule deleted
Rule deleted (v6)
```

Alternatively, you can delete rules based on their line numbers listed in the firewall status. For example, if the deny rule for port 8080 is listed as rule number 5 and then as rule number 4, delete them one by one:

```
ufw delete 5
# Confirm deletion when prompted, then:
ufw delete 4
```

After removing rules, recheck the status:

```
ufw status
```

The updated rules should appear as follows:

```
Status: active
To                         Action      From
--                         -----       ----
22/tcp                     ALLOW       172.16.238.5
80/tcp                     ALLOW       172.16.238.5
80/tcp                     ALLOW       172.16.100.0/28
8080                       DENY        Anywhere
```

## Summary

This lesson provided a comprehensive guide to configuring UFW on an Ubuntu server to secure SSH and HTTP traffic while blocking unauthorized connections. By setting default policies and specifying clear allow/deny rules, you can effectively manage your server's firewall and maintain a secure environment.

Practice these UFW commands to solidify your understanding and ensure your server remains protected against unwanted network traffic.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/330f6887-f23b-41f4-8a6d-3db2f2fee5fd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/22eb9c61-27bc-4c84-a5fd-5672cac031de)**
>
> Practice lab
