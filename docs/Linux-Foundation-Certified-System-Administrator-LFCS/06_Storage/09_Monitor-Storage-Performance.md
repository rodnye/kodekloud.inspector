# Monitor Storage Performance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Storage/Monitor-Storage-Performance)

---

## Table of Contents

- Monitor Storage Performance
  - Creating a Storage Load Scenario
  - Identifying the Process with pidstat
  - Understanding Device Mapper (dm-0)
  - Managing Processes with High I/O
  - Additional Command-Line Options
  - Conclusion
  - Watch Video
    - iostat Options:
    - pidstat Options:
    - Monitoring Disk Partitions with iostat

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Storage

# Monitor Storage Performance

In this lesson, we explore how to monitor the performance of storage devices—similar to how we track CPU and RAM usage. Just as a CPU consistently running at 100% can slow down your system, overusing storage devices can also degrade performance. While tools such as TOP and HTOP are common for monitoring CPU and RAM usage, various utilities exist specifically for storage devices. In this guide, we will review several simple tools to help you manage and diagnose storage performance issues.

There is a package called sysstat that bundles many system monitoring utilities—including iostat and pidstat, which we will focus on. Install sysstat with:

```
sudo apt install sysstat
```

The installation process may display output similar to this:

```
$ sudo apt install sysstat
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
 isag
The following NEW packages will be installed:
 sysstat
0 upgraded, 1 newly installed, 0 to remove and 330 not upgraded.
update-alternatives: using /usr/bin/sar.sysstat to provide /usr/bin/sar (sar)
in auto mode
Created symlink /etc/systemd/system/sysstat.service.wants/sysstat-collect.timer → /lib/systemd/system/sysstat-collect.timer
```

iostat, short for input/output statistics, monitors data being written to or read from a storage device. In contrast, pidstat shows statistics for process IDs (PID) interacting with the storage subsystem. Every process in Linux has a unique identifier, and pidstat helps you understand which processes create heavy I/O loads.

