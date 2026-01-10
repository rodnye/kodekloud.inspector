# Introduction to Modules in Python - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Module-Packages-and-PIP/Introduction-to-Modules-in-Python)

---

## Table of Contents

- Introduction to Modules in Python
  - Importing a Module
  - Importing Specific Entities from a Module
  - Importing All Entities
  - Using Aliases to Avoid Naming Conflicts
  - Watch Video

---

## Content

PCAP - Python Certification Course

Module Packages and PIP

# Introduction to Modules in Python

Modules in Python let you organize your code into manageable, reusable parts. A module is simply a file containing Python definitions and statements that can be imported and used in other programs.

![The image defines a "Module" as a file containing Python definitions and statements, which can be imported and used when necessary.](https://kodekloud.com/kk-media/image/upload/v1752882917/notes-assets/images/PCAP-Python-Certification-Course-Introduction-to-Modules-in-Python/python-module-definition-file.jpg)

You can create your own module, use one developed by someone else, or leverage one of the built-in modules included in the Python Standard Library. In this article, we're focusing on the built-in math module, which provides a variety of functions and constants to perform mathematical operations effectively.

## Importing a Module

To access functions and constants from the math module, you must first import it into your Python script using the `import` keyword. Although the import statement can be placed anywhere in your code, it must appear before you use any functions or variables from the module. Here's how to import and use the math module:

```
import math
print(math.sin(90))
print(math.pi)
```

> [!important]
> **Note**
>
> Remember that the `math.sin` function expects the angle in radians. To compute the sine of 90 degrees, convert the angle using `math.radians`, like so: `math.sin(math.radians(90))`.

In the code above, both `sin` and `pi` are referenced via the `math` namespace, which keeps them separate from your program’s global namespace to avoid any naming conflicts.

## Importing Specific Entities from a Module

If you prefer to avoid using the module prefix each time you call a function or access a constant, you can import specific entities directly into your namespace using the `from` keyword. For example, to import only `pi`:

```
from math import pi
```

This approach adds only `pi` to your namespace. To use other functions like `sin`, you must import them explicitly. You can also import multiple entities by listing them separated by commas:

```
from math import pi, sin
print(pi)
print(sin(90))
```

While this method may make your code look cleaner, it can also increase the risk of naming conflicts if a variable or function with the same name already exists in your program.

## Importing All Entities

Another approach is to import all the names from a module using an asterisk (`*`). This allows you to use the module’s entities without the module name prefix:

```
from math import *
print(pi)
print(sin(90))
```

However, importing everything can lead to name conflicts if your code defines names that clash with those from the math module. It is generally recommended to import only what you need.

## Using Aliases to Avoid Naming Conflicts

If a module's name or an imported entity conflicts with an existing name in your code, or if you prefer a shorter name for ease of use, you can assign an alias using the `as` keyword. For example:

```
import math as m
print(m.pi)
print(m.sin(90))
```

Similarly, you can alias specific entities:

```
from math import pi as p, sin as s
print(p)
print(s(90))
```

With aliasing, you ensure your code remains clear and free from naming conflicts while providing a convenient reference to the module's contents.

That's it for this introduction to modules in Python. Happy coding, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/a65eb782-d2dc-4850-9046-e4bb57d38876/lesson/61d61300-69e7-4308-aa15-3b6daaecf007)**
>
> Watch video content
