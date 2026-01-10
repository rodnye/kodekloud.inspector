# Verify completion of scheduled jobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Verify-completion-of-scheduled-jobs)

---

## Table of Contents

- Verify completion of scheduled jobs
  - Table of Contents
  - 1. Verifying cron Jobs
  - 2. Inspecting the System-wide crontab
  - 3. Verifying anacron Jobs
  - 4. Capturing anacron Job Output
  - 5. Verifying at-scheduled Jobs
  - Log Files Reference
  - References
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Verify completion of scheduled jobs

Ensuring your scheduled tasks run as expected is critical for system reliability. CentOS Stream 8 provides three primary schedulers—`cron`, `anacron`, and `at`—all of which log their execution events by default. In this guide, you’ll learn how to confirm job completion, capture outputs, and troubleshoot using system logs and the journal.

---

> [!important]
> **Note**
>
> You may need `sudo` privileges to view system logs (`/var/log/cron`, `/var/log/messages`) or to edit system crontabs (`/etc/crontab`, `/etc/anacrontab`).

## Table of Contents

1.  [Verifying cron Jobs](#verifying-cron-jobs)
2.  [Inspecting the System-wide crontab](#inspecting-the-system-wide-crontab)
3.  [Verifying anacron Jobs](#verifying-anacron-jobs)
4.  [Capturing anacron Job Output](#capturing-anacron-job-output)
5.  [Verifying at-scheduled Jobs](#verifying-at-scheduled-jobs)
6.  [Log Files Reference](#log-files-reference)
7.  [References](#references)

---

## 1\. Verifying cron Jobs

1.  Open your user crontab for editing:

    ```
    crontab -e
    ```

2.  Add two simple `echo` commands to run every minute:

    ```
    * * * * * /bin/echo "Just testing cron"
    * * * * * /bin/echo "Just testing cron again"
    ```

3.  Save and exit. Wait at least one minute, then review the cron log:

    ```
    sudo cat /var/log/cron
    ```

4.  You should see entries similar to:

    ```
    Mar 24 01:05:01 LFCS-CentOS CROND[9203]: (aaron) CMD (/bin/echo "Just testing cron again")
    Mar 24 01:05:01 LFCS-CentOS CROND[9204]: (aaron) CMD (/bin/echo "Just testing cron")
    ```

5.  To filter only executed commands, use `grep`:

    ```
    sudo grep CMD /var/log/cron
    ```

---

## 2\. Inspecting the System-wide crontab

View the system-wide crontab to understand global settings and syntax:

```
cat /etc/crontab
```

Example excerpt:

```
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root


# ┌───────── minute (0 - 59)
# │ ┌─────── hour (0 - 23)
# │ │ ┌───── day of month (1 - 31)
# │ │ │ ┌─── month (1 - 12)
# │ │ │ │ ┌─ day of week (0 - 6)
# * * * * * user-name  command to be executed
```

- `MAILTO` controls where cron sends job output via email.
- Global environment variables apply to all entries.

---

## 3\. Verifying anacron Jobs

Anacron ensures periodic jobs run even if the system was powered off when they were scheduled.

1.  Edit the anacrontab:

    ```
    sudo vi /etc/anacrontab
    ```

2.  Example `/etc/anacrontab` with a custom `test_job`:

    ```
    SHELL=/bin/sh
    PATH=/sbin:/bin:/usr/sbin:/usr/bin
    MAILTO=root
    RANDOM_DELAY=45
    START_HOURS_RANGE=3-22


    #period delay  job-identifier  command
    1       5      cron.daily      nice run-parts /etc/cron.daily
    7      25      cron.weekly     nice run-parts /etc/cron.weekly
    @monthly 45    cron.monthly    nice run-parts /etc/cron.monthly
    1      10      test_job        /bin/echo "Testing anacron"
    ```

3.  Force anacron to execute all jobs immediately:

    ```
    sudo anacron -n
    ```

4.  Review anacron entries in the cron log:

    ```
    sudo grep anacron /var/log/cron
    ```

    Example output:

    ```
    Mar 24 01:01:01 LFCS-CentOS anacron[8903]: Anacron started on 2022-03-24
    Mar 24 01:01:01 LFCS-CentOS anacron[8903]: Will run job `test_job` in 12 min.
    Mar 24 01:13:01 LFCS-CentOS anacron[8903]: Job `test_job` started
    Mar 24 01:13:01 LFCS-CentOS anacron[8903]: Job `test_job` terminated (produced output)
    ```

5.  To view only your custom job entries:

    ```
    sudo grep test_job /var/log/cron
    ```

---

## 4\. Capturing anacron Job Output

By default, anacron logs only “produced output.” To capture the full output in the system journal:

1.  Modify the `test_job` command to use `systemd-cat`:

    ```
    1   10  test_job  /bin/echo "Testing anacron" | systemd-cat --identifier=test_job
    ```

2.  Save changes and rerun jobs:

    ```
    sudo anacron -n -f
    ```

3.  Query the journal for your job identifier:

    ```
    journalctl -e | grep test_job
    ```

    You’ll see both the start/stop messages and the actual command output:

    ```
    Mar 24 01:13:01 LFCS-CentOS test_job[8903]: Testing anacron
    ```

> [!important]
> **Warning**
>
> Your system must be running `systemd` with `journalctl` available. If not, output will not be captured in the journal.

---

## 5\. Verifying at-scheduled Jobs

The `at` daemon handles one-off scheduled tasks.

1.  Schedule a job to run in one minute:

    ```
    at 'now + 1 minute'
    warning: commands will be executed using /bin/sh
    at> echo "My at job produced this output" | systemd-cat --identifier=at_scheduled_backup
    at> <EOT>
    job 5 at Thu Mar 24 01:22:00 2022
    ```

2.  Confirm the `atd` daemon started your job:

    ```
    sudo grep atd /var/log/cron
    ```

    Example:

    ```
    Mar 24 01:22:00 LFCS-CentOS atd[10028]: Starting job 5 (a0000501la3224z) for user 'aaron' (1000)
    ```

3.  View the job output in the journal:

    ```
    journalctl | grep at_scheduled_backup
    ```

    ```
    Mar 24 01:22:00 LFCS-CentOS at_scheduled_backup[10028]: My at job produced this output
    ```

4.  On systems without `journald`, check `/var/log/messages` or `/var/log/syslog` for `at` entries.

---

## Log Files Reference

| Log File             | Purpose                                | Example Command                   |
| -------------------- | -------------------------------------- | --------------------------------- |
| /var/log/cron        | cron & anacron scheduling events       | `sudo grep CMD /var/log/cron`     |
| /var/log/messages    | System-wide messages (including at)    | `sudo grep atd /var/log/messages` |
| Journal (`journald`) | Captured via `systemd-cat` identifiers | \\`journalctl                     |

---

## References

- [cron Manual (man cron)](https://man7.org/linux/man-pages/man8/cron.8.html)
- [anacron Documentation](https://man7.org/linux/man-pages/man5/anacrontab.5.html)
- [at Manual (man at)](https://man7.org/linux/man-pages/man1/at.1.html)
- [systemd-cat](https://www.freedesktop.org/software/systemd/man/systemd-cat.html)
- [journalctl](https://www.freedesktop.org/software/systemd/man/journalctl.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/ba0f4b36-8642-44b2-9c0d-36272ae0319f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/ded19bd0-d9b1-4d02-9b28-401f88d30ad2)**
>
> Practice lab
