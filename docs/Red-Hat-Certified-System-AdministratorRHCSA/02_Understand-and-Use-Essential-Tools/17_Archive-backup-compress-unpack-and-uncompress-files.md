# Archive backup compress unpack and uncompress files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Archive-backup-compress-unpack-and-uncompress-files)

---

## Table of Contents

- Archive backup compress unpack and uncompress files
  - Understanding the Tar Utility
  - Creating and Modifying Tar Archives
  - Extracting Files from a Tar Archive
  - Handling File Permissions and Ownership
  - Conclusion
  - Watch Video
    - Viewing the Contents of a Tar Archive
    - Creating a New Archive
    - Appending Files to an Archive
    - Archiving Directories
    - Listing Archive Contents
    - Extracting to a Specific Directory

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Archive backup compress unpack and uncompress files

In this guide, you'll learn how to archive files in Linux—a crucial skill when backing up a website or any system with thousands of files and directories. Archiving involves creating a single file that encapsulates all your files and directories, making it easier to manage backups and transfers.

The complete backup process generally includes three main steps:

1.  **Archive:** Pack files and directories into a single file (e.g., backup.tar).
2.  **Compress:** Reduce the archive size by compressing it (e.g., backup.tar.gz).
3.  **Backup:** Transfer the compressed file to a remote system, shared drive, or cloud storage for safekeeping.

![The image illustrates a process for archiving, compressing, and backing up files, showing steps from creating a "backup.tar" archive to compressing it into "backup.tar.gz" and finally backing it up.](https://kodekloud.com/kk-media/image/upload/v1752883614/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Archive-backup-compress-unpack-and-uncompress-files/file-archiving-compressing-backup.jpg)

Linux offers powerful utilities that make archiving, compressing, and backing up simple tasks. In this article, we focus first on archiving using the tar utility before exploring compression and backup processes.

## Understanding the Tar Utility

Tar, which stands for Tape Archive, was originally designed to back up data onto magnetic tapes. Despite the decline in tape usage, tar remains popular because it efficiently packages files and directories into a single file, commonly known as a "tarball" (with a .tar extension). This tarball can then be transferred and later unpacked on any system.

### Viewing the Contents of a Tar Archive

Assume you have an archive file named `archive.tar`. Tar offers various command-line options to manipulate this archive. To display its contents, you can use either the long option (`--list`) or the short option (`-t`). The following commands all yield the same result:

```
$ tar --list --file archive.tar
file1
file2
file3


$ tar -tf archive.tar
file1
file2
file3


$ tar tf archive.tar
file1
file2
file3
```

> [!important]
> **Tip**
>
> While the short option (`t`) is quick to type, the long option (`--list`) is easier to remember when you're just starting with tar.

An important note: always specify the `--file` (or `-f`) option _after_ listing the other options to indicate which archive file you're working with.

## Creating and Modifying Tar Archives

### Creating a New Archive

To create a new tar archive and add a specific file (for example, `file1`), use the `--create` option:

```
$ tar --create --file archive.tar file1
```

### Appending Files to an Archive

After creating the archive, you can add more files using the `--append` option:

```
$ tar --append --file archive.tar file2
```

### Archiving Directories

You can also archive entire directories with all their contents. Note that the stored path in the archive depends on whether you use a relative or an absolute path. For example:

```
$ tar --create --file archive.tar Pictures/
$ tar --create --file archive.tar /home/aaron/Pictures/
```

> [!important]
> **Reminder**
>
> Before extraction, it is advisable to list the archive contents to check the stored paths. This step ensures you understand how files will be extracted to your system.

### Listing Archive Contents

To preview the stored paths in an archive:

```
$ tar --list --file archive.tar
Pictures/
Pictures/family_dog.jpg
```

## Extracting Files from a Tar Archive

When you extract files, tar places them in your current directory, preserving the stored directory structure:

```
$ tar --extract --file archive.tar
$ tar xf archive.tar
```

### Extracting to a Specific Directory

If you need to extract the archive to a directory other than the current one, use the `--directory` (or `-C`) option. For instance, to extract the contents to the `/tmp` directory:

```
$ tar --extract --file archive.tar --directory /tmp/
$ tar xf archive.tar -C /tmp/
```

## Handling File Permissions and Ownership

Tar archives retain file permission and ownership information. When extracting files owned by another user, you might not preserve these attributes if you extract them as a standard user. In such cases, consider using `sudo` to extract the files as the root user to restore all permissions and ownership accurately.

> [!important]
> **Important**
>
> When extracting sensitive archives containing files owned by other users, always use `sudo` to ensure file permissions and ownership are maintained.

## Conclusion

By understanding and utilizing the tar utility, you can efficiently archive, compress, and back up your files in Linux. Mastering these commands lays the foundation for more advanced backup and restore procedures.

When you're ready to expand your skills further, move on to the next lesson to explore file compression and backup strategies in greater detail.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/cde163f5-9c06-4a20-9fc1-afdadeff39fd)**
>
> Watch video content
