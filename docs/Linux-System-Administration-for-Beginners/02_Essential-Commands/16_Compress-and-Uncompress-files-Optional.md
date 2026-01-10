# Compress and Uncompress files Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Compress-and-Uncompress-files-Optional)

---

## Table of Contents

- Compress and Uncompress files Optional
  - Table of Contents
  - Compression Tools Overview
  - Compressing and Decompressing Single Files
  - Preserving Original Files
  - Inspecting Compressed Archives
  - Working with ZIP Archives
  - Combining tar with Compression
  - References
  - Watch Video
    - Two-Step Archiving
    - One-Step Archiving with Compression
    - Extracting Compressed Tarballs

---

## Content

Linux System Administration for Beginners

Essential Commands

# Compress and Uncompress files Optional

Managing file sizes is essential for saving disk space and speeding up transfers. In this guide, you'll learn how to compress and decompress files and directories using the most common Linux utilities: `gzip`, `bzip2`, `xz`, `zip`, and `tar`.

## Table of Contents

- [Compression Tools Overview](#compression-tools-overview)
- [Compressing and Decompressing Single Files](#compressing-and-decompressing-single-files)
- [Preserving Original Files](#preserving-original-files)
- [Inspecting Compressed Archives](#inspecting-compressed-archives)
- [Working with ZIP Archives](#working-with-zip-archives)
- [Combining `tar` with Compression](#combining-tar-with-compression)
- [References](#references)

---

## Compression Tools Overview

Linux distributions typically include these single-file compressors by default:

| Utility | File Extension | Compression Ratio | Typical Speed |
| ------- | -------------- | ----------------- | ------------- |
| gzip    | .gz            | Moderate          | Fast          |
| bzip2   | .bz2           | Better            | Moderate      |
| xz      | .xz            | Best              | Slow          |

Each tool replaces the original file with the compressed version unless instructed otherwise.

---

## Compressing and Decompressing Single Files

Use the following commands to compress and decompress individual files:

```
# Compress
gzip   file1       # → file1.gz
bzip2  file2       # → file2.bz2
xz     file3       # → file3.xz


# Decompress
gunzip   file1.gz   # → file1
bunzip2  file2.bz2  # → file2
unxz     file3.xz   # → file3
```

Alternatively, use the long options for clarity:

```
gzip  --decompress file1.gz
bzip2 --decompress file2.bz2
xz    --decompress file3.xz
```

> [!important]
> **Warning**
>
> By default, `gzip`, `bzip2`, and `xz` delete the original file after (de)compression. Use `-k` or `--keep` to preserve input files.

---

## Preserving Original Files

To keep both the source and the compressed version, add the `-k` (keep) flag:

```
gzip  --keep file1       # Keeping file1 and creating file1.gz
bzip2 --keep file2       # Keeping file2 and creating file2.bz2
xz    --keep file3       # Keeping file3 and creating file3.xz
```

You can confirm the flag via:

```
gzip --help | grep -E '^-k, --keep'
#  -k, --keep   keep (don't delete) input files
```

---

## Inspecting Compressed Archives

To view metadata (compressed size, uncompressed size, compression ratio), use the `--list` (`-l`) option:

```
gzip --list file1.gz
# compressed  uncompressed  ratio uncompressed_name
bzip2 --list file2.bz2
xz    --list file3.xz
```

---

## Working with ZIP Archives

Unlike `gzip`/`bzip2`/`xz`, the `zip` utility can bundle multiple files or directories into a single archive:

```
# Create or update archive.zip with file1
zip archive.zip file1
# Recursively add a directory
zip -r archive.zip Pictures/
# adding: Pictures/ (stored 0%)
# adding: Pictures/family_dog.jpg (stored 0%)
```

To extract everything from a ZIP archive:

```
unzip archive.zip
# Archive: archive.zip
#   inflating: file1
#   inflating: Pictures/family_dog.jpg
```

---

## Combining tar with Compression

Since `gzip`, `bzip2`, and `xz` operate on single files, `tar` is used to first archive multiple files/directories, then compress the archive.

### Two-Step Archiving

```
# 1. Create an uncompressed tarball
tar --create --file archive.tar file1 file2 dir1/


# 2. Compress the tarball
gzip archive.tar         # → archive.tar.gz
# or
bzip2 archive.tar        # → archive.tar.bz2
# or
xz archive.tar           # → archive.tar.xz
```

### One-Step Archiving with Compression

Leverage `tar`’s built-in compression flags:

```
tar --create --gzip   --file archive.tar.gz  file1 file2 dir1/
tar --create --bzip2  --file archive.tar.bz2 file1 file2 dir1/
tar --create --xz     --file archive.tar.xz  file1 file2 dir1/
```

Or use auto-compression (`-a`) to match the extension:

```
tar --create --auto-compress --file archive.tar.gz file1
# shorthand
tar caf archive.tar.xz file1
```

### Extracting Compressed Tarballs

`tar` will detect compression automatically:

```
tar --extract --file archive.tar.gz
tar xf archive.tar.bz2
tar xf archive.tar.xz
```

---

## References

- [GNU gzip Manual](https://www.gnu.org/software/gzip/manual/)
- [GNU bzip2 Manual](https://www.sourceware.org/bzip2/)
- [XZ Utils Documentation](https://tukaani.org/xz/)
- [tar — GNU tar Manual](https://www.gnu.org/software/tar/manual/)
- [zip & unzip – Info-ZIP](https://infozip.sourceforge.net/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/bf4f9042-d38d-497a-9ed8-51fb7fee3fa8)**
>
> Watch video content
