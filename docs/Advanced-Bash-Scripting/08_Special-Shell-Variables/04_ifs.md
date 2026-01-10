# ifs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Special-Shell-Variables/ifs)

---

## Table of Contents

- ifs
  - Table of Default IFS Separators
  - Default IFS in Action
  - Customizing IFS with ANSI-C Quoting
  - Changing the Field Separator
  - IFS and Literal Strings
  - Interactive IFS Changes
  - Restoring IFS and Handling Empty Strings
  - References
  - Watch Video

---

## Content

Advanced Bash Scripting

Special Shell Variables

# ifs

The Internal Field Separator (`IFS`) is a special shell variable that defines how Bash—and other POSIX-compatible shells—split strings into fields. While environment variables provide static, system-wide settings, shell variables like `IFS` are dynamic and scoped to your shell session. Properly managing `IFS` enhances portability by ensuring your scripts behave consistently across different systems.

![The image features a magnifying glass with the text "IFS Environment variables" and a thumbs-up icon, set against a dark background.](https://kodekloud.com/kk-media/image/upload/v1752868625/notes-assets/images/Advanced-Bash-Scripting-ifs/ifs-environment-variables-magnifying-glass.jpg)

By default, `IFS` includes space, tab, and newline. This default behavior impacts many common tasks, such as iterating over lists of filenames or parsing command output.

## Table of Default IFS Separators

| Separator | Escape Sequence | Description        |
| --------- | --------------- | ------------------ |
| Space     | `<space>`       | Splits on spaces   |
| Tab       | `\\t`           | Splits on tabs     |
| Newline   | `\\n`           | Splits on newlines |

## Default IFS in Action

Consider a simple Bash script that iterates over a space-separated list:

```
#!/usr/bin/env bash
elements="alpha beta gamma"
for element in ${elements}; do
  echo "${element} is now separated from the elements list"
done
```

Running this script yields:

```
alpha is now separated from the elements list
beta is now separated from the elements list
gamma is now separated from the elements list
```

Because `elements` splits on spaces by default, each word becomes its own iteration.

## Customizing IFS with ANSI-C Quoting

To explicitly redefine `IFS` to include space, tab, and newline, use ANSI-C quoting:

```
IFS=$' \t\n'
```

> [!important]
> **Note**
>
> The `$'…'` syntax tells Bash to process backslash escapes within single quotes, ensuring you include the exact characters you need.

![The image is a slide titled "ANSI-C Quoting" and explains that it starts with a dollar sign.](https://kodekloud.com/kk-media/image/upload/v1752868626/notes-assets/images/Advanced-Bash-Scripting-ifs/ansi-c-quoting-dollar-sign.jpg)

## Changing the Field Separator

If your data uses a different delimiter—such as a colon (`:`)—override `IFS` before expanding variables. Without overriding, the string remains intact:

```
#!/usr/bin/env bash
elements="one:two:three"
for element in ${elements}; do
  echo "${element} is now separated from the elements list"
done
```

Output:

```
one:two:three is now separated from the elements list
```

Now set `IFS` to a colon:

```
#!/usr/bin/env bash
IFS=":"
elements="one:two:three"
for element in ${elements}; do
  echo "${element} is now separated from the elements list"
done
```

Output:

```
one is now separated from the elements list
two is now separated from the elements list
three is now separated from the elements list
```

> [!important]
> **Warning**
>
> Changing `IFS` globally can affect subsequent commands and scripts. Always restore it to its default value after making temporary adjustments.

## IFS and Literal Strings

`IFS` only applies when expanding variables. Looping over a quoted literal string bypasses field splitting:

```
#!/usr/bin/env bash
IFS=":"
for element in "one:two:three"; do
  echo "${element} is a value"
done
```

Output:

```
one:two:three is a value
```

Because there’s no variable expansion, `IFS` has no effect.

## Interactive IFS Changes

You can also reassign `IFS` directly in your interactive shell session:

```
$ IFS=","
$ val="apple,banana,cherry"
$ set -- ${val}
$ echo $1
apple
$ echo $2
banana
$ echo $3
cherry
```

Here, `set -- ${val}` replaces the shell’s positional parameters with the split values of `val`.

## Restoring IFS and Handling Empty Strings

![The image contains two questions about IFS: "How to restore IFS to default?" and "What happens if IFS is assigned to an empty string or a null value?" It also features speech bubble icons with question marks.](https://kodekloud.com/kk-media/image/upload/v1752868627/notes-assets/images/Advanced-Bash-Scripting-ifs/ifs-questions-speech-bubbles.jpg)

1.  **Restore IFS to default**

    ```
    IFS=$' \t\n'
    ```

    This command works in Bash, Zsh, and KornShell. Older shells might require specialized syntax.

2.  **Set IFS to an empty string**

    ```
    IFS=''
    ```

    When `IFS` is empty, no field splitting occurs—every expansion remains as a single, unsplit string.

## References

- [Bash Manual: Special Parameters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html#Special-Parameters)
- [POSIX Shell Syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/7ff1ccc1-5a14-41fc-817c-c0ec4a100231/lesson/f295e8ce-bbc4-4717-b5e4-42e67f188b01)**
>
> Watch video content
