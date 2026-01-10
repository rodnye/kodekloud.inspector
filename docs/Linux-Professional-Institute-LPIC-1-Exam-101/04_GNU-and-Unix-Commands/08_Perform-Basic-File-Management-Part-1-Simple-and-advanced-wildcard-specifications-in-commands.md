# Perform Basic File Management Part 1 Simple and advanced wildcard specifications in commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Perform-Basic-File-Management-Part-1-Simple-and-advanced-wildcard-specifications-in-commands)

---

## Table of Contents

- Perform Basic File Management Part 1 Simple and advanced wildcard specifications in commands
- Perform Basic File Management – Part 1
  - Simple and Advanced Wildcard Specifications in Commands
  - Wildcard Reference Table
  - 1. Asterisk (\*)
  - 2. Question Mark (?)
  - 3. Bracketed Characters ([ ])
  - 4. Combining Wildcards
  - Links and References
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Perform Basic File Management Part 1 Simple and advanced wildcard specifications in commands

# Perform Basic File Management – Part 1

## Simple and Advanced Wildcard Specifications in Commands

In this lesson, you’ll master wildcard (glob) patterns in Linux to search, copy, move, or delete files efficiently. Wildcards are symbols that stand for one or more characters in file names or paths. We’ll cover three primary types:

- Asterisk (`*`)
- Question mark (`?`)
- Bracketed expressions (`[ ]`)

![The image explains types of wildcards: asterisk (*) for zero or more occurrences, question mark (?) for a single occurrence, and brackets ([]) for specific character occurrences, with an example of [0-9] matching all digits.](https://kodekloud.com/kk-media/image/upload/v1752881396/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-1-Simple-and-advanced-wildcard-specifications-in-commands/wildcards-asterisk-question-brackets-example.jpg)

---

## Wildcard Reference Table

| Wildcard | Matches                             | Example Pattern | Matches                               |
| -------- | ----------------------------------- | --------------- | ------------------------------------- |
| `*`      | Zero or more characters             | `*.log`         | `kern.log`, `sys.log`, `apperror.log` |
| `?`      | Exactly one character               | `?.conf`        | `a.conf`, `b.conf`, _not_ `ab.conf`   |
| `[ ]`    | Any one character in a set or range | `[0-9].txt`     | `1.txt`, `5.txt`, `9.txt`             |

---

## 1\. Asterisk (`*`)

The asterisk is the most flexible wildcard—it matches any string of characters (even an empty string).

```
# Find all .png images in /home and its subdirectories
find /home -name "*.png"


# List all text files beginning with "lpic-"
ls lpic-*.txt


# Copy all contents under 'animal/' into 'forest/' recursively
cp -r animal/* forest/


# Delete any file whose name contains "ate"
rm *ate*
```

> [!important]
> **Note**
>
> In interactive shells, wrap `*` patterns in quotes (e.g., `"*.png"`) to prevent premature expansion by your shell.

You can use multiple asterisks in a single pattern, at any position:

```
# Matches names like 'backup-2021-01-*.tar.gz'
ls backup-*-*.tar.gz
```

---

## 2\. Question Mark (`?`)

The question mark matches exactly one character. It’s ideal for pinpointing files that differ by a single letter or digit.

```
# Directory listing
ls
# Match any single char between 'l' and 'st.txt'
ls l?st.txt
# Two ? characters allow any two-character prefix
ls ??st.txt
# Output: last.txt  lest.txt  list.txt  past.txt
```

---

## 3\. Bracketed Characters (`[ ]`)

Square brackets let you match one character from a specified set or range.

```
# Only 'last.txt' or 'lest.txt'
ls l[aef]st.txt


# Any lowercase letter between 'a' and 'z'
ls l[a-z]st.txt
```

Combine multiple bracket sets for more control:

```
ls
# Match student-<digit><uppercase>.txt
ls student-[0-9][A-Z].txt
# Output: student-1A.txt  student-2A.txt
```

---

## 4\. Combining Wildcards

For advanced file matching, mix wildcards in a single pattern:

```
ls
# [plf] = p, l, or f ; ? = one char ; * = zero or more chars
ls [plf]?st*
# Output: last.txt  lest.txt  list.txt  past.txt
```

Another practical example:

```
ls
# f* = names starting with 'f'; [0-9] ensures one digit before .txt
ls f*[0-9].txt
# Output: file1.txt  file23.txt  fom23.txt
```

> [!important]
> **Warning**
>
> Be cautious when using wildcards with destructive commands like `rm`. Always double-check your pattern with `ls` before deletion.

---

## Links and References

- [Bash Manual – Pattern Matching](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)
- [Linux Glob How-To](https://tldp.org/LDP/abs/html/globbingref.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

That concludes Part 1 of wildcard specifications. In the next lesson, we’ll dive deeper into escape sequences and advanced glob qualifiers.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/f6a282c3-a525-46e1-b479-9455f24b31d2)**
>
> Watch video content
