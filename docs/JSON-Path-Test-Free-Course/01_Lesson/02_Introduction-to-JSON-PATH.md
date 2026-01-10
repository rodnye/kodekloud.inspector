# Introduction to JSON PATH - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/JSON-Path-Test-Free-Course/Lesson/Introduction-to-JSON-PATH)

---

## Table of Contents

- Introduction to JSON PATH
  - 1. Basic JSONPath Syntax
  - 2. Common Operators and Filters
  - 3. Python Examples with jsonpath-ng
  - Further Reading and References
  - Watch Video
  - Practice Lab

---

## Content

JSON Path Test - Free Course

Lesson

# Introduction to JSON PATH

JSON (JavaScript Object Notation) is a lightweight data-interchange format that’s easy to read, write, parse, and generate. When working with complex JSON—nested objects, arrays, and mixed data types—you need a concise way to extract specific values. Enter **JSONPath**, a query language inspired by XPath for XML. JSONPath provides a simple, declarative syntax to traverse and filter JSON structures.

In this guide, we’ll explore:

1.  Basic JSONPath syntax
2.  Common operators and filters
3.  Practical Python examples with `jsonpath-ng`

---

## 1\. Basic JSONPath Syntax

Consider the following sample JSON document:

```
{
  "store": {
    "book": [
      { "category": "reference", "author": "Nigel Rees",     "title": "Sayings of the Century",      "price": 8.95 },
      { "category": "fiction",   "author": "Evelyn Waugh",   "title": "Sword of Honour",            "price": 12.99 },
      { "category": "fiction",   "author": "Herman Melville","title": "Moby Dick",                  "isbn": "0-553-21311-3", "price": 8.99 },
      { "category": "fiction",   "author": "J. R. R. Tolkien","title": "The Lord of the Rings",     "isbn": "0-395-19395-8", "price": 22.99 }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}
```

Key JSONPath tokens:

- `$` : the root object
- `.` or `[]` : child access
- `*` : wildcard match (all elements)
- `..` : recursive descent

Examples:

- `$.store.book`  
  → Returns the array of all books.
- `$.store.book[0].author`  
  → `"Nigel Rees"`
- `$..price`  
  → All price values in the document.
- `$.store.book[?(@.price < 10)]`  
  → Books with a price less than 10.

> [!important]
> **Note**
>
> JSONPath expressions are **case-sensitive**. Always match the exact key names when querying.

---

## 2\. Common Operators and Filters

JSONPath offers a variety of operators for powerful data selection. Below is a quick reference table:

| Operator                | Description                                 | Example                         |
| ----------------------- | ------------------------------------------- | ------------------------------- |
| `*`                     | Wildcard: matches all child members         | `$.store.*`                     |
| `..`                    | Recursive descent through all object levels | `$..author`                     |
| `[index]`               | Array index access                          | `$.store.book[2]`               |
| `[start:end]`           | Slicing an array                            | `$.store.book[0:2]`             |
| `[?(@.key <op> value)]` | Filter expression                           | `$.store.book[?(@.price > 10)]` |

**Filter operators** include:

- `<`, `<=`, `>`, `>=`, `==`, `!=`
- Boolean AND/OR (`&&`, `||`)

> [!important]
> **Warning**
>
> Ensure your filter syntax is valid. A misplaced parenthesis or comparison operator can lead to no results or errors.

---

## 3\. Python Examples with `jsonpath-ng`

Follow these steps to query JSON with Python:

1.  Install the library:

    ```
    pip install jsonpath-ng
    ```

2.  Use the following script:

    ```
    import json
    from jsonpath_ng import parse


    data = {
        "store": {
            "book": [
                {"category": "reference", "author": "Nigel Rees",      "title": "Sayings of the Century",      "price": 8.95},
                {"category": "fiction",   "author": "Evelyn Waugh",    "title": "Sword of Honour",            "price": 12.99},
                {"category": "fiction",   "author": "Herman Melville","title": "Moby Dick",                  "isbn": "0-553-21311-3", "price": 8.99},
                {"category": "fiction",   "author": "J. R. R. Tolkien","title": "The Lord of the Rings",     "isbn": "0-395-19395-8", "price": 22.99}
            ],
            "bicycle": {"color": "red", "price": 19.95}
        }
    }


    # Parse and evaluate a JSONPath expression
    jsonpath_expr = parse('$.store.book[?(@.price < 10)].title')
    matches = jsonpath_expr.find(data)


    # Extract and print titles
    titles = [match.value for match in matches]
    print(titles)
    ```

    **Expected output:**

    ```
    ['Sayings of the Century', 'Moby Dick']
    ```

---

## Further Reading and References

- [JSONPath Specification](https://goessner.net/articles/JsonPath/)
- [jsonpath-ng on PyPI](https://pypi.org/project/jsonpath-ng/)
- [Kubernetes JSONPath Guide](https://kubernetes.io/docs/reference/kubectl/jsonpath/)

By mastering JSONPath, you can dramatically simplify data extraction from nested JSON structures—making your scripts cleaner and more maintainable. Give it a try in your next project!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/json-path-test-free-course/module/114e6dee-a9f2-49f3-a0c6-cdfb92f74310/lesson/735607d5-54ad-4f18-b636-de14fc925a4c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/json-path-test-free-course/module/114e6dee-a9f2-49f3-a0c6-cdfb92f74310/lesson/859d70fa-10cc-4e1b-bbe8-5f61ce5bbd35)**
>
> Practice lab
