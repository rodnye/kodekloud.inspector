# Locate and analyze system log files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Locate-and-analyze-system-log-files)

---

## Table of Contents

- Locate and analyze system log files
  - Overview of Linux Logging
  - Listing Log Files in /var/log
  - Inspecting Logs as Root
  - Finding SSH Logs
  - Live Monitoring with tail
  - Querying the systemd Journal with journalctl
  - Filtering Journal Entries
  - Login History with last and lastlog
  - Learn More
  - Watch Video
  - Practice Lab
    - Common Log Files
    - Filter by Command
    - Filter by Service Unit
    - Jump to End or Follow
    - By Priority
    - By Content
    - By Time

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Locate and analyze system log files

Learn how to find, inspect, and monitor Linux system logs to troubleshoot issues, audit user activity, and understand system behavior. This guide covers classic `/var/log` files, real‐time monitoring with `tail`, and querying the systemd Journal with `journalctl`.

## Overview of Linux Logging

Linux servers record almost every event—kernel messages, application errors, authentication attempts, service activity—in plain‐text logs. A logging daemon (typically **rsyslog**) collects these messages and writes them to files under `/var/log`. You can then search, filter, and monitor these logs.

## Listing Log Files in /var/log

To see available log files:

```
ls /var/log/
```

Example output:

```
anaconda           dnf.rpm.log       secure
audit              firewalld         secure-20211026
boot.log           gdm               spooler
...                ...               ...
```

### Common Log Files

| File                   | Description                               |
| ---------------------- | ----------------------------------------- |
| `/var/log/secure`      | SSH authentication, sudo and PAM messages |
| `/var/log/messages`    | General system messages and kernel events |
| `/var/log/boot.log`    | Boot sequence messages                    |
| `/var/log/audit`       | Audit framework records                   |
| `/var/log/dnf.rpm.log` | Package installation and update history   |

## Inspecting Logs as Root

Most files in `/var/log` are only readable by root:

> [!important]
> **Note**
>
> Use `sudo` or `su` to become root before inspecting logs:
>
> ```
> sudo --login
> # or
> su -
> ```

## Finding SSH Logs

To locate where SSH events are recorded, search all files for “ssh”:

```
grep -R "ssh" /var/log/
```

You’ll find entries in `/var/log/secure`. View it with:

```
less /var/log/secure
```

Log format typically includes:

- Date and time
- Hostname
- Process name and ID
- Descriptive message

## Live Monitoring with tail

Watch new log entries in real time with:

```
tail -F /var/log/secure
```

Press `Ctrl+C` to exit follow mode.

## Querying the systemd Journal with journalctl

Modern Linux distros use the systemd Journal. `journalctl` provides powerful querying options.

### Filter by Command

```
which sudo
journalctl /bin/sudo
```

### Filter by Service Unit

```
journalctl -u sshd.service
```

### Jump to End or Follow

| Command         | Description                    |
| --------------- | ------------------------------ |
| `journalctl`    | Show all journal entries       |
| `journalctl -e` | Jump to end of logs            |
| `journalctl -f` | Follow new entries (like tail) |

> [!important]
> **Warning**
>
> By default, systemd Journal logs are stored in memory and cleared on reboot.
> To enable persistent storage:
>
> ```
> sudo mkdir -p /var/log/journal
> sudo systemctl restart systemd-journald
> ```

## Filtering Journal Entries

### By Priority

Show errors and above:

```
journalctl -p err
```

### By Content

Use grep‐style patterns:

```
journalctl -p info -g '^B'
```

### By Time

| Filter                        | Example                                                  |
| ----------------------------- | -------------------------------------------------------- |
| Since a specific time         | `journalctl -S 02:00`                                    |
| Between two timestamps        | `journalctl -S '2021-11-16 01:00' -U '2021-11-16 02:00'` |
| Current or previous boot logs | `journalctl -b 0` / `journalctl -b -1`                   |

## Login History with last and lastlog

- **last**: Shows recent logins, reboots, and shutdowns.

```
last
```

- **lastlog**: Lists the most recent login for each user.

```
lastlog
```

| Command   | Purpose                           |
| --------- | --------------------------------- |
| `last`    | Display recent logins and reboots |
| `lastlog` | Show last login per user          |

## Learn More

- [systemd Journal documentation](https://www.freedesktop.org/software/systemd/man/journalctl.html)
- [rsyslog official site](https://www.rsyslog.com/)
- [Linux Logging Basics](https://linux.die.net/man/5/rsyslog.conf)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/1d65c3eb-1f7a-40a8-b1a1-21c9e38042fa)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/086d6c27-8499-44b4-bd8d-d37164128586)**
>
> Practice lab
