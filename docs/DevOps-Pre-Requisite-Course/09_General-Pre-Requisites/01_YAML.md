# YAML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/General-Pre-Requisites/YAML)

---

## Table of Contents

- YAML
  - Understanding YAML Structure
  - Conclusion
  - Watch Video
  - Practice Lab
    - Key-Value Pairs
    - Representing Arrays (Lists)
    - Representing Dictionaries (Maps)
    - Indentation and Its Importance
    - Combining Lists and Dictionaries
    - Real-World Example: Car Configurations
    - Dictionaries vs. Lists: Key Differences
    - Comments in YAML
      - Dictionary Example:
      - List Example:

---

## Content

DevOps Pre-Requisite Course

General Pre Requisites

# YAML

Welcome to this comprehensive guide on YAML. In this article, we'll dive into the structure and usage of YAML files to represent configuration data. Whether you're new to YAML or already familiar with formats like XML or JSON, these clear examples and hands-on exercises will help you master YAML quickly.

> [!important]
> **Overview**
>
> If you're already experienced with YAML, feel free to jump to the sections that interest you most. For beginners, this guide covers the foundational concepts crucial for understanding more advanced topics later in the course.

## Understanding YAML Structure

YAML is a human-readable data serialization format that excels at representing complex configuration data with simplicity. Consider this basic YAML example that describes a list of servers:

```
Servers:
  - name: Server1
    owner: John
    created: 12232012
    status: active
```

This structure demonstrates how YAML organizes data using collections of key-value pairs.

### Key-Value Pairs

The simplest unit in YAML is a key-value pair. In YAML, separate a key from its value using a colon and a space:

```
Fruit: Apple
Vegetable: Carrot
Liquid: Water
Meat: Chicken
```

Remember, the colon must be followed by a space to clearly distinguish between the key and its value.

### Representing Arrays (Lists)

Arrays (or lists) in YAML are defined by assigning a key to the list followed by a colon. Each item in the list appears on a new line, prefixed by a dash and a space. For example:

```
Fruits:
  - Orange
  - Apple
  - Banana
Vegetables:
  - Carrot
  - Cauliflower
  - Tomato
```

Each dash indicates an individual element in the list.

### Representing Dictionaries (Maps)

Dictionaries, also called maps, group related key-value pairs under a single entity. This is useful for bundling properties together. For example, to store nutrition information for fruits, you might structure the YAML like this:

```
Banana:
  Calories: 105
  Fat: 0.4 g
  Carbs: 27 g
Grapes:
  Calories: 62
  Fat: 0.3 g
  Carbs: 16 g
```

Maintain consistent indentation for each property to ensure that the parser correctly interprets your data.

> [!important]
> **Indentation Matters**
>
> Consistent spacing is essential in YAML. Improper indentation can lead to syntax errors or misinterpretation of nested data structures.

### Indentation and Its Importance

Proper indentation is key to creating well-structured YAML files. For instance, consider the following snippet, which details the nutrition information for a banana:

```
Banana:
  Calories: 105
  Fat: 0.4 g
  Carbs: 27 g
```

Accidentally adding extra spaces before properties like Fat or Carbs might cause them to be interpreted as nested under a different key, leading to potential syntax errors.

### Combining Lists and Dictionaries

YAML allows for nesting dictionaries inside lists, and vice versa, making it flexible for organizing complex data structures. The following example shows a list of fruits, where each fruit is represented as a dictionary containing its nutritional details:

```
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

This nested structure is ideal for handling layered or multifaceted data.

### Real-World Example: Car Configurations

Imagine you need to represent information about cars. A single car can be represented as a dictionary with properties such as color, model, transmission, and price:

```
Color: Blue
Model: Corvette
Transmission: Manual
Price: $20,000
```

For a more detailed representation—such as breaking down the model into its name and manufacturing year—you can nest a dictionary within another dictionary. When working with multiple cars, you can use an array of dictionaries:

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

This structure clearly differentiates between a single dictionary, a list, and a list of dictionaries, demonstrating YAML's flexibility in data modeling.

### Dictionaries vs. Lists: Key Differences

| Feature   | Dictionary (Map)                   | List (Array)                     |
| --------- | ---------------------------------- | -------------------------------- |
| Order     | Unordered; sequence doesn't matter | Ordered; sequence is significant |
| Structure | Key-value pairs                    | Sequence of elements             |

#### Dictionary Example:

```
Banana:
  Calories: 105
  Fat: 0.4 g
  Carbs: 27 g
```

#### List Example:

```
Fruits:
  - Orange
  - Apple
  - Banana
```

### Comments in YAML

YAML allows you to add comments using the hash symbol (#). Lines beginning with # are ignored by the parser, which is useful for adding notes or explanations in your configuration files:

```
# List of Fruits
Fruits:
  - Orange
  - Apple
  - Banana
```

## Conclusion

YAML is a powerful and flexible format for representing data. Its clear syntax using key-value pairs, lists, and dictionaries makes it ideal for configuring complex applications. By following proper indentation and nesting rules, you can ensure that your YAML files are both accurate and easy to maintain.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/1327c721-3e41-4b9d-8cd5-45dafdfe5d7b/lesson/0f4e0d65-e154-4f3f-baf8-d24f3bb29277)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/1327c721-3e41-4b9d-8cd5-45dafdfe5d7b/lesson/1f83fe99-6084-46e1-933d-082ac77369bd)**
>
> Practice lab
