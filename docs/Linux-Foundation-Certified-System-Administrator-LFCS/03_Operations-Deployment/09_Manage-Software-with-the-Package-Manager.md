# Manage Software with the Package Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Manage-Software-with-the-Package-Manager)

---

## Table of Contents

- Manage Software with the Package Manager
  - Updating the Package Database
  - Upgrading Installed Packages
  - Installing New Applications
  - Understanding Packages
  - Searching for Packages
  - Removing Packages
  - Conclusion
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Manage Software with the Package Manager

This article explains how to install, update, upgrade, and remove software on Ubuntu using the apt package manager. Ubuntu simplifies software management by handling installation, upgrades, and dependency resolution with apt. Follow the examples below for practical guidance on managing your system's packages.

## Updating the Package Database

Before installing or upgrading any software, it is essential to refresh the local package database. Running the following command downloads the latest package information from the official repositories, ensuring that you work with up-to-date data.

```
sudo apt update
```

Example output:

```
sudo apt update
[sudo] password for jeremy:
Get:1 http://us.archive.ubuntu.com/ubuntu noble InRelease [97.5 kB]
Get:2 http://us.archive.ubuntu.com/ubuntu noble-updates InRelease [89.7 kB]
Get:3 http://us.archive.ubuntu.com/ubuntu noble-backports InRelease [89.7 kB]
Get:4 http://security.ubuntu.com/ubuntu noble-security InRelease [89.7 kB]
Fetched 179 kB in 2s (77.4 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
4 packages can be upgraded. Run 'apt list --upgradable' to see them.
jeremy@kodekloud:~$
```

> [!important]
> **Note**
>
> If the package information was last refreshed a while ago (for example, one week ago), running `sudo apt update` ensures you get the latest package listings.

## Upgrading Installed Packages

After updating the package database, you can upgrade the installed packages with:

```
sudo apt upgrade
```

When prompted, type "y" to confirm the upgrade. For added efficiency, you can chain the update and upgrade commands. Using the `&&` operator ensures that the upgrade command runs only if the update is successful:

```
sudo apt update && sudo apt upgrade
```

## Installing New Applications

To install a new application such as Nginx, run:

```
sudo apt install nginx
```

For a smoother process that uses the latest package data, chain the update and install commands together:

```
sudo apt update && sudo apt install nginx
```

During the installation, additional dependencies, including necessary libraries and components, may be automatically installed to ensure Nginx runs correctly.

Example output when installing Nginx:

```
sudo apt update && sudo apt install nginx
Hit:1 http://us.archive.ubuntu.com/ubuntu noble InRelease
Hit:2 http://security.ubuntu.com/ubuntu noble-security InRelease
Hit:3 http://us.archive.ubuntu.com/ubuntu noble-updates InRelease
Hit:4 http://us.archive.ubuntu.com/ubuntu noble-backports InRelease
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  nginx-common
Suggested packages:
  fcgiwrap nginx-doc ssl-cert
The following NEW packages will be installed:
  nginx nginx-common
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 552 kB of archives.
After this operation, 1,596 kB of additional disk space will be used.
Do you want to continue? [Y/n]
```

## Understanding Packages

A package is an archive containing everything required by a piece of software, including binaries, configuration files, and documentation. Once a package is installed, you can inspect its contents with the dpkg tool.

For example, to list all files provided by the Nginx package:

```
dpkg --listfiles nginx
```

Example output:

```
.
usr
usr/sbin
usr/sbin/nginx
usr/share
usr/share/doc
usr/share/doc/nginx
usr/share/doc/nginx/changelog.Debian.gz
usr/share/doc/nginx/copyright
usr/share/man
usr/share/man/man8
usr/share/man/man8/nginx.8.gz
```

This output confirms that the Nginx executable is located at `/usr/sbin/nginx`.

To determine which package provides a specific file, use the `dpkg --search` command:

```
dpkg --search /usr/sbin/nginx
```

Example output:

```
jeremy@kodekloud:~$ dpkg --search /usr/sbin/nginx
nginx: /usr/sbin/nginx
jeremy@kodekloud:~$
```

To gather more details about a specific package, such as its dependencies or description, you can use the `apt show` command. For instance:

```
apt show libnginx-mod-stream
```

Example output:

```
jeremy@kodekloud:~$ apt show libnginx-mod-stream
Package: libnginx-mod-stream
Version: 1.24.0-2ubuntu7
Priority: optional
Section: httpd
Source: nginx
Origin: Ubuntu
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Debian Nginx Maintainers <pkg-nginx-maintainers@alioth-lists.debian.net>
Bugs: https://bugs.launchpad.net/ubuntu/+filebug
Installed-Size: 224 kB
Depends: nginx-abi-1.24.0-1, libc6 (>= 2.33)
Recommends: nginx
Homepage: https://nginx.org
Download-Size: 84.2 kB
APT-Sources: http://us.archive.ubuntu.com/ubuntu noble/main amd64 Packages
Description: Stream module for Nginx
 The nginx_stream module adds stream proxy support to nginx.
 .
 Stream module supports loadbalancing & proxying to TCP servers. The module
 also supports ACLs/connection limiting and configuring multiple operational
 parameters.
jeremy@kodekloud:~$
```

## Searching for Packages

If you are unsure which package contains the software you need, you can search for it using `apt search`. For example, to find packages related to "nginx":

```
apt search nginx
```

This command looks through both package names and descriptions and may return multiple results. To narrow down the search to package names only, use the `--names-only` option:

```
apt search --names-only nginx
```

You can also search using multiple keywords. For example, to find a package that includes "nginx", "module", and "image", run:

```
apt search nginx-module-image
```

This ensures that all specified search terms are included in the results.

## Removing Packages

When a package is no longer necessary, you can remove it with the following command. For example, to remove Nginx:

```
sudo apt remove nginx
```

Example output:

```
jeremy@kodekloud:~$ sudo apt remove nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  nginx nginx-common
0 upgraded, 0 newly installed, 2 to remove and 0 not upgraded.
After this operation, 1,596 kB disk space will be freed.
Do you want to continue? [Y/n] y
```

> [!important]
> **Note**
>
> This command removes only the main package. Residual dependencies that are no longer needed remain on the system.

To clean up those extra dependencies, use:

```
sudo apt autoremove nginx
```

Example output:

```
sudo apt autoremove nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  nginx nginx-common
0 upgraded, 0 newly installed, 2 to remove and 0 not upgraded.
After this operation, 1,596 kB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 83359 files and directories currently installed.)
Removing nginx-common (1.24.0-2ubuntu7) ...
Removing nginx (1.24.0-2ubuntu7) ...
Processing triggers for man-db (2.12.0-4build2) ...
```

If needed, you can always reinstall Nginx using:

```
sudo apt install nginx
```

Using `apt autoremove` is a convenient way to remove both the main package and any leftover dependencies in a single operation.

## Conclusion

In this article, we covered the essentials of managing software on Ubuntu using its apt package manager. You learned how to update the package database, upgrade installed packages, install new applications like Nginx, inspect package contents, search for specific packages, and remove unwanted software along with any residual dependencies.

By mastering these commands, you can efficiently maintain and secure your Ubuntu system. Let's move on to the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/1dd3329a-11d2-45aa-9871-6809f6d0f24b)**
>
> Watch video content
