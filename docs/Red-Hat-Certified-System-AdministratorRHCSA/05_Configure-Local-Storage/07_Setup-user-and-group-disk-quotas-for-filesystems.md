# Setup user and group disk quotas for filesystems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Configure-Local-Storage/Setup-user-and-group-disk-quotas-for-filesystems)

---

## Table of Contents

- Setup user and group disk quotas for filesystems
  - Prerequisites
  - Enabling Disk Quotas on a Filesystem
  - Configuring Quotas on Different Filesystems
  - Creating a Test Environment on an XFS Filesystem
  - Managing Inode Quotas
  - Adjusting Grace Periods
  - Managing Group Quotas
  - Conclusion
  - Watch Video
  - Practice Lab
    - Updating /etc/fstab
    - Applying Changes
    - XFS Filesystem
    - ext4 Filesystem
    - Step 1: Set Up a User Directory
    - Step 2: Adjust User Quotas
    - Step 3: Testing Quota Enforcement
    - Step 4: Exceeding the Hard Limit

---

## Content

Red Hat Certified System Administrator(RHCSA)

Configure Local Storage

# Setup user and group disk quotas for filesystems

In this guide, you'll learn how to set up user and group disk quotas for file systems in Linux. Disk quotas prevent any user or group from monopolizing storage resources, ensuring fair distribution among all system users. For instance, on a 100-terabyte server, instead of one user consuming 80 terabytes and leaving only 20 terabytes for 99 users, you can enforce quotas—such as allowing each user 1 terabyte of storage.

> [!important]
> **Overview**
>
> Enforcing disk quotas helps maintain balanced resource usage on shared storage systems, preventing individual users or groups from overwhelming the system capacity.

## Prerequisites

Before proceeding, ensure the necessary quota management tools are available. On many distributions like CentOS, these tools come preinstalled. If not, install them using DNF:

```
$ sudo dnf install quota
```

## Enabling Disk Quotas on a Filesystem

### Updating /etc/fstab

To begin, decide which file system will have quotas enabled. For example, to enforce quotas on the backup partition, open the `/etc/fstab` file with your preferred text editor (e.g., Vim) and modify the corresponding line to include user and group quota options.

If the original entry is:

```
/dev/vdb1 /mybackups xfs ro,noexec 0 2
```

Update it to:

```
/dev/vdb1 /mybackups xfs defaults,usrquota,grqquota 0 2
```

Here, `usrquota` activates user quotas and `grqquota` activates group quotas.

> [!important]
> **Important**
>
> Before modifying /etc/fstab, ensure you have a backup of the file. A misconfiguration could render your system unbootable.

### Applying Changes

After editing `/etc/fstab`, save the file and reboot the machine to apply the changes:

```
$ sudo vim /etc/fstab
$ sudo systemctl reboot
```

## Configuring Quotas on Different Filesystems

### XFS Filesystem

On an XFS filesystem, quota monitoring is managed internally. Once the quota options are enabled in `/etc/fstab`, the system will automatically track usage and enforce limits without additional configuration.

### ext4 Filesystem

For ext4 filesystems, quotas are not tracked internally. To set up quota tracking on a partition (e.g., `/dev/vdb2` mounted at `/mnt`), create the necessary quota files (`aquota.user` and `aquota.group`) by running:

```
$ sudo quotacheck --create-files --user --group /dev/vdb2
```

Note: Run the `quotacheck` command only once per filesystem to avoid redundancy.

## Creating a Test Environment on an XFS Filesystem

To demonstrate quota management, we will use the XFS filesystem mounted at `/mybackups`.

### Step 1: Set Up a User Directory

Create a directory for a user named Aaron, change its ownership, and generate a 100-megabyte file using the `fallocate` command:

```
$ sudo mkdir /mybackups/aaron/
$ sudo chown aaron:aaron /mybackups/aaron
$ fallocate --length 100M /mybackups/aaron/100Mfile
```

### Step 2: Adjust User Quotas

Use the `edquota` command to adjust quotas for the user Aaron:

```
$ sudo edquota --user aaron
Disk quotas for user aaron (uid 1000):
```

When the editor launches, you will see current block usage (where one block is typically one kilobyte). For example, 102,400 blocks correspond to 100 megabytes. You can easily set soft and hard limits using the suffixes “M” (megabytes), “G” (gigabytes), or “T” (terabytes). In this scenario, you might set a soft limit of 150M and a hard limit of 200M:

```
$ sudo edquota --user aaron
Disk quotas for user aaron (uid 1000):
Filesystem           blocks   soft    hard   inodes   soft   hard
/dev/vdb1            102400   150M    200M     2       0      0
```

### Step 3: Testing Quota Enforcement

Create an additional 60-megabyte file to increase Aaron's disk usage:

```
$ fallocate --length 60M /mybackups/aaron/60Mfile
```

At this point, Aaron's total disk usage is 160 megabytes—exceeding the soft limit of 150M but still below the hard limit of 200M. The system marks the soft limit breach with an asterisk and initiates a grace period (typically six days), during which Aaron can reduce disk usage below the soft limit:

```
$ sudo quota --user aaron
Disk quotas for user aaron (uid 1000):
    Filesystem   blocks   quota   limit   grace   files   quota   limit   grace
    /dev/vdb1    163840*  153600  204800  6days   3       0       0
```

If storage usage is not reduced during the grace period, the system will enforce the soft limit strictly.

### Step 4: Exceeding the Hard Limit

Attempting to create a file that pushes usage beyond the hard limit will result in an error. For example, creating a 40-megabyte file would exceed the 200-megabyte hard limit:

```
$ fallocate --length 40M /mybackups/aaron/40Mfile
fallocate: fallocate failed: Disk quota exceeded
```

## Managing Inode Quotas

Disk quotas can also limit the number of files and directories via inode quotas. Each file or directory consumes one inode. For example, the quota editor might display:

```
$ sudo edquota --user aaron
Disk quotas for user aaron (uid 1000):
    Filesystem      blocks   soft   hard    inodes   soft   hard
    /dev/vdb1       102400    0      0       4       0      5
```

Aaron is using 4 inodes with a hard limit of 5. Creating another file or directory would exceed the inode limit, blocking further file creations.

## Adjusting Grace Periods

You can modify the grace periods (the time before soft limits are enforced) using the `edquota` command with the corresponding edit period option. This allows you to set separate grace periods for blocks (storage) and inodes (file count).

## Managing Group Quotas

Managing group quotas follows a process nearly identical to that for user quotas. The primary difference is using the group flag (e.g., -g) with the `edquota` command. To verify group quotas, include the group option with the `quota` command.

## Conclusion

By following these steps, you can efficiently set up and manage disk quotas for both users and groups on Linux systems. This ensures balanced resource utilization and prevents excessive disk usage by any single user or group.

Now, it's time to get some hands-on lab practice and deepen your understanding of disk quota management!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/207496ef-0e82-42c8-aa9d-7996cfb968a6/lesson/d2e9ecaa-ee35-43f8-bac7-4ac64eceefd9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/207496ef-0e82-42c8-aa9d-7996cfb968a6/lesson/cf7eac38-499b-477b-bad7-ae5c9505a76a)**
>
> Practice lab
