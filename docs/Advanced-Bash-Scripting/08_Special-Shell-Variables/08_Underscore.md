# Underscore - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Special-Shell-Variables/Underscore)

---

## Table of Contents

- Underscore
  - Why Use $\_?
  - Interactive Shell Examples
  - Using $\_ in Scripts
  - Common Use Cases
  - Advanced Examples
  - Further Reading
  - Watch Video
    - Listing and Copying a File
    - Chaining Commands

---

## Content

Advanced Bash Scripting

Special Shell Variables

# Underscore

The special shell variable `$_` holds the last argument of the previous command. It’s especially handy in interactive Bash sessions and scripts when you want to avoid retyping long or dynamic arguments.

## Why Use `$_`?

- Boosts productivity by reducing repetitive typing
- Seamlessly reuses file names, directory paths, or any last argument
- Works in interactive shells **and** within scripts

> [!important]
> **Note**
>
> `$_` refers strictly to the last argument of the **previous** command. If that command had no arguments, `$_` will be empty.

---

## Interactive Shell Examples

### Listing and Copying a File

```
$ ls -l file.conf
total 16
-rw-r--r-- 1 root root 896 Jun 18 2020 file.conf
$ cp $_ /tmp
```

Here, `$_` expands to `file.conf`, so you don’t have to type it twice.

### Chaining Commands

```
$ ls -l file.conf; echo "Done"
total 16
-rw-r--r-- 1 root root 896 Jan 18 2020 file.conf
Done
$ echo $_
Done
```

Since the last command was `echo "Done"`, `$_` now contains `Done`.

---

## Using `$_` in Scripts

```
#!/usr/bin/env bash


# Create a new directory
mkdir project_build


# Change into the new directory using $_
cd $_


# Show current path
pwd
```

Here, `$_` saves you from typing `project_build` again.

---

## Common Use Cases

| Scenario            | Last Command                      | `$_` Value              |
| ------------------- | --------------------------------- | ----------------------- |
| Copying a file      | `cp large_archive.tar.gz /backup` | `/backup`               |
| Editing a file      | `vim /etc/nginx/nginx.conf`       | `/etc/nginx/nginx.conf` |
| Moving a directory  | `mv logs_old logs_archive`        | `logs_archive`          |
| Pipelining commands | `grep ERROR logfile.log`          | `logfile.log`           |

---

## Advanced Examples

```
# Remove a file, then verify its removal
rm temp_data.csv
echo "Removed" $_


# Using in a pipeline
find . -name '*.log' | xargs gzip
echo "Compressed" $_
```

---

## Further Reading

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **Warning**
>
> If you chain multiple commands with `;` or `&&`, `$_` always reflects the **very last argument** of the last executed command.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/7ff1ccc1-5a14-41fc-817c-c0ec4a100231/lesson/ff4a84c5-46bc-4f66-9d70-4aa06539d2f7)**
>
> Watch video content
