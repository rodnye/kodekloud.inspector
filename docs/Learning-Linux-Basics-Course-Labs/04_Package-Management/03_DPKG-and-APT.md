# DPKG and APT - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Package-Management/DPKG-and-APT)

---

## Table of Contents

- DPKG and APT
  - DPKG
  - APT
  - Summary
  - Watch Video
    - Common APT Commands

---

## Content

Learning Linux Basics Course & Labs

Package Management

# DPKG and APT

In this guide, we dive into the package management tools available on Debian-based distributions like Ubuntu, PureOS, and Linux Mint. We will examine DPKG, the low-level package manager, alongside APT, its high-level counterpart that efficiently resolves dependencies. Understanding both tools is essential for efficient software management and troubleshooting.

## DPKG

DPKG, short for Debian Package Manager, is similar to RPM on Red Hat-based systems. It is used to install, remove, upgrade, list, and verify packages with the .deb extension. However, note that DPKG does not automatically resolve or manage dependencies. This can lead to installation issues if required dependencies are missing.

You can perform common package management tasks with DPKG using the following commands:

```
[~]$ dpkg -i telnet.deb       # Install or update the package
[~]$ dpkg -r telnet           # Remove the package
[~]$ dpkg -l telnet           # List installed packages with version numbers and descriptions
[~]$ dpkg -s telnet           # Check the status of an installed package
```

For instance, when installing GIMP locally, you might encounter dependency problems:

```
[~]$ dpkg -i gimp.deb
(Reading database ... 419857 files and directories currently installed.)
Preparing to unpack gimp.deb ...
Unpacking gimp (2.10.8-2) over (2.10.8-2) ...
dpkg: dependency problems prevent configuration of gimp:
 gimp depends on libgimp2.0 (>= 2.10.8); however:
 Version of libgimp2.0 on system is 2.8.22-1.
dpkg: error processing package gimp (--install):
 dependency problems - leaving unconfigured
Processing triggers for gnome-menus (3.13.3-11ubuntu1.1) ...
Processing triggers for desktop-file-utils (0.23+linuxmint6) ...
Processing triggers for mime-support (3.60ubuntu1) ...
Processing triggers for man-db (2.8.3-2ubuntu0.1) ...
Errors were encountered while processing:
 gimp
```

> [!important]
> **Note**
>
> Using DPKG directly is useful for managing individual `.deb` files, but dependency issues might require additional manual resolution.

## APT

APT (Advanced Package Tool) is a user-friendly front-end for DPKG that automatically handles dependency resolution. When you install a package using APT, it ensures that all required dependencies are installed alongside the requested package. This feature makes it a preferred choice for many users over directly using DPKG.

For example, to install GIMP while automatically handling dependencies, use the following command:

```
apt install gimp
```

Alternatively, you can use:

```
apt-get install gimp
```

Both commands are functionally equivalent, though APT is generally preferred for its streamlined user experience. APT's functionality is analogous to using YUM with RPM on Red Hat-based systems—it utilizes DPKG for low-level package management while managing repositories and dependencies at a higher level.

APT relies on software repositories defined in the sources file. The repository details are stored in:

```
/etc/apt/sources.list
```

This information can point to local directories (or even a CD-ROM) as well as to remote sources accessible via HTTP, HTTPS, or FTP.

![The image illustrates the APT package management process, showing the flow from a software repository to APT, then to DPKG, and finally to a computer.](https://kodekloud.com/kk-media/image/upload/v1752881129/notes-assets/images/Learning-Linux-Basics-Course-Labs-DPKG-and-APT/frame_150.jpg)

### Common APT Commands

Below is a table summarizing key APT commands along with their use cases:

| Command              | Description                                                             | Example                   |
| -------------------- | ----------------------------------------------------------------------- | ------------------------- |
| Update repositories  | Refresh the package repository information                              | `[~]$ apt update`         |
| Upgrade packages     | Upgrade installed packages to the latest version in the repository      | `[~]$ apt upgrade`        |
| Install a package    | Install a package (e.g., Telnet) and resolve dependencies automatically | `[~]$ apt install telnet` |
| Remove a package     | Remove an installed package                                             | `[~]$ apt remove telnet`  |
| Search for a package | Search for a package within the repository                              | `[~]$ apt search telnet`  |

Additionally, you can manage your repository sources using `apt edit-sources` or by directly editing the `/etc/apt/sources.list` file with your preferred text editor such as Vim or Nano.

> [!important]
> **Note**
>
> APT simplifies package management by automatically managing dependencies and providing an intuitive command-line interface. It is an essential tool for maintaining system packages on Debian-based distributions.

## Summary

This article introduced the basics of DPKG and APT for package management in Debian-based distributions. While DPKG is ideal for managing individual `.deb` files, APT provides enhanced functionality by resolving dependencies and managing repositories. Mastering these tools is crucial for ensuring a smooth software installation and management experience.

For further reading, consider reviewing the [Kubernetes Documentation](https://kubernetes.io/docs/) and exploring additional package management best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/7ced7d44-760f-47a8-a9bc-69971bb0ca17/lesson/f2b05a59-4ae6-4bf1-ab77-5e28db99dd83)**
>
> Watch video content
