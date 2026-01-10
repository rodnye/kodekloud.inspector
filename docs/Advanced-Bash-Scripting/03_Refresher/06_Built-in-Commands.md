# Built in Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Refresher/Built-in-Commands)

---

## Table of Contents

- Built in Commands
  - The Chef Analogy
  - Command Categories and Types
  - Identifying Built-ins vs. External Binaries
  - Performance Benefits of Built-ins
  - Verifying Process Creation with strace
  - External vs. Built-in Counterparts
  - Listing Built-ins and Keywords
  - References
  - Watch Video
    - Benchmarks: true vs /usr/bin/true
    - Command Execution Times at a Glance

---

## Content

Advanced Bash Scripting

Refresher

# Built in Commands

Every time you invoke an external binary in a shell script, the shell forks a new process—adding latency and consuming CPU/memory. Bash and other modern shells mitigate this overhead by providing built-in commands that execute inside the shell process. Leveraging built-ins can dramatically speed up your scripts and reduce resource usage.

In this guide, we’ll cover:

- Command categories and types
- How to identify built-in commands
- Performance benefits and benchmarks
- Verifying process creation with `strace`
- Listing all built-in commands and keywords

![The image is a slide titled "Built-in" with a list of topics: command categories and types, how to identify built-in commands, and their performance benefits. It includes a checkmark icon next to each topic.](https://kodekloud.com/kk-media/image/upload/v1752868589/notes-assets/images/Advanced-Bash-Scripting-Built-in-Commands/built-in-commands-topics-checkmark.jpg)

## The Chef Analogy

Think of your shell as a chef in a kitchen. If the chef delegated every simple task—chopping vegetables, stirring soup, plating food—to sous-chefs, the overhead would be enormous. Instead, the chef handles routine tasks directly and only calls for help on specialized jobs. Built-in commands work the same way: the shell “chef” handles them instantly, while external binaries require spawning a separate “assistant” process.

## Command Categories and Types

Shell commands fall into two main categories:

| Category         | Description                                                           | Examples                  |
| ---------------- | --------------------------------------------------------------------- | ------------------------- |
| Built-in Command | Implemented inside the shell; runs without forking a new process.     | `cd`, `echo`, `true`      |
| External Binary  | Stored on disk; invoking them forks a new process then uses `execve`. | `/bin/ls`, `/usr/bin/cat` |

Example:

```
$ ls
file1.txt  file2.txt


$ echo "Hello, world!"
Hello, world!
```

In the first case, `ls` is an external binary loaded from disk; `echo` is handled directly by the shell.

## Identifying Built-ins vs. External Binaries

Use the `type` built-in to check how a command is implemented:

```
$ type echo
echo is a shell builtin


$ type cat
cat is /usr/bin/cat
```

> [!important]
> **Note**
>
> You can also use `which` or `command -v`, but `type` gives the most accurate distinction between built-in, keyword, and function.

## Performance Benefits of Built-ins

### Benchmarks: `true` vs `/usr/bin/true`

The `true` command simply returns a zero exit status. Compare its built-in version to the external binary:

```
$ time true
real    0m0.000s
user    0m0.000s
sys     0m0.000s


$ time /usr/bin/true
real    0m0.009s
user    0m0.001s
sys     0m0.005s
```

### Command Execution Times at a Glance

| Command | Built-in (real) | External `/usr/bin` (real) |
| ------- | --------------- | -------------------------- |
| `true`  | 0.000s          | 0.009s                     |
| `echo`  | 0.000s          | 0.324s                     |

Built-ins not only start faster but also complete quicker, especially when called repeatedly in loops.

## Verifying Process Creation with `strace`

To confirm built-ins don’t fork, trace `execve` system calls in your current shell:

1.  **Find your shell’s PID**

    ```
    $ pgrep -o bash
    56120
    ```

2.  **Attach `strace` and filter for `execve`**

    ```
    sudo strace -Tfp $(pgrep -o bash) 2>&1 | grep execve &
    ```

3.  **In another terminal, run a built-in vs an external binary**

    ```
    $ echo "Hello"
    Hello
    # No execve call appears for echo


    $ cat file.txt
    [pid 56147] execve("/usr/bin/cat", ["cat","file.txt"], 0x... ) = 0 <0.000186>
    Hello, world!
    ```

You’ll see `execve` only for `cat`, confirming `echo` runs inside the shell.

## External vs. Built-in Counterparts

Many built-ins have binary counterparts on disk:

```
$ which echo
/bin/echo


$ type /bin/echo
/bin/echo is /bin/echo


$ type echo
echo is a shell builtin
```

Performance comparison:

```
$ time /usr/bin/echo "Test"
$ time echo "Test"
# real 0m0.000s
```

Built-in `echo` completes instantly compared to the external `/usr/bin/echo`.

## Listing Built-ins and Keywords

- **List built-in commands:**

  ```
  $ compgen -b
  ```

- **List shell keywords:**

  ```
  $ compgen -k
  ```

- **Check if a word is a keyword:**

  ```
  $ type time
  time is a shell keyword
  ```

> [!important]
> **Warning**
>
> Keywords (like `time`, `if`, `for`) are parsed by the shell and do **not** spawn new processes. Confusing them with external binaries can lead to unexpected behavior.

For a comprehensive list of shell built-ins and keywords, see the Bash manual:

- [Bash BUILTIN Commands](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html)
- [Shell Keywords](https://www.gnu.org/software/bash/manual/html_node/Shell-Grammar.html)

---

## References

- [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Linux `strace` Documentation](https://strace.io/)
- [Bash Performance Tuning Tips](https://mywiki.wooledge.org/BashPitfalls)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/a90e183a-7528-4b0b-862f-1ab175155a65)**
>
> Watch video content
