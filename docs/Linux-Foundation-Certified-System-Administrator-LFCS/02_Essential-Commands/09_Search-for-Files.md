# Search for Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Search-for-Files)

---

## Table of Contents

- Search for Files
  - Finding Specific File Types
  - Searching by File Size
  - Searching by Modification Time
  - Basic Usage
  - Detailed Search Parameters
  - Summary
  - Watch Video
  - Practice Lab
    - Case Sensitivity
    - Wildcard Patterns
    - Time-Based Searches
    - Change Time Versus Modification Time
    - Size-Based Searches
    - Combining Multiple Parameters
    - Negation in Searches
    - Permission-Based Searches

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Search for Files

In this article, we explore various strategies to search for files in Linux using the versatile `find` command. Linux systems typically organize files in a structured manner—for example, SSH configuration files are usually found in `/etc/ssh`, while log files are maintained in `/var/log`. Even if you often know the file location, search commands can be invaluable for unexpected cases and complex queries.

Let's dive into some common scenarios.

## Finding Specific File Types

Imagine you have a website and need to find all JPEG images stored in `/usr/share`. The `find` command can easily list all files ending in `.jpg`:

![The image shows a directory structure diagram with a root directory containing subdirectories: usr, var, and etc, each with further subdirectories like share, log, and ssh.](https://kodekloud.com/kk-media/image/upload/v1752881269/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Search-for-Files/directory-structure-root-usr-var-etc.jpg)

```
$ find /usr/share/ -name '*.jpg'
1.jpg 2.jpg 3.jpg
```

## Searching by File Size

In another scenario, if your server hosting virtual machines is nearly out of disk space, you might need to identify unusually large files. Although this example does not contain files larger than 20 GB, you can modify the search to find files over a specified size. For example, to search for files larger than 10 megabytes in `/lib64`:

```
$ find /lib64/ -size +10M
large-file.txt
```

## Searching by Modification Time

When you update an application, you might want to identify which files were modified in the last minute. You can use the `-mmin` flag to achieve this:

```
$ find /dev/ -mmin -1
abc.txt
```

Using the `find` command in these examples shows how powerful it is for locating files based on a variety of parameters.

## Basic Usage

To search for a file by name within a specific directory, use the `-name` parameter. For example:

```
$ find /bin -name file1.txt
```

If no path is specified, `find` defaults to searching in the current directory. Always place the search path before the search parameters. An incorrect command such as:

```
$ find -name file1.txt /bin
```

may yield unexpected results. Think of it like entering your room before looking for your keys.

> [!important]
> **Tip**
>
> Always specify the search path before your parameters to ensure accurate search results.

## Detailed Search Parameters

### Case Sensitivity

The `-name` option is case sensitive. For example, searching for "felix" will not match a file named "Felix". Use `-iname` for a case-insensitive search:

```
$ find -name felix
$ find -iname felix
```

### Wildcard Patterns

Wildcards let you search for files matching a particular pattern. To find all files that begin with a lowercase "f":

```
$ find -name "f*"
```

The asterisk (\*) acts as a wildcard matching zero or more characters.

### Time-Based Searches

Search for files based on their modification time using the `-mmin` option, which is measured in minutes. Examples include:

- `-mmin 5`: Finds files modified exactly 5 minutes ago.
- `-mmin -5`: Finds files modified in the last 5 minutes.
- `-mmin +5`: Finds files modified more than 5 minutes ago.

Be aware that if it is currently 12:05, `-mmin 5` targets files modified at 12:01. To include files modified at 12:00, use `-mmin +5`.

For searches based on days, the `-mtime` option is used. For instance:

```
$ find -mtime 2
```

- `-mtime 0` matches files modified in the last 24 hours.
- `-mtime 1` matches files modified between 24 and 48 hours ago.

> [!important]
> **Important**
>
> File modification time measures content changes, not the file creation time.

### Change Time Versus Modification Time

Linux differentiates between modification time (when file contents change) and change time (when file metadata, such as permissions, are altered). The `find` command can help locate files that recently had their metadata changed—a useful feature if you're troubleshooting permission issues.

### Size-Based Searches

To search for files based on file size, the `-size` option is used. For example, to find files that are exactly 512 KB:

```
$ find -size 512k
```

Here, suffixes indicate the following:

- No suffix: bytes
- K: kilobytes
- M: megabytes
- G: gigabytes (note that M and G must be uppercase)

To search for files greater than or less than a specific size, prefix the size with a `+` or `-` sign respectively:

```
$ find -size +512k  # Files greater than 512 KB
$ find -size -512k  # Files less than 512 KB
```

### Combining Multiple Parameters

You can combine multiple parameters to narrow your search. For example, to find files that start with the letter "f" and are exactly 512 KB:

```
$ find -name "f*" -size 512k
```

The parameters are combined using an implicit AND operator. To use an OR operator, you can insert `-o` between conditions.

### Negation in Searches

To exclude files that meet a certain condition, use the NOT operator (`-not` or `\!`). For instance, to find all files that do not start with the letter "f":

```
$ find -not -name "f*"
$ find \! -name "f*"
```

> [!important]
> **Attention**
>
> Remember that in the Bash shell, the exclamation mark (!) has a special meaning. Escaping it with a backslash (i.e., `\!`) ensures it is interpreted literally.

### Permission-Based Searches

The `-perm` option lets you search for files based on their file permissions. For example, to find files with exactly 664 permissions (user: read/write, group: read/write, others: read):

```
$ find -perm 664  # Exact match for 664 permissions
```

To find files that have at least these permissions, precede the value with a hyphen:

```
$ find -perm -664
```

Alternatively, use a slash (`/`) to match any of the listed permissions:

```
$ find -perm /664
```

Here are a few more examples:

- To find files that only the owner can read and write (600):

  ```
  $ find -perm 600
  ```

- To locate files where the owner has at least execute permission:

  ```
  $ find -perm -100
  ```

- To find files that others are not allowed to read:

  ```
  $ find \! -perm -o=r
  ```

Files that cannot be read by anyone will be excluded from the search results.

## Summary

The `find` command is a powerful tool for locating files based on various criteria such as name, size, modification time, and permissions. By understanding and combining these search parameters, you can efficiently manage and troubleshoot your Linux system.

For more in-depth information, refer to the following documentation:

- [Linux find Command Documentation](https://linux.die.net/man/1/find)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/6627d7fe-6e6e-4ff1-879f-ce88e3847aa8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/9c5c2d7e-c91f-4ccc-95a8-7c7a8dbe079f)**
>
> Practice lab
