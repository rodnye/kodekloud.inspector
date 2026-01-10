# Manage Software - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Manage-Software)

---

## Table of Contents

- Manage Software
  - Software Repositories
  - Searching and Installing Packages
  - Common DNF Commands
  - Installing, Reinstalling, and Removing Packages
  - Managing Package Groups
  - Installing Local RPMs
  - Cleanup and Transaction History
  - Shell Completion Tips
  - References
  - Watch Video
    - Listing Enabled Repositories
    - Viewing Detailed Repository Information
    - Listing All Repositories (Enabled & Disabled)
    - Enabling or Disabling Optional Repositories
    - Adding a Third-Party Repository
    - Viewing Package Details
    - Install a Package
    - Reinstall a Package
    - Remove a Package
    - List Groups
    - Install an Environment Group
    - Remove a Group
    - Show Hidden Groups

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Manage Software

In this guide, you’ll master software management on **CentOS Stream 8** using DNF—the modern package manager. Whether you’re installing web servers, managing repositories, or cleaning up unused dependencies, DNF provides a consistent CLI. If you’re on an older CentOS release without DNF, substitute `yum` for `dnf` in the examples below (for instance, use `sudo yum install nginx`).

> [!important]
> **Note**
>
> CentOS Stream 8 uses DNF by default. For legacy CentOS 7 or earlier, replace `dnf` with `yum` in all commands.

---

## Software Repositories

A _software repository_ is a server that hosts packages—programs, libraries, configurations, and more. CentOS Stream 8 includes several repositories out of the box.

### Listing Enabled Repositories

```
sudo dnf repolist
```

Output:

```
repo id      repo name
appstream    CentOS Stream 8 - AppStream
baseos       CentOS Stream 8 - BaseOS
extras       CentOS Stream 8 - Extras
```

### Viewing Detailed Repository Information

Add the `-v` (verbose) flag to see package counts, base URLs, mirror lists, and more:

```
sudo dnf repolist -v
```

### Listing All Repositories (Enabled & Disabled)

```
sudo dnf repolist --all
```

Sample output:

```
repo id        repo name                                    status
powertools     CentOS Stream 8 - PowerTools                disabled
media-appstream CentOS Stream 8 - Media - AppStream         disabled
...
```

### Enabling or Disabling Optional Repositories

```
sudo dnf config-manager --enable powertools
sudo dnf config-manager --disable powertools
```

### Adding a Third-Party Repository

To install packages not found in official repos, add a third-party repository:

> [!important]
> **Warning**
>
> Third-party repositories can introduce unverified software. Only add trusted sources.

```
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

To remove it later, delete its `.repo` file (find the path via `dnf repolist -v`).

---

## Searching and Installing Packages

When you’re unsure of a package name, use:

```
sudo dnf search web server
```

To search for the exact phrase:

```
sudo dnf search 'web server'
```

### Viewing Package Details

```
sudo dnf info nginx
```

Sample fields:

- Name, Version, Release
- Architecture
- Repository
- Summary, License, Description

---

## Common DNF Commands

| Command                        | Description                             |
| ------------------------------ | --------------------------------------- |
| `sudo dnf search <term>`       | Search package names and descriptions   |
| `sudo dnf info <package>`      | Display detailed package metadata       |
| `sudo dnf install <package>`   | Install a package                       |
| `sudo dnf remove <package>`    | Uninstall a package                     |
| `sudo dnf reinstall <package>` | Reinstall (restore) an existing package |
| `sudo dnf autoremove`          | Remove dependencies no longer required  |
| `sudo dnf history`             | Show DNF transaction history            |

---

## Installing, Reinstalling, and Removing Packages

### Install a Package

```
sudo dnf install nginx
```

Confirm with `y` when prompted.

### Reinstall a Package

Restores missing or corrupted files:

```
sudo dnf reinstall nginx
```

### Remove a Package

```
sudo dnf remove nginx
```

You can specify full name/version/arch (e.g., `libcurl-7.61.1-22.el8.x86_64`) or just `libcurl`.

---

## Managing Package Groups

DNF groups bundle related packages (e.g., a desktop environment).

### List Groups

```
sudo dnf group list
```

### Install an Environment Group

```
sudo dnf group install 'Server with GUI'
```

Include optional packages:

```
sudo dnf group install --with-optional 'Server with GUI'
```

### Remove a Group

```
sudo dnf group remove 'Server with GUI'
```

### Show Hidden Groups

```
sudo dnf group list --hidden
```

---

## Installing Local RPMs

Download an RPM:

```
wget https://download.nomachine.com/download/7.7/Linux/nomachine_7.7.4_1_x86_64.rpm
```

Install it:

```
sudo dnf install ./nomachine_7.7.4_1_x86_64.rpm
```

Remove it:

```
sudo dnf remove nomachine
```

---

## Cleanup and Transaction History

- **Remove orphaned dependencies**:

  ```
  sudo dnf autoremove
  ```

- **View transaction history**:

  ```
  sudo dnf history
  ```

---

## Shell Completion Tips

Type `dnf` and press Tab twice. Confirm with `y` to list all commands and subcommands.

---

## References

- [DNF Documentation](https://dnf.readthedocs.io/en/latest/)
- [CentOS Stream 8 Official Docs](https://docs.centos.org/en-US/centos/stream/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/a07b5fbf-38bc-47f3-8226-24b8fd666110)**
>
> Watch video content
