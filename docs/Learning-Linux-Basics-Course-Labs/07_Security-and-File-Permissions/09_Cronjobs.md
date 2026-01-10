# Cronjobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Security-and-File-Permissions/Cronjobs)

---

## Table of Contents

- Cronjobs
  - Scheduling a Cron Job
  - Understanding Cron Syntax
  - Listing and Verifying Cron Jobs
  - Watch Video
  - Practice Lab

---

## Content

Learning Linux Basics Course & Labs

Security and File Permissions

# Cronjobs

In this article, you’ll learn how to schedule tasks in Linux using Cron. Cron allows you to automate commands by specifying the date, time, and frequency for execution. Once configured, the cron daemon runs the task without human intervention, making your system maintenance efficient and reliable.

Consider a practical example: Michael needs to run the command `uptime` and redirect its output to the file `/tmp/system-report.txt` every day at 9 p.m. Running the command manually can be tedious, so a Cron job automates this process. The command to append the output is:

```
uptime >> /tmp/system-report.txt
```

## Scheduling a Cron Job

To schedule this task, log in as Michael and edit Michael’s crontab:

```
[michael@caleston-lp01 ~]$ crontab -e
```

This command opens the crontab file in the default editor (typically VI). At the bottom of the file, add the following Cron job configuration:

```
0 21 * * * uptime >> /tmp/system-report.txt
```

The first five fields specify the schedule:

- **Minute (0):** The task runs at the 0th minute.
- **Hour (21):** The task runs at 9 p.m. (21:00 in 24-hour format).
- **Day of Month (\*):** Every day of the month.
- **Month (\*):** Every month.
- **Day of Week (\*):** Every day of the week.

> [!important]
> **Note**
>
> Avoid using `sudo` with the `crontab` command if you intend the task to run as Michael; using `sudo` would schedule the job for the root user.

## Understanding Cron Syntax

Here are some examples to help you better understand the scheduling syntax:

- **Run a job on February 19th at 8:10:**

  ```
  10 8 19 2 *
  ```

- **Run a job on February 19th at 8:10 only if it’s a Monday** (where 1 represents Monday):

  ```
  10 8 19 2 1
  ```

- **Run a job every day at 8:10:**

  ```
  10 8 * * *
  ```

- **Run a job every minute of every hour on all days:**

  ```
  * * * * *
  ```

- **Run a job every two minutes using step values:**

  ```
  */2 * * * *
  ```

For a quick reference, here is the format of a crontab entry:

```
# m h dom mon dow command
0 21 * * * uptime >> /tmp/system-report.txt
```

## Listing and Verifying Cron Jobs

To list all current Cron jobs for Michael, run:

```
[michael@caleston-lp01 ~]$ crontab -l
```

After scheduling, verify that the task ran as expected at 9 p.m. Check the output file using:

```
cat /tmp/system-report.txt
```

Also, you can inspect the system log file (typically located at `/var/log/syslog`). Look for an entry similar to:

```
21:00:00 up 20:15,  1 user,  load average: 0.47, 0.50, 0.52
```

This confirms that the `uptime` command executed as scheduled.

> [!important]
> **Next Steps**
>
> Now it’s your turn! Try creating scheduled tasks using Cron jobs in a practical lab exercise to reinforce your learning.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/2a2c52f5-f793-44a2-8c38-4a6a71d3b2c2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/6c7e1a9b-9ecc-43c5-9dce-8031ab5d3fe2/lesson/9d5c4e43-9bb9-4914-ad40-36e5bec4a543)**
>
> Practice lab
