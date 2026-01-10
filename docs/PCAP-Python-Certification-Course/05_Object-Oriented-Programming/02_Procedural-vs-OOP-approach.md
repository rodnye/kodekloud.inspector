# Procedural vs OOP approach - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Object-Oriented-Programming/Procedural-vs-OOP-approach)

---

## Table of Contents

- Procedural vs OOP approach
  - Procedural Approach
  - Object-Oriented Approach
  - Extending the Stack Class with Inheritance
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Object Oriented Programming

# Procedural vs OOP approach

A stack is a fundamental data structure that follows the last-in-first-out (LIFO) principle, meaning that the last element added is the first to be removed. In this guide, we demonstrate how to implement a stack in Python using both procedural and object-oriented programming (OOP) approaches.

## Procedural Approach

In the procedural approach, the stack's data and the associated logic (functions for pushing and popping) are separate. Below is an example where the stack is represented as a simple list, and helper functions manipulate it.

```
stack = []


def push(val):
    stack.append(val)


def pop():
    val = stack[-1]
    del stack[-1]
    return val


push(3)
push(2)
push(1)
print(pop())
print(pop())
print(pop())
```

> [!important]
> **Note**
>
> In this implementation, the global `stack` variable can be accessed and modified from anywhere in your code, which can lead to unintended side effects. For multiple stacks, additional functions must be created, reducing reusability.

## Object-Oriented Approach

The object-oriented method encapsulates both data and behavior within a class, promoting modularity and data protection. We begin by defining a `Stack` class with an initializer that confirms the creation of a new stack instance.

```
class Stack:
    def __init__(self):
        print("I am in the constructor function!")


stack_object = Stack()
```

Output:

```
I am in the constructor function!
```

Next, we introduce a property for the stack's data. Initially, this property (`stack_list`) is public, offering direct access:

```
class Stack:
    def __init__(self):
        self.stack_list = []


stack_object = Stack()
print(len(stack_object.stack_list))
```

Output:

```
0
```

> [!important]
> **Note**
>
> Although a public attribute is simple to implement, it compromises encapsulation. To protect the internal data structure, converting it to a private attribute is recommended.

To enforce encapsulation, we modify `stack_list` to a private attribute by prefixing it with two underscores. Attempting to access this attribute externally will raise an error:

```
class Stack:
    def __init__(self):
        self.__stack_list = []


stack_object = Stack()
# The following line will raise an AttributeError because __stack_list is private.
print(len(stack_object.__stack_list))
```

Output:

```
AttributeError: 'Stack' object has no attribute '__stack_list'
```

When a class attribute starts with two underscores, it becomes private and can only be used within the class. This encapsulation is crucial for maintaining the integrity of your data structure.

Next, we add the `push` and `pop` methods to the `Stack` class for manipulating the internal stack:

```
class Stack:
    def __init__(self):
        self.__stack_list = []


    def push(self, val):
        self.__stack_list.append(val)


    def pop(self):
        val = self.__stack_list[-1]
        del self.__stack_list[-1]
        return val


stack_object = Stack()
stack_object2 = Stack()


stack_object.push(3)
stack_object.push(2)
stack_object.push(1)


stack_object2.push(10)
stack_object2.push(9)


print(stack_object2.pop())
print(stack_object.pop())
print(stack_object.pop())
print(stack_object.pop())
```

This object-oriented implementation clearly demonstrates that separate instances of the `Stack` class maintain independent data, providing a scalable solution for handling multiple stacks.

## Extending the Stack Class with Inheritance

Inheritance allows you to extend the functionality of a base class without modifying it. Consider a scenario where you need to track the cumulative sum of the elements in the stack. Instead of altering the original `Stack` class, you can create a subclass `AddingStack` that inherents from `Stack` and adds new behavior.

In the subclass:

- The constructor calls the base class constructor using `super().__init__()`.
- The `push` method is overridden to update the cumulative sum before invoking the base class method.
- The `pop` method is overridden to subtract the popped value from the cumulative sum.
- A new method `get_sum` is introduced to retrieve the current sum.

```
class AddingStack(Stack):
    def __init__(self):
        super().__init__()
        self.__sum = 0


    def get_sum(self):
        return self.__sum


    def push(self, val):
        self.__sum += val
        super().push(val)


    def pop(self):
        val = super().pop()
        self.__sum -= val
        return val


stack = AddingStack()
stack.push(10)
stack.push(5)
print(stack.get_sum())
```

Output:

```
15
```

> [!important]
> **Note**
>
> If a subclass does not define its own constructor, it automatically inherits the constructor from its superclass. In cases where no additional behavior is required, you can simply use the `pass` keyword to inherit all functionalities without modification.

This comprehensive guide on stack implementation in Python illustrates both procedural and object-oriented techniques, along with best practices such as encapsulation and inheritance.

That's it for now—it's time to gain some hands-on practice!

For more details on Python programming and data structures, check out [Python Official Documentation](https://docs.python.org/3/tutorial/) and [Data Structures in Python](https://realpython.com/python-data-structures/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/98512165-dcf1-4158-b576-60496ac42de5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/720cfc1f-a716-4425-9f34-58d214cc6647)**
>
> Practice lab
