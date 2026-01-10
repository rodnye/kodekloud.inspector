# Archive Back Up Compress Unpack and Uncompress Files Optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Archive-Back-Up-Compress-Unpack-and-Uncompress-Files-Optional)

---

## Table of Contents

- Archive Back Up Compress Unpack and Uncompress Files Optional
  - Archiving Files Using Tar
  - Next Steps: Compressing and Remote Backups
  - Watch Video
    - Common Tar Commands

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Archive Back Up Compress Unpack and Uncompress Files Optional

In this article, we explore efficient methods for archiving files in Linux, compressing them, and backing them up to a remote location. This tutorial is ideal if you manage a website or any system with thousands of files and directories and want to streamline your backup process. Instead of handling individual files, you can pack them into a single archive—often referred to as a tarball—and compress that archive to save space.

When you archive files, you combine all files and directories into one file (e.g., backup.tar). This process is called archiving. Once created, the archive can be compressed (for example, to backup.tar.gz) to reduce the storage space needed. Finally, copying the compressed file to a remote location adds an extra layer of protection to your data.

![The image illustrates a process for archiving, compressing, and backing up files, showing steps from creating a "backup.tar" archive to compressing it into "backup.tar.gz" and then backing it up.](https://kodekloud.com/kk-media/image/upload/v1752881232/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Archive-Back-Up-Compress-Unpack-and-Uncompress-Files-Optional/file-archiving-compressing-backup.jpg)

In the sections that follow, we first discuss archiving, then move on to compressing the archive, and finally, we review methods to back up your compressed files to a remote location.

## Archiving Files Using Tar

Tar (tape archive) was originally developed for backing up files to magnetic tapes. Although magnetic tapes are less common now, tar remains a critical tool because of its efficient way of packing and unpacking files.

Tar works by combining multiple files and directories into a single file, commonly known as a tarball. This technique simplifies file transfers, uploads, or downloads, as you are working with a single file instead of many.

Consider an existing archive file named archive.tar on your system. You can view its contents using any of these commands:

```
$ tar --list --file archive.tar
file1
file2
file3
```

```
$ tar -tf archive.tar
file1
file2
file3
```

```
$ tar tf archive.tar
file1
file2
file3
```

While the shorthand version (tar tf archive.tar) is quick to type, using the longer options like --list can be more intuitive for beginners.

> [!important]
> **Best Practice**
>
> Always include the -f option immediately before specifying the tar file name. This practice ensures that tar correctly identifies the subsequent argument as the archive file, preventing potential misinterpretations of your options.

### Common Tar Commands

Below are some frequently used tar commands:

1.  **Archive a Single File**  
    To archive a single file (file1) into archive.tar:

    ```
    $ tar --create --file archive.tar file1
    ```

    This command can be shortened to:

    ```
    $ tar cf archive.tar file1
    ```

2.  **Append a File to an Existing Archive**  
    To add another file (file2) to your existing archive:

    ```
    $ tar --append --file archive.tar file2
    ```

3.  **Archive an Entire Directory**  
    To archive a directory such as Pictures/ along with its contents:

    ```
    $ tar --create --file archive.tar Pictures/
    ```

    - When using a relative path (e.g., Pictures/), the archive retains the same folder structure.
    - Alternatively, using an absolute path:

      ```
      $ tar --create --file archive.tar /home/aaron/Pictures/
      ```

      will store the absolute path in the archive.

Before extracting files from an archive, it's recommended to list its contents to review the directory structure. For example:

```
$ tar --list --file archive.tar
Pictures/
Pictures/family_dog.jpg
```

Extraction recreates the archived paths relative to your current directory:

```
$ tar --extract --file archive.tar
```

If you are in the `/home/aaron/work` directory, the extraction will produce:

```
/home/aaron/work/Pictures/
/home/aaron/work/Pictures/family_dog.jpg
```

To extract files into a different directory, use the `-C` option. For instance, if you’re in `/home/errand` and want to extract archive.tar's contents to `/tmp`, run:

```
$ tar --extract --file archive.tar --directory /tmp/
```

Or using the shorthand version:

```
$ tar xf archive.tar -C /tmp/
```

> [!important]
> **File Permissions**
>
> Tar archives store file permissions and ownership information. If you extract files archived with a different user, you might not preserve the original ownership unless you run the command with elevated privileges (using `sudo`).

## Next Steps: Compressing and Remote Backups

In upcoming sections, we will cover how to compress your tar archives to save space and review best practices for backing up data to remote locations. These techniques are essential for ensuring high data availability and safeguarding against data loss.

For more detailed information on related topics, refer to the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

With these skills in your toolkit, you can efficiently manage and secure your Linux file systems.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/3ef229de-04fd-45aa-a2d5-1901c7a2a820)**
>
> Watch video content
