# Python PIP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Applications-Basics/Python-PIP)

---

## Table of Contents

- Python PIP
  - Installing Packages
  - Importing Packages and sys.path
  - Managing Dependencies with requirements.txt
  - Upgrading and Uninstalling Packages
  - Additional Package Management Tools
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Applications Basics

# Python PIP

In this lesson, we will explore the fundamentals of package management in Python using PIP—the default package manager that is installed automatically with Python. When installing multiple Python versions (for example, Python 2 and Python 3) on the same system, each version comes with its own PIP: pip2 for Python 2 and pip3 for Python 3. Running the PIP command with the `-V` option displays the associated Python version. Consider the following examples:

```
python2 -V
pip2 -V
python3 -V
pip3 -V
# pip 9.0.3 from /usr/lib/python3.6/site-packages (python 3.6)
```

> [!important]
> **Note**
>
> If the command is simply `pip` without a version specifier, running `pip -V` will help determine which Python version it is associated with. Using the wrong version might result in installing libraries in an unintended environment.

## Installing Packages

To install a package with PIP, use the following syntax. For example, installing the popular Flask web framework can be done as:

```
pip install flask
```

When Python is installed, a version-specific directory is created under the user library path. Each Python installation maintains its own `site-packages` folder where packages are stored. For instance, if Flask is installed using pip for Python 2, the installation path might look like this:

- For 32-bit packages
- For 64-bit packages
  - Python 2.7: `/usr/lib64/python2.7/site-packages`
  - Python 3.6: `/usr/lib/python3.6/site-packages`

This separation is important for troubleshooting issues where an application cannot locate installed packages. To check where a specific package is installed, use the `pip show` command:

```
pip show flask
```

An example output may be:

```
Name: Flask
Version: 1.1.1
Summary: A simple framework for building complex web applications.
Home-page: https://palletsprojects.com/p/flask/
Author: Armin Ronacher
Author-email: armin.ronacher@active-4.com
License: BSD-3-Clause
Location: /usr/lib64/python2.7/site-packages
Requires: Werkzeug, click, Jinja2, itsdangerous
```

## Importing Packages and sys.path

When you import a package using the `import` statement, Python searches through directories listed in `sys.path`. To inspect these directories, run:

```
python2 -c "import sys; print(sys.path)"
```

This command produces an output similar to:

```
['/usr/lib/python27.zip',
 '/usr/lib64/python2.7/plat-linux2',
 '/usr/lib/python2.7/lib-tk',
 '/usr/lib/python2.7/lib-old',
 '/usr/lib/python2.7/dylib',
 '/usr/lib/python2.7/site-packages']
```

If an import fails, reviewing the paths in `sys.path` can help identify whether the package was installed in a different location or for another Python version.

## Managing Dependencies with requirements.txt

For larger applications that require multiple packages, it is common to list all dependencies in a file named `requirements.txt`. You can then install all dependencies simultaneously by running:

```
pip install -r requirements.txt
```

A typical `requirements.txt` file includes package names along with specific versions to avoid compatibility issues. For example:

```
Flask==0.10.1
Jinja2==2.7.3
MarkupSafe==0.23
Werkzeug==0.9.6
requests==2.3.0
gunicorn==18.0
```

Storing dependencies with explicit versions ensures consistency for all developers setting up the project using a single command.

## Upgrading and Uninstalling Packages

When a new version of a package becomes available, you can upgrade it using:

```
pip install flask --upgrade
```

The upgrade process may produce output similar to:

```
Installing collected packages: click, flask
Attempting uninstall: flask
Found existing installation: Flask 0.10.1
Uninstalling Flask-0.10.1:
Successfully uninstalled Flask-0.10.1
Successfully installed click-7.1.1 flask-1.1.1
```

To uninstall a package, run:

```
pip uninstall package_name
```

## Additional Package Management Tools

Apart from PIP, Python supports other package management tools such as easy_install. Originally, easy_install was used in combination with setuptools to package Python code into a zipped format known as "eggs" (similar to JAR files in Java). Alternatively, you can install or place the egg file in a directory accessible to Python.

Another packaging format is the wheel (with the `.whl` extension). Unlike eggs, wheels require installation (unpacking) before use. They can be installed with a command like:

```
pip install app.whl
```

## Summary

Python package management with PIP enables you to install, upgrade, and uninstall packages while managing dependencies through a `requirements.txt` file. These tools are essential for maintaining a consistent development environment, particularly when working with multiple Python versions or architectures (32-bit vs 64-bit).

> [!important]
> **Practice Makes Perfect**
>
> Next, apply what you've learned by practicing package management with Python. In the exercise, you will:
>
> - Identify the list of packages to install.
> - Locate where packages are installed.
> - Work with different versions of PIP.
> - Upgrade and uninstall packages.
> - Utilize `requirements.txt` for dependency management.

Happy coding, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/0381d9c7-c268-4a11-807d-0b44b5027c47)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/708d118b-adc4-49d2-b6d8-ebec6dbed209)**
>
> Practice lab
