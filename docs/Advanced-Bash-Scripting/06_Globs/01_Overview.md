# Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Globs/Overview)

---

## Table of Contents

- Overview
  - What Are Globs?
  - When to Use Globs vs. Regex
  - Learning Approach
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Globs

# Overview

In earlier lessons, we explored **Bash parameter expansion**—using operators like `#` and `%` (and their double variants `##`/`%%`) to strip prefixes and suffixes from variable values. We even combined these with the wildcard `*` to broaden matches.

![The image is a chart explaining different globbing patterns in programming, showing symbols like `#`, `%`, `##`, `%%`, and `*` with their respective functions.](https://kodekloud.com/kk-media/image/upload/v1752868572/notes-assets/images/Advanced-Bash-Scripting-Overview/globbing-patterns-chart-programming.jpg)

> [!important]
> **Note**
>
> Globs (also called wildcards or pathname expansion patterns) differ from parameter expansion. They operate directly on filenames and strings in the shell, not on variable values.

## What Are Globs?

Globs let you match file and directory names—or any arbitrary strings—using a concise pattern syntax. They’re simpler than [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) (no lookahead, named groups, etc.), but cover most everyday use cases:

| Glob Pattern | Matches                          | Example          |
| ------------ | -------------------------------- | ---------------- |
| `*`          | Zero or more characters          | `*.txt`          |
| `?`          | Exactly one character            | `file?.sh`       |
| `[abc]`      | Exactly one of the set (a, b, c) | `report[12].pdf` |

## When to Use Globs vs. Regex

| Feature             | Globs              | Regular Expressions            |
| ------------------- | ------------------ | ------------------------------ |
| Simplicity          | Very easy to write | More complex (advanced syntax) |
| Common Use Case     | File matching      | Text parsing, validation       |
| Advanced Constructs | Not supported      | Lookahead, named groups, etc.  |

## Learning Approach

To master globs, follow these steps:

1.  **Gather Sample Strings**  
    Assemble a broad list of filenames or test strings you need to match.
2.  **Identify Common Patterns**  
    Group similar strings to pinpoint shared prefixes, suffixes, or character sets.
3.  **Select the Appropriate Glob**  
    Choose from `*`, `?`, or bracket expressions (`[ ]`) to cover your pattern.
4.  **Test with Shell Commands**  
    Run a command like `ls` or `echo` to verify that your glob matches the intended files:

```
# Matches all .log files starting with "app"
ls app*.log
```

If the output aligns with your expectations, your glob is correct!

## Next Steps

In the following sections, we’ll apply these principles to real-world examples—filtering logs, batch-renaming files, and more. Let’s start by examining a directory of mixed files and crafting precise globs for each case.

## Links and References

- [Bash Reference Manual – Filename Expansion](https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html)
- [Regular Expressions on Wikipedia](https://en.wikipedia.org/wiki/Regular_expression)
- [ShellCheck – Automated Shell Script Analysis](https://www.shellcheck.net/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/a9d9ba2b-0baf-4c13-b60b-f6ce9cf97abd/lesson/06c642fb-b311-4f69-9d9e-2d4d00f13fc3)**
>
> Watch video content
