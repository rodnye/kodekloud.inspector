# Basic File Editing configure the standard editor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Basic-File-Editing-configure-the-standard-editor)

---

## Table of Contents

- Basic File Editing configure the standard editor
  - 1. Setting the Editor for the Current Session
  - 2. Making the Change Permanent
  - Links and References
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Basic File Editing configure the standard editor

Changing the shell’s default text editor lets you work faster when editing files like your crontab. By default, most UNIX-like systems use `vi` or `vim`. Bash determines which editor to launch by checking two environment variables:

| Variable | Purpose                       | Examples       |
| -------- | ----------------------------- | -------------- |
| VISUAL   | Full-screen, visual editors   | `vim`, `emacs` |
| EDITOR   | Simple, line-oriented editors | `nano`, `ed`   |

> [!important]
> **Note**
>
> If both `VISUAL` and `EDITOR` are set, many programs will prefer `VISUAL`. To ensure consistency, consider exporting both variables.

## 1\. Setting the Editor for the Current Session

To switch to `nano` for just the active shell session, export the `EDITOR` variable:

```
export EDITOR=nano
```

After running this, any program in this session that relies on your default editor will open `nano` instead of `vi`.

> [!important]
> **Warning**
>
> This change only applies to the current session. Close the terminal or start a new shell, and you’ll revert to the previous default.

## 2\. Making the Change Permanent

To have `nano` (or another editor) as your default every time you open a new shell, add the export line to your Bash startup file. Most users place it in `~/.bash_profile`:

```
vi ~/.bash_profile
```

Inside the file, append:

```
export EDITOR=nano
```

Save and exit. From now on, all new Bash sessions for that user will launch `nano` as the standard editor.

## Links and References

- [GNU Bash Manual: Invoking Bash](https://www.gnu.org/software/bash/manual/html_node/Invoking-Bash.html)
- [Environment Variables in Linux](https://www.gnu.org/software/sh-utils/manual/html_node/Environmental-Variables.html)
- [Nano Editor Documentation](https://www.nano-editor.org/docs.php)

> [!important]
> **Quiz**
>
> Check your understanding with the quiz.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/c52d877a-3522-4ac9-b7ee-0a6df6f95ae3)**
>
> Watch video content
