# Boot or change system into different operating modes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Operate-Running-Systems/Boot-or-change-system-into-different-operating-modes)

---

## Table of Contents

- Boot or change system into different operating modes
  - Checking the Default Boot Target
  - Changing the Default Boot Target
  - Booting into the Multi-User Target
  - Switching Targets Without Rebooting
  - Overview of System Targets
  - Special Modes for Troubleshooting
  - Restoring the Graphical Boot Target
  - Watch Video
    - Emergency Target
    - Rescue Target

---

## Content

Red Hat Certified System Administrator(RHCSA)

Operate Running Systems

# Boot or change system into different operating modes

Welcome to this comprehensive guide on booting your Linux system into various operating modes using systemd. In this article, you'll learn how to check the current default boot target, change it between graphical and multi-user (text-based) modes, and even switch targets without rebooting. This guide also covers specialized modes for troubleshooting, such as the emergency and rescue targets.

## Checking the Default Boot Target

The default boot target determines which services and environments are loaded during system startup. To see the current default boot target, run the following command:

```
systemctl get-default
```

For example, the output might be:

```
graphical.target
```

This output indicates that your system is configured to boot into a graphical environment, which includes a graphical login prompt and desktop services.

## Changing the Default Boot Target

Running a graphical session typically consumes more system resources. If you prefer a lighter, text-based mode (multi-user target) for regular operations, you can change the default boot target. The multi-user target loads essential services without initializing the graphical desktop, making it ideal for servers and environments where resource optimization is key.

To change the default boot target to multi-user, execute:

```
[aaron@LFCS-CentOS ~]$ systemctl get-default
graphical.target
[aaron@LFCS-CentOS ~]$ sudo systemctl set-default multi-user.target
[sudo] password for aaron:
```

After running this command, systemd removes the old default target and creates a symlink that points to the multi-user target. A typical output looks like:

```
[aaron@LFCS-CentOS ~]$ systemctl get-default
[aaron@LFCS-CentOS ~]$ sudo systemctl set-default multi-user.target
[sudo] password for aaron:
Removed /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target → /usr/lib/systemd/system/multi-user.target.
[aaron@LFCS-CentOS ~]$
```

> [!important]
> **Note**
>
> In multi-user mode, you boot into a text-based interface where network services remain active, and multiple users can log in simultaneously.

## Booting into the Multi-User Target

After setting multi-user as the default, a system reboot will present you with a text-based login prompt instead of a graphical interface. Log in with your username and password to access the command-line environment.

An example session might look like:

```
Activate the web console with: systemctl enable --now cockpit.socket


LFCS-CentOS login: aaron
Password:
Last login: Wed Mar 16 15:20:02 on tty2
[aaron@LFCS-CentOS ~]$
```

## Switching Targets Without Rebooting

Sometimes, you may need to temporarily switch the operating mode without rebooting your system. This can be useful if you require access to a graphical application while normally operating in multi-user mode. You can achieve this by using the systemd `isolate` directive.

For instance, to temporarily switch from the multi-user target to the graphical target, run:

```
[aaron@LFCS-CentOS ~]$ sudo systemctl isolate graphical.target
[sudo] password for aaron:
```

This command immediately transitions your system to the graphical login screen. Remember, this change is temporary; a reboot will revert your system to the default boot target (multi-user mode).

## Overview of System Targets

Below is a table summarizing the available systemd targets discussed in this guide:

| Boot Target       | Description                                                                                                | Command Example                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| graphical.target  | Boots the system with a graphical login and desktop environment.                                           | `sudo systemctl set-default graphical.target`  |
| multi-user.target | Boots the system in a text-based manner with essential services enabled.                                   | `sudo systemctl set-default multi-user.target` |
| emergency.target  | Boots the system with minimal services and mounts the root filesystem as read-only for debugging purposes. | `sudo systemctl isolate emergency.target`      |
| rescue.target     | Boots the system with few additional services, providing a root shell for maintenance tasks.               | `sudo systemctl isolate rescue.target`         |

## Special Modes for Troubleshooting

For system maintenance and troubleshooting, systemd offers specialized targets.

### Emergency Target

The emergency target boots the system with minimal services and mounts the root filesystem as read-only. This mode is particularly useful when system instability prevents normal booting or when troubleshooting critical issues.

To activate the emergency target:

```
sudo systemctl isolate emergency.target
```

### Rescue Target

The rescue target starts the system with a slightly broader service set and provides you with a root shell. Use this mode to perform system repairs, create backups, or adjust configurations.

To activate the rescue target:

```
sudo systemctl isolate rescue.target
```

> [!important]
> **Warning**
>
> Ensure that a root password is set before using the emergency or rescue targets; without a root password, you won't be able to log in as root.

## Restoring the Graphical Boot Target

If you decide to revert to a graphical boot interface, you can change the default target back to graphical mode with the following command:

```
$ sudo systemctl set-default graphical.target
[sudo] password for aaron:
Removed /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target → /usr/lib/systemd/system/graphical.target.
```

**Note:** If you encounter an error such as "sudo: systemctl: command not found," verify your system's PATH settings or confirm that the systemd utilities are installed.

---

This guide has detailed the process of booting your Linux system into different operating modes with systemd. Continue to enhance your Linux administration skills and tailor the boot configurations to your system requirements through further practice and exploration.

For more information on systemd and Linux boot processes, consider exploring additional resources:

- [Systemd Documentation](https://www.freedesktop.org/wiki/Software/systemd/)
- [Linux Administration Guides](https://www.linux.com/learn/linux-administration/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/b8d0f7c7-7710-42e5-a184-787d78d41e6f/lesson/d8f4e292-d04d-4fe4-931b-72d5b672b731)**
>
> Watch video content
