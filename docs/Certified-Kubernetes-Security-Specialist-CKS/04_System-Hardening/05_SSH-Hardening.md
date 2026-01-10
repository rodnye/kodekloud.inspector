# SSH Hardening - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/SSH-Hardening)

---

## Table of Contents

- SSH Hardening
  - Overview
  - Basic SSH Connection
  - Using SSH Key Pairs for Authentication
  - Hardening the SSH Configuration
  - Summary
  - Watch Video
    - Generating an SSH Key Pair
    - Copying the Public Key to the Remote Server
    - Disabling Root Login
    - Disabling Password-Based Authentication

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# SSH Hardening

SSH is a critical service used to log into remote Linux servers and execute commands securely. In this lesson, you'll learn how to harden SSH to enhance the security of your nodes.

## Overview

Connecting to a remote server typically involves using the ssh command with the server’s IP address or hostname. You can specify the remote user by either prepending the username followed by an @ symbol (e.g., user@hostname) or by using the -l flag. Remember, the remote server must have the SSH service running and allow connections through port 22.

Also, valid authentication credentials are required to access the server. These credentials can be either a username and password combination or an SSH key pair for a passwordless login. In the following sections, we first explore basic SSH usage and then move on to setting up SSH key pairs.

## Basic SSH Connection

To connect from your laptop to a Linux host named node01, simply run:

```
ssh node01
```

If no username is specified, SSH will use your local username (for example, mark). When connected, you will be prompted to enter the password for that user on the remote system. In this scenario, your laptop acts as the client while node01 functions as the server running the SSH service.

> [!important]
> **Tip**
>
> If you encounter connection issues, ensure that the SSH service is active on the remote server and that port 22 is open.

## Using SSH Key Pairs for Authentication

A more secure authentication method involves using a cryptographic key pair—composed of a private key on the client and a public key installed on the remote server. With this setup, you can log in without repeatedly entering a password.

### Generating an SSH Key Pair

Generate the key pair on your client (e.g., your laptop) using the ssh-keygen command:

```
ssh-keygen -t rsa
```

During generation, you will be prompted to enter a passphrase. Although optional, adding a passphrase increases security in case your private key is compromised. Note that using a passphrase will require you to enter it each time the key is used. The keys are stored in a hidden directory within your home folder (.ssh), with the public key typically named id_rsa.pub and the private key as id_rsa.

Example output:

```
ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/mark/.ssh/id_rsa):
/home/mark/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/mark/.ssh/id_rsa.
Your public key has been saved in /home/mark/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:PCRTdbxxzffzmi8uunjn5V/1LZCG0BvhVJYXBr9gYsE mark@localhost
The key's randomart image is:
+---[RSA 2048]----+
|      .o=oo+    |
|       +E=++    |
|      o * o=. o |
|       = o*.o.   |
|      S o + .    |
|       . . oo+   |
|          .. o+..|
|         .o=..oo+|
|          ..o.o+.|
+----[SHA256]-----+
```

The public key (id_rsa.pub) is shared with remote systems, while the private key (id_rsa) stays secure on your client system.

### Copying the Public Key to the Remote Server

To enable passwordless login, copy the public key to the remote server using the ssh-copy-id command. For example, if your username is mark and the remote server is node01, run:

```
ssh-copy-id mark@node01
```

After providing your password for the remote system, the public key is appended to the `authorized_keys` file inside the `.ssh` directory of your remote home folder. You can verify its content with:

```
cat /home/mark/.ssh/authorized_keys
```

This confirms that the public key has been successfully installed. Going forward, you should be able to connect without entering your password each time.

## Hardening the SSH Configuration

Once key-based authentication is set up, you can further secure your server by modifying the SSH configuration.

### Disabling Root Login

Disabling remote logins for the root account is a best security practice. This prevents unauthorized direct root access. Instead, use standard user accounts with privilege escalation tools like sudo for administrative tasks.

Edit the SSH configuration file as the root user:

```
vi /etc/ssh/sshd_config
```

Locate the line for PermitRootLogin and change it to:

```
PermitRootLogin no
```

### Disabling Password-Based Authentication

Since key-based authentication is now in place, you can disable password-based authentication to further protect your server. In the same configuration file (`/etc/ssh/sshd_config`), find the PasswordAuthentication directive and update it as follows:

```
PasswordAuthentication no
```

After making these changes, save the file and restart the SSH service:

```
systemctl restart sshd
```

> [!important]
> **Reminder**
>
> After restarting the SSH service, ensure you can log in with your SSH key. It is advised to keep an active session until you confirm that key-based authentication works properly, to avoid locking yourself out.

## Summary

In this lesson, you learned how to secure your Linux nodes by hardening the SSH service. We covered:

- Basic SSH connection commands
- Generating and using SSH key pairs for enhanced security
- Copying your public key to the remote server
- Securing the SSH configuration by disabling root login and password-based authentication

For more detailed security guidance, consider exploring established best practices for SSH hardening.

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/ca52732f-2d65-4d47-8eca-1f42459c01f2)**
>
> Watch video content
