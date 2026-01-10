# Use scripting to automate system maintenance tasks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Create-Simple-Shell-Scripts/Use-scripting-to-automate-system-maintenance-tasks)

---

## Table of Contents

- Use scripting to automate system maintenance tasks
  - Understanding Bash and Script Basics
  - Enhancing Your Script with Bash Built-ins
  - Improving the Backup with Conditional Logic
  - Using Exit Status in Conditional Statements
  - Additional Scripting Concepts
  - Watch Video
    - Creating Your First Script
    - Setting Permissions and Running Your Script
    - Archiving a Directory

---

## Content

Red Hat Certified System Administrator(RHCSA)

Create Simple Shell Scripts

# Use scripting to automate system maintenance tasks

In this guide, we explore how Bash scripting can automate routine system maintenance tasks on a CentOS operating system. When you log into CentOS, you are presented with a shell prompt where the Bash command interpreter runs. Although you can enter individual commands interactively, Bash scripts allow you to execute a series of commands stored in a file sequentially.

## Understanding Bash and Script Basics

After a successful login, Bash starts and awaits your commands. Every command you type is interpreted and executed. Instead of entering commands one by one, you can place them in a script file. A script is simply a file with multiple commands executed in order from top to bottom.

For example, running the following command interactively prints the current date and time:

```
$ date
Mon Dec  6 16:28:09 CST 2021
```

To better understand the script workflow, let’s create a simple script.

### Creating Your First Script

