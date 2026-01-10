# Use input output redirection 2 etc - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Understand-and-Use-Essential-Tools/Use-input-output-redirection-2-etc)

---

## Table of Contents

- Use input output redirection 2 etc
  - Overview of Standard Streams
  - Redirecting Output
  - Input Redirection
  - Redirecting Error Messages
  - Redirecting Both Standard Output and Standard Error
  - Here Documents and Here Strings
  - Piping Output Between Commands
  - Summary
  - Watch Video
    - Redirecting to a File
    - Overwriting Versus Appending
    - Here Documents
    - Here Strings

---

## Content

Red Hat Certified System Administrator(RHCSA)

Understand and Use Essential Tools

# Use input output redirection 2 etc

In this lesson, we explore various methods for redirecting input and output in Linux. Understanding how Linux programs handle standard streams is crucial for efficient command-line operations.

## Overview of Standard Streams

Linux programs use three primary standard streams:

- **Standard Input (stdin):** Receives input data.
- **Standard Output (stdout):** Sends processed output.
- **Standard Error (stderr):** Outputs error messages.

By default, most programs display output on the terminal. However, output redirection allows you to save results to files or combine multiple streams.

![The image illustrates the flow of standard input, output, and error in a command-line environment, showing how data from "file.txt" is processed by the "sort" command, with standard output directed to the terminal and standard error to "errors.txt".](https://kodekloud.com/kk-media/image/upload/v1752883639/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Use-input-output-redirection-2-etc/command-line-input-output-flow.jpg)

## Redirecting Output

### Redirecting to a File

Consider the utility `sort` which arranges text after reading it from a file. For example, given a file named `file.txt`:

```
$ cat file.txt
6
5
1
3
4
2
```

Sorting the file outputs the ordered numbers to the terminal:

```
$ sort file.txt
1
2
3
4
5
6
```

To save the sorted output to a new file instead of displaying it, you can use the redirection operator `>`:

```
$ sort file.txt > sortedfile.txt
```

> [!important]
> **Note**
>
> The target file (`sortedfile.txt`) is created automatically if it does not exist.

### Overwriting Versus Appending

Using a single `>` operator overwrites the contents of the target file. For example:

```
$ date > file.txt
$ date > file.txt
$ cat file.txt
Mon Nov  8 18:50:30 CST 2021
```

If you want to preserve existing content and append new output, use the `>>` operator:

```
$ date >> file.txt
$ date >> file.txt
$ date >> file.txt
$ date >> file.txt
$ date >> file.txt
$ cat file.txt
Mon Nov  8 18:50:30 CST 2021
Mon Nov  8 18:50:31 CST 2021
Mon Nov  8 18:50:32 CST 2021
Mon Nov  8 18:50:34 CST 2021
Mon Nov  8 18:50:35 CST 2021
```

You can also explicitly target the standard output file descriptor with `1>`:

```
$ date > file.txt
$ date 1>file.txt
```

Both commands will redirect the standard output to `file.txt`.

## Input Redirection

Sometimes, rather than receiving input directly from the keyboard, programs can read data from a file using the `<` symbol. For example, to send the contents of `emailcontent.txt` to the `sendemail` command:

```
$ sendemail someone@example.com < emailcontent.txt
```

This operation makes it appear as though you have manually input the email content.

## Redirecting Error Messages

Linux allows you to handle error messages separately by using the file descriptor `2`. For example, to redirect error messages to a file named `errors.txt`:

```
$ command 2>errors.txt
```

> [!important]
> **Warning**
>
> Be sure to differentiate between standard output and error messages. This helps in troubleshooting issues effectively.

For instance, running:

```
$ grep -r '^The' /etc/
```

might display many "Permission denied" errors. To suppress these errors, they can be redirected to `/dev/null`, a special file that discards input:

```
$ grep -r '^The' /etc/ 2>/dev/null
```

## Redirecting Both Standard Output and Standard Error

At times, you might want to capture both standard output and error messages into a single file. You can achieve this by redirecting stdout to a file and then sending stderr to the same location:

```
$ grep -r '^The' /etc/ 1>all_output.txt 2>&1
```

> The `2>&1` operator redirects stderr to the current destination of stdout. Ensure you place `2>&1` **after** the stdout redirection to avoid errors being displayed in the terminal.

## Here Documents and Here Strings

### Here Documents

A here document is a way to provide inline input to commands. For example, sorting numbers using an inline document:

```
$ sort <<EOF
6
3
2
5
1
4
EOF
```

Here, `EOF` serves as a delimiter indicating where the input ends. You can choose any delimiter, but `EOF` is widely used.

### Here Strings

A here string is used to pass a single line of input into a command:

```
$ bc <<< "1+2"
```

This operator makes the string `"1+2"` available as input to `bc`.

## Piping Output Between Commands

Linux's philosophy of composing small utilities allows you to perform complex tasks by linking commands together using the pipe `|` operator. For example, to filter and format configuration settings:

```
$ grep -v '^#' /etc/login.defs | sort | column -t
```

In this pipeline:

- `grep -v '^#' /etc/login.defs` removes lines that start with `#`.
- `sort` arranges the remaining output.
- `column -t` formats the output into aligned, easy-to-read columns.

This method of chaining commands not only improves workflow efficiency but also enhances readability.

## Summary

This guide introduced essential redirection and piping techniques in Linux:

| Operation                      | Description                                      | Example Command                                    |
| ------------------------------ | ------------------------------------------------ | -------------------------------------------------- |
| **Overwriting Output**         | Redirect output and overwrite existing file      | `sort file.txt > sortedfile.txt`                   |
| **Appending Output**           | Add output to the end of an existing file        | `date >> file.txt`                                 |
| **Redirecting Error Messages** | Redirect stderr to a file                        | `command 2>errors.txt`                             |
| **Combining Output and Error** | Send both stdout and stderr to a single file     | `command 1>output.txt 2>&1`                        |
| **Input Redirection**          | Direct input from a file instead of the keyboard | `sendemail someone@example.com < emailcontent.txt` |
| **Here Documents**             | Provide multiline input directly in the terminal | `sort <<EOF ... EOF`                               |
| **Here Strings**               | Pass a single line of input directly             | `bc <<< "1+2"`                                     |
| **Piping Commands**            | Chain commands to process and format data        | \\`grep -v '^#' /etc/login.defs                    |

That concludes our discussion on input and output redirection in Linux. With these techniques, you can manipulate data streams to suit various operational needs. Now it's time to apply this knowledge in your hands-on labs and command-line experiments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c3d8eded-b1dc-479c-a51a-c4f468ba6da3/lesson/ce7ead34-51cd-41c8-a4be-2052ae5faaca)**
>
> Watch video content
