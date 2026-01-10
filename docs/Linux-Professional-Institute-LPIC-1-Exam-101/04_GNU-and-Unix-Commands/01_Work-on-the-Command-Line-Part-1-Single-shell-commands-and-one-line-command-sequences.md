# Work on the Command Line Part 1 Single shell commands and one line command sequences - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Work-on-the-Command-Line-Part-1-Single-shell-commands-and-one-line-command-sequences)

---

## Table of Contents

- Work on the Command Line Part 1 Single shell commands and one line command sequences
  - Four Primary Linux Login Methods
  - Consoles vs. Terminal Emulators
  - Local Text-Mode Login
  - Local Graphical-Mode Login
  - Remote Text-Mode Login via SSH
  - Remote Graphical-Mode Login (VNC / RDP)
  - Further Reading & References
  - Watch Video

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Work on the Command Line Part 1 Single shell commands and one line command sequences

In this guide, you’ll master four primary Linux login methods—both local and remote, text-based and graphical-mode. We’ll begin with a high-level overview, then dive into each approach with hands-on examples and best practices. This structured, practical walkthrough is perfect for sysadmins, DevOps engineers, and Linux enthusiasts.

## Four Primary Linux Login Methods

| Login Method                         | Description                               | Use Case                             |
| ------------------------------------ | ----------------------------------------- | ------------------------------------ |
| Local text-mode console              | Direct tty login via Ctrl+Alt+Fn          | Servers without X11/Wayland          |
| Local graphical-mode console         | GUI login manager (GDM, LightDM, SDDM)    | Workstations and desktops            |
| Remote text-mode via SSH             | Secure Shell connection                   | Headless servers, automation scripts |
| Remote graphical-mode via VNC or RDP | Remote Desktop Protocol (RDP/VNC clients) | Remote GUI access, support, demos    |

![The image illustrates four login methods: local text-mode console, remote text-mode login, local graphical-mode console, and remote graphical-mode login. Each method is represented with icons showing user and console interactions.](https://kodekloud.com/kk-media/image/upload/v1752881414/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Work-on-the-Command-Line-Part-1-Single-shell-commands-and-one-line-command-sequences/login-methods-icons-console-remote-local.jpg)

---

## Consoles vs. Terminal Emulators

A _console_ historically meant a physical keyboard and monitor connected to a host. Today it usually refers to virtual terminals (VTs) that display boot messages or provide text logins. A _terminal emulator_ is a GUI application (GNOME Terminal, Konsole, xterm) that mimics a console within your desktop.

```
[  OK  ] Mounted Mount unit for snapd, revision 13270.
[  OK  ] Finished Tell Plymouth To Write Out Runtime Data...
[  OK  ] Starting Network Time Synchronization...
[  OK  ] Reached target Network Name Lookups.
```

After boot, switch to VT2 with:

```
Ctrl + Alt + F2
```

Use `Ctrl + Alt + F1` (or F7) to return to your GUI session.

> [!important]
> **Note**
>
> Virtual terminals let you run multiple independent login sessions in text mode.
> Use `chvt N` as root to switch from the shell.

---

## Local Text-Mode Login

On a headless server or in a VM without X11/Wayland, you log in at the console:

```
CentOS Stream 8
Kernel 4.18.0-338.el8.x86_64 on an x86_64


LFCS-CentOS login: aaron
Password:
```

1.  Type your username at the `login:` prompt and press Enter.
2.  Enter your password (no characters appear on screen).
3.  To end the session, type:

```
exit
```

> [!important]
> **Note**
>
> Passwords aren’t echoed for security. If you mistype, press Enter and retry.

---

## Local Graphical-Mode Login

Graphical login managers (GDM, LightDM, SDDM) present a friendly GUI:

1.  Select or type your username.
2.  Enter your password in the input field.
3.  Press Enter or click **Sign In**.

![The image shows a CentOS login screen with a list of user accounts, highlighting one named "Aaron." The screen is labeled "Local GUI" and includes icons for system functions.](https://kodekloud.com/kk-media/image/upload/v1752881415/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Work-on-the-Command-Line-Part-1-Single-shell-commands-and-one-line-command-sequences/centos-login-screen-local-gui-aaron.jpg)

> [!important]
> **Warning**
>
> Always log out or lock your session when leaving your workstation unattended.

---

## Remote Text-Mode Login via SSH

SSH (Secure Shell) is the industry standard for encrypted text-mode logins. Telnet is deprecated because it transmits credentials in plain text.

| Protocol | Security   | Port | Example Client         |
| -------- | ---------- | ---- | ---------------------- |
| SSH      | Encrypted  | 22   | `ssh`, PuTTY           |
| Telnet   | Plain text | 23   | `telnet` (discouraged) |

![The image illustrates remote text-mode login methods, comparing SSH (Secure Shell) as a secure option and Telnet as an insecure option.](https://kodekloud.com/kk-media/image/upload/v1752881416/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Work-on-the-Command-Line-Part-1-Single-shell-commands-and-one-line-command-sequences/remote-login-methods-ssh-telnet-comparison.jpg)

1.  Find the server’s IP address:

```
ip addr show
```

2.  Look for a line like `inet 192.168.0.17/24`.
3.  Connect via SSH:

```
ssh aaron@192.168.0.17
```

4.  Enter your password when prompted. Once authenticated, you’re at the remote shell:

```
[aaron@LFCS-CentOS ~]$
```

> [!important]
> **Note**
>
> You can also use SSH keys for passwordless login:
> `ssh-keygen` → `ssh-copy-id aaron@192.168.0.17`.

---

## Remote Graphical-Mode Login (VNC / RDP)

For full desktop access over the network:

1.  Install or enable a VNC/RDP server on the host:
    - VNC: TigerVNC, RealVNC
    - RDP: xrdp
2.  On your client, open the matching viewer (RealVNC Viewer, Microsoft Remote Desktop).
3.  Enter the server’s IP and port (e.g., `192.168.0.17:1` for VNC).
4.  Authenticate with your Linux credentials.

> [!important]
> **Note**
>
> Performance and encryption depend on your server’s configuration. For secure tunnels, combine VNC with SSH port forwarding:
>
> ```
> ssh -L 5901:localhost:5901 aaron@192.168.0.17
> ```
>
> Then point your VNC client at `localhost:5901`.

---

## Further Reading & References

- [OpenSSH Official Documentation](https://www.openssh.com/manual.html)
- [Linux Virtual Consoles & Terminal Tutorial](https://wiki.archlinux.org/title/Virtual_console)
- [TigerVNC User Guide](https://tigervnc.org/doc/)
- [xrdp GitHub Repository](https://github.com/neutrinolabs/xrdp)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/5e5b5093-a736-483c-a6f6-b5edaab32dec)**
>
> Watch video content
