# Guard clause - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Refresher/Guard-clause)

---

## Table of Contents

- Guard clause
  - 1. Simple if-else Example
  - 2. The Pitfall of Nested Conditionals
  - 3. Refactoring with Guard Clauses
  - 4. Guard Clause for Command-Line Arguments
  - 5. One-Line Guard Clauses with Logical Operators
  - Links and References
  - Watch Video
    - Common Guard Clause Patterns

---

## Content

Advanced Bash Scripting

Refresher

# Guard clause

Guard clauses are a proven pattern in Shell scripting to handle error cases upfront—exiting when preconditions aren’t met—so that the main logic remains flat, readable, and maintainable. By bailing out early on failures, you avoid deeply nested conditionals and reduce the risk of bugs.

> [!important]
> **Note**
>
> Guard clauses help you validate inputs, permissions, or environment states at the top of your script. This keeps the primary workflow free from repetitive checks.

## 1\. Simple if-else Example

A straightforward file existence check using an `if-else` block:

```
#!/bin/bash
# Check if a file exists
if [[ -e myfile.txt ]]; then
    echo "File exists"
else
    echo "File does not exist"
fi
```

## 2\. The Pitfall of Nested Conditionals

When you chain several checks, your script can become difficult to read and maintain:

```
#!/bin/bash
# Bad example: many nested checks
if [[ "${USER_NAME}" == "admin" ]]; then
    if [[ -e "${FILE_PATH}" ]]; then
        if [[ -s "${FILE_PATH}" ]]; then
            run_process
        else
            echo "File exists but is empty"
        fi
    else
        echo "File does not exist"
    fi
else
    echo "User is not admin"
fi
exit 0
```

## 3\. Refactoring with Guard Clauses

First, declare constants and helper functions:

```
#!/bin/bash
readonly FILE_PATH="/home/ubuntu/guard_clause/file.txt"
readonly USER_NAME="admin"


run_process() {
    echo "running process..."
}
```

Next, validate each precondition at the top. Exit immediately on failure:

```
#!/bin/bash
readonly FILE_PATH="/home/ubuntu/guard_clause/file.txt"
readonly USER_NAME="admin"


run_process() {
    echo "running process..."
}


# Guard clauses
if [[ "${USER_NAME}" != "admin" ]]; then
    echo "User is not admin"
    exit 1
fi


if [[ ! -e "${FILE_PATH}" ]]; then
    echo "File does not exist"
    exit 1
fi


if [[ ! -s "${FILE_PATH}" ]]; then
    echo "File exists but is empty"
    exit 1
fi


# Main logic
run_process
exit 0
```

Notice how each check uses a negative test (`!=`, `! -e`, `! -s`) to bail out early. Only when all conditions pass does the script reach `run_process`.

![The image is about "Guard Clause" and lists three benefits: improving code readability, reducing the nesting depth of conditional statements, and preventing hard-to-find bugs.](https://kodekloud.com/kk-media/image/upload/v1752868592/notes-assets/images/Advanced-Bash-Scripting-Guard-clause/guard-clause-benefits-code-readability.jpg)

## 4\. Guard Clause for Command-Line Arguments

You can apply the same pattern to verify script arguments. Here’s a basic example that ensures an argument is provided before cloning a Git repository:

```
#!/bin/bash
# Bail out if no argument is supplied
if [[ -z ${1} ]]; then
    echo "Usage: $0 <git-repo-url>"
    exit 1
fi


git_url="${1}"


clone_git() {
    git clone "${git_url}"
}


clone_git
exit 0
```

> [!important]
> **Warning**
>
> Always validate user input to prevent unwanted behavior or security issues. Exiting early helps you avoid partial or corrupted operations.

## 5\. One-Line Guard Clauses with Logical Operators

Bash’s `&&` and `||` allow you to write compact guard clauses:

- **OR (`||`)**: Execute the right side if the left side fails

  ```
  [[ -f "file.txt" ]] || echo "file does not exist"
  ```

- **AND (`&&`)**: Execute the right side if the left side succeeds

  ```
  [[ -z ${1} ]] && echo "argument empty"
  ```

To include an `exit` in a one-liner, group commands with `{ …; }`:

```
[[ -f "file.txt" ]] || { echo "file does not exist"; exit 1; }
```

### Common Guard Clause Patterns

| Operator | Behavior                                  | Example                                                   |
| -------- | ----------------------------------------- | --------------------------------------------------------- |
| \\`      |                                           | \\`                                                       |
| `&&`     | Run right side only if left side succeeds | `[[ ${USER} == root ]] && echo "Running as root"`         |
| `!`      | Negates the test, useful for early exits  | `[[ ! -r file ]] && { echo "Cannot read file"; exit 1; }` |

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [ShellCheck Linter](https://www.shellcheck.net/)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/15034de9-a52e-40bc-8099-230a7f14c177)**
>
> Watch video content
