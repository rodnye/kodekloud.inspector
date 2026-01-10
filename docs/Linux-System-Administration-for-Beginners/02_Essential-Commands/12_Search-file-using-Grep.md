# Search file using Grep - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Search-file-using-Grep)

---

## Table of Contents

- Search file using Grep
  - Table of Common Options
  - General Syntax
  - 1. Basic, Case-Sensitive Search
  - 2. Case-Insensitive Search
  - 3. Recursive Search in Directories
  - 4. Invert Match
  - 5. Match Whole Words Only
  - 6. Show Only the Matched Text
  - Links and References
  - Watch Video

---

## Content

Linux System Administration for Beginners

Essential Commands

# Search file using Grep

Searching for text patterns across files and directories is a common task on Linux systems. The `grep` command lets you quickly locate lines that match a specified string or regular expression.

## Table of Common Options

| Option | Description                               | Example                              |
| ------ | ----------------------------------------- | ------------------------------------ |
| \\-i   | Ignore case (case-insensitive search)     | `grep -i 'error' logfile.txt`        |
| \\-r   | Recursive search in all subdirectories    | `grep -r 'TODO' /home/user/projects` |
| \\-v   | Invert match (show non-matching lines)    | `grep -v 'DEBUG' app.log`            |
| \\-w   | Match whole words only                    | `grep -w 'user' /etc/passwd`         |
| \\-o   | Show only the part of a line that matches | `grep -o '[0-9]\\+' data.txt`        |

---

## General Syntax

```
grep [OPTIONS] PATTERN [FILE...]
```

- **PATTERN**  
  The text or [regular expression](https://www.gnu.org/software/grep/manual/grep.html#Regular-Expressions) to search for.
- **FILE**  
  One or more files or directories to scan. If no file is given, `grep` reads from standard input.

> [!important]
> **Note**
>
> Always quote patterns that contain spaces or shell metacharacters:
>
> ```
> grep -i 'error message' /var/log/syslog
> ```

---

## 1\. Basic, Case-Sensitive Search

By default, `grep` performs a case-sensitive search. To find lines containing **CentOS** in `/etc/os-release`:

```
$ grep 'CentOS' /etc/os-release
NAME="CentOS Stream 8"
PRETTY_NAME="CentOS Stream 8"
REDHAT_SUPPORT_PRODUCT_VERSION="CentOS Stream"
```

---

## 2\. Case-Insensitive Search

Use `-i` to ignore case differences. This matches “centos”, “CentOS”, or “CENTOS” alike:

```
$ grep -i 'centos' /etc/os-release
NAME="CentOS Stream 8"
ID="centos"
PRETTY_NAME="CentOS Stream 8"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://centos.org/"
REDHAT_SUPPORT_PRODUCT_VERSION="CentOS Stream"
```

---

## 3\. Recursive Search in Directories

To search through all files in a directory and its subdirectories, combine `-r` with your pattern:

```
$ grep -r 'CentOS' /etc/
/etc/centos-release:CentOS Stream release 8
/etc/yum.repos.d/CentOS-Stream-AppStream.repo:# CentOS-Stream-AppStream.repo
```

Combine `-r` and `-i` for a recursive, case-insensitive search:

```
$ grep -ir 'centos' /etc/
/etc/centos-release:CentOS Stream release 8
/etc/krb5.conf.d/kcm_default_ccache:# On Fedora/RHEL/CentOS, this is /etc/krb5.conf.d/
…
```

> [!important]
> **Warning**
>
> You may encounter “Permission denied” messages when scanning protected directories. Use `sudo` if you need elevated privileges:
>
> ```
> sudo grep -ir 'centos' /etc/
> ```

---

## 4\. Invert Match

Show only the lines that **do not** contain the pattern. Use the `-v` option:

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

---

## 5\. Match Whole Words Only

To avoid matching substrings (e.g., “redhat” when you want “red”), add the `-w` flag:

```
$ echo -e "red Red redhat RED" | grep -iw 'red'
red
Red
RED
```

---

## 6\. Show Only the Matched Text

By default, `grep` prints the entire line containing the match. Use `-o` to display only the portion that matches:

```
$ grep -oi 'centos' /etc/os-release
CentOS
centos
CENTOS
centos
```

---

You’ve now covered the essentials of `grep` for searching text in files. In upcoming lessons, we will explore more advanced text-processing tools like `awk` and `sed`.

## Links and References

- [GNU grep Manual](https://www.gnu.org/software/grep/manual/grep.html)
- [Linux Command Line Basics](https://linuxcommand.org/)
- [Regular Expressions Overview](https://www.regular-expressions.info/)
- [Bash Guide for Beginners](https://tldp.org/LDP/Bash-Beginners-Guide/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/f38bcd9a-c4e3-4161-87c6-a75e4117c3d7)**
>
> Watch video content
