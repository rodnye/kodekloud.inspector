# Linux Boot Sequence - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Linux-Core-Concepts/Linux-Boot-Sequence)

---

## Table of Contents

- Linux Boot Sequence
  - 1. BIOS POST
  - 2. Boot Loader
  - 3. Kernel Initialization
  - 4. Service Initialization
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Linux Core Concepts

# Linux Boot Sequence

In this guide, we provide a detailed yet simplified overview of the Linux boot process. The boot process consists of four key stages:

1.  BIOS POST
2.  Boot Loader (GRUB2)
3.  Kernel Initialization
4.  Service Initialization

> [!important]
> **Important Note**
>
> The Linux boot process can be initiated in one of two ways:
>
> - Starting a Linux device that is currently halted.
> - Rebooting or resetting a running system.

## 1\. BIOS POST

The initial stage is the BIOS POST (Power-On Self-Test). During this phase, the BIOS performs thorough hardware checks to confirm that all components are functioning correctly. Since this stage is driven by the BIOS, it is largely independent of Linux. A failure during POST will prevent the system from moving to the subsequent stages.

## 2\. Boot Loader

Following a successful POST, the BIOS loads and executes the boot code from the designated boot device. Typically, this boot code is found in the first sector of the hard disk, and for Linux systems, within the `/boot` filesystem.

At this point, the boot loader displays a boot screen that may offer multiple options. For example, in a dual-boot scenario, you might choose between Microsoft Windows and Ubuntu 18.04. After selecting an option, the boot loader proceeds to load the Linux kernel into memory, passes the required parameters, and transfers control to the kernel.

A widely used boot loader is GRUB2 (Grand Unified Boot Loader Version 2), which has become the standard for most Linux distributions.

## 3\. Kernel Initialization

Once the Linux kernel is loaded, it is typically stored in a compressed format, which is then decompressed and loaded into memory during this stage. The kernel then begins execution and performs several critical tasks, including hardware initialization and memory management. This process is essential for setting up the environment before user-space initialization.

Below is a sample of typical kernel log output during initialization:

```
[0.554274]  Magic number: 0:465:215
[0.557297]  event_source software: hash matches
[0.557891]  rtc_cmos rtc_cmos: setting system clock to 2020-04-09 (1586412850)
[0.559123]  BIOS EDD facility v0.16 2004-Jun-25, 0 devices found
[0.559571]  EDD information not available.
[0.697097]  Freeing unused kernel image memory: 2432K
[0.7094611] Write protecting the kernel read-only data: 20480k
[0.7094611] Freeing unused kernel image memory: 2008K
[0.7094611] Freeing unused kernel image memory: 1880K
[0.711046] 86/mm: Checked W+X mappings: passed, no W+X pages
[1.000000] Intel(R) PRO/1000 Network Driver - version 7.3.20
[1.000000] Copyright (c) 1999-2006 Intel Corporation.
[1.000000] Copyright (c) 1999-2008 LSI Corporation
[1.000000] Fusion MPT SPI Host driver 3.04.20
[1.000000] UX2 version of gcm_enc/dec engaged.
[1.000000] ES CTR mode by8 optimization enabled.
[1.000000] Init: ImExPS/2 Generic Explorer Mouse as /devices/platform/put4
[1.000000] 1000 0000:03:00.0 eth0: (PCI:33MHz:32-bit) 02:12:4b:00:00:00
[1.000000] 1000 0000:03:00.0 eth0: Intel(R) PRO/1000 Network Co
[1.000000] ptbase: ioc0: Initiating bringup
```

Once the kernel is fully operational, it searches for an INIT process to start the user space and the essential system processes.

## 4\. Service Initialization

Modern Linux distributions typically use SYSTEMD as the INIT process, which is responsible for transitioning the system into a fully operational state. SYSTEMD takes charge of mounting file systems and managing system services. It has largely replaced the older SYSV-INIT (or SYS5), which was prevalent in older distributions such as RHEL6 and CentOS 6.

One of the major benefits of SYSTEMD is its ability to parallelize the startup of services, significantly reducing the boot time.

To verify which INIT system is in use, execute the following command to inspect the symbolic link for `/sbin/init`:

```
[~]$ ls -l /sbin/init
lrwxrwxrwx /sbin/init -> /lib/systemd/systemd
```

Below is an additional snippet of boot log output. This excerpt highlights further details during initialization, including filesystem mounting and the activation of system services:

```
[5.574670] EXT4-fs (sda1): mounted filesystem with ordered data mode
[5.720090] ip_tables: (C) 2000-2006 Netfilter Core Team
[5.730460] systemd[1]: systemd 237 running in system mode. (+PAM +AUDIT +SELINUX +IMA +APPARMOR +SMACK +SYSVINIT +UTMP +LIBWRAP +FSTEST +GCRYPT +GNUTLS +ACL +XZ +LZ4 +SECCOMP +BLKID +ELFUTILS +KMOD +IDN =PCRE default-hierarchy=hybrid)
[5.732961] systemd[1]: Detected virtualization oracle.
[5.733871] systemd[1]: Detected architecture x86-64.
[5.748912] systemd[1]: Set hostname to <kubemaster>.
```

Once SYSTEMD ensures that all necessary services are running, the boot sequence is complete, and the system is ready for user interaction.

This concludes our detailed overview of the Linux boot process.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/19296611-5fb9-4e5d-a926-d157d3f3c3db/lesson/0a14f33e-f3ac-4cbc-98a3-2f3fb17c4b70)**
>
> Watch video content
