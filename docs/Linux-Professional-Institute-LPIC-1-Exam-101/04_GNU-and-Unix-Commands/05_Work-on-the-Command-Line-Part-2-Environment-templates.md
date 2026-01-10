# Work on the Command Line Part 2 Environment templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Work-on-the-Command-Line-Part-2-Environment-templates)

---

## Table of Contents

- Work on the Command Line Part 2 Environment templates
  - Table of Common Skeleton Files
  - 1. Adding a Default README for All New Users
  - 2. Testing with a New User
  - 3. Setting Up a Custom PATH for One User
  - 4. Customizing the Default .bashrc for All New Users
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Work on the Command Line Part 2 Environment templates

Configuring the `/etc/skel` directory allows you to define default files and environment settings for every new user account. When you create a user with the `-m` flag, all contents of `/etc/skel` are copied into the new home directory—making it easy to enforce policies, defaults, and customizations.

## Table of Common Skeleton Files

| File            | Purpose                              | Description                                                                   |
| --------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| `.bashrc`       | Shell configuration                  | Defines aliases, functions, and environment variables for interactive shells. |
| `.bash_profile` | Login shell startup                  | Exports user-specific environment variables and initializes the login shell.  |
| `README`        | Onboarding notice or policy document | Displays a default message or policy for every new user.                      |

## 1\. Adding a Default README for All New Users

To inform new users about your site policy or housekeeping rules, place a `README` file in `/etc/skel`:

```
sudo vim /etc/skel/README
```

Add your message, for example:

```
Please don’t run CPU-intensive processes between 8 am and 10 pm.
```

Save and exit. Every future user will see this notice in their home directory.

> [!important]
> **Note**
>
> Files in `/etc/skel` are only applied when a home directory is created (e.g., via `useradd -m`). Existing users are unaffected.

## 2\. Testing with a New User

Create a new user named **trinity** and verify that the `README` was copied:

```
sudo useradd -m trinity
ls -a /home/trinity
# .  ..  .bash_logout  .bash_profile  .bashrc  README
```

Confirm the contents:

```
cat /home/trinity/README
# Please don’t run CPU-intensive processes between 8 am and 10 pm.
```

## 3\. Setting Up a Custom `PATH` for One User

If **trinity** needs access to tools in `/opt/bin`, prepend that directory to her `PATH`. Edit her `.bashrc`:

```
sudo vim /home/trinity/.bashrc
```

Add or modify the `PATH` line:

```
PATH="$HOME/.local/bin:$HOME/bin:/opt/bin:$PATH"
```

Save and exit. For immediate effect, have Trinity run:

```
source ~/.bashrc
echo $PATH
# /home/trinity/.local/bin:/home/trinity/bin:/opt/bin:/usr/local/bin:/usr/bin:...
specialtool  # runs /opt/bin/specialtool
```

> [!important]
> **Note**
>
> Always ensure each entry is separated by a colon (`:`) and that `$PATH` remains at the end.

## 4\. Customizing the Default `.bashrc` for All New Users

To apply the same `PATH` change (or any other environment tweaks) site-wide, modify the skeleton `.bashrc`:

```
sudo vim /etc/skel/.bashrc
```

Insert your custom lines—such as the `PATH` definition—then save. Now, every new account created on this system will inherit these settings automatically.

> [!important]
> **Warning**
>
> Be careful when editing `/etc/skel/.bashrc`. Errors in this file may prevent newly created users from logging in correctly.

---

Now you’re ready to manage default user environments using `/etc/skel`. Practice by adding more config files or policies to streamline onboarding for every new account!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/6b11f23a-a1bc-412e-b7c3-74020bc89bea)**
>
> Watch video content
