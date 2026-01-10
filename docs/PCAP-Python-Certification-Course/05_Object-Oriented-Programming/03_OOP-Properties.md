# OOP Properties - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Object-Oriented-Programming/OOP-Properties)

---

## Table of Contents

- OOP Properties
  - Using Private Variables
  - Checking for Attributes with hasattr
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Object Oriented Programming

# OOP Properties

In this article, we explore how object properties are created and managed in Python using instance variables. Instance variables are created and attached to individual objects when a class is initialized. This approach enables each object to maintain its own state independently.

For example, consider a stack where the list representing the stack is created during initialization:

```
class Stack:
    def __init__(self):
        self.stack_list = []
```

The term "instance" emphasizes that these variables are tied directly to each individual object rather than to the class itself.

In the next example, we define a method called set_second, which adds another property to the object when invoked. This demonstrates that different instances of the same class can have unique sets of properties based on which methods are called or even by adding attributes dynamically after the object is created.

When printing the dictionaries of several objects, you can observe that their properties differ:

```
class ExampleClass:
    def __init__(self, val=1):
        self.first = val


    def set_second(self, val):
        self.second = val


example_object_1 = ExampleClass()
example_object_2 = ExampleClass(2)
example_object_2.set_second(3)
example_object_3 = ExampleClass(4)
example_object_3.third = 5


print(example_object_1.__dict__)
print(example_object_2.__dict__)
print(example_object_3.__dict__)
```

Output:

```
{'first': 1}
{'first': 2, 'second': 3}
{'first': 4, 'third': 5}
```

> [!important]
> **Note**
>
> Each instance maintains its own property dictionary. Modifying an instance variable in one object does not affect other objects.

## Using Private Variables

To encapsulate properties further, you can declare them as private by prefixing their names with two underscores. When you set private variables inside a class, Python performs name mangling by adding the class name before the variable. The following example demonstrates this behavior by modifying the first and second properties to be private:

```
class ExampleClass:
    def __init__(self, val=1):
        self.__first = val


    def set_second(self, val):
        self.__second = val


example_object_1 = ExampleClass()
example_object_2 = ExampleClass(2)
example_object_2.set_second(3)
example_object_3 = ExampleClass(4)
example_object_3.third = 5


print(example_object_1.__dict__)
print(example_object_2.__dict__)
print(example_object_3.__dict__)
```

Output:

```
{'_ExampleClass__first': 1}
{'_ExampleClass__first': 2, '_ExampleClass__second': 3}
{'_ExampleClass__first': 4, 'third': 5}
```

> [!important]
> **Warning**
>
> Although these variables are declared as private, they can still be accessed externally using their mangled names. Use this feature with care.

## Checking for Attributes with hasattr

Python's flexible nature means that not all objects possess the same set of attributes. To determine whether an object contains a specific attribute, you can use the built-in function hasattr. This function returns True if the attribute exists, and False otherwise.

Consider the example below with a Student class:

```
class Student:
    def __init__(self, name):
        self.first_name = name


student1 = Student("John")
print(hasattr(student1, "first_name"))
print(hasattr(student1, "last_name"))
```

Output:

```
True
False
```

In this example, hasattr checks the existence of the attributes "first_name" and "last_name" for the Student object.

Let's examine another example using a Dog class:

```
class Dog:
    def __init__(self, name):
        self.name = name


dog = Dog("Max")
print(hasattr(dog, "name"))
```

Here, hasattr confirms that the dog object contains a "name" property. This function is particularly useful when the attribute structure of an object is uncertain.

That concludes our discussion on object properties in Python. With these examples and explanations, you are encouraged to gain hands-on experience with these concepts to further enhance your Python programming skills.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/c22570eb-bf05-4146-bb5c-a5fbe1eff309)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/39dddc2c-5c17-48a2-9ca5-6112c97ba9a4)**
>
> Practice lab
