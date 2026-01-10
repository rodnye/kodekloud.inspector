# Log into local amp remote graphical and text mode consoles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-System-Administration-for-Beginners/Essential-Commands/Log-into-local-amp-remote-graphical-and-text-mode-consoles)

---

## Table of Contents

- Log into local amp remote graphical and text mode consoles
  - Overview of Linux Login Methods
  - Console vs. Terminal Emulator
  - 1. Local Graphical-Mode Console
  - 2. Local Text-Mode Console
  - 3. Remote Graphical-Mode Console
  - 4. Remote Text-Mode Login (SSH)
  - Next Steps
  - Watch Video
    - Switching to a Virtual Terminal
    - Finding Your Server’s IP Address
    - Connecting with SSH

---

## Content

Linux System Administration for Beginners

Essential Commands

# Log into local amp remote graphical and text mode consoles

In this guide, you’ll learn how to authenticate to a Linux system both locally and remotely, using graphical and text-mode interfaces. We’ll experiment with commands first, then explain the concepts behind each method.

## Overview of Linux Login Methods

| Login Method           | Interface Type   | Local/Remote | Example Command         |
| ---------------------- | ---------------- | ------------ | ----------------------- |
| Local Graphical-Mode   | GUI login screen | Local        | N/A                     |
| Local Text-Mode        | Virtual terminal | Local        | N/A                     |
| Remote Graphical-Mode  | VNC / RDP client | Remote       | `vncviewer server_ip:1` |
| Remote Text-Mode (SSH) | SSH terminal     | Remote       | `ssh user@server_ip`    |

![The image illustrates four login methods: local text-mode console, remote text-mode login, local graphical-mode console, and remote graphical-mode login. Each method is represented with icons and labels.](https://kodekloud.com/kk-media/image/upload/v1752881484/notes-assets/images/Linux-System-Administration-for-Beginners-Log-into-local-amp-remote-graphical-and-text-mode-consoles/login-methods-icons-illustration.jpg)

---

## Console vs. Terminal Emulator

You may see these terms used interchangeably, but they refer to different layers:

- **Console**  
  Historically a physical keyboard + monitor connected directly to the machine. Today, it’s the text interface you see during boot or on Ctrl+Alt+F\* screens.
- **Virtual Terminal (VT)**  
  A software-only console session you switch to via Ctrl+Alt+F1–F6 (or F7 for GUI).
- **Terminal Emulator**  
  A graphical application (e.g., GNOME Terminal, Konsole, Windows Terminal) that mimics console behavior in a window.

When Linux boots, systemd and the kernel log messages to the console:

```
[  OK  ] Mounted Mount unit for snapd, revision 13270.
[  OK  ] Reached target Local File Systems.
[   7.055053] cloud-init[655]: Cloud-init v.21.2 running 'init-local'
[  OK  ] Started Network Services.
```

### Switching to a Virtual Terminal

1.  Press **Ctrl+Alt+F2** to open `vt2`.
2.  You’ll see a login prompt:

```
CentOS Linux 8
Kernel 4.18.0-305.19.1.el8_4.x86_64 on an x86_64
Activate the web console with: systemctl enable --now cockpit.socket
centos-vm login: _
```

3.  Enter your username and password.

---

## 1\. Local Graphical-Mode Console

On desktop distributions with a GUI (GNOME, KDE, etc.), you’ll be greeted by a graphical login manager (GDM, SDDM, LightDM):

![The image shows a CentOS login screen with a list of user accounts, highlighting the user "Aaron." It is labeled "Local GUI" at the top.](https://kodekloud.com/kk-media/image/upload/v1752881484/notes-assets/images/Linux-System-Administration-for-Beginners-Log-into-local-amp-remote-graphical-and-text-mode-consoles/centos-login-screen-local-gui-aaron.jpg)

1.  Select your username.
2.  Enter your password.
3.  You’re now logged into your desktop session.

To log out, use the GUI menu or exit your terminal emulator:

```
exit
```

---

## 2\. Local Text-Mode Console

Server installations often omit the GUI. Instead, you log in on a virtual terminal:

```
CentOS Stream 8
Kernel 4.18.0-338.el8.x86_64 on an x86_64


Activate the web console with: systemctl enable --now cockpit.socket


LFCS-CentOS login: aaron
Password:
```

> Password characters are not echoed for security.  
> After your work, type `exit` to log out of that VT session.

---

## 3\. Remote Graphical-Mode Console

Remote desktop requires server-side support. Common options:

- **VNC (Virtual Network Computing)**
  - Servers: TigerVNC, RealVNC
  - Clients: `vncviewer server_ip:1`
- **RDP (Remote Desktop Protocol)**
  - Servers: xrdp
  - Clients: Windows Remote Desktop, `rdesktop`, `xfreerdp`

> [!important]
> **Tip**
>
> Ensure the appropriate ports are open (e.g., TCP 5900 for VNC, TCP 3389 for RDP) and secured with strong passwords or SSH tunnels.

---

## 4\. Remote Text-Mode Login (SSH)

Secure Shell (SSH) is the de facto standard for remote Linux administration. It encrypts all data, unlike Telnet.

![The image illustrates remote text-mode login methods, comparing SSH (Secure SHell) with a secure connection and Telnet with an unsecured connection.](https://kodekloud.com/kk-media/image/upload/v1752881485/notes-assets/images/Linux-System-Administration-for-Beginners-Log-into-local-amp-remote-graphical-and-text-mode-consoles/remote-login-methods-ssh-telnet-comparison.jpg)

### Finding Your Server’s IP Address

On the server or VM, run:

```
ip a
```

Look for the `inet` entry on your network interface, for example:

```
2: enp0s3: <...> mtu 1500
    inet 192.168.0.17/24 brd 192.168.0.255 scope global dynamic enp0s3
```

Here, the IP address is **192.168.0.17**.

### Connecting with SSH

On Linux or macOS, open a terminal. On Windows 10+, use Command Prompt or PowerShell:

```
ssh aaron@192.168.0.17
```

You’ll be prompted for your password:

```
aaron@192.168.0.17's password:
Activate the web console with: systemctl enable --now cockpit.socket


Last login: Tue Oct 19 20:27:15 2021 from 192.168.0.3
[aaron@LFCS-CentOS ~]$
```

Replace `aaron` and `192.168.0.17` with your own username and server address.

> [!important]
> **Warning**
>
> Never use Telnet for remote administration; it transmits credentials in plaintext. Always prefer SSH or tunneled VNC/RDP.

---

## Next Steps

Practice each login method to get comfortable with Linux consoles. For more details:

- [OpenSSH Documentation](https://www.openssh.com/manual.html)
- [VNC on Linux](https://wiki.archlinux.org/title/VNC)
- [xrdp Remote Desktop](https://github.com/neutrinolabs/xrdp)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-system-administration-for-beginners/module/cc1949d1-8171-4c8c-b69f-86f96cad0bbe/lesson/40b5f074-d061-48c5-bd72-e052089081bd)**
>
> Watch video content
