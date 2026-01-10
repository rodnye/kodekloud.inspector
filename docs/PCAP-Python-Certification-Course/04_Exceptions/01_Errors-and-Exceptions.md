# Errors and Exceptions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Exceptions/Errors-and-Exceptions)

---

## Table of Contents

- Errors and Exceptions
  - Using try and except
  - Handling Specific Exceptions
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Exceptions

# Errors and Exceptions

Python uses exceptions to signal that an error has occurred during the execution of your code. When an exception is raised, Python expects your code to handle it; otherwise, the program will terminate and display an error message. By properly handling exceptions, your application can recover from errors and continue running.

## Using try and except

You can catch exceptions by wrapping the code that might cause an error in a `try` block and then providing one or more `except` blocks to handle specific exceptions. Consider the following example:

```
try:
    name = 'Lydia'
    print('My name is ' + naem)
except:
    print('Something went wrong')
print('All done!')
```

In this example, a typo in the variable name ("naem" instead of "name") triggers an exception. Because the error is caught by the `except` block, the output is:

```
Something went wrong
All done!
```

Notice that even though an error occurs, handling the exception allows the rest of the code to execute successfully.

## Handling Specific Exceptions

Many issues can occur in your program. Python lets you handle specific exceptions separately, providing targeted error messages for different error types. For example, when processing user input for a division operation, two common issues might arise:

1.  The user might enter a non-integer value, which will cause a `ValueError` when attempting to convert the input.
2.  The user might enter zero, resulting in a `ZeroDivisionError` during division.

The following code example demonstrates how to handle these specific exceptions:

![The image displays a list of common Python error types, such as `ZeroDivisionError`, `ValueError`, and `TypeError`, arranged in a grid format.](https://kodekloud.com/kk-media/image/upload/v1752882908/notes-assets/images/PCAP-Python-Certification-Course-Errors-and-Exceptions/python-error-types-grid.jpg)

```
try:
    x = int(input("Enter a number: "))
    y = 1 / x
    print(y)
except ZeroDivisionError:
    print("You cannot divide by zero.")
except ValueError:
    print("Please enter an integer.")
except:
    print("Something else went wrong")
print("All done!")
```

In this code:

- If the user enters a valid integer that is not zero, the script successfully converts the input and performs the division.
- If the user enters zero, the `ZeroDivisionError` block is executed.
- If the input cannot be converted to an integer, the `ValueError` block handles the error.
- The final, unnamed `except` block catches any other unforeseen exceptions.

> [!important]
> **Note**
>
> Always place the catch-all `except` block at the end, after all specific exception handlers. Only one `except` block will catch an exception, and once an exception is handled, the remaining blocks will be ignored.

## Conclusion

Exception handling is a fundamental aspect of writing robust Python programs. By anticipating potential errors and handling them with specific and generic `except` blocks, your code can gracefully recover from unexpected issues. Now that you understand the basics of exception handling, it's time to apply what you've learned and start refining your Python projects.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/8db6ee04-f51f-41fc-9539-029474f44a1b/lesson/b8608fdd-d3a2-459f-b9b3-0992e0148e73)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/8db6ee04-f51f-41fc-9539-029474f44a1b/lesson/95bd08ae-ae9c-46e2-8a55-f8026d4d0653)**
>
> Practice lab
