# Disk Partitions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Storage-in-Linux/Disk-Partitions)

---

## Table of Contents

- Disk Partitions
  - Block Devices
  - Disk Partitions
  - Partitioning Schemes
  - Creating a New Partition with GPT
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Learning Linux Basics Course & Labs

Storage in Linux

# Disk Partitions

In this lesson, we explore disk partitions, file systems (including the EXT series and NFS), external storage devices (DAS, NAS, and SAN), and the Logical Volume Manager (LVM) in action. Each section is enhanced with hands-on labs to reinforce your learning.

![The image outlines "Storage Basics," covering topics like disk partitions, Linux filesystems, external storage devices, logical volume manager, and related labs.](https://kodekloud.com/kk-media/image/upload/v1752881146/notes-assets/images/Learning-Linux-Basics-Course-Labs-Disk-Partitions/frame_20.jpg)

## Block Devices

Before diving into partitions, it's essential to understand some basic storage concepts. A block device is typically represented as a file in the `/dev` directory and denotes a hardware component used for data storage. Devices such as traditional spinning hard disks and solid-state disks (SSD) are common examples. Data on these devices is accessed in fixed-size blocks.

You can list the block devices on your system using the `lsblk` command. Additionally, using `ls -l` in the `/dev` directory and filtering for lines starting with "b" helps you identify block files.

```
$ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0 119.2G 0 disk
├─sda1   8:1    0   100M 0 part /boot/efi
├─sda2   8:2    0  72.5G 0 part /media/MM/Data
└─sda3   8:3    0  46.6G 0 part /


$ ls -l /dev/ | grep "^b"
brw-rw----  1 root disk  8,  0 Mar 19 17:43 sda
brw-rw----  1 root disk  8,  1 Mar 19 17:42 sda1
```

In the above `lsblk` output, the device `sda` represents the entire disk (approximately 119GB), while `sda1` through `sda3` indicate the individual partitions.

Each block device is assigned a major and minor number:

- The **major number** (8 in this case) identifies the type of block device (commonly associated with SCSI devices, hence the "sd" prefix).
- The **minor numbers** differentiate among individual physical or logical devices, such as the whole disk and its partitions.

## Disk Partitions

Disk partitions allow you to subdivide an entire disk into smaller segments. In our example, the SSD disk is divided into three partitions:

```
$ lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda           8:0    0 119.2G  0 disk
├─sda1        8:1    0  100M  0 part /boot/efi
├─sda2        8:2    0  72.5G  0 part /media/MM/Data
└─sda3        8:3    0  46.6G  0 part /
```

- `sda3` is used as the root partition.
- `sda2` (72.5GB) is mounted at `/media/MM/Data` and is typically used for storing backup data.
- `sda1` is mounted at `/boot/efi` to store boot loader files needed during system startup.

It is possible to use a disk without partitioning; however, partitioning is generally recommended because it offers improved flexibility and organization. The partition table, which holds the partition details, can be viewed using tools like `lsblk` or `fdisk`.

```
$ lsblk
NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda  8:0    0 119.2G 0 disk
├─sda1 8:1    0 100M  0 part /boot/efi
├─sda2 8:2    0 72.5G 0 part /media/MM/Data
└─sda3 8:3    0 46.6G 0 part /
```

Another useful command is `fdisk`, which not only lists the partition table but also allows you to create or delete partitions. Running `fdisk -l /dev/sda` provides detailed information such as partition type, disk size in bytes, and sector details.

```
$ sudo fdisk -l /dev/sda
Disk /dev/sda: 119.2 GiB, 1280355676160 bytes, 250069680 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 7CABF26E-9723-4406-ZEA1-C2B9B6270A23


Device        Start       End   Sectors Size Type
/dev/sda1     2048    206847   204800 100M EFI System
/dev/sda2   239616  150194175 149954560 71.5G Linux filesystem
/dev/sda3   150194176 247955455 97761280 46.6G Linux filesystem
```

> [!important]
> **Note**
>
> The disk label type in this example is GPT (GUID Partition Table), which offers improvements over the older MBR (Master Boot Record) scheme such as support for larger disk sizes and more partitions.

## Partitioning Schemes

There are three primary types of disk partitions:

- **Primary Partition:** Used for booting an operating system. Traditionally, disks could have a maximum of four primary partitions.
- **Extended Partition:** Acts as a container for logical partitions; it cannot be used directly.
- **Logical Partition:** Created within an extended partition to bypass the four primary partition limitation.

![The image illustrates partition types on physical disks: primary, extended, and logical partitions, with diagrams showing their arrangement.](https://kodekloud.com/kk-media/image/upload/v1752881148/notes-assets/images/Learning-Linux-Basics-Course-Labs-Disk-Partitions/frame_310.jpg)

A partitioning scheme, or partition table, defines how these partitions are organized on a disk. The older MBR partitioning scheme permits only four primary partitions and limits disk sizes to 2TB (unless using an extended partition). In contrast, GPT (GUID Partition Table) supports an almost unlimited number of partitions—often limited only by the operating system, such as RHEL’s limit of 128 partitions per disk—and eliminates the 2TB disk size restriction.

![The image illustrates an MBR partition scheme on a 2TB physical disk, showing primary and extended partitions with local partitions.](https://kodekloud.com/kk-media/image/upload/v1752881149/notes-assets/images/Learning-Linux-Basics-Course-Labs-Disk-Partitions/frame_370.jpg)

![The image compares GPT and MBR partition schemes, highlighting GPT's unlimited partitions and no size limit, versus MBR's 2TB limit and extended partitions.](https://kodekloud.com/kk-media/image/upload/v1752881150/notes-assets/images/Learning-Linux-Basics-Course-Labs-Disk-Partitions/frame_400.jpg)

> [!important]
> **Tip**
>
> Unless your operating system requires MBR, GPT is generally the preferred choice due to its enhanced capacity and flexibility.

## Creating a New Partition with GPT

For practical experience, Mohan grants Bob access to a lab machine. Bob’s system contains two disks: one (SDA) with existing partitions and another (SDB) that is unpartitioned. Running `lsblk` clearly indicates the unpartitioned state of SDB:

```
$ lsblk
fd0      2:0    1    4K     0 disk
sr0     11:0    1  1024M     0 rom
sda      8:0    0  97.7G     0 disk
|-sda1   8:1    0  93.7G     0 part /
|-sda2   8:2    0    1K     0 part
|-sda5   8:5    0  3.9G     0 part
sdb      8:15   0   20G     0 disk
```

Since SDB is unpartitioned, Mohan instructs Bob to create a new partition using the `gdisk` command—an improved alternative to `fdisk` that supports GPT.

```
$ lsblk
fd0      2:0    1  4K   0 disk
sr0     11:0    1 1024M 0 rom
sda      8:0   0 97.7G 0 disk
|-sda1   8:1   0 93.7G 0 part /
|-sda2   8:2   0   1K 0 part
|-sda5   8:5   0  3.9G 0 part
sdb      8:15  0 20G   0 disk


$ gdisk /dev/sdb
GPT fdisk (gdisk) version 1.0.1


Partition table scan:
MBR: protective
BSD: not present
APM: not present
GPT: present


Found valid GPT with protective MBR; using GPT.
Command (? for help):
```

Within the `gdisk` interface, type `?` to view all available commands. To add a new partition, press `n` and follow the interactive prompts:

```
Command (? for help): ?
b   back up GPT data to a file
c   change a partition's name
d   delete a partition
i   show detailed information on a partition
l   list known partition types
n   add a new partition
o   create a new empty GUID partition table (GPT)
p   print the partition table
q   quit without saving changes
r   recovery and transformation options (experts only)
s   sort partitions
t   change a partition's type code
v   verify disk
w   write table to disk and exit
x   extra functionality (experts only)
?   print this menu


Command (? for help): n
Partition number (1-128, default 1): 1
First sector (34-419430006, default = 2048) or {+-}size{KMGT}: 2048
Information: Moved requested sector from 34 to 2048 in order to align on 2048-sector boundaries.
Use 'l' on the experts' menu to adjust alignment
Last sector (2048-419430006, default = 419430006)
Current type is 'Linux filesystem'
Hex code or GUID (L to show codes, Enter = 8300):
Changed type of partition to 'Linux filesystem'
Command (? for help):
```

After providing the partition details and confirming with the default hex code (8300 for Linux filesystem), finalize the changes by writing the new partition table to disk. Press `W` at the prompt:

```
Command (? for help): W
Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING PARTITIONS!!


Do you want to proceed? (Y/N): Y
OK; writing new GUID partition table (GPT) to /dev/sdb.
The operation has completed successfully.
```

The new partition (`/dev/sdb1`) is now available. Verify the partition creation using `lsblk` or `fdisk -l`.

## Conclusion

This article covered the fundamentals of block devices, disk partitions, partitioning schemes (MBR and GPT), and demonstrated how to create a new partition using `gdisk`. For more detailed exercises and troubleshooting—such as addressing why Bob's system might not display the full physical disk size—please consult the hands-on labs.

For additional resources, consider exploring the following:

- [Linux File System Basics](https://www.linux.com/learn)
- [Disk Management Best Practices](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-filesystems)
- [GPT vs MBR Comparison](https://www.howtogeek.com/435132/what-is-the-difference-between-mbr-and-gpt/)

Happy partitioning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/17ce7de4-9cf1-4054-b0cf-95f2fa658ccb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/fa701bb1-7921-4a14-980c-a16c132fb72f)**
>
> Practice lab
