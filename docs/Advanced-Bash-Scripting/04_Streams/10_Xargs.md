# Xargs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Streams/Xargs)

---

## Table of Contents

- Xargs
  - Table of Contents
  - Piping Basics
  - How xargs Works
  - Common Use Cases
  - Handling Special Characters
  - Additional Resources
  - Watch Video
    - Supplying Arguments to Commands
    - Creating Multiple Directories
    - Table of Handy xargs Examples

---

## Content

Advanced Bash Scripting

Streams

# Xargs

`xargs` is a powerful GNU utility that transforms piped data into arguments for another command. Instead of reading from stdin and writing to stdout like typical pipelines, `xargs` gathers items and appends them as parameters—enabling more flexible shell scripting and one-liners.

---

## Table of Contents

1.  [Piping Basics](#piping-basics)
2.  [How xargs Works](#how-xargs-works)
3.  [Common Use Cases](#common-use-cases)
4.  [Handling Special Characters](#handling-special-characters)
5.  [Additional Resources](#additional-resources)

---

## Piping Basics

Most shell utilities can read from stdin or files. For example, to count words:

```
echo "How many words are in this text?" | wc -w
# 7
```

You can redirect or pipe interchangeably:

```
sort file.txt
sort < file.txt

cat file.txt
cat < file.txt
```

By contrast, `xargs` acts like a “bucket”—it collects output from a previous command and then invokes another command, passing those collected items as arguments.

![The image illustrates the concept of using the `xargs` command, showing a "Previously Piped Command" leading to a "Command" represented by a bucket icon.](https://kodekloud.com/kk-media/image/upload/v1752868652/notes-assets/images/Advanced-Bash-Scripting-Xargs/xargs-command-bucket-icon-diagram.jpg)

---

## How xargs Works

Assume `file.txt` contains:

```
file
content
to demonstrate
xargs functionality
```

Piping to `echo` without `xargs` preserves newlines in the input stream but not in output:

```
cat file.txt | xargs echo
# file content to demonstrate xargs functionality
```

Under the hood, `xargs`:

1.  Reads whitespace (spaces, tabs, newlines) by default.
2.  Constructs a single command line by concatenating all items.
3.  Executes that command:

```
echo file content to demonstrate xargs functionality
```

---

## Common Use Cases

### Supplying Arguments to Commands

Commands like `rm`, `ls`, `mkdir` or even custom scripts require positional arguments. Instead of writing loops, `xargs` can automate this:

![The image illustrates the concept of using the `xargs` command, showing a structure with "Command" and "Value" sections, and examples like `rm`, `ls`, `echo`, and `mkdir`.](https://kodekloud.com/kk-media/image/upload/v1752868653/notes-assets/images/Advanced-Bash-Scripting-Xargs/xargs-command-value-structure.jpg)

```
# Prepend a custom message to file.txt contents
cat file.txt \
  | xargs echo "The contents of file.txt passed by xargs are:"
# The contents of file.txt passed by xargs are: file content to demonstrate xargs functionality
```

### Creating Multiple Directories

Generate directories from a whitespace-separated list:

```
echo "dir1 dir2 dir3" \
  | xargs mkdir
ls
# dir1  dir2  dir3
```

### Table of Handy xargs Examples

| Use Case              | Command Example           |
| --------------------- | ------------------------- | ------------------------------- |
| Remove log files      | `find . -name '\*.log' \\ | xargs rm -f`                    |
| Create directories    | `echo "a b c" \\          | xargs mkdir`                    |
| Parallel SSH sessions | `cat hosts.txt \\         | xargs -P4 -I{} ssh {} hostname` |

---

## Handling Special Characters

> [!important]
> **Warning**
>
> By default, `xargs` splits on any whitespace. Filenames containing spaces or special characters may break. Use `-0` with NUL-separated data (e.g., `find . -print0 \| xargs -0`) to handle arbitrary names safely.

![The image is a diagram explaining the `xargs` command, indicating it functions like a plain echo, receives input and positions, and is used by other commands.](https://kodekloud.com/kk-media/image/upload/v1752868654/notes-assets/images/Advanced-Bash-Scripting-Xargs/xargs-command-diagram-explanation.jpg)

---

## Additional Resources

- [GNU xargs Manual](https://www.gnu.org/software/findutils/manual/html_mono/findutils.html#xargs-invocation)
- [Bash Guide: Process Substitution & xargs](https://mywiki.wooledge.org/BashFAQ/082)
- [Linux `find` + `xargs` Examples](https://www.tecmint.com/15-practical-examples-of-linux-find-command/)

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/1b69f303-8a40-4884-b120-f24532f0854a)**
>
> Watch video content
