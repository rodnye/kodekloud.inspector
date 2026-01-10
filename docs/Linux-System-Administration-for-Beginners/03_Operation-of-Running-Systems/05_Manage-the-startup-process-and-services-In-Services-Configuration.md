# Manage the startup process and services In Services Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Operation-of-Running-Systems/Manage-the-startup-process-and-services-In-Services-Configuration)

---

## Table of Contents

- Manage the startup process and services In Services Configuration
  - Table of Contents
  - Introduction to systemd
  - Unit File Types
  - Service Unit Structure
  - Inspecting the SSH Daemon Service
  - Editing and Reverting a Unit
  - Monitoring Service Status
  - Managing Service Lifecycle
  - Enabling and Disabling at Boot
  - Masking and Unmasking Services
  - Listing All Service Units
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Linux System Administration for Beginners

Operation of Running Systems

# Manage the startup process and services In Services Configuration

In this guide, you’ll learn how to inspect, configure, and control services on a Linux system using **systemd**—the modern init system. We cover unit files, service management commands, and best practices for maintaining your server’s services.

---

## Table of Contents

1.  [Introduction to systemd](#introduction-to-systemd)
2.  [Unit File Types](#unit-file-types)
3.  [Service Unit Structure](#service-unit-structure)
4.  [Inspecting the SSH Daemon Service](#inspecting-the-ssh-daemon-service)
5.  [Editing and Reverting a Unit](#editing-and-reverting-a-unit)
6.  [Monitoring Service Status](#monitoring-service-status)
7.  [Managing Service Lifecycle](#managing-service-lifecycle)
8.  [Enabling and Disabling at Boot](#enabling-and-disabling-at-boot)
9.  [Masking and Unmasking Services](#masking-and-unmasking-services)
10. [Listing All Service Units](#listing-all-service-units)
11. [Further Reading](#further-reading)

---

## Introduction to systemd

When Linux boots, **systemd** orchestrates service startup in parallel while respecting dependencies. If a critical service fails, systemd can restart it automatically, ensuring high availability. All behavior is defined by **unit files**—plain-text configurations that tell systemd how to manage resources.

> [!important]
> **Note**
>
> Learn more about systemd on the [Official Freedesktop Wiki](https://www.freedesktop.org/wiki/Software/systemd/).

---

## Unit File Types

Unit files end in `.service`, `.socket`, `.device`, `.timer`, and more. Here’s a quick overview:

| Unit Type | Description                                      |
| --------- | ------------------------------------------------ |
| service   | Defines how to start, stop, and manage a service |
| socket    | Configures socket activation                     |
| target    | Groups units and handles synchronization         |
| timer     | Schedules tasks similar to cron                  |

---

## Service Unit Structure

Service units reside in `/etc/systemd/system/` or `/usr/lib/systemd/system/`. They have three main sections:

```
[Unit]
Description=Human-readable description
After=network.target


[Service]
Type=simple
ExecStart=/usr/bin/myapp
Restart=on-failure


[Install]
WantedBy=multi-user.target
```

Key directives:

- **ExecStart**: Command to launch the service
- **ExecReload**: How to reload without a full restart
- **Restart**: Policy (`no`, `on-failure`, `always`)

Consult the manual for all options:

```
man systemd.service
```

---

## Inspecting the SSH Daemon Service

Most servers run the OpenSSH daemon (`sshd`) as a systemd service. View its complete unit file:

```
$ systemctl cat sshd.service
# /usr/lib/systemd/system/sshd.service
[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.target
Wants=sshd-keygen.target


[Service]
Type=notify
EnvironmentFile=/etc/crypto-policies/back-ends/opensshserver.config
EnvironmentFile=-/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS $CRYPTO_POLICY
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s


[Install]
WantedBy=multi-user.target
```

---

## Editing and Reverting a Unit

To fully edit the `sshd.service` file:

```
$ sudo systemctl edit --full sshd.service
```

To discard changes and restore the vendor-provided unit:

```
$ sudo systemctl revert sshd.service
```

---

## Monitoring Service Status

Check detailed status and recent logs:

```
$ sudo systemctl status sshd.service
```

Sample output:

```
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2021-12-08 16:48:53 CST; 15min ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 1031 (sshd)
    Tasks: 1 (limit: 23555)
   Memory: 2.1M
  CGroup: /system.slice/sshd.service
          └─1031 /usr/sbin/sshd -D -oCiphers=aes256-gcm@openssh.com,chacha20-poly1305


Dec 08 16:48:53 LFCS-CentOS systemd[1]: Starting OpenSSH server daemon...
Dec 08 16:48:53 LFCS-CentOS sshd[1031]: Server listening on 0.0.0.0 port 22.
Dec 08 16:48:53 LFCS-CentOS systemd[1]: Started OpenSSH server daemon.
```

Press `Q` to exit.

---

## Managing Service Lifecycle

Use `systemctl` for day-to-day operations:

| Operation         | Command                                         | Description                               |
| ----------------- | ----------------------------------------------- | ----------------------------------------- |
| Start             | `sudo systemctl start sshd.service`             | Launch the service immediately            |
| Stop              | `sudo systemctl stop sshd.service`              | Stop the service                          |
| Restart           | `sudo systemctl restart sshd.service`           | Stop and then start the service           |
| Reload            | `sudo systemctl reload sshd.service`            | Reload configuration without full restart |
| Reload or Restart | `sudo systemctl reload-or-restart sshd.service` | Try reload, else restart                  |

---

## Enabling and Disabling at Boot

Control automatic startup:

```
# Enable at boot
$ sudo systemctl enable sshd.service


# Disable at boot
$ sudo systemctl disable sshd.service


# Check status
$ sudo systemctl is-enabled sshd.service
```

Combine with `--now` to apply immediately:

```
# Enable and start now
$ sudo systemctl enable --now sshd.service


# Disable and stop now
$ sudo systemctl disable --now sshd.service
```

> [!important]
> **Warning**
>
> Disabling and stopping `sshd.service` will prevent all SSH logins.

---

## Masking and Unmasking Services

Prevent any activation—manual or dependency-driven—by masking:

```
$ sudo systemctl mask atd.service
```

Reverse masking:

```
$ sudo systemctl unmask atd.service
```

Attempting to start a masked service results in:

```
Failed to enable unit: Unit file /etc/systemd/system/atd.service is masked.
Failed to start atd.service: Unit atd.service is masked.
```

---

## Listing All Service Units

View every service, regardless of state:

```
$ systemctl list-units --type=service --all
```

---

## Further Reading

- [systemd.service Manual](https://www.freedesktop.org/software/systemd/man/systemd.service.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/b1bf2343-f406-4f20-b97f-1c5bdc245a12)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/ca5e9d7c-9dac-4ecc-9e21-dafef5ef2641/lesson/056b53be-ae53-416a-9c5f-5b9c77d5c7e6)**
>
> Practice lab
