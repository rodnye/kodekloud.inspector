# awk print - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/awk/awk-print)

---

## Table of Contents

- awk print
  - Awk Usage Overview
  - Pattern-Action Structure
  - The print Statement
  - Redirecting and Piping Input
  - Summary
  - Links and References
  - Watch Video
    - Accessing Fields
    - Processing Files
    - Printing String Literals
    - Multiple Expressions

---

## Content

Advanced Bash Scripting

awk

# awk print

Awk is a powerful, domain-specific language built for efficient text processing. In this guide, we'll cover its core syntax, the pattern-action structure, and how to use the `print` statement to extract and format data.

## Awk Usage Overview

```
awk [options] [program] [file...]
```

| Option         | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `-F fs`        | Set the input field separator to `fs`                          |
| `-v var=value` | Assign a value to an awk variable before program execution     |
| `-f file`      | Read the awk program from the specified `file`                 |
| `program`      | Provide the awk program directly as a quoted string            |
| `file...`      | One or more input files; if omitted, reads from standard input |

> [!important]
> **Note**
>
> Always quote your `program` (single or double quotes) so the shell passes it verbatim to awk.

For full details, see the [GNU Awk Manual](https://www.gnu.org/software/gawk/manual/gawk.html).

## Pattern-Action Structure

An awk program is a sequence of _pattern-action_ pairs:

```
pattern { action }
```

- If **pattern** is omitted, **action** runs on every input line.
- The `{ … }` block is the **action block**, containing commands like `print`, loops, and conditionals.

Example: Start an interactive session that does nothing with your input.

```
awk '{}'
```

Type lines, then press **Ctrl-D** to end input:

```
$ awk '{}'
hello world
^D
$
```

> [!important]
> **Warning**
>
> Without quotes around `{}`, many shells will interpret braces or special characters—always quote your action blocks!

## The `print` Statement

Inside the action block, `print` sends its arguments (fields, string literals, variables) to standard output.

### Accessing Fields

By default, awk splits each line on whitespace into fields named `$1`, `$2`, ..., `$NF`.

```
$ awk '{ print $2 }'
abc def ghi
jkl mno pqr
^D
def
mno
```

### Processing Files

Place the filename after the program to read from a file instead of interactively:

Given `abc.txt`:

```
abc def ghi
jkl mno pqr
xy yz uv
```

Run:

```
awk '{ print $3 }' abc.txt
```

Output:

```
ghi
pqr
uv
```

### Printing String Literals

You can mix fields and literal strings in a single `print`:

```
awk '{ print "Line:", $1, "->", $NF }' abc.txt
```

Output:

```
Line: abc -> ghi
Line: jkl -> pqr
Line: xy -> uv
```

### Multiple Expressions

Separate expressions by commas; awk joins them with the **output field separator** (`OFS`, default is a space):

```
awk '{ print "Hello", "World" }' abc.txt
```

## Redirecting and Piping Input

Awk accepts input from:

- Files:

  ```
  awk '{ print $0 }' data.txt
  ```

- Standard input via redirection:

  ```
  awk '{ print $0 }' < data.txt
  ```

- Piping from other commands:

  ```
  cat data.txt | awk '{ print $1 }'
  ```

## Summary

- **Command structure**: `awk [options] [pattern-action] [file...]`
- **Pattern-action**: `pattern { action }`
- **Fields**: `$1`, `$2`, … `$NF`
- **String literals**: printed as-is within quotes
- **Separators**: input (`FS`) and output (`OFS`)
- **Interactive mode**: omit files; end with **Ctrl-D**, cancel with **Ctrl-C**

## Links and References

- [GNU Awk Manual](https://www.gnu.org/software/gawk/manual/gawk.html)
- [Kurt Werner’s Awk Tutorial](https://www.grymoire.com/Unix/Awk.html)
- [Awk on TLDP](https://tldp.org/LDP/abs/html/awk.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0cddb337-89d3-4068-a878-37a0a342c22f/lesson/3a318cf3-36c2-44f2-8a85-5fba886c2225)**
>
> Watch video content
