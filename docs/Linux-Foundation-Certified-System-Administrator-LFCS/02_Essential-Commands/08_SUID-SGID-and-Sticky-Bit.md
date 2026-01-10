# SUID SGID and Sticky Bit - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/SUID-SGID-and-Sticky-Bit)

---

## Table of Contents

- SUID SGID and Sticky Bit
  - SUID (Set User ID)
  - SGID (Set Group ID)
  - Combining SUID and SGID
  - Sticky Bit
  - Conclusion
  - Watch Video
    - Demonstration of SUID
    - Demonstration of SGID
    - Demonstration of the Sticky Bit

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# SUID SGID and Sticky Bit

In Unix/Linux systems, managing permissions is critical to maintaining security and efficient resource access. In this article, we explore three special permissions—SUID, SGID, and the Sticky Bit—that allow controlled elevation of privileges and help manage collaborative environments.

> [!important]
> **Overview**
>
> Understanding these permissions ensures that applications can safely operate with elevated privileges without compromising system integrity.

## SUID (Set User ID)

SUID is a permission that, when applied to an executable file, enables the process to run with the file owner's privileges instead of those of the user who launched it. This feature is particularly useful when an application requires access to restricted resources. For example, if Emily develops a reports application that needs to access files under `/usr/local/reports`, she can allow John to run the application without granting him unfettered access to her directory.

![The image illustrates the concept of SUID, showing how users Emily and John can run an executable called "filereports" with the permissions of the executable's owner, allowing access to a directory at "/usr/local/reports."](https://kodekloud.com/kk-media/image/upload/v1752881267/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-SUID-SGID-and-Sticky-Bit/suid-executable-permissions-users.jpg)

### Demonstration of SUID

Below is a step-by-step demonstration of setting and verifying the SUID bit:

```
# Create the test file
touch suidfile


# Check default permissions
ls -l suidfile
# Output: -rw-rw-r--  1 jeremy jeremy 0 May 8 01:22 suidfile
```

To set the SUID bit, which is represented by a leading digit of 4 in the permission mode, execute:

```
chmod 4664 suidfile
ls -l suidfile
```

Notice that the execute bit for the owner may be displayed as a capital "S" when it is not enabled. Including the execute permission (for example, using `4764`) will show a lowercase "s" instead.

## SGID (Set Group ID)

SGID works similarly to SUID but applies to the group ownership of an executable or directory. For executables, SGID allows any user running the file to do so with the file's group privileges. When applied to a directory, any new file or directory created inherits the group's ownership, which is invaluable for collaborative work environments.

For instance, if a reports application is associated with the reports group, both Emily and John can access executable files, and newly created files inside the directory will automatically inherit the reports group.

![The image illustrates the concept of SGID (Set Group ID) permissions, showing how it applies to both executables and directories, with two users accessing a file within a directory.](https://kodekloud.com/kk-media/image/upload/v1752881269/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-SUID-SGID-and-Sticky-Bit/sgid-permissions-executables-directories.jpg)

### Demonstration of SGID

Follow these simple steps to set the SGID bit on a file:

```
# Create the file
touch sgidfile


# Check the default file permissions
ls -l sgidfile
# Expected output: -rw-rw-r-- 1 jeremy jeremy 0 May 8 01:25 sgidfile
```

To set SGID without granting execute permissions for the group:

```
chmod 2664 sgidfile
ls -l sgidfile
```

If the execute permission is also required (thus displaying a lowercase "s"), use:

```
chmod 2674 sgidfile
ls -l sgidfile
```

## Combining SUID and SGID

Combining SUID and SGID on a single file is straightforward. Since SUID is represented by 4 and SGID by 2, the combined digit is 6. For example, to apply both on a file called `both`:

```
touch both
chmod 6664 both
ls -l both
```

To efficiently locate files using these special permissions, use the `find` command:

```
# Find files with the SUID bit set
find . -perm /4000


# Find files with the SGID bit set
find . -perm /2000


# Find files with either SUID or SGID (or both) set
find . -perm /6000
```

## Sticky Bit

The Sticky Bit is a special permission applied primarily to directories to control file deletion. When set, it restricts file deletion within the directory so that only the file owner, the directory owner, or the superuser can delete or rename files. This is especially beneficial for shared directories where multiple users have write access but should not be able to remove files created by others.

### Demonstration of the Sticky Bit

Creating a directory with a Sticky Bit is illustrated below:

```
# Set the Sticky Bit using a shorthand command
chmod 1777 stickydir/
ls -ld stickydir/
# Expected output: drwxrwxrwt 2 jeremy jeremy 4096 May 8 01:29 stickydir/
```

In the permission output, a lowercase "t" signifies that the Sticky Bit is active along with the execute permission. If the execute permission is revoked (for example, by setting mode `1666`), the indicator changes to an uppercase "T":

```
chmod 1666 stickydir/
ls -ld stickydir/
```

> [!important]
> **Interpreting the Sticky Bit**
>
> A lowercase "t" denotes that the Sticky Bit is set and execute permission is enabled, while an uppercase "T" indicates that only the Sticky Bit is set.

## Conclusion

Understanding and properly configuring SUID, SGID, and the Sticky Bit is crucial for managing permissions in Unix/Linux environments. With SUID, programs can execute with the file owner's privileges; SGID facilitates group-controlled execution and inheritance; and the Sticky Bit secures shared directories against unauthorized file deletions.

By leveraging these permissions, system administrators can implement controlled privilege escalations while ensuring robust security. For further reading, check out the [Kubernetes Documentation](https://kubernetes.io/docs/) and explore how secure permissions integrate within broader system management practices.

Happy experimenting, and enjoy the power of controlled permission management!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/372c66a1-2a08-464f-b936-d3c0a13c3755)**
>
> Watch video content
