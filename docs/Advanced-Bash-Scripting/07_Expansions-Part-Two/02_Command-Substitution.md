# Command Substitution - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Expansions-Part-Two/Command-Substitution)

---

## Table of Contents

- Command Substitution
  - Recap: Variable Expansion
  - What Is Command Substitution?
  - Accepting a Directory Argument
  - Timing Considerations
  - Subshell Scope
  - Performance Considerations
  - Honorable Mentions
  - Links and References
  - Watch Video
    - Example: Counting Files on the Command Line
    - Using $( ... )
    - Using Backticks (Deprecated)

---

## Content

Advanced Bash Scripting

Expansions Part Two

# Command Substitution

Command substitution is a fundamental feature of Bash scripting that lets you capture the output of one command and embed it into another. This technique improves script readability and enables dynamic data handling in your shell scripts.

## Recap: Variable Expansion

Use `$` followed by a variable name to expand its value. Enclose the name in curly braces `{}` to avoid ambiguity, and wrap expansions in quotes to prevent word splitting and globbing.

```
name="John"
echo "${name}"
# Output: John
```

> [!important]
> **Tip**
>
> Always quote your variable expansions (`"${var}"`) to preserve whitespace and avoid unexpected globbing.

## What Is Command Substitution?

Command substitution runs a command in a subshell and replaces the command with its standard output. There are two syntaxes:

| Syntax      | Description                            |
| ----------- | -------------------------------------- |
| `$( ... )`  | Preferred form; allows nesting easily. |
| `` `...` `` | Deprecated; harder to read and nest.   |

### Example: Counting Files on the Command Line

```
$ ls
DEV001  DEV002  DEV003  DEV004  MKT001  MKT002  MKT003  MKT004  command-substitution.sh
$ find . -type f | wc -l
9
```

### Using `$( ... )`

Create `command-substitution.sh`:

```
#!/usr/bin/env bash
file_count=$(find . -type f | wc -l)
echo "Total files: ${file_count}"
```

Run it:

```
$ chmod +x command-substitution.sh
$ ./command-substitution.sh
Total files: 9
```

### Using Backticks (Deprecated)

```
#!/usr/bin/env bash
file_count=`find . -type f | wc -l`
echo "Total files: ${file_count}"
```

> [!important]
> **Warning**
>
> Backticks are deprecated. They complicate nesting and reduce readability. Always prefer `$( ... )` in modern Bash scripts.

## Accepting a Directory Argument

Require the user to specify a target directory:

```
#!/usr/bin/env bash
if [[ -z "${1}" ]]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

file_count=$(find "${1}" -type f | wc -l)
echo "Files in ${1}: ${file_count}"
```

```
$ ./command-substitution-v2.sh .
Files in .: 9
```

## Timing Considerations

Command substitution runs once when assigned. If you modify files later, the stored value stays unchanged until you reassign it.

```
#!/usr/bin/env bash
if [[ -z "${1}" ]]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

file_count=$(find "${1}" -type f | wc -l)
echo "Initial count: ${file_count}"

touch samplefile
echo "After touch: ${file_count}"
```

```
$ ./command-substitution-v3.sh .
Initial count: 9
After touch: 9
```

Re-running the script updates the count:

```
$ ./command-substitution-v3.sh .
Initial count: 10
After touch: 10
```

## Subshell Scope

Command substitution executes in a subshell. Variables modified inside do not affect the parent shell:

```
#!/usr/bin/env bash
if [[ -z "${1}" ]]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

dir=${1}
file_count=$(find "${dir}" -type f | wc -l)

sub_output=$(
  dir="/some/other/dir"
  echo "Dir in subshell: ${dir}"
)

echo "Dir in parent shell: ${dir}"
echo "${sub_output}"
```

```
$ ./command-substitution-v4.sh /usr/bin
Dir in parent shell: /usr/bin
Dir in subshell: /some/other/dir
```

![The image explains that a subshell is a child process spawned by a parent shell, inheriting environment variables but not propagating them back to the parent shell.](https://kodekloud.com/kk-media/image/upload/v1752868563/notes-assets/images/Advanced-Bash-Scripting-Command-Substitution/subshell-child-process-inheritance.jpg)

A subshell inherits your environment but keeps its changes local.

## Performance Considerations

Each command substitution spawns a new process. In most scripts this overhead is negligible, but in performance-critical loops, minimize unnecessary substitutions.

> [!important]
> **Performance Warning**
>
> Avoid placing heavy command substitutions inside tight loops. Consider alternatives like `readarray` or built-in string operations when processing large datasets.

## Honorable Mentions

| Use Case          | Example                |
| ----------------- | ---------------------- |
| Capture `stderr`  | `files=$(ls -j 2>&1)`  |
| Capture timestamp | `current_date=$(date)` |

```
echo "Errors: ${files}"
echo "Today's date: ${current_date}"
```

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [ShellCheck: Shell Script Analysis](https://www.shellcheck.net/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/3fde6601-133e-4f17-bea6-482a206dba5c/lesson/8437d090-c5f8-45ea-8d11-0d088276f55e)**
>
> Watch video content
