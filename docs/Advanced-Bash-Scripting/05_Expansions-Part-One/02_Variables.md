# Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Expansions-Part-One/Variables)

---

## Table of Contents

- Variables
  - Introduction
  - Basic Variable Expansion
  - Using Curly Braces
  - Parameter Expansion Operators
  - String Manipulation
  - Length of a Variable
  - Quoting and Word Splitting
  - Additional Resources
  - Watch Video
    - Avoiding Ambiguity
    - Default Values
    - Substring Extraction
    - Substring Replacement

---

## Content

Advanced Bash Scripting

Expansions Part One

# Variables

Variable expansion allows you to retrieve and manipulate the value stored in a Bash variable using the `$` syntax. This powerful feature is essential for automation, text processing, and script flexibility.

## Introduction

In shell scripting, variables can store filenames, paths, numbers, or strings. By applying parameter expansion, you can:

- Access variable contents
- Perform string operations
- Provide fallback values
- Calculate lengths and more

```
filename="file.txt"
number=100
string="Hello World"
command_output=$(ls)


dir_path="/path/to/directory"
greeting="Hello"
name="User"
echo "$greeting, $name! Welcome to $dir_path"
```

## Basic Variable Expansion

Whenever the shell sees `$variable_name`, it replaces it with the variable’s value:

```
name="John Doe"
echo $name
# Output:
# John Doe
```

Using braces helps delimit variable names clearly:

```
name="John Doe"
echo "Hello, ${name}"
# Output:
# Hello, John Doe
```

Variable names are case-sensitive and may contain letters, digits, and underscores:

```
# Invalid:
# Valid:
name_user="John Doe"
```

## Using Curly Braces

Curly braces `{}` not only disambiguate names but also unlock advanced parameter expansion features.

### Avoiding Ambiguity

Without braces, attached text can be misinterpreted:

```
#!/usr/bin/env bash
height=170


# Wrong: shell looks for 'heightcm'
echo "Your height is: $heightcm"


# Correct: braces isolate 'height'
echo "Your height is: ${height}cm"
# Output:
# Your height is: 170cm
```

### Default Values

Provide a fallback when a variable is unset or empty:

> [!important]
> **Note**
>
> Use `${var:-default}` to safely reference a variable that may not exist.

```
#!/usr/bin/env bash
echo "Hello, ${name:-Unknown}"
# If 'name' is unset:
# Output:
# Hello, Unknown
```

## Parameter Expansion Operators

| Expansion Type       | Syntax                 | Description                                      |
| -------------------- | ---------------------- | ------------------------------------------------ |
| Default Value        | `${var:-default}`      | Use `default` if `var` is unset or null          |
| Substring Extraction | `${var:offset:length}` | Extract a substring starting at `offset`         |
| String Replacement   | `${var/pattern/repl}`  | Replace the first match of `pattern` with `repl` |
| Length               | `${#var}`              | Return the length of `var`’s value               |

## String Manipulation

### Substring Extraction

Pull out part of a string using an offset and length:

```
#!/usr/bin/env bash
name="John Doe"
echo "Hello, ${name:0:4}"
# Output:
# Hello, John
```

### Substring Replacement

Replace the first occurrence of a pattern:

```
#!/usr/bin/env bash
path="/home/user/file.txt"
echo "${path/file/data}"
# Output:
# /home/user/data.txt
```

## Length of a Variable

Determine the number of characters in a variable’s value:

```
#!/usr/bin/env bash
name="John Doe"
echo "${#name}"
# Output:
# 8
```

## Quoting and Word Splitting

By default, unquoted expansions undergo word splitting. To preserve spaces, quote your variables. If you want to iterate over words, leave them unquoted:

```
#!/usr/bin/env bash
readonly SERVERS="server1 server2 server3"


# Iterate over each hostname:
for server in $SERVERS; do
  echo "${server}.kodekloud.com"
done
# Output:
# server1.kodekloud.com
# server2.kodekloud.com
# As a single string when quoted:
for server in "$SERVERS"; do
  echo "${server}.kodekloud.com"
done
# Output:
# server1 server2 server3.kodekloud.com
```

> [!important]
> **Warning**
>
> Always quote expansions containing spaces unless you explicitly need word splitting.

## Additional Resources

- [GNU Bash Manual – Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Understanding Quoting in Bash](https://tldp.org/LDP/abs/html/quotingvar.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/0e090d75-12b5-4e0f-ace8-519f11d7b5d2/lesson/504de133-a0ad-437b-9cb1-d2fc50a5a4aa)**
>
> Watch video content
