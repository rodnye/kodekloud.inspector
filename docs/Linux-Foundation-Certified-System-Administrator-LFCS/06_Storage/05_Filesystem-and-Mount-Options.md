# Filesystem and Mount Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Storage/Filesystem-and-Mount-Options)

---

## Table of Contents

- Filesystem and Mount Options
  - Applying Multiple Mount Options
  - Filesystem-Specific Options
  - Automatic Mounting with /etc/fstab
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Storage

# Filesystem and Mount Options

In this guide, we explore how to examine and adjust filesystem mount options to optimize your system configuration. We begin with commands to inspect mounted filesystems, then move on to applying and understanding various mount options.

Previously, you may have used the `lsblk` command to view mounted devices briefly. While this command provides a concise overview, it lacks details like filesystem types and specific mount options. For a comprehensive view of all mounted filesystems, use the `findmnt` command.

For example, running `findmnt` might yield output similar to the following, showing that the `/dev/vdb1` partition with the XFS filesystem is mounted in the `mybackups` directory:

```
$ findmnt
TARGET              SOURCE                           FSTYPE  OPTIONS
/                   /dev/mapper/ubuntu--vg-ubuntu--lv ext4    rw,relatime,seclabel
├─/proc            proc                             proc    rw,nosuid,nodev,noexec,relatime
│ ├─/proc/sys/fs/binfmt_misc binfmt_misc        binfmt_misc rw,nosuid,nodev,noexec,relatime
│ └─/proc/sys/fs/binfmt_misc binfmt_misc        binfmt_misc rw,nosuid,nodev,noexec,relatime
└─/dev             /dev/pts                         devpts  rw,nosuid,noexec,relatime,seclabel
  ├─/dev/pts      devpts                           devpts  rw,nosuid,noexec,relatime,seclabel
  ├─/dev/shm      tmpfs                            tmpfs   rw,nosuid,nodev,seclabel,inode64
  ├─/dev/mqueue   mqueue                           mqueue  rw,nosuid,nodev,noexec,relatime
  ├─/dev/hugepages hugepages                        hugepages rw,relatime,seclabel,pagesize=2M
  ├─/dev/vda2     /dev/vda2                       ext4    rw,relatime,seclabel
  └─/dev/vdb1     /dev/vdb1                       xfs     rw,relatime,seclabel,attr2,inode64
/boot              /boot                            ext4    rw,relatime,seclabel
/mybackups         /mybackups                       ext4    rw,relatime,seclabel
```

> [!important]
> **Note**
>
> Keep in mind that on larger systems, `findmnt` may produce additional output lines for virtual filesystems (like `proc`) that are mounted in memory.

To filter out virtual filesystems and display only real ones (such as XFS and ext4), use the `-t` option:

```
$ findmnt -t xfs,ext4
TARGET              SOURCE                                   FSTYPE OPTIONS
/                   /dev/mapper/ubuntu--vg-ubuntu--lv          ext4 rw,relatime,seclabel
├─/boot             /dev/vda2                                  ext4 rw,relatime,seclabel
└─/mybackups        /dev/vdb1                                  xfs  rw,relatime,seclabel,attr2,inode64,logbufs=8
```

Note that `findmnt` only displays currently mounted filesystems; those defined on a partition but not mounted will not appear.

The OPTIONS column in the output indicates how each filesystem is mounted. For example, the `rw` option for `/dev/vdb1` means that the filesystem is mounted with read-write permissions. If it were set to `ro`, the filesystem would be mounted as read-only, which becomes evident when you attempt to create a file:

```
$ findmnt -t xfs,ext4
TARGET                        SOURCE                                 FSTYPE OPTIONS
/                             /dev/mapper/ubuntu--vg-ubuntu--lv      ext4  rw,relatime,seclabel
├─/boot                      /dev/vda2                               ext4  rw,relatime,seclabel
└─/mybackups                 /dev/vdb1                               xfs   rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=32k,noquota

$ sudo touch /mybacksups/testfile2
```

Changing the mount option from `rw` to `ro` will make the filesystem read-only.

To mount a filesystem with specific options, use the `-o` switch with the `mount` command. For example, to remount a filesystem as read-only:

```
$ sudo touch /mybacks/testfile2
$ sudo mount -o ro /dev/vdb2 /mnt
$ findmnt -t xfs,ext4
TARGET       SOURCE                                   FSTYPE OPTIONS
/            /dev/mapper/ubuntu--vg-ubuntu--lv          ext4  rw,relatime,seclabel
├─/boot     /dev/vda2                                  ext4  rw,relatime,seclabel
└─/mybackups /dev/vdb1                                 xfs   rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=32k,noquota
└─/mnt      /dev/vdb2                                  ext4  ro,relatime,seclabel

$ sudo touch /mnt/testfile
touch: cannot touch '/mnt/testfile': Read-only file system
```

