# Locate read and use system documentation including man info and files in usrsharedoc - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Locate-read-and-use-system-documentation-including-man-info-and-files-in-usrsharedoc)

---

## Table of Contents

- Locate read and use system documentation including man info and files in usrsharedoc
  - The Info System
  - Documentation in /usr/share/doc
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Locate read and use system documentation including man info and files in usrsharedoc

In this guide, we explore two essential sources of Linux documentation that provide in-depth explanations of commands and system features. Whether you're troubleshooting an issue or preparing for a certification exam, leveraging these resources can significantly enhance your understanding.

## The Info System

The info documentation system is a hypertext-based alternative to traditional man pages. It offers multi-page documentation that allows you to navigate seamlessly through interconnected sections. For example, to view detailed information about the Bash shell, execute:

```
info bash
```

Here are some key navigation tips for using the info system effectively:

- Press the **Space** bar to scroll down within the current node or move to the next node when you reach the end.
- Press **Backspace** to return to the previous node.
- Use the **Close Bracket (\])** key to jump to the next node.

  ![The image shows a terminal window displaying a section of the GNU Bash Reference Manual, specifically describing Bash features and their origins.](https://kodekloud.com/kk-media/image/upload/v1752883626/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Locate-read-and-use-system-documentation-including-man-info-and-files-in-usrsharedoc/bash-reference-manual-features.jpg)

- Press the **Open Bracket (\[)** key to navigate to the previous node.
- Press **n** to move to the next node on the same level.
- Press **p** (as in "papa") to go to the previous node on the same level (if available).
- Press **u** to jump up to the parent node.
- Press **l** (as in "lima") to return to the last visited node.
- Press **q** to exit the info system.

In the info pages, links are marked with asterisks. For a quick navigation, simply hover over a link and press **Enter**. The **Tab** key can help you move the cursor to the nearest link. Keep in mind that while the info system is comprehensive, not every command has an associated info page.

![The image shows a terminal window displaying a text-based menu with options for an introduction to Bash and shells. The interface includes typical menu options like File, Edit, and View.](https://kodekloud.com/kk-media/image/upload/v1752883627/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Locate-read-and-use-system-documentation-including-man-info-and-files-in-usrsharedoc/bash-shells-terminal-menu-options.jpg)

![The image shows a terminal window displaying text related to Bash definitions, including terms like 'name', 'operator', and 'process group'.](https://kodekloud.com/kk-media/image/upload/v1752883629/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Locate-read-and-use-system-documentation-including-man-info-and-files-in-usrsharedoc/bash-definitions-terminal-window.jpg)

> [!important]
> **Navigation Tip**
>
> If you get stuck while browsing, simply use the command `info <command>` to retrieve detailed documentation for the command you're working with.

## Documentation in /usr/share/doc

Another valuable resource is the `/usr/share/doc` directory, which contains documentation for many of the software packages installed on your system. This directory typically holds FAQs, README files, introductory notes, and sometimes HTML-formatted guides.

To begin exploring the documentation, change to the directory:

```
cd /usr/share/doc
```

You will notice a variety of subdirectories, each corresponding to an installed package. To view these directories, run:

```
ls | less
```

For instance, to inspect documentation for Bash, navigate to its directory:

```
cd /usr/share/doc/bash
ls
```

Within the Bash documentation directory, you might find files such as `bash.html`, `bashref.html`, `FAQ`, `INTRO`, `RBASH`, and `README`. To read the introductory documentation, you can use a pager like `less`:

```
less INTRO
```

Alternatively, you can open the file with an editor such as `vi`:

```
vi INTRO
```

Or use `grep` to search for specific terms in the document, for example:

```
grep "comma" INTRO
```

These commands and tools (less, vi, grep) allow you to navigate and search the content efficiently, ensuring you can quickly access the information you need.

When you're finished, clear your terminal screen by running:

```
clear
```

> [!important]
> **Quick Summary**
>
> Both the info system and the `/usr/share/doc` directory are comprehensive resources. By mastering their navigation and search functionalities, you can easily find detailed documentation and enhance your expertise in using Linux commands.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/2849c94f-2fc5-4df5-b386-dc7ccaebba6c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/9a1f1e9b-2be5-4492-925e-3943d065d7c7)**
>
> Practice lab
