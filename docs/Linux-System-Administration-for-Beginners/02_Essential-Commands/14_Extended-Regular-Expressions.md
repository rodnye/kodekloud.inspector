# Extended Regular Expressions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Extended-Regular-Expressions)

---

## Table of Contents

- Extended Regular Expressions
  - Using grep -E vs egrep
  - Curly-Brace Quantifiers
  - ? and \* Quantifiers
  - Character Classes and Ranges
  - Matching Device Files under /dev
  - Sub-Expressions and Grouping
  - Alternation with |
  - Negated Character Classes
  - Beyond grep: Other Regex Tools
  - References
  - Watch Video
  - Practice Lab
    - Examples
    - Match cat or cut

---

## Content

Linux System Administration for Beginners

Essential Commands

# Extended Regular Expressions

Extended Regular Expressions (ERE) let you write more expressive patterns without backslash escapes for common operators. In this guide, you’ll learn how to use quantifiers, character classes, grouping, alternation, and negation with GNU grep (and similar tools) to craft powerful searches.

## Using grep -E vs egrep

Both `grep -E` and `egrep` enable ERE syntax, so you don’t need to escape `+`, `?`, `{}`, or `|`:

| Command               | Description                                        |
| --------------------- | -------------------------------------------------- |
| `grep -Er '0+' /etc/` | Recursively search for one or more `0` in `/etc/`. |
| `egrep -r '0+' /etc/` | Same as above using `egrep`.                       |

```
$ grep -Er '0+' /etc/
$ egrep -r '0+' /etc/
```

> [!important]
> **Note**
>
> Under the hood, `egrep` is equivalent to `grep -E`. Future versions of GNU grep may deprecate `egrep`.

---

## Curly-Brace Quantifiers

Curly braces let you specify exact or range-based repetition counts:

| Syntax  | Meaning                         |
| ------- | ------------------------------- |
| `{n}`   | Exactly _n_ occurrences         |
| `{n,}`  | At least _n_ occurrences        |
| `{,m}`  | At most _m_ occurrences         |
| `{n,m}` | Between _n_ and _m_ occurrences |

### Examples

```
# At least three zeros
$ egrep -r '0{3,}' /etc/


# One followed by up to three zeros (matches "1" as well)
$ egrep -r '10{,3}' /etc/


# Exactly three zeros
$ egrep -r '0{3}' /etc/
```

---

## `?` and `*` Quantifiers

- `x?` – _zero or one_ `x`
- `x*` – _zero or more_ `x`

To match both `disable` and `disabled`, make the final `d` optional:

```
$ egrep -r 'disable(d)?' /etc/
```

---

## Character Classes and Ranges

Define a set or range of characters using square brackets:

- `[abc]` matches `a`, `b`, or `c`
- `[a-z]` matches any lowercase letter
- `[0-9]` matches any digit

![The image shows a dark-themed interface with a command line prompt and examples of character ranges or sets, such as `[a-z]` and `[0-9]`. The text "KodeKloud" is visible in the corner.](https://kodekloud.com/kk-media/image/upload/v1752881478/notes-assets/images/Linux-System-Administration-for-Beginners-Extended-Regular-Expressions/dark-theme-command-line-character-sets.jpg)

### Match `cat` or `cut`

```
$ egrep -r 'c[au]t' /etc/
```

---

## Matching Device Files under `/dev`

A simple `'/dev/.*'` pattern is too greedy:

```
$ egrep -r '/dev/.*' /etc/
```

To restrict matches to letters plus an optional digit:

```
$ egrep -r '/dev/[a-z]+[0-9]?' /etc/
```

> [!important]
> **Warning**
>
> If device names include uppercase letters or multiple segments (e.g., `/dev/tty0p0`), use grouping and repetition to cover all cases.

```
$ egrep -r '/dev/([a-zA-Z]+[0-9]?)+'
```

---

## Sub-Expressions and Grouping

Parentheses `()` treat a group of tokens as a single unit. In arithmetic:

![The image shows a dark interface with a command line prompt on the left and a calculation on the right, demonstrating the expression "1+2*3" which equals "7".](https://kodekloud.com/kk-media/image/upload/v1752881479/notes-assets/images/Linux-System-Administration-for-Beginners-Extended-Regular-Expressions/dark-interface-command-line-calculation.jpg)

- `1 + 2 * 3 = 1 + (2×3) = 7`
- `(1 + 2) * 3 = 3×3 = 9`

In regex:

```
# Repeat a letter+digit group one or more times
$ egrep -r '/dev/([a-zA-Z]+[0-9]?)+'
```

---

## Alternation with `|`

Use `|` to match one pattern or another.

```
# Match "enabled" or "disabled"
$ egrep -r 'enabled|disabled' /etc/


# Case-insensitive mix with optional "d"
$ egrep -ir 'enable(d)?|disable(d)?' /etc/
```

---

## Negated Character Classes

Prefix a class with `^` to invert it:

```
# "http" not followed by "s"
$ egrep -r 'http[^s]' /etc/


# Slash not followed by a lowercase letter
$ egrep -r '/[^a-z]' /etc/
```

---

## Beyond grep: Other Regex Tools

Most Linux utilities support ERE or similar syntax:

| Tool         | Use Case                     |
| ------------ | ---------------------------- |
| `sed`        | Stream editing               |
| `awk`        | Field-based text processing  |
| Text editors | Interactive search & replace |

For interactive testing, try [Regexr](https://regexr.com).

## References

- [GNU grep Manual](https://www.gnu.org/software/grep/manual/)
- [Regular Expressions - MDN](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Regexr Online Tester](https://regexr.com)

Happy pattern crafting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/5805b6da-9cbc-49b5-b24b-4f2bcf80ac8d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/80dfb239-96f2-4fce-8a4b-3da0156e91c9)**
>
> Practice lab
