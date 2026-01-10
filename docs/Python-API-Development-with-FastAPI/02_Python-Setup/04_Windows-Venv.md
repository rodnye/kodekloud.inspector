# Windows Venv - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Python-Setup/Windows-Venv)

---

## Table of Contents

- Windows Venv
  - Step 1: Open VS Code and Navigate to Your Project Directory
  - Step 2: Create the Virtual Environment
  - Step 3: Configure the Python Interpreter in VS Code
  - Step 4: Activate the Virtual Environment
  - Watch Video

---

## Content

Python API Development with FastAPI

Python Setup

# Windows Venv

In this lesson, you'll learn how to set up a virtual environment on a Windows machine using Visual Studio Code (VS Code). This process ensures that your project dependencies remain isolated from the global Python installation.

## Step 1: Open VS Code and Navigate to Your Project Directory

Launch VS Code and open the directory containing your project files. Next, open a new integrated terminal:

1.  Click "Terminal" in the top menu.
2.  Select "New Terminal."

The integrated terminal functions like a standard Windows terminal but is conveniently built into VS Code. You can run multiple terminals simultaneously and even switch between different terminal types (e.g., PowerShell and Command Prompt) based on your preference.

![The image shows a Visual Studio Code interface with a Python file named "main.py" open and an integrated terminal running PowerShell. The terminal displays the directory path and a prompt.](https://kodekloud.com/kk-media/image/upload/v1752883470/notes-assets/images/Python-API-Development-with-FastAPI-Windows-Venv/vscode-python-main-terminal-powershell.jpg)

## Step 2: Create the Virtual Environment

Use Python's built-in `venv` module to create an isolated environment. You can name your virtual environment anything you like (commonly "venv" or the project name). Run the following command in the terminal:

```
C:\Users\sanjeev\Documents\fastapi>py -3 -m venv venv
```

Once executed, a folder named "venv" (or your chosen name) will be created within your project directory. This folder contains the Python executable and all libraries specific to this virtual environment.

## Step 3: Configure the Python Interpreter in VS Code

Although you started with the global Python interpreter, it's important to switch to the one inside your virtual environment. Follow these steps:

1.  Open the Command Palette by navigating to **View → Command Palette**.
2.  Search for and select **Python: Select Interpreter**.
3.  In the list of interpreters, click on **Enter interpreter path**.
4.  Provide the path to the Python executable in your virtual environment. The typical path structure is:

    ```
    <project_directory>\venv\Scripts\python.exe
    ```

After selection, VS Code will display the virtual environment's Python version (e.g., Python 3.9.6), ensuring that all future package installations are confined to this isolated setup.

## Step 4: Activate the Virtual Environment

In the integrated terminal, activate your virtual environment by executing:

```
C:\Users\sanjeev\Documents\fastapi>venv\Scripts\activate.bat
```

Once activated, the command prompt will change to include the virtual environment's name, as shown:

```
(venv) C:\Users\sanjeev\Documents\fastapi>
```

> [!important]
> **Note**
>
> Always verify that your virtual environment is active before installing any packages. If the terminal reverts to the global Python interpreter, simply reactivate it using the command above.

At this point, your virtual environment is fully set up and ready for development. Enjoy coding in your isolated environment!

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/441565b9-9f18-459f-9b0b-252b1caff7b1/lesson/a0b10908-41da-44a8-8876-ff84cf38d828)**
>
> Watch video content
