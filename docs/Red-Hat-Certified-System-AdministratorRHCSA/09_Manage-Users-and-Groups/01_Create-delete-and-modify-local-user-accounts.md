# Create delete and modify local user accounts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Users-and-Groups/Create-delete-and-modify-local-user-accounts)

---

## Table of Contents

- Create delete and modify local user accounts
  - Creating a New User Account
  - Setting a Password and Deleting an Account
  - Customizing User Account Settings
  - System Accounts
  - Removing Multiple Users
  - Modifying User Accounts
  - Conclusion
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Users and Groups

# Create delete and modify local user accounts

In this article, we will explore how to efficiently create, delete, and modify local user accounts in Linux. Every individual who needs access to a Linux server should have a unique user account. This separation not only safeguards personal files with proper permissions but also allows users to customize their environment and enables administrators to limit privileges, reducing the risk of accidental or malicious errors.

![The image shows a dark interface with a user icon and the text "Manage Local User Accounts" on the left side. The logo "KODEKLOUD" is in the top right corner.](/images/Red-Hat-Certified-System-AdministratorRHCSA-Create-delete-and-modify-local-user-accounts/manage-local-user-accounts-kodekcloud.jpg)

## Creating a New User Account

To create a new user, Linux provides the straightforward `useradd` command. The simplest usage creates a new user (for example, "john") and automatically assigns a primary group with the same name:

```
$ sudo useradd john
```

When you execute this command, the following actions occur:

- A new user ("john") is added to the system.
- A new group ("john") is automatically created as the primary group.
- A home directory is established at `/home/john` for storing personal files, subdirectories, and program settings.
- The default shell is set to `/bin/bash`, ensuring John's session runs Bash upon login.
- All files from `/etc/skel` are copied into this new home directory. To inspect these default files, run:

  ```
  $ ls -a /etc/skel
  .  ..  .bash_logout  .bash_profile  .bashrc
  ```

The operating system performs a set of default actions during account creation. You can review these default settings using:

```
$ useradd --defaults
GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/bash
SKEL=/etc/skel
CREATE_MAIL_SPOOL=yes
```

These settings explain key aspects such as the home directory location, default shell, and group configuration.

> [!important]
> **Note**
>
> Always review the default settings to ensure they align with your organization’s policies before creating user accounts.

## Setting a Password and Deleting an Account

After creating a new account, the user does not have a password by default. To set a password for John, use:

```
$ sudo passwd john
Changing password for user john.
New password:
```

If you later decide that John's account is no longer needed, you can remove it using the `userdel` command. By default, this command removes only the user account (and its associated primary group, if auto-removed) while retaining the user's home directory:

```
$ sudo userdel john
```

If you want to completely remove the account along with the home directory and mail spool, use the `--remove` option (or the shorthand `-r`):

```
$ sudo userdel --remove john
# or equivalently
$ sudo userdel -r john
```

## Customizing User Account Settings

You can modify default settings, such as the shell or home directory, when creating or updating an account. For example, to change a user's home directory immediately after creation, run:

```
$ sudo usermod --home /home/otherdirectory --move-home john
# or using short options:
$ sudo usermod -d /home/otherdirectory -m john
```

The `--move-home` (or `-m`) option ensures that the contents of the old home directory are moved to the new location.

User account details—comprising usernames, user IDs, group IDs, home directories, and login shells—are stored in the `/etc/passwd` file. You can view this information by running:

```
$ cat /etc/passwd
john:x:1001:1001::/home/otherdirectory/:/bin/othershell
```

In the output above:

- The first numeric value (1001) represents John's user ID.
- The second numeric value (1001) is his primary group ID.
- The home directory and the default shell are also listed.

By default, `useradd` assigns the next available numeric ID by incrementing the previous value. For manual assignment of a specific user ID, use:

```
$ sudo useradd --uid 1100 smith
```

This command creates a user "smith" with a user ID of 1100 and automatically creates a primary group "smith" with the same numeric ID. To verify file ownership by username or numeric ID, you can use the `ls -l` command and include the numeric option `-n` if needed.

You can also review the current user's details, including group memberships, with commands like:

```
$ id
uid=1000(aaron) gid=1000(aaron) groups=1000(aaron),10(wheel),1005(family) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023


$ whoami
aaron
```

## System Accounts

Linux also accommodates system accounts designed for programs and daemons. These accounts typically have numeric IDs less than 1000 and do not require a home directory. For example, to create a system account named "sysacc", run:

```
$ sudo useradd --system sysacc
```

System accounts are ideal for running background services such as database servers or web servers that do not need interactive logins.

## Removing Multiple Users

If you need to remove multiple users along with their personal files, the process can be streamlined. For instance:

```
$ sudo userdel -r john
$ sudo userdel -r smith
```

> [!important]
> **Tip**
>
> Use the `useradd --help` option if you ever need a quick reminder of the available options for managing user accounts.

## Modifying User Accounts

To update user account details after creation—such as modifying the home directory, username, or login shell—the `usermod` command is invaluable. For example, to change John's home directory, run:

```
$ sudo usermod --home /home/otherdirectory --move-home john
# or
$ sudo usermod -d /home/otherdirectory -m john
```

To change the username from "john" to "jane", use:

```
$ sudo usermod --login jane john
# or using the shorthand option:
$ sudo usermod -l jane john
```

You can also change a user's login shell by providing the appropriate option with `usermod`.

Locking an account is another common action to disable password-based logins without deleting the account:

```
$ sudo usermod --lock jane
```

To re-enable the account, issue:

```
$ sudo usermod --unlock jane
```

Additionally, setting an account expiration date can control when a user’s account becomes inactive. For example:

```
$ sudo usermod --expiredate 2021-12-10 jane
```

Note that setting an expiration date in the past will immediately disable the account. To remove an expiration date, provide an empty value (i.e., two quotes with nothing between).

Password expiration, which forces a user to change their password upon the next login, is handled separately by the `chage` command. To expire a password immediately, run:

```
$ sudo chage --lastday 0 jane
# or using the short option:
$ sudo chage -d 0 jane
```

The next time Jane logs in, she will be required to choose a new password. To cancel this requirement, set the expiration parameter to `-1`. Additionally, you can enforce password change policies—such as prompting a change every 30 days—with:

```
$ sudo chage --maxdays 30 jane
```

To ensure a password never expires, set the maximum days to `-1`. To review a user's password expiration settings, use:

```
$ sudo chage --list jane
```

## Conclusion

In this article, we have covered the fundamental processes for creating, modifying, and deleting Linux local user accounts. We explored the default settings applied to new accounts, how to set and manage passwords, and the nuances of modifying account details with `usermod` and `chage`. These tools empower system administrators to efficiently manage user access and maintain system security.

Happy system managing, and see you in the next article!

For further reading on managing Linux systems, check out [Linux System Administration Basics](https://www.linux.com/learn/linux-basics/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c2d7d0cc-a429-484c-b81b-674ff5fadc7e/lesson/4f1c0991-c9ae-4777-9238-ea6af9ee6d48)**
>
> Watch video content
