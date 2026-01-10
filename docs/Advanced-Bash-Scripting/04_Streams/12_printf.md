# printf - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Streams/printf)

---

## Table of Contents

- printf
  - echo vs printf
  - Format Specifiers
  - Escape Sequences and Portability
  - Return Status and Character Count
  - References
  - Watch Video
  - Practice Lab
    - Example: Strings and Numbers

---

## Content

Advanced Bash Scripting

Streams

# printf

In Unix-like systems, `printf` is a POSIX-standard command for producing formatted output in the terminal. Unlike `echo`, which is usually a shell builtin, `printf` is an external executable that you invoke each time – trading a slight performance cost for precise control over formatting, field widths, alignment, and escape sequences.

## echo vs printf

When you run `echo`, the shell handles it internally:

```
$ echo "Hello, world!"
Hello, world!
```

By contrast, `printf` is an external program:

```
$ printf "Hello, printf!\n"
Hello, printf!
```

> [!important]
> **Note**
>
> Because `printf` is external, the shell forks a new process to execute it. Despite this overhead, `printf` offers richer formatting capabilities and consistent behavior across different shells.

![The image shows a diagram related to the "printf" function, highlighting its capabilities such as formatting text in a specific way, left-aligning, and right-aligning.](https://kodekloud.com/kk-media/image/upload/v1752868659/notes-assets/images/Advanced-Bash-Scripting-printf/printf-function-formatting-diagram.jpg)

## Format Specifiers

`printf` uses format specifiers similar to C's `printf()`. Here are the most common ones:

| Specifier  | Description                       | Example                    |
| ---------- | --------------------------------- | -------------------------- |
| `%s`       | String                            | `printf "%s\\n" "text"`    |
| `%d`       | Signed integer                    | `printf "%d\\n" 42`        |
| `%f`       | Floating-point number             | `printf "%.2f\\n" 3.14159` |
| `%o`       | Octal representation              | `printf "%o\\n" 10`        |
| `%x`/%`%X` | Hexadecimal (lowercase/uppercase) | `printf "%x\\n" 255`       |
| `%%`       | Literal percent sign              | `printf "%%\\n"`           |

### Example: Strings and Numbers

```
#!/usr/bin/env bash
course="Advanced Shell Scripting"
printf "Welcome to the %s\n" "$course"


name="Alice"
age=28
weight=65.2
printf "Name: %s | Age: %d | Weight: %.1f kg\n" \
    "$name" "$age" "$weight"
```

This prints:

```
Welcome to the Advanced Shell Scripting
Name: Alice | Age: 28 | Weight: 65.2 kg
```

![The image shows a dark background with four dotted boxes labeled "Floating numbers," "Width for integers," "Alignment," and "...", under the title "printf."](https://kodekloud.com/kk-media/image/upload/v1752868660/notes-assets/images/Advanced-Bash-Scripting-printf/printf-floating-numbers-boxes.jpg)

## Escape Sequences and Portability

Different shells handle `echo` escape sequences inconsistently. For example:

```
$ echo "Line1\nLine2"
Line1\nLine2
$ echo -e "Line1\nLine2"
Line1
Line2
```

To ensure portability, use `printf` which interprets `\n`, `\t`, and other escapes by default:

```
$ printf "Line 1\nLine 2\n"
Line 1
Line 2
```

> [!important]
> **Warning**
>
> Avoid relying on `echo -e` for escape handling across scripts. Use `printf` for consistent results in Bash, Dash, Zsh, and other POSIX-compliant shells.

## Return Status and Character Count

`printf` returns an exit status (`0` on success) and you can pipe its output to `wc -c` to count characters:

```
#!/usr/bin/env bash
message="Hello, world!"
if printf "%s" "$message"; then
    count=$(printf "%s" "$message" | wc -c)
    echo -e "\nPrinted $count characters successfully."
else
    echo "Error: printf failed with code $?"
fi
```

## References

- [POSIX printf documentation](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/printf.html)
- [GNU Coreutils printf manual](https://www.gnu.org/software/coreutils/manual/html_node/printf-invocation.html)
- [Bash Shell Builtins](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/30efe781-54b5-483d-8d6b-0603d8840018)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/7fbf07e3-7844-4c27-a2b1-bc6f02cad7a6)**
>
> Practice lab
