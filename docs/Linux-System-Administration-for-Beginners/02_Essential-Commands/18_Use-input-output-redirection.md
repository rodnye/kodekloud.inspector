# Use input output redirection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Use-input-output-redirection)

---

## Table of Contents

- Use input output redirection
  - Default Input and Output
  - Redirecting Standard Output (>)
  - Appending Standard Output (>>)
  - Standard Streams Overview
  - Redirecting Standard Error (2>)
  - Capturing Both stdout and stderr
  - Redirecting Standard Input (<)
  - Here Documents
  - Here Strings
  - Piping Between Commands
  - Redirection Operators Summary
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

Essential Commands

# Use input output redirection

This guide shows how to manage standard input, output, and error streams in Linux. You’ll learn how to redirect data between commands, files, and devices to build powerful command-line workflows.

## Default Input and Output

Most Linux utilities read from files or **stdin** and write to **stdout** by default. For example, the `sort` command orders lines of text:

```
$ cat file.txt
6
5
1
3
4
2


$ sort file.txt
1
2
3
4
5
6
```

By default, `sort` reads from `file.txt`, sorts the lines, and sends the result to your terminal.

## Redirecting Standard Output (`>`)

Use the `>` operator to save a command’s output to a file. The target file is created if it doesn’t exist or overwritten if it does:

```
$ sort file.txt > sortedfile.txt
$ cat sortedfile.txt
1
2
3
4
5
6
```

Each time you run:

```
$ date > file.txt
```

the contents of `file.txt` are replaced by the new output.

> [!important]
> **Warning**
>
> Redirecting with `>` will **overwrite** existing files without prompt. Always double-check your filename to avoid data loss.

## Appending Standard Output (`>>`)

To append data instead of overwriting, use `>>`:

```
$ date >> file.txt
$ date >> file.txt
$ date >> file.txt
$ cat file.txt
Mon Nov  8 18:50:30 CST 2021
Mon Nov  8 18:50:31 CST 2021
Mon Nov  8 18:50:32 CST 2021
```

## Standard Streams Overview

Every Linux process has three standard streams:

| Stream | Descriptor | Description                       |
| ------ | ---------- | --------------------------------- |
| stdin  | 0          | Input (keyboard, files, pipes)    |
| stdout | 1          | Standard output (terminal, files) |
| stderr | 2          | Error messages                    |

![The image illustrates the flow of standard input, output, and error in a command-line environment, showing how data from "file.txt" is processed by the "sort" command, with standard output directed to the terminal and standard error to "errors.txt".](https://kodekloud.com/kk-media/image/upload/v1752881486/notes-assets/images/Linux-System-Administration-for-Beginners-Use-input-output-redirection/command-line-input-output-flow-diagram.jpg)

> [!important]
> **Note**
>
> By default, both **stdout** and **stderr** appear on your terminal. You can redirect each stream independently to capture output or suppress errors.

## Redirecting Standard Error (`2>`)

Send error messages to a file (or discard them) by prefixing the redirection operator with `2`:

```
$ grep -r '^The' /etc/
grep: /etc/cups/ssl: Permission denied
...
$ grep -r '^The' /etc/ 2>/dev/null
/etc/brltty/Input/tn/all.txt: The two keys at the left rear (2 columns, 1 row):
...
```

Here, `2>/dev/null` discards all errors by sending them to the null device.

## Capturing Both stdout and stderr

To redirect both streams:

```
# Separate files
$ grep -r '^The' /etc/ 1>output.txt 2>errors.txt


# Append instead of overwrite
$ grep -r '^The' /etc/ 1>>output.txt 2>>errors.txt


# Merge stderr into stdout
$ grep -r '^The' /etc/ > all_output.txt 2>&1
```

Redirecting `>` first sends **stdout** to `all_output.txt`, then `2>&1` points **stderr** at the same destination.

## Redirecting Standard Input (`<`)

Feed a file as input using `<`:

```
$ sort < file.txt
1
2
3
4
5
6
```

For commands that expect interactive input (e.g., `sendmail`), supply a file:

```
$ sendmail user@example.com < emailcontent.txt
```

## Here Documents

Embed multiline input directly in a script with a here document:

```
$ sort <<EOF
6
3
2
5
1
4
EOF
1
2
3
4
5
6
```

The shell reads stdin until it finds the terminating `EOF` marker.

## Here Strings

Use a here string (`<<<`) for single-line input:

```
$ bc <<< "1+2+3+4"
10
```

## Piping Between Commands

Chain commands with the pipe operator `|`, which sends **stdout** of one command to **stdin** of the next:

```
$ grep -v '^#' /etc/login.defs \
  | sort \
  | column -t
```

Example output:

```
CREATE_HOME      yes
ENCRYPT_METHOD   SHA512
GID_MAX          60000
GID_MIN          1000
... (and so on)
```

Pipes let you build complex data transformations by combining simple utilities.

## Redirection Operators Summary

| Operator | Stream                    | Description                     |
| -------- | ------------------------- | ------------------------------- |
| \\>      | stdout (1)                | Redirect & overwrite output     |
| \\>>     | stdout (1)                | Redirect & append output        |
| 2>       | stderr (2)                | Redirect & overwrite errors     |
| &>       | stdout (1) and stderr (2) | Redirect both to the same file  |
| <        | stdin (0)                 | Redirect input from a file      |
| <<EOF    | stdin (0)                 | Here document (multiline stdin) |
| <<<      | stdin (0)                 | Here string (single-line stdin) |

---

## Links and References

- [Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)
- [Linux I/O Redirection (TLDP)](https://tldp.org/LDP/abs/html/redirection.html)
- [Advanced Shell Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/7295b13d-8b26-4d1e-b5a2-6ef87502a7d9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/9a83d820-3004-4b8c-916c-75249ac75581)**
>
> Practice lab
