# Bash Shell - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Working-with-Shell-I/Bash-Shell)

---

## Table of Contents

- Bash Shell
  - Identifying Your Current Shell
  - Changing Your Default Shell
  - Command Auto-Completion
  - Aliases and Command History
  - Environment Variables
  - Customizing the Bash Prompt
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

Learning Linux Basics Course & Labs

Working with Shell I

# Bash Shell

In this lesson, we explore various Linux shells and their unique features, with a focus on the widely used Bourne Again Shell (Bash). Linux supports several shells, including the traditional Bourne Shell (developed in the 1970s), C Shell, Korn Shell, Z Shell, and Bash. Although these shells vary in capabilities, they all enable users to communicate effectively with the operating system.

---

## Identifying Your Current Shell

To check which shell you are currently using, execute the following command (note the uppercase letters in the variable name):

```
echo $SHELL
/bin/bash
```

Bob confirms his default shell is Bash. This shell is especially popular because it offers advanced features like Bash Completions and Brace Expansion that are not available in the original Bourne Shell.

---

## Changing Your Default Shell

To change your default shell, use the `chsh` command. You will be prompted for your password and then to provide the new shell value. Remember, you must open a new terminal session for the changes to take effect.

```
[$] chsh
Password:
Changing the login shell for michael
Enter the new value, or press ENTER for the default
Login Shell [/bin/bash]: /bin/sh
```

> [!important]
> **Note**
>
> After switching shells, consider exploring Bash-specific features to take full advantage of its functionalities.

---

## Command Auto-Completion

Bash provides command auto-completion that completes commands, filenames, and directory names when you press the Tab key. This feature can significantly improve efficiency by saving time and reducing typing errors when navigating the filesystem.

For example:

```
[~]$ ls Documents
File1.txt file2.txt some_directory
```

---

## Aliases and Command History

Bash allows you to create aliases to simplify frequent commands. For instance, you can create an alias named `dt` for the `date` command to quickly display the current date. Additionally, you can use the `history` command to view a list of previously executed commands, making it easier to reuse them.

To verify the shell in use, simply run:

```
echo $SHELL
```

Remember, the `$SHELL` variable stores the type of shell you are using. When printing an environment variable's value in Bash, the variable name should be prefixed with a dollar sign.

---

## Environment Variables

Environment variables provide information about your login session to the shell. To view all active environment variables, use the `env` command:

```
bash
[~]$ echo $SHELL
/bin/bash


[~]$ env
LANG=en_CA.UTF-8
GDM_LANG=en_CA
DISPLAY=:0
GTK_OVERLAY_SCROLLING=1
COLORTERM=truecolor
XDG_VTNR=7
USER=bob
PWD=/home/bob
HOME=/home/bob
SSH_AGENT_PID=2023
QT_ACCESSIBILITY=1
XDG_SESSION_TYPE=x11
GJS_DEBUG_OUTPUT=stderr
GTK_MODULES=gail:atk-bridge
TERM=xterm-256color
SHELL=/bin/bash
VTE_VERSION=5202
XDG_SEAT_PATH=/org/freedesktop/DisplayManager/Seat0
LANGUAGE=en_CA:en
LOGNAME=bob
PATH=/home/bob/bin:/home/bob/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

To create a new environment variable (for example, setting the value "Caleston" to `office`), use the `export` command:

```
export office=Caleston
```

This sets the variable for the current session and any child processes. Without `export`, the variable's scope remains limited to the current shell only. To ensure these variables persist after logging out or rebooting, add them to your `.profile` or `.pam_environment` file.

When executing an external command, Bash utilizes the `PATH` variable to locate the appropriate executable. To display the directories listed in your `PATH`, run:

```
bash
echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

If a command is not in one of these directories, you may encounter an error. To check if a command resides within your `PATH`, use the `which` command. For instance, attempting to locate an application like OBS Studio that hasn’t been added to your `PATH` might result in a "command not found" error.

To add a new directory (e.g., the OBS Studio path `/opt/OBS/bin`) to your `PATH`, execute:

```
export PATH=$PATH:/opt/OBS/bin
```

After making changes, use the `which` command to verify that the new directory is recognized.

---

## Customizing the Bash Prompt

The Bash prompt, typically seen as `[~]$` when you log in, can be customized to display useful system and user information. This is particularly beneficial when managing multiple systems, as the prompt can include details like username, hostname, and current working directory.

For example, a customized prompt indicating the host might look like:

```
[michael@prod-server]$
```

The appearance of the Bash prompt is controlled by the `PS1` environment variable. To view its current setting, run:

```
bash
[~]$ echo $PS1
[\W]$
```

Here, `\W` displays the current working directory. You can change the prompt by updating `PS1`. To set it to display "ubuntu-server:" followed by a colon, use:

```
bash
[~]$ PS1="ubuntu-server:"
ubuntu-server:
```

For a more informative prompt that includes the date, time, username, hostname, and working directory, set `PS1` with special backslash-escaped characters:

```
bash
[~]$ PS1="[ \d \t \u@\h:\w ] $ "
[Thu Mar 12 22:12:54 bob@caleston:~ ] $
```

Refer to the Bash documentation for a complete list of special characters that can be used in your prompt.

---

This concludes chapter one of the Quick Start Guide. Bob encourages exploring Bash's features further through hands-on exercises. Enjoy diving deeper into the Bash shell!

---

## Additional Resources

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Linux Shell Scripting Tutorial](https://www.shellscript.sh/)
- [Understanding Linux Paths](https://www.tldp.org/LDP/abs/html/pathname.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/267dec49-c3e9-4627-b7f8-9bf9aa834e53/lesson/854991ea-3c04-4a70-88e1-e777551031fd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/267dec49-c3e9-4627-b7f8-9bf9aa834e53/lesson/74d2a70a-a0d3-4e62-aa1a-2583bafbe785)**
>
> Practice lab
