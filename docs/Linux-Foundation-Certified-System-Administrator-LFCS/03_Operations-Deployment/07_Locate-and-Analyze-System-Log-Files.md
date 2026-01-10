# Locate and Analyze System Log Files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Locate-and-Analyze-System-Log-Files)

---

## Table of Contents

- Locate and Analyze System Log Files
  - Logging Basics
  - Identifying Specific Log Files
  - Monitoring Logs in Real Time
  - Advanced Log Analysis Using journalctl
  - Viewing User Login History
  - Summary
  - Watch Video
  - Practice Lab
    - Viewing Logs by Command
    - Viewing All Journal Logs
    - Following Journal Logs Live
    - Filtering Logs by Priority
    - Combining Filters with Regex
    - Filtering Logs by Time Range
    - Viewing Logs by Boot Session

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Locate and Analyze System Log Files

In this guide, you will learn how to locate and analyze system log files on a Linux system. Logging is a critical part of managing any Linux server since logs offer detailed insights into system activities—covering events such as user actions, system errors, and service operations. These logs are written as text messages, making them easy to search, read, and troubleshoot.

## Logging Basics

The Linux kernel and many applications generate status messages, errors, and warnings, which are stored in log files. Because multiple programs continuously generate these messages, logging daemons are used to collect and organize information into centralized log files. The most common logging daemon on Linux is rsyslog (Rocket Fast System for Log Processing). By default, rsyslog stores log files in the `/var/log` directory. These plain text files can be easily explored using text-search tools like `grep`.

Below is an example of listing the files in the `/var/log` directory:

```
$ ls /var/log/
alternatives.log     landscape           nginx
apt                  lastlog             private
auth.log             dmesg.0             syslog
auth.log.1           dmesg.1.gz         syslog.1
auth.log.2.gz        dmesg.2.gz         syslog.2.gz
bootstrap.log        dpkg.log           ubuntu-advantage.log
btmp                 faillog            ubuntu-advantage.log.1
btmp.1               installer          unattended-upgrades
cloud-init.log       journal             wtmp
cloud-init-output.log kern.log           kern.log.1
dist-upgrade         kern.log.2.gz      dmesg
```

> [!important]
> **Note**
>
> Most log files under `/var/log` are restricted to the root user. If you need to view these logs as a non-root user, consider switching to root using commands like `su --login` or `sudo --login`.

For example:

```
$ su --login
Password:
```

or

```
$ sudo --login
[sudo] password for aaron:
```

## Identifying Specific Log Files

If you are unsure where specific logs are stored—such as SSH logs that give details about login attempts—you can search all log files for entries related to the SSH daemon (`sshd`):

```
$ grep -r 'ssh' /var/log/
```

The output might look like this:

```
/var/log/auth.log:Mar  3 03:32:37 kodekloud sshd[1653]: Connection closed by authenticating user aaron 10.11.12.1 port 57660
/var/log/auth.log:Mar  3 03:32:39 kodekloud sshd[1655]: Accepted password for aaron from 10.11.12.1 port 52560 ssh2
/var/log/auth.log:Mar  3 03:32:39 kodekloud sshd[1655]: pam_unix(sshd:session): session opened for user aaron(uid=1000) by
grep: /var/log/private: Permission denied
/var/log/installer/installer-journal.txt:Jun 30 12:18:56 ubuntu-server sshd[1409]: Server listening on 0.0.0.0 port 22.
...
```

This indicates that SSH logs are primarily found in `/var/log/auth.log`. You can open this file using an editor like Vim or a pager such as `less` to search for additional SSH-specific details.

Example output from `/var/log/auth.log`:

```
$ less /var/log/auth.log
Mar  3 03:21:24 kodekloud sshd[1501]: Accepted password for aaron from 10.11.12.1 port 56862 ssh2
Mar  3 03:32:34 kodekloud sshd[1653]: Failed password for aaron from 10.11.12.1 port 57660 ssh2
Mar  3 03:32:53 kodekloud sudo:     aaron : TTY=pts/0 ; PWD=/home/aaron; USER=root ; COMMAND=/usr/bin/apt update
Mar  3 03:37:30 kodekloud passwd[2129]: pam_unix(passwd:chauthtok): password changed for aaron
```