1.  Create a new file called "script.sh". (The `.sh` extension is optional but helpful for identification.)
2.  Open "script.sh" in your favorite text editor, and add the following content. The first line must include the shebang:

    ```
    #!/bin/bash
    ```

    This tells the system to use `/bin/bash` as the interpreter. Comments in the script, indicated by a hash sign (#), describe the functionality but are not executed.

3.  Append a command to log the current date and time to a file:

    ```
    #!/bin/bash
    # Log the date and time the script was last executed
    date >> /tmp/script.log
    ```

You can run commands in scripts as you would on the shell prompt, including redirection and piping. Now, add another command to append the contents of `/proc/version` (which shows the Linux kernel details) to the same log file. The complete content of the script now looks like this:

```
#!/bin/bash
# Log the date and time the script was last executed
date >> /tmp/script.log
cat /proc/version >> /tmp/script.log
```

### Setting Permissions and Running Your Script

To create and edit the script using the command line:

```
$ touch script.sh
$ vim script.sh
```

After saving your file, make it executable by setting the proper permissions. For instance:

```
$ chmod u+x script.sh
```

Alternatively, to allow anyone to execute the script:

```
$ chmod +x script.sh
```

You can run the script by either specifying its full path:

```
$ /home/aaron/script.sh
```

or running it from its directory:

```
$ ./script.sh
```

After execution, check the contents of `/tmp/script.log`:

```
$ cat /tmp/script.log
Mon Dec  6 17:06:16 CST 2021
Linux version 4.18.0-348.2.1.el8_5.x86_64
(mockbuild@kbuilder.bsys.centos.org) (gcc version 8.5.0 20210514 (Red Hat 8.5.0-4) (GCC)) #1 SMP Tue Nov 16 14:42:35 UTC 2021
```

This log can be useful for diagnosing issues by correlating system behavior with specific kernel versions.

## Enhancing Your Script with Bash Built-ins

Bash built-ins can add powerful logic to your scripts. To view available built-ins, type:

```
$ help
```

Two fundamental built-ins are `if` and `test`. In the next example, we archive the contents of the `/etc/dnf` directory and later use conditional logic to manage backups.

### Archiving a Directory

Create a script called "archive-dnf.sh". Use your favorite editor:

```
$ vim archive-dnf.sh
```

Add the following content with the shebang and a command using `tar` to archive the contents:

```
#!/bin/bash
tar acf /tmp/archive.tar.gz /etc/dnf
```

Save the file, make it executable, and run it:

```
$ chmod +x archive-dnf.sh
$ ./archive-dnf.sh
```

Verify that the archive exists:

```
$ ls /tmp
archive.tar.gz
```

## Improving the Backup with Conditional Logic

Imagine a scenario where files in `/etc/dnf` are accidentally deleted. Running the backup script again would overwrite the existing (and potentially good) backup. To prevent this, modify your script to check if an archive exists. If it does, rename it to `/tmp/archive.tar.gz.OLD` before creating a new archive.

Create a new script named "archive-dnf-2.sh":

```
$ vim archive-dnf-2.sh
```

Enter the following content:

```
#!/bin/bash
if test -f /tmp/archive.tar.gz; then
    mv /tmp/archive.tar.gz /tmp/archive.tar.gz.OLD
    tar acf /tmp/archive.tar.gz /etc/dnf/
else
    tar acf /tmp/archive.tar.gz /etc/dnf/
fi
```

> [!important]
> **Note**
>
> The `if test -f` construct checks whether the archive file exists as a regular file. If it does, the old archive is renamed before creating a new one.

Make the script executable and run it:

```
$ chmod +x archive-dnf-2.sh
$ ./archive-dnf-2.sh
```

List the `/tmp` directory to confirm that both the new archive and its backup exist:

```
$ ls /tmp
archive.tar.gz
archive.tar.gz.OLD
script.log
```

## Using Exit Status in Conditional Statements

Each command returns an exit status code after execution, where `0` indicates success and any non-zero value signals an error. For example, `grep` returns `0` if it finds a match, and `1` if it does not.

Consider the following script that checks if the file `/etc/default/grub` contains the number `5`:

```
#!/bin/bash
if grep -q '5' /etc/default/grub; then
    echo 'Grub has timeout of 5 seconds.'
else
    echo 'Grub DOES NOT have a timeout of 5 seconds.'
fi
```

Here, the `-q` flag makes `grep` run quietly. Save this script as "check-grub-timeout.sh", make it executable, and run it:

```
$ vim check-grub-timeout.sh
$ chmod +x check-grub-timeout.sh
$ ./check-grub-timeout.sh
Grub has a timeout of 5 seconds.
```

## Additional Scripting Concepts

These examples illustrate basic Bash scripting techniques using built-in commands. As you progress, you can integrate more advanced features such as loops (`for`, `while`), functions, and variable handling to create more robust scripts.

For a quick scripting refresher, consider reviewing the contents of the `/etc/cron.d/hourly/0anacron` file. This file serves as a practical cheat sheet covering essential scripting conventions, including the shebang and conditional syntax:

```
#!/bin/sh
# Check whether @anacron was run today already
if test -r /var/spool/anacron/cron.daily; then
    day=`cat /var/spool/anacron/cron.daily`
fi
if [ `date +%Y%m%d` = "$day" ]; then
    exit 0
fi


# Do not run jobs when on battery power
online=1
for psupply in AC ADP0 ; do
    sysfile="/sys/class/power_supply/$psupply/online"
    if [ -f $sysfile ] ; then
        if [ `cat $sysfile 2>/dev/null` = 1 ]; then
            online=1
            break
        else
            online=0
        fi
    fi
done
if [ $online = 0 ]; then
    exit 0
fi
```

For more detailed tutorials and hands-on practice, explore the [Shell Scripts for Beginners](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners) course on KodeKloud.

![The image is an advertisement for a "Shell Scripts for Beginners" course by KodeKloud, featuring a rocket and penguins on a digital platform, alongside a list of course contents.](https://kodekloud.com/kk-media/image/upload/v1752883566/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Use-scripting-to-automate-system-maintenance-tasks/shell-scripts-beginners-advertisement.jpg)

This article is now complete. When you are ready for the next lesson, we look forward to seeing you there.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/9225d80c-3f9d-4e8e-9135-febe7ca37af2/lesson/fd57ea10-0853-41be-aa77-d02578c7f8e1)**
>
> Watch video content
