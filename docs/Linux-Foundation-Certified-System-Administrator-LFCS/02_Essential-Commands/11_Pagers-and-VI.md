# Pagers and VI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Pagers-and-VI)

---

## Table of Contents

- Pagers and VI
  - Using the Less Pager
  - Using the More Pager
  - Introduction to Vim
  - Summary
  - Watch Video
    - Searching Within Less
    - Basic Vim Modes
    - Creating, Saving, and Quitting Files in Vim
    - Navigating and Searching in Vim
    - Copying, Pasting, and Cutting Text

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Pagers and VI

In this guide, we explore the usage of pagers and the powerful Vim text editor. First, we discuss two popular pagers—Less and More—detailing how to view and navigate through text files in the terminal. Then, we introduce Vim, covering its core functionality, essential commands, and editing techniques.

---

## Using the Less Pager

Pagers like Less allow you to view and navigate through large text files directly in the terminal. Less provides advanced features such as scrolling and searching, making it a popular choice for system log inspections and file viewing.

To open a file using Less, enter the following command (here, we inspect the system log):

```
sudo less /var/log/syslog
```

When the file is open, you will typically see the filename highlighted in the lower left corner. Navigation is easy with the arrow keys for scrolling up and down.

Below is an example snippet from a syslog as displayed by Less:

```
2024-05-07T00:34:30.893981+00:00 kodekloud kernel: Linux version 6.8.0-31-generic (buildd@lcy02-amd64-0080) (x86_64-linux-gnu-gcc-13 (Ubuntu 13.2.0-23ubuntu4) 13.2.0, GNU ld (GNU Binutils for Ubuntu) 2.42) # 31-Ubuntu SMP PREEMPT_DYNAMIC Sat Apr 20 00:40:06 UTC 2024 (Ubuntu 6.8.0-31.31-generic 6.8.1)
2024-05-07T00:34:30.894695+00:00 kodekloud kernel: Command line: BOOT_IMAGE=/vmlinuz-6.8.0-31-generic root=/dev/mapper/ubuntu--vg-ubuntu--lv ro
2024-05-07T00:34:30.894698+00:00 kodekloud kernel: KERNEL supported cpus:
2024-05-07T00:34:30.894699+00:00 kodekloud kernel:  Intel GenuineIntel
2024-05-07T00:34:30.894699+00:00 kodekloud kernel:  AMD AuthenticAMD
2024-05-07T00:34:30.894699+00:00 kodekloud kernel:  Hygon HygonGenuine
2024-05-07T00:34:30.894699+00:00 kodekloud kernel:  Centaur CentaurHauls
2024-05-07T00:34:30.894699+00:00 kodekloud kernel:  zhaoxin Shanghai
2024-05-07T00:34:30.894700+00:00 kodekloud kernel: BIOS-provided physical RAM map:
[...]
/var/log/syslog
```

You can scroll further using the arrow keys. For example, this snippet demonstrates additional navigation:

```
2024-05-07T00:34:30.894695+00:00 kodekloud kernel: Command line: BOOT_IMAGE=/vmlinuz-6.8.0-31-generic ro
2024-05-07T00:34:30.894698+00:00 kodekloud kernel: KERNEL supported cpus:
2024-05-07T00:34:30.894699+00:00 kodekloud kernel: Intel GenuineIntel
2024-05-07T00:34:30.894700+00:00 kodekloud kernel: AMD AuthenticAMD
2024-05-07T00:34:30.894699+00:00 kodekloud kernel: Hygon HygonGenuine
2024-05-07T00:34:30.894699+00:00 kodekloud kernel: Centaur CentaurHauls
2024-05-07T00:34:30.894701+00:00 kodekloud kernel: zhaoxin Shanghai
2024-05-07T00:34:30.894703+00:00 kodekloud kernel: BIOS-provided physical RAM map:
2024-05-07T00:34:30.894704+00:00 kodekloud kernel: BIOS-e820: [mem 0x0000000000000000-0x000000000009fbf]
2024-05-07T00:34:30.894706+00:00 kodekloud kernel: BIOS-e820: [mem 0x000000000009fc00-0x000000000009fff]
2024-05-07T00:34:30.894709+00:00 kodekloud kernel: BIOS-e820: [mem 0x00000000000e0000-0x0000000000effff]
2024-05-07T00:34:30.894709+00:00 kodekloud kernel: BIOS-e820: [mem 0x0000000000100000-0x000000026a6fffff]
```