Another key log file is `/var/log/syslog`, which includes general system messages:

```
$ less /var/log/syslog
Mar  3 00:00:14 kodekloud systemd[1]: Finished Daily dpkg database backup service.
Mar  3 00:10:14 kodekloud rsyslogd: [origin software="rsyslogd" swVersion="8.2112.0" x-pid="638" x-info="https://www.rsyslog.com"] rsyslog was HUPed
Mar  3 00:17:01 kodekloud CRON[1357]: (root) CMD   (cd / && run-parts --report /etc/cron.hourly)
Mar  3 00:18:52 kodekloud systemd-timesyncd[521]: Network configuration changed, trying to establish connection.
Mar  3 00:33:14 kodekloud systemd[1]: Starting Refresh fwupd metadata and update motd...
```

Older log files often have suffixes such as `.1` or are compressed with `.gz`, while the uncompressed file (for example, `auth.log`) contains the latest entries.

## Monitoring Logs in Real Time

When you need to debug an application or monitor system changes as they happen, you can use the `tail` command with the `-f` option to follow a log file in real time. For example:

```
$ tail -F /var/log/auth.log
Mar  3 03:32:53 kodekloud sudo:     aaron : TTY=pts/0 ; PWD=/home/aaron ; USER=root ; COMMAND=/usr/bin/apt update
Mar  3 03:32:53 kodekloud sudo: pam_unix(sudo:session): session opened for user root (uid=0) by aaron(uid=1000)
Mar  3 03:32:58 kodekloud sudo: pam_unix(sudo:session): session closed for user root
Mar  3 03:37:30 kodekloud passwd[2129]: pam_unix(passwd:chauthtok): password changed for aaron
...
```

Press `Ctrl+C` to exit the follow mode.

To filter the live output for specific entries, such as those related to `sudo`, you can pipe the output through `grep`:

```
$ tail -F /var/log/auth.log | grep "sudo"
```

## Advanced Log Analysis Using journalctl

Modern Linux systems that use systemd employ the journal daemon for structured log management. The `journalctl` command provides powerful options to filter and analyze logs.

### Viewing Logs by Command

To view logs for a specific command, such as `sudo`, first determine its full path:

```
$ which sudo
/usr/bin/sudo
```

Then filter the journal logs associated with it:

```
$ journalctl /usr/bin/sudo
```

This command opens the log output in your default pager (typically `less`), allowing you to navigate and search through the logs. Press `q` to exit the pager.

### Viewing All Journal Logs

To view all entries collected by the journal daemon, run:

```
$ journalctl
```

Jump to the end of the log output by pressing `>` within the pager, or run:

```
$ journalctl -e
```

### Following Journal Logs Live

Just like `tail -f`, you can follow journal logs in real time by using:

```
$ journalctl -f
Mar 03 23:24:43 kodekloud sudo[1077]: pam_unix(sudo:session): session closed for user root
Mar 03 23:28:07 kodekloud systemd[1]: Starting Cleanup of Temporary Directories...
...
```

Press `Ctrl+C` to exit follow mode.

### Filtering Logs by Priority

Use the `-p` option with `journalctl` to filter log output based on priority levels. Available priorities include: emerg, alert, crit, err, warning, notice, info, and debug. For example, to display only error messages:

```
$ journalctl -p err
Feb 08 21:09:19 kodekloud systemd[1]: multipathd.socket: Socket service already active, refusing.
Feb 08 21:09:19 kodekloud systemd[1]: Failed to listen on multipathd control socket.
-- Boot 35a9a34be95e43cb85c097ecdd0afa4d --
Mar 03 00:33:14 kodekloud systemd[1]: Failed to start Refresh fwupd metadata and update motd.
```

> [!important]
> **Tip**
>
> If you forget the priority names, type `journalctl -p` (with a trailing space) and press Tab twice to list all available options.

### Combining Filters with Regex

You can combine filters with regular expressions. For example, to display only log entries with `info` priority where messages start with the letter “b”, use:

