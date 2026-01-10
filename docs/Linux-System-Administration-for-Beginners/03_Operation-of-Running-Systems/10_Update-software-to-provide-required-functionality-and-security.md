# Update software to provide required functionality and security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Update-software-to-provide-required-functionality-and-security)

---

## Table of Contents

- Update software to provide required functionality and security
  - Package Management with DNF
  - Upgrading All Out‐of‐Date Packages
  - Reboot After Core Updates
  - Summary of Common Commands
  - Links and References
  - Watch Video
    - Checking for Available Updates

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Update software to provide required functionality and security

Keeping your Linux system up to date is critical—most online attacks exploit known vulnerabilities in outdated software. In this guide, you’ll learn how to use the DNF package manager on CentOS Stream (and other RHEL‐based distributions) to check for updates, apply upgrades, and reboot when necessary.

> [!important]
> **Note**
>
> Regular updates not only patch security holes but also introduce new features and performance improvements.

## Package Management with DNF

DNF (Dandified YUM) handles software installations, removals, and upgrades on CentOS Stream 8 and similar distributions. Before applying updates, always list the packages that have newer versions available.

### Checking for Available Updates

Run the following command to see which packages can be updated:

```
dnf check-update
```

Sample output:

```
CentOS Stream 8 - AppStream                         11 kB/s |  4.4 kB     00:00
CentOS Stream 8 - BaseOS                            14 kB/s |  3.9 kB     00:00
CentOS Stream 8 - Extras                            7.5 kB/s |  3.0 kB     00:00


Installing:
 kernel                          x86_64  4.18.0-348.2.1.el8_5   baseos   7.0 M
 kernel-devel                    x86_64  4.18.0-348.2.1.el8_5   baseos  20 M
 alsa-sof-firmware.noarch        1.9-1.el8                       baseos
 bpftool.x86_64                  4.18.0-348.2.1.el8_5           baseos
 device-mapper.x86_64            8:1.02.181-1.el8                baseos


Obsoleting Packages
 kernel-headers.x86_64           4.18.0-348.2.1.el8_5            baseos
 kernel-headers.x86_64           4.18.0-348.el8                  @baseos
```

This output categorizes packages that will be installed, upgraded, or removed.

## Upgrading All Out‐of‐Date Packages

To perform a full system upgrade, use:

```
sudo dnf upgrade
```

You’ll receive a transaction summary like this:

```
Transaction Summary
================================================================================
 Install  4 Packages
 Upgrade  17 Packages


Total download size: 137 M
Is this ok [y/N]:
```

- **Install**: New dependencies required by updated packages
- **Upgrade**: Packages being replaced with newer versions

Type `y` and press Enter to proceed.

> [!important]
> **Warning**
>
> Pay attention to the download size and package count. Large upgrades on production servers may require scheduled maintenance windows.

## Reboot After Core Updates

Upgrading the kernel, system services, or libraries often requires a reboot. To apply these changes, reboot the system:

```
sudo reboot
```

> [!important]
> **Note**
>
> Always verify critical services after rebooting to ensure they’ve started correctly.

## Summary of Common Commands

| Command            | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `dnf check-update` | List all packages with available updates |
| `sudo dnf upgrade` | Upgrade every out‐of‐date package        |
| `sudo reboot`      | Restart the system to load core updates  |

## Links and References

- [CentOS Stream Documentation](https://docs.centos.org/en-US/stream/)
- [DNF Package Manager Guide](https://dnf.readthedocs.io/)
- [Linux Security Best Practices](https://www.kernel.org/doc/html/latest/admin-guide/security.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/a06d2741-99f5-4523-b00e-f909c8ece853)**
>
> Watch video content
