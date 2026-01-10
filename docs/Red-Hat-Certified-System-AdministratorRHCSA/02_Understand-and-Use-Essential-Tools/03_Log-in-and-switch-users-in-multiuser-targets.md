# Log in and switch users in multiuser targets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Log-in-and-switch-users-in-multiuser-targets)

---

## Table of Contents

- Log in and switch users in multiuser targets
  - Linux Accounts
  - Viewing User Information
  - Switching Users
  - Watch Video
    - Using the su Command
    - Using the sudo Command
    - Sudoers File Syntax

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Log in and switch users in multiuser targets

In this lesson, we explore Linux security and access control fundamentals. We cover essential topics such as account types, access control lists, user switching, and privilege escalation, and then dive into creating and managing users along with file-level ownership and permissions. After each section, you can apply your knowledge in hands-on labs.

Security in Linux involves various components. The system typically uses user and password-based authentication, with the Pluggable Authentication Module (PAM) offering a flexible way to authenticate users for different applications and services.

![The image is a flowchart related to Linux security, showing components like Access Controls, PAM, Network Security, SSH Hardening, SELinux, and others. It is titled "Linux Accounts" and is from KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752883629/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Log-in-and-switch-users-in-multiuser-targets/linux-security-flowchart-accounts.jpg)

In addition to PAM, Linux systems employ multiple network security features to control access to services. While external firewalls are popular, built-in tools such as IPTables and FirewallD also manage rule sets. SSH (Secure Shell) ensures secure remote access with robust hardening techniques to limit connections to authorized users. SELinux further strengthens security by enforcing strict policies that isolate applications from one another.

> [!important]
> **Note**
>
> In this lesson, our focus is on basic access control, including file ownership and permissions. It is essential to first understand Linux accounts before advancing to these topics.

## Linux Accounts

Every Linux user has an associated account that stores crucial details like the username, password, and unique identifier (UID). These details are maintained in the `/etc/passwd` file. For example:

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
bob:1000:1000:Bob Kingsley,,,,:/home/bob:/bin/bash
```

Linux groups, which are collections of users with shared responsibilities, are listed in the `/etc/group` file. Each group is assigned a unique group identifier (GID). For instance:

```
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

Consider two developers, Bob and Michael, working collaboratively on the same system. By grouping them under "developers," you can easily assign similar file and directory permissions.

Each user account stores key details such as:

- Username
- Unique ID (UID)
- Primary group ID (GID), typically matching the username if no other group is specified
- Home directory path
- Default shell

The diagram below illustrates the relationship between user accounts and groups, detailing information like username, UID, and GID.

![The image is a diagram illustrating Linux accounts, showing the relationship between a user and a group, with details like username, UID, and GID.](https://kodekloud.com/kk-media/image/upload/v1752883630/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Log-in-and-switch-users-in-multiuser-targets/linux-accounts-user-group-diagram.jpg)

To check a user’s account details, you can use the `id` command. For example:

```
[~]$ id michael
uid=1001(michael) gid=1001(michael) groups=1001(michael),1003(developers)
```

For further details like the home directory and default shell, inspect the `/etc/passwd` file with:

```
[~]$ grep -i michael /etc/passwd
michael:x:1001:1001::/home/michael:/bin/sh
```

There are several types of accounts in Linux:

- **Superuser Account:** The root account (UID 0) has unrestricted access.
- **System Accounts:** Created during OS installation for software and services; these accounts usually lack dedicated home directories and possess UIDs below 100 or between 500 and 1000 (e.g., SSHD or mail users).
- **Service Accounts:** Similar to system accounts, these are created when installing services, such as an NGINX service account.

The following diagram summarizes these account types along with UID conventions:

![The image is a diagram showing four types of accounts: User Account, Superuser Account, System Accounts, and Service Accounts, each with examples and UID specifications.](https://kodekloud.com/kk-media/image/upload/v1752883634/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Log-in-and-switch-users-in-multiuser-targets/account-types-diagram-uid-examples.jpg)

## Viewing User Information

To retrieve details about users on a Linux system, the following commands are helpful:

- The `id` command displays the UID, GID, and group memberships.
- The `who` command lists currently logged-in users.
- The `last` command provides a history of user logins and system reboots.

For example:

```
[~]$ id
uid=1000(michael) gid=1000(michael) groups=1000(michael)

[~]$ who
bob     pts/2        Apr 28 06:48 (172.16.238.187)

[~]$ last
michael  :1     :1           Tue May 12 20:00 still logged in
sarah    :1     :1           Tue May 12 12:00 still running
reboot   system boot  5.3.0-758-gen  Mon May 11 13:00 - 19:00 (06:00)
```

## Switching Users

There are several methods to switch between user accounts in Linux:

### Using the su Command

The `su` command allows you to switch to any user account, including root. You can also run a specific command as another user by invoking the `su -c` option. For example:

Switch to the root account:

```
[~]$ su -
Password:
root ~#
```

Run a command as root without switching accounts:

```
[~]$ su -c "whoami"
Password:
root
```

> > [!important]
> > **Warning**
> >
> > Using `su` requires the target account's password, which might not be secure in all contexts.

### Using the sudo Command

A more secure method is to use `sudo`, which allows a trusted user to execute administrative tasks by providing their own password. For example:

```
[michael@ubuntu-server ~]$ sudo apt-get install nginx
[sudo] password for michael:
```

The sudo configuration in `/etc/sudoers`—which should be edited using the `visudo` command—dictates which users can perform privilege escalation. Many setups limit root logins by setting the root user's shell to a no-login shell:

```
[~]$ grep -i ^root /etc/passwd
root:x:0:0:root:/root:/usr/sbin/nologin
```

Below is an example of a typical configuration from the `/etc/sudoers` file:

```
[~]$ cat /etc/sudoers
User privilege specification
root    ALL=(ALL:ALL) ALL
# Members of the admin group may gain root privileges
%admin  ALL=(ALL) ALL
# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
# Allow Bob to run any command
bob ALL=(ALL:ALL) ALL
# Allow Sarah to reboot the system
sarah localhost=/usr/bin/shutdown -r now
# See sudoers(5) for more information on "#include" directives:
#include_dir /etc/sudoers.d
```

### Sudoers File Syntax

Each line in the sudoers file starts with a username or a group (indicated by a `%` prefix). The structure is as follows:

1.  The first field specifies the user or group.
2.  The second field (commonly set to `ALL`) specifies the host on which the privileges apply.
3.  The third field, enclosed in parentheses, indicates the users or groups that the command can be run as (often set to `ALL`).
4.  The fourth field lists allowed commands – either `ALL` for unrestricted access or specific commands for limited permissions.

Here is a consolidated view of the sudoers configuration:

```
[~]$ cat /etc/sudoers
User privilege specification
root    ALL=(ALL:ALL) ALL
%admin  ALL=(ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
bob ALL=(ALL:ALL) ALL
sarah localhost=/usr/bin/shutdown -r now
#include_dir /etc/sudoers.d
```

This setup ensures that only authorized users can escalate privileges, thereby enhancing overall system security.

By understanding these components and configurations, you now have a strong foundation in managing Linux accounts, groups, and access control.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/a9083933-1ae8-464f-a13b-264ea915f3d4)**
>
> Watch video content
