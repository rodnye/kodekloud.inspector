# Create and Configure File Systems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Storage/Create-and-Configure-File-Systems)

---

## Table of Contents

- Create and Configure File Systems
  - Creating an XFS File System
  - XFS Administrative Utilities
  - Creating and Configuring an ext4 File System
  - Managing ext4 File System Properties
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Storage

# Create and Configure File Systems

In this lesson, you will learn how to create and configure file systems on a storage partition. By default, Red Hat operating systems use the XFS file system while Ubuntu typically uses ext4. Keep in mind that these default choices may evolve with newer OS releases.

---

## Creating an XFS File System

To format a partition with the XFS file system, run the following command. In this example, `/dev/sdb1` is the target partition:

```
sudo mkfs.xfs /dev/sdb1
```

The `mkfs` command stands for "make file system." If you prefer an ext4 file system instead, simply change the suffix as shown below:

```
sudo mkfs.ext4 /dev/sdb1
```

Most file systems are created with default settings that cater to standard use cases. However, you may need to adjust specific parameters—like setting a custom label or modifying the inode size—using additional command-line options. For a complete list of available options, consult the manual page:

```
man mkfs.xfs
```

The manual displays options specific to XFS. For example, the `-L` option lets you assign a label to your file system. Consider these examples:

```
mkfs.xfs /dev/sda1
mkfs.xfs -l logdev=/dev/sdb1,size=100m /dev/sda1
```

If you search within the manual by typing the forward slash and then `-L`, you'll notice that the label must not exceed 12 characters. To set the label "BackupVolume" on `/dev/sdb1`, execute:

```
sudo mkfs.xfs -L "BackupVolume" /dev/sdb1
```

Before making any changes, verify your devices by listing available file systems. Below is a sample output from using `fdisk`:

```
jeremy@kodekloud:~$ man mkfs.xfs
jeremy@kodekloud:~$ sudo fdisk -l
[sudo] password for jeremy:


Disk /dev/sda: 4 GiB, 48318382080 bytes, 94371840 sectors
Disk model: VBOX HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: F2775F4C-AE12-41CE-B808-027E4304B615


Device         Start      End  Sectors  Size Type
/dev/sda1      2048      4095    2048   1M BIOS boot
/dev/sda2      4096   4198399  419304   2G Linux filesystem
/dev/sda3   4198400 94367921 90171392  43G Linux filesystem


Disk /dev/sdb: 10 GiB, 10737418240 bytes, 20971520 sectors
Disk model: VBOX HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: B0255EEB-AB12-4FAC-B630-B71E5276B03D


Device         Start      End  Sectors  Size Type
/dev/sdb1      2048   8390655  8388608   4G Linux filesystem
/dev/sdb2   8390656 16777215  8388608   4G Linux filesystem
/dev/sdb3  16777216 20971519  4194304   2G Linux swap
```

To modify additional settings, such as setting a custom inode size of 512 bytes, use the `-i` option:

```
sudo mkfs.xfs -i size=512 /dev/sdb1
```

If an existing file system is detected, the utility will display a warning similar to:

```
mkfs.xfs: /dev/sdb1 appears to contain an existing filesystem (xfs).
mkfs.xfs: Use the -f option to force overwrite.
```

> [!important]
> **Warning**
>
> Ensure you have the correct partition selected before using the `-f` option, as it will force an overwrite of any existing file system.

To force a format that includes a 512-byte inode size and a custom label, combine the options as follows:

```
sudo mkfs.xfs -f -i size=512 -L "BackupVolume" /dev/sdb1
```

Upon successful execution, you will see output that details parameters such as inode size, allocation groups, block size, and related metadata.

---

## XFS Administrative Utilities

XFS comes with a suite of administrative utilities. By typing `xfs` and pressing the Tab key, you can view available XFS-related commands. One of the most useful utilities is `xfs_admin`, which enables you to modify file system properties. For example, to display the current label for `/dev/sdb1`, run:

```
sudo xfs_admin -l /dev/sdb1
```

To change the label to "FirstFS" (note the uppercase `-L`), execute:

```
sudo xfs_admin -L "FirstFS" /dev/sdb1
```

---

## Creating and Configuring an ext4 File System

Ubuntu and similar distributions often utilize the ext4 file system by default. To view configuration options for ext4, refer to the manual page of `mkfs.ext4`, which internally calls the `mke2fs` program:

```
man mkfs.ext4
```

The manual details various options for setting block size, inode count, file system label, and more. To create an ext4 file system with default settings on `/dev/sdb2`, use the command:

```
sudo mkfs.ext4 /dev/sdb2
```

The output might resemble the following:

```
mke2fs 1.47.0 (5-Feb-2023)
Creating filesystem with 1048576 4k blocks and 262144 inodes
Filesystem UUID: 6e7208b3-74f9-4e65-933a-c3e05fcfe53c
Superblock backups stored on blocks:
  32768, 98304, 163840, 229376, 294912, 819200, 884736
Allocating group tables: done
Writing inode tables: done
Creating journal (16384 blocks): done
Writing superblocks and filesystem accounting information: done
```

Running the command again on the same partition will trigger a warning that a file system already exists, preventing accidental overwrites.

For scenarios where a higher number of inodes is required—especially on systems handling many small files—use the `-N` option to specify the exact number of inodes:

```
sudo mkfs.ext4 -N 500000 /dev/sdb2
```

Remember, in ext4, each file or directory uses an inode. Even with ample disk space, a shortage of inodes can restrict file creation.

---

## Managing ext4 File System Properties

The `tune2fs` utility allows you to display and modify ext4 file system properties. To view current properties of `/dev/sdb2`, run:

```
sudo tune2fs -l /dev/sdb2
```

Although the exact command to change the label with `tune2fs` is not included here, the manual provides detailed guidance for modifying properties, including updating the label to "SecondFS" using the appropriate options.

Finally, tools like `cfdisk` can be used to inspect the `/dev/sdb` device, ensuring that partitions have the correct file system types and labels. In our demonstration, the XFS file system was labeled "FirstFS" and the ext4 file system on `/dev/sdb2` was set to "SecondFS."

---

This concludes our lesson on creating and configuring file systems with XFS and ext4. For detailed reference material and further reading, consider reviewing the following resources:

- [XFS Filesystem Administration](https://xfs.org/)
- [Ubuntu File System Documentation](https://help.ubuntu.com/community/FileSystems)
- [Red Hat Storage Administration](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/7940a64e-33de-45a9-9882-1ea0e2204586)**
>
> Watch video content
