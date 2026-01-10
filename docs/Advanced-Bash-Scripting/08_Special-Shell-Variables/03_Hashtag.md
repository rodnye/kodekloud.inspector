# Hashtag - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Special-Shell-Variables/Hashtag)

---

## Table of Contents

- Hashtag
  - Table of Contents
  - Why $# Matters
  - Basic Usage of $#
  - Positional Parameters and Empty Defaults
  - Guard Clauses with $#
  - Real-World Example: Walking Calorie Expenditure Script
  - Summary of Key Variables
  - Links and References
  - Watch Video
    - Exact Number of Arguments
    - Minimum Number of Arguments
    - Range of Arguments
    - Flawed Version
    - Improved Version with set -e and terminate()
      - Usage

---

## Content

Advanced Bash Scripting

Special Shell Variables

# Hashtag

In shell scripting, robust error handling and input validation are crucial. Earlier, we saw how `$?` captures the exit status of the last command. In this guide, we’ll dive into `$#`, which returns the number of positional parameters passed to your script or function. By checking `$#` early, you can prevent unexpected behavior and make your scripts more reliable.

## Table of Contents

1.  [Why `$#` Matters](#why-)
2.  [Basic Usage of `$#`](#basic-usage-of-)
3.  [Positional Parameters and Empty Defaults](#positional-parameters-and-empty-defaults)
4.  [Guard Clauses with `$#`](#guard-clauses-with-)
    - [Exact Number of Arguments](#exact-number-of-arguments)
    - [Minimum Number of Arguments](#minimum-number-of-arguments)
    - [Range of Arguments](#range-of-arguments)
5.  [Real-World Example: Walking Calorie Expenditure Script](#real-world-example-walking-calorie-expenditure-script)
    - [Flawed Version](#flawed-version)
    - [Improved Version with `set -e` and `terminate()`](#improved-version-with-set-e-and-terminate)
6.  [Summary of Key Variables](#summary-of-key-variables)
7.  [Links and References](#links-and-references)

---

## Why `$#` Matters

Shell scripts often rely on user-supplied arguments. If your script assumes a certain number of inputs but none (or too many) are provided, it can silently fail or produce erroneous results. Checking `$#` allows you to:

- Validate inputs before executing critical logic
- Provide clear usage messages
- Exit early on misuse

> [!important]
> **Note**
>
> Always validate positional parameters to avoid silent errors and improve script maintainability.

---

## Basic Usage of `$#`

Create a script called `count-args.sh`:

```
#!/usr/bin/env bash
echo "Number of arguments: $#"
```

Run it with different argument counts:

```
$ ./count-args.sh
Number of arguments: 0


$ ./count-args.sh alpha
Number of arguments: 1


$ ./count-args.sh alpha beta
Number of arguments: 2


$ ./count-args.sh ""
Number of arguments: 1
```

---

## Positional Parameters and Empty Defaults

By default, referencing an unset positional parameter expands to an empty string without an error:

```
#!/usr/bin/env bash
echo "First: '${1}'"
echo "Second: '${2}'"
```

```
$ ./show-params.sh hello
First: 'hello'
Second: ''
$ echo $?
0
```

Without validation, scripts can continue with missing data, leading to downstream failures.

---

## Guard Clauses with `$#`

Validate `$#` early in your script to enforce expected usage. Below are common patterns:

| Pattern              | Description               | Example                                                                |
| -------------------- | ------------------------- | ---------------------------------------------------------------------- |
| `[[ $# -ne N ]]`     | Exact number of arguments | `if [[ $# -ne 1 ]]; then echo "Usage: $0 <arg>" >&2; exit 1; fi`       |
| `[[ $# -lt N ]]`     | At least N arguments      | `if [[ $# -lt 1 ]]; then echo "Need at least one arg" >&2; exit 1; fi` |
| \\`\\[\\[ $# -lt MIN |                           | $# -gt MAX \\]\\]\\`                                                   |

### Exact Number of Arguments

```
#!/usr/bin/env bash


if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <arg>" >&2
  exit 1
fi


echo "Argument received: $1"
exit 0
```

### Minimum Number of Arguments

```
#!/usr/bin/env bash


if [[ $# -lt 1 ]]; then
  echo "Error: At least one argument is required." >&2
  exit 1
fi


echo "Received $# argument(s)."
```

### Range of Arguments

```
#!/usr/bin/env bash
readonly MIN=1
readonly MAX=2


if [[ $# -lt $MIN || $# -gt $MAX ]]; then
  echo "Usage: $0 <arg1> [arg2]" >&2
  echo "Provide between $MIN and $MAX arguments." >&2
  exit 1
fi


echo "Arguments are within the expected range."
```

---

## Real-World Example: Walking Calorie Expenditure Script

Calculating calories burned from step counts is a practical script. Let’s see a flawed version and then improve it with input validation.

### Flawed Version

```
#!/usr/bin/env bash
steps=${1}
cal_per_step=0.04
calories=$(echo "${steps} * ${cal_per_step}" | bc)
echo "Calories burned for ${steps} steps: ${calories}"
```

Running without arguments shows a syntax error but exits with status `0`:

```
$ ./calorie.sh
(standard_in) 1: syntax error
$ echo $?
0
```

> [!important]
> **Warning**
>
> Scripts that continue after errors can hide critical failures. Always combine guard clauses with strict error handling.

### Improved Version with `set -e` and `terminate()`

```
#!/usr/bin/env bash
set -e


CL_ARGS_ERROR=155
CAL_PER_STEP=0.04


terminate() {
  local msg="$1"
  local code="${2:-160}"
  echo "Error: $msg" >&2
  exit "$code"
}


# Guard clause: expect exactly one argument
if [[ $# -ne 1 ]]; then
  terminate "Please provide exactly one argument (number of steps)" "$CL_ARGS_ERROR"
fi


steps=$1
calories=$(echo "$steps * $CAL_PER_STEP" | bc)
echo "Calories burned for $steps steps: $calories"
exit 0
```

#### Usage

```
$ ./calorie.sh
Error: Please provide exactly one argument (number of steps)
$ echo $?
155


$ ./calorie.sh 10000
Calories burned for 10000 steps: 400.00
$ echo $?
0
```

---

## Summary of Key Variables

| Variable | Description                                        | Example                          |
| -------- | -------------------------------------------------- | -------------------------------- |
| `$?`     | Exit status of the last command                    | `echo $?`                        |
| `$#`     | Number of positional parameters passed to a script | `if [[ $# -ne 1 ]]; then ... fi` |
| `$1, $2` | Positional parameters (first, second, etc.)        | `echo "First: $1"`               |

---

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/7ff1ccc1-5a14-41fc-817c-c0ec4a100231/lesson/6014e99a-9416-4048-aab7-11ed7b4a39b9)**
>
> Watch video content
