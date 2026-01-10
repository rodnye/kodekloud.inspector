# Restrict Kernel Modules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Restrict-Kernel-Modules)

---

## Table of Contents

- Restrict Kernel Modules
  - Loading and Listing Kernel Modules
  - Blacklisting Kernel Modules
  - Watch Video
    - Example: Blacklisting the SCTP Module
    - Blacklisting Multiple Modules

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Restrict Kernel Modules

In this guide, you'll learn how to restrict the use of specific Linux kernel modules to improve the security of your system. The Linux kernel follows a modular design, making it easy to extend its capabilities dynamically. For example, when new hardware is connected, the kernel automatically or manually loads the necessary module—using tools such as modprobe or insmod—to enable device support (e.g., video card drivers).

## Loading and Listing Kernel Modules

Kernel modules are loaded as required, either manually by a system administrator or automatically by the kernel. For instance, to load the PC Speaker module manually, execute the following command as the root user:

```
modprobe pcspkr
```

After loading modules, you can list all active modules using:

```
lsmod
```

A typical output from the `lsmod` command might resemble:

```
# lsmod
Module                  Size  Used by
floppy                 69417  0
xt_conntrack           16384  1
ipt_MASQUERADE         16384  1
nf_nat_masquerade_ipv4 16384  1 ipt_MASQUERADE
nf_conntrack_netlink   40960  0
nfnetlink              16384  2 nf_conntrack_netlink
xfrm_user              32768  1
xfrm_algo              16384  1 xfrm_user
xt_addrtype            16384  2
iptable_filter         16384  1
iptable_nat            16384  1
nf_conntrack_ipv4      16384  3
nf_defrag_ipv4         16384  1 nf_conntrack_ipv4
nf_nat_ipv4            16384  1 iptable_nat
```

> [!important]
> **Note**
>
> Be aware that an unprivileged process running inside a pod may cause some network protocol-related modules to load automatically—for example, by creating a network socket.

Due to this behavior, attackers might exploit the automatic module loading. Restricting these modules proactively enhances your system's security posture.

## Blacklisting Kernel Modules

To prevent potential security risks, you can blacklist kernel modules so that they are not loaded by the system—even if triggered by certain operations like network socket creation.

### Example: Blacklisting the SCTP Module

The SCTP module is seldom used in Kubernetes clusters and is a common example to blacklist. Follow these steps to disable its loading:

1.  Create or edit a configuration file under `/etc/modprobe.d/` (e.g., `/etc/modprobe.d/blacklist.conf`).
2.  Add the following entry to the file:

    ```
    cat /etc/modprobe.d/blacklist.conf
    blacklist sctp
    ```

You can use any file name ending with a `.conf` extension as long as it is located in the `/etc/modprobe.d/` directory.

### Blacklisting Multiple Modules

To also prevent the loading of the dccp module (Datagram Congestion Control Protocol), append its entry into the same file. Once done, reboot your system and confirm that the module is no longer active:

```
cat /etc/modprobe.d/blacklist.conf
blacklist sctp
blacklist dccp
shutdown -r now
lsmod | grep dccp
```

> [!important]
> **Warning**
>
> After updating the configuration file, reboot your system to ensure changes take effect. Failure to do so might leave the module active, potentially exposing your system to security risks.

For further details on kernel module security and additional best practices, refer to section 3.4 in the [CIS Benchmarks for Kubernetes](https://www.cisecurity.org/benchmark/kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/2af4c922-95be-4292-a78d-eccce18e5359)**
>
> Watch video content
