# Input - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Streams/Input)

---

## Table of Contents

- Input
  - What Is Standard Input (stdin)?
  - Types of Input Sources
  - Interactive Input with wc
  - Piping Input to wc
  - Detecting Input Source in a Script
  - Testing Other File Descriptors
  - Tracing System Calls with strace
  - File Descriptors in the Terminal
  - Capstone Exercise: Using a Custom File Descriptor
  - References
  - Watch Video
  - Practice Lab
    - Redirection Operators

---

## Content

Advanced Bash Scripting

Streams

# Input

Input in shell scripting refers to data fed to a script from the terminal, a file, or another program. In Unix-like systems, every process has three standard streams:

| File Descriptor | Stream | Default Device |
| --------------- | ------ | -------------- |
| 0               | stdin  | Keyboard       |
| 1               | stdout | Screen         |
| 2               | stderr | Screen         |

## What Is Standard Input (stdin)?

Standard input (stdin) uses file descriptor 0. Originally, Unix designers designated stdin as the “inlet” for data streams—primarily from the keyboard.

![The image is a diagram illustrating the concept of standard input (stdin) in computing, showing a keyboard icon and a pipe connecting stdin to another point.](https://kodekloud.com/kk-media/image/upload/v1752868636/notes-assets/images/Advanced-Bash-Scripting-Input/stdin-diagram-keyboard-pipe.jpg)

## Types of Input Sources

Broadly, shell scripts receive input in two ways:

1.  Directly from the terminal (stdin).
2.  From pipes or files redirected into stdin.

![The image illustrates two types of input: "Standard input" with a keyboard icon, and "Input through pipes or files" with a pipe and folder icon.](https://kodekloud.com/kk-media/image/upload/v1752868638/notes-assets/images/Advanced-Bash-Scripting-Input/input-types-standard-pipes-files.jpg)

### Redirection Operators

Unix provides special operators to reroute these streams:

- `>` Redirects standard output to a file.
- `<` Feeds a file’s content into stdin.
- `|` Pipes stdout of one command into stdin of another.

![The image shows symbols used in command-line interfaces: ">" for redirecting output to files, "<" for feeding input to a script or command, and "|" for piping.](https://kodekloud.com/kk-media/image/upload/v1752868638/notes-assets/images/Advanced-Bash-Scripting-Input/command-line-symbols-output-input-piping.jpg)

## Interactive Input with wc

By default, many commands read from stdin if you don’t supply a file. For example, running `wc` (word count) without arguments enters interactive mode:

```
$ wc
Juan Carlos
[Ctrl-D]
1 2 11
```

Here, `wc` reports:

- Lines: 1
- Words: 2
- Characters: 11

## Piping Input to wc

More commonly, you chain commands with pipelines:

```
$ echo "Juan Carlos" | wc
      1       2      12
```

This pipeline connects `echo`’s stdout (fd 1) to `wc`’s stdin (fd 0).

![The image illustrates a process flow for executing commands, showing "command1" and "command2" being processed sequentially, with an arrow indicating the flow towards a computer icon.](https://kodekloud.com/kk-media/image/upload/v1752868640/notes-assets/images/Advanced-Bash-Scripting-Input/process-flow-command1-command2.jpg)

## Detecting Input Source in a Script

You can check whether stdin is a terminal or a pipe/file with `test -t 0`:

```
#!/usr/bin/env bash
if [[ -t 0 ]]; then
  echo "Interactive input (keyboard)"
  read
else
  echo "Input via file or pipeline"
  read
fi
```

> [!important]
> **Note**
>
> The `-t` flag returns true if the given file descriptor (e.g., 0 for stdin) is open and refers to a terminal.

Example:

```
$ ./input_fd.sh
Interactive input (keyboard)
Hello


$ echo "Pipeline" | ./input_fd.sh
Input via file or pipeline
```

Redirecting from a file also works:

```
$ wc < input.txt
      1       4      24
```

## Testing Other File Descriptors

You can similarly test fd 1 (stdout) or any descriptor:

```
$ echo "Output" | test -t 1 && echo "Stdout is terminal"
Stdout is terminal


$ echo "Output" | test -t 0 && echo "Stdin is terminal"
# No output—stdin is not a terminal in this case.
```

## Tracing System Calls with strace

Inspect how the shell reads keystrokes in low-level detail:

```
sudo strace -Tfp $$ 2>&1 | grep -E 'read' &
```

Typing “hello” produces lines like:

```
read(0, "h", 1) = 1 <0.00012>
read(0, "e", 1) = 1 <0.00009>
...
```

Each `read` call fetches one byte from stdin. Echoing occurs via stderr (fd 2) on each keystroke; stdout (fd 1) handles command output after Enter.

## File Descriptors in the Terminal

In a live terminal session:

![The image describes file descriptors in a terminal context, explaining their functions: File Descriptor 0 reads keystrokes, File Descriptor 2 buffers them, and File Descriptor 1 or 2 outputs command results.](https://kodekloud.com/kk-media/image/upload/v1752868641/notes-assets/images/Advanced-Bash-Scripting-Input/file-descriptors-terminal-functions.jpg)

1.  FD 0 reads keystrokes.
2.  FD 2 echoes keystrokes back.
3.  FD 1 (stdout) or FD 2 (stderr) displays command results.

## Capstone Exercise: Using a Custom File Descriptor

Practice redirection with an extra descriptor (fd 3). Fix an email typo in `email_file.txt` by replacing a space with a dot:

```
# Create file with typo
echo "Juan Carlos@kodekloud.com" > email_file.txt


# Open fd 3 for read/write on the file
exec 3<> email_file.txt


# Read first 4 characters ("Juan")
read -n 4 <&3


# Write a dot at current offset
echo -n "." >&3


# Close fd 3
exec 3<&-
exec 3>&-


# Verify
cat email_file.txt
# Output: Juan.Carlos@kodekloud.com
```

This demonstrates how custom file descriptors can modify files in place.

---

We’ve covered interactive stdin, pipes, redirection, descriptor testing, and system-call tracing. Next, explore Here Documents (Heredocs) for multiline input blocks.

## References

- [Bash Manual: Redirecting Input and Output](https://www.gnu.org/software/bash/manual/bash.html#I_002fO-Redirection)
- [strace Documentation](https://strace.io/)
- [Unix File Descriptors](https://en.wikipedia.org/wiki/File_descriptor)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/27dd7017-5269-4322-8aa7-db421c121d2d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/7a3e282c-b44c-4501-9fcb-1f37d53c2df8)**
>
> Practice lab
