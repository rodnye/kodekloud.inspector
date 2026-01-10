# Read and use system documentation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Read-and-use-system-documentation)

---

## Table of Contents

- Read and use system documentation
  - Using the --help Option
  - Exploring More Complex Help: The Journalctl Example
  - Accessing Manual Pages
  - Searching for Commands with Apropos
  - Using Autocompletion
  - Final Recommendations
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Read and use system documentation

Linux offers a rich set of commands, each loaded with various options and switches. At first, it may seem challenging to remember every option, but as you use each command, its functionality gradually becomes second nature. In the meantime, Linux provides several ways to access help manuals and documentation directly from the command line.

## Using the --help Option

When you only need a quick reminder of command options, the `--help` flag is your best friend. For example, if you want to see the long listing format for the `ls` command but can’t remember the correct flag, simply run:

```
$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cf tuvSUX nor --sort is specified.


Mandatory arguments to long options are mandatory for short options too.
  -a, --all             do not ignore entries starting with .
  -A, --almost-all      do not list implied . and ..
  -B, --ignore-backups  do not list implied entries ending with ~
  -I, --ignore=PATTERN  do not list implied entries matching shell PATTERN
  -k, --kibibytes       default to 1024-byte blocks for disk usage
  -l                    use a long listing format
  -c                    with -lt: sort by, and show, ctime (time of last
                         modification of file status information);
                         with -l: show ctime and sort by name;
                         otherwise: sort by ctime, newest first
```

Scrolling through the output helps you locate the specific flag you need—in this instance, `-l`.

## Exploring More Complex Help: The Journalctl Example

Certain commands offer more detailed information beyond a brief overview. The `journalctl` command, used for querying system log files, is one such example. When you run:

```
$ journalctl --help
journalctl [OPTIONS...] [MATCHES...]


Query the journal.
Options:
  --system                 Show the system journal
  --user                   Show the user journal for the current user
  -M, --machine=CONTAINER  Operate on local container
  -S, --since=DATE         Show entries not older than the specified date
  -U, --until=DATE         Show entries not newer than the specified date
  -c, --cursor=CURSOR      Show entries starting at the specified cursor
  --after-cursor=CURSOR    Show entries after the specified cursor
  --show-cursor            Print the cursor after all the entries
  -b, --boot[=ID]          Show current boot or the specified boot
  --list-boots             Show terse information about recorded boots
```

you will notice that the output opens in a pager—a text viewer that lets you scroll up and down using the arrow keys or the page up/page down keys. To exit the pager, simply press `Q`.

## Accessing Manual Pages

Linux provides comprehensive manual pages for most commands, accessible with the `man` command. For instance, to read about `journalctl`, run:

```
$ man journalctl
```

This command displays the manual page, typically structured with the following sections:

- **NAME:** A brief description of the command.
- **SYNOPSIS:** The command syntax.
- **DESCRIPTION:** An in-depth explanation of command functionality.
- **OPTIONS:** A detailed list of command options.
- **EXAMPLES:** (Occasionally) practical usage examples.

Below is an image showcasing a terminal window displaying the manual page for the `journalctl` command, including sections such as NAME, SYNOPSIS, and DESCRIPTION.

![The image shows a terminal window displaying the manual page for the `journalctl` command, which is used to query the systemd journal. It includes sections like NAME, SYNOPSIS, and DESCRIPTION.](https://kodekloud.com/kk-media/image/upload/v1752883637/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Read-and-use-system-documentation/journalctl-manual-page-terminal.jpg)

Some commands have multiple manual pages due to overlapping names. For example, `printf` exists both as a command and a programming function. Manual pages are divided into sections, and you can specify which one to view. To see the manual page for the `printf` command, use:

```
$ man 1 printf
```

In contrast, to view the manual page for the `printf` function, run:

```
$ man 3 printf
```

For a breakdown of the manual page sections, refer to the manual for `man` itself:

```
$ man man
The table below shows the section numbers of the manual followed by the types
of pages they contain.
1  Executable programs or shell commands
2  System calls (functions provided by the kernel)
3  Library calls (functions within program libraries)
4  Special files (usually found in /dev)
5  File formats and conventions, e.g., /etc/passwd
6  Games
7  Miscellaneous (including macro packages and conventions), e.g., man(7), groff(7)
8  System administration commands (usually only for root)
9  Kernel routines [Non standard]
```

## Searching for Commands with Apropos

At times, you might forget the specific command you need, such as the one for creating a new directory. The `apropos` command searches through manual pages by examining their short descriptions. To search for manual pages that mention "directory," run:

```
$ apropos director
```

Using a term like "director" instead of "directory" broadens your search and can match entries with "directories" as well. If you encounter an error because the `apropos` database hasn’t been built, you can create it manually with:

```
$ sudo mandb
```

After updating the database, running `apropos` generates multiple entries, including those for `mkdir`. To filter the search results to only include commands (typically found in sections 1 and 8), use the `-s` option:

```
$ apropos -s 1,8 director
ls (1)        - list directory contents
mcd (1)       - change MSDOS directory
mdeltree (1)  - recursively delete an MSDOS directory and its contents
mdir (1)      - display an MSDOS directory
mdu (1)       - display the amount of space occupied by an MSDOS directory
mkdir (1)     - make directories
```

Remember that using more generic search terms like "director" can yield additional relevant entries.

## Using Autocompletion

Autocompletion can significantly speed up your work at the command line. For instance, if you start typing "system c" and press the TAB key, the shell will automatically complete it to `systemctl`.

Many commands also provide suggestions when you press TAB twice. For example, typing `systemctl` followed by a space and pressing TAB twice may present a list of available subcommands:

```
$ systemctl
add-requires       emergency          isolate         poweroff          show
add-wants          enable             is-system-running  preset         show-environment
start              stop               cancel             exit             kexec
reboot             status             suspend            cat              force-reload
kill               reload             condrestart        halt             help
rescue             list-dependencies
```

Autocompletion similarly works for file and directory names. For example, typing:

```
$ ls /u
```

and pressing TAB auto-completes to `/usr/`. Hitting TAB again typically displays the available directories in `/usr/` without the need for an explicit `ls` command:

```
$ ls /usr/
bin/    lib/    libexec/    local/    sbin/    share/
```

For longer filenames, such as `wordpress_archive.tgz`, typing a few unique characters and pressing TAB will quickly complete the name.

## Final Recommendations

> [!important]
> **Practice Makes Perfect**
>
> While `man` pages and `--help` options offer extensive information about commands, they might not always provide complete clarity at first glance. Select an unfamiliar command and explore its usage solely through its manual and help output. This practice is especially valuable for exam settings such as the [LFCS exam](https://learn.kodekloud.com/user/courses/labs-linux-foundation-certified-system-administrator-lfcs), where quickly locating documentation can be a game changer.

Here is one final example for listing the contents of the `/usr/` directory:

```
$ ls /usr/
bin/    lib/    libexec/    local/    sbin/    share/
```

Now, it's time to apply what you've learned. Happy exploring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/e2e547ad-a438-4245-b5c0-63f13fa8e10c)**
>
> Watch video content
