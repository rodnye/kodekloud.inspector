# Diagnose and Manage Processes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Diagnose-and-Manage-Processes)

---

## Table of Contents

- Diagnose and Manage Processes
  - Using the ps Command
  - Monitoring Processes in Real Time with top
  - Adjusting Process Priority Using Niceness and renice
  - Sending Signals to Processes
  - Managing Background and Foreground Processes
  - Checking Open Files with lsof
  - Conclusion
  - Watch Video
    - Analyzing the ps aux Output

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Diagnose and Manage Processes

In this guide, you will learn how Linux handles processes and discover various techniques to diagnose and manage them effectively. Every command you execute creates a process that runs until it completes its task or is manually terminated. For instance, running a command like "ls" creates a short-lived process that displays the directory contents and then exits, while services like the SSH daemon run continuously in the background.

Below is an example that lists all files—including hidden ones—using the ls command:

```
jeremy@kodekloud:~$ ls -a
.  ..  .bash_logout  .bashrc  .cache  .lesshst  .profile  .ssh  .sudo_as_admin_successful
jeremy@kodekloud:~$
```

## Using the ps Command

The `ps` command is a fundamental utility for inspecting active processes. It has several option syntaxes, reflecting both Unix and BSD styles. For example, `ps -a` uses Unix-style options, while `ps -A` (uppercase A) follows BSD syntax, leading to different outputs.

Running `ps` without any options only displays processes associated with the current terminal session. To see all processes running on the system, combine the options `a`, `x`, and `u`:

```
jeremy@kodekloud:~$ ps aux
```

In this command:

- The `ax` options ensure that processes from all controlling terminals are listed.
- The `u` option presents a user-oriented format, adding columns for memory and CPU usage as well as the process owner. This is why `ps aux` is widely used for obtaining a complete snapshot of system processes.

### Analyzing the ps aux Output

Review the typical columns shown in the `ps aux` output:

| Column  | Description                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| %CPU    | Percentage of one CPU core’s capacity used by the process. A value of 150 may indicate one full core plus 50% of a second core. |
| %MEM    | Percentage of the system's total memory used by the process.                                                                    |
| START   | The time or date when the process was initiated.                                                                                |
| TIME    | Total CPU time consumed by the process. Processes with long lifespans often spend the majority of their time sleeping.          |
| COMMAND | The command that initiated the process, along with its parameters.                                                              |

Processes displayed within square brackets (e.g., `[kthreadd]`) are kernel processes operating in privileged areas and usually do not require user interaction. Only processes outside these brackets represent user-space applications.

## Monitoring Processes in Real Time with top

While `ps` gives you a static snapshot, the `top` command is ideal for real-time process monitoring. It continuously updates its display and reorders the processes by CPU usage, making it easier to identify resource-intensive processes.

Use the arrow keys to navigate the list, and press "Q" to exit. Below is an example output of the `top` command:

```
top - 18:13:36 up 3:05, 2 users, load average: 0.05, 0.04, 0.00
Tasks: 215 total, 1 running, 214 sleeping, 0 stopped, 0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni, 99.3 id,  0.0 wa,  0.0 hi,  0.7 si,  0.0 st
MiB Mem :  7939.4 total, 7303.2 free,  546.3 used,  325.0 buff/cache
MiB Swap:  4096.0 total, 4096.0 free,    0.0 used. 7393.1 avail Mem
PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND
11110 jeremy    20   0  11912  5632  3456 R 14.3  0.1   00:00.05 top
1526  jeremy    20   0  15124  7092  5120 S  7.1  0.1   00:15.84 sshd
   1  root      20   0  22560 13412  9316 S  0.0  0.2   00:23.06 systemd
   2  root      20   0      0     0     0 S  0.0  0.0   00:00.05 kthreadd
   3  root      20   0      0     0     0 S  0.0  0.0   00:00.00 pool_workqueue_release
   4  root       0 -20      0     0     0 S  0.0  0.0   00:00.00 kworker/R-rcu_g
   5  root       0 -20      0     0     0 S  0.0  0.0   00:00.00 kworker/R-rcu_p
```

