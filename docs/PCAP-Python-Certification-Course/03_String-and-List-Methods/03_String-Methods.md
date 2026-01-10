# String Methods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/String-and-List-Methods/String-Methods)

---

## Table of Contents

- String Methods
  - Capitalize
  - Center
  - Combined Example for Capitalize and Center
  - Endswith and Startswith
  - Find and rfind
  - Alphanumeric, Alphabetic, and Digit Checks
  - Case and Whitespace Checks
  - Join and Split
  - Lower and Upper
  - Stripping Whitespace and Characters
  - Replace, Swapcase, and Title
  - Watch Video
  - Practice Lab
    - Join
    - Split
    - Using lstrip
    - Using rstrip
    - Using strip
    - Replace
    - Swapcase
    - Title

---

## Content

PCAP - Python Certification Course

String and List Methods

# String Methods

In this article, we review several useful Python string methods that create new strings from a source string without modifying the original. These methods are essential for effective string manipulation in your Python projects and can help you build cleaner and more readable code.

> [!important]
> **Note**
>
> All string methods demonstrated here return new string objects. The original strings remain unchanged throughout the transformations.

## Capitalize

The `capitalize` method converts the first character of the string to uppercase (if it's alphabetical) and converts all remaining characters to lowercase.

Example usage:

```
print('hello world!'.capitalize())
print('12 bananas'.capitalize())
print('αβγδ'.capitalize())
print(' Hello!'.capitalize())
```

Expected output:

```
Hello world!
12 bananas
Αβγδ
hello!
```

## Center

The `center` method returns a new string padded with spaces or an optional specified character. The first parameter represents the total width of the resulting string.

Example usage:

```
print('hello'.center(9))
print('hello'.center(9, '*'))
print('1234'.center(10, '0'))
print('1234'.center(10))
```

Expected output:

```
  hello
**hello**
0001234000
   1234
```

> [!important]
> **Note**
>
> When providing a second argument to the `center` method, it uses that character for padding instead of the default space.

## Combined Example for Capitalize and Center

The following example demonstrates using both the `capitalize` and `center` methods in a single script:

```
# main.py
print('hello world!'.capitalize())
print('12 bananas'.capitalize())
print('αβγδ'.capitalize())
print(' Hello!'.capitalize())


print('hello'.center(9))
print('hello'.center(9, '*'))
print('1234'.center(10, '0'))
print('1234'.center(10))
```

Console output:

```
Hello world!
12 bananas
Αβγδ
hello!
  hello
**hello**
0001234000
   1234
```

## Endswith and Startswith

The `endswith` and `startswith` methods are used to verify whether a string ends or begins with a specified substring, respectively. Both methods return `True` or `False`.

Example usage:

```
print('hello world!'.endswith('!'))
print('hello world!'.endswith('world!'))
print('hello world!'.endswith('hello'))
print('hello world!'.endswith('world'))


print('hello world!'.startswith('hello'))
print('hello world!'.startswith('Hello'))
print('hello world!'.startswith('h'))
print('hello world!'.startswith('world'))
```

Expected output:

```
True
True
False
False
True
False
True
False
```

## Find and rfind

The `find` method returns the index of the first occurrence of a substring, and it returns `-1` if the substring is not found. You can also specify start and end indices for the search. Conversely, the `rfind` method searches from the right side of the string.

Example usage:

```
print('hello world!'.find('h'))
print('hello world!'.find('world'))
print('hello world!'.find('o'))
print('hello world!'.find('x'))
print('hello world!'.find('r', 4, 10))
print('hello world!'.find('r', 1, 4))
print('hello world!'.find('h', 3))
```

Searching from the right:

```
print('hello world!'.rfind('o'))
```

## Alphanumeric, Alphabetic, and Digit Checks

Python provides several methods to check the composition of strings:

- `isalnum()`: Returns `True` if all characters are alphanumeric.
- `isalpha()`: Returns `True` if all characters are letters.
- `isdigit()`: Returns `True` if all characters are digits.

Example usage:

```
print('python'.isalnum())
print('johndoe98@email.com'.isalnum())


print('Hello world!'.isalpha())
print('Hello'.isalpha())


print('1998'.isdigit())
print('1998/04/06'.isdigit())
```

Expected output:

```
True
False
False
True
True
False
```

## Case and Whitespace Checks

The following methods are used to verify the case of characters or the presence of whitespace:

- `islower()`: Returns `True` if all alphabetic characters are lowercase.
- `isupper()`: Returns `True` if all alphabetic characters are uppercase.
- `isspace()`: Returns `True` if the string consists solely of whitespace characters.

Example usage:

```
print('hello world'.islower())
print('Hello world'.islower())


print('hello world'.isupper())
print('HELLO WORLD'.isupper())


print('hello world'.isspace())
print(' '.isspace())
```

Expected output:

```
True
False
False
True
False
True
```

## Join and Split

### Join

The `join` method concatenates an iterable of strings using the string on which it is invoked as a separator. Ensure every element in the list is a string.

Example usage:

```
print(' '.join(['apple', 'kiwi', 'pear']))
print('!'.join(['apple', 'kiwi', 'pear']))
print(''.join(['apple', 'kiwi', 'pear']))
```

Expected output:

```
apple kiwi pear
apple!kiwi!pear
applekiwipear
```

### Split

The `split` method breaks a string into a list of substrings using a specified delimiter. If no delimiter is provided, it splits the string at whitespace.

Example usage:

```
print('apple kiwi pear'.split())
print('apple n kiwi n pear'.split())
print('apple kiwi pear'.split('kiwi'))
```

Expected output:

```
['apple', 'kiwi', 'pear']
['apple', 'kiwi', 'pear']
['apple ', ' pear']
```

## Lower and Upper

The `lower` method converts all uppercase letters in a string to lowercase, while the `upper` method converts all lowercase letters to uppercase.

Example usage for lowercase conversion:

```
print('Hello world!'.lower())
print('lowercase already'.lower())
print('User Input'.lower())
```

Expected output:

```
hello world!
lowercase already
user input
```

Example usage for uppercase conversion:

```
print('Hello world!'.upper())
print('UPPERCASE ALREADY'.upper())
print('User Input'.upper())
```

Expected output:

```
HELLO WORLD!
UPPERCASE ALREADY
USER INPUT
```

## Stripping Whitespace and Characters

Python provides three primary methods to remove characters from strings:

- `lstrip()`: Removes leading whitespace or specified characters.
- `rstrip()`: Removes trailing whitespace or specified characters.
- `strip()`: Removes both leading and trailing whitespace or specified characters.

### Using lstrip

Example usage:

```
print(' Hello world!'.lstrip())
print('www.kodekloud.com'.lstrip('w.'))
```

Expected output:

```
Hello world!
kodekloud.com
```

### Using rstrip

Example usage:

```
print('Hello world! '.rstrip())
print('www.kodekloud.com'.rstrip('.com'))
```

Expected output:

```
Hello world!
www.kodekloud
```

### Using strip

Example usage:

```
print(' Hello world! '.strip())
print('*123456789000'.strip('0'))
```

Expected output:

```
Hello world!
*123456789
```

## Replace, Swapcase, and Title

### Replace

The `replace` method generates a new string by replacing all occurrences of a specified substring with another substring. You can also limit the number of replacements by providing an optional third parameter.

Example usage:

```
print('That is great'.replace('great', 'bad'))
print('123456789'.replace('123', ''))
print('Replace all spaces'.replace(' ', '-'))
```

Expected output:

```
That is bad
456789
Replace-all-spaces
```

### Swapcase

The `swapcase` method swaps the case of each letter in the string, so uppercase becomes lowercase and vice versa.

Example usage:

```
print('I am SO happy!'.swapcase())
```

Expected output:

```
i AM so HAPPY!
```

### Title

The `title` method capitalizes the first character of every word and converts the rest to lowercase.

Example usage:

```
print('python has GREAT methods!'.title())
```

Expected output:

```
Python Has Great Methods!
```

That concludes our comprehensive guide on Python string methods. Start practicing these methods in your coding exercises and projects to improve your string manipulation skills. For more Python tutorials and examples, check out additional [Python documentation](https://www.python.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/2c9c597a-cb2d-43ca-ba29-2dc1b630cae6/lesson/fb2e2b3f-9e59-4c15-aa80-d4dda7721f15)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/2c9c597a-cb2d-43ca-ba29-2dc1b630cae6/lesson/2e06ee69-6162-4f46-92fe-c70d879ed072)**
>
> Practice lab
