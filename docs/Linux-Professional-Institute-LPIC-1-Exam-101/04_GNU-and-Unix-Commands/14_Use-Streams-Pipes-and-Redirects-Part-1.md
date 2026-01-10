# Use Streams Pipes and Redirects Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Use-Streams-Pipes-and-Redirects-Part-1)

---

## Table of Contents

- Use Streams Pipes and Redirects Part 1
  - Table of Contents
  - Standard Streams Overview
  - Redirecting Output (>)
  - Appending Output (>>)
  - Discarding Output (/dev/null)
  - Merging and Redirecting Both Streams
  - Redirecting Input (<)
  - Here Documents and Here Strings
  - Pipes and Pipelines (|)
  - Quick Reference
  - Links and References
  - Watch Video
    - Here Documents (<<)
    - Here Strings (<<<)

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Use Streams Pipes and Redirects Part 1

In this lesson, you’ll master how to redirect input and output in Linux, making your command-line workflows more powerful and flexible.

## Table of Contents

1.  [Standard Streams Overview](#standard-streams-overview)
2.  [Redirecting Output](#redirecting-output-)
3.  [Appending Output](#appending-output)
4.  [Discarding Output](#discarding-output-)
5.  [Merging and Redirecting Both Streams](#merging-and-redirecting-both-streams)
6.  [Redirecting Input](#redirecting-input-)
7.  [Here Documents and Here Strings](#here-documents-and-here-strings)
8.  [Pipes and Pipelines](#pipes-and-pipelines)
9.  [Quick Reference](#quick-reference)
10. [Links and References](#links-and-references)

---

## Standard Streams Overview

Linux programs communicate using three standard streams:

| Descriptor | Stream Name              | Purpose                                |
| ---------- | ------------------------ | -------------------------------------- |
| 0          | stdin (standard input)   | Receives data (keyboard, files)        |
| 1          | stdout (standard output) | Sends regular output (terminal, files) |
| 2          | stderr (standard error)  | Sends error messages (terminal, files) |

![The image is a diagram illustrating the flow of standard input, output, and error in a command-line environment, showing how data from "file.txt" is processed by the "sort" command, with output directed to a terminal and errors to "errors.txt".](https://kodekloud.com/kk-media/image/upload/v1752881410/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Use-Streams-Pipes-and-Redirects-Part-1/command-line-input-output-diagram.jpg)

By default, both `stdout` and `stderr` appear on your terminal. You can redirect them separately:

```
$ command 1>output.txt 2>errors.txt
```

## Redirecting Output (`>`)

To save a command’s output to a file (creating or overwriting it), use the `>` operator.

1.  Create a file with unsorted numbers:

    ```
    $ cat file.txt
    6
    5
    1
    3
    4
    2
    ```

2.  Sort the file and write the result to `sortedfile.txt`:

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

> [!important]
> **Warning**
>
> Using `>` always overwrites the target file. You will lose previous contents!

## Appending Output (`>>`)

To add output to the end of an existing file without erasing its contents, use `>>`:

```
$ echo "First line"  >> file.txt
$ echo "Second line" >> file.txt
$ echo "Third line"  >> file.txt
$ cat file.txt
First line
Second line
Third line
```

## Discarding Output (`/dev/null`)

Send unwanted output or errors to `/dev/null`, the “black hole”:

```
$ grep -r '^The' /etc/ 2>/dev/null
```

This filters matching lines while discarding all error messages.

## Merging and Redirecting Both Streams

- Redirect `stdout` and `stderr` to separate files:

  ```
  $ grep -r '^The' /etc/ 1>output.txt 2>errors.txt
  ```

- Append both streams:

  ```
  $ grep -r '^The' /etc/ 1>>output.txt 2>>errors.txt
  ```

- Merge `stderr` into `stdout` and write to one file:

  ```
  $ grep -r '^The' /etc/ > all_output.txt 2>&1
  ```

> [!important]
> **Note**
>
> Order matters: `> all_output.txt 2>&1` merges error output into the same file, while reversing redirects leaves errors on the console.

## Redirecting Input (`<`)

Some commands read from `stdin` instead of a file argument. Redirect a file into `stdin` like this:

```
$ sendemail someone@example.com < email_content.txt
```

The contents of `email_content.txt` feed directly into `sendemail`.

## Here Documents and Here Strings

### Here Documents (`<<`)

Embed a block of text as input:

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

`EOF` (or any marker you choose) encloses the input region.

### Here Strings (`<<<`)

For single-line input, here strings are concise:

```
$ bc <<< "1+2+3+4"
10
```

## Pipes and Pipelines (`|`)

Pipelines let you chain commands by feeding one’s `stdout` into the next’s `stdin`. Example: filter, sort, and align columns from `/etc/login.defs`:

```
$ grep -v '^#' /etc/login.defs \
| sort \
| column -t
```

Steps:

1.  `grep -v '^#'` removes comments
2.  `sort` orders lines
3.  `column -t` aligns columns into a neat table

Example output:

```
CREATE_HOME         yes
ENCRYPT_METHOD      SHA512
GID_MAX             60000
GID_MIN             1000
HOME_MODE           0700
MAIL_DIR            /var/spool/mail
PASS_MAX_DAYS       99999
PASS_MIN_DAYS       0
PASS_MIN_LEN        5
PASS_WARN_AGE       7
SYS_GID_MAX         999
SYS_GID_MIN         201
SYS_UID_MAX         999
SYS_UID_MIN         201
UID_MAX             60000
UID_MIN             1000
UMASK               022
USERGROUPS_ENAB     yes
```

## Quick Reference

| Operator    | Description                     | Example                                                |
| ----------- | ------------------------------- | ------------------------------------------------------ |
| `>`         | Redirect stdout, overwrite file | `sort file.txt > sortedfile.txt`                       |
| `>>`        | Redirect stdout, append to file | `echo hi >> greetings.txt`                             |
| `<`         | Redirect stdin from file        | `wc -l < file.txt`                                     |
| `2>`        | Redirect stderr, overwrite file | `grep foo bar 2>errors.log`                            |
| `/dev/null` | Discard stream                  | `cmd 2>/dev/null`                                      |
| `&>`        | Redirect both stdout and stderr | `cmd &> combined.log`                                  |
| \\`         | \\`                             | Pipe stdout into next stdin                            |
| `<<EOF`     | Here document (multiline input) | See [Here Documents](#here-documents-and-here-strings) |
| `<<<`       | Here string (single-line input) | `bc <<< "2+2"`                                         |

## Links and References

- [Bash Guide](https://www.gnu.org/software/bash/manual/bash.html)
- [Linux I/O Redirection](https://tldp.org/LDP/abs/html/io-redirection.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Terraform Registry](https://registry.terraform.io/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/ddde1c84-71a5-4d55-a5fe-a8d7f319a260)**
>
> Watch video content
