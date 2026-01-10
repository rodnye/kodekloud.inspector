# Create and Change Soft Links - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Devices-Linux-Filesystems-Filesystem-Hierarchy-Standard/Create-and-Change-Soft-Links)

---

## Table of Contents

- Create and Change Soft Links
  - Table: Hard Link vs. Symbolic Link
  - 1. Create a Symbolic Link
  - 2. Verify a Symlink
  - 3. Permissions and Access
  - 4. Absolute vs. Relative Paths
  - 5. Linking Directories & Cross-Filesystem
  - Further Reading
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Devices Linux Filesystems Filesystem Hierarchy Standard

# Create and Change Soft Links

Symbolic links (or “soft links”) are pointers to files or directories, akin to Windows shortcuts. Unlike hard links, which reference the same inode on disk, a symlink stores the path to its target. When you access a symlink, the operating system follows that path and opens the real file or folder.

## Table: Hard Link vs. Symbolic Link

| Link Type     | Definition                                | Use Case                          | Limitation                        |
| ------------- | ----------------------------------------- | --------------------------------- | --------------------------------- |
| Hard Link     | Direct reference to the same inode        | Duplicate names for the same data | Cannot span filesystems           |
| Symbolic Link | Special file containing target’s pathname | Flexible alias or shortcut        | Broken if the target path changes |

## 1\. Create a Symbolic Link

Use the `ln` utility with the `-s` (or `--symbolic`) flag:

```
ln -s <path_to_target> <path_to_link>
# Example: create a shortcut to an image
ln -s /home/aaron/Pictures/family_dog.jpg family_dog_shortcut.jpg
```

- `<path_to_target>`: File or directory you want to reference.
- `<path_to_link>`: Name (and optional path) for the symlink.

> [!important]
> **Note**
>
> You can use absolute or relative paths. Relative links remain valid if you move the containing directory, as long as the relative structure doesn’t change.

## 2\. Verify a Symlink

List files with detailed info:

```
ls -l family_dog_shortcut.jpg
```

Output:

```
lrwxrwxrwx 1 aaron aaron 33 Apr  5 10:00 family_dog_shortcut.jpg -> /home/aaron/Pictures/family_dog.jpg
```

- Leading `l` denotes a symlink.
- Arrow (`->`) shows the target path.

To print only the target path without truncation:

```
readlink family_dog_shortcut.jpg
# /home/aaron/Pictures/family_dog.jpg
```

## 3\. Permissions and Access

Symbolic links always display full permissions (`rwxrwxrwx`), but actual access is governed by the target’s permissions:

```
echo "Test" >> fstab_shortcut
# bash: fstab_shortcut: Permission denied
```

> [!important]
> **Warning**
>
> Even though the symlink appears writable, you’re blocked because the real file (`/etc/fstab`) isn’t writable by your user.

## 4\. Absolute vs. Relative Paths

Absolute paths may break if you rename or move parent directories:

```
# Create with absolute path
ln -s /home/aaron/Pictures/family_dog.jpg abs_shortcut
# Rename /home/aaron to /home/alex
mv /home/aaron /home/alex
ls -l abs_shortcut
# abs_shortcut -> /home/aaron/Pictures/family_dog.jpg  # Broken link
```

Better: use a relative link from the same directory:

```
cd /home/aaron
ln -s Pictures/family_dog.jpg rel_shortcut
ls -l rel_shortcut
# rel_shortcut -> Pictures/family_dog.jpg
```

This link stays valid under `/home/alex` as long as the relative tree is preserved.

## 5\. Linking Directories & Cross-Filesystem

Since symlinks store paths, you can reference directories and even across different filesystems:

```
ln -s /var/log logs_shortcut
ls -l logs_shortcut
# logs_shortcut -> /var/log
```

![The image is a diagram explaining soft links, showing how they can link to files and folders, including across different filesystems.](https://kodekloud.com/kk-media/image/upload/v1752881382/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Create-and-Change-Soft-Links/soft-links-diagram-files-folders.jpg)

## Further Reading

- [GNU ln manual](https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html)
- [readlink(1) Manual Page](https://man7.org/linux/man-pages/man1/readlink.1.html)
- Linux Filesystem Hierarchy: [Filesystem layout](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/de71b96a-9dc0-4e92-987a-6c7055c44e8b/lesson/4f82c772-77a6-468a-81bc-b99cab3372f3)**
>
> Watch video content
