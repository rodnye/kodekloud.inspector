# Configure Systems to Mount Filesystems at or During Boot - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Storage/Configure-Systems-to-Mount-Filesystems-at-or-During-Boot)

---

## Table of Contents

- Configure Systems to Mount Filesystems at or During Boot
  - Mounting a Filesystem Manually
  - Automatic Mounting with fstab
  - Configuring a Swap Partition
  - Using UUIDs for Reliable Mounting
  - Final Thoughts
  - Watch Video
  - Practice Lab
    - Understanding the fstab File Format

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Storage

# Configure Systems to Mount Filesystems at or During Boot

This guide explains how to mount filesystems both manually and automatically during boot. Previously, you learned how to create filesystems, but even after creation, a filesystem remains inaccessible until it is mounted. Mounting attaches a filesystem to a directory, allowing you to create and manage files on it. The sections below detail the step-by-step process of mounting filesystems and automating these operations using fstab.

## Mounting a Filesystem Manually

First, consider a temporary mount directory. In this example, we will mount an XFS filesystem (created in a previous lesson) located on `/dev/vdb1` at the directory `/mnt`.

> [!important]
> **Manual Mounting Overview**
>
> Ensure that the directory exists and is empty before mounting the filesystem.

Run the following commands to mount the device, create a test file, and verify the mount:

```
$ ls /mnt/
$ sudo mount /dev/vdb1 /mnt/
$ sudo touch /mnt/testfile
$ ls -l /mnt/
-rw-r--r--. 1 root root 0 Apr 8 09:03 testfile
```

You can confirm that the new file resides on the mounted filesystem using the `lsblk` command:

```
$ lsblk
NAME                             MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
vda                              252:0    0   20G  0 disk
├─vda1                           252:1    0    1M  0 part
├─vda2                           252:2    0  1.8G  0 part /boot
├─vda3                           252:3    0 18.2G  0 part
│ └─ubuntu--vg-ubuntu--lv       253:0    0   10G  0 lvm  /
vdb                              252:16   0   10G  0 disk
├─vdb1                           252:17   0    4G  0 part
├─vdb2                           252:18   0    4G  0 part
└─vdb3                           252:19   0    2G  0 part
```

When finished, unmount the filesystem using the `umount` command (note the spelling without the “n”):

```
$ sudo umount /mnt/
```

After unmounting, running `lsblk` will show that `/mnt` is empty.

## Automatic Mounting with fstab

Some filesystems mount automatically at boot time. For instance, `/dev/vda2` is typically mounted to `/boot` based on system configuration. To automate the mounting of additional filesystems such as the XFS filesystem on `/dev/vdb1`, you need to add an entry to the `/etc/fstab` file.

### Understanding the fstab File Format

The `/etc/fstab` file uses six fields for each filesystem entry:

1.  **Block Device**: The partition (e.g., `/dev/vdb1`).
2.  **Mount Point**: The directory to attach the filesystem (e.g., `/mybackups`).
3.  **Filesystem Type**: The type of filesystem (e.g., `xfs` or `ext4`).
4.  **Mount Options**: Commonly set to `defaults` but can be customized.
5.  **Dump**: Typically set to `0` to disable dump backups.
6.  **Pass**: Determines the order for filesystem checks at boot (usually `1` for the root and `2` for others; `0` disables checks).

> [!important]
> **Editing fstab**
>
> Use a text editor like Vim to modify the `/etc/fstab` file. Always back up this file before making changes.

For example, to set up your XFS filesystem to mount at `/mybackups`, follow these steps:

1.  Create the mount point directory:

    ```
    $ sudo mkdir -p /mybackups
    ```

2.  Edit the `/etc/fstab` file:

    ```
    $ sudo vim /etc/fstab
    ```

3.  Add the following lines to the file:

    ```
    /dev/vda2   /boot      ext4    defaults    0 1
    /dev/vdb1   /mybackups xfs     defaults    0 2
    /dev/vdb2   /mybackups ext4    defaults    0 2
    ```

After saving the file, if a reboot is not performed immediately, notify Systemd of your changes so that they are applied at the next boot. On reboot, the filesystem on `/dev/vdb1` will be mounted automatically, and previously created files (for example, `testfile`) will become visible:

```
$ sudo systemctl reboot


$ ls -l /mybackups/
-rw-r--r-- 1 root root 0 Apr 8 09:03 testfile


$ lsblk
NAME          MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
vda           252:0    0    20G  0 disk
├─vda1        252:1    0     1M  0 part
├─vda2        252:2    0   1.8G  0 part /boot
├─vda3        252:3    0  18.2G  0 part
└─ubuntu--vg-ubuntu--lv
              253:0    0    10G  0 lvm  /
vdb           252:16   0    10G  0 disk
└─vdb1        252:17   0     4G  0 part /mybackups
  ├─vdb2      252:18   0     4G  0 part
  └─vdb3      252:19   0     2G  0 part
```

The above output confirms that the filesystem is mounted as expected.

## Configuring a Swap Partition

In a previous lesson, you created a swap partition at `/dev/vdb3`. To enable the swap partition automatically at boot, add the following line to the `/etc/fstab` file:

```
$ sudo vim /etc/fstab
/dev/vdb3   none    swap    defaults    0 0
```

Key differences in the fstab fields for swap space include:

- The second field is set to `none` since swap space does not require a mount point.
- The third field specifies the type as `swap`.
- Both the dump and pass fields are set to `0` because swap space is not backed up or checked during boot.

A system reboot will ensure the swap partition is enabled automatically.

## Using UUIDs for Reliable Mounting

Sometimes, `/etc/fstab` entries reference devices by their UUID (Universally Unique Identifier) rather than device names. For example, instead of using `/dev/vda2`, an entry might use a UUID from `/dev/disk/by-uuid/`. The major advantage of using UUIDs is that they remain constant even if the device names change (for instance, due to varying connection orders).

To check the UUID of a block device, execute:

```
$ sudo blkid /dev/vdb1
/dev/vdb1: LABEL="FirstFS" UUID="a51d7731-b033-4c07-b171-628ae951ea01" BLOCK_SIZE="512" TYPE="xfs" PARTUUID="21b2fb38-0cb9-104b-bd17-a60362e5aacd"
```

You can then update your fstab entry to use the UUID format, ensuring consistent device identification. To view all UUID assignments, run:

```
$ ls -l /dev/disk/by-uuid/
```

Using UUIDs in your fstab file improves reliability, especially in complex storage environments.

## Final Thoughts

By following these guidelines, you can ensure that your filesystems and swap space are automatically mounted and enabled at boot, even when underlying device names change. For more detailed information on fstab and mounting options, refer to the manual page:

```
man fstab
```

This concludes our guide on configuring systems to mount filesystems at boot. Happy computing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/e3d35648-d593-42c6-95fd-6bcaed170c5c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/b950ad75-7bb1-4a62-86ec-17ece0693a3d)**
>
> Practice lab