You can filter process listings by specific criteria such as PID or user. For example, to view details for process 1:

```
jeremy@kodekloud:~$ ps 1
    PID TTY      STAT   TIME COMMAND
      1 ?        Ss     0:23 /sbin/init
jeremy@kodekloud:~$
```

For detailed user-oriented information about process 1, run:

```
jeremy@kodekloud:~$ ps u 1
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.2  0.1  22560 13412 ?        Ss     15:07   0:23 /sbin/init
jeremy@kodekloud:~$
```

To list processes started by a specific user (e.g., jeremy), use the uppercase `-U` option:

```
jeremy@kodekloud:~$ ps u -U jeremy
USER     PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
jeremy  1398  0.0  0.1 20324 11392 ?        Ss    15:33   0:00 /usr/lib/systemd/systemd --user
jeremy  1401  0.0  0.0 21148  3520 ?        S     15:33   0:00 (sd-pam)
jeremy  1412  0.0  0.0  8656  5632 tty1     S+    15:33   0:00 -bash
jeremy  1526  0.1  0.0 15124  7092 ?        Ss    15:37   0:16 sshd: jeremy@pts/0
jeremy  1527  0.0  0.0 10300  6400 pts/0    S     15:37   0:00 -bash
jeremy 11326  0.0  0.0 10884  4480 pts/0    R+    18:15   0:00 ps u -U jeremy
```

Additionally, you can search for processes by name using the `pgrep` command with the `-a` option to display the complete command line:

```
jeremy@kodekloud:~$ pgrep -a syslog
1084 /usr/sbin/rsyslogd -n -iNONE
jeremy@kodekloud:~$
```

## Adjusting Process Priority Using Niceness and renice

Linux processes have a "niceness" value that determines their scheduling priority. This value ranges from -20 (highest priority) to 19 (lowest priority). When launching a process, you can assign a niceness value. For example, launching a bash shell with a niceness value of 11:

```
nice -n 11 bash
```

Note that the default `ps aux` output does not include niceness values. To view these, use the BSD long format with `ps l`, which displays the NI column:

```
jeremy@kodekloud:~$ nice -n 11 bash
jeremy@kodekloud:~$ ps l
F UID   PID  PPID PRI NI  VSZ  RSS WCHAN   STAT TTY   TIME COMMAND
4 1000  1412 1227 20  0  8656 5632 do_sel S+   tty1  0:00 -bash
0 1000  1527 1526 20  0 10300 6400 do_wai Ss   pts/0 0:00 -bash
0 1000 11657 1527 31 11 8652 5504 do_wai SN   pts/0 0:00 bash
0 1000 11702 11657 31 11 10916 4224 - RN+ pts/0 0:00 ps l
```

Child processes inherit the niceness value from their parent process. To modify the niceness of an already running process, use the `renice` command. For example, to change the nice value of a process with PID 12238 from 0 to 7:

```
jeremy@kodekloud:~$ renice 7 12238
12238 (process ID) old priority 0, new priority 7
jeremy@kodekloud:~$
```

> [!important]
> **Superuser Privileges**
>
> Only superusers can lower the nice value (i.e., increase priority) of a process. Regular users can only increase the niceness value.

## Sending Signals to Processes

Linux signals prompt processes to perform actions such as stopping, pausing, or terminating. Although some signals can be handled gracefully by applications, signals like SIGSTOP and SIGKILL are non-catchable. SIGSTOP pauses a process until it receives a SIGCONT, while SIGKILL immediately terminates it.

List all available signals using:

```
jeremy@kodekloud:~$ kill -l
 1) SIGHUP  2) SIGINT  3) SIGQUIT  4) SIGILL  5) SIGTRAP
 6) SIGABRT 7) SIGBUS  8) SIGFPE  9) SIGKILL 10) SIGUSR1
11) SIGSEGV 12) SIGUSR2 13) SIGPIPE 14) SIGALRM 15) SIGTERM
16) SIGSTKFLT 17) SIGCHLD 18) SIGCONT 19) SIGSTOP 20) SIGXCPU
... (continues)
```

