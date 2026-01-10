# Linux Accounts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Security-and-File-Permissions/Linux-Accounts)

---

## Table of Contents

- Linux Accounts
  - User and Group Accounts
  - Switching Users and Privilege Escalation
  - Understanding the sudoers File
  - Watch Video
    - What is a Linux Account?
    - Example: Grouping Developers
    - Using the su Command
    - Using the sudo Command

---

## Content

Learning Linux Basics Course & Labs

Security and File Permissions

# Linux Accounts

In this lesson, we explore security and access control in Linux. You will learn about account types, access control files, user switching, and privilege escalation, along with hands-on labs to reinforce your skills. We focus on key security concepts including user management, file-level ownership, and permissions.

Security in Linux employs user and password-based authentication mechanisms to control system access. Several tools and frameworks are available to manage authentication:

- **PAM (Pluggable Authentication Modules):** Governs how programs and services handle authentication.
- **Network Security Tools:** Utilities such as iptables and Firewalld regulate access to network services.
- **SSH (Secure Shell):** Provides secure remote access over unsecured networks, with SSH hardening ensuring only authorized users can connect.
- **SELinux:** Enforces security policies to isolate applications running on the same system.

> [!important]
> **Note**
>
> While numerous tools exist to secure a Linux system, this article focuses on basic access control, file ownership, and permissions.

---

## User and Group Accounts

### What is a Linux Account?

Each Linux user is associated with an account that holds critical details such as the username, password, and a unique identifier (UID). Account details such as the home directory and default shell are stored in the `/etc/passwd` file. For example:

```
[~]$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin/nologin
bin:x:2:2:bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
bob:1000:1000:Bob Kingsley,,,:/home/bob:/bin/bash
```

Linux groups enable you to organize users based on roles or functions. Group-related information, including the unique group identifier (GID), is maintained in the `/etc/group` file.

### Example: Grouping Developers

Consider a scenario with two developers, Bob and Mumshad Mannambeth, working on the same system. They can be grouped under a Linux group called "developers" to facilitate shared access to particular files and directories. For instance:

```
[~]$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin/nologin
bin:x:2:2:bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
bob:1000:1000:Bob Kingsley,,,:/home/bob:/bin/bash


[~]$ cat /etc/group
ssh:x:118:
lpadmin:x:119:
scanner:x:120:saned
avahi:x:121:
saned:x:122:
color:x:123:
geoclue:x:124:
pulse:x:125:
pulse-access:x:126:
gdm:x:127:
systemd-coredump:x:999:
bob:x:1000:
developers:x:1003:bob,michael
```

Each user account comprises a username, UID, a primary GID (typically matching the username), the home directory, and the default shell. To review detailed information about a specific user account and its group memberships, you can use the `id` command:

```
[~]$ id michael
uid=1001(michael) gid=1001(michael) groups=1001(michael),1003(developers)
```

User accounts fall into different types:

- **Regular User Account:** Represents an individual person requiring system access.
- **Superuser Account:** The root account (UID 0) with full system privileges.
- **System Accounts:** Created during OS installation for software and services; typically have UIDs under 100 (or between 500 and 1000) and usually lack dedicated home directories.
- **Service Accounts:** Similar to system accounts, these are created for specific services such as NGINX.

![The image illustrates Linux account structure, showing a user with username "michael," UID 1000, GID 1000, and associated groups.](https://kodekloud.com/kk-media/image/upload/v1752881140/notes-assets/images/Learning-Linux-Basics-Course-Labs-Linux-Accounts/frame_220.jpg)

---

## Switching Users and Privilege Escalation

Linux offers multiple methods for switching between users:

### Using the su Command

The `su` (substitute user) command enables you to switch to another user, including the root account. For example, to switch to root:

```
[~]$ su -
Password:
root ~#
```

Alternatively, execute a specific command as another user using `su -c` (which requires the target user's password):

```
[~]$ su -c "whoami"
Password:
root
```

Even though `su` is a useful utility, it is generally recommended to use `sudo` for enhanced security.

### Using the sudo Command

The `sudo` command allows trusted users to execute administrative commands using their own password. This method avoids the need to log in as root directly. For example:

```
[michael@ubuntu-server ~]$ sudo apt-get install nginx
[sudo] password for michael:
```

The default `sudo` configuration is defined in the `/etc/sudoers` file, where administrators can configure specific privileges. For example, Bob may have full administrative rights while Sarah might be restricted to rebooting the system only.

> [!important]
> **Warning**
>
> When using `sudo`, ensure that only trusted users are granted access to prevent unauthorized system changes.

A common security practice is to set the root account to a no-login shell:

```
[~]$ grep -i ^root /etc/passwd
root:x:0:0:root:/root:/usr/sbin/nologin
```

Below is an example configuration found in a `/etc/sudoers` file:

```
[~]$ cat /etc/sudoers
User privilege specification
root    ALL=(ALL:ALL) ALL
# Members of the admin group may gain root privileges
%admin  ALL=(ALL) ALL
# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
# Allow Bob to run any command
bob     ALL=(ALL:ALL) ALL
# Allow Sarah to reboot the system
sarah   localhost=/usr/bin/shutdown -r now
# See sudoers(5) for more information on "#include" directives:
#include directory /etc/sudoers.d
```

---

## Understanding the sudoers File

The sudoers file is organized as follows:

- Lines beginning with a hash (#) are comments.
- The first field specifies the user or group (groups are prefixed with `%`) that is granted sudo privileges.
- The second field, typically set to `ALL`, indicates on which hosts these privileges apply.
- The third field, within parentheses, defines the users or groups the command can be executed as—usually set to `ALL`.
- The fourth field lists the allowed commands. This field can either be set to `ALL` for unrestricted access or limited to specific commands (e.g., permitting Sarah only to execute the reboot command).

By carefully configuring these fields, administrators can grant precise command execution rights, minimizing the risk of unauthorized actions.

![The image categorizes account types: User, Superuser, System, and Service Accounts, with examples and UID specifications for each.](https://kodekloud.com/kk-media/image/upload/v1752881141/notes-assets/images/Learning-Linux-Basics-Course-Labs-Linux-Accounts/frame_340.jpg)

---

In summary, mastering Linux accounts, groups, and user switching methodologies is essential for securing your Linux system. By understanding file ownership, permissions, and privilege escalation, you can implement robust access control measures that safeguard your environment.

For more insights into Linux security and administration:

- [Linux Security Guide](https://www.linux.com/topic/rights/linux-security-basics/)
- [Linux User Management](https://www.cyberciti.biz/tips/linux-managing-users.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/302fcc6e-6555-4646-b71e-6fb2dee21474)**
>
> Watch video content