This example clearly demonstrates the effect of mount options on filesystem behavior.

## Applying Multiple Mount Options

In addition to the basic `ro` (read-only) option, you can enhance security using options such as `noexec` and `nosuid`:

- **noexec**: Prevents the execution of any executable files stored on the filesystem.
- **nosuid**: Disables the SUID (Set User ID) bit, preventing programs from running with elevated privileges without using `sudo`.

These options are particularly useful on filesystems intended solely for storage (for example, on Android devices where file execution is not expected).

To mount a filesystem with these combined options, execute the following commands:

```
$ sudo umount /mnt
$ sudo mount -o ro,noexec,nosuid /dev/vdb2 /mnt
```

After mounting, verify the options with `findmnt`:

```
$ findmnt -t ext4,xfs
TARGET                          SOURCE                                     FSTYPE OPTIONS
/                               /dev/mapper/ubuntu--vg-ubuntu--lv         ext4   rw,relatime,seclabel
├─/boot                         /dev/vda2                                  ext4   rw,relatime,seclabel
├─/mybackups                   /dev/vdb1                                  xfs    rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=32k,noquota
└─/mnt                          /dev/vdb2                                  ext4   ro,nosuid,noexec,relatime,seclabel
```

If you need to modify the mount options—such as changing from read-only to read-write—you cannot simply mount again because the filesystem is already mounted. Instead, use the `remount` option:

```
$ sudo umount /mnt
$ sudo mount -o ro,noexec,nosuid /dev/vdb2 /mnt

$ findmnt -t ext4,xfs
TARGET           SOURCE                              FSTYPE OPTIONS
/                /dev/mapper/ubuntu--vg-ubuntu--lv   ext4   rw,relatime,seclabel
├─/boot         /dev/vda2                           ext4   rw,relatime,seclabel
├─/mybackups    /dev/vdb1                           xfs    rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=32k,noquota
└─/mnt          /dev/vdb2                           ext4   ro,nosuid,noexec,relatime,seclabel

$ sudo mount -o rw,noexec,nosuid /dev/vdb2 /mnt
mount: /mnt: /dev/sdb2 already mounted on /mnt.

$ sudo mount -o remount,rw,noexec,nosuid /dev/vdb2 /mnt
```

## Filesystem-Specific Options

The options we have discussed so far are generally applicable across multiple filesystem types. However, some options are filesystem-specific. For instance, XFS provides an option called `allocsize` which defines the buffered I/O end-of-file preallocation size during delayed allocation writeout. The `allocsize` value can be specified in powers-of-2 increments from the page size (typically 4 KiB) up to 1 GiB. By default, XFS uses dynamic allocation based on heuristics, and specifying a fixed `allocsize` disables this dynamic behavior.

Before applying filesystem-dependent options, ensure that the filesystem is unmounted if necessary, then mount it with your desired option. For example:

```
$ sudo umount /dev/vdb1
$ sudo mount -o allocsize=32K /dev/vdb1 /mybackups
```

For more details on XFS-specific options, refer to the XFS manual:

```
$ man xfs
```

## Automatic Mounting with /etc/fstab

So far, we have covered manual mounting techniques. These mount configurations can also be automated during system boot via the `/etc/fstab` file. A typical `fstab` entry might initially look like this:

```
$ sudo vim /etc/fstab
/dev/vdb1 /mybackups xfs defaults 0 2
```

To customize the mount options (for example, setting the filesystem to read-only with no execution), modify the entry as follows:

```
$ sudo vim /etc/fstab
/dev/vdb1 /mybackups xfs ro,noexec 0 2
```

After saving your changes and rebooting, the system will automatically apply your specified mount options.

> [!important]
> **Remember**
>
> Always consult the relevant manual pages (e.g., `man mount`, `man xfs`, or `man ext4`) for a comprehensive list of options and their effects.

## Summary

Mount options are crucial for defining how a filesystem behaves once mounted. They control access permissions, execution capabilities, and a variety of other characteristics. By properly configuring these options, you can improve both the performance and security of your system.

This guide provides a foundation for understanding and applying various mount options. For ongoing system administration, refer to additional resources such as [Mount Options Documentation](https://www.kernel.org/doc/html/latest/filesystems/mountoptions.html) and other related links.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/4b024cac-940f-45a5-b56f-54fd7b5d5c2c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/1189d9f0-8e17-4911-bb12-8c585ee116ff)**
>
> Practice lab
