# Manage template user environment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/User-and-Group-Management/Manage-template-user-environment)

---

## Table of Contents

- Manage template user environment
  - Add a Custom Welcome Notice
  - Verify Replication with a New User
  - Customize the PATH for an Individual User
  - Apply Default PATH Changes for All New Users
  - Common Files in /etc/skel
  - References
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

User and Group Management

# Manage template user environment

The skeleton directory `/etc/skel` provides the blueprint for every new user account on a Linux system. By placing files here, you ensure they are automatically copied into each new home directory—ideal for default configuration files, welcome notices, or policy reminders.

## Add a Custom Welcome Notice

To display a standard reminder or welcome message for all new users, create a file in `/etc/skel`:

```
sudo vim /etc/skel/README
```

Insert your message, for example:

```
Please don’t run CPU-intensive processes between 8 AM and 10 PM.
```

Save and exit.

> [!important]
> **Note**
>
> Files placed in `/etc/skel` are automatically replicated to every new user's home directory. Use this to distribute common configurations or reminders.

## Verify Replication with a New User

Create a test user (e.g., `trinity`) to confirm the welcome notice appears:

```
sudo adduser trinity
```

List all files, including hidden ones:

```
ls -a /home/trinity
```

Expected output:

```
.               .bash_logout  .profile
..              .bashrc       README
```

Display the notice:

```
cat /home/trinity/README
```

## Customize the PATH for an Individual User

If a specific user needs a custom directory like `/opt/bin` in their `PATH`, update their `~/.bashrc`:

```
sudo vim /home/trinity/.bashrc
```

Find the existing `PATH` line and prepend your directory:

```
PATH="$HOME/.local/bin:$HOME/bin:/opt/bin:$PATH"
```

Save and close. When the user opens a new shell session, `/opt/bin` will be included:

```
echo $PATH
```

Example:

```
/home/trinity/.local/bin:/home/trinity/bin:/opt/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin
```

Now `specialtool` in `/opt/bin` runs directly:

```
specialtool
```

## Apply Default PATH Changes for All New Users

To make the custom `PATH` part of every future account, modify the skeleton `.bashrc`:

```
sudo vim /etc/skel/.bashrc
```

Add your directory:

```
PATH="$HOME/.local/bin:$HOME/bin:/opt/bin:$PATH"
```

Every user created after this change inherits the updated `PATH` automatically.

> [!important]
> **Warning**
>
> Be cautious when editing system-wide skeleton files. Incorrect settings in `/etc/skel` may affect all new user environments.

## Common Files in /etc/skel

| Filename        | Purpose                           |
| --------------- | --------------------------------- |
| .bashrc         | Interactive shell configuration   |
| .profile        | Login shell environment variables |
| .bash\\\_logout | Commands to run at logout         |
| README          | Custom welcome or policy messages |

---

## References

- [man skel - Linux manual](https://man7.org/linux/man-pages/man5/skel.5.html)
- [adduser command](https://linux.die.net/man/8/adduser)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/29581ccd-25ee-4d70-b802-cc1ece802392)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/7e2b6f48-e58c-4d05-82e2-feb0f5f876f5/lesson/fa4bc4e7-76bb-4161-9a55-7803ed67fd89)**
>
> Practice lab
