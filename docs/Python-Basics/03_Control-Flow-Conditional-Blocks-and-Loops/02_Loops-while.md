# Loops while - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-Basics/Control-Flow-Conditional-Blocks-and-Loops/Loops-while)

---

## Table of Contents

- Loops while
  - Basic While Loop Example
  - While Loop with Else Clause
  - Get Hands-On Practice
  - Watch Video

---

## Content

Python Basics

Control Flow Conditional Blocks and Loops

# Loops while

The while loop is a fundamental control structure that repeatedly executes a block of code as long as a specified condition remains true. In this guide, you'll learn how to implement a simple guessing game using a while loop.

## Basic While Loop Example

Consider the following Python example where the user must guess a secret number:

```
secret_number = 3
guess = int(input("Guess a number: "))
while guess != secret_number:
    guess = int(input("Guess a number: "))
```

In this example, the secret number is set to 3. The program prompts the user to enter a guess. As long as the guessed number is not equal to the secret number, the loop continues prompting the user for a new guess. Once the correct number is entered, the loop terminates.

> [!important]
> **Tip**
>
> Using a while loop allows your program to handle an unknown number of iterations, making it ideal for input validation and games such as this guessing game.

## While Loop with Else Clause

Similar to the if statement, a while loop can also include an else block. The code in the else block executes once the loop condition returns false. In the following modified example, the program congratulates the user after entering the correct number:

```
secret_number = 3
guess = int(input("Guess a number: "))
while guess != secret_number:
    guess = int(input("Guess a number: "))
else:
    print("Congratulations, you got it!")
```

When the user eventually guesses the correct number (in this case, 3), the while loop exits and the else block displays a congratulatory message.

> [!important]
> **Note**
>
> The else block in a while loop is executed only when the loop terminates normally and is not triggered by a break statement.

## Get Hands-On Practice

Now that you've seen how a while loop operates both with and without an else clause, it’s time to integrate this concept into your programming projects. Experiment, modify the code, and see how while loops can provide dynamic control over your programs.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-basics/module/87023015-df32-4bcb-a972-659f3e76b1d1/lesson/bdab383b-7695-481f-9238-ead4b0b035d0)**
>
> Watch video content
