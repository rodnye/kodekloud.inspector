# Compare and manipulate file content - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Compare-and-manipulate-file-content)

---

## Table of Contents

- Compare and manipulate file content
  - Viewing Files on Linux
  - Transforming Text with sed
  - Extracting Columns with cut
  - Filtering Unique Entries with uniq
  - Comparing Files with diff
  - Links and References
  - Watch Video
    - Basic Commands: cat and tac
    - Inspecting Beginnings and Endings: head and tail
    - Quick Reference: File Viewing Commands
    - Summary of diff Options
    - 1. Plain diff
    - 2. Context Diff (-c)
    - 3. Side-by-Side Diff (-y / sdiff)

---

## Content

Linux System Administration for Beginners

Essential Commands

# Compare and manipulate file content

In Linux, nearly everything—from system logs to SSH sessions and configuration files—is plain text. Mastering file viewing, editing, transformation, and comparison tools is essential for effective system administration and DevOps workflows.

---

## Viewing Files on Linux

When troubleshooting or inspecting data, these commands will help you quickly access file contents.

### Basic Commands: `cat` and `tac`

- `cat`: Dump the entire file to your terminal.
- `tac`: Display a file in reverse line order.

```
# Show all lines in order
$ cat /home/users.txt
user1
user2
user3
user4
user5
user6


# Show lines in reverse order
$ tac /home/users.txt
```

### Inspecting Beginnings and Endings: `head` and `tail`

- `head -n N`: Display the first N lines.
- `tail -n N`: Display the last N lines (default is 10).

```
# First 20 lines of a log
$ head -n 20 /var/log/dnf.log


# Last 20 lines of a log
$ tail -n 20 /var/log/dnf.log
```

### Quick Reference: File Viewing Commands

| Command     | Description          | Example                        |
| ----------- | -------------------- | ------------------------------ |
| `cat file`  | Dump whole file      | `cat /etc/hosts`               |
| `tac file`  | Dump file in reverse | `tac /home/users.txt`          |
| `head -n N` | First N lines        | `head -n 10 /var/log/syslog`   |
| `tail -n N` | Last N lines         | `tail -n 50 /var/log/auth.log` |

---

## Transforming Text with `sed`

![The image shows a terminal interface with a text file named "userinfo.txt" containing names, cities, countries, and numbers. The text appears to be part of a tutorial on transforming text using the "sed" command.](https://kodekloud.com/kk-media/image/upload/v1752881467/notes-assets/images/Linux-System-Administration-for-Beginners-Compare-and-manipulate-file-content/terminal-userinfo-sed-tutorial.jpg)

Imagine `userinfo.txt` contains a typo—“canda” instead of “canada.” You can preview a global replacement without altering the file:

```
$ sed 's/canda/canada/g' userinfo.txt
```

Breakdown of the substitute command (`s`):

- Pattern delimiters wrapped in single quotes prevent shell expansion.
- First token (`canda`) is the search string.
- Second token (`canada`) is the replacement.
- `g` (global) applies to every match on each line.
- Specify the file at the end.

> [!important]
> **Note**
>
> By default, omitting `g` (i.e., `sed 's/canda/canada/'`) replaces only the first occurrence per line.

Once you’re ready to edit the file in place, add `-i`:

```
$ sed -i 's/canda/canada/g' userinfo.txt
```

Verify with:

```
$ cat userinfo.txt
```

---

## Extracting Columns with `cut`

Field extraction is straightforward using `cut`. For space-delimited data, grab usernames from `userinfo.txt`:

```
$ cut -d ' ' -f 1 userinfo.txt
ravi
mark
john
ravi
mary
```

- `-d ' '` specifies a space delimiter.
- `-f 1` selects the first field.

For comma-separated files, pull the third field (country) and save it:

```
$ cut -d ',' -f 3 userinfo.txt > countries.txt
```

Now `countries.txt` holds all the country names, including duplicates.

---

## Filtering Unique Entries with `uniq`

The `uniq` command collapses only adjacent duplicate lines. To get a sorted list of unique countries:

```
# Collapse adjacent duplicates
$ uniq countries.txt


# Sort and then collapse duplicates
$ sort countries.txt | uniq
canada
usa
```

> [!important]
> **Note**
>
> Always sort before piping to `uniq` if you want to remove all duplicate entries, not just adjacent ones.

---

## Comparing Files with `diff`

When a package upgrade modifies a configuration, `diff` helps you spot exactly what's changed.

### Summary of `diff` Options

| Option          | Description                            | Example               |
| --------------- | -------------------------------------- | --------------------- |
| (none)          | Plain diff                             | `diff file1 file2`    |
| `-c`            | Context diff (shows surrounding lines) | `diff -c file1 file2` |
| `-y` or `sdiff` | Side-by-side diff alignment            | `diff -y file1 file2` |

### 1\. Plain `diff`

```
$ diff file1 file2
1c1
< only exists in file 1
---
> only exists in file 2
4c4
< only exists in file 1
---
> only exists in file 2
```

- `1c1`: Change at line 1.
- `<`: Content from the first file.
- `>`: Content from the second file.

### 2\. Context Diff (`-c`)

Shows a few lines of context around each change, marked with `!`:

```
$ diff -c file1 file2
*** file1
--- file2
***************
*** 1,4 ****
! only exists in file 1
  identical line 2
  identical line 3
! only exists in file 1
--- 1,4 ----
! only exists in file 2
  identical line 2
  identical line 3
! only exists in file 2
```

### 3\. Side-by-Side Diff (`-y` / `sdiff`)

Aligns both files in columns for easy scanning:

```
$ diff -y file1 file2
only exists in file 1    | only exists in file 2
identical line 2         | identical line 2
identical line 3         | identical line 3
only exists in file 1    | only exists in file 2


$ sdiff file1 file2
only exists in file 1    | only exists in file 2
identical line 2         unchanged
identical line 3         unchanged
only exists in file 1    | only exists in file 2
```

Here, `|` separates differing lines; identical lines may appear without markers.

---

## Links and References

- [Linux Command Basics](https://linuxcommand.org/)
- [GNU `sed` Manual](https://www.gnu.org/software/sed/manual/sed.html)
- [GNU `cut` Documentation](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html)
- [GNU `diff` Manual](https://www.gnu.org/software/diffutils/manual/diffutils.html)
- [Advanced Text Processing with `awk`](https://www.gnu.org/software/gawk/manual/gawk.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/419c27b6-b09c-442a-a3db-72d166e96e0e)**
>
> Watch video content
