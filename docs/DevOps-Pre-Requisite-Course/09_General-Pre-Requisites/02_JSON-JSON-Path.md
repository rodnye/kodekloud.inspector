# JSON JSON Path - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/General-Pre-Requisites/JSON-JSON-Path)

---

## Table of Contents

- JSON JSON Path
  - YAML vs. JSON
  - Introduction to JSONPath
  - Working with Lists and Arrays
  - Querying Complex JSON Structures
  - Applying Criteria to Query Arrays
  - Practice Exercises
  - Watch Video
  - Practice Lab
    - Extracting a Specific Element by Index
    - Using Filter Criteria in JSONPath

---

## Content

DevOps Pre-Requisite Course

General Pre Requisites

# JSON JSON Path

Hello and welcome to this lesson on JSONPath. I'm Mumshad Mannambeth, and in this session, we'll introduce JSONPath—a powerful query language for JSON. We’ll start with a quick comparison of YAML and JSON, then dive into querying JSON datasets with JSONPath, and finally explore practice exercises to solidify your understanding. This lesson is aimed at absolute beginners, so we'll use simple examples and clear explanations to help you build your skills. Let’s get started!

Before we proceed, please subscribe to my channel to stay updated with similar lessons.

![The image outlines objectives related to YAML, JSON, JSON PATH, and practice exercises, with a small table example demonstrating a query for car colors and prices.](https://kodekloud.com/kk-media/image/upload/v1752873428/notes-assets/images/DevOps-Pre-Requisite-Course-JSON-JSON-Path/frame_20.jpg)

---

## YAML vs. JSON

In an earlier lesson, we explored the basics of YAML and how it represents data in a human-readable structured format. For example, a car can be represented in YAML as follows:

```
car:
  color: blue
  price: $20,000
```

The same data represented in JSON, which uses curly braces for dictionaries and square brackets for lists, looks like this:

```
{
  "car": {
    "color": "blue",
    "price": "$20,000",
    "wheels": [
      {
        "model": "X345ERT",
        "location": "front-right"
      },
      {
        "model": "X345ERT",
        "location": "front-left"
      },
      {
        "model": "X345ERT",
        "location": "rear-right"
      },
      {
        "model": "X345ERT",
        "location": "rear-right"
      }
    ]
  }
}
```

The equivalent YAML representation for the JSON data is:

```
car:
  color: blue
  price: $20,000
  wheels:
    - model: X345ERT
      location: front-right
    - model: X345ERT
      location: front-left
    - model: X345ERT
      location: rear-right
    - model: X345ERT
      location: rear-right
```

You can easily convert data between YAML and JSON using online converters like [jsontoyaml.com](https://www.jsontoyaml.com). While both formats are useful, for the remainder of this lesson we will focus on JSON.

---

## Introduction to JSONPath

JSONPath is a query language used to extract data from JSON (or YAML) documents, much like SQL queries are used with relational databases. Consider the following JSON document containing details about a car and a bus:

```
{
  "car": {
    "color": "blue",
    "price": "$20,000"
  },
  "bus": {
    "color": "white",
    "price": "$120,000"
  }
}
```

To extract the car details, you can use the query `car`. To obtain a specific property, use the dot notation (e.g., `car.color` for the car's color). Similarly, use `bus` for bus details and `bus.price` for its price.

When these objects are nested within a parent dictionary (for example, named `vehicles`), the queries adjust accordingly. Consider this JSON structure:

```
{
  "vehicles": {
    "car": {
      "color": "blue",
      "price": "$20,000"
    },
    "bus": {
      "color": "white",
      "price": "$120,000"
    }
  }
}
```

To query this, you would use:

- Get car details: `vehicles.car`
- Get bus details: `vehicles.bus`
- Get car's color: `vehicles.car.color`
- Get bus's price: `vehicles.bus.price`

However, note that in a JSON document the top-level dictionary (or root element) is denoted by the dollar sign (`$`). Thus, for the original document (without the `vehicles` parent), the correct queries are:

- Get car details: `$.car`
- Get bus details: `$.bus`
- Get car's color: `$.car.color`
- Get bus's price: `$.bus.price`

If the data includes a parent such as `vehicles`, then the queries become `$.vehicles.car`, and so on.

> [!important]
> **Note**
>
> The result of any JSONPath query is always returned as an array—even if it contains only a single element. For example, the query `$.vehicles.car` returns:
>
> ```
> [
> {
> "color": "blue",
> "price": "$20,000"
> }
> ]
> ```

Similarly, querying for a specific property like `$.vehicles.car.color` returns:

```
[
  "blue"
]
```

---

## Working with Lists and Arrays

Consider a JSON array of vehicle types:

```
[
  "car",
  "bus",
  "truck",
  "bike"
]
```

Since the root element is an array (denoted by square brackets), you select elements by their index (starting at zero):

- First element: `$[0]` returns `[ "car" ]`
- Fourth element: `$[3]` returns `[ "bike" ]`
- Multiple elements (e.g., first and fourth): `$[0,3]` returns `[ "car", "bike" ]`

---

## Querying Complex JSON Structures

Now, let’s look at querying a more complex JSON object. Consider a JSON document representing a car with multiple properties, including a list of wheels:

```
{
  "car": {
    "color": "blue",
    "price": "$20,000",
    "wheels": [
      {
        "model": "X345ERT",
        "location": "front-right"
      },
      {
        "model": "X346GRX",
        "location": "front-left"
      },
      {
        "model": "X236DEM",
        "location": "rear-right"
      },
      {
        "model": "X987XMV",
        "location": "rear-left"
      }
    ]
  }
}
```

### Extracting a Specific Element by Index

To retrieve the details of the second wheel (remember, indexing starts at zero), use:

```
$.car.wheels[1]
```

This returns:

```
{
  "model": "X346GRX",
  "location": "front-left"
}
```

If you want just the model of the second wheel, extend the query:

```
$.car.wheels[1].model
```

Resulting in:

```
"X346GRX"
```

### Using Filter Criteria in JSONPath

When the order of array items might change, instead of hard-coding an index, you can use a filter criterion to select an element based on its property. For instance, to retrieve the model of the wheel where the `location` is "rear-right", use:

```
$.car.wheels[?(@.location == "rear-right")].model
```

This instructs JSONPath to search through the wheels array, identify the items with a `location` property equal to "rear-right", and return their `model` values.

---

## Applying Criteria to Query Arrays

Criteria (filters) are especially useful when working with arrays that contain many items. Consider the following array of numbers:

```
[
  12,
  43,
  23,
  12,
  56,
  43,
  93,
  32,
  45,
  63,
  27,
  8,
  78
]
```

To retrieve all numbers greater than 40, write the query using a filter where the at symbol (`@`) represents each array element:

```
$[?(@ > 40)]
```

This returns:

```
[
  43,
  56,
  43,
  93,
  45,
  63,
  78
]
```

Other operators can be used similarly to filter numbers by equality, inequality, or membership in a set.

---

## Practice Exercises

Now that you understand the basics of JSONPath, it's time to practice! Visit the following link to access a quiz portal where you can apply your knowledge by creating JSONPath queries:

[JSONPath Quiz Portal](https://kodekloud.com/p/JSON-path-quiz)

In the quiz, you will see:

- A list of questions on the left.
- An input area where you enter your JSONPath query.
- The source data displayed on the lower-left.
- The expected output on the right.

For example, consider the following sample source data:

```
{
  "property1": "value1",
  "property2": "value2"
}
```

The expected output is:

```
[
  "value1"
]
```

A valid query for this might be:

```
$.property1
```

As you type your query, the result is displayed in real time so you can immediately verify your answer. Once your query returns the expected result, the question is marked as complete, and you can move on to the next challenge.

If you encounter difficulties, click the “Show Solution” button to reveal the correct answer.

---

For further information about JSONPath, visit the official documentation on GitHub: [JSONPath on GitHub](https://github.com/JSONPath). If you have any suggestions or would like to see advanced use cases in future lessons, please leave a comment below.

Thank you for watching, and happy coding! Don't forget to subscribe for more lessons like this. Goodbye!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/1327c721-3e41-4b9d-8cd5-45dafdfe5d7b/lesson/4e91d8df-a63a-47b3-80cc-295855d1f5c8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/1327c721-3e41-4b9d-8cd5-45dafdfe5d7b/lesson/ceca406b-b93e-4b85-98af-119c4cba07a1)**
>
> Practice lab
