# Use RPM and YUM Package Management Zypper - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Linux-Installation-and-Package-Management/Use-RPM-and-YUM-Package-Management-Zypper)

---

## Table of Contents

- Use RPM and YUM Package Management Zypper
  - Refreshing Package Metadata
  - Searching for Packages
  - Listing Installed Packages
  - Installing Packages
  - Removing Packages
  - Managing Software Repositories
  - Links and References
  - Watch Video
    - From Repositories
    - From a Local RPM
    - Listing Repositories
    - Enabling, Disabling, and Auto-Refresh
    - Adding and Removing Repositories

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Linux Installation and Package Management

# Use RPM and YUM Package Management Zypper

Zypper is the powerful command-line package manager for SUSE Linux and openSUSE, providing functionality similar to YUM and APT. It enables you to install, update, and remove packages, automatically resolving dependencies. Because Zypper relies on up-to-date repository metadata, it’s best practice to refresh before performing searches or installations.

> [!important]
> **Note**
>
> You need `sudo` privileges to run Zypper commands that modify the system.
> Always refresh metadata to ensure you get the latest package versions.

---

## Refreshing Package Metadata

Before you search or install packages, update metadata from all enabled repositories:

```
sudo zypper refresh
```

This fetches the latest repository data so Zypper can see available package versions.

---

## Searching for Packages

Use the `se` (search) command to find packages by name or keyword:

```
sudo zypper se gnumeric
```

Sample output:

```
Loading repository data...
Reading installed packages...
S | Name           | Summary                         | Type
--+----------------+---------------------------------+--------
  | gnumeric       | Spreadsheet application         | package
  | gnumeric-devel | Development files for Gnumeric  | package
  | gnumeric-doc   | Documentation for Gnumeric      | package
  | gnumeric-lang  | Translations for Gnumeric       | package
```

---

## Listing Installed Packages

To list **all** installed packages:

```
sudo zypper se -i
```

To check if a specific package (e.g., `firefox`) is installed:

```
sudo zypper se -i firefox
```

Example when Firefox is installed:

```
Loading repository data...
Reading installed packages...
S | Name                           | Summary                     | Type
--+--------------------------------+-----------------------------+--------
i | MozillaFirefox                 | Mozilla Firefox Web Browser | package
  | MozillaFirefox-branding-openSUSE | Branding files for openSUSE | package
  | MozillaFirefox-translations-common | Common translations     | package
```

---

## Installing Packages

### From Repositories

Install a package from enabled repositories with the `in` (install) command:

```
sudo zypper in unrar
```

Interactive example:

```
Resolving package dependencies...
The following NEW package is going to be installed:
  unrar


1 new package to install.
Overall download size: 141.2 KiB. After the operation, additional 301.6 KiB will be used.
Continue? [y/n/v/...? shows all options] (y): y
Retrieving package unrar-5.7.5-lp151.1.1.x86_64 ...................................[done]
(1/1) Installing: unrar-5.7.5-lp151.1.1.x86_64 ..........................................[done]
```

### From a Local RPM

To install an RPM file stored on your machine:

```
sudo zypper in /path/to/package.rpm
```

Zypper will attempt to resolve dependencies against your enabled repositories.

---

## Removing Packages

Use the `rm` (remove) command to uninstall a package and any packages that depend on it:

```
sudo zypper rm unrar
```

Example:

```
Resolving package dependencies...
The following package is going to be REMOVED:
  unrar


1 package to remove.
After the operation, 301.6 KiB will be freed.
Continue? [y/n/v/...? shows all options] (y): y
(1/1) Removing unrar-5.7.5-lp151.1.1.x86_64 ..........................................[done]
```

> [!important]
> **Warning**
>
> Removing packages may also uninstall dependencies required by other applications. Double-check the list before confirming.

---

## Managing Software Repositories

### Listing Repositories

Display all configured repositories and their status:

```
sudo zypper repos
```

Sample output:

```
# | Alias                      | Name                                | Enabled | GPG Check | Refresh
--+----------------------------+-------------------------------------+---------+-----------+--------
1 | openSUSE-Leap-15.1-1       | openSUSE-Leap-15.1-1               | No      | ----      | ----
2 | repo-non-oss               | Non-OSS Repository                  | Yes     | (r) Yes   | Yes
3 | repo-oss                   | Main Repository                     | Yes     | (r) Yes   | Yes
4 | repo-source                | Source Repository                   | No      | ----      | ----
```

Enabled = **Yes** means active; **No** means disabled.

### Enabling, Disabling, and Auto-Refresh

| Command                             | Description                     |
| ----------------------------------- | ------------------------------- |
| `zypper modifyrepo -d <repo-alias>` | Disable a repository            |
| `zypper modifyrepo -e <repo-alias>` | Enable a repository             |
| `zypper modifyrepo -f <repo-alias>` | Enable auto-refresh for a repo  |
| `zypper modifyrepo -F <repo-alias>` | Disable auto-refresh for a repo |

Example:

```
# Disable
sudo zypper modifyrepo -d repo-non-oss


# Enable
sudo zypper modifyrepo -e repo-non-oss


# Enable auto-refresh
sudo zypper modifyrepo -f repo-non-oss


# Disable auto-refresh
sudo zypper modifyrepo -F repo-non-oss
```

### Adding and Removing Repositories

- **Add a new repository**:

  ```
  sudo zypper addrepo http://packman.inode.at/suse/openSUSE-Leap_15.1/packman packman
  ```

  Sample output:

  ```
  Adding repository 'packman' ...........................[done]
  Repository 'packman' successfully added
  URI         : http://packman.inode.at/suse/openSUSE-Leap_15.1/
  Enabled     : Yes
  GPG Check   : Yes
  Autorefresh : No
  Priority    : 99 (default)
  ```

- **Remove a repository**:

  ```
  sudo zypper removerepo packman
  ```

  Sample output:

  ```
  Removing repository 'packman' ........................[done]
  Repository 'packman' has been removed.
  ```

---

## Links and References

- [Zypper User Guide](https://doc.opensuse.org/projects/libzypp/doc/zypper/)
- [openSUSE Documentation](https://en.opensuse.org/Portal:Zypper)
- [SUSE Linux Enterprise Server](https://www.suse.com/products/server/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/78ca0fa8-2083-408a-bf8a-2775b09fbf1d/lesson/ae5d58db-cf95-4eec-9da4-e879559d4af8)**
>
> Watch video content
