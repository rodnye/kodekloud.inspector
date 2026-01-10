# File Compression and Archival - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Working-with-Shell-II/File-Compression-and-Archival)

---

## Table of Contents

- File Compression and Archival
  - Using tar for Archival
  - Compression Commands in Linux
  - Conclusion
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Working with Shell II

# File Compression and Archival

In this lesson, we continue our journey into the Linux shell by exploring file compression and archival techniques. You'll learn about several tools for compressing and archiving files, methods for searching files and directories, and basic pattern matching in Linux. In addition, there is an interactive lab that allows you to experiment with the VI Editor.

![The image lists Linux Core Concepts, including file compression, data extraction, and text editors, with associated labs for practical learning.](https://kodekloud.com/kk-media/image/upload/v1752881160/notes-assets/images/Learning-Linux-Basics-Course-Labs-File-Compression-and-Archival/frame_20.jpg)

Before diving into file compression and archival commands, let's start by checking the size of a file in Linux. The `du` command (short for disk usage) is widely used to determine file sizes.

:::note Viewing File Sizes To display a file size in kilobytes, use the following command: :::

```
[~]$ du -sk test.img
100000
```

For a more user-friendly, human-readable format:

```
[~]$ du -sh test.img
98M     test.img
```

Alternatively, you can use the `ls -lh` command to view file sizes in a human-readable format:

```
[~]$ ls -lh test.img
```

## Using tar for Archival

The `tar` command is one of the most common utilities used to group multiple files or directories into a single archive file (tarball). This is particularly useful for data backup, transfer, and archiving.

To create a tar archive, use the `-c` option to create the archive and the `-f` option to specify the file name:

```
[~]$ tar -cf test.tar file1 file2 file3
[~]$ ls -ltr test.tar
-rw-rw-r--  1 1281054720 Mar 13 19:48 test.tar
```

You can list the contents of a tarball using:

```
[~]$ tar -tf test.tar
./file1
./file2
./file3
```

To extract files from a tar archive, use the `-x` option:

```
[~]$ tar -xf test.tar
```

Additionally, to compress the tarball and reduce its file size, include the `-z` option:

```
[~]$ tar -zcf test.tar file1 file2 file3
```

## Compression Commands in Linux

Linux offers several commands for compressing files. The choice of command depends on the type of data and required compression level. Below are examples using `bzip2`, `gzip`, and `xz`:

| Compression Utility | Command Example                                         | Compressed File Extension |
| ------------------- | ------------------------------------------------------- | ------------------------- |
| bzip2               | \\[~\\]$ bzip2 test.img<br>\\[~\\]$ du -sh test.img.bz2 | .bz2                      |
| gzip                | \\[~\\]$ gzip test1.img<br>\\[~\\]$ du -sh test1.img.gz | .gz                       |
| xz                  | \\[~\\]$ xz test2.img<br>\\[~\\]$ du -sh test2.img.xz   | .xz                       |

Each command appends a specific file extension indicating the compression format: `.bz2` for `bzip2`, `.gz` for `gzip`, and `.xz` for `xz`.

:::note Decompressing Files To uncompress these files, use the following commands:

- For bzip2: `bunzip2`
- For gzip: `gunzip`
- For xz: `unxz` :::

For example, here is how you decompress each file type:

```
# Decompress using bzip2
[~]$ bunzip2 test.img.bz2
[~]$ du -sh test.img
99M     test.img

# Decompress using gzip
[~]$ gunzip test1.img.gz
[~]$ du -sh test1.img
99M     test1.img

# Decompress using xz
[~]$ unxz test2.img.xz
[~]$ du -sh test2.img
99M     test2.img
```

It is important to note that you do not always need to fully uncompress a file to view its content. Tools like `zcat`, `bzcat`, and `xzcat` allow you to read compressed files without manual decompression.

## Conclusion

This lesson has provided an overview of file compression and archival in Linux. Mastering these techniques will enhance your file management and storage efficiency. Additionally, exploring interactive labs with the VI Editor serves as a practical complement to these technical skills.

For further learning, consider exploring additional documentation on Linux file management and archival strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/8587333b-3a93-4eb5-8d3f-13c4a3435d1b/lesson/6c4f9780-6be1-4c2f-b2e1-0b6992ee3c5a)**
>
> Watch video content
