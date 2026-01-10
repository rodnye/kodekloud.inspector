# Perform Basic File Management Part 2 Using find - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Perform-Basic-File-Management-Part-2-Using-find)

---

## Table of Contents

- Perform Basic File Management Part 2 Using find
  - Common Regular Expression Operators
  - Anchors: Matching Line Boundaries
  - Wildcard: The Dot .
  - Escaping Metacharacters
  - Quantifiers: \* and +
  - Next Steps
  - References
  - Watch Video
    - ^ (Start of Line)
    - $ (End of Line)
    - - (Zero or More)
    - - (One or More)

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Perform Basic File Management Part 2 Using find

In this lesson, we combine `find` with powerful regular expressions in `grep` to perform advanced text analysis on Linux. Previously, we used simple patterns like searching for “CentOS.” Now, we’ll tackle more complex tasks—such as extracting every IP address (e.g., 203.102.3.5) from multiple scattered files—by writing concise regex patterns that match exactly what you need.

Regular expressions let you define constraints, much like restricting a variable ( x ) in mathematics:

![The image shows a number line with conditions for an integer ( x ) where ( x > 3 ) and ( x < 8 ). The numbers 3 and 8 are marked, with question marks in between.](https://kodekloud.com/kk-media/image/upload/v1752881400/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Using-find/number-line-conditions-integer-x.jpg)

By combining operators, you create a single pattern that matches only what you allow.

## Common Regular Expression Operators

Below is a quick reference to essential regex operators—mastering these accelerates file searches and log parsing:

| Operator | Description                           | Example                  |
| -------- | ------------------------------------- | ------------------------ | ------ | ---- |
| ^        | Start of line                         | `^root`                  |
| $        | End of line                           | `\\.conf$`               |
| .        | Any single character                  | `c.t`                    |
| \\\*     | Zero or more of the preceding element | `go*d`                   |
| +        | One or more of the preceding element  | `go+d`                   |
| ?        | Zero or one (optional)                | `colou?r`                |
| \\[\\]   | Character class                       | `[0-9]`                  |
| {}       | Quantifier (exact, range)             | `a{3}`, `b{2,4}`         |
| ()       | Grouping                              | `(abc)+`                 |
| \\       |                                       | Alternation (logical OR) | `cat\\ | dog` |
| \\[^\\]  | Negated character class               | `[^a-z]`                 |

![The image displays a set of regex operators, including symbols like `^`, `$`, `.`, `*`, `+`, `{}`, `?`, `|`, `[]`, `()`, and `[^]`.](https://kodekloud.com/kk-media/image/upload/v1752881402/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Using-find/regex-operators-symbols-set.jpg)

## Anchors: Matching Line Boundaries

### `^` (Start of Line)

Restrict your search to the beginning of each line:

```
$ cat names.txt
adam
adnan
basam
samad
samuel
sheela
ravi
mausami


$ grep '^sam' names.txt
samad
samuel
```

You can apply the same technique to system files. For instance, find lines in `/etc/login.defs` that start with `PASS`:

![The image shows a dark-themed command-line interface with the text "The line begins with" at the top. The prompt is ready for input, and "KodeKloud" is visible in the corner.](https://kodekloud.com/kk-media/image/upload/v1752881403/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Using-find/dark-command-line-interface-kodekloud.jpg)

```
$ grep '^PASS' /etc/login.defs
PASS_WARN_AGE   7
PASS_MAX_DAYS   90
```

### `$` (End of Line)

Match patterns only at the end of lines:

```
$ grep 'sam$' names.txt
basam


$ grep '7$' /etc/login.defs
PASS_WARN_AGE   7


$ grep 'mail$' /etc/login.defs
MAIL_DIR       /var/spool/mail
#MAIL_FILE     .mail
```

## Wildcard: The Dot `.`

The dot `.` matches exactly one character. To search for any three-letter word starting with ‘c’ and ending with ‘t’:

```
$ grep -r 'c.t' /etc/
/etc/man_db.conf:#DEFINE cat cat
/etc/man_db.conf:# Range of terminal widths permitted when displaying cat pages.
/etc/nanorc:## double click), and execute shortcuts. The mouse will work in the X
...
```

To match whole words rather than substrings, add `-w`:

```
$ grep -wr 'c.t' /etc/
/etc/brltty/Input/mn/all.txt:Left: append to existing cut buffer from selected character
/etc/brltty/Input/mn/all.txt:Up: start new cut buffer at selected character
...
```

## Escaping Metacharacters

If you need to match a literal metacharacter (e.g., a dot), escape it with a backslash:

```
$ grep '\.' /etc/login.defs
# Finds every line that contains a literal dot.
```

## Quantifiers: `*` and `+`

### `*` (Zero or More)

The asterisk matches zero or more occurrences of the previous element:

```
$ grep -r 'let*' /etc/
/etc/pnm2ppa.conf:#silent 1
/etc/pnm2ppa.conf:#leftmargin      10
...
```

Combine `.` and `*` to match any sequence between delimiters:

```
$ grep -r '/.*/' /etc/
/etc/man_db.conf:# before /usr/man.
/etc/man_db.conf:MANDB_MAP             /usr/man
...
```

![The image shows a dark-themed terminal interface with a command line prompt and a description of the asterisk (*) symbol, indicating it matches the previous element zero or more times.](https://kodekloud.com/kk-media/image/upload/v1752881403/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Using-find/dark-terminal-command-prompt-asterisk.jpg)

### `+` (One or More)

In basic `grep`, `+` is literal unless escaped. To require at least one occurrence:

![The image shows a dark-themed command-line interface with a prompt and a description of the "+" symbol, indicating it matches the previous element one or more times.](https://kodekloud.com/kk-media/image/upload/v1752881404/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Using-find/dark-command-line-plus-symbol-description.jpg)

```
# Zero or more matches still include lines without '0':
$ grep -r '0*' /etc/
/etc/pnm2ppa.conf:#


# Require one or more zeros:
$ grep -r '0\+' /etc/
/etc/brltty/Keyboard/keypad.ktb:bind KP0:!KP2 MENU_NEXT_ITEM
```

> [!important]
> **Note**
>
> Basic `grep` treats `+`, `?`, `{}`, `|`, and `()` as literals. To use them without escaping, switch to extended regex mode:
>
> ```
> grep -E 'pattern+|another' file.txt
> # or
> egrep 'pattern+|another' file.txt
> ```

## Next Steps

With these operators in your toolkit, you can build advanced patterns to extract IPs, parse log entries, and automate complex text-processing tasks across your Linux systems.

## References

- [GNU grep Manual](https://www.gnu.org/software/grep/manual/grep.html)
- [Regular Expressions – Tutorialspoint](https://www.tutorialspoint.com/regular_expressions/index.htm)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/f01cd944-5755-477b-a37b-271639396ce9)**
>
> Watch video content
