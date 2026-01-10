# Create Delete Copy and Move Files and Directories - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Create-Delete-Copy-and-Move-Files-and-Directories)

---

## Table of Contents

- Create Delete Copy and Move Files and Directories
  - Listing Files and Directories with ls
  - Understanding the Linux File System Tree
  - Creating Files and Directories
  - Copying Files and Directories with cp
  - Moving and Renaming with mv
  - Deleting Files and Directories with rm
  - References
  - Watch Video
    - Common ls Usage
    - Absolute Path
    - Relative Path
    - Copying a Single File
    - Copying Directories Recursively
      - Basic Listing
      - Including Hidden Files
      - Detailed, Human-Readable Output

---

## Content

Linux System Administration for Beginners

Essential Commands

# Create Delete Copy and Move Files and Directories

Managing files and directories is a foundational skill for any Linux user or administrator. In this guide, you’ll learn how to list, create, copy, move (or rename), and delete files and directories using core commands like `ls`, `touch`, `mkdir`, `cp`, `mv`, and `rm`.

## Listing Files and Directories with `ls`

The `ls` (list) command displays directory contents. By default, hidden files (those beginning with `.`) are not shown.

### Common `ls` Usage

| Flag   | Description                              | Example          |
| ------ | ---------------------------------------- | ---------------- |
| (none) | Show non-hidden items                    | `ls`             |
| `-a`   | Include all entries, including `.` files | `ls -a`          |
| `-l`   | Long format (permissions, owner, size)   | `ls -l /var/log` |
| `-h`   | Human-readable sizes (use with `-l`)     | `ls -lh`         |
| `-alh` | Combine all flags                        | `ls -alh`        |

#### Basic Listing

```
$ ls
Desktop  Documents  Downloads  Music  Pictures  Videos
```

#### Including Hidden Files

```
$ ls -a
.   ..   .bashrc   .ssh   Desktop   Documents   Downloads   Music   Pictures   Videos
```

#### Detailed, Human-Readable Output

```
$ ls -alh
total 76K
drwx------. 16 aaron aaron 4.0K Nov  1 17:57 .
drwxr-xr-x.  7 root  root  4.0K Oct 26 16:54 ..
-rw-------   1 aaron aaron 5.0K Nov  1 17:56 .bash_history
...
```

## Understanding the Linux File System Tree

Linux files and directories form an inverted tree with `/` as the root. Every path you use is either absolute (from `/`) or relative (from your current directory).

- `/`
  - `/home`
    - `/home/aaron`
      - `/home/aaron/Documents`
      - `/home/aaron/Downloads`
  - `/var`
  - `/etc`

> [!important]
> **Absolute vs. Relative Paths**
>
> Absolute paths start with `/` and always refer to the same location.
> Relative paths begin from your current directory (check with `pwd`).

### Absolute Path

```
/home/aaron/Documents/invoice.pdf
```

### Relative Path

```
$ pwd
/home/aaron


# From /home/aaron, this goes to invoice.pdf inside Documents
$ cd Documents
$ ls invoice.pdf
```

To move up one level:

```
$ cd ..
```

Jump to your home directory:

```
$ cd
$ pwd
/home/aaron
```

![The image shows a directory structure with a command line interface on the left. The directory tree includes folders like "home," "var," and "root," with a file named "Invoice.pdf" under "aaron/Documents."](https://kodekloud.com/kk-media/image/upload/v1752881468/notes-assets/images/Linux-System-Administration-for-Beginners-Create-Delete-Copy-and-Move-Files-and-Directories/directory-structure-command-line-invoice.jpg)

## Creating Files and Directories

- Create an empty file:

  ```
  $ touch receipt.pdf
  ```

- Create a directory:

  ```
  $ mkdir receipts
  ```

Both commands accept absolute or relative paths:

```
$ mkdir /home/aaron/new_folder
```

## Copying Files and Directories with `cp`

Use `cp` to duplicate files and directories.

### Copying a Single File

```
$ cp receipt.pdf receipts/
```

To copy and rename at the same time:

```
$ cp receipt.pdf receipts/receipt_backup.pdf
```

![The image shows a file directory structure with a command line interface on the left. The directory path includes folders named "home," "aaron," and "Receipts," leading to a file named "Receipt.pdf."](https://kodekloud.com/kk-media/image/upload/v1752881469/notes-assets/images/Linux-System-Administration-for-Beginners-Create-Delete-Copy-and-Move-Files-and-Directories/file-directory-structure-command-line.jpg)

### Copying Directories Recursively

```
$ cp -r Receipts/ BackupOfReceipts/
```

This duplicates the entire `Receipts` folder and its contents into `BackupOfReceipts`. Ensure the destination name does not already exist to avoid nesting.

## Moving and Renaming with `mv`

The `mv` command handles both moving and renaming:

- Move a file:

  ```
  $ mv receipt.pdf receipts/
  ```

- Rename a file:

  ```
  $ mv receipt.pdf old_receipt.pdf
  ```

- Rename or move a directory:

  ```
  $ mv receipts/ old_receipts/
  ```

No recursive flag is needed for directories; `mv` automatically moves contents.

## Deleting Files and Directories with `rm`

Use caution when removing files and directories:

- Remove a file:

  ```
  $ rm invoice.pdf
  ```

- Remove a non-empty directory:

  ```
  $ rm -r invoices/
  ```

> [!important]
> **Warning**
>
> The `rm -r` command permanently deletes directories and their contents. Always double-check the path before pressing Enter!

---

## References

- [Linux Man Pages](https://www.kernel.org/doc/man-pages/)
- [GNU coreutils Documentation](https://www.gnu.org/software/coreutils/)
- [Introduction to Linux File System](https://en.wikipedia.org/wiki/File_system#Unix_and_Unix-like_systems)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/8ab7329a-f096-4f27-99a5-e7d94c813bce)**
>
> Watch video content
