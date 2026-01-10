# Repositories Modules and Packages - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Modules-Packages-and-Imports/Repositories-Modules-and-Packages)

---

## Table of Contents

- Repositories Modules and Packages
  - Creating a Go Module
  - Watch Video

---

## Content

Advanced Golang

Modules Packages and Imports

# Repositories Modules and Packages

In this lesson, we explore library management in Golang by understanding how the language organizes code into repositories, modules, and packages. This foundational knowledge is essential for efficient code management and dependency tracking in Go projects.

A repository is a designated location in a version control system where a project's source code is stored. Within a repository, a module represents the root of a Go library or application. Modules can contain one or more packages, which serve as the building blocks used to organize and structure code. Although it is technically possible to store multiple modules in a single repository, this practice is discouraged. Since all code within a module is versioned together, maintaining separate version histories for different projects in one repository can introduce unnecessary complexity.

Before incorporating code from packages outside the standard library, you must declare your project as a module. Each module is assigned a globally unique identifier—often a GitHub repository URL, a private domain, or another URL—that Go tools use as the download path.

![The image is a diagram explaining "Module & Packages" in Go, showing a Go module containing multiple packages, with a globally unique identifier example: "github.com/kodekloud/learn".](https://kodekloud.com/kk-media/image/upload/v1752868747/notes-assets/images/Advanced-Golang-Repositories-Modules-and-Packages/go-module-packages-diagram.jpg)

In summary, Go code is structured into packages grouped into modules. A module not only organizes code but also specifies the dependencies needed to run the code, including the Go version and other modules, as recorded in the `go.mod` file.

![The image explains the relationship between Go code, packages, and modules, highlighting that Go code is grouped into packages, which are then grouped into modules. It also describes that a module specifies dependencies, including the Go version and other required modules in the go.mod file.](https://kodekloud.com/kk-media/image/upload/v1752868748/notes-assets/images/Advanced-Golang-Repositories-Modules-and-Packages/go-code-packages-modules-diagram.jpg)

## Creating a Go Module

Follow these steps to create a new Go module for your project:

1.  **Navigate to Your Source Code Directory:**  
    Open your terminal and change to the directory where your source code is stored.
2.  **Create a New Project Directory:**  
    For this lesson, we name the project "learn". Execute the following command:

    ```
    mkdir learn
    ```

3.  **Enter the Project Directory:**  
    Change into the newly created directory:

    ```
    cd learn
    ```

4.  **Initialize the Go Module:**  
    Declare the directory as a Go module by running `go mod init` with a globally unique module path. While paths like `github.com/yourusername/yourrepository` are common, we will use `example.com/learn` for this lesson:

    ```
    go mod init example.com/learn
    ```

    The output should confirm the creation of the `go.mod` file:

    ```
    go: creating new go.mod: module example.com/learn
    ```

Now, your `learn` directory is configured as a Go module, complete with a `go.mod` file. This file will later help manage dependencies and specify the Go version required for your project.

> [!important]
> **Next Steps**
>
> In upcoming lessons, we will dive deeper into the structure and functionalities of the `go.mod` file, exploring how it manages dependencies and versioning for Go projects.

Thank you for learning with us!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/6ce7d245-515e-428d-9672-915e49a8ebd6/lesson/cd2269c6-f41c-45c1-aee2-308df54bcd46)**
>
> Watch video content
