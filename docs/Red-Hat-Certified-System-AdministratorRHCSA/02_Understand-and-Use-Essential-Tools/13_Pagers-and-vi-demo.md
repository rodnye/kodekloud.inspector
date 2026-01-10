# Pagers and vi demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Pagers-and-vi-demo)

---

## Table of Contents

- Pagers and vi demo
  - Using the Less Pager
  - Using the More Pager
  - Vim Text Editor
  - Watch Video
    - Inserting and Editing Text
    - Navigating and Searching in Vim
    - Copying, Cutting, and Pasting
    - Exiting Vim

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Pagers and vi demo

In this article, you'll learn how to use pagers and the Vim text editor to efficiently navigate and edit text files. We'll begin by exploring pagers—programs that allow you to view large amounts of text page by page. In particular, we'll cover the "less" and "more" pagers. Then, we'll switch our focus to Vim, a powerful, modal text editor.

---

## Using the Less Pager

The "less" pager offers a richer feature set compared to "more." To view a file with less—such as the DNF Package Manager log file—simply run:

```
less /var/log/dnf.log
```

When you open the log file, you'll notice the file name is highlighted in the bottom left corner, indicating that you're in pager mode. The output might look similar to this:

```
2021-10-19T00:53:06-0500 INFO --- logging initialized ---
2021-10-19T00:53:06-0500 DEBUG timer: config: 3 ms
2021-10-19T00:53:06-0500 DEBUG Loaded plugins: builddep, changelog, config-manager, copr, debug, debuginfo-install, download, generate_completion_cache, groups-needs-restarting, playground, repoclosure, repodiff, repograph, repomanage, reposync
2021-10-19T00:53:06-0500 DEBUG DNF version: 4.7.0
2021-10-19T00:53:06-0500 DDEBUG Command: dnf makecache --timer
2021-10-19T00:53:06-0500 DDEBUG Installroot: /
2021-10-19T00:53:06-0500 DDEBUG Releasesever: 8
2021-10-19T00:53:06-0500 DDEBUG cachedir: /var/cache/dnf
2021-10-19T00:53:06-0500 DDEBUG Base command: makecache
2021-10-19T00:53:06-0500 DDEBUG Extra commands: ['makecache', '--timer']
2021-10-19T00:53:06-0500 DDEBUG Making cache files for all metadata files.
2021-10-19T00:53:06-0500 WARNING Failed determining last makecache time.
2021-10-19T00:53:06-0500 DDEBUG appstream: has expired and will be refreshed.
2021-10-19T00:53:06-0500 DDEBUG baseos: has expired and will be refreshed.
2021-10-19T00:53:06-0500 DDEBUG extras: has expired and will be refreshed.
2021-10-19T00:53:06-0500 DDEBUG repo: downloading from remote: appstream
2021-10-19T00:53:06-0500 DDEBUG appstream: using metadata from Thu 07 Oct 2021 10:51 AM CDT.
2021-10-19T00:53:25-0500 DDEBUG repo: downloading from remote: baseos
2021-10-19T00:54:07-0500 DDEBUG baseos: using metadata from Thu 07 Oct 2021 10:07
/var/log/dnf.log
```

Use the arrow keys to scroll through the text. Less also supports search functionality:

- Press `/` followed by your search term (e.g., `/debug`) to highlight matches.
- Press `n` to navigate to the next occurrence or `N` (Shift + n) to go back to the previous match.
- Keep in mind that searches are case sensitive by default. To perform a case-insensitive search, include the `-i` option right after the slash (e.g., `/ -i debug`).

> [!important]
> **Exiting Less**
>
> When finished, press `Q` to exit the less pager.

---

## Using the More Pager

The "more" pager provides basic functionality similar to less, although with fewer features. To open the log file using more, execute:

```
more /var/log/dnf.log
```

With more, you'll observe that the bottom of the screen displays “more” along with a percentage indicator, which tracks your progress as you scroll. Here are a few tips:

- Press the space bar to advance one page at a time.
- To exit the more pager at any time, press the `Q` key.

---

## Vim Text Editor

Next, we explore Vim (Vi Improved), a modal text editor known for its efficiency and powerful features.

When you launch Vim, you’ll be greeted by a welcome screen that includes useful information, version details, and basic commands:

![The image shows a terminal window displaying the welcome screen for Vim, a text editor, with version and usage information.](https://kodekloud.com/kk-media/image/upload/v1752883635/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Pagers-and-vi-demo/vim-welcome-screen-terminal.jpg)

### Inserting and Editing Text

Vim operates in different modes. To begin editing a file, switch to insert mode by pressing the `i` key. Upon doing so, you'll see the word "INSERT" displayed in the lower left-hand corner. Once in insert mode, you can type or modify your text.

Below is an example corresponding to entering text in Vim:

![The image shows a terminal window with a text editor open, displaying the sentence "This is our text for our vim demo." The word "This" is highlighted, and a search command is being typed at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752883636/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Pagers-and-vi-demo/vim-demo-terminal-text-editor.jpg)

### Navigating and Searching in Vim

- Press `Esc` to return to normal (command) mode.
- To search for text, press `/` followed by your search term. The search is case sensitive by default.
- For a case-insensitive search, type `/\c` followed by your term (the `c` stands for "case").
- To jump directly to a specific line, type `:` followed by the line number (for example, `:3` navigates to line three).

### Copying, Cutting, and Pasting

Here are some essential operations in Vim:

| Command | Action | Description                                           |
| ------- | ------ | ----------------------------------------------------- |
| `yy`    | Copy   | Copies the entire line in normal mode.                |
| `dd`    | Cut    | Cuts (deletes) the entire line in normal mode.        |
| `p`     | Paste  | Pastes the copied or cut text below the current line. |

### Exiting Vim

New users often find exiting Vim challenging. Use these commands based on your needs:

- To save your changes and exit, type `:wq` (write and quit).
- If you wish to exit without saving changes, type `:q!` to force quit.

For example, when starting Vim without specifying a file:

```
[aaron@LFCS-CentOS ~]$ vim
[aaron@LFCS-CentOS ~]$
```

Alternatively, open an existing file, make your changes, and then save and exit:

```
[aaron@LFCS-CentOS ~]$ vim testfile
[aaron@LFCS-CentOS ~]$ cat testfile
no yes no
yes
no
no
no
no
no
yes
new changes
[aaron@LFCS-CentOS ~]$
```

> [!important]
> **Tip**
>
> Remember that practice is key when learning Vim. The more you use it, the more intuitive its modal operations become.

---

This guide provides a brief overview of the "less" and "more" pagers, along with essential Vim commands to help you navigate, search, and edit text efficiently. For further reading on Vim and advanced pager functionalities, check out the [Vim documentation](https://www.vim.org/docs.php).

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/0b3f3d67-6fce-471e-b210-355c416c6e51)**
>
> Watch video content
