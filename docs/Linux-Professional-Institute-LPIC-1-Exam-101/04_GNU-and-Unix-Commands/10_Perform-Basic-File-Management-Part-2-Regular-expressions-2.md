# Perform Basic File Management Part 2 Regular expressions 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Perform-Basic-File-Management-Part-2-Regular-expressions-2)

---

## Table of Contents

- Perform Basic File Management Part 2 Regular expressions 2
  - Enabling Extended Regex: -E vs egrep
  - Quantifiers at a Glance
  - Alternation with |
  - Character Sets and Ranges
  - Matching Device Files under /dev
  - Beyond grep
  - Links and References
  - Watch Video
    - {n,} – At Least n Matches
    - {,m} – At Most m Matches
    - {n} – Exactly n Matches
    - ? – Optional Element
    - {n,m} – Range of Matches

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Perform Basic File Management Part 2 Regular expressions 2

---

language: en

---

In this lesson, we’ll master **extended regular expressions** (`ERE`) using Linux tools like `grep -E` and `egrep`. You’ll learn how to apply quantifiers, character classes, alternation, and grouping to perform powerful text searches.

## Enabling Extended Regex: `-E` vs `egrep`

By default, `grep` treats metacharacters such as `+`, `?`, `{}`, `|`, and `()` literally. To activate these operators without escaping them, add the `-E` option or use `egrep`:

```
$ grep -Er '0+' /etc/
/etc/pnm2ppa.conf:#colorshear         0
/etc/pnm2ppa.conf:#blackshear         0
...
/etc/subuid:aaron:100000:65536
```

Or simply:

```
$ egrep -r '0+' /etc/
```

> [!important]
> **Note**
>
> On some systems, `egrep` is a deprecated symlink to `grep -E`. The two commands are functionally equivalent.

## Quantifiers at a Glance

| Quantifier | Description                     |
| ---------- | ------------------------------- |
| `x+`       | One or more of `x`              |
| `x?`       | Zero or one of `x`              |
| `x{n}`     | Exactly _n_ occurrences of `x`  |
| `x{n,}`    | At least _n_ occurrences of `x` |
| `x{,m}`    | Up to _m_ occurrences of `x`    |
| `x{n,m}`   | Between _n_ and _m_ occurrences |

### `{n,}` – At Least _n_ Matches

Find lines with **three or more** consecutive zeros:

```
$ egrep -r '0{3,}' /etc/
/etc/vmware-tools/.../xmlidsig-core-schema.xsd:<schema version="0.1">
grep: /etc/firewalld: Permission denied
...
```

### `{,m}` – At Most _m_ Matches

Match up to **three zeros** (including none):

```
$ egrep -r '10{,3}' /etc/
/etc/pmn2ppa.conf:# valid blackness choices are 1 2 3 4
...
```

### `{n}` – Exactly _n_ Matches

Search for exactly **three zeros**:

```
$ egrep -r '0{3}' /etc/
/etc/vmware-tools/.../xmlidsig-core-schema.xsd:<schema version="0.1">
...
```

### `?` – Optional Element

Make the preceding character optional (0 or 1):

```
$ egrep -r 'disable' /etc/      # matches "disable"
/etc/some.conf:# disable feature X


$ egrep -r 'disabled?' /etc/   # matches "disable" or "disabled"
/etc/other.conf:# disabled by default
```

### `{n,m}` – Range of Matches

Match between 3 and 5 zeros:

```
$ egrep -r '0{3,5}' /etc/
/etc/example.conf:# found in 0000 sequence
...
```

## Alternation with `|`

Use `|` to choose between patterns. To match `enabled` or `disabled`:

```
$ egrep -r 'enabled|disabled' /etc/
/etc/tuned/tuned-main.conf:# If enabled, re-apply sysctls.
/etc/vmware-tools/tools.conf.example:# disabled.
```

Combine `?` to make the final letter optional:

```
$ egrep -ir 'enabled?|disabled?' /etc/
/etc/nanorc:## Enable vim-style lock-files.
/etc/nanorc:## To make sure an option is disabled, use "unset <option>".
```

## Character Sets and Ranges

Define a set of acceptable characters with square brackets:

- `[abc123]` matches one of a, b, c, 1, 2, or 3
- `[a-z]` matches one lowercase letter
- `[0-9]` matches one digit

![The image shows a dark-themed terminal interface with a focus on ranges or sets, displaying examples like `[a-z]` and `[0-9]`. The word "KodeKloud" is visible in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752881398/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Regular-expressions-2/dark-terminal-sets-examples-kodekloud.jpg)

Example: match `cat` or `cut`:

```
$ egrep -r 'c[au]t' /etc/
/etc/nanorc:# bind M-B cutwordleft main
...
```

## Matching Device Files under `/dev`

A naive `'/dev/.*'` catches entire paths. Refine step by step:

1.  Lowercase names + optional digit

    ```
    $ egrep -r '/dev/[a-z]*[0-9]?' /etc/
    ```

2.  Add uppercase letters

    ```
    $ egrep -r '/dev/([a-zA-Z]*[0-9]?)' /etc/
    ```

3.  Allow multiple segments by grouping

    ```
    $ egrep -r '/dev/([a-zA-Z]*[0-9]?)*' /etc/
    ```

/etc/sane.d/dc210.conf:port=/dev/tty0P0 ...

````


## Sub-Expressions with Parentheses


Parentheses group patterns or apply quantifiers to the entire subexpression:


![The image shows a dark-themed interface with a command line on the left and a mathematical expression evaluation on the right, demonstrating the use of parentheses in subexpressions.](https://kodekloud.com/kk-media/image/upload/v1752881398/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Regular-expressions-2/dark-interface-command-line-math-evaluation.jpg)


For instance, `(ab){2}` matches `abab` but not `aba`.


## Negated Sets


Place `^` immediately after `[` to invert the set. To match `http` not followed by `s`:


```bash
$ egrep -r 'http[^s]' /etc/
/etc/smartmontools/smart.conf:# Home page is: http://www.smartmontools.org
...
````

![The image shows a dark-themed interface with a command line prompt on the left and a section on the right displaying character sets like "[abc123]" and "[a-z]". The title "Negated Ranges Or Sets" is at the top.](https://kodekloud.com/kk-media/image/upload/v1752881399/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Perform-Basic-File-Management-Part-2-Regular-expressions-2/negated-ranges-sets-command-line.jpg)

Example: find slashes not followed by lowercase:

```
$ egrep -r '/[^a-z]' /etc/
/etc/nanorc:include "/usr/share/nano/*.nanorc"
...
```

## Beyond `grep`

Extended regex patterns also work with `sed`, `awk`, `perl`, and many text editors. A great hands-on resource is [regexr.com](https://regexr.com) for interactive testing and learning.

## Links and References

- [GNU grep Manual](https://www.gnu.org/software/grep/manual/grep.html)
- [Regular Expression (Regex) Tutorial](https://www.regular-expressions.info/)
- [Tutorialspoint: Linux grep Command](https://www.tutorialspoint.com/unix_commands/grep.htm)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/895dca43-1b10-45ba-8666-d48be9fe1a17)**
>
> Watch video content
