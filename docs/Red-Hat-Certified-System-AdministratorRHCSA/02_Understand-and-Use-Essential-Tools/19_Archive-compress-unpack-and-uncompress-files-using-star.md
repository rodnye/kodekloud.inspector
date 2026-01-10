# Archive compress unpack and uncompress files using star - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Archive-compress-unpack-and-uncompress-files-using-star)

---

## Table of Contents

- Archive compress unpack and uncompress files using star
  - Basic Syntax and Usage
  - Compression Options
  - Watch Video
    - Listing Archive Contents
    - Extracting Archives
    - Creating a Gzipped Archive
    - Creating a Bzip2 Compressed Archive
    - Unpacking Compressed Archives

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Archive compress unpack and uncompress files using star

This guide demonstrates how to archive, compress, pack, and unpack files using the "star" utility. Star functions similarly to the widely used tar tool on Linux, but with a distinct syntax for its arguments.

## Basic Syntax and Usage

To create an archive, such as "archive2.star" located in your home directory containing a file called "file1", use the following command:

```
$ star -cv file=/home/aaron/archive2.star file1
```

> [!important]
> **Understanding Star Flags**
>
> - The flags `c` (create), `t` (list), and `x` (extract) are combined with a dash (e.g., `-cv`).
> - Specify the archive location with `file=` followed by the desired path.
> - After the archive location, list the files or directories to be included.

### Listing Archive Contents

To view the contents of an archive with a verbose output, use the list flag (`t`) along with the archive path:

```
$ star -tv file=/home/aaron/archive2.star
```

### Extracting Archives

To extract the contents of `archive2.star` into the current directory, execute:

```
$ star -xv file=/home/aaron/archive2.star
```

If you wish to extract the archive into a different directory (for example, `/tmp`), include a capital `C` flag followed by the target directory:

```
$ star -xv -C /tmp file=/home/aaron/archive2.star
```

## Compression Options

Star can compress and decompress archives just like tar. Here are some common usage examples:

### Creating a Gzipped Archive

To create an archive compressed with gzip, use the `-z` option:

```
$ star -cv -z file=/home/aaron/archive2.star.gz file1
```

### Creating a Bzip2 Compressed Archive

To archive and compress using bzip2 compression, use the `-bz` option:

```
$ star -cv -bz file=/home/aaron/archive2.star.bz2 file1
```

### Unpacking Compressed Archives

Star automatically detects the compression type during extraction. For example, to extract a gzip-compressed archive:

```
$ star -xv file=/home/aaron/archive2.star.gz
```

The same process applies to bzip2-compressed archives; simply supply the filename when using the extract option.

> [!important]
> **Quick Reference**
>
> Remember: Star’s syntax is similar to tar, with the key difference being the order of arguments. Always specify the archive location using `file=` before listing the files or directories.

By following these examples, you can efficiently manage files and directories with star on Linux systems. Whether you're creating archives, compressing them using gzip or bzip2, or extracting files to a specified directory, star provides a flexible and straightforward approach.

For further information on Linux archiving tools, consider checking out the [Linux Documentation](https://www.kernel.org/doc/html/latest/) or [tar Manual Page](https://www.gnu.org/software/tar/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/d90701cd-3eb7-4dd9-af5d-3eefe23e4d02)**
>
> Watch video content
