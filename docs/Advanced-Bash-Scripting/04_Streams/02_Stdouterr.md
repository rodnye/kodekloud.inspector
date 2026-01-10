# Stdouterr - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Streams/Stdouterr)

---

## Table of Contents

- Stdouterr
  - What Are Stdout and Stderr?
  - Examples of Stdout vs. Stderr
  - Redirecting Stdout and Stderr
  - File Descriptors and Redirection Table
  - Separating Both Streams
  - Combining Streams
  - See Also
  - References
  - Watch Video
    - Redirecting stderr

---

## Content

Advanced Bash Scripting

Streams

# Stdouterr

In this lesson, we dive into advanced mechanics of standard output (stdout) and standard error (stderr) in Bash. Building on basic shell scripting, mastering these streams—especially when paired with redirection and pipelines—is essential for robust, complex scripts.

![The image is a graphic titled "Stdout and Stderr," featuring icons and text related to mastering complex shell scripting, with labels for "Standard out" and "Standard error."](https://kodekloud.com/kk-media/image/upload/v1752868649/notes-assets/images/Advanced-Bash-Scripting-Stdouterr/stdout-stderr-shell-scripting.jpg)

## What Are Stdout and Stderr?

When you execute a command, it sends data to:

- **Standard Output (stdout)**: the default channel for normal output.
- **Standard Error (stderr)**: the default channel for error and diagnostic messages.

Both streams appear in your terminal by default, but they serve different purposes. Think of them as two separate pipes under your sink: clean water (stdout) versus wastewater (stderr). Keeping them distinct helps you handle success and failure conditions independently.

## Examples of Stdout vs. Stderr

A simple `ls` shows stdout:

```
$ ls
Documents  noshebang.sh  test.sh
```

With a long listing format (`-l`):

```
$ ls -l
total 8
-rw-rw-r-- 1 ubuntu ubuntu    0 Mar 12 17:14 Documents
-rwxrwxr-x 1 ubuntu ubuntu   46 Mar  4 08:54 noshebang.sh
-rw-rw-r-- 1 ubuntu ubuntu    1 Mar 12 17:14 test.sh
```

If you pass an invalid flag (`-j`), it emits stderr:

```
$ ls -j
ls: invalid option -- 'j'
Try 'ls --help' for more information.
```

Not all commands print to stdout by default. For example, `mv` works silently unless you use `-v`:

```
$ mv file.txt renamedfile.txt
$ mv -v file.txt renamedfile.txt
file.txt -> renamedfile.txt
```

If `mv` can’t find a file, it writes to stderr:

```
$ mv missing.txt dest.txt
mv: cannot stat 'missing.txt': No such file or directory
```

> [!important]
> **Why It Matters**
>
> Separating stdout and stderr allows you to log normal output separately from errors, making debugging and automation much cleaner.

## Redirecting Stdout and Stderr

By default, `>` captures only stdout. To see how this works, consider redirecting the output of an `echo`:

![The image explains how to separate standard output and standard error using redirection symbols, specifically the "greater than" and "double greater than" symbols.](https://kodekloud.com/kk-media/image/upload/v1752868650/notes-assets/images/Advanced-Bash-Scripting-Stdouterr/output-error-redirection-explained.jpg)

```
# Overwrite or create file.txt with stdout
echo "hello" > file.txt


# Append to file.txt instead of overwriting
echo "hello again" >> file.txt
cat file.txt
# Output:
# hello
# hello again
```

### Redirecting stderr

To catch error messages, prefix the redirection operator with `2` (stderr’s file descriptor):

![The image explains that the redirection symbol is designed to redirect only standard output by default and can only catch standard output streams when used alone.](https://kodekloud.com/kk-media/image/upload/v1752868652/notes-assets/images/Advanced-Bash-Scripting-Stdouterr/redirection-symbol-standard-output-explanation.jpg)

```
# Redirect stderr to errors.txt
ls -j 2> errors.txt
```

Now, the invalid-option error goes into `errors.txt` while stdout (if any) stays on the terminal.

## File Descriptors and Redirection Table

Linux assigns numeric file descriptors to each stream:

| Stream                     | File Descriptor | Redirect Syntax |
| -------------------------- | --------------- | --------------- |
| Standard Output            | 1               | `1> file.txt`   |
| Standard Error             | 2               | `2> file.txt`   |
| Combine stderr into stdout | N/A             | `2>&1`          |
| Combine stdout into stderr | N/A             | `1>&2`          |

## Separating Both Streams

To send stdout and stderr to different files:

```
# stdout → stdout.txt; stderr → stderr.txt
ls -z > stdout.txt 2> stderr.txt


cat stderr.txt
# ls: invalid option -- 'z'
cat stdout.txt
# (empty)
```

Or, when a command succeeds:

```
# List directory normally; redirect streams anyway
ls > stdout.txt 2> stderr.txt
# stdout.txt now has the listing; stderr.txt is empty
```

## Combining Streams

Merge stderr into stdout, writing both to the same file or pipe:

```
# Send both stdout and stderr to combined.log
my-command > combined.log 2>&1


# Or merge them into a pipeline
my-command 2>&1 | grep "pattern"
```

> [!important]
> **Overwriting Caution**
>
> Using `>` will overwrite existing files. To avoid data loss, double-check your redirections or use `>>` to append.

## See Also

- [Bash Shell Redirection](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)
- [Linux I/O](https://tldp.org/LDP/abs/html/io-redirection.html)

## References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/01a18b1f-5090-4312-ab1b-853fa3a67c7d)**
>
> Watch video content
