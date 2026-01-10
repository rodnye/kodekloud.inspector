# Manage access to the root account - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Users-and-Groups/Manage-access-to-the-root-account)

---

## Table of Contents

- Manage access to the root account
  - Using sudo for Temporary Root Access
  - Switching to a Full Root Shell
  - Handling Locked Root Accounts
  - Setting or Unlocking the Root Password
  - Locking the Root Account for Added Security
  - Conclusion
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Users and Groups

# Manage access to the root account

In this article, we explore various methods to manage root account access in Linux. We cover temporary administrative privileges using sudo, full root logins, and how to handle scenarios with locked root accounts. This guide will help you understand the best practices for safely granting and restricting root access.

## Using sudo for Temporary Root Access

One common practice is to use sudo to execute individual commands with root privileges. When you prefix a command with sudo, it runs as if the command were executed by the root user.

For example, to list files in the /root directory:

```
$ sudo ls /root/
anaconda-ks.cfg  initial-setup-ks.cfg
```

You can also initiate a full root session using:

```
$ sudo --login    # Same as: $ sudo -i
```

Once the root session is active, you remain logged in as root until you type `logout`.

## Switching to a Full Root Shell

If your account lacks sudo privileges but you know the root password, you can log in directly as the root user. Use any of the following commands to start a full root shell:

- `su -`
- `su -l`
- `su --login` (long form)

All the above commands achieve the same result by switching the session to the root user.

## Handling Locked Root Accounts

In some Linux systems, the root account may be locked by default. When the root account is locked, you cannot log in using a password; however, you can still obtain root privileges via sudo.

> [!important]
> **Note**
>
> When the root account is locked, attempting to log in with `su -` will fail because it requires a valid root password. Always verify that your user account retains sudo privileges before making changes.

## Setting or Unlocking the Root Password

If you want to enable password-based logins for the root account, you have two options:

- Assign a new password if the root account never had one set.
- Unlock the account using the password unlock command if it was previously locked.

Follow these commands to set or unlock the root password:

```
$ sudo --login
$ su -
$ sudo passwd root
$ sudo passwd --unlock root
```

After setting or unlocking the password, you can switch to the root account using `su -` and enter the new password.

## Locking the Root Account for Added Security

If you decide that direct root logins pose a security risk, you can disable them by locking the root account. Locking the account prevents password-based logins without affecting alternative login methods such as SSH keys.

> [!important]
> **Warning**
>
> Before locking the root account, ensure that your user account has sudo privileges. Losing this access could prevent you from making essential system changes.

To lock or unlock the root account, use the following commands:

```
$ sudo --login
$ su -
$ sudo passwd root
$ sudo passwd --unlock root   # Equivalent to: $ sudo passwd -u root
$ su -
$ su -
$ sudo passwd --lock root     # Equivalent to: $ sudo passwd -l root
```

## Conclusion

By understanding and applying these methods, you can effectively manage access to the root account in your Linux environment. Use sudo for quick administrative tasks and carefully manage the root account’s password settings for full root access when necessary. In our next lesson, we will delve into more advanced topics to further enhance your system management skills.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c2d7d0cc-a429-484c-b81b-674ff5fadc7e/lesson/863ec305-3bf5-4071-82c6-9651cde8dd25)**
>
> Watch video content
