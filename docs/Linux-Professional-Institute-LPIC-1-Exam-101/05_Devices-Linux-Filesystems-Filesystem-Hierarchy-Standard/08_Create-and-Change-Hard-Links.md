# Create and Change Hard Links - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Devices-Linux-Filesystems-Filesystem-Hierarchy-Standard/Create-and-Change-Hard-Links)

---

## Table of Contents

- Create and Change Hard Links
  - What Are Inodes and Hard Links?
  - Sharing Files Without Duplication
  - Deletion Behavior
  - Hard Link vs. Copy
  - Managing Permissions for Shared Files
  - Further Reading
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Devices Linux Filesystems Filesystem Hierarchy Standard

# Create and Change Hard Links

In this lesson, you’ll learn how Linux uses inodes and hard links to share files efficiently—without duplicating data. We’ll cover:

- What inodes and links are
- Creating hard links
- Deletion behavior
- Common limitations
- Permission management

## What Are Inodes and Hard Links?

Every file on a Linux filesystem is represented by an **inode**, which stores metadata (permissions, timestamps, disk block locations). A **hard link** is simply another directory entry that points to the same inode.

Consider Aaron’s photo of his dog Milo, saved as:

```
/home/aaron/Pictures/family_dog.jpg
```

Create this sample file and inspect its inode:

```
# Create the file
echo "Picture of Milo the dog" > ~/Pictures/family_dog.jpg


# Show metadata, including inode and link count
stat ~/Pictures/family_dog.jpg
```

Example output:

```
File: /home/aaron/Pictures/family_dog.jpg
Size: 24           Blocks: 8    IO Block: 4096   regular file
Device: fd00h/64768  Inode: 52946177    Links: 1
Access: (0640/-rw-r-----)  Uid: (1000/aaron)  Gid: (1005/family)
...
```

| Term  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Inode | Unique number with file metadata & data-block pointers                         |
| Links | Count of directory entries referencing this inode (starts at 1 for a new file) |
| Data  | Actual content blocks on disk                                                  |

> [!important]
> **Why Inodes Matter**
>
> When you open or read a file, the kernel looks up its name, retrieves the inode (e.g., `52946177`), and accesses the data blocks. Hard links simply give you multiple names for the same inode.

## Sharing Files Without Duplication

Copying large directories wastes disk space:

```
cp -r /home/aaron/Pictures/ /home/jane/Pictures/
```

Instead, Jane can create a hard link to Aaron’s photo:

```
ln /home/aaron/Pictures/family_dog.jpg \
   /home/jane/Pictures/family_dog.jpg
```

- **Source**: `/home/aaron/Pictures/family_dog.jpg`
- **Link name**: `/home/jane/Pictures/family_dog.jpg`

Verify with `stat`:

```
stat /home/jane/Pictures/family_dog.jpg
```

Now the link count is **2**:

```
Inode: 52946177    Links: 2
```

## Deletion Behavior

When Aaron removes his link, the data remains as long as one hard link exists:

```
rm /home/aaron/Pictures/family_dog.jpg
stat /home/jane/Pictures/family_dog.jpg
```

- Link count drops to 1
- File content is still intact for Jane

Only when the last link is deleted does the filesystem free the inode and data:

```
rm /home/jane/Pictures/family_dog.jpg
# inode 52946177 and its data blocks are now reclaimed
```

## Hard Link vs. Copy

| Operation | Disk Usage | Link Count | Independent Changes? |
| --------- | ---------- | ---------- | -------------------- |
| Copy      | +100%      | 1 each     | Yes                  |
| Hard Link | +0%        | \\>1       | No (shared inode)    |

> [!important]
> **Hard Link Limitations**
>
> - You cannot create hard links to directories (prevents filesystem loops).
> - Hard links must reside on the **same** filesystem—cross-device linking is not allowed.

## Managing Permissions for Shared Files

Since file permissions live in the inode, updating them on one hard link affects all links. To let both Aaron and Jane read/write:

1.  Add both users to a common group (`family`):

    ```
    sudo usermod -aG family aaron
    sudo usermod -aG family jane
    ```

2.  Set group read/write permissions:

    ```
    chmod 660 /home/aaron/Pictures/family_dog.jpg
    ```

Now both can modify the shared file seamlessly.

## Further Reading

- [stat(1) — Display File Status](https://man7.org/linux/man-pages/man1/stat.1.html)
- [ln(1) — Make Links](https://man7.org/linux/man-pages/man1/ln.1.html)
- [Understanding Linux Filesystems](https://www.kernel.org/doc/html/latest/filesystems/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/de71b96a-9dc0-4e92-987a-6c7055c44e8b/lesson/43f1c7d9-3aa0-4464-830d-6676106126a1)**
>
> Watch video content
