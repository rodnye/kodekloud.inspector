# Arithmetic Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Shell-Script-Introduction/Arithmetic-Operations)

---

## Table of Contents

- Arithmetic Operations
  - Using the expr Command
  - Using Double Parentheses
  - Performing Floating Point Arithmetic with bc
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Shell Script Introduction

# Arithmetic Operations

In this guide, we explore various methods to perform arithmetic operations in shell scripts. We'll cover different techniques such as using the expr command, double parentheses for arithmetic expansion, and the bc utility for floating point calculations.

## Using the expr Command

The `expr` command is a traditional way to perform arithmetic operations in shell scripts. To use it, simply provide an arithmetic expression as input, and it will output the result. For example, the following command adds two numbers:

```
$ expr 6 + 3
9
```

> [!important]
> **Note**
>
> Ensure that operators and operands are strictly separated by spaces. When multiplying using `expr`, the star symbol (\*) must be escaped with a backslash because `*` is interpreted as a reserved regex character.

The `expr` command supports other arithmetic operations like subtraction, division, and multiplication. You can also incorporate variable substitution. Consider the following examples:

```
$ expr 6 + 3
9
$ expr 6 - 3
3
$ expr 6 / 3
2
$ expr 6 \* 3
18


$ A=6
$ B=3
$ expr $A + $B
9
$ expr $A - $B
3
$ expr $A / $B
2
$ expr $A \* $B
18
```

## Using Double Parentheses

Bash also offers a more concise method for arithmetic evaluation using double parentheses `(( ))`. This C-like syntax automatically handles variable expansion (no need to prefix variables with `$`) and doesn’t require spaces between operators and operands. Escaping the multiplication operator is also unnecessary.

For example, the following commands perform arithmetic operations:

```
$ A=6
$ B=3
$ echo $(( A + B ))
9
$ echo $(( A - B ))
3
$ echo $(( A / B ))
2
$ echo $(( A * B ))
18
```

Using double parentheses also allows C-style variable manipulation with operators such as pre-increment (`++A`), pre-decrement (`--A`), post-increment (`A++`), and post-decrement (`A--`). Observe the following:

```
$ echo $(( ++A ))
7
$ echo $(( --A ))
6
$ echo $(( A++ ))
6
$ echo $(( A-- ))
7
```

> [!important]
> **Warning**
>
> Always use `echo` or store the result in a variable when using arithmetic expansion. Failing to do so might cause the shell to misinterpret the output as a command, leading to errors.

## Performing Floating Point Arithmetic with bc

Both `expr` and double parentheses support only integer arithmetic. To handle floating point calculations, use the `bc` utility. The `bc` tool acts as a basic calculator and is ideal for more precise computations.

For instance, dividing 10 by 3 using integer arithmetic returns an integer result:

```
$ A=10
$ B=3
$ expr $A / $B
3
$ echo $(( A / B ))
3
```

To obtain a floating point result, use the `-l` flag with `bc`:

```
$ echo "$A / $B" | bc -l
3.333333
```

The `-l` flag loads the standard math library, enabling accurate floating point calculations. You can interact with `bc` in a script or use piping for one-off operations.

## Summary

By utilizing the methods discussed above, you can effectively perform both integer and floating point arithmetic in your shell scripts. Whether you choose the traditional `expr` command, the modern double parentheses expansion, or the versatile `bc` utility for precision arithmetic, these techniques are essential for automating numerical operations in your scripts.

Happy scripting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2709b373-3a6f-4b31-9aff-fe8a553898fa/lesson/60ae59e7-fbc1-4954-bcdc-0b574f259399)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2709b373-3a6f-4b31-9aff-fe8a553898fa/lesson/3cb2b8e2-e29c-4525-8fc7-0c999dda4f9b)**
>
> Practice lab
