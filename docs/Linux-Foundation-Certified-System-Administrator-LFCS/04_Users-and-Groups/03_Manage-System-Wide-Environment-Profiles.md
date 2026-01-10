# Manage System Wide Environment Profiles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Users-and-Groups/Manage-System-Wide-Environment-Profiles)

---

## Table of Contents

- Manage System Wide Environment Profiles
  - Understanding Environment Variables
  - Using Environment Variables on the Command Line
  - Dynamically Incorporating Environment Variables in Scripts
  - Configuring Environment Variables
  - Running Commands at User Login
  - Conclusion
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Users and Groups

# Manage System Wide Environment Profiles

In this article, you'll learn how to manage system-wide environment profiles on Linux. We will explore the role of environment variables, how to use them on the command line and in scripts, and how to apply changes both locally and system-wide.

## Understanding Environment Variables

An environment variable is a dynamic value stored in your shell that can affect how running processes behave. For example, the environment variable `HISTSIZE` (as seen below) controls the maximum number of commands Bash will remember in its history.

To display your current user's environment variables, run:

```
$ printenv  # equivalent to: $ env
PATH=/home/aaron/.local/bin:/home/aaron/bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin
HISTSIZE=1000
GJS_DEBUG_TOPICS=JS ERROR;JS LOG
SESSION_MANAGER=local/unix:@/tmp/.ICE-unix/2260,unix/unix:/tmp/.ICE-unix/2260
```

## Using Environment Variables on the Command Line

Environment variables can be referenced directly in commands. Many applications use the `HOME` variable to locate a user's home directory. You can verify this usage with the following commands:

```
$ printenv
PWD=/home/aaron
SSH_ASKPASS=/usr/libexec/openssh/gnome-ssh-askpass
HOME=/home/aaron


$ echo $HOME
/home/aaron
```

When you prefix a variable with the dollar sign (`$`), the shell substitutes it with its current value. This feature is particularly beneficial for scripting.

## Dynamically Incorporating Environment Variables in Scripts

Environment variables allow scripts to adapt to the user running them. For instance, when saving a file to the user's home directory, using `$HOME` ensures the path is correctly set without hardcoding it. Consider this example:

```
$ printenv
PWD=/home/aaron
SSH_ASKPASS=/usr/libexec/openssh/gnome-ssh-askpass
HOME=/home/aaron


$ echo $HOME
/home/aaron


$ touch $HOME/saved_file  # equivalent to: $ touch /home/aaron/saved_file
$ touch /home/jane/saved_file
```

If Aaron runs the script, it will create `/home/aaron/saved_file`; if Jane runs it, her file will be created in `/home/jane/saved_file`. This dynamic adjustment is one of the key benefits of using environment variables.

> [!important]
> **User vs. System-Wide Environment Variables**
>
> If you want users to maintain personalized environment variables, you can modify their `.bashrc` file. However, for system-wide settings that affect all users, update the `/etc/environment` file.

## Configuring Environment Variables

To set a personal environment variable, you can modify your `.bashrc` file. For system-wide changes that affect all users, edit the configuration file located at `/etc/environment`.

First, inspect your `.bashrc` file:

```
$ cat .bashrc
# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi


# User specific environment
if ! [[ "$PATH" == *"$HOME/.local/bin:$HOME/bin:"* ]]; then
    PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH


$ sudo vim /etc/environment
```

Changes made to `/etc/environment` will be applied to every user at their next login. To test your modifications on a virtual machine or similar environment, log out and log back in, then print the environment variable to verify that it has been set correctly.

## Running Commands at User Login

While `/etc/environment` is ideal for setting static environment variables, executing complex commands upon user login requires using the special directory `/etc/profile.d`. Files in this directory are automatically executed by the login shell.

For example, to log each user's login date and time, create a script named `lastlogin.sh` in `/etc/profile.d`:

```
$ sudo vim /etc/profile.d/lastlogin.sh
```

Insert the following lines into the file:

```
echo "Your last login was: " > $HOME/lastlogin
date >> $HOME/lastlogin
```

Save the file and exit your editor. Note that you do not need to include a shebang (e.g., `#!/bin/bash`) because the system processes these files with the current shell.

After logging out and back in, verify the script's effect by checking the contents of the generated file:

```
$ logout
$ ls
lastlogin
$ cat lastlogin
Your last login was at:
Thursday DEC 16 11:19:27 CDT 2021
```

This confirms that the script successfully recorded your last login. The use of `$HOME` ensures that the login time is logged in the appropriate user's home directory.

## Conclusion

By managing system-wide environment profiles with files such as `/etc/environment` and `/etc/profile.d`, you can effectively configure and customize the behavior of both the shell and various applications across all users on your system. For more in-depth guides, check out our [Linux Environment Variables documentation](https://www.example.com/linux-environment-variables).

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/b36d272b-24e2-44e1-82cb-20a5cfa93635/lesson/69752e32-4511-4bd0-9301-8337e8b18011)**
>
> Watch video content
