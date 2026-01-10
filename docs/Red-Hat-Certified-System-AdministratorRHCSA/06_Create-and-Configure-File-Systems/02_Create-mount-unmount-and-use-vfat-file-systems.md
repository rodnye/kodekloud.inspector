# Create mount unmount and use vfat file systems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Create-and-Configure-File-Systems/Create-mount-unmount-and-use-vfat-file-systems)

---

## Table of Contents

- Create mount unmount and use vfat file systems
  - Step 1: Partitioning for VFAT
  - Step 2: Creating the VFAT File System
  - Step 3: Mounting the VFAT File System
  - Step 4: Configuring Automatic Mounting at Boot
  - Step 5: Unmounting the VFAT File System
  - Quick Reference Table
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Create and Configure File Systems

# Create mount unmount and use vfat file systems

VFAT (Virtual File Allocation Table) is popular for its cross-platform compatibility, making it ideal for sharing storage between Windows, Linux, and other operating systems. This guide walks you through partitioning a storage device, creating a VFAT file system, mounting it, configuring automatic mounting at boot, and safely unmounting it.

## Step 1: Partitioning for VFAT

Begin by partitioning your storage device. When using the fdisk utility, change the partition type to designate it for W95 FAT32 (VFAT). Use the following steps:

```
sudo fdisk /dev/vdb
# In fdisk:
#   Type 'T' to change partition type
#   Then choose 'b' for W95 FAT32
```

> [!important]
> **Note**
>
> Always verify that you are working on the correct device and have backed up your important data before modifying disk partitions.

## Step 2: Creating the VFAT File System

After partitioning, create the VFAT file system using the mkfs.vfat command. For example, to format the partition `/dev/vdb1` as VFAT, execute:

```
sudo mkfs.vfat /dev/vdb1
```

VFAT file systems are typically created with either a 12-bit or 16-bit file allocation table. To support partitions larger than 2GB, include the `-F 32` flag, which creates a 32-bit file system. With a 4096-byte sector size, this configuration can theoretically support partitions up to 16 terabytes.

## Step 3: Mounting the VFAT File System

Mounting VFAT is straightforward. First, create a directory to serve as your mount point, then mount the partition to the directory:

```
sudo mkdir /myvfat
sudo mount /dev/vdb1 /myvfat/
```

## Step 4: Configuring Automatic Mounting at Boot

To ensure that the VFAT file system mounts automatically at boot, add an entry to the `/etc/fstab` file. Open the file with your preferred text editor:

```
sudo vi /etc/fstab
```

Add the following line to associate `/dev/vdb1` with the mount point `/myvfat` using default VFAT options:

```
/dev/vdb1 /myvfat vfat defaults 0 0
```

> [!important]
> **Tip**
>
> For added stability, consider using the partition's UUID instead of the device name in the `/etc/fstab` file, especially if device names might change between boots.

## Step 5: Unmounting the VFAT File System

When it's time to unmount the VFAT file system, use the `umount` command. You can specify either the mount point or the device:

```
sudo umount /myvfat   # or
sudo umount /dev/vdb1
```

## Quick Reference Table

| Command           | Action                                     | Example Command                                      |
| ----------------- | ------------------------------------------ | ---------------------------------------------------- |
| fdisk             | Partition the storage device               | sudo fdisk /dev/vdb                                  |
| mkfs.vfat         | Create a VFAT file system                  | sudo mkfs.vfat /dev/vdb1                             |
| mkdir & mount     | Create mount point and mount the partition | sudo mkdir /myvfat <br>sudo mount /dev/vdb1 /myvfat/ |
| Update /etc/fstab | Configure the file system to mount at boot | /dev/vdb1 /myvfat vfat defaults 0 0                  |
| umount            | Unmount the file system                    | sudo umount /myvfat                                  |

For additional insights on Linux file systems and partitioning, check out the [Linux Documentation](https://www.kernel.org/doc/html/latest/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/eb65d854-5137-4776-8ff8-73e274c43a0c/lesson/8a52fd2e-125e-443a-924c-eb8272dc8b25)**
>
> Watch video content
