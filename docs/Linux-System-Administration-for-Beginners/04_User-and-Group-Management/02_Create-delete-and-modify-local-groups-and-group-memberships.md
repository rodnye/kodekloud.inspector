# Create delete and modify local groups and group memberships - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/User-and-Group-Management/Create-delete-and-modify-local-groups-and-group-memberships)

---

## Table of Contents

- Create delete and modify local groups and group memberships
  - Why Use Groups?
  - Creating a User and a Group
  - Managing Group Memberships
  - Changing a User’s Primary Group
  - Renaming and Deleting Groups
  - Quick Reference Table
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

User and Group Management

# Create delete and modify local groups and group memberships

Keeping your Linux server secure and organized often involves managing groups and assigning users the appropriate permissions. In this guide, you'll learn how to create, delete, and modify local groups, manage memberships, and adjust primary versus secondary group assignments.

## Why Use Groups?

Groups let you grant permissions to multiple users at once. For example, imagine a shared directory for your development team:

- Team members: John, Jack, Jane
- Directory: `/srv/dev-project`
- Required access: read/write

Instead of adjusting permissions per user, you can:

1.  Create a **developers** group
2.  Add John, Jack, and Jane to **developers**
3.  Change the directory’s group ownership to **developers**
4.  Grant the group read/write rights

![The image shows a diagram of a "Developers" group with members named John, Jack, and Jane, alongside a folder icon labeled "Permission."](https://kodekloud.com/kk-media/image/upload/v1752881493/notes-assets/images/Linux-System-Administration-for-Beginners-Create-delete-and-modify-local-groups-and-group-memberships/developers-group-john-jack-jane-permission.jpg)

Now any member of **developers** automatically has the correct permissions. Remove a user from the group to revoke access, or add new members to grant permissions instantly.

Beyond file access, group membership controls special privileges:

- **wheel** or **sudo** group → run commands as root
- **docker** group → manage [Docker containers](https://docs.docker.com/get-started/)

> [!important]
> **Note**
>
> Each user has one **primary** group (used when creating files or running processes) and zero or more **secondary** groups.

## Creating a User and a Group

First, ensure you have a user (`john`) and create the `developers` group:

```
sudo useradd john
sudo groupadd developers
```

## Managing Group Memberships

Use the `gpasswd` tool to add or remove users from secondary groups:

```
# Add John to developers
sudo gpasswd --add john developers
# or short form
sudo gpasswd -a john developers

# Verify John's groups
groups john
# Remove John from developers
sudo gpasswd --delete john developers
# or short form
sudo gpasswd -d john developers
```

## Changing a User’s Primary Group

To switch John’s primary group to `developers`, use `usermod` with the `--gid` option:

```
sudo usermod --gid developers john

# Verify change
groups john
# Output: john : developers
```

> [!important]
> **Note**
>
> `gpasswd` syntax is `gpasswd [--add|--delete] username group`
> `usermod` syntax is `usermod --gid group username`

## Renaming and Deleting Groups

Rename a group from `developers` to `programmers`:

```
sudo groupmod --new-name programmers developers
# or short form
sudo groupmod -n programmers developers
```

Delete a group when it’s no longer needed:

```
sudo groupdel programmers
```

> [!important]
> **Warning**
>
> If the group is the primary group for any user, `groupdel` will fail with:
>
> ```
> groupdel: cannot remove the primary group of user 'john'
> ```
>
> Change the user’s primary group first:
>
> ```
> sudo usermod --gid john john
> ```
>
> Then run:
>
> ```
> sudo groupdel programmers
> ```

## Quick Reference Table

| Command                             | Description                          |
| ----------------------------------- | ------------------------------------ |
| `sudo useradd <user>`               | Create a new user                    |
| `sudo groupadd <group>`             | Create a new group                   |
| `sudo gpasswd -a <user> <group>`    | Add a user to a secondary group      |
| `sudo gpasswd -d <user> <group>`    | Remove a user from a secondary group |
| `sudo usermod --gid <group> <user>` | Change a user’s primary group        |
| `sudo groupmod -n <new> <old>`      | Rename a group                       |
| `sudo groupdel <group>`             | Delete a group                       |
| `groups <user>`                     | List all groups for a user           |

## Links and References

- [Linux User and Group Management](https://www.linux.com/training-tutorials/user-and-group-management/)
- [gpasswd Manual](https://man7.org/linux/man-pages/man1/gpasswd.1.html)
- [usermod Manual](https://man7.org/linux/man-pages/man8/usermod.8.html)
- [groupmod Manual](https://man7.org/linux/man-pages/man8/groupmod.8.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

Practice these commands on a test environment to master Linux group administration!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/1dc2201d-4c56-41c7-9d80-35239a84607c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/33d61eed-41fe-4e58-9e6d-7f78b08a9d8c)**
>
> Practice lab
