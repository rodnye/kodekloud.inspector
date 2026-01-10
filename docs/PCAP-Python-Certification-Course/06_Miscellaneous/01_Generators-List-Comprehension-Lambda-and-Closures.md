# Generators List Comprehension Lambda and Closures - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Miscellaneous/Generators-List-Comprehension-Lambda-and-Closures)

---

## Table of Contents

- Generators List Comprehension Lambda and Closures
  - Iterators and the Iterator Protocol
  - Creating a Custom Generator via an Iterator
  - Using Generators with the yield Keyword
  - List Comprehensions and Generator Expressions
  - Lambda Functions
  - Using Lambda with Map and Filter
  - Closures
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Miscellaneous

# Generators List Comprehension Lambda and Closures

In this article, we delve into several core Python concepts: generators, list comprehensions, lambda functions, and closures. By understanding these concepts, you'll be better equipped to write efficient and concise code. We'll start with the range function, which is frequently used to print a sequence of values.

The range function returns an iterator—a special type of generator that produces numbers on demand. Consider the following example:

```
for i in range(5):
    print(i)
```

Output:

```
0
1
2
3
4
```

A generator is a specialized piece of code that can yield a series of values while preserving its state between iterations. Since the range function returns an iterator, it can be used directly within a for-in loop to traverse its values.

![The image defines a "Generator" as specialized code that can return a series of values and control the iteration process.](https://kodekloud.com/kk-media/image/upload/v1752882915/notes-assets/images/PCAP-Python-Certification-Course-Generators-List-Comprehension-Lambda-and-Closures/generator-specialized-code-iteration.jpg)

## Iterators and the Iterator Protocol

An iterator is an object that adheres to the iterator protocol by implementing two core methods: `__iter__()` and `__next__()`. The `__iter__()` method returns the iterator object itself (typically called once), while the `__next__()` method yields the next value in the sequence. When the sequence is exhausted, `__next__()` raises a StopIteration exception.

![The image defines an "Iterator" as a data type that implements the iterator protocol, with methods `__iter__()` to return the object and `__next__()` to return the next value in a series.](https://kodekloud.com/kk-media/image/upload/v1752882916/notes-assets/images/PCAP-Python-Certification-Course-Generators-List-Comprehension-Lambda-and-Closures/iterator-data-type-iterator-protocol.jpg)

## Creating a Custom Generator via an Iterator

Although Python's built-in range function offers a ready-made iterator, you can also create a custom iterator by defining the necessary methods. The following example demonstrates how to implement a custom range class that emulates the behavior of the built-in range:

```
class CustomRange:
    def __init__(self, maximum):
        self.__maximum = maximum
        self.__current = 0


    def __iter__(self):
        return self


    def __next__(self):
        if self.__current >= self.__maximum:
            raise StopIteration
        result = self.__current
        self.__current += 1
        return result


custom_range = CustomRange(10)
for i in custom_range:
    print(i)
```

In this implementation, the `__iter__()` method returns the object itself, while the `__next__()` method returns the current value before incrementing it. Once the current value reaches the maximum, a StopIteration is raised to signal the end of the iteration.

> [!important]
> **Tip**
>
> Managing state manually in iterators (like keeping track of the current value) can be avoided by using the yield keyword, which simplifies generator creation.

## Using Generators with the yield Keyword

The yield keyword allows a function to produce a series of values without losing its state, effectively pausing and resuming the function's execution. Consider this simple example:

```
def simple_generator():
    for i in range(5):
        yield i


# Using the generator
for value in simple_generator():
    print(value)
```

Output:

```
0
1
2
3
4
```

## List Comprehensions and Generator Expressions

List comprehensions provide an elegant and compact method to create lists. Take a look at this example that generates a list of powers of 10 using a traditional for loop:

```
first_list = []
for x in range(5):
    first_list.append(10 ** x)
print(first_list)
```

Output:

```
[1, 10, 100, 1000, 10000]
```

The same result can be achieved more concisely with a list comprehension:

```
second_list = [10 ** x for x in range(10)]
print(second_list)
```

Output:

```
[1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]
```

You can also incorporate conditional expressions within list comprehensions. For example, to create a list that contains 1 for even numbers and 0 for odd numbers:

```
even_odd_list = [1 if x % 2 == 0 else 0 for x in range(5)]
print(even_odd_list)
```

Output:

```
[1, 0, 1, 0, 1]
```

Generator expressions, similar to list comprehensions, use parentheses instead of square brackets. They generate a generator that can be iterated over when needed, offering an even more memory-efficient approach.

## Lambda Functions

Lambda functions (or anonymous functions) allow you to write small functions in a concise way. They are often used alongside functions like map and filter. Here's a simple lambda function to compute the square of a number:

```
sqr = lambda x: x * x
print(sqr(2))
```

Output:

```
4
```

Lambda functions can also be defined with no arguments or multiple arguments:

```
# Lambda that always returns 10
lambda: 10


# Lambda that adds two numbers
lambda a, b: a + b
```

## Using Lambda with Map and Filter

The map function applies a specified function to every item of an iterable, returning a new iterator with the results. For example, the following code doubles each number in the list using a lambda function:

```
nums = [1, 2, 3]
nums_multiplied = list(map(lambda x: x * 2, nums))
print(nums_multiplied)
```

Output:

```
[2, 4, 6]
```

Similarly, the filter function constructs a new iterator comprising only the items that satisfy a specific condition. Consider this example that filters even and odd numbers from a list:

```
nums = [1, 2, 3, 4, 5, 6, 7]
nums_even = list(filter(lambda x: x % 2 == 0, nums))
nums_odd = list(filter(lambda x: x % 2 != 0, nums))
print(nums_even)
print(nums_odd)
```

Output:

```
[2, 4, 6]
[1, 3, 5, 7]
```

## Closures

Closures in Python allow a function to capture and retain access to variables from its enclosing scope, even when the outer function has finished executing. The following example demonstrates a closure:

```
def outer_fun(x):
    def inner_fun(y):
        return x * y
    return inner_fun


# Create a closure with x bound to 4
var_one = outer_fun(4)
print(var_one(3))
```

Output:

```
12
```

In this case, calling `outer_fun(4)` returns the `inner_fun` function, which retains the value of `x` (equal to 4) in its scope. When `var_one(3)` is invoked, it multiplies 4 by 3, resulting in 12, even though the execution context of `outer_fun` has ended.

> [!important]
> **Important**
>
> Closures empower you to write more modular and dynamic code by allowing functions to remember and access data from their defining environment, which is particularly effective in functional programming.

## Summary

In this article, we covered:

- How the range function returns an iterator and its similarity to generators.
- The iterator protocol and its core methods: `__iter__()` and `__next__()`.
- Creating custom iterators and the advantages of using the yield keyword.
- The benefits and syntactic simplicity of list comprehensions and generator expressions.
- The use of lambda functions, and how to apply them with map and filter.
- The concept of closures and their practical applications in maintaining state.

Start practicing these concepts today to enhance your Python programming skills and develop more efficient, readable code.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/53cd4396-5579-4c95-9078-e625b72200e2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/b90c699d-2423-4adf-8506-c27e1389cb6c)**
>
> Practice lab
