# Create Partitions and Filesystems Manage MBR and GPT partition tables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Devices-Linux-Filesystems-Filesystem-Hierarchy-Standard/Create-Partitions-and-Filesystems-Manage-MBR-and-GPT-partition-tables)

---

## Table of Contents

- Create Partitions and Filesystems Manage MBR and GPT partition tables
  - Why Partition a Disk?
  - 1. Viewing Existing Partitions
  - 2. Inspecting the Partition Table with fdisk
  - 3. Creating and Modifying Partitions with cfdisk
  - 4. Verifying the New Partitions
  - Summary of Common Commands
  - Links and References
  - Watch Video
    - Steps to Partition /dev/sdb
    - 3.1 Setting a Partition Type
    - 3.2 Writing and Quitting

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Devices Linux Filesystems Filesystem Hierarchy Standard

# Create Partitions and Filesystems Manage MBR and GPT partition tables

Linux lets you divide a physical disk into multiple partitions, each with its own filesystem. For example, on a 2 TB SSD you might allocate 1 TB for Windows (NTFS) and 1 TB for Linux (ext4). Partitioning keeps filesystems separate and lets each OS manage its space independently.

## Why Partition a Disk?

- Separate operating systems (e.g., Windows vs. Linux)
- Isolate data, swap, and boot partitions
- Use different partition table formats: MBR (DOS) vs. GPT (modern systems)

> [!important]
> **Note**
>
> Leaving 1 MiB unallocated at the start of the disk is a best practice. Many bootloaders require this alignment for optimal performance.

## 1\. Viewing Existing Partitions

Use `lsblk` to list block devices and their partitions:

```
lsblk
```

Only entries with TYPE `part` are actual partitions:

```
$ lsblk
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda       8:0    0   20G  0 disk
├─sda1    8:1    0    1G  0 part /boot
├─sda2    8:2    0   19G  0 part
│ ├─cs-root 253:0  0   17G  0 lvm  /
│ └─cs-swap 253:1  0    2G  0 lvm  [SWAP]
sdb       8:16   0   10G  0 disk
sr0      11:0    1 1024M  0 rom
```

| Column     | Meaning                            |
| ---------- | ---------------------------------- |
| NAME       | Device name (`sda`, `sdb`, etc.)   |
| SIZE       | Disk or partition size             |
| TYPE       | `disk`, `part`, or `lvm`           |
| MOUNTPOINT | Where it’s mounted (if applicable) |

## 2\. Inspecting the Partition Table with fdisk

To view the partition table on `/dev/sda`, run:

```
sudo fdisk --list /dev/sda
```

Sample output:

```
Disk /dev/sda: 20 GiB, 21474836480 bytes, 41943040 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xb65442dd


Device         Boot    Start      End  Sectors Size Id Type
/dev/sda1      *        2048   2099199  2097152   1G 83 Linux
/dev/sda2      2099200 41943039 39843840  19G  8e Linux LVM
```

- `Disklabel type: dos` indicates an MBR partition table.
- `Start` and `End` are measured in 512-byte sectors.

## 3\. Creating and Modifying Partitions with cfdisk

`cfdisk` offers an ncurses interface for partitioning. It’s especially helpful on servers without a GUI.

### Steps to Partition `/dev/sdb`

1.  Attach the disk (e.g., `sdb`) and launch:

    ```
    sudo cfdisk /dev/sdb
    ```

2.  **Select a label**:
    - GPT for modern UEFI systems.
    - DOS for legacy MBR.
3.  **Create partitions**:
    - Navigate to **Free Space** → **New** → enter `8G` → **Enter**.
    - Repeat in remaining free space with `2G`.
4.  **Resize or split** (optional):
    - Highlight a partition → **Resize** → enter new size (e.g., `4G`).
    - Use freed space to create another partition.

