# Control Mounting and Unmounting of Filesystems Part 1 Mount at boot - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Devices-Linux-Filesystems-Filesystem-Hierarchy-Standard/Control-Mounting-and-Unmounting-of-Filesystems-Part-1-Mount-at-boot)

---

## Table of Contents

- Control Mounting and Unmounting of Filesystems Part 1 Mount at boot
  - 1. Manual Mounting and Unmounting
  - 2. Automatic Mounting at Boot with /etc/fstab
  - 3. Enabling Swap at Boot
  - 4. Using UUIDs Instead of Device Names
  - Links and References
  - Watch Video
    - 1.1 Verify an Empty Mount Point
    - 1.2 Mount an XFS Filesystem
    - 1.3 Unmount the Filesystem
    - 2.1 Create the Mount Point
    - 2.2 Understand /etc/fstab Fields
    - 2.3 Add an XFS Entry
    - 2.4 Verify and Reboot
    - 3.1 Add Swap Entry
    - 3.2 Verify Swap
    - 4.1 Retrieve a Device’s UUID
    - 4.2 Example /etc/fstab Entry with UUID

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Devices Linux Filesystems Filesystem Hierarchy Standard

# Control Mounting and Unmounting of Filesystems Part 1 Mount at boot

Linux attaches storage devices to the directory tree by “mounting” them on existing folders. In this guide, you’ll learn how to:

- Manually mount and unmount filesystems
- Configure automatic mounts at boot using `/etc/fstab`
- Enable swap partitions at startup
- Use UUIDs for stable device identification

---

## 1\. Manual Mounting and Unmounting

### 1.1 Verify an Empty Mount Point

A common temporary mount directory is `/mnt`. Confirm it’s empty:

```
ls /mnt/
```

### 1.2 Mount an XFS Filesystem

Assuming you created an XFS filesystem on `/dev/vdb1`, mount it to `/mnt`:

```
sudo mount /dev/vdb1 /mnt
```

Now `/mnt` is the root of that filesystem. Create a test file and verify:

```
sudo touch /mnt/testfile
ls -l /mnt/
# -rw-rw-r--. 1 aaron aaron 0 Jan 31 14:30 testfile
```

Use `lsblk` to confirm the mount point:

```
lsblk
# NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
# vdb     8:16   0   10G  0 disk
# └─vdb1  8:17   0    4G  0 part /mnt
```

### 1.3 Unmount the Filesystem

To detach the filesystem:

```
sudo umount /mnt
```

Then verify it’s no longer mounted:

```
lsblk
ls /mnt/
```

---

## 2\. Automatic Mounting at Boot with `/etc/fstab`

The `/etc/fstab` file defines filesystems to mount automatically during system startup.

### 2.1 Create the Mount Point

```
sudo mkdir /mybackups
```

### 2.2 Understand `/etc/fstab` Fields

| Field             | Description                                      | Example                   |
| ----------------- | ------------------------------------------------ | ------------------------- |
| Device            | Block device path or UUID                        | `/dev/vdb1` or `UUID=...` |
| Mount point       | Directory to attach the filesystem               | `/mybackups`              |
| Filesystem type   | `xfs`, `ext4`, `swap`, etc.                      | `xfs`, `swap`             |
| Options           | Mount options, e.g., `defaults`, `rw`, `noexec`  | `defaults`                |
| Dump              | `0` = disable, `1` = enable (for `dump` utility) | `0`                       |
| Pass (fsck order) | `0` = skip, `1` = root, `2` = other filesystems  | `2`                       |

### 2.3 Add an XFS Entry

Open `/etc/fstab` in your editor:

```
sudo vim /etc/fstab
```

Append:

```
/dev/vdb1    /mybackups    xfs    defaults    0    2
```

> [!important]
> **Note**
>
> If you don’t plan to reboot immediately, apply the new mounts with:
>
> ```
> sudo mount -a
> ```

### 2.4 Verify and Reboot

Confirm `/mybackups` is not yet mounted:

```
ls /mybackups/
lsblk | grep mybackups
```

Reboot the system:

```
sudo systemctl reboot
```

After login, verify the mount:

```
ls -l /mybackups/
lsblk | grep mybackups
# vdb1   8:17   0   4G  0 part /mybackups
```

---

## 3\. Enabling Swap at Boot

If you created a swap partition on `/dev/vdb3`, add it to `/etc/fstab` so it’s activated at startup.

### 3.1 Add Swap Entry

Edit `/etc/fstab` and append:

```
/dev/vdb3    none    swap    defaults    0    0
```

Here, the mount point is `none`, and `0 0` disables dump and fsck.

### 3.2 Verify Swap

Reload systemd (or reboot) and check:

```
sudo systemctl daemon-reload
sudo swapon --show
# NAME        TYPE      SIZE USED PRIO
# /dev/vdb3   partition 2G   0B   -2
```

---

## 4\. Using UUIDs Instead of Device Names

Device names can change if hardware is reconfigured. UUIDs remain constant.

### 4.1 Retrieve a Device’s UUID

```
sudo blkid /dev/vdb1
# /dev/vdb1: LABEL="FirstFS" UUID="9ab8cfa5-2813-4b70-ada0-7abd0ad9d289" TYPE="xfs"
```

### 4.2 Example `/etc/fstab` Entry with UUID

```
UUID=9ab8cfa5-2813-4b70-ada0-7abd0ad9d289    /mybackups    xfs    defaults    0    2
```

---

## Links and References

- [mount(8) Manual](https://man7.org/linux/man-pages/man8/mount.8.html)
- [fstab(5) Manual](https://man7.org/linux/man-pages/man5/fstab.5.html)
- [XFS Filesystem Documentation](https://docs.kernel.org/filesystems/xfs/index.html)
- [Linux Swap – ArchWiki](https://wiki.archlinux.org/title/Swap)
- [blkid(8) Manual](https://man7.org/linux/man-pages/man8/blkid.8.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/de71b96a-9dc0-4e92-987a-6c7055c44e8b/lesson/5c4b052f-b036-43ee-af83-f7cfc6fe73f9)**
>
> Watch video content
