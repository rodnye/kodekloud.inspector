# Compress and Uncompress Files Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Compress-and-Uncompress-Files-Optional)

---

## Table of Contents

- Compress and Uncompress Files Optional
  - Basic Compression with gzip and bzip2
  - Decompressing Files
  - Retaining the Original File
  - Inspecting Compressed File Contents
  - Working with the zip Utility
  - Using tar for Archiving and Compression
  - Summary
  - Watch Video
    - Archiving a Single File with zip
    - Compressing an Entire Directory
    - Creating a Tar Archive and Compressing it

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Compress and Uncompress Files Optional

In this article, you will learn how to compress and uncompress files in Linux. File compression reduces storage space and speeds up file transfers between systems. Most Linux distributions come with at least three built-in compression utilities: gzip, bzip2, and xz.

## Basic Compression with gzip and bzip2

Below is a simple example of compressing files with gzip and bzip2:

```
$ gzip file1
$ bzip2 file2
```

When these commands are executed, each file is compressed into a new file (e.g., file1 becomes file1.gz and file2 becomes file2.bz2) and the original file is automatically deleted.

## Decompressing Files

To restore the original files, use the corresponding decompression commands for gzip, bzip2, and xz:

```
$ gunzip file1.gz
$ bunzip2 file2.bz2
$ unxz file3.xz
```

## Retaining the Original File

Sometimes you may want to compress a file without deleting the original. Most Linux compression utilities offer an option to keep the original file. Use the `--help` flag to check available options:

```
$ gzip --help
Usage: gzip [OPTION]... [FILE]...
Compress or uncompress FILEs (by default, compress FILES in-place).


Mandatory arguments to long options are mandatory for short options too.
  -c, --stdout       write on standard output, keep original files unchanged
  -d, --decompress   decompress
  -f, --force        force overwrite of output file and compress links
  -h, --help         give this help
  -k, --keep         keep (don't delete) input files
  -l, --list         list compressed file contents
  -L, --license      display software license
  -N, --no-name      do not save or restore the original name and timestamp
  -n, --name         save or restore the original name and timestamp
  -q, --quiet        suppress all warnings
  -r, --recursive    operate recursively on directories
  --rsyncable        make rsync-friendly archive
  -S, --suffix=SUF   use suffix SUF on compressed files
  --synchronous      synchronous output
  -t, --test         test compressed file integrity
  -v, --verbose      verbose mode
  -V, --version      display version number
```

> [!important]
> **Note**
>
> Using the `--keep` (or `-k`) option retains the original file when compressing.

Here are examples of using the `--keep` option:

```
$ gzip --keep file1
$ bzip2 --keep file2
$ xz --keep file3
```

## Inspecting Compressed File Contents

If you need to view the contents of a compressed file, you can use the `--list` option. For example:

```
$ gzip --list file1
compressed        uncompressed      ratio   uncompressed_name
71                78               39.7%   file1
```

## Working with the zip Utility

While gzip, bzip2, and xz are popular for compressing individual files, the zip utility can compress an entire directory or multiple files into a single archive.

### Archiving a Single File with zip

```
$ zip archive.zip file1
adding: file1 (deflated 40%)
```

### Compressing an Entire Directory

```
$ zip -r archive.zip Pictures/
adding: Pictures/ (stored 0%)
adding: Pictures/family_dog.jpg (stored 0%)
```

To extract a zip archive, use the following command:

```
$ unzip archive.zip
Archive:  archive.zip
replace file1? [y]es, [n]o, [A]ll, [N]one, [r]ename: N
```

## Using tar for Archiving and Compression

Unlike zip, utilities like gzip do not support compressing multiple files into a single archive. Instead, tar is commonly used to bundle files together before compression.

### Creating a Tar Archive and Compressing it

```
$ tar --create --file archive.tar file1
$ gzip archive.tar
# This creates archive.tar.gz
```

If you want to keep the uncompressed tar archive along with the compressed file, use the `--keep` option:

```
$ gzip --keep archive.tar
# This results in both archive.tar and archive.tar.gz
```

Modern versions of tar allow you to create and compress an archive in a single step. The compression utility is automatically selected based on the file extension:

```
$ tar --create --gzip --file archive.tar.gz file1
$ tar --create --bzip2 --file archive.tar.bz2 file1
$ tar --create --xz --file archive.tar.xz file1
$ tar --create --autocompress --file archive.tar.gz file1
```

During extraction, tar automatically detects the compression type, eliminating the need to specify a decompression method.

## Summary

This article provided an overview of various techniques for compressing and uncompressing files in Linux using utilities such as gzip, bzip2, xz, and zip. You also learned how to use tar for archiving and compressing multiple files. These methods help efficiently manage file sizes and streamline file transfers.

For more detailed information on Linux file management and compression techniques, explore additional resources like [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) or visit [Linux Documentation](https://www.kernel.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/848cb503-6cad-4059-8cbc-d81707a25c57)**
>
> Watch video content
