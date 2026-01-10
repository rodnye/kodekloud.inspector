# Compress and Uncompress files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Compress-and-Uncompress-files)

---

## Table of Contents

- Compress and Uncompress files
  - Basic Compression Techniques
  - Preserving Original Files
  - Archiving with ZIP and TAR
  - Extracting Compressed Archives
  - Conclusion
  - Watch Video
    - Creating and Compressing Tar Archives

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Compress and Uncompress files

In this guide, we explore various methods to compress and decompress files on Linux. Compression not only saves disk space but also enhances file transfer speeds between systems.

Most Linux distributions come with several built-in compression utilities. The three most common are gzip, bzip2, and xz. Each of these tools offers a simple command-line interface.

> [!important]
> **Quick Tip**
>
> Using compression can significantly reduce file transfer times over slow networks.

## Basic Compression Techniques

For example, to compress a file using gzip, run:

```
$ gzip file1
```

This command compresses `file1` and produces a new file named `file1.gz` while automatically deleting the original file. Similarly, you can compress other files with bzip2 or xz:

```
$ bzip2 file2
$ xz file3
```

To decompress these files, you can use the corresponding utilities:

```
$ gunzip file1.gz
$ bunzip2 file2.bz2
$ unxz file3.xz
```

> [!important]
> **Warning**
>
> By default, these commands delete the original uncompressed file. If you need to retain the source file, use the `-k` or `--keep` option.

## Preserving Original Files

To prevent the deletion of the original files after compression, use the `--keep` option. This option is available in gzip, bzip2, and xz. For example:

```
$ gzip --keep file1
$ bzip2 --keep file2
$ xz --keep file3
```

You can view all the available options for a utility by running the `--help` command. For instance, to display gzip’s help information:

```
$ gzip --help
Usage: gzip [OPTION]... [FILE]...
Compress or uncompress FILES (by default, compress FILES in-place).


  -c, --stdout         write on standard output, keep original files unchanged
  -d, --decompress     decompress
  -f, --force          force overwrite of output file and compress links
  -h, --help           give this help
  -k, --keep           keep (don't delete) input files
  -l, --list           list compressed file contents
  -L, --license        display software license
  -n, --no-name        do not save or restore the original name and timestamp
  -N, --name           save or restore the original name and timestamp
  -q, --quiet          suppress all warnings
  -r, --recursive      operate recursively on directories
  -S, --suffix=SUF     use suffix SUF on compressed files
  -s, --synchronous    synchronous output
  -t, --test           test compressed file integrity
  -v, --verbose        verbose mode
  -V, --version        display version number
```

Additionally, you can list information about a compressed file using the `--list` option with gzip:

```
$ gzip --list file1.gz
         compressed        uncompressed  ratio uncompressed_name
               71                 78   39.7%    file1
```

## Archiving with ZIP and TAR

While gzip, bzip2, and xz are primarily focused on compressing a single file, the zip utility is capable of both archiving and compressing files. To create an archive containing `file1`, run:

```
$ zip archive.zip file1
```

To compress an entire directory such as "Pictures" and include all subdirectories recursively, use the `-r` option:

```
$ zip -r archive.zip Pictures/
```

It is important to note that gzip and similar utilities cannot archive multiple files into a single compressed file. In such cases, the tar utility is used to create an archive first, and then the archive is compressed with your chosen tool.

### Creating and Compressing Tar Archives

To create a simple tar archive containing `file1`:

```
$ tar --create --file archive.tar file1
```

After creating the tar archive, you can compress it with gzip:

```
$ gzip archive.tar
# Result: archive.tar.gz
```

If you wish to retain the original tar file, use:

```
$ gzip --keep archive.tar
# Output: archive.tar and archive.tar.gz
```

Tar can also combine the archiving and compression operations in a single step. For example, to create a gzip-compressed tar archive:

```
$ tar --create --gzip --file archive.tar.gz file1
```

Similarly, for bzip2 and xz compression:

```
$ tar --create --bzip2 --file archive.tar.bz2 file1
$ tar --create --xz --file archive.tar.xz file1
```

Tar also offers an auto-compression mode that automatically selects the compression tool based on the file extension:

```
$ tar --create --autocompress --file archive.tar.gz file1
```

A convenient alias for creating compressed archives with tar is:

```
$ tar caf archive.xz file1
```

## Extracting Compressed Archives

To extract files from a compressed tar archive, tar will automatically detect the compression method used based on the file extension. For example, to extract a gzip-compressed archive:

```
$ tar --extract --file archive.tar.gz
```

Or using the abbreviated command:

```
$ tar xf archive.tar.gz
```

## Conclusion

This guide covered the essential commands for compressing and decompressing files on Linux, from simple file compression with gzip, bzip2, and xz to the advanced usage of tar for archiving and compression. Using these techniques will help manage disk space efficiently and improve file handling performance.

For more detailed information, consider exploring the [Linux Documentation](https://www.kernel.org/doc/html/latest/) and other related resources.

We'll see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/35ac6ee8-8739-4c54-b428-ec3d0af7a53c)**
>
> Watch video content
