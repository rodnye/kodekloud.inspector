# Square - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Globs/Square)

---

## Table of Contents

- Square
  - Matching a Range of Characters
  - Negated Character Classes
  - Listing Specific Characters
  - Case Sensitivity
  - Numeric Ranges and Negation
  - Multiple Character Classes
  - Literal Characters Inside Brackets
  - Globbing vs. File Creation
  - Links and References
  - Watch Video
  - Practice Lab
    - Common Examples

---

## Content

Advanced Bash Scripting

Globs

# Square

Shell globbing lets you match filenames using patterns. While `*` matches any string and `?` matches a single character, square brackets (`[ ]`) define _character classes_, enabling you to match one character from a specific set or range.

## Matching a Range of Characters

Given a directory:

```
$ ls
fileA fileB fileC fileD fileE
```

You can match only `fileA`, `fileB`, and `fileC` by specifying a range inside brackets:

```
$ ls file[A-C]
fileA fileB fileC
```

Here, `[A-C]` matches any uppercase letter from A through C. Note that the dash (`-`) defines a range and must go from lower to higher:

```
$ ls file[C-A]
ls: cannot access 'file[C-A]': No such file or directory
```

### Common Examples

| Pattern       | Matches             | Description              |
| ------------- | ------------------- | ------------------------ |
| file\\[A-C\\] | fileA, fileB, fileC | Uppercase A–C            |
| file\\[a-c\\] | filea, fileb, filec | Lowercase a–c            |
| file\\[1-3\\] | file1, file2, file3 | Numeric 1–3              |
| file\\[ACE\\] | fileA, fileC, fileE | Specific letters A, C, E |

## Negated Character Classes

Prefix `!` or `^` inside brackets to exclude characters or ranges:

```
$ ls
fileA fileB fileC fileD fileE

$ ls file[^A-C]
fileD fileE

$ ls file[!A-C]
fileD fileE
```

> [!important]
> **Note**
>
> In Bash both `!` and `^` work for negation. POSIX shells require `!` at the start of the class.

![The image explains that square brackets are special characters in Shell used for creating glob expressions by matching characters inside the brackets.](https://kodekloud.com/kk-media/image/upload/v1752868573/notes-assets/images/Advanced-Bash-Scripting-Square/square-brackets-shell-glob-expressions.jpg)

## Listing Specific Characters

To match non-consecutive filenames such as `fileA`, `fileC`, and `fileE`, simply list them:

```
$ ls file[ACE]
fileA fileC fileE
```

## Case Sensitivity

Globbing in Bash is case sensitive. If you have both uppercase and lowercase files:

```
$ touch filea fileb filec filed filee
$ ls
fileA fileB fileC fileD fileE filea fileb filec filed filee
```

To match only lowercase:

```
$ ls file[a-c]
filea fileb filec
```

To remove both lowercase and uppercase `a–e`, combine ranges:

```
$ rm file[a-eA-E]
$ ls
fileD fileE
```

> [!important]
> **Note**
>
> When mixing ranges, list them in the order you want matched: here `a-e` before `A-E`.

## Numeric Ranges and Negation

Numeric ranges behave the same way:

```
$ touch file1 file2 file3 file4 file5
$ ls file[1-3]
file1 file2 file3

$ ls file[4-5]
file4 file5

$ ls file[^1-3]
file4 file5

$ ls file[!1-3]
file4 file5
```

## Multiple Character Classes

You can chain classes to match multiple positions. For example, to match `filea1`, `filea2`, `fileb1`, `fileb2`:

```
$ touch filea1 filea2 filea3 fileb1 fileb2 fileb3

$ ls file[a-b][1-2]
filea1 filea2 fileb1 fileb2
```

Each `[a-b]` matches one letter, and `[1-2]` matches one digit. If you try only `[1-2]`, it won’t match because the letter is missing:

```
$ ls file[1-2]
ls: cannot access 'file[1-2]': No such file or directory
```

## Literal Characters Inside Brackets

Inside character classes, special glob characters lose their meaning:

```
$ ls file[a][*]
ls: cannot access 'file[a][*]': No such file or directory
```

To use `*` as a wildcard, place it outside the brackets:

```
$ ls filea*
filea1 filea2 filea3
```

Or constrain both positions:

```
$ ls file[a][1-3]
filea1 filea2 filea3
```

## Globbing vs. File Creation

Globs match existing filenames; they do **not** generate names. If you use a glob in a command like `touch` when no files match, the pattern is taken literally:

```
$ touch ?ail
$ ls
'?ail'
```

To produce a series of filenames based on a pattern, consider using **brace expansion** instead of globs.

> [!important]
> **Warning**
>
> Globbing won’t create files—only match them. If you expect new files, use brace expansion or a loop.

## Links and References

- [Bash Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)
- [KornShell Globbing](https://www2.gnu.org/software/ksh/manual/html_node/Globbing.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/globbingref.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/a9d9ba2b-0baf-4c13-b60b-f6ce9cf97abd/lesson/89ce15f2-0090-4dd1-bc97-1f4e002bfb97)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/a9d9ba2b-0baf-4c13-b60b-f6ce9cf97abd/lesson/79dcd2f2-5c1a-45e8-b7cc-fe7d7337df1f)**
>
> Practice lab