> [!important]
> **Tip**
>
> Remember to use the arrow keys in Less for smooth navigation through your log files. For more extensive documents, Less is highly recommended over other simpler pagers.

### Searching Within Less

Less includes powerful search functionality. To search within a file:

1.  Press the slash (/) key.
2.  Type the desired search term (e.g., "system") and press Enter.
3.  Less highlights the matching terms, and you can navigate through occurrences by pressing `N` for the next match or `Shift + N` for the previous match.

Below is a sample of search results highlighting various system messages:

```
2024-05-07T00:34:30.894818+00:00 kodekloud systemd[1]: Finished lvm2-monitor.service - Monitoring of LV M2 mirrors, snapshots etc. using dmeventd or progress polling.
2024-05-07T00:34:30.894822+00:00 kodekloud systemd[1]: Finished systemd-remount-fs.service - Remount Root and Kernel File Systems.
2024-05-07T00:34:30.894825+00:00 kodekloud systemd[1]: Mounted sys-fs-fuse-connections.mount - FUSE Control File System.
2024-05-07T00:34:30.894830+00:00 kodekloud systemd[1]: Activating swap swap.img.swap - /swap.img...
2024-05-07T00:34:30.894836+00:00 kodekloud systemd[1]: Starting multipathd.service - Device-Mapper Multipath Device Controller...
2024-05-07T00:34:30.894843+00:00 kodekloud systemd[1]: systemd-hwdb-update.service - Rebuild Hardware Database was skipped because no trigger condition checks were met.
2024-05-07T00:34:30.894847+00:00 kodekloud systemd-modules-load[379]: Inserted module 'dm_multipath'
2024-05-07T00:34:30.894855+00:00 kodekloud systemd[1]: Starting systemd-journal-flush.service - Flush Journal to Persistent Storage...
2024-05-07T00:34:30.894862+00:00 kodekloud systemd[1]: systemd-pstore.service - Platform Persistent Storage Archival was skipped because of an unmet condition check (ConditionDirectoryNotEmpty=/sys/fs/pstore).
2024-05-07T00:34:30.894867+00:00 kodekloud systemd[1]: Starting systemd-random-seed.service - Load/Save Random Seed.
2024-05-07T00:34:30.894862+00:00 kodekloud systemd[1]: systemd-tpm2-setup.service - TPM2 SRK Setup was skipped because of an unmet condition check (ConditionSecurity-measured-uki).
2024-05-07T00:34:30.894867+00:00 kodekloud systemd[1]: Activated swap swap.img.swap - /swap.img.
2024-05-07T00:34:30.894871+00:00 kodekloud systemd[1]: Finished systemd-modules-load.service - Load Kernel Modules.
2024-05-07T00:34:30.894874+00:00 kodekloud systemd[1]: Mounted sys-kernel-config.mount - Kernel Configuration File System.
2024-05-07T00:34:30.894878+00:00 kodekloud systemd[1]: Reached target swap.target - Swaps.
```

By default, searches are case sensitive. To perform a case-insensitive search, append "\\c" to your search term (e.g., `/example\c`):

