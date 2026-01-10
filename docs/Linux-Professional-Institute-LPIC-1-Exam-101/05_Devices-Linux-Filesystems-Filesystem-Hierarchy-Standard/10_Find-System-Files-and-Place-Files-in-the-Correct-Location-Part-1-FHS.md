# Find System Files and Place Files in the Correct Location Part 1 FHS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Devices-Linux-Filesystems-Filesystem-Hierarchy-Standard/Find-System-Files-and-Place-Files-in-the-Correct-Location-Part-1-FHS)

---

## Table of Contents

- Find System Files and Place Files in the Correct Location Part 1 FHS
  - Introduction
  - Top-Level Directory Overview
  - Summary Tree
  - Further Reading
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Devices Linux Filesystems Filesystem Hierarchy Standard

# Find System Files and Place Files in the Correct Location Part 1 FHS

## Introduction

The Filesystem Hierarchy Standard (FHS) defines a common directory layout and its contents for Unix-like operating systems. Maintained by the [Linux Foundation](https://www.linuxfoundation.org/) and detailed in the [FHS 3.0 specification](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html), this standard ensures that users and administrators can predict where to find system files, binaries, and configuration data. While FHS compliance is not mandatory, most Linux distributions follow it closely.

> [!important]
> **Note**
>
> FHS compliance guarantees a consistent directory layout, simplifying system administration, backups, and package management.

## Top-Level Directory Overview

| Path       | Purpose                                             | Common Contents / Examples           |
| ---------- | --------------------------------------------------- | ------------------------------------ |
| `/`        | Root of the filesystem hierarchy                    | Everything lives under `/`           |
| `/bin`     | Essential command binaries available to all users   | `ls`, `cp`, `mv`                     |
| `/boot`    | Static files for the bootloader                     | Kernel images (`vmlinuz`), initrd    |
| `/dev`     | Device nodes for hardware & virtual devices         | `/dev/sda`, `/dev/null`              |
| `/etc`     | Host-specific configuration files                   | `fstab`, `hosts`, service configs    |
| `/home`    | User home directories                               | `/home/alice`, `/home/bob`           |
| `/lib`     | Shared libraries needed by `/bin` and `/sbin`       | `libc.so.6`, kernel modules          |
| `/media`   | Mount points for removable media (USB, CD/DVD)      | `/media/usb`, `/media/cdrom`         |
| `/mnt`     | Temporary mount points for administrators           | `/mnt/shared`                        |
| `/opt`     | Optional or third-party software packages           | `/opt/google`, `/opt/mysql`          |
| `/root`    | Superuser’s home directory                          | `/root/.bashrc`, `/root/.ssh/`       |
| `/run`     | Runtime data (PID files, sockets)                   | `/run/docker`, `/run/sshd.pid`       |
| `/sbin`    | System binaries for booting & maintenance           | `fsck`, `ip`, `iptables`             |
| `/srv`     | Data served by system services                      | `/srv/www/`, `/srv/ftp/`             |
| `/tmp`     | Temporary files cleared at reboot                   | `/tmp/session_12345`                 |
| `/usr`     | Secondary hierarchy for read-only user applications | `/usr/bin`, `/usr/lib`, `/usr/share` |
| `/proc`    | Virtual filesystem for process & kernel information | `/proc/cpuinfo`, `/proc/<pid>/`      |
| `/var`     | Variable data files (logs, spools, caches)          | `/var/log`, `/var/spool/mail`        |
| `/var/tmp` | Temporary files preserved between reboots           | `/var/tmp/install_cache`             |

![The image displays a list of directories from the Filesystem Hierarchy Standard, commonly used in Unix-like operating systems.](https://kodekloud.com/kk-media/image/upload/v1752881383/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Find-System-Files-and-Place-Files-in-the-Correct-Location-Part-1-FHS/filesystem-hierarchy-standard-directories-list.jpg)

## Summary Tree

```
/
├── bin
├── boot
├── dev
├── etc
├── home
├── lib
├── media
├── mnt
├── opt
├── root
├── run
├── sbin
├── srv
├── tmp
├── usr
├── proc
└── var
    └── tmp
```

## Further Reading

- [Filesystem Hierarchy Standard (FHS 3.0)](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
- [Linux Directory Structure Explained](https://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/)
- [The Linux Documentation Project](https://www.tldp.org/)

Ready to test your understanding? Proceed to the quiz section!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/de71b96a-9dc0-4e92-987a-6c7055c44e8b/lesson/7dcca80c-10d9-496d-8c44-31fd1c86f583)**
>
> Watch video content
