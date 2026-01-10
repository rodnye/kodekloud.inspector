# Diagnose and manage processes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Operate-Running-Systems/Diagnose-and-manage-processes)

---

## Table of Contents

- Diagnose and manage processes
  - Process Basics
  - The ps Command
  - Monitoring Processes with top
  - Filtering and Searching Processes
  - Process Niceness and Priority
  - Sending Signals to Processes
  - Job Control: Backgrounding, Foregrounding, and Pausing
  - Listing Open Files with lsof
  - Exploring Process Relationships
  - Process Management Summary
  - Watch Video
    - Viewing a Specific Process with ps
    - Searching by Process Name with pgrep
    - Setting Nice at Launch
    - Changing Niceness with renice
    - Example: Restarting the SSH Service
    - Using pkill
    - Suspending and Resuming Processes
    - Running Processes in the Background

---

## Content

Red Hat Certified System Administrator(RHCSA)

Operate Running Systems

# Diagnose and manage processes

Welcome to this comprehensive guide on diagnosing and managing Linux processes. In this article, you will learn how processes are created, monitored, and terminated on Linux systems. We will explain key commands such as ls, ps, top, nice, renice, kill, and lsof, while also demonstrating how to control processes using backgrounding, foregrounding, and job control.

---

## Process Basics

Every time you launch a program, it runs as a process until it completes its task or is terminated. For instance, when you run the command `ls`, a temporary process is created to display the directory's contents and then it ends.

```
[aaron@LFCS-CentOS ~]$ ls
absolute_picture_shortcut
all_output.txt
archive.tar
archive.zip
Desktop
Documents
Downloads
file1
file1.gz
file2
file2.bz2
file3
file3.xz
fstab_shortcut
Music
nomachine_7.7.4_1_x86_64.rpm
Pictures
Public
relative_picture_shortcut
script.sh
shortcut_to_directory
Templates
testfile
Videos
[aaron@LFCS-CentOS ~]$
```

Once the `ls` command finishes listing the directory, its corresponding process terminates.

---

## The ps Command

The `ps` command is an essential tool for inspecting processes on a Linux system. However, it can be a bit confusing because it supports two syntax styles: Unix-style (options prefixed with a dash) and BSD-style (without a dash). For example, `ps -a` differs from `ps a` as each produces distinct outputs. For further details, refer to the manual page using:

```
man ps
```

By default, running `ps` without options displays processes associated with the current terminal session:

```
[aaron@LFCS-CentOS ~]$ ps
  PID TTY          TIME CMD
 7726 pts/0    00:00:00 bash
 7796 pts/0    00:00:00 ps
[aaron@LFCS-CentOS ~]$
```

To view all processes running on the system, combine options `a`, `x`, and `u`:

```
[aaron@LFCS-CentOS ~]$ ps aux
```

The output includes several useful columns:

- **USER:** The user who initiated the process.
- **PID:** The Process ID.
- **%CPU:** The percentage of one CPU core's capacity consumed.
- **%MEM:** The percentage of total system memory used.
- **START:** The time the process started.
- **TIME:** CPU time consumed by the process.
- **COMMAND:** The command, along with its arguments, that started the process.

Kernel processes are enclosed in square brackets (e.g., `[kthreadd]`), while user-space processes are not.

---

## Monitoring Processes with top

Unlike `ps`, which offers a snapshot view, the `top` command provides continuous, real-time monitoring of processes. It dynamically orders processes based on CPU usage, offering an interactive overview:

```
top - 00:27:42 up 35 min,  1 user,  load average: 0.02, 0.04, 0.03
Tasks: 236 total,   1 running, 235 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy, 100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3731.4 total,   1588.9 free,   915.5 used,  1227.6 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.  2554.1 avail Mem
 PID USER       PR  NI    VIRT   RES   SHR S  %CPU %MEM     TIME+ COMMAND
 6601 aaron     20   0 3142460 185096 104268 S   6.2  4.8   0:06.60 gnome-s+
    1 root      20   0   241296  14000   8912 S   0.0  0.4   0:01.26 systemd
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kthreadd
    ...
```

Use the arrow keys or the page up/down keys to scroll through the list. To exit the `top` utility, simply press the `Q` key.

---

## Filtering and Searching Processes

### Viewing a Specific Process with ps

If you need details about a specific process, such as the one with PID 1, use the following:

```
[aaron@LFCS-CentOS ~]$ ps 1
  PID TTY          STAT      TIME COMMAND
    1 ?            Ss        0:01 /usr/lib/systemd/systemd --switched-root --system -
[aaron@LFCS-CentOS ~]$
```

For a user-oriented display or to list processes belonging to a particular user (for example, "aaron"), run:

```
ps u -U aaron
```

### Searching by Process Name with pgrep

The `pgrep` command allows you to search for processes by name. For example, to list processes that include “syslog” in their name, along with their full command details:

```
[aaron@LFCS-CentOS ~]$ pgrep -a syslog
1455 /usr/sbin/rsyslogd -n
```

---

## Process Niceness and Priority