```
2024-05-07T00:34:30.894818+00:00 kodekloud systemd[1]: Finished lvm2-monitor.service - Monitoring of LV M2 mirrors, snapshots etc. using dmeventd or progress polling.
2024-05-07T00:34:30.894822+00:00 kodekloud systemd[1]: Finished systemd-remount-fs.service - Remount Root and Kernel File Systems.
2024-05-07T00:34:30.894825+00:00 kodekloud systemd[1]: Mounted sys-fs-fuse-connections.mount - FUSE Control File System.
2024-05-07T00:34:30.894830+00:00 kodekloud systemd[1]: Activating swap swap.img.swap - /swap.img...
2024-05-07T00:34:30.894836+00:00 kodekloud systemd[1]: Starting multipathd.service - Device-Mapper Multipath Device Controller...
2024-05-07T00:34:30.894843+00:00 kodekloud systemd[1]: systemd-hwdb-update.service - Rebuild Hardware Database was skipped because no trigger condition checks were met.
2024-05-07T00:34:30.894847+00:00 kodekloud systemd-modules-load[379]: Inserted module 'msr'
2024-05-07T00:34:30.894855+00:00 kodekloud systemd[1]: systemd-journal-flush.service - Flush Journal to Persistent Storage...
2024-05-07T00:34:30.894861+00:00 kodekloud systemd[1]: systemd-pstore.service - Platform Persistent Storage Archival was skipped because of an unmet condition check (ConditionDirectoryNotEmpty=/sys/fs/pstore).
2024-05-07T00:34:30.894867+00:00 kodekloud systemd[1]: Starting systemd-random-seed.service - Load/Save Random Seed...
2024-05-07T00:34:30.894872+00:00 kodekloud systemd[1]: systemd-tpm2-setup.service - TPM2 SRK Setup was skipped because of an unmet condition check (ConditionSecurity=measured-uki).
2024-05-07T00:34:30.894878+00:00 kodekloud systemd[1]: Reached target swap.target - Swaps.
```

To navigate backwards through matches, press uppercase `N`. When you are ready to exit Less, simply press `Q`.

---

## Using the More Pager

While Less offers many features, the More pager is a simpler alternative with a more straightforward interface. More is effective for quick file views.

To open a file with More, run the following command:

```
more /path/to/your/file
```

When you view a file with More, a progress indicator (like "More (2%)") appears at the bottom of the screen. Use the spacebar to advance through the file page by page.

Below is a sample output from More:

```
2024-05-07T00:34:30.894971+00:00 kodekloud systemd[1]: plymouth-start.service - Show Plymouth Boot Screen
2024-05-07T00:34:30.894974+00:00 kodekloud systemd[1]: Started systemd-ask-password-console.path - Dispatch Password Requests to Console Directory Watch.
2024-05-07T00:34:30.894980+00:00 kodekloud systemd[1]: systemd-ask-password-plymouth.path - Forward Password Requests to Plymouth Directory Watch was skipped because of an unmet condition check (ConditionPathExists=/run/plymouth/pid).
2024-05-07T00:34:30.894983+00:00 kodekloud systemd[1]: Reached target cryptsetup.target - Local Encrypted Volumes.
2024-05-07T00:34:30.894987+00:00 kodekloud (udev-worker)[456]: dm-0: Process '/usr/bin/unshare -m /usr/bin/snap auto-import --mount=/dev/dm-0' failed with exit code 1.
2024-05-07T00:34:30.894992+00:00 kodekloud (udev-worker)[451]: sda: Process '/usr/bin/unshare -m /usr/bin/snap auto-import --mount=/dev/sda' failed with exit code 1.
2024-05-07T00:34:30.894995+00:00 kodekloud lvm[522]: PV /dev/sda3 online, VG ubuntu-vg is complete.
2024-05-07T00:34:30.894996+00:00 kodekloud lvm[522]: VG ubuntu-vg finished
2024-05-07T00:34:30.895000+00:00 kodekloud (udev-worker)[467]: sda2: Process '/usr/bin/unshare -m /usr/bin/snap auto-import --mount=/dev/sda2' failed with exit code 1.
2024-05-07T00:34:30.895008+00:00 kodekloud (udev-worker)[451]: sda1: Process '/usr/bin/unshare -m /usr/bin/snap auto-import --mount=/dev/sda1' failed with exit code 1.
2024-05-07T00:34:30.895012+00:00 kodekloud (udev-worker)[473]: sr0: Process '/usr/bin/unshare -m /usr/bin/snap auto-import --mount=/dev/sr0' failed with exit code 1.
2024-05-07T00:34:30.895019+00:00 kodekloud (udev-worker)[450]: sda3: Process '/usr/bin/unshare -m /usr/bin/snap auto-import --mount=/dev/sda3' failed with exit code 1.
2024-05-07T00:34:30.895020+00:00 kodekloud systemd[1]: Found device dev-disk-by\x2duuid-18157e24\x2d3de7\x24d2b2\x2d9dc0\x2d21d01162db644.service - File System Check on /dev/disk/by-uuid/18157e24-3d
--More-- (2%)
```

