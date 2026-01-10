# pid - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Refresher/pid)

---

## Table of Contents

- pid
  - Parent and Child Processes: The Chef Analogy
  - TTYs and Session Leaders
  - Spawning Scripts and Their Children
  - Demonstration Across Two Tabs
  - Managing Process Lifecycles
  - Quick Process Management Reference
  - Useful Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Refresher

# pid

If you think about it, a shell script is essentially a list of commands organized in a file, using programming constructs to automate complex tasks and workflows.

![The image shows a stylized illustration of a laptop displaying lines of code, with a gear icon suggesting settings or configuration. A cursor icon is also present, indicating interaction.](https://kodekloud.com/kk-media/image/upload/v1752868612/notes-assets/images/Advanced-Bash-Scripting-pid/laptop-code-gear-cursor-illustration.jpg)

When you run a command or script, the kernel assigns a unique Process ID (PID) to each new process. Tracking these PIDs helps you monitor and control processes in real time. But how many PIDs get created when you execute a shell script?

![The image is a graphic related to Linux shell scripts, featuring the text "Shell Scripts Linux" and three fingerprint icons labeled "Process ID."](https://kodekloud.com/kk-media/image/upload/v1752868614/notes-assets/images/Advanced-Bash-Scripting-pid/shell-scripts-linux-fingerprint-icons.jpg)

## Parent and Child Processes: The Chef Analogy

Imagine your interactive shell as a head chef. Every command you type is like an instruction to a kitchen worker (a child process).

- **Parent shell**: The chef leading the kitchen. When you open a terminal, the shell process you see is the parent.
- **Child process**: A sous-chef executing a single task. Each command you issue spawns its own PID, but it remains tied to the parent shell.

![The image illustrates a "Parent Shell" leading to multiple "Process ID" icons, with one connected to "Child Processes."](https://kodekloud.com/kk-media/image/upload/v1752868615/notes-assets/images/Advanced-Bash-Scripting-pid/parent-shell-process-id-diagram.jpg)

Each instruction the chef gives is a separate process you can inspect, pause, or terminate—just like sending signals to worker processes.

![The image illustrates a concept related to process IDs (PIDs) with icons representing a chef, magnifying glass, terminal, and multiple process ID symbols.](https://kodekloud.com/kk-media/image/upload/v1752868616/notes-assets/images/Advanced-Bash-Scripting-pid/process-ids-chef-magnifying-glass.jpg)

## TTYs and Session Leaders

Every terminal window or tab runs on its own TTY (teletypewriter). The shell process that controls that TTY is called the **session leader**. Child processes inherit the same TTY but get new PIDs. To discover your current TTY and Bash session PID, run:

```
$ tty
/dev/ttys007

$ ps -ef | grep bash
501  29998  27796  0 11:00PM ttys007  0:00.01 bash
501  29928  29998  0 11:00PM ttys007  0:00.00 grep bash
```

## Spawning Scripts and Their Children

When you execute a shell script (`./script.sh`), the shell launches it as a child process. That script can then spawn its own children, all under the same TTY.

![The image illustrates a sequence of processes, each represented by a fingerprint icon labeled "Process ID," originating from a terminal icon.](https://kodekloud.com/kk-media/image/upload/v1752868617/notes-assets/images/Advanced-Bash-Scripting-pid/process-id-fingerprint-sequence.jpg)

## Demonstration Across Two Tabs

Let’s walk through an example using two terminal tabs:

1.  **First tab (TTY `/dev/ttys000`):**

    ```
    $ tty
    /dev/ttys000

    $ ps -ef | grep bash
    501  87852  87851  0  8:32PM ttys000  0:00.76 -bash
    ```

2.  **Second tab (TTY `/dev/ttys001`):**

    ```
    $ tty
    /dev/ttys001

    $ ps -ef | grep bash
    501  8561  8560  0 12:36AM ttys001  0:00.04 -bash
    ```

3.  **Back in the first tab**, create and run a simple script:

    ```
    $ vi script.sh       # add: sleep 180
    $ chmod +x script.sh
    $ ./script.sh
    ```

    The script occupies the shell. In tab one, you’ll now see:

    ```
    $ ps -ef | grep bash
    501  87852  87851  0  8:32PM ttys000  0:00.76 -bash
    501  8689   87852  0 12:36AM ttys000  0:00.00 /bin/bash ./script.sh
    ```

4.  **Inspect the `sleep` process**:

    ```
    $ ps -ef | grep sleep
    501  8690  8689  0 12:36AM ttys000  0:00.00 sleep 180
    ```

This hierarchy clearly shows:

- The parent shell (`-bash`)
- The `script.sh` child
- The `sleep` grandchild

> [!important]
> **Note**
>
> Commands built into Bash (built-ins) run in the shell itself and don’t generate new PIDs. External commands and scripts always spawn child processes.

## Managing Process Lifecycles

- Press **Ctrl+C** in the first tab to send `SIGINT` and terminate the script.
- Run a job in the background:

  ```
  $ ./script.sh &
  [1] 8862
  ```

  > [!important]
  > **Warning**
  >
  > Background jobs started with `&` still depend on the terminal. Closing the tab kills them.

- Detach completely using `nohup`:

  ```
  $ nohup ./script.sh &
  [1] 9028
  appending output to nohup.out
  ```

  This frees the process from the TTY—closing the terminal won’t stop it.

## Quick Process Management Reference

| Action                     | Command                   | Description          |
| -------------------------- | ------------------------- | -------------------- | ------------------------ |
| Run program by name        | `$ cat file.txt`          | Uses `$PATH`         |
| Run by absolute path       | `$ /usr/bin/cat file.txt` | Full path invocation |
| Run from current directory | `$ ./script.sh`           | Prefixed with `./`   |
| List processes             | `$ ps -ef \\              | grep bash`           | Filters `bash` processes |
| Terminate (SIGTERM)        | `$ kill PID`              | Graceful shutdown    |
| Terminate (SIGKILL)        | `$ kill -9 PID`           | Forceful kill        |
| Trace system calls         | `$ strace -Tfp PID`       | Monitor system calls |

| Command Type     | Creates New PID? | Example Commands |
| ---------------- | ---------------- | ---------------- |
| Shell Built-in   | No               | `cd`, `echo`     |
| External Command | Yes              | `ls`, `sleep`    |

## Useful Links and References

- [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [ps(1) Manual Page](https://man7.org/linux/man-pages/man1/ps.1.html)
- [nohup(1) Manual Page](https://man7.org/linux/man-pages/man1/nohup.1.html)
- [kill(1) Manual Page](https://man7.org/linux/man-pages/man1/kill.1.html)
- [strace.io](https://strace.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/6fc6ced7-3d71-495d-93ca-44997527ff80)**
>
> Watch video content
