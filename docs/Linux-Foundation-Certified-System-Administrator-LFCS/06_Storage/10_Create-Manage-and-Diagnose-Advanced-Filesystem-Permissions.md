# Create Manage and Diagnose Advanced Filesystem Permissions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Storage/Create-Manage-and-Diagnose-Advanced-Filesystem-Permissions)

---

## Table of Contents

- Create Manage and Diagnose Advanced Filesystem Permissions
  - Understanding Standard File Permissions
  - Using ACLs for Granular Permission Control
  - File and Directory Attributes
  - Conclusion
  - Watch Video
  - Practice Lab
    - Adding Content with Elevated Privileges
    - Granting Specific Permissions via ACL
    - Applying ACLs Recursively
    - Append-Only Attribute
    - Immutable Attribute

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Storage

# Create Manage and Diagnose Advanced Filesystem Permissions

In this article, we explore how standard file permissions are represented, their limitations, and how to use Access Control Lists (ACLs) along with file attributes for more granular control. These advanced techniques allow system administrators and users to tailor permissions without disrupting existing ownership structures.

---

## Understanding Standard File Permissions

When you list files with the command `ls -l`, the output might look like this:

```
jeremy@kodekloud:~$ ls -l
total 0
-rw-rw-r-- 1 alex  staff  0 May 23 05:56 file1
-rw-rw-r-- 1 alex  staff  0 May 23 05:56 file2
-rw-rw-r-- 1 alex  staff  0 May 23 05:56 file3
jeremy@kodekloud:~$
```

In the above output, each file is owned by the user `alex` and the group `staff`. The permission string is divided into three distinct parts:

1.  The first three characters (`rw-`) indicate that the owner (Alex) can read and write the file.
2.  The next three characters (`rw-`) show that users in the `staff` group can also read and write.
3.  The final three characters (`r--`) mean that all other users have read-only access.

> [!important]
> **Note**
>
> If you log in as another user (e.g., Jeremy Morgan) who is neither `alex` nor part of the `staff` group, only the last set of permissions (`r--`) applies.

Imagine Jeremy needs to edit only `file3` without being granted full access to all files owned by the group or changing file ownership. This is where ACLs become useful.

---

## Using ACLs for Granular Permission Control

Access Control Lists (ACLs) enable the definition of permissions for multiple users and groups beyond the standard owner-group-others model.

### Adding Content with Elevated Privileges

Suppose we want to add content to `file3` as the root user (since Jeremy is not the file owner):

```
jeremy@kodekloud:~$ sudo sh -c 'echo "This is the file content" > file3'
[sudo] password for jeremy:
jeremy@kodekloud:~$ ls -l file3
-rw-rw-r-- 1 alex staff 25 May 23 06:18 file3
```

Even though you can view the content using `cat file3`, Jeremy is unable to overwrite it due to insufficient write permissions:

```
jeremy@kodekloud:~$ echo "This is the NEW file content" > file3
-bash: file3: Permission denied
```

### Granting Specific Permissions via ACL

To grant Jeremy Morgan read and write access specifically on `file3`, set an ACL entry by running:

```
sudo setfacl --modify user:jeremy:rw file3
```

After executing the above command, the permissions are adjusted. A plus sign (`+`) in the file listing indicates that additional ACL information is present:

```
jeremy@kodekloud:~$ ls -l file3
-rw-rw-r--+ 1 alex staff 25 May 23 06:18 file3
```

To inspect the ACL entries on the file, use the `getfacl` command:

```
getfacl file3
# file: file3
# owner: alex
# group: staff
user::rw-
user:jeremy:rw-
group::rw-
mask::rw-
other::r--
```

The ACL entry for `jeremy` now successfully grants him the required read and write access. The mask value defines the maximum effective permissions for all ACL entries and is automatically adjusted if the file permissions are further modified.

You can also grant ACL permissions to groups. For example, to grant the `sudo` group read and write access, execute:

```
sudo setfacl --modify group:sudo:rw file3
```

If you need to deny all permissions for a user, you can remove permissions by setting an empty permission list:

```
sudo setfacl --modify user:jeremy:--- file3
```

To remove an ACL entry completely:

```
sudo setfacl --remove user:jeremy file3
```

And if you want to remove all ACL entries from the file:

```
sudo setfacl --remove-all file3
```

### Applying ACLs Recursively

For directories where you need consistent ACL settings, you can apply changes recursively. For instance, to grant Jeremy full access on an entire directory named `dir1`:

```
mkdir dir1
setfacl --recursive -m user:jeremy:rwx dir1/
```

If you later need to remove Jeremy’s ACL from the directory and its contents:

```
setfacl --recursive --remove user:jeremy dir1/
```

---

## File and Directory Attributes

Beyond ACLs, file attributes can profoundly affect how files behave at the system level. Two significant attributes are the append-only and immutable attributes.

### Append-Only Attribute

The append-only attribute (denoted by the letter `a`) allows data to be appended to a file without modifying the existing content. Only the root user can set or remove this attribute. Follow this process:

1.  Create a new file with some initial content:

    ```
    jeremy@kodekloud:~$ echo "This is old content" > newfile
    ```

2.  Set the append-only attribute:

    ```
    jeremy@kodekloud:~$ sudo chattr +a newfile
    ```

3.  Verify the file content:

    ```
    jeremy@kodekloud:~$ cat newfile
    This is old content
    ```

Attempting to overwrite the file will result in an error:

```
jeremy@kodekloud:~$ echo "Replace with this content" > newfile
-bash: newfile: Operation not permitted
```

Appending new data works as expected:

```
jeremy@kodekloud:~$ echo "This is NEW content" >> newfile
jeremy@kodekloud:~$ cat newfile
This is old content
This is NEW content
```

To remove the append-only attribute, run:

```
sudo chattr -a newfile
```

### Immutable Attribute

The immutable attribute (represented by the letter `i`) makes a file completely unmodifiable. When a file is immutable, it cannot be renamed, deleted, or modified—even by the root user—until the attribute is removed.

To set the immutable attribute:

```
sudo chattr +i newfile
```

You can verify the attribute using the `lsattr` command:

```
jeremy@kodekloud:~$ lsattr newfile
----i-------- newfile
```

To remove the immutable attribute:

```
sudo chattr -i newfile
```

Other file attributes exist as well (e.g., `c` for compression), although support varies between different file systems such as ext4. For further details, refer to the corresponding manual pages.

---

## Conclusion

This guide has demonstrated the limitations of standard file permissions and detailed how Access Control Lists (ACLs) and file attributes provide enhanced control over file and directory behavior. By leveraging tools such as `setfacl`, `getfacl`, `chattr`, and `lsattr`, administrators and users can efficiently manage access and tailor their filesystem permissions to meet specific requirements.

Happy managing and securing your filesystem!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/3fb0930b-bd4d-4413-9fb2-290e6d76169c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/0fb56f01-f0b0-4a83-b9fd-2d8083459903)**
>
> Practice lab
