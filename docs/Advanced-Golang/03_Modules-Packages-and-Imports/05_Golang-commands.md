# Golang commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Modules-Packages-and-Imports/Golang-commands)

---

## Table of Contents

- Golang commands
  - Initializing a New Module with go.mod
  - Tidying the Module with go.mod tidy
  - Running Go Code with go run
  - Building and Installing Executables
  - Managing Dependencies with go get
  - Watch Video
    - go build
    - go install

---

## Content

Advanced Golang

Modules Packages and Imports

# Golang commands

In this lesson, we explore some of the most commonly used Go commands. Each section outlines the purpose of a command and demonstrates how it integrates into your development workflow.

## Initializing a New Module with go.mod

Use the `go mod init` command to create a new module. This command initializes a new `go.mod` file in the current directory, establishing the module's root. You can optionally provide a module path as an argument if needed.

```
go mod init
```

## Tidying the Module with go.mod tidy

The `go mod tidy` command ensures that your `go.mod` file accurately reflects the dependencies used in your source code. It automatically adds any missing module requirements and removes those that are no longer relevant.

```
go mod tidy
```

## Running Go Code with go run

The `go run` command facilitates quick testing of your Go code. It compiles and runs your program by creating an executable binary in a temporary location. Once the program completes execution, Go cleans up the temporary binary, similar to running a script in other languages.

```
go run <file>
```

## Building and Installing Executables

### go build

The `go build` command compiles the packages specified by the import paths along with their dependencies into an executable. The resulting binary is created in the current source directory.

```
go build
```

### go install

The `go install` command compiles your code and installs the executable into the `GOPATH/bin` directory. This makes it accessible from any terminal session. To find your `GOPATH`, execute the following command:

```
go env GOPATH
```

Below is a diagram that illustrates the difference between `go build` and `go install`:

![The image explains the difference between the `go build` and `go install` commands in Go programming. `go build` compiles and creates an executable in the current directory, while `go install` compiles, moves the executable to `$GOPATH/bin`, and allows it to run from any terminal path.](https://kodekloud.com/kk-media/image/upload/v1752868736/notes-assets/images/Advanced-Golang-Golang-commands/go-build-vs-go-install-explained.jpg)

## Managing Dependencies with go get

The `go get` command helps manage dependencies by resolving package arguments to specific module versions. It updates the `go.mod` file with the necessary versions and downloads the source code into the module cache. Use this command to add, upgrade, or downgrade a dependency.

```
go get example.com/pkg
go get example.com/pkg@v1.2.3
```

> [!important]
> **Note**
>
> Keep your modules organized by regularly using `go mod tidy` after adding or updating dependencies to ensure that your `go.mod` file stays clean and up-to-date.

That concludes our walkthrough of essential Go commands. Happy coding, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/6ce7d245-515e-428d-9672-915e49a8ebd6/lesson/775d4650-9396-4b84-984d-7f3149fea976)**
>
> Watch video content
