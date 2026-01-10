# tmux - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/tmux)

---

## Table of Contents

- tmux
  - Starting tmux
  - Managing Windows
  - Panes (Splits)
  - Sessions
  - Copy/Paste & Scrollback
  - Configuration
  - Links and References
  - Watch Video
    - Splitting Panes
    - Navigating & Resizing Panes
    - Swapping & Zooming Panes
    - Additional Pane Actions

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# tmux

tmux is a powerful terminal multiplexer first released in 2007. It uses a client–server architecture to manage multiple terminal sessions from a single server process. Key enhancements over traditional tools include:

- Client–server model for centralized session management
- Multiple windows per session, with windows linkable across sessions
- Interactive menus for navigating sessions, windows, and clients
- Support for both Vim and Emacs key bindings
- Full UTF-8 and 256-color support

> [!important]
> **Note**
>
> Ensure your terminal emulator supports 256 colors and UTF-8 for the best tmux experience.

![The image is a text description of features related to "tmux," highlighting its release year, client-server model, session management, key layouts, and terminal support.](https://kodekloud.com/kk-media/image/upload/v1752881417/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-tmux/tmux-features-release-year-session-management.jpg)

---

## Starting tmux

To launch tmux with a default session:

```
$ tmux
```

This creates a new session containing one window. The status bar at the bottom displays:

| Component     | Description                                      |
| ------------- | ------------------------------------------------ |
| Host name     | Your machine’s hostname                          |
| Time & date   | Current timestamp                                |
| Session name  | Name of the active tmux session                  |
| Window index  | Numeric index (starts at 0)                      |
| Window name   | Name of the window (usually the running program) |
| Active window | Marked with `*`                                  |

To start tmux with a custom session and window name:

```
$ tmux new -s LPI -n "Window zero"
```

The status bar then shows:

```
[LPI] 0:Window zero*
```

---

## Managing Windows

All tmux commands begin with the **prefix** key (default: Ctrl +b).

| Action                     | Shortcut                 |
| -------------------------- | ------------------------ |
| Create new window          | Prefix + c               |
| Rename current window      | Prefix + ,               |
| List windows interactively | Prefix + w               |
| Next window                | Prefix + n               |
| Previous window            | Prefix + p               |
| Select window by number    | Prefix + `<number>`      |
| Kill current window        | Prefix + & (confirm y/n) |
| Find window by name        | Prefix + f               |
| Change window index        | Prefix + . (period)      |

![The image shows a tmux session with window management commands on the left and keyboard shortcuts on the right. The shortcuts include combinations for creating, renaming, and navigating windows.](https://kodekloud.com/kk-media/image/upload/v1752881418/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-tmux/tmux-session-window-management-shortcuts.jpg)

> [!important]
> **Warning**
>
> Killing a window will prompt for confirmation. Unsaved work inside that window will be lost upon confirmation.

---

## Panes (Splits)

tmux splits windows into _panes_, each running as an independent pseudoterminal.

### Splitting Panes

| Action             | Shortcut                 |
| ------------------ | ------------------------ |
| Split horizontally | Prefix + "               |
| Split vertically   | Prefix + %               |
| Kill current pane  | Prefix + x (confirm y/n) |

### Navigating & Resizing Panes

| Action             | Shortcut              |
| ------------------ | --------------------- |
| Move between panes | Prefix + Arrow keys   |
| Last active pane   | Prefix + ;            |
| Resize by 1 line   | Prefix + Ctrl + Arrow |
| Resize by 5 lines  | Prefix + Alt + Arrow  |

![The image shows a list of keyboard shortcuts for managing panes in tmux, including moving between panes, moving to the last active pane, and resizing a pane by one line.](https://kodekloud.com/kk-media/image/upload/v1752881418/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-tmux/tmux-keyboard-shortcuts-pane-management.jpg)

### Swapping & Zooming Panes

| Action                  | Shortcut   |
| ----------------------- | ---------- |
| Swap with previous pane | Prefix + { |
| Swap with next pane     | Prefix + } |
| Toggle pane zoom        | Prefix + Z |

![The image shows keyboard shortcuts for managing panes in tmux, including swapping to previous and next panes, and zooming in/out of a panel.](https://kodekloud.com/kk-media/image/upload/v1752881419/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-tmux/tmux-keyboard-shortcuts-managing-panes.jpg)

### Additional Pane Actions

| Action                     | Shortcut                     |
| -------------------------- | ---------------------------- |
| Show a clock               | Prefix + t (press q to quit) |
| Break pane into new window | Prefix + !                   |

---

## Sessions

Control entire tmux sessions with these commands:

| Action                      | Command / Shortcut            |
| --------------------------- | ----------------------------- |
| List sessions               | `tmux ls`<br>or Prefix + s    |
| Create new session (prompt) | Prefix + : `new`              |
| Rename session              | Prefix + $                    |
| Switch sessions             | Prefix + s → select           |
| Kill session                | `tmux kill-session -t <name>` |
| Attach to session           | `tmux a`                      |
| Detach from session         | Prefix + d                    |
| Detach specific client      | Prefix + D                    |
| Refresh display             | Prefix + r                    |

---

## Copy/Paste & Scrollback

To capture text from a pane:

1.  Enter copy mode: `Prefix + [`
2.  Navigate to the start point: Arrow keys
3.  Press **Space** to begin selection
4.  Move to the end point: Arrow keys
5.  Press **Space** to copy into tmux buffer
6.  Paste into any pane: `Prefix + ]`

![The image is a guide for using tmux scrollback mode, showing keyboard shortcuts for entering scrollback mode, moving to text, and marking the beginning and end of a selection.](https://kodekloud.com/kk-media/image/upload/v1752881420/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-tmux/tmux-scrollback-mode-guide-shortcuts.jpg)

---

## Configuration

tmux reads configuration from:

- System-wide: `/etc/tmux.conf`
- User-specific: `~/.tmux.conf`

To load a custom file at startup:

```
$ tmux -f ~/my-tmux.conf
```

Sample `~/.tmux.conf`:

```
# Change prefix to Ctrl-a
set -g prefix C-a
unbind C-b
bind C-a send-prefix


# Quick access to windows 10, 11, 12
bind F1 select-window -t :10
bind F2 select-window -t :11
bind F3 select-window -t :12
```

> [!important]
> **Note**
>
> Reload your tmux configuration without restarting by running:
>
> ```
> Prefix + : source-file ~/.tmux.conf
> ```

For full command reference:

```
$ man tmux
```

---

## Links and References

- [tmux GitHub Repository](https://github.com/tmux/tmux)
- [tmux Manual (OpenBSD)](https://man.openbsd.org/tmux)
- [Terminal Multiplexing with tmux](https://opensource.com/article/18/3/getting-started-tmux)

That’s it for this lesson. You can test your knowledge with the quiz.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/792929f2-1a19-4cf4-98f5-46109ede3dbe)**
>
> Watch video content
