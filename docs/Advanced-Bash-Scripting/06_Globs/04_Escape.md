# Escape - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Globs/Escape)

---

## Table of Contents

- Escape
  - 1. Creating Sample Files
  - 2. Wildcard vs. Literal ?
  - 3. Listing Files with a Leading ?
  - 4. Mixing Literals and Wildcards
  - 5. Merging Globs into a Single Pattern
  - 6. Quick Reference Table
  - Summary
  - Links and References
  - Watch Video
    - 2.1 Using the ? Wildcard
    - 2.2 Escaping ? for Literal Filenames

---

## Content

Advanced Bash Scripting

Globs

# Escape

When working in the shell, special characters like `?`, `*`, and `[ ]` are interpreted by the globbing engine for filename matching. Preceding these characters with a backslash (`\`) or quoting them forces the shell to treat them as literal characters.

> [!important]
> **Note**
>
> Using an escape (`\`) or quotes disables globbing for the next character or entire string. This gives you precise control over filename creation and listing.

## 1\. Creating Sample Files

First, generate files whose names differ only by the first letter:

```
$ touch sail hail mail fail tail
$ ls
fail hail mail sail tail
```

## 2\. Wildcard vs. Literal `?`

### 2.1 Using the `?` Wildcard

The `?` matches exactly one character. Attempting to create `?ail` without escaping:

```
$ touch ?ail
$ ls
fail hail mail sail tail
```

No new file appears because `?ail` expanded to all existing matches (`fail`, `hail`, etc.).

### 2.2 Escaping `?` for Literal Filenames

To create a file literally named `?ail`:

```
$ touch \?ail
$ ls
?ail fail hail mail sail tail
```

## 3\. Listing Files with a Leading `?`

You can retrieve the `?ail` file by escaping or quoting the pattern:

```
$ ls \?ail
?ail

$ ls "?ail"
?ail
```

Both methods disable globbing and match the literal filename.

## 4\. Mixing Literals and Wildcards

Assume these files exist:

```
$ touch hail fail mail \?ail
$ touch hailTwo failTwo mailTwo \?ailTwo
$ ls
?ail ?ailTwo fail failTwo hail hailTwo mail mailTwo
```

To list all files starting with a literal `?ail`:

```
$ ls \?ail*
?ail  ?ailTwo
```

Here, `\?ail*` treats `\?` as literal `?` and `*` as the wildcard for any suffix.

> [!important]
> **Warning**
>
> Be cautious: unescaped wildcards can match unintended files. Always check your patterns with `echo` or `ls` before running destructive commands.

## 5\. Merging Globs into a Single Pattern

For files named `Pail`, `Pail*`, and `PailTwo`:

```
$ touch Pail Pail* PailTwo
$ ls
Pail Pail* PailTwo
```

You can match them all using:

```
$ ls Pail*
Pail Pail* PailTwo
```

The `*` wildcard expands to zero or more characters following `Pail`.

## 6\. Quick Reference Table

| Special Character | Behavior                | Escaped Form | Example         |
| ----------------- | ----------------------- | ------------ | --------------- |
| `?`               | Single-character match  | `\\?`        | `touch \\?file` |
| `*`               | Zero or more characters | `\\*`        | `ls Pail\\*`    |
| `[` `]`           | Character set           | `\\[` `\\]`  | `ls \\[abc\\]*` |

## Summary

- A backslash (`\`) or quotes disables globbing for the next character or entire string.
- Use wildcards (`?`, `*`, `[ ]`) without escaping to match patterns.
- Combine escaped literals and wildcards for precise filename operations.

## Links and References

- [GNU Bash Manual – Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)
- [Bash Guide: Filename Expansion](https://mywiki.wooledge.org/Globbing)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/a9d9ba2b-0baf-4c13-b60b-f6ce9cf97abd/lesson/a6c0b385-2275-4130-a9a9-fd35cd516de1)**
>
> Watch video content