![The image shows a terminal window displaying disk partition information for `/dev/sdb`, including details about partitions, free space, and options for managing them.](https://kodekloud.com/kk-media/image/upload/v1752881375/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Create-Partitions-and-Filesystems-Manage-MBR-and-GPT-partition-tables/disk-partition-info-terminal-dev-sdb.jpg)

```
Disk: /dev/sdb
Size: 10 GiB, 10737418240 bytes, 20971520 sectors
Label: gpt, identifier: 42F7FA1E-9398-1741-89AA-477083B71FC3


Device       Start       End    Sectors  Size Type
/dev/sdb1    2048     8390655   8388608   4G Linux filesystem
/dev/sdb2  8390656    16779263   8388608   4G Linux filesystem
/dev/sdb3 16779264    20971486   4192223   2G Linux filesystem
```

### 3.1 Setting a Partition Type

The default type is “Linux filesystem.” To mark `/dev/sdb3` as swap:

- Highlight **sdb3** → **Type** → select **Linux swap** → **Enter**.

![The image shows a terminal window with a menu for selecting a partition type, highlighting "Linux swap" among various options like EFI System and Microsoft reserved.](https://kodekloud.com/kk-media/image/upload/v1752881376/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Create-Partitions-and-Filesystems-Manage-MBR-and-GPT-partition-tables/terminal-partition-type-linux-swap.jpg)

You can also choose types like **EFI System** for UEFI boot partitions or **Microsoft reserved** for Windows.

![The image shows a terminal window displaying a disk partitioning tool on a CentOS system, listing partitions on the disk `/dev/sdb` with details like size and type.](https://kodekloud.com/kk-media/image/upload/v1752881377/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Create-Partitions-and-Filesystems-Manage-MBR-and-GPT-partition-tables/centos-terminal-disk-partitioning-tool.jpg)

> [!important]
> **Warning**
>
> When you **Write** changes in `cfdisk`, all partition modifications become permanent. Double-check before confirming.

### 3.2 Writing and Quitting

1.  Select **Write**, type `yes`, and press Enter.
2.  Select **Quit** to exit `cfdisk`.

## 4\. Verifying the New Partitions

Back in the shell, confirm with `lsblk`:

```
lsblk
```

```
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda       8:0    0   20G  0 disk
├─sda1    8:1    0    1G  0 part /boot
├─sda2    8:2    0   19G  0 part
│ ├─cs-root 253:0  0   17G  0 lvm  /
│ └─cs-swap 253:1  0    2G  0 lvm  [SWAP]
sdb       8:16   0   10G  0 disk
├─sdb1    8:17   0    4G  0 part
├─sdb2    8:18   0    4G  0 part
└─sdb3    8:19   0    2G  0 part
sr0      11:0    1 1024M  0 rom
```

Now `/dev/sdb` has three partitions: two 4 GiB data partitions and one 2 GiB swap.

---

## Summary of Common Commands

| Command                    | Purpose                           | Example                  |
| -------------------------- | --------------------------------- | ------------------------ |
| lsblk                      | List block devices and partitions | `lsblk`                  |
| sudo fdisk --list /dev/sdX | Show partition table              | `sudo fdisk -l /dev/sda` |
| sudo cfdisk /dev/sdX       | Interactive disk partitioning     | `sudo cfdisk /dev/sdb`   |

## Links and References

- [lsblk(8) — list block devices](https://man7.org/linux/man-pages/man8/lsblk.8.html)
- [fdisk(8) — partition table manipulator](https://man7.org/linux/man-pages/man8/fdisk.8.html)
- [cfdisk(8) — curses-based partition editor](https://man7.org/linux/man-pages/man8/cfdisk.8.html)
- [GPT vs. MBR Partition Tables](https://en.wikipedia.org/wiki/GUID_Partition_Table)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/de71b96a-9dc0-4e92-987a-6c7055c44e8b/lesson/bab260a6-adfc-4282-a694-8d300163b66c)**
>
> Watch video content
