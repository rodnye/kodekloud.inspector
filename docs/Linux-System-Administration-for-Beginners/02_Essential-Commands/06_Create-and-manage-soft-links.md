# Create and manage soft links - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Create-and-manage-soft-links)

---

## Table of Contents

- Create and manage soft links
  - Soft Links Explained
  - Creating a Symbolic Link
  - Verifying a Soft Link
  - Handling Permissions
  - Absolute vs. Relative Links
  - Linking Directories
  - Comparing Symbolic and Hard Links
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

Essential Commands

# Create and manage soft links

In this lesson, you’ll learn how Linux handles soft links (symbolic links), allowing you to reference files or directories from convenient locations without duplicating data.

## Soft Links Explained

When you install an application on Windows, you often get a desktop shortcut pointing to the actual program in `C:\Program Files\MyCoolApp\application.exe`. Double-clicking the shortcut launches the app even though its files reside elsewhere. A Linux soft link works the same way: it’s a special file containing the path to another file or directory.

![The image shows a diagram illustrating a soft link from a Brave browser icon to a file path "C:\Program Files\MyCoolApp\application.exe" with a browser window open in private mode.](https://kodekloud.com/kk-media/image/upload/v1752881471/notes-assets/images/Linux-System-Administration-for-Beginners-Create-and-manage-soft-links/brave-browser-soft-link-diagram.jpg)

## Creating a Symbolic Link

Use the `ln` command with the `-s` option:

```
ln -s <path_to_target> <path_to_link>
```

- `<path_to_target>`: the existing file or directory.
- `<path_to_link>`: name of the new symlink.

Example:

```
ln -s /home/aaron/Pictures/family_dog.jpg family_dog_shortcut.jpg
```

## Verifying a Soft Link

List files in long format to see symlinks marked with an `l` and showing their targets:

```
ls -l
# Output:
# lrwxrwxrwx. 1 aaron aaron 28 Jan 14 10:30 family_dog_shortcut.jpg -> /home/aaron/Pictures/family_dog.jpg
```

To display the stored path directly, use `readlink`:

```
readlink family_dog_shortcut.jpg
# /home/aaron/Pictures/family_dog.jpg
```

> [!important]
> **Note**
>
> Permissions on a symlink itself are always shown as `rwxrwxrwx`, but access is controlled by the target file’s permissions.

## Handling Permissions

If the target file is read-only, attempts to modify it via the symlink will fail:

```
echo "Test" >> fstab_shortcut
# bash: fstab_shortcut: Permission denied
```

## Absolute vs. Relative Links

Absolute paths embed the full directory tree, which can break if you move or rename parent directories:

> [!important]
> **Warning**
>
> Absolute symlinks may become invalid if you relocate or rename directories in the path.
> Use relative paths when moving link and target together.

From `/home/aaron`, create a relative link:

```
ln -s Pictures/family_dog.jpg relative_dog_shortcut.jpg
```

This link remains valid as long as you move both the `Pictures` directory and `relative_dog_shortcut.jpg` together.

## Linking Directories

You can create symlinks to directories—or even across filesystems (unlike hard links):

```
ln -s /mnt/data/projects my_projects_link
```

## Comparing Symbolic and Hard Links

| Feature                | Symbolic Link              | Hard Link                                        |
| ---------------------- | -------------------------- | ------------------------------------------------ |
| Can cross filesystems  | Yes                        | No                                               |
| Links to directories   | Yes (with `-s`)            | Typically no (restricted by OS)                  |
| Indicates broken link  | Yes                        | No (hard link always valid until target deleted) |
| Independent attributes | No (permissions inherited) | Shares same inode and attributes                 |

## Further Reading

- [ln(1) – manual page for ln](https://man7.org/linux/man-pages/man1/ln.1.html)
- [readlink(1) – manual page for readlink](https://man7.org/linux/man-pages/man1/readlink.1.html)
- [Linux Symbolic Links on Wikipedia](https://en.wikipedia.org/wiki/Symbolic_link)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/396169a0-709c-40c6-b930-bde83da7fde4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/3e166726-098f-4bba-9706-15470b44add4)**
>
> Practice lab
