# Use Input Output Redirection e - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Use-Input-Output-Redirection-e)

---

## Table of Contents

- Use Input Output Redirection e
  - Sorting File Content
  - Redirecting Output
  - Standard Input, Standard Output, and Standard Error
  - Redirecting Both STDOUT and STDERR
  - Input Redirection
  - Here Documents and Here Strings
  - Piping Output Between Programs
  - Watch Video
  - Practice Lab

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Use Input Output Redirection e

In this article, you'll learn how to effectively redirect input and output in Linux using simple utilities like sort, grep, and others. Understanding these concepts can help you streamline your workflow and automate routine tasks by controlling where commands read input from and where they send their output.

Most Linux programs read input from a file or the keyboard (standard input) and write output to the terminal (standard output). By using redirection operators, you can change these default behaviors.

---

## Sorting File Content

Assume you have a file named file.txt with the following numbers:

```
$ cat file.txt
6
5
1
3
4
2
```

When you run the command:

```
$ sort file.txt
```

the `sort` utility reads file.txt, sorts the numbers, and displays the sorted output on the screen:

```
1
2
3
4
5
6
```

Many Linux utilities follow this pattern: reading input from a file, processing it, and then writing output to the terminal.

---

## Redirecting Output

Sometimes, you may prefer to save the output of a command to a file rather than simply displaying it. Output redirection allows you to achieve that. For instance, to save the sorted result to a file, use the greater-than sign (`>`):

```
$ sort file.txt > sorted_file.txt
```

If `sorted_file.txt` does not exist, it will be created automatically. Note that using `>` will overwrite an existing file. Consider this example using the `date` command:

```
$ date
Mon Nov  8 18:50:25 CST 2021
$ date > file.txt
$ date > file.txt
$ date > file.txt
$ date > file.txt
```

Every time the `date` output is redirected, any previous content in file.txt is overwritten.

> [!important]
> **Appending Output**
>
> To append output to a file instead of overwriting it, use the double greater-than sign (`>>`):
>
> ```
> $ date >> file.txt
> ```

Alternatively, you can explicitly specify standard output with a prefix:

```
$ date > file.txt
$ date 1> file.txt
```

Both commands have the same effect of redirecting standard output to file.txt.

---

## Standard Input, Standard Output, and Standard Error

Linux commands use three default data streams:

- **STDIN (Standard Input):** The default source for input data.
- **STDOUT (Standard Output):** The default destination for regular output.
- **STDERR (Standard Error):** The default destination for error messages and warnings.

Input redirection uses the less-than sign (`<`), and output redirection employs the greater-than sign (`>`). Because there are two output streams, you may specify which one to redirect by prefixing the operator with a digit: `1` refers to STDOUT and `2` refers to STDERR.

![The image illustrates the flow of standard input, output, and error in a command-line environment, showing how data from a file is processed by a sort command and directed to a terminal and an error file.](https://kodekloud.com/kk-media/image/upload/v1752881270/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Use-Input-Output-Redirection-e/command-line-input-output-flow.jpg)

To redirect error messages to a file, use:

```
$ grep -r '^The' /etc/ 2>errors.txt
```

This command sends error messages (such as "Permission denied") to errors.txt and prevents them from cluttering the terminal.

A special file, `/dev/null`, can be used to discard output completely. For example:

```
$ grep -r '^The' /etc/ 2>/dev/null
```

Redirecting error messages to `/dev/null` effectively silences them.

---

## Redirecting Both STDOUT and STDERR

There are times when you want to capture both regular output and error messages in a file. There are two common methods:

1.  **Redirecting to Separate Files**

    You can redirect standard output and error messages to separate files:

    ```
    $ grep -r '^The' /etc/ 1>output.txt 2>errors.txt
    ```

    To append to existing files rather than overwriting them, use:

    ```
    $ grep -r '^The' /etc/ 1>>output.txt 2>>errors.txt
    ```

2.  **Merging STDOUT and STDERR into One File**

    Use the syntax `2>&1` to merge STDERR with STDOUT so both are redirected to the same file:

    ```
    $ grep -r '^The' /etc/ >all_output.txt 2>&1
    ```

It is essential to place the redirection operators in the correct order. For example, writing:

```
$ grep -r '^The' /etc/ 2>&1 1>all_output.txt
```

will not work as intended because STDERR gets redirected before STDOUT is updated.

---

## Input Redirection

Some commands do not allow you to specify an input file directly because they expect input from the keyboard. Input redirection solves this problem. Consider a hypothetical command, `sendemail`, that expects you to type an email message:

```
$ sendemail someone@example.com
Hi Someone,
How are you today?
...
Talk to you soon
Bye
```

You can simulate this input by redirecting the contents of a file (for example, emailcontent.txt) to the command:

```
$ sendemail someone@example.com < emailcontent.txt
```

This approach eliminates the need for manual input while still sending the email content.

---

## Here Documents and Here Strings

A **here document** (or "here doc") allows you to pass multiple lines of text as input to a command. You denote the beginning and end of the text block with a delimiter (commonly EOF):

```
$ sort <<EOF
6
3
2
5
1
4
EOF
1
2
3
4
5
6
```

This method encapsulates both the command and its input in a single self-contained block.

A **here string** is a simplified variant that provides a single line of input. Everything following the redirection operator (`<<<`) is treated as input:

```
$ bc <<< 1+2+3+4
10
```

This is especially useful for commands like `bc` where you want to quickly evaluate a mathematical expression without entering an interactive session.

---

## Piping Output Between Programs

Individual Linux utilities often perform a single task very well. However, by combining them with pipes, you can create powerful command chains to handle more complex operations.

For example, suppose you want to extract configuration settings from `/etc/login.defs`, ignore comments, sort the settings alphabetically, and neatly format the output into columns. You can accomplish this by chaining commands together:

```
$ grep -v '^#' /etc/login.defs | sort | column -t
```

Here's what each command does:

- `grep -v '^#' /etc/login.defs` removes commented lines.
- `sort` arranges the remaining lines in alphabetical order.
- `column -t` aligns the output into well-formatted columns.

> [!important]
> **Benefits of Piping**
>
> Piping is a powerful technique that lets you pass the output of one command directly as input to another. This not only simplifies complex tasks but also allows you to create efficient workflows.

---

By mastering these techniques for redirecting input, output, and error streams, as well as leveraging pipes, you can customize the behavior of Linux commands to suit a wide range of tasks. These methods not only simplify command-line operations but also enable you to automate processing within scripts effectively.

For further learning, consider reviewing the [Linux Command Line Basics](https://linuxcommand.org/) and related technical guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/2721d1fa-f098-4355-aa67-ce3a57f7711b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/c67b99b5-0f90-41fa-ac4e-221f95686cb6)**
>
> Practice lab
