# Backup files to a Remote System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Backup-files-to-a-Remote-System)

---

## Table of Contents

- Backup files to a Remote System
  - Using rsync for Remote Synchronization
  - Using dd for Disk Imaging
  - Summary
  - Watch Video
    - Basic rsync Command Syntax
    - Creating a Disk Image with dd
    - Restoring a Disk Image

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Backup files to a Remote System

In this lesson, we explore how to perform backups on Linux systems using native tools. Although modern backup solutions exist, this guide focuses on two fundamental methods: synchronizing files using rsync and creating disk images with dd.

## Using rsync for Remote Synchronization

rsync (short for "remote synchronization") is a powerful tool for backing up data. It efficiently synchronizes directories between a local and remote system by transferring only changed files.

![The image illustrates the concept of syncing two directories using "rsync" for remote synchronization between a remote server and a local server.](https://kodekloud.com/kk-media/image/upload/v1752883614/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Backup-files-to-a-Remote-System/rsync-sync-directories-illustration.jpg)

Before getting started, ensure that the remote server has an SSH daemon running, as rsync uses SSH to perform secure data transfers.

### Basic rsync Command Syntax

The general syntax for rsync is:

```
rsync -a [source_directory/] username@IP_address:/path/to/destination_directory/
```

Here, the `-a` (archive) flag ensures that subdirectories, file permissions, modification times, and other attributes are preserved during synchronization.

For example, to synchronize a local "Pictures" directory with a remote "Pictures" directory, you would use:

```
rsync -a Pictures/ aaron@9.9.9.9:/home/aaron/Pictures/
```

Ensure a trailing slash is added at the end of your directory names to indicate the correct source path. Running the command a second time causes rsync to only copy files that have changed since the last synchronization.

If you need to restore from the remote backup to your local system, simply swap the source and destination:

```
rsync -a aaron@9.9.9.9:/home/aaron/Pictures/ Pictures/
```

You can also synchronize two local directories:

```
rsync -a Pictures/ /Backups/Pictures/
```

## Using dd for Disk Imaging

When you need to back up an entire disk or partition, instead of just individual files, the `dd` utility becomes essential. It creates an exact, bit-by-bit copy of a disk or partition, a process commonly referred to as disk imaging.

> [!important]
> **Important Note**
>
> Before creating a disk image, ensure the disk or partition is unmounted to prevent data modifications during the imaging process.

### Creating a Disk Image with dd

Run the following command with root permissions to create a disk image:

```
sudo dd if=/dev/vda of=diskimage.raw bs=1M status=progress
```

Breakdown of the command:

- `sudo dd`: Runs the `dd` command with elevated permissions.
- `if=/dev/vda`: Specifies the input file—the disk or partition you want to back up.
- `of=diskimage.raw`: Defines the output file where the disk image is saved.
- `bs=1M`: Sets the block size to one megabyte, which can enhance the performance of the backup process.
- `status=progress`: Displays progress information as the backup operation proceeds.

A typical output might be:

```
1340080128 bytes (1.3GB, 1.2GB) copied, 3s, 432 MB/s
```

### Restoring a Disk Image

Restoring the disk image is just as straightforward. Reverse the input and output parameters:

```
sudo dd if=diskimage.raw of=/dev/vda bs=1M status=progress
```

> [!important]
> **Warning**
>
> Restoring a disk image will overwrite the destination disk entirely. Ensure you are restoring to the correct disk to avoid unintended data loss.

## Summary

In this lesson, we discussed two essential Linux backup methodologies:

| Method | Use Case                                    | Command Example                                              |
| ------ | ------------------------------------------- | ------------------------------------------------------------ |
| rsync  | File-level backup and synchronization       | `rsync -a Pictures/ aaron@9.9.9.9:/home/aaron/Pictures/`     |
| dd     | Creating and restoring complete disk images | `sudo dd if=/dev/vda of=diskimage.raw bs=1M status=progress` |

Using rsync, you can maintain reliable and efficient file-level backups, while dd provides a means to create exact images of entire disks or partitions.

Proceed to the next article for more in-depth discussions on Linux administration and advanced backup strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/00e24fe6-b93a-4c51-89c1-00bf66c96dfd)**
>
> Watch video content
