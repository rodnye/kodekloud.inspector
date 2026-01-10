# File Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Linux-Core-Concepts/File-Types)

---

## Table of Contents

- File Types
  - Overview of File Types
  - Identifying File Types in Linux
  - Summary
  - Watch Video
    - File Type Symbols

---

## Content

Learning Linux Basics Course & Labs

Linux Core Concepts

# File Types

Dave continues with the next topic. In this lesson, we will explore the various types of files in Linux and how to identify them.

> [!important]
> **Note**
>
> In Linux, the phrase "everything is a file" reflects the idea that every object—be it text data, a directory, or a device interface—can be treated as a file.

## Overview of File Types

Linux files can be categorized into three main types:

1.  **Regular Files:**  
    These are the most common files and contain text, data, images, etc. Examples include configuration files, shell scripts, and JPEG images.
2.  **Directories:**  
    Although directories are a type of file, they are used to store other files and directories. A typical example is your home directory.
3.  **Special Files:**  
    Special files can be further subdivided into several categories:
    - **Character Files:**  
      These files, usually located in the `/dev` directory, represent devices that interact serially with the operating system (e.g., a mouse or keyboard).
    - **Block Files:**  
      Also found under `/dev`, block files represent devices that read and write data in fixed-size blocks, such as hard disks and RAM. You might have encountered these when using the `lsblk` command.
    - **Links:**  
      Linux supports two types of links that reference the same underlying data:
      - **Hard Links:**  
        A hard link associates multiple filenames with the same block of data. Deleting one hard link can result in the removal of that data.
      - **Symbolic Links (Symlinks):**  
        A symlink acts like a shortcut, pointing to another file. Deleting a symlink does not affect its target file.

    - **Sockets:**  
      Sockets are special files that facilitate communication between different processes.
    - **Named Pipes:**  
      Also known as FIFOs, these files allow one process to deliver its output directly to another using a unidirectional data flow. More details on named pipes will be discussed later.

## Identifying File Types in Linux

There are two common methods to determine file types:

1.  **Using the file Command:**  
    The `file` command inspects a file or directory and reports its type. For example:

    ```
    [~]$ file /home/michael/
    /home/michael/: directory
    [~]$ file bash-script.sh
    bash-script.sh: Bourne-Again shell script, UTF-8 Unicode text executable
    [~]$
    ```

2.  **Using the ls Command with the -l Flag:**  
    By listing files with the long format (`ls -l`), the first character of each line indicates the file type:
    - **d**: Directory
    - **\-**: Regular file
    - **c**: Character device
    - **l**: Link (symbolic or hard link)
    - **s**: Socket
    - **p**: Named pipe
    - **b**: Block device

    For example:

    ```
    [~]$ ls -ld /home/michael/
    drwxr-xr-x 3 root root 4096 Mar 18 17:20 /home/michael/
    ```

    Here, the initial character "d" confirms that `/home/michael/` is a directory.

### File Type Symbols

| Symbol | Description       |
| ------ | ----------------- |
| d      | Directory         |
| \\-    | Regular file      |
| c      | Character device  |
| l      | Link              |
| s      | Socket            |
| p      | Named pipe (FIFO) |
| b      | Block device      |

## Summary

Using commands like `file` and `ls -l` is an effective way to identify different file types in Linux. This understanding is essential for managing system components and troubleshooting issues.

Happy exploring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/19296611-5fb9-4e5d-a926-d157d3f3c3db/lesson/d7832e47-aab2-440a-a7b7-74f713dee5be)**
>
> Watch video content
