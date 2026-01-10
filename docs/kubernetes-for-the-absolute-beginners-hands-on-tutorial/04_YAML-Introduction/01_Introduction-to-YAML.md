# Introduction to YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/YAML-Introduction/Introduction-to-YAML)

---

## Table of Contents

- Introduction to YAML
  - Key-Value Pairs and Arrays
  - Dictionaries (Maps)
  - Nested Structures
  - Key Points on Data Structures in YAML
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

YAML Introduction

# Introduction to YAML

Welcome to this comprehensive lesson on YAML. In this guide, you'll learn about YAML files, how to define configuration data, and why YAML is preferred for its human-readable format. If you're already comfortable with YAML, feel free to skip ahead. Otherwise, it’s highly recommended to follow along because the remainder of this course relies on a solid understanding of YAML. If you’re experienced with XML or JSON, you'll find learning YAML to be a smooth transition.

Below is a simple YAML example that defines a list of servers:

```
Servers:
  - name: Server1
    owner: John
    created: 12232012
    status: active
```

YAML is a popular format used to represent configuration data in a clear and readable way. To illustrate its readability and structure, consider the following comparison of XML, JSON, and YAML representations. Taking a moment to observe these differences can help you appreciate YAML's simplicity.

Let’s delve deeper into the YAML syntax.

## Key-Value Pairs and Arrays

At its core, YAML uses key-value pairs. For example, you can define basic items like this:

```
# Key Value Pair
Fruit: Apple
Vegetable: Carrot
Liquid: Water
Meat: Chicken
```

> [!important]
> **Formatting Tip**
>
> Remember to include a space after the colon to separate the key from its value.

To represent lists or arrays, first define the key and then use a dash to indicate each element. For example, to list some fruits and vegetables:

```
# Key Value Pair
Fruit: Apple
Vegetable: Carrot
Liquid: Water
Meat: Chicken


# Array / Lists
Fruits:
  - Orange
  - Apple
  - Banana


Vegetables:
  - Carrot
  - Cauliflower
  - Tomato
```

## Dictionaries (Maps)

A dictionary (or map) in YAML groups related properties under a single key. Consider this example, which shows the nutritional information for two fruits. Each fruit—Banana and Grapes—has its own properties such as calories, fat, and carbs:

```
# Dictionary / Map
Banana:
  Calories: 105
  Fat: 0.4 g
  Carbs: 27 g
Grapes:
  Calories: 62
  Fat: 0.3 g
  Carbs: 16 g
```

In YAML, the number of spaces before each property is essential. All properties within a dictionary must be aligned with consistent indentation. For example, the nutritional information for a banana is correctly represented with uniform indentation:

![The image shows a diagram of a banana's nutritional information, including calories (105), fat (0.4g), and carbs (27g), labeled as a "Dictionary/Map."](https://kodekloud.com/kk-media/image/upload/v1752884976/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Introduction-to-YAML/frame_180.jpg)

> [!important]
> **Indentation Alert**
>
> Avoid adding extra spaces before properties (e.g., around "fat" and "carbs") as this could incorrectly nest them under the previous key (such as "Calories"), potentially causing a syntax error.

## Nested Structures

YAML makes it easy to define nested structures like lists containing dictionaries. For example, consider a list of fruits where each item includes its nutritional details:

```
# List containing dictionaries
Fruits:
  - Banana:
      Calories: 105
      Fat: 0.4 g
      Carbs: 27 g
  - Grape:
      Calories: 62
      Fat: 0.3 g
      Carbs: 16 g
```

A common question when learning YAML is determining when to use a dictionary versus a list. Data formats such as XML, JSON, and YAML are designed to represent a wide range of data—from organization employees and student records to details about cars in a manufacturing company.

For example, a single car object might be represented with a dictionary that outlines its properties such as color, model, transmission type, and price:

```
Color: Blue
Model:
  Name: Corvette
  Year: 1995
Transmission: Manual
Price: $20,000
```

If you need to represent multiple cars, each with detailed information, you would use a list of dictionaries, where each dictionary represents a car:

```
- Color: Blue
  Model:
    Name: Corvette
    Year: 1995
  Transmission: Manual
  Price: $20,000
- Color: Grey
  Model:
    Name: Corvette
    Year: 1995
  Transmission: Manual
  Price: $22,000
- Color: Red
  Model:
    Name: Corvette
    Year: 1995
  Transmission: Automatic
  Price: $20,000
- Color: Green
  Model:
    Name: Corvette
    Year: 1995
  Transmission: Manual
  Price: $23,000
- Color: Blue
  Model:
    Name: Corvette
    Year: 1995
  Transmission: Manual
  Price: $20,000
- Color: Black
  Model:
    Name: Corvette
    Year: 1995
  Transmission: Automatic
  Price: $25,000
```

This example clearly differentiates between using dictionaries, simple lists, and lists of dictionaries.

![The image compares data structures: dictionary, list, and list of dictionaries, using car attributes like color, model, transmission, and price.](https://kodekloud.com/kk-media/image/upload/v1752884977/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Introduction-to-YAML/frame_410.jpg)

## Key Points on Data Structures in YAML

Below are several key points to remember when working with YAML data structures:

| Data Structure   | Characteristics                                                                      | Example                    |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------- |
| Dictionary (Map) | An unordered collection; the order of properties does not affect the data's meaning. | Nutritional info of Banana |
| List (Array)     | An ordered collection; the sequence of items is significant.                         | List of Fruits             |
| Comments         | Any line starting with a hash (#) is considered a comment and ignored by the parser. | \\# This is a comment      |

Here’s an example of an unordered dictionary:

```
Banana:
  Calories: 105
  Fat: 0.4 g
  Carbs: 27 g
```

And this is an ordered list where the position of each item matters:

```
Fruits:
  - Orange
  - Apple
  - Banana
```

We are now ready to proceed to the coding exercises. Have fun exploring and working with YAML files!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/9bcecdb4-c89c-439f-8590-cb55efa4f596/lesson/4af4cd4b-d22c-4cf8-b4b7-7a9d2a585e6a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/9bcecdb4-c89c-439f-8590-cb55efa4f596/lesson/6204e403-2683-4bd4-b946-402cc61ff22a)**
>
> Practice lab
