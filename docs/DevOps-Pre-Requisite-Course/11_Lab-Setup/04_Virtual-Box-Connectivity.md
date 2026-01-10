# Virtual Box Connectivity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Lab-Setup/Virtual-Box-Connectivity)

---

## Table of Contents

- Virtual Box Connectivity
  - Connecting to Your Virtual Machine
  - Enabling and Verifying Remote Access
  - Remote Access: Multiple Platforms
  - Conclusion
  - Watch Video
    - Normal Mode Explained
    - Headless Mode: A More Efficient Approach
    - Checking the VM's IP Address

---

## Content

DevOps Pre-Requisite Course

Lab Setup

# Virtual Box Connectivity

In this lesson, we explain how to connect to a virtual machine (VM) created using Oracle VirtualBox. Whether you are setting up a local lab environment or running multiple VMs for DevOps, cloud, or automation tasks, understanding how to establish connectivity with your VM is crucial. This guide will cover methods for both console and command line (CLI) access, explain the differences between normal and headless mode, and provide troubleshooting tips.

## Connecting to Your Virtual Machine

After installing Oracle VirtualBox on your host laptop (running macOS, Windows, or Linux) and creating a VM using a CentOS image, you have two primary options to start the VM:

1.  **Normal Mode** – Displays the VM console as if it were a physical machine.
2.  **Headless Mode** – Runs the VM without opening a console window, enabling remote access via SSH or remote desktop tools.

### Normal Mode Explained

When you start your VM in normal mode, you see the console on your screen. For instance, if the VM image includes a Linux graphical interface, you can interact with its GUI directly. The following log snippet illustrates a VM booting in normal mode:

```
46.4808991 [drm] Traces:
46.4808991 [drm] GHM2.
46.4818251 [drm] Screen Object. 2.
46.4818975 [drm] Max number of GHM pages is 1848576
46.4827753 [drm] Max dedicated hypervisor surface memory is 587984 kB
46.4827753 [drm] Maximum display memory size is 16304 kB
46.4827753 [drm] global init.
46.4942079 [drm] 2D kernel: Available graphics memory: 587984 kB
46.4944311 [drm] Initializing DRM pool allocator
46.4944570 [drm] DRM pool allocator
46.4949980 [drm] Manipulating blank timestamp caching Rev 2 (21.10.2013).
46.4950265 [drm] So drivers support for blank instancemy query.
46.4950265 [drm] Screen DBX Display Unit initialized
46.4951022 [drm] [drm] min 0x8a880088 min 0x8a880100 cap 0x8a880035
46.5016192 [drm] Fixes:
46.5016192 [drm] log: [UML] (fb) Error: Failed to send log
46.5016192 [drm] &fb: 2.1.20180322:0 on minor 0
```

While this mode is useful for initial exploration or testing, it can become cumbersome for advanced tasks. Switching between the host UI and VM console is slow, and file transfers between the two are not straightforward. Therefore, using CLI access via SSH is generally recommended for routine management.

Additionally, if you close the console window in normal mode, VirtualBox prompts you with options such as suspending the VM, sending a shutdown signal, or powering it off.

### Headless Mode: A More Efficient Approach

Headless mode starts your VM without a console window. This allows you to access it remotely using SSH (for Linux VMs like CentOS) or remote desktop tools (for Windows VMs). The image below demonstrates the Oracle VM VirtualBox Manager displaying options to save, shut down, or power off a VM named "my-centos":

![The image shows the Oracle VM VirtualBox Manager with a dialog box offering options to save, shut down, or power off a virtual machine named "my-centos."](https://kodekloud.com/kk-media/image/upload/v1752873477/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Connectivity/frame_150.jpg)

## Enabling and Verifying Remote Access

To treat your VM as a separate machine on a network, ensure the following:

- Each VM has a configured IP address.
- Essential services (e.g., the SSH server for Linux or Remote Desktop Service for Windows) are installed and running.

For a CentOS VM, first verify that the SSH server is active by running this command on the VM’s console:

```
guest> service sshd status
Redirecting to /bin/systemctl status sshd.service
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2020-03-22 11:57:47 UTC; 1 day 18h ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 2406 (sshd)
   CGroup: /system.slice/sshd.service
           └─2406 /usr/sbin/sshd -D -u0
```

### Checking the VM's IP Address

Before connecting via SSH, ensure that your VM is assigned a valid IP address. Use this command to list all network interfaces and their corresponding IP addresses:

```
guest> ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:8a:fe:e6 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.10/24 brd 192.168.1.255 scope global noprefixroute dynamic eth0
       valid_lft 86387sec preferred_lft 86387sec
```

In the example above, the loopback interface (lo) is assigned 127.0.0.1, and the primary network interface (eth0) holds the IP address 192.168.1.10. If no IP address is assigned to eth0, configure it accordingly based on your operating system.

> **Note: Starting SSH Service**
>
> If the SSH service is not already running, start it with:
>
> ```
> guest> service sshd start
> ```

Once the VM has a valid IP address and the SSH daemon is running, you can easily connect from your host system by running:

```
host> ssh 192.168.1.10
```

This initial configuration is usually done via the VM’s console. Once SSH is enabled, you can manage the VM entirely through terminal sessions on your host system.

## Remote Access: Multiple Platforms

The following image demonstrates a laptop running macOS hosting both CentOS and Windows virtual machines. These VMs can be accessed via Terminal (for CentOS), PuTTY (for Windows on non-macOS systems), and Remote Desktop:

![The image illustrates a laptop running macOS hosting CentOS and Windows virtual machines, accessed via Terminal, PuTTY, and Remote Desktop.](https://kodekloud.com/kk-media/image/upload/v1752873478/notes-assets/images/DevOps-Pre-Requisite-Course-Virtual-Box-Connectivity/frame_240.jpg)

## Conclusion

By following these guidelines, you can efficiently connect to and manage your VirtualBox VMs using either normal or headless mode. With SSH enabled and correctly configured IP addresses, remote management becomes streamlined and effective. In the next sections, we will delve deeper into networking concepts in VirtualBox and explore further configuration and troubleshooting techniques.

For more detailed information on networking setups, visit our [VirtualBox Documentation](https://www.virtualbox.org/manual/ch06.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/9c8f26c1-90d7-488f-a675-1b77e777c173/lesson/68f0c9bf-2b04-411c-9ae7-8bf6a694188b)**
>
> Watch video content
