# OS Module - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Miscellaneous/OS-Module)

---

## Table of Contents

- OS Module
  - Retrieving Operating System Information
  - Creating Directories
  - Listing and Creating Directories with Python
  - Deleting Directories
  - Executing System Commands
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Miscellaneous

# OS Module

In this article, you will learn how to interact with the operating system using Python’s OS module. This comprehensive guide covers obtaining operating system details, creating and listing directories, as well as deleting directories and executing system commands. The examples provided in this guide demonstrate how to use these methods effectively.

## Retrieving Operating System Information

To retrieve information about the current operating system, you can use the `uname` method from the OS module. This method returns an object containing details such as:

- The name of the operating system
- The machine name on the network
- The release and version of the operating system
- The hardware identifier

For instance, the `name` property of this object returns:

- `"POSIX"` for Linux-based systems,
- `"NT"` for Windows, and
- `"Java"` for platforms like Jython.

## Creating Directories

The `mkdir` function allows you to create a new directory by specifying a path. The location of the newly created directory depends on how you specify the path:

- Using just the directory name (or with a leading `./`) creates the directory in the current working directory.
- Prefixing the directory name with `../` creates it in the parent directory.
- Specifying an absolute path (for example, `/python/new_directory`) creates the directory in the designated folder at the root.

Below are some examples:

```
mkdir new_directory
mkdir ./new_directory
```

_These commands create a directory named "new_directory" in the current working directory._

```
mkdir ../new_directory
```

_This command creates a directory in the parent directory of the current working directory._

```
mkdir /python/new_directory
```

_This command creates a directory in the "python" directory located at the root._

## Listing and Creating Directories with Python

To create a new directory in the current working directory and then list its contents, you can use the following example:

```
import os
os.mkdir("my_new_directory")
print(os.listdir())
```

This code produces output similar to:

```
['_upm', 'main.py', 'my_new_directory']
```

This output shows individual files (which typically include extensions) as well as directories (which generally do not have an extension).

If you need to create a folder that contains subfolders, the `makedirs` method is ideal. It allows you to create nested directories with a single call. For example, the following code snippet creates a directory with a subdirectory, changes into the newly created folder, and lists its contents:

```
import os
os.makedirs("my_new_directory/another_new_directory")
os.chdir("my_new_directory")
print(os.listdir())
```

**Output:**

```
['another_new_directory']
```

To get the absolute pathname of the current working directory, simply use the `getcwd` method.

## Deleting Directories

In addition to file operations, Python's OS module allows you to delete files and directories. To delete an empty directory, use the `rmdir` function. The example below demonstrates how to create an empty directory and then remove it:

```
import os

os.mkdir("my_new_directory")
print(os.listdir())
os.rmdir("my_new_directory")
print(os.listdir())
```

**Output:**

```
['.upm', 'main.py', 'my_new_directory']
['.upm', 'main.py']
```

> [!important]
> **Note**
>
> The `rmdir` function works only on directories that exist and are empty. Attempting to delete a directory that contains files or subdirectories will result in an error.

To remove a directory along with all its subdirectories, use the `removedirs` function. For example:

```
import os

os.makedirs("first_dir/second_dir")
print(os.listdir())
os.removedirs("first_dir/second_dir")
print(os.listdir())
```

**Output:**

```
['.upm', 'main.py', 'first_dir']
['.upm', 'main.py']
```

## Executing System Commands

The OS module also provides the `system` method, which allows you to execute shell commands directly from Python. For example, you can create a new directory using a system command as follows:

```
import os
returned_value = os.system("mkdir my_new_directory")
```

The returned value is the exit status of the command: `0` indicates success, while a non-zero value (commonly `1`) indicates an error.

> [!important]
> **Note**
>
> When executing system commands, always validate and sanitize any inputs to prevent security risks such as command injection.

## Summary

In this lesson, you learned how to:

- Retrieve operating system information using Python’s OS module.
- Create directories using both `mkdir` and `makedirs`.
- List directory contents using `os.listdir()`.
- Delete directories using `rmdir` and `removedirs`.
- Execute system commands with the `system` method.

Try applying these concepts through practice exercises to deepen your understanding and improve your proficiency with Python’s OS module.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/cde38440-8fe4-4223-8235-07a9ebadfaca)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/b48c9ec3-5753-4a76-bb85-ecc523e24b3a)**
>
> Practice lab
