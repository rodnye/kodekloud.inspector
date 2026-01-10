# Work on the Command Line Part 2 Modify shell environment and variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Work-on-the-Command-Line-Part-2-Modify-shell-environment-and-variables)

---

## Table of Contents

- Work on the Command Line Part 2 Modify shell environment and variables
  - What Are Environment Variables?
  - Common Environment Variables
  - Setting Persistent Environment Variables
  - Automating Commands on Login
  - Links and References
  - Watch Video
    - Modifying Bash History Size
    - Edit /etc/environment

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Work on the Command Line Part 2 Modify shell environment and variables

In this lesson, you’ll learn how to view, customize, and persist environment variables on Linux. We cover session-level tweaks, system-wide settings, and automating tasks at login.

## What Are Environment Variables?

Environment variables are key–value pairs that your shell and applications use to determine behavior, file locations, and settings. You can list all of them with either:

```
printenv
env
```

Example output:

```
$ env
PATH=/home/aaron/.local/bin:/home/aaron/bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin
HISTSIZE=1000
GJS_DEBUG_TOPICS=JS ERROR;JS LOG
SESSION_MANAGER=local/unix:@/tmp/.ICE-unix/2260,unix/unix:/tmp/.ICE-unix/2260
```

### Modifying Bash History Size

By default, `HISTSIZE=1000` limits your Bash history to 1 000 commands. To increase it for the current session:

```
export HISTSIZE=2000
```

Verify:

```
history
```

Sample:

```
    1  sudo nano -w /etc/hosts
    2  ssh student@192.168.0.18
    3  ssh student@LFCS-CentOS2
    4  ls
    5  ls -laF
    6  cd .ssh
    7  ls
    8  nano -w known_hosts
    9  exit
   10  rm .ssh/known_hosts
```

## Common Environment Variables

Here are a few variables you’ll encounter frequently:

| Variable | Description                    | Example Usage    |
| -------- | ------------------------------ | ---------------- |
| HOME     | Current user’s home directory  | `echo $HOME`     |
| PWD      | Current working directory      | `echo $PWD`      |
| PATH     | Directories to search commands | `echo $PATH`     |
| HISTSIZE | Max number of history entries  | `echo $HISTSIZE` |

To display a variable’s value:

```
echo $HOME
# /home/aaron
```

Use these expansions for platform-independent scripting:

```
touch "$HOME/saved_file"
```

Each user running this command will create `saved_file` in their own home directory.

## Setting Persistent Environment Variables

User-specific variables can go in `~/.bashrc` or `~/.profile`, but for system-wide settings, use `/etc/environment`.

> [!important]
> **Note**
>
> Line-based syntax only—no shell expansions or functions.
> Example entries look like `KEY="value"`.

### Edit `/etc/environment`

1.  Open the file with root privileges:

    ```
    sudo vim /etc/environment
    ```

2.  Add your variable:

    ```
    KODEKLOUD="https://kodekloud.com"
    ```

3.  Save and exit.
4.  Log out and back in, then verify:

    ```
    echo $KODEKLOUD
    # https://kodekloud.com
    ```

> [!important]
> **Warning**
>
> Changes in `/etc/environment` affect all users and services.
> Always back up `/etc/environment` before editing.

## Automating Commands on Login

To execute commands for every user at login, place shell scripts in `/etc/profile.d/`. For instance, record the last login time:

1.  Create a script file:

    ```
    sudo vim /etc/profile.d/lastlogin.sh
    ```

2.  Add the following (no shebang required):

    ```
    echo "Your last login was at:" > "$HOME/lastlogin"
    date >> "$HOME/lastlogin"
    ```

3.  Save and exit.
4.  Log out and back in, then check:

    ```
    ls | grep lastlogin
    # lastlogin


    cat lastlogin
    # Your last login was at:
    # Thu Dec 16 10:42:37 UTC 2021
    ```

This script uses `$HOME` and demonstrates how to run tasks automatically upon user login.

---

## Links and References

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Linux Environment Variables (TLDP)](https://tldp.org/LDP/abs/html/internalvariables.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/17bd8d4d-47ab-4066-b887-b70f7c853f05)**
>
> Watch video content
