# Linux Kernel - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Linux-Core-Concepts/Linux-Kernel)

---

## Table of Contents

- Linux Kernel
  - Checking the Linux Kernel Version
  - Understanding Kernel and User Space
  - Watch Video
    - Kernel Space
    - User Space

---

## Content

Learning Linux Basics Course & Labs

Linux Core Concepts

# Linux Kernel

In this article, we explore the essential components and functionalities of the Linux operating system, starting with an in-depth look at the Linux Kernel. We explain its role as the mediator between hardware and processes, detail its architecture, and demonstrate practical commands to retrieve kernel information.

We'll cover the following topics:

- Overview of the Linux Kernel as an interface between hardware and software.
- Differences between kernel space and user space.
- Interaction with hardware resources and the use of kernel modules.
- A hands-on lab exercise.
- A simplified overview of the Linux boot process and various runlevels.
- An explanation of Linux file types and the filesystem hierarchy.

If you have prior experience with operating systems, you are likely familiar with the term "kernel." But what exactly does the kernel do?

A kernel is the primary component of an operating system, serving as the core interface between computer hardware and application processes.

![The image illustrates the Linux Kernel architecture, showing its interaction between applications/processes and hardware components like memory, CPU, and devices.](https://kodekloud.com/kk-media/image/upload/v1752881116/notes-assets/images/Learning-Linux-Basics-Course-Labs-Linux-Kernel/frame_60.jpg)

The kernel efficiently manages communication between hardware and software. To illustrate, consider the analogy of a college library:

Imagine a college library with limited resources such as books, study guides, DVDs, and workstations for students. Without a librarian, students might grab materials haphazardly, causing disorganization and shortages. The librarian, however, manages resource allocation by issuing books based on specific criteria (like a student's year), tracking borrowed items, and ensuring timely returns.

In this analogy:

- The library represents the operating system.
- The books and media symbolize hardware resources.
- The students represent application processes.
- The librarian is analogous to the Linux Kernel, managing resource allocation and ensuring orderly operation.

The Linux Kernel is responsible for several key tasks:

- **Memory Management:** Tracks memory usage and allocation.
- **Process Management:** Schedules processes on the CPU and determines their execution order.
- **Device Drivers:** Acts as an intermediary between hardware devices and software processes.
- **System Calls and Security:** Handles requests from processes and enforces security policies.

> [!important]
> **Kernel Modularity**
>
> Although the Linux Kernel is monolithic—handling CPU scheduling, memory management, and other operations on its own—it is designed to be modular. This modularity allows dynamic extension via kernel modules.

![The image outlines key components of the Linux Kernel: Memory Management, Process Management, Device Drivers, System Calls and Security, and notes it as Monolithic.](https://kodekloud.com/kk-media/image/upload/v1752881117/notes-assets/images/Learning-Linux-Basics-Course-Labs-Linux-Kernel/frame_240.jpg)

## Checking the Linux Kernel Version

Knowing your Linux Kernel version is crucial for troubleshooting and ensuring system compatibility. You can retrieve kernel information using the `uname` command. While running `uname` by itself returns a summary, using flags such as `-r` or `-a` gives detailed information. For example:

```
[~]$ uname
Linux
[~]$ uname -r
4.15.0-72-generic
```

The versioning format in the output can be understood as follows:

- The first number (4) indicates the primary Linux Kernel version.
- The second number (15) corresponds to the major version.
- The third number (0) specifies the minor version.
- The fourth number (72) denotes the patch level.
- The suffix (generic) provides distribution-specific details.

The Linux Kernel was initially developed by Linus Torvalds in 1991. As of this article's reference, the latest release is version 5.5.10, launched on 18 March 2020. Many Linux distributions, including Ubuntu 20.04 released in April 2020, default to using a Linux kernel from the 5.x series. For more detailed updates and version history, visit [kernel.org](https://www.kernel.org), the central repository hosting the Linux Kernel source code.

## Understanding Kernel and User Space

A fundamental function of the Linux Kernel is managing memory, which is divided into two primary areas: kernel space and user space (also known as kernel mode and user mode, respectively).

### Kernel Space

- **Kernel Space:** Reserved exclusively for the kernel's execution and its critical services. Processes operating in kernel space have complete access to the system’s hardware resources. In our library analogy, kernel space is like a restricted section that only the librarian or administrators can access.

### User Space

- **User Space:** Dedicated to processes running outside the kernel, with restricted access to hardware resources. This area hosts various utilities, programming languages, and graphical tools collectively known as the userland, similar to the publicly accessible areas of the library designed for readers and reference.

User space programs primarily work with data by performing operations on memory or disk. They communicate their needs through system calls to the kernel. For instance, when a program accesses the `/etc/os-release` file to determine the operating system version, it makes a system call to request the file's contents:

```
cat /etc/os-release
```

Other common system calls include operations like `close`, `getpid`, `readdir`, `strlen`, and `closedir`.

![The image illustrates the relationship between hardware, kernel space, and user space, highlighting system calls and functions like file operations and process listing.](https://kodekloud.com/kk-media/image/upload/v1752881118/notes-assets/images/Learning-Linux-Basics-Course-Labs-Linux-Kernel/frame_490.jpg)

> [!important]
> **System Calls**
>
> System calls provide a secure interface for user programs to request services from the kernel, ensuring the stability and security of the system.

By understanding these core concepts, users and system administrators can gain a deeper insight into how Linux manages system resources, ensuring optimized performance and secure operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/19296611-5fb9-4e5d-a926-d157d3f3c3db/lesson/f7e7227d-8f13-443e-95cd-e00914245b20)**
>
> Watch video content
