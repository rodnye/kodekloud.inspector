# Create Delete and Modify Local User Accounts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Users-and-Groups/Create-Delete-and-Modify-Local-User-Accounts)

---

## Table of Contents

- Create Delete and Modify Local User Accounts
  - Creating a New Local User Account
  - Setting a User Password
  - Deleting a User Account
  - Understanding /etc/passwd
  - Checking the Current User
  - Creating a System Account
  - Modifying User Accounts
  - Managing Password Expiration with chage
  - Watch Video
    - Changing the Home Directory
    - Renaming a User
    - Changing the Login Shell
    - Locking and Unlocking an Account
    - Setting an Account Expiration Date
    - Forcing an Immediate Password Change
    - Setting a Maximum Password Age

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Users and Groups

# Create Delete and Modify Local User Accounts

In this guide, you'll learn how to create, delete, and modify local user accounts on a Linux system. Individual user accounts not only protect personal files using specific permissions but also enable users to tailor their settings. For system administrators, managing separate accounts allows you to assign appropriate privileges based on job roles, thereby reducing the risk of accidental changes and enhancing overall system security.

---

## Creating a New Local User Account

To create a new user account, use the straightforward command "adduser." For example, to create an account for a user named john, run:

```
$ sudo adduser john
```

After executing this command, you will be prompted to enter and confirm a password for john. You may also be asked to provide additional information, such as the full name and phone number. These fields are optional, so simply press Enter to skip them. Finally, confirm the provided information by typing "y."

When the command concludes, the following occurs:

- A new user account named "john" is created.
- A new group named "john" is automatically generated and set as the primary group for the user.
- A home directory is created at `/home/john` to store personal files, directories, and configuration settings.
- The default login shell is set to `/bin/bash`, meaning every time john logs in, this shell is used.
- All files from `/etc/skel` are copied into `/home/john`. To inspect these default files, you can use:

  ```
  $ ls -a /etc/skel
  ```

By default, newly created accounts have no expiration.

> [!important]
> **Note**
>
> If you need more information on the options available with `adduser`, try running `adduser --help`.

---

## Setting a User Password

If a new account hasn't been assigned a password during creation, you can set one using the following command:

```
$ sudo passwd john
```

---

## Deleting a User Account

When it's time to remove a user account, use the `deluser` command. The basic command only removes the account but leaves the home directory intact:

```
$ sudo deluser john
```

If you're certain you no longer need the user's home directory or mail spool, remove them with:

```
$ sudo deluser --remove-home john
```

---

## Understanding /etc/passwd

The `/etc/passwd` file contains essential details about user accounts, including username, user ID (UID), group ID (GID), preferred shell, and home directory. You can view the contents with:

```
$ cat /etc/passwd
john:x:1001:1001::/home/otherdirectory:/bin/othershell
```

In this example:

- The first numeric value, 1001, is the UID for john.
- The second numeric value, 1001, represents the GID for john's primary group.
- The file also displays the home directory and preferred login shell.

By default, `adduser` assigns the next available UID (typically starting at 1000) automatically. If you need to specify a UID manually—for instance, creating a user called smith with UID 1100—use:

```
$ sudo adduser --uid 1100 smith
```

To verify file and directory ownership, run:

```
$ ls -l /home/
```

For numeric ID output rather than names, add the `-n` option to `ls`.

---

## Checking the Current User

To find out which user account you are currently logged in as, use:

```
$ whoami
```

For more detailed account information, including UID, GID, and group memberships, run:

```
$ id
```

Example output:

```
uid=1000(aaron) gid=1000(aaron) groups=1000(aaron),27(sudo),1005(family)
```

---

## Creating a System Account

System accounts are typically reserved for running services and daemons rather than for interactive logins. These accounts often have UIDs lower than 1000. To create a system account (example: sysacc) without a home directory, execute:

```
$ sudo adduser --system --no-create-home sysacc
```

This command ensures that no home directory is created for the system account, aligning with its intended non-interactive role.

> [!important]
> **Tip**
>
> If you're following along in a virtual machine, consider removing these test user accounts after practicing.

Cleanup commands:

```
$ sudo deluser --remove-home john
$ sudo deluser --remove-home smith
```

---

## Modifying User Accounts

The `usermod` command allows you to change various properties of an existing user account, such as the home directory, login name, and login shell.

### Changing the Home Directory

To change the home directory for user "john" and move his existing files, use:

```
$ sudo usermod --home /home/otherdirectory --move-home john
```

The `--move-home` option transfers the contents of the old directory (`/home/john`) to the new location.

### Renaming a User

To change the username from john to jane, run:

```
$ sudo usermod --login jane john
```

Alternatively, you can use the shorthand option:

```
$ sudo usermod -l jane john
```

### Changing the Login Shell

To modify jane's login shell, execute:

```
$ sudo usermod --shell /bin/othershell jane
```

Or use the shorthand option `-s` to achieve the same result.

### Locking and Unlocking an Account

To disable password login for jane, lock her account with:

```
$ sudo usermod --lock jane
```

Later, if you need to unlock the account, run:

```
$ sudo usermod --unlock jane
```

### Setting an Account Expiration Date

To set a specific expiry date for an account—for example, to have jane's account expire on December 10, 2028—use:

```
$ sudo usermod --expiredate 2028-12-10 jane
```

To force immediate account expiration, specify a past date in the format YYYY-MM-DD. To remove the expiration date, use an empty date value (`""`).

---

## Managing Password Expiration with chage

Password expiration ensures that users change their passwords periodically, which is different from account expiration. While account expiration disables login entirely, password expiration forces the user to change their password at the next login.

### Forcing an Immediate Password Change

To make jane's password expire immediately (thus requiring a change at next login), run:

```
$ sudo chage --lastday 0 jane
```

Or use the shorthand version:

```
$ sudo chage -d 0 jane
```

### Setting a Maximum Password Age

To enforce that jane updates her password every 30 days, execute:

```
$ sudo chage --maxdays 30 jane
```

If you prefer the password to never expire, set:

```
$ sudo chage --maxdays -1 jane
```

To review the current password and account aging settings, run:

```
$ sudo chage --list jane
```

---

> [!important]
> **Warning**
>
> Be sure to clean up test accounts after you complete your exercises to maintain a secure system.

_After you have finished testing these commands in your virtual machine, remember to remove the user "jane" (and its associated group, if applicable)._

For additional help with the `adduser` command and its options, you can display the help menu by executing:

```
$ adduser --help
```

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/b36d272b-24e2-44e1-82cb-20a5cfa93635/lesson/238c1c54-9e52-4470-a85b-3d900a2e68a4)**
>
> Watch video content