```
$ journalctl -p info -g '^b'
Jun 30 15:34:11 kodekloud kernel: Booting paravirtualized kernel on KVM
Jun 30 15:34:11 kodekloud kernel: Built 1 zonelists, mobility grouping on.  Total pages: 1031896
Jun 30 15:34:11 kodekloud kernel: Block layer SCSI generic (bsg) driver version 0.4 loaded (major 243)
Jun 30 15:34:11 kodekloud kernel: blacklist: Loading compiled-in revocation X.509 certificates
Jun 30 15:34:11 kodekloud kernel: btrfs loaded, crc32c=crc32c-intel, zoned=yes, fsverity=yes
```

### Filtering Logs by Time Range

To filter journal logs by time, use the `-S` (since) and `-U` (until) options. For instance, to view logs between 1 a.m. and 2 a.m.:

```
$ journalctl -S 01:00 -U 02:00
Mar 04 01:17:01 kodekloud CRON[1417]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Mar 04 01:17:01 kodekloud CRON[1418]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Mar 04 01:17:01 kodekloud CRON[1417]: pam_unix(cron:session): session closed for user root
Mar 04 01:35:24 kodekloud systemd[1]: Starting Discard unused blocks on filesystems from /etc/fstab...
```

For full date and time filtering, enclose the datetime string in single quotes:

```
$ journalctl -S '2024-03-03 01:00:30'
Mar 03 01:13:06 kodekloud systemd-timesyncd[521]: Network configuration changed, trying to establish connection.
Mar 03 01:13:06 kodekloud systemd-timesyncd[521]: Initial synchronization to time server 185.125.190.56:123 (ntp.ubuntu.com).
...
```

### Viewing Logs by Boot Session

The journal organizes log entries by boot session. To view logs from the current boot, run:

```
$ journalctl -b 0
Mar 03 23:12:59 kodekLOUD kernel: Linux version 5.15.0-97-generic (buildd@lcy02-amd64-033) ...
Mar 03 23:12:59 kodekLOUD kernel: Command line: BOOT_IMAGE=/vmlinuz-5.15.0-97-generic root=...
...
```

For previous boot sessions, use a negative offset (e.g., `-b -2` for two boots ago). Note that some systems might only store logs in memory, so persistent logging may not be available unless enabled. To enable persistent logging, create the directory:

```
$ sudo mkdir /var/log/journal/
```

If you run a journalctl command and see no output, try using `sudo` or check that your user has the appropriate permissions.

## Viewing User Login History

Reviewing user login history is straightforward with the `last` command, which displays recent logins in reverse chronological order:

```
$ last
aaron     pts/0        10.11.12.1    Sun Mar  3 23:15 - 23:15  still logged in
reboot    system boot  5.15.0-97-generic  Sun Mar  3 23:12 - 23:12  still running
aaron     tty1         Sun Mar  3 04:14 - 04:22  (00:08)
...
```

The `lastlog` command provides a summary of the last login times for each user and can include the originating IP address for remote logins (such as SSH):

```
$ lastlog
Username      Port     From             Latest
root          pts/0    **Never logged in**
daemon        pts/0    **Never logged in**
bin           pts/0    **Never logged in**
sys           pts/0    **Never logged in**
tss           pts/0    **Never logged in**
landscape     pts/0    **Never logged in**
fwupd-refresh pts/0    **Never logged in**
usbmux       pts/0    **Never logged in**
aaron        pts/0    10.11.12.1      Sun Mar  3 23:15:19 +0200 2024
lxd          pts/0    **Never logged in**
```

## Summary

In this article, we explored how to locate and analyze system log files in Linux. We examined where logs are stored (mostly under `/var/log`), how to view and filter logs using tools like `grep`, `tail`, and `journalctl`, and how to review user login history with commands such as `last` and `lastlog`. By mastering these tools, you can efficiently diagnose issues, monitor system activities, and ensure that your Linux server is running smoothly.

Happy logging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/afbb2789-685b-4626-9603-40820eed1561)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/022471a1-2837-49e3-83e7-04d2b0b193e2)**
>
> Practice lab
