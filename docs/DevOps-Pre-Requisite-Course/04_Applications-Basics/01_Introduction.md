# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Applications-Basics/Introduction)

---

## Table of Contents

- Introduction
  - Compiled Languages
  - Interpreted Languages
  - Packages, Modules, and Libraries
  - The Software Development Lifecycle in DevOps
  - What’s Next?
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Applications Basics

# Introduction

In this lesson, we explore the fundamentals of applications from both an operations and software development perspective. As a DevOps engineer, you must be adept at performing operational tasks and understanding the principles behind application development. Rather than focusing on advanced coding techniques, this lesson emphasizes how applications are developed, built, deployed, and troubleshooted. Every lecture is paired with hands-on labs that allow you to practice with real-world application source code.

We will also examine the compilation process, discuss what constitutes source code, and explain how it is transformed into machine code. This high-level overview aims to demystify the various stages involved in modernizing and containerizing applications in DevOps and cloud environments.

There are countless programming languages available today. For this discussion, we focus on a few of the most popular languages based on insights from the Stack Overflow 2019 survey. Consider the following diagram which lists popular languages:

![The image shows a list of popular programming languages, with JavaScript, Python, and Java highlighted, alongside a bar chart from a Stack Overflow survey.](https://kodekloud.com/kk-media/image/upload/v1752873405/notes-assets/images/DevOps-Pre-Requisite-Course-Introduction/frame_130.jpg)

From the survey, after filtering out databases, scripting, and markup languages, JavaScript, Python, and Java emerge as the front runners. For JavaScript-based server-side applications, we will use the Node.js framework.

Applications can be built using either compiled or interpreted programming languages. Understanding these differences from a DevOps perspective is essential, as it impacts how you build, test, and deploy applications.

![The image categorizes programming languages into compiled (Java, C, C++) and interpreted (Python, Node.js, Ruby, Perl) types.](https://kodekloud.com/kk-media/image/upload/v1752873406/notes-assets/images/DevOps-Pre-Requisite-Course-Introduction/frame_170.jpg)

## Compiled Languages

Languages such as Java, C, and C++ follow a two-step process. First, you write the source code and then compile it into machine code. For example, consider the following simple Java program:

Save the code in a file named `MyClass.java`:

```
public class MyClass {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

Compile the source code with:

```
javac MyClass.java
```

This command generates a compiled file named `MyClass.class`. Finally, run the program using:

```
java MyClass
```

The output will be:

```
Hello World
```

## Interpreted Languages

In contrast, interpreted languages like Python execute the source code directly using an interpreter, eliminating the explicit compilation step. Consider this sample Python application:

Save the code in a file named `main.py`:

```
def print_message():
    print("Hello World")


if __name__ == '__main__':
    print_message()
```

Execute the program using:

```
python main.py
```

The output will be:

```
Hello World
```

> [!important]
> **Note**
>
> Although languages like Python do not require manual compilation, the Python interpreter internally compiles the source code into an intermediate bytecode (stored as a `.pyc` file). This bytecode is then executed by the Python Virtual Machine (VM), which converts it into machine code that your computer can process.

Below is an illustration of how Python source code is transformed into bytecode and then executed as machine code:

```
# main.py
def print_message():
    print("Hello World")


if __name__ == '__main__':
    print_message()
```

```
Hello World
  1    0 LOAD_NAME                0 (print)
  3    1 LOAD_NAME                1 (print)
  6    0 LOAD_CONST               0 ('Hello World')
--> 12    CALL_FUNCTION            1 (1 positional, 0 keyword)
 15    PRINT_EXPR
 16    LOAD_CONST               1 (None)
 19    RETURN_VALUE


Machine Code
01100000 10111100 10000001
01100100 01101111 00101111
00000110 00011100 11111010
10110001 01100010 10111010
10000001 01100100 01001110
00001111 00001000 00011110
11111010 10110001 10110001
```

The Python Virtual Machine ensures a consistent runtime environment, allowing your application to run seamlessly on different systems without requiring separate builds.

## Packages, Modules, and Libraries

Developers frequently share reusable code in the form of packages, modules, or libraries. These packages can handle diverse functionalities such as filesystem operations, mathematical computations, OS interactions, web server setup, and more.

![The image lists topics related to "Packages/Modules/Libraries," including filesystems, math, operating systems, HTTP, security, and networking, alongside an icon of a package.](https://kodekloud.com/kk-media/image/upload/v1752873408/notes-assets/images/DevOps-Pre-Requisite-Course-Introduction/frame_490.jpg)

Applications depend on these packages, and managing them efficiently is crucial in DevOps. Tools such as NPM for Node.js and PIP for Python are used to manage these dependencies, helping prevent issues during the build process.

## The Software Development Lifecycle in DevOps

Once an application is developed, it typically undergoes a series of stages including development, building, testing, and delivery. DevOps practices strongly emphasize automating these stages through Continuous Integration and Continuous Deployment (CI/CD) pipelines. Having a clear understanding of what is being automated is key to successfully implementing automation in your workflows.

The following table summarizes several components crucial to modern application development in a DevOps context:

| Component            | Purpose                                 | Example Command/Tool             |
| -------------------- | --------------------------------------- | -------------------------------- |
| Version Control      | Source code management                  | `git clone https://repository`   |
| Build Automation     | Compiling source code and running tests | `mvn package` or `npm run build` |
| Package Management   | Dependency management                   | `pip install package-name`       |
| Deployment Pipelines | Automated build, test, and deployment   | Jenkins, GitLab CI/CD            |
| Containerization     | Packaging applications for deployment   | Docker, Kubernetes               |

## What’s Next?

In the upcoming sections, we will dive deeper into specific application types, including Python, Java, and Node.js. We will also explore popular web servers like Apache and NGINX, along with databases. Ultimately, you will work through an end-to-end application deployment that covers the entire software development lifecycle, with practical labs to reinforce these concepts.

That concludes this lecture. In the next session, we will focus on Java and explore its critical elements in greater detail. See you there!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/669946a1-3725-4ba8-af56-14d449f778c3/lesson/933d8174-1ea7-46cf-a7d9-88b218cbc1a8)**
>
> Watch video content
