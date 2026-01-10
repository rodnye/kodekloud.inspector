# Create and manage RAID devices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Configure-Local-Storage/Create-and-manage-RAID-devices)

---

## Table of Contents

- Create and manage RAID devices
  - RAID Levels Overview
  - Working with RAID on Linux
  - Watch Video
    - RAID Level 0 (Striped Array)
    - RAID Level 1 (Mirrored Array)
    - RAID Level 5
    - RAID Level 6
    - RAID Level 10 (RAID 1+0)
    - Removing Existing LVM Storage
    - Creating a RAID 0 Array
    - Stopping a RAID Array
    - Creating a RAID 1 Array with a Spare Disk
    - Expanding a RAID 1 Array

---

## Content

Red Hat Certified System Administrator(RHCSA)

Configure Local Storage

# Create and manage RAID devices

In this article, we explore how to create and manage RAID (Redundant Array of Independent Disks) devices in Linux. RAID allows you to combine multiple storage devices into one logical storage unit to either boost capacity or improve data redundancy.

Imagine you have a 1.5-terabyte database file and only two 1-terabyte disks available—individually, these disks cannot hold the file. By combining them into a RAID array, you create a single 2-terabyte storage area that can accommodate the file. This example demonstrates a RAID 0 (striped) configuration.

![The image illustrates a RAID 0 configuration with two 1TB disks, showing a total space of 2TB for storing a 1.5TB file.](https://kodekloud.com/kk-media/image/upload/v1752883543/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Create-and-manage-RAID-devices/raid-0-configuration-2tb-disks.jpg)

## RAID Levels Overview

Below are the most commonly used RAID levels along with their characteristics and use cases.

### RAID Level 0 (Striped Array)

RAID 0 groups multiple disks together to form one large storage pool. The total usable space is the sum of all disks in the array. For instance, two 1-terabyte disks provide 2 terabytes of capacity, while ten disks offer 10 terabytes.

> [!important]
> **Warning**
>
> RAID 0 does not provide any redundancy. If any single disk fails, all data in the array is lost.

### RAID Level 1 (Mirrored Array)

RAID 1 involves duplicating the same data across all disks in the array. For example, in an array with three disks, the same file is stored on each disk. This mirroring ensures that data remains accessible even if one or two disks fail.

![The image illustrates a Level 1 RAID (Redundant Array of Independent Disks) setup, showing data from an "X File" being mirrored across three disks labeled A, B, and C.](https://kodekloud.com/kk-media/image/upload/v1752883544/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Create-and-manage-RAID-devices/level-1-raid-mirroring-diagram.jpg)

### RAID Level 5

RAID 5 requires a minimum of three disks and achieves redundancy by distributing parity data across all disks. For example, in a three-disk setup with each disk at 1 terabyte, one disk’s capacity is dedicated to parity—leaving 2 terabytes of usable space. In a ten-disk configuration, you would have nine terabytes available.

![The image illustrates a Level 5 RAID (Redundant Array of Independent Disks) setup, showing data distribution across three disks labeled A, B, and C.](https://kodekloud.com/kk-media/image/upload/v1752883545/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Create-and-manage-RAID-devices/level-5-raid-data-distribution.jpg)

An advantage of RAID 5 is its ability to tolerate the failure of one disk without compromising data integrity. The distributed parity information allows the system to reconstruct lost data should a disk fail.

![The image shows a diagram of a RAID (Redundant Array of Independent Disks) setup with nine 1TB disks, totaling 9TB of space. One disk is highlighted, indicating an issue or difference.](https://kodekloud.com/kk-media/image/upload/v1752883546/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Create-and-manage-RAID-devices/raid-setup-nine-1tb-disks-diagram.jpg)

### RAID Level 6

RAID 6 builds on RAID 5 by adding an extra parity block, which means two disks can fail simultaneously without data loss. This level requires a minimum of four disks and is suitable for environments where higher fault tolerance is needed.

### RAID Level 10 (RAID 1+0)

RAID 10 combines the performance benefits of RAID 0 and the redundancy of RAID 1. This setup first mirrors data in pairs (RAID 1) and then stripes across those mirrored pairs (RAID 0). For example, by creating two mirrored pairs with 1-terabyte disks, you achieve 2 terabytes of usable space along with improved protection against disk failure.

![The image illustrates a RAID 10 configuration, combining Level 1 and Level 0 RAID, using four 1TB disks to achieve a total of 2TB of storage space.](https://kodekloud.com/kk-media/image/upload/v1752883548/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Create-and-manage-RAID-devices/raid-10-configuration-4-disks.jpg)

## Working with RAID on Linux

Before initiating RAID configurations, you may need to remove any existing LVM storage. This involves deleting volume groups and clearing physical volumes used by the logical volume manager.

To manage RAID devices on Linux, the utility mdadm (Multiple Devices Administration) is used.

### Removing Existing LVM Storage

The following commands force removal of an LVM volume group and then clear the physical volumes:

```
$ sudo vgremove --force my_volume
$ sudo pvremove /dev/vdc /dev/vdd /dev/vde
```

### Creating a RAID 0 Array

The next example demonstrates creating a RAID 0 array using three disks. In this configuration, /dev/md0 represents the new RAID block device, which you can then format with a file system.

```
$ sudo mdadm --create /dev/md0 --level=0 --raid-devices=3 /dev/vdc /dev/vdd /dev/vde
$ sudo mkfs.ext4 /dev/md0
```

If additional arrays are configured later, they will be assigned names such as /dev/md1, /dev/md2, and so on.

### Stopping a RAID Array

To stop an active RAID array, use the stop directive with mdadm:

```
$ sudo mdadm --stop /dev/md0
```

During boot, Linux scans device superblocks and may automatically reassemble arrays, potentially assigning names like /dev/md127. To prevent this behavior, clear the superblock data from the devices:

```
$ sudo mdadm --zero-superblock /dev/vdc /dev/vdd /dev/vde
```

### Creating a RAID 1 Array with a Spare Disk

RAID 1 mirrors data across disks, ensuring redundancy. However, if one disk fails and the remaining disk subsequently fails, data can still be at risk. To address this vulnerability, you can configure a spare disk that automatically replaces a failing drive in the array.

For example, if /dev/vdc and /dev/vdd form a RAID 1 array and /dev/vde is designated as a spare, follow these commands:

```
$ sudo mdadm --zero-superblock /dev/vdc /dev/vdd /dev/vde
$ sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/vdc /dev/vdd --spare-devices=1 /dev/vde
```

After testing, if you need to stop the array and remove the superblock information:

```
$ sudo mdadm --stop /dev/md0
$ sudo mdadm --zero-superblock /dev/vdc /dev/vdd /dev/vde
```

### Expanding a RAID 1 Array

If you initially create a RAID 1 array with two disks and later decide to add another disk for additional redundancy, mdadm allows you to add a disk using the add directive. To monitor the status of your RAID arrays, check the contents of /proc/mdstat:

```
$ cat /proc/mdstat
Personalities : [raid0] [raid1]
md0 : active raid1 vde[2](S) vdd[1] vdc[0]
        5237760 blocks super 1.2 [2/2] [UU]
unused devices: <none>
```

This output details the RAID device name (md0), the active RAID type, and the status of the disks in the array. You can also remove a device from an array, if necessary, using the remove directive.

> [!important]
> **Note**
>
> For additional guidance on managing and expanding your RAID configurations, refer to the [mdadm manual](https://manpages.debian.org/testing/mdadm/mdadm.8.en.html) and Linux system documentation.

That concludes our deep dive into creating and managing RAID devices in Linux. In the next article, we will explore more advanced RAID configurations and further optimization techniques for your storage solutions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/207496ef-0e82-42c8-aa9d-7996cfb968a6/lesson/40884c92-d36c-41a8-9987-974c6045cb79)**
>
> Watch video content
