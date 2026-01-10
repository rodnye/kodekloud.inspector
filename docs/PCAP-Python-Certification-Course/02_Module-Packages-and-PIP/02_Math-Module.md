# Math Module - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Module-Packages-and-PIP/Math-Module)

---

## Table of Contents

- Math Module
  - Generating Random Floats
  - Generating Random Integers
  - Random Selection from a List
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Module Packages and PIP

# Math Module

The built-in Python function `dir()` is an essential tool when exploring a module’s attributes. It returns an alphabetically sorted list of all the functions, constants, and other attributes available in a module. For example, if you want to see what the `math` module offers, you can use the following code:

```
import math
print(dir(math))
```

This command outputs a list similar to:

```
['__doc__', '__loader__', '__name__', '__package__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'comb', 'copysign', 'cos', 'cosh', 'degrees', 'dist', 'e', 'erf', 'erfc', 'exp', 'exp1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'isqrt', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'perm', 'pi', 'pow', 'pprint', 'radians', 'remainder', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']
```

For detailed information on each attribute, refer to the [official Python documentation](https://docs.python.org/3/).

Python's `random` module provides a variety of functions to generate pseudo-random numbers. Although these numbers seem random, they are produced by deterministic algorithms, and their outcomes can be reproduced if you set a specific seed.

## Generating Random Floats

To obtain a random floating-point number in the range \[0.0, 1.0), you can use the `random()` function:

```
from random import random
print(random())
```

When the module is imported, Python automatically seeds the random number generator using the current system time. To generate reproducible results, you can explicitly set the seed using the `seed()` function:

```
from random import random, seed


seed(10)  # Set a fixed seed for reproducibility
for i in range(5):
    print(random())
```

This will consistently produce the following sequence:

```
0.5714025946899135
0.4288890546751146
0.3781625196021736
0.1770104802442504
0.3867352020073605
```

> [!important]
> **Reproducibility Tip**
>
> For consistent results across executions, always set a fixed seed when generating random numbers.

## Generating Random Integers

If you need random integers, you can choose between the `randint` and `randrange` functions:

- The `randint(a, b)` function returns an integer N such that a ≤ N ≤ b. For example, to generate a random integer between 0 and 9:

```
from random import randint
for i in range(3):
    print(randint(0, 9))
```

- The `randrange()` function follows Python’s range semantics. When given a single parameter, it returns a random integer from 0 up to (but not including) that number:

```
from random import randrange


for i in range(5):
    print(randrange(10))
```

You can also use `randrange(start, stop, step)` to define a specific step interval. For example, generating a number from the values 0, 3, 6, or 9 within the range 0 to 10 is done as follows:

```
from random import randrange
for i in range(5):
    print(randrange(0, 10, 3))
```

## Random Selection from a List

In addition to generating random numbers, the `random` module includes functions to select items from collections:

- Use `choice()` to pick a single random element from a list.
- Use `sample(population, k)` to retrieve a list of k unique elements from the given list.

```
from random import choice, sample


students = ["Anne", "Bob", "Max", "John", "Peter"]
print("Random choice:", choice(students))
print("Random sample (2 students):", sample(students, 2))
```

For more details on these functions, consult the [Python random module documentation](https://docs.python.org/3/library/random.html).

That’s it for our guide on the `math` and `random` modules in Python. Start experimenting with these functions to better understand the power of Python's standard library and enhance your coding projects. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/a65eb782-d2dc-4850-9046-e4bb57d38876/lesson/7b742a99-0975-4a71-b55c-a01aed0f4191)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/a65eb782-d2dc-4850-9046-e4bb57d38876/lesson/e437941e-4394-4c70-8f4a-2af723c8ad71)**
>
> Practice lab
