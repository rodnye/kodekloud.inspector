# Basic File Editing vi - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Basic-File-Editing-vi)

---

## Table of Contents

- Basic File Editing vi
  - Navigating Files with less
  - Paging with more
  - Getting Started with Vim
  - Comparing less vs more
  - Verifying Your Edits
  - Further Reading
  - Watch Video
    - Searching Inside less
    - Switching to Insert Mode
    - Essential Vim Commands
    - Saving Your Work

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Basic File Editing vi

Managing and editing text files is a core skill for any Linux user. This guide covers:

- Viewing logs and files with the `less` and `more` pagers
- Performing quick edits in Vim (Vi IMproved)
- Verifying your changes after saving

---

## Navigating Files with `less`

The `less` pager provides powerful navigation and search features:

```
less /var/log/dnf.log
```

- Scroll up/down with **↑** and **↓** or **PgUp**/**PgDn**
- The filename appears at the bottom left
- Quit with `q`

### Searching Inside `less`

| Action                                  | Command                    |
| --------------------------------------- | -------------------------- |
| Search forward (case-sensitive)         | `/debug`                   |
| Jump to next match                      | `n`                        |
| Toggle case-insensitive matching inline | `-i`                       |
| Start `less` in case-insensitive mode   | `less -i /var/log/dnf.log` |
| Jump to previous match                  | `N`                        |

> [!important]
> **Note**
>
> You can enable case-insensitive search at any time by typing `-i` inside `less`.

---

## Paging with `more`

A simpler alternative, `more` advances one screen at a time:

```
more /var/log/dnf.log
```

- **Spacebar**: Next page
- **Enter**: Next line
- **q**: Quit

> [!important]
> **Note**
>
> For large files or complex searches, `less` is generally preferred over `more`.

---

## Getting Started with Vim

Vim is a modal editor: it has **Normal**, **Insert**, and **Command** modes.

```
vim
```

On launch without a filename, you'll see:

```
VIM - Vi IMproved 8.0.1763 by Bram Moolenaar et al.
Modified by <bugzilla@redhat.com>
type :help<Enter> or <F1> for on-line help
type :q<Enter> to exit
```

### Switching to Insert Mode

- Press `i` to enter **Insert Mode** (`-- INSERT --` appears)
- Type your content
- Press `Esc` to return to **Normal Mode**

### Essential Vim Commands

| Command    | Mode    | Description                    |
| ---------- | ------- | ------------------------------ |
| `i`        | Normal  | Switch to **Insert Mode**      |
| `/pattern` | Normal  | Search forward for “pattern”   |
| `\\c`      | Normal  | Toggle case-insensitive search |
| `yy`       | Normal  | Yank (copy) current line       |
| `dd`       | Normal  | Delete (cut) current line      |
| `p`        | Normal  | Paste after the cursor         |
| `:3`       | Normal  | Go to line 3                   |
| `:w`       | Command | Save (write) the buffer        |
| `:wq`      | Command | Save and quit                  |
| `:q!`      | Command | Quit without saving changes    |

> [!important]
> **Warning**
>
> Unsaved changes will be lost if you use `:q!`. Always use `:w` or `:wq` to preserve your edits.

### Saving Your Work

```
:w
```

![The image shows a terminal window with text being edited in a text editor, likely Vim, with the command `:w` at the bottom. The text reads "This is our text for our vim demo."](https://kodekloud.com/kk-media/image/upload/v1752881388/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Basic-File-Editing-vi/vim-terminal-text-editor-demo.jpg)

---

## Comparing `less` vs `more`

| Pager | Usage       | Navigation      | Quit |
| ----- | ----------- | --------------- | ---- |
| less  | `less FILE` | ↑/↓, PgUp/PgDn  | `q`  |
| more  | `more FILE` | Spacebar, Enter | `q`  |

---

## Verifying Your Edits

After saving a file (e.g., `testfile`), confirm the contents:

```
cat testfile
```

Example output:

```
no yes no
yes
no
no
no
no
yes
new changes
```

---

## Further Reading

- [Vim Documentation](https://www.vim.org/docs.php)
- [less Man Page](https://linux.die.net/man/1/less)
- [Linux Command Reference](https://linuxcommand.org/lc3_learning_the_shell.php)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/39615302-badb-46bc-8311-83a34a60fdbd)**
>
> Watch video content
