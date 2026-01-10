# Configure user resource limits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/User-and-Group-Management/Configure-user-resource-limits)

---

## Table of Contents

- Configure user resource limits
  - Prerequisites
  - 1. Back Up and Open limits.conf
  - 2. Understanding limits.conf Fields
  - 3. Exercise: Enforce a 3-Process Limit for “trinity”
  - 4. References and Further Reading
  - Watch Video
    - 2.1 Domain
    - 2.2 Type
    - 2.3 Item
    - 3.1 Verify the Limit
    - 3.2 Check with ulimit

---

## Content

Linux System Administration for Beginners

User and Group Management

# Configure user resource limits

Managing resource usage per user prevents any single account from monopolizing CPU, memory, or processes. In this guide, you’ll learn how to configure limits via `/etc/security/limits.conf`, verify them, and understand each directive.

## Prerequisites

- A Linux distribution with PAM-enabled login (most modern distros).
- `sudo` privileges to edit `/etc/security/limits.conf`.

## 1\. Back Up and Open limits.conf

> [!important]
> **Warning**
>
> Always back up system configuration files before editing.
>
> ```
> sudo cp /etc/security/limits.conf{,.bak}
> ```

Open the file for editing:

```
sudo vim /etc/security/limits.conf
```

You’ll see a template like:

```
#<domain>    <type>  <item>      <value>
#*           soft    core       0
#*           hard    rss        10000
#@student    hard    nproc      20
#@faculty    soft    nproc      20
#@faculty    hard    nproc      50
#ftp         hard    nproc      0
#@student    -       maxlogins  4
```

---

## 2\. Understanding limits.conf Fields

limits.conf uses four fields per line:

| Field  | Description                                                                  |
| ------ | ---------------------------------------------------------------------------- |
| domain | User (`trinity`), group (`@developers`), or `*` for all users.               |
| type   | `soft` (initial limit), `hard` (maximum ceiling), or `-` (both soft & hard). |
| item   | Resource type (e.g., `nproc`, `fsize`, `cpu`).                               |
| value  | Numeric limit (units vary per item).                                         |

### 2.1 Domain

- `username` (e.g., `trinity`)
- Group with `@` prefix (e.g., `@developers`)
- `*` for every user not otherwise matched

Example: limit user `trinity` to 10 processes:

```
trinity    hard    nproc    10
```

### 2.2 Type

- `hard` — absolute maximum (cannot be exceeded).
- `soft` — initial/session limit (can increase up to hard).
- `-` — sets both `soft` and `hard`.

```
# Hard only
trinity    hard    nproc    30


# Soft only
trinity    soft    nproc    10


# Both soft & hard
trinity    -       nproc    20
```

### 2.3 Item

Resource items you can limit:

| Item      | Description                                                                     | Example |
| --------- | ------------------------------------------------------------------------------- | ------- |
| nproc     | Max processes per user session                                                  | 10      |
| fsize     | Max file size (KB)                                                              | 1024    |
| cpu       | CPU time (minutes)                                                              | 1       |
| core      | Core dump file size (KB)                                                        | 0       |
| rss       | Resident set size (KB)                                                          | 10000   |
| maxlogins | Max concurrent logins per user                                                  | 4       |
| …         | See [man limits.conf](https://man7.org/linux/man-pages/man5/limits.conf.5.html) | –       |

Example: file-size and CPU restrictions for `trinity`:

```
trinity    hard    fsize    1024   # 1 MB max file size
trinity    hard    cpu      1      # 1 minute CPU time
```

---

## 3\. Exercise: Enforce a 3-Process Limit for “trinity”

1.  Add the following (uncommented) line to `/etc/security/limits.conf`:

    ```
    trinity    -    nproc    3
    ```

2.  Save and exit.

### 3.1 Verify the Limit

```
# Switch to trinity
sudo -iu trinity


# Attempt to list processes
ps | less
# Try spawning a fourth
ls -a | grep bash | less
logout
```

### 3.2 Check with ulimit

```
ulimit -a
# ...
# max user processes        (-u)    3
```

You can adjust soft limits on the fly:

```
# Raise soft limit up to hard (if below hard)
ulimit -u 5000
```

> [!important]
> **Note**
>
> Changes take effect on new sessions. Log out and back in to apply updates.
> Use `ulimit -a` to inspect all current limits.

---

## 4\. References and Further Reading

- [PAM Limits Module (limits.conf)](https://www.linux-pam.org/Linux-PAM-html/sag-pam_limits.html)
- [Linux Manual: limits.conf(5)](https://man7.org/linux/man-pages/man5/limits.conf.5.html)
- [ulimit Builtin](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/62174b1a-cb2b-488e-adb3-47b9a339efc1)**
>
> Watch video content
