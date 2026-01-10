# Inheritance Constructors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Object-Oriented-Programming/Inheritance-Constructors)

---

## Table of Contents

- Inheritance Constructors
  - Understanding Inheritance
  - Checking Inheritance with isinstance
  - Using super to Access the Superclass
  - Multiple Inheritance
  - Method Overriding and Polymorphism
  - Composition as an Alternative
  - Method Resolution Order (MRO)
  - The Diamond Problem
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Object Oriented Programming

# Inheritance Constructors

When you print an instance of a class, Python by default displays a hexadecimal number representing the object’s memory address. This number is an internal object identifier. However, you can enhance the readability of printed instances by overriding the **str** method. By doing so, when you print an instance of your class, Python will display a descriptive string instead.

Consider the following example with a simple Dog class that customizes the **str** method:

```
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed


    def __str__(self):
        return self.name + ' is a ' + self.breed


pet1 = Dog("Max", "Labrador")
print(pet1)
```

## Understanding Inheritance

Inheritance is a foundational concept in object-oriented programming. It allows a new class (called the subclass) to inherit attributes and methods from an existing class (known as the superclass). This mechanism enables you to extend or modify the behavior of the existing class without duplicating code.

![The image illustrates the concept of inheritance in programming, showing a hierarchy where attributes and methods are passed from a superclass "Vehicle" to subclasses "WheeledVehicle" and "Car."](https://kodekloud.com/kk-media/image/upload/v1752882921/notes-assets/images/PCAP-Python-Certification-Course-Inheritance-Constructors/inheritance-programming-vehicle-hierarchy.jpg)

Subclasses are specialized versions of a parent class. In the example below, the Animal class is the base class for two subclasses, Mammal and Dog. Here, a Mammal is an Animal, and a Dog is a Mammal.

For instance, we create an Animal instance representing a crocodile (type "reptile") and a Mammal instance representing a dolphin:

```
class Animal:
    def __init__(self, type):
        self.type = type


class Mammal(Animal):
    def __init__(self, animal):
        super().__init__("mammal")
        self.animal = animal


    def breathe(self):
        print("Breathing...")


class Dog(Mammal):
    def __init__(self, breed):
        super().__init__("dog")
        self.breed = breed


    def bark(self):
        print("Woof")


crocodile = Animal("reptile")
dolphin = Mammal("dolphin")
pet = Dog("Labrador")
```

In this hierarchy, the Dolphin (a Mammal) can breathe due to the inherited breathe method, while the Crocodile (simply an Animal) does not have this behavior. Furthermore, the Dog class inherits breathing ability from Mammal and includes its own bark method.

## Checking Inheritance with isinstance

You can verify the type of an object using the isinstance function. This function checks if an object is an instance of a specific class (or its subclasses), making it useful for confirming whether an object supports certain properties or methods.

```
class Animal:
    def __init__(self, type):
        self.type = type


class Mammal(Animal):
    def __init__(self, animal):
        super().__init__("mammal")
        self.animal = animal


    def breathe(self):
        print("Breathing...")


class Dog(Mammal):
    def __init__(self, breed):
        super().__init__("dog")
        self.breed = breed


    def bark(self):
        print("Woof!")


crocodile = Animal("reptile")
dolphin = Mammal("dolphin")
pet = Dog("Labrador")


print(isinstance(pet, Dog))      # True, pet is an instance of Dog.
print(isinstance(pet, Animal))   # True, Dog is derived from Animal.
print(isinstance(dolphin, Dog))  # False, a Mammal is not a Dog.
print(isinstance(dolphin, Animal))  # True, a Mammal is an Animal.
```

The output of this code will be:

```
True
True
False
True
```

## Using super to Access the Superclass

The super function allows you to call a method from the superclass without explicitly naming it. This approach reduces redundancy and improves maintainability. Notice how we no longer require passing self when using super().

```
class Animal:
    def __init__(self, type_value):
        self.type = type_value


class Mammal(Animal):
    def __init__(self, animal):
        super().__init__("mammal")
        self.animal = animal


    def breathe(self):
        print("Breathing...")


class Dog(Mammal):
    def __init__(self, breed):
        super().__init__("dog")
        self.breed = breed


    def bark(self):
        print("Woof")


crocodile = Animal("reptile")
dolphin = Mammal("dolphin")
pet = Dog("Labrador")
```

## Multiple Inheritance

Python supports multiple inheritance, which allows a subclass to inherit from more than one superclass. This way, the subclass can access properties and methods from various parent classes. For example:

```
class SuperA:
    var_a = 10
    def fun_a(self):
        return 11


class SuperB:
    var_b = 20
    def fun_b(self):
        return 21


class Sub(SuperA, SuperB):
    def sub_method(self):
        pass


obj = Sub()


print(obj.var_a, obj.fun_a())  # Output: 10 11
print(obj.var_b, obj.fun_b())  # Output: 20 21
```

In this example, the Sub class acquires members from both SuperA and SuperB. The sub_method is a placeholder where you would implement subclass-specific behavior in a real-world application.

## Method Overriding and Polymorphism

Subclasses can override methods defined in their superclass, a concept known as method overriding. When you invoke a method on an instance, Python first looks in the subclass; if the method isn't found there, it searches the superclass.

Consider the following example where ClassB (a subclass) overrides the fun method from ClassA. When coolmethod is called, it executes the fun method from ClassB, demonstrating polymorphism:

```
class ClassA:
    def fun(self):
        print("fun from ClassA")


    def coolmethod(self):
        return self.fun()


class ClassB(ClassA):
    def fun(self):
        print("fun from ClassB")


new_value = ClassB()
new_value.coolmethod()  # Output: fun from ClassB
```

This design pattern keeps your code clean and consistent by allowing subclasses to modify or extend the functionality of their superclass as needed.

## Composition as an Alternative

An alternative to inheritance for extending a class's capabilities is composition. With composition, you include instances of other classes within a class, enabling you to combine behaviors flexibly with reduced coupling.

> [!important]
> **Note**
>
> Composition can offer greater flexibility compared to inheritance, especially when you want to dynamically change behavior by combining different objects.

The example below demonstrates how composition can be used to implement behavior by combining different objects:

```
import time


class Tracks:
    def change_direction(self, left, on):
        print("tracks:", left, on)


class Wheels:
    def change_direction(self, left, on):
        print("wheels:", left, on)


class Vehicle:
    def __init__(self, controller):
        self.controller = controller


    def turn(self, left):
        self.controller.change_direction(left, True)
        time.sleep(0.25)
        self.controller.change_direction(left, False)


wheeled = Vehicle(Wheels())
tracked = Vehicle(Tracks())


wheeled.turn(True)
tracked.turn(False)
```

The output from this code is:

```
wheels: True True
wheels: True False
tracks: False True
tracks: False False
```

This example shows how you can achieve different behaviors by passing in different controllers to the Vehicle class.

## Method Resolution Order (MRO)

The Method Resolution Order (MRO) in Python defines the sequence Python follows to search for an attribute or method in a class hierarchy. When multiple classes define the same method, Python uses the MRO to determine which method to execute.

Consider the following example with four classes: A, B, C, and D, where D inherits from both B and C, and both B and C inherit from A. If both B and C define a method named middle, Python will follow the MRO—from the bottom of the inheritance chain upward and from left to right:

```
class ClassA:
    def top(self):
        print("In ClassA")


class ClassB(ClassA):
    def middle(self):
        print("In ClassB")


class ClassC(ClassA):
    def middle(self):
        print("In ClassC")


class ClassD(ClassB, ClassC):
    def bottom(self):
        print("In ClassD")


obj = ClassD()
obj.middle()  # This will print: In ClassB
```

Changing the order of the superclasses in ClassD would lead Python to invoke the middle method from a different class, according to the MRO.

## The Diamond Problem

The diamond problem occurs in multiple inheritance when a subclass inherits from two parent classes that both derive from a common ancestor and override a certain attribute or method. Consider the following example where ClassB and ClassC override the greeting attribute inherited from ClassA:

```
class ClassA:
    greeting = "Hello from ClassA"


class ClassB(ClassA):
    greeting = "Hello from ClassB"


class ClassC(ClassA):
    greeting = "Hello from ClassC"


class ClassD(ClassB, ClassC):
    pass


d = ClassD()
print(d.greeting)
```

The output is:

```
Hello from ClassB
```

Because Python follows the MRO, it returns the greeting from ClassB first. If you remove the greeting attribute from ClassB, Python will retrieve it from ClassC or ClassA based on the MRO. It is important to be aware of this behavior when leveraging multiple inheritance.

That concludes this article. Now it's time to put these concepts into practice!

For more information on these topics, be sure to check out our [additional Python tutorials](https://www.python.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/0c32de64-2a75-4d5b-b083-b49cd9653cca)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/7e473cae-90c2-4d9a-8e81-6509481b52ce/lesson/607248d0-99f7-4702-808f-ef45af510922)**
>
> Practice lab
