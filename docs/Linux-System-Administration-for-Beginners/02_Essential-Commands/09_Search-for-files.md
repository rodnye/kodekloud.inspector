# Search for files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Search-for-files)

---

## Table of Contents

- Search for files
  - Basic Usage
  - Specifying the Search Path First
  - Name-Based Searches
  - Time-Based Searches
  - Size-Based Searches
  - Combining Expressions
  - Permission-Based Searches
  - Further Reading & References
  - Watch Video
  - Practice Lab
    - Examples
    - Modified Time by Minutes (-mmin)
    - Modified Time by Days (-mtime)
    - Change Time (-ctime)
    - OR Operator
    - NOT Operator

---

## Content

Linux System Administration for Beginners

Essential Commands

# Search for files

In this guide, you’ll learn how to quickly locate files on a Linux system using the powerful `find` command. Whether you need to hunt down large log files, uncover recently modified documents, or filter by permissions, `find` provides flexible options to suit your needs.

By default, files on Linux are organized under standard directories:

- SSH daemon configurations: `/etc/ssh`
- System logs: `/var/log`

However, there are many scenarios where you must perform an arbitrary search:

- Locate all image files beneath your web directory
- Identify huge files when disk space is low
- List files modified or created within a specific timeframe

Below, we cover the most common use cases with examples.

## Basic Usage

The general syntax is:

```
find [search_path] [expression]
```

If you omit `search_path`, `find` searches the **current directory**.

> [!important]
> **Note**
>
> Omitting the search path is equivalent to specifying `.` (the current directory).

### Examples

```
# Search by name under /usr/share for JPEG files
find /usr/share/ -name '*.jpg'


# Find files larger than 10 MB in /lib64
find /lib64/ -size +10M


# List files modified in the last minute under /dev
find /dev/ -mmin -1
```

## Specifying the Search Path First

Always place the directory to search **before** your search criteria.

Incorrect (no results under `/bin`):

```
find -name file1.txt /bin
```

Correct:

```
find /bin/ -name file1.txt
find -name file1.txt    # searches the current directory
```

## Name-Based Searches

- `-name` : case-sensitive filename match
- `-iname` : case-insensitive filename match
- Wildcards (`*`) match any sequence of characters

```
find -name felix
find -iname FELIX
find -name "f*"          # all files starting with 'f'
```

## Time-Based Searches

You can filter files based on modification or change times.

### Modified Time by Minutes (`-mmin`)

| Syntax | Description                 |
| ------ | --------------------------- |
| `n`    | exactly _n_ minutes ago     |
| `-n`   | within the last _n_ minutes |
| `+n`   | more than _n_ minutes ago   |

```
find -mmin 5    # exactly 5 minutes ago
find -mmin -5   # in the last 5 minutes
find -mmin +5   # more than 5 minutes ago
```

### Modified Time by Days (`-mtime`)

- `0` : within the last 24 hours
- `1` : between 24 and 48 hours ago
- `+n` : more than _n_ days ago
- `-n` : less than _n_ days ago

```
find -mtime 0    # modified within the last day
find -mtime 1    # modified one to two days ago
```

### Change Time (`-ctime`)

Tracks **metadata** changes (permissions, ownership):

```
find -ctime 1    # metadata changed one to two days ago
```

## Size-Based Searches

Filter files by size using the following suffixes:

| Suffix | Unit      |
| ------ | --------- |
| `c`    | bytes     |
| `k`    | kilobytes |
| `M`    | megabytes |
| `G`    | gigabytes |

| Syntax | Description         |
| ------ | ------------------- |
| `n`    | exactly _n_ units   |
| `-n`   | less than _n_ units |
| `+n`   | more than _n_ units |

```
find -size 512k    # exactly 512 KB
find -size -512k   # less than 512 KB
find -size +512k   # more than 512 KB
```

## Combining Expressions

By default, multiple expressions are combined with **AND**:

```
# Files starting with 'f' AND exactly 512 KB in size
find -name "f*" -size 512k
```

### OR Operator

Use `-o` to OR expressions:

```
# Files that start with 'f' OR are 512 KB in size
find -name "f*" -o -size 512k
```

### NOT Operator

Negate conditions with `-not` or an escaped `!`:

```
# Exclude files starting with 'f'
find -not -name "f*"


# Equivalent using escaped '!'
find \! -name "f*"
```

## Permission-Based Searches

Search by file permission bits (octal notation):

| Mode Format | Description                 |
| ----------- | --------------------------- |
| `mode`      | exact match                 |
| `-mode`     | at least the bits in `mode` |
| `/mode`     | any of the bits in `mode`   |

Examples (mode `664` = `rw-rw-r--`):

```
find -perm 664       # exactly 664
find -perm -664      # at least these bits
find -perm /664      # any of these bits
```

More permission filters:

```
find -perm 600       # owner read/write only
find -perm -100      # owner has execute
find \! -perm -o=r   # not readable by others
find -perm /u=r,g=r,o=r  # readable by user OR group OR others
```

> [!important]
> **Warning**
>
> Be careful to quote wildcard patterns (e.g., `"*.txt"`), especially when running in scripts or complex shells.

---

## Further Reading & References

- [GNU Findutils Manual](https://www.gnu.org/software/findutils/manual/find.html)
- [Linux `find` Command on tldr.sh](https://tldr.sh/)
- [Advanced `find` Examples](https://www.baeldung.com/linux/find-command)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/ed5aa87a-c660-4fd4-87f8-e5e4bc23327d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/6da024e0-2e3c-4504-beac-38ebf4e76563)**
>
> Practice lab
