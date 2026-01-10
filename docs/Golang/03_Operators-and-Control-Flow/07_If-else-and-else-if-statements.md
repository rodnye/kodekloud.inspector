# If else and else if statements - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Operators-and-Control-Flow/If-else-and-else-if-statements)

---

## Table of Contents

- If else and else if statements
  - Understanding Control Flow
  - The If Statement
  - The If-Else Statement
  - The Else-If Statement
  - Summary
  - Watch Video
  - Practice Lab
    - Syntax
    - Example: Using an If Statement
    - Correct Syntax
    - Incorrect Syntax Example
    - Correct Example
    - Structure
    - Example: Using If, Else-If, and Else

---

## Content

Golang

Operators and Control Flow

# If else and else if statements

This lesson covers control flow in programming with a focus on conditional statements in Go. We will use if-else and else-if statements to evaluate conditions and execute code accordingly. The examples in this guide validate conditions—such as checking if a user is eligible to vote based on age—and demonstrate proper syntax and structure.

## Understanding Control Flow

Control flow determines the order in which instructions are executed. Instead of following a strict top-to-bottom order, the program's execution flow is guided by conditions. Consider the following flowchart that illustrates the evaluation process for determining if a user is eligible to vote:

![The image is a flowchart determining eligibility based on age. If age is 18 or older, the result is "eligible"; otherwise, "not eligible."](https://kodekloud.com/kk-media/image/upload/v1752877741/notes-assets/images/Golang-If-else-and-else-if-statements/frame_30.jpg)

The diagram emphasizes that control flow in programming involves branching based on evaluated conditions.

## The If Statement

The if statement is used to execute code only when a specified condition is true. If the condition is false, the code block is skipped. Note that parentheses around the condition are optional in Go.

### Syntax

```
if condition {
    // Executes when condition is true
}
```

### Example: Using an If Statement

In the example below, we declare a string variable and check if its value equals "happy". If the condition is true, it prints the value:

```
package main
import "fmt"


func main() {
    var a string = "happy"
    if a == "happy" {
        fmt.Println(a)
    }
}
```

Console output:

```
>>> go run main.go
happy
```

Since the condition is met, the program prints "happy".

## The If-Else Statement

The if-else statement extends the if statement by introducing an alternative block of code that executes when the condition is false. It is crucial to place the else statement on the same line as the closing brace of the if block to avoid syntax errors.

### Correct Syntax

```
if condition {
    // Executes when condition is true
} else {
    // Executes when condition is false
}
```

### Incorrect Syntax Example

Avoid formatting the else block on a new line after the closing brace:

```
package main
import "fmt"


func main() {
    var fruit string = "grapes"
    if fruit == "apples" {
        fmt.Println("Fruit is apple")
    }
    else {
        fmt.Println("Fruit is not apple")
    }
}
```

Console output:

```
>>> go run main.go
syntax error: unexpected else, expecting }
```

### Correct Example

By placing else on the same line as the closing brace, the program executes without errors:

```
package main
import "fmt"


func main() {
    var fruit string = "grapes"
    if fruit == "apples" {
        fmt.Println("Fruit is apple")
    } else {
        fmt.Println("Fruit is not apple")
    }
}
```

Console output:

```
>>> go run main.go
Fruit is not apple
```

A

> [!important]
> **Note**
>
> Remember to always place the else on the same line as the closing brace to prevent syntax errors in Go.

## The Else-If Statement

When there are multiple conditions to evaluate, the else-if statement provides an elegant solution. It allows you to test additional conditions if the prior ones evaluate to false. Once a condition is met, the control flow exits the conditional statement.

### Structure

```
if condition_1 {
    // Executes when condition_1 is true
} else if condition_2 {
    // Executes when condition_1 is false and condition_2 is true
} else if condition_3 {
    // Executes when previous conditions are false and condition_3 is true
} else {
    // Executes when none of the above conditions are true
}
```

### Example: Using If, Else-If, and Else

In the following example, the program checks the value of a variable named "fruit". Depending on the value, it prints a specific message. The corresponding flowchart visually represents this decision-making process:

![A flowchart evaluating a fruit variable, leading to different statements based on whether the fruit is "apple" or "orange," or neither.](https://kodekloud.com/kk-media/image/upload/v1752877742/notes-assets/images/Golang-If-else-and-else-if-statements/frame_310.jpg)

Here is the example code:

```
package main


import "fmt"


func main() {
    fruit := "grapes"
    if fruit == "apple" {
        fmt.Println("I love apples")
    } else if fruit == "orange" {
        fmt.Println("Oranges are not apples")
    } else {
        fmt.Println("no appetite")
    }
}
```

Console output:

```
>>> go run main.go
no appetite
```

Since the value "grapes" does not match "apple" or "orange", the else block is executed.

## Summary

In this lesson, you learned how to implement control flow in Go using if, if-else, and else-if statements. These structures allow your programs to make decisions and execute specific code based on given conditions. Practice applying these techniques to build more dynamic and responsive applications.

Keep exploring and practicing to improve your understanding of Go and control flow concepts. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/55170413-7263-410b-b9c7-83e2b83d7f74)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/golang/module/036484d6-1e16-46e2-908d-77e545bde2bf/lesson/9d505774-b847-4da0-adf2-654edf1c3c79)**
>
> Practice lab
