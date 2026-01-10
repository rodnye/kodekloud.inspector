# Change Kernel Runtime Parameters Persistent and Non Persistent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Change-Kernel-Runtime-Parameters-Persistent-and-Non-Persistent)

---

## Table of Contents

- Change Kernel Runtime Parameters Persistent and Non Persistent
  - Viewing Current Kernel Parameters
  - Adjusting a Specific Kernel Parameter (Non-Persistent)
  - Making Changes Persistent
  - Filtering Specific Parameters
  - Making vm.swappiness Persistent
  - Summary Table
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Change Kernel Runtime Parameters Persistent and Non Persistent

In this article, you will learn how to modify Linux kernel runtime parameters both temporarily (non-persistent) and permanently (persistent). Kernel runtime parameters control essential aspects of the Linux kernel, such as memory management, networking, and filesystem behavior.

## Viewing Current Kernel Parameters

Kernel parameters influence how the system operates. You can see all active settings using:

```
$ sysctl -a
fs.pipe-user-pages-hard = 0
fs.pipe-user-pages-soft = 16384
sysctl: permission denied on key 'fs.protected_fifos'
sysctl: permission denied on key 'fs.protected_hardlinks'
sysctl: permission denied on key 'fs.protected_regular'
```

If you encounter permission issues, run the command with root privileges:

```
$ sudo sysctl -a
net.ipv6.conf.default.addr_gen_mode = 0
net.ipv6.conf.default.autoconf = 1
net.ipv6.conf.default.dad_transmits = 1
net.ipv6.conf.default.disable_ipv6 = 0
net.ipv6.conf.default.disable_policy = 0
vm.admin_reserve_kbytes = 8192
```

Notice that naming conventions give clues about parameters’ purposes:

- Parameters beginning with `net.` relate to networking.
- Parameters starting with `vm.` pertain to virtual memory.
- Filesystem settings use the `fs.` prefix.

## Adjusting a Specific Kernel Parameter (Non-Persistent)

Let’s consider the parameter `net.ipv6.conf.default.disable_ipv6`. A value of 0 indicates that IPv6 is enabled. To disable IPv6 temporarily, change its value to 1:

```
$ sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6 = 1
```

You can verify the updated setting with:

```
$ sudo sysctl net.ipv6.conf.default.disable_ipv6
net.ipv6.conf.default.disable_ipv6 = 1
```

> [!important]
> **Note**
>
> Non-persistent changes will revert upon reboot, reverting to the default values.

To check a specific parameter without listing all parameters, append its name to the `sysctl` command. Use `sudo` if permissions are insufficient.

## Making Changes Persistent

Persistent adjustments require adding a configuration file in the `/etc/sysctl.d` directory. These files must have a `.conf` extension, ensuring that your custom settings are applied automatically at system boot.

![The image shows a directory path "/etc/sysctl.d/" with a configuration file named "Filename.conf" to make changes persistent.](https://kodekloud.com/kk-media/image/upload/v1752881327/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Change-Kernel-Runtime-Parameters-Persistent-and-Non-Persistent/etc-sysctl-d-filename-conf.jpg)

For more details, refer to the manual page:

```
$ man sysctl.d
```

Listing the directory contents with `ls /etc/sysctl.d` will also display sample configuration files that serve as formatting examples.

## Filtering Specific Parameters

To view only memory-related settings (prefixed with `vm.`), use the following command:

```
$ sysctl -a | grep vm
vm.panic_on_oom = 0
vm.percpu_pagelist_fraction = 0
vm.stat_interval = 1
vm.swappiness = 60
```

The parameter `vm.swappiness`, currently set to 60, controls swap behavior. A higher value increases swapping, while a lower value reduces swap usage.

## Making vm.swappiness Persistent

To permanently change `vm.swappiness` to 20, follow these steps:

1.  Create a configuration file in `/etc/sysctl.d`. For example, name it `swap-less.conf` to indicate reduced swapping:

    ```
    $ sudo vim /etc/sysctl.d/swap-less.conf
    ```

2.  Add the following line to set the swappiness value:

    ```
    vm.swappiness=20
    ```

3.  Save the file. Although the setting will be applied on boot, the current session continues using the old value until reloading the settings. To immediately apply your change, run:

    ```
    $ sudo sysctl -p /etc/sysctl.d/swap-less.conf
    ```

> [!important]
> **Note**
>
> Editing kernel parameters in `/etc/sysctl.conf` is an alternative, though this file may be overwritten during system upgrades. It is recommended to use `/etc/sysctl.d` for persistent customizations.

## Summary Table

| Configuration Scope | Change Method                     | Example Command                                                   |
| ------------------- | --------------------------------- | ----------------------------------------------------------------- |
| Non-Persistent      | Temporary setting change          | sudo sysctl -w net.ipv6.conf.default.disable\\\_ipv6=1            |
| Persistent          | Create conf file in /etc/sysctl.d | sudo vim /etc/sysctl.d/swap-less.conf <br> (add vm.swappiness=20) |

With these techniques, you can modify kernel runtime parameters for your Linux system effectively—using both non-persistent methods for immediate changes and persistent methods for settings that survive reboots. For further details on Linux kernel parameters, consider browsing related documentation provided by your Linux distribution or the official [Linux Kernel Documentation](https://www.kernel.org/doc/html/latest/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/42afda02-1c10-4a8c-9069-a54b3ee2c18b)**
>
> Watch video content
