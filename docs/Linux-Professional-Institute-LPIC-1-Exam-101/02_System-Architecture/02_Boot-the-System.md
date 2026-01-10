# Boot the System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/System-Architecture/Boot-the-System)

---

## Table of Contents

- Boot the System
  - 1. BIOS and the Master Boot Record (MBR)
  - 2. UEFI (Unified Extensible Firmware Interface)
  - 3. GRUB: The Grand Unified Bootloader
  - 4. Kernel Initialization and initramfs
  - 5. Init Systems: SysV, systemd, and Upstart
  - Viewing and Analyzing Boot Messages
  - Links and References
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

System Architecture

# Boot the System

Understanding the Linux boot process is essential for troubleshooting and optimizing system startup. This guide walks through each stage—from firmware to the init system—detailing BIOS/UEFI, the GRUB bootloader, kernel initialization with initramfs, and the init process.

![The image is a flowchart illustrating the system boot process, showing the sequence from BIOS or UEFI to Bootloader, Kernel, and Init.](https://kodekloud.com/kk-media/image/upload/v1752881446/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/system-boot-process-flowchart.jpg)

## 1\. BIOS and the Master Boot Record (MBR)

The Basic Input/Output System (BIOS) resides on a motherboard chip and executes immediately after power-on. It performs:

1.  **Power-On Self-Test (POST):** Verifies basic hardware (CPU, memory, etc.).
2.  **Device Initialization:** Activates video, keyboard, and storage controllers.
3.  **MBR Read:** Loads the first 512 bytes—the Master Boot Record—from the configured disk.
4.  **Bootstrap Loader:** Executes the first-stage bootloader (440 bytes), reads the partition table, then transfers control to the second stage to load the bootloader and kernel.

> [!important]
> **Note**
>
> The MBR format supports disks up to 2 TiB and allows a maximum of four primary partitions. Consider GPT for larger disks.

![The image illustrates a comparison between two storage sections: one with 440 bytes for the first device bootstrap and another with 512 bytes for the MBR and DOS partition.](https://kodekloud.com/kk-media/image/upload/v1752881447/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/storage-comparison-bootstrap-mbr-dos.jpg)

![The image is a slide explaining the BIOS POST process, detailing its functions like identifying hardware failures, activating components, loading the bootstrap from the MBR, and loading the bootloader's second stage.](https://kodekloud.com/kk-media/image/upload/v1752881448/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/bios-post-process-explanation-slide.jpg)

## 2\. UEFI (Unified Extensible Firmware Interface)

UEFI modernizes BIOS by using non-volatile memory (NVRAM) to locate EFI applications on an EFI System Partition (ESP). Key aspects:

1.  **UEFI POST:** Hardware diagnostics similar to BIOS.
2.  **Component Activation:** Initializes video, input, and storage.
3.  **EFI Application:** Loads the bootloader or OS selector from `/EFI` on the ESP (FAT12/16/32 or ISO 9660).
4.  **Kernel Loading:** Transfers control to the bootloader, which loads the Linux kernel.

UEFI’s Secure Boot verifies digital signatures, preventing unauthorized kernels and bootloaders.

> [!important]
> **Warning**
>
> Disabling Secure Boot is often required when installing unsigned or custom kernels. Ensure you understand the security implications.

![The image is a diagram related to UEFI, showing components like NVRAM, EFI applications, FAT filesystems or ISO-9660, and the EFI System Partition (ESP).](https://kodekloud.com/kk-media/image/upload/v1752881449/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/uefi-diagram-nvram-efi-applications.jpg)

![The image is a slide describing the functions of UEFI, including identifying hardware failures, activating components, executing EFI applications, loading the kernel, and supporting Secure Boot.](https://kodekloud.com/kk-media/image/upload/v1752881450/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/uefi-functions-hardware-failures-secure-boot.jpg)

## 3\. GRUB: The Grand Unified Bootloader

GRUB is the most common x86 bootloader for BIOS and UEFI systems. Press **Shift** (BIOS) or **Esc** (UEFI) to access the menu if it doesn’t appear.

![The image is an informational graphic about the Grand Unified Bootloader (GRUB), showing key combinations for BIOS (SHIFT) and UEFI (ESC) booting.](https://kodekloud.com/kk-media/image/upload/v1752881451/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/grub-bootloader-bios-uefi-graphic.jpg)

From GRUB, you can select kernels and pass parameters in `option=value` format:

| Parameter                        | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `acpi=off`                       | Disable ACPI support                                 |
| `init=/bin/bash`                 | Boot directly to a Bash shell                        |
| `systemd.unit=multi-user.target` | Set the systemd target (e.g., multi-user, graphical) |
| `mem=512M`                       | Limit maximum RAM available                          |
| `maxcpus=2`                      | Restrict CPU cores                                   |
| `quiet`                          | Suppress most boot messages                          |
| `vga=ask`                        | Prompt for video mode                                |
| `root=/dev/sda3`                 | Specify root filesystem partition                    |
| `rootflags=ro` or `rootflags=rw` | Mount root filesystem read-only or read-write        |

![The image is a list of bootloader commands and their descriptions, including examples for setting system parameters like ACPI, system initialization, RAM, processors, and root filesystem options.](https://kodekloud.com/kk-media/image/upload/v1752881452/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/bootloader-commands-system-parameters-list.jpg)

We’ll cover permanent GRUB configuration in a later lesson.

## 4\. Kernel Initialization and initramfs

After GRUB loads the kernel:

1.  **Kernel Startup:** Initializes CPU, memory management, and drivers.
2.  **initramfs Mount:** Unpacks the initial RAM filesystem, which includes essential modules and tools.
3.  **Real Root Mount:** Switches to the actual root partition defined in `/etc/fstab`.
4.  **Exec Init:** The kernel runs:

```
exec /sbin/init
```

This launches the init system and frees the initramfs from memory.

![The image is a slide explaining the Linux boot process, detailing how the kernel is loaded into RAM, mounts filesystems, and loads the init program.](https://kodekloud.com/kk-media/image/upload/v1752881453/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/linux-boot-process-kernel-init-slide.jpg)

## 5\. Init Systems: SysV, systemd, and Upstart

Linux distributions may use different init managers:

| Init System | Type            | Key Features                                                                    |
| ----------- | --------------- | ------------------------------------------------------------------------------- |
| SysV init   | Runlevel-based  | Sequential startup with scripts, runlevels 0–6                                  |
| systemd     | Service manager | Parallel startup, socket/D-Bus activation, cgroups, dependency-based units      |
| Upstart     | Event-driven    | Responds to system events for parallel service startup (legacy Ubuntu releases) |

![The image is a comparison of three init systems: SysV standard, systemd, and Upstart, describing their functions and usage.](https://kodekloud.com/kk-media/image/upload/v1752881454/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Boot-the-System/init-systems-comparison-sysv-systemd-upstart.jpg)

## Viewing and Analyzing Boot Messages

The kernel logs boot messages in a ring buffer. To inspect them:

```
dmesg | less
```

On systems with systemd, use `journalctl`:

- List recorded boots:

  ```
  journalctl --list-boots
  ```

- View the current boot log (`boot 0`):

  ```
  journalctl -b 0
  ```

To read logs from a different directory:

```
journalctl -D /var/log/other_directory
```

## Links and References

- [Linux Kernel Newbies – Boot Process](https://kernelnewbies.org/BootProcess)
- [GNU GRUB Manual](https://www.gnu.org/software/grub/manual/)
- [systemd Documentation](https://www.freedesktop.org/wiki/Software/systemd/)
- [BIOS Basics on Wikipedia](https://en.wikipedia.org/wiki/BIOS)
- [Unified Extensible Firmware Interface Forum](https://uefi.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/55c2d118-3a85-4da1-8a7f-e9f8671cc818/lesson/f59861cb-06f6-4c38-8d5f-f19970b20ea2)**
>
> Watch video content
