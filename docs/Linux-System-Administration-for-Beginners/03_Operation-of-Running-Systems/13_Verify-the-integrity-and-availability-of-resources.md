# Verify the integrity and availability of resources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Verify-the-integrity-and-availability-of-resources)

---

## Table of Contents

- Verify the integrity and availability of resources
  - Disk Space Usage
  - Directory Usage
  - Memory Utilization
  - CPU Load and Hardware Details
  - File System Integrity
  - Monitoring Key Processes
  - Command Summary
  - Links and References
  - Watch Video
  - Practice Lab
    - Load Averages
    - CPU Architecture
    - PCI Devices
    - Repairing an XFS File System
    - Checking and Repairing an ext4 File System

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Verify the integrity and availability of resources

In this guide, you’ll learn how to monitor and verify the integrity of key resources on Linux servers. We cover disk and directory usage, memory and CPU statistics, file system repair (XFS and ext4), and service health checks.

## Disk Space Usage

Over time, server storage fills up as applications grow and users store more data. Use `df` to inspect overall disk usage:

```
# Default: sizes in 1K blocks
df
```

For human-readable output (MB, GB, …), add the `-h` flag:

```
df -h
Filesystem                  Size  Used Avail Use% Mounted on
/dev/mapper/cs-root          17G  7.9G   9.2G  47% /
/dev/vda1                   1014M  435M  580M  43% /boot
tmpfs                       1.9G     0  1.9G   1% /dev/shm
...
```

> [!important]
> **Note**
>
> Ignore `tmpfs` entries—they represent in-memory filesystems, not physical disks.

## Directory Usage

To measure the size of a specific directory, run `du` with summarization and human-readable flags:

```
du -sh /var/log
# e.g., 512M    /var/log
```

> [!important]
> **Warning**
>
> Running `du` on very large or deeply nested directories can take time and generate high I/O.

## Memory Utilization

Display RAM and swap usage with `free`:

```
free -h
              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       1.0Gi       1.5Gi        15Mi       1.1Gi       2.4Gi
Swap:         2.0Gi          0B       2.0Gi
```

Focus on the **available** column—it indicates memory ready for new applications.

## CPU Load and Hardware Details

### Load Averages

Use `uptime` to view load averages over 1, 5, and 15 minutes:

```
uptime
# 17:24:55 up 32 min,  1 user,  load average: 0.05, 0.05, 0.01
```

- On a single-core system, load of **1.00** equates to 100% utilization.
- On an 8-core system, a load of **6.00** means six cores were fully busy.

### CPU Architecture

```
lscpu
```

Key fields:  
• Architecture  
• CPU(s)  
• Thread(s) per core  
• Model name  
• Cache sizes

### PCI Devices

```
lspci
```

Lists all PCI devices, including network adapters, GPUs, and host bridges.

## File System Integrity

### Repairing an XFS File System

1.  **Unmount** the partition:  
    `sudo umount /dev/vdb1`
2.  **Repair** with verbose output:

    ```
    sudo xfs_repair -v /dev/vdb1
    ```

3.  **Remount** after completion:  
    `sudo mount /dev/vdb1 /mnt`

> [!important]
> **Note**
>
> Always unmount the XFS volume before running `xfs_repair` to avoid data corruption.

### Checking and Repairing an ext4 File System

Run `fsck.ext4` with verbose, forced check, and preen (auto-fix simple issues):

```
sudo fsck.ext4 -v -f -p /dev/vdb2
```

- `-v`: verbose output
- `-f`: force check even if clean
- `-p`: preen mode for unattended fixes

> [!important]
> **Warning**
>
> Do **not** run `fsck` on a mounted ext4 partition, especially the root (`/`), as it may cause data loss.

## Monitoring Key Processes

List all service dependencies and their statuses with `systemctl`:

```
systemctl list-dependencies
# default.target
# ● └─accounts-daemon.service
# ● └─gdm.service
# ○ └─chronyd.service
```

- `●` = running
- `○` = stopped

Example: simulate stopping NTP service, verify, then restart:

```
# Stop chronyd
sudo pkill chronyd


# Recheck dependencies
systemctl list-dependencies


# Inspect why it stopped
systemctl status chronyd.service


# Restart the service
sudo systemctl start chronyd.service
```

## Command Summary

| Command                     | Description                            | Key Flags                 |
| --------------------------- | -------------------------------------- | ------------------------- |
| df                          | Show filesystem disk usage             | \\-h (human readable)     |
| du                          | Estimate directory space usage         | \\-sh (summarize + human) |
| free                        | Display memory and swap usage          | \\-h                      |
| uptime                      | Show system uptime and load averages   | —                         |
| lscpu                       | Display CPU architecture and features  | —                         |
| lspci                       | List PCI devices                       | —                         |
| xfs\\\_repair               | Repair XFS file systems                | \\-v (verbose)            |
| fsck.ext4                   | Check and repair ext4 partitions       | \\-v, -f, -p              |
| systemctl list-dependencies | List service dependencies and statuses | —                         |

## Links and References

- [df(1) Manual Page](https://man7.org/linux/man-pages/man1/df.1.html)
- [du(1) Manual Page](https://man7.org/linux/man-pages/man1/du.1.html)
- [free(1) Manual Page](https://man7.org/linux/man-pages/man1/free.1.html)
- [xfs_repair(8) Manual Page](https://man7.org/linux/man-pages/man8/xfs_repair.8.html)
- [fsck.ext4(8) Manual Page](https://man7.org/linux/man-pages/man8/fsck.ext4.8.html)
- [systemctl(1) Manual Page](https://man7.org/linux/man-pages/man1/systemctl.1.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/587e0638-9eed-4b9e-886b-ff478341d263)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/fc948c4e-a60f-4e77-a297-8ab6661bc64d)**
>
> Practice lab
