# Read and use System Documentation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Read-and-use-System-Documentation)

---

## Table of Contents

- Read and use System Documentation
  - Quick Help with --help
  - Viewing Help in a Pager
  - Accessing Full Manuals with man
  - Searching with apropos
  - Accelerating Work with Tab Completion
  - Practice and Exam Tips
  - Summary of Documentation Tools
  - Links and References
  - Watch Video
  - Practice Lab
    - Choosing the Right Section

---

## Content

Linux System Administration for Beginners

Essential Commands

# Read and use System Documentation

Linux ships with an extensive set of built-in manuals and help tools. Whether you need a quick reminder of flags or a deep dive into syntax, you can access all of it directly from the command line. This guide covers everything from `--help` to `man` pages, `apropos` searches, and shell autocompletion.

## Quick Help with `--help`

Most commands support a `--help` or `-h` option for a concise overview:

```
$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
...
  -a, --all             do not ignore entries starting with .
  -l, --long            use a long listing format
  -h, --human-readable  with -l, print sizes in human readable format
```

Scroll through the output to find the `-l` flag for long listings:

```
$ ls -l
bin/    lib/    libexec/    local/    sbin/    share/
```

## Viewing Help in a Pager

Some tools pipe help text through a pager (usually `less`). For example:

```
$ journalctl --help
journalctl [OPTIONS...] [MATCHES...]
Query the journal.


Options:
  --system               Show the system journal
  --user                 Show the user journal
  -S, --since=DATE       Show entries not older than the specified date
  -U, --until=DATE       Show entries not newer than the specified cursor
  -b, --boot[=ID]        Show current boot or the specified boot
  --list-boots           Show terse information about recorded boots
```

Use ↑/↓ or Page Up/Page Down to navigate, then `q` to quit the pager.

## Accessing Full Manuals with `man`

The `man` command opens detailed manual pages for nearly every tool:

```
$ man journalctl
```

A typical man page contains:

- **NAME**: Brief description
- **SYNOPSIS**: Command syntax
- **DESCRIPTION**: Detailed behavior
- **OPTIONS**: Available flags and switches
- **EXAMPLES**: Usage scenarios (if provided)

### Choosing the Right Section

Many entries exist in multiple man sections (e.g., `printf`). Specify the section number to disambiguate:

> [!important]
> **Note**
>
> Section 1 is for user commands, while Section 3 covers C library functions.

```
$ man 1 printf   # The printf command
$ man 3 printf   # The printf C function
```

## Searching with `apropos`

When you only remember the topic, not the command name, `apropos` searches man-page descriptions:

```
$ apropos directory
ls (1)       - list directory contents
mkdir (1)    - make directories
du (1)       - estimate file space usage
```

> [!important]
> **Warning**
>
> If you get “no entry found,” update the man database before retrying:
>
> ```
> sudo mandb
> ```

To limit results to specific sections (e.g., 1 and 8):

```
$ apropos -s 1,8 directory
ls (1)       - list directory contents
mkdir (1)    - make directories
```

## Accelerating Work with Tab Completion

Shell autocompletion suggests commands, options, and paths.

1.  Type part of a command and press `Tab` to complete it, or press twice for a list.
2.  Use it to complete subcommands, flags, and file names.

For instance, list available `systemctl` verbs:

```
$ systemctl <Tab><Tab>
add-requires    emergency       isolate       reboot
enable          exit            poweroff      show
...
```

Complete a subcommand:

```
$ systemctl list-dep<Tab>
systemctl list-dependencies
```

And file paths:

```
$ ls /u<Tab>      # expands to /usr/
$ ls /usr/<Tab>   # lists contents
```

## Practice and Exam Tips

1.  Pick an unfamiliar command.
2.  Explore it with `--help` and `man`.
3.  Use `apropos` to discover related tools.
4.  Rely on tab completion to speed up typing.

For the Linux Foundation Certified SysAdmin exam, all of these lookup methods are allowed. Mastering them will save you time and boost your confidence.

## Summary of Documentation Tools

| Command        | Purpose                               | Example                |
| -------------- | ------------------------------------- | ---------------------- |
| `--help`       | Quick usage summary and options       | `ls --help`            |
| `man`          | Full manual pages                     | `man journalctl`       |
| `apropos`      | Search man pages by keyword           | `apropos directory`    |
| Tab Completion | Auto-complete commands and file paths | `systemctl <Tab><Tab>` |

## Links and References

- [GNU Coreutils Manual](https://www.gnu.org/software/coreutils/manual/)
- [Linux man-pages Project](https://www.kernel.org/doc/man-pages/)
- [Bash Reference Manual – Completion](https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/55f044a8-031b-433d-9031-47c68a7e840a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/0cedd136-5feb-47ab-ac75-45697d32cf8b)**
>
> Practice lab
