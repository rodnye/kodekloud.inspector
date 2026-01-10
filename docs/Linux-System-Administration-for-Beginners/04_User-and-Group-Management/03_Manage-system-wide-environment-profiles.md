# Manage system wide environment profiles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/User-and-Group-Management/Manage-system-wide-environment-profiles)

---

## Table of Contents

- Manage system wide environment profiles
  - Understanding Environment Variables
  - Setting System-Wide Environment Variables
  - Running Commands at Login
  - Further Reading & References
  - Watch Video

---

## Content

Linux System Administration for Beginners

User and Group Management

# Manage system wide environment profiles

In this guide, you’ll learn how to configure and maintain environment variables and login scripts that apply to all users on a Linux system. We’ll cover:

- Understanding and viewing environment variables
- Persisting system-wide variables via `/etc/environment`
- Executing commands at login with `/etc/profile.d/`

## Understanding Environment Variables

Environment variables are key–value pairs that shells and applications use to adjust behavior. You can list the current environment with either `env` or `printenv`.

| Command         | Description                                                  | Example Output          |
| --------------- | ------------------------------------------------------------ | ----------------------- |
| `env`           | Displays all environment variables                           | `PATH=/usr/local/bin:…` |
| `printenv HOME` | Shows the value of a specific variable (`HOME` in this case) | `/home/aaron`           |

```
# List all environment variables
$ env
PATH=/home/aaron/.local/bin:/home/aaron/bin:/usr/local/bin:/usr/bin
HISTSIZE=1000
GJS_DEBUG_TOPICS=JS ERROR;JS LOG
SESSION_MANAGER=local/unix:@tmp/.ICE-unix/2260


# Show HOME directory
$ printenv HOME
/home/aaron
```

To modify a variable for your current session, simply reassign it:

```
# Increase Bash history size for this session
$ HISTSIZE=2000
$ echo $HISTSIZE
2000
```

You can reference variables in scripts. For example, create a file in each user’s home directory:

```
$ touch "$HOME/saved_file"
```

This ensures the file lands in the right directory regardless of username.

## Setting System-Wide Environment Variables

While individual users often tweak `~/.bashrc`, you can enforce variables globally by editing `/etc/environment`:

```
$ sudo vim /etc/environment
```

Append lines in the format `KEY="value"`:

```
KodeKloud="https://www.kodekloud.com"
```

Save and log out, then back in to apply changes:

```
$ echo $KodeKloud
https://www.kodekloud.com
```

> [!important]
> **Note**
>
> The file `/etc/environment` only supports simple `KEY="value"` assignments. You cannot use shell expansions or commands here.

## Running Commands at Login

To execute scripts for every user at login, place them in `/etc/profile.d/`. For example, to record the last login timestamp:

```
$ sudo vim /etc/profile.d/lastlogin.sh
```

Add:

```
# Log the last login time into a file in the user’s home
echo "Your last login was at:" > "$HOME/lastlogin"
date                       >> "$HOME/lastlogin"
```

Scripts in `/etc/profile.d/` are sourced by login shells automatically—you do **not** need a shebang (`#!/bin/bash`).

```
# After logging out and back in
$ cat $HOME/lastlogin
Your last login was at: Thursday DEC 16 11:19:27 CDT 2021
```

> [!important]
> **Warning**
>
> Avoid syntax errors in `/etc/profile.d/` scripts. A malformed script can prevent users from logging in properly.

## Further Reading & References

- [Bash Manual: Environment](https://www.gnu.org/software/bash/manual/html_node/Environment.html)
- [Linux `env` Command](https://linux.die.net/man/1/env)
- [Filesystem Hierarchy Standard: /etc](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s14.html)

---

In the next article, we’ll explore advanced shell initialization techniques, including per-shell configuration and custom prompts.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/05b7aa04-573d-4d14-8b9a-734e5c15ecef)**
>
> Watch video content
