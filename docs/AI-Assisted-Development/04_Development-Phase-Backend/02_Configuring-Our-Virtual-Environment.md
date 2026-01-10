# Configuring Our Virtual Environment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Backend/Configuring-Our-Virtual-Environment)

---

## Table of Contents

- Configuring Our Virtual Environment
  - Setting Up Your Tools
  - Creating a Python Virtual Environment
  - Next Steps
  - Watch Video
    - Example: Flask Application Code Snippet

---

## Content

AI-Assisted Development

Development Phase Backend

# Configuring Our Virtual Environment

In this guide, we will walk you through setting up your development tools and configuring a Python virtual environment. This process is crucial because it isolates your project’s dependencies, ensuring that packages are managed on a per-project basis. You have several options for creating a Python virtual environment, including Conda, MiniConda, and Python’s built-in virtual environments. For simplicity and consistency, we will use Python’s built-in virtual environment.

A virtual environment encapsulates all the dependencies required for your project. Without it, installing a package like OpenCV globally makes it available to every Python project on your system. However, if different projects require different package versions, global management quickly becomes problematic. By using a virtual environment, you can maintain unique, isolated installations for each project. Typically, you'll list your dependencies in a file named requirements.txt, which can be shared via platforms like GitHub with the following command:

```
pip install -r requirements.txt
```

> [!important]
> **Note**
>
> Using a requirements.txt file helps you maintain consistency and makes onboarding contributors easier since they can quickly set up their development environment.

## Setting Up Your Tools

Begin by opening your preferred code editor and navigating to its Extensions view. In this lesson, we employ tools such as GitHub Copilot, GitHub Copilot Chat, BlackboxAI, and Tabnine. If these extensions are not already installed, search for them in the Extensions marketplace and install them accordingly. Upon installation, GitHub Copilot may prompt you to authenticate via GitHub. These extensions typically appear in the lower left-hand corner of your editor and provide AI-driven code suggestions and chat features, which can greatly enhance your productivity.

### Example: Flask Application Code Snippet

Consider the following sample code snippet from a Flask application. This snippet demonstrates how to handle update and delete operations within your virtual environment:

```
@app.route('/update-todo/<id>')
def update_todo(id):
    todo = [todo for todo in todos if todo['id'] == id][0]
    todo['title'] = request.form['title']
    todo['completed'] = False
    return redirect('/')


@app.route('/delete-todo/<id>')
def delete_todo(id):
    todo = [todo for todo in todos if todo['id'] == id][0]
    todos.remove(todo)
    return redirect('/')


if __name__ == "__main__":
    app.run()
```

## Creating a Python Virtual Environment

Follow these steps to create and activate your Python virtual environment:

1.  **Navigate to Your Project Directory:**  
    Open your terminal and change the directory to your project folder. In our example, the project is called "image optimizer".
2.  **Create the Virtual Environment:**  
    Execute the following command to generate a Python virtual environment named “venv”:

    ```
    python3 -m venv venv
    ```

    Using a consistent name like “venv” simplifies project setup and is frequently included in .gitignore files. This command creates a folder named “venv” that houses all the necessary scripts, libraries, and the current Python interpreter (e.g., Python 3.12). Any package you install while the virtual environment is active will reside in this directory.

3.  **Activate the Virtual Environment:**  
    Within the “venv” folder, a directory called "bin" (or "Scripts" on Windows) contains the activation scripts. For Unix-based systems, activate your environment with:

    ```
    source venv/bin/activate
    ```

    Once activated, your terminal prompt will change to show that you are now working within your virtual environment (commonly indicated by a “(venv)” prefix). Since the correct interpreter is now in use, you can simply run “python” instead of “python3”.

    > [!important]
    > **Activation Commands for Different Shells**
    >
    > If you use a different shell, follow these commands:
    >
    > - For C shell (csh):
    >
    > ```
    > source venv/bin/activate.csh
    > ```
    >
    > - For Fish shell:
    >
    > ```
    > source venv/bin/activate.fish
    > ```
    >
    > - On Windows (PowerShell):
    >
    > ```
    > .\venv\Scripts\Activate.ps1
    > ```

Below is an excerpt from the C shell activation script (do not modify):

```
# This file must be used with "source bin/activate.csh" *from csh*.
# Created by Davide Di Blasi <davidebg@gmail.com>.
alias deactivate 'test $?_OLD_VIRTUAL_PATH != 0 && setenv PATH "$_OLD_VIRTUAL_PATH" && unset "$_OLD_VIRTUAL_PATH"'


# Unset irrelevant variables.
deactivate nondestructive


setenv VIRTUAL_ENV "/Users/jeremy/Projects/genaicourse/imageoptimizer/venv"
set _OLD_VIRTUAL_PATH="$PATH"
setenv PATH "$VIRTUAL_ENV/bin:$PATH"
```

After activating your environment, your terminal may display something similar to the following:

```
jeremy@Jeremys-Mac-Studio imageoptimizer % python3 -m venv venv
jeremy@Jeremys-Mac-Studio imageoptimizer % source venv/bin/activate
(venv) jeremy@Jeremys-Mac-Studio imageoptimizer %
```

With your virtual environment now set up and activated, you can install packages such as OpenCV, requests, and any other dependencies your project requires. This approach guarantees that your project remains self-contained and portable.

## Next Steps

Up next, we will begin creating our project structure. Stay tuned as we guide you through building a robust, isolated development environment that streamlines your workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/0f8882f1-0976-491e-8243-9b522243717f/lesson/41cb3a33-2fc6-4b9f-9b8d-fc04c8d26c37)**
>
> Watch video content
