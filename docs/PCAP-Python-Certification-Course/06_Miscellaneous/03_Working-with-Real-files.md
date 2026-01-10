# Working with Real files - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Miscellaneous/Working-with-Real-files)

---

## Table of Contents

- Working with Real files
  - Reading a File Character by Character
  - Reading a File Line by Line with readline
  - Reading All Lines with readlines
  - Working with Amorphous Data: Bytearrays
  - Reading from a Binary File with readinto
  - Reading the Entire Binary File with read
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Miscellaneous

# Working with Real files

In this lesson, we explore several approaches to reading from and writing to files in Python. Each method is demonstrated with practical code examples to help you understand how to work with different file types, including text and binary files.

## Reading a File Character by Character

Sometimes you need to process a file at a very granular level, such as reading one character at a time. This is particularly useful when the file's size is unknown or when you require fine control over data handling. The following example uses the `read` method with an argument of one to iterate over each character until the end of the file is reached.

```
from os import strerror


try:
    stream = open('text.txt', "rt")
    character = stream.read(1)
    while character != '':
        print(character, end='\n')
        character = stream.read(1)
    stream.close()
except IOError as e:
    print("I/O error occurred:", strerror(e.errno))
```

## Reading a File Line by Line with readline

For many applications, it is more efficient to read a file one line at a time. The `readline` method returns a single line from the file as a string, making it ideal for processing files where each line represents a distinct record. In the example below, we read four consecutive lines from the file:

```
from os import strerror


try:
    stream = open('text.txt', 'rt')
    print(stream.readline())
    print(stream.readline())
    print(stream.readline())
    print(stream.readline())
    stream.close()
except IOError as e:
    print("I/O error occurred:", strerror(e.errno))
```

## Reading All Lines with readlines

If you want to work with the entire file as a collection of lines, the `readlines` method is a perfect choice. This method reads the complete file and returns a list, where each element is a line from the text file. You can then easily iterate over this list. Below is an example demonstrating this approach:

```
from os import strerror


try:
    stream = open("text.txt", "rt")
    lines = stream.readlines()
    for line in lines:
        print("Line:", line)
    stream.close()
except IOError as e:
    print("I/O error occurred:", strerror(e.errno))
```

> [!important]
> **Tip**
>
> If you're processing very large files, consider using an iterative approach (like `readline` or reading chunks) to avoid memory issues.

## Working with Amorphous Data: Bytearrays

In scenarios where you need to handle data without a predefined structure, such as binary files, Python's `bytearray` comes in handy. A `bytearray` is a mutable sequence of bytes, allowing values from 0 to 255. The following code creates a bytearray of size 10 (initialized with zeros) and writes it to a binary file:

```
from os import strerror


data = bytearray(10)


try:
    bf = open('myfile.bin', 'wb')
    bf.write(data)
    bf.close()
except IOError as e:
    print("I/O error occurred:", strerror(e.errno))
```

## Reading from a Binary File with readinto

When you need to read binary data into an existing bytearray, the `readinto` method is very efficient. This method reads a fixed number of bytes (matching the size of your bytearray) directly into the array. In the example below, we open a binary file, read its content into a bytearray, and then print each byte in hexadecimal format:

```
from os import strerror


data = bytearray(10)


try:
    bf = open('myfile.bin', 'rb')
    bf.readinto(data)
    bf.close()


    for b in data:
        print(hex(b), end=' ')
except IOError as e:
    print("I/O error occurred:", strerror(e.errno))
```

## Reading the Entire Binary File with read

Alternatively, you can read the whole binary file into memory using the `read` method, which is suitable for files that are not excessively large. This approach reads the entire file and converts it into a bytearray. The following code demonstrates this method and prints each byte in hexadecimal:

```
from os import strerror


try:
    bf = open('myfile.bin', 'rb')
    data = bytearray(bf.read())
    bf.close()


    for b in data:
        print(hex(b), end=' ')
except IOError as e:
    print("I/O error occurred:", strerror(e.errno))
```

> [!important]
> **Summary**
>
> In this lesson, we've covered multiple file handling methods in Python. Whether you're reading a file character by character, line by line, or in bulk as a binary file, each approach offers unique benefits depending on your application's requirements.

That concludes this lesson. Now, it's time to apply these examples in your projects to deepen your understanding of file I/O in Python. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/64be0314-a04f-464c-b5a1-1e3738828308)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/64766146-18b8-4ed5-a7a6-27dd444af162)**
>
> Practice lab
