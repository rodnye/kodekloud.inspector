# VI Editor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Working-with-Shell-II/VI-Editor)

---

## Table of Contents

- VI Editor
  - Using the Cat Command
  - Getting Started with VI Editor
  - Enhancing VI with VIM
  - Practice Makes Perfect
  - Watch Video
  - Practice Lab
    - Opening Files in Command Mode
    - Switching to Insert Mode
    - Working with VI Commands
    - Searching for Text
    - Last Line Mode: Saving and Quitting

---

## Content

Learning Linux Basics Course & Labs

Working with Shell II

# VI Editor

Explore the power of console-based text editors in Linux with a focus on the VI Editor. While the simple cat command is useful for small file operations, its limited functionality makes it impractical for handling extensive text manipulation or coding. This guide will walk you through using VI, one of the most robust editors available by default on nearly every Linux distribution.

## Using the Cat Command

Before diving into VI, let's review a basic example using the cat command to read and write files. Although helpful for small tasks, cat lacks the rich features of dedicated text editors:

```
[~]$ cat Asia/India/Mumbai/City.txt
Mumbai
[~]$
[~]$ cat > Africa/Egypt/Cairo/City.txt
Cairo
ctrl d
```

## Getting Started with VI Editor

The VI Editor is a powerful, console-based text editor perfect for editing files and writing code. To open a file for editing, simply invoke VI followed by the file name. For instance, to open a sample file from Michael's home directory, use the following command:

```
[$] vi /home/michael/sample.txt
This is the first line.
Followed by the second line.
Third line is very long compared to the previous two lines.
Hello there!
hello there!
~
~
~
~
~
~
~
~
~
~
~
"sample.txt" 5L, 139C
1,1 All
```

When you open a file with VI, it starts in Command Mode and displays the file's existing content (if any). VI Editor operates primarily in three modes:

1.  **Command Mode** – Execute commands such as copying, pasting, deleting, and navigating.
2.  **Insert Mode** – Edit or add new text.
3.  **Last Line Mode** – Save, quit, or perform other file operations.

### Opening Files in Command Mode

Every time you start VI, it opens in Command Mode. In this state, only commands are recognized. Navigate through the file using the arrow keys or by pressing H (left), J (down), K (up), and L (right). You may also use the mouse to select text.

Below is another example of opening a file in VI, emphasizing its initial state in Command Mode:

```
[$]$ vi /home/michael/sample.txt
This is the first line.
Followed by the second line.
Third line is very long compared to the previous two lines.
Hello there!
hello there!
~
~
~
~
~
~
~
~
~
~
"sample.txt" 5L, 139C
```

### Switching to Insert Mode

To make changes in your file, switch from Command Mode to Insert Mode by pressing the lowercase i. In Insert Mode, a blinking cursor and the indicator “-- INSERT --” appear at the bottom of the screen, allowing you to add or modify text. Other keys such as a, o, I, A, or O may also be used to enter Insert Mode based on where you want to position the cursor.

> [!important]
> **Tip**
>
> To exit Insert Mode and return to Command Mode, simply press the Esc key.

### Working with VI Commands

Once back in Command Mode, you can perform a variety of operations:

- **Copying Text:** Place the cursor on a line and press `YY` to copy it. To paste the copied line above the target line, move the cursor appropriately and press `P`.

  ```
  This is the first line.
  Followed by the second line.
  Third line is very long compared to the previous two lines.
  Hello there!
  hello there!
  ~
  ~
  ~
  "sample.txt" 5L, 139C 1,1 All
  ```

- **Saving and Deleting:**
  - Save the file using uppercase `ZZ`.
  - Delete a character by positioning on it and pressing `X`.
  - Delete an entire line with `DD`.
  - For multiple lines, use a command like `D3D` to delete three lines (replace 3 with any number).

  Here's an example of deletion in Command Mode:

  ```
  This is the first line.
  Followed by the second line.
  Third line is very long compared to the previous two lines.
  Hello there!
  hello there!
  ~
  ~
  ~
  ~
  ~
  ~
  ~
  "sample.txt" 5L, 139C      1,1         All
  ```

- **Undo and Redo Changes:**
  - Press `U` to undo an unintended change.
  - Use `Control-R` to redo a change that was undone.

  ```
  This is the first line.
  Followed by the second line.
  Third line is very long compared to the previous two lines.
  Hello there!
  hello there!
  ~
  ~
  ~
  ~
  ~
  ~
  ~
  ~
  ~
  ~
  "sample.txt" 5L, 139C  1,1 All
  ```

### Searching for Text

VI provides efficient search capabilities. Use the slash (/) to search downward from the current line or the question mark (?) to search upward. Typing `/line` will move the cursor to the first occurrence of the search term. Press `n` for the next match downward, or `N` for the previous match upward.

```
/line
This is the first line.
Followed by the second line.
Third line is very long compared to the previous two lines.
Hello there!
hello there!
~
~
~
~
~
~
~
~
~
~
~/line
```

### Last Line Mode: Saving and Quitting

Switch to Last Line Mode by pressing the colon (:) in Command Mode. This mode allows you to execute commands such as saving and quitting:

- Save the changes with `:w`.
- Quit the editor with `:q`.
- Save and exit using `:wq`.
- Force quit without saving using `:q!`.

An example indicating saving changes in Last Line Mode is shown below:

```
This is the first line.
Followed by the second line.
Third line is very long compared to the previous two lines.
Hello there!
hello there!
I made some changes to this file.
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
:W
```

## Enhancing VI with VIM

VIM ("VI Improved") builds upon the core features of VI by providing additional enhancements such as autocomplete, spell checking, plugins, and syntax highlighting. Often, the VI command on modern Linux distributions is actually a symbolic link to VIM (e.g., /usr/bin/vim.basic).

To see the differences between VI and VIM, open a file in VIM and type `:h vi-differences` to view detailed comparisons.

```
This is the first line.
Followed by the second line.
Third line is very long compared to the previous two lines.
Hello there!
hello there!
I made some changes to this file.
~
~
~
~
~
~
~
~
~
?
:w
```

![The image describes VIM as "VI Improved," highlighting features like completion, spell check, plugins, syntax highlighting, and more, with a "KodeKloud" logo.](https://kodekloud.com/kk-media/image/upload/v1752881161/notes-assets/images/Learning-Linux-Basics-Course-Labs-VI-Editor/frame_440.jpg)

> [!important]
> **Further Reading**
>
> For more detailed information on command usage and advanced features, refer to the [VIM documentation](https://www.vim.org/docs.php) or use the built-in help command within VIM.

## Practice Makes Perfect

Now that you have a solid understanding of the VI Editor's modes and commands, it's time to practice. Experiment with switching between modes, executing commands, and utilizing VI's extensive feature set to streamline your text editing and coding workflow.

![The image shows a text editor in "Insert Mode" with instructions for switching between modes using specific keys.](https://kodekloud.com/kk-media/image/upload/v1752881162/notes-assets/images/Learning-Linux-Basics-Course-Labs-VI-Editor/frame_350.jpg)

Happy editing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/8587333b-3a93-4eb5-8d3f-13c4a3435d1b/lesson/1092a86b-6407-4ef2-939c-f7cf25589d2a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/8587333b-3a93-4eb5-8d3f-13c4a3435d1b/lesson/01b4c5bb-ca91-48c0-91f4-a79a1f0fcac1)**
>
> Practice lab
