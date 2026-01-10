# Use scripting to automate system maintenance tasks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Use-scripting-to-automate-system-maintenance-tasks)

---

## Table of Contents

- Use scripting to automate system maintenance tasks
  - Table of Contents
  - Understanding the Bash Shell
  - Creating Your First Script
  - Automating Backups
  - Using Exit Status in Conditions
  - Real-World Example: Anacron
  - Quick Reference: Shell Constructs
  - Further Resources
  - Watch Video
    - 1. Create the Script File
    - 2. Add Script Contents
    - 3. Make the Script Executable
    - 4. Run and Verify
    - Archiving a Directory
    - Keeping Two Generations of Backups

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Use scripting to automate system maintenance tasks

Automating routine system maintenance on CentOS (or similar Linux distributions) saves time and reduces human error. In this guide, you’ll learn how to:

- Write and run simple Bash scripts
- Archive directories reliably
- Manage multiple backup generations
- Use exit statuses in conditions
- Examine a real-world example (Anacron)

---

## Table of Contents

1.  [Understanding the Bash Shell](#understanding-the-bash-shell)
2.  [Creating Your First Script](#creating-your-first-script)
3.  [Automating Backups](#automating-backups)
    - [Archiving a Directory](#archiving-a-directory)
    - [Keeping Two Generations of Backups](#keeping-two-generations-of-backups)
4.  [Using Exit Status in Conditions](#using-exit-status-in-conditions)
5.  [Real-World Example: Anacron](#real-world-example-anacron)
6.  [Quick Reference: Shell Constructs](#quick-reference-shell-constructs)
7.  [Further Resources](#further-resources)

---

## Understanding the Bash Shell

When you log in, you land at a shell prompt managed by **bash**, the Bourne Again SHell. It interprets commands you type or reads and executes commands from a file (a _script_) in sequence.

```
$ date
Mon Dec  6 16:28:09 CST 2021
```

Bash supports redirection, pipelines, variables, loops, functions, and more—the same features you use interactively are available in scripts.

---

## Creating Your First Script

Follow these steps to build and run a basic maintenance script.

### 1\. Create the Script File

```
$ touch script.sh
$ vim script.sh
```

### 2\. Add Script Contents

```
#!/bin/bash
# Log the date and time of execution
date >> /tmp/script.log
# Capture the current kernel version
cat /proc/version >> /tmp/script.log
```

> [!important]
> **Note**
>
> The first line (`#!/bin/bash`) is the **shebang**, telling the system which interpreter to use.

- Lines beginning with `#` are comments.
- `>>` appends output rather than overwriting.

### 3\. Make the Script Executable

```
$ chmod u+x script.sh
# or allow everyone:
$ chmod +x script.sh
```

### 4\. Run and Verify

```
$ ./script.sh
$ cat /tmp/script.log
Mon Dec  6 17:06:16 CST 2021
Linux version 4.18.0-348.2.1.el8_5.x86_64 ...
```

---

## Automating Backups

Backup scripts are ideal for automating directory archiving. Below are two approaches: a simple archive and one that retains the previous generation.

### Archiving a Directory

Create `archive-dnf.sh`:

```
#!/bin/bash
tar acf /tmp/archive.tar.gz /etc/dnf
```

```
$ chmod +x archive-dnf.sh
$ ./archive-dnf.sh
$ ls /tmp
archive.tar.gz
```

You can inspect the archive with:

```
tar tf /tmp/archive.tar.gz
```

---

### Keeping Two Generations of Backups

To avoid overwriting a good backup, rename the old archive before creating a new one.

1.  Save this as `archive-dnf-2.sh`:

    ```
    #!/bin/bash
    if test -f /tmp/archive.tar.gz; then
        mv /tmp/archive.tar.gz /tmp/archive.tar.gz.OLD
        tar acf /tmp/archive.tar.gz /etc/dnf
    else
        tar acf /tmp/archive.tar.gz /etc/dnf
    fi
    ```

2.  Make it executable and run:

    ```
    $ chmod +x archive-dnf-2.sh
    $ ./archive-dnf-2.sh
    $ ls /tmp
    archive.tar.gz
    archive.tar.gz.OLD
    ```

> [!important]
> **Warning**
>
> Moving or deleting files in `/tmp` can remove critical data if misused. Always verify paths and filenames before executing backup scripts.

---

## Using Exit Status in Conditions

Every command returns an **exit status**: `0` (success) or nonzero (failure). You can leverage this in `if` statements:

```
#!/bin/bash
if grep -q '5' /etc/default/grub; then
    echo 'Grub has timeout of 5 seconds.'
else
    echo 'Grub DOES NOT have a timeout of 5 seconds.'
fi
```

- `grep -q` runs quietly (`-q`) and sets exit status accordingly.
- Save as `check-grub-timeout.sh`, make it executable, then:

```
$ chmod +x check-grub-timeout.sh
$ ./check-grub-timeout.sh
Grub has timeout of 5 seconds.
```

---

## Real-World Example: Anacron

Inspect `/etc/cron.hourly/0anacron` to see conditionals, loops, and file checks in action:

```
#!/bin/sh
# Check whether @anacron ran today
if test -r /var/spool/anacron/cron.daily; then
    day=$(cat /var/spool/anacron/cron.daily)
fi
if [ "$(date +%Y%m%d)" = "$day" ]; then
    exit 0
fi


# Skip jobs when on battery power
online=1
for psupply in AC AD0*; do
    sysfile="/sys/class/power_supply/$psupply/online"
    if [ -f "$sysfile" ]; then
        if [ "$(cat "$sysfile" 2>/dev/null)" = 1 ]; then
            online=1
            break
        else
            online=0
        fi
    fi
done
if [ "$online" = 0 ]; then
    exit 0
fi
# …rest of the script…
```

---

## Quick Reference: Shell Constructs

| Construct   | Use Case                   | Example                                    |
| ----------- | -------------------------- | ------------------------------------------ |
| shebang     | Select interpreter         | `#!/bin/bash`                              |
| if … then   | Conditional execution      | `if grep -q 'foo' file; then echo yes; fi` |
| for … do    | Iterate over lists         | `for file in *.log; do gzip "$file"; done` |
| `>>`        | Append redirection         | `date >> /tmp/script.log`                  |
| `test -f`   | Check file existence       | `if test -f /path/to/file; then …`         |
| exit status | Check command success/fail | \\`command && echo success                 |

---

## Further Resources

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Linux `tar` Documentation](https://www.gnu.org/software/tar/manual/)
- [Anacron on CentOS Wiki](https://wiki.centos.org/HowTos/Anacron)

Make sure to explore bash built-ins (`help`) and system scripts under `/etc/cron.*` for more real-world patterns and advanced techniques.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/1dc5ee08-21f3-4716-8495-459735938e6b)**
>
> Watch video content
