# Lab Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Working-with-Shell-I/Lab-Introduction)

---

## Table of Contents

- Lab Introduction
  - Types of Lab Questions
  - Example Command Sequence
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Multiple-Choice Questions
    - Configuration Tests

---

## Content

Learning Linux Basics Course & Labs

Working with Shell I

# Lab Introduction

This article provides an introductory tour of the Hands-on Labs available in this course. If you have never used KodeKloud Labs before, please review this guide before attempting any lab exercises.

The Hands-on Labs simulate a genuine Linux Command Line Interface where you execute commands using your keyboard. For the best experience, we recommend using a laptop or desktop computer. Each lab is specifically designed to reinforce the concepts covered in previous lecture sessions.

> [!important]
> **Important**
>
> Before starting a lab, click the provided link to open the Hands-on Labs environment. Please allow a few minutes for the lab environment to load, as it simulates a real Linux setup running on Mumshad Mannambeth's laptop.

The lab interface is divided into two primary sections:

1.  **Linux Terminal:** Located on the left-hand side where you’ll execute commands and perform tasks.
2.  **Lab Portal:** Found on the right-hand side, displaying the questions and guidelines related to the lab exercises.

Below is a sample terminal prompt to help you get started:

```
bob@caleston-lp10:~$
```

## Types of Lab Questions

There are two primary types of questions you may encounter during the labs:

### Multiple-Choice Questions

For multiple-choice questions, you will need to execute commands in the terminal to determine the correct answer. Once you have confirmed your result, click the corresponding button to proceed.

For example, to determine the path to Bob's home directory, execute the following command:

```
bob@caleston-lp10:~$ echo $HOME
/home/bob
```

After selecting the correct answer, the next question will load automatically.

### Configuration Tests

Configuration tests require you to perform specific tasks in the terminal. For example, to create a directory named "birds" in Bob's home directory, use the following command:

```
bob@caleston-lp10:~$ mkdir /home/bob/birds
```

If an error occurs—such as mistakenly creating a directory named "bird" instead of "birds"—the interface will indicate the mistake when you click the check button. For example:

```
bob@caleston-lp10:~$ mkdir /home/bob/bird
```

To troubleshoot, click the provided icon for more details. Then, correct your command and validate the task again. The corrected command sequence appears as follows:

```
bob@caleston-lp10:~$ mkdir /home/bob/bird
bob@caleston-lp10:~$ mkdir /home/bob/birds
```

If you ever feel uncertain about how to proceed, simply click the hint button to receive helpful guidance.

## Example Command Sequence

Below is an example sequence of commands you might encounter during a lab:

```
bob@caleston-lp10:~$ echo $HOME
/home/bob
bob@caleston-lp10:~$ mkdir /home/bob/bird
bob@caleston-lp10:~$ mkdir /home/bob/birds
bob@caleston-lp10:~$
```

In some scenarios, you might also work with nested directories. For example, to create nested folders for "fish" and "salmon", run:

```
mkdir -p /home/bob/fish/salmon
```

Good luck with your labs, and enjoy the hands-on learning experience!

## Additional Resources

- [KodeKloud Labs Documentation](/docs/klabs)
- [Linux Command Line Basics](https://linuxcommand.org/)

> [!important]
> **Tip**
>
> For optimal learning, practice these commands on your local terminal while following along with the lab instructions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/267dec49-c3e9-4627-b7f8-9bf9aa834e53/lesson/1b2b6aa8-4fa7-4708-abc0-ef91b537aa67)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/267dec49-c3e9-4627-b7f8-9bf9aa834e53/lesson/6d98e2f5-b982-4f21-add1-2ab4fb50826b)**
>
> Practice lab
