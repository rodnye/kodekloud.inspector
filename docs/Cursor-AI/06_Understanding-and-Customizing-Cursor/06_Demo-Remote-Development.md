# Demo Remote Development - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Understanding-and-Customizing-Cursor/Demo-Remote-Development)

---

## Table of Contents

- Demo Remote Development
  - Prerequisites
  - 1. Install the Remote – SSH Extension
  - 2. Configure a New SSH Host
  - 3. Connect to the Remote Host
  - 4. Open a Remote Workspace
  - 5. Use the Integrated Terminal
  - 6. Verify Remote OS Kernel
  - 7. Sample Python Function on the Remote Host
  - 8. Connecting to macOS or Windows Hosts
  - Links and References
  - Watch Video

---

## Content

Cursor AI

Understanding and Customizing Cursor

# Demo Remote Development

Enable full-featured remote development over SSH on Linux, macOS, or Windows—all from the Cursor AI client. This guide leverages the [Remote – SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) in Cursor, identical to Visual Studio Code’s setup.

## Prerequisites

> [!important]
> **Note**
>
> – Ensure you have SSH access to your target machine (password or key-based).
> – Cursor AI must be installed on your local computer.
> – You’ll need network connectivity and the SSH daemon running on the remote host.

## 1\. Install the Remote – SSH Extension

1.  Open Cursor AI.
2.  Go to the Extensions view (`Ctrl+Shift+X` / `⌘+Shift+X`).
3.  Search for **Remote – SSH** and click **Install**.  
    ![The image shows the Visual Studio Code interface with the "Remote - SSH" extension page open, detailing its features and installation information. The sidebar displays other related extensions available for installation.](https://kodekloud.com/kk-media/image/upload/v1752872815/notes-assets/images/Cursor-AI-Demo-Remote-Development/visual-studio-code-remote-ssh-extension.jpg)

## 2\. Configure a New SSH Host

1.  Click the **\><** icon in the status bar, then **Add New SSH Host**.
2.  Enter your connection string, e.g.:

    ```
    jeremy@10.0.0.94
    ```

3.  Choose which SSH config file to update (usually `~/.ssh/config`).  
    ![The image shows a software interface with a prompt to select an SSH configuration file, and options to open a project, clone a repository, or connect via SSH.](https://kodekloud.com/kk-media/image/upload/v1752872815/notes-assets/images/Cursor-AI-Demo-Remote-Development/ssh-configuration-file-interface.jpg)

## 3\. Connect to the Remote Host

1.  Open the Command Palette (`Ctrl+Shift+P` / `⌘+Shift+P`) and select **Remote-SSH: Connect to Host**.
2.  Choose **jeremy@10.0.0.94**.
3.  When prompted, select the remote OS and accept the host fingerprint.

    | Remote Platform | Description                                 |
    | --------------- | ------------------------------------------- |
    | Linux           | Standard distributions (Ubuntu, Arch, etc.) |
    | macOS           | Apple M-series or Intel-based               |
    | Windows         | Windows Server or Win10/11                  |

![The image shows a software interface with a dropdown menu for selecting the platform of a remote host, offering options for Linux, Windows, and macOS. Below, there are options to open a project, clone a repository, or open a new window in a program called "Cursor Pro."](https://kodekloud.com/kk-media/image/upload/v1752872816/notes-assets/images/Cursor-AI-Demo-Remote-Development/remote-host-platform-dropdown-cursor-pro.jpg)

> Cursor AI will install the VS Code Server on the remote machine and open a new window.

## 4\. Open a Remote Workspace

After connecting, use **File > Open Folder** or **Git: Clone** to start working in your remote project directory.  
![The image shows a dark-themed code editor interface with options to open a folder, clone a repository, and a terminal window at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752872817/notes-assets/images/Cursor-AI-Demo-Remote-Development/dark-code-editor-interface.jpg)

Example:

```
cd ~/KodeKloudTaskMan
```

## 5\. Use the Integrated Terminal

Every new terminal is a shell session on the remote host:

```
$ ls -la
drwxr-xr-x   3 jeremy jeremy   4096 Mar 26 20:37  .cursor
-rw-r--r--   1 jeremy jeremy      0 Mar 26 20:37  .DS_Store
drwxr-xr-x   3 jeremy jeremy   4096 Mar 26 20:37  KodeKloudTaskMan
```

Inspect running processes to verify the remote environment:

```
$ ps aux
jeremy    193885  0.0  0.0   4992  3360 pts/4    S    20:48   0:00 /usr/bin/python3 /home/jeremy/.cursor-server/extensions/ms.python.python-2024.12.3-linux-x64/python
jeremy    193886  0.0  0.0   4980  1936 pts/4    S    20:48   0:00 /usr/bin/python3 /home/jeremy/.cursor-server/cli/servers/Stable-82fe0f61c01d0791db7e5ab048849d5
```

## 6\. Verify Remote OS Kernel

```
$ uname -r
6.5.12-arch1-1
```

## 7\. Sample Python Function on the Remote Host

Here’s a quick Flask utility you might run remotely:

```
import os
import csv
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, flash, session, g
from datetime import datetime
import hashlib
import logging


app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'  # Change before production
app.config['DATABASE'] = os.path.join(app.instance_path, 'task_manager.sqlite')


def read_csv(file_path):
    """Read and print each row from a CSV file."""
    with open(file_path, newline='') as f:
        reader = csv.reader(f)
        for row in reader:
            print(row)
```

> [!important]
> **Warning**
>
> Never use `SECRET_KEY = 'dev'` in production—generate a strong, random key instead.

## 8\. Connecting to macOS or Windows Hosts

Repeat steps 2–4 with your other SSH targets:

1.  Add a new host entry, for example:

    ```
    jeremy@10.0.0.38
    ```

2.  Select **macOS** (or **Windows**).
3.  Authenticate and open your project (e.g., a Pygame simulator).  
    ![The image shows a dark-themed code editor with a project directory open on the left, a Python file in the center, and a terminal at the bottom. A "Cursor" interface is visible, offering options to open a project, clone a repo, or connect via SSH.](https://kodekloud.com/kk-media/image/upload/v1752872819/notes-assets/images/Cursor-AI-Demo-Remote-Development/dark-code-editor-python-terminal.jpg)

---

By following these steps, Cursor AI transforms any client machine into a powerful remote development workstation, leveraging specialized hardware or unique OS environments without leaving your desk.

## Links and References

- [Remote – SSH Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
- [VS Code Remote Development Docs](https://code.visualstudio.com/docs/remote/ssh)
- [OpenSSH Documentation](https://www.openssh.com/manual.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/fcc10c1c-5240-4626-9bfc-bf172a3a00c6/lesson/e0a8493f-52d3-4d87-95dd-0659f2f2c9fc)**
>
> Watch video content