For example, to send a SIGHUP signal (which typically instructs a process to reload its configuration) to the SSH daemon with PID 1457, use:

```
jeremy@kodekloud:~$ kill -s SIGHUP 1457
```

Since SSHD runs as root, a normal user must prepend `sudo`:

```
jeremy@kodekloud:~$ sudo kill -s SIGHUP 1457
```

When no signal is specified, the `kill` command sends SIGTERM by default for a graceful shutdown. To forcefully terminate a process, you can use SIGKILL in any of these ways:

```
kill -s SIGKILL PID
kill -KILL PID
kill -9 PID
```

The `pkill` command lets you send signals based on process names. For example, to send SIGKILL to all processes with "bash" in their name, first verify the target processes:

```
jeremy@kodekloud:~$ pgrep -a bash
1412 -bash
1527 -bash
12066 bash
```

If the list is correct, use:

```
jeremy@kodekloud:~$ pkill -KILL bash
```

> [!important]
> **Caution**
>
> Be very careful when terminating processes with signals such as SIGKILL. Stopping critical processes may lead to system instability or disconnect you from your session.

## Managing Background and Foreground Processes

Long-running tasks can be executed in the background, allowing you to use your terminal for other commands. For example, to run a sleep command for 180 seconds:

```
jeremy@kodekloud:~$ sleep 180
```

If you need to interrupt a process, press CTRL-C. In applications like Vim, you can suspend the process temporarily by pressing CTRL-Z:

```
jeremy@kodekloud:~$ vim /etc/hostname
[1]+  Stopped                 vim /etc/hostname
jeremy@kodekloud:~$
```

To bring a suspended process back to the foreground, execute:

```
jeremy@kodekloud:~$ fg
vim /etc/hostname
```

For processes started in the background using an ampersand (&):

```
jeremy@kodekloud:~$ sleep 300 &
[1] 13868
jeremy@kodekloud:~$ jobs
[1]+  Running                 sleep 300 &
```

To resume work on a backgrounded process, you can bring it to the foreground with `fg` or continue running it in the background using `bg`.

## Checking Open Files with lsof

The `lsof` command lets you inspect which files or directories are in use by a process. First, obtain the PID of your bash shell:

```
jeremy@kodekloud:~$ pgrep -a bash
13536 bash
```

Then, list all open files for that process:

```
jeremy@kodekloud:~$ lsof -p 13536
COMMAND   PID USER     FD   TYPE DEVICE SIZE/OFF NODE NAME
bash    13536 jeremy    cwd    DIR  252,0     4096 786475 /home/jeremy
bash    13536 jeremy    rtd    DIR  252,0     4096     2 /
bash    13536 jeremy    txt    REG  252,0 1446024 262614 /usr/bin/bash
...
```

If you need to check files for processes requiring elevated privileges (or if you suspect missing information), prepend sudo:

```
jeremy@kodekloud:~$ sudo lsof /var/log/auth.log
COMMAND    PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
rsyslogd  1084 syslog   9w  REG 252,0  16701  1299 /var/log/auth.log
```

## Conclusion

This guide has demonstrated multiple techniques for diagnosing and managing processes in Linux. You learned to inspect processes with `ps` and `top`, adjust process priorities using `nice` and `renice`, send signals with `kill` and `pkill`, manage background and foreground tasks, and inspect open files with `lsof`. Mastering these tools is essential for effective system administration and troubleshooting on Linux.

For more in-depth knowledge, explore additional resources such as:

- [Linux Process Management](https://www.kernel.org/doc/html/latest/admin-guide/processes.html)
- [Linux Signal Documentation](https://man7.org/linux/man-pages/man7/signal.7.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/27b96e7e-fd3b-4b86-b622-8b1014ac0b0a)**
>
> Watch video content
