# Perform Basic File Management Part 2 archive files using tar - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Perform-Basic-File-Management-Part-2-archive-files-using-tar)

---

## Table of Contents

- Perform Basic File Management Part 2 archive files using tar
  - Synchronizing Files with rsync
  - Creating Disk Images with dd
  - Next Steps
  - Links and References
  - Watch Video
    - Basic Syntax
    - Examples
    - Basic dd Command
    - Restoring a Disk Image
      - Sample Output

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Perform Basic File Management Part 2 archive files using tar

In this lesson, we cover two fundamental Linux backup tools:

1.  **rsync** for efficient file-level synchronization
2.  **dd** for creating bit-for-bit disk or partition images

While there are many advanced backup utilities, mastering these native commands ensures you can handle common backup and restore tasks on any Linux system.

---

## Synchronizing Files with rsync

`rsync` (remote synchronization) efficiently copies and updates files between two locations, either locally or over SSH. It transfers only changes, saving bandwidth and time.

### Basic Syntax

```
rsync [options] [source/] [user@remote_host:/path/to/destination/]
```

| Option | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| `-a`   | Archive mode: preserves permissions, timestamps, symlinks, recursion |
| `-v`   | Verbose output                                                       |
| `-h`   | Human-readable numbers                                               |
| `-P`   | Show progress and keep partially transferred files                   |

> [!important]
> **Note**
>
> Always include a trailing slash on the source directory (`source/`) to copy **its contents** rather than the directory itself.

### Examples

Sync local → remote:

```
rsync -avhP Pictures/ aaron@9.9.9.9:/home/aaron/Pictures/
```

Sync remote → local:

```
rsync -avhP aaron@9.9.9.9:/home/aaron/Pictures/ Pictures/
```

Sync two local directories:

```
rsync -avh /path/to/source/ /path/to/destination/
```

---

## Creating Disk Images with dd

The `dd` command performs a low-level copy of a disk or partition, producing an exact image file. This is ideal for full-system backups or forensic duplication.

> [!important]
> **Warning**
>
> Before imaging, **unmount** the target partition or disk to prevent data corruption:
>
> ```
> sudo umount /dev/vda1
> ```

### Basic dd Command

```
sudo dd if=/dev/vda of=diskimage.raw bs=1M status=progress
```

| Option            | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `if=`             | Input file (source disk/partition, e.g., `/dev/vda`)   |
| `of=`             | Output file (destination image, e.g., `diskimage.raw`) |
| `bs=`             | Block size (e.g., `1M` for faster transfer)            |
| `status=progress` | Display ongoing copy progress                          |

#### Sample Output

```
$ sudo dd if=/dev/vda of=diskimage.raw bs=1M status=progress
1340080128 bytes (1.3 GB) copied,  3 s, 432 MB/s
```

### Restoring a Disk Image

To write the image back to a disk (this **will overwrite** the target):

```
sudo dd if=diskimage.raw of=/dev/vda bs=1M status=progress
```

> [!important]
> **Warning**
>
> Ensure you specify the correct `of=` target. Writing to the wrong device can destroy your data.

---

## Next Steps

Continue your journey in Linux file management:

- Explore advanced `tar` options for incremental backups
- Automate backups with `cron` or systemd timers
- Integrate encryption with `gpg` or LUKS for secure archives

---

## Links and References

- [rsync Documentation](https://download.samba.org/pub/rsync/rsync.html)
- [dd (Linux) Manual](https://man7.org/linux/man-pages/man1/dd.1.html)
- [Linux Backup Strategies](https://linuxconfig.org/linux-backup-and-recovery)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/23101857-c3fb-4384-bd5c-b2b8e9289e36)**
>
> Watch video content
