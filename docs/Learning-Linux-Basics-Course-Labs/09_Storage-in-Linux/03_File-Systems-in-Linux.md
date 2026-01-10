# File Systems in Linux - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Storage-in-Linux/File-Systems-in-Linux)

---

## Table of Contents

- File Systems in Linux
  - Comparing ext2, ext3, and ext4
  - Creating and Mounting an ext4 File System
  - Configuring Automatic Mounting at Boot
  - Hands-On Lab
  - Watch Video
  - Practice Lab
    - Verifying the Mounted File System

---

## Content

Learning Linux Basics Course & Labs

Storage in Linux

# File Systems in Linux

This article explains how to make a disk usable in Linux by creating file systems. After partitioning divides a disk into segments of usable space, the Linux kernel still treats these partitions as raw disk areas. To read and write data, you must create a file system that defines the storage structure and then mount that file system to a directory.

In this guide, we focus on the extended file system family: ext2, ext3, and ext4.

## Comparing ext2, ext3, and ext4

Both ext2 and ext3 file systems support a maximum file size of 2 TB and a maximum volume size of 4 TB. While they efficiently store data, ext2 may experience long boot times after an unclean shutdown (for example, due to a power outage). In contrast, ext3 adds journaling features that enable a faster system startup following such events. Ext4 further enhances these capabilities and is one of the most popular general-purpose file systems today—it supports files up to 16 TB and volumes as large as 1 exabyte. Additionally, ext4 (as well as ext3) offers backward compatibility: a file system created with ext4 can be mounted as ext3 or ext2, and an ext3 file system can be mounted as ext2.

![The image compares Linux filesystems EXT2, EXT3, and EXT4, highlighting file size, volume size, features like journaling, compression, and compatibility.](https://kodekloud.com/kk-media/image/upload/v1752881151/notes-assets/images/Learning-Linux-Basics-Course-Labs-File-Systems-in-Linux/frame_100.jpg)

## Creating and Mounting an ext4 File System

Follow these steps to create an ext4 file system on the device /dev/sdb1:

1.  Use the `mkfs.ext4` command to format the device.
2.  Create a mount point directory.
3.  Mount the file system.

```
[~]$ mkfs.ext4 /dev/sdb1
Allocating group tables: done
Writing inode tables: done
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done


[~]$ mkdir /mnt/ext4
[~]$ mount /dev/sdb1 /mnt/ext4
```

### Verifying the Mounted File System

You can confirm that the file system is mounted correctly by using the `mount` command combined with `grep`:

```
[~]$ mount | grep /dev/sdb1
/dev/sdb1 on /mnt/ext4 type ext4 (rw,relatime,data=ordered)
```

## Configuring Automatic Mounting at Boot

To automatically mount the file system during system boot, add an entry to the `/etc/fstab` file. This enables persistent mounting and ensures the file system is available after a reboot. For example:

```
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
/dev/sda1  /  ext4  defaults,relatime,errors=panic  0  1
```

> [!important]
> **Note**
>
> In the fstab entry:
>
> - The first field indicates the device or filesystem.
> - The second field specifies the directory where the file system is mounted.
> - The third field designates the type of file system, here ext4.
> - The fourth field lists mount options. A commonly used option is `rw`, which mounts the file system in read-write mode.
> - The fifth field (often set to zero) indicates whether a dump backup is scheduled.
> - The sixth field determines the order in which file systems are checked during boot-up; a `0` means the check is skipped, while `1` is typically reserved for the root filesystem.

## Hands-On Lab

Now it's your turn to experiment further with Linux file systems. Try creating, mounting, and configuring automatic mounting for an ext4 file system on your Linux environment to reinforce your learning.

Explore more Linux fundamentals with other guides and practical labs to deepen your understanding of modern file system management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/6888ecca-2804-4606-8127-a5f1b0f1d651)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/9b574ed0-5a82-4c32-abf6-b4fe00c9459f)**
>
> Practice lab
