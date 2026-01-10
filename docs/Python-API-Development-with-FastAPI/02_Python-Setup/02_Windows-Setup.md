# Windows Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Python-Setup/Windows-Setup)

---

## Table of Contents

- Windows Setup
  - Installing Python on Windows
  - Installing Visual Studio Code
  - Configuring VS Code with the Python Extension
  - Creating Your Project Folder and Testing Environment
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Python Setup

# Windows Setup

This guide provides step-by-step instructions to install Python and Visual Studio Code (VS Code) on a Windows machine. Follow along to configure your development environment for Python API development with FastAPI.

## Installing Python on Windows

1.  Open your web browser and search for "Python". Click the first result to navigate to the [official Python website](https://www.python.org/).
2.  In the Downloads section, locate the latest Python version. At the time of this writing, the version is Python 3.9.6. If a newer version (greater than Python 3.7) is available when you access this guide, download that version.
3.  Click the **Download Python 3.9.6** button. Once the download is complete, run the installer.
4.  > [!important]
    > **Important**
    >
    > Before clicking the Install button, ensure you select the checkbox labeled "Add Python 3.9 to PATH". If you miss this step, you might face issues later. In case it’s skipped, you can always uninstall and reinstall Python with the correct settings.
5.  Accept any User Account Control prompts during installation. When you see the confirmation message that Python was installed successfully, the setup is complete.
6.  To verify the installation, open the Command Prompt by searching for it in the Start menu and run the following command:

    ```
    py -3 --version
    ```

    The command should output the installed Python version (for example, "Python 3.9.6"). If you encounter an error or the command is not recognized, repeat the installation process.

![The image shows a Windows desktop with a web browser open to the Python download page, and a pop-up indicating that the Python setup was successful.](https://kodekloud.com/kk-media/image/upload/v1752883464/notes-assets/images/Python-API-Development-with-FastAPI-Windows-Setup/windows-desktop-python-download-success.jpg)

## Installing Visual Studio Code

1.  Open a new browser tab and search for "VS Code". Navigate to the [VS Code download page](https://code.visualstudio.com/). The website should auto-detect your operating system and suggest the appropriate download option (select "Download for Windows"). Once the download is complete, run the installer.
2.  During installation, accept the license agreement and proceed with the default settings by clicking **Next** until the installation commences. Once complete, VS Code will launch automatically.

![The image shows a Windows desktop with a Visual Studio Code installation window open, displaying additional setup tasks. The background is a webpage for downloading Visual Studio Code.](https://kodekloud.com/kk-media/image/upload/v1752883465/notes-assets/images/Python-API-Development-with-FastAPI-Windows-Setup/windows-desktop-visual-studio-code.jpg)

## Configuring VS Code with the Python Extension

1.  When VS Code opens, install the Python extension to enable features like IntelliSense, linting, and debugging. Click the **Extensions** icon (found on the left sidebar) and search for "Python".
2.  Locate the first result from Microsoft (look for the star icon) and click **Install**.
3.  After installation, close the extension sidebar to return to the main file explorer in VS Code.

![The image shows a Windows desktop with Visual Studio Code open, displaying the Python extension installation page. In the background, a web browser is open to the Python download page.](https://kodekloud.com/kk-media/image/upload/v1752883467/notes-assets/images/Python-API-Development-with-FastAPI-Windows-Setup/windows-desktop-visual-studio-code-python.jpg)

## Creating Your Project Folder and Testing Environment

1.  **Create a Project Folder**  
    It is considered best practice to organize your application code in a dedicated folder. In VS Code, click on **Open Folder** and select or create a folder for your project (for example, a folder named "FastAPI" in your Documents). If you receive a security prompt asking if you trust the authors of the files, click **Yes**. You may close the welcome screen once your project folder is open.

![The image shows a Windows desktop with Visual Studio Code open, displaying a prompt asking if the user trusts the authors of the files in a folder. In the background, a web browser is open to a Visual Studio Code documentation page.](https://kodekloud.com/kk-media/image/upload/v1752883468/notes-assets/images/Python-API-Development-with-FastAPI-Windows-Setup/windows-desktop-visual-studio-code-prompt.jpg)

2.  **Create a New Python File**  
    With your project folder open, right-click inside the Explorer pane and choose **New File**. Name the file **main.py**. The Python extension will automatically activate and will attempt to locate the correct interpreter (e.g., Python 3.9.6).
3.  If you have multiple Python versions installed and the extension selects the wrong interpreter, you can change it by opening the Command Palette (via **View > Command Palette**) and searching for "Python: Select Interpreter." Then, choose **Enter interpreter path** and provide the correct path to the desired Python version.

![The image shows a Windows desktop with Visual Studio Code open, displaying a Python file named "main.py" and a command palette with Python-related options.](https://kodekloud.com/kk-media/image/upload/v1752883469/notes-assets/images/Python-API-Development-with-FastAPI-Windows-Setup/windows-desktop-visual-studio-code-python-2.jpg)

## Conclusion

You have now successfully installed Python, set up VS Code with the Python extension, and created a dedicated project folder with a test Python file. In future sections, we will cover additional configurations and project-specific details to further enhance your development environment.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/441565b9-9f18-459f-9b0b-252b1caff7b1/lesson/6207ffa5-0678-4b55-a232-6f6069980646)**
>
> Watch video content
