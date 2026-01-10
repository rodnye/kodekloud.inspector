# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/sed/Introduction)

---

## Table of Contents

- Introduction
  - Comparing grep, awk, and sed
  - sed Basics: Substitution Command
  - GNU vs. BSD sed
  - What's Next
  - Watch Video

---

## Content

Advanced Bash Scripting

sed

# Introduction

This guide explores **sed**, the powerful **stream editor** used for **text processing** and **pattern-based transformations** on the command line. You’ll learn how sed combines pattern matching with built-in editing capabilities—making it a versatile tool for everything from simple substitutions to complex in-place file edits.

## Comparing grep, awk, and sed

Before diving into sed, it helps to see how it relates to other common utilities:

```
# List disk usage
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       7.7G  2.9G  4.9G  38% /
devtmpfs        486M     0  486M   0% /dev
...


# grep for "root"
$ df -h | grep "root"
/dev/root       7.7G  2.9G  4.9G  38% /
```

```
# Print second line with awk
$ df -h | awk 'NR == 2 { print }'
/dev/root       7.7G  2.9G  4.9G  38% /
```

| Tool | Strengths                            | Limitations              | Example                      |
| ---- | ------------------------------------ | ------------------------ | ---------------------------- |
| grep | Fast plain-text pattern matching     | No built-in substitution | `grep "root" disk-usage.txt` |
| awk  | Column/record data processing        | Complex syntax for edits | `awk 'NR==2' disk-usage.txt` |
| sed  | Stream editing, inline substitutions | Regex-based commands     | `sed 's/foo/bar/g' file.txt` |

## sed Basics: Substitution Command

The core sed substitution syntax is:

```
sed 's/<pattern>/<replacement>/<flags>' [file]
```

- **s**: substitute command
- **pattern**: a regular expression to match
- **replacement**: text to replace each match
- **flags**: modifiers (e.g., `g` for global replacement on each line)

Example: Replace every `sample` with `are` in _poem.txt_:

```
$ sed 's/sample/are/g' poem.txt
Roses are red,
Violets are blue,
Sugar are sweet,
And so are you.
```

Breakdown:

- `s`: substitution
- `/sample/`: text to find
- `/are/`: replacement text
- `g`: apply to all matches on each line

In this tutorial, we’ll start with basic operations such as printing specific lines, then move on to advanced techniques like in-place editing and generating custom output.

![The image is an introduction to "sed," a stream editor, highlighting topics like constructing sed commands, printing text from a file, and replacing string patterns in input data.](https://kodekloud.com/kk-media/image/upload/v1752868670/notes-assets/images/Advanced-Bash-Scripting-Introduction/sed-introduction-commands-patterns.jpg)

## GNU vs. BSD sed

sed comes in two main flavors:

- **GNU sed**: Default on most Linux distributions, supports extended features
- **BSD sed**: Bundled with macOS, lacks some GNU-specific options

Most basic sed commands work across both implementations, but when you need advanced flags (e.g., `-r` for extended regex), GNU sed is the recommended choice.

> [!important]
> **Note**
>
> On macOS, install GNU sed via Homebrew:
>
> ```
> brew install gnu-sed
> ```
>
> Then use `gsed` instead of `sed` for full compatibility.

![The image is a diagram titled "sed Introduction" showing two paths: one from MacOS to BSD Unix, and another from Linux to the GNU Project.](https://kodekloud.com/kk-media/image/upload/v1752868671/notes-assets/images/Advanced-Bash-Scripting-Introduction/sed-introduction-macos-bsd-linux-gnu.jpg)

## What's Next

- Printing and deleting lines
- Addressing ranges and patterns
- In-place (`-i`) file edits
- Advanced scripting with semicolons and labels

For more details, see the [GNU sed Manual](https://www.gnu.org/software/sed/manual/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/2d48deee-c9f8-4d65-b92f-f164c06b545c/lesson/51198978-e470-402e-b26e-8fd512d8bbcb)**
>
> Watch video content
