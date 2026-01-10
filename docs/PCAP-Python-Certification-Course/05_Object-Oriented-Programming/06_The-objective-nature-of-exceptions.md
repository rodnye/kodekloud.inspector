# The objective nature of exceptions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Object-Oriented-Programming/The-objective-nature-of-exceptions)

---

## Table of Contents

- The objective nature of exceptions
  - Using the Else Block
  - The Finally Block for Cleanup
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Object Oriented Programming

# The objective nature of exceptions

In this article, we explore Python's exception handling mechanisms, a critical component of robust software development. You will learn about the basic try-except pattern designed to execute code that might produce an error and how to gracefully handle that error when it occurs.

## Using the Else Block

In addition to the conventional try and except blocks, Python allows you to include an **else** block. This block is placed after all except blocks and is executed only if no exception is raised in the try block. This feature is useful for running code that should only execute when the try block is successful.

Consider the following example:

```
def calc(num):
    try:
        result = 1 / num
        print(result)
    except ZeroDivisionError:
        print("You cannot divide by zero.")
    else:
        print("All good!")


calc(0)
calc(10)
```

**Console output:**

```
You cannot divide by zero.
0.1
All good!
```

> [!important]
> **Note**
>
> The **else** block is executed only when no exceptions occur. This practice ensures that the normal flow executes separately from error handling.

## The Finally Block for Cleanup

Python also provides a **finally** block that will execute regardless of whether an exception has been raised or not. This is particularly useful for clean-up actions such as closing files or releasing external resources.

Below is an example demonstrating the use of a finally block:

```
def calc(num):
    try:
        result = 1 / num
        print(result)
    except ZeroDivisionError:
        print("You cannot divide by zero.")
    else:
        print("All good!")
    finally:
        print("Execution complete.")


calc(0)
calc(10)
```

**Console output:**

```
You cannot divide by zero.
Execution complete.
0.1
All good!
Execution complete.
```

> [!important]
> **Note**
>
> The code in the **finally** block is executed after the try-except-else structure, regardless of the outcome. This makes it ideal for performing clean-up tasks.

## Summary

Understanding how Python handles exceptions is vital for writing robust code. By combining try, except, else, and finally blocks, programmers can manage errors effectively, ensuring that the program's normal flow is maintained while also handling unforeseen issues.

That's it for now—it's time to gain some hands-on practice!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/a072c713-2a19-4dad-a149-6e5865419ae7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/01a9211b-1610-459a-9dc3-05fd6d000737)**
>
> Practice lab
