# String Introduction Nature of strings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/String-and-List-Methods/String-Introduction-Nature-of-strings)

---

## Table of Contents

- String Introduction Nature of strings
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

String and List Methods

# String Introduction Nature of strings

In this lesson, we explore essential string methods and concepts in Python. Mastering these string fundamentals is crucial for efficient programming, especially given that strings in Python are immutable sequences.

Strings can be defined as either single-line sequences using apostrophes or quotes:

```
'Lydia'
"Hallie"
...
Good morning!
How are you today?
```

You can also create multi-line strings using triple quotes.

One of the basic functions to use with strings is the `len` function, which returns the number of characters in a string. Additionally, you can concatenate strings using the plus operator or repeat them using the asterisk operator.

Python provides several functions to interact with characters and their code points. Consider these examples:

To find the length of a string:

```
print(len('Hello world!'))
```

Output:

```
12
```

To concatenate two strings:

```
print('I love ' + 'Python!')
```

Output:

```
I love Python!
```

To repeat a string multiple times:

```
print('ha' * 4)
```

Output:

```
hahahaha
```

You can also work with a character’s code point. Use the `ord` function to find the code point for a character:

```
print(ord('L'))
```

Output:

```
76
```

If you have a code point and need to retrieve the corresponding character, use the `chr` function:

```
print(chr(76))
```

Output:

```
L
```

Since strings are sequences, you can access individual characters using indexing and slicing, similar to lists. For example:

```
message = 'The flight to New York leaves tomorrow at 11AM'
print(message[0])
print(message[1])
print(message[2])
print(message[0:10])
print(message[14:-24])
```

Output:

```
T
h
e
The flight
New York
```

You can utilize the `in` and `not in` operators to check if a string contains specific characters. However, remember that strings are immutable. The following examples demonstrate what happens when attempting to alter a string:

> [!important]
> **Warning**
>
> Attempting to delete or modify a character in a string will raise a TypeError because strings are immutable.

For instance, this code results in an error:

```
message = 'The flight to New York leaves tomorrow at 11AM'
del message[0]
```

Output:

```
TypeError: 'str' object doesn't support item deletion
```

Similarly, trying to modify a string using list methods will also raise an exception:

```
message = 'The flight to New York leaves tomorrow at 11AM'
del message[0]
message.append('from JFK')
```

Output:

```
TypeError: 'str' object doesn't support item deletion
```

Python includes functions such as `min` and `max` that work with sequences. When applied to strings, these functions return the character with the lowest or highest code point value, respectively.

For example, using `min`:

```
print(min('aAbBcC'))
print(min(' Hello there!'))
```

Note that for the second string, the whitespace character has the lowest code point value.

Similarly, the `max` function returns the character with the highest code point value:

```
print(max('aAbBcC'))
print(max('Hello there!'))
```

String objects also offer several useful built-in methods. Some of the most common include:

- The `index` method to find the first occurrence of a specific character.
- The `count` method to count the number of occurrences of a character.
- The built-in `list` function to convert a string into a list of characters.

Examples:

Find the first occurrence of a character:

```
print('Hello world!'.index('w'))
```

Output:

```
6
```

Count how many times a character appears:

```
print('Hello world!'.count('o'))
```

Output:

```
2
```

Convert a string to a list of characters:

```
print(list('Hello'))
```

Output:

```
['H', 'e', 'l', 'l', 'o']
```

For a comprehensive list of available string methods, refer to the [official Python documentation](https://docs.python.org/3/library/stdtypes.html#string-methods).

> [!important]
> **Note**
>
> Practice these string manipulation techniques with hands-on exercises to reinforce your understanding. Regular practice with these concepts will improve your proficiency in Python.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/2c9c597a-cb2d-43ca-ba29-2dc1b630cae6/lesson/ed010ee1-5913-41b8-a832-a5264ee6de79)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/2c9c597a-cb2d-43ca-ba29-2dc1b630cae6/lesson/429a952e-9041-431b-91d7-45abc8a3c16a)**
>
> Practice lab
