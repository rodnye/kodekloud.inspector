# Schedule tasks to run at a set date and time - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Deploy-Configure-and-Maintain-Systems/Schedule-tasks-to-run-at-a-set-date-and-time)

---

## Table of Contents

- Schedule tasks to run at a set date and time
  - Cron
  - Anacron
  - At
  - Watch Video
    - Editing a User's Crontab
    - Using Special Cron Directories
    - Scheduling a Job with At
    - Managing At Jobs

---

## Content

Red Hat Certified System Administrator(RHCSA)

Deploy Configure and Maintain Systems

# Schedule tasks to run at a set date and time

In this guide, we explain how to automatically schedule tasks on Linux systems, ensuring processes like database backups run reliably without manual intervention. You can achieve task automation using three main utilities: Cron, Anacron, and At. Each method is designed for different scheduling scenarios, and in this article, we break down their usage step by step.

---

## Cron

Cron is ideal for repetitive tasks that need to run at specific intervals—whether every few minutes, hours, or on selected days. It enables administrators to define the exact times for running automated commands.

The syntax for a cron job might appear challenging at first, but the system-wide crontab file provides excellent guidance. Located at `/etc/crontab`, this file includes comments that explain the format. Remember, instead of modifying the system-wide crontab, each user should use their personal crontab.

An excerpt from `/etc/crontab` shows the scheduling syntax:

```
$ cat /etc/crontab
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root


# Example of job definition:
# --------------------------- minute (0 - 59)
# | ------------------------- hour (0 - 23)
# | | ----------------------- day of month (1 - 31)
# | | | --------------------- month (1 - 12) OR jan,feb,mar,apr ...
# | | | | ------------------- day of week (0 - 6) (Sunday=0 or 7) OR
# sun,mon,tue,wed,thu,fri,sat
# | | | | |
# * * * * * user-name  command to be executed
35 6 * * * root /bin/some_command --some_options
```

In a cron job, the first five fields define the schedule:

- **Minute:** 0–59
- **Hour:** 0–23 (0 indicates midnight, 23 indicates 11 PM)
- **Day of the Month:** 1–31
- **Month:** 1–12 (or short month names such as jan, feb, etc.)
- **Day of the Week:** 0–6 (0 or 7 represents Sunday; short names are also allowed, e.g., mon, tue)

You can modify these fields using special characters:

- An asterisk (\*) represents all possible values.
- A comma (,) separates multiple values.
- A dash (-) specifies a range (e.g., “2-4” means 2, 3, and 4).
- A slash (/) represents step values, for example, “\*/4” runs every 4 units.

For example, to run a job at hours 0, 4, and 8 (every hour from midnight to 8 AM), you can use the format “0-8/4” for the hour field.

### Editing a User's Crontab

Instead of editing the system-wide crontab, you should update your personal crontab. To do so, run:

```
$ crontab -e
```

Before adding commands, always confirm you are using full paths. To locate the full path for the `touch` command:

```
$ which touch
/usr/bin/touch
```

Now, to schedule the `touch` command to run daily at 6:35 A.M. and create a file named `test_passed`, include this line in your personal crontab (note that there is no username for user-specific crontabs):

```
35 6 * * * /usr/bin/touch test_passed
```

Below are additional examples of cron entries:

```
$ crontab -e
35 6 * * * /usr/bin/touch test_passed          # Daily at 6:35 AM
0 3 * * 0 /usr/bin/touch test_passed             # Every Sunday at 3:00 AM
0 3 * * 7 /usr/bin/touch test_passed             # Also every Sunday at 3:00 AM (alternate notation)
0 3 15 * * /usr/bin/touch test_passed            # On the 15th of every month at 3:00 AM
0 3 * * * /usr/bin/touch test_passed             # Every day at 3:00 AM
0 * * * * /usr/bin/touch test_passed             # At the start of every hour
```

To view your current crontab entries:

```
$ crontab -l
35 6 * * * /usr/bin/touch aaron_test
```

For root user's crontab entries, prefix the command with `sudo`:

```
$ sudo crontab -l
0 * * * * /usr/bin/touch root_test
```

To modify or delete another user's crontab (for example, user Jane), use the `-u` option combined with sudo:

```
$ sudo crontab -e -u jane
$ sudo crontab -r -u jane
```