![The image is an infographic about storage monitoring, showing how the sysstat package, including iostat and pidstat, is used to gather I/O and process ID statistics from read/write operations.](https://kodekloud.com/kk-media/image/upload/v1752881363/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Monitor-Storage-Performance/storage-monitoring-sysstat-infographic.jpg)

Below, we begin by running iostat without any arguments. This command produces a summary of storage device usage since boot:

```
$ iostat
Linux 5.15.0-76-generic (KodeKloud)     07/18/2023     _x86_64_     (2 CPU)


avg-cpu:  %user   %nice   %system   %iowait   %steal   %idle
          0.47    0.00    1.09      4.17      0.03     94.24


Device     tps    kB_read/s  kB_wrtn/s  kB_dscd/s  kB_read  kB_wrtn
dm-0      197.23    517.01     600.42      0.00    256513   297900
loop0      0.43      4.32       0.00      0.00      2142        0
loop1      0.09      0.70       0.00      0.00       345        0
loop2      0.08      0.70       0.00      0.00       345        0
loop3      2.46     90.73      0.00      0.00     45097        0
vda      155.28    535.50     600.66      0.00    265686   298016
```

The above output represents historical usage measured since the system booted. Note that the displayed values represent averages over the system's uptime, which might not reflect the current instantaneous load. For example, if disk reads vary over consecutive seconds, the average value shown by iostat adjusts accordingly. Fields such as TPS (transfers per second), kB_read/s, and kB_wrtn/s are computed from these running averages, while kB_read and kB_wrtn show cumulative totals.

```
$ iostat
Linux 5.15.0-76-generic (KodeKloud)    07/18/2023    _x86_64_  (2 CPU)


avg-cpu:  %user %nice %system %iowait %steal  %idle
          0.47  0.00  1.09  4.17  0.03  94.24


Device    tps    kB_read/s kB_wrn/s kB_dscd/s kB_read kB_wrn kB_dscd
dm-0      197.23 517.01   600.42   0.00      256513 297900  0
loop0      0.43    4.32    0.00    0.00        2142     0    0
loop1      0.09    0.70    0.00    0.00        345      0    0
loop2      0.08    0.70    0.00    0.00        345      0    0
loop3      2.46   90.73    0.00    0.00      45097     0    0
vda      155.28 535.50   600.66   0.00      265686 298016  0
```

![The image explains how the `iostat` command calculates the average kilobytes per second read over three seconds, resulting in 100 kilobytes per second.](https://kodekloud.com/kk-media/image/upload/v1752881364/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Monitor-Storage-Performance/iostat-average-kilobytes-per-second.jpg)

In practical terms, a process that writes 1 kB repeatedly in rapid succession can cause high TPS values even if the individual write size is small. Conversely, operations involving large data transfers are more apparent when you review the cumulative values in kB_read and kB_wrtn.

For instance, consider the following iostat output from a different kernel version:

```
$ iostat
Linux 5.19.0-41-generic (user1) 07/18/2023 _x86_64_ (1 CPU)


avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           19.45  13.74  8.49   1.82     0.00    56.50


Device    tps    kB_read/s kB_wrn/s kB_dscd/s kB_read kB_wrn kB_dscd
dm-0      197.23 517.01    600.42    0.00      256513 297900  0
loop0     0.43   4.32      0.00      0.00      2142   0      0
loop1     0.09   0.70      0.00      0.00      345    0      0
loop2     0.08   0.70      0.00      0.00      345    0      0
loop3     2.46   90.73     0.00      0.00      45097  0      0
vda       155.28 535.50    600.66    0.00      265846 298016 0
```

Even a seemingly small write (such as 1 kB) may be reported as a larger block, particularly when larger transfers occur. A storage device can experience stress in two ways:

1.  When a process initiates frequent read/write operations (producing a high TPS).
2.  When large volumes of data are transferred during each operation (visible in the kB_read/kB_wrn fields).

For example, if a device capable of 2 GB/s is nearly saturated by one process, other processes may experience significant delays. Both iostat and pidstat are essential in identifying and diagnosing these issues.

> [!important]
> **Tip**
>
> For quick diagnostics, consider running iostat with a delay parameter (e.g., 1 second) to refresh the output and capture current activity.

## Creating a Storage Load Scenario

To illustrate these concepts, let's create a process that continuously writes to a storage device. We use the dd command to write zeros from /dev/zero into a file. The parameters for the command mean the following:

- if=/dev/zero: Uses an infinite stream of zeros.
- of=DELETEME: Specifies the output file.
- bs=1: Sets the block size to 1 byte.
- count=1000000: Writes 1 byte a million times.
- oflag=dsync: Forces the write operation to bypass caching.
- &: Runs the command in the background.

```
dd if=/dev/zero of=DELETEME bs=1 count=1000000 oflag=dsync &
```

When executed, you might see output like:

```
jeremy@kodekloud:~$ dd if=/dev/zero of=DELETE_ME bs=1 count=1000000 oflag=dsync &
[1] 1411
jeremy@kodekloud:~$
```

This background process allows you to continue using the terminal. To monitor which process is writing to the device, run iostat with a delay parameter:

```
iostat 1
```

The output refreshes every second. A sample refreshed output may look like:

```
Linux 6.8.0-35-generic (kodekloud)      06/14/2024   _x86_64_     (10 CPU)


avg-cpu:  %user   %nice   %system  %iowait  %steal  %idle
           0.04    0.00    0.21     0.44    0.00    99.31


Device      tps     kB_read/s   kB_wrn/s   kB_dscd/s  kB_read  kB_wrn  kB_dscd
dm-0        43.60   150.48      132.01      0.00        263897   231512   0
nbd0        0.07    1.33        0.03        0.00        2341     60       0
sda         34.15   155.71      132.11      0.00        273070   231680   0
```

After a while, you may notice a sudden increase in TPS and kB_wrn/s for devices like dm-0 and sda. For example:

```
$ iostat
Linux 6.8.0-35-generic (user1)        07/18/2023    _x86_64_        (1 CPU)


avg-cpu:  %user   %nice   %system %iowait  %steal   %idle
           19.45   13.74   8.49    1.82     0.00    56.50


Device   tps    kB_read/s kB_wrn/s kB_dscd/s kB_read kB_wrn kB_dscd
dm-0     197.23 517.01    600.42    0.00      256513  297900  0
loop0    0.43   4.32      0.00      0.00      2142    0       0
loop1    0.09   0.70      0.00      0.00      345     0       0
loop2    0.08   0.70      0.00      0.00      345     0       0
loop3    2.46   90.73     0.00      0.00      45097   0       0
vda     155.28 535.50    600.66    0.00      265686  298016  0
```

This indicates that certain devices are under heavy write activity. However, iostat alone does not reveal which process is responsible.

## Identifying the Process with pidstat

To determine the process causing high I/O, exit iostat by pressing Ctrl+C and use pidstat:

```
pidstat -d
```

The output will list I/O statistics for each process, similar to:

```
jeremy@kodekloud:~$ pidstat -d
Linux 6.8.0-35-generic (kodekloud)     06/14/2024     _x86_64_       (10 CPU)


07:09:35 AM  UID       PID     kB_rd/s kB_wr/s kB_ccwr/s iodelay   Command
07:09:35 AM  1000     1274        0.97      0.00      0.00       0      bash
07:09:35 AM  1000     1411        0.04     75.50      0.00       0      dd
07:09:35 AM  1000     1418        0.03      0.00      0.00       0      pidstat
jeremy@kodekloud:~$
```

In the above example, the dd process (PID 1411) is responsible for heavy write activity. To continuously monitor, run pidstat with an interval:

```
pidstat -d 1
```

Press Ctrl+C to exit. A sample repeated output might look like:

```
07:12:34 AM  UID     PID     kB_rd/s  kB_wr/s  kB_ccwr/s  iodelay  Command
07:12:35 AM  UID     1000    1411     0.00     665.35     0.00     0       dd
07:12:35 AM  UID     1000    1411     0.00     696.00     0.00     0       dd
07:12:36 AM  UID     1000    1411     0.00     605.94     0.00     0       dd
07:12:37 AM  UID     1000    1411     0.00     636.00     0.00     0       dd
07:12:38 AM  UID     1000    1411     0.00     673.27     0.00     0       dd
07:12:39 AM  UID     1000    1411     0.00     620.00     0.00     0       dd
07:12:40 AM  UID     1000    1411     0.00     613.86     0.00     0       dd
07:12:41 AM  UID     1000    1411     0.00     617.48     0.00     0       dd
^C
Average:   UID     1000    PID     1411     kB_rd/s  kB_wr/s  kB_ccwr/s  iodelay  Command
```

> [!important]
> **Key Observation**
>
> Both dm-0 and /dev/sda show significant write activity in the iostat output, and the dd process (PID 1411) is the main contributor based on pidstat.

## Understanding Device Mapper (dm-0)

You may wonder what the dm-0 device represents. DM stands for Device Mapper, which is used by the Logical Volume Manager (LVM) to manage storage volumes. To find out what dm-0 maps to, use:

```
sudo dmsetup info /dev/dm-0
```

Example output:

```
jeremy@kodekloud:~$ sudo dmsetup info /dev/dm-0
[sudo] password for jeremy:
Name:              ubuntu--vg-ubuntu--lv
State:             ACTIVE
Read Ahead:        256
Tables present:    LIVE
Open count:        1
Event number:      0
Major, minor:      252, 0
Number of targets: 1
UUID:              LVM-gAAfKzeoxfbviBTqNm3tActzQkhA7naII91DKxXBFhbSArz3azVx1ioaauFTXxCR
```

Next, verify the relationship between dm-0 and the physical devices with lsblk:

```
sudo lsblk
```

Sample lsblk output:

```
NAME                MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda                   8:0    0   45G  0 disk
├─sda1                8:1    0    1M  0 part /boot
├─sda2                8:2    0    2G  0 part
├─sda3                8:3    0   43G  0 part
└─ubuntu--vg-ubuntu--lv 252:0    0 21.5G  0 lvm  /
sr0                  11:0    1 1024M  0 rom
nbd0                 43:0   16    0B  0 disk
… (other nbd devices)
```

From this output, dm-0 (shown as ubuntu--vg-ubuntu--lv) is a logical volume created on /dev/sda3, which explains why both dm-0 and sda are active.

## Managing Processes with High I/O

To summarize our findings:

- The dd process (PID 1411) is writing continuously to the storage device.
- These writes are occurring on /dev/sda, accessed through the logical volume dm-0.
- In a real-world scenario, a process such as a database (e.g., MariaDB) might be responsible, warranting further investigation into logs or even a restart using:

  ```
  sudo systemctl restart mariadb
  ```

To view the full command of a given process, use:

```
ps -ef | grep 1411
```

If you decide to stop the process, execute:

```
kill 1411
```

Verify the process termination with:

```
ps 1411
```

Example output:

```
PID TTY          STAT TIME COMMAND
1411 pts/0    D    0:28 dd if=/dev/zero of=DELETEME bs=1 count=1000000 oflag=dsync
```

If the process does not terminate gracefully, you may force termination with the SIGKILL signal:

```
kill -9 1411
```

> [!important]
> **Caution**
>
> Using SIGKILL (kill -9) stops a process immediately without allowing it to perform any cleanup. Use this option only as a last resort.

## Additional Command-Line Options

Here are a few useful options for both iostat and pidstat:

### iostat Options:

- Use `-d` to display only device utilization (omitting CPU statistics).
- Use `-h` for human-readable output, where large numbers are automatically scaled (e.g., kilobytes, megabytes, gigabytes).

Examples:

```
jeremy@kodekloud:~$ iostat -d
Linux 6.8.0-35-generic (kodekloud)      06/14/2024      _x86_64_     (10 CPU)


Device             tps    kB_read/s kB_wrn/s kB_dscd/s kB_read  kB_wrn kB_dscd
dm-0            219.55     109.38     697.28     0.00    264297  1684820  0
nbd0             0.05       1.0      0.02      0.00      2341       60  0
sda             175.08     113.18     697.34     0.00    273470  1684984  0
```

```
jeremy@kodekloud:~$ iostat -h
Linux 6.8.0-35-generic (kodekloud)      06/14/2024      _x86_64_     (10 CPU)


avg-cpu:    %user     %nice   %system   %iowait    %steal   %idle
            0.0%      0.0%      0.4%      2.3%      0.0%   97.2%


             tps    kB_read/s   kB_wrn/s   kB_dscd   kB_read   kB_wrn   Device
            217.84     108.5k     691.8k       0.0k   258.1M     1.6G     dm-0
              0.05       1.0k       0.0k       0.0k     2.3M    60.0k     nbd0
            173.72     112.3k     691.9k       0.0k   267.1M     1.6G     sda
```

### pidstat Options:

- Use `--human` to display I/O statistics in a human-readable format.

Example:

```
pidstat -d --human
```

Sample output:

```
Linux 6.8.0-35-generic (kodekloud)      06/14/2024      _x86_64_     (10 CPU)


07:19:18 AM  UID     PID    kB_rd/s    kB_wr/s   kB_ccwr/s  iodelay   Command
07:19:18 AM  1000   1274    955.5B    166.7k      0.0B      0        bash
```

### Monitoring Disk Partitions with iostat

By default, iostat displays statistics for whole devices (e.g., /dev/sda). To view statistics for every partition, use:

```
iostat -p ALL
```

Or, to focus on partitions for a specific device like sda:

```
iostat -p sda
```

For more detailed options, always refer to the manual pages:

```
man iostat
man pidstat
```

## Conclusion

This lesson demonstrated the techniques to monitor storage performance, diagnose device stress, and identify processes causing heavy I/O activity using tools like iostat and pidstat. By combining these tools with commands such as dd, dmsetup, and lsblk, you can efficiently troubleshoot and resolve storage-related performance issues.

Now that you have learned these valuable monitoring techniques, let's move on to our next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/9ba247d2-68fd-4b85-aacc-c98d0dd1a6db)**
>
> Watch video content
