# Configure systems to mount file systems at or during boot - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Create-and-Configure-File-Systems/Configure-systems-to-mount-file-systems-at-or-during-boot)

---

## Table of Contents

- Configure systems to mount file systems at or during boot
  - 1. Mounting a File System Manually
  - 2. Configuring Automatic Mounting with /etc/fstab
  - 3. Configuring a Swap Partition to Mount Automatically
  - 4. Using UUIDs Instead of Device Names
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Create and Configure File Systems

# Configure systems to mount file systems at or during boot

In this article, you will learn how to configure Linux systems to mount file systems automatically during boot. Mounting a file system means attaching it to a directory within your existing directory hierarchy, allowing you to access and create files on it. Previously, file systems may have been created but not mounted, which prevents access to their directories and files.

Below is a step-by-step guide that demonstrates how to mount a file system manually and configure permanent mounts in the /etc/fstab file.

─────────────────────────────────────────────

## 1\. Mounting a File System Manually

First, inspect the directory used for temporary mounts. The `/mnt` directory is conventionally used for this purpose:

```
$ ls /mnt/
```

This directory should be empty initially.

Assume you want to mount an XFS file system that has already been created on the partition `/dev/vdb1`. To mount it, use the following command:

```
$ sudo mount /dev/vdb1 /mnt/
```

After mounting, you can create files on the file system. For example, create a test file and list the directory contents:

```
$ ls /mnt/
$ sudo touch /mnt/testfile
$ ls -l /mnt/
-rw-rw-r--. 1 aaron aaron 30 Jan 31 14:30 testfile
```

To confirm the file system is mounted, use the `lsblk` command:

```
$ lsblk
NAME       MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
vda        8:0    0   20G  0 disk
├─vda1     8:1    0    1G  0 part /boot
├─vda2     8:2    0   19G  0 part
├─cs-root 253:0   0   17G  0 lvm  /
└─cs-swap 253:1   0    2G  0 lvm  [SWAP]
```

Once you are finished with work on the file system, unmount it using the `umount` command (note that the command is spelled without an "n"):

```
$ sudo umount /mnt/
```

You can verify that the `/mnt` directory is empty again:

```
$ ls /mnt/
```

> [!important]
> **Mount Points at Boot**
>
> When Linux boots, certain file systems (like `/dev/vda1` mounted on `/boot`) are automatically mounted according to the instructions provided in configuration files.

For example, the following output from `lsblk` shows various mount points:

```
$ lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
vda         8:0    0   20G  0 disk
├─vda1      8:1    0    1G  0 part /boot
├─vda2      8:2    0   19G  0 part
│ ├─cs-root 253:0   0   17G  0 lvm  /
│ └─cs-swap 253:1   0    2G  0 lvm  [SWAP]
vdb         8:16   0  100G  0 disk
├─vdb1      8:17   0    4G  0 part
├─vdb2      8:18   0    4G  0 part
└─vdb3      8:19   0    2G  0 part
```

─────────────────────────────────────────────

## 2\. Configuring Automatic Mounting with /etc/fstab

When booting, a Linux system mounts file systems according to the configurations specified in the `/etc/fstab` file. To automatically mount our XFS file system on `/dev/vdb1`, follow these steps:

1.  Create a directory that will serve as the mount point. In this example, we create `/mybackups`:

    ```
    $ sudo mkdir /mybackups
    ```

2.  Edit the `/etc/fstab` file using your preferred text editor. In this example, we use Vim:

    ```
    $ sudo vim /etc/fstab
    ```

The `/etc/fstab` file contains six fields per line:

- **Field 1:** The block device file (e.g., `/dev/vdb1`), indicating the partition or storage resource.
- **Field 2:** The mount point (e.g., `/mybackups`), where the file system will be attached.
- **Field 3:** The file system type (e.g., `xfs`). If using another file system type like `ext4`, adjust this accordingly.
- **Field 4:** Mount options (commonly set to `defaults`).
- **Field 5:** Dump utility flag (commonly `0` since dump is rarely used).
- **Field 6:** File system check order at boot (use `0` to disable, `1` for the root partition, and `2` for other partitions).

A sample line to mount the XFS file system on `/dev/vdb1` to `/mybackups` would be:

```
/dev/vdb1    /mybackups  xfs  defaults  0 2
```

For context, a typical `/etc/fstab` file might look like this:

```
/dev/mapper/cs-root  /         xfs     defaults  0 0
/dev/vdb1           /mybackups  xfs     defaults  0 2
# If you had an ext4 partition, it might look like:
#/dev/vdb2          /mybackups  ext4    defaults  0 2
# After editing this file, run 'systemctl daemon-reload' to update systemd configuration.
```

After saving your changes, update systemd units generated from `/etc/fstab` without needing to reboot immediately:

```
$ sudo systemctl daemon-reload
```

Verify that the `/mybackups` directory is empty before reboot:

```
$ ls /mybackups/
```

After rebooting the system, you should find the test file in `/mybackups`, confirming that the file system was automatically mounted during boot. Check with:

```
$ ls -l /mybackups/
-rw-rw-r-- 1 aaron aaron 30 Jan 31 14:30 testfile
```

You can also inspect mount points with:

```
$ lsblk
NAME      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
vda       8:0    0    20G  0 disk
├─vda1    8:1    0     1G  0 part /boot
├─vda2    8:2    0    19G  0 part
├─cs-root 253:0  0    17G  0 lvm  /
├─cs-swap 253:1  0     2G  0 lvm  [SWAP]
vdb       8:16   0    10G  0 disk
├─vdb1    8:17   0     4G  0 part
├─vdb2    8:18   0     4G  0 part /mybackups
└─vdb3    8:19   0     2G  0 part
```

To reboot the system, run:

```
$ sudo systemctl reboot
```

─────────────────────────────────────────────

## 3\. Configuring a Swap Partition to Mount Automatically

If you have created a swap partition (e.g., on `/dev/vdb3`), you can enable it to activate automatically at boot. To do this, edit the `/etc/fstab` file:

```
$ sudo vim /etc/fstab
```

Locate a line similar to the following, which mounts swap space for another device:

```
/dev/mapper/cs-swap   none   swap   defaults   0 0
```

Then add or modify the line for the swap partition on `/dev/vdb3`:

```
/dev/vdb3   none   swap   defaults   0 0
```

Note that for swap, the second field is set to "none" because it does not attach to any directory. The file system type is "swap," and the last two fields are set to 0 since swap space is not backed up or checked during boot.

After saving the file, reboot your system and verify that the swap partition is active:

```
$ swapon --show
```

> [!important]
> **Tip on Swap Filesystems**
>
> Swap partitions do not mount to a directory. Instead, they enable virtual memory to improve system performance.

─────────────────────────────────────────────

## 4\. Using UUIDs Instead of Device Names

Instead of specifying a block device file like `/dev/vda1`, you can use UUIDs (Universally Unique Identifiers). UUIDs are especially useful because device names may change if storage devices are connected in a different order.

A typical `/etc/fstab` line using a UUID looks like this:

```
UUID=3b93b1ba-e44a-4f75-aa38-c93ed32e34e2   /boot   xfs   defaults   0 0
```

For comparison, the same mount point can be defined using the device name:

```
/dev/vda1   /boot   xfs   defaults   0 0
```

To check the UUID of a block device, use the `blkid` command. For example, to view the UUID for `/dev/vdb1`:

```
$ sudo blkid /dev/vdb1
/dev/vdb1: LABEL="FirstF5" UUID="9ab8cfa5-2813-4b70-ada0-7abd0ad9d289" BLOCK_SIZE="512" TYPE="xfs" PARTUUID="569a3fcc-f9eb-9147-888d-9e3ffe9ccdb0"
```

─────────────────────────────────────────────

## Conclusion

This guide has shown you how to mount file systems both manually and automatically using `/etc/fstab`, as well as how to configure a swap partition and use UUIDs for improved device management. Now it's time to put this knowledge into practice by mounting file systems and configuring the `/etc/fstab` file on your Linux system. Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/eb65d854-5137-4776-8ff8-73e274c43a0c/lesson/18d5741b-df3b-4515-b6be-d34704700203)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/eb65d854-5137-4776-8ff8-73e274c43a0c/lesson/4ac25e93-7156-4ed2-9300-4e3d2e45f43a)**
>
> Practice lab
