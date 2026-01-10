# Pipefail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Streams/Pipefail)

---

## Table of Contents

- Pipefail
  - How Pipelines Work
  - Behavior Without pipefail
  - Checking Exit Status
  - Enabling pipefail
  - Common Shell Options
  - Adding a Guard Clause
  - Combining pipefail with Other Options
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Streams

# Pipefail

In this guide, we’ll dive into how Unix-like shells handle pipelines, why errors can be hidden, and how to enforce early exits using `set -o pipefail`. You’ll learn best practices for robust Bash scripting and see practical examples.

## How Pipelines Work

When you connect commands with a pipe (`|`), each command’s standard output (`stdout`) feeds into the next command’s standard input (`stdin`). However, if a middle command writes to standard error (`stderr`), that error goes straight to your terminal—even though the rest of the pipeline keeps running.

![The image illustrates a "Pipe Fail" concept, showing data flow between a computer and processes using standard input (stdin), standard output (stdout), and standard error (stderr).](https://kodekloud.com/kk-media/image/upload/v1752868645/notes-assets/images/Advanced-Bash-Scripting-Pipefail/pipe-fail-data-flow-diagram.jpg)

## Behavior Without `pipefail`

Consider this simple pipeline:

```
$ sort somefile.txt | uniq | cat file.txt
sort: cannot read somefile.txt: No such file or directory
hello
```

What happens here:

- `sort` fails (exit code ≠ 0) and emits an error.
- `uniq` still runs (no input) and exits successfully.
- `cat file.txt` prints its content.

Even though `sort` failed, the pipeline’s final exit status is `0`, which masks the error.

## Checking Exit Status

Inspect the pipeline’s return code with `echo $?`:

```
$ sort somefile.txt | uniq
sort: cannot read somefile.txt: No such file or directory
$ echo $?
0
```

Despite the failure, you get `0`. Likewise, boolean operators behave unexpectedly:

```
$ sort somefile.txt | uniq && echo "Won't stop on error"
sort: cannot read somefile.txt: No such file or directory
Won't stop on error
```

Here, `echo` still runs because the pipeline exit code is `0`.

## Enabling `pipefail`

To force a pipeline to return a non-zero status if any command fails, enable `pipefail`:

```
#!/usr/bin/env bash
set -o pipefail


sort somefile.txt | uniq && echo "This won't print"
echo "Exit status: $?"
```

Save as `set-pipefail.sh` and execute:

```
$ ./set-pipefail.sh
sort: cannot read somefile.txt: No such file or directory
Exit status: 2
```

With `pipefail`:

- The pipeline returns the exit status of the rightmost failing command.
- Subsequent commands and `&&` branches are skipped on error.

## Common Shell Options

| Option    | Description                                          | Default |
| --------- | ---------------------------------------------------- | ------- |
| pipefail  | Pipeline fails if any command errors                 | off     |
| errexit   | Exit script on any non-zero command (`set -e`)       | off     |
| noclobber | Prevent overwriting files via redirection (`set -C`) | off     |

> [!important]
> **Tip**
>
> Stack each `set -o` on its own line for clarity:
>
> ```
> set -o errexit
> set -o pipefail
> set -o noclobber
> ```

## Adding a Guard Clause

Combine `pipefail` with an exit-on-failure guard:

```
#!/usr/bin/env bash
set -o pipefail


sort somefile.txt | uniq || exit 80
```

If any pipeline stage fails, the script exits immediately with status 80.

> [!important]
> **Warning**
>
> Always choose a non-zero exit code that makes sense for your script. Avoid overlapping with common system codes.

## Combining `pipefail` with Other Options

Here’s a script that prevents file overwrites and enforces pipeline errors:

```
#!/usr/bin/env bash
set -o noclobber
set -o pipefail


echo "First line" > file.txt
echo "Second line" > file.txt      # Fails due to noclobber
sort somefile.txt | uniq || exit 100


echo "This line never runs"
exit 0
```

Run it:

```
$ ./set-pipefail3.sh
$ cat file.txt
First line
```

The second redirect fails, and because of `pipefail` plus the guard clause, the script exits with code 100.

## Links and References

- [Bash Reference Manual – Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Stack Overflow: What does `set -o pipefail` do?](https://stackoverflow.com/questions/54577587)
- [GitHub Gist: Bash Exit Codes](https://gist.github.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/de3882a5-7a9a-4945-b6d1-6c17c224fe1b)**
>
> Watch video content
