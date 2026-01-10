# Create and manage hard links - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Create-and-manage-hard-links)

---

## Table of Contents

- Create and manage hard links
  - Sharing Files Using Hard Links
  - Repeating the Hard Link Example
  - Limitations and Considerations
  - Conclusion
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Create and manage hard links

In this lesson, we will explore how Linux manages hard links and understand the differences between hard links and soft links. Before diving into hard links, it is important to grasp a few fundamental concepts about Linux file systems.

Imagine a Linux computer shared between two users, Aaron Lockhart and Jane. Each user logs in with their unique credentials—which means they have separate desktops, program settings, and personal directories.

Suppose Aaron takes a picture of the family dog and saves it at:

/home/aaron/pictures/family_dog.jpg

We can simulate creating a file at that path by storing the text "Picture of Milo the Dog" in it. Linux offers the `stat` command to display detailed information about files and directories, including the inode number. In file systems such as XFS or ext4, inodes contain data block locations and metadata (like permissions and timestamps).

When a file (e.g., family_dog.jpg) is created, Linux assigns it an inode (e.g., 52946177) to hold its data and metadata. Initially, the file gets one hard link pointing to that inode. Instead of referencing the inode directly, the system uses a file name that points to the inode holding all of the file's necessary information.

The `stat` command output lists the number of hard links associated with the inode. Consider the following example:

```
$ echo "Picture of Milo the Dog" > Pictures/family_dog.jpg


$ stat Pictures/family_dog.jpg
  File: Pictures/family_dog.jpg
  Size: 49            Blocks: 8          IO Block: 4096   regular file
Device: fd00h/64768d Inode: 52946177    Links: 1
Access: (0640/-rw-r-----)  Uid: ( 1000/ aaron)   Gid: ( 1005/ family)
Context: unconfined_u:object_r:user_home_t:s0
Access: 2021-10-27 16:33:18.949749912 -0500
Modify: 2021-10-27 14:41:19.202778881 -0500
Change: 2021-10-27 16:33:18.851749919 -0500
Birth: 2021-10-26 13:37:17.980969655 -0500
```

When you access the file (for example, by reading family_dog.jpg), Linux refers to inode 52946177 to retrieve the data. The "Links" count indicates how many file names point to that inode.

## Sharing Files Using Hard Links

Suppose Jane has her own pictures folder at `/home/jane/pictures`, and Aaron wants to efficiently share his family photograph with her. One basic approach would be to copy the file:

```
$ cp /home/aaron/Pictures/family_dog.jpg /home/jane/Pictures/family_dog.jpg
```

However, if there are thousands of pictures, copying can duplicate massive amounts of data. To avoid redundancy, you can create a hard link. With a hard link, the file data is stored only once on the disk while multiple file names (even in different directories) point to the same inode and data.

The syntax for creating a hard link is:

ln \[path to target file\] \[path to link file\]

For example, to create a hard link for family_dog.jpg in Jane’s directory, run:

```
$ ln /home/aaron/Pictures/family_dog.jpg /home/jane/Pictures/family_dog.jpg
```

After executing this command, both file names refer to the same inode. Running `stat` on the file now shows a "Links" count of 2:

```
$ stat Pictures/family_dog.jpg
  File: Pictures/family_dog.jpg
  Size: 49            Blocks: 8          IO Block: 4096   regular file
Device: fd00h/64768d Inode: 52946177    Links: 2
Access: (0640/-rw-r-----)  Uid: ( 1000/ aaron)   Gid: ( 1005/ family)
Context: unconfined_u:object_r:user_home_t:s0
Access: 2021-10-27 16:33:18.949749911 -0500
Modify: 2021-10-27 14:41:19.207278881 -0500
Change: 2021-10-27 16:33:18.851749919 -0500
Birth: 2021-10-26 13:37:17.980969655 -0500
```

This confirms that either `/home/aaron/Pictures/family_dog.jpg` or `/home/jane/Pictures/family_dog.jpg` will retrieve the same underlying data. If Aaron later deletes his version with:

```
$ rm /home/aaron/Pictures/family_dog.jpg
```

Jane still has access to the file because at least one hard link remains. Only when the link count reaches zero is the data removed from the disk.

## Repeating the Hard Link Example

For clarity, here is a consolidated example of creating a hard link and observing the resulting link count:

```
$ echo "Picture of Milo the Dog" > /home/aaron/Pictures/family_dog.jpg
$ ln /home/aaron/Pictures/family_dog.jpg /home/jane/Pictures/family_dog.jpg
$ stat /home/aaron/Pictures/family_dog.jpg
```

Once the link count is verified as 2, if both users delete their hard links:

```
$ rm /home/aaron/Pictures/family_dog.jpg
$ rm /home/jane/Pictures/family_dog.jpg
```

the inode link count drops to zero and the underlying data is removed from the disk.

## Limitations and Considerations

> [!important]
> **Note**
>
> Hard links are subject to certain restrictions and best practices:

| Consideration     | Details                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File Type         | Hard links can only be created for files, not directories.                                                                                                |
| File System       | Hard links must reside on the same file system. For example, you cannot create a hard link from an SSD (/home/aaron) to an external drive (/mnt/backups). |
| Write Permissions | Proper write permissions are required in the destination directory (e.g., `/home/jane/pictures`).                                                         |
| Group Access      | To share a file between users, consider adding them to a common group (e.g., "family") and adjust permissions accordingly.                                |

For instance, if Aaron and Jane need to share access to the file, you might execute:

```
$ usermod -a -G family aaron
$ usermod -a -G family jane
$ chmod 660 /home/aaron/Pictures/family_dog.jpg
```

This ensures that modifying permissions on any hard link updates the inode, so all links reflect the change.

## Conclusion

Hard links are a robust feature of Linux file systems, enabling efficient file sharing and storage optimization. By storing a file’s data only once while making it accessible via multiple file names, hard links conserve disk space and simplify access management. Data is only removed when all links pointing to the inode are deleted.

In this lesson, we examined the concept, usage, and limitations of hard links. For more insights into Linux file system management, continue exploring the additional lessons in this series.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/93452462-137c-4113-8a9e-b5a494fb8c4f)**
>
> Watch video content
