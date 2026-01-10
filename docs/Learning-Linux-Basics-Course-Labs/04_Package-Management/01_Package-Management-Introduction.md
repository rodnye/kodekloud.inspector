# Package Management Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Package-Management/Package-Management-Introduction)

---

## Table of Contents

- Package Management Introduction
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Package Management

# Package Management Introduction

In this lesson, we explore the Linux package management tools used across various Linux distributions. We'll introduce popular package management systems and then focus on those used by Debian-based and RPM-based systems. Hands-on labs will provide practical experience with both types of distributions.

Since you are using Ubuntu, we'll start by discussing package managers such as APT and DPKG. Later, we will cover RPM-based managers used on distributions like RHEL and CentOS.

![The image introduces package managers, comparing DPKG/APT for Ubuntu and Debian with RPM for Red Hat and CentOS.](https://kodekloud.com/kk-media/image/upload/v1752881130/notes-assets/images/Learning-Linux-Basics-Course-Labs-Package-Management-Introduction/frame_50.jpg)

Dave explains that there are hundreds of Linux distributions available today. A common method to categorize these distributions is by the package management system they utilize. For example, distributions such as RHEL (Red Hat Enterprise Linux), Fedora, and CentOS are built on the RPM package system, often referred to as RPM-based distributions. In contrast, Debian-based distributions—such as Ubuntu, Debian, and Linux Mint—employ Debian package management tools like DPKG.

To illustrate the relationship between different systems, consider RHEL and CentOS. CentOS is a community-driven enterprise operating system that is essentially a fork of RHEL, offering similar functionality without the paid support that Red Hat requires.

![The image compares Red Hat's enterprise offering with a community version, highlighting differences in support and cost.](https://kodekloud.com/kk-media/image/upload/v1752881131/notes-assets/images/Learning-Linux-Basics-Course-Labs-Package-Management-Introduction/frame_140.jpg)

> [!important]
> **Subscription vs. Free Alternative**
>
> RHEL is available exclusively through a paid subscription, providing comprehensive support for mission-critical systems and early access to features. CentOS, however, offers a free alternative for enterprise environments.

Before diving into package managers, let’s clarify what a package is. In its simplest form, a package is a compressed archive containing all the files necessary for specific software to run. For example, when installing the image editing software GIMP (GNU Image Manipulation Program) on Ubuntu, the GIMP.DEB package contains all the necessary binaries, supporting files, and metadata for proper installation and execution.

At first glance, downloading and installing a package might seem straightforward. However, as Bob points out, why don’t we use the same process for every Linux installation? Dave explains that the diversity of Linux distributions—each with its own tools, libraries, or kernel variations—can lead to compatibility issues. To overcome these challenges, packages include a manifest of dependencies: programs and version requirements that must be met for the software to function correctly. Without the necessary dependencies, installation errors can occur.

For instance, when attempting to install GIMP on an Ubuntu 18.04 system, you might encounter dependency issues as shown below:

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

Keep in mind that each dependency may have further dependencies, making manual package installation increasingly complex. This is where a package manager proves invaluable.

A package manager automates the installation, upgrade, configuration, and removal of software packages in Linux. It verifies package integrity and authenticity using digital certificates and checksums, ensuring that the downloaded package comes from a trusted source. Additionally, package managers simplify tasks such as querying for packages, grouping them by function, and managing complex dependency chains—thus avoiding the notorious "dependency hell."

![The image illustrates the concept of package managers, showing a Linux system, a package manager, and a repository containing packages and dependencies.](https://kodekloud.com/kk-media/image/upload/v1752881133/notes-assets/images/Learning-Linux-Basics-Course-Labs-Package-Management-Introduction/frame_300.jpg)

Some key functions of a package manager include:

- Ensuring the integrity and authenticity of packages.
- Simplifying the installation process.
- Grouping packages by function to reduce user confusion.
- Managing dependencies to ensure all required components are included during installation.

![The image lists functions of package managers: package integrity and authenticity, simplified package management, grouping packages, and managing dependencies.](https://kodekloud.com/kk-media/image/upload/v1752881133/notes-assets/images/Learning-Linux-Basics-Course-Labs-Package-Management-Introduction/frame_350.jpg)

Below is a table summarizing the different package managers and their common use cases:

| Package Manager | Supported Distributions            | Description                                    |
| --------------- | ---------------------------------- | ---------------------------------------------- |
| DPKG            | Debian-based distributions         | Base package manager for Debian systems        |
| APT             | Ubuntu, Linux Mint, elementary OS  | Front-end for the DPKG system                  |
| APT-GET         | Debian-based distributions         | Traditional command-line front-end for DPKG    |
| RPM             | RHEL, CentOS, Fedora               | Base package manager for Red Hat-based systems |
| YUM             | RHEL, CentOS, Fedora               | Front-end for RPM systems                      |
| DNF             | Modern Red Hat-based distributions | Feature-rich front-end for RPM systems         |

> [!important]
> **Next Steps**
>
> Next, we will dive deeper into RPM and YUM for RPM-based distributions followed by a detailed exploration of DEB and APT for Debian-based systems.

![The image lists types of package managers: DPKG, RPM, APT, YUM, APT-GET, and DNF, with a "KodeKloud" logo.](https://kodekloud.com/kk-media/image/upload/v1752881134/notes-assets/images/Learning-Linux-Basics-Course-Labs-Package-Management-Introduction/frame_420.jpg)

For further reading on package management concepts, explore these resources:

- [Introduction to Linux Package Management](https://example.com/linux-package-management)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

This comprehensive overview sets the stage for understanding and efficiently managing software packages on various Linux distributions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/7ced7d44-760f-47a8-a9bc-69971bb0ca17/lesson/13a92413-8972-4371-b11b-1f07c4122c42)**
>
> Watch video content
