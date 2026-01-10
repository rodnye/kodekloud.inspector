# Python Package Installer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Module-Packages-and-PIP/Python-Package-Installer)

---

## Table of Contents

- Python Package Installer
  - Accessing PyPI with pip
  - Searching and Installing Packages
  - Specifying Package Versions and Uninstalling Packages
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Module Packages and PIP

# Python Package Installer

In this lesson, you'll learn how to install and manage external packages from the Python community using the centralized Python Package Index (PyPI). Maintained by the Packaging Working Group, PyPI is the primary repository for Python packages and is completely free, allowing you to install and use any available code.

## Accessing PyPI with pip

To work with PyPI packages, you need to use a tool called pip. Before installing packages, make sure that pip is installed or upgraded. Some Python installations include pip by default, while others require manual installation. You can upgrade pip using the following command:

```
python -m ensurepip --upgrade
```

You can verify that pip is installed by checking its version:

```
pip --version
```

For instance, the output might be similar to:

```
pip 21.2.dev0 from /opt/virtualenvs/python3/lib/python3.8/site-packages/pip (python 3.8)
```

> [!important]
> **Note**
>
> A working network connection is required since pip downloads packages over the internet.

## Searching and Installing Packages

You can search for packages either directly on the [PyPI website](https://pypi.org) or via the `pip search` command in your terminal. Once you find a package you want to use, you can install it using the `pip install` command.

For example, let's install the popular community package **Pygame**. After installation, you can retrieve more details about the package (such as its version, description, author, and dependencies) using the `pip show` command:

```
~/QuarrelsomeRecklessTechnician$ pip --version
pip 21.2.dev0 from /opt/virtualenvs/python3/lib/python3.8/site-packages/pip (python 3.8)
~/QuarrelsomeRecklessTechnician$ pip install pygame
Requirement already satisfied: pygame in /opt/virtualenvs/python3/lib/python3.8/site-packages (2.0.1)
WARNING: You are using pip version 21.2.dev0; however, version 21.3.1 is available.
You should consider upgrading via the '/opt/virtualenvs/python3/bin/python3 -m pip install --upgrade pip' command.
~/QuarrelsomeRecklessTechnician$ pip show pygame
Name: pygame
Version: 2.0.1
Summary: Python Game Development
Home-page: https://www.pygame.org
Author: A community project.
Author-email: pygame@pygame.org
License: LGPL
Location: /opt/virtualenvs/python3/lib/python3.8/site-packages
Requires:
Required-by:
```

## Specifying Package Versions and Uninstalling Packages

With pip, you can also install a specific version of a package by appending `==` and the desired version number to the package name. For example, to install version 2.0.1 of Pygame, run:

```
~/QuarrelsomeRecklessTechnician$ pip install pygame==2.0.1
Collecting pygame==2.0.1
  Using cached pygame-2.0.1-cp38-cp38-manylinux1_x86_64.whl (11.8 MB)
Installing collected packages: pygame
  Attempting uninstall: pygame
    Found existing installation: pygame 2.0.2
    Uninstalling pygame-2.0.2:
      Successfully uninstalled pygame-2.0.2
Successfully installed pygame-2.0.1
WARNING: You are using pip version 21.2.1; however, version 21.3.1 is available.
You should consider upgrading via the '/opt/virtualenvs/python3/bin/python3 -m pip install --upgrade pip' command.
~/QuarrelsomeRecklessTechnician$
```

If you no longer require a package, you can easily remove it using the following command:

```
pip uninstall <package-name>
```

Replace `<package-name>` with the name of the package you wish to uninstall.

That's it for now! It's time to gain some hands-on experience with installing and managing Python packages from PyPI. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/a65eb782-d2dc-4850-9046-e4bb57d38876/lesson/558ab462-f878-4af8-bfaf-bdd0ba378b83)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/a65eb782-d2dc-4850-9046-e4bb57d38876/lesson/b17ee4d6-0859-42c6-9989-8f1201e7c88f)**
>
> Practice lab
