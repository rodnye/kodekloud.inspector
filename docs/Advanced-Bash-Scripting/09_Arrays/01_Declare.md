# Declare - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Arrays/Declare)

---

## Table of Contents

- Declare
  - Data Types in Bash
  - Enforcing Integer Types with declare -i
  - Other declare Flags
  - Arrays with declare -a
  - Links and References
  - Watch Video
    - Dynamically Typed Variables
    - Read-Only Variables (-r)
    - Case Conversion (-u, -l)

---

## Content

Advanced Bash Scripting

Arrays

# Declare

The `declare` (also known as `typeset`) built-in in Bash lets you assign attributes and data types to your variables. While Bash is dynamically typed, using `declare` can help enforce types (like integers), create read-only variables, and define arrays.

In this article, we'll cover:

- Data types in Bash
- Dynamically typed variables
- Enforcing integer types with `declare -i`
- Other useful `declare` flags
- Working with arrays using `declare -a`

![The image features a list of programming-related topics with checkmarks, including explaining data types, dynamically typed syntax, the declare command in Bash, and using declare for arrays. It also includes simple line drawings of a person and a lightbulb.](https://kodekloud.com/kk-media/image/upload/v1752868546/notes-assets/images/Advanced-Bash-Scripting-Declare/programming-topics-checklist-drawing.jpg)

## Data Types in Bash

Bash offers two fundamental data types:

1.  **String**
2.  **Integer**

![The image shows a split screen with "String" labeled as 1 on the left and "Integer" labeled as 2 on the right, under the title "arrays-declare."](https://kodekloud.com/kk-media/image/upload/v1752868547/notes-assets/images/Advanced-Bash-Scripting-Declare/arrays-declare-string-integer.jpg)

You can assign values using the typical syntax:

```
# String assignment
name="John Doe"
echo "$name"   # John Doe


# Integer assignment
count=10
echo "$count"  # 10
```

### Dynamically Typed Variables

Bash determines the type at runtime, based on context:

```
#!/usr/bin/env bash
var="10"
echo $(( var + 1 ))   # 11
```

You can even switch types on the fly:

```
#!/usr/bin/env bash
i="42"
echo $(( i + 8 ))   # 50


i="hello"
echo "$i"           # hello
```

> [!important]
> **Note**
>
> Bash’s dynamic typing means it tries to interpret values at runtime—no compile-time errors for type mismatches.

## Enforcing Integer Types with `declare -i`

To enforce integer semantics (mimicking static typing), use:

```
#!/usr/bin/env bash
declare -i num=5
echo $(( num + 2 ))   # 7


num="not a number"
echo "$num"           # 0
```

Non-numeric assignments reset the variable to `0`.

## Other `declare` Flags

Here’s a quick reference for some common attributes:

| Flag | Description                | Example                             |
| ---- | -------------------------- | ----------------------------------- |
| \\-i | Force integer              | `declare -i counter=100`            |
| \\-r | Read-only variable         | `declare -r PI=3.1415`              |
| \\-u | Convert value to uppercase | `declare -u animal="dog"` → `DOG`   |
| \\-l | Convert value to lowercase | `declare -l word="HELLO"` → `hello` |

### Read-Only Variables (`-r`)

```
#!/usr/bin/env bash
declare -r VERSION="1.0.0"
echo "$VERSION"
VERSION="2.0.0"  # Error: readonly variable
```

> [!important]
> **Warning**
>
> Attempting to modify a `readonly` variable will terminate your script with an error.

### Case Conversion (`-u`, `-l`)

```
#!/usr/bin/env bash
declare -u upper
declare -l lower


upper="Bash Rocks"
lower="Bash Rocks"


echo "$upper"  # BASH ROCKS
echo "$lower"  # bash rocks
```

## Arrays with `declare -a`

Bash supports both indexed and associative arrays:

```
#!/usr/bin/env bash


# Indexed array
declare -a fruits=("apple" "banana" "cherry")
echo "${fruits[1]}"    # banana


# Associative array
declare -A colors
colors[sky]=blue
colors[rose]=red
echo "${colors[rose]}" # red
```

| Array Type        | Declaration      | Access          |
| ----------------- | ---------------- | --------------- |
| Indexed Array     | `declare -a arr` | `${arr[index]}` |
| Associative Array | `declare -A map` | `${map[key]}`   |

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [KornShell `typeset` Documentation](https://www.kornshell.com/doc/sections/toc.html)
- [GNU Bash Features](https://www.gnu.org/software/bash/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/df27d5e6-23c2-4e4e-9163-4dd73f639282/lesson/2f42b8d5-73da-4a1f-901e-08b6ca0ce20d)**
>
> Watch video content
