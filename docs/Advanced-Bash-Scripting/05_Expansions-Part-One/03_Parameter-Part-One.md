# Parameter Part One - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Expansions-Part-One/Parameter-Part-One)

---

## Table of Contents

- Parameter Part One
  - Patterns in Bash
  - Variable Expansion vs. Parameter Expansion
  - Removing Prefixes and Suffixes
  - Quick Reference Table
  - Next Steps
  - References
  - Watch Video
    - Understanding Prefix and Suffix
    - Prefix Removal with
    - Suffix Removal with %

---

## Content

Advanced Bash Scripting

Expansions Part One

# Parameter Part One

In Bash scripting, parameter expansion lets you transform variable values using patterns inside `${}`. Previously, we replaced “file.txt” with “data” in a path:

```
#!/usr/bin/env bash
path="/home/user/file.txt"
echo "${path/file.txt/data}"
# Output: /home/user/data
```

In this lesson, we’ll focus on pattern matching and how to remove prefixes and suffixes from strings using Bash parameter expansion.

## Patterns in Bash

A _pattern_ is a sequence of characters recognized by the shell for matching or substitution. You’ll find patterns in file globbing (e.g., `*.txt`), text processing, and data validation. In Bash, patterns power parameter expansion, letting you transform variable content without external tools.

## Variable Expansion vs. Parameter Expansion

By default, `${var}` simply expands to its value:

```
name="John Doe"
echo "Hello, ${name}"
# Hello, John Doe
```

When you include operators like `#` or `%` inside the braces, Bash invokes parameter expansion, applying pattern-based modifications to the variable’s value.

> [!important]
> **Note**
>
> Always enclose the expression in double quotes (`"${...}"`) to preserve spaces and prevent word splitting.

## Removing Prefixes and Suffixes

Bash supports removing the _shortest_ matching prefix or suffix from a string with `${var#pattern}` and `${var%pattern}`.

### Understanding Prefix and Suffix

Consider these job titles in an IT company:

![The image lists different engineering job titles: Mid DevOps Engineer, Jr. Software Engineer, Sr. DevOps Engineer, and Associate DevOps Engineer, alongside an icon of a briefcase with a magnifying glass.](https://kodekloud.com/kk-media/image/upload/v1752868556/notes-assets/images/Advanced-Bash-Scripting-Parameter-Part-One/engineering-job-titles-briefcase-icon.jpg)

- Prefixes (associate, senior, junior, mid) indicate tenure or level.
- The suffix (`Engineer`) indicates the job field.

### Prefix Removal with

The `#` operator deletes the shortest matching pattern from the _start_ of the string:

![The image illustrates the concept of "Parameter Expansions" with a focus on removing a prefix, represented by a hashtag symbol and scissors icon.](https://kodekloud.com/kk-media/image/upload/v1752868557/notes-assets/images/Advanced-Bash-Scripting-Parameter-Part-One/parameter-expansions-remove-prefix.jpg)

Example 1: Remove the leading `H`:

```
greetings="Hello World"
echo "${greetings#H}"
# Output: ello World
```

If the pattern isn't found at the beginning, the value remains unchanged:

```
echo "${greetings#e}"
# Output: Hello World
```

Example 2: Remove the word “Hello ” (including the space):

```
echo "${greetings#Hello }"
# Output: World
```

Patterns are case-sensitive: `"h"` won’t match `"H"`.

```
echo "${greetings#h}"
# Output: Hello World
```

### Suffix Removal with %

The `%` operator removes the shortest matching pattern from the _end_ of the string:

Example 1: Drop the trailing `d`:

```
echo "${greetings%d}"
# Output: Hello Worl
```

Example 2: Remove “rld” at the end:

```
echo "${greetings%rld}"
# Output: Hello Wo
```

If the suffix doesn't match exactly, the string stays the same:

```
echo "${greetings%world}"
# Output: Hello World
```

> [!important]
> **Warning**
>
> Pattern matching in Bash is case-sensitive. Ensure your pattern matches the exact case of the prefix or suffix.

## Quick Reference Table

| Operator         | Action                       | Example                         |
| ---------------- | ---------------------------- | ------------------------------- |
| `${var#pattern}` | Remove shortest prefix match | `${greetings#Hello }` → `World` |
| `${var%pattern}` | Remove shortest suffix match | `${greetings%rld}` → `Hello Wo` |

![The image illustrates parameter expansions, showing a blue circle with a hash symbol for "Prefix" and a red circle with a percent symbol for "Suffix."](https://kodekloud.com/kk-media/image/upload/v1752868558/notes-assets/images/Advanced-Bash-Scripting-Parameter-Part-One/parameter-expansions-prefix-suffix.jpg)

## Next Steps

In the next lesson, we'll explore _longest_\-match removals using `##` and `%%` to strip more complex patterns.

## References

- [Bash Reference Manual: Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0e090d75-12b5-4e0f-ace8-519f11d7b5d2/lesson/6ce8bd94-0ac6-4398-9814-e925337bf0f0)**
>
> Watch video content
