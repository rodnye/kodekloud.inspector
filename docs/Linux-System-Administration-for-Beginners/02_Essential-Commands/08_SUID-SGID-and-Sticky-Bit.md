# SUID SGID and Sticky Bit - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/SUID-SGID-and-Sticky-Bit)

---

## Table of Contents

- SUID SGID and Sticky Bit
  - What Are Special Permission Bits?
  - 1. Set User ID (SUID)
  - 2. Set Group ID (SGID)
  - 3. Finding SUID/SGID Files
  - 4. Sticky Bit on Directories
  - Links and References
  - Watch Video
    - Step-by-Step
    - Step-by-Step
    - Step-by-Step

---

## Content

Linux System Administration for Beginners

Essential Commands

# SUID SGID and Sticky Bit

In Linux, special permission bits—SUID, SGID, and the sticky bit—modify how executables and directories behave for different users and groups. Mastering these bits is essential for secure system administration and proper access control.

## What Are Special Permission Bits?

- **SUID (Set User ID)**  
  Runs an executable with the file owner’s user ID.
- **SGID (Set Group ID)**  
  Runs an executable with the owning group’s privileges.
- **Sticky Bit**  
  Restricts deletion of files in shared directories to the file owner or root.

| Octal Prefix | Permission Bit | Effect                             |
| ------------ | -------------- | ---------------------------------- |
| 4xxx         | SUID           | Execute file as file owner         |
| 2xxx         | SGID           | Execute file as file’s group owner |
| 1xxx         | Sticky Bit     | Restrict deletion in directories   |

---

## 1\. Set User ID (SUID)

When SUID is set on an executable, the process runs with the file owner’s privileges. Common use cases include `su`, `passwd`, and other administrative tools.

### Step-by-Step

1.  Create a test file and view its default permissions:

    ```
    touch suidfile
    ls -l suidfile
    # -rw-rw-r--. 1 aaron aaron 0 Apr 26 05:08 suidfile
    ```

2.  Enable SUID without execute for the owner (octal `4664`):

    ```
    chmod 4664 suidfile
    ls -l suidfile
    # -rwSrw-r--. 1 aaron aaron 0 Apr 26 05:08 suidfile
    ```

    > [!important]
    > **Note**
    >
    > The uppercase `S` indicates SUID is set but the owner’s execute bit is **not** enabled.

3.  Grant both execute and SUID for the owner (octal `4764`):

    ```
    chmod 4764 suidfile
    ls -l suidfile
    # -rwsrwxr--. 1 aaron aaron 0 Apr 26 05:08 suidfile
    ```

    The lowercase `s` shows both SUID and execute bits are active.

> [!important]
> **Warning**
>
> Carefully review which binaries receive the SUID bit. Misconfigured SUID files can introduce security vulnerabilities.

---

## 2\. Set Group ID (SGID)

SGID works similarly to SUID but applies to group privileges.

### Step-by-Step

1.  Create a test file and inspect permissions:

    ```
    touch sgidfile
    ls -l sgidfile
    # -rw-rw-r--. 1 aaron aaron 0 Apr 26 05:11 sgidfile
    ```

2.  Set SGID without group execute (octal `2664`):

    ```
    chmod 2664 sgidfile
    ls -l sgidfile
    # -rw-rwSr--. 1 aaron aaron 0 Apr 26 05:11 sgidfile
    ```

    - Uppercase `S` in the group’s execute position shows SGID is set but no execute.

3.  Add both group execute and SGID (octal `2764`):

    ```
    chmod 2764 sgidfile
    ls -l sgidfile
    # -rw-rwsr--. 1 aaron aaron 0 Apr 26 05:11 sgidfile
    ```

    - Lowercase `s` indicates SGID and execute bits are set for the group.

---

## 3\. Finding SUID/SGID Files

Quickly locate files with SUID or SGID bits:

```
# Find all SUID files
find / -perm /4000

# Find all SGID files
find / -perm /2000

# Find files with either SUID or SGID (or both)
find / -perm /6000
```

---

## 4\. Sticky Bit on Directories

The sticky bit ensures that only the file owner (or root) can delete or rename files within a shared directory.

### Step-by-Step

1.  Create a directory and view its default permissions:

    ```
    mkdir stickydir
    ls -ld stickydir
    # drwxrwxr-x. 2 aaron aaron 6 Apr 26 05:14 stickydir
    ```

2.  Set the sticky bit with execute (octal `1777`):

    ```
    chmod 1777 stickydir
    ls -ld stickydir
    # drwxrwxr-t. 2 aaron aaron 6 Apr 26 05:14 stickydir
    ```

    - The lowercase `t` shows both execute and sticky bits are set.

3.  Demonstrate sticky without execute (octal `1666`):

    ```
    chmod 1666 stickydir
    ls -ld stickydir
    # drw-rw-rwT. 2 aaron aaron 6 Apr 26 05:14 stickydir
    ```

    - Uppercase `T` indicates sticky is set but execute is not.

---

## Links and References

- [Linux File Permissions](https://www.kernel.org/doc/html/latest/filesystems/permissions.html)
- [chmod Manual Page](https://man7.org/linux/man-pages/man1/chmod.1.html)
- [Understanding Linux File System Permissions](https://www.redhat.com/en/topics/linux/what-is-linux-file-permissions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/6c86d57f-0864-4e96-b7cf-4a0bad7fba25)**
>
> Watch video content
