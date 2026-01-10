# Command Substitution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Command-Substitution)

---

## Table of Contents

- Command Substitution
  - Table of Contents
  - Command Substitution
  - Processing Input with xargs
  - Common xargs Options
  - Links and References
  - Watch Video
    - Using Backquotes
    - Using $(...) Syntax
    - Assigning Output to a Variable
    - Basic xargs Example
    - Limiting Arguments per Invocation
    - Handling Filenames with Spaces
    - Placing Arguments at a Specific Position

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Command Substitution

Learn how to capture command output in Bash and build powerful pipelines using `xargs`. This guide covers:

- Command substitution with backquotes and `$(...)`
- Storing outputs in variables
- Processing file lists with `xargs`
- Handling special characters and custom argument placement

---

## Table of Contents

1.  [Command Substitution](#command-substitution)  
    1.1 [Using Backquotes](#using-backquotes)  
    1.2 [Using `$(...)` Syntax](#using-...)  
    1.3 [Assigning Output to a Variable](#assigning-output-to-a-variable)
2.  [Processing Input with xargs](#processing-input-with-xargs)  
    2.1 [Basic xargs Example](#basic-xargs-example)  
    2.2 [Limiting Arguments per Invocation](#limiting-arguments-per-invocation)  
    2.3 [Handling Filenames with Spaces](#handling-filenames-with-spaces)  
    2.4 [Placing Arguments at a Specific Position](#placing-arguments-at-a-specific-position)
3.  [Common xargs Options](#common-xargs-options)
4.  [Links and References](#links-and-references)

---

## Command Substitution

Command substitution allows you to embed the output of one command into another or assign it to a variable. Bash supports two forms:

- Backquotes: `` `…` ``
- Dollar parentheses: `$(…)`

### Using Backquotes

```
mkdir `date +%Y-%m-%d`
ls
# 2022-12-13
```

Here, `date +%Y-%m-%d` generates `2022-12-13`, which `mkdir` uses as the directory name.

> [!important]
> **Note**
>
> Backquotes can be harder to nest and read. Consider using `$(...)` for complex commands.

### Using `$(...)` Syntax

The `$(...)` form improves readability and nesting:

```
rmdir 2022-12-13
mkdir $(date +%Y-%m-%d)
ls
# 2022-12-13
```

Both backquotes and `$(...)` produce identical results.

### Assigning Output to a Variable

Store command output in a variable for reuse:

```
OS=$(uname -o)
echo "Operating System: $OS"
# Operating System: GNU/Linux
```

---

## Processing Input with xargs

`xargs` builds and executes command lines from standard input. It’s perfect for bulk processing of filenames and other arguments.

### Basic xargs Example

Find all files in `/usr/share/icons` starting with `debian` and report their dimensions via ImageMagick’s `identify`:

```
find /usr/share/icons -name 'debian*' \
  | xargs identify -format "%f: %wx%h\n"
```

Output:

```
debian-swirl.svg: 48x48
debian-swirl.png: 22x22
...
```

Steps:

1.  `find` lists matching files.
2.  Pipe the list into `xargs`.
3.  `xargs` runs `identify` with `-format` to print `filename: width×height`.

### Limiting Arguments per Invocation

By default, `xargs` packs as many items as possible per command. Use `-n` or `-L` to control batching:

```
# One file per identify invocation
find /usr/share/icons -name 'debian*' \
  | xargs -n 1 identify -format "%f: %wx%h\n"


# Three files at a time
find /usr/share/icons -name 'debian*' \
  | xargs -L 3 identify -format "%f: %wx%h\n"
```

### Handling Filenames with Spaces

Filenames containing spaces or special characters require a null separator:

```
find . \
  -name '*.avi' -print0 \
  -o -name '*.mp4' -print0 \
  -o -name '*.mkv' -print0 \
  | xargs -0 du | sort -n
```

1.  Each match is terminated with `\0`.
2.  `xargs -0` reads these safely.
3.  `du` shows disk usage, then `sort -n` orders by size.

> [!important]
> **Warning**
>
> Always use `-print0` with `find` and `-0` with `xargs` when processing arbitrary filenames to avoid word-splitting issues.

### Placing Arguments at a Specific Position

Use `-I` with a placeholder (e.g., `{}` or `PATH`) to insert items at a custom position:

```
find . \
  -mindepth 2 \
  \( -name '*.avi' -o -name '*.mp4' -o -name '*.mkv' \) -print0 \
  | xargs -0 -I {} mv {} ./
```

This moves each video file from subdirectories into the current directory, replacing `{}` with the filename.

---

## Common xargs Options

| Option | Description                               | Example                      |
| ------ | ----------------------------------------- | ---------------------------- | ------------ |
| \\-n N | Use at most N arguments per command       | `xargs -n 1 echo`            |
| \\-L N | Use at most N lines per command           | `xargs -L 3 ls -l`           |
| \\-0   | Input items are null-terminated (`\\0`)   | `find . -print0 \\           | xargs -0 rm` |
| \\-I X | Replace placeholder X in the command line | `xargs -I {} cp {} /backup/` |
| \\-P N | Run up to N processes in parallel         | `xargs -P 4 -n 1 gzip`       |

---

## Links and References

- [Bash Command Substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html)
- [xargs Manual](https://man7.org/linux/man-pages/man1/xargs.1.html)
- [find(1) – GNU findutils](https://man7.org/linux/man-pages/man1/find.1.html)
- [ImageMagick identify](https://imagemagick.org/script/identify.php)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/8bc8d1be-2bf6-4a77-a9c2-87896e510687)**
>
> Watch video content
