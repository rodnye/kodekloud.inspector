# Command line Help - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Working-with-Shell-I/Command-line-Help)

---

## Table of Contents

- Command line Help
  - Using "whatis" and "man"
  - Command Help Options
  - Searching with "apropos"
  - Summary
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Working with Shell I

# Command line Help

In this guide, we’ll explore several effective methods for accessing help while working in the shell. Whether you’re new to Linux and the Bash Shell or simply need a quick reference on a specific command, these built-in tools can greatly enhance your productivity.

> [!important]
> **Quick Overview**
>
> For a rapid summary of any command, try using the "whatis" command. It provides a concise, one-line description that’s perfect for verifying a command's purpose before diving deeper.

## Using "whatis" and "man"

Many commands come with comprehensive manual pages available via the "man" command. The example below demonstrates how to use both "whatis" and "man" with the `date` utility. The output of "whatis" offers a brief overview, while "man" provides detailed information including usage examples, options, and related data.

```
[~]$ whatis date
date (1)  - print or set the system date and time

[~]$ man date
DATE(1)                     User Commands                    DATE(1)

NAME
       date - print or set the system date and time

SYNOPSIS
       date [OPTION]... [+FORMAT]
       date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]

DESCRIPTION
       Display the current time in the given FORMAT, or set the system date.
```

## Command Help Options

Almost every command, whether built into the shell or provided as an external program, supports a help option. Many commands can display usage instructions when used incorrectly by adding the `-h` or `--help` flag.

For instance, you can display the help menu for the `date` command with:

```
[~]$ date --help
Usage: date [OPTION]... [+FORMAT]
       or:  date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]
Display the current time in the given FORMAT, or set the system date.
```

## Searching with "apropos"

Another useful utility is `apropos`, which searches through man page names and descriptions for a specified keyword. For example, executing:

```
[~]$ apropos modp
```

might return results like "modprobe" (the command used to load kernel modules) and "modprobe.d" (the configuration directory for modprobe). This makes it easier to find related commands or resources when you’re unsure of the exact name.

## Summary

This article provided an overview of common methods for retrieving help directly from the shell. By combining the use of "whatis", "man", the help flags (`-h`/`--help`), and `apropos`, you can quickly access both brief summaries and detailed documentation for nearly any command.

Now that you’re familiar with these tools, try applying these techniques in a hands-on lab exercise to further enhance your command-line proficiency.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/267dec49-c3e9-4627-b7f8-9bf9aa834e53/lesson/e79dd519-2c1f-4a34-97ba-6f78b1573dbe)**
>
> Watch video content
