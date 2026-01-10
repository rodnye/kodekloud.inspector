# Control Mounting and Unmounting of Filesystems Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Devices-Linux-Filesystems-Filesystem-Hierarchy-Standard/Control-Mounting-and-Unmounting-of-Filesystems-Part-2)

---

## Table of Contents

- Control Mounting and Unmounting of Filesystems Part 2
  - Allowing Non-Root Mounts via /etc/fstab
  - Managing Mounts with systemd
  - Links and References
  - Watch Video
    - Creating a Mount Unit
    - Creating an Automount Unit

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Devices Linux Filesystems Filesystem Hierarchy Standard

# Control Mounting and Unmounting of Filesystems Part 2

In this guide, you’ll learn how to grant non-root users the ability to mount and unmount filesystems on Linux. While root or sudo privileges have traditionally been required, desktop environments and modern distributions often auto-mount removable media such as CD-ROMs, USB flash drives, and external disks under a user’s home directory:

```
/media/USER/LABEL
```

For example, if `john` plugs in a USB drive labeled `FlashDrive`, it appears at:

```
/media/john/FlashDrive
```

## Allowing Non-Root Mounts via /etc/fstab

You can configure `/etc/fstab` to let normal users mount and unmount specific devices without sudo. Modify the mount options field to include one of the following:

| Option | Description                               | Default |
| ------ | ----------------------------------------- | ------- |
| user   | Allow any user to mount and unmount       | (no)    |
| nouser | Disallow non-root mounts                  | yes     |
| group  | Allow users belonging to the owning group | (no)    |
| owner  | Allow the device’s owning user            | (no)    |

Example: permitting all users to mount `/dev/sdb1` on `/mnt/userdrive`:

```
/dev/sdb1  /mnt/userdrive  ext4  defaults,user  0 0
```

> [!important]
> **Note**
>
> After editing `/etc/fstab`, you can test the entry without rebooting:
>
> ```
> mount /mnt/userdrive
> umount /mnt/userdrive
> ```

## Managing Mounts with systemd

systemd can manage both static mounts and on-demand automounts via unit files in `/etc/systemd/system/`. Units must be named after the mount point by replacing slashes with hyphens and appending `.mount` or `.automount`.

### Creating a Mount Unit

1.  Create the file `/etc/systemd/system/mnt-external.mount`:

    ```
    sudo vi /etc/systemd/system/mnt-external.mount
    ```

2.  Populate it:

    ```
    [Unit]
    Description=External data disk


    [Mount]
    What=/dev/disk/by-uuid/56C11DCC5D2E1334
    Where=/mnt/external
    Type=ntfs
    Options=defaults


    [Install]
    WantedBy=multi-user.target
    ```

| Field       | Purpose                                               |
| ----------- | ----------------------------------------------------- |
| Description | Brief description of the mount                        |
| What        | Device path or UUID (`/dev/disk/by-uuid/...`)         |
| Where       | Mount point directory (`/mnt/external`)               |
| Type        | Filesystem type (`ntfs`, `ext4`, etc.)                |
| Options     | Mount options (same as in `/etc/fstab`)               |
| WantedBy    | Target to activate the mount on (`multi-user.target`) |

> [!important]
> **Warning**
>
> The filename `mnt-external.mount` **must** exactly match the `Where` path `/mnt/external` (slashes → hyphens).

3.  Reload systemd and start the mount:

    ```
    sudo systemctl daemon-reload
    sudo systemctl start mnt-external.mount
    ```

4.  Check status:

    ```
    sudo systemctl status mnt-external.mount
    ```

    Sample output:

    ```
    ● mnt-external.mount — External data disk
         Loaded: loaded (/etc/systemd/system/mnt-external.mount; disabled; preset: enabled)
         Active: active (mounted) since Mon 2019-08-19 22:27:02 -03; 14s ago
          What: /dev/sdb1
          Where: /mnt/external
    ```

5.  To auto-mount at boot:

    ```
    sudo systemctl enable mnt-external.mount
    ```

### Creating an Automount Unit

An automount unit triggers the mount only when the directory is accessed. You’ll need both the `.mount` and a corresponding `.automount` file.

1.  Create `/etc/systemd/system/mnt-external.automount`:

    ```
    sudo vi /etc/systemd/system/mnt-external.automount
    ```

2.  Add:

    ```
    [Unit]
    Description=Automount External Data Disk


    [Automount]
    Where=/mnt/external


    [Install]
    WantedBy=multi-user.target
    ```

3.  Reload, start, and enable:

    ```
    sudo systemctl daemon-reload
    sudo systemctl start mnt-external.automount
    sudo systemctl enable mnt-external.automount
    ```

Now, whenever you `ls /mnt/external`, systemd will mount the disk automatically.

---

## Links and References

- [fstab(5) Manual](https://man7.org/linux/man-pages/man5/fstab.5.html)
- [systemd.mount Documentation](https://www.freedesktop.org/software/systemd/man/systemd.mount.html)
- [systemd.automount Documentation](https://www.freedesktop.org/software/systemd/man/systemd.automount.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/de71b96a-9dc0-4e92-987a-6c7055c44e8b/lesson/fc36f121-9775-4674-8a4a-ef92971fadb6)**
>
> Watch video content
