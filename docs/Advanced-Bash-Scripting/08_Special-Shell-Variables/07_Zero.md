# Zero - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Special-Shell-Variables/Zero)

---

## Table of Contents

- Zero
  - Table of Contents
  - 1. Getting the Invoked Script Name
  - 2. Extracting Only the Basename
  - 3. Dynamic Usage Messages with SCRIPT_NAME
  - 4. Graceful Exits via a terminate Helper
  - 5. Resolving the Script’s Directory (WORK_DIR)
  - 6. Quick Reference Table
  - 7. Links and References
  - Watch Video
  - Practice Lab

---

## Content

Advanced Bash Scripting

Special Shell Variables

# Zero

In Bash scripting, the special parameter `$0` holds the name (and path) used to invoke the script. Understanding and manipulating `$0` lets you:

1.  Retrieve the script’s invoked name or full path
2.  Derive the absolute directory where the script resides

Below, we explore each technique with practical examples and patterns for robust, user-friendly scripts.

---

## Table of Contents

1.  [Getting the Invoked Script Name](#1-getting-the-invoked-script-name)
2.  [Extracting Only the Basename](#2-extracting-only-the-basename)
3.  [Dynamic Usage Messages with `SCRIPT_NAME`](#3-dynamic-usage-messages-with-script_name)
4.  [Graceful Exits via a `terminate` Helper](#4-graceful-exits-via-a-terminate-helper)
5.  [Resolving the Script’s Directory (`WORK_DIR`)](#5-resolving-the-scripts-directory-work_dir)
6.  [Quick Reference Table](#6-quick-reference-table)
7.  [Links and References](#7-links-and-references)

---

## 1\. Getting the Invoked Script Name

By default, `$0` prints exactly how the script was called:

```
#!/usr/bin/env bash
echo "$0"
```

Save this as `show-zero.sh` and run:

```
$ ./show-zero.sh
./show-zero.sh


$ # If on your PATH:
$ show-zero.sh
/usr/local/bin/show-zero.sh
```

---

## 2\. Extracting Only the Basename

To obtain just the filename (dropping any leading directories), use shell parameter expansion:

```
#!/usr/bin/env bash
readonly SCRIPT_NAME=${0##*/}
echo "${SCRIPT_NAME}"
```

Running:

```
$ ./show-zero.sh
show-zero.sh
```

Here `${0##*/}` strips everything up to the last slash.

---

## 3\. Dynamic Usage Messages with `SCRIPT_NAME`

Embedding the script’s basename in help text ensures accuracy, even if the file is renamed:

```
#!/usr/bin/env bash
readonly SCRIPT_NAME=${0##*/}


usage() {
  cat <<USAGE
Usage: ${SCRIPT_NAME} <name>


Greet a user by name.


Arguments:
  name       The name to greet.


Options:
  -h, --help Show this help message and exit.
USAGE
}


# Show usage
usage
```

Example output:

```
$ ./show-zero.sh
Usage: show-zero.sh <name>


Greet a user by name.


Arguments:
  name       The name to greet.


Options:
  -h, --help Show this help message and exit.
```

---

## 4\. Graceful Exits via a `terminate` Helper

Centralize error reporting and custom exit codes:

```
#!/usr/bin/env bash
readonly SCRIPT_NAME=${0##*/}
readonly ERR_MISSING_ARG=155


usage() {
  cat <<USAGE
Usage: ${SCRIPT_NAME} <name>


Greet a user by name.


Options:
  -h, --help Show this help message and exit.
USAGE
}


terminate() {
  echo "Error: ${1}" >&2
  exit "${2:-1}"
}


# Argument count check
if [[ $# -ne 1 ]]; then
  usage
  terminate "Missing argument" "$ERR_MISSING_ARG"
fi


# Help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  usage
  exit 0
fi


name="$1"
echo "Hello, ${name}! Welcome!"
exit 0
```

Example runs:

```
$ ./greet.sh
Usage: greet.sh <name>
Error: Missing argument
$ echo $?
155


$ ./greet.sh --help
Usage: greet.sh <name>
$ echo $?
0
```

> [!important]
> **Note**
>
> For more advanced flag parsing, consider using `getopts` to handle short and long options.

---

## 5\. Resolving the Script’s Directory (`WORK_DIR`)

Hard-coding relative paths can break when you run scripts from different locations. Instead, compute the script’s own directory:

```
#!/usr/bin/env bash
readonly WORK_DIR=$(dirname "$(readlink -f "$0")")
```

- `readlink -f "$0"` returns the script’s canonical absolute path (following symlinks).
- `dirname` extracts the parent directory.

Now you can reliably reference files relative to the script’s location:

```
cd "${WORK_DIR}/../assets"
cd "${WORK_DIR}/subdir"
# ...other tasks
```

> [!important]
> **Warning**
>
> On macOS, `readlink -f` may not be available. Use `brew install coreutils` or alternative methods (`realpath`).

---

## 6\. Quick Reference Table

| Feature                        | Purpose                                        | Example                                      |
| ------------------------------ | ---------------------------------------------- | -------------------------------------------- |
| `$0`                           | How the script was invoked                     | `echo "$0"`                                  |
| `${0##*/}`                     | Basename of the script                         | `SCRIPT_NAME=${0##*/}`                       |
| Dynamic heredoc usage messages | Embed `SCRIPT_NAME` in help text               | `cat <<USAGE…`                               |
| `terminate()`                  | Standardize error output and exit codes        | `terminate "message" 42`                     |
| `readlink -f` + `dirname`      | Compute absolute script directory (`WORK_DIR`) | `WORK_DIR=$(dirname "$(readlink -f "$0")")"` |

---

## 7\. Links and References

- [Bash Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
- [readlink (Linux) Manual](https://man7.org/linux/man-pages/man1/readlink.1.html)
- [getopts Bash Built-in](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html)

These patterns make your Bash scripts more predictable, portable, and user-friendly—leveraging `$0` effectively is a key skill for any shell scripter.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/7ff1ccc1-5a14-41fc-817c-c0ec4a100231/lesson/8b30db1e-0226-435a-9ceb-b074e91c10a3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/7ff1ccc1-5a14-41fc-817c-c0ec4a100231/lesson/7d0d01f5-9b2a-432a-b9ea-0479e538d920)**
>
> Practice lab
