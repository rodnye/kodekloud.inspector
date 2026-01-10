# Install configure and troubleshoot bootloaders - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Install-configure-and-troubleshoot-bootloaders)

---

## Table of Contents

- Install configure and troubleshoot bootloaders
  - 1. Boot into Rescue Mode
  - 2. Generate a New GRUB Configuration
  - 3. Install GRUB to the Disk
  - 4. Exit Rescue and Reboot
  - 5. Edit GRUB Defaults
  - 6. Regenerate and Apply the GRUB Configuration
  - 7. Final Reboot and Verification
  - References
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Install configure and troubleshoot bootloaders

When a Linux system powers on, the very first program it executes is the bootloader. Its primary role is to initialize hardware and load the Linux kernel—the core of your operating system. GRUB (Grand Unified Bootloader) is the most widely used bootloader in Linux environments. In this guide, we’ll walk through installing, configuring, and troubleshooting GRUB on CentOS Stream systems.

> [!important]
> **Prerequisites**
>
> - A CentOS installation ISO on USB, CD, or DVD
> - Familiarity with basic Linux commands and partitioning
> - Backup of important data before making bootloader changes

---

## 1\. Boot into Rescue Mode

1.  Insert your CentOS installation media and boot from it.
2.  At the menu, select **Troubleshooting**.
3.  Choose **Rescue a CentOS Stream System**.

Once the rescue image loads, you’ll see service stop messages:

```
[  OK  ] Stopped dracut mount hook.
[  OK  ] Stopped target Local File Systems (Pre).
...
[  OK  ] Reached target Switch Root.
Starting Switch Root...
```

When prompted, select option 1 to auto-detect and mount your system under `/mnt/sysroot`:

```
=======================================================================
Rescue

The rescue environment will now attempt to find your Linux installation and
mount it under the directory: /mnt/sysroot. You can then make any changes
required to your system.
  1) Continue
  2) Read-only mount
  3) Skip to shell
  4) Quit (Reboot)

Please make a selection from the above: 1
```

After mounting completes, switch into your installed system’s root:

```
sh-4.4# chroot /mnt/sysroot
bash-4.4#
```

---

## 2\. Generate a New GRUB Configuration

Inside the `chroot`, generate a fresh GRUB config file:

| System Type | Command                                           |
| ----------- | ------------------------------------------------- |
| BIOS-based  | `grub2-mkconfig -o /boot/grub2/grub.cfg`          |
| EFI-based   | `grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg` |

Example for BIOS:

```
bash-4.4# grub2-mkconfig -o /boot/grub2/grub.cfg
Generating grub configuration file ...
done
bash-4.4#
```

---

## 3\. Install GRUB to the Disk

First, identify your boot disk:

```
bash-4.4# lsblk
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda       8:0    0   20G  0 disk
├─sda1    8:1    0    2G  0 part /boot
├─sda2    8:2    0    2G  0 part [SWAP]
└─sda3    8:3    0   17G  0 part /
```

Install GRUB onto `/dev/sda` (or your boot disk):

```
bash-4.4# grub2-install /dev/sda
Installing for i386-pc platform.
Installation finished. No error reported.
bash-4.4#
```

> [!important]
> **EFI Installation**
>
> On EFI systems, reinstall the GRUB EFI packages instead of `grub2-install`:
>
> ```
> dnf reinstall grub2-efi shim
> ```

---

## 4\. Exit Rescue and Reboot

Leave the chroot and reboot into your system’s internal disk:

```
bash-4.4# exit
exit
sh-4.4# exit
Rebooting...
```

---

## 5\. Edit GRUB Defaults

After a successful reboot, open `/etc/default/grub` to adjust boot settings. For example, to set the GRUB menu timeout:

```
[fixit@localhost ~]$ sudo vim /etc/default/grub
```

Locate and edit:

```
GRUB_TIMEOUT=5
GRUB_CMDLINE_LINUX="crashkernel=auto resume=UUID=YOUR-UUID rhgb quiet"
```

Change the timeout value as needed (e.g., `GRUB_TIMEOUT=1`), then save and exit (`:wq`).

---

## 6\. Regenerate and Apply the GRUB Configuration

After editing defaults, regenerate the config:

| System Type | Command                                                |
| ----------- | ------------------------------------------------------ |
| BIOS-based  | `sudo grub2-mkconfig -o /boot/grub2/grub.cfg`          |
| EFI-based   | `sudo grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg` |

Example for BIOS:

```
[fixit@localhost ~]$ sudo grub2-mkconfig -o /boot/grub2/grub.cfg
Generating grub configuration file ...
done
```

---

## 7\. Final Reboot and Verification

Reboot one last time to confirm your changes:

```
[fixit@localhost ~]$ sudo reboot
```

Watch for your updated GRUB menu and timeout.

---

## References

- [CentOS Stream Documentation](https://docs.centos.org/)
- [GRUB Manual](https://www.gnu.org/software/grub/manual/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/a8f81b0f-268d-459e-875e-ccec76f81608)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/f52d11e4-97fb-4b2c-b313-70c911ff0e36)**
>
> Practice lab
