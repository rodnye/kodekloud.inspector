# Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Expansions-Part-One/Overview)

---

## Table of Contents

- Overview
  - Table of Expansion Types
  - 1. Brace Expansion
  - 2. Parameter Expansion
  - 3. Command Substitution
  - 4. Filename Generation (Globbing)
  - Next Steps
    - Basic Variable Expansion
    - Removing Directory Components

---

## Content

Advanced Bash Scripting

Expansions Part One

# Overview

In this guide, we’ll dive into the core shell expansions available in POSIX-compliant shells (like Bash and Zsh). You’ll learn how to use:

- Brace expansions
- Parameter expansions
- Command substitutions
- Filename generation (globs)

These mechanisms let you generate sequences, extract substrings, capture command output, and match multiple filenames—streamlining your shell scripts and command-line workflows.

## Table of Expansion Types

| Expansion Type       | Description                                       | Example                                   |
| -------------------- | ------------------------------------------------- | ----------------------------------------- |
| Brace                | Generate comma- or range-separated strings        | `echo {A,B,C}` → A B C                    |
| Parameter            | Manipulate variable values (substrings, defaults) | `${var##*/}` → strips longest `*/` prefix |
| Command Substitution | Insert command output into another command        | `echo "Date: $(date +%F)"`                |
| Filename Generation  | Match files with wildcards (globs)                | `ls *.txt` → lists all `.txt` files       |

For an in-depth reference, see the [Bash manual on Shell Expansions](https://www.gnu.org/software/bash/manual/html_node/Shell-Expansions.html).

---

## 1\. Brace Expansion

Brace expansion quickly generates arbitrary strings. It’s purely a string generation mechanism—no variables or globs involved.

```
# Generates A, B, C
echo {A,B,C}


# Generates numbers 1 through 5
echo {1..5}
```

> [!important]
> **Note**
>
> Brace expansions must not be quoted for the shell to recognize them. For example, `echo "{A,B}"` will literally output `{A,B}`.

---

## 2\. Parameter Expansion

Parameter expansion lets you inspect or transform variable values without invoking external commands.

### Basic Variable Expansion

```
USER_HOME=$HOME
echo "Your home directory is: $USER_HOME"
```

### Removing Directory Components

To strip the longest matching prefix (e.g., remove everything up to the last slash), use `##*/`:

```
#!/usr/bin/env bash


some_script="/usr/bin/my_script.sh"
# Remove the longest match of '*/' from the front
echo "${some_script##*/}"
```

Output:

```
$ ./expansions.sh
my_script.sh
```

> [!important]
> **Warning**
>
> Always quote your expansions (e.g., `"${var}"`) to prevent word splitting and globbing in unexpected ways.

---

## 3\. Command Substitution

Command substitution captures the stdout of a command and embeds it in another command’s arguments:

```
current_date=$(date +%Y-%m-%d)
echo "Today is $current_date"
```

---

## 4\. Filename Generation (Globbing)

Globbing uses wildcard patterns to match filenames:

```
# List all .log files
ls *.log


# Recursive match in subdirectories (with Bash extglob)
shopt -s globstar
echo **/*.md
```

---

## Next Steps

Now that you’ve seen the major shell expansions, try combining them to simplify your scripts—generate file lists, parse log entries, or batch-rename files with a single command.

For more examples and edge cases, consult the [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Shell-Expansions.html).

```
[object Object],
```
