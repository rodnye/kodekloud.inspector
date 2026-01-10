# Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Streams/Overview)

---

## Table of Contents

- Overview
  - Standard Streams in Linux
  - Redirecting Streams
  - Examples
  - Links and References
  - Further Reading
  - Watch Video

---

## Content

Advanced Bash Scripting

Streams

# Overview

In this lesson, we’ll dive into Linux streams and learn how to manipulate them in shell scripting. Linux streams are the flow of data between processes—much like water flowing through a pipe. Just as you can redirect a river with gates, you can reroute streams in the shell using redirection operators and pipes.

![The image is a "Streams Overview" diagram comparing general streams, represented by wavy lines and gates or valves, to Linux streams, represented by code symbols and redirection operators or programming constructs.](https://kodekloud.com/kk-media/image/upload/v1752868642/notes-assets/images/Advanced-Bash-Scripting-Overview/streams-overview-diagram-linux-comparison.jpg)

Understanding streams is essential for robust shell scripts. You’ll see how to capture command output, handle errors, and chain commands with pipes to build powerful one-liners.

---

## Standard Streams in Linux

Every Linux process is born with three standard file descriptors:

| File Descriptor | Stream Name | Description                              | Default Source / Destination |
| --------------- | ----------- | ---------------------------------------- | ---------------------------- |
| 0               | stdin       | Reads input (keyboard or another stream) | Keyboard or pipe             |
| 1               | stdout      | Writes normal output                     | Terminal or redirected file  |
| 2               | stderr      | Writes error messages and diagnostics    | Terminal or redirected file  |

- Standard input (fd 0) typically reads from your keyboard  
  ![The image is a "Streams Overview" slide showing "0: Stdin" with an icon of a keyboard, indicating standard input.](https://kodekloud.com/kk-media/image/upload/v1752868643/notes-assets/images/Advanced-Bash-Scripting-Overview/streams-overview-stdin-keyboard.jpg)
- Standard output (fd 1) displays command results
- Standard error (fd 2) sends error messages  
  ![The image is a slide titled "Streams Overview" showing "2: Stderr" with an icon of a window and an exclamation mark, indicating standard error output.](https://kodekloud.com/kk-media/image/upload/v1752868644/notes-assets/images/Advanced-Bash-Scripting-Overview/streams-overview-stderr-icon.jpg)

> [!important]
> **Note**
>
> `stdout` and `stderr` both default to your terminal. Redirecting one does not affect the other unless you explicitly combine them.

---

## Redirecting Streams

You can reroute streams using `<`, `>`, and pipes (`|`). This allows you to save output to files, read input from files, or chain commands together.

![The image is a "Streams Overview" slide showing three concepts: output redirection, input redirection, and pipes, each represented by a symbol.](https://kodekloud.com/kk-media/image/upload/v1752868645/notes-assets/images/Advanced-Bash-Scripting-Overview/streams-overview-redirection-pipes.jpg)

```
# Redirect stdout to a file
grep "error" logfile.txt > results.txt


# Redirect stderr to a file
gcc program.c 2> compile_errors.log


# Send both stdout and stderr to the same file
./run_tests.sh > all_output.log 2>&1


# Read stdin from a file
sort < unsorted_list.txt


# Pipe stdout of one command into stdin of another
ps aux | grep sshd
```

> [!important]
> **Warning**
>
> When combining redirections, order matters. Always place `2>&1` after `> file` to capture both streams.

---

## Examples

Capture command output and errors separately:

```
ls -l /some/path > listing.txt 2> errors.txt
```

Chain commands using pipes to filter data:

```
cat server.log | grep "WARN" | sort | uniq -c
```

Use input redirection to feed a script:

```
bash < setup_script.sh
```

---

## Links and References

- [GNU Bash Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)
- [Linux Input/Output](https://tldp.org/LDP/intro-linux/html/sect_03_04.html)
- [Linux Streams and Pipes](https://www.kernel.org/doc/html/latest/admin-guide/io.html)

## Further Reading

| Topic              | Description                        | Link                                                              |
| ------------------ | ---------------------------------- | ----------------------------------------------------------------- |
| Bash Scripting     | Comprehensive guide to Bash syntax | https://www.gnu.org/software/bash/manual/                         |
| Advanced Pipelines | Building complex command pipelines | https://www.linuxjournal.com/content/beauty-pipelines             |
| File Descriptors   | Low-level I/O in Unix/Linux        | https://opensource.com/article/18/4/introduction-file-descriptors |

Mastering streams and redirection will elevate your shell scripting from basic commands to automation powerhouses. Practice these techniques to handle data flows confidently in your scripts.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/76035247-41d9-432f-8542-a5090957f732)**
>
> Watch video content
