# OOP Methods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Object-Oriented-Programming/OOP-Methods)

---

## Table of Contents

- OOP Methods
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Object Oriented Programming

# OOP Methods

This section delves into methods in Python, explaining how they work within classes and how to leverage built-in features for introspection and reflection.

A method is a function defined within a class that always takes at least one parameter—commonly named self. Python automatically assigns this parameter to refer to the instance that invokes the method. When adding extra parameters, simply list them after self, separated by commas. The self parameter enables access to the instance's attributes and other methods.

Below is an example of a class with a method that sums two values:

```
class Calculator:
    def add(self, first_value, second_value):
        print(first_value + second_value)


calc = Calculator()
print(calc.add(1, 2))
```

Console output:

```
3
None
```

> [!important]
> **Note**
>
> In this example, the method prints the sum of the values. Notice that the returned value from the method is None. When calling print() on calc.add(1, 2), it first executes the internal print in add() and then prints the resulting None.

If you include a class attribute, such as a base value, you can reference it inside your methods using self.base_value. When a class also defines the special **init** method (the constructor), it is automatically invoked when a new object is created. The **init** method is designed to initialize the object's attributes and does not return any value.

Consider the following example using a class attribute:

```
class Calculator:
    base_value = 10


    def add(self, first_value, second_value):
        print(self.base_value + first_value + second_value)


calc = Calculator()
print(calc.add(1, 2))
```

Console output:

```
13
None
```

In this case, the Calculator class uses the class variable base_value within its add() method. While an **init** method can be defined to initialize instance attributes, here we demonstrate using a class attribute.

Next, explore a class that leverages the **init** constructor method:

```
class Dog:
    def __init__(self, name):
        self.name = name


    def bark(self):
        print("Woof")


pet1 = Dog("Max")
pet2 = Dog("Daisy")


print(Dog.__name__)
```

This code demonstrates built-in attributes such as **name**, which holds the name of the class. You can use these attributes inside the class or with functions like type() to inspect an object's class.

For a more comprehensive example of built-in attributes, examine the following:

```
class Dog:
    def __init__(self, name):
        self.name = name


    def bark(self):
        print("Woof")


pet1 = Dog("Max")
pet2 = Dog("Daisy")


print(Dog.__name__)
print(type(pet1).__name__)
print(pet1.__module__)
```

Here:

- **name** reflects the class name.
- type(pet1).**name** returns the same class name.
- pet1.**module** reveals the module in which the class is defined (typically "**main**" when running a script directly).

Another useful built-in property is **bases**, which returns a tuple containing a class’s direct base classes (superclasses). For example:

```
class Dog:
    def __init__(self, name):
        self.name = name


class Chihuahua(Dog):
    def __init__(self, name):
        Dog.__init__(self, name)
        self.size = "small"


print(Chihuahua.__bases__)
```

Console output:

```
(<class '__main__.Dog'>,)
```

The tuple can be iterated to extract information about each superclass. With these built-in attributes and methods, Python supports two key features common in object-oriented programming:

1.  Introspection: The ability of a program to examine an object's type and its properties at runtime.
2.  Reflection: The capability of a program to dynamically modify an object's values, properties, and methods at runtime.

![The image defines "Introspection" as a program's ability to examine an object's type and properties at runtime, and "Reflection" as the ability to manipulate an object's values, properties, and methods at runtime.](https://kodekloud.com/kk-media/image/upload/v1752882924/notes-assets/images/PCAP-Python-Certification-Course-OOP-Methods/introspection-reflection-runtime-properties.jpg)

This concludes our lesson on OOP methods in Python. You can now start practicing these concepts and explore further enhancements in your code.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/d6c7cac8-f036-4739-8c1f-16eb314dd91e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/8a521b54-3990-4dd2-bd12-ee9e2d70133c)**
>
> Practice lab
