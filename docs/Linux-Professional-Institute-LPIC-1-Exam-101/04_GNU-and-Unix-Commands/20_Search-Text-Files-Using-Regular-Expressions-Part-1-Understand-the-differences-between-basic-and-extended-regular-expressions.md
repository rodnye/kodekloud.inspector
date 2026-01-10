# Search Text Files Using Regular Expressions Part 1 Understand the differences between basic and extended regular expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Search-Text-Files-Using-Regular-Expressions-Part-1-Understand-the-differences-between-basic-and-extended-regular-expressions)

---

## Table of Contents

- Search Text Files Using Regular Expressions Part 1 Understand the differences between basic and extended regular expressions
  - Why Extended Regular Expressions?
  - Enabling ERE in grep
  - Quantifier Cheat Sheet
  - Optional Elements with ?
  - Zero or More with \*
  - Alternation with |
  - Character Classes and Ranges
  - Building up a Device-Name Pattern
  - Sub-Expressions (Grouping)
  - Negated Character Classes
  - Conclusion & Further Reading
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Search Text Files Using Regular Expressions Part 1 Understand the differences between basic and extended regular expressions

In this lesson, we’ll dive into **extended regular expressions** (ERE) on Linux, compare them with basic regex (BRE), and demonstrate how to leverage powerful metacharacters—without drowning in backslashes. You’ll learn to match repetitions, optional elements, alternation, ranges, sub-expressions, and negations using `grep`, `egrep`, `sed`, and other tools.

## Why Extended Regular Expressions?

Basic regular expressions require backslashes to enable special operators (`\+`, `\?`, `\|`). EREs simplify syntax and unlock built-in support for:

- `+`, `?`, `|`
- Range quantifiers `{m,n}`
- Grouping via `()`

This results in cleaner, more maintainable patterns.

## Enabling ERE in grep

Use `-E` with `grep` or call the `egrep` command directly:

```
# Search recursively for one or more zeros in /etc
grep -Er '0+' /etc/
/usr/share/example.conf: option0
# Or equivalently:
egrep -r '0+' /etc/
```

Sample output:

```
/etc/pm2ppa.conf:#colorshear        0
/etc/pm2ppa.conf:#blackshear        0
/etc/pm2ppa.conf:#GammaR 1.0           # red enhancement
…
/etc/subuid--charles:23172:65536
```

## Quantifier Cheat Sheet

| Quantifier | Description                 | Example                               |
| ---------- | --------------------------- | ------------------------------------- |
| `?`        | 0 or 1 occurrence           | `colou?r` matches `color` or `colour` |
| `*`        | 0 or more occurrences       | `a*b` matches `b`, `ab`, `aaab`       |
| `+`        | 1 or more occurrences       | `0+` matches `0`, `00`, `000`         |
| `{n}`      | Exactly n times             | `A{3}` matches `AAA`                  |
| `{m,}`     | At least m times            | `0{3,}` matches `000` or more         |
| `{,n}`     | Up to n times (including 0) | `1{,3}` matches `1`, `11`, `111`      |
| `{m,n}`    | Between m and n times       | `a{2,4}` matches `aa`, `aaa`, `aaaa`  |

## Optional Elements with `?`

Make the preceding atom optional:

```
# Match "disable" or "disabled"
egrep -r 'disabled?' /etc/
```

> [!important]
> **Note**
>
> Because grep matches substrings by default, `disabled?` also finds `disables` unless you anchor (`^`, `$`) or use word boundaries (`\b`).

## Zero or More with `*`

`*` allows the element to repeat any number of times:

```
# Matches "/dev/" plus any characters
egrep -r '/dev/.*' /etc/
```

> [!important]
> **Warning**
>
> Unbounded `.*` is greedy and may overmatch. Constrain it with character classes or quantifiers whenever possible.

## Alternation with `|`

Select between multiple patterns:

```
# Find "enabled" or "disabled"
egrep -r 'enabled|disabled' /etc/
```

Combine with `?` to catch both forms:

```
egrep -ri 'enabled?|disabled?' /etc/
```

## Character Classes and Ranges

Define sets of allowed characters with `[]`. Hyphens indicate ranges:

```
# Match "cat" or "cut"
egrep -r 'c[au]t' /etc/


# Any lowercase letter
egrep -r '[a-z]' /etc/


# Any digit
egrep -r '[0-9]' /etc/


# Specific characters
egrep -r '[ABZ954]' /etc/
```

## Building up a Device-Name Pattern

To match Linux device nodes under `/dev` while avoiding overmatching:

1.  Letters only:

    ```
    egrep -r '/dev/[a-z]*' /etc/
    ```

2.  Append exactly one digit:

    ```
    egrep -r '/dev/[a-z]*[0-9]' /etc/
    ```

3.  Make the digit optional:

    ```
    egrep -r '/dev/[a-z]*[0-9]?' /etc/
    ```

4.  Repeat letter+digit segments (e.g., `tty0p0`):

    ```
    egrep -r '/dev/([a-z]*[0-9]?)+' /etc/
    ```

5.  Allow uppercase letters too:

    ```
    egrep -r '/dev/(([a-z]|[A-Z])*[0-9]?)+' /etc/
    ```

Each refinement better aligns with real devices like `/dev/sda`, `/dev/ttyS0`, and `/dev/tty0p0`.

## Sub-Expressions (Grouping)

Group subpatterns with parentheses so quantifiers apply to the entire unit:

![The image shows a dark-themed interface with a command line on the left and a mathematical expression evaluation on the right, demonstrating the use of subexpressions with parentheses.](https://kodekloud.com/kk-media/image/upload/v1752881409/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Search-Text-Files-Using-Regular-Expressions-Part-1-Understand-the-differences-between-basic-and-extended-regular-expressions/dark-interface-command-line-math-evaluation.jpg)

```
egrep -r '/dev/([a-z]*[0-9]?)+ ' /etc/
```

## Negated Character Classes

Start a class with `^` to invert it:

```
# "http" not followed by "s"
egrep -r 'http[^s]' /etc/


# Slash not followed by a lowercase letter
egrep -r '/[^a-z]' /etc/
```

## Conclusion & Further Reading

Mastering EREs in `grep`, `egrep`, `sed`, and related tools empowers you to craft precise searches and avoid false positives. Practice your patterns interactively:

- [GNU grep Manual](https://www.gnu.org/software/grep/manual/)
- [Regexr – Online Regex Tester](https://regexr.com/)
- [POSIX Regular Expressions](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/ce40bbd2-29eb-44ef-9c97-f378e9d0d4d8)**
>
> Watch video content