Linux employs a "niceness" value ranging from -20 to +19 to determine process scheduling priority—a lower niceness value equates to a higher priority. For instance, a process with a niceness of -20 can preempt one with a value of 19 when both require CPU time.

### Setting Nice at Launch

Launch a process with a specified niceness using the `nice` command. For example, to start a new Bash shell with a niceness of 11:

```
[aaron@LFCS-CentOS ~]$ nice -n 11 bash
[aaron@LFCS-CentOS ~]$
```

You can verify the niceness value using the BSD long format with `ps -l`:

```
[aaron@LFCS-CentOS ~]$ ps l
```

> [!important]
> **Note**
>
> Processes inherit the niceness value of their parent by default.

A regular user can only increase the niceness value (i.e., lower the priority) to values between 0 and 19. To assign a negative niceness (i.e., higher priority), root privileges are necessary.

For example, attempting to start Bash with a higher priority as a non-root user produces:

```
[aaron@LFCS-CentOS ~]$ nice -n -12 bash
nice: cannot set niceness: Permission denied
```

Using `sudo` allows for a negative nice value:

```
[aaron@LFCS-CentOS ~]$ sudo nice -n -12 bash
[sudo] password for aaron:
```

When you check with `ps`, the Bash process will show a negative niceness value.

### Changing Niceness with renice

To adjust the niceness of a running process, use the `renice` command. For instance, if a Bash shell running as user "aaron" with PID 8209 has a niceness of 12, you can change it to 7 as follows:

```
[aaron@LFCS-CentOS ~]$ renice 7 8209
renice: failed to set priority for 8209 (process ID): Permission denied
[aaron@LFCS-CentOS ~]$ sudo renice 7 8209
8209 (process ID) old priority 12, new priority 7
```

> [!important]
> **Warning**
>
> As a regular user, you can only decrease the priority once per session. Further priority reductions require root privileges.

---

## Sending Signals to Processes

Linux processes can receive signals to prompt various actions, such as termination or pause. Two critical signals, SIGSTOP and SIGKILL, cannot be ignored or handled by the process:

- **SIGSTOP:** Temporarily pauses the process until a SIGCONT signal is received.
- **SIGKILL:** Immediately terminates the process without cleanup.

To view a list of signals, use:

```
[aaron@LFCS-CentOS ~]$ kill -L
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL
 5) SIGTRAP     6) SIGABRT      7) SIGBUS       8) SIGFPE
 9) SIGKILL    10) SIGUSR1     11) SIGSEGV     12) SIGUSR2
13) SIGCHLD    14) SIGALRM     15) SIGTERM     16) SIGCONT
17) SIGSTOP    18) SIGTSTP     19) SIGXCPU     20) SIGXFSZ
21) SIGPROF    22) SIGWINCH    23) SIGURG      24) SIGIO
25) SIGPWR     26) SIGVTALRM   27) SIGRTMIN    28) SIGRTMIN+1
29) SIGRTMIN+2 30) SIGRTMIN+3  31) SIGRTMIN+4  32) SIGRTMIN+5
33) SIGRTMIN+6 34) SIGRTMIN+7  35) SIGRTMIN+8  36) SIGRTMIN+9
37) SIGRTMIN+10 38) SIGRTMIN+11 39) SIGRTMIN+12 40) SIGRTMIN+13
41) SIGRTMIN+14 42) SIGRTMIN+15 43) SIGRTMAX-1  44) SIGRTMAX-2
45) SIGRTMAX-3  46) SIGRTMAX-4  47) SIGRTMAX-5  48) SIGRTMAX-6
49) SIGRTMAX-7  50) SIGRTMAX-8  51) SIGRTMAX-9  52) SIGRTMAX-10
53) SIGRTMAX-11 54) SIGRTMAX-12 55) SIGRTMAX-13 56) SIGRTMAX-14
57) SIGRTMAX-15 58) SIGRTMAX-16 59) SIGRTMAX-17 60) SIGRTMAX-18
61) SIGRTMAX-19 62) SIGRTMAX-20 63) SIGRTMAX-21 64) SIGRTMAX-22
[aaron@LFCS-CentOS ~]$
```

You can specify a signal by its name (with or without the SIG prefix) when sending it to a process with the `kill` command. For example, to send a SIGHUP (hang-up) signal:

```
[aaron@LFCS-CentOS ~]$ kill -SIGHUP <PID>
```

If no signal is explicitly stated, SIGTERM (termination) is sent by default.

### Example: Restarting the SSH Service

Start by checking the status of the SSH daemon:

```
[aaron@LFCS-CentOS ~]$ systemctl status sshd.service
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2022-03-23 23:52:10 CDT; 50min ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 1147 (sshd)
    Tasks: 1 (limit: 23513)
   Memory: 2.2M
   CGroup: /system.slice/sshd.service
           └─1147 /usr/sbin/sshd -D -oCiphers=aes256-gcm@openssh.com,chacha20-poly1305


Mar 23 23:52:10 LFCS-CentOS systemd[1]: Starting OpenSSH server daemon...
Mar 23 23:52:10 LFCS-CentOS sshd[1147]: Server listening on 0.0.0.0 port 22.
Mar 23 23:52:10 LFCS-CentOS sshd[1147]: Server listening on :: port 22.
Mar 23 23:52:10 LFCS-CentOS systemd[1]: Started OpenSSH server daemon.
[aaron@LFCS-CentOS ~]$
```

