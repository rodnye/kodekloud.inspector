# Star - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Globs/Star)

---

## Table of Contents

- Star
  - How \* Works
  - 1. Matching Files with a Common Prefix
  - 2. Matching a Specific Extension
  - 3. Matching a Prefix with Varying Suffixes
  - Common \* Patterns at a Glance
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Globs

# Star

The asterisk (`*`) is a powerful wildcard used in Unix-like shells and many programming languages to match any sequence of characters (including none). In file path patterns (globs), it lets you flexibly select files based on prefixes, extensions, or arbitrary substrings.

By mastering `*` you can streamline file operations, automate tasks in scripts, and improve your command-line efficiency.

---

## How `*` Works

- `*` matches zero or more characters in a filename or path segment.
- It does **not** match the path separator (`/`) unless the shell supports recursive globs (e.g., `**` in Bash).
- Always quote globs when you need to pass the literal pattern to a command rather than having the shell expand it first.

> [!important]
> **Quoting Patterns**
>
> Prevent premature expansion by the shell. For example:
>
> ```
> grep "TODO" "*.txt"
> ```
>
> Here, `grep` receives the pattern `*.txt` instead of the shell expanding it.

---

## 1\. Matching Files with a Common Prefix

Imagine a directory containing:

```
$ ls
report.txt  report.docx  report.pdf  image1.jpg  backup2.tar.gz  1.log2.log
```

To list all files beginning with `report.` and any extension:

```
$ ls report.*
report.txt  report.docx  report.pdf
```

- `report.` is matched literally.
- `*` covers any extension (including an empty extension if it existed).

---

## 2\. Matching a Specific Extension

Given files:

```
$ ls
report.py   report.pdf   notes.docx   notes.pdf   image1.jpg   config.pdf   log2.log
```

List only PDF documents:

```
$ ls *.pdf
report.pdf  notes.pdf  config.pdf
```

- `*` matches any filename prefix.
- `.pdf` filters for that exact extension.

---

## 3\. Matching a Prefix with Varying Suffixes

In a directory like:

```
$ ls
notes.pdf   image1.jpg   image2.jpeg   image3.png   script.sh   backup1.tar.gz
```

Select all files whose names start with `image` regardless of extension:

```
$ ls image*
image1.jpg  image2.jpeg  image3.png
```

- `image` is the fixed prefix.
- `*` grabs everything that follows, covering `.jpg`, `.jpeg`, `.png`, etc.

---

## Common `*` Patterns at a Glance

| Pattern    | Description                        | Example Result              |
| ---------- | ---------------------------------- | --------------------------- |
| `report.*` | Files starting with `report.`      | `report.txt`, `report.pdf`  |
| `*.pdf`    | Files ending in `.pdf`             | `notes.pdf`, `config.pdf`   |
| `image*`   | Files starting with `image`        | `image1.jpg`, `image2.jpeg` |
| `*`        | All files in the current directory | Every visible file          |

---

## Links and References

- [Bash Manual: Filename Expansion](https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html)
- [Advanced Bash-Scripting Guide: Globbing](https://tldp.org/LDP/abs/html/globbingref.html)
- [Shell Pattern Matching (TLDP)](https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/a9d9ba2b-0baf-4c13-b60b-f6ce9cf97abd/lesson/2767f162-2972-42b5-9154-40c60828d482)**
>
> Watch video content
