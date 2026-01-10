# RPM and YUM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Package-Management/RPM-and-YUM)

---

## Table of Contents

- RPM and YUM
  - RPM (Red Hat Package Manager)
  - YUM (Yellowdog Updater Modified)
  - Conclusion
  - Watch Video
  - Practice Lab
    - Repository Configuration
    - YUM Installation Process
    - Common YUM Commands
      - Example: Listing Configured Repositories
      - Example: Finding the Package for a Specific Command
      - Example: Updating All Packages

---

## Content

Learning Linux Basics Course & Labs

Package Management

# RPM and YUM

This article explores the two primary package managers used in many RPM-based Linux distributions: RPM and YUM. Both tools play essential roles in managing software packages by handling installation, upgrades, removal, and dependency resolution.

## RPM (Red Hat Package Manager)

RPM is the package management system for Red Hat Enterprise Linux, CentOS, Fedora, and similar distributions. It works with files that have a `.rpm` extension and provides five fundamental operations: installing, uninstalling, upgrading, querying, and verifying packages. These operations are executed via the `rpm` command with specific options:

- To install a package:

  ```
  rpm -ivh package.rpm
  ```

  - `-i`: Install the package.
  - `-v`: Verbose mode for detailed output.
  - `-h`: Display the installation progress.

- To uninstall a package:

  ```
  rpm -e package
  ```

- To upgrade an existing package:

  ```
  rpm -Uvh package.rpm
  ```

  Note the uppercase `U` for upgrade.

- To query the RPM database (located at `/var/lib/rpm`) for details about installed packages:

  ```
  rpm -q package
  ```

- To verify an installed package against its original metadata:

  ```
  rpm -Vf <path to file>
  ```

> [!important]
> **Note**
>
> Verification compares the current file metadata with the original data, ensuring the package's integrity and trustworthiness.

One important limitation of RPM is that it does not automatically resolve package dependencies. This shortcoming is addressed by a higher-level package manager known as YUM.

## YUM (Yellowdog Updater Modified)

YUM is a free and open-source package manager that automates dependency resolution for RPM-based systems. It seamlessly interacts with software repositories—a structured collection of RPM packages—making software management straightforward.

### Repository Configuration

Repository configurations are stored in `.repo` files located in the `/etc/yum.repos.d` directory. YUM leverages these configuration files to locate and manage software packages. Repositories can be local or remote (accessed via FTP, HTTP, or HTTPS). For example, a file like `redhat.repo` on a Red Hat system with an active subscription points to the official repository.

In cases where the official repository does not offer the latest software version or the required package, you can add a third-party repository. For instance, by creating a repository file for NGINX, you can install its latest version.

![The image illustrates the YUM Package Manager process, showing software repositories, configuration files, and the RPM Package Manager interaction with local or remote sources.](https://kodekloud.com/kk-media/image/upload/v1752881135/notes-assets/images/Learning-Linux-Basics-Course-Labs-RPM-and-YUM/frame_300.jpg)

### YUM Installation Process

When you run a `yum install` command, YUM conducts a comprehensive transaction check:

- It verifies if the package is already installed.
- It searches the enabled repositories in `/etc/yum.repos.d` for the package.
- It checks for any missing or outdated dependencies.

After these checks, YUM presents a transaction summary for review. The installation is confirmed by entering `y` (this confirmation step can be automated with appropriate command flags).

An example transaction summary might look like this:

```
Transaction Summary
====================================================
Install  1 Package

Total download size: 2.7 M
Installed size: 9.4 M
Is this ok [y/d/N]: y
```

### Common YUM Commands

Below is a table summarizing several basic YUM commands and their use cases:

| Command                   | Use Case                                                     | Example             |
| ------------------------- | ------------------------------------------------------------ | ------------------- |
| List repositories         | Display all configured repositories                          | `yum repolist`      |
| Identify package source   | Find which package provides a specific command (e.g., `scp`) | `yum provides scp`  |
| Remove a package          | Uninstall a package from the system                          | `yum remove httpd`  |
| Update a specific package | Upgrade a package (e.g., Telnet)                             | `yum update telnet` |
| Update all packages       | Upgrade all installed packages                               | `yum update`        |

#### Example: Listing Configured Repositories

```
[~]$ yum repolist
Repo id                      repo name                                          status
base/7/x86_64               CentOS-7 - Base                                   10,097
epel/x86_64                 Extra Packages for Enterprise Linux 7 - x86_64   13,229
extras/7/x86_64             CentOS-7 - Extras                                   341
```

#### Example: Finding the Package for a Specific Command

```
[~]$ yum provides scp
openssh-clients-7.4p1-21.el7.x86_64 : An open source SSH client application
Repo        : base
Matched from:
Filename    : /usr/bin/scp
```

#### Example: Updating All Packages

```
[~]$ yum update
Transaction Summary
========================================================
Install     ( 4 Dependent packages)
Upgrade      78 Packages

Total download size: 64 M
Is this ok [y/d/N]:
```

> [!important]
> **Warning**
>
> Always review the transaction summary before confirming an update or installation to avoid conflicts or unintended changes.

## Conclusion

RPM and YUM are integral components of RPM-based Linux systems. RPM is ideal for direct package operations, while YUM enhances the process by managing dependencies and providing access to a multitude of software repositories. Together, they offer a robust framework for software management on Linux.

For more in-depth information, consider exploring:

- [RPM Guide](https://rpm.org/documentation.html)
- [YUM Documentation](https://yum.baseurl.org/documentation/)

By understanding both tools and their interactions, you can effectively manage and maintain software packages on your system.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/7ced7d44-760f-47a8-a9bc-69971bb0ca17/lesson/a1706761-19b2-42f6-b855-4268ba555ca1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/7ced7d44-760f-47a8-a9bc-69971bb0ca17/lesson/6e3df3d0-2aa8-445e-b983-b373b2dc1a1c)**
>
> Practice lab
