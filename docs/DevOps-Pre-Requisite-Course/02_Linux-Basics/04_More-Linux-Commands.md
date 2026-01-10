# More Linux Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Linux-Basics/More-Linux-Commands)

---

## Table of Contents

- More Linux Commands
  - User Account Commands
  - Sudo Privileges
  - Downloading Files from the Internet
  - Checking Your Operating System
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Linux Basics

# More Linux Commands

In this article, we explore several essential Linux commands that will help you navigate and manage your Linux system more effectively. Whether you're verifying your user account, working with sudo privileges, downloading files, or identifying your operating system, these commands will improve your workflow.

## User Account Commands

Begin by checking your current username with the following command:

```
whoami
```

For example, the output might be:

```
matthew
```

To retrieve detailed information about your user account—including user ID, group ID, and group memberships—run:

```
id
```

This command typically returns output similar to:

```
uid=1001(matthew) gid=1001(matthew) groups=1001(matthew)
```

To switch to another user account, use the `su` command. For instance, to switch to user Aparna, execute:

```
su aparna
Password:
```

If you are accessing the system via SSH and wish to log in as a different user, specify the username along with the hostname (e.g., `aparna@hostname`).

## Sudo Privileges

Linux systems include a superuser (`root`) with unrestricted access; however, for security reasons, production and enterprise environments typically restrict direct root access. Instead, a regular user with sudo privileges can perform administrative tasks such as installing software or accessing restricted directories.

When attempting to access files that require higher privileges, running a command as a regular user will result in an error. For example:

```
ls /root
```

Output:

```
ls: cannot open directory /root: Permission denied
```

By prefixing the command with `sudo`, a user with administrative rights can execute it successfully:

```
sudo ls /root
```

Output:

```
anaconda-ks.cfg  initial-setup-ks.cfg
```

> [!important]
> **Note**
>
> Always use `sudo` when executing administrative commands to avoid permission issues.

## Downloading Files from the Internet

There are numerous instances where you may need to download files such as RPM packages, binaries, or images from the internet. You can use the `curl` command, which downloads content from a specified URL. The `-O` option saves the output directly to a file:

```
curl http://www.some-site.com/some-file.txt -O
```

Alternatively, you can use the `wget` command by providing the complete URL of the file.

## Checking Your Operating System

If you're uncertain about which Linux distribution you are using, you can inspect release files in the `/etc` directory. Since the filenames vary by distribution, using a wildcard is often helpful. To list all release files, run:

```
ls /etc/*release*
```

A possible output might include:

```
/etc/centos-release       /etc/os-release         /etc/system-release
/etc/centos-release-upstream  /etc/redhat-release   /etc/system-release-cpe
```

To view detailed information about your operating system, use the `cat` command:

```
cat /etc/*release*
```

Example output:

```
CentOS Linux release 7.7.1908 (Core)
Derived from Red Hat Enterprise Linux 7.7 (Source)
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"
```

This output indicates that the system is running CentOS Linux 7.

---

This concludes our overview of additional Linux commands. With regular practice, these commands will become a seamless part of your Linux CLI toolkit for system navigation and administration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/6c454156-7943-4ef7-88f1-3bb643fa5205)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/67a8eed2-182f-4173-862c-fce2157eb226)**
>
> Practice lab
