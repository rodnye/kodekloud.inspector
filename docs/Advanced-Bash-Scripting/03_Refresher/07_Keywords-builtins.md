# Keywords builtins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Refresher/Keywords-builtins)

---

## Table of Contents

- Keywords builtins
  - Shell Built-ins vs Keywords
  - Single vs Double Square Brackets
  - [ vs test
  - Built-in vs Keyword Evaluations
  - Advanced Double Bracket Features
  - Advantages and Disadvantages
  - Summary: Built-ins vs Keywords
  - Links and References
  - Watch Video
  - Practice Lab
    - builtin-sample.sh
    - keyword-sample.sh
    - Single Square Brackets ([ ])
    - Double Square Brackets ([[]])

---

## Content

Advanced Bash Scripting

Refresher

# Keywords builtins

In this lesson, we explore the fundamental distinctions between Bash built-in commands and shell keywords. Built-ins execute inside the shell without spawning extra processes, whereas keywords are parsed tokens that implement control structures and logic flow.

## Shell Built-ins vs Keywords

| Aspect          | Built-in Commands         | Keywords                    |
| --------------- | ------------------------- | --------------------------- |
| Execution       | Runs inside the shell     | Parsed by the shell         |
| Process Forking | No new process            | No new process              |
| Documentation   | `help` or `man` available | No separate manual page     |
| Role            | Utility operations        | Control structures & tokens |

![The image compares "Shell-Builtin" and "Keywords," highlighting that shell-builtins are executables with flags and a man page, while keywords are special words for controlling execution structure parsed by the shell.](https://kodekloud.com/kk-media/image/upload/v1752868593/notes-assets/images/Advanced-Bash-Scripting-Keywords-builtins/shell-builtins-vs-keywords-comparison.jpg)

Shell built-ins (like `echo`, `cd`, or `[ ]`) are implemented directly within Bash, complete with flags and documentation via `help` or `man`. Keywords (like `if`, `for`, or `[[ ]]`) are special words the shell interpreter parses to direct execution order and logic.

> [!important]
> **Note**
>
> Built-in commands minimize overhead by avoiding additional process creation. Keywords define the script’s flow without calling external binaries.

## Single vs Double Square Brackets

Single brackets (`[ ]`) are a built-in alias for the `test` command. Double brackets (`[[ ]]`) are keywords with enhanced features and direct parsing by Bash.

### builtin-sample.sh

```
#!/bin/bash
if [ 2 -eq 2 ]; then
    echo "two equals two"
fi
```

```
$ ./builtin-sample.sh
two equals two
```

### keyword-sample.sh

```
#!/bin/bash
if [[ 2 -eq 2 ]]; then
    echo "two equals two"
fi
```

```
$ ./keyword-sample.sh
two equals two
```

## `[` vs `test`

Under the hood, `[ ]` is just the `test` built-in. You can invoke either name interchangeably:

```
$ test 2 -eq 2 && echo "two equals two"
two equals two
```

View its documentation with:

```
$ man test
```

Since `[[ ]]` has no external binary, Bash handles it entirely as a keyword.

## Built-in vs Keyword Evaluations

![The image compares "Built-in" and "Keyword" condition evaluations using brackets and double brackets, respectively. It visually distinguishes between the two types of condition evaluations.](https://kodekloud.com/kk-media/image/upload/v1752868595/notes-assets/images/Advanced-Bash-Scripting-Keywords-builtins/built-in-vs-keyword-evaluations.jpg)

Single brackets interpret `<` as a redirection operator:

```
$ [ 1 < 2 ] && echo "1 is less than 2"
-bash: 2: No such file or directory
```

Double brackets support `<` as a comparison operator:

```
$ [[ 5 < 7 ]] && echo "5 is less than 7"
5 is less than 7
```

## Advanced Double Bracket Features

Double brackets unlock logical grouping, glob patterns, and regular expressions:

```
$ [[ 3 -eq 3 && (2 -eq 2 && 1 -eq 1) ]] && echo "Parentheses can be used"
Parentheses can be used


$ name="Bob Doe"
$ [[ $name = *o* ]] && echo "Patterns can be used"
Patterns can be used


$ name="Bob Doe"
$ [[ $name =~ B.*Doe ]] && echo "Regular expressions can be used"
Regular expressions can be used
```

> [!important]
> **Warning**
>
> The `[[ ]]` syntax is not POSIX compliant and may not be available in all shells. Use it only when Bash-specific features are acceptable.

## Advantages and Disadvantages

### Single Square Brackets (`[ ]`)

![The image compares keywords and built-in features, highlighting that keywords are more portable and widely supported, while built-in features have a narrower selection of conditionals.](https://kodekloud.com/kk-media/image/upload/v1752868596/notes-assets/images/Advanced-Bash-Scripting-Keywords-builtins/keywords-vs-built-in-features-comparison.jpg)

Advantages:

- Portable across POSIX-compliant shells
- Standard conditional syntax

Disadvantages:

- Limited to basic comparisons
- No pattern matching or grouping

### Double Square Brackets (`[[ ]]`)

![The image compares the advantages and disadvantages of using double square brackets "[[ ]]" in programming, highlighting more support and wider conditional evaluation versus lack of backward compatibility and non-compliance with POSIX.](https://kodekloud.com/kk-media/image/upload/v1752868596/notes-assets/images/Advanced-Bash-Scripting-Keywords-builtins/double-square-brackets-comparison.jpg)

Advantages:

- Extended conditionals (regex, globs, grouping)
- Safer string comparisons

Disadvantages:

- Not POSIX compliant
- Bash-specific feature

## Summary: Built-ins vs Keywords

![The image is a slide titled "Guard Clause" with three check-marked statements about shell commands and keywords.](https://kodekloud.com/kk-media/image/upload/v1752868597/notes-assets/images/Advanced-Bash-Scripting-Keywords-builtins/guard-clause-shell-commands-slide.jpg)

- Shell built-ins run inside Bash without forking.
- Keywords are parsed tokens controlling flow or behavior.
- Neither built-ins nor keywords spawn external processes.

Certain keywords (e.g., `time`) act like directives rather than forming explicit control structures. Armed with these distinctions, you can choose the most efficient and appropriate syntax for your Bash scripts.

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [POSIX Shell Syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html)
- [Bash Conditional Expression Documentation](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/fc38a23f-6af6-4415-b451-c1073291096d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/397a2175-a186-4a6d-916e-d688c8def203/lesson/369ebee0-f833-42f8-ac55-41c73bb16a5b)**
>
> Practice lab
