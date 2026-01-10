# Introduction To OOP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Object-Oriented-Programming/Introduction-To-OOP)

---

## Table of Contents

- Introduction To OOP
  - Procedural vs. Object-Oriented Programming
  - A Real-World Example: Vehicles
  - Creating a Class in Python
  - Watch Video

---

## Content

PCAP - Python Certification Course

Object Oriented Programming

# Introduction To OOP

In Python, you can structure and organize your code using two main paradigms: the procedural approach and the object-oriented approach.

## Procedural vs. Object-Oriented Programming

The procedural approach separates data (stored in variables) from the code (grouped into functions and modules). In this method, functions work on data, but the data itself cannot invoke these functions directly.

![The image compares procedural and object-oriented programming. It explains that procedural programming distinguishes data and code, while object-oriented programming encloses them together in classes.](https://kodekloud.com/kk-media/image/upload/v1752882922/notes-assets/images/PCAP-Python-Certification-Course-Introduction-To-OOP/procedural-vs-object-oriented-programming.jpg)

In contrast, the object-oriented approach unifies data and code into a single entity called a class. A class acts as a blueprint or "cookie cutter" for creating objects (instances). These objects bundle together both state (attributes) and behavior (methods), allowing seamless interaction, data exchange, and method invocation while also ensuring data encapsulation and protection from unintended access.

> [!important]
> **Key Insight**
>
> Classes serve as blueprints that not only encapsulate data but also bind functions (methods) that can operate on that data, facilitating modular and scalable code design.

## A Real-World Example: Vehicles

Consider vehicles as an example to understand how classes work in OOP. Despite the many types of vehicles, they all share a common characteristic—they can move. This universal trait allows us to create a general class for vehicles and then define more specific subclasses for different categories, such as land vehicles, water vehicles, air vehicles, and even space vehicles.

![The image is a flowchart categorizing vehicles into land, water, air, and space vehicles, with further subdivisions for land vehicles into wheeled, tracked, and hovercrafts.](https://kodekloud.com/kk-media/image/upload/v1752882922/notes-assets/images/PCAP-Python-Certification-Course-Introduction-To-OOP/vehicle-categorization-flowchart.jpg)

For instance, land vehicles can be subdivided into wheeled vehicles, tracked vehicles, and hovercrafts. In such a hierarchy, specific classes like wheeled vehicles inherit properties from more general classes such as land vehicles or even the broader vehicles class.

## Creating a Class in Python

To put the concept into practice, let's create a simple Python class for vehicles. In Python, you define a class using the `class` keyword followed by the class name and a colon. You can then create an instance (object) of that class by instantiating it. Here’s an example:

```
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model


    def move(self):
        print(f"The {self.make} {self.model} is moving.")


# Creating an instance of Vehicle
my_vehicle = Vehicle("Toyota", "Corolla")
my_vehicle.move()
```

In this example, the `Vehicle` class is defined with:

- An initializer method `__init__` that sets the `make` and `model` of the vehicle.
- A `move` method that prints a message indicating movement.

Later lessons will explore how to extend this basic class through inheritance to create more specialized subclasses for different vehicle types.

> [!important]
> **Next Steps**
>
> In upcoming lessons, you'll delve deeper into inheritance, encapsulation, and other critical concepts of object-oriented programming to enhance your coding skills.

That concludes this introductory lesson on OOP. Keep exploring the concepts to build a strong foundation in Python programming!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/83be71b3-c676-4d27-a820-3521dc6ea74f)**
>
> Watch video content
