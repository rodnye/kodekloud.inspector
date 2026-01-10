# Compare and Manipulate File Content - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Compare-and-Manipulate-File-Content)

---

## Table of Contents

- Compare and Manipulate File Content
  - Viewing File Content
  - Automating Text Replacement with SED
  - Extracting Data with Cut
  - Removing Duplicate Entries
  - Comparing Files with Diff
  - Summary
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Compare and Manipulate File Content

In this article, we explore essential Linux command-line tools for comparing and manipulating file content. Because Linux relies heavily on text—whether for SSH sessions, configuration files, or log files—mastering these commands will improve your efficiency in managing and troubleshooting your system.

## Viewing File Content

To inspect a small file quickly, use the `cat` command with the filename. For example:

```
$ cat /home/users.txt
user1
user2
user3
user4
user5
user6
```

If you prefer to see the contents in reverse order (from bottom to top), the `tac` command is available:

```
$ tac /home/users.txt
user6
user5
user4
user3
user2
user1
```

For longer files, such as logs, it is often more practical to view only a portion of the file. The `tail` command displays the last 10 lines by default, which is useful for checking the most recent log entries. Conversely, the `head` command shows the beginning of a file.

For instance, consider a log file with 10 lines (keep in mind that empty lines might also count):

```
$ head /var/log/apt/term.log
Log started: 2024-03-11 04:41:37
Selecting previously unselected package libyaml2:amd64.
(Readi ng database ... 118768 files and directories currently installed.)
Preparing to unpack .../libyaml2_2.1.0-3ubuntu0.22.04.1_amd64.deb ...
Unpacking libyaml2:amd64 (2.1.0-3ubuntu0.22.04.1) ...
Selecting previously unselected package libvirt0:amd64.
Preparing to unpack .../libvirt0_8.0.0-1ubuntu7.8_amd64.deb ...
Unpacking libvirt0:amd64 (8.0.0-1ubuntu7.8) ...
Selecting previously unselected package libvirt-clients.
```

You can also control the number of lines displayed by using the `-n` option with both `tail` and `head`.

## Automating Text Replacement with SED

Editing multiple instances manually in large files can be error-prone and time-consuming. The Stream Editor (SED) automates search and replace tasks efficiently. For example, if a file listing user details has the country "Canada" misspelled as "canda", you can preview the correction with:

```
$ sed 's/canda/canada/g' userinfo.txt
```

Let's break down the command:

- `s/canda/canada/g`: The substitute command where `canda` is replaced with `canada` globally on each line.
- Single quotes ensure Bash does not interpret special characters.
- The `-g` flag replaces all occurrences in each line.

Once you're satisfied with the preview, apply the change in-place:

```
$ sed -i 's/canda/canada/g' userinfo.txt
```

> [!important]
> **Note**
>
> Always back up your files before performing in-place edits with `sed -i`.

It is important to quote the expression correctly to prevent Bash from misinterpreting special characters such as the asterisk. Both single and double quotes can be used:

```
$ sed "s/canda/canada/g" userinfo.txt
```

## Extracting Data with Cut

The `cut` command is ideal for extracting specific columns from a file. For example, to extract the first column—which often contains names—from a space-separated file, use:

```
$ cut -d ' ' -f 1 userinfo.txt
```

Here, `-d ' '` sets the delimiter to a space, while `-f 1` specifies that the first field should be extracted.

If the file is comma-separated, simply adjust the delimiter. For instance, to extract the third field (which could represent country names) and save the output to `countries.txt`, run:

```
$ cut -d ',' -f 3 userinfo.txt > countries.txt
```

In this command, the redirection operator (`>`) saves the extracted output to a new file.

## Removing Duplicate Entries

After extracting data—like a list of countries—you might encounter duplicate entries. The `uniq` command removes duplicates from adjacent lines. For example:

```
$ uniq countries.txt
usa
canada
usa
canada
```

To remove duplicates effectively, sort the file first so that similar lines are adjacent, then pipe the output to `uniq`:

```
$ sort countries.txt | uniq
canada
usa
```

Piping (`|`) is a powerful technique that allows you to pass the output from one command directly into another for further processing.

## Comparing Files with Diff

When system upgrades or configuration changes modify files, comparing the old and new versions is crucial. The `diff` command highlights these differences. Consider the following example:

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

In this output, the notation `1c1` indicates that line 1 of `file1` differs from line 1 of `file2`. The `<` symbol shows content from `file1`, while `>` represents content from `file2`.

For more context, use the `-c` option:

```
$ diff -c file1 file2
*** file1	2021-10-28 20:39:43.083264406 -0500
--- file2	2021-10-28 20:40:02.900262846 -0500
**************
** 1,4 ****
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

For a side-by-side visual comparison, use the `-y` option:

```
$ diff -y file1 file2
only exists in file 1        | only exists in file 2
identical line 2            | identical line 2
identical line 3            | identical line 3
only exists in file 1
```

Alternatively, you can use `sdiff` for a similar side-by-side comparison:

```
$ sdiff file1 file2
only exists in file 2
identical line 2
identical line 3
exists in file 2
```

> [!important]
> **Tip**
>
> Using the `diff` command with different options (`-c`, `-y`, or `sdiff`) can help you pinpoint changes more easily during system upgrades or when troubleshooting configuration issues.

## Summary

This guide introduced a variety of Linux commands—`cat`, `tac`, `head`, `sed`, `cut`, `sort`, `uniq`, and `diff`—that are invaluable for viewing, editing, and comparing file content. Mastery of these tools not only streamlines your workflow but also enhances your ability to manage and debug files in any Linux environment.

For more detailed explanations and advanced use cases, consider exploring additional [Linux command-line resources](https://linux.die.net/man/1/sed).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/fbd277ee-c901-4143-b4b3-518ec13339a8)**
>
> Watch video content
