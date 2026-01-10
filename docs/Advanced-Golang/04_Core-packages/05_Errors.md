# Errors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Core-packages/Errors)

---

## Table of Contents

- Errors
  - Built-in Error Functions: New() and Errorf()
  - Watch Video
    - Using errors.New
    - Error Handling with if-else Conditions
    - Enhancing Error Messages with fmt.Errorf

---

## Content

Advanced Golang

Core packages

# Errors

In this article, we explore error handling in Go programming, a fundamental aspect of building robust applications. Go does not rely on traditional try-catch blocks for error handling; instead, it offers its own straightforward mechanisms. Understanding these mechanisms is key to building resilient Go applications.

## Built-in Error Functions: New() and Errorf()

Go provides two commonly used functions for creating and formatting errors: `New()` and `Errorf()`. These functions are part of Go's standard libraries and help streamline error handling in your code.

![The image is a slide titled "Errors" that lists two functions: "New()" and "Errorf()".](https://kodekloud.com/kk-media/image/upload/v1752868722/notes-assets/images/Advanced-Golang-Errors/errors-new-errorf-functions-slide.jpg)

### Using errors.New

The built-in `errors` package includes the `New` function, which returns an error formatted with the provided text. You can review the documentation by running:

```
Desktop/codekloud/learn via 🐹 v1.19.3
$ go doc errors New
package errors // import "errors"

func New(text string) error
    New returns an error that formats as the given text. Each call to New
    returns a distinct error value even if the text is identical.
```

Every invocation of `errors.New` generates a unique error object—even if the error message string is the same. Below is an example of using `New` to create and display a custom error message:

```
package main

import (
    "errors"
    "fmt"
)

func main() {
    err := errors.New("Custom error occurred")
    fmt.Println(err)
}
```

When you run the program, it prints the custom error message to the console.

> [!important]
> **Note**
>
> Go's error handling is based on explicit checking. Always check whether an error variable is `nil` before proceeding.

### Error Handling with if-else Conditions

Rather than relying on exceptions, error handling in Go typically involves testing if an error variable is `nil`. Consider the following example, where a function processes an integer and returns an error if the number is even (permitting only odd numbers):

```
package main

import (
    "errors"
    "fmt"
)

func process(i int) error {
    if i%2 == 0 {
        return errors.New("Only odd numbers allowed")
    }
    return nil
}

func checkError(e error) {
    if e != nil {
        fmt.Println(e)
    } else {
        fmt.Println("Operation successful")
    }
}

func main() {
    err := process(3)
    checkError(err)

    err = process(2)
    checkError(err)
}
```

When executed, this program produces the following output:

```
Desktop/kodekloud/learn via 🐹 v1.19.3
$ go run main.go
Operation successful
Only odd numbers allowed
```

In this example, passing an odd number results in a successful operation, while an even number triggers an error message.

### Enhancing Error Messages with fmt.Errorf

For more detailed error messages, you can use the `fmt.Errorf` function from the `fmt` package. This function lets you create formatted error messages by incorporating dynamic information. Here is the documentation snippet for `fmt.Errorf`:

```
Desktop/kodecloud/learn via 🐱 v1.19.3
$ go doc fmt Errorf
package fmt // import "fmt"

func Errorf(format string, a ...any) error
    Errorf formats according to a format specifier and returns the string as a value that satisfies error.
```

The following example demonstrates how to update the `process` function to dynamically include the provided integer in the error message:

```
package main

import (
    "fmt"
)

func process(i int) error {
    if i%2 == 0 {
        return fmt.Errorf("only odd numbers allowed, got: %d", i)
    }
    return nil
}

func checkError(e error) {
    if e != nil {
        fmt.Println(e)
    } else {
        fmt.Println("Operation successful")
    }
}

func main() {
    err := process(3)
    checkError(err)

    err = process(2)
    checkError(err)
}
```

Executing this program produces output similar to:

```
$ go run main.go
Operation successful
only odd numbers allowed, got: 2
```

This demonstrates how to create custom error messages and effectively manage errors using both `errors.New` and `fmt.Errorf`.

> [!important]
> **SEO Tip**
>
> In your Go projects, ensure to check errors immediately after function calls to enhance code reliability and maintainability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/c29202d1-1463-42eb-806b-0d6e38042661/lesson/85a522df-1afa-4ee8-8f16-5c64b2c957ee)**
>
> Watch video content
