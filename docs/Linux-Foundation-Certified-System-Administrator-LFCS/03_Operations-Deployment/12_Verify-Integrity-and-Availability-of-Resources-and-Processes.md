# Verify Integrity and Availability of Resources and Processes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Verify-Integrity-and-Availability-of-Resources-and-Processes)

---

## Table of Contents

- Verify Integrity and Availability of Resources and Processes
  - Checking Disk Space with df
  - Checking Memory Usage with free
  - Analyzing CPU Load with uptime
  - Checking File System Integrity
  - Verifying Key Processes and Services
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Verify Integrity and Availability of Resources and Processes

In this lesson, we explain how to verify the integrity and availability of key system resources and processes. Over time, servers tend to use more resources—storage space may fill up as databases grow or users store more files. In cloud environments, adding storage devices is relatively straightforward, but knowing when your storage is near capacity is essential.

Below, we provide detailed steps to monitor disk space, RAM, CPU load, file system integrity, and essential services.

─────────────────────────────────────────────

## Checking Disk Space with df

The "df" (disk free) utility reports on disk usage. By default, sizes are shown in 1-kilobyte blocks, which can be difficult to interpret. Use the "-h" option to display sizes in a human-readable format (MB, GB, TB).

Example output of "df":

```
$ df
Filesystem                                   1K-blocks      Used Available Use% Mounted on
tmpfs                                         400588      1112    399476   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv         10218772   4070292   5607808  43% /
tmpfs                                        2002940         0   2002940   0% /dev/shm
tmpfs                                          5120         0      5120   0% /run/lock
/dev/vda2                                   1790136    256868   1424068  16% /boot
tmpfs                                         400588         4    400584   1% /run/user/1000
```

Using the human-readable option:

```
$ df -h
Filesystem                                   Size  Used Avail Use% Mounted on
tmpfs                                        392M  1.1M  391M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv             9.8G  3.9G  5.4G  43% /
tmpfs                                        2.0G  0.0G  2.0G   0% /dev/shm
tmpfs                                        5.0M  0.5M  0.5M   0% /run/lock
/dev/vda2                                    1.8G  251M  1.4G  16% /boot
tmpfs                                        392M  4.0K  392M   1% /run/user/1000
```

In the output above, filesystems labeled as "tmpfs" are virtual filesystems that only reside in memory. In this case, only two actual filesystems are in use: the root filesystem (mounted on "/") where the Linux operating system is installed, and the smaller "/boot" filesystem that holds boot files.

To view the disk space used by a specific directory, use the "du" (disk usage) utility. By default, "du" lists the space used by the directory and all of its subdirectories. The "-s" (summarize) option provides output for the specified directory only, while "-h" displays sizes in a human-friendly format.

```
$ du -sh /usr/
3.0G    /usr/
```

─────────────────────────────────────────────

## Checking Memory Usage with free

Monitoring RAM is as important as disk monitoring. The "free" command displays how much RAM is used and available, while the "-h" option renders sizes in a human-readable format (using mebibytes and gibibytes).

```
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       1.0Gi       1.5Gi        15Mi       1.1Gi       2.4Gi
Swap:         2.0Gi          0B       2.0Gi
```

In this example, the "used" value might appear high, but the "available" column indicates that 2.4 GiB of memory can still be reclaimed if necessary. Temporary memory used for caching large files does not prevent the memory from being available to applications.

> [!important]
> **Tip**
>
> Use the "free -h" command as a quick reference to ensure your system has adequate memory, especially when running high-load applications.

─────────────────────────────────────────────

## Analyzing CPU Load with uptime

The "uptime" command provides key data about system load and uptime. The output shows three load average numbers representing the average system load over the last 1, 5, and 15 minutes.

```
$ uptime
17:24:55 up 32 min,  1 user,  load average: 0.05, 0.05, 0.01
```

A load average of 1.0 over the last minute indicates that one CPU core has been fully utilized on average. For systems with multiple cores, a load average higher than the number of cores suggests some processes are waiting for CPU time. Consistently high load averages may signal the need to upgrade hardware or optimize running processes.

─────────────────────────────────────────────

## Checking File System Integrity

Before checking a file system for errors, ensure it is unmounted. File system checks differ depending on whether your system uses XFS or ext4. For more detailed information on file systems, partitions, mounting, and unmounting, refer to our upcoming storage sections.

