# Change kernel runtime parameters persistent and non persistent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Security/Change-kernel-runtime-parameters-persistent-and-non-persistent)

---

## Table of Contents

- Change kernel runtime parameters persistent and non persistent
  - Viewing Current Kernel Parameters
  - Making Changes Persistent
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Security

# Change kernel runtime parameters persistent and non persistent

In this article, we explain how to adjust Linux kernel runtime parameters, covering both non-persistent and persistent changes. Kernel runtime parameters control how the Linux kernel manages core functions such as memory allocation, network traffic, and file system operations. Typically, these parameters follow a naming convention where networking parameters start with "net", memory settings with "vm", and file system configurations with "fs".

## Viewing Current Kernel Parameters

To view all active kernel runtime parameters, use the sysctl command with the -a flag. Note that not all parameters are accessible to a normal user; some lines might display "permission denied". Using sudo will grant root privileges to read all parameters.

Below are example outputs demonstrating the difference:

```
$ sysctl -a
fs.pipe-user-pages-hard = 0
fs.pipe-user-pages-soft = 16384
sysctl: permission denied on key 'fs.protected_fifos'
sysctl: permission denied on key 'fs.protected_hardlinks'
sysctl: permission denied on key 'fs.protected_regular'
```

```
$ sudo sysctl -a
net.ipv6.conf.default.addr_gen_mode = 0
net.ipv6.conf.default.autoconf = 1
net.ipv6.conf.default.dad_transmits = 1
net.ipv6.conf.default.disable_ipv6 = 0
net.ipv6.conf.default.disable_policy = 0
vm.admin_reserve_kbytes = 8192
```

For example, the parameter `net.ipv6.conf.default.disable_ipv6` controls the status of IPv6 within the network category. A value of 0 (false) means IPv6 is enabled, while 1 (true) disables IPv6. To change this parameter non-persistently—meaning the change lasts only until the next system reboot—use the command below. The `-w` flag is used to write a new value, and be sure not to include spaces before or after the equals sign.

```
$ sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6 = 1
```

> [!important]
> **Note**
>
> Non-persistent changes are effective immediately but will revert to their default settings after a reboot.

To verify a parameter's current value, execute sysctl followed by the exact parameter name. If you receive a "permission denied" message, prepend the command with sudo to run it as root.

## Making Changes Persistent

Persistent changes require modifying configuration files in the `/etc/sysctl.d/` directory. These files must have a `.conf` extension. Persistent settings ensure that your changes are maintained across reboots.

For example, consider the memory-related parameter `vm.swappiness`, which determines how aggressively the kernel uses disk swap space as an extension of physical memory. The parameter can take a value between 0 and 100: a higher value causes the kernel to use swap sooner, while a lower value delays swapping.

Begin by referencing the man page for the `sysctl.d` directory to confirm the file extension requirement:

```
$ man sysctl.d
SYNOPSIS
       /etc/sysctl.d/*.conf
```

Next, check the current value of memory-related parameters, including `vm.swappiness`:

```
$ sysctl -a | grep vm
vm.panic_on_oom = 0
vm.percpu_pagelist_fraction = 0
vm.stat_interval = 1
vm.swappiness = 30
```

Suppose you want to change `vm.swappiness` from 30 to 29. Create a new configuration file in the `/etc/sysctl.d` directory. In our example, we use the filename `swap-less.conf` to indicate that the setting will result in less frequent swapping.

```
$ sudo vim /etc/sysctl.d/swap-less.conf
```

Within the file, add the following line:

```
vm.swappiness = 29
```

Save and exit the editor. Although the change will be applied at the next boot, the current running kernel will still use the old value (30). To enforce the new setting immediately, reload the configuration using:

```
$ sudo sysctl -p /etc/sysctl.d/swap-less.conf
```

The output should confirm the updated value:

```
vm.swappiness=29
```

> [!important]
> **Persistent vs Non-Persistent**
>
> Remember, non-persistent changes made with sysctl -w will be lost after reboot, while persistent changes require adding a configuration file in `/etc/sysctl.d/` and can be activated immediately using sysctl -p.

## Further Reading

For more information on kernel parameters and system tuning, consider exploring the following resources:

- [Linux Kernel Parameters](https://www.kernel.org/doc/html/latest/admin-guide/sysctl/index.html)
- [System Tuning Guide](https://www.kernel.org/doc/html/latest/admin-guide/README.html)

That’s all for this article. Happy tuning, and see you in the next one!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5935b82f-37ac-4f4e-b619-0a6f8824088b/lesson/12152944-f390-4ee3-be6b-bb691ab3f202)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5935b82f-37ac-4f4e-b619-0a6f8824088b/lesson/c49856cf-5733-431a-a638-2a9943aba16d)**
>
> Practice lab
