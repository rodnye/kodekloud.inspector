# Work on the Command Line Part 1 Use and edit command history - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Work-on-the-Command-Line-Part-1-Use-and-edit-command-history)

---

## Table of Contents

- Work on the Command Line Part 1 Use and edit command history
  - 1. List Your Bash History
  - 2. Search Commands with grep
  - 3. Locate the .bash_history File
  - 4. Navigate History Interactively
  - Watch Video
    - Additional Resources

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Work on the Command Line Part 1 Use and edit command history

In this lesson, you’ll learn how to list, search, and interactively navigate your Bash command history to boost your command-line productivity.

## 1\. List Your Bash History

Bash keeps track of every command entered in a session. To display your entire session history, use:

```
history
```

Example output:

```
 1  history
 2  ls
 3  ls -la
 4  test
 5  clear
 6  cd
 7  pwd
 8  clear
 9  sudo systemctl reboot
10  ls -la
11  clear
```

## 2\. Search Commands with grep

To filter history for specific keywords, pipe the output to `grep`. For example, to find all `sudo` invocations:

```
history | grep sudo
```

Output:

```
9  sudo systemctl reboot
```

> [!important]
> **Note**
>
> For comprehensive details on `grep`, see the [GNU grep Manual](https://www.gnu.org/software/grep/manual/).

## 3\. Locate the .bash_history File

Bash writes your commands to `~/.bash_history` when you log out. To view hidden files in your home directory:

```
ls -la /home/aaron
```

Sample listing:

```
drwx------ 14 aaron aaron  4096 Dec  5 13:52 .
drwxr-xr-x  3 root  root   4096 Dec  5 13:43 ..
-rw-------  1 aaron aaron   112 Dec  5 13:51 .bash_history
-rw-r--r--  1 aaron aaron    18 Nov 24 08:20 .bash_logout
-rw-r--r--  1 aaron aaron   141 Nov 24 08:20 .bash_profile
-rw-r--r--  1 aaron aaron   492 Nov 24 08:20 .bashrc
...
```

You can open `~/.bash_history` in any text editor or display it with:

```
cat ~/.bash_history
```

> [!important]
> **Warning**
>
> Commands executed in your current session only appear in `~/.bash_history` **after** you log out.

## 4\. Navigate History Interactively

Bash lets you recall and edit past commands right in the prompt. Use these keystrokes:

| Keystroke      | Action                                 |
| -------------- | -------------------------------------- |
| ↑ (Up Arrow)   | Scroll backward to earlier commands    |
| ↓ (Down Arrow) | Scroll forward to more recent commands |
| Ctrl + R       | Reverse search through command history |

When you find the desired entry, press Enter to re-execute or edit it inline.

---

### Additional Resources

- [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Bash Command History Section](https://www.gnu.org/software/bash/manual/html_node/Bash-History-Builtins.html)
- [Bash Prompt Customization](https://linuxhint.com/bash_prompt_customization/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/6791789b-52c3-4204-91c3-35419c2c3c4f)**
>
> Watch video content