To exit More, press the `Q` key.

---

## Introduction to Vim

Vim, short for "Vi Improved," is a powerful text editor designed for efficiency. When you start Vim, a welcome screen appears, providing basic information and usage tips:

```
VIM - Vi IMproved
version 9.1.16
by Bram Moolenaar et al.
Modified by team+vim@tracker.debian.org
Vim is open source and freely distributable


Become a registered Vim user!
type :help register<Enter> for information


type :q<Enter> to exit
type :help<Enter> or <F1> for on-line help
type :help version9<Enter> for version info
```

### Basic Vim Modes

Vim is a mode-based editor, meaning it operates in different modes for specific tasks:

- **Insert Mode:** Press the `i` key to enter Insert mode and start editing your file.
- **Command Mode:** Press the `Esc` key to switch back to Command mode. In this mode, you can run commands for saving, quitting, or navigating within the file.

> [!important]
> **Remember**
>
> Always press `Esc` to ensure you are in Command mode before executing commands.

### Creating, Saving, and Quitting Files in Vim

To create or edit a file, run:

```
vim test.txt
```

While in Command mode, use the following commands:

- To save your changes, type `:w` and press Enter.
- To save and exit, type `:wq` after pressing `Esc` if necessary.
- To exit without saving, type `:q!`.

To open an existing file, simply enter:

```
vim example.txt
```

### Navigating and Searching in Vim

Movement in Vim is efficient with both arrow keys and command shortcuts:

- Use `h`, `j`, `k`, and `l` for left, down, up, and right navigation respectively.
- To search for text, press `/` followed by your search query (e.g., `/example`) and press Enter.
- For a case-insensitive search, append `\c` to the query (e.g., `/example\c`).
- To jump to a specific line, type `:10` (where 10 is the line number).

### Copying, Pasting, and Cutting Text

Vim offers quick commands for text manipulation:

- Copy (yank) a line: Press `yy`.
- Paste the copied line: Press `p` (repeat to paste multiple times).
- Cut (delete) a line: Press `dd`, and then paste where appropriate using `p`.

These simple commands help streamline your workflow without reliance on a mouse.

---

## Summary

In this guide, we reviewed the Less and More pagers for file navigation in the terminal, and provided an introduction to Vim with practical commands for editing, searching, and navigating files. Below is an additional text snippet as a closing note:

```
OK - This is another line of text
OK - This is another line of text
Fusce cursus efficitur hendrerit. Duis aliquam nibh diam, sed fermentum justo ultrices ac. Nunc eu dui tempus, accumsan odio ut, bibendum lacus. Pellentesque sed congue nibh. Donec eu egestas erat. Etiam vita dolor turpis. Sed eget velit consectetur, scelerisque ex at, fermentum lectus. Integer porttitor nisl orci, ut porttitor libero sollicitudin id. Duis sagittis, quam ut bibendum pretium, purus nisl eleifend quam, finibus semper mi diam ut urna. Fusce volutpat mauris ut efficitur vulputate. Vestibulum et iaculis mi. Aenean eget magna sollicitudin, convallis tortor finibus, cursus est.
```

That concludes our overview of terminal pagers and Vim. Happy editing, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/493f2004-c7d6-4373-93e0-fd3ccfd74cd8)**
>
> Watch video content
