# Manage User Privileges - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Users-and-Groups/Manage-User-Privileges)

---

## Table of Contents

- Manage User Privileges
  - Using Sudo and User Groups
  - Fine-Tuning Sudo Privileges
  - Watch Video
  - Practice Lab
    - Example Policies

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Users and Groups

# Manage User Privileges

In this article, we explore how to manage user privileges on Linux systems. By understanding how sudo works and how user groups are associated with administrative rights, you can effectively grant and fine-tune access on your server.

## Using Sudo and User Groups

For critical system changes, you typically prepend your commands with sudo. Since only the root user is allowed to modify sensitive parts of the system, sudo temporarily elevates privileges to execute commands as the superuser.

A user is permitted to use sudo if they belong to the sudo group. To verify your group memberships, run:

```
$ groups
aaron family sudo
```

Since Aaron is a member of the sudo group, he can execute administrative tasks using sudo. To grant another user sudo privileges (for example, to add Trinity), execute the following:

```
$ groups
aaron family sudo
$ sudo gpasswd -a trinity sudo
```

At this point, the user Trinity will have administrator privileges, meaning she can execute any command using sudo. However, granting full sudo rights enables complete control over the system, which might not always be desirable.

## Fine-Tuning Sudo Privileges

For more granular control over user privileges, you can define specific sudo policies using the sudoers file located at `/etc/sudoers`. It is important not to edit this file directly; instead, always use the `visudo` utility. Visudo opens the file in an editor, checks for syntax errors before saving, and thus prevents misconfigurations.

Before proceeding with customization, remove Trinity from the sudo group to avoid granting her full sudo privileges:

```
$ sudo gpasswd -d trinity sudo
$ sudo visudo
```

When you open the file with visudo, you might encounter a section like this:

```
# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
```

This line consists of:

1.  User/Group: `%sudo` indicates that the policy applies to all users in the sudo group.
2.  Host: `ALL` specifies that the rule applies on any host.
3.  Run as user and group: `(ALL:ALL)` means that commands can be executed as any user and any group.
4.  Command list: The final `ALL` grants permission to execute any command.

The general syntax for an entry in the sudoers file is:

```
user_or_group   host=(run_as_user:run_as_group) command_list
```

### Example Policies

To define a policy that allows Trinity to run any sudo command as any user, add an entry like this:

```
trinity   ALL=(ALL)       ALL
```

If you prefer to grant permissions to a whole group (for example, the developers group), prepend the group name with a percent sign:

```
%developers ALL=(ALL)     ALL
```

These entries allow the specified user or all members of the developers group to execute any command using sudo.

It is also possible to restrict the commands that a user can execute. For instance, if you want Trinity to run only specific commands such as ls or stat, you can limit her permissions accordingly. Consider the following example:

```
$ sudo -u trinity ls /home/trinity
Desktop  Documents  Downloads  Music  Pictures
```

With a restricted sudoers entry, if Trinity attempts to execute an unauthorized command, she might receive an error message like:

```
$ sudo echo "Test passed?"
Sorry, user trinity is not allowed to execute '/bin/echo Test passed?' as root on kodekloud.
```

> [!important]
> **Note**
>
> By default, sudo commands run as root. To run a command as a different user, specify the desired user with the `-u` option.

For example, to run a command as Trinity herself:

```
$ sudo -u trinity ls /home/trinity
```

If the run-as field is set to `ALL`, the policy permits execution as any user. However, to restrict Trinity so she can only execute commands as specific users (for example, Aaron or John), list those names in the sudoers file.

Additionally, the first time a sudo command is executed in a session, it prompts for the current user’s password. The sudoers file also provides options to disable this password prompt for specific users if configured appropriately.

> [!important]
> **Warning**
>
> Always back up your sudoers file before making changes. Use the visudo utility to edit this file, ensuring that syntax errors do not lock you out of administrative privileges.

By carefully setting these policies, you can secure your system with fine-tuned administrative rights rather than granting universal sudo access.

For more detailed guidance on managing user privileges in Linux, consider exploring [Linux Administration Best Practices](https://www.linux.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/b36d272b-24e2-44e1-82cb-20a5cfa93635/lesson/1f6adaa6-ada5-47f3-add4-8c2c0861fa69)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/b36d272b-24e2-44e1-82cb-20a5cfa93635/lesson/b9cd8286-ad81-4652-99c2-34dc337a10d1)**
>
> Practice lab