![The image provides information on file system integrity, noting that file systems must be unmounted to check for errors. It mentions that Redhat OS uses xfs as the default file system, while Ubuntu OS uses ext4.](https://kodekloud.com/kk-media/image/upload/v1752881355/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Verify-Integrity-and-Availability-of-Resources-and-Processes/file-system-integrity-checks-redhat-ubuntu.jpg)

> [!important]
> **File System Information**
>
> Operating systems in the Red Hat family typically use the XFS file system by default, while Ubuntu systems use ext4.

To verify an XFS file system, run:

```
$ sudo xfs_repair -v /dev/vdb1
Phase 1 - find and verify superblock...
        - block cache size set to 175968 entries
Phase 2 - using internal log
        zero log...
zero_log: head block 103 tail block 103
        scan filesystem freespac and inode maps...
        found root inode chunk
Phase 3 - for each AG...
        scan and clear agi unlinked lists...
        process known inodes and perform inode discovery...
        agno = 0
        agno = 1
        agno = 2
        agno = 3
Phase 4 - check for duplicate blocks...
        setting up duplicate extent list...
        check for inodes claiming duplicate blocks...
        agno = 0
        agno = 1
        agno = 2
        agno = 3
Phase 5 - rebuild AG headers and trees...
        agno = 0
        agno = 1
        agno = 2
        agno = 3
Phase 6 - check inode connectivity...
        resetting contents of realtime bitmap and summary inodes
        traversing filesystem
        agno = 0
        agno = 1
        agno = 2
        agno = 3
Phase 7 - scan finished ...
        moving disconnected inodes to lost+found ...
done
```

Here, "/dev/vdb1" is the partition containing the file system. Depending on your configuration, the device name might differ (for example, "/dev/vda2" or "/dev/sdc3").

For an ext4 file system, use the fsck utility with ext4 options. The "-v" flag increases verbosity, "-f" forces a check even on healthy filesystems, and "-p" (preen mode) fixes simple issues automatically.

```
$ sudo fsck.ext4 -v -f -p /dev/vdb2
11 inodes used (0.00%, out of 262144)
0 non-contiguous files (0.0%)
0 non-contiguous directories (0.0%)
# of inodes with ind/dind/tind blocks: 0/0/0
Extent depth histogram: 3
36942 blocks used (3.52%, out of 1048576)
0 bad blocks
1 large file


0 regular files
2 directories
0 character device files
0 block device files
0 fifos
0 links
0 symbolic links (0 fast symbolic links)
0 sockets
__________
2 files
```

> [!important]
> **Hint**
>
> Using the "-p" option with fsck.ext4 is especially useful when the file system has many errors, as it automates the repair process.

─────────────────────────────────────────────

## Verifying Key Processes and Services

Ensuring that critical services are running is vital for system stability. The following command displays systemd unit dependencies in a tree-like structure, helping you visualize service relationships.

```
$ systemctl list-dependencies
default.target
└─ apport.service
   ├─ display-manager.service
   ├─ systemd-update-utmp-runlevel.service
   ├─ udisks2.service
   └─ multi-user.target
       └─ anacron.service
```

In the dependency tree, a green (active) circle indicates the service is running, while a white (inactive) circle means it isn’t. Some services only run briefly at boot (and then exit), but others—like ssh.service, cron.service, and atd.service—should remain active.

To simulate an issue, let’s terminate the atd daemon:

```
$ sudo pkill atd
```

After terminating, check the dependencies to see that the atd service is now inactive:

```
$ systemctl list-dependencies
multi-user.target
├─ atd.service
├─ console-setup.service
├─ cron.service
└─ dbus.service
```

View the status of the terminated service for more details:

```
$ systemctl status atd.service
○ atd.service - Deferred execution scheduler
   Loaded: loaded (/lib/systemd/system/atd.service; enabled; vendor preset: enabled)
   Active: inactive (dead) since Fri 2024-03-08 03:18:09 EET; 4min 10s ago
Mar 08 03:45:30 kodekloud systemd[1]: atd.service: Deactivated successfully.
```

Since atd is configured to start on boot, restarting it should resolve the issue:

```
$ sudo systemctl start atd.service
```

If "systemctl status" logs do not clearly explain the issue, review the service logs with journalctl:

```
$ journalctl -u atd.service
```

This command helps you pinpoint the root cause if the service is failing to start.

─────────────────────────────────────────────

## Summary

By using tools such as df, du, free, uptime, and file system check utilities like xfs_repair and fsck.ext4, alongside service monitoring commands like systemctl and journalctl, you can proactively verify the integrity and availability of your server’s resources and processes. This systematic monitoring helps ensure your systems run smoothly and alerts you early to potential issues.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/9cda6cb2-2337-41e7-a671-2866f65ca44a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/975feb92-bf2c-4ced-945e-fc04b1814fac)**
>
> Practice lab
