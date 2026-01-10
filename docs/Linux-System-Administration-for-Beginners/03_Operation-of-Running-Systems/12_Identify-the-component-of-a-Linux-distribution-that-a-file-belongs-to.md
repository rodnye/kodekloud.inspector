# Identify the component of a Linux distribution that a file belongs to - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Identify-the-component-of-a-Linux-distribution-that-a-file-belongs-to)

---

## Table of Contents

- Identify the component of a Linux distribution that a file belongs to
  - Table of Common DNF Queries
  - 1. Find Which Package Owns a File
  - 2. Discover Which Package Supplies a Command
  - 3. List All Files in a Package
  - 4. Filter the File Listing
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Identify the component of a Linux distribution that a file belongs to

Discovering which package installed a specific file on your Linux system is invaluable when you need to restore default configurations after unintended edits. In this guide, we’ll explore DNF-based commands to:

- Find the package providing a file or command
- List all files in a package
- Filter package file listings

> [!important]
> **Note**
>
> These examples assume a DNF-based distribution (Fedora, RHEL, CentOS Stream). On older systems using `yum`, substitute `yum provides` and `yum repoquery`.

---

## Table of Common DNF Queries

| Command                        | Purpose                                  | Example                                  |
| ------------------------------ | ---------------------------------------- | ---------------------------------------- | ------ |
| `dnf provides <file>`          | Identify package owning a file           | `dnf provides /etc/anacrontab`           |
| `dnf provides <command>`       | Find package that supplies a CLI command | `dnf provides docker`                    |
| `dnf repoquery --list <pkg>`   | List every file in _any_ package         | `dnf repoquery --list nginx`             |
| `dnf repoquery --list <pkg> \\ | grep <pattern>`                          | Filter listed files by name or extension | \\`... |

---

## 1\. Find Which Package Owns a File

Suppose you’ve modified `/etc/anacrontab` and want to revert it to the distribution’s original version. Use:

```
$ dnf provides /etc/anacrontab
cronie-anacron-1.5.2-4.el8.x86_64 : Utility for running regular jobs
Repo        : baseos
Matched from:
Filename    : /etc/anacrontab


cronie-anacron-1.5.2-6.el8.x86_64 : Utility for running regular jobs
Repo        : @system
Matched from:
Filename    : /etc/anacrontab
```

The output shows `cronie-anacron` as the provider. To restore:

```
$ sudo rm /etc/anacrontab
$ sudo dnf install --refresh cronie-anacron
```

After reinstalling, the original `/etc/anacrontab` is back in place.

> [!important]
> **Warning**
>
> Removing system files can affect service behavior. Always backup configurations before deletion.

---

## 2\. Discover Which Package Supplies a Command

Want the `docker` CLI but unsure which package includes it? Run:

```
$ dnf provides docker
podman-docker-3.1.0-0.13.module_el8.5.0+733+9bb5dffa.noarch : Emulate Docker CLI
Repo        : appstream
Matched from:
Provide     : docker = 3.1.0-0.13.module_el8.5.0+733+9bb5dffa


podman-docker-3.3.0-0.17.module_el8.5.0+874+6db8bee3.noarch : Emulate Docker CLI
Repo        : appstream
Matched from:
Provide     : docker = 3.3.0-0.17.module_el8.5.0+874+6db8bee3
```

Here, `podman-docker` emulates the Docker CLI, so install it to use `docker`.

---

## 3\. List All Files in a Package

To inspect every file a package ships—even if it isn’t installed locally—use:

```
$ dnf repoquery --list nginx
/etc/logrotate.d/nginx
/etc/nginx/fastcgi.conf
/etc/nginx/fastcgi.conf.default
...
/usr/lib/.build-id
```

This complete list helps you identify configuration files, binaries, libraries, and other assets.

---

## 4\. Filter the File Listing

Narrow down to specific file types (e.g., configuration files) by piping to `grep`:

```
$ dnf repoquery --list nginx | grep '\.conf'
/etc/nginx/fastcgi.conf
/etc/nginx/fastcgi.conf.default
/etc/nginx/nginx.conf
/etc/nginx/nginx.conf.default
```

Use any regex pattern to quickly locate files of interest.

---

## Further Reading

- [DNF Command Reference](https://dnf.readthedocs.io/)
- [Fedora Package Management](https://docs.fedoraproject.org/en-US/quick-docs/dnf/)
- [Red Hat Enterprise Linux Subscription Guide](https://access.redhat.com/documentation/en-us/red_hat_subscription_management/)

Practice these commands to become confident in managing package-owned files and restoring default configurations on your DNF-based Linux system.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/d354e7d0-1479-4964-a400-65bc444ffdfa)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/1c82b7ef-7485-4d29-bff1-adf3706193db)**
>
> Practice lab
