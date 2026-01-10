# Manage and Configure Virtual Machines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Manage-and-Configure-Virtual-Machines)

---

## Table of Contents

- Manage and Configure Virtual Machines
  - Getting Started
  - Creating a Virtual Machine Configuration
  - Managing Virtual Machines with virsh
  - Modifying VM Resources
  - Conclusion
  - Watch Video
    - Starting and Managing VM States
    - Enabling Autostart
    - Changing vCPU Count
    - Changing Memory Allocation
      - Shutting Down and Destroying VMs

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Manage and Configure Virtual Machines

In modern software, virtualization allows you to create a virtual computer—or virtual machine (VM)—within your actual computer. This capability is particularly valuable in server environments because it lets a single physical machine serve multiple clients simultaneously.

For instance, imagine a powerful server equipped with 64 CPU cores and 1024 GB of RAM. By creating 32 virtual machines, each VM can be allocated 2 virtual CPUs (vCPUs) and 32 GB of RAM. Rather than renting out one enormous server to a single client, you can offer 32 smaller virtual servers. This is the foundation of cloud compute services provided by [DigitalOcean](https://www.digitalocean.com/), [Amazon Web Services](https://aws.amazon.com/), and [Google Cloud](https://cloud.google.com/).

![The image illustrates a comparison of server resources, showing 32 virtual machines with 2 virtual CPUs and 32 GB RAM each, totaling 64 CPU cores and 1024 GB RAM, alongside logos of cloud service providers Digital Ocean, AWS, and Google Cloud.](https://kodekloud.com/kk-media/image/upload/v1752881349/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Manage-and-Configure-Virtual-Machines/server-resources-comparison-vms.jpg)

Among many available tools for virtualization on Linux, QEMU-KVM has become the most popular. QEMU (Quick Emulator) emulates virtual computers, while KVM (Kernel-based Virtual Machine) integrates into the Linux kernel to leverage hardware acceleration for enhanced performance.

In this guide, we focus on using a command-line tool called virsh (or VIRSH) to manage virtual machines. If you’ve used VirtualBox before, you might recall its graphical interface for VM creation, configuration, and management. Virsh, however, uses terminal commands to achieve similar tasks, making it a powerful choice for administrators.

![The image shows a diagram with the Linux logo, labeled "Linux (QEMU-KVM)," and arrows pointing to "Quick Emulator" and "Kernel-based Virtual Machine."](https://kodekloud.com/kk-media/image/upload/v1752881350/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Manage-and-Configure-Virtual-Machines/linux-qemu-kvm-diagram.jpg)

## Getting Started

To quickly begin, install the virt-manager package. Although virt-manager is designed for systems with a GUI, installing it will bring in many useful dependencies for headless or text-based environments.

Run the following command:

```
sudo apt install virt-manager
```

When installing virt-manager, your package manager will fetch several dependency packages. The output may look similar to this:

```
Get:95 http://us.archive.ubuntu.com/ubuntu noble/universe amd64 gir1.2-gtksource-4 amd64
Get:96 http://us.archive.ubuntu.com/ubuntu noble/universe amd64 spice-client-glib-usb-acl
Get:97 http://us.archive.ubuntu.com/ubuntu noble/main amd64 libpcsclite1 amd64 2.0.3-1build1
Get:98 http://us.archive.ubuntu.com/ubuntu noble/main amd64 libcaca0 amd64 1:2.8.0-3build1
Get:99 http://us.archive.ubuntu.com/ubuntu noble/main amd64 liborc-0.4-0t6 amd64 1:0.4.3-1
Get:100 http://us.archive.ubuntu.com/ubuntu noble/main amd64 libgstreamer-plugins-base1.0
Get:101 http://us.archive.ubuntu.com/ubuntu noble/universe amd64 libphodav-3.0-common
Get:102 http://us.archive.ubuntu.com/ubuntu noble/main amd64 libproxy1v5 amd64 0.5.4-4build1
Get:103 http://us.archive.ubuntu.com/ubuntu noble/main amd64 glib-networking-common
Get:104 http://us.archive.ubuntu.com/ubuntu noble/main amd64 glib-networking-services
Get:105 http://us.archive.ubuntu.com/ubuntu noble/main amd64 glib-networking amd64 2.80.0
Get:106 http://us.archive.ubuntu.com/ubuntu noble/main amd64 libsoup-3.0-common
Get:107 http://us.archive.ubuntu.com/ubuntu noble/main amd64 libsoup-3.0-0
18% [107 libsoup-3.0-0 194 B/289 kB 0%]
```

Even though you may not use the virt-manager graphical interface, its installation provides several utilities essential for virtual machine management.

Below is a snippet of further installation output:

```
Get:251 http://us.archive.ubuntu.com/ubuntu noble/main amd64 ovmf all 2024.02-2 [4,571 kB]
Fetched 130 MB in 10s (13.2 MB/s)
Extracting templates from packages: 100%
Selecting previously unselected package acl.
(Read database ... 83,334 files and directories currently installed.)
Preparing to unpack .../000-acl_2.3.2-1build1_amd64.deb ...
Unpacking acl (2.3.2-1build1) ...
Selecting previously unselected package libgdk-pixbuf2.0-common.
Preparing to unpack .../001-libgdk-pixbuf2.0-common_2.42.10+dfsg-3ubuntu3_all.deb ...
Unpacking libgdk-pixbuf2.0-common (2.42.10+dfsg-3ubuntu3) ...
Selecting previously unselected package libgdk-pixbuf-2.0-0:amd64.
Preparing to unpack .../002-libgdk-pixbuf-2.0-0_2.42.10+dfsg-3ubuntu3_amd64.deb ...
Unpacking libgdk-pixbuf-2.0-0:amd64 (2.42.10+dfsg-3ubuntu3) ...
Selecting previously unselected package gtk-update-icon-cache.
Preparing to unpack .../003-gtk-update-icon-cache_3.24.41-4ubuntu1_amd64.deb ...
Unpacking gtk-update-icon-cache (3.24.41-4ubuntu1) ...
Selecting previously unselected package hicolor-icon-theme.
Preparing to unpack .../004-hicolor-icon-theme_0.17-2_all.deb ...
Unpacking hicolor-icon-theme (0.17-2) ...
Selecting previously unselected package humanity-icon-theme.
Preparing to unpack .../005-humanity-icon-theme_0.6.16_all.deb ...
Unpacking humanity-icon-theme (0.6.16) ...
```

## Creating a Virtual Machine Configuration

Let's proceed with creating a configuration file for a virtual machine. Begin by creating a directory to store your VM definitions and then create an XML file using your preferred text editor:

```
jeremy@kodekloud:~$ mkdir machines
jeremy@kodekloud:~$ cd machines/
jeremy@kodekloud:~/machines$ vim testmachine.xml
```

The XML file below defines a virtual machine named "TestMachine" running under QEMU. It allocates 1 GiB of RAM, 1 vCPU, and uses a 64-bit (x86_64) architecture with hardware-assisted virtualization (HVM):

```
<domain type="qemu">
  <name>TestMachine</name>
  <memory unit="GiB">1</memory>
  <vcpu>1</vcpu>
  <os>
    <type arch="x86_64">hvm</type>
  </os>
</domain>
```

In a production setting, a complete VM configuration will include additional parameters such as storage, network interfaces, and the operating system. For demonstration purposes, this basic setup is sufficient.

Define the virtual machine using the following command:

```
virsh define testmachine.xml
```

You should see an output similar to:

```
jeremy@kodekloud:~/machines$ virsh define testmachine.xml
Domain 'TestMachine' defined from testmachine.xml
jeremy@kodekloud:~/machines$
```

## Managing Virtual Machines with virsh

The virsh tool has an extensive help page. To display it, use:

```
virsh help
```

By default, only active domains are listed. To view all defined domains (including inactive ones), run:

```
virsh list --all
```

You should see "TestMachine" listed, albeit with the state "shut off".

### Starting and Managing VM States

To start your virtual machine, execute:

```
virsh start TestMachine
```

If your VM name includes spaces, enclose it in double quotes. Once started, verify its state with:

```
virsh list
```

To reboot the virtual machine gracefully – allowing software applications to exit properly – run:

```
virsh reboot TestMachine
```

If the machine becomes unresponsive, you can force a reset, which is analogous to pressing a hardware reset button:

```
jeremy@kodekloud:~/machines$ virsh list
 Id    Name         State
--------------------------------
 1     TestMachine  running


jeremy@kodekloud:~/machines$ virsh reset TestMachine
Domain 'TestMachine' was reset
jeremy@kodekloud:~/machines$
```

#### Shutting Down and Destroying VMs

To shut down the virtual machine gracefully (if the guest OS is present and active), use:

```
virsh shutdown TestMachine
```

For instance:

```
jeremy@kodekloud:~/machines$ virsh shutdown TestMachine
Domain 'TestMachine' is being shutdown
```

Since this test VM may not have an operating system installed, the shutdown command might not work as expected. However, in real scenarios, it allows applications to close properly.

If the VM is unresponsive, you can force a hard power off (equivalent to unplugging the machine) as follows:

```
virsh destroy TestMachine
```

Sample workflow:

```
jeremy@kodekloud:~/machines$ virsh list
 Id    Name             State
----------------------------------
 1     TestMachine      running


jeremy@kodekloud:~/machines$ virsh reset TestMachine
Domain 'TestMachine' was reset


jeremy@kodekloud:~/machines$ virsh shutdown TestMachine
Domain 'TestMachine' is being shutdown


jeremy@kodekloud:~/machines$ virsh list
 Id    Name             State
----------------------------------
 1     TestMachine      running


jeremy@kodekloud:~/machines$ virsh destroy TestMachine
Domain 'TestMachine' destroyed


jeremy@kodekloud:~/machines$
```

> [!important]
> **Note**
>
> The `destroy` command only powers off the VM abruptly—it does not remove the VM's definition. To completely remove the VM, you must undefine it.

To remove the VM's configuration, execute:

```
virsh undefine TestMachine
```

If you also want to remove any associated storage files, use:

```
virsh undefine --remove-all-storage TestMachine
```

After undefining, verify removal with:

```
virsh list --all
```

If needed, you can recreate the VM by redefining the XML file:

```
jeremy@kodekloud:~/machines$ virsh define testmachine.xml
Domain 'TestMachine' defined from testmachine.xml
jeremy@kodekloud:~/machines$
```

### Enabling Autostart

To ensure that your virtual machine automatically starts when the host system boots, enable autostart:

```
virsh autostart TestMachine
```

Conversely, disable autostart with:

```
virsh autostart --disable TestMachine
```

## Modifying VM Resources

To inspect the resources assigned to a VM, use:

```
virsh dominfo TestMachine
```

### Changing vCPU Count

Suppose you wish to increase the number of vCPUs from one to two. First, check the current allocation:

```
virsh dominfo TestMachine
```

Use the `setvcpus` command to change the configuration. You can see command options by viewing:

```
virsh help setvcpus
```

![The image shows a list of command-line options or functions, likely related to virtualization or system management, displayed in a terminal interface. The command "setvcpus" is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752881352/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Manage-and-Configure-Virtual-Machines/command-line-options-setvcpus-terminal.jpg)

The help output shows the syntax and options:

```
NAME
   setvcpus - change number of virtual CPUs


SYNOPSIS
   setvcpus <domain> <count> [--maximum] [--config] [--live] [--current] [--guest] [--hotpluggable]


DESCRIPTION
   Change the number of virtual CPUs in the guest domain.


OPTIONS
   [--domain] <string>    domain name, id or uuid
   [--count] <number>     number of virtual CPUs
   --maximum              set maximum limit on next boot
   --config               affect next boot
   --live                 affect running domain
   --current              affect current domain
   --guest                modify cpu state in the guest
   --hotpluggable         make added vcpus hot(un)pluggable
```

To permanently change the vCPU count (affecting the next boot), run:

```
jeremy@kodekloud:~/machines$ virsh setvcpus TestMachine 2 --config
```

If you encounter an error indicating that the requested vCPUs exceed the current maximum (e.g., "2 > 1"), update the maximum allowed vCPUs with:

```
jeremy@kodekloud:~/machines$ virsh setvcpus TestMachine 2 --config --maximum
```

Remember that modifying the vCPU count does not change a running VM. You must destroy (power off) the VM first:

```
virsh destroy TestMachine
```

Then, start it again:

```
virsh start TestMachine
```

Verify the changes with:

```
virsh dominfo TestMachine
```

### Changing Memory Allocation

To adjust memory allocation, first set the maximum allowed memory and then modify the allocation. For example, to change the memory to 2048 MB, run:

```
virsh setmem TestMachine 2048M --config
```

Then, shut down the machine gracefully (or force shutdown if necessary) and restart it:

```
jeremy@kodekloud:~/machines$ virsh shutdown TestMachine
Domain 'TestMachine' is being shutdown
jeremy@kodekloud:~/machines$ virsh destroy TestMachine
Domain 'TestMachine' destroyed
jeremy@kodekloud:~/machines$ virsh start TestMachine
Domain 'TestMachine' started
```

Finally, confirm the configuration update:

```
virsh dominfo TestMachine
```

A typical output might be:

```
Id:             3
Name:           TestMachine
UUID:           a10f764d-f147-4878-97d0-d89e7918f34
OS Type:        hvm
State:          running
CPU(s):         2
CPU time:       1.1s
Max memory:     2097152 KiB
Used memory:    2097152 KiB
Persistent:     yes
Autostart:      enable
Managed save:   no
Security model: none
Security DOI:   0
```

This confirms that your resource modifications have taken effect.

## Conclusion

This guide walked you through creating and managing virtual machines using virsh. By following these steps, you can leverage virtualization to efficiently allocate server resources and adapt configurations to meet your specific needs.

For further details, consider exploring additional [Kubernetes Documentation](https://kubernetes.io/docs/) or the [Terraform Registry](https://registry.terraform.io/) for advanced deployment scenarios.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/3d7e96d4-d592-4a3a-ac94-9953888e8193)**
>
> Watch video content
