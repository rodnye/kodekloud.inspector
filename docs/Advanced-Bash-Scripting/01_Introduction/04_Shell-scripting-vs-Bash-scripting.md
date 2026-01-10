# Shell scripting vs Bash scripting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Introduction/Shell-scripting-vs-Bash-scripting)

---

## Table of Contents

- Shell scripting vs Bash scripting
  - When to Use “Shell” vs. “Bash” Scripting
  - Illustrative Differences Between Bash and Other Shells
  - Conclusion
  - Links and References
  - Watch Video
    - 1. zsh Autocorrects Typos
    - 2. echo -n Behavior

---

## Content

Advanced Bash Scripting

Introduction

# Shell scripting vs Bash scripting

Shell scripting is the practice of writing executable text files that interpret and execute commands in a Unix-like shell. While **Bash** (Bourne Again SHell) is the most common shell today, there are many others:

| Shell         | Year Introduced | Key Feature                       |
| ------------- | --------------- | --------------------------------- |
| Bourne `sh`   | 1979            | Original shell scripting standard |
| Bash          | 1989            | Rich scripting constructs         |
| Z shell `zsh` | 1990            | Typo correction & plugin system   |
| Korn `ksh`    | 1983            | Advanced variables & functions    |
| Dash          | 1997            | Focus on speed & minimalism       |

Use **shell scripting** when referring to any shell. If you depend on Bash-specific features (arrays, `[[ … ]]`, process substitution), say **shell scripting with Bash**.

> [!important]
> **Note**
>
> Always include a shebang (`#!`) at the top of your scripts to declare which shell to use:
>
> ```
> #!/usr/bin/env bash
> ```

## When to Use “Shell” vs. “Bash” Scripting

- **Shell scripting** – generic term for writing scripts in any shell
- **Shell scripting with Bash** – when your code relies on Bash-only features
- **Shell scripting with zsh**, **ksh**, etc. – when targeting those environments

## Illustrative Differences Between Bash and Other Shells

Below are two examples that show how Bash and other shells (like `sh` and `zsh`) can behave differently.

### 1\. zsh Autocorrects Typos

Zsh offers a user‐friendly autocorrect feature:

```
$ LS -l FILE.TXT
file.txt
```

Here, `zsh` automatically corrects `LS` → `ls` and `FILE.TXT` → `file.txt`. Bash does not do this by default.

### 2\. `echo -n` Behavior

The `-n` flag suppresses the trailing newline in Bash, but not in all `sh` implementations:

```
# In Bash
$ echo -n "Hello"; echo "END"
HelloEND


# In sh
$ sh -c 'echo -n "Hello"; echo "END"'
-n Hello
END
```

- Under **sh**, `-n` is treated as text and printed.
- Under **bash**, `-n` removes the newline as expected.

> [!important]
> **Warning**
>
> For portable scripts, avoid relying on `echo -n`. Use `printf` instead:
>
> ```
> printf "Hello"; echo "END"
> ```

## Conclusion

- Refer to any interpreter as **shell scripting** when you don’t need to specify.
- Use **shell scripting with Bash** (or another shell) if you rely on that shell’s extensions.
- For maximum portability and advanced features, Bash is the de facto standard.

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Zsh Manual](https://zsh.sourceforge.io/Doc/)
- [POSIX Shell Specification](https://pubs.opengroup.org/onlinepubs/9699919799/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/62d639a9-3779-4ae6-b8b2-1cc49f117f64/lesson/a1527056-e187-40bd-b475-de88e5d0973c)**
>
> Watch video content
