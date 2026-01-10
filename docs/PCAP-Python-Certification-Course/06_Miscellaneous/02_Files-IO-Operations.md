# Files IO Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/Miscellaneous/Files-IO-Operations)

---

## Table of Contents

- Files IO Operations
  - Watch Video
  - Practice Lab

---

## Content

PCAP - Python Certification Course

Miscellaneous

# Files IO Operations

Python is widely used to handle data stored in files, making file I/O operations an essential skill. Different operating systems specify file paths in unique ways. For example, Unix/Linux systems use forward slashes, while Windows systems use backslashes:

```
Unix/Linux:
  /path/to/my/file


Windows:
  \path\to\my\file
```

Fortunately, Python converts slashes based on the operating system, so you can safely use forward slashes when specifying file paths.

When working with files in Python—or any programming language—you don't directly interact with the file itself. Instead, you work with a stream. A stream is an abstraction that provides methods to perform actions on the underlying file. The first step is connecting to the file using Python's built-in `open` function.

![The image contains text explaining the functions of "open" and "close" in the context of a stream, detailing how to open a file in different modes and close the connection.](https://kodekloud.com/kk-media/image/upload/v1752882910/notes-assets/images/PCAP-Python-Certification-Course-Files-IO-Operations/open-close-stream-functions-explained.jpg)

You can open a file in different modes:

- **Read mode** – For reading data only.
- **Write mode** – For writing data (creates the file if it doesn't exist).
- **Update mode** – For both reading and writing.

Opening a file means attaching a stream to it, and once your operations are complete, you detach the stream using the `close` method.

When a file is opened, Python creates a specific class instance tailored to the chosen mode. This instance exposes methods to interact with the stream, and it is discarded once the stream is closed.

There are two types of streams:

- **Text Streams:**  
  These streams contain typographical characters (letters, digits, etc.) and display file content as seen in typical text editors—either character by character or line by line.
- **Binary Streams:**  
  These streams consist of sequences of bytes (for example, executables, images, or database files) and display content byte by byte or in blocks.

![The image defines "Text Stream" as a sequence of typographical characters and "Binary Stream" as a sequence of bytes.](https://kodekloud.com/kk-media/image/upload/v1752882911/notes-assets/images/PCAP-Python-Certification-Course-Files-IO-Operations/text-stream-binary-stream-definition.jpg)

A key detail about text files is how line endings are managed. On Unix/Linux systems, a line ends with a single character (LF), while Windows systems typically end lines with a combination of carriage return and line feed (CRLF). This difference can affect file portability. To address this, Python's stream classes perform automatic newline conversion when a file is opened in text mode. During read operations, any recognized newline sequence is translated into the single newline character (`\n`). Conversely, when writing, every newline character (`\n`) is converted into the system’s default sequence (LF on Unix/Linux and CRLF on Windows).

To open a stream, use the `open` function by passing in the file path, mode, and optionally, the file encoding. For example, here’s how to open a file in read mode:

```
stream = open("path/to/file", "r")
```

The mode options include:

- "r": Read mode (the file must exist).
- "w": Write mode (creates the file if it doesn't exist).
- "a": Append mode (creates the file if it doesn't exist).
- "r+": Read and update mode (the file must exist).
- "w+": Write and update mode (creates the file if it doesn't exist).

For binary files, simply append a "b" to the mode, such as "rb" for reading or "wb" for writing.

![The image shows a list of text file modes with their descriptions: "r" for read mode, "w" for write mode, "a" for append mode, "r+" for read and update, and "w+" for write and update.](https://kodekloud.com/kk-media/image/upload/v1752882912/notes-assets/images/PCAP-Python-Certification-Course-Files-IO-Operations/text-file-modes-descriptions.jpg)

![The image lists binary file modes with their descriptions: "rb" for read mode, "wb" for write mode, "ab" for append mode, "r+b" for read and update, and "w+b" for write and update.](https://kodekloud.com/kk-media/image/upload/v1752882913/notes-assets/images/PCAP-Python-Certification-Course-Files-IO-Operations/binary-file-modes-descriptions.jpg)

It is also possible to explicitly include the 't' for text mode, although Python defaults to text mode when no such mode character is specified.

Below is an example that demonstrates opening a text file and safely closing it, with error handling in case the file does not exist:

```
try:
    stream = open("text.txt", "rt")
    stream.close()
except Exception as exc:
    print("Cannot open the file:", exc)
```

In addition to files that you open manually using the `open` function, there are three standard streams that are automatically available when a Python program starts. These streams, accessible through the sys module, include:

- **stdin:**  
  This stream is associated with keyboard input. By default, the `input()` function reads from `stdin`.
- **stdout:**  
  This stream is connected to the screen and is used for displaying output. The `print()` function sends output to `stdout`.
- **stderr:**  
  This stream is used to output error messages when the program encounters an error.

![The image describes three Python system streams: `sys.stdin` for reading input, `sys.stdout` for outputting data, and `sys.stderr` for handling errors.](https://kodekloud.com/kk-media/image/upload/v1752882914/notes-assets/images/PCAP-Python-Certification-Course-Files-IO-Operations/python-system-streams-diagram.jpg)

> [!important]
> **Note**
>
> When working with file I/O, always ensure you close streams after accessing a file to free system resources. Using Python’s context managers (the `with` statement) can simplify this process by automatically closing the file.

Errors can occur when working with files and streams. The `IOError` object includes a property called `errno` (sometimes referred to as `error_node`), which holds constants representing various error conditions. For example:

- `errno.EEXIST`: Attempting to write to a read-only file.
- `errno.ENOENT`: The specified file or directory does not exist.

While there are many error codes, familiarity with the common ones can expedite troubleshooting.

That concludes this lesson on file I/O operations in Python. Head over to the hands-on labs to start practicing and apply what you've just learned.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/5f14f6c9-b6de-42a2-8645-3a2b73025504)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/f130fee7-a5f4-4c7f-bc8e-ffd6f1b8fdc1/lesson/c3a95d5f-c634-42a3-b84a-cc0ab120755e)**
>
> Practice lab
