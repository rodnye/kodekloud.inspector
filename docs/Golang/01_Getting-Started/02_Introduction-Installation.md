# Introduction Installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Golang/Getting-Started/Introduction-Installation)

---

## Table of Contents

- Introduction Installation
  - Installing Go
  - Setting Up Your Go Workspace
  - Watch Video
    - Linux Installation
    - macOS Installation

---

## Content

Golang

Getting Started

# Introduction Installation

Before diving into Go programming, it's helpful to understand its origins and the vision behind its creation. Go—commonly known as Golang—was developed by Google engineers nearly a decade ago in response to the challenges of programming in languages like C++ and Java. At that time, most computational software relied on languages that made it difficult to take full advantage of multiprocessor systems. The Go team sought to blend the simplicity and ease of development found in dynamically typed, interpreted languages (such as Python) with the performance and safety of statically typed, compiled languages (like C++). Modern networked and multicore computing requirements also influenced Go’s design.

Later in this series, we will explore the differences between statically typed and dynamically typed languages.

![The image describes Golang, created by Google engineers, combining Python's ease with C++'s efficiency, supporting networked and multicore computing.](https://kodekloud.com/kk-media/image/upload/v1752877736/notes-assets/images/Golang-Introduction-Installation/frame_80.jpg)

Golang is a compiled language, which means that source code is converted into machine code before execution. Therefore, installing the Go compiler is a prerequisite for writing and running Go programs.

## Installing Go

To install Go, visit the official guide at [go.dev/doc/install](https://go.dev/doc/install). Choose your operating system's tab and follow the provided instructions.

> [!important]
> **Tip**
>
> After installation, verify your Go setup by running:
>
> ```
> go version
> ```
>
> This command will display your installed Go version.

### Linux Installation

On Linux systems, one common method is to remove any previous installations and extract the new version. For example:

```
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.6.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
go version
```

### macOS Installation

For macOS users, download the appropriate package from the official download page. The installer manages the installation process and updates your PATH environment variable automatically. Once installed, confirm by running:

```
go version
```

Successful execution of these commands should display your current Go version.

![A software installation window for Go is displayed, showing a progress bar for package validation, with a desert landscape background and a cartoon gopher character.](https://kodekloud.com/kk-media/image/upload/v1752877736/notes-assets/images/Golang-Introduction-Installation/frame_170.jpg)

The Go tool suite offers numerous commands and subcommands. To see the full list, run:

```
go help
```

This command will display useful information about tools such as build, clean, doc, env, fmt, and more. For details on a specific command, execute:

```
go help <command>
```

## Setting Up Your Go Workspace

Now that Go is installed, it’s time to set up your workspace to store your Go programs. Create a directory—anywhere you like, for instance in your home folder. Open your terminal and run:

```
cd ~
mkdir workspace
cd workspace
touch main.go
```

Open the workspace using your favorite IDE (such as Visual Studio Code) and add a simple "Hello, World!" program in main.go:

```
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
```

Save the file, return to your terminal, and execute the program with:

```
go run main.go
```

You should see the output "Hello World!" in your console.

> [!important]
> **Practice in the Cloud**
>
> For those who prefer working in a browser without local installation, platforms like KodeKloud offer lab environments. They provide step-by-step instructions and a ready-to-use terminal for running your Go code.

Below is another example of the "Hello, World!" program with an additional comment:

```
package main

import "fmt"

// This is a comment explaining the main function
func main() {
    fmt.Println("Hello World")
}
```

When you run the program:

```
~/code via v1.17.4 ➜ go run main.go
Hello World
~/code via v1.17.4 ➜
```

![The image shows a coding exercise interface with a quiz question about where Go was created, alongside instructions for GoLang exercises in Visual Studio Code.](https://kodekloud.com/kk-media/image/upload/v1752877737/notes-assets/images/Golang-Introduction-Installation/frame_300.jpg)

This concludes our lecture on the introduction and installation of Go. In the upcoming sections, we will dive deeper into Go's syntax and explore its rich features in greater detail.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/golang/module/b8b98ba5-f252-4a84-91c1-c067ab96d656/lesson/ccbdd4c1-e437-4ca3-a5bb-78ed64c8b02a)**
>
> Watch video content
