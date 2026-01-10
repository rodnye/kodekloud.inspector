# Search file using Grep - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Search-file-using-Grep)

---

## Table of Contents

- Search file using Grep
  - Basic Usage
  - Case-Insensitive Search
  - Recursive Search
  - Inverting the Search
  - Matching Whole Words
  - Extracting Only the Matched Text
  - Conclusion
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Search file using Grep

Grep is a powerful command-line utility that allows you to search for specific patterns within text files. In many cases, you may be dealing with large files containing extensive data, and grep helps you extract the precise information you need efficiently. This guide covers various grep options to help you search text files effectively.

## Basic Usage

The basic syntax of grep is:

```
grep [OPTIONS] 'search_pattern' file
```

At minimum, provide a search pattern and the target file. For example, to search for lines containing the text "CentOS" in the `/etc/os-release` file:

```
$ grep 'CentOS' /etc/os-release
NAME="CentOS Stream 8"
PRETTY_NAME="CentOS Stream 8"
REDHAT_SUPPORT_PRODUCT_VERSION="CentOS Stream"
```

Remember that grep is case-sensitive by default. Searching with a different case might yield different results. For instance, searching for "centos" in all lowercase:

```
$ grep 'centos' /etc/os-release
ID="centos"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://centos.org/"
```

## Case-Insensitive Search

To perform a search regardless of case sensitivity, use the `-i` option. This option ensures that grep matches "CentOS", "centos", or even "CENTOS", as shown below:

```
$ grep -i 'centos' /etc/os-release
NAME="CentOS Stream 8"
ID="centos"
PRETTY_NAME="CentOS Stream 8"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://centos.org/"
REDHAT_SUPPORT_PRODUCT_VERSION="CentOS Stream"
```

## Recursive Search

If you need to search through an entire directory and its subdirectories, leverage the `-r` option (recursive search). For instance, to search for "CentOS" in all files under the `/etc/` directory, use:

```
$ grep -r 'CentOS' /etc/
grep: /etc/crypttab: Permission denied
grep: /etc/pki/syslog: Permission denied
grep: /etc/lvm/archive: Permission denied
grep: /etc/lvm/backup: Permission denied
grep: /etc/lvm/cache: Permission denied
/etc/centos-release:CentOS Stream release 8
/etc/krb5.conf.d/kcm_default_ccache:# On Fedora/RHEL/CentOS, this is /etc/krb5.conf.d/
/etc/grub.d: Permission denied
/etc/yum.repos.d/CentOS-Stream-AppStream.repo:# CentOS-Stream-AppStream.repo
/etc/yum.repos.d/CentOS-Stream-AppStream.repo:# close to the client.  You should use this for CentOS updates unless you are
/etc/yum.repos.d/CentOS-Stream-AppStream.repo:name=CentOS Stream $releasever - AppStream
/etc/yum.repos.d/CentOS-Stream-BaseOS.repo:# CentOS-Stream-BaseOS.repo
```

> [!important]
> **Permission Denied Notice**
>
> If you encounter "Permission denied" errors, it is likely because your current user lacks the necessary read permissions for some system files.

You can also combine case insensitivity with recursive search using the `-ir` options:

```
$ grep -ir 'centos' /etc/
grep: /etc/crypttab: Permission denied
grep: /etc/pki/syslog: Permission denied
grep: /etc/lvm/archive: Permission denied
grep: /etc/lvm/backup: Permission denied
grep: /etc/lvm/cache: Permission denied
/etc/centos-release:CentOS Stream release 8
/etc/krb5.conf.d/kcm_default_ccache:# On Fedora/RHEL/CentOS, this is /etc/krb5.conf.d/
/etc/grub.d: Permission denied
/etc/yum.repos.d/CentOS-Stream-AppStream.repo:# CentOS-Stream-AppStream.repo
/etc/yum.repos.d/CentOS-Stream-AppStream.repo:# close to the client.  You should use this for CentOS updates unless you are
/etc/yum.repos.d/CentOS-Stream-AppStream.repo:name=CentOS Stream $releasver - AppStream
/etc/yum.repos.d/CentOS-Stream-BaseOS.repo:# CentOS-Stream-BaseOS.repo
```

If necessary, prepend your command with `sudo` to gain the appropriate permissions:

```
$ sudo grep -ir 'centos' /etc/
```

This command may produce output similar to:

```
/etc/dnf/vars/contentdir:centos
/etc/rpm/macros.dist:%centos_ver 8
/etc/rpm/macros.dist:%centos 8
/etc/lvm/archive/cs_00000-1586619700.vg:creation_host = "LFCS-CentOS" # Linux LFCS-CentOS 4.18.0-338.el8.x86_64 #1 SMP Fri Aug 27 17:32:14 UTC 2021 x86_64
/etc/lvm/archive/cs_00000-1586619700.vg:    creation_host = "LFCS-CentOS"
/etc/lvm/archive/cs_00000-1586619700.vg:creation_host = "LFCS-CentOS" # Linux LFCS-CentOS 4.18.0-338.el8.x86_64 #1 SMP Fri Aug 27 17:32:14 UTC 2021 x86_64
/etc/lvm/backup/cs:creation_host = "LFCS-CentOS"
/etc/lvm/backup/cs:    creation_host = "LFCS-CentOS"
/etc/centos-release:CentOS Stream release 8
```

## Inverting the Search

Sometimes you may want to display lines that do not match a specific pattern. Use the `-v` option, which inverts the match. The following example shows how to list lines in `/etc/os-release` that do not contain the text "centos" (case insensitive):

```
$ grep -vi 'centos' /etc/os-release
VERSION="8"
ID_LIKE="rhel fedora"
VERSION_ID="8"
PLATFORM_ID="platform:el8"
ANSI_COLOR="0;31"
BUG_REPORT_URL="https://bugzilla.redhat.com/"
REDHAT_SUPPORT_PRODUCT="Red Hat Enterprise Linux 8"
```

## Matching Whole Words

If you need to search for an exact word and avoid partial matches, use the `-w` option. For example, to search for only the whole word "red" in a case-insensitive manner:

```
$ grep -w -i 'red' /etc/os-release
BUG_REPORT_URL="https://bugzilla.redhat.com/"
REDHAT_SUPPORT_PRODUCT="Red Hat Enterprise Linux 8"
REDHAT_SUPPORT_PRODUCT_VERSION="CentOS Stream"
```

## Extracting Only the Matched Text

By default, grep prints the entire line where the match is found. If you want to extract only the matching segment, use the `-o` option:

```
$ grep -oi 'centos' /etc/os-release
CentOS
centos
CentOS
centos
centos
centos
CentOS
```

## Conclusion

This article reviewed various techniques for searching text in Linux using the grep command. From basic usage to advanced options like recursive search, matching whole words, and inverting search results, grep offers a wide range of functionalities to help you efficiently process large text files. For further details, consider exploring additional Linux command tutorials and documentation.

For more information on Linux command-line tools, check out [Linux Command Overview](https://www.linux.org/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/a4cfc27c-b1d3-4125-8772-eee204df982c)**
>
> Watch video content