### Using Special Cron Directories

Cron also provides job scheduling using special directories:

- `/etc/cron.daily`
- `/etc/cron.hourly`
- `/etc/cron.weekly`
- `/etc/cron.monthly`

Any executable script placed into one of these directories will run at the associated interval.

For example, to schedule a shell script to run hourly:

1.  Create the script:

    ```
    $ touch shellscript
    ```

2.  Copy it to the hourly directory with root privileges:

    ```
    $ sudo cp shellscript /etc/cron.hourly/
    ```

3.  Set the correct permissions for execution:

    ```
    $ sudo chmod +rx /etc/cron.hourly/shellscript
    ```

4.  To remove this scheduled job, simply delete the script:

    ```
    $ sudo rm /etc/cron.hourly/shellscript
    ```

> [!important]
> **Tip**
>
> Always use full paths in your cron jobs to prevent issues related to the environment's PATH variable.

---

## Anacron

Anacron is built for tasks that need to run on a daily, weekly, or monthly basis—even if the computer was off at the scheduled time. Unlike Cron, Anacron's smallest time unit is one day. This means if a scheduled job is missed (for example, if the computer was off at noon), it will execute as soon as possible after the system restarts.

To schedule a task with Anacron, you need to update the Anacrontab file. Open it with your favorite text editor:

```
$ sudo vim /etc/anacrontab
#period in days  delay in minutes    job-identifier    command
1       5       cron.daily            nice run-parts
7       25      cron.weekly           nice run-parts
@monthly 45     cron.monthly          nice run-parts /etc/cron.monthly
```

Each entry consists of:

- The period (in days) between executions.
- The delay (in minutes) after the system starts before running the job.
- A unique identifier for the job.
- The exact command to run (always use full paths).

For instance, to schedule a job every 3 days with a 10-minute delay:

```
$ sudo vim /etc/anacrontab
#period in days    delay in minutes    job-identifier    command
1                   5                   cron.daily        nice run-parts
7                   25                  cron.weekly       nice run-parts
@monthly            45                  cron.monthly      nice run-parts /etc/cron.monthly
3                   10                  test_job          /usr/bin/touch /root/anacron_created_this
```

> [!important]
> **Important**
>
> If multiple jobs are due at the same time, assign different delays to prevent system overload.

You can also test your Anacrontab syntax with the `-T` option. A lack of error messages indicates a correct configuration.

---

## At

The At command is suited for one-off tasks that need to run at a specific time or after a given interval. When scheduling a job with At, always use the 24-hour format.

### Scheduling a Job with At

To schedule a job at a specific time, follow these steps:

1.  Start by entering the at command:

    ```
    $ at 15:00
    warning: commands will be executed using /bin/sh
    at>
    ```

2.  Enter the command you want to execute (ensure you use the full path):

    ```
    at> /usr/bin/touch file_created_by_at
    ```

3.  Press Enter on an empty line and then press Control-D to save the job.

At can also schedule jobs for specific dates and relative times:

```
$ at 'August 20 2022'
$ at '2:30 August 20 2022'
$ at 'now + 30 minutes'
$ at 'now + 3 hours'
$ at 'now + 3 days'
$ at 'now + 3 weeks'
$ at 'now + 3 months'
```

### Managing At Jobs

To review scheduled At jobs, use:

```
$ atq
20      Wed Nov 17 08:30:00 2021 a aaron
```

The number (e.g., 20) is the job ID. To inspect the contents of a specific job:

```
$ at -c 20
LESSOPEN=||/usr/bin/lesspipe.sh %s; export LESSOPEN
cd /home/aaron || {
        echo 'Execution directory inaccessible' >&2
        exit 1
}
${SHELL:-/bin/sh} << 'marcinDELIMITER1d46213b'
command1
command2
marcinDELIMITER1d46213b
```

To remove a scheduled job, use the job ID with the atrm command:

```
$ atrm 20
```

---

This concludes our comprehensive guide on scheduling tasks in Linux using Cron, Anacron, and At. Apply these techniques to automate your system tasks and enhance your operational efficiency.

For further reading, check out these resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/736506db-a70d-463d-a061-74c768d309b0/lesson/56a5ebd4-db34-4acb-b679-89ac2b3de9b0)**
>
> Watch video content
