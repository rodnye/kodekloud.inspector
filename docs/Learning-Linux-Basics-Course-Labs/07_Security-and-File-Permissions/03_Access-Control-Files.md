# Access Control Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Security-and-File-Permissions/Access-Control-Files)

---

## Table of Contents

- Access Control Files
  - The /etc/passwd File
  - The /etc/shadow File
  - The /etc/group File
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Security and File Permissions

# Access Control Files

In this article, we explore key Linux access control files that are essential for maintaining system security and managing user access. Located under the /etc directory, these files include:

- /etc/passwd for user account details
- /etc/shadow for secure password storage and password expiry information
- /etc/group for managing group memberships

> [!important]
> **Important**
>
> Always use built-in commands to modify these files rather than editing them directly with a text editor.

Although the /etc directory is world-readable by default, only the root user has permission to make modifications.

---

## The /etc/passwd File

The `/etc/passwd` file contains vital information about each user on the system. It includes data such as the username, user ID (UID), group ID (GID), home directory, and the default shell. Note that this file does not store actual passwords; an `x` is present in the password field to indicate that encrypted passwords are located in the `/etc/shadow` file.

For example, the following command retrieves Bob's entry:

```
[~]$ grep -i ^bob /etc/passwd
bob:x:1001:1001::/home/bob:/bin/bash
```

The structure of `/etc/passwd` is summarized as follows:

```
USERNAME:PASSWORD:UID:GID:GECOS:HOMEDIR:SHELL
```

Where:

- **USERNAME:** The user's login name.
- **PASSWORD:** An `x` placeholder, indicating that the encrypted password is stored in `/etc/shadow`.
- **UID:** The unique numeric user identifier.
- **GID:** The primary group numerical identifier.
- **GECOS:** An optional field for additional user information (e.g., full name).
- **HOMEDIR:** The path to the user's home directory.
- **SHELL:** The user's default shell (such as Bash).

---

## The /etc/shadow File

The `/etc/shadow` file securely stores users' encrypted passwords, along with critical account and password expiry information. Each field is colon-separated. Below is an example entry for user Bob:

```
[~]$ grep -i ^bob /etc/shadow
bob:$6$h0u0tOt0$5JcuRxR7y72LLQk4Kdog7u09LsNFS0yZPkIC8pV9tgD0wXCHutYcWF/7.eJ3TfGfG0lj4JF63PyuPwKC18tJS.:18188:0:99999:7:::
```

The fields in `/etc/shadow` are arranged as follows:

```
USERNAME:PASSWORD:LASTCHANGE:MINAGE:MAXAGE:WARN:INACTIVE:EXPDATE
```

Where:

- **USERNAME:** Matches the username from `/etc/passwd`.
- **PASSWORD:** Contains the encrypted password. An asterisk (\*) or an empty value indicates that no password is set.
- **LASTCHANGE:** The date (measured in days since January 1, 1970) when the password was last changed.
- **MINAGE:** The minimum number of days required between password changes.
- **MAXAGE:** The maximum number of days the password remains valid.
- **WARN:** The number of days before password expiry that the user is warned.
- **INACTIVE:** The number of days that elapse after password expiry during which the account remains active (if empty, this feature is disabled).
- **EXPDATE:** The expiration date of the account (expressed as days since the Unix epoch); an empty field means the account does not expire.

---

## The /etc/group File

The `/etc/group` file is used to define and manage user groups on the system. Its contents are colon-separated and outline important group details. Here’s an example entry:

```
[~]$ grep -i ^bob /etc/group
developer:x:1001:bob,sara
```

The format of `/etc/group` is:

```
NAME:PASSWORD:GID:MEMBERS
```

Where:

- **NAME:** The group name.
- **PASSWORD:** Typically set to `x`, indicating that any real group password is stored elsewhere.
- **GID:** The unique numeric group identifier.
- **MEMBERS:** A comma-separated list of usernames that belong to the group.

---

> [!important]
> **Summary**
>
> Linux access control files such as `/etc/passwd`, `/etc/shadow`, and `/etc/group` are fundamental for both user management and overall system security. Always use the appropriate commands to update these files, ensuring system integrity.

In a future lesson, we will review the commands and best practices for safely modifying these access control files.

For further learning, check out additional resources on [Linux User Management](https://linux.die.net/man/) and [Linux Security Best Practices](https://www.cyberciti.biz/tips/linux-security.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/270657d0-f377-4b16-b7ee-9be342ae8669)**
>
> Watch video content
