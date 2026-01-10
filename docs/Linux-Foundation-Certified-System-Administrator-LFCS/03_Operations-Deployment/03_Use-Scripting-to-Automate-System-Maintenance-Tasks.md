# Use Scripting to Automate System Maintenance Tasks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Use-Scripting-to-Automate-System-Maintenance-Tasks)

---

## Table of Contents

- Use Scripting to Automate System Maintenance Tasks
  - Creating a Simple Script
  - Enhancing Scripts with Bash Built-ins
  - Archiving Application Data
  - Archive Script with Backup Rotation
  - Understanding Exit Status Codes and Conditional Execution
  - Reviewing Common Script Structures
  - Further Learning
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Use Scripting to Automate System Maintenance Tasks

In this article, we explore how to leverage scripting to automate essential system maintenance tasks on Linux. By utilizing bash scripting, you can log system information, archive important data, and streamline routine maintenance operations.

When you log into a Linux system, you are immediately presented with a command-line interface. After a successful login, the bash shell starts, providing a text-based environment. Bash interprets every command you type, which is why it is also known as a command interpreter or shell.

An interactive bash session typically looks like this:

```
[aaron@kodekcloud]$ date
Mon Dec  6 16:28:09 CST 2021
```

In interactive mode, you type commands, press Enter, and view the results instantly. However, bash can also execute scripts—files containing multiple commands that are executed sequentially.

──────────────────────────────

## Creating a Simple Script

Let's start by creating a basic script called script.sh. Although the ".sh" extension is optional, it helps identify the file as a script when browsing directories.

First, create and open the file for editing:

```
$ touch script.sh
$ vim script.sh
```

Begin your script with the shebang line, which must be the very first line in the file without any leading spaces:

```
#!/bin/bash
```

The shebang (#! followed by the interpreter's full path) specifies that bash should be used to execute the script.

Next, add a comment to document the purpose of the script. Comments start with a "#" and are ignored during execution:

```
#!/bin/bash
# Log the date and time when the script was executed
date >> /tmp/script.log
```

In this snippet, the date command appends the current date and time to /tmp/script.log. This technique can be extended to redirect other outputs and errors.

Now, include another command to log the Linux kernel version from the /proc/version file:

```
#!/bin/bash
# Log the date and time when the script was executed
date >> /tmp/script.log
# Append the current Linux kernel version to the log
cat /proc/version >> /tmp/script.log
```

After saving your changes (for example, by typing :wq in vim), make the script executable:

```
$ chmod +x script.sh
```

To run the script from the current directory, execute:

```
$ ./script.sh
```

Verify the output by checking the log file:

```
$ cat /tmp/script.log
Linux version 5.15.0-94-generic (buildd@lcy02-amd64-096) (gcc …)
```

This script now logs both the date/time and the kernel version, which can be very helpful for maintaining system records. Later, you might consider scheduling this script to run automatically at regular intervals.

──────────────────────────────

## Enhancing Scripts with Bash Built-ins

Bash includes a variety of built-in commands that can make your scripts more intelligent and efficient—these include conditional statements, loops, and more. To see a list of available built-in commands, simply execute:

```
$ help
```

This command displays built-ins such as if, test, alias, and others.

──────────────────────────────

## Archiving Application Data

Next, let’s create a script that archives the contents of the /etc/apt directory. Even if the file does not exist, your editor (like vim) will create it once you save.

Open a new file for editing:

```
$ vim archive-apt.sh
```

Enter the following content to create a tar archive:

```
#!/bin/bash
tar acf /tmp/archive.tar.gz /etc/apt/
```

This script uses tar to create an archive at /tmp/archive.tar.gz that contains the entire /etc/apt directory. After making the script executable and running it, you can inspect the archive contents using:

```
tar -tf /tmp/archive.tar.gz
```

> [!important]
> **Note**
>
> Re-running this script will overwrite the existing archive. Adding backup logic can preserve previous archives.

──────────────────────────────

## Archive Script with Backup Rotation

To avoid unintended data loss, create a script that implements backup rotation for the archive file:

```
$ vim archive-apt-2.sh
```

Add the following content:

```
#!/bin/bash
if test -f /tmp/archive.tar.gz; then
    mv /tmp/archive.tar.gz /tmp/archive.tar.gz.OLD
    tar acf /tmp/archive.tar.gz /etc/apt/
else
    tar acf /tmp/archive.tar.gz /etc/apt/
fi
```

This script checks if the file /tmp/archive.tar.gz exists. If it does, the script renames it to /tmp/archive.tar.gz.OLD before creating a new archive. Otherwise, it simply creates the archive.

Make the script executable and run it:

```
$ chmod +x archive-apt-2.sh
$ ./archive-apt-2.sh
$ ls /tmp
archive.tar.gz
archive.tar.gz.OLD
script.log
```

Now you have both the new archive and a backup available for reference.

──────────────────────────────

## Understanding Exit Status Codes and Conditional Execution

In bash, every command returns an exit status. A zero value usually indicates success, while a non-zero value signals an error or a condition that was not met. For example, the grep command returns zero if a match is found and one if no match is found.

Consider the following script, which checks if the file /etc/default/grub contains the digit '5':

```
#!/bin/bash
if grep -q '5' /etc/default/grub; then
    echo 'Grub has a timeout of 5 seconds.'
else
    echo 'Grub DOES NOT have a timeout of 5 seconds.'
fi
```

Here, the -q option makes grep work in quiet mode, suppressing output and relying solely on its exit status for the conditional check.

──────────────────────────────

## Reviewing Common Script Structures

Many essential system scripts are located in directories such as /etc, /cron.daily, /cron.weekly, and /cron.monthly. These scripts typically follow common conventions: starting with the shebang, using descriptive comments, and employing structured if/else statements.

Below is an example shell script that checks whether anacron was run today and confirms if the system is running on battery power:

```
#!/bin/sh
# Check whether anacron was run today already
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
if [ $online = 0 ] ; then
    exit 0
fi
```

This script exemplifies standard practices in shell scripting, including proper use of the shebang, commenting, and managing conditionals with if/else statements and loops.

──────────────────────────────

## Further Learning

To further enhance your bash scripting skills, consider exploring advanced courses. The [Shell Scripts for Beginners](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners) course on KodeKloud is an excellent resource that provides hands-on labs and practical exercises along with clear theoretical explanations.

![The image is an advertisement for a "Shell Scripts for Beginners" course by KodeKloud, featuring a 3D illustration of a rocket and penguins on a circuit board, alongside a list of course contents.](https://kodekloud.com/kk-media/image/upload/v1752881354/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Use-Scripting-to-Automate-System-Maintenance-Tasks/shell-scripts-beginners-advertisement.jpg)

This concludes our guide on using scripting to automate system maintenance tasks. By mastering these techniques, you can ensure efficient system performance and streamline routine administrative operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/c72b7e37-8a66-4afc-b9c3-36119965215b)**
>
> Watch video content
