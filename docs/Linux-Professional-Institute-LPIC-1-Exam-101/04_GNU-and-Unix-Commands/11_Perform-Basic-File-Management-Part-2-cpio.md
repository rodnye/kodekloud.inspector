# Perform Basic File Management Part 2 cpio - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Perform-Basic-File-Management-Part-2-cpio)

---

## Table of Contents

- Perform Basic File Management Part 2 cpio
  - What Is cpio?
  - How cpio Works
  - 1. Creating an Archive
  - 2. Extracting an Archive
  - Quick Reference: cpio Options
  - Links and References
  - Watch Video
    - Common Use Cases

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Perform Basic File Management Part 2 cpio

In this lesson, we’ll dive into the `cpio` utility, a classic UNIX tool for creating and extracting archives. Whether you’re bundling application files or unpacking backup archives, `cpio` offers a straightforward, scriptable interface.

## What Is `cpio`?

CPIO stands for **Copy In, Copy Out**. Unlike `tar`, which handles device archives too, `cpio` reads and writes archives strictly via **standard input** and **standard output**. You typically pipe a file list into `cpio` to create an archive, or feed an archive into `cpio` to extract its contents.

### Common Use Cases

| Task                          | cpio Option | Description                                      |
| ----------------------------- | ----------- | ------------------------------------------------ |
| Create an archive             | `-o`        | Copy out files into a new archive                |
| Extract files from an archive | `-i`        | Copy in files from an existing archive           |
| Create directories as needed  | `-d`        | Automatically make parent directories on extract |

## How `cpio` Works

1.  **Generate a file list** (e.g., via `find` or `ls`).
2.  **Pipe** that list to `cpio`.
3.  **Specify mode**:
    - `-o` for output (create archive)
    - `-i` for input (extract archive)

> [!important]
> **Note**
>
> `cpio` does not infer the archive format from file extensions. You control its behavior exclusively with command-line options.

---

## 1\. Creating an Archive

To package all files in the current directory into `archive.cpio`:

```
ls | cpio -o > archive.cpio
```

Explanation:

- `ls` lists filenames (one per line).
- The pipe (`|`) directs that list into `cpio`.
- `cpio -o` writes an archive to **stdout**.
- `> archive.cpio` redirects stdout into your archive file.

You can also use `find` to include subdirectories:

```
find . -depth | cpio -o > project.cpio
```

## 2\. Extracting an Archive

Unpack the contents of `archive.cpio`, creating directories as needed:

```
cpio -id < archive.cpio
```

Breakdown:

- `cpio -i` reads an archive from **stdin**.
- `-d` ensures that all required directories are created.
- `< archive.cpio` feeds the archive into `cpio`.

> [!important]
> **Warning**
>
> By default, `cpio` preserves file ownership and permissions. Run as root only if you trust the archive contents to avoid overwriting critical system files.

---

## Quick Reference: `cpio` Options

| Option   | Description                                  |
| -------- | -------------------------------------------- |
| `-o`     | Create an archive (Copy Out)                 |
| `-i`     | Extract from an archive (Copy In)            |
| `-d`     | Create directories as needed when extracting |
| `-v`     | Verbose mode (list files processed)          |
| `-H fmt` | Select archive format (e.g., `newc`, `odc`)  |

---

## Links and References

- [cpio(1) Manual Page](https://man7.org/linux/man-pages/man1/cpio.1.html)
- [GNU `cpio` Documentation](https://www.gnu.org/software/findutils/manual/html_node/cpio-invocation.html)
- [Linux Archive Management Overview](https://linux.die.net/man/1/cpio)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/49bcfa51-d99c-4e3a-9d0a-a240305ecbe0)**
>
> Watch video content
