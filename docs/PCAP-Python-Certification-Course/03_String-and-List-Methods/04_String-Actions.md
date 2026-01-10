# String Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/String-and-List-Methods/String-Actions)

---

## Table of Contents

- String Actions
  - Comparing Strings
  - Sorting Strings and Lists
  - Converting Data Types
  - Watch Video
  - Practice Lab
    - Using the sorted() Function
    - Using the sort() Method

---

## Content

PCAP - Python Certification Course

String and List Methods

# String Actions

In this article, you'll learn how Python compares strings, sorts lists, and converts data types. We'll explore various methods and provide examples to help you understand these processes.

## Comparing Strings

Python allows you to compare strings using comparison operators such as `<`, `>`, and `==`. When comparing two strings, Python checks the Unicode (code point) values of each character sequentially. For example, consider the comparison:

```
print('apple' < 'banana')
```

This outputs:

```
True
```

Two strings are considered equal only if they consist of the same characters in the same order. If the strings differ, even if they are of the same length, Python determines the result based on the first pair of characters that differ. Remember that string comparisons are case sensitive; uppercase letters have different code point values than lowercase ones.

![The image shows a comparison between the strings 'abc' and 'adc', with their ASCII values displayed below each character, illustrating that 'abc' is less than 'adc'.](https://kodekloud.com/kk-media/image/upload/v1752882927/notes-assets/images/PCAP-Python-Certification-Course-String-Actions/string-comparison-abc-adc-ascii.jpg)

> [!important]
> **Note**
>
> Be mindful that comparisons between strings are influenced by Unicode character values. This means that special characters and punctuation might affect comparison outcomes.

## Sorting Strings and Lists

Python offers two primary ways to sort elements. You can either use the built-in function `sorted()` which returns a new sorted list, or the list’s `sort()` method, which sorts the list in place.

### Using the sorted() Function

The `sorted()` function creates a new sorted list without altering the original collection. Consider these examples:

```
print(sorted(['kiwi', 'apple', 'mango']))
print(sorted('Sort me!'))
```

Console output:

```
['apple', 'kiwi', 'mango']
[' ', '!', 'S', 'e', 'm', 'o', 'r', 't']
```

### Using the sort() Method

If you want to sort a list in place, use the `sort()` method:

```
fruits = ['kiwi', 'apple', 'mango']
fruits.sort()
print(fruits)
```

Console output:

```
['apple', 'kiwi', 'mango']
```

Both sorting mechanisms arrange items in ascending order by default, meaning from the lowest to the highest value.

## Converting Data Types

In many scenarios, you may need to convert non-string elements into strings, particularly when printing messages that include numeric values. Use the `str()` function for this purpose:

```
age = 23
print('I am ' + str(age) + ' years old')
```

Attempting to concatenate a string with an integer directly without conversion will result in a `TypeError`:

```
age = 23
print('I am ' + age + ' years old')
```

Console output:

```
I am 23 years old
TypeError: can only concatenate str (not "int") to str
```

Similarly, when comparing numeric values with numbers represented as strings, it is necessary to convert the string to a numerical type. For instance:

```
avg_age_input = '34.2'
min_avg_age = 30

print(float(avg_age_input) > min_avg_age)
print(avg_age_input < min_avg_age)
```

Console output:

```
True
TypeError: '>' not supported between instances of 'str' and 'int'
```

If you do not convert the string to a floating-point number before making the comparison, Python will raise a `TypeError`.

> [!important]
> **Warning**
>
> Always ensure that you convert data types appropriately when performing operations. Failure to do so may result in errors that can interrupt your program's execution.

That's it for now! It's time to put these concepts into practice. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/2c9c597a-cb2d-43ca-ba29-2dc1b630cae6/lesson/923d3d8d-c9a8-4a64-96d4-ef783a8b5617)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/2c9c597a-cb2d-43ca-ba29-2dc1b630cae6/lesson/74d04e40-bf06-425d-93c0-1aac2171a85e)**
>
> Practice lab
