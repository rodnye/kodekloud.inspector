# Use Debian Package Management Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Linux-Installation-and-Package-Management/Use-Debian-Package-Management-Part-1)

---

## Table of Contents

- Use Debian Package Management Part 1
  - 1. Installing and Upgrading Packages
  - 2. Removing and Purging Packages
  - 3. Forcing Operations
  - 4. Inspecting Packages
  - 5. Reconfiguring Packages
  - References
  - Watch Video
    - Handling Dependency Errors
    - 2.1 Remove (keep configuration files)
    - 2.2 Purge (remove package and configuration)
    - 4.1 View Package Metadata
    - 4.2 List Files in a Package
    - 4.3 Identify Owning Package of a File

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Linux Installation and Package Management

# Use Debian Package Management Part 1

Debian’s native package manager, `dpkg`, handles the installation, upgrade, and removal of `.deb` packages on Debian‐based systems. In the early days of Linux, software was distributed as source archives (`.tar.gz`) requiring manual compilation. As distributions matured, package managers automated dependency resolution, file tracking, and version control. This article covers the fundamentals of using `dpkg` to:

- Install and upgrade packages
- Handle dependencies
- Remove or purge packages
- Force operations (with caution)
- Inspect package contents and metadata
- Reconfigure installed packages

Whether you’re a sysadmin automating deployments or a developer packaging your own software, understanding `dpkg` is essential for reliable Debian system management.

## 1\. Installing and Upgrading Packages

To install a new `.deb` file or upgrade an existing one:

```
sudo dpkg -i mypackage.deb
```

- If no version is installed, `dpkg` adds a fresh copy.
- If an older version exists, it upgrades in place.

> [!important]
> **Note**
>
> For automated dependency resolution, consider using [`apt`](https://wiki.debian.org/Teams/Apt) or `apt-get` instead.
> `sudo apt install ./mypackage.deb` will fetch missing dependencies automatically.

### Handling Dependency Errors

When dependencies are missing, `dpkg` aborts and lists unmet requirements:

```
sudo dpkg -i openshot-qt_2.4.3+dfsg1-1_all.deb
```

Sample output:

```
dpkg: dependency problems prevent configuration of openshot-qt:
 openshot-qt depends on fonts-cantarell; however:
  Package fonts-cantarell is not installed.
 ...
dpkg: error processing package openshot-qt (--install):
 dependency problems - leaving unconfigured
```

You must install each required `.deb` manually or switch to `apt` for automatic resolution.

---

## 2\. Removing and Purging Packages

### 2.1 Remove (keep configuration files)

```
sudo dpkg -r unrar
```

`dpkg` checks reverse dependencies and refuses removal if other packages rely on it:

```
sudo dpkg -r p7zip
```

```
dpkg: dependency problems prevent removal of p7zip:
 winetricks depends on p7zip; however:
  Package p7zip is to be removed.
 ...
```

To remove multiple packages at once:

```
sudo dpkg -r unrar p7zip
```

### 2.2 Purge (remove package and configuration)

```
sudo dpkg -P unrar p7zip
```

Purging deletes all configuration files, freeing up disk space and resetting system state.

---

## 3\. Forcing Operations

You can bypass dependency and safety checks—but this can break your system!

```
sudo dpkg -i --force-depends openshot-qt_2.4.3+dfsg1-1_all.deb
```

Use `--force-all` to override nearly all safeguards. Only force when you understand the implications.

> [!important]
> **Warning**
>
> Forcing package operations may lead to an inconsistent system state. Always have backups and test in a sandbox before using on production.

---

## 4\. Inspecting Packages

Here’s a quick reference for common `dpkg` inspection commands:

| Command                         | Description                               |
| ------------------------------- | ----------------------------------------- |
| `dpkg -I mypackage.deb`         | Show metadata (version, maintainer, deps) |
| `dpkg --get-selections`         | List all installed packages               |
| `dpkg -L unrar`                 | List files installed by a package         |
| `dpkg-query -S /usr/bin/unrar*` | Find which package owns a given file      |

### 4.1 View Package Metadata

```
dpkg -I mypackage.deb
```

### 4.2 List Files in a Package

```
sudo dpkg -L unrar
```

Sample output:

```
/usr/bin/unrar-nonfree
/usr/share/doc/unrar/changelog.Debian.gz
/usr/share/man/man1/unrar-nonfree.1.gz
```

### 4.3 Identify Owning Package of a File

```
dpkg-query -S /usr/bin/unrar-nonfree
```

Output:

```
unrar: /usr/bin/unrar-nonfree
```

---

## 5\. Reconfiguring Packages

Sometimes you need to rerun a package’s configuration scripts—useful after restoring defaults or changing `debconf` answers:

```
sudo dpkg-reconfigure tzdata
```

This command re-executes maintainer scripts, prompting you to confirm or update settings as needed.

---

## References

- [dpkg Manual](https://manpages.debian.org/unstable/dpkg/dpkg.1.en.html)
- [Apt User’s Guide](https://wiki.debian.org/Teams/Apt)
- [Debian Package Management](https://www.debian.org/doc/manuals/debian-faq/pkg-basics.en.html)
- [Debian Policy Manual](https://www.debian.org/doc/debian-policy/)

Future installments will cover advanced package building, repository management, and best practices for Debian package maintenance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/78ca0fa8-2083-408a-bf8a-2775b09fbf1d/lesson/7f4a465c-2c3b-45a6-ada8-6ae201480062)**
>
> Watch video content
