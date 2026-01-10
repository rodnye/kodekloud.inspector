# Demo Basic Code Completion - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Introduction/Demo-Basic-Code-Completion)

---

## Table of Contents

- Demo Basic Code Completion
  - Table of Contents
  - 1. Setup: Creating the Python File
  - 2. Hello, World!
  - 3. Factorial Function
  - 4. List Comprehension Example
  - 5. File I/O with Exception Handling
  - 6. HTTP Requests with the requests Library
  - Conclusion & Key Takeaways
  - Links and References
  - Watch Video
    - 3.1 Complete from the Signature
    - 3.2 Guide with a Docstring
    - 6.1 Installing and Importing
    - 6.2 Making a GET Request
    - 6.3 Handling Request Errors

---

## Content

GitHub Copilot Certification

Introduction

# Demo Basic Code Completion

In this tutorial, we’ll explore how GitHub Copilot accelerates common Python workflows. You’ll see examples of generating boilerplate, implementing algorithms, handling data structures, managing errors, and making HTTP requests—all with minimal typing.

## Table of Contents

- [1\. Setup: Creating the Python File](#1-setup-creating-the-python-file)
- [2\. Hello, World!](#2-hello-world)
- [3\. Factorial Function](#3-factorial-function)
- [4\. List Comprehension Example](#4-list-comprehension-example)
- [5\. File I/O with Exception Handling](#5-file-io-with-exception-handling)
- [6\. HTTP Requests with the `requests` Library](#6-http-requests-with-the-requests-library)
- [Conclusion & Key Takeaways](#conclusion--key-takeaways)
- [Links and References](#links-and-references)

---

## 1\. Setup: Creating the Python File

First, open your terminal and create a new script named `main.py`:

```
touch main.py
```

Then open **main.py** in your preferred editor and trigger Copilot suggestions by starting to type.

---

## 2\. Hello, World!

Start by asking Copilot to scaffold the classic “Hello, World!” program:

```
def main():
    print("Hello, World!")


if __name__ == "__main__":
    main()
```

Save and run:

```
python3 main.py
# Output:
# Hello, World!
```

Copilot handles the boilerplate so you can jump straight to running your code.

---

## 3\. Factorial Function

### 3.1 Complete from the Signature

Type the function signature, and Copilot will fill in the implementation:

```
def factorial(n: int) -> int:
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
```

### 3.2 Guide with a Docstring

Alternatively, add a descriptive docstring to guide Copilot:

```
def factorial(n: int) -> int:
    """Return the factorial of a non-negative integer."""
```

Copilot may then suggest:

```
def factorial(n: int) -> int:
    """Return the factorial of a non-negative integer."""
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

You can invoke it from `main()` or any other part of your script.

---

## 4\. List Comprehension Example

Imagine you have a list of user dictionaries:

```
users = [
    {"name": "Michael", "id": 1},
    {"name": "Sanjeev",  "id": 2},
    {"name": "Jeremy",   "id": 3}
]
```

Start typing:

```
usernames =
```

Copilot suggests:

```
usernames = [user["name"] for user in users]
```

Print them with:

```
for username in usernames:
    print(username)
```

Run to see the output:

```
python3 main.py
# Michael
# Sanjeev
# Jeremy
```

---

## 5\. File I/O with Exception Handling

When working with file operations, Copilot can quickly generate a `try/except` block.

```
try:
    with open("data.txt", "r") as f:
        data = f.read()
except FileNotFoundError:
    data = "No data available"


print(data)
```

If **data.txt** is missing:

```
python3 main.py
# No data available
```

> [!important]
> **Note**
>
> For very large files, consider reading in chunks or using `file.readline()` to avoid high memory usage.

To catch all exceptions and log error details:

```
try:
    with open("data.txt", "r") as f:
        data = f.read()
except Exception as e:
    print(f"Error reading file: {e}")
    data = "default data"


print(data)
```

---

## 6\. HTTP Requests with the `requests` Library

### 6.1 Installing and Importing

Type and let Copilot complete:

```
import requests
```

If you haven’t installed it yet:

```
pip install requests
```

### 6.2 Making a GET Request

Copilot suggests the typical pattern:

```
response = requests.get("https://api.github.com")
print(response.status_code)
```

### 6.3 Handling Request Errors

Use Copilot to scaffold robust error handling:

```
try:
    response = requests.get("https://api.github.com")
    response.raise_for_status()
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
```

> [!important]
> **Warning**
>
> Always validate or sanitize external data returned from HTTP calls to prevent security issues.

---

## Conclusion & Key Takeaways

GitHub Copilot streamlines your Python development by:

- Automating boilerplate code
- Reducing syntax errors and runtime bugs
- Suggesting idiomatic patterns (comprehensions, recursion, error handling)
- Assisting with package installation and debugging

| Task                    | Copilot Prompt Example              | Benefit                   |
| ----------------------- | ----------------------------------- | ------------------------- |
| Hello, World!           | Type `def main():`                  | Instant program scaffold  |
| Recursive algorithms    | Add `def factorial(n: int) -> int:` | Correct recursive logic   |
| List comprehensions     | Start `usernames = [`               | Compact data extraction   |
| File I/O error handling | Begin `try:`                        | Robust file operations    |
| HTTP requests & errors  | Type `import requests`              | Reliable API interactions |

Master these patterns to focus on solving complex problems instead of writing repetitive code.

---

## Links and References

- [GitHub Copilot](https://github.com/features/copilot)
- [Python Official Website](https://www.python.org/)
- [requests Library Documentation](https://docs.python-requests.org/en/latest/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/b02a5227-ee17-43dc-b006-51fef8272f13/lesson/73b6deac-6b87-4d73-9321-85cf364cb833)**
>
> Watch video content
