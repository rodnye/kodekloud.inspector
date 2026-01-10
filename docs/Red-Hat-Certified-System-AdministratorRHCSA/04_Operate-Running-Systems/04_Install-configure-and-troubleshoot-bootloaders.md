# Install configure and troubleshoot bootloaders - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Operate-Running-Systems/Install-configure-and-troubleshoot-bootloaders)

---

## Table of Contents

- Install configure and troubleshoot bootloaders
  - Configuring GRUB Settings
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Operate Running Systems

# Install configure and troubleshoot bootloaders

Welcome to this lesson on installing, configuring, and troubleshooting the Linux bootloader. The bootloader is one of the first programs loaded during system startup, and its primary function is to load the Linux kernel—the core component of the operating system. In our examples, we will use GRUB (Grand Unified Bootloader), the most popular bootloader on Linux systems.

When the bootloader encounters issues and the system fails to boot, you can use installation media (such as a bootable USB stick, CD, or DVD created from a CentOS ISO file) to repair the system. Boot from the installation media, choose the Troubleshooting option, and then select “Rescue a CentOS Stream System” to begin the rescue process.

As the rescue image loads, you will see boot messages similar to the following:

```
[  OK  ] Stopped dracut mount hook.
[  OK  ] Stopped target Paths.
[  OK  ] Stopped dracut Wait for Complete Device Initialization.
[  OK  ] Stopped target Slices.
[  OK  ] Stopped target Local File Systems (Pre).
[  OK  ] Stopped target Timers.
[  OK  ] Stopped target Initrd Root Device.
[  OK  ] Stopped dracut pre-mount hook.
[  OK  ] Stopped target Local Encrypted Volumes.
[  OK  ] Stopped dracut initqueue hook.
[  OK  ] Stopping Open-iSCSI...
[  OK  ] Stopped udev Coldplug all Devices.
[  OK  ] Stopped dracut pre-trigger hook.
[  OK  ] Stopping udev Kernel Device Manager...
[  OK  ] Stopped target Sockets.
[  OK  ] Stopped Open-iSCSI.
[  OK  ] Started Setup Virtual Console.
[  OK  ] Stopping iSCSI UserSpace I/O driver...
[  OK  ] Closed Open-iSCSI iscsid Socket.
[  OK  ] Stopped iSCSI UserSpace I/O driver.
[  OK  ] Started Cleaning Up and Shutting Down Daemons.
[  OK  ] Closed Open-iSCSI iscsio Socket.
[  OK  ] Stopped udev Kernel Device Manager.
[  OK  ] Stopped dracut pre-udev hook.
[  OK  ] Stopped Create Static Device Nodes in /dev.
[  OK  ] Stopped Create list of required static device nodes for the current kernel.
[  OK  ] Stopping Hardware RNG Entropy Gatherer Daemon...
[  OK  ] Closed udev Control Socket.
[  OK  ] Closed udev Kernel Socket.
[  OK  ] Starting Cleaning up udev DB...
[  OK  ] Started Hardware RNG Entropy Gatherer Daemon.
[  OK  ] Started Plymouth switch root service.
[  OK  ] Reached target Switch Root.
Starting Switch Root...
```

After these messages, you will be presented with several options as the rescue environment attempts to locate your Linux installation and mount it under `/mnt/sysroot`. The available options include:

1.  Continue (mount read-write)
2.  Read-only mount
3.  Skip to shell
4.  Quit (Reboot)

For this demonstration, choose option 1 to allow the rescue environment to locate and mount your installed system.

> [!important]
> **Changing Root Directory**
>
> After mounting your system under `/mnt/sysroot`, change your root directory to this environment. Using the `chroot` command lets you operate as if you are working directly on your installed Linux system.

Once mounted, execute the following commands:

```
chroot /mnt/sysroot
sh-4.4# chroot /mnt/sysroot
bash-4.4# grub2-mkconfig -o /boot/efi
```

