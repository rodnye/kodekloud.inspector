# Python Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Applications-Basics/Python-Introduction)

---

## Table of Contents

- Python Introduction
  - Watch Video
  - Practice Lab

---

## Content

DevOps Pre-Requisite Course

Applications Basics

# Python Introduction

This lesson offers an in-depth introduction to Python, a free, open-source, and cross-platform programming language widely used in modern applications such as machine learning, data science, and artificial intelligence. Before you begin coding, ensure that the appropriate Python interpreter is installed on your system. You can download the latest version from the [official Python downloads page](https://www.python.org/downloads/).

![The image features the Python logo and text highlighting its attributes: free, open source, and cross-platform compatible.](https://kodekloud.com/kk-media/image/upload/v1752873418/notes-assets/images/DevOps-Pre-Requisite-Course-Python-Introduction/frame_10.jpg)

After downloading the installer for your operating system, note that there are two major versions of Python available:

1.  **Python 2**  
    Released in 2000, Python 2 reached the end of its development lifecycle in 2010. It is maintained only for legacy applications.
2.  **Python 3**  
    Introduced in 2008, Python 3 is actively maintained and introduces significant improvements along with new features. It is the recommended choice for modern software development.

Programs written in Python 2 require the Python 2 interpreter, while those written in Python 3 need the Python 3 interpreter. This ensures compatibility and allows you to take advantage of the latest features and improvements.

![The image shows a Python download page for Mac OS X, featuring version 3.8.2, with navigation links and parachute graphics.](https://kodekloud.com/kk-media/image/upload/v1752873419/notes-assets/images/DevOps-Pre-Requisite-Course-Python-Introduction/frame_20.jpg)

Many operating systems come with Python pre-installed. You can verify your installation by executing the following commands in your terminal:

- For Python 2, run:  
  `python2`
- For Python 3, run:  
  `python3`

> [!important]
> **Note**
>
> If Python is installed as `python` without an explicit version, you can check the version using `python -V` to determine whether it points to Python 2 or Python 3.

In cases where Python is not pre-installed, you can install it using your system's package manager. For example, some systems allow installing Python 2 with the package name "python2" and Python 3.6 with "python36". It is also possible to have both versions installed concurrently.

To launch the interactive Python interpreter, simply type the appropriate command in your terminal:

- For Python 2:  
  `python2`
- For Python 3:  
  `python3`

Once inside the interpreter, type your Python commands interactively. To exit the session, simply type `exit()`.

Below are some sample commands along with their expected outputs:

```
yum install python2
```

```
python2
Python 2.7.16 (default, Nov 17 2019, 00:07:27)
[GCC 8.3.1 20190507 (Red Hat 8.3.1-4)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
```

```
python2 -V
Python 2.7.16
```

```
yum install python36
```

```
python3
Python 3.6.8 (default, Nov 21 2019, 19:31:34)
[GCC 8.3.1 20190507 (Red Hat 8.3.1-4)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
```

To run a Python program, invoke the corresponding interpreter followed by your program's filename. For instance, imagine you have a simple "Hello World" program. Running it with Python 2 would look like this:

```
python2 main.py
Hello World
```

The content of `main.py` is as follows:

```
def print_message():
    print("Hello World")


if __name__ == '__main__':
    print_message()
```

Install Python, run the sample application, and observe its output. In the next lesson, we will explore dependency management and build processes in Python, equipping you with the skills to effectively manage Python projects.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/5d92de65-a74b-42a5-a177-8a409b2c2ed2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/a39320e9-e6fb-4e9c-84e3-fc6ded711c4e)**
>
> Practice lab
