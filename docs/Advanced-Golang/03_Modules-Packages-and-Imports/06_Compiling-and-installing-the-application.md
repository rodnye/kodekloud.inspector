# Compiling and installing the application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Modules-Packages-and-Imports/Compiling-and-installing-the-application)

---

## Table of Contents

- Compiling and installing the application
  - Compiling the Application
  - Installing the Application with Go Install
  - Sample Application Code
  - Watch Video

---

## Content

Advanced Golang

Modules Packages and Imports

# Compiling and installing the application

In this lesson, you'll learn how to compile, install, and run your Go application seamlessly. Follow these steps to build your code, create an executable, and configure your environment so the application can be run from anywhere.

## Compiling the Application

Begin by opening your terminal and navigating to your module directory. Compile your Go code into an executable by executing the following command:

```
go build
```

After running the command, an executable file will be generated in your current working directory. On Linux or macOS, run the executable using:

```
./cryptit
```

On Windows systems, ensure you include the `.exe` extension when executing the file.

When you run the executable, you should see output similar to:

```
> go build
> ./cryptit
Nrghnorxg
Kodekloud
```

> [!important]
> **Note**
>
> If your current shell prompt is not within the directory that contains the executable, you will need to provide the full path to run it. For instance, running `./cryptit` from your home directory might result in an error like:
>
> ```
> zsh: no such file or directory: ./cryptit
> ```
>
> In this case, specify the full path to the executable.

## Installing the Application with Go Install

To enable running your application from any directory, install the binary into a directory that is part of your system's PATH. Follow these steps:

1.  **Determine your Go installation path (GOPATH):**  
    Locate where your Go binaries are stored.
2.  **Update your PATH environment variable:**  
    On Linux or macOS, add your GOPATH's `bin` directory to the PATH by running:

    ```
    export PATH=$PATH:/Users/priyanka/go/bin
    ```

    On Windows, you can update the PATH using the `set` command or by modifying your system environment variables.

3.  **Install the Application:**  
    Go back to your module directory and install the application with:

    ```
    go install
    ```

    This command compiles the package and places the binary in the `bin` directory under your GOPATH.

4.  **Verify the Installation:**  
    Navigate to your GOPATH's `bin` directory and list its contents:

    ```
    cd ~/go/bin
    ls
    ```

    You should see the binary (e.g., `cryptit`) listed. Now, you can run your application from any location by simply typing:

    ```
    cryptit
    ```

    This will display the same expected output as before.

## Sample Application Code

Below is an example of the Go code used in this lesson to demonstrate encryption and decryption functionalities:

```
package main


import (
    "fmt"
    "encrypt"
    "decrypt"
)


func main() {
    encryptedStr := encrypt.Nimbus("Kodekloud")
    fmt.Println(encryptedStr)
    fmt.Println(decrypt.Nimbus(encryptedStr))
}
```

That's it for this lesson. We hope these instructions help you successfully compile and install your Go application. Happy coding, and see you in the next tutorial!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/6ce7d245-515e-428d-9672-915e49a8ebd6/lesson/ab3c3730-e7c8-4cb6-90d6-ffefac74a7f1)**
>
> Watch video content
