# Command Line Arguments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Refresher/Command-Line-Arguments)

---

## Table of Contents

- Command Line Arguments
  - Table of Contents
  - Understanding Positional Parameters
  - Practical Example: Cloning and Counting Files
  - Parameterizing Your Script
  - Common Special Variables
  - Handling Maximum Argument Size (ARG_MAX)
  - Iterating with shift
  - References
  - Watch Video
  - Practice Lab

---

## Content

Advanced Bash Scripting

Refresher

# Command Line Arguments

Command-line arguments are essential in shell scripting for creating flexible, reusable scripts. Instead of hard-coding values, you can accept inputs at runtime—much like using a remote control to switch channels on a TV. This guide covers everything from basic positional parameters to advanced iteration techniques.

## Table of Contents

- [Understanding Positional Parameters](#understanding-positional-parameters)
- [Practical Example: Cloning and Counting Files](#practical-example-cloning-and-counting-files)
- [Parameterizing Your Script](#parameterizing-your-script)
- [Common Special Variables](#common-special-variables)
- [Handling Maximum Argument Size (`ARG_MAX`)](#handling-maximum-argument-size-arg_max)
- [Iterating with `shift`](#iterating-with-shift)
- [References](#references)

---

## Understanding Positional Parameters

When you invoke a script with arguments:

```
$ ./myscript.sh foo bar baz
```

Inside `myscript.sh`, the inputs map to:

```
#!/bin/bash
echo "First argument: $1"
echo "Second argument: $2"
echo "Third argument: $3"
```

Output:

```
First argument: foo
Second argument: bar
Third argument: baz
```

> [!important]
> **Best Practice**
>
> Always quote your positional parameters to handle spaces and special characters safely:
>
> ```
> echo "User provided: $1"
> ```

---

## Practical Example: Cloning and Counting Files

Suppose you need to clone a Git repository and count its files. A hard-coded approach looks like this:

```
#!/bin/bash


git clone git@github.com:kodedkloud/kodekloud-advanced-shell-scripting.git
find . -type f | wc -l
```

This works but requires editing the script for each repository URL.

---

## Parameterizing Your Script

By using `$1`, you can pass the repository URL when running the script:

```
#!/bin/bash


# Clone the repository passed as the first argument
git clone "$1"


# Count files in the cloned repo
find . -type f | wc -l
```

Run it as:

```
$ ./clone-and-count.sh git@github.com:kodedkloud/kodekloud-advanced-shell-scripting.git
```

Now the script clones any repository you specify.

---

## Common Special Variables

| Variable      | Description                                   | Example Output        |
| ------------- | --------------------------------------------- | --------------------- |
| `$0`          | Script name                                   | `./myscript.sh`       |
| `$1`, `$2`, … | First, second, … arguments                    | `apple banana`        |
| `$#`          | Total number of arguments                     | `3`                   |
| `$@`          | All arguments as separate words               | `apple banana cherry` |
| `$*`          | All arguments as a single word (`"$*"` joins) | `apple banana cherry` |

Example:

```
#!/bin/bash
echo "Script name: $0"
echo "Number of arguments: $#"
echo "All arguments (\$@): $@"
```

```
$ ./myscript.sh apple banana cherry
Script name: ./myscript.sh
Number of arguments: 3
All arguments ($@): apple banana cherry
```

---

## Handling Maximum Argument Size (`ARG_MAX`)

Unix-like systems impose a limit on the total size of command-line arguments. Check it with:

```
$ getconf ARG_MAX
1048576
```

On most Linux distributions, `ARG_MAX` is around 1 MiB, which is sufficient for tens of thousands of small arguments.

> [!important]
> **Warning**
>
> Exceeding `ARG_MAX` will cause a “Argument list too long” error. For bulk operations, consider using `xargs` or reading from a file.

---

## Iterating with `shift`

The `shift` command discards `$1` and shifts all other parameters down by one. This is useful when you don’t know the number of arguments in advance:

```
#!/bin/bash


# Loop through all arguments
while [ $# -gt 0 ]; do
  echo "Current argument: $1"
  shift
done
```

```
$ ./shift-example.sh arg1 arg2 arg3
Current argument: arg1
Current argument: arg2
Current argument: arg3
```

---

Command-line arguments empower you to build dynamic, user-driven shell scripts. Next up: advanced option parsing with `getopts` and long-form flags.

## References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [getconf](https://man7.org/linux/man-pages/man1/getconf.1.html)
- [find(1) — Find Files](https://man7.org/linux/man-pages/man1/find.1.html)
- [wc(1) — Word, Line, Character, and Byte Count](https://man7.org/linux/man-pages/man1/wc.1.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/6e6bb850-f9cf-4691-8989-90c04cfa5ed0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/0a5601db-062f-4f6e-b630-c6cca0d2b275)**
>
> Practice lab