Attempting to send a SIGHUP to process 1147 without root privileges will fail:

```
[aaron@LFCS-CentOS ~]$ kill -SIGHUP 1147
bash: kill: (1147) - Operation not permitted
```

Using `sudo` resolves the permission issue:

```
[aaron@LFCS-CentOS ~]$ sudo kill -SIGHUP 1147
```

When the SSH daemon receives the hang-up signal, it is programmed to restart automatically.

### Using pkill

The `pkill` command allows you to send signals to all processes that match a specified name. For example, to send SIGKILL to all processes with "bash" in their name, first view the matching processes with:

```
[aaron@LFCS-CentOS ~]$ pgrep -a bash
7726 bash
8062 bash
8098 bash
```

Then, if appropriate, execute:

```
[aaron@LFCS-CentOS ~]$ pkill -SIGKILL bash
```

> [!important]
> **Warning**
>
> Be cautious when terminating processes. Ending your shell (bash) could cause you to lose your terminal session.

---

## Job Control: Backgrounding, Foregrounding, and Pausing

Linux provides robust job control mechanisms to allow you to pause, resume, or run processes in the background.

### Suspending and Resuming Processes

For long-running commands like `sleep 180`, you might want to interrupt without completely terminating the process. Pressing `Ctrl + C` aborts a running process. However, for interactive applications like vim, you can suspend it with `Ctrl + Z`:

```
[aaron@LFCS-CentOS ~]$ vim /etc/hostname
[1]+  Stopped                 vim /etc/hostname
[aaron@LFCS-CentOS ~]$
```

To bring the process back to the foreground, execute:

```
[aaron@LFCS-CentOS ~]$ fg
vim /etc/hostname
```

### Running Processes in the Background

Appending an ampersand (`&`) to a command runs it in the background, allowing you to continue using the terminal:

```
[aaron@LFCS-CentOS ~]$ sleep 300 &
[1] 8482
[aaron@LFCS-CentOS ~]$
```

Use the `jobs` command to list active jobs:

```
[aaron@LFCS-CentOS ~]$ jobs
[1]+  Running                 sleep 300 &
```

To move a background job to the foreground, specify its job number:

```
[aaron@LFCS-CentOS ~]$ fg 1
```

If you accidentally bring a long-running process to the foreground, you can pause and then resume it in the background by pressing `Ctrl + Z` followed by:

```
[aaron@LFCS-CentOS ~]$ bg 1
```

---

## Listing Open Files with lsof

The `lsof` command (short for "list open files") provides a list of files and directories in use by a process. For example, to list files open by your Bash shell (suppose its PID is 8401):

```
[aaron@LFCS-CentOS ~]$ pgrep -a bash
8401 bash
[aaron@LFCS-CentOS ~]$ lsof -p 8401
bash    8401 aaron  mem REG  253,0   286      34275178 /usr/lib/locale/en_US.UTF-8/...
bash    8401 aaron  mem REG  253,0    57      34201565 /usr/lib/locale/en_US.UTF-8/...
...
```

If you attempt to view open files for a process owned by root, using `sudo` might be required:

```
[aaron@LFCS-CentOS ~]$ lsof -p 1
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
systemd     1 root   cwd    unknown       /proc/1/cwd (readlink: Permission denied)
...
[aaron@LFCS-CentOS ~]$ sudo lsof -p 1
```

Similarly, to identify which process is writing to `/var/log/messages`:

```
[aaron@LFCS-CentOS ~]$ sudo lsof /var/log/messages
COMMAND     PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
rsyslogd   1455 root    7w   REG  253,0 168083 50504595 /var/log/messages
```

---

## Exploring Process Relationships

To visualize the parent–child relationships between processes, use the forest option with `ps`:

```
ps fax
```

This command displays processes in a tree-like format and can be combined with options such as `ps aux` for extra detail.

---

## Process Management Summary

In this article, we covered various techniques for process management in Linux, including:

- Viewing process snapshots with `ps`
- Continuous monitoring using `top`
- Adjusting process priority with `nice` and `renice`
- Sending signals with `kill` and `pkill`
- Managing processes with job control commands (`fg`, `bg`, and `jobs`)
- Investigating open files using `lsof`
- Visualizing process relationships

---

![The image shows a terminal window displaying the manual page for the `ps` command, which reports a snapshot of current processes. It includes sections like NAME, SYNOPSIS, and DESCRIPTION.](https://kodekloud.com/kk-media/image/upload/v1752883600/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Diagnose-and-manage-processes/ps-command-manual-terminal-snapshot.jpg)

---

This concludes our deep dive into diagnosing and managing processes in Linux. With these techniques, you'll be well-prepared to troubleshoot and manage processes effectively in any Linux environment. Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/b8d0f7c7-7710-42e5-a184-787d78d41e6f/lesson/e86901ef-e617-4dff-b9cc-8e893b91a6dd)**
>
> Watch video content
