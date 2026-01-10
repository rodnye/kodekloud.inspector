# Mac Install Vscode Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Python-Setup/Mac-Install-Vscode-Setup)

---

## Table of Contents

- Mac Install Vscode Setup
  - Installing Python
  - Installing Visual Studio Code
  - Setting Up Your Project Folder
  - Final Steps
  - Watch Video

---

## Content

Python API Development with FastAPI

Python Setup

# Mac Install Vscode Setup

In this guide, we'll walk you through installing Python and setting up Visual Studio Code (VS Code) on a Mac. This step-by-step tutorial is designed to help you create a powerful development environment optimized for Python programming with FastAPI.

## Installing Python

Begin by visiting the official [Python website](https://www.python.org) and navigating to the Downloads section. The site automatically detects your platform and displays the latest compatible version (for example, Python 3.9.6). Any version after 3.7 is fully supported for this guide.

Click the download button to get the installer. Once the download is complete, open the file and follow the installation prompts: click Continue, agree to the license terms, and then click Install. If prompted, enter your password. When you see the confirmation pop-up, Python is successfully installed. Feel free to close the installer and move it to the trash.

Next, launch the Terminal by searching for it in the top search bar.

![The image shows a macOS desktop with multiple windows open, including a Python installation window, a Finder window displaying Python files, and a web page for downloading Python.](https://kodekloud.com/kk-media/image/upload/v1752883455/notes-assets/images/Python-API-Development-with-FastAPI-Mac-Install-Vscode-Setup/macos-desktop-python-windows.jpg)

In the Terminal, verify your Python installation by running:

```
python3 --version
```

This command should output the version you installed (e.g., Python 3.9.6), confirming a successful Python 3 installation on your system.

## Installing Visual Studio Code

Visual Studio Code (VS Code) is a versatile editor that serves as an Integrated Development Environment (IDE). To install VS Code, follow these steps:

1.  Search for "VS Code" online to visit the official Microsoft Visual Studio Code page.
2.  The website will auto-detect your operating system. Click on "Download Mac Universal" to download the installer.
3.  Open the downloaded installer. If a security warning appears, simply click "Open" to proceed.

After installation, launch VS Code. Initially, VS Code operates as a basic text editor, but its functionality can be extended using powerful extensions.

```
Last login: Sat Aug 14 16:16:18 on ttys000
My-MacBook-Pro:~ user$ python3 --version
```

![The image shows a Mac desktop with a browser window open to the Visual Studio Code website, alongside a Finder window displaying files.](https://kodekloud.com/kk-media/image/upload/v1752883457/notes-assets/images/Python-API-Development-with-FastAPI-Mac-Install-Vscode-Setup/mac-desktop-visual-studio-code.jpg)

To enhance VS Code for Python development:

1.  Click the Extensions icon (depicted as blocks or squares) in the sidebar.
2.  Search for "Python" and install the extension provided by Microsoft. This extension delivers valuable features such as linting, IntelliSense, and debugging capabilities.

![The image shows a macOS desktop with Visual Studio Code open, displaying the Python extension page. A Finder window is also visible in the background.](https://kodekloud.com/kk-media/image/upload/v1752883458/notes-assets/images/Python-API-Development-with-FastAPI-Mac-Install-Vscode-Setup/macos-desktop-visual-studio-code-python.jpg)

## Setting Up Your Project Folder

Once both Python and VS Code are ready, it's time to set up your project folder:

1.  In VS Code, choose "Open Folder" from the File menu.
2.  Navigate to your desired directory (for example, inside your Documents folder), and create a new folder named "FastAPI" to store your project files.
3.  Open the "FastAPI" folder in VS Code. Initially, the folder will be empty, ready for your project.

![The image shows a macOS desktop with Visual Studio Code open, displaying a file explorer window and a "Getting Started" guide. The dock at the bottom contains various application icons.](https://kodekloud.com/kk-media/image/upload/v1752883460/notes-assets/images/Python-API-Development-with-FastAPI-Mac-Install-Vscode-Setup/macos-desktop-visual-studio-code.jpg)

Inside the folder, right-click and choose "New File." Name the file "main.py" and press Enter. When you create the file, the Python extension activates and automatically selects a Python interpreter. If you have multiple Python versions installed, ensure that the correct interpreter (preferably Python 3.9.6) is selected.

If you need to change the interpreter, open the Command Palette from the View menu and choose "Python: Select Interpreter." This allows you to select or manually specify your desired Python version.

> [!important]
> **Note**
>
> On macOS, the Python executable is not named python.exe. If you need to override the default, locate the appropriate Python installation on your system.

## Final Steps

With your system configured, your development environment is now ready for coding. In the future, simply reopen VS Code and load your project folder (e.g., "FastAPI") to continue working seamlessly.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/441565b9-9f18-459f-9b0b-252b1caff7b1/lesson/03991740-148a-4c0f-ad0e-6228dc51e9fc)**
>
> Watch video content
