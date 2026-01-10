# Schedule tasks to run at a set date and time - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Schedule-tasks-to-run-at-a-set-date-and-time)

---

## Table of Contents

- Schedule tasks to run at a set date and time
  - Scheduling Utilities Overview
  - 1. cron
  - 2. anacron
  - 3. at
  - Links & References
  - Watch Video
    - Field Descriptions
    - Edit Your User Crontab
    - Common cron Examples
    - Managing crontabs
    - /etc/cron.\* Directories
    - Managing at Jobs

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Schedule tasks to run at a set date and time

Automating routine maintenance—like database backups or log rotations—ensures a reliable Linux server. In this guide, you’ll learn how to schedule both recurring and one-off tasks using three core utilities: **cron**, **anacron**, and **at**.

![The image features an icon of an alarm clock and the text "Schedule Tasks To Run At a Set Time" on a dark background.](https://kodekloud.com/kk-media/image/upload/v1752881491/notes-assets/images/Linux-System-Administration-for-Beginners-Schedule-tasks-to-run-at-a-set-date-and-time/alarm-clock-schedule-tasks-icon.jpg)

## Scheduling Utilities Overview

| Utility | Use Case                               | Configuration File or Command |
| ------- | -------------------------------------- | ----------------------------- |
| cron    | Repetitive jobs (minutes, hours, days) | `/etc/crontab` & `crontab -e` |
| anacron | Periodic jobs when system may be off   | `/etc/anacrontab`             |
| at      | One-time, non-recurring tasks          | `at <time>` / `atq` / `atrm`  |

## 1\. cron

`cron` runs tasks on a fixed schedule. The system-wide crontab at `/etc/crontab` also serves as a syntax reference:

```
# /etc/crontab
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root


# ┌──────── minute (0 - 59)
# │ ┌────── hour (0 - 23)
# │ │ ┌──── day of month (1 - 31)
# │ │ │ ┌── month (1 - 12 or jan–dec)
# │ │ │ │ ┌ day of week (0 - 6 or sun–sat)
# │ │ │ │ │
35 6 * * * root /bin/some_command --some_options
```

### Field Descriptions

- **Minute**: `0–59`
- **Hour**: `0–23` (0 = midnight)
- **Day of Month**: `1–31`
- **Month**: `1–12` or `jan`–`dec`
- **Day of Week**: `0–6` (Sunday = 0 or 7) or `sun`–`sat`

Special operators:

- `*` : every valid value
- `,` : value list (e.g., `15,45`)
- `-` : range (e.g., `2-4`)
- `/` : step (e.g., `*/4` for every 4th unit)

> [!important]
> **Best Practice**
>
> Always use full paths in your cron jobs. For example, find `touch` with `which touch` and use `/usr/bin/touch`.

### Edit Your User Crontab

1.  Open the editor:

    ```
    crontab -e
    ```

2.  Add a job (runs daily at 06:35):

    ```
    35 6 * * * /usr/bin/touch ~/test_passed
    ```

### Common cron Examples

- Every Sunday at 03:00:

  ```
  0 3 * * sun /usr/bin/touch weekly_backup
  ```

- On the 15th of each month at 03:00:

  ```
  0 3 15 * * /usr/bin/touch midmonth_task
  ```

- Daily at 03:00:

  ```
  0 3 * * * /usr/bin/touch daily_task
  ```

- Hourly on the hour:

  ```
  0 * * * * /usr/bin/touch hourly_task
  ```

### Managing crontabs

| Action                        | Command                       |
| ----------------------------- | ----------------------------- |
| List your crontab             | `crontab -l`                  |
| List root’s crontab           | `sudo crontab -l`             |
| Edit another user’s crontab   | `sudo crontab -u username -e` |
| Remove your crontab           | `crontab -r`                  |
| Remove another user’s crontab | `sudo crontab -u username -r` |

### `/etc/cron.*` Directories

Place scripts in these directories to run at fixed intervals:

- `/etc/cron.hourly/`
- `/etc/cron.daily/`
- `/etc/cron.weekly/`
- `/etc/cron.monthly/`

Example—install an hourly script:

```
touch myscript.sh
sudo cp myscript.sh /etc/cron.hourly/
sudo chmod +x /etc/cron.hourly/myscript.sh
```

Remove it with:

```
sudo rm /etc/cron.hourly/myscript.sh
```

## 2\. anacron

When a system is off during a scheduled job, `anacron` runs missed tasks at boot. The file `/etc/anacrontab` uses this format:

```
# period days   delay minutes   job-identifier   command
1               5               cron.daily       nice run-parts /etc/cron.daily
7              25               cron.weekly      nice run-parts /etc/cron.weekly
@monthly       45               cron.monthly     nice run-parts /etc/cron.monthly
3              10               test_job         /usr/bin/touch /root/anacron_created_this
```

- **period days**: `1` = daily; `7` = weekly; `@monthly`
- **delay minutes**: wait before running
- **job-identifier**: unique name for logging
- **command**: full path to execute

Example: Runs `test_job` every 3 days, 10 minutes after boot.

Verify your configuration without executing jobs:

```
sudo anacron -T
```

A silent output means the syntax is correct.

## 3\. at

Use `at` for one-off tasks. Schedule in 24-hour or relative formats:

```
# Schedule a one-time job at 15:00 today
at 15:00
# at> /usr/bin/touch file_created_by_at
# at> <Ctrl+D>
```

Supported time formats:

- Absolute: `at '2:30 Aug 20 2022'`
- Relative: `at 'now + 30 minutes'`
- Other: `at 'now + 3 days'`, `at 'now + 3 weeks'`, etc.

> [!important]
> **Warning**
>
> Ensure the `atd` daemon is running; otherwise `at` jobs won’t execute.

### Managing at Jobs

| Action            | Command              |
| ----------------- | -------------------- |
| List pending jobs | `atq`                |
| View job details  | `at -c <job-number>` |
| Remove a job      | `atrm <job-number>`  |

Example—list and remove:

```
atq
atrm 20
```

---

Practice with these tools to automate backups, cleanup tasks, and custom scripts. Proper scheduling keeps your Linux system reliable and maintenance-free.

## Links & References

- [cron Manual Page](https://man7.org/linux/man-pages/man5/crontab.5.html)
- [anacron Documentation](https://man7.org/linux/man-pages/man5/anacrontab.5.html)
- [at Manual Page](https://man7.org/linux/man-pages/man1/at.1.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/4e728479-499c-4899-b48c-ddc5384c394e)**
>
> Watch video content
