# Platform Module - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Module-Packages-and-PIP/Platform-Module)

---

## Table of Contents

- Platform Module
  - Other Useful Functions in the Platform Module
  - Retrieving Python Version Information
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Module Packages and PIP

# Platform Module

Determining the system platform is essential when writing programs that need to adapt to different hardware, operating systems, or Python interpreters. The Python [platform module](https://docs.python.org/3/library/platform.html) provides a convenient way to access this system information.

One of the most commonly used functions is the `platform()` function, which gathers comprehensive details about the underlying platform. It offers customization through parameters such as `alias` and `terse` to alter the output format.

For example, the following code prints a detailed description of the current platform:

```
from platform import platform
print(platform())
```

Example output:

```
Linux-5.11.0-1018-gcp-x86_64-with-glibc2.27
```

> [!important]
> **Note**
>
> Using the `alias` parameter, when set to `True`, displays alternative underlying names, while the `terse` parameter produces a more compact output. The behavior of these parameters may vary across different platforms.

## Other Useful Functions in the Platform Module

In addition to the `platform()` function, the module provides several other utility functions to fetch specific system details:

- **Machine Type:**  
  The `machine()` function returns a string identifying the machine type (e.g., "x86_64").
- **Processor Details:**  
  The `processor()` function offers information about the processor.
- **Operating System Name:**  
  The `system()` function returns the name of the operating system (e.g., "Linux", "Windows", or "Darwin").
- **Operating System Version:**  
  The `version()` function provides detailed version information of the operating system.

For example, to retrieve and print the operating system name, use the following code:

```
from platform import system
print(system())
```

## Retrieving Python Version Information

It is often valuable to determine the Python version in use. The platform module offers multiple functions for this purpose:

- **Python Implementation:**  
  The `python_implementation()` function returns a string indicating the Python implementation (such as "CPython", "PyPy", etc.):

  ```
  from platform import python_implementation
  print(python_implementation())
  ```

- **Python Version Tuple:**  
  The `python_version_tuple()` function returns a tuple of strings containing the major, minor, and patch level versions of Python:

  ```
  from platform import python_version_tuple
  print(python_version_tuple())
  ```

This comprehensive functionality facilitates the development of cross-platform applications by adapting behavior based on the environment.

> [!important]
> **Next Steps**
>
> Now is the perfect time to practice using these functions in your projects. Experiment with different outputs and explore how they change across different platforms.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/a65eb782-d2dc-4850-9046-e4bb57d38876/lesson/76c926c0-d64d-4e48-bb2b-3e7bf7251a38)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/a65eb782-d2dc-4850-9046-e4bb57d38876/lesson/0efa3fee-f05a-4348-b5a0-f1256f2132a9)**
>
> Practice lab
