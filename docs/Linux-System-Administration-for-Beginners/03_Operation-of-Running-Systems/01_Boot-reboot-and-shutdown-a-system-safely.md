# Boot reboot and shutdown a system safely - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Boot-reboot-and-shutdown-a-system-safely)

---

## Table of Contents

- Boot reboot and shutdown a system safely
  - 1. Managing System States with systemctl
  - 2. Forcing a Reboot or Shutdown
  - 3. Scheduling with shutdown
  - 4. Notifying Logged-In Users
  - References and Further Reading
  - Watch Video
    - Reboot
    - Power Off (Shutdown)
    - Schedule by Clock Time
    - Schedule by Delay
    - Reboot with shutdown

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Boot reboot and shutdown a system safely

Managing a Linux system’s power state correctly ensures data integrity and gives users time to save work before the machine goes offline. In this guide, you’ll learn how to:

- Reboot or power off immediately with `systemctl`
- Force a reset when the system is unresponsive
- Schedule shutdowns or reboots with `shutdown`
- Notify logged-in users in advance

---

## 1\. Managing System States with systemctl

Most modern Linux distributions use systemd, and `systemctl` is the primary tool to control power states.

> [!important]
> **Note**
>
> All `systemctl` commands require root privileges. Prepend `sudo` if you’re not running as root.

| Action        | As Root                | As Non-Root User            |
| ------------- | ---------------------- | --------------------------- |
| Reboot now    | `# systemctl reboot`   | `$ sudo systemctl reboot`   |
| Power off now | `# systemctl poweroff` | `$ sudo systemctl poweroff` |

### Reboot

```
# systemctl reboot
```

```
$ sudo systemctl reboot
[sudo] password for aaron:
```

### Power Off (Shutdown)

```
# systemctl poweroff
```

```
$ sudo systemctl poweroff
[sudo] password for aaron:
```

For more options, refer to the official [systemctl documentation](https://www.freedesktop.org/software/systemd/man/systemctl.html).

---

## 2\. Forcing a Reboot or Shutdown

If your system is hung or won’t shut down cleanly, you can force the operation. Use these commands sparingly—they bypass the normal shutdown sequence and risk data loss.

> [!important]
> **Warning**
>
> Forced shutdowns do not allow applications to close gracefully. Always try a standard reboot first.

| Severity        | Command                                                                              |
| --------------- | ------------------------------------------------------------------------------------ |
| Single force    | `sudo systemctl reboot --force`<br>`sudo systemctl poweroff --force`                 |
| Immediate reset | `sudo systemctl reboot --force --force`<br>`sudo systemctl poweroff --force --force` |

---

## 3\. Scheduling with shutdown

The `shutdown` utility lets you schedule a shutdown or reboot and broadcast a warning message to all users.

| Task                       | Command Syntax                     |
| -------------------------- | ---------------------------------- |
| Shutdown at specific time  | `sudo shutdown HH:MM`              |
| Shutdown after a delay     | `sudo shutdown +<minutes>`         |
| Reboot instead of shutdown | Add `-r`: `sudo shutdown -r HH:MM` |
| Reboot after a delay       | `sudo shutdown -r +<minutes>`      |

### Schedule by Clock Time

```
$ sudo shutdown 02:00
```

(Times use 24-hour format, e.g., `0000`–`2359`.)

### Schedule by Delay

```
$ sudo shutdown +15
```

(The system will shut down in 15 minutes.)

### Reboot with shutdown

```
$ sudo shutdown -r 02:00
$ sudo shutdown -r +15
```

---

## 4\. Notifying Logged-In Users

To give users advance notice, append a quoted message at the end of the `shutdown` command:

```
$ sudo shutdown -r +5 'System maintenance: scheduled reboot in 5 minutes'
```

This message appears on all connected terminals, allowing users to save work before the system goes down.

---

## References and Further Reading

- [systemctl Manual](https://www.freedesktop.org/software/systemd/man/systemctl.html)
- [shutdown(8) Manual](https://man7.org/linux/man-pages/man8/shutdown.8.html)
- [Linux System Administration Basics](https://linuxhandbook.com/learn-linux/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/cfb03e11-b5b6-46a5-a71d-04714a0435c6)**
>
> Watch video content
