# VI Editor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Linux-Basics/VI-Editor)

---

## Table of Contents

- VI Editor
  - Essential vi Operations
  - Searching for Text
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Linux Basics

# VI Editor

In this article, we explore the powerful, console-based text editors available in Linux, with a focus on the classic vi editor. While simple tools like the cat command can be used to write and redirect data into files, they lack the advanced features needed for managing large texts or coding projects. Understanding vi is essential when working with multiple Linux servers in DevOps and cloud environments, where you often need to edit configuration files and other resources remotely.

Below is a sample HTML file used in our examples:

```
<!DOCTYPE html>
<html>
<body>
<h1>The VIM Poem</h1>
<p>The wise man said just walk this way</p>
<p>To the dawn of the light</p>
<p>The wind will blow into your face</p>
<p>As the years pass you by</p>
<p>Hear this voice from deep inside</p>
<p>It's the call of your heart</p>
<p>Close your eyes and you will find</p>
<p>The passage out of the dark</p>
</body>
</html>
```

When you work within DevOps and cloud environments, you'll frequently need to access numerous Linux servers remotely via terminal tools. Modifying configuration files directly on these servers is common, making proficiency with text editors like vi invaluable.

The vi editor comes installed by default on most Linux systems and offers a robust set of features for file editing. To open a file with vi, simply execute the following command in your terminal:

```
vi index.html
```

Once the file opens, you will see its contents on the screen and vi will start in command mode. In command mode, you can navigate through the file, copy, paste, and delete text, but cannot insert new text directly. To begin editing, press the lowercase "i" to switch to insert mode. After making your changes, press the Escape key to return to command mode.

Below is an example showing the file content in edit mode:

```
<!DOCTYPE html>
<html>
<body>
<h1>The VIM Poem</h1>
<p>The wise man said just walk this way</p>
<p>To the dawn of the light</p>
<p>The wind will blow into your face</p>
<p>As the years pass you by</p>
<p>Hear this voice from deep inside</p>
<p>It's the call of your heart</p>
<p>Close your eyes</p>
</body>
</html>
```

> [!important]
> **Tip**
>
> Remember: Press "i" to enter insert mode and start editing your file. Once your changes are complete, press the Escape key to return to command mode.

## Essential vi Operations

Working in vi involves mastering various commands. Here’s a quick reference of some common operations in command mode:

| Operation            | Command                  | Description                                  |
| -------------------- | ------------------------ | -------------------------------------------- |
| Navigation           | Arrow keys or h, j, k, l | Move left, down, up, and right respectively. |
| Delete a character   | x                        | Delete the character under the cursor.       |
| Delete a line        | dd                       | Remove the entire line.                      |
| Copy (Yank) a line   | yy                       | Copy the current line into the buffer.       |
| Paste copied content | p                        | Paste the copied or deleted content.         |
| Scroll up            | Ctrl+u                   | Scroll up within the document.               |
| Scroll down          | Ctrl+d                   | Scroll down within the document.             |
| Command prompt       | :                        | Enter further commands (e.g., save, quit).   |

To manage file operations:

- Save your changes: Type `:w` (you can optionally append a file name).
- Quit without saving: Type `:q`.
- Save and quit: Type `:wq`.

## Searching for Text

Searching for specific text within a file is straightforward in vi. To find a word or phrase, switch to command mode and type the following:

```
/off
```

All occurrences of "off" will be highlighted. Press "N" to jump to the next match and continue pressing "N" to cycle through additional matches.

> [!important]
> **Quick Search Tip**
>
> For enhanced navigation, use the search function to quickly jump between occurrences, helping you efficiently locate specific sections in your document.

By mastering both command and insert modes in vi, you can significantly boost your productivity when editing files on any Linux system. The familiarity with these commands not only quickens routine tasks but also prepares you for more complex configurations and development work in a remote server environment.

Explore more about efficient Linux editing techniques and advanced vi commands to enhance your workflow in today's dynamic DevOps landscape.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/affeecaa-5a26-4e88-9956-685178fd9ab8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/01b4c5bb-ca91-48c0-91f4-a79a1f0fcac1)**
>
> Practice lab
