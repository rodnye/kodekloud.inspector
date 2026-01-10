# Privilege Escalation in Linux - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Privilege-Escalation-in-Linux)

---

## Table of Contents

- Privilege Escalation in Linux
  - Using Sudo Versus Direct Commands
  - Understanding the /etc/sudoers File
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Privilege Escalation in Linux

In this lesson, we explore how privilege escalation works in Linux and why it is critical from a security perspective. Previously, we disabled root user login via SSH because using the root account for routine tasks poses significant security risks. However, performing administrative tasks—such as installing software or conducting system maintenance—still requires elevated privileges.

One of the most effective methods to execute commands with root privileges is through the sudo command. Using sudo enables trusted users to run administrative commands by providing their own password, which not only strengthens security but also creates an audit trail of actions performed.

> [!important]
> **Note**
>
> For enhanced security, always use sudo rather than logging in directly as root.

## Using Sudo Versus Direct Commands

If you attempt to install a package without sudo privileges, you will encounter a permission error:

```
apt install nginx
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?
```

When you prepend the command with sudo, the system will prompt you for your password, allowing you to proceed with administrative tasks:

```
sudo apt install nginx
[sudo] password for michael:
```

## Understanding the /etc/sudoers File

The default configuration for sudo is maintained in the `/etc/sudoers` file. This file governs policies for executing commands with elevated privileges and can only be modified by users who have been explicitly granted access. Only users listed in the `/etc/sudoers` file can use sudo, thereby preventing unauthorized root logins.

Below is an excerpt from the `/etc/sudoers` file that demonstrates a granular assignment of privileges:

```
cat /etc/sudoers
User privilege specification
root    ALL=(ALL:ALL) ALL
# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL
# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
# Allow mark to run any command
mark    ALL=(ALL:ALL) ALL
# Allow Sarah to reboot the system
sarah localhost=/usr/bin/shutdown -r now
# See sudoers(5) for more information on "#include" directives
#include /etc/sudoers.d
```

Each line in the sudoers file is structured as follows:

1.  **User or Group:** The first field specifies the user or group (groups are prefixed with `%`) that receives the privileges.
2.  **Host Specification:** The second field, typically set to `ALL`, indicates that the privileges apply to all hosts (commonly confined to the localhost).
3.  **Run-as Specification:** The third field, enclosed in parentheses, indicates the user(s) as whom the commands will be executed. “ALL” means that commands can be run as any user.
4.  **Command Specification:** The fourth field specifies the allowed commands. Using “ALL” permits any command, though you can restrict users to specific commands, as demonstrated in the entry for Sarah.

Using sudo in this way executes the command in the user's shell environment, rather than switching entirely to a root shell. For further security, you can assign a no-login shell to the root account.

> [!important]
> **Warning**
>
> Avoid modifying the `/etc/sudoers` file improperly—always use the `visudo` command to safely edit this file.

That concludes this lesson. Please continue with the practice exercises to work with SSH and sudo.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/5c0e085f-5fd0-41a5-b248-c53afa22bb32)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/a4f40d83-225d-40b2-a6e2-90f3f70a72a0)**
>
> Practice lab
