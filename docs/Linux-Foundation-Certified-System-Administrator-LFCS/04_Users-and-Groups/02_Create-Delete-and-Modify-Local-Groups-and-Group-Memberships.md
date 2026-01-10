# Create Delete and Modify Local Groups and Group Memberships - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Users-and-Groups/Create-Delete-and-Modify-Local-Groups-and-Group-Memberships)

---

## Table of Contents

- Create Delete and Modify Local Groups and Group Memberships
  - Creating a New Group and Adding a User
  - Changing a User’s Primary Login Group
  - Renaming and Deleting a Group
  - Watch Video
  - Practice Lab

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Users and Groups

# Create Delete and Modify Local Groups and Group Memberships

Managing local groups in Linux simplifies file permission and system privilege administration. By grouping users—such as developers, administrators, or container managers—you can efficiently control access to project files or critical system functions.

Imagine you have a directory containing files that developers need to work on. For instance, by creating a group called Developers and assigning appropriate read/write permissions, you can ensure that users like John, Jack, and later Jane have proper access to edit files. If a developer’s role changes or they leave the team, simply adding or removing them from the Developers group updates their permissions automatically.

Certain groups provide special privileges on the system. Consider the following examples:

| Group      | Privilege Description                                      |
| ---------- | ---------------------------------------------------------- |
| wheel/sudo | Execute any command with root privileges                   |
| Docker     | Manage Docker containers without requiring root privileges |

Remember that each user has a primary (login) group and may belong to several secondary (supplementary) groups. The primary group is set at login and influences file creation permissions, as files are automatically associated with both the user account and the primary group.

Before proceeding with these exercises, ensure that a user named John exists on your system.

---

## Creating a New Group and Adding a User

To start, ensure that the user John is created and then create the Developers group:

```
$ sudo adduser john
$ sudo groupadd developers
```

The easiest way to add John to the Developers group is by using the `gpasswd` command. Despite its name originating from "group password," it is primarily used to manage group memberships. To add John to the Developers group, run:

```
$ sudo gpasswd --add john developers
```

You can verify John's group memberships with:

```
$ groups john
```

The output will list his primary group first, followed by any secondary groups, for example:

```
john: john developers
```

If you need to remove John from a secondary group, use:

```
$ sudo gpasswd --delete john developers
```

Or equivalently:

```
$ sudo gpasswd -d john developers
```

---

## Changing a User’s Primary Login Group

Sometimes you may need to change John’s primary login group. Use the `usermod` command with caution, ensuring that you do not confuse the option for modifying secondary groups. The `-g` (or `--gid`) option specifically changes the primary group.

> [!important]
> **Warning**
>
> Be sure that you correctly distinguish between the primary group and secondary groups. An incorrect adjustment may lead to unintended permission issues.

Execute the following command to change John’s primary group to Developers:

```
$ sudo usermod --gid developers john
```

After executing the command, verify the change by running:

```
$ groups john
```

The expected output should be:

```
john: developers
```

_Note: The `gpasswd` command expects the username first and then the group name, whereas `usermod` requires the group name before the username._

---

## Renaming and Deleting a Group

To rename the "developers" group to "programmers," use the `groupmod` command. You can choose between the long option or its short alternative:

```
$ sudo groupmod --new-name programmers developers
```

Or equivalently:

```
$ sudo groupmod -n programmers developers
```

If you later decide to delete the programmers group, use the `groupdel` command. However, if any user, such as John, is still using that group as their primary group, you will encounter an error:

```
$ sudo groupdel programmers
groupdel: cannot remove the primary group of user 'john'
```

> [!important]
> **Note**
>
> Before deleting a group, make sure that no user has it set as their primary group. In cases where the group is primary for any user, change that user's primary group (for example, back to "john") before deletion.

Deleting a secondary group will work seamlessly provided it is not set as a user's primary group.

---

This concludes our guide on managing local groups and group memberships in Linux. By leveraging these commands, administrators can simplify the management of file permissions and user roles across the system. For more detailed information on Linux user and group management, consider reviewing the [Linux Documentation](https://www.kernel.org/doc/) or related [user management tutorials](https://www.linux.com/topic/desktop/how-manage-users-and-groups-linux/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/b36d272b-24e2-44e1-82cb-20a5cfa93635/lesson/81bc6d77-7ed1-4db0-a080-391b6135e605)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/b36d272b-24e2-44e1-82cb-20a5cfa93635/lesson/4cd8ffe1-601d-4a31-9655-f6b31b697bac)**
>
> Practice lab
