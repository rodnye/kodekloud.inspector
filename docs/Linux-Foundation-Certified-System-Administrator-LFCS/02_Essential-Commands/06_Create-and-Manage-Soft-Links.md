# Create and Manage Soft Links - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Create-and-Manage-Soft-Links)

---

## Table of Contents

- Create and Manage Soft Links
  - Watch Video
  - Practice Lab

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Create and Manage Soft Links

In this article, we explore how Linux handles soft links (also known as symbolic links). Soft links in Linux work similarly to the shortcuts you might find on a Windows desktop. For instance, when you install a program on Windows, a shortcut is added to your desktop that points to the actual executable stored elsewhere (such as "C:\\Program Files\\MyCoolApp\\application.exe"). When you double-click the shortcut, it launches the program even though the executable is not directly stored on your desktop.

```
C:\Program Files\MyCoolApp\application.exe
```

Unlike hard links, which directly reference an inode, soft links are files that contain a path to another file or directory. Essentially, they are text files holding the address where the target file or directory is located.

To create a soft link, you add the `-s` option to the `ln` command. The basic syntax is:

```
# ln -s path_to_target_file path_to_link_file
```

- "path_to_target_file" is the location of the file or directory that the soft link will reference.
- "path_to_link_file" is the name (and optionally, the location) of the new soft link.

For example, to create a symbolic link for a family dog picture, use the following commands:

```
$ ln -s /home/aaron/Pictures/family_dog.jpg family_dog_shortcut.jpg
$ ls -l
lrwxrwxrwx. 1 aaron aaron family_dog_shortcut.jpg -> /home/aaron/Pictures/family_dog.jpg
```

In the output of `ls -l`, the leading "l" indicates that the file is a soft link. It also displays the path that the soft link points to. If the target path is lengthy, `ls -l` might not show the entire path. In these cases, you can use the `readlink` command to view the complete link destination:

```
$ readlink family_dog_shortcut.jpg
/home/aaron/Pictures/family_dog.jpg
```

> [!important]
> **Note**
>
> Although the soft link appears to have full permission bits (rwx), these permissions are not actually enforced. Instead, the permissions of the destination file or directory determine access rights.

For example, if you attempt to redirect output to a soft link that points to a protected file (such as `/etc/fstab`), the operation will be denied:

```
$ ln -s /home/aaron/Pictures/family_dog.jpg family_dog_shortcut.jpg
$ ls -l
lrwxrwxrwx. 1 aaron aaron family_dog_shortcut.jpg -> /home/aaron/Pictures/family_dog.jpg
$ readlink family_dog_shortcut.jpg
/home/aaron/Pictures/family_dog.jpg
$ echo "Test" >> fstab_shortcut
bash: fstab_shortcut: Permission denied
```

Using an absolute path in a soft link (e.g., `/home/aaron/Pictures/family_dog.jpg`) means that if the directory name (like "aaron") changes in the future, the link will break. A broken link is typically displayed in red when you use `ls -l`.

To prevent this issue, consider creating a soft link with a relative path if you are working within the same directory structure. This method ensures that when the soft link is accessed, it correctly redirects to the intended file relative to the current directory.

Soft links can also be created for directories or for files and directories located on different file systems.

![The image is a diagram explaining soft links, showing how they can link to files and folders, including across different filesystems. It includes visual representations of files and folders with arrows indicating the links.](https://kodekloud.com/kk-media/image/upload/v1752881236/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Create-and-Manage-Soft-Links/soft-links-diagram-files-folders.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/a4c5ddb8-e9dc-41f4-865c-51f49e995f33)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/495e559c-1315-45d4-9f65-48c4cdf39d15)**
>
> Practice lab