If your system uses EFI, the command above saves the GRUB configuration file in the EFI location. For BIOS-based systems, generate the configuration with:

```
chroot /mnt/sysroot
bash-4.4# grub2-mkconfig -o /boot/grub2/grub.cfg
```

After generating the GRUB configuration, the next step is to install GRUB onto the appropriate disk. For BIOS systems, GRUB must be installed to the first sectors of the boot disk. Start by identifying the disk with the `lsblk` command:

```
bash-4.4# lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0            7:0    0 680.2M  1 loop
loop1            7:1    0    3G  1 loop
live-rw      253:0    0    3G  0 dm
live-base    253:1    0    3G  1 dm
loop2            7:2    0    3G  1 loop
l-live-rw    253:3    0    3G  0 dm
sda            8:0    0    1G  8 part /boot
└─sda1         8:1    0    1G  0 part [SWAP]
└─sda3         8:3    0   17G  0 part /
sr0            11:0    1  180G  0 rom
```

From the output, notice that the boot partition is on `sda` (with `/boot` on one partition and the root file system `/` on another). Install GRUB on the first sector of `/dev/sda` using:

```
bash-4.4# grub2-install /dev/sda
Installing for i386-pc platform.
Installation finished. No error reported.
```

For EFI-based systems, the installation process differs because the bootloader is stored as a file on a specially designated boot partition. In those cases, use your package manager (such as dnf on CentOS) to reinstall GRUB or place EFI boot files in the correct location. This installation command is not applicable for BIOS systems.

After installing GRUB, exit the chroot environment and then the rescue shell to reboot your machine:

```
bash-4.4# exit
exit
sh-4.4# exit
```

Once your system reboots (without the live installation medium), verify GRUB's functionality by observing the boot menu. In this demonstration, the GRUB timeout is set to one second, so the menu appears briefly.

## Configuring GRUB Settings

The primary configuration file, located at `/etc/default/grub`, is used by the `grub-mkconfig` utility to generate the final GRUB configuration file (`grub.cfg`). Editing `/etc/default/grub` requires root privileges. For example, you can open the file with Vim:

```
[fixit@fixit ~]$ sudo vim /etc/default/grub
```

Inside this file, you will find various configuration options. A common adjustment is the GRUB timeout—the duration for which the boot menu is displayed. An example configuration might look like this:

```
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="crashkernel=auto resume=UUID=b0ae6939-b0c2-4a96-aae3-58f38aeb13e5 rhgb quiet"
GRUB_DISABLE_RECOVERY="true"
GRUB_ENABLE_BLSCFG=true
```

You can change the timeout to a shorter or longer duration depending on your needs, and modify the `GRUB_CMDLINE_LINUX` option to pass different kernel parameters.

After editing and saving the file (for Vim, press Esc, type `:wq`, and hit Enter), update the GRUB configuration by running:

```
[fixit@fixit ~]$ sudo grub2-mkconfig -o /boot/grub2/grub.cfg
Generating grub configuration file ...
done
```

For EFI systems, generate the configuration file in the EFI partition with:

```
[fixit@fixit ~]$ sudo grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg
```

Once the configuration file is regenerated, reboot your machine to observe the updated GRUB menu. With a timeout set to one second, the menu will only appear briefly during boot.

> [!important]
> **Final Steps**
>
> After confirming that your system boots correctly, you can fine-tune your GRUB settings further by editing `/etc/default/grub` and regenerating the configuration file as needed.

This concludes our demonstration on bootloader installation, configuration, and troubleshooting. Thank you for following along, and see you in the next article!

For further reading, check out [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/b8d0f7c7-7710-42e5-a184-787d78d41e6f/lesson/837a2e77-ffbf-4a90-abe9-88e70c06b3f0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/b8d0f7c7-7710-42e5-a184-787d78d41e6f/lesson/00ac5f6e-e06d-4983-962b-d17dd5b4be44)**
>
> Practice lab
