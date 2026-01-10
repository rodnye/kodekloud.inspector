# Case Statements - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Flow-Control/Case-Statements)

---

## Table of Contents

- Case Statements
  - Using if-elif-else Statements
  - Implementing a Case Statement
  - A Complete Menu-Driven Program
  - Additional Resources
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Flow Control

# Case Statements

In this lesson, we explore how to use case statements in shell scripts to simplify the logic of a menu-driven program. Previously, we combined a while loop with an if-elif-else construct to handle user choices. Although that approach works, using a case statement makes your code simpler, more readable, and easier to manage.

## Using if-elif-else Statements

Below is an example of a menu using if and elif statements:

```
echo "1. Shutdown"
echo "2. Restart"
echo "3. Exit Menu"
read -p "Enter your choice: " choice
if [ $choice -eq 1 ]
then
    shutdown now
elif [ $choice -eq 2 ]
then
    shutdown -r now
elif [ $choice -eq 3 ]
then
    break
else
    continue
fi
```

## Implementing a Case Statement

The same functionality can be achieved more elegantly using a case statement. The structure of a case statement starts with the `case` keyword and ends with `esac` (which is "case" spelled backward). Each branch of the case block ends with a double semicolon (`;;`), and the special pattern `*` serves as a catch-all, similar to an else block.

```
echo "1. Shutdown"
echo "2. Restart"
echo "3. Exit Menu"
read -p "Enter your choice: " choice
case $choice in
    1) shutdown now ;;
    2) shutdown -r now ;;
    3) break ;;
    *) continue ;;
esac
```

> [!important]
> **Note**
>
> Using a case statement not only simplifies the code but also improves its readability and maintenance, especially when dealing with multiple conditions.

## A Complete Menu-Driven Program

Here is a more comprehensive version of the menu-driven program that uses a while loop together with a case statement:

```
while true
do
    echo "1. Shutdown"
    echo "2. Restart"
    echo "3. Exit Menu"
    read -p "Enter your choice: " choice
    case $choice in
        1) shutdown now ;;
        2) shutdown -r now ;;
        3) break ;;
        *) continue ;;
    esac
done
```

This approach drastically simplifies the flow of the program compared to using numerous if and elif statements. If you are familiar with programming languages like C, you will notice that the case statement resembles the switch statement, making it easier to understand and implement.

Practice incorporating case statements into your shell scripts to reinforce the concepts presented and enhance your scripting skills.

## Additional Resources

- [Shell Scripting Tutorial](https://www.shellscript.sh/)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)

Happy scripting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/054d2eb5-f3b9-47d4-af5a-37b9f0d15f2c/lesson/c0b72a68-7d6d-4441-acfa-40490557842a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/054d2eb5-f3b9-47d4-af5a-37b9f0d15f2c/lesson/60356d99-44e3-421f-a2b0-3337d7c1a43c)**
>
> Practice lab
