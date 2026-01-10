# Errors and Exceptions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Exceptions/Errors-and-Exceptions)

---

## Table of Contents

- Errors and Exceptions
  - Try-Except: A Basic Example
  - Handling Specific Exceptions
  - Watch Video

---

## Content

Python Basics

Exceptions

# Errors and Exceptions

When Python runs your code, it might encounter an issue and raise an exception—a special type of object that signals an error occurred. If the exception isn’t handled, Python stops the program and displays an error message.

Consider this example:

```
name = 'Lydia'


print('My name is' + naem)
print('All done!')
```

```
NameError: name 'naem' is not defined
```

In this case, Python raises a NameError because the variable "naem" does not exist. Instead of crashing immediately, you can catch and handle exceptions so that the program continues executing.

> [!important]
> **Handling Exceptions in Python**
>
> Use a try-except block to monitor code for errors. The code under the try block executes normally, but if an error occurs, the code in the corresponding except block takes over.

## Try-Except: A Basic Example

You can handle exceptions using the `try` and `except` keywords. In the example below, if an error arises in the try block, the program jumps to the except block:

```
try:
    name = 'Lydia'
    print('My name is' + naem)
except:
    print('Something went wrong')


print('All done!')
```

The output of this code is:

```
Something went wrong
All done!
```

Since the exception was caught, Python exits the try-except block and continues with the rest of the program.

## Handling Specific Exceptions

Python allows you to handle specific types of errors individually. Among the common error types are:

- ZeroDivisionError
- ValueError
- TypeError
- SystemError
- AssertionError
- AttributeError
- IndexError
- KeyError
- IndentationError

![The image lists various Python error types, including ZeroDivisionError, ValueError, TypeError, SystemError, AssertionError, AttributeError, IndexError, KeyError, IndentationError, and others.](https://kodekloud.com/kk-media/image/upload/v1752883528/notes-assets/images/Python-Basics-Errors-and-Exceptions/frame_80.jpg)

Suppose you ask a user to input a number and try to compute its reciprocal. Two issues may occur:

| Scenario                         | Expected Exception |
| -------------------------------- | ------------------ |
| User enters a non-numeric string | ValueError         |
| User enters zero                 | ZeroDivisionError  |

Here’s how you can manage these specific exceptions using multiple except blocks:

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

When a ValueError occurs (for example, if the user inputs a non-integer), the corresponding except block is executed. Likewise, entering zero triggers the ZeroDivisionError block. Note that any generic `except` block without a specified exception type should always come last to catch any other unforeseen errors.

> [!important]
> **Best Practices**
>
> Always handle specific exceptions before using a generic exception block. This practice improves code readability and error handling precision.

That concludes our article on Python errors and exceptions. Now, it's time to put this knowledge into practice and enhance your Python programming skills!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/b7dfa718-4f50-4b8b-bc7c-51915b87a2a7/lesson/eb3cef1e-6cb3-4adf-a763-992614247cde)**
>
> Watch video content
