# Manage File Permissions and Ownership - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Devices-Linux-Filesystems-Filesystem-Hierarchy-Standard/Manage-File-Permissions-and-Ownership)

---

## Table of Contents

- Manage File Permissions and Ownership
  - Inspect Current Ownership and Permissions
  - Viewing and Changing Group Ownership
  - Changing File Owner with chown
  - Understanding Permission Bits
  - Modifying Permissions with chmod
  - Numeric (Octal) Notation
  - Further Reading
  - Watch Video
    - Permission Effects
    - Adding Permissions
    - Removing Permissions
    - Setting Exact Permissions
    - Combining References
    - Setting Numeric Permissions

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Devices Linux Filesystems Filesystem Hierarchy Standard

# Manage File Permissions and Ownership

In this lesson, we’ll explore how to view and modify file permissions and ownership on a Linux system. You’ll learn to inspect permission bits, change owners and groups, and apply both symbolic and numeric modes with `chmod`, `chown`, and `chgrp`.

## Inspect Current Ownership and Permissions

Run `ls -l` to display the owner, group, and permission bits for files and directories:

```
$ ls -l
-rw-r----- 1 aaron family 49 Oct 27 14:41 family_dog.jpg
```

- **Owner**: `aaron`
- **Group**: `family`
- **Permissions**: `-rw-r-----`

Only the file owner or the superuser (`root`) can change these settings.

## Viewing and Changing Group Ownership

Use `chgrp` to assign a file or directory to a different group you belong to:

```
# Syntax: chgrp <group_name> <file_or_directory>
$ chgrp wheel family_dog.jpg
$ ls -l
-rw-r----- 1 aaron wheel 49 Oct 27 14:41 family_dog.jpg
```

Check your group memberships with:

```
$ groups
aaron wheel family
```

> [!important]
> **Note**
>
> You can only switch a file’s group to one you’re already a member of.

## Changing File Owner with chown

Only `root` can change file owners. Prefix with `sudo` if necessary:

```
# Syntax: sudo chown <user>[:<group>] <file_or_directory>
$ sudo chown jane family_dog.jpg
$ ls -l
-rw-r----- 1 jane wheel 49 Oct 27 14:41 family_dog.jpg


# Change both owner and group in one go:
$ sudo chown aaron:family family_dog.jpg
$ ls -l
-rw-r----- 1 aaron family 49 Oct 27 14:41 family_dog.jpg
```

## Understanding Permission Bits

The permissions string (`-rwxrwxrwx`) breaks down as:

- First character: file type
  - `-` = regular file
  - `d` = directory
  - `l` = symbolic link
- Next nine: three triplets for **owner**, **group**, and **others**, each with `r` (read), `w` (write), and `x` (execute).

![The image illustrates file and directory permissions in a Unix-like system, showing the permission string "rwxrwxrwx" for owner, group, and others, along with a key explaining the meaning of each permission bit.](https://kodekloud.com/kk-media/image/upload/v1752881384/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Manage-File-Permissions-and-Ownership/unix-file-directory-permissions-diagram.jpg)

### Permission Effects

- **Files**
  - `r`: view contents
  - `w`: modify contents
  - `x`: execute (scripts or binaries)
- **Directories**
  - `r`: list entries (`ls`)
  - `w`: create/delete entries
  - `x`: enter directory (`cd`)

## Modifying Permissions with chmod

Use the symbolic syntax:

```
chmod [ugoa][+-=][rwx] <file_or_directory>
```

| Reference | Meaning               |
| --------- | --------------------- |
| u         | owner (user)          |
| g         | group                 |
| o         | others                |
| a         | all (u, g, o)         |
| +         | add permissions       |
| \\-       | remove permissions    |
| \\=       | set exact permissions |

### Adding Permissions

Allow the owner to write:

```
$ ls -l
-r--r----- 1 aaron family 49 Oct 27 14:41 family_dog.jpg


$ chmod u+w family_dog.jpg
$ ls -l
-rw-r----- 1 aaron family 49 Oct 27 14:41 family_dog.jpg
```

### Removing Permissions

Remove the read bit for others:

```
$ chmod o-r family_dog.jpg
$ ls -l
-rw-r----- 1 aaron family 49 Oct 27 14:41 family_dog.jpg
```

![The image shows a guide on removing permissions in a command-line interface, with examples for users, groups, and others. It includes options like `u-`, `g-`, and `o-` with examples such as `u-w`, `g-rw`, and `o-rwx`.](https://kodekloud.com/kk-media/image/upload/v1752881385/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Manage-File-Permissions-and-Ownership/remove-permissions-command-line-guide.jpg)

### Setting Exact Permissions

Grant group read-only:

```
$ chmod g=r family_dog.jpg
$ ls -l
-rw-r----- 1 aaron family 49 Oct 27 14:41 family_dog.jpg


$ chmod g=rw family_dog.jpg
$ ls -l
-rw-rw---- 1 aaron family 49 Oct 27 14:41 family_dog.jpg
```

### Combining References

You can comma-separate multiple adjustments:

```
$ ls -l
-rw-r--r-- 1 appuser appuser 49 Oct 27 14:41 family.jpg


# Owner read/write, group read, others none
$ chmod u=rw,g=r,o= family.jpg
$ ls -l
-rw-r----- 1 appuser appuser 49 Oct 27 14:41 family.jpg


# Mix add/remove in one command
$ chmod u+rw,g-w family_dog.jpg
```

## Numeric (Octal) Notation

To inspect the octal value, use `stat`:

```
$ stat family_dog.jpg
  Access: (0640/-rw-r-----)  Uid: ( 1000/aaron)   Gid: (   10/family)
```

Here **owner** has `rw-` (6), **group** has `r--` (4), **others** have `---` (0) → mode `640`.

![The image illustrates octal file permissions, showing the conversion between symbolic, binary, and decimal representations. It includes examples of permissions like "rw-r--r--" and "rwxr-xr-x" with their corresponding binary and decimal values.](https://kodekloud.com/kk-media/image/upload/v1752881386/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Manage-File-Permissions-and-Ownership/octal-file-permissions-symbolic-binary.jpg)

Alternatively, assign values: `r=4`, `w=2`, `x=1`:

- `rwx` = 4+2+1 = 7
- `r-x` = 4+0+1 = 5
- `r--` = 4+0+0 = 4

![The image explains octal permissions in a Unix-like system, showing how the permissions "rw-r-----" translate to the octal value "640". It also provides a key for permission values: read (r) is 4, write (w) is 2, and execute (x) is 1.](https://kodekloud.com/kk-media/image/upload/v1752881386/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Manage-File-Permissions-and-Ownership/octal-permissions-unix-diagram-640.jpg)

### Setting Numeric Permissions

```
$ chmod 755 family_dog.jpg  # rwxr-xr-x
$ chmod 640 family_dog.jpg  # rw-r-----
```

## Further Reading

- [Linux File Permissions – Official Documentation](https://www.kernel.org/doc/html/latest/filesystems/permissions.html)
- [chmod Command Tutorial](https://linux.die.net/man/1/chmod)
- [chown and chgrp Usage](https://linux.die.net/man/1/chown)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/de71b96a-9dc0-4e92-987a-6c7055c44e8b/lesson/f4992ea9-7155-41cd-a174-9fbebcdc4ccf)**
>
> Watch video content
