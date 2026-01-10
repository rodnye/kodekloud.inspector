# Comments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Computer-Programming-and-Python-fundamentals/Comments)

---

## Table of Contents

- Comments
  - Watch Video

---

## Content

Python Basics

Computer Programming and Python fundamentals

# Comments

In many cases, code may not be immediately understandable to every team member. To improve code readability and maintainability, you can insert comments into your code by using a hash (#) followed by your description. During runtime, Python completely ignores these comments, meaning they serve solely as documentation for developers or your future self.

When you need to include a multi-line comment, be sure to begin every line with a hash. Omitting the hash on any line may cause Python to interpret the text as executable code, which can result in syntax errors.

Below is an example that demonstrates effective commenting:

```
>>> amount_of_apples = 2  # Amount in basket
# The cost of an apple in USD
# This value should always be an integer
>>> cost_of_apple = 5
```

> [!important]
> **Note**
>
> While detailed comments improve understanding, it's best to maintain self-documenting code. Use meaningful variable names and clear code structure to reduce the need for excessive comments.

Comments are also useful for temporarily disabling parts of your code. For example, if you comment out the assignment to the `cost_of_apple` variable, Python will skip creating it. Any subsequent operation that references `cost_of_apple` will trigger an error. Consider the snippet below:

```
>>> amount_of_apples = 2
>>> # cost_of_apple = 5
>>> print(amount_of_apples * cost_of_apple)
NameError: name 'cost_of_apple' is not defined
```

In summary, comments are a vital tool for enhancing code clarity and providing additional context for code functionality. However, always strive for simplicity by writing self-explanatory code that minimizes the need for excessive inline comments.

That's it for now. It's time to gain some hands-on practice.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/4178f96e-8dcd-46a2-a9c9-f65a8c9c73b0/lesson/b257316f-9014-4f65-b602-38ff01d4ef1c)**
>
> Watch video content
