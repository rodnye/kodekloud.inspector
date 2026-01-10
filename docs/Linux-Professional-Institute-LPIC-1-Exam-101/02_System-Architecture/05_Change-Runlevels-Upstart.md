# Change Runlevels Upstart - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/System-Architecture/Change-Runlevels-Upstart)

---

## Table of Contents

- Change Runlevels Upstart
  - Controlling Services with Upstart
  - System Shutdown and Reboot
  - Broadcasting Messages with wall
  - Links and References
  - Watch Video
    - Querying and Switching Runlevels
    - Scheduling a Shutdown
    - SysV vs. systemd Commands

---

## Content

Linux Professional Institute LPIC-1 Exam 101

System Architecture

# Change Runlevels Upstart

In this lesson, you’ll learn how to manage system services with Upstart, switch runlevels, and handle system shutdowns and reboots. We’ll cover core commands, scheduling techniques, and best practices for both Upstart and systemd environments.

## Controlling Services with Upstart

Upstart job definitions reside in `/etc/init`. You can list all available services and their current states (including PIDs) using `initctl list`:

```
$ sudo initctl list
avahi-cups-reload            stop/waiting
avahi-daemon                 start/running, process 1123
mountall-net                 stop/waiting
mountnfs-bootclean.sh        start/running
nmbd                         start/running, process 3085
passwd                       stop/waiting
```

> [!important]
> **Note**
>
> Upstart jobs live under `/etc/init`. To add or modify a job, create or edit its `.conf` file in this directory.

Use these commands to control services:

| Command        | Action             | Example            |
| -------------- | ------------------ | ------------------ |
| start `<job>`  | Start the service  | `sudo start tty6`  |
| stop `<job>`   | Stop the service   | `sudo stop tty6`   |
| status `<job>` | Show state and PID | `sudo status tty6` |

```
$ sudo start tty6
$ sudo status tty6
tty6 start/running, process 3282
$ sudo stop tty6
```

### Querying and Switching Runlevels

Although Upstart doesn’t use `/etc/inittab`, you can still use the legacy commands:

```
$ runlevel        # Display current and previous runlevel
$ sudo telinit 3  # Switch to runlevel 3
```

> Note: Runlevels 0 and 6 correspond to halt and reboot in System V–style init.

## System Shutdown and Reboot

The `shutdown` utility wraps System V runlevel transitions with extra safeguards:

- Broadcasts a warning to all logged-in users
- Blocks new logins during shutdown
- Sends `SIGTERM` then `SIGKILL` to processes
- Transitions to runlevel 0 (halt) or 6 (reboot)

By default, `shutdown` without `-h` or `-r` switches to **single-user mode** (runlevel 1).

### Scheduling a Shutdown

The `<time>` argument is mandatory and accepts:

| Format     | Description           | Example |
| ---------- | --------------------- | ------- |
| `hh:mm`    | Specific 24-hour time | `02:00` |
| `+m`       | Minutes from now      | `+20`   |
| `now`/`+0` | Immediate shutdown    | `now`   |

Optionally include a broadcast message:

```
$ sudo shutdown 02:00
$ sudo shutdown +20 "System maintenance in 20 minutes"
$ sudo shutdown now "Shutdown initiated"
```

> [!important]
> **Warning**
>
> Scheduling or initiating a shutdown requires **root** privileges. Ensure you have the proper permissions before running these commands.

### SysV vs. systemd Commands

On System V–based distributions, `shutdown` handles power actions. On systemd-based systems, use the following equivalents:

| Action    | SysV Command           | systemd Command           |
| --------- | ---------------------- | ------------------------- |
| Reboot    | `sudo shutdown -r now` | `sudo systemctl reboot`   |
| Power off | `sudo shutdown -h now` | `sudo systemctl poweroff` |

For Ctrl+Alt+Delete behavior on SysV, you can limit authorized users in `/etc/shutdown.allow`.

## Broadcasting Messages with `wall`

If you only need to notify users without shutting down:

```
$ sudo wall "System going into maintenance mode in 5 minutes!"
```

## Links and References

- [Upstart Documentation](https://upstart.ubuntu.com/)
- [systemd Man Pages](https://www.freedesktop.org/software/systemd/man/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/55c2d118-3a85-4da1-8a7f-e9f8671cc818/lesson/b47f3753-a80c-4c38-88de-e628e1b0924a)**
>
> Watch video content
