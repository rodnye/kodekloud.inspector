# SUID SGID and sticky bit - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/SUID-SGID-and-sticky-bit)

---

## Table of Contents

- SUID SGID and sticky bit
  - Set User ID (SUID)
  - Set Group ID (SGID)
  - Finding Files with SUID and SGID
  - The Sticky Bit
  - Watch Video
    - Example: Setting SUID
    - Example: Setting SGID
    - Examples:
    - Example: Setting the Sticky Bit on a Directory

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# SUID SGID and sticky bit

Welcome to this comprehensive guide on SUID, SGID, and Sticky Bit permissions. In this article, we explain each special permission, demonstrate how to set them, and show how to verify their status using practical examples. These advanced permission settings are essential for managing command privileges and shared directory access in Linux systems.

---

## Set User ID (SUID)

The Set User ID (SUID) bit enables an executable file to run with the privileges of its owner rather than those of the executing user. This feature is critical for commands like `su` or `passwd` that require elevated privileges.

> [!important]
> **SUID Functionality**
>
> When the SUID bit is set on an executable without the owner’s execute permission, it is displayed as a capital `S`. If the owner’s execute bit is also present, it appears as a lowercase `s`.

### Example: Setting SUID

1.  Create a test file named `suidfile` and view its default permissions:

    ```
    [aaron@LFCS-CentOS suiddemo]$ touch suidfile
    [aaron@LFCS-CentOS suiddemo]$ ls -l suidfile
    -rw-rw-r--. 1 aaron aaron 0 Apr 26 05:08 suidfile
    ```

2.  Set the SUID bit using the `chmod` command with a four-digit octal number. For instance, `4664` sets the SUID bit along with standard permissions `664`:

    ```
    [aaron@LFCS-CentOS suiddemo]$ chmod 4664 suidfile
    [aaron@LFCS-CentOS suiddemo]$ ls -l suidfile
    -rwSr--r--. 1 aaron aaron 0 Apr 26 05:08 suidfile
    ```

3.  To include the owner’s execute permission (displayed as lowercase `s`), use `chmod 4764`:

    ```
    [aaron@LFCS-CentOS suiddemo]$ chmod 4764 suidfile
    [aaron@LFCS-CentOS suiddemo]$ ls -l suidfile
    -rwsr--r--. 1 aaron aaron 0 Apr 26 05:08 suidfile
    ```

---

## Set Group ID (SGID)

The Set Group ID (SGID) bit works similarly to SUID but affects the group ownership. When set, the file is executed with the group privileges that own the file instead of those of the executing user.

### Example: Setting SGID

1.  Create a file named `sgidfile` and inspect its default permissions:

    ```
    [aaron@LFCS-CentOS suiddemo]$ touch sgidfile
    [aaron@LFCS-CentOS suiddemo]$ ls -l sgidfile
    -rw-rw-r--. 1 aaron aaron 0 Apr 26 05:11 sgidfile
    ```

2.  Set the SGID bit by using a leading digit of `2`. For example, running:

    ```
    [aaron@LFCS-CentOS suiddemo]$ chmod 2664 sgidfile
    [aaron@LFCS-CentOS suiddemo]$ ls -l sgidfile
    -rw-rwSr--. 1 aaron aaron 0 Apr 26 05:11 sgidfile
    ```

    Notice the capital `S` in the group's execute position indicating that the SGID bit is set without execute permission.

3.  To enable execute permission as well, use `chmod 2674`:

    ```
    [aaron@LFCS-CentOS suiddemo]$ chmod 2674 sgidfile
    [aaron@LFCS-CentOS suiddemo]$ ls -l sgidfile
    -rw-rwsr--. 1 aaron aaron 0 Apr 26 05:11 sgidfile
    ```

---

## Finding Files with SUID and SGID

Locating files that have SUID or SGID bits set can be done with the `find` command and the `-perm` option.

### Examples:

- **Finding Files with SUID Set:**

  ```
  [aaron@LFCS-CentOS suiddemo]$ find . -perm /4000
  ./suidfile
  ```

- **Finding Files with SGID Set:**

  ```
  [aaron@LFCS-CentOS suiddemo]$ find . -perm /2000
  ```

Additionally, to find files that have either or both of these permissions, combine their values. For example, if a file is set with both SUID and SGID using `chmod 6664` (where 4+2=6), you can search with `/6000`:

```
[aaron@LFCS-CentOS suiddemo]$ touch both
[aaron@LFCS-CentOS suiddemo]$ chmod 6664 both
[aaron@LFCS-CentOS suiddemo]$ ls -l both
-rwSrwSr--. 1 aaron aaron 0 Apr 26 05:13 both
```

---

## The Sticky Bit

The sticky bit is primarily used on directories shared by multiple users. It restricts file deletion or renaming so that only the file owner (and the root user) can perform these actions, regardless of the directory's write permissions.

### Example: Setting the Sticky Bit on a Directory

1.  Create a directory named `stickydir` and check its permissions:

    ```
    [aaron@LFCS-CentOS suiddemo]$ mkdir stickydir
    [aaron@LFCS-CentOS suiddemo]$ ls -ld stickydir
    drwxrwxr-x. 2 aaron aaron 6 Apr 26 05:14 stickydir
    ```

2.  Set the sticky bit using either symbolic mode (`+t`) or octal notation. With `1777`, the sticky bit is set on a directory with `777` permissions:

    ```
    [aaron@LFCS-CentOS suiddemo]$ chmod 1777 stickydir
    [aaron@LFCS-CentOS suiddemo]$ ls -ld stickydir
    drwxrwxrwt. 2 aaron aaron 6 Apr 26 05:14 stickydir
    ```

3.  If the execute permission is removed (for example, with `chmod 1666`), the sticky bit remains set but will display as uppercase `T`:

    ```
    [aaron@LFCS-CentOS suiddemo]$ chmod 1666 stickydir
    [aaron@LFCS-CentOS suiddemo]$ ls -ld stickydir
    drw-rw-rwT. 2 aaron aaron 6 Apr 26 05:14 stickydir
    ```

---

This guide has provided detailed instructions on setting and verifying SUID, SGID, and Sticky Bit permissions in Linux systems. Mastery of these permission settings is crucial for secure system administration and file management. For further reading on managing file permissions and Linux security best practices, consider exploring additional [Linux Documentation](https://www.kernel.org/doc/html/latest/).

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/8f91e3d1-253c-4674-a710-d85487eee932)**
>
> Watch video content
