# Nano and Emacs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Nano-and-Emacs)

---

## Table of Contents

- Nano and Emacs
  - Why Choose GNU Nano?
  - Emacs: A Programmable Editor and IDE
  - Feature Comparison
  - Links and References
  - Watch Video
    - Nano Keyboard Shortcuts

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Nano and Emacs

In this lesson, we'll compare two popular shell-based editors—GNU Nano and Emacs—and explore their features, keyboard shortcuts, and use cases. While [Vi](<https://en.wikipedia.org/wiki/Vi_(text_editor)>) is powerful, Nano and Emacs can be more approachable for newcomers on Linux systems.

## Why Choose GNU Nano?

GNU Nano is designed for simplicity: all input goes directly into the document, and commands use the Control (`Ctrl`) or Meta (`Alt` or `Command` on macOS) keys.

Key features of Nano include:

- Undo and redo
- Syntax coloring
- Interactive search and replace
- Auto-indentation
- Line numbers
- Word completion
- File locking and backup files
- Internationalization support

![The image lists features of GNU Nano, including undo/redo, syntax coloring, interactive search-and-replace, auto-indentation, line numbers, word completion, file locking, backup files, and internationalization support.](https://kodekloud.com/kk-media/image/upload/v1752881392/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Nano-and-Emacs/gnu-nano-features-list-undo-redo.jpg)

### Nano Keyboard Shortcuts

Most Nano commands appear at the bottom of the interface, but here are some essentials:

| Shortcut  | Action                       |
| --------- | ---------------------------- |
| Ctrl+6    | Start selection              |
| Meta+6    | Copy selection               |
| Ctrl+K    | Cut selection                |
| Ctrl+U    | Paste                        |
| Meta+U    | Undo                         |
| Meta+E    | Redo                         |
| Ctrl+\\\\ | Replace text                 |
| Ctrl+T    | Spell check current document |

![The image shows keyboard shortcuts for the Nano text editor, including commands for starting a new session, copying, cutting, and pasting selections.](https://kodekloud.com/kk-media/image/upload/v1752881393/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Nano-and-Emacs/nano-text-editor-keyboard-shortcuts.jpg)

![The image shows keyboard shortcuts for the Nano text editor, including commands for undo, redo, replace text, and spell-check.](https://kodekloud.com/kk-media/image/upload/v1752881393/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Nano-and-Emacs/nano-text-editor-keyboard-shortcuts-2.jpg)

> [!important]
> **Tip**
>
> Press `Ctrl+G` at any time in Nano to open the Help menu. You can also customize Nano by editing your `~/.nanorc` file.

---

## Emacs: A Programmable Editor and IDE

Emacs is a highly extensible editor that can function as a full IDE, email client, news reader, or RSS client. Like Nano, typing inserts text directly, but uses more keyboard-driven navigation.

Core capabilities of Emacs include:

- Syntax highlighting and indentation
- Integrated compiling, running, and testing
- Powerful undo/redo and version control integration
- Extensible architecture via Emacs Lisp
- Configuration as email, news, or RSS client

![The image is a text description of Emacs, highlighting its features as a text editor, IDE, and its ability to be configured as an email, news, or RSS client.](https://kodekloud.com/kk-media/image/upload/v1752881395/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Nano-and-Emacs/emacs-text-editor-ide-features.jpg)

> [!important]
> **Note**
>
> Emacs starts with `emacs filename` and provides built-in tutorials under `Ctrl+h t`. Explore packages via `M-x package-list-packages`.

---

## Feature Comparison

| Feature             | GNU Nano                 | Emacs                           |
| ------------------- | ------------------------ | ------------------------------- |
| Learning Curve      | Very gentle              | Steeper, keyboard-driven        |
| Syntax Highlighting | Yes                      | Yes                             |
| Undo/Redo           | Basic                    | Advanced (multi-level)          |
| Extensibility       | Limited (.nanorc tweaks) | Extensive (Emacs Lisp packages) |
| Built-in IDE Tools  | Minimal                  | Compiler, debugger, REPLs       |
| Customization       | Moderate                 | Highly customizable             |

---

## Links and References

- [GNU Nano Official Site](https://www.nano-editor.org)
- [Emacs Home Page](https://www.gnu.org/software/emacs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/a0b11f51-cccd-43ff-bfb6-60ff7d5b8e0b)**
>
> Watch video content
