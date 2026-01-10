# SSH and SCP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Security-and-File-Permissions/SSH-and-SCP)

---

## Table of Contents

- SSH and SCP
  - SSH
  - Passwordless SSH with Key Pairs
  - SCP
  - Watch Video
  - Practice Lab
    - Generating the Key Pair
    - Copying the Public Key to the Remote Server
    - Copying a File Using SCP
    - Copying Directories with SCP

---

## Content

Learning Linux Basics Course & Labs

Security and File Permissions

# SSH and SCP

In this lesson, Dave demonstrates essential commands for secure remote access and file transfers using SSH and SCP.

## SSH

SSH (Secure Shell) is a widely used protocol for remotely logging into and executing commands on another computer. By invoking SSH with the remote host’s IP address or hostname, you can securely connect to that machine. You may specify the username using the "user@" syntax or the "-l" flag. Ensure that the remote server has an SSH service running on port 22 and that you have proper authentication—either a valid username/password combination or an SSH key pair.

For instance, to connect to a server with the hostname "devapp01", you can use any of the following commands:

```
ssh <hostname_OR_IP_Address>
ssh <user>@<hostname_OR_IP_Address>
ssh -l <user> <hostname_OR_IP_Address>
[bob@caleston-lp10 ~]$ ssh devapp01
bob@devapp01's password:
Last login: Tue Apr  7 20:08:58 2020 from 192.168.1.109
[bob@devapp01 ~]$
```

In the example above, because the username is not explicitly mentioned, SSH attempts to log in using the current local user ("bob"). Upon connection, the system prompts you to enter the password for that account on the remote server.

> [!important]
> **Note**
>
> If connecting to a new server, ensure that the host key is trusted to prevent any security warnings.

## Passwordless SSH with Key Pairs

To avoid entering your password every time, you can configure passwordless authentication by using SSH key pairs. A key pair consists of:

- **Private Key**: Kept secure on your client device.
- **Public Key**: Shared and installed on your remote server.

When the public key is added to the remote server's `~/.ssh/authorized_keys` file, the system will grant access to any client possessing the corresponding private key.

### Generating the Key Pair

On your client machine, generate a key pair using the following command. You can optionally secure your key with a passphrase, though note that you will be prompted to enter it every time the key is utilized.

```
[bob@caleston-lp10 ~]$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/bob/.ssh/id_rsa):
/home/bob/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/bob/.ssh/id_rsa.
Your public key has been saved in /home/bob/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:PCRTdbxzzffzmi8uunjn5V/1LZCG0BvhVJYXBr9gYsE bob@caleston-lp10
The key's randomart image is:
+---[RSA 2048]----+
|          o oo   |
|         +E=oo   |
|        o O *..o. |
|         =o .o..  |
|        S O + .+  |
|         . . *    |
|          oo+     |
|           oo.+.  |
|          ..o+o   |
+----[SHA256]-----+
```

In this process, the public key is stored in `/home/bob/.ssh/id_rsa.pub` (identified by the `.pub` extension), while the private key remains safe in `/home/bob/.ssh/id_rsa`.

### Copying the Public Key to the Remote Server

To enable passwordless SSH login, copy your public key to the remote server using the `ssh-copy-id` command. This step authenticates you at least once with your password to install the key on the server.

```
[bob@caleston-lp10 ~]$ ssh-copy-id bob@devapp01
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/bob/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
bob@devapp01's password:
Number of key(s) added: 1


Now try logging into the machine with: "ssh bob@devapp01"
and verify that only the intended key(s) were added.
```

After completing these steps, you should be able to connect to the remote server without entering your password each time. Dave confirms that Bob’s public key is now installed in the `authorized_keys` file within the `.ssh` directory on the remote server.

## SCP

SCP (Secure Copy) is a powerful tool for transferring files and directories securely over SSH. It operates much like the traditional Linux `cp` command but enables file transfer between your local machine and remote servers.

### Copying a File Using SCP

For example, to transfer a file named `caleston-code.tar.gz` from your laptop to the same directory on a remote server ("devapp01"), you can execute:

```
[bob@caleston-lp10 ~]$ scp /home/bob/caleston-code.tar.gz devapp01:/home/bob
bob@devapp01's password:
caleston-code.tar.gz                             100% 2498KB  51MB/s  00:00
```

This command transfers the file to the destination path specified after the colon. Make sure you have the necessary write permissions on the destination directory to avoid errors.

> [!important]
> **Permission Warning**
>
> If you attempt to copy the file to a directory without the required permissions (e.g., `/root`), the transfer will fail with a "Permission denied" error.

```
[bob@caleston-lp10 ~]$ scp /home/bob/caleston-code.tar.gz devapp01:/root
bob@devapp01's password:
scp: /root/caleston-code.tar.gz: Permission denied
```

### Copying Directories with SCP

When you need to transfer entire directories, include the `-r` option to copy recursively. To maintain original file ownership and permissions, add the `-p` flag.

These SCP functionalities are highly beneficial when moving projects, such as migrating a Django application from your development environment to a production server.

Bob thanks Dave for the insightful lesson and heads back to his desk.

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/1dbc03e4-14e5-4c73-929a-55f2b6900acb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/86b0b1d4-3223-4f43-ba6d-de27822bb299)**
>
> Practice lab
