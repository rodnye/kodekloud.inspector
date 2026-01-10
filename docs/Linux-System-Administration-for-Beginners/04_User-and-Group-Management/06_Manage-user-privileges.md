# Manage user privileges - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/User-and-Group-Management/Manage-user-privileges)

---

## Table of Contents

- Manage user privileges
  - Using sudo
  - Granting sudo via the wheel group
  - Fine-grained control with /etc/sudoers
  - Defining custom sudoers policies
  - Running commands as another user
  - Handling “Permission denied” errors
  - Disabling the password prompt
  - Links and References
  - Watch Video
  - Practice Lab
    - Breakdown of a sudoers entry

---

## Content

Linux System Administration for Beginners

User and Group Management

# Manage user privileges

Controlling who can perform administrative tasks is crucial for system security. In this guide, you’ll learn how to grant and restrict `sudo` access on Linux, manage entries in `/etc/sudoers`, and apply fine-grained policies for different users and groups.

## Using `sudo`

By default, only the **root** (superuser) can modify system-critical files and settings. Prefixing a command with `sudo` elevates it to root privileges:

```
$ sudo apt update
```

> [!important]
> **Note**
>
> When running `sudo` for the first time, you’ll be prompted for _your_ password—not the root password.

## Granting `sudo` via the wheel group

Many Linux distributions allow members of the `wheel` group to use `sudo`:

```
$ groups
aaron family wheel
```

To add a user (e.g., `trinity`) to `wheel`:

```
$ sudo gpasswd -a trinity wheel
```

Now `trinity` can execute any command with `sudo`, which is easy but lacks fine control.

## Fine-grained control with `/etc/sudoers`

Instead of a broad group assignment, define precise policies in `/etc/sudoers`. **Never** edit that file directly! Always use `visudo`, which validates syntax.

```
$ sudo visudo
```

Inside, you’ll find a line like:

```
## Allows people in group wheel to run all commands
%wheel ALL=(ALL) ALL
```

> [!important]
> **Warning**
>
> A malformed `/etc/sudoers` can lock out all sudo access. Always use `visudo` to edit safely.

### Breakdown of a sudoers entry

| Part       | Description                                                    | Example                     |
| ---------- | -------------------------------------------------------------- | --------------------------- |
| User/Group | Rule applies to this user (e.g., `trinity`) or group (`%devs`) | `trinity`<br/>`%developers` |
| Host       | Hosts where the rule is valid (`ALL` for every host)           | `ALL`                       |
| Run as     | User(s) the command may run as (in parentheses)                | `(ALL)`, `(aaron,john)`     |
| Commands   | Which commands are allowed                                     | `/bin/ls, /usr/bin/vim`     |

## Defining custom `sudoers` policies

Below are sample entries to append near the end of `/etc/sudoers` via `visudo`:

```
# 1. Allow trinity to run any command as any user (including root)
trinity ALL=(ALL) ALL


# 2. Grant all members of 'developers' the same privilege
%developers ALL=(ALL) ALL


# 3. Permit trinity to run any command, but only as aaron or john
trinity ALL=(aaron,john) ALL


# 4. Shortcut: run as root (default) without specifying run-as list
trinity ALL=ALL


# 5. Restrict trinity to only run /bin/ls and /bin/stat as root
trinity ALL=(ALL) /bin/ls, /bin/stat


# 6. Same as above, omitting the run-as list (defaults to root)
trinity ALL= /bin/ls, /bin/stat
```

## Running commands as another user

Beyond root, you can invoke commands as any user:

```
$ sudo -u trinity ls /home/trinity
Desktop  Documents  Downloads  Music  Pictures
```

## Handling “Permission denied” errors

If a user invokes a disallowed command, sudo reports:

```
$ sudo echo "Test passed?"
Sorry, user trinity is not allowed to execute '/bin/echo Test passed?' as root on server01.
```

## Disabling the password prompt

To let a user run commands without entering their password, add `NOPASSWD:`:

```
# Allow trinity to run any command without a password
trinity ALL=(ALL) NOPASSWD: ALL
```

> [!important]
> **Note**
>
> Use `NOPASSWD:` sparingly; it increases convenience but may reduce auditability.

---

## Links and References

- [sudo Manual (sudoers)](https://www.sudo.ws/man/1.8.13/sudoers.man.html)
- [visudo Documentation](https://www.sudo.ws/man/1.8.13/visudo.man.html)
- [Linux User Management](https://www.linux.com/training-tutorials/introduction-linux-user-accounts/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/46d7c494-6c04-4bb9-bac0-cfec84e594c6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/3dcaca87-ddaf-4de8-b0d9-7a82f102fe4d)**
>
> Practice lab
