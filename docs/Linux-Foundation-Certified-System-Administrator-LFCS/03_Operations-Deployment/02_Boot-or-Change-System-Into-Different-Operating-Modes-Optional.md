# Boot or Change System Into Different Operating Modes Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Boot-or-Change-System-Into-Different-Operating-Modes-Optional)

---

## Table of Contents

- Boot or Change System Into Different Operating Modes Optional
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Boot or Change System Into Different Operating Modes Optional

In this article, we explore how Linux leverages systemd targets to control the boot process and how you can modify the default boot target to suit different system environments. By understanding systemd targets, you gain flexibility in managing resource usage and operational modes.

Currently, the Linux system boots to a graphical login screen. At startup, the operating system loads various programs and services in a specific order using instructions defined in systemd target files. To see which boot target is active by default, run:

```
systemctl get-default
```

If the output is "graphical.target," it means the system is configured to boot into a full graphical environment. The corresponding graphical.target file contains the necessary instructions to start services and programs required for a graphical login.

Booting into the graphical target requires additional system resources due to the loading of the graphical user interface. If you do not need the graphical environment, you can change the default boot target to a more resource-efficient option, such as the multi-user target. This target provides essential services—like daemons and network services—running in a text-based mode. To switch the default boot target, execute:

```
sudo systemctl set-default multi-user.target
```

> [!important]
> **Note**
>
> Changing the default boot target means that on the next reboot, the system will operate in text mode rather than launching a graphical interface.

Below is an example session showing how to check and change the default boot target:

```
# Check the current default target
jeremy@kodekloud:~$ systemctl get-default
graphical.target

# Set the default target to multi-user
jeremy@kodekloud:~$ sudo systemctl set-default multi-user.target
[sudo] password for jeremy:
Removed "/etc/systemd/system/default.target".
Created symlink /etc/systemd/system/default.target → /lib/systemd/system/multi-user.target.
jeremy@kodekloud:~$
```

The multi-user target is named so because it supports simultaneous logins by multiple users, while still keeping network services active to ensure continuous connectivity.

After changing the default target, reboot the system. Instead of the usual graphical login screen, you will encounter a text-based login console, similar to the following:

```
Ubuntu 23.10 kodekloud tty1
kodekloud: jeremy
Password:
Welcome to Ubuntu 23.10 (GNU/Linux 6.5.0-27-generic x86_64)
 * Documentation: https://help.ubuntu.com
 * Management: https://landscape.canonical.com
 * Support: https://ubuntu.com/advantage

68 updates can be applied immediately.
To see these additional updates run: apt list --upgradeable

The list of available updates is more than a week old.
To check for new updates, run: sudo apt update
Last login: Tue May 28 12:25:21 PDT 2024 on tty1
jeremy@kodekloud:~$
```

If you temporarily need a graphical interface—perhaps to work with a 3D modeling application—you don't have to permanently switch the boot target. Instead, you can start the graphical environment immediately using:

```
sudo systemctl isolate graphical.target
```

This command activates the graphical interface on demand without altering the system's default text-based boot mode.

Additional systemd targets include emergency.target and rescue.target. The table below summarizes the most commonly used targets and their purposes:

| Target            | Description                                               | Use Case                                                  | Command Example                              |
| ----------------- | --------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------- |
| graphical.target  | Boots into a full graphical desktop environment           | Standard desktop usage                                    | systemctl get-default                        |
| multi-user.target | Boots into a text-based environment with network services | Server or low-resource environments                       | sudo systemctl set-default multi-user.target |
| emergency.target  | Boots with minimal system services; root FS is read-only  | Critical troubleshooting when other services cause issues | (Invoked automatically when selected)        |
| rescue.target     | Loads essential services with a root shell access         | Administrative tasks in a minimal environment             | (Invoked automatically when selected)        |

> [!important]
> **Warning**
>
> When booting into emergency.target or rescue.target, ensure that the root account has a password set. Without a root password, these modes will not be accessible.

This concludes the demonstration on changing systemd targets and boot modes. For further details on system management and troubleshooting, be sure to refer to the official [systemd documentation](https://www.freedesktop.org/wiki/Software/systemd/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/99c33a5f-0308-4bf8-925b-9436fc8c0c7c)**
>
> Watch video content
